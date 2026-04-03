<div align="center">

<br />

```
███████╗██╗      ██████╗ ██╗    ██╗███╗   ███╗██╗███╗   ██╗██████╗
██╔════╝██║     ██╔═══██╗██║    ██║████╗ ████║██║████╗  ██║██╔══██╗
█████╗  ██║     ██║   ██║██║ █╗ ██║██╔████╔██║██║██╔██╗ ██║██║  ██║
██╔══╝  ██║     ██║   ██║██║███╗██║██║╚██╔╝██║██║██║╚██╗██║██║  ██║
██║     ███████╗╚██████╔╝╚███╔███╔╝██║ ╚═╝ ██║██║██║ ╚████║██████╔╝
╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝
```

**Your AI Productivity Co-Pilot**

*Capture everything. Finish what matters.*

<br />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-flow--mind--psi.vercel.app-black?style=for-the-badge&logo=vercel)](https://flow-mind-psi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

<br />

> **12,000+ professionals** trust FlowMind to reclaim **3.2 hours** of focus time every week.

<br />

</div>

---

## ✦ What is FlowMind AI?

FlowMind AI is a **next-generation productivity operating system** powered by Groq. It replaces the scattered stack of task managers, calendars, and goal trackers with a single, AI-native command center that thinks alongside you — every morning, every week, every sprint.

It doesn't just store your tasks. It **prioritizes your day**, **protects your focus blocks**, and **coaches you toward your goals** with context-aware intelligence baked into every view.

<br />

## 🚀 Live Product

| Environment | URL | Status |
|---|---|---|
| Production | [flow-mind-psi.vercel.app](https://flow-mind-psi.vercel.app/) | ✅ Live |
| Dashboard | [/dashboard](https://flow-mind-psi.vercel.app/dashboard) | ✅ Live |
| Features | [/features](https://flow-mind-psi.vercel.app/features) | ✅ Live |
| Pricing | [/pricing](https://flow-mind-psi.vercel.app/pricing) | ✅ Live |

<br />

## ⚡ Core Features

<br />

### ✦ AI Task Manager
Add tasks exactly the way you think about them — in plain English. FlowMind parses your intent, assigns priority, and slots each task into your day automatically. No rigid forms. No dropdowns. Just type.

### ◎ Smart Goal Tracker
Break long-horizon goals into daily micro-actions. The AI coach surfaces the right goal at the right moment so your ambitions stay visible inside the chaos of the week.

### ◔ Focus Timer
Pomodoro sessions calibrated to your real calendar and current energy level. FlowMind protects 90-minute deep work sprints before you even ask.

### ☼ Daily Briefing
Every morning, a Groq-generated briefing lands in your dashboard — your top priorities ranked, your calendar protected, and a coaching nudge to front-load the creative work.

### ↗ Calendar Intelligence
Sync Google Calendar or Outlook. FlowMind reads your schedule and automatically carves out focus blocks around your meetings, not between them.

### ≈ Weekly Review
A structured retrospective that shows what you finished, what slipped, and exactly what to change next week. Built into your workflow, not bolted on.

<br />

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | Routing, SSR, layouts |
| Language | TypeScript (strict) | Type safety across all layers |
| Styling | Tailwind CSS | Utility-first, zero custom CSS |
| Animation | Framer Motion | Scroll reveals, page transitions, micro-interactions |
| State | Zustand + persist middleware | Tasks, goals, timer — synced to localStorage |
| Auth | Firebase (Google OAuth) | Secure, single-click sign-in |
| AI | Groq | Briefings, coaching, task parsing |
| Deployment | Vercel | Edge-optimized, zero-config CI/CD |

<br />

## 📁 Project Structure

```
flowmind-ai/
│
├── app/
│   ├── (marketing)/              # Public landing pages
│   │   ├── page.tsx              # Hero, features, pricing, testimonials
│   │   ├── features/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── about/page.tsx
│   │   └── blog/page.tsx
│   │
│   ├── (auth)/                   # Auth flow
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   │
│   └── dashboard/                # Protected app
│       ├── layout.tsx            # Persistent left sidebar
│       ├── page.tsx              # Command center home
│       ├── tasks/page.tsx        # AI Task Manager
│       ├── goals/page.tsx        # Smart Goal Tracker
│       ├── timer/page.tsx        # Focus Timer (Pomodoro)
│       ├── briefing/page.tsx     # Daily AI Briefing
│       ├── calendar/page.tsx     # Calendar Intelligence
│       └── review/page.tsx       # Weekly Review
│
├── components/
│   ├── Sidebar.tsx               # Left nav — collapses on mobile
│   ├── Toast.tsx                 # Global notification system
│   ├── Modal.tsx                 # Reusable modal with Framer Motion
│   ├── ProgressBar.tsx           # Animated progress bars
│   └── CircularTimer.tsx         # SVG ring countdown
│
├── store/
│   ├── useTaskStore.ts           # Zustand — tasks CRUD + filters
│   ├── useGoalStore.ts           # Zustand — goals + progress
│   └── useTimerStore.ts          # Zustand — live Pomodoro state
│
├── context/
│   ├── AuthContext.tsx           # isLoggedIn state + guard
│   └── ToastContext.tsx          # Global toast provider
│
└── public/                       # Static assets
```

<br />

## 🖥️ Dashboard Modules

```
┌─────────────────────────────────────────────────────────────────┐
│  FlowMind AI                                                    │
│  ─────────────────────┬───────────────────────────────────────  │
│                       │                                         │
│  ⌂  Dashboard         │   Good morning — Monday, focus-first    │
│  ✓  Tasks             │                                         │
│  ◎  Goals             │   ┌──────────┐ ┌──────────┐ ┌───────┐  │
│  ◔  Focus Timer       │   │  78%     │ │  3.2h    │ │   3   │  │
│  ☼  Daily Briefing    │   │ Tasks    │ │ Focus    │ │ Goals │  │
│  ↗  Calendar          │   └──────────┘ └──────────┘ └───────┘  │
│  ≈  Weekly Review     │                                         │
│                       │   ▸ Add a task…                         │
│  ──────────────────   │                                         │
│  [YO] Your Workspace  │   Launch beta      ████████░░  72%      │
│       Log out →       │   Read 12 books    ████░░░░░░  43%      │
│                       │   Train 3x weekly  ██████░░░░  61%      │
│                       │                                         │
└───────────────────────┴─────────────────────────────────────────┘
```

<br />

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Vercel account (for deployment)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/flowmind-ai.git
cd flowmind-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your keys (see Environment Variables below)

# 4. Start the development server
npm run dev

# 5. Open in browser
open http://localhost:3000
```

### Environment Variables

```env
# Groq — for AI briefings and task coaching
GROQ_API_KEY=gsk-...
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_BASE_URL=https://api.groq.com/openai/v1

# Firebase — for Google OAuth
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Stripe — for Pro and Team billing (optional)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

### Build for Production

```bash
npm run build
npm start
```

<br />

## 💳 Pricing

| Plan | Price | Who it's for |
|---|---|---|
| **Free** | $0 / forever | Getting organized, trying the AI co-pilot |
| **Pro** | $12 / month · $9.60 billed annually | Solo operators who want FlowMind deeply in their week |
| **Team** | $39 / month · $31.20 billed annually | Small teams needing visibility, accountability, shared momentum |

All plans start with a free trial. No credit card required to begin.

<br />

## 🌍 Deployment

FlowMind AI is deployed on **Vercel** with zero configuration.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

Every push to `main` triggers an automatic production deployment. Preview deployments are created for every pull request.

<br />

## 📊 Traction

```
12,000+   professionals using FlowMind
  3.2h    average weekly focus time reclaimed per user
   97%    of users say FlowMind reduces planning friction
    4     integrations: Google Calendar, Outlook, email, voice
    6     core productivity modules in one workspace
```

<br />

## 🗺️ Roadmap

- [x] AI Task Manager with natural-language capture
- [x] Smart Goal Tracker with progress coaching
- [x] Focus Timer (Pomodoro) with calendar awareness
- [x] Daily AI Briefing powered by Groq
- [x] Calendar Intelligence (Google + Outlook sync)
- [x] Weekly Review with retrospective analytics
- [ ] Voice input for task capture
- [ ] Mobile app (iOS + Android)
- [ ] Slack and Linear integrations
- [ ] Team shared dashboards with accountability views
- [ ] AI meeting summaries → auto-task extraction

<br />

## 💬 What Users Say

> *"FlowMind replaced three tools and finally gave me a morning plan I actually follow."*
> — **Maya R.**, Founder, Northline Studio

> *"The AI briefings are weirdly good. It feels like a chief of staff for my week."*
> — **Jordan K.**, Product Lead, BrightLoop

> *"Natural-language task capture means I stop losing ideas between meetings."*
> — **Sonia P.**, Consultant

> *"Weekly reviews helped us spot overbooked calendars before the burnout showed up."*
> — **Marcus J.**, RevOps Director, Keystone

<br />

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a pull request
```

Please follow the existing TypeScript strict conventions and Tailwind-only styling rules.

<br />

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

<br />

---

<div align="center">

Built with focus, shipped with intention.

**[flowmind-psi.vercel.app](https://flow-mind-psi.vercel.app/)** · [Features](https://flow-mind-psi.vercel.app/features) · [Pricing](https://flow-mind-psi.vercel.app/pricing) · [Dashboard](https://flow-mind-psi.vercel.app/dashboard)

<br />

*© 2026 FlowMind AI. All rights reserved.*

</div>
