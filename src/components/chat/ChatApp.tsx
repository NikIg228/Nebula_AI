"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { ChatContainer } from "@/components/chat/chat-container";
import { Header } from "@/components/chat/Header";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatSettingsModal } from "@/components/chat/ChatSettingsModal";
import { ChatModeIndicator } from "@/components/chat/ChatModeIndicator";
import { MODES } from "@/data/modes";
import { useChatStore } from "@/store/chat-store";
import { useChat } from "@/hooks/use-chat";
import { ChatFile } from "@/types/chat";

export function ChatApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isManualToggle = useRef(false);

  const sessions = useChatStore((state) => state.sessions);
  const activeSessionId = useChatStore((state) => state.activeSessionId);
  const removeMessage = useChatStore((state) => state.removeMessage);
  const currentMode = useChatStore((state) => state.settings.mode);
  const activeModeDefinition = useMemo(
    () => MODES.find((mode) => mode.id === currentMode) ?? MODES[0],
    [currentMode]
  );
  const ModeIcon = activeModeDefinition.icon;

  const sessionId = useMemo(
    () => activeSessionId ?? sessions[0]?.id ?? null,
    [activeSessionId, sessions]
  );

  const { messages, sendMessage, isStreaming } = useChat({
    sessionId: sessionId ?? "",
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const update = (matches: boolean) => {
      // Устанавливаем начальное состояние только если пользователь не менял его вручную
      if (!isManualToggle.current) {
        setSidebarOpen(matches);
        setSidebarCollapsed(!matches);
      }
    };
    update(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => update(event.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  if (!sessionId) {
    return (
      <div className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 backdrop-blur-[8px] md:backdrop-blur-[12px] bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#8A2FFF]/5 via-transparent to-[#A855FF]/5" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-base md:text-lg font-semibold text-foreground">
            Создайте первый чат, чтобы начать общение с Nebula
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (value: string, files: ChatFile[]) => {
    await sendMessage(value, files);
  };

  const handleDeleteMessage = (messageId: string) => {
    removeMessage(sessionId, messageId);
  };

  return (
    <div className="relative flex h-screen flex-col text-foreground overflow-hidden bg-transparent">
      <div className="relative z-10 flex h-full flex-col">
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => {
            isManualToggle.current = true;
            setSidebarOpen((prev) => {
              const newValue = !prev;
              setSidebarCollapsed(!newValue);
              return newValue;
            });
          }}
        />
        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar
            isOpen={sidebarOpen}
            isCollapsed={!sidebarOpen}
            onClose={() => {
              setSidebarOpen(false);
              setSidebarCollapsed(true);
            }}
            onToggleCollapse={() => {
              setSidebarCollapsed((prev) => !prev);
              setSidebarOpen((prev) => !prev);
            }}
          />
          <div className="flex flex-1 flex-col">
            <div className="px-3 md:px-6 pt-3">
              <ChatModeIndicator
                mode={{
                  id: activeModeDefinition.id,
                  name: activeModeDefinition.name,
                  icon: <ModeIcon className="h-4 w-4 text-white" />,
                }}
              />
            </div>
            <ChatContainer
              messages={messages}
              isStreaming={isStreaming}
              onDeleteMessage={handleDeleteMessage}
            />
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              isStreaming={isStreaming}
            />
          </div>
        </div>
      </div>
      <ChatSettingsModal />
    </div>
  );
}

export default ChatApp;

