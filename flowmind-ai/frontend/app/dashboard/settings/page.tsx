import { BellRing, ShieldCheck } from "lucide-react";

import { BillingPanel } from "@/components/dashboard/billing-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { featureFlags } from "@/lib/utils";

export default function SettingsPage() {
  const toggles = [
    ["Email digests", "Morning briefings, weekly reviews, and reminder nudges.", true],
    ["Calendar sync", "Protect focus blocks and reflow low-priority work automatically.", true],
    [
      "AI coaching",
      featureFlags.ai
        ? "Enable milestone and pacing suggestions across goals."
        : "Coming soon while production AI keys are still being configured.",
      featureFlags.ai
    ]
  ] as const;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Workspace settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {toggles.map(([label, description, enabled]) => (
              <div key={label} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5">
                <div>
                  <p className="font-semibold text-slate-950">{label}</p>
                  <p className="mt-2 text-sm text-slate-500">{description}</p>
                </div>
                <div className={`h-7 w-12 rounded-full p-1 ${enabled ? "bg-brand-500" : "bg-slate-200"}`}>
                  <div className={`h-5 w-5 rounded-full bg-white ${enabled ? "ml-auto" : ""}`} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <BillingPanel />
        <Card>
          <CardHeader>
            <CardTitle>Notifications & security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-5">
              <BellRing className="mb-2 h-5 w-5 text-brand-600" />
              <p className="font-semibold text-slate-950">Reminder cadence</p>
              <p className="mt-2 text-sm text-slate-500">Daily at 8:00 AM, weekly review on Fridays at 4:00 PM.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <ShieldCheck className="mb-2 h-5 w-5 text-brand-600" />
              <p className="font-semibold text-slate-950">Account protection</p>
              <p className="mt-2 text-sm text-slate-500">Password + Google OAuth ready. Add Clerk keys for production auth enforcement.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
