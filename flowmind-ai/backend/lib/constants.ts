import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Target
} from "lucide-react";

export const siteConfig = {
  name: "FlowMind AI",
  description:
    "Your AI productivity co-pilot for priorities, planning, focus time, and weekly momentum.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
};

export const marketingNav = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" }
];

export const dashboardLinks = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
  { icon: Target, label: "Goals", href: "/dashboard/goals" },
  { icon: CalendarDays, label: "Calendar", href: "/dashboard/calendar" },
  { icon: MessageSquareText, label: "AI Chat", href: "/dashboard/ai-chat" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" }
];
