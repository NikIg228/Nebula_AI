"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type SidebarButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "ghost";
  className?: string;
  tooltip?: string;
};

export function SidebarButton({
  icon: Icon,
  label,
  onClick,
  variant = "ghost",
  className,
  tooltip,
}: SidebarButtonProps) {
  const button = (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn(
        "w-full justify-start gap-2 md:gap-3 rounded-lg px-2.5 py-2 md:px-3 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-200",
        "glass-card border border-[#8A2FFF]/20 hover:border-[#8A2FFF]/40 active:border-[#8A2FFF]/50",
        "text-[#F2F2F2] hover:text-[#C084FC] active:text-[#C084FC]",
        "hover:bg-[#8A2FFF]/10 active:bg-[#8A2FFF]/15 hover:shadow-[0_0_15px_rgba(138,47,255,0.2)]",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0 text-[#C084FC]" />
      <span className="truncate">{label}</span>
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
