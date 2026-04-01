import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link className={cn("inline-flex items-center gap-3", className)} href="/">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-glow">
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/70 via-transparent to-accent-500/70" />
        <span className="relative font-display text-lg">F</span>
      </span>
      <span className="flex flex-col">
        <span className="font-display text-lg font-bold leading-none text-slate-950">FlowMind AI</span>
        <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Productivity Co-Pilot</span>
      </span>
    </Link>
  );
}
