"use client";

import { motion } from "framer-motion";
import { CheckCircle, Info, XCircle, X } from "lucide-react";

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  onDismiss: () => void;
}

export default function Toast({ id, message, type, onDismiss }: ToastProps) {
  const Icon = type === "success" ? CheckCircle : type === "error" ? XCircle : Info;
  const colors = {
    success: "bg-green-50 text-green-900 border-green-200",
    error: "bg-red-50 text-red-900 border-red-200",
    info: "bg-blue-50 text-blue-900 border-blue-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-center justify-between gap-3 min-w-[300px] p-4 rounded-lg border shadow-lg ${colors[type]}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 shrink-0" />
        <p className="text-sm font-medium leading-none">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
