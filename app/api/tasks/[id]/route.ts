import { NextResponse } from "next/server";

import { deleteTask, updateTask } from "@/lib/store/demo-store";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patch = await request.json();
  const task = updateTask(params.id, patch);

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ task });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = deleteTask(params.id);

  if (!deleted) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
