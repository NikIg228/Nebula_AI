"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChatStore } from "@/store/chat-store";
import { ChatSettings } from "@/types/chat";
import { toast } from "sonner";

const modelOptions = [
  { label: "OpenAI GPT-4o", value: "gpt-4o" },
  { label: "Anthropic Claude 3", value: "claude-3" },
  { label: "xAI Grok Beta", value: "grok-beta" },
] as const;

const modeOptions = [
  { label: "🧭 Исследование", description: "Глубокие, развёрнутые ответы с анализом контекста", value: "explore" },
  { label: "⚡ Быстрый ответ", description: "Краткие ответы для оперативных задач", value: "fast" },
  { label: "📚 Обучение", description: "Пошаговое объяснение и закрепление знаний", value: "learn" },
] as const;

export function ChatSettingsModal() {
  const isSettingsOpen = useChatStore((state) => state.isSettingsOpen);
  const setSettingsOpen = useChatStore((state) => state.setSettingsOpen);
  const settings = useChatStore((state) => state.settings);
  const updateSettings = useChatStore((state) => state.updateSettings);

  const [draft, setDraft] = useState<ChatSettings>(settings);

  const handleOpenChange = (open: boolean) => {
    setSettingsOpen(open);
    if (open) {
      setDraft(settings);
    }
  };

  const handleSave = () => {
    updateSettings(draft);
    setSettingsOpen(false);
    toast.success("Настройки сохранены");
  };

  return (
    <Dialog open={isSettingsOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Настройки Nebula</DialogTitle>
          <DialogDescription>
            Настройте предпочтительные модели, режим общения и память контекста.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-2">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Модель
            </Label>
            <Select
              value={draft.model}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, model: value as ChatSettings["model"] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Режим общения
            </Label>
            <Tabs
              value={draft.mode}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, mode: value as ChatSettings["mode"] }))
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                {modeOptions.map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {modeOptions.map((option) => (
                <TabsContent
                  key={option.value}
                  value={option.value}
                  className="rounded-xl border border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground"
                >
                  {option.description}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Память контекста</p>
              <p className="text-xs text-muted-foreground">
                Сохранять последние сообщения и использовать их в запросах.
              </p>
            </div>
            <Switch
              checked={draft.memoryEnabled}
              onCheckedChange={(checked) =>
                setDraft((prev) => ({ ...prev, memoryEnabled: checked }))
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setSettingsOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSave}>Сохранить настройки</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

