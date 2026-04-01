import type { Goal, Task } from "@/lib/types";
import { goals as seedGoals, tasks as seedTasks } from "@/lib/data/mock-data";

let tasksStore: Task[] = structuredClone(seedTasks);
let goalsStore: Goal[] = structuredClone(seedGoals);

export function listTasks() {
  return tasksStore;
}

export function addTask(task: Task) {
  tasksStore = [task, ...tasksStore];
  return task;
}

export function updateTask(id: string, patch: Partial<Task>) {
  let updated: Task | undefined;
  tasksStore = tasksStore.map((task) => {
    if (task.id !== id) {
      return task;
    }

    updated = { ...task, ...patch };
    return updated;
  });

  return updated;
}

export function deleteTask(id: string) {
  const before = tasksStore.length;
  tasksStore = tasksStore.filter((task) => task.id !== id);
  return tasksStore.length !== before;
}

export function completeTask(id: string) {
  return updateTask(id, { status: "DONE" });
}

export function listGoals() {
  return goalsStore;
}

export function addGoal(goal: Goal) {
  goalsStore = [goal, ...goalsStore];
  return goal;
}

export function updateGoal(id: string, patch: Partial<Goal>) {
  let updated: Goal | undefined;
  goalsStore = goalsStore.map((goal) => {
    if (goal.id !== id) {
      return goal;
    }

    updated = { ...goal, ...patch };
    return updated;
  });

  return updated;
}
