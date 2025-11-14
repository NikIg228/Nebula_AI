"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useChatStore } from "@/store/chat-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Menu, Sparkles, X } from "lucide-react";

type HeaderProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const setSettingsOpen = useChatStore((state) => state.setSettingsOpen);

  return (
    <header className="relative z-20 flex h-14 md:h-16 items-center justify-between border-b border-[#8A2FFF]/20 glass-card backdrop-blur-xl px-3 md:px-6">
      {/* Glow line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8A2FFF] to-transparent opacity-50" />
      
      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleSidebar();
              }}
              className="h-9 w-9 md:h-10 md:w-10 hover:bg-[#8A2FFF]/10 hover:text-[#C084FC] transition-all flex-shrink-0"
              aria-label={sidebarOpen ? "Закрыть список чатов" : "Открыть список чатов"}
            >
              {sidebarOpen ? <X className="h-4 w-4 md:h-5 md:w-5" /> : <Menu className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{sidebarOpen ? "Закрыть список чатов" : "Открыть список чатов"}</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <span className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#8A2FFF] to-[#A855FF] text-white shadow-lg shadow-[#8A2FFF]/50 flex-shrink-0">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs md:text-sm font-medium text-[#9ca0ab] hidden sm:block">
              Nebula AI
            </p>
            <p className="text-base md:text-lg font-bold text-[#F2F2F2] truncate">Workspace</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:h-10 md:w-10 rounded-full hover:bg-[#8A2FFF]/10 hover:text-[#C084FC] transition-all"
              onClick={() => setSettingsOpen(true)}
              aria-label="Открыть настройки"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Открыть настройки</p>
          </TooltipContent>
        </Tooltip>
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="h-8 w-8 md:h-9 md:w-9 border border-[#8A2FFF]/30 cursor-pointer hover:border-[#8A2FFF]/50 transition-all">
              <AvatarFallback className="bg-gradient-to-br from-[#8A2FFF] to-[#A855FF] text-[10px] md:text-xs font-semibold text-white">
                NK
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Профиль пользователя</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
