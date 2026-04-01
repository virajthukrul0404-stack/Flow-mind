import { SignOutButton } from "@/components/auth/sign-out-button";
import { Bell, Search } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Viewer } from "@/lib/types";

export function DashboardHeader({ viewer }: { viewer: Viewer }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">FlowMind dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">Welcome back, {viewer.name.split(" ")[0]}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden min-w-[280px] flex-1 xl:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10" placeholder="Search tasks, goals, meetings..." />
          </div>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white">
            <Bell className="h-4 w-4 text-slate-600" />
          </button>
          <div className="hidden xl:block">
            <SignOutButton />
          </div>
          <Badge variant="accent">{viewer.plan}</Badge>
          <Avatar name={viewer.name} />
        </div>
      </div>
    </header>
  );
}
