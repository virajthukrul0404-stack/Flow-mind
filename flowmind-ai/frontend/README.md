# FlowMind AI

FlowMind AI is a full-stack Next.js 14 SaaS starter for an AI-powered personal productivity assistant. It includes:

- A responsive marketing site with hero, features, testimonials, pricing, FAQ, CTA, and footer
- Google-only authentication via Firebase Authentication
- A protected-style dashboard shell with overview, tasks, goals, calendar, AI chat, analytics, and settings
- Demo-ready API routes for tasks, goals, AI chat streaming, analytics, auth, Stripe, and Razorpay
- A Prisma schema for PostgreSQL-backed production data when you are ready to add persistence
- Vitest and Playwright scaffolding

## Stack

- Next.js 14 + App Router + TypeScript
- Tailwind CSS
- React Query
- Prisma + PostgreSQL schema
- Firebase Authentication + Firebase Admin session cookies
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
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_SERVICE_ACCOUNT_KEY` (optional alternative to the three server vars above)
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
flowmind-ai/frontend
```

Use this build command in Vercel:

```bash
npm run vercel-build
```

Set the following production environment variables in Vercel:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
  or `FIREBASE_SERVICE_ACCOUNT_KEY`
- `DATABASE_URL` (optional unless you want Prisma-backed persistence right now)
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

## Firebase Auth Setup

1. Create a Firebase project and register a Web App for FlowMind.
2. In Firebase Console, open `Authentication` -> `Sign-in method`.
3. Enable `Google`.
4. In `Authentication` -> `Settings`, add your local and production domains to `Authorized domains`.
5. In `Project settings` -> `General`, copy the web config values into your `NEXT_PUBLIC_FIREBASE_*` variables.
6. In `Project settings` -> `Service accounts`, generate a private key for Firebase Admin.
7. Put the service account values into `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`, or store the whole JSON in `FIREBASE_SERVICE_ACCOUNT_KEY`.

## Notes

- Authentication is Google-only through Firebase Authentication.
- The app uses Firebase Admin session cookies on the server, so login/signup stays protected on server-rendered dashboard routes.
- AI and payment surfaces are intentionally hidden behind `NEXT_PUBLIC_ENABLE_AI` and `NEXT_PUBLIC_ENABLE_PAYMENTS` until your production keys are ready.
- Keep both flags set to `false` for a safe launch state, then flip them to `true` when you want AI chat and billing to go live.
- The dashboard uses local seed data for a working demo while backend persistence is being wired to Prisma.
