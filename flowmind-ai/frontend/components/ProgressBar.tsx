"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  animate?: boolean;
}

export default function ProgressBar({
  progress,
  height = 8,
  color = "bg-blue-600 dark:bg-blue-500",
  animate = true,
}: ProgressBarProps) {
  return (
    <div
      className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden"
      style={{ height }}
    >
      <motion.div
        className={`h-full ${color}`}
        initial={animate ? { width: 0 } : false}
        animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
