"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type Filter = "all" | "active" | "completed";

export default function TasksPage() {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTaskStore();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      addTask(input.trim());
      setInput("");
      toast("Task added", "success");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "high":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Task Manager</h1>
        <p className="text-zinc-500">Capture thoughts at the speed of light.</p>
      </div>

      <div className="relative mb-8 shadow-sm group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Plus className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleAdd}
          className="block w-full pl-12 pr-4 py-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl leading-5 bg-white dark:bg-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
          placeholder="Add a task by typing naturally… (Press enter)"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-lg">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${
                filter === f
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        {tasks.some((t) => t.done) && (
          <button
            onClick={clearCompleted}
            className="text-sm font-medium text-zinc-500 hover:text-red-500 transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/50"
            >
              <AlertCircle className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-4" />
              <p className="text-zinc-500 font-medium">No tasks found in this view.</p>
              <p className="text-sm text-zinc-400 mt-1">Type above to add your first one.</p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                  task.done
                    ? "bg-zinc-50 dark:bg-zinc-900/40 border-transparent opacity-60"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 text-zinc-400 hover:text-blue-600 transition-colors shrink-0 focus:outline-none"
                >
                  {task.done ? <CheckCircle className="w-5 h-5 text-blue-500" /> : <Circle className="w-5 h-5" />}
                </button>
                <div className="flex-1 min-w-0">
                  <span
                    className={`block leading-relaxed font-medium transition-all ${
                      task.done ? "line-through text-zinc-500" : "text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {task.text}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                    toast("Task deleted", "info");
                  }}
                  className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
