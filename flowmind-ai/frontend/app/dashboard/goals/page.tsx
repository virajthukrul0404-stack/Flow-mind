"use client";

import { useState } from "react";
import { useGoalStore, GoalCategory } from "@/store/useGoalStore";
import { useToast } from "@/context/ToastContext";
import Modal from "@/components/Modal";
import ProgressBar from "@/components/ProgressBar";
import { Target, Plus, Trash2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GoalsPage() {
  const { goals, addGoal, updateProgress, deleteGoal } = useGoalStore();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState(0);
  const [newGoalCategory, setNewGoalCategory] = useState<GoalCategory>("Work");

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName.trim()) return;
    
    addGoal(newGoalName.trim(), newGoalCategory, newGoalTarget);
    setNewGoalName("");
    setNewGoalTarget(0);
    setNewGoalCategory("Work");
    setIsModalOpen(false);
    toast("Goal added successfully", "success");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "Health": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "Learning": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      default: return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  const getProgressColor = (category: string) => {
    switch (category) {
      case "Work": return "bg-blue-500";
      case "Health": return "bg-emerald-500";
      case "Learning": return "bg-purple-500";
      default: return "bg-zinc-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Smart Goal Tracker</h1>
          <p className="text-zinc-500">Visualize your path to success.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex flex-shrink-0 items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold rounded-full shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
            >
              <button
                onClick={() => {
                  deleteGoal(goal.id);
                  toast("Goal archived", "info");
                }}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl border ${getCategoryColor(goal.category)}`}>
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-tight">
                    {goal.name}
                  </h3>
                  <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                </div>
              </div>

              <div className="mt-8 relative">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-4xl font-extrabold tracking-tighter text-zinc-900 dark:text-zinc-50">
                    {goal.progress}%
                  </span>
                  <div className="flex gap-2 mb-1">
                    <button
                      onClick={() => updateProgress(goal.id, -5)}
                      className="w-7 h-7 flex flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold transition-colors"
                      disabled={goal.progress <= 0}
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateProgress(goal.id, 5)}
                      className="w-7 h-7 flex flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold transition-colors"
                      disabled={goal.progress >= 100}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <ProgressBar progress={goal.progress} height={12} color={getProgressColor(goal.category)} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Set a New Goal</h2>
              <p className="text-sm text-zinc-500">Define your target and track progress.</p>
            </div>
          </div>
          
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Goal Name</label>
              <input
                autoFocus
                type="text"
                required
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder="e.g., Run a marathon"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-zinc-400"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Category</label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value as GoalCategory)}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer font-medium"
                >
                  <option value="Work">Work</option>
                  <option value="Health">Health</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Starting %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm active:scale-[0.98]"
            >
              Create Goal
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
