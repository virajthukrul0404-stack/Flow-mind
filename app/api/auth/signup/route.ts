import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    message: "Signup endpoint ready. Replace demo handling with Clerk or your preferred auth provider.",
    user: {
      email: body.email || "demo@flowmind.ai"
    }
  });
}
