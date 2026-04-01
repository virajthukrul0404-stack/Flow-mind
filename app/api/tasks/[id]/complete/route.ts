import { NextResponse } from "next/server";

import { completeTask } from "@/lib/store/demo-store";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const task = completeTask(params.id);

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ task });
}
