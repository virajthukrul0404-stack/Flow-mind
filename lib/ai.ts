import { addDays, nextFriday, nextMonday, startOfHour } from "date-fns";

import type { ChatMessage, Goal, Task, TaskPriority } from "@/lib/types";

export const TASK_PARSE_PROMPT = `
Parse this natural language input into a task object.
Return JSON only: { title, priority, dueDate, tags, estimatedMinutes }
Priority: low/medium/high/urgent
`;

export const BRIEFING_PROMPT = `
Generate a concise morning productivity briefing for the user.
Be encouraging, specific, and under 150 words.
`;

export const MILESTONE_PROMPT = `
Break this goal into 5-7 specific, actionable milestones.
Return JSON array: [{ title, order, estimatedDays }]
`;

type GroqChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

function getAiConfig() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return null;
  }

  return {
    apiKey,
    baseURL: (process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, ""),
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
  };
}

const aiConfig = getAiConfig();

export function buildSystemPrompt(userContext: {
  tasks: Task[];
  goals: Goal[];
  meetings?: number;
}) {
  return `You are FlowMind, a personal productivity AI assistant.
You help the user manage tasks, set goals, plan their day, stay focused, and improve productivity habits.
You have access to the user's tasks, goals, and calendar.
Be concise, actionable, and encouraging.

Tasks:
${userContext.tasks.map((task) => `- ${task.title} (${task.priority}, ${task.status})`).join("\n")}

Goals:
${userContext.goals.map((goal) => `- ${goal.title}: ${goal.progress}%`).join("\n")}

Meetings today: ${userContext.meetings ?? 0}`;
}

function detectPriority(input: string): TaskPriority {
  if (/(urgent|asap|immediately|right away)/i.test(input)) {
    return "urgent";
  }

  if (/(important|priority|today|tonight)/i.test(input)) {
    return "high";
  }

  if (/(sometime|later|eventually)/i.test(input)) {
    return "low";
  }

  return "medium";
}

function detectDueDate(input: string) {
  const lower = input.toLowerCase();
  const base = startOfHour(new Date());

  if (lower.includes("tomorrow")) {
    return addDays(base, 1).toISOString();
  }

  if (lower.includes("monday")) {
    return nextMonday(base).toISOString();
  }

  if (lower.includes("friday")) {
    return nextFriday(base).toISOString();
  }

  const timeMatch = lower.match(/(\d{1,2})(?::(\d{2}))?\s?(am|pm)/);
  if (timeMatch) {
    const hours = Number.parseInt(timeMatch[1] || "9", 10);
    const minutes = Number.parseInt(timeMatch[2] || "0", 10);
    const meridiem = timeMatch[3];
    const date = new Date(base);
    const normalizedHour = meridiem === "pm" && hours < 12 ? hours + 12 : hours % 12;
    date.setHours(normalizedHour, minutes, 0, 0);
    return date.toISOString();
  }

  return undefined;
}

function detectEstimate(input: string) {
  const match = input.match(/(\d+)\s?(min|mins|minutes|hr|hrs|hours)/i);
  if (!match) {
    return undefined;
  }

  const amount = Number.parseInt(match[1] || "0", 10);
  const unit = match[2]?.toLowerCase();
  return unit?.startsWith("h") ? amount * 60 : amount;
}

export function parseTaskInput(userInput: string) {
  const tags = [...userInput.matchAll(/#([\w-]+)/g)].map((match) => match[1]);
  const sanitized = userInput
    .replace(/#([\w-]+)/g, "")
    .replace(/\b(by|before|due)\b.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: sanitized || "Untitled task",
    priority: detectPriority(userInput),
    dueDate: detectDueDate(userInput),
    tags,
    estimatedMinutes: detectEstimate(userInput)
  };
}

export function generateFallbackBriefing(tasks: Task[], goals: Goal[], focusMinutes = 140) {
  const dueSoon = tasks.filter((task) => task.status !== "DONE").slice(0, 3);
  const activeGoal = goals[0];

  return `You have ${dueSoon.length} priority tasks that deserve attention first, starting with ${dueSoon[0]?.title ?? "your top priority"}. Protect one 90-minute focus block before your reactive work creeps in. Your momentum goal is "${activeGoal?.title ?? "stay consistent"}", so end the day by moving that forward for at least 20 minutes. Yesterday you logged ${focusMinutes} minutes of focus time, so aim to match or slightly beat that without overloading yourself.`;
}

export function generateMilestones(goalTitle: string, targetDate: string) {
  const target = new Date(targetDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  return [
    { title: `Define the success criteria for ${goalTitle}`, order: 1, estimatedDays: 2 },
    { title: "Map the work into weekly checkpoints", order: 2, estimatedDays: 3 },
    { title: "Complete the first visible milestone", order: 3, estimatedDays: 5 },
    { title: `Review progress and remove blockers before ${target}`, order: 4, estimatedDays: 2 },
    { title: "Ship the final iteration and document the win", order: 5, estimatedDays: 4 }
  ];
}

export function prioritizeTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

export async function generateChatResponse(messages: ChatMessage[], userContext: { tasks: Task[]; goals: Goal[] }) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!aiConfig) {
    return `Here's the move: start with ${userContext.tasks[0]?.title ?? "your most urgent task"} for 45 focused minutes, then clear one small admin task to build momentum. Your most important longer-term bet is ${userContext.goals[0]?.title ?? "your top goal"}, so protect a second block for that before the day ends.`;
  }

  try {
    const response = await fetch(`${aiConfig.baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${aiConfig.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: aiConfig.model,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt({ tasks: userContext.tasks, goals: userContext.goals, meetings: 2 })
          },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content
          })),
          {
            role: "user",
            content: latestUserMessage?.content || "Plan my day"
          }
        ],
        max_tokens: 400
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq request failed with ${response.status}: ${errorText.slice(0, 300)}`);
    }

    const completion = (await response.json()) as GroqChatCompletionResponse;
    return completion.choices?.[0]?.message?.content || "Let's make the next hour count.";
  } catch (error) {
    console.error("AI chat request failed; using fallback response.", error);
    return `I couldn't reach the AI provider right now, so here's a quick plan: start with ${
      userContext.tasks[0]?.title ?? "your top task"
    } for 45 minutes, then complete one smaller admin task, and block 30 minutes for ${
      userContext.goals[0]?.title ?? "your top goal"
    }.`;
  }
}

export async function* streamChatResponse(
  messages: ChatMessage[],
  userContext: { tasks: Task[]; goals: Goal[] }
) {
  const response = await generateChatResponse(messages, userContext);
  const words = response.split(" ");

  for (const word of words) {
    yield `${word} `;
  }
}
