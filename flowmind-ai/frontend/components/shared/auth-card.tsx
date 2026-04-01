"use client";

import Link from "next/link";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Logo } from "@/components/shared/logo";
import { Card, CardContent } from "@/components/ui/card";

export function AuthCard({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";

  return (
    <Card className="w-full max-w-md border border-white/80 bg-white/90">
      <CardContent className="p-8">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{isSignup ? "Create your workspace" : "Welcome back"}</h1>
          <p className="text-sm text-slate-500">
            {isSignup
              ? "Start free and let FlowMind design your week around what matters."
              : "Jump back into your priorities, goals, and AI guidance."}
          </p>
        </div>
        <div className="mt-6">
          <GoogleSignInButton className="w-full" mode={mode} />
        </div>
        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
          <div className="h-px flex-1 bg-slate-200" />
          <span>Google-only authentication</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-950">What happens next</p>
          <p>
            {isSignup
              ? "Use your Google account to create your FlowMind workspace instantly through Firebase Authentication. No separate password is required."
              : "Use your Google account to sign in through Firebase and return straight to your dashboard."}
          </p>
          <p>
            By continuing, you agree to the Terms and Privacy Policy and let FlowMind use your Google profile for
            secure sign-in only.
          </p>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          {isSignup ? "Already have access?" : "New to FlowMind?"}{" "}
          <Link className="font-semibold text-brand-700" href={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Sign in with Google" : "Create your workspace"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
