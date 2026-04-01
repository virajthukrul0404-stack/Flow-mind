"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { signOut } from "firebase/auth";

import { getFirebaseClientAuth, hasFirebaseClientConfig } from "@/lib/firebase-client";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      onClick={() =>
        startTransition(async () => {
          try {
            await fetch("/api/auth/logout", {
              method: "POST"
            });

            if (hasFirebaseClientConfig()) {
              await signOut(getFirebaseClientAuth());
            }
          } catch (error) {
            console.error("Firebase logout failed", error);
          } finally {
            window.location.assign("/");
          }
        })
      }
      type="button"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      Sign out
    </button>
  );
}
