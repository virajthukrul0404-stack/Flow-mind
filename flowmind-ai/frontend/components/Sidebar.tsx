"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import {
  Home,
  CheckSquare,
  Target,
  Clock,
  Sun,
  CalendarDays,
  BarChart2,
  LineChart,
  Bot,
  Settings,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/dashboard/goals", label: "Goals", icon: Target },
  { href: "/dashboard/timer", label: "Focus Timer", icon: Clock },
  { href: "/dashboard/briefing", label: "Daily Briefing", icon: Sun },
  { href: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/dashboard/review", label: "Weekly Review", icon: BarChart2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  { href: "/dashboard/ai-chat", label: "AI Chat", icon: Bot },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const SidebarContent = ({ pathname }: { pathname: string }) => (
  <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 p-4">
    <div className="flex items-center gap-3 px-2 mb-8 mt-2">
      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
        F
      </div>
      <div>
        <h2 className="font-bold leading-tight">FlowMind</h2>
        <p className="text-xs text-zinc-500 font-medium">AI Co-Pilot</p>
      </div>
    </div>

    <nav className="flex-1 space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
              isActive
                ? "text-blue-700 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-500 rounded-r-md"
              />
            )}
            <Icon className={`w-5 h-5 ${isActive ? "text-blue-600 dark:text-blue-500" : ""}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>

    <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 px-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold shadow-sm border border-white dark:border-zinc-700">
          YO
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">Your Workspace</p>
          <p className="text-xs text-zinc-500 truncate">Pro Plan</p>
        </div>
      </div>
      <div className="w-full [&>button]:w-full [&>button]:justify-center [&>button]:rounded-lg [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-3 [&>button]:py-2 [&>button]:text-red-600 dark:[&>button]:text-red-400 [&>button]:transition-colors [&>button]:hover:bg-red-50 dark:[&>button]:hover:bg-red-900/10">
        <SignOutButton />
      </div>
    </div>
  </div>
);

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-40 flex items-center px-4">
        <button onClick={() => setMobileOpen(true)} className="p-2 -ml-2 text-zinc-600">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-semibold ml-2">FlowMind AI</span>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen fixed inset-y-0 left-0 z-40">
        <SidebarContent pathname={pathname} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw]"
            >
              <SidebarContent pathname={pathname} />
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
