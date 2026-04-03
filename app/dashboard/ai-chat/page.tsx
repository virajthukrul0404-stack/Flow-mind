import dynamic from "next/dynamic";

import { ComingSoonCard } from "@/components/shared/section-heading";
import { featureFlags } from "@/lib/utils";

const ChatPanel = dynamic(() => import("@/components/dashboard/chat-panel").then((mod) => mod.ChatPanel), {
  ssr: false,
  loading: () => <div className="surface-card h-[680px] animate-pulse" />
});

export default function AIChatPage() {
  if (!featureFlags.ai) {
    return (
      <ComingSoonCard
        badge="AI disabled"
        description="The AI workspace is hidden until your production AI keys are added and verified."
        details="Keep the code as-is, add your Groq key later, then set NEXT_PUBLIC_ENABLE_AI=true to turn the whole section back on."
        title="AI chat is coming soon"
      />
    );
  }

  return <ChatPanel />;
}
