import { createFirebaseSession } from "@/lib/firebase-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return createFirebaseSession(request, "login");
}
