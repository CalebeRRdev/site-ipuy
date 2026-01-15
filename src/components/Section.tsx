// src/components/Section.tsx
import React from "react";

type Props = {
  id?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  children: React.ReactNode;
};

export default function Section({
  id,
  kicker,
  title,
  subtitle,
  align = "center",
  children,
}: Props) {
  const isCenter = align === "center";

  return (
    <section id={id} className="scroll-mt-24 py-10 sm:py-14 lg:py-16 last:pb-6">
      <div className={`mb-6 sm:mb-8 ${isCenter ? "text-center" : "text-left"}`}>
        {kicker ? <p className="kicker">{kicker}</p> : null}

        <h2
          className={[
            "mt-2 text-3xl sm:text-4xl font-semibold tracking-tight",
            "text-[var(--text)]",
          ].join(" ")}
        >
          {title}
        </h2>

        {subtitle ? (
          <p
            className={[
              "mt-3 text-base sm:text-lg",
              "text-[var(--muted)]",
              isCenter ? "mx-auto max-w-2xl" : "max-w-2xl",
            ].join(" ")}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}