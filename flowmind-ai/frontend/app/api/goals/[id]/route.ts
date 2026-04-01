import { NextResponse } from "next/server";

import { updateGoal } from "@/lib/store/demo-store";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patch = await request.json();
  const goal = updateGoal(params.id, patch);

  if (!goal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  return NextResponse.json({ goal });
}
