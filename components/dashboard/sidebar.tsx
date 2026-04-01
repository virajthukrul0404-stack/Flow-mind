"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/shared/logo";
import { Badge } from "@/components/ui/badge";
import { dashboardLinks } from "@/lib/constants";
import { cn, featureFlags } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const aiEnabled = featureFlags.ai;
  const paymentsEnabled = featureFlags.payments;

  return (
    <aside className="hidden h-screen w-[240px] shrink-0 border-r border-white/70 bg-white/75 px-5 py-6 backdrop-blur xl:flex xl:flex-col">
      <Logo />
      <div className="mt-8 rounded-3xl border border-brand-100 bg-brand-50/70 p-4">
        <Badge variant="accent">{aiEnabled || paymentsEnabled ? "Pro workspace" : "Setup mode"}</Badge>
        <p className="mt-3 text-sm font-medium text-slate-800">
          {aiEnabled || paymentsEnabled
            ? "AI planning, calendar intelligence, and team dashboards are active."
            : "AI and billing are hidden behind coming-soon gates until your production keys are ready."}
        </p>
      </div>
      <nav className="mt-8 space-y-2">
        {dashboardLinks.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-slate-950 text-white shadow-glow"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              )}
              href={item.href}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-3xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-950">Weekly review</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          You reclaimed 3.2 hours this week by protecting deep work before meetings.
        </p>
      </div>
    </aside>
  );
}
