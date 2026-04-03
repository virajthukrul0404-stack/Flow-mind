"use client";

import Link from "next/link";
import { useState } from "react";
import { Linkedin, Twitter, Youtube } from "lucide-react";

import { marketingNav } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const [joined, setJoined] = useState(false);

  return (
    <footer className="border-t border-white/70 bg-slate-950 text-slate-100">
      <div className="container-shell grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo className="[&_span:last-child_span:first-child]:text-white [&_span:last-child_span:last-child]:text-slate-400" />
          <p className="max-w-sm text-slate-400">
            FlowMind AI helps ambitious people capture, prioritize, and finish meaningful work without the chaos.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Product</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Company</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/">Legal</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Newsletter</h3>
          <p className="text-sm text-slate-400">Weekly systems, smart workflows, and AI planning templates.</p>
          <div className="flex gap-3">
            {joined ? (
              <p className="text-emerald-400 font-medium py-2">You're on the list! 🎉</p>
            ) : (
              <>
                <Input className="border-slate-800 bg-slate-900 text-white" placeholder="Work email" type="email" />
                <Button onClick={() => setJoined(true)} className="shrink-0">Join</Button>
              </>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Link className="rounded-full border border-slate-800 p-2 text-slate-400 hover:text-white" href="https://x.com">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              className="rounded-full border border-slate-800 p-2 text-slate-400 hover:text-white"
              href="https://linkedin.com"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              className="rounded-full border border-slate-800 p-2 text-slate-400 hover:text-white"
              href="https://youtube.com"
            >
              <Youtube className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-900 py-5 text-center text-sm text-slate-500">
        Copyright {new Date().getFullYear()} FlowMind AI. All rights reserved.
      </div>
    </footer>
  );
}
