import dynamic from "next/dynamic";

const ChatPanel = dynamic(() => import("@/components/dashboard/chat-panel").then((mod) => mod.ChatPanel), {
  ssr: false,
  loading: () => <div className="surface-card h-[680px] animate-pulse" />
});

export default function AIChatPage() {
  return <ChatPanel />;
}
