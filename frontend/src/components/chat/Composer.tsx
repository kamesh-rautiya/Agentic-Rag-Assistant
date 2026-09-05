import { useState, useRef, useEffect } from "react";
import { ArrowUp, Square } from "lucide-react";

export function Composer({
  onSend,
  onStop,
  streaming,
}: {
  onSend: (text: string) => void;
  onStop: () => void;
  streaming: boolean;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const submit = () => {
    const text = value.trim();
    if (!text || streaming) return;
    onSend(text);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-border bg-bg/80 backdrop-blur-md px-4 py-3.5">
      <div className="mx-auto flex max-w-3xl items-end gap-2.5 rounded-2xl border border-border/90 bg-surface/90 p-2.5 shadow-sm transition-all duration-200 focus-within:border-accent/70 focus-within:shadow-[0_0_24px_rgba(99,102,241,0.18)] focus-within:ring-1 focus-within:ring-accent/50">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Ask anything — Nexus will intelligently search docs and the live web…"
          className="max-h-[200px] flex-1 resize-none bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-muted/80 leading-relaxed"
        />
        {streaming ? (
          <button
            onClick={onStop}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-fg hover:bg-border transition-colors cursor-pointer"
            title="Stop generation"
          >
            <Square className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!value.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-sm hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
            title="Send message"
          >
            <ArrowUp className="h-4 w-4 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
}
