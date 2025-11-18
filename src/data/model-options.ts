import { type LucideIcon, Sparkles, Atom, Rocket } from "lucide-react";
import { ChatModel } from "@/types/chat";

export type NebulaModelOption = {
  label: string;
  value: ChatModel;
  icon: LucideIcon;
  tier: string;
  description: string;
  requiresPro?: boolean;
};

export const nebulaModelOptions: NebulaModelOption[] = [
  {
    label: "Nebula Core",
    value: "gpt-4o",
    icon: Sparkles,
    tier: "Бесплатно",
    description: "Базовая модель для быстрого старта.",
  },
  {
    label: "Nebula Quantum",
    value: "claude-3",
    icon: Atom,
    tier: "Стандарт",
    description: "Продвинутая модель для рабочих процессов.",
  },
  {
    label: "Nebula Ultra",
    value: "grok-beta",
    icon: Rocket,
    tier: "Pro",
    description: "Максимальная скорость и производительность.",
    requiresPro: true,
  },
];


