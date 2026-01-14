// igreja-site/src/components/Hero.tsx
"use client";

import "./Hero.module.css";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section id="inicio" className="section hero-section">
      <div className="container">
        <div className="card hero-card">
          <div className="hero-glow" />

          <div className="card-inner hero-inner">
            <div className="hero-top">
              {/* ✅ Logo centralizado acima do título (dentro do card) */}
              <img
                src="/images/LOFO%20celeste2.png"
                alt="Logo IPUY"
                width={220}
                height={220}
                className="hero-logo"
                loading="eager"
                decoding="async"
              />

              <span className="chip">Iglesia presbiteriana del Uruguay</span>

              <h1 className="hero-title text-balance">{site.name}</h1>

              <p className="hero-verse">{site.verse.text}</p>
              <p className="hero-ref">{site.verse.reference}</p>
            </div>

            <div className="divider hero-divider" />

            <div className="hero-grid hero-grid--single">
              <div className="card-soft hero-mini hero-mini--welcome">
                <div className="hero-welcome">
                  <div className="hero-welcome__copy">
                    <p className="kicker">¡Bienvenido!</p>

                    <h3 className="hero-mini-title">
                      Muchas gracias por visitar nuestro sitio
                    </h3>

                    <div className="hero-copy">
                      <p className="hero-mini-text">
                        Te invitamos a conocer quiénes somos, en lo que creemos, dónde nos
                        encontramos y también ver todos los sermones en nuestro canal de YouTube.
                      </p>

                      <p className="hero-mini-text">
                        Podés mandarnos un mensaje, pedido de oración o una pregunta en la
                        sección de Contacto.
                      </p>

                      <p className="hero-mini-text">
                        Todo esto fue desarrollado para que podamos servirte de alguna manera
                        y sobre todo para que conozcas a Jesucristo y te conviertas en su
                        discípulo.
                      </p>

                      <p className="hero-mini-hint">
                        ¡Vení a visitarnos! Y esperamos que Dios te bendiga ricamente.
                      </p>
                    </div>

                    <div className="hero-sign hero-sign--inline">
                      <div className="hero-sign-meta">
                        <div className="hero-sign-name">Pastor Mauricio Lopes</div>
                        <div className="hero-sign-role">Iglesia Presbiteriana</div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-welcome__media" aria-hidden="true">
                    <img
                      src="/images/pastor-2.png"
                      alt="Pastor Mauricio Lopes"
                      width={640}
                      height={360}
                      loading="lazy"
                      className="hero-pastor"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-space" />
      </div>
    </section>
  );
}