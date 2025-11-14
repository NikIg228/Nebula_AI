"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChatSession } from "@/types/chat";

type ChatListProps = {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelect: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
};

export function ChatList({
  sessions,
  activeSessionId,
  onSelect,
  onDelete,
}: ChatListProps) {
  const orderedSessions = useMemo(
    () =>
      sessions
        .slice()
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
    [sessions]
  );

  if (orderedSessions.length === 0) {
    return (
      <div className="px-3 py-8 text-center">
        <p className="text-sm text-[#9ca0ab]">
          История пока пуста
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 px-1.5 md:px-2 py-2">
      {orderedSessions.map((session) => {
        const isActive = activeSessionId === session.id;
        return (
          <motion.div
            key={session.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group relative"
          >
            <div
              onClick={() => onSelect(session.id)}
              className={cn(
                "relative flex w-full items-center gap-2 md:gap-3 rounded-lg px-2.5 py-2 md:px-3 md:py-2.5 text-left transition-all duration-200 cursor-pointer",
                "hover:bg-[#8A2FFF]/10 active:bg-[#8A2FFF]/15",
                isActive
                  ? "bg-[#8A2FFF]/15 text-[#F2F2F2] border-l-2 border-[#8A2FFF] shadow-[0_0_15px_rgba(138,47,255,0.3)]"
                  : "text-[#D1D1D1] hover:text-[#F2F2F2]"
              )}
            >
              <MessageSquare className={cn(
                "h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0 transition-colors",
                isActive ? "text-[#C084FC]" : "text-[#9ca0ab]"
              )} />
              <span className="flex-1 truncate text-xs md:text-sm font-medium">
                {session.title}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-6 w-6 md:h-7 md:w-7 opacity-100 md:opacity-0 transition-all duration-200 md:group-hover:opacity-100 flex-shrink-0",
                      "hover:bg-[#8A2FFF]/20 active:bg-[#8A2FFF]/30",
                      "text-[#9ca0ab] hover:text-red-400 active:text-red-500"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(session.id);
                    }}
                    aria-label="Удалить диалог"
                  >
                    <Trash2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Удалить диалог</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default ChatList;