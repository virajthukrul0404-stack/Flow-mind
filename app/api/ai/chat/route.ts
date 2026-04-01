import { NextResponse } from "next/server";

import { streamChatResponse } from "@/lib/ai";
import { goals, tasks } from "@/lib/data/mock-data";
import type { ChatMessage, Goal, Task } from "@/lib/types";
import { featureFlags } from "@/lib/utils";

export async function POST(request: Request) {
  if (!featureFlags.ai) {
    return NextResponse.json(
      {
        error: "AI chat is coming soon. Add your production AI key and set NEXT_PUBLIC_ENABLE_AI=true to enable it."
      },
      { status: 503 }
    );
  }

  const body = (await request.json()) as {
    messages?: ChatMessage[];
    userContext?: {
      tasks?: Task[];
      goals?: Goal[];
    };
  };

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sourceMessages = body.messages || [];
      const userContext = {
        tasks: body.userContext?.tasks || tasks,
        goals: body.userContext?.goals || goals
      };

      for await (const chunk of streamChatResponse(sourceMessages, userContext)) {
        controller.enqueue(encoder.encode(chunk));
      }

      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache"
    }
  });
}
