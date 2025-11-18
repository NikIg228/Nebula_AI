"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import { ChatContextMenu } from "./ChatContextMenu";

export function ArchiveTab() {
  const sessions = useChatStore((state) => state.sessions);
  const selectSession = useChatStore((state) => state.selectSession);
  const unarchiveSession = useChatStore((state) => state.unarchiveSession);

  const archivedSessions = useMemo(
    () =>
      sessions
        .filter((session) => session.archived)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
    [sessions]
  );

  const handleSelect = (sessionId: string) => {
    selectSession(sessionId);
    unarchiveSession(sessionId);
  };

  if (archivedSessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Archive className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-sm text-muted-foreground text-center">
          Архив пуст
        </p>
        <p className="text-xs text-muted-foreground/70 text-center mt-2">
          Архивированные чаты будут отображаться здесь
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 py-4">
      <div className="px-4 pb-2">
        <h3 className="text-sm font-semibold text-foreground">
          Архивированные чаты ({archivedSessions.length})
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Восстановите чат, чтобы вернуть его в основной список
        </p>
      </div>
      <div className="space-y-1 px-2">
        {archivedSessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            <div
              onClick={() => handleSelect(session.id)}
              className={cn(
                "relative flex w-full items-center gap-2 md:gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 cursor-pointer",
                "hover:bg-[#8A2FFF]/10 active:bg-[#8A2FFF]/15",
                "text-[#D1D1D1] hover:text-[#F2F2F2]"
              )}
            >
              <Archive className="h-4 w-4 flex-shrink-0 text-[#9ca0ab]" />
              <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0 text-[#9ca0ab]" />
              <span className="flex-1 truncate text-sm font-medium">
                {session.title}
              </span>
              <ChatContextMenu session={session} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

