"use client";

import { useState, useTransition } from "react";
import { Chrome, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function GoogleSignInButton({
  callbackUrl = "/dashboard",
  className
}: {
  callbackUrl?: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <Button
        className={className}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const response = await signIn("google", {
              callbackUrl,
              redirect: false
            });

            if (response?.error) {
              setError("Google sign-in failed. Please check OAuth settings and try again.");
              return;
            }

            if (response?.url) {
              window.location.assign(response.url);
            }
          })
        }
        type="button"
        variant="outline"
      >
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
        Continue with Google
      </Button>
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
    </div>
  );
}
