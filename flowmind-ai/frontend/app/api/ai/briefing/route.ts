import { NextResponse } from "next/server";

import { generateFallbackBriefing } from "@/lib/ai";
import { goals, tasks } from "@/lib/data/mock-data";
import { featureFlags } from "@/lib/utils";

export async function POST(request: Request) {
  if (!featureFlags.ai) {
    return NextResponse.json(
      {
        error: "AI briefings are coming soon. Add your production AI key and set NEXT_PUBLIC_ENABLE_AI=true to enable them."
      },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { focusMinutes?: number };
  const briefing = generateFallbackBriefing(tasks, goals, body.focusMinutes || 192);

  return NextResponse.json({ briefing });
}
