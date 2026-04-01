import { cookies } from "next/headers";

import { destroyFirebaseSession, SESSION_COOKIE_NAME } from "@/lib/firebase-session";

export const runtime = "nodejs";

export async function POST() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  return destroyFirebaseSession(sessionCookie);
}
