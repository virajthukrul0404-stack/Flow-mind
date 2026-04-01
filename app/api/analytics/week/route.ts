import { NextResponse } from "next/server";

import { focusData, goals, tasks } from "@/lib/data/mock-data";

export async function GET() {
  return NextResponse.json({
    focusData,
    completedTasks: tasks.filter((task) => task.status === "DONE").length,
    goalMomentum: goals.map((goal) => ({
      title: goal.title,
      progress: goal.progress
    }))
  });
}
