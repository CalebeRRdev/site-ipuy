// igreja-site/src/components/FaviconThemeSync.tsx
"use client";

import { useEffect } from "react";

const LIGHT = "/images/favicon-light.png";
const DARK = "/images/favicon-dark.png";

function setFavicon(href: string) {
  // remove todos os ícones existentes (evita o browser “pegar o errado”)
  const links = Array.from(
    document.head.querySelectorAll<HTMLLinkElement>(
      'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
    )
  );
  links.forEach((l) => l.parentNode?.removeChild(l));

  // cria os 3 padrões
  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.href = href;
  icon.type = "image/png";

  const shortcut = document.createElement("link");
  shortcut.rel = "shortcut icon";
  shortcut.href = href;
  shortcut.type = "image/png";

  const apple = document.createElement("link");
  apple.rel = "apple-touch-icon";
  apple.href = href;

  document.head.append(icon, shortcut, apple);
}

export default function FaviconThemeSync() {
  useEffect(() => {
    const html = document.documentElement;

    const apply = () => {
      const isDark = html.classList.contains("dark");
      setFavicon(isDark ? DARK : LIGHT);
    };

    apply();

    // observa mudanças de classe (quando você clica no toggle)
    const obs = new MutationObserver(apply);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => obs.disconnect();
  }, []);

  return null;
}