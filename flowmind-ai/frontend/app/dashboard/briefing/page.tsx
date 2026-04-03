"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { useGoalStore } from "@/store/useGoalStore";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Sparkles, CheckSquare, Zap, Target, RefreshCw } from "lucide-react";

const TIPS = [
  "Parkinson's Law states that work expands to fill the time allotted. Set a 25-minute timer for your first task and try to beat the clock.",
  "Your willpower is highest in the morning. Tackle your 'frog' (hardest task) before checking email or slack to guarantee a daily win.",
  "When overwhelmed, write everything down. The brain is for generating ideas, not holding them. Dump your thoughts into the task manager.",
];

export default function BriefingPage() {
  const { tasks } = useTaskStore();
  const { goals } = useGoalStore();
  const [loading, setLoading] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const priorityTasks = tasks.filter((t) => !t.done).slice(0, 3);
  const activeGoals = goals.slice(0, 2);

  const regenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
      setLoading(false);
    }, 1200);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Sun className="w-6 h-6 fill-current" />
            <span className="font-bold tracking-widest uppercase text-xs">Morning Start</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
            Daily Briefing
          </h1>
          <p className="text-zinc-500 mt-2 font-medium">{today}</p>
        </div>
        
        <button
          onClick={regenerate}
          disabled={loading}
          className="inline-flex flex-shrink-0 items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl font-bold transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Generating..." : "Regenerate Briefing"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="h-6 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                    <Sparkles className="w-5 h-5" />
                    <h2>AI Coaching Tip</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                    "{TIPS[tipIndex]}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold mb-6">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              <h2>Top Priorities</h2>
            </div>
            
            {priorityTasks.length > 0 ? (
              <ul className="space-y-3">
                {priorityTasks.map((t) => (
                  <li key={t.id} className="flex gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                    <span className="w-5 h-5 flex flex-shrink-0 items-center justify-center border-2 border-zinc-300 dark:border-zinc-700 text-zinc-300 dark:text-zinc-700 rounded-md text-[10px] font-bold"></span>
                    <span className="truncate">{t.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 border border-dashed rounded-xl border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 font-medium">
                No active priorities found. Go to Tasks to add some!
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <section className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-2 text-yellow-400 dark:text-orange-500 font-bold mb-6">
              <Zap className="w-5 h-5 fill-current" />
              <h2>Today's Schedule</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-4 group">
                <span className="text-zinc-500 font-mono font-bold w-12 text-sm pt-0.5">09:30</span> 
                <div className="flex-1 bg-white/10 dark:bg-black/10 p-3 rounded-xl backdrop-blur-sm group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors">
                  <p className="font-bold text-sm">Deep Work Sprint</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">90 minutes • High focus</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-500 font-mono font-bold w-12 text-sm pt-0.5">12:00</span> 
                <div className="flex-1 px-3">
                  <p className="font-semibold text-sm">Team Standup</p>
                </div>
              </li>
              <li className="flex gap-4 relative">
                <div className="absolute left-[3.25rem] -ml-px top-2 bottom-0 w-0.5 bg-blue-500" />
                <span className="text-blue-500 font-mono font-bold w-12 text-sm pt-0.5">14:00</span> 
                <div className="flex-1 bg-blue-600 text-white p-3 rounded-xl ml-[11px] shadow-lg shadow-blue-900/20">
                  <p className="font-bold text-sm">Flow Session</p>
                  <p className="text-xs text-blue-200 mt-1">Focus timer planned</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-500 font-mono font-bold w-12 text-sm pt-0.5">16:00</span> 
                <div className="flex-1 px-3">
                  <p className="font-semibold text-sm">Daily review & Inbox zero</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold">
                <Target className="w-5 h-5 text-emerald-600" />
                <h2>Active Goals</h2>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">On Track</span>
            </div>
            
            {activeGoals.length > 0 ? (
              <div className="space-y-4">
                {activeGoals.map((g) => (
                  <div key={g.id}>
                    <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      <span>{g.name}</span>
                      <span>{g.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${g.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">No active goals to show.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
