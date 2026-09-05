import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { UploadDialog } from "@/components/upload/UploadDialog";

export function AppShell({
  health,
  chat,
  inspector,
  onIngested,
}: {
  health?: ReactNode;
  chat: ReactNode;
  inspector: ReactNode;
  onIngested?: (chunks: number) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border bg-surface/75 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-md shadow-indigo-500/20">
            <span className="text-sm font-bold text-white tracking-tight">N</span>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight">Nexus AI</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Agentic RAG
              </span>
            </div>
            <span className="text-[11px] text-muted font-normal">Intelligent Knowledge & Web Synthesis</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          {health}
          <UploadDialog onIngested={onIngested} />
          <ThemeToggle />
        </div>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_360px]">
        <div className="min-h-0 border-r border-border">{chat}</div>
        <aside className="hidden min-h-0 flex-col gap-4 overflow-y-auto bg-bg p-4 lg:flex">
          {inspector}
        </aside>
      </main>
    </div>
  );
}
