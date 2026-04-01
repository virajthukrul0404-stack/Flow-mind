import { NextResponse } from "next/server";

import { listTasks, addTask } from "@/lib/store/demo-store";
import { parseTaskInput } from "@/lib/ai";
import type { Task } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ tasks: listTasks() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Task> & { input?: string };
  const parsed = body.input ? parseTaskInput(body.input) : null;

  const task: Task = {
    id: `task-${Date.now()}`,
    title: body.title || parsed?.title || "Untitled task",
    description: body.description,
    status: body.status || "TODO",
    priority: body.priority || parsed?.priority || "medium",
    dueDate: body.dueDate || parsed?.dueDate,
    tags: body.tags || parsed?.tags || ["inbox"],
    estimatedMinutes: body.estimatedMinutes || parsed?.estimatedMinutes,
    aiSuggestion: body.aiSuggestion || "Start with the smallest next action to build momentum."
  };

  addTask(task);
  return NextResponse.json({ task }, { status: 201 });
}
