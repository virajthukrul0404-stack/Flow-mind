"use client";

import { useEffect } from "react";
import { useTimerStore } from "@/store/useTimerStore";

export function TimerEngine() {
  const status = useTimerStore((state) => state.status);
  const tick = useTimerStore((state) => state.tick);

  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [status, tick]);

  return null;
}
