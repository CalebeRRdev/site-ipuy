// igreja-site/src/components/Schedule.tsx
"use client";

import "./Schedule.module.css";
import { site } from "@/content/site";
import React from "react";

type ScheduleItem = { day: string; time: string; title: string };

function pickItemsForCongregation(g: {
  items?: ScheduleItem[];
  variants?: Array<{
    key: string;
    label: string;
    dateRange?: { from: string; to: string };
    items: ScheduleItem[];
  }>;
}) {
  // hoje usamos items fixos
  if (g.items?.length) return { items: g.items };

  // fallback
  return { items: site.schedule ?? [] };
}

// Converte: "1er" -> "1" + <sup>er</sup>, etc.
function renderDayWithSuperscript(day: string) {
  const re = /(\d+)(er|do|ro|to)\b/g;
  const parts: React.ReactNode[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(day)) !== null) {
    const [full, num, suffix] = match;
    const start = match.index;
    const end = start + full.length;

    if (start > lastIndex) parts.push(day.slice(lastIndex, start));

    parts.push(
      <span key={`${start}-${end}`}>
        {num}
        <sup className="ordinalSup">{suffix}</sup>
      </span>
    );

    lastIndex = end;
  }

  if (lastIndex < day.length) parts.push(day.slice(lastIndex));

  return parts.length ? <>{parts}</> : day;
}

export default function Schedule() {
  const groups = site.schedulesByCongregation ?? [];

  return (
    <section id="programacion" className="section">
      <div className="container">
        <header className="section-header">
          <p className="kicker">HORARIOS</p>
          <h2 className="section-title">Programación</h2>
          <p className="section-lead">Reuniones semanales para adorar, aprender y compartir.</p>
        </header>

        <div className="scheduleCardsGrid">
          {groups.map((g) => {
            const picked = pickItemsForCongregation(g);

            return (
              <div key={g.key} className="card">
                <div className="card-inner">
                  <div className="scheduleCardHead">
                    <div>
                      <div className="kicker">IGLESIA EN</div>
                      <h3 className="scheduleCardTitle">{g.title}</h3>
                    </div>

                    <div className="chip">IPUY</div>
                  </div>

                  <div className="divider scheduleDivider" />

                  <div className="schedule-grid">
                    {picked.items.map((s) => (
                      <div key={`${g.key}-${s.day}-${s.time}-${s.title}`} className="schedule-item">
                        <div>
                          <div className="schedule-day">{renderDayWithSuperscript(s.day)}</div>
                          <div className="schedule-title">{s.title}</div>
                        </div>
                        <div className="schedule-time">{s.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}