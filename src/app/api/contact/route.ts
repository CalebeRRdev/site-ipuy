// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function jsonOk() {
  return NextResponse.json({ ok: true });
}

function jsonErr(error: string, status = 500, extra?: Record<string, unknown>) {
  const safe =
    process.env.NODE_ENV === "production"
      ? { ok: false, error }
      : { ok: false, error, ...(extra ?? {}) };

  return NextResponse.json(safe, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const website = String(body?.website ?? "").trim(); // honeypot

    // honeypot → finge sucesso (anti-bot)
    if (website) return jsonOk();

    if (!name || !email || !message || !isValidEmail(email)) {
      return jsonErr("invalid_fields", 400);
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? "587");
    const secure =
      process.env.SMTP_SECURE !== undefined
        ? String(process.env.SMTP_SECURE) === "true"
        : port === 465;

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    // ✅ TO fixo (obrigatório)
    const to = process.env.CONTACT_TO;

    // ✅ FROM: ideal ser do mesmo Gmail do SMTP_USER
    const from = process.env.SMTP_FROM ?? (user ? `IPUY Site <${user}>` : "");

    if (!host || !user || !pass || !to || !from) {
      return jsonErr("missing_smtp_env", 500, {
        missing: {
          SMTP_HOST: !host,
          SMTP_USER: !user,
          SMTP_PASS: !pass,
          CONTACT_TO: !to,
          SMTP_FROM: !from,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true p/ 465 | false p/ 587
      auth: { user, pass },

      // 587 normalmente usa STARTTLS (secure=false + requireTLS=true)
      requireTLS: !secure,

      tls: {
        servername: host,
        rejectUnauthorized:
          process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "false" ? false : true,
      },

      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    // Diagnóstico: verifica conexão/auth antes de tentar enviar
    await transporter.verify();

    await transporter.sendMail({
      from,          // ex: "IPUY Site <ipuydeluruguay@gmail.com>"
      to,            // ✅ sempre secretaria@ipuy.org.uy (CONTACT_TO)
      cc: user,      // ✅ cópia pro Gmail autenticado (ipuydeluruguay@gmail.com)

      replyTo: email, // responder vai pro visitante
      sender: user,   // ajuda em alguns casos

      subject: `Contacto — ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}\n`,
    });

    return jsonOk();
  } catch (err: any) {
    console.error("CONTACT API ERROR:", {
      name: err?.name,
      code: err?.code,
      message: err?.message,
      command: err?.command,
      response: err?.response,
      responseCode: err?.responseCode,
      stack: err?.stack,
    });

    const code = String(err?.code ?? "");
    if (code === "EAUTH") return jsonErr("smtp_auth_failed", 500, { code });
    if (code === "ECONNECTION") return jsonErr("smtp_connection_failed", 500, { code });
    if (code === "ETIMEDOUT") return jsonErr("smtp_timeout", 500, { code });

    return jsonErr("send_failed", 500, { code, message: err?.message });
  }
}