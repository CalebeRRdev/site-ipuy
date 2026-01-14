// igreja-site/src/components/ScrollRestore.tsx
"use client";

import { useEffect } from "react";

type NavType = "navigate" | "reload" | "back_forward" | "prerender" | "unknown";

function getNavType(): NavType {
  try {
    const nav = performance.getEntriesByType?.("navigation")?.[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (nav?.type) return nav.type;

    // fallback antigo (Safari mais velho)
    // @ts-ignore
    if (performance?.navigation?.type === 1) return "reload";
    // @ts-ignore
    if (performance?.navigation?.type === 2) return "back_forward";
  } catch {}

  return "unknown";
}

function getNavHeightPx() {
  const nav = document.querySelector(".navbar") as HTMLElement | null;
  return nav?.getBoundingClientRect().height ?? 64;
}

function getSectionPadTopPx() {
  // precisa bater com o seu CSS:
  // .section { padding: 72px 0; } e @media (min-width: 768px) { padding: 92px 0; }
  const isMdUp = window.matchMedia?.("(min-width: 768px)")?.matches ?? false;
  return isMdUp ? 92 : 72;
}

function scrollTopHard() {
  // força em mais de um lugar (alguns browsers são chatos)
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  // @ts-ignore
  document.body && (document.body.scrollTop = 0);
}

function scrollToHashWithOffset(hash: string) {
  const id = hash.replace("#", "");
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const navH = getNavHeightPx();
  const sectionPadTop = getSectionPadTopPx();

  // mesmo raciocínio da sua Navbar: compensa o padding-top da section
  const gap = 1;
  const offset = Math.max(0, navH + gap - sectionPadTop);

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}

export default function ScrollRestore() {
  useEffect(() => {
    // Evita o browser "restaurar" scroll sozinho
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    const navType = getNavType();
    const isReload = navType === "reload";

    const runHardTopSequence = () => {
      // sequência “em ondas” pra vencer restauração tardia
      scrollTopHard();
      requestAnimationFrame(() => scrollTopHard());
      setTimeout(() => scrollTopHard(), 0);
      setTimeout(() => scrollTopHard(), 40);
      setTimeout(() => scrollTopHard(), 120);
    };

    // Em reload: SEMPRE topo, e remove hash (se existir)
    if (isReload) {
      if (window.location.hash) {
        const cleanUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, "", cleanUrl);
      }

      runHardTopSequence();

      // pageshow cobre casos de bfcache/safari
      const onPageShow = () => runHardTopSequence();
      window.addEventListener("pageshow", onPageShow);
      return () => window.removeEventListener("pageshow", onPageShow);
    }

    // Navegação normal:
    const hash = window.location.hash;

    if (!hash) {
      // sem hash -> topo (uma vez basta)
      requestAnimationFrame(() => scrollTopHard());
      return;
    }

    // com hash -> rola pra seção com offset (espera DOM “assentar”)
    const t1 = window.setTimeout(() => scrollToHashWithOffset(hash), 0);
    const t2 = window.setTimeout(() => scrollToHashWithOffset(hash), 80);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return null;
}