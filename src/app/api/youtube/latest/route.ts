// igreja-site/src/app/api/youtube/latest/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function pickBestThumb(thumbnails: any) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    ""
  );
}

// Remove qualquer coisa depois de ? ou & (ex: Olkd4SQU3Hg&t=2s -> Olkd4SQU3Hg)
function normalizeVideoId(raw: string) {
  return (raw || "").trim().split(/[?&]/)[0].trim();
}

function isValidVideoId(id: string) {
  // YouTube IDs normalmente têm 11 chars: [A-Za-z0-9_-]
  return /^[A-Za-z0-9_-]{11}$/.test(id);
}

type Candidate = {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
};

type VideoStatusMap = Record<
  string,
  {
    embeddable: boolean;
    privacyStatus?: string;
    blocked?: string[];
    allowed?: string[];
  }
>;

function isRegionOk(
  regionCode: string,
  status?: { blocked?: string[]; allowed?: string[] }
) {
  if (!regionCode) return true;
  const r = regionCode.toUpperCase();

  const blocked = status?.blocked ?? [];
  if (blocked.includes(r)) return false;

  const allowed = status?.allowed ?? [];
  if (allowed.length > 0 && !allowed.includes(r)) return false;

  return true;
}

// ✅ Checagem "real" do embed.
// Importante: evitar falso positivo quando YouTube entrega página de consent/cookies.
async function passesEmbedPageCheck(videoId: string) {
  try {
    if (!isValidVideoId(videoId)) return false;

    const url = `https://www.youtube.com/embed/${videoId}?hl=en&has_verified=1`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
        // ajuda MUITO contra páginas de consent
        Cookie: "CONSENT=YES+1",
      },
    });

    if (!res.ok) return false;

    const html = await res.text();
    const lower = html.toLowerCase();

    // 🚫 se cair numa página de consent/cookies, não dá pra confiar => NÃO escolhe
    const looksLikeConsent =
      lower.includes("consent.youtube.com") ||
      lower.includes("before you continue") ||
      lower.includes("use cookies") ||
      lower.includes("agree to the use") ||
      lower.includes("consent") && lower.includes("cookie");

    if (looksLikeConsent) return false;

    // 🚫 sinais comuns de bloqueio/indisponível (o teu print cai aqui)
    const looksBlocked =
      lower.includes("video unavailable") ||
      lower.includes("this video contains content") ||
      lower.includes("has blocked it from display") ||
      lower.includes("blocked from display on this website") ||
      (lower.includes("playabilitystatus") && lower.includes('"status":"error"'));

    if (looksBlocked) return false;

    // ✅ sinal bom quando aparece
    if (lower.includes('"playabilitystatus"') && lower.includes('"status":"ok"')) {
      return true;
    }

    // ✅ se não achou bloqueio e não parece consent, assume ok
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const key = process.env.YOUTUBE_API_KEY ?? "";
    const channelId = process.env.YOUTUBE_CHANNEL_ID ?? "";
    const regionCode = (process.env.YOUTUBE_REGION_CODE ?? "UY").toUpperCase();

    // ✅ fallback manual (deve ser só o ID)
    const fallbackLiveId = normalizeVideoId(process.env.YOUTUBE_FALLBACK_LIVE_ID ?? "");

    if (!key || !channelId) {
      return NextResponse.json({ ok: false, error: "missing_youtube_env" }, { status: 500 });
    }

    // 1) Canal (info + estatísticas)
    const channelUrl =
      "https://www.googleapis.com/youtube/v3/channels" +
      `?part=snippet,statistics&id=${encodeURIComponent(channelId)}` +
      `&key=${encodeURIComponent(key)}`;

    const channelRes = await fetch(channelUrl, { next: { revalidate: 600 } });

    if (!channelRes.ok) {
      return NextResponse.json({ ok: false, error: "channel_fetch_failed" }, { status: 500 });
    }

    const channelJson: any = await channelRes.json();
    const ch = channelJson?.items?.[0];
    if (!ch) {
      return NextResponse.json({ ok: false, error: "channel_not_found" }, { status: 404 });
    }

    const channel = {
      id: ch.id,
      title: ch?.snippet?.title ?? "",
      description: ch?.snippet?.description ?? "",
      customUrl: ch?.snippet?.customUrl ?? "",
      avatarUrl: pickBestThumb(ch?.snippet?.thumbnails),
      subscriberCount: Number(ch?.statistics?.subscriberCount ?? 0),
      videoCount: Number(ch?.statistics?.videoCount ?? 0),
    };

    // ✅ SOMENTE LIVES concluídas (recentes)
    async function fetchRecentLives(maxResults = 12): Promise<Candidate[]> {
      const url =
        "https://www.googleapis.com/youtube/v3/search" +
        `?part=snippet&channelId=${encodeURIComponent(channelId)}` +
        `&type=video&order=date&maxResults=${maxResults}` +
        `&eventType=completed` +
        `&key=${encodeURIComponent(key)}`;

      const res = await fetch(url, { next: { revalidate: 600 } });
      if (!res.ok) return [];

      const json: any = await res.json();
      const items: any[] = json?.items ?? [];

      return items
        .map((item) => {
          const rawId = item?.id?.videoId;
          const videoId = normalizeVideoId(rawId);
          if (!videoId) return null;

          return {
            videoId,
            title: item?.snippet?.title ?? "",
            publishedAt: item?.snippet?.publishedAt ?? "",
            thumbnailUrl: pickBestThumb(item?.snippet?.thumbnails),
          } as Candidate;
        })
        .filter(Boolean) as Candidate[];
    }

    async function fetchVideoStatuses(videoIds: string[]): Promise<VideoStatusMap> {
      const cleaned = videoIds.map(normalizeVideoId).filter(isValidVideoId);
      if (cleaned.length === 0) return {};

      const ids = cleaned.slice(0, 50).join(",");

      const url =
        "https://www.googleapis.com/youtube/v3/videos" +
        `?part=status,contentDetails&id=${encodeURIComponent(ids)}` +
        `&key=${encodeURIComponent(key)}`;

      const res = await fetch(url, { next: { revalidate: 600 } });
      if (!res.ok) return {};

      const json: any = await res.json();
      const items: any[] = json?.items ?? [];

      const map: VideoStatusMap = {};
      for (const v of items) {
        const id = normalizeVideoId(v?.id);
        if (!id) continue;

        const rr = v?.contentDetails?.regionRestriction;
        map[id] = {
          embeddable: Boolean(v?.status?.embeddable),
          privacyStatus: v?.status?.privacyStatus,
          blocked: Array.isArray(rr?.blocked) ? rr.blocked : [],
          allowed: Array.isArray(rr?.allowed) ? rr.allowed : [],
        };
      }
      return map;
    }

    async function pickFirstReallyEmbeddable(
      candidates: Candidate[],
      statusMap: VideoStatusMap
    ): Promise<(Candidate & { embeddable: boolean }) | null> {
      const MAX_TRIES = Math.min(10, candidates.length);

      for (let i = 0; i < MAX_TRIES; i++) {
        const c = candidates[i];
        const id = normalizeVideoId(c.videoId);
        if (!isValidVideoId(id)) continue;

        const st = statusMap[id];
        if (!st) continue;

        if (st.privacyStatus && st.privacyStatus !== "public") continue;
        if (!st.embeddable) continue;
        if (!isRegionOk(regionCode, st)) continue;

        const ok = await passesEmbedPageCheck(id);
        if (!ok) continue;

        return { ...c, videoId: id, embeddable: true };
      }

      return null;
    }

    const liveCandidates = await fetchRecentLives(15);
    const statusMap = await fetchVideoStatuses(liveCandidates.map((c) => c.videoId));

    let latest = await pickFirstReallyEmbeddable(liveCandidates, statusMap);

    // ✅ Se não achou nenhuma live que embeda, usa fallback fixo (se existir e for válido)
    if (!latest && fallbackLiveId && isValidVideoId(fallbackLiveId)) {
      const ok = await passesEmbedPageCheck(fallbackLiveId);
      if (ok) {
        latest = {
          videoId: fallbackLiveId,
          title: "Transmisión (seleccionada)",
          publishedAt: "",
          thumbnailUrl: "",
          embeddable: true,
        };
      }
    }

    // ✅ Se ainda não achou, devolve a live mais recente como embeddable=false (UI não mostra iframe)
    if (!latest) {
      const first = liveCandidates[0];
      if (first) {
        return NextResponse.json({
          ok: true,
          channel,
          latest: {
            ...first,
            videoId: normalizeVideoId(first.videoId),
            embeddable: false,
          },
        });
      }

      return NextResponse.json({ ok: false, error: "latest_live_not_found", channel }, { status: 404 });
    }

    return NextResponse.json({ ok: true, channel, latest });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "unknown_error" }, { status: 500 });
  }
}