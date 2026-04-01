import Link from "next/link";
import { Menu, PlayCircle } from "lucide-react";

import { marketingNav } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {marketingNav.map((item) => (
            <Link key={item.href} className="text-sm font-medium text-slate-600 hover:text-slate-950" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link className={cn(buttonVariants({ variant: "ghost", size: "sm" }))} href="/login">
            Log in
          </Link>
          <Link className={cn(buttonVariants({ size: "sm" }))} href="/signup">
            Start Free
          </Link>
          <Button className="rounded-full px-4" size="sm" variant="outline">
            <PlayCircle className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
