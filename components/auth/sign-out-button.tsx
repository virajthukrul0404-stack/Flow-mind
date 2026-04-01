"use client";

import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTransition } from "react";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      onClick={() =>
        startTransition(() => {
          void signOut({ callbackUrl: "/" });
        })
      }
      type="button"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      Sign out
    </button>
  );
}
