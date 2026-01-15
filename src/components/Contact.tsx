// src/components/Contact.tsx
"use client";

import "./Contact.module.css";
import { useState } from "react";
import { site } from "@/content/site";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== "idle") setStatus("idle");
    if (errorMsg) setErrorMsg("");
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    // valida primeiro
    if (!name || !email || !message || !validateEmail(email)) {
      setStatus("error");
      setErrorMsg("Revisá los campos (nombre, email válido y mensaje).");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website: form.website, // honeypot
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
      const code = data?.error ? String(data.error) : "send_failed";
      throw new Error(code);
      }

      setStatus("ok");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(`No se pudo enviar (${err?.message || "send_failed"}).`);
    } finally {
      setLoading(false);
    }
  }

  const phoneChurch = site?.contact?.phoneChurch ?? "22005532";
  const phonePastor = site?.contact?.phonePastor ?? "098421504";
  const emailChurch = site?.contact?.email ?? "secretaria@ipuy.org.uy";

  return (
    <section id="contacto" className="section">
      <div className="section-wrap">
        <header className="section-header">
          <span className="kicker">Contacto</span>
          <h2 className="section-title">Escribinos</h2>
          <p className="section-lead">
            Si tenés una pregunta, un pedido de oración o querés hablar con nosotros,<br></br>este es el lugar.
          </p>
        </header>

        <div className="contact-grid">
          {/* Info */}
          <div className="card contact-card">
            <div className="card-inner contact-inner">
              <h3 className="contact-title">Información</h3>

              <div className="contact-list" role="list">
                <div className="contact-item" role="listitem">
                  <div className="contact-label">Teléfono (Iglesia)</div>
                  <a className="contact-value" href={`tel:${phoneChurch}`}>
                    {phoneChurch}
                  </a>
                </div>

                <div className="contact-item" role="listitem">
                  <div className="contact-label">Teléfono (Pastor Mauricio)</div>
                  <a className="contact-value" href={`tel:${phonePastor}`}>
                    {phonePastor}
                  </a>
                </div>

                <div className="contact-item" role="listitem">
                  <div className="contact-label">Correo</div>
                  <a className="contact-value" href={`mailto:${emailChurch}`}>
                    {emailChurch}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card contact-card">
            <div className="card-inner contact-inner">
              <h3 className="contact-title">Mensaje</h3>

              <form className="contact-form" onSubmit={onSubmit}>
                {/* honeypot (invisível) */}
                <div className="hp-field" aria-hidden="true">
                  <label>
                    Website
                    <input
                      value={form.website}
                      onChange={(e) => onChange("website", e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <label className="contact-field">
                  <span className="contact-label">Nombre</span>
                  <input
                    className="contact-input"
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                </label>

                <label className="contact-field">
                  <span className="contact-label">Correo electrónico</span>
                  <input
                    className="contact-input"
                    type="email"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="tu@email.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </label>

                <label className="contact-field">
                  <span className="contact-label">Mensaje</span>
                  <textarea
                    className="contact-textarea"
                    value={form.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    placeholder="Escribí tu mensaje…"
                    rows={6}
                  />
                </label>

                {status === "error" ? (
                  <div className="contact-alert" role="alert">
                    {errorMsg || "Revisá los campos."}
                  </div>
                ) : null}

                {status === "ok" ? (
                  <div className="contact-alert contact-alert--ok" role="status">
                    ¡Gracias! Tu mensaje fue enviado.
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={loading}
                >
                  {loading ? "Enviando…" : "Enviar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}