"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ChatMessage } from "@/types/chat";

type ChatContainerProps = {
  messages: ChatMessage[];
  isStreaming: boolean;
  onDeleteMessage: (messageId: string) => void;
};

export function ChatContainer({
  messages,
  isStreaming,
  onDeleteMessage,
}: ChatContainerProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (viewportRef.current) {
      const scrollHeight = viewportRef.current.scrollHeight;
      const height = viewportRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      
      viewportRef.current.scrollTo({
        top: maxScrollTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length]);

  useEffect(() => {
    if (isStreaming) {
      const intervalId = setInterval(() => {
        scrollToBottom();
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [isStreaming]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div
        ref={viewportRef}
        className="flex-1 overflow-y-auto bg-gradient-to-b from-background via-background/80 to-background"
      >
        <div className="mx-auto w-full max-w-2xl px-4 py-4">
          <AnimatePresence>
            {messages.length === 0 ? (
              <div className="flex h-full min-h-[60vh] items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-foreground">
                    Готов, когда ты готов.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onDelete={onDeleteMessage}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
