import { ArrowRight } from "lucide-react";

import { howItWorks } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorksSection() {
  return (
    <section className="container-shell py-20">
      <SectionHeading
        description="A simple workflow that starts with capture and ends with momentum."
        eyebrow="How It Works"
        title="Three steps from chaos to clarity"
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {howItWorks.map((item, index) => (
          <div key={item.step} className="relative">
            <Card className="h-full border border-white/70 bg-white/85">
              <CardContent className="p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">{item.step}</div>
                <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
            {index < howItWorks.length - 1 ? (
              <div className="pointer-events-none absolute -right-4 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(99,102,241,0.2),rgba(99,102,241,0.8),rgba(139,92,246,0.2))] bg-[length:200%_100%] animate-pulse-line lg:block">
                <ArrowRight className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
