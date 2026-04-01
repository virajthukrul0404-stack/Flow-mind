import { NextResponse } from "next/server";

import { generateMilestones } from "@/lib/ai";
import { featureFlags } from "@/lib/utils";

export async function POST(request: Request) {
  if (!featureFlags.ai) {
    return NextResponse.json(
      {
        error: "AI milestone generation is coming soon. Add your production AI key and set NEXT_PUBLIC_ENABLE_AI=true to enable it."
      },
      { status: 503 }
    );
  }

  const { goalTitle, targetDate } = (await request.json()) as {
    goalTitle: string;
    targetDate: string;
  };

  if (!goalTitle || !targetDate) {
    return NextResponse.json({ error: "goalTitle and targetDate are required" }, { status: 400 });
  }

  return NextResponse.json({ milestones: generateMilestones(goalTitle, targetDate) });
}
