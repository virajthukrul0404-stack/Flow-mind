"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { faqItems } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="container-shell py-20">
      <SectionHeading
        description="Everything you need to know before putting FlowMind into your weekly workflow."
        eyebrow="FAQ"
        title="Questions teams ask before they switch"
      />
      <div className="mx-auto mt-14 max-w-4xl space-y-4">
        {faqItems.map((item, index) => {
          const active = open === index;
          return (
            <Card key={item.question} className="overflow-hidden">
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(active ? -1 : index)}
                type="button"
              >
                <span className="text-base font-semibold text-slate-950">{item.question}</span>
                <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform", active ? "rotate-180" : "")} />
              </button>
              {active ? <div className="px-6 pb-6 text-sm leading-7 text-slate-600">{item.answer}</div> : null}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
