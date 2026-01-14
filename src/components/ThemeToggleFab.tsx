// igreja-site/src/components/ThemeToggleFab.tsx
"use client";

import "./ThemeToggleFab.module.css";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  // 1) prioridade: localStorage
  try {
    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {}

  // 2) fallback: preferência do sistema
  try {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  } catch {}

  return "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement; // <html>
  root.classList.toggle("dark", theme === "dark");
  try {
    window.localStorage.setItem("theme", theme);
  } catch {}
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16h0m0 20h0M4.22 4.22h0m15.56 15.56h0M2 12h0m20 12h0M4.22 19.78h0m15.56-15.56h0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThemeToggleFab() {
  const [theme, setTheme] = useState<Theme>("light");
  const isDark = theme === "dark";

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-fab"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDark ? "Tema claro" : "Tema oscuro"}
    >
      <span className="theme-fab__icon" aria-hidden="true">
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}