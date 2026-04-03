import { Sparkles, Target, TimerReset } from "lucide-react";

import { CtaBanner } from "@/components/marketing/cta-banner";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const principles = [
  {
    icon: Sparkles,
    title: "AI that clears fog",
    description: "We design for clarity first, not novelty for novelty's sake."
  },
  {
    icon: Target,
    title: "Execution over collection",
    description: "Every feature should increase follow-through, not create one more inbox."
  },
  {
    icon: TimerReset,
    title: "Sustainable pace",
    description: "Productivity should feel calmer, not more performative."
  }
];

export default function AboutPage() {
  return (
    <div>
      <SiteHeader />
      <main className="container-shell py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="section-eyebrow">About FlowMind</p>
            <h1 className="mt-6 text-5xl font-bold leading-tight sm:text-6xl">
              We built FlowMind for people whose ambition outgrew their to-do list.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              FlowMind AI combines planning, focus protection, and reflective review in a single workspace so
              you can spend less time administrating yourself and more time doing meaningful work.
            </p>
          </div>
          <div className="surface-card grid gap-6 p-8">
            {principles.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-100 bg-white p-6">
                <item.icon className="h-6 w-6 text-brand-600" />
                <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20">
          <CtaBanner />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
