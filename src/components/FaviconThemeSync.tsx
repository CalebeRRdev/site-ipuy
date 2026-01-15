// igreja-site/src/components/FaviconThemeSync.tsx
"use client";

import { useEffect } from "react";

const LIGHT = "/images/favicon-light.png";
const DARK = "/images/favicon-dark.png";

type Mode = "light" | "dark";

function detectMode(): Mode {
  const html = document.documentElement;

  // Prefer next-themes classes when present
  if (html.classList.contains("dark")) return "dark";
  if (html.classList.contains("light")) return "light";

  // Fallback: system preference
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  // Only manage links created/managed by this component
  const selector = `link[rel="${rel}"][data-favicon-sync="1"]`;
  let link = document.head.querySelector<HTMLLinkElement>(selector);

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    link.setAttribute("data-favicon-sync", "1");
    document.head.appendChild(link);
  }

  link.href = href;
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      link.setAttribute(k, v);
    }
  }
}

function applyFavicon(mode: Mode) {
  const href = mode === "dark" ? DARK : LIGHT;

  upsertLink("icon", href, { type: "image/png" });
  upsertLink("shortcut icon", href, { type: "image/png" });
  upsertLink("apple-touch-icon", href);
}

// ✅ Apply ASAP (module evaluation) so it updates before first interaction
if (typeof document !== "undefined") {
  try {
    applyFavicon(detectMode());
  } catch {
    // ignore
  }
}

export default function FaviconThemeSync() {
  useEffect(() => {
    const html = document.documentElement;

    const apply = () => {
      applyFavicon(detectMode());
    };

    // Apply once on mount too
    apply();

    // Watch theme class changes
    const obs = new MutationObserver(apply);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });

    // Also react to OS theme changes when user uses "system"
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMq = () => apply();
    mq?.addEventListener?.("change", onMq);

    return () => {
      obs.disconnect();
      mq?.removeEventListener?.("change", onMq);
    };
  }, []);

  return null;
}