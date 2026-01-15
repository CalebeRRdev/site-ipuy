// igreja-site/src/components/About.tsx
"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import React from "react";
import { site } from "@/content/site";
import "./About.module.css";

function splitParagraphs(text?: string) {
  if (!text) return [];
  return text
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);
}

function summarizeBio(bio?: string, maxChars = 340) {
  const paragraphs = splitParagraphs(bio);
  const first = paragraphs[0] ?? "";
  if (first.length <= maxChars) return first;
  return first.slice(0, maxChars).replace(/\s+\S*$/, "") + "…";
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.6 2h8.8A5.6 5.6 0 0 1 22 7.6v8.8A5.6 5.6 0 0 1 16.4 22H7.6A5.6 5.6 0 0 1 2 16.4V7.6A5.6 5.6 0 0 1 7.6 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M17.3 6.9h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 22a10 10 0 1 0-8.66-5l-.96 3.52a1 1 0 0 0 1.23 1.23L7.14 21A10 10 0 0 0 12 22Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.9c.2-.45.4-.47.72-.47h.55c.18 0 .43.07.65.47.23.4.8 1.38.87 1.48.06.1.1.22.02.37-.07.15-.12.25-.25.39-.12.14-.26.31-.37.42-.12.12-.25.26-.1.51.15.25.66 1.09 1.42 1.76.98.87 1.8 1.14 2.06 1.27.25.12.4.1.55-.06.15-.17.63-.73.8-.98.18-.25.35-.21.59-.12.25.1 1.57.74 1.84.87.27.14.45.2.52.31.08.12.08.68-.16 1.34-.25.66-1.44 1.29-2 1.34-.56.05-1.08.25-3.68-.77-3.14-1.23-5.17-4.42-5.32-4.63-.15-.21-1.27-1.7-1.27-3.23 0-1.53.8-2.27 1.08-2.58Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

type LightboxItem = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
};

// ✅ tenta achar WhatsApp em vários nomes e/ou montar link a partir do número
function pickWhatsappUrl(obj: unknown): string | null {
  if (!obj || typeof obj !== "object") return null;
  const c = obj as Record<string, unknown>;

  const raw =
    (typeof c.whatsappUrl === "string" && c.whatsappUrl) ||
    (typeof c.whatsapp === "string" && c.whatsapp) ||
    (typeof c.whatsappLink === "string" && c.whatsappLink) ||
    (typeof c.whatsappPhone === "string" && c.whatsappPhone) ||
    (typeof c.whatsappNumber === "string" && c.whatsappNumber) ||
    (typeof c.phone === "string" && c.phone) ||
    null;

  if (!raw) return null;

  // já é um link?
  if (/^https?:\/\//i.test(raw)) return raw;

  // sanitiza número
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;

  // se veio só o número local (8–9 dígitos), assume DDI do Uruguai (598)
  const normalized = digits.length <= 9 ? `598${digits}` : digits;

  return `https://wa.me/${normalized}`;
}

export default function About() {
  const about = site.about;
  const reformers = site.reformers;

  const intro = about.intro ?? [];
  const purposes = about.purposes ?? [];
  const originText = about.originText ?? [];
  const teachings = about.teachings ?? [];
  const leadersByCity = about.leadersByCity ?? [];
  const reformerItems = reformers?.items ?? [];

  // ✅ Agora vem do site.ts
  const congregations = about.congregations ?? [];

  // ✅ confessionNote com quebra
  const confessionWithBreak =
    (about.confessionNote ?? "").replace(". Al aceptar", ".\n\nAl aceptar") || about.confessionNote;
  const confessionParagraphs = splitParagraphs(confessionWithBreak);

  // ✅ nomes (ordem esquerda → direita)
  const leadersNames = [
    "Pr. Gilberto Santos",
    "Pr. Marcos Paulo Vieira",
    "Pr. Salomão Tavares",
    "Pr. Mauricio Rolim",
    "Diac. Adrian Capurro",
    "Presb. Melvyn Oliveras",
    "Presb. Bruno Muriguenez",
    "Presb. Fabian Romano",
  ];

  // ✅ Lightbox state
  const [lightbox, setLightbox] = React.useState<LightboxItem | null>(null);

  React.useEffect(() => {
    if (!lightbox) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => setIsMounted(true), []);

  function openLightbox(item: LightboxItem) {
    setLightbox(item);
  }

  const [activeKey, setActiveKey] = React.useState<string>(reformerItems[0]?.key ?? "luther");

  const activeIndex = Math.max(0, reformerItems.findIndex((r) => r.key === activeKey));
  const active = reformerItems[activeIndex] ?? reformerItems[0];

  const [expanded, setExpanded] = React.useState(false);
  const reformersTopRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => setExpanded(false), [activeKey]);

  function goPrev() {
    const nextIndex = (activeIndex - 1 + reformerItems.length) % reformerItems.length;
    setActiveKey(reformerItems[nextIndex].key);
  }

  function goNext() {
    const nextIndex = (activeIndex + 1) % reformerItems.length;
    setActiveKey(reformerItems[nextIndex].key);
  }

  function handleCollapse() {
    setExpanded(false);
    window.setTimeout(() => {
      reformersTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  // ✅ Corrige duplicação do texto: mostra preview + resto (sem repetir o começo)
  const fullBio = active?.bio ?? "";
  const preview = summarizeBio(fullBio, 340);
  const previewPlain = preview.endsWith("…") ? preview.slice(0, -1) : preview; // remove "…" pra casar melhor
  const restRaw =
    fullBio && previewPlain && fullBio.startsWith(previewPlain)
      ? fullBio.slice(previewPlain.length).trimStart()
      : fullBio; // fallback seguro
  const restParagraphs = splitParagraphs(restRaw);

  return (
    <section id={about.sectionId} className="section">
      {/* ✅ Lightbox (Portal para o <body>) */}
      {isMounted &&
        lightbox &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setLightbox(null);
            }}
          >
            <button
              type="button"
              className="lightboxClose"
              onClick={() => setLightbox(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div className="lightboxInner" onMouseDown={(e) => e.stopPropagation()}>
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={1800}
                height={1200}
                className="lightboxImg"
                priority
              />
              {lightbox.caption ? (
                <div className="lightboxCaption muted">{lightbox.caption}</div>
              ) : null}
            </div>
          </div>,
          document.body
        )}

      <div className="container">
        <header className="section-header">
          <span className="kicker">Sobre / Nosotros</span>
          <h2 className="section-title">{about.title}</h2>
        </header>

        {/* ✅ Intro + logo */}
        <div className="card">
          <div className="card-inner aboutIntroCard">
            <div className="aboutLogoWrap">
              <Image
                src={about.logoImageSrc}
                alt={about.logoImageAlt}
                width={220}
                height={220}
                className="aboutLogo"
                priority
              />
            </div>

            <div className="aboutIntroText">
              {intro.map((p) => (
                <p key={p} className="muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Purposes */}
        <div className="aboutBlock">
          <div className="card">
            <div className="card-inner">
              <h3 className="block-title">{about.purposesTitle}</h3>

              <div className="grid grid-3">
                {purposes.map((item) => (
                  <div key={item.title} className="card-soft purposeCard">
                    <div className="purposeInner">
                      <h4 className="purposeTitle">{item.title}</h4>
                      <p className="muted">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Origen */}
        <div className="aboutBlock">
          <div className="card">
            <div className="card-inner">
              <h3 className="block-title">{about.originTitle}</h3>
              <div className="stack">
                {originText.map((p) => (
                  <p key={p} className="muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Teachings */}
        <div className="aboutBlock">
          <div className="card">
            <div className="card-inner">
              <h3 className="block-title">{about.teachingsTitle}</h3>

              <ul className="list">
                {teachings.map((t) => (
                  <li key={t} className="muted">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="stack">
                {confessionParagraphs.map((p, idx) => (
                  <p key={idx} className="muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Leadership + foto geral */}
        <div className="aboutBlock">
          <div className="card">
            <div className="card-inner">
              <h3 className="block-title leadersTitle">{about.leadershipTitle}</h3>

              <figure className="leadersPhoto">
                <div className="leadersPhotoFrame">
                  <button
                    type="button"
                    className="leadersPhotoBtn"
                    onClick={() =>
                      openLightbox({
                        src: "/images/lideres.jpeg",
                        alt: "Líderes de las congregaciones (IPUY)",
                        caption: (
                          <>
                            <div>
                              Líderes (de todas las congregaciones) — Iglesia Presbiteriana del Uruguay.
                            </div>
                            <div className="leadersPhotoNames">{leadersNames.join(", ")}</div>
                          </>
                        ),
                      })
                    }
                    aria-label="Abrir foto de líderes"
                  >
                    <Image
                      src="/images/lideres.jpeg"
                      alt="Líderes de las congregaciones (IPUY)"
                      width={1600}
                      height={900}
                      className="leadersPhotoImg leadersPhotoImg--small"
                      priority={false}
                    />
                  </button>
                </div>

                <figcaption className="muted leadersPhotoCaption">
                  <div>Líderes (de todas las congregaciones) — Iglesia Presbiteriana del Uruguay.</div>
                  <div className="leadersPhotoNames">{leadersNames.join(", ")}</div>
                </figcaption>
              </figure>

              <div className="grid grid-2 leadersGrid">
                {leadersByCity.map((c) => (
                  <div key={c.city} className="card-soft leaderCard">
                    <div className="leaderInner">
                      <h4 className="leaderTitle">{c.city}</h4>
                      <ul className="list compact">
                        {(c.names ?? []).map((n) => (
                          <li key={n} className="muted">
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Congregaciones */}
        <div className="aboutBlock">
          <div className="card">
            <div className="card-inner">
              <h3 className="block-title">Congregaciones</h3>
              <p className="muted">Fotos de cada iglesia y enlace directo a su Instagram y Whatsapp.</p>

              <div className="congregationsGrid">
                {congregations.map((c) => {
                  const waUrl = pickWhatsappUrl(c);
                  const hasWhatsapp = Boolean(waUrl);

                  return (
                    <div key={c.key} className="congregationCard">
                      <div className="congregationMedia">
                        <button
                          type="button"
                          className="congregationImgBtn"
                          onClick={() =>
                            openLightbox({
                              src: c.imageSrc,
                              alt: `Iglesia en ${c.title}`,
                              caption: (
                                <>
                                  <div className="lightboxTitle">{c.title}</div>
                                  <div className="muted">{c.note}</div>

                                  <div className="congregationActions" style={{ marginTop: 10 }}>
                                    <a
                                      className="igBtn igBtn--small"
                                      href={c.instagramUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <InstagramIcon />
                                      Instagram
                                    </a>

                                    {hasWhatsapp ? (
                                      <a
                                        className="waBtn waBtn--small"
                                        href={waUrl!}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`WhatsApp - ${c.title}`}
                                      >
                                        <WhatsAppIcon />
                                        WhatsApp
                                      </a>
                                    ) : null}
                                  </div>
                                </>
                              ),
                            })
                          }
                          aria-label={`Abrir foto - ${c.title}`}
                        >
                          <Image
                            src={c.imageSrc}
                            alt={`Iglesia en ${c.title}`}
                            width={1400}
                            height={900}
                            className="congregationImg"
                          />
                        </button>
                      </div>

                      <div className="congregationBody">
                        <div className="congregationTop">
                          <h4 className="congregationTitle">{c.title}</h4>

                          <div className="congregationActions">
                            <a
                              className="igBtn igBtn--small"
                              href={c.instagramUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Instagram - ${c.title}`}
                            >
                              <InstagramIcon />
                              Instagram
                            </a>

                            {hasWhatsapp ? (
                              <a
                                className="waBtn waBtn--small"
                                href={waUrl!}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`WhatsApp - ${c.title}`}
                              >
                                <WhatsAppIcon />
                                WhatsApp
                              </a>
                            ) : null}
                          </div>
                        </div>

                        <p className="muted">{c.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Reformadores */}
        <div className="aboutBlock">
          <div className="card">
            <div className="card-inner">
              <h3 className="block-title">{reformers.title}</h3>
              <p className="muted">{reformers.subtitle}</p>

              <div
                ref={reformersTopRef}
                className="reformersShell"
                role="tablist"
                aria-label="Reformadores"
              >
                <div className="reformersTabs">
                  {reformerItems.map((r) => {
                    const isActive = r.key === activeKey;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        className={`reformersTab ${isActive ? "isActive" : ""}`}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`reformer-panel-${r.key}`}
                        id={`reformer-tab-${r.key}`}
                        onClick={() => setActiveKey(r.key)}
                      >
                        {r.name}
                      </button>
                    );
                  })}

                  <div className="reformersArrows" aria-hidden="false">
                    <button
                      type="button"
                      className="reformersArrow"
                      onClick={goPrev}
                      aria-label="Anterior"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="reformersArrow"
                      onClick={goNext}
                      aria-label="Siguiente"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div
                  className="reformerPanel"
                  role="tabpanel"
                  id={`reformer-panel-${active?.key}`}
                  aria-labelledby={`reformer-tab-${active?.key}`}
                  key={active?.key}
                >
                  <div className="reformerMedia">
                    <Image
                      src={active?.imageSrc}
                      alt={active?.name ?? "Reformador"}
                      width={220}
                      height={220}
                      className="reformerImg"
                      priority={false}
                    />
                  </div>

                  <div className="reformerBody">
                    <div className="reformerMeta">
                      <span className="chip">Reforma Protestante</span>
                    </div>

                    {/* ✅ Preview */}
                    <p className="reformerSummary">{preview}</p>

                    {!expanded && (
                      <button
                        type="button"
                        className="btn btn-ghost reformersMoreBtn"
                        onClick={() => setExpanded(true)}
                      >
                        Leer más
                      </button>
                    )}

                    {/* ✅ Expansão mostra só o restante (sem duplicar início) */}
                    {expanded && (
                      <div className="reformerFull">
                        <div className="detailsBody">
                          {restParagraphs.map((p, i) => (
                            <p key={i} className="muted">
                              {p}
                            </p>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="btn btn-ghost reformersLessBtn"
                          onClick={handleCollapse}
                        >
                          Leer menos...
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="muted smallHint"><strong>Tip:</strong><br></br> puedes cambiar entre reformadores usando las pestañas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}