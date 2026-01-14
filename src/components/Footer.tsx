// igreja-site/src/components/Footer.tsx

import "./Footer.module.css";
import { site } from "@/content/site";

function IconGitHub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.58 2 12.24c0 4.52 2.865 8.353 6.839 9.706.5.096.682-.222.682-.49 0-.242-.009-.883-.014-1.734-2.782.618-3.369-1.37-3.369-1.37-.455-1.178-1.11-1.49-1.11-1.49-.907-.63.069-.617.069-.617 1.003.072 1.531 1.055 1.531 1.055.892 1.561 2.341 1.11 2.91.849.091-.66.35-1.11.636-1.366-2.22-.26-4.555-1.138-4.555-5.064 0-1.118.39-2.032 1.03-2.747-.103-.26-.446-1.307.098-2.726 0 0 .84-.274 2.75 1.05A9.33 9.33 0 0 1 12 7.07c.851.004 1.706.118 2.504.345 1.909-1.324 2.748-1.05 2.748-1.05.546 1.419.203 2.466.1 2.726.64.715 1.028 1.629 1.028 2.747 0 3.936-2.339 4.801-4.566 5.056.359.317.678.943.678 1.901 0 1.372-.012 2.478-.012 2.816 0 .27.18.591.688.49C19.137 20.59 22 16.76 22 12.24 22 6.58 17.523 2 12 2z" />
    </svg>
  );
}

function IconYouTube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 20" aria-hidden="true" focusable="false" {...props}>
      <path
        className="yt-icon-rect"
        d="M27.3 3.1c-.3-1.1-1.2-2-2.3-2.3C23 0.3 14 0.3 14 0.3S5 0.3 3 0.8C1.9 1.1 1 2 0.7 3.1 0.3 5 0.3 10 0.3 10s0 5 .4 6.9c.3 1.1 1.2 2 2.3 2.3 2 .5 11 .5 11 .5s9 0 11-.5c1.1-.3 2-1.2 2.3-2.3.4-1.9.4-6.9.4-6.9s0-5-.4-6.9Z"
      />
      <path className="yt-icon-tri" d="M11.2 14.6V5.4L19.3 10l-8.1 4.6Z" />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      <path d="M17.5 6.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
    </svg>
  );
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.47 1.5-1.47H16.7V5c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.52-4.13 4.32V11H7.5v3h2.57v8h3.43z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="section-wrap">
        <div className="footer-card">
          <div className="footer-inner">
            <div className="footer-grid">
              <div>
                <div className="footer-title">{site.shortName}</div>
                <p className="footer-text">{site.name}</p>
              </div>

              <div>
                <div className="footer-title">Contacto</div>
                <p className="footer-text">{site.location.addressLine}</p>

                {site.links.whatsappUrl ? (
                  <div className="footer-links">
                    <a
                      className="btn btn-ghost"
                      href={site.links.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp →
                    </a>
                  </div>
                ) : null}
              </div>

              <div>
                <div className="footer-title">Redes</div>

                <div className="footer-links">
                  {site.links.youtubeChannelUrl && (
                    <a
                      className="btn btn-social btn-youtube"
                      href={site.links.youtubeChannelUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      title="YouTube"
                    >
                      <span className="social-ico" aria-hidden="true">
                        <IconYouTube className="social-svg" />
                      </span>
                      YouTube
                    </a>
                  )}

                  {site.links.instagramUrl && (
                    <a
                      className="btn btn-social btn-instagram"
                      href={site.links.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <span className="social-ico" aria-hidden="true">
                        <IconInstagram className="social-svg" />
                      </span>
                      Instagram
                    </a>
                  )}

                  {site.links.facebookUrl && (
                    <a
                      className="btn btn-social btn-facebook"
                      href={site.links.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      title="Facebook"
                    >
                      <span className="social-ico" aria-hidden="true">
                        <IconFacebook className="social-svg" />
                      </span>
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {year} {site.shortName}. Todos los derechos reservados.
            </span>

            <div className="footer-bottom-right">
              <span>Hecho con Next.js.</span>

              <a
                className="btn btn-social btn-github"
                href="https://github.com/calebe72"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub del desarrollador"
                title="GitHub: calebe72"
              >
                <span className="social-ico" aria-hidden="true">
                  <IconGitHub className="social-svg" />
                </span>
                <span className="credit-inline">
                  <span className="credit-muted">Desarrollado por</span>
                  <span className="credit-strong">@CalebeRRdev</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}