import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

import { heroStats } from "@/lib/data/mock-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.35),transparent_38%),radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%)] blur-3xl" />
      <div className="container-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-16 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <div className="space-y-8">
          <Badge className="animate-fade-up" variant="accent">
            Trusted by 12,000+ professionals
          </Badge>
          <div className="space-y-6">
            <h1 className="max-w-3xl animate-fade-up text-5xl font-bold leading-[0.96] text-shadow-sm sm:text-6xl lg:text-7xl">
              Your AI Productivity Co-Pilot
            </h1>
            <p
              className="max-w-2xl animate-fade-up text-lg leading-8 text-slate-600"
              style={{ animationDelay: "100ms" }}
            >
              FlowMind AI helps you capture tasks, set goals, and get things done with a daily command
              center powered by Groq.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link className={cn(buttonVariants({ size: "lg" }), "group px-8")} href="/signup">
              Start Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Button className="px-8" size="lg" variant="outline">
              <PlayCircle className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {heroStats.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/70 bg-white/70 p-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-8 top-12 h-24 w-24 animate-aurora rounded-full bg-brand-300/40 blur-2xl" />
          <div className="absolute -right-8 bottom-10 h-28 w-28 animate-aurora rounded-full bg-accent-300/40 blur-2xl" />
          <div className="surface-card animate-float relative overflow-hidden rounded-[32px] border-white/70 p-5 shadow-glow">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Daily Command Center</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">Monday, focus-first</p>
              </div>
              <Badge variant="glow">AI Briefing Ready</Badge>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-950 p-5 text-white">
                  <p className="text-sm text-slate-300">Today&apos;s flow</p>
                  <div className="mt-4 space-y-3">
                    {[
                      "09:30 Deep work on Q2 planning",
                      "12:00 Team standup and unblockers",
                      "14:00 Calendar-protected focus sprint",
                      "16:00 Review goals and wrap"
                    ].map((line) => (
                      <div key={line} className="rounded-2xl bg-white/10 px-4 py-3 text-sm">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Task completion</p>
                    <p className="mt-4 text-4xl font-bold text-slate-950">78%</p>
                    <div className="mt-4 h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Focus recovered</p>
                    <p className="mt-4 text-4xl font-bold text-slate-950">3.2h</p>
                    <p className="mt-2 text-sm text-emerald-600">+24% vs last week</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-brand-100 bg-brand-50/80 p-5">
                  <p className="text-sm text-brand-700">AI tip of the day</p>
                  <p className="mt-3 text-base font-medium leading-7 text-slate-900">
                    Front-load your creative work before noon. FlowMind already protected a 90-minute sprint.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">Goals in motion</p>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Launch beta", "72%"],
                      ["Read 12 books", "43%"],
                      ["Train 3x weekly", "61%"]
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{label}</span>
                          <span className="text-slate-500">{value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-sky-500"
                            style={{ width: value }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
