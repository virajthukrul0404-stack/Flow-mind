"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

import { pricingPlans } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="container-shell py-20">
      <SectionHeading
        description="Simple pricing with room to grow from solo workflows to collaborative planning."
        eyebrow="Pricing"
        title="Start free, scale only when the momentum sticks"
      />
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition",
            !annual ? "bg-slate-950 text-white" : "bg-white text-slate-600"
          )}
          onClick={() => setAnnual(false)}
          type="button"
        >
          Monthly
        </button>
        <button
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition",
            annual ? "bg-slate-950 text-white" : "bg-white text-slate-600"
          )}
          onClick={() => setAnnual(true)}
          type="button"
        >
          Annual
        </button>
        <Badge variant="glow">Save 20%</Badge>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <Card
              key={plan.name}
              className={cn(
                "relative border border-white/70",
                plan.highlight ? "ring-2 ring-brand-400 ring-offset-4 ring-offset-slate-100" : ""
              )}
            >
              {plan.highlight ? (
                <Badge className="absolute right-6 top-6" variant="accent">
                  Most popular
                </Badge>
              ) : null}
              <CardHeader className="space-y-4">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{plan.description}</p>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-slate-950">${price}</span>
                  <span className="pb-2 text-sm text-slate-500">{plan.periodLabel}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 rounded-full bg-brand-100 p-1 text-brand-700">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link className={cn(buttonVariants({ variant: plan.highlight ? "default" : "outline" }), "w-full")} href="/signup">
                  {plan.cta}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
