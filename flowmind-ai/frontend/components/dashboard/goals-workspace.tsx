"use client";

import { useState } from "react";
import { addDays } from "date-fns";
import { CalendarRange, Flame, Goal as GoalIcon, Sparkles } from "lucide-react";

import { generateMilestones } from "@/lib/ai";
import { goals as seedGoals } from "@/lib/data/mock-data";
import type { Goal } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ComingSoonCard } from "@/components/shared/section-heading";
import { featureFlags } from "@/lib/utils";

function Heatmap() {
  const cells = Array.from({ length: 28 }).map((_, index) => (index % 4) + 1);
  return (
    <div className="grid grid-cols-7 gap-2">
      {cells.map((value, index) => (
        <div
          key={index}
          className="h-8 rounded-xl"
          style={{
            background:
              value === 4
                ? "#4f46e5"
                : value === 3
                  ? "#818cf8"
                  : value === 2
                    ? "#c7d2fe"
                    : "#eef2ff"
          }}
        />
      ))}
    </div>
  );
}

export function GoalsWorkspace() {
  const aiEnabled = featureFlags.ai;
  const [goals, setGoals] = useState<Goal[]>(seedGoals);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState(addDays(new Date(), 21).toISOString().slice(0, 10));
  const [description, setDescription] = useState("");

  const starterMilestones = (goalTitle: string) => [
    { title: `Define what "${goalTitle}" looks like when it is done`, order: 1 },
    { title: "Break the work into two or three weekly checkpoints", order: 2 },
    { title: "Schedule the first focused work block on your calendar", order: 3 },
    { title: "Review progress at the end of each week", order: 4 }
  ];

  function toggleMilestone(goalId: string, milestoneId: string) {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              milestones: goal.milestones.map((milestone) =>
                milestone.id === milestoneId ? { ...milestone, completed: !milestone.completed } : milestone
              )
            }
          : goal
      )
    );
  }

  function createGoal() {
    if (!title.trim()) {
      return;
    }

    const milestonesSource = aiEnabled ? generateMilestones(title, targetDate) : starterMilestones(title);
    const milestones = milestonesSource.map((item, index) => ({
      id: `milestone-${Date.now()}-${index}`,
      title: item.title,
      completed: false,
      order: item.order
    }));

    setGoals((current) => [
      {
        id: `goal-${Date.now()}`,
        title,
        description: description || (aiEnabled ? "A new outcome supported by AI-generated milestones." : "A new outcome with a starter milestone plan."),
        category: "career",
        targetDate: new Date(targetDate).toISOString(),
        progress: 12,
        streak: 1,
        aiCoachingEnabled: aiEnabled,
        milestones
      },
      ...current
    ]);

    setTitle("");
    setDescription("");
    setTargetDate(addDays(new Date(), 21).toISOString().slice(0, 10));
    setStep(0);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="space-y-5 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary">{goal.category}</Badge>
                    <h3 className="mt-4 text-xl font-semibold text-slate-950">{goal.title}</h3>
                  </div>
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-sm font-semibold text-slate-950"
                    style={{
                      background: `conic-gradient(#6366f1 ${goal.progress}%, #e5e7eb ${goal.progress}% 100%)`
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">{goal.progress}%</div>
                  </div>
                </div>
                <p className="text-sm leading-6 text-slate-600">{goal.description}</p>
                <div className="space-y-2">
                  {goal.milestones.map((milestone) => (
                    <label key={milestone.id} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm text-slate-700">
                      <input
                        checked={milestone.completed}
                        className="mt-1 h-4 w-4 rounded border-slate-300"
                        onChange={() => toggleMilestone(goal.id, milestone.id)}
                        type="checkbox"
                      />
                      <span>{milestone.title}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Daily habit tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Heatmap />
            <p className="text-sm text-slate-500">Consistency compounds. Small daily wins keep long goals from feeling abstract.</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI coach panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiEnabled ? (
              <>
                <div className="rounded-3xl bg-brand-50 p-5">
                  <p className="text-sm font-medium text-brand-700">Based on your pace, you&apos;ll hit your beta launch goal in about 3 weeks.</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Protect two undisturbed build sessions this week and batch status updates into a single admin block.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-semibold text-slate-950">Momentum streak</p>
                      <p className="text-sm text-slate-500">11 check-ins completed on time</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <ComingSoonCard
                badge="AI disabled"
                description="Goal coaching and milestone recommendations are hidden until your production AI key is configured."
                details="You can still create goals today. When AI is ready, set NEXT_PUBLIC_ENABLE_AI=true to restore coaching and milestone suggestions."
                title="AI coaching is coming soon"
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Goal creation wizard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {["What", "When", "How"].map((label, index) => (
                <button
                  key={label}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold ${step === index ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500"}`}
                  onClick={() => setStep(index)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
            {step === 0 ? (
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">What do you want to achieve?</label>
                <Input onChange={(event) => setTitle(event.target.value)} placeholder="Launch the beta onboarding flow" value={title} />
                <Textarea
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Why this matters and what success looks like."
                  value={description}
                />
              </div>
            ) : null}
            {step === 1 ? (
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">When should it be done?</label>
                <Input onChange={(event) => setTargetDate(event.target.value)} type="date" value={targetDate} />
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  <CalendarRange className="mb-2 h-4 w-4 text-brand-600" />
                  {aiEnabled
                    ? "FlowMind will generate pacing suggestions backward from this date."
                    : "FlowMind will save this target date now and unlock AI pacing suggestions later."}
                </div>
              </div>
            ) : null}
            {step === 2 ? (
              <div className="space-y-4">
                {aiEnabled ? (
                  <div className="rounded-3xl bg-brand-50 p-5">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-brand-600" />
                      <p className="font-semibold text-slate-950">AI milestone preview</p>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                      {generateMilestones(title || "your goal", targetDate).map((item) => (
                        <div key={item.order} className="rounded-2xl bg-white px-4 py-3">
                          {item.order}. {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <ComingSoonCard
                    badge="AI disabled"
                    description="The milestone preview is parked behind a coming-soon gate until your production AI key is ready."
                    details="You can still create the goal now. FlowMind will use a simple starter checklist until AI is enabled."
                    title="AI milestone preview is coming soon"
                  />
                )}
                <Button className="w-full" onClick={createGoal} type="button">
                  <GoalIcon className="mr-2 h-4 w-4" />
                  Create goal
                </Button>
              </div>
            ) : null}
            <Progress value={((step + 1) / 3) * 100} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
