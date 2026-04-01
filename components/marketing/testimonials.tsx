import { Star } from "lucide-react";

import { testimonials } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  return (
    <section className="container-shell py-20">
      <SectionHeading
        description="Founders, operators, and managers use FlowMind to keep priorities visible and execution sane."
        eyebrow="Testimonials"
        title="Loved by people with full calendars and high standards"
      />
      <div className="mt-14 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.name}
            className={index % 3 === 1 ? "translate-y-6" : ""}
          >
            <CardContent className="space-y-5 p-7">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-base leading-7 text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-slate-950">{testimonial.name}</p>
                <p className="text-sm text-slate-500">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 overflow-hidden md:hidden">
        <div className="flex w-[200%] gap-4 animate-marquee">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Card key={`${testimonial.name}-${index}`} className="w-[18rem] shrink-0">
              <CardContent className="space-y-4 p-6">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="leading-7 text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="text-sm font-medium text-slate-900">
                  {testimonial.name}, {testimonial.company}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
