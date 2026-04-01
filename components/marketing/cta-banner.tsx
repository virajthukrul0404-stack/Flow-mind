import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CtaBanner() {
  return (
    <section className="container-shell py-20">
      <div className="overflow-hidden rounded-[36px] bg-slate-950 px-6 py-12 text-white shadow-glow sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="section-eyebrow border-white/15 bg-white/10 text-white">Final CTA</p>
            <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">Start your most productive week ever</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Join founders, operators, and teams using FlowMind to capture everything and finish what matters.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <label className="mb-3 block text-sm font-medium text-slate-300">Work email</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input className="border-white/15 bg-slate-900 text-white" placeholder="you@company.com" type="email" />
              <Button className="shrink-0">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-3 text-sm text-slate-400">No credit card required. Setup takes about three minutes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
