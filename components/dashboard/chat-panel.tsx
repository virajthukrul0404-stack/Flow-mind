"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Send, Sparkles } from "lucide-react";

import { chatSuggestions, goals, initialChatMessages, tasks } from "@/lib/data/mock-data";
import type { ChatMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatTimeLabel } from "@/lib/utils";

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
    SpeechRecognition?: new () => BrowserSpeechRecognition;
  }
}

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(nextMessage?: string) {
    const content = (nextMessage ?? input).trim();
    if (!content || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      createdAt: new Date().toISOString()
    };
    const assistantId = `assistant-${Date.now()}`;

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        actions: ["Add Task", "Set Reminder", "Block Focus Time"]
      }
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((message) => ({
            role: message.role,
            content: message.content
          })),
          userContext: { tasks, goals }
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        const message = payload?.error || "AI chat is unavailable right now. Please try again.";
        throw new Error(message);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response stream available");
      }

      let done = false;
      while (!done) {
        const result = await reader.read();
        done = result.done;
        const chunk = decoder.decode(result.value || new Uint8Array(), { stream: !done });
        if (chunk) {
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? {
                    ...message,
                    content: `${message.content}${chunk}`
                  }
                : message
            )
          );
        }
      }
    } catch (error) {
      const errorText = error instanceof Error ? error.message : "AI chat failed unexpectedly.";
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content: errorText,
                actions: ["Try Again"]
              }
            : message
        )
      );
    } finally {
      setLoading(false);
    }
  }

  function startVoiceCapture() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceEnabled(false);
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        setInput(transcript);
      }
    };
    recognition.start();
    setVoiceEnabled(true);
    recognition.onend = () => setVoiceEnabled(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <Card className="min-h-[70vh]">
        <CardHeader>
          <CardTitle>AI chat</CardTitle>
          <p className="text-sm text-slate-500">Ask FlowMind to plan your day, review your goals, or reshuffle your priorities.</p>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto rounded-[28px] bg-slate-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-3xl rounded-[24px] px-4 py-3 ${message.role === "assistant" ? "bg-white text-slate-800" : "ml-auto bg-slate-950 text-white"}`}
              >
                <div className="whitespace-pre-wrap leading-7">{message.content || (loading ? "Thinking..." : "")}</div>
                <div className={`mt-3 text-xs ${message.role === "assistant" ? "text-slate-400" : "text-slate-300"}`}>
                  {formatTimeLabel(message.createdAt)}
                </div>
                {message.actions?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.actions.map((action) => (
                      <button
                        key={action}
                        className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                        type="button"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {chatSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
                onClick={() => sendMessage(suggestion)}
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-4">
            <Textarea
              className="min-h-[120px] border-none p-0 shadow-none focus:ring-0"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask FlowMind to plan your day..."
              value={input}
            />
            <div className="mt-4 flex items-center justify-between">
              <Button onClick={startVoiceCapture} type="button" variant="outline">
                <Mic className={`mr-2 h-4 w-4 ${voiceEnabled ? "text-brand-600" : ""}`} />
                Voice input
              </Button>
              <Button onClick={() => sendMessage()} type="button">
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Context injected into AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="rounded-3xl bg-brand-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-brand-700">
              <Sparkles className="h-4 w-4" />
              Current tasks
            </div>
            <ul className="mt-3 space-y-2 text-slate-700">
              {tasks.slice(0, 3).map((task) => (
                <li key={task.id}>• {task.title}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-950">Goals in progress</p>
            <ul className="mt-3 space-y-2 text-slate-700">
              {goals.map((goal) => (
                <li key={goal.id}>
                  • {goal.title} ({goal.progress}%)
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
