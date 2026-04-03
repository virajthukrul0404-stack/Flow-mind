"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { heroStats } from "@/lib/data/mock-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Modal from "@/components/Modal";

export function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.35),transparent_38%),radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%)] blur-3xl" />
      <div className="container-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-16 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-8"
        >
          <Badge variant="accent">
            Trusted by 12,000+ professionals
          </Badge>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-bold leading-[0.96] text-shadow-sm sm:text-6xl lg:text-7xl">
              Your AI Productivity Co-Pilot
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              FlowMind AI helps you capture tasks, set goals, and get things done with a daily command
              center powered by Groq.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link className={cn(buttonVariants({ size: "lg" }), "group px-8 w-full sm:w-auto flex items-center justify-center")} href="/signup">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={() => setDemoOpen(true)} className="px-8 w-full sm:w-auto" size="lg" variant="outline">
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {heroStats.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                key={item}
                className="rounded-2xl border border-white/70 bg-white/70 p-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="relative"
        >
          <div className="absolute -left-8 top-12 h-24 w-24 animate-aurora rounded-full bg-brand-300/40 blur-2xl flex-shrink-0" />
          <div className="absolute -right-8 bottom-10 h-28 w-28 animate-aurora rounded-full bg-accent-300/40 blur-2xl flex-shrink-0" />
          <div className="surface-card animate-float relative overflow-hidden rounded-[32px] border border-white/70 p-5 shadow-glow">
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
                    <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "78%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 absolute left-0 top-0"
                      />
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
                    ].map(([label, value], idx) => (
                      <div key={label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{label}</span>
                          <span className="text-slate-500">{value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: value as string }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.6 + idx * 0.2 }}
                            className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-sky-500 absolute left-0 top-0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal isOpen={demoOpen} onClose={() => setDemoOpen(false)}>
        <div className="p-1">
          <div className="aspect-video bg-zinc-900 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/10" />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4 relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                <PlayCircle className="w-8 h-8 ml-1" />
              </div>
              <p className="text-zinc-400 font-medium font-mono text-sm tracking-widest uppercase">FlowMind Demo</p>
            </motion.div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
