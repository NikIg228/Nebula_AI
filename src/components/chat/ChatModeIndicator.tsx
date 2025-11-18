"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ChatModeIndicatorProps {
  mode: {
    id: string;
    name: string;
    icon: ReactNode;
  };
  className?: string;
}

export function ChatModeIndicator({ mode, className }: ChatModeIndicatorProps) {
  if (!mode) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5",
        "bg-white/10 dark:bg-white/5 rounded-xl shadow-sm border border-white/10",
        "backdrop-blur-md text-sm font-medium text-foreground",
        className
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 dark:bg-white/10 text-foreground">
        {mode.icon}
      </span>
      <span className="tracking-wide">{mode.name}</span>
    </motion.div>
  );
}


