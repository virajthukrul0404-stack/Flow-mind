import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  text: string;
  done: boolean;
  priority: TaskPriority;
  createdAt: number;
}

interface TaskStore {
  tasks: Task[];
  addTask: (text: string, priority?: TaskPriority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (text, priority = "medium") =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              text,
              done: false,
              priority,
              createdAt: Date.now(),
            },
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((t) => !t.done),
        })),
    }),
    {
      name: "flowmind-tasks-storage",
    }
  )
);
