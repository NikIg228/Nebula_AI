"use client";

import { useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { ChatCompletionPayload, ChatFile, ChatMessage } from "@/types/chat";
import { useChatStore } from "@/store/chat-store";
import { toast } from "sonner";

type UseChatOptions = {
  sessionId: string;
};

export function useChat({ sessionId }: UseChatOptions) {
  const [isStreaming, setIsStreaming] = useState(false);
  const {
    addMessage,
    updateMessage,
    setLoading,
    settings,
    sessions,
    messages,
  } = useChatStore();

  const sessionMessages = useMemo<ChatMessage[]>(() => {
    return messages[sessionId] ?? [];
  }, [messages, sessionId]);

  const sendMessage = useCallback(
    async (content: string, files?: ChatFile[]) => {
      const userMessage: ChatMessage = {
        id: uuid(),
        sessionId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
        files,
      };

      addMessage(sessionId, userMessage);

      const assistantMessageId = uuid();
      addMessage(sessionId, {
        id: assistantMessageId,
        sessionId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        streaming: true,
      });

      setLoading(true);
      setIsStreaming(true);

      try {
        const payload: ChatCompletionPayload = {
          messages: (settings.memoryEnabled ? sessionMessages : [])
            .concat(userMessage)
            .map(({ role, content }) => ({ role, content })),
          model: settings.model,
          mode: settings.mode,
          files,
        };

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok || !response.body) {
          throw new Error("Не удалось получить ответ от модели");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let pendingText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          pendingText += decoder.decode(value, { stream: true });

          const segments = pendingText.split("\n\n");
          pendingText = segments.pop() ?? "";

          for (const segment of segments) {
            if (!segment.startsWith("data:")) {
              continue;
            }
            const data = segment.replace(/^data:\s*/, "");
            if (data === "[DONE]") {
              continue;
            }

            updateMessage(sessionId, assistantMessageId, (prevMessage) => ({
              content: (prevMessage.content ?? "") + data,
            }));
          }
        }

        updateMessage(sessionId, assistantMessageId, {
          streaming: false,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Неизвестная ошибка";
        toast.error("Ошибка при отправке сообщения", {
          description: message,
        });
        updateMessage(sessionId, assistantMessageId, {
          streaming: false,
          error: message,
        });
      } finally {
        setLoading(false);
        setIsStreaming(false);
      }
    },
    [
      addMessage,
      sessionId,
      sessionMessages,
      settings.mode,
      settings.model,
      settings.memoryEnabled,
      setLoading,
      updateMessage,
    ]
  );

  return {
    sendMessage,
    isStreaming,
    messages: sessionMessages,
    session: sessions.find((session) => session.id === sessionId) ?? null,
  };
}

