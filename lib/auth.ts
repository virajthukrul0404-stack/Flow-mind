import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import type { Viewer } from "@/lib/types";

export async function getViewer(): Promise<Viewer | null> {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Failed to read auth session", error);
    return null;
  }

  if (!session?.user?.email) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name || "FlowMind User",
    email: session.user.email,
    plan: session.user.plan || "FREE"
  };
}
