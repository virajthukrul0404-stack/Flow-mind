import { NextResponse } from "next/server";

import { generateFallbackBriefing } from "@/lib/ai";
import { goals, tasks } from "@/lib/data/mock-data";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { focusMinutes?: number };
  const briefing = generateFallbackBriefing(tasks, goals, body.focusMinutes || 192);

  return NextResponse.json({ briefing });
}
