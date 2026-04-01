import dynamic from "next/dynamic";

const TaskBoard = dynamic(() => import("@/components/dashboard/task-board").then((mod) => mod.TaskBoard), {
  ssr: false,
  loading: () => <div className="surface-card h-[540px] animate-pulse" />
});

export default function TasksPage() {
  return <TaskBoard />;
}
