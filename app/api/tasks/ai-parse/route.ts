import { NextResponse } from "next/server";

import { parseTaskInput } from "@/lib/ai";
import { featureFlags } from "@/lib/utils";

export async function POST(request: Request) {
  if (!featureFlags.ai) {
    return NextResponse.json(
      {
        error: "AI task parsing is coming soon. Add your production AI key and set NEXT_PUBLIC_ENABLE_AI=true to enable it."
      },
      { status: 503 }
    );
  }

  const { input } = (await request.json()) as { input: string };

  if (!input) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  return NextResponse.json(parseTaskInput(input));
}
