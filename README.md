# Site IPUY — Iglesia Presbiteriana del Uruguay

Site institucional da **Iglesia Presbiteriana del Uruguay (IPUY)**, feito com **Next.js (App Router)**.

**Recursos:**
- Navegação por seções (scroll suave)
- Seção de YouTube (última transmissão) com fallback
- Formulário de contato com envio via SMTP (API Route)

---

## Stack
- Next.js 16 (App Router)
- TypeScript
- CSS Modules
- Nodemailer (rota `/api/contact`)

---

## Rodando localmente

```bash
npm install
npm run dev
```

Abra: http://localhost:3000

---

## Variáveis de ambiente

Crie um arquivo **`.env.local`** na raiz do projeto (não commitar).

### SMTP (formulário de contato)

Exemplo usando Gmail (App Password):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=ipuydeluruguay@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
SMTP_FROM="IPUY Site <ipuydeluruguay@gmail.com>"

# destino do formulário
CONTACT_TO=secretaria@ipuy.org.uy

# opcional (se você estiver usando no route.ts)
CONTACT_CC=
```

### YouTube (se aplicável)

Se a rota `/api/youtube/latest` estiver configurada para buscar a última live via API, adicione também:

```env
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
YOUTUBE_CHANNEL_ID=YOUR_CHANNEL_ID
```

> Em produção (Vercel/Host), configure essas variáveis no painel do provedor. **Não** coloque no GitHub.

---

## Deploy

Recomendado: **Vercel**

1. Importe este repositório na Vercel
2. Vá em **Project → Settings → Environment Variables** e cadastre as variáveis do `.env.local`
3. A cada `git push` na branch `main`, a Vercel faz o deploy automaticamente

---
