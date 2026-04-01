"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

const mobileLinks = dashboardLinks.slice(0, 5);

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[calc(100%-1.5rem)] max-w-md items-center justify-between rounded-full border border-white/80 bg-white/90 px-3 py-2 shadow-2xl backdrop-blur xl:hidden">
      {mobileLinks.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            className={cn(
              "flex min-w-[56px] flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold transition",
              active ? "bg-slate-950 text-white" : "text-slate-500"
            )}
            href={item.href}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
