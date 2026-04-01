import { cookies } from "next/headers";

import { getFirebaseAdminAuth, hasFirebaseAdminConfig } from "@/lib/firebase-admin";
import { SESSION_COOKIE_NAME } from "@/lib/firebase-session";
import type { Viewer } from "@/lib/types";

export async function getViewer(): Promise<Viewer | null> {
  try {
    if (!hasFirebaseAdminConfig()) {
      return null;
    }

    const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return null;
    }

    const decoded = await getFirebaseAdminAuth().verifySessionCookie(sessionCookie, true);

    if (!decoded.email) {
      return null;
    }

    return {
      id: decoded.uid,
      name: decoded.name || "FlowMind User",
      email: decoded.email,
      plan: "FREE"
    };
  } catch (error) {
    console.error("Failed to read Firebase auth session", error);
    return null;
  }
}
