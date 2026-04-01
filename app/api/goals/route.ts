import { NextResponse } from "next/server";

import { addGoal, listGoals } from "@/lib/store/demo-store";
import { generateMilestones } from "@/lib/ai";
import type { Goal } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ goals: listGoals() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Goal>;
  const title = body.title || "New goal";
  const targetDate = body.targetDate || new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString();
  const milestones = generateMilestones(title, targetDate).map((item, index) => ({
    id: `milestone-${Date.now()}-${index}`,
    title: item.title,
    completed: false,
    order: item.order
  }));

  const goal: Goal = {
    id: `goal-${Date.now()}`,
    title,
    description: body.description || "A new goal created from the FlowMind dashboard.",
    category: body.category || "career",
    targetDate,
    progress: body.progress || 0,
    milestones: body.milestones || milestones,
    streak: body.streak || 0,
    aiCoachingEnabled: body.aiCoachingEnabled ?? true
  };

  addGoal(goal);
  return NextResponse.json({ goal }, { status: 201 });
}
