import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    message: "Login endpoint ready. Replace demo handling with Clerk session creation in production.",
    user: {
      email: body.email || "demo@flowmind.ai"
    }
  });
}
