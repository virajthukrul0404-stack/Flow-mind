import dynamic from "next/dynamic";
import { CalendarDays, Sparkles, Target } from "lucide-react";

import { ComingSoonCard } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { goals, tasks } from "@/lib/data/mock-data";
import { generateFallbackBriefing } from "@/lib/ai";
import { featureFlags } from "@/lib/utils";

const OverviewCharts = dynamic(
  () => import("@/components/dashboard/overview-charts").then((mod) => mod.OverviewCharts),
  {
    ssr: false,
    loading: () => <div className="surface-card h-[360px] animate-pulse" />
  }
);

export default function DashboardPage() {
  const dueTasks = tasks.filter((task) => task.status !== "DONE").length;
  const meetings = 3;
  const briefing = generateFallbackBriefing(tasks, goals, 192);

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="accent">Today&apos;s summary</Badge>
                <CardTitle className="mt-4">A sharp plan before the day starts pulling at you</CardTitle>
              </div>
              <Sparkles className="h-5 w-5 text-brand-600" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Tasks due</p>
              <p className="mt-3 text-4xl font-bold text-slate-950">{dueTasks}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Meetings today</p>
              <p className="mt-3 text-4xl font-bold text-slate-950">{meetings}</p>
            </div>
            <div className="rounded-3xl bg-brand-50 p-5">
              <p className="text-sm text-brand-700">{featureFlags.ai ? "AI tip" : "Planning tip"}</p>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-900">
                Front-load the planning deck before lunch, then batch admin work into one short sweep.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick add</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[28px] border border-slate-200 bg-white px-4 py-5 text-sm text-slate-500">
              Add task: finish report by Friday
            </div>
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 text-sm leading-7 text-slate-700">
              Natural-language capture turns scattered thoughts into clean task objects with due dates, tags, and
              urgency.
            </div>
          </CardContent>
        </Card>
      </div>

      <OverviewCharts />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>AI briefing panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {featureFlags.ai ? (
              <>
                <div className="rounded-3xl bg-slate-950 p-6 text-white">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Morning briefing</p>
                  <p className="mt-4 text-base leading-8 text-slate-100">{briefing}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <CalendarDays className="h-5 w-5 text-brand-600" />
                    <p className="mt-3 font-semibold text-slate-950">Calendar intelligence</p>
                    <p className="mt-2 text-sm text-slate-500">One 90-minute focus block is already protected.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <Target className="h-5 w-5 text-brand-600" />
                    <p className="mt-3 font-semibold text-slate-950">Goal momentum</p>
                    <p className="mt-2 text-sm text-slate-500">Your top goal is 72% complete and still on pace.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <Sparkles className="h-5 w-5 text-brand-600" />
                    <p className="mt-3 font-semibold text-slate-950">Focus tip</p>
                    <p className="mt-2 text-sm text-slate-500">Do not book over your 2pm sprint unless the issue is real.</p>
                  </div>
                </div>
              </>
            ) : (
              <ComingSoonCard
                badge="AI disabled"
                description="The briefing, coaching, and planning assistant are hidden until your production AI key is added."
                details="Set NEXT_PUBLIC_ENABLE_AI=true later to re-enable the assistant sections without changing the code."
                title="AI briefing is coming soon"
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Goal progress cards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">{goal.title}</p>
                    <p className="mt-2 text-sm text-slate-500">{goal.description}</p>
                  </div>
                  <Badge variant="secondary">{goal.streak} day streak</Badge>
                </div>
                <div className="mt-4 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
