"use client";

import { FormEvent, useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Paperclip } from "lucide-react";
import { FileUploader } from "@/components/files/file-uploader";
import { QuickSettingsMenu } from "@/components/chat/QuickSettingsMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChatFile } from "@/types/chat";
import { cn } from "@/lib/utils";
import { VoiceRecorder } from "@/components/VoiceRecorder";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string, files: ChatFile[]) => Promise<void>;
  isStreaming?: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isStreaming = false,
}: ChatInputProps) {
  const [attachments, setAttachments] = useState<ChatFile[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const uploaderAreaRef = useRef<HTMLDivElement>(null);
  const latestValueRef = useRef(value);

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 24 * 6; // 6 строк по 24px
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [value]);

  useEffect(() => {
    if (textareaRef.current && !isStreaming) {
      textareaRef.current.focus();
    }
  }, [isStreaming]);

  useEffect(() => {
    if (!showUploader) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        uploaderAreaRef.current &&
        !uploaderAreaRef.current.contains(event.target as Node)
      ) {
        setShowUploader(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUploader]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim() && attachments.length === 0) {
      return;
    }
    await onSubmit(value, attachments);
    onChange("");
    setAttachments([]);
    setShowUploader(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isStreaming && (value.trim() || attachments.length > 0)) {
        onSubmit(value, attachments).then(() => {
          onChange("");
          setAttachments([]);
          setShowUploader(false);
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
        });
      }
    }
  };

  const handleTranscriptInsert = useCallback(
    (transcript: string) => {
      const incoming = transcript.trim();
      if (!incoming) return;

      const currentValue = latestValueRef.current ?? "";
      const trimmedCurrent = currentValue.replace(/\s+$/g, "");
      const spacer =
        trimmedCurrent.length === 0
          ? ""
          : trimmedCurrent.endsWith("\n")
            ? ""
            : " ";

      const nextValue = `${trimmedCurrent}${spacer}${incoming}`.trimStart();
      onChange(nextValue);
    },
    [onChange]
  );

  const hasText = value.trim().length > 0 || attachments.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky bottom-0 left-0 right-0 z-10 flex justify-center bg-gradient-to-t from-background/95 via-background/90 to-transparent pt-3 pb-4 md:pt-4 md:pb-6 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl flex items-end gap-2 px-3 md:px-4"
      >
        <AnimatePresence>
          {showUploader && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-3 right-3 md:left-4 md:right-4 mb-2"
            >
              <FileUploader files={attachments} onChange={setAttachments} />
            </motion.div>
          )}
        </AnimatePresence>
        <div
          ref={uploaderAreaRef}
          className="relative flex items-center flex-1 glass-card border border-[#8A2FFF]/30 rounded-xl md:rounded-2xl shadow-[0_0_20px_rgba(138,47,255,0.2)] px-3 py-2.5 md:px-4 md:py-3 focus-within:border-[#8A2FFF]/50 focus-within:shadow-[0_0_30px_rgba(138,47,255,0.3)] transition-all duration-300 gap-2"
        >
          <div className="hidden md:block">
            <QuickSettingsMenu />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setShowUploader((value) => !value)}
                className={cn(
                  "p-1.5 md:p-2 rounded-lg transition-all duration-200 mr-1.5 md:mr-2 flex-shrink-0",
                  "hover:bg-[#8A2FFF]/20 text-[#9ca0ab] hover:text-[#C084FC]",
                  "active:bg-[#8A2FFF]/30",
                  showUploader && "bg-[#8A2FFF]/20 text-[#C084FC]"
                )}
                aria-label="Добавить вложения"
              >
                <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Прикрепить файл</p>
            </TooltipContent>
          </Tooltip>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Отправьте сообщение или загрузите файл…"
            rows={1}
            className="w-full resize-none bg-transparent focus:outline-none text-[#F2F2F2] placeholder:text-[#9ca0ab] text-sm md:text-[15px] leading-[1.5] pr-2"
            style={{ minHeight: "20px", maxHeight: "120px" }}
          />
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-shrink-0">
                  <VoiceRecorder
                    onTranscript={handleTranscriptInsert}
                    disabled={isStreaming}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Удерживайте кнопку, чтобы записать голосовое сообщение</p>
              </TooltipContent>
            </Tooltip>
            <AnimatePresence>
              {hasText && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      type="submit"
                      disabled={isStreaming}
                      className={cn(
                        "p-1.5 md:p-2 rounded-lg transition-all duration-300 flex-shrink-0",
                        "neon-button text-white",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "active:scale-95 md:hover:scale-105"
                      )}
                      aria-label="Отправить сообщение"
                    >
                      {isStreaming ? (
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{isStreaming ? "Отправка сообщения..." : "Отправить сообщение"}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
