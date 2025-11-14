"use client";

import { useState } from "react";
import { Plus, Sparkles, Zap, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useChatStore } from "@/store/chat-store";
import { ChatSettings } from "@/types/chat";
import { cn } from "@/lib/utils";

const modelOptions = [
  { label: "OpenAI GPT-4o", value: "gpt-4o", icon: Sparkles },
  { label: "Anthropic Claude 3", value: "claude-3", icon: Sparkles },
  { label: "xAI Grok Beta", value: "grok-beta", icon: Sparkles },
] as const;

const modeOptions = [
  {
    label: "Исследование",
    description: "Глубокие, развёрнутые ответы",
    value: "explore",
    icon: Sparkles,
  },
  {
    label: "Быстрый ответ",
    description: "Краткие ответы для оперативных задач",
    value: "fast",
    icon: Zap,
  },
  {
    label: "Обучение",
    description: "Пошаговое объяснение и закрепление",
    value: "learn",
    icon: BookOpen,
  },
] as const;

export function QuickSettingsMenu() {
  const settings = useChatStore((state) => state.settings);
  const updateSettings = useChatStore((state) => state.updateSettings);
  const [open, setOpen] = useState(false);

  const handleModelChange = (value: string) => {
    updateSettings({ model: value as ChatSettings["model"] });
  };

  const handleModeChange = (value: string) => {
    updateSettings({ mode: value as ChatSettings["mode"] });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full border border-border/60 bg-background shadow-sm hover:bg-muted/50"
              aria-label="Настройки чата"
              suppressHydrationWarning
            >
              <Plus className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Настройки чата</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-[360px] p-0"
        align="start"
        side="top"
        sideOffset={8}
      >
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Настройки чата</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Выберите модель и режим работы
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground">
                Модель
              </Label>
              <Select value={settings.model} onValueChange={handleModelChange}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {modelOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground">
                Режим работы
              </Label>
              <div className="space-y-2">
                {modeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = settings.mode === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleModeChange(option.value)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition",
                        isSelected
                          ? "border-primary/40 bg-primary/5"
                          : "border-border/60 bg-background hover:bg-muted/50"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/60 bg-background"
                        )}
                      >
                        {isSelected ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Icon className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <p className="text-sm font-medium text-foreground">
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

