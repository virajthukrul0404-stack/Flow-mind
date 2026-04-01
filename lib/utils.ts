import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const featureFlags = {
  ai: process.env.NEXT_PUBLIC_ENABLE_AI === "true",
  payments: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === "true"
};

export function formatDateLabel(value?: string | Date) {
  if (!value) {
    return "No deadline";
  }

  return format(new Date(value), "MMM d");
}

export function formatTimeLabel(value?: string | Date) {
  if (!value) {
    return "Any time";
  }

  return format(new Date(value), "EEE, MMM d • h:mm a");
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
