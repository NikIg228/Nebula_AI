import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ChatModel } from "@/types/chat";
import { nebulaModelOptions } from "@/data/model-options";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

type ModelSelectProps = {
  value: ChatModel;
  onChange: (value: ChatModel) => void;
  hasProAccess?: boolean;
  className?: string;
};

export function ModelSelect({
  value,
  onChange,
  hasProAccess = false,
  className,
}: ModelSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = nebulaModelOptions.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className={cn("relative space-y-2", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-left transition",
          "hover:border-[#8A2FFF]/50 hover:shadow-[0_0_20px_rgba(138,47,255,0.2)]",
          "flex items-center justify-between gap-3"
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>{selected?.label ?? "Выберите модель"}</span>
            {selected && (
              <span className="text-[11px] rounded-full border border-[#8A2FFF]/40 px-2 py-0.5 text-[#C084FC]">
                {selected.tier}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {selected?.description ?? "Подберите модель Nebula под задачу"}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 rounded-xl border border-border/60 bg-background/95 p-3 shadow-[0_15px_40px_rgba(12,10,29,0.65)]">
          <div className="space-y-2">
            {nebulaModelOptions.map((option) => {
              const disabled = option.requiresPro && !hasProAccess;
              const card = (
                <div
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition",
                    value === option.value
                      ? "border-[#8A2FFF]/60 bg-[#8A2FFF]/10"
                      : "border-border/50 bg-background hover:border-[#8A2FFF]/40 hover:bg-[#8A2FFF]/5",
                    disabled && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <option.icon className="h-4 w-4 text-[#C084FC]" />
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-foreground">{option.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] rounded-full border border-[#8A2FFF]/40 px-2 py-0.5 text-[#C084FC]">
                    {option.tier}
                  </span>
                </div>
              );

              if (disabled) {
                    return (
                      <Tooltip key={option.value}>
                        <TooltipTrigger asChild>
                          <div>{card}</div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <Link
                            href="/pricing"
                            className="text-xs text-[#C084FC] hover:underline"
                          >
                            Доступно в тарифе Pro.
                          </Link>
                        </TooltipContent>
                      </Tooltip>
                    );
              }

              return (
                <button
                  key={option.value}
                  type="button"
                  className="w-full text-left"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {card}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


