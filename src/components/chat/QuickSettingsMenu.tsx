"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useChatStore } from "@/store/chat-store";
import { ChatSettings } from "@/types/chat";
import { cn } from "@/lib/utils";
import { ModelSelect } from "./ModelSelect";
import { MODES } from "@/data/modes";

export function QuickSettingsMenu() {
  const settings = useChatStore((state) => state.settings);
  const updateSettings = useChatStore((state) => state.updateSettings);
  const [open, setOpen] = useState(false);
  const hasProAccess = false; // TODO: заменить на проверку подписки пользователя

  const handleModelChange = (value: ChatSettings["model"]) => {
    updateSettings({ model: value });
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
              <ModelSelect
                value={settings.model}
                onChange={(model) => handleModelChange(model)}
                hasProAccess={hasProAccess}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground">
                Режим работы
              </Label>
              <div className="space-y-2">
                {MODES.map((option) => {
                  const Icon = option.icon;
                  const isSelected = settings.mode === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleModeChange(option.id)}
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
                            {option.name}
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

