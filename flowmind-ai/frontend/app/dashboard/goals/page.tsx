import dynamic from "next/dynamic";

const GoalsWorkspace = dynamic(
  () => import("@/components/dashboard/goals-workspace").then((mod) => mod.GoalsWorkspace),
  {
    ssr: false,
    loading: () => <div className="surface-card h-[640px] animate-pulse" />
  }
);

export default function GoalsPage() {
  return <GoalsWorkspace />;
}
