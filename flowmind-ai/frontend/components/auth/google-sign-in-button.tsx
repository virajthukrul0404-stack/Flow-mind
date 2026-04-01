"use client";

import { useState, useTransition } from "react";
import { Chrome, Loader2 } from "lucide-react";
import { signInWithPopup, signOut } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { hasFirebaseClientConfig, prepareFirebaseGoogleAuth } from "@/lib/firebase-client";

export function GoogleSignInButton({
  callbackUrl = "/dashboard",
  className,
  mode = "login"
}: {
  callbackUrl?: string;
  className?: string;
  mode?: "login" | "signup";
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

            if (!hasFirebaseClientConfig()) {
              setError("Firebase web auth is not configured yet.");
              return;
            }

            try {
              const { auth, provider } = await prepareFirebaseGoogleAuth();
              const result = await signInWithPopup(auth, provider);
              const idToken = await result.user.getIdToken(true);

              const response = await fetch(`/api/auth/${mode}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ idToken })
              });

              const payload = (await response.json().catch(() => null)) as { error?: string } | null;

              await signOut(auth);

              if (!response.ok) {
                throw new Error(payload?.error || "Google authentication failed.");
              }

              window.location.assign(callbackUrl);
            } catch (caughtError) {
              console.error(`Firebase ${mode} failed`, caughtError);
              setError(caughtError instanceof Error ? caughtError.message : "Google authentication failed.");
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
