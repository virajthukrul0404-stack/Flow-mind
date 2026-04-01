import { redirect } from "next/navigation";

import { AuthCard } from "@/components/shared/auth-card";
import { getViewer } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const viewer = await getViewer();

  if (viewer) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <AuthCard mode="login" />
    </main>
  );
}
