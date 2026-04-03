import { addDays, addHours, startOfDay, subDays } from "date-fns";

import type {
  CalendarEvent,
  ChatMessage,
  FaqItem,
  Feature,
  FocusPoint,
  Goal,
  PricingPlan,
  Task,
  Testimonial,
  Viewer
} from "@/lib/types";

const today = startOfDay(new Date());

export const viewer: Viewer = {
  id: "demo-user",
  name: "Avery Chen",
  email: "avery@flowmind.ai",
  plan: "PRO"
};

export const heroStats = [
  "Trusted by 12,000+ professionals",
  "3.2h average weekly focus time reclaimed",
  "97% say FlowMind reduces planning friction"
];

export const features: Feature[] = [
  {
    icon: "✦",
    title: "AI Task Manager",
    description: "Add tasks by typing like you talk and let FlowMind turn it into a plan.",
    accent: "from-brand-500/20 to-brand-100"
  },
  {
    icon: "◎",
    title: "Smart Goal Tracker",
    description: "Break ambitious goals into daily actions with context-aware coaching.",
    accent: "from-accent-500/20 to-accent-100"
  },
  {
    icon: "◔",
    title: "Focus Timer",
    description: "Launch Pomodoro sessions tuned to your real calendar and current energy.",
    accent: "from-sky-500/20 to-cyan-100"
  },
  {
    icon: "☼",
    title: "Daily Briefing",
    description: "Start every morning with an AI-generated summary of your priorities.",
    accent: "from-amber-400/20 to-orange-100"
  },
  {
    icon: "↗",
    title: "Calendar Intelligence",
    description: "Sync Google or Outlook and let AI protect time for the work that matters.",
    accent: "from-emerald-500/20 to-emerald-100"
  },
  {
    icon: "≈",
    title: "Weekly Review",
    description: "See what helped, what slipped, and what to change next week.",
    accent: "from-pink-500/20 to-rose-100"
  }
];

export const howItWorks = [
  {
    step: "01",
    title: "Connect",
    description: "Link your calendar, email, and favorite tools in a guided 3-minute setup."
  },
  {
    step: "02",
    title: "Tell FlowMind",
    description: "Type or speak your tasks and goals in plain language, no rigid forms required."
  },
  {
    step: "03",
    title: "Get Things Done",
    description: "FlowMind prioritizes the day, protects focus blocks, and keeps you moving."
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Maya R.",
    title: "Founder",
    company: "Northline Studio",
    quote: "FlowMind replaced three tools and finally gave me a morning plan I actually follow.",
    rating: 5
  },
  {
    name: "Jordan K.",
    title: "Product Lead",
    company: "BrightLoop",
    quote: "The AI briefings are weirdly good. It feels like a chief of staff for my week.",
    rating: 5
  },
  {
    name: "Sonia P.",
    title: "Consultant",
    company: "Independent",
    quote: "Natural-language task capture means I stop losing ideas between meetings.",
    rating: 5
  },
  {
    name: "Leo T.",
    title: "COO",
    company: "SummitOps",
    quote: "Our team uses the dashboards every Monday to align on priorities and blockers.",
    rating: 5
  },
  {
    name: "Alina W.",
    title: "Design Manager",
    company: "Signal Works",
    quote: "The goal tracker keeps long-term work visible without feeling like homework.",
    rating: 4
  },
  {
    name: "Marcus J.",
    title: "RevOps Director",
    company: "Keystone",
    quote: "Weekly reviews helped us spot overbooked calendars before the burnout showed up.",
    rating: 5
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    periodLabel: "forever",
    description: "For getting organized and trying the AI co-pilot.",
    features: ["10 tasks/day", "Basic AI chat", "1 goal tracker", "Email support"],
    cta: "Start Free"
  },
  {
    name: "Pro",
    monthlyPrice: 12,
    annualPrice: 10,
    periodLabel: "per month",
    description: "For solo operators who want FlowMind deeply involved in their week.",
    features: [
      "Unlimited tasks",
      "Groq AI chat",
      "Unlimited goals",
      "Calendar sync",
      "Daily briefings",
      "Priority support"
    ],
    cta: "Start Pro Trial",
    highlight: true
  },
  {
    name: "Team",
    monthlyPrice: 39,
    annualPrice: 31,
    periodLabel: "per month",
    description: "For small teams that need visibility, accountability, and shared momentum.",
    features: [
      "Everything in Pro",
      "Up to 10 members",
      "Team dashboards",
      "Analytics",
      "Admin controls",
      "Dedicated support"
    ],
    cta: "Contact Sales"
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "Does FlowMind replace my task manager?",
    answer:
      "It can. FlowMind handles capture, prioritization, planning, and follow-through in one interface, while also syncing with your calendar."
  },
  {
    question: "Can I connect Google Calendar and Outlook?",
    answer:
      "Yes. The platform is designed for two-way calendar sync so AI can protect time and reschedule around real meetings."
  },
  {
    question: "How does the AI know what to recommend?",
    answer:
      "It uses the context you provide, including tasks, goals, deadlines, and calendar events, to suggest the next best action."
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Workspace data is isolated per account, API keys stay server-side, and we encourage production deployments with audited providers."
  },
  {
    question: "Do you support teams?",
    answer:
      "The Team plan adds shared dashboards, workload visibility, and admin controls for up to 10 teammates."
  },
  {
    question: "Can I use voice input?",
    answer:
      "Yes. The AI chat interface supports browser speech recognition for quick capture and planning."
  },
  {
    question: "Do I need to set up Stripe before testing?",
    answer:
      "No. Billing endpoints gracefully fall back to demo responses until live Stripe keys are added."
  },
  {
    question: "What happens if Groq keys are missing?",
    answer:
      "The app falls back to deterministic demo responses so the experience still works locally while you wire in production keys."
  }
];

export const blogPosts = [
  {
    title: "The New Personal Ops Stack",
    excerpt: "Why AI assistants are replacing fragmented productivity workflows.",
    category: "Strategy",
    readTime: "4 min read"
  },
  {
    title: "Designing Days Around Energy, Not Just Time",
    excerpt: "A practical framework for matching focus blocks to your most demanding work.",
    category: "Habits",
    readTime: "6 min read"
  },
  {
    title: "How Teams Use Weekly Reviews Without Micromanaging",
    excerpt: "A template for reflective accountability that still respects deep work.",
    category: "Teams",
    readTime: "5 min read"
  }
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Finish Q2 planning deck",
    description: "Wrap the narrative and share with leadership before Friday.",
    status: "IN_PROGRESS",
    priority: "high",
    dueDate: addDays(today, 2).toISOString(),
    tags: ["work", "strategy"],
    estimatedMinutes: 120,
    aiSuggestion: "Draft the riskiest slide first while your energy is highest."
  },
  {
    id: "task-2",
    title: "Book dentist appointment",
    status: "TODO",
    priority: "medium",
    dueDate: addDays(today, 4).toISOString(),
    tags: ["life"],
    estimatedMinutes: 15,
    aiSuggestion: "Call right after lunch when local offices reopen."
  },
  {
    id: "task-3",
    title: "Reply to onboarding candidate",
    status: "DONE",
    priority: "low",
    dueDate: subDays(today, 1).toISOString(),
    tags: ["team"],
    estimatedMinutes: 10
  },
  {
    id: "task-4",
    title: "Prepare workshop agenda",
    status: "TODO",
    priority: "urgent",
    dueDate: addHours(today, 30).toISOString(),
    tags: ["facilitation", "work"],
    estimatedMinutes: 60,
    aiSuggestion: "Turn this into a two-part checklist and delegate speaker prep."
  },
  {
    id: "task-5",
    title: "Review expense report",
    status: "IN_PROGRESS",
    priority: "medium",
    dueDate: addDays(today, 1).toISOString(),
    tags: ["ops"],
    estimatedMinutes: 25
  }
];

export const goals: Goal[] = [
  {
    id: "goal-1",
    title: "Launch the AI productivity beta",
    description: "Ship onboarding, billing, and reporting for the first 100 users.",
    category: "career",
    targetDate: addDays(today, 28).toISOString(),
    progress: 72,
    streak: 11,
    aiCoachingEnabled: true,
    milestones: [
      { id: "m1", title: "Finalize onboarding flow", completed: true, order: 1 },
      { id: "m2", title: "Ship billing checkout", completed: true, order: 2 },
      { id: "m3", title: "Run beta onboarding calls", completed: false, order: 3 },
      { id: "m4", title: "Launch reporting dashboard", completed: false, order: 4 }
    ]
  },
  {
    id: "goal-2",
    title: "Read 12 books this year",
    description: "Create a sustainable reading habit before bed.",
    category: "personal",
    targetDate: addDays(today, 90).toISOString(),
    progress: 43,
    streak: 8,
    aiCoachingEnabled: true,
    milestones: [
      { id: "m5", title: "Choose a quarterly reading list", completed: true, order: 1 },
      { id: "m6", title: "Read 20 minutes each weeknight", completed: false, order: 2 },
      { id: "m7", title: "Finish current nonfiction title", completed: false, order: 3 }
    ]
  },
  {
    id: "goal-3",
    title: "Strength train 3x weekly",
    description: "Build consistency with short but structured sessions.",
    category: "health",
    targetDate: addDays(today, 45).toISOString(),
    progress: 61,
    streak: 5,
    aiCoachingEnabled: false,
    milestones: [
      { id: "m8", title: "Lock gym blocks into calendar", completed: true, order: 1 },
      { id: "m9", title: "Complete three sessions this week", completed: false, order: 2 },
      { id: "m10", title: "Track weight progression", completed: false, order: 3 }
    ]
  }
];

export const focusData: FocusPoint[] = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.1 },
  { day: "Wed", hours: 1.6 },
  { day: "Thu", hours: 4.2 },
  { day: "Fri", hours: 3.4 },
  { day: "Sat", hours: 1.2 },
  { day: "Sun", hours: 1.8 }
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Team standup",
    start: addHours(today, 10).toISOString(),
    end: addHours(today, 10.5).toISOString(),
    type: "meeting"
  },
  {
    id: "event-2",
    title: "Deep work block",
    start: addHours(today, 12).toISOString(),
    end: addHours(today, 14).toISOString(),
    type: "focus"
  },
  {
    id: "event-3",
    title: "Finalize workshop agenda",
    start: addHours(today, 16).toISOString(),
    end: addHours(today, 17).toISOString(),
    type: "task"
  }
];

export const chatSuggestions = ["Plan my day", "What should I focus on?", "Review my goals"];

export const initialChatMessages: ChatMessage[] = [
  {
    id: "chat-1",
    role: "assistant",
    content:
      "Good morning. You have two priority tasks, one meeting before noon, and enough room for a 90-minute focus block. Want me to turn that into a plan?",
    createdAt: new Date().toISOString(),
    actions: ["Add Task", "Set Reminder", "Block Focus Time"]
  }
];
