"use client";

import { motion } from "framer-motion";

interface CircularTimerProps {
  progress: number; // 0 to 100
  text: string;
  subtext?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export default function CircularTimer({
  progress,
  text,
  subtext,
  size = 280,
  strokeWidth = 12,
  color = "text-blue-600 dark:text-blue-500",
}: CircularTimerProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-zinc-100 dark:stroke-zinc-800"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`stroke-current ${color}`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "linear" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-5xl font-bold font-mono tracking-tighter text-zinc-900 dark:text-zinc-50">
          {text}
        </span>
        {subtext && (
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
