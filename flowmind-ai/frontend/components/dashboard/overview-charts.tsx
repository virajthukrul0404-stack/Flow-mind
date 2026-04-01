"use client";

import { Bar, BarChart, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { focusData, goals, tasks } from "@/lib/data/mock-data";
import { Progress } from "@/components/ui/progress";

const completionValue = Math.round(
  (tasks.filter((task) => task.status === "DONE").length / tasks.length) * 100
);

export function OverviewCharts() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <CardHeader>
          <CardTitle>Task completion ring</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div className="h-[220px]">
            <ResponsiveContainer height="100%" width="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                data={[{ name: "Completion", value: completionValue, fill: "#6366f1" }]}
                endAngle={-270}
                innerRadius="68%"
                outerRadius="95%"
                startAngle={90}
              >
                <PolarAngleAxis angleAxisId={0} domain={[0, 100]} tick={false} type="number" />
                <RadialBar background cornerRadius={20} dataKey="value" />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-950">{completionValue}%</p>
            <p className="mt-3 leading-7 text-slate-600">
              You&apos;ve closed the loop on one task already and protected time for the rest.
            </p>
            <div className="mt-6 space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{goal.title}</span>
                    <span className="text-slate-500">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Focus time this week</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={focusData}>
              <XAxis axisLine={false} dataKey="day" tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Bar dataKey="hours" fill="#8b5cf6" radius={[14, 14, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
