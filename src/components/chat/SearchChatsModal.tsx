"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MessageSquare } from "lucide-react";
import { useChatStore } from "@/store/chat-store";
import { cn } from "@/lib/utils";
import { ChatSession } from "@/types/chat";

type SearchChatsModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchChatsModal({
  isOpen,
  onOpenChange,
}: SearchChatsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const sessions = useChatStore((state) => state.sessions);
  const messages = useChatStore((state) => state.messages);
  const selectSession = useChatStore((state) => state.selectSession);

  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const results: Array<{
      session: ChatSession;
      matchType: "title" | "content";
      preview?: string;
    }> = [];

    sessions.forEach((session) => {
      // Поиск по названию
      if (session.title.toLowerCase().includes(query)) {
        results.push({
          session,
          matchType: "title",
        });
        return;
      }

      // Поиск по содержимому сообщений
      const sessionMessages = messages[session.id] || [];
      for (const message of sessionMessages) {
        if (message.content.toLowerCase().includes(query)) {
          const preview = message.content
            .substring(
              Math.max(0, message.content.toLowerCase().indexOf(query) - 50),
              Math.min(
                message.content.length,
                message.content.toLowerCase().indexOf(query) + query.length + 100
              )
            )
            .trim();
          results.push({
            session,
            matchType: "content",
            preview: `...${preview}...`,
          });
          break;
        }
      }
    });

    return results;
  }, [searchQuery, sessions, messages]);

  const handleSelectSession = (sessionId: string) => {
    selectSession(sessionId);
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col bg-[#0B0B0D]/95 backdrop-blur-xl border-[#8A2FFF]/30">
        <DialogHeader>
          <DialogTitle>Поиск в чатах</DialogTitle>
          <DialogDescription>
            Найдите чаты по названию или содержимому сообщений
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введите запрос для поиска..."
              className="pl-10"
              autoFocus
            />
          </div>
          <ScrollArea className="flex-1">
            {searchQuery.trim() && filteredSessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  Ничего не найдено
                </p>
                <p className="text-xs text-muted-foreground/70 text-center mt-2">
                  Попробуйте другой запрос
                </p>
              </div>
            ) : !searchQuery.trim() ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  Введите запрос для поиска
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredSessions.map(({ session, matchType, preview }) => (
                  <Button
                    key={session.id}
                    variant="ghost"
                    onClick={() => handleSelectSession(session.id)}
                    className={cn(
                      "w-full justify-start gap-3 h-auto p-3 text-left",
                      "hover:bg-[#8A2FFF]/10"
                    )}
                  >
                    <MessageSquare className="h-4 w-4 flex-shrink-0 text-[#C084FC]" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground truncate">
                        {session.title}
                      </div>
                      {matchType === "content" && preview && (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {preview}
                        </div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

