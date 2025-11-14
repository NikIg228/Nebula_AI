"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
        className="flex-1 overflow-y-auto"
      >
        <div className="mx-auto w-full max-w-3xl px-3 md:px-4 py-4 md:py-8">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex h-full min-h-[50vh] md:min-h-[60vh] items-center justify-center"
              >
                <div className="text-center px-4">
                  <p className="text-xl md:text-2xl font-bold text-[#F2F2F2]">
                    Я здесь. Что хочешь обсудить?
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {messages.map((message, index) => (
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
