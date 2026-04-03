import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GoalCategory = "Work" | "Health" | "Learning";

export interface Goal {
  id: string;
  name: string;
  category: GoalCategory;
  progress: number;
}

interface GoalStore {
  goals: Goal[];
  addGoal: (name: string, category: GoalCategory, target?: number) => void;
  updateProgress: (id: string, delta: number) => void;
  deleteGoal: (id: string) => void;
}

const DEFAULT_GOALS: Goal[] = [
  { id: "1", name: "Launch beta", category: "Work", progress: 72 },
  { id: "2", name: "Read 12 books", category: "Learning", progress: 43 },
  { id: "3", name: "Train 3x weekly", category: "Health", progress: 61 },
];

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: DEFAULT_GOALS,
      addGoal: (name, category, target = 0) =>
        set((state) => ({
          goals: [
            ...state.goals,
            { id: crypto.randomUUID(), name, category, progress: target },
          ],
        })),
      updateProgress: (id, delta) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id
              ? { ...g, progress: Math.max(0, Math.min(100, g.progress + delta)) }
              : g
          ),
        })),
      deleteGoal: (id) =>
        set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
    }),
    {
      name: "flowmind-goals-storage",
    }
  )
);
