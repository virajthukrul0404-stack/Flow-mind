import dynamic from "next/dynamic";
import { BrainCircuit, Gauge, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const FocusAnalytics = dynamic(
  () => import("@/components/dashboard/focus-analytics").then((mod) => mod.FocusAnalytics),
  {
    ssr: false,
    loading: () => <div className="surface-card h-[420px] animate-pulse" />
  }
);

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { icon: Gauge, label: "Focus score", value: "84", note: "Up 12% week over week" },
          { icon: TrendingUp, label: "Goal velocity", value: "+18%", note: "Strongest on Tue/Thu" },
          { icon: BrainCircuit, label: "AI assists used", value: "42", note: "Planning and prioritization" }
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-3 p-6">
              <item.icon className="h-5 w-5 text-brand-600" />
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="text-4xl font-bold text-slate-950">{item.value}</p>
              <p className="text-sm text-slate-500">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <FocusAnalytics />
    </div>
  );
}
