"use client";

import Link from "next/link";
import { Menu, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { marketingNav } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import Modal from "@/components/Modal";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          scrolled ? "bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 dark:bg-zinc-950/70 dark:border-zinc-800/50 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container-shell mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between gap-6">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {marketingNav.map((item) => (
              <Link key={item.href} className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link className={cn(buttonVariants({ variant: "ghost", size: "sm" }))} href="/login">
              Log in
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link className={cn(buttonVariants({ size: "sm" }))} href="/signup">
                Start Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={() => setDemoOpen(true)} className="rounded-full px-4" size="sm" variant="outline">
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <Modal isOpen={demoOpen} onClose={() => setDemoOpen(false)}>
        <div className="p-1">
          <div className="aspect-video bg-zinc-900 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/10" />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4 relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                <PlayCircle className="w-8 h-8 ml-1" />
              </div>
              <p className="text-zinc-400 font-medium font-mono text-sm tracking-widest uppercase">FlowMind Demo</p>
            </motion.div>
          </div>
        </div>
      </Modal>
    </>
  );
}
