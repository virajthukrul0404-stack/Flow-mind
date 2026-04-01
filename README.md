# FlowMind AI

FlowMind AI is a full-stack Next.js 14 SaaS starter for an AI-powered personal productivity assistant. It includes:

- A responsive marketing site with hero, features, testimonials, pricing, FAQ, CTA, and footer
- Google-only authentication via NextAuth.js
- A protected-style dashboard shell with overview, tasks, goals, calendar, AI chat, analytics, and settings
- Demo-ready API routes for tasks, goals, AI chat streaming, analytics, auth, Stripe, and Razorpay
- A Prisma schema for PostgreSQL-backed production data when you are ready to add persistence
- Vitest and Playwright scaffolding

## Stack

- Next.js 14 + App Router + TypeScript
- Tailwind CSS
- React Query
- Prisma + PostgreSQL schema
- NextAuth.js + Google OAuth
- OpenAI SDK for chat/briefing helpers
- Stripe SDK
- Razorpay SDK
- Recharts
- dnd-kit

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Run tests:

```bash
npm test
```

5. Create a production build:

```bash
npm run build
```

## Environment Variables

Set the following in `.env.local`:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_ENABLE_AI`
- `NEXT_PUBLIC_ENABLE_PAYMENTS`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `DATABASE_URL` (optional for the current Google-auth demo deployment)
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RESEND_API_KEY`

## Database

Generate the Prisma client and run migrations after adding a real `DATABASE_URL`:

```bash
npm run prisma:generate
npm run prisma:migrate
```

## Vercel Deployment

This repo is nested, so set the Vercel project Root Directory to:

```bash
flowmind-ai
```

Use this build command in Vercel:

```bash
npm run vercel-build
```

Set the following production environment variables in Vercel:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `DATABASE_URL` (optional unless you want Prisma-backed persistence right now)
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

For Google OAuth, add these Authorized redirect URIs in Google Cloud:

- `http://localhost:3000/api/auth/callback/google`
- `https://YOUR_VERCEL_DOMAIN/api/auth/callback/google`

## Notes

- Authentication is Google-only through NextAuth.js.
- Authentication now uses JWT sessions, so Google sign-in does not depend on Postgres for the current deployment.
- AI and payment surfaces are intentionally hidden behind `NEXT_PUBLIC_ENABLE_AI` and `NEXT_PUBLIC_ENABLE_PAYMENTS` until your production keys are ready.
- Keep both flags set to `false` for a safe launch state, then flip them to `true` when you want AI chat and billing to go live.
- The dashboard uses local seed data for a working demo while backend persistence is being wired to Prisma.
