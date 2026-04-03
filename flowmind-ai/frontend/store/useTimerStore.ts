import { create } from "zustand";
import { persist } from "zustand/middleware";

type TimerState = "idle" | "running" | "paused";
type CycleType = "work" | "break";

interface TimerStore {
  mode: CycleType;
  status: TimerState;
  workDurationMinutes: number;
  breakDurationMinutes: number;
  timeLeft: number; // in seconds
  currentCycle: number;
  totalCycles: number;
  lastTickTime: number | null;
  // Actions
  setWorkDuration: (minutes: number) => void;
  setBreakDuration: (minutes: number) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  completeCycle: () => void;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      mode: "work",
      status: "idle",
      workDurationMinutes: 25,
      breakDurationMinutes: 5,
      timeLeft: 25 * 60,
      currentCycle: 1,
      totalCycles: 4,
      lastTickTime: null,

      setWorkDuration: (minutes) =>
        set((state) => ({
          workDurationMinutes: minutes,
          timeLeft: state.status === "idle" && state.mode === "work" ? minutes * 60 : state.timeLeft,
        })),

      setBreakDuration: (minutes) =>
        set((state) => ({
          breakDurationMinutes: minutes,
          timeLeft: state.status === "idle" && state.mode === "break" ? minutes * 60 : state.timeLeft,
        })),

      start: () =>
        set((state) => ({
          status: "running",
          lastTickTime: Date.now(),
        })),

      pause: () =>
        set((state) => ({
          status: "paused",
          lastTickTime: null,
        })),

      reset: () =>
        set((state) => ({
          status: "idle",
          mode: "work",
          timeLeft: state.workDurationMinutes * 60,
          currentCycle: 1,
          lastTickTime: null,
        })),

      tick: () => {
        const state = get();
        if (state.status !== "running" || !state.lastTickTime) return;

        const now = Date.now();
        const elapsedSeconds = Math.floor((now - state.lastTickTime) / 1000);

        if (elapsedSeconds > 0) {
          const newTimeLeft = Math.max(0, state.timeLeft - elapsedSeconds);
          
          if (newTimeLeft === 0) {
            get().completeCycle();
          } else {
            set({
              timeLeft: newTimeLeft,
              lastTickTime: now,
            });
          }
        }
      },

      completeCycle: () => {
        const state = get();
        
        if (state.mode === "work") {
          const isLastCycle = state.currentCycle >= state.totalCycles;
          set({
            mode: "break",
            timeLeft: state.breakDurationMinutes * 60,
            status: isLastCycle ? "idle" : "idle", // Reset to idle so user explicitly starts break
            currentCycle: state.currentCycle,
            lastTickTime: null,
          });
        } else {
          // Break finished, back to work
          const nextCycle = state.currentCycle >= state.totalCycles ? 1 : state.currentCycle + 1;
          set({
            mode: "work",
            timeLeft: state.workDurationMinutes * 60,
            status: "idle",
            currentCycle: nextCycle,
            lastTickTime: null,
          });
        }
      },
    }),
    {
      name: "flowmind-timer-storage",
    }
  )
);
