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

export async function GET() {
  try {
    const key = process.env.YOUTUBE_API_KEY ?? "";
    const channelId = process.env.YOUTUBE_CHANNEL_ID ?? "";

if (!key || !channelId) {
  return NextResponse.json(
    { ok: false, error: "missing_youtube_env" },
    { status: 500 }
  );
}

    // 1) Canal (info + estatísticas)
    const channelUrl =
      "https://www.googleapis.com/youtube/v3/channels" +
      `?part=snippet,statistics&id=${encodeURIComponent(channelId)}` +
      `&key=${encodeURIComponent(key)}`;

    const channelRes = await fetch(channelUrl, {
      // cache leve no servidor (10 min)
      next: { revalidate: 600 },
    });

    if (!channelRes.ok) {
      return NextResponse.json(
        { ok: false, error: "channel_fetch_failed" },
        { status: 500 }
      );
    }

    const channelJson: any = await channelRes.json();
    const ch = channelJson?.items?.[0];
    if (!ch) {
      return NextResponse.json(
        { ok: false, error: "channel_not_found" },
        { status: 404 }
      );
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

    // helper pra buscar vídeo mais recente
    async function fetchLatestVideo(params: string) {
      const url =
        "https://www.googleapis.com/youtube/v3/search" +
        `?part=snippet&channelId=${encodeURIComponent(channelId)}` +
        `&type=video&order=date&maxResults=1${params}` +
        `&key=${encodeURIComponent(key)}`;

      const res = await fetch(url, { next: { revalidate: 600 } });
      if (!res.ok) return null;

      const json: any = await res.json();
      const item = json?.items?.[0];
      const videoId = item?.id?.videoId;
      if (!videoId) return null;

      return {
        videoId,
        title: item?.snippet?.title ?? "",
        publishedAt: item?.snippet?.publishedAt ?? "",
        thumbnailUrl: pickBestThumb(item?.snippet?.thumbnails),
      };
    }

    // 2) tenta última LIVE concluída
    let latest = await fetchLatestVideo("&eventType=completed");

    // 3) fallback: último vídeo do canal
    if (!latest) {
      latest = await fetchLatestVideo("");
    }

    if (!latest) {
      return NextResponse.json(
        { ok: false, error: "latest_video_not_found", channel },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, channel, latest });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "unknown_error" },
      { status: 500 }
    );
  }
}