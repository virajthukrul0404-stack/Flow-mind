import { NextResponse } from "next/server";

import { prioritizeTasks } from "@/lib/ai";
import { listTasks } from "@/lib/store/demo-store";
import { featureFlags } from "@/lib/utils";

export async function POST() {
  if (!featureFlags.ai) {
    return NextResponse.json(
      {
        error: "AI prioritization is coming soon. Add your production AI key and set NEXT_PUBLIC_ENABLE_AI=true to enable it."
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ tasks: prioritizeTasks(listTasks()) });
}
