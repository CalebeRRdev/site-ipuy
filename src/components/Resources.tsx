// igreja-site/src/components/Resources.tsx
"use client";

import "./Resources.module.css";
import React from "react";
import { site } from "@/content/site";

type ResourceItem = { title: string; href: string };
type ResourceCategory = { key: string; title: string; items: ResourceItem[] };

const CATEGORIES: ResourceCategory[] = [
  {
    key: "salvacion",
    title: "¿Cómo puedo ser salvo?",
    items: [
      {
        title: "El camino de la salvación",
        href: "/resources/salvacion/camino-de-la-salvacion.pdf",
      },
      {
        title: "Salvos solo por gracia",
        href: "/resources/salvacion/salvos-solo-por-gracia.pdf",
      },
      {
        title: "El evangelio",
        href: "/resources/salvacion/el-evangelio.pdf",
      },
    ],
  },
  {
    key: "discipulado",
    title: "Discipulado",
    items: [
      {
        title: "A su imagen",
        href: "/resources/discipulado/a-su-imagen.pdf",
      },
      {
        title: "Fortalezca su fe",
        href: "/resources/discipulado/fortalezca-su-fe.pdf",
      },
      {
        title: "La vida centrada en el evangelio",
        href: "/resources/discipulado/la-vida-centrada-en-el-evangelio.pdf",
      },
      {
        title: "Curso de discipulado",
        href: "/resources/discipulado/curso-de-discipulado.pdf",
      },
    ],
  },
  {
    key: "doctrinas",
    title: "Doctrinas",
    items: [
      {
        title: "Los canones de Dort",
        href: "/resources/doctrinas/los-canones-de-dort.pdf",
      },
      {
        title: "Institución de la religión cristiana",
        href: "/resources/doctrinas/institucion-de-la-religion-cristiana.pdf",
      },
      {
        title: "Confesión de fe de Westminster",
        href: "/resources/doctrinas/confesion-de-fe-de-westminster.pdf",
      },
      {
        title: "Catecismo mayor",
        href: "/resources/doctrinas/catecismo-mayor.pdf",
      },
      {
        title: "Catecismo menor",
        // ⚠️ seu arquivo está com esse nome na pasta: catesismo-menor.pdf
        href: "/resources/doctrinas/catesismo-menor.pdf",
      },
      {
        title: "Catecismo infantil",
        href: "/resources/doctrinas/catecismo-infantil.pdf",
      },
    ],
  },
];

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`materialsChevron ${open ? "isOpen" : ""}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 15.4 5.6 9l1.4-1.4 5 5 5-5L18.4 9z"
      />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
      />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 20h14v-2H5v2Zm7-18v10.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V2h1Z"
      />
    </svg>
  );
}

export default function Resources() {
  // ✅ começa tudo fechado
  const [openKey, setOpenKey] = React.useState<string | null>(null);

  function toggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  return (
    <section id={site.resources.sectionId} className="section">
      <div className="container">
        <header className="section-header">
          <span className="kicker">Materiales</span>
          <h2 className="section-title">Documentos y Lecturas</h2>
        </header>

        <div className="card">
          <div className="card-inner">
            <p className="muted">{site.resources.intro}</p>

            <div className="materialsGrid">
              {CATEGORIES.map((cat) => {
                const isOpen = openKey === cat.key;

                return (
                  <div key={cat.key} className="card-soft">
                    <div className="materialsCardInner">
                      <button
                        type="button"
                        className="materialsCategoryBtn"
                        onClick={() => toggle(cat.key)}
                        aria-expanded={isOpen}
                        aria-controls={`materials-panel-${cat.key}`}
                      >
                        <span>{cat.title}</span>
                        <IconChevron open={isOpen} />
                      </button>

                      {isOpen && (
                        <div
                          id={`materials-panel-${cat.key}`}
                          className="materialsPanel"
                        >
                          <ul className="list materialsList">
                            {cat.items.map((it) => (
                              <li key={it.href} className="muted materialsItem">
                                {/* ✅ título clicável, sem cara de link */}
                                <a
                                  href={it.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="materialsTitleLink"
                                  aria-label={`Abrir ${it.title} en una nueva pestaña`}
                                >
                                  {it.title}
                                </a>

                                <span className="materialsActions">
                                  <a
                                    className="btn btn-ghost materialsActionBtn"
                                    href={it.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Abrir ${it.title} en una nueva pestaña`}
                                  >
                                    <IconExternal />
                                    Abrir
                                  </a>

                                  <a
                                    className="btn btn-ghost materialsActionBtn"
                                    href={it.href}
                                    download
                                    aria-label={`Descargar ${it.title}`}
                                  >
                                    <IconDownload />
                                    Descargar
                                  </a>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* ✅ MINTS (link externo) */}
              <div className="card-soft">
                <div className="materialsMints">
                  <div className="materialsMintsTitle">
                    Biblioteca Reformada MINTS
                  </div>
                  <p className="muted">
                    Accede al Google Drive de la biblioteca MINTS.
                  </p>
                  <a
                    className="btn btn-primary materialsPrimaryBtn"
                    href={site.resources.mintsDriveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconExternal />
                    Abrir biblioteca
                  </a>
                </div>
              </div>
            </div>

            <p className="muted smallHint">
              Tip: puedes abrir el PDF o descargarlo directamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}