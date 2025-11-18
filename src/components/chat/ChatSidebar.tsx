"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Home, Search, Image } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarButton } from "@/components/chat/SidebarButton";
import { ChatList } from "@/components/chat/ChatList";
import { useChatStore } from "@/store/chat-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SearchChatsModal } from "./SearchChatsModal";
import { LibraryModal } from "./LibraryModal";

type ChatSidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
  isCollapsed?: boolean;
};

export function ChatSidebar({
  isOpen,
  onClose,
  onToggleCollapse,
  isCollapsed = false,
}: ChatSidebarProps) {
  const router = useRouter();
  const sessions = useChatStore((state) => state.sessions);
  const activeSessionId = useChatStore((state) => state.activeSessionId);
  const createSession = useChatStore((state) => state.createSession);
  const selectSession = useChatStore((state) => state.selectSession);
  const removeSession = useChatStore((state) => state.removeSession);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const handleNewChat = () => {
    const sessionId = createSession("Первый диалог с Nebula");
    selectSession(sessionId);
  };

  const handleSelectSession = (sessionId: string) => {
    selectSession(sessionId);
  };

  const handleDeleteSession = (sessionId: string) => {
    removeSession(sessionId);
    toast.success("Диалог удалён");
  };

  const sidebarContent = (
    <div className="flex h-full w-full flex-col glass-card border-r border-[#8A2FFF]/20 backdrop-blur-xl">
      {/* New Chat Button */}
      <div className="p-2.5 md:p-3 border-b border-[#8A2FFF]/10">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleNewChat}
              className={cn(
                "w-full justify-start gap-2 md:gap-3 rounded-lg border border-[#8A2FFF]/30",
                "bg-gradient-to-r from-[#8A2FFF]/20 to-[#A855FF]/20 backdrop-blur-md",
                "hover:from-[#8A2FFF]/30 hover:to-[#A855FF]/30 active:from-[#8A2FFF]/40 active:to-[#A855FF]/40",
                "px-2.5 py-2 md:px-3 md:py-2.5 text-xs md:text-sm font-semibold",
                "text-[#F2F2F2]",
                "transition-all duration-300",
                "shadow-[0_0_20px_rgba(138,47,255,0.3)] hover:shadow-[0_0_30px_rgba(138,47,255,0.5)]"
              )}
            >
              <Plus className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>Создать чат</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Создать новый чат</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Search and Library Buttons */}
      <div className="px-2.5 md:px-3 pb-2.5 md:pb-3 border-b border-[#8A2FFF]/10 space-y-1">
        <SidebarButton
          icon={Search}
          label="Поиск в чатах"
          onClick={() => setIsSearchOpen(true)}
          tooltip="Поиск по всем чатам"
        />
        <SidebarButton
          icon={Image}
          label="Библиотека"
          onClick={() => setIsLibraryOpen(true)}
          tooltip="Все изображения и документы"
        />
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 px-2">
        <ChatList
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelect={handleSelectSession}
          onDelete={handleDeleteSession}
        />
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="border-t border-[#8A2FFF]/10 p-2.5 md:p-3 space-y-1">
        <SidebarButton
          icon={Home}
          label="к Главной"
          onClick={() => router.push("/")}
          tooltip="Вернуться на главную страницу"
        />
      </div>
    </div>
  );

  // Mobile version - render conditionally based on isOpen prop
  // Desktop version is always rendered but can be collapsed
  return (
    <>
      {/* Mobile version */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -260, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop version */}
      <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? 0 : 260,
        opacity: isCollapsed ? 0 : 1,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "hidden h-full flex-shrink-0 overflow-hidden md:flex",
        isCollapsed && "w-0"
      )}
    >
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
            className="w-[260px]"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
      <SearchChatsModal isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <LibraryModal isOpen={isLibraryOpen} onOpenChange={setIsLibraryOpen} />
    </>
  );
}

export function ChatSidebarWithModals(props: ChatSidebarProps) {
  return (
    <>
      <ChatSidebar {...props} />
    </>
  );
}

export default ChatSidebar;
