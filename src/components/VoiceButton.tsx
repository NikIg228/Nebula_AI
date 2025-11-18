"use client";

import type { TouchEvent } from "react";
import { Loader2, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export type VoiceButtonState = "idle" | "recording" | "processing";

type VoiceButtonProps = {
  state: VoiceButtonState;
  disabled?: boolean;
  className?: string;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
  onTouchStart?: (event: TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd?: () => void;
};

export function VoiceButton({
  state,
  disabled,
  className,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
}: VoiceButtonProps) {
  const isRecording = state === "recording";
  const isProcessing = state === "processing";

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={(event) => {
        event.preventDefault();
        onTouchStart?.(event);
      }}
      onTouchEnd={onTouchEnd}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#8A2FFF]/60 focus-visible:outline-none",
        "bg-gradient-to-br from-[#1a0f2b]/70 via-[#231036]/80 to-[#1a0f2b]/60 text-white/80",
        "backdrop-blur-2xl border border-white/10 shadow-[0_0_25px_rgba(138,47,255,0.45)]",
        "active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed",
        isRecording && "shadow-[0_0_35px_rgba(138,47,255,0.65)] text-white",
        isProcessing && "opacity-90",
        className
      )}
      aria-pressed={isRecording}
      aria-label={
        isProcessing
          ? "Обработка аудио"
          : isRecording
            ? "Идёт запись"
            : "Начать запись"
      }
    >
      {/* Wave pulse background */}
      <span
        className={cn(
          "absolute inset-0 rounded-full border border-[#8A2FFF]/40",
          "pointer-events-none scale-110",
          isRecording ? "animate-wave-pulse" : "opacity-0"
        )}
      />
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-[#8A2FFF]/30 blur-xl pointer-events-none",
          isRecording ? "animate-breathing" : "opacity-0"
        )}
      />
      <span
        className={cn(
          "absolute inset-0 rounded-full animate-ping bg-[#8A2FFF]/20",
          isRecording ? "opacity-80" : "opacity-0"
        )}
      />

      <span className="relative flex items-center justify-center">
        {isProcessing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Mic
            className={cn(
              "h-5 w-5 drop-shadow-[0_0_12px_rgba(138,47,255,0.8)]",
              isRecording && "animate-breathing"
            )}
          />
        )}
      </span>
    </button>
  );
}

