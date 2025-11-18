import { Bot, Zap, Search, type LucideIcon } from "lucide-react";
import { ChatMode } from "@/types/chat";

export type ModeDefinition = {
  id: ChatMode;
  name: string;
  description: string;
  icon: LucideIcon;
};

export const MODES: ModeDefinition[] = [
  {
    id: "agent",
    name: "Агент",
    description: "Универсальный ассистент для свободного диалога и сопровождения задач.",
    icon: Bot,
  },
  {
    id: "fast",
    name: "Быстрый ответ",
    description: "Молниеносные ответы по сути, резюме и оперативные правки.",
    icon: Zap,
  },
  {
    id: "research",
    name: "Исследование",
    description: "Глубокий анализ документов, выводы и многошаговые рассуждения.",
    icon: Search,
  },
];


