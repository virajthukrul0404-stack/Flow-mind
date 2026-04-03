"use client";

import { useState } from "react";
import { useGoalStore } from "@/store/useGoalStore";
import { useTaskStore } from "@/store/useTaskStore";
import { useToast } from "@/context/ToastContext";
import ProgressBar from "@/components/ProgressBar";
import { CheckCircle2, Clock, Sparkles, Target, Zap, Plus, ArrowRight, BarChart3, Settings, Bot, CalendarDays } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardHome() {
  const { goals } = useGoalStore();
  const { addTask } = useTaskStore();
  const { toast } = useToast();
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskInput.trim()) {
      addTask(taskInput.trim(), "medium");
      setTaskInput("");
      toast("Task added successfully", "success");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const quickLinks = [
    { href: "/dashboard/tasks", label: "Tasks", icon: CheckCircle2 },
    { href: "/dashboard/goals", label: "Goals", icon: Target },
    { href: "/dashboard/timer", label: "Pomodoro Timer", icon: Clock },
    { href: "/dashboard/briefing", label: "Daily Briefing", icon: Sparkles },
    { href: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
    { href: "/dashboard/review", label: "Weekly Review", icon: BarChart3 },
    { href: "/dashboard/analytics", label: "Analytics", icon: Zap },
    { href: "/dashboard/ai-chat", label: "AI Chat", icon: Bot },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {getGreeting()} — {dayName}, focus-first.
        </h1>
        <p className="text-zinc-500 mt-1">Let's make today count.</p>
      </motion.div>

      {/* Quick Add Task */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative shadow-sm"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Plus className="h-5 w-5 text-zinc-400" />
        </div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleAddTask}
          className="block w-full pl-10 pr-3 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
          placeholder="Add a task… (Press enter to save)"
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Dashboard Pages</h2>
          <span className="text-xs text-zinc-400">One-click navigation</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </motion.section>

      {/* AI Briefing Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold mb-4">
          <Sparkles className="w-5 h-5" />
          <h2>AI Briefing Ready</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center">
            <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
              Front-load your creative work before noon. FlowMind already protected a 90-minute sprint for your most important goals.
            </p>
            <Link href="/dashboard/briefing" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-500 mt-4 hover:underline">
              View full briefing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white/60 dark:bg-zinc-950/40 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Today's Schedule</h3>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-3"><span className="text-zinc-400 font-mono w-10">09:30</span> <span>Deep work sprint</span></li>
              <li className="flex gap-3"><span className="text-zinc-400 font-mono w-10">12:00</span> <span>Team standup</span></li>
              <li className="flex gap-3"><span className="text-zinc-400 font-mono w-10">14:00</span> <span>Focus block</span></li>
              <li className="flex gap-3"><span className="text-zinc-400 font-mono w-10">16:00</span> <span>Daily review</span></li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-start gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-zinc-500 text-sm font-medium">Task Completion</p>
            <p className="text-2xl font-bold flex items-baseline gap-2">78% <span className="text-xs font-medium text-green-500">+12%</span></p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-start gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-500 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-zinc-500 text-sm font-medium">Focus Recovered</p>
            <p className="text-2xl font-bold flex items-baseline gap-2">3.2<span className="text-lg">h</span> <span className="text-xs font-medium text-purple-500">this week</span></p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-start gap-4">
          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 rounded-xl"><Target className="w-6 h-6" /></div>
          <div>
            <p className="text-zinc-500 text-sm font-medium">Goals Active</p>
            <p className="text-2xl font-bold">{goals.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Goals in Motion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" fill="currentColor" /> Goals in Motion</h2>
          <Link href="/dashboard/goals" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Manage All</Link>
        </div>
        <div className="space-y-6">
          {goals.map((goal, i) => (
            <div key={goal.id}>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>{goal.name}</span>
                <span className="text-zinc-500">{goal.progress}%</span>
              </div>
              <ProgressBar progress={goal.progress} color={i === 0 ? "bg-blue-500" : i === 1 ? "bg-emerald-500" : "bg-purple-500"} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
