import { NextResponse } from "next/server";

import { prioritizeTasks } from "@/lib/ai";
import { listTasks } from "@/lib/store/demo-store";

export async function POST() {
  return NextResponse.json({ tasks: prioritizeTasks(listTasks()) });
}
