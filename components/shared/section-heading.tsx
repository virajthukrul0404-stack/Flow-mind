import { Clock3, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <Badge className="mb-4" variant="default">
        {eyebrow}
      </Badge>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export function ComingSoonCard({
  badge = "Coming soon",
  title,
  description,
  details
}: {
  badge?: string;
  title: string;
  description: string;
  details?: string;
}) {
  return (
    <Card className="border border-dashed border-brand-200 bg-brand-50/50">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Badge variant="accent">{badge}</Badge>
            <CardTitle className="mt-4">{title}</CardTitle>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
            <Clock3 className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="leading-7 text-slate-600">{description}</p>
        {details ? (
          <div className="rounded-2xl bg-white p-4 text-sm text-slate-600">
            <div className="mb-2 flex items-center gap-2 font-semibold text-brand-700">
              <Sparkles className="h-4 w-4" />
              What happens next
            </div>
            <p>{details}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
