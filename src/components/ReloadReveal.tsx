// igreja-site/src/components/ReloadReveal.tsx
"use client";

import "./ReloadReveal.module.css";
import { useEffect, useState } from "react";

function getNavType():
  | "navigate"
  | "reload"
  | "back_forward"
  | "prerender"
  | "unknown" {
  try {
    const nav = performance.getEntriesByType?.("navigation")?.[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (nav?.type) return nav.type;

    // fallback antigo
    // @ts-ignore
    if (performance?.navigation?.type === 1) return "reload";
    // @ts-ignore
    if (performance?.navigation?.type === 2) return "back_forward";
  } catch {}

  return "unknown";
}

type Phase = "in" | "out" | "gone";

export default function ReloadReveal() {
  const [phase, setPhase] = useState<Phase>("in");

  // ✅ IMPORTANTE: começa igual no server e no client (evita mismatch)
  const [mode, setMode] = useState<"reload" | "normal">("normal");

  // ✅ só começa a animação depois que montou e descobriu o mode
  const [run, setRun] = useState(false);

  useEffect(() => {
    const navType = getNavType();
    const isReload = navType === "reload";
    const nextMode: "reload" | "normal" = isReload ? "reload" : "normal";
    setMode(nextMode);

    // duração do overlay (e a pill vai sincronizada via CSS var)
    const HOLD_MS = isReload ? 1100 : 520;
    const OUT_MS = 520; // casa com transition do .boot

    // ✅ liga a animação no próximo frame (garante que a classe/vars já aplicaram)
    const raf = window.requestAnimationFrame(() => setRun(true));

    const t1 = window.setTimeout(() => setPhase("out"), HOLD_MS);
    const t2 = window.setTimeout(() => setPhase("gone"), HOLD_MS + OUT_MS);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`boot ${phase === "out" ? "boot--out" : ""} ${
        mode === "reload" ? "boot--reload" : ""
      }`}
      data-run={run ? "1" : "0"}
      aria-hidden="true"
    >
      <div className="boot__panel">
        <div className="boot__mark">
          <div className="boot__bar" aria-hidden="true">
            <span className="boot__pill" />
          </div>

          <div className="boot__hint">Cargando…</div>
        </div>
      </div>
    </div>
  );
}