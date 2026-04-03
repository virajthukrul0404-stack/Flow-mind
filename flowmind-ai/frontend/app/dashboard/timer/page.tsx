"use client";

import { useEffect, useState } from "react";
import { useTimerStore } from "@/store/useTimerStore";
import { useToast } from "@/context/ToastContext";
import CircularTimer from "@/components/CircularTimer";
import { Play, Settings2, RotateCcw, Pause } from "lucide-react";
import Modal from "@/components/Modal";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function TimerPage() {
  const {
    mode,
    status,
    workDurationMinutes,
    breakDurationMinutes,
    timeLeft,
    currentCycle,
    totalCycles,
    start,
    pause,
    reset,
    setWorkDuration,
    setBreakDuration,
  } = useTimerStore();

  const { toast } = useToast();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toast notifications for cycle changes
  const [prevMode, setPrevMode] = useState(mode);
  useEffect(() => {
    if (prevMode !== mode) {
      if (mode === "break") {
        toast("Focus session complete! Time for a break.", "success");
      } else if (mode === "work") {
        toast("Break over! Let's get back to work.", "info");
      }
      setPrevMode(mode);
    }
  }, [mode, prevMode, toast]);

  const totalSeconds = mode === "work" ? workDurationMinutes * 60 : breakDurationMinutes * 60;
  const progress = 100 - (timeLeft / totalSeconds) * 100;

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh] pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Focus Timer</h1>
        <p className="text-zinc-500 font-medium">Protect your attention, bit by bit.</p>
      </div>

      <div className="relative mb-12 scale-110">
        <CircularTimer
          progress={progress}
          text={formatTime(timeLeft)}
          subtext={mode === "work" ? "FOCUS" : "BREAK"}
          color={mode === "work" ? "text-blue-500" : "text-emerald-500"}
          size={280}
        />
        
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
            Session {currentCycle} of {totalCycles}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={status === "running" ? pause : start}
          className="w-16 h-16 flex items-center justify-center bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          {status === "running" ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
        </button>
        
        <button
          onClick={reset}
          title="Reset Timer"
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm hover:text-red-500 hover:border-red-200 transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => setIsSettingsOpen(true)}
          title="Timer Settings"
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm hover:text-blue-500 hover:border-blue-200 transition-all hover:scale-105 active:scale-95"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 text-zinc-900 dark:text-zinc-100">
            <Settings2 className="w-6 h-6" />
            <h2 className="text-xl font-bold">Timer Settings</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Work Duration</label>
                <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm font-bold">{workDurationMinutes} min</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={workDurationMinutes}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Break Duration</label>
                <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm font-bold">{breakDurationMinutes} min</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={breakDurationMinutes}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="w-full mt-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl transition-colors hover:opacity-90 active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}
