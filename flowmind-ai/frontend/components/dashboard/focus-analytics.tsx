"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Pause, Play } from "lucide-react";

import { focusData } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FocusAnalytics() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setRunning(false);
          return 25 * 60;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Focus trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer height="100%" width="100%">
            <AreaChart data={focusData}>
              <defs>
                <linearGradient id="focusGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis axisLine={false} dataKey="day" tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area dataKey="hours" fill="url(#focusGradient)" stroke="#6366f1" strokeWidth={3} type="monotone" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Focus timer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,white_54%,rgba(99,102,241,0.14)_55%,rgba(99,102,241,0.06)_72%,transparent_73%)]">
              <div className="text-center">
                <p className="text-4xl font-bold text-slate-950">
                  {minutes}:{remainingSeconds}
                </p>
                <p className="mt-2 text-sm text-slate-500">Pomodoro focus block</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => setRunning((current) => !current)} type="button">
              {running ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {running ? "Pause" : "Start"}
            </Button>
            <Button className="flex-1" onClick={() => setSeconds(25 * 60)} type="button" variant="outline">
              Reset
            </Button>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            FlowMind suggests pairing this block with your highest-friction task before lunch, when your decision
            energy is strongest.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
