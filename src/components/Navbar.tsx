// igreja-site/src/components/Navbar.tsx

"use client";

import "./Navbar.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/content/site";

const links = [
  { label: "Inicio", id: "inicio" },
  { label: "Sobre Nosotros", id: "sobre" },
  { label: "Materiales", id: site.resources.sectionId },
  { label: "Ver transmisión", id: "envivo" },
  { label: "Horarios y Actividades", id: "programacion" },
  { label: "Cómo llegar", id: "ubicacion" },
  { label: "Contacto", id: "contacto" },
];

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function getElPaddingTopPx(el: HTMLElement) {
  const v = window.getComputedStyle(el).paddingTop;
  const n = Number.parseFloat(v || "0");
  return Number.isFinite(n) ? n : 0;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  function closeMenu() {
    setOpen(false);
  }

  function toggleMenu() {
    setOpen((v) => !v);
  }

  function scrollToId(
    id: string,
    opts?: { clearHash?: boolean; behavior?: ScrollBehavior }
  ) {
    const behavior = opts?.behavior ?? (prefersReducedMotion() ? "auto" : "smooth");
    const clearHash = opts?.clearHash ?? true;

    closeMenu();

    if (clearHash && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const doScroll = (b: ScrollBehavior) => {
      const el = document.getElementById(id) as HTMLElement | null;
      const nav = navRef.current;
      if (!el || !nav) return;

      const navH = nav.getBoundingClientRect().height;
      const padTop = getElPaddingTopPx(el);
      const gap = 10;

      const target =
        el.getBoundingClientRect().top + window.scrollY + padTop - (navH + gap);

      window.scrollTo({ top: Math.max(0, target), behavior: b });
    };

    // 1) primeiro scroll (bonito)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        doScroll(behavior);

        // 2) correção pós-layout (fonts/animations/images)
        //    faz um "snap" sem animar pra alinhar certinho
        window.setTimeout(() => doScroll("auto"), 450);
        window.setTimeout(() => doScroll("auto"), 950);

        // 3) quando fontes terminarem de carregar, reforça mais uma vez
        //    (isso resolve MUITO o “primeiro clique curto”)
        // @ts-ignore
        const fontsReady: Promise<any> | undefined = (document as any).fonts?.ready;
        if (fontsReady?.then) {
          fontsReady.then(() => doScroll("auto")).catch(() => {});
        }
      });
    });
  }

  // ESC fecha
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ✅ Mantém --nav-h sempre sincronizado com a altura real da navbar
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const setNavVars = () => {
      const h = el.getBoundingClientRect().height || 0;
      document.documentElement.style.setProperty("--nav-h", `${Math.round(h)}px`);
    };

    setNavVars();

    const ro = new ResizeObserver(setNavVars);
    ro.observe(el);

    window.addEventListener("resize", setNavVars);
    window.addEventListener("load", setNavVars);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setNavVars);
      window.removeEventListener("load", setNavVars);
    };
  }, []);

  // trava/destrava scroll do body
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ✅ Se entrar/recarregar com hash (#sobre etc), ajusta a posição corretamente
  useEffect(() => {
    function runHash() {
      const raw = window.location.hash || "";
      const id = raw.replace("#", "").trim();
      if (!id) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToId(id, { clearHash: false, behavior: "auto" });
        });
      });
    }

    runHash();
    window.addEventListener("hashchange", runHash);
    return () => window.removeEventListener("hashchange", runHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const linkHrefs = useMemo(() => links.map((l) => ({ ...l, href: `#${l.id}` })), []);

  return (
    <>
      <header ref={navRef} className="navbar" aria-label="Barra de navegação">
        <div className="navbar-blur">
          <div className="container navbar-row">
            <button
              type="button"
              className="brand"
              onClick={() => scrollToId("inicio")}
              aria-label="Ir al inicio"
              title="Ir al inicio"
            >
              <span className="brand-badge" aria-hidden="true">
                <img
                  src="/images/favicon-site.png"
                  alt=""
                  className="brand-logo"
                  width={38}
                  height={38}
                />
              </span>

              <span className="brand-meta">
                {/* <span className="brand-title">{site.shortName}</span> */}
                {/* <span className="brand-sub">Montevideo</span> */}
              </span>
            </button>

            <nav className="navlinks" aria-label="Secciones">
              {linkHrefs.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  className="navlink"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(l.id, { clearHash: true });
                  }}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className={`navburger ${open ? "is-open" : ""}`}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={toggleMenu}
            >
              <span className="navburger__icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        className={`nav-overlay ${open ? "is-open" : ""}`}
        aria-label="Cerrar menú"
        onClick={closeMenu}
        tabIndex={open ? 0 : -1}
      />

      <aside id="mobile-nav" className={`nav-drawer ${open ? "is-open" : ""}`} aria-label="Menú">
        <div className="nav-drawer__links" role="navigation" aria-label="Secciones">
          {linkHrefs.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className="nav-drawer__link"
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.id, { clearHash: true });
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}