// igreja-site/src/components/FaviconThemeSync.tsx
"use client";

import { useEffect } from "react";

const LIGHT = "/images/favicon-light.png";
const DARK = "/images/favicon-dark.png";

type Mode = "light" | "dark";

function detectMode(): Mode {
  const html = document.documentElement;

  if (html.classList.contains("dark")) return "dark";
  if (html.classList.contains("light")) return "light";

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function removeConflictingFavicons() {
  const keepSelector = `[data-favicon-sync="1"]`;

  const nodes = document.head.querySelectorAll<HTMLLinkElement>(
    `link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]`
  );

  nodes.forEach((n) => {
    if (!n.matches(keepSelector)) n.remove();
  });
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
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

  // ✅ garante que não tem “icon” do metadata brigando
  removeConflictingFavicons();

  upsertLink("icon", href, { type: "image/png" });
  upsertLink("shortcut icon", href, { type: "image/png" });
  upsertLink("apple-touch-icon", href);
}

// ✅ Apply ASAP (module evaluation)
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

    const apply = () => applyFavicon(detectMode());

    apply();

    const obs = new MutationObserver(apply);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });

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