import { Sparkles } from "lucide-react";

import { features } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureGrid() {
  return (
    <section className="container-shell py-20">
      <SectionHeading
        description="Six focused capabilities that turn scattered intent into an AI-guided operating system for your week."
        eyebrow="Features"
        title="A productivity stack that feels like one clear brain"
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className="group relative overflow-hidden border border-white/70 bg-white/80"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${feature.accent} opacity-80`} />
            <CardHeader className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-2xl shadow-sm">
                {feature.icon}
              </div>
              <CardTitle className="pt-3">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="leading-7 text-slate-600">{feature.description}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
                <Sparkles className="h-4 w-4" />
                AI-guided workflow
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
