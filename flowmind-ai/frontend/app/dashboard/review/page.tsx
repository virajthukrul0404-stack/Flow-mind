"use client";

import { useState, useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { useGoalStore } from "@/store/useGoalStore";
import { BarChart2, CheckCircle, Clock, Target, Sparkles, Loader2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BARS = [
  { day: "M", height: 40 },
  { day: "T", height: 65 },
  { day: "W", height: 100 },
  { day: "T", height: 80 },
  { day: "F", height: 60 },
  { day: "S", height: 20 },
  { day: "S", height: 35 },
];

export default function ReviewPage() {
  const { tasks } = useTaskStore();
  const { goals } = useGoalStore();
  const [worked, setWorked] = useState("");
  const [improve, setImprove] = useState("");
  const [generating, setGenerating] = useState(false);
  const [review, setReview] = useState<string | null>(null);

  const completedCount = tasks.filter((t) => t.done).length;

  useEffect(() => {
    const savedW = localStorage.getItem("fm_worked");
    const savedI = localStorage.getItem("fm_improve");
    if (savedW) setWorked(savedW);
    if (savedI) setImprove(savedI);
  }, []);

  useEffect(() => {
    localStorage.setItem("fm_worked", worked);
    localStorage.setItem("fm_improve", improve);
  }, [worked, improve]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setReview("You had a phenomenally consistent week, hitting a major spike in deep work on Wednesday. Your task completion rate shows strong operational follow-through. Next week, try front-loading your heaviest focus block earlier on Tuesday to smooth out the effort curve.");
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">Weekly Review</h1>
        <p className="text-zinc-500 font-medium">Reflect, adapt, and grow.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: CheckCircle, label: "Tasks Completed", value: completedCount, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { icon: Target, label: "Goals Updated", value: goals.length, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { icon: Clock, label: "Focus Hours", value: "3.2h", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
          { icon: Award, label: "Best Day", value: "Wed", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm"
            >
              <div className={`p-2 rounded-xl inline-block mb-3 ${stat.bg} ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-zinc-500 text-sm font-semibold">{stat.label}</p>
              <p className="text-2xl font-bold mt-1 text-zinc-900 dark:text-zinc-50">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-blue-500" /> Output Volume</h2>
            <div className="flex items-end justify-between gap-2 h-48 mt-8 border-b border-zinc-200 dark:border-zinc-800 pb-2">
              {BARS.map((bar, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.height}%` }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                    className={`w-full max-w-[40px] rounded-t-lg transition-colors ${
                      bar.height === 100 ? "bg-blue-600 dark:bg-blue-500" : "bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60"
                    }`}
                  />
                  <span className="text-xs font-bold text-zinc-500">{bar.day}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-500" /> Qualitative Review</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">What worked well?</label>
                <textarea
                  value={worked}
                  onChange={(e) => setWorked(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-zinc-400 min-h-[100px] resize-none font-medium"
                  placeholder="e.g. Setting absolute boundaries for email..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">What to improve?</label>
                <textarea
                  value={improve}
                  onChange={(e) => setImprove(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-zinc-400 min-h-[100px] resize-none font-medium"
                  placeholder="e.g. I hit snooze too many times..."
                />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-3xl p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-900 dark:text-indigo-100"><Sparkles className="w-5 h-5" /> AI Analysis</h2>
            
            <AnimatePresence mode="wait">
              {review ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-indigo-800 dark:text-indigo-200 font-medium leading-relaxed"
                >
                  <p className="mb-6">{review}</p>
                  <button onClick={() => setReview(null)} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Reset
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    {generating ? <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /> : <Sparkles className="w-8 h-8 text-indigo-500" />}
                  </div>
                  <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100 mb-4 px-4">
                    FlowMind will analyze your week and synthesize a coaching plan.
                  </p>
                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                  >
                    {generating ? "Analyzing..." : "Generate Insights"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}
