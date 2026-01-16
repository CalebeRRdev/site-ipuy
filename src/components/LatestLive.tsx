// igreja-site/src/components/LatestLive.tsx
"use client";

import "./LatestLive.module.css";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/content/site";

type ApiPayload =
  | {
      ok: true;
      channel: {
        id: string;
        title: string;
        description: string;
        customUrl: string;
        avatarUrl: string;
        subscriberCount: number;
        videoCount: number;
      };
      latest: {
        videoId: string;
        title: string;
        publishedAt: string;
        thumbnailUrl: string;
        embeddable: boolean;
      };
    }
  | { ok: false; error: string; channel?: any; latest?: any };

function formatCompact(n: number) {
  try {
    return new Intl.NumberFormat("es", { notation: "compact" }).format(n);
  } catch {
    return String(n);
  }
}

function formatDate(iso: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("es-UY", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

export default function LatestLive() {
  // ✅ fallback “seguro”: ideal ser uma live que EMBED funciona
  const fallbackVideoId = site.youtube.featuredVideoId;

  const [data, setData] = useState<ApiPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/youtube/latest", {
          method: "GET",
          signal: ac.signal,
          headers: { Accept: "application/json" },
        });
        const json = (await res.json()) as ApiPayload;
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  const apiOk = data && "ok" in data && data.ok;
  const apiVideoId = apiOk ? data.latest.videoId : null;

  // Se a API vier ok, usa o ID dela; senão usa fallback
  const videoId = apiVideoId ?? fallbackVideoId;

  const canEmbed = apiOk ? Boolean(data.latest.embeddable) : true;

  const embedSrc = useMemo(() => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  }, [videoId]);

  const channelTitle = apiOk ? data.channel.title : "Iglesia Presbiteriana del Uruguay";
  const channelAvatar = apiOk ? data.channel.avatarUrl : "";
  const channelSubs = apiOk ? data.channel.subscriberCount : 0;
  const channelVideos = apiOk ? data.channel.videoCount : 0;

  const latestTitle = apiOk ? data.latest.title : "Transmisión más reciente";
  const latestDate = apiOk ? formatDate(data.latest.publishedAt) : "";

  const thumb =
    apiOk && data.latest.thumbnailUrl
      ? data.latest.thumbnailUrl
      : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const playlistsUrl =
    apiOk
      ? `https://www.youtube.com/channel/${data.channel.id}/playlists`
      : `${site.links.youtubeChannelUrl}/playlists`;

  return (
    <section id="envivo" className="section section-band">
      <div className="container">
        <header className="section-header">
          <p className="kicker">YOUTUBE / PREDICACIONES</p>
          <h2 className="section-title">Última transmisión</h2>
          <p className="section-lead">
            Cada domingo transmitimos el culto y también cada jueves el estudio bíblico.
            En nuestro canal vas a encontrar predicaciones, playlists y más.
          </p>
        </header>

        <div className="live-grid live-grid--big">
          <div className="card live-video live-video--big">
            <div className="aspect-video aspect-video--live">
              {canEmbed ? (
                <iframe
                  key={videoId}
                  src={embedSrc}
                  title="Última transmisión"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                // ✅ fallback sem iframe: não tem como aparecer tela cinza
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    borderRadius: "inherit",
                    overflow: "hidden",
                    background: "#111",
                  }}
                  aria-label="Ver la transmisión en YouTube"
                  title="Ver en YouTube"
                >
                  <img
                    src={thumb}
                    alt={latestTitle}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.85,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 16px",
                        borderRadius: 999,
                        background: "rgba(0,0,0,0.55)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: "#fff",
                        fontWeight: 900,
                      }}
                    >
                      ▶ Ver en YouTube
                    </div>
                  </div>
                </a>
              )}
            </div>

            <div className="live-caption">
              <div className="live-caption-title">{latestTitle}</div>

              <div className="live-caption-sub">
                {latestDate ? `Publicado: ${latestDate}` : "Mirá la transmisión en YouTube."}
              </div>

              <div className="live-caption-actions">
                <a className="btn btn-ghost" href={watchUrl} target="_blank" rel="noreferrer">
                  Ver en YouTube →
                </a>
              </div>

              {!canEmbed ? (
                <p className="muted smallHint" style={{ marginTop: 10 }}>
                  Esta transmisión no se puede mostrar embebida por restricciones de YouTube.
                  Abrila con el botón “Ver en YouTube”.
                </p>
              ) : null}

              {loading ? (
                <p className="muted smallHint" style={{ marginTop: 10 }}>
                  Cargando información del canal…
                </p>
              ) : null}
            </div>
          </div>

          <aside className="card live-side">
            <div className="card-inner live-side-inner">
              <div className="live-side-top">
                <p className="kicker">Canal oficial</p>

                <div className="yt-channel">
                  <div className="yt-channel-left">
                    {channelAvatar ? (
                      <img className="yt-avatar" src={channelAvatar} alt={channelTitle} loading="lazy" />
                    ) : (
                      <div className="yt-avatar yt-avatar--fallback" aria-hidden="true" />
                    )}

                    <div className="yt-meta">
                      <div className="yt-name">{channelTitle}</div>

                      <div className="yt-stats">
                        <span>{formatCompact(channelSubs)} suscriptores</span>
                        <span className="yt-dot">•</span>
                        <span>{formatCompact(channelVideos)} videos</span>
                        {loading ? (
                          <>
                            <span className="yt-dot">•</span>
                            <span>Cargando…</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="live-side-text">
                  Encontrá predicaciones completas, transmisiones y playlists con series de prédicas.
                </p>

                <a className="btn btn-full btn-youtube" href={site.links.youtubeChannelUrl} target="_blank" rel="noreferrer">
                  <span className="yt-btn-icon" aria-hidden="true">
                    <svg viewBox="0 0 28 20" width="20" height="20" focusable="false">
                      <path
                        className="yt-icon-rect"
                        d="M27.3 3.1c-.3-1.1-1.2-2-2.3-2.3C23 0.3 14 0.3 14 0.3S5 0.3 3 0.8C1.9 1.1 1 2 0.7 3.1 0.3 5 0.3 10 0.3 10s0 5 .4 6.9c.3 1.1 1.2 2 2.3 2.3 2 .5 11 .5 11 .5s9 0 11-.5c1.1-.3 2-1.2 2.3-2.3.4-1.9.4-6.9.4-6.9s0-5-.4-6.9Z"
                      />
                      <path className="yt-icon-tri" d="M11.2 14.6V5.4L19.3 10l-8.1 4.6Z" />
                    </svg>
                  </span>
                  Abrir canal
                </a>
              </div>

              <div className="divider live-divider" />

              <div className="live-side-bottom">
                <p className="kicker">Más contenido</p>
                <p className="live-side-text">
                  Explorá playlists con series de predicaciones y transmisiones anteriores.
                </p>

                <a className="btn btn-ghost btn-full btn-playlists" href={playlistsUrl} target="_blank" rel="noreferrer">
                  Ver playlists →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}