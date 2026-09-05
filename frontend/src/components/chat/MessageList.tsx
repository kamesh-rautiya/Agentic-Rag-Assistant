import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import type { ChatMessage } from "@/hooks/useAgentStream";
import { MessageBubble } from "./MessageBubble";

export function MessageList({
  messages,
  liveAnswer,
  streaming,
  onSelectPrompt,
}: {
  messages: ChatMessage[];
  liveAnswer: string;
  streaming: boolean;
  onSelectPrompt?: (text: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);

  useEffect(() => {
    if (atBottomRef.current) endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, liveAnswer, streaming]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    atBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const empty = messages.length === 0 && !liveAnswer;

  const starterPrompts = [
    {
      title: "Analyze Internal Architecture",
      prompt: "What auth mechanisms does Aurora support, and how does mTLS work? Cite sources.",
      tag: "Knowledge Base",
    },
    {
      title: "Live Web Research",
      prompt: "Search the web for the latest developments in AI agents and summarize key findings.",
      tag: "Web Search",
    },
    {
      title: "Comparative Technical Summary",
      prompt: "Compare vector databases and hybrid search techniques for enterprise RAG.",
      tag: "Synthesis",
    },
  ];

  return (
    <div onScroll={onScroll} className="flex-1 overflow-y-auto px-4 py-6">
      {empty ? (
        <div className="mx-auto mt-12 max-w-xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent shadow-inner">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Nexus Intelligent Assistant</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Autonomous agent that plans, cross-references your documents with live web research, and delivers citations in real time.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 text-left">
            {starterPrompts.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPrompt && onSelectPrompt(item.prompt)}
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md hover:shadow-accent/5 cursor-pointer"
              >
                <div>
                  <span className="inline-block rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent mb-2">
                    {item.tag}
                  </span>
                  <p className="text-xs font-semibold text-fg group-hover:text-accent transition-colors">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted line-clamp-2">
                    {item.prompt}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))}
          {liveAnswer && <MessageBubble role="assistant" content={liveAnswer} streaming />}
          {streaming && !liveAnswer && (
            <MessageBubble role="assistant" content="" streaming />
          )}
          <div ref={endRef} />
        </div>
      )}
    </div>
  );
}
