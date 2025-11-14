"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat";
import { toast } from "sonner";
import { Bot, Copy, ThumbsUp, ThumbsDown, User, Pencil, Flag, Share2 } from "lucide-react";

type MessageBubbleProps = {
  message: ChatMessage;
  onDelete: (messageId: string) => void;
};

export function MessageBubble({ message, onDelete: _onDelete }: MessageBubbleProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const isAssistant = message.role === "assistant";

  const Icon = isAssistant ? Bot : User;
  const alignment = isAssistant ? "items-start" : "items-end";
  const bubbleAlignment = isAssistant ? "md:mr-auto" : "md:ml-auto";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    toast.success("Сообщение скопировано");
  };

  const handleFeedback = (value: "up" | "down") => {
    setFeedback((prev) => (prev === value ? null : value));
    toast.success("Спасибо за обратную связь");
  };

  const handleEdit = () => {
    toast.info("Редактирование сообщений появится совсем скоро");
  };

  const handleReport = () => {
    toast.success("Жалоба отправлена модераторам");
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await navigator.share({
          title: "Ответ Nebula AI",
          text: message.content,
        });
        toast.success("Ответ отправлен");
        return;
      }
    } catch (error) {
      console.error("Share error:", error);
    }

    await navigator.clipboard.writeText(message.content);
    toast.success("Ответ скопирован для отправки");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={cn("group flex w-full flex-col gap-2", alignment)}
    >
      <div className={cn("flex w-full gap-2 md:gap-3", alignment)}>
        {isAssistant && (
          <Avatar className="mt-0.5 h-7 w-7 md:h-8 md:w-8 flex-shrink-0 border border-[#8A2FFF]/30">
            <AvatarFallback className="bg-gradient-to-br from-[#8A2FFF] to-[#A855FF] text-white">
              <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            "relative max-w-[90%] md:max-w-[85%] space-y-2 rounded-xl md:rounded-2xl px-3 py-2.5 md:px-4 md:py-3 transition-all duration-200",
            bubbleAlignment,
            isAssistant
              ? "glass-card border border-[#8A2FFF]/20 shadow-[0_0_20px_rgba(138,47,255,0.15)] group-hover:shadow-[0_0_30px_rgba(138,47,255,0.25)]"
              : "bg-[#8A2FFF]/20 border border-[#8A2FFF]/30 shadow-[0_0_15px_rgba(138,47,255,0.2)] group-hover:shadow-[0_0_25px_rgba(138,47,255,0.3)]"
          )}
        >
          <div className="markdown-body text-sm md:text-[15px] leading-[1.6] md:leading-[1.75] text-[#F2F2F2]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                pre: ({ children }) => (
                  <pre className="overflow-x-auto rounded-lg md:rounded-xl border border-[#8A2FFF]/30 bg-[#0B0B0D]/80 p-3 md:p-4 text-[10px] md:text-xs backdrop-blur -mx-1 md:mx-0">
                    {children}
                  </pre>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-[#8A2FFF]/20 px-1 md:px-1.5 py-0.5 text-[10px] md:text-xs text-[#C084FC] break-words">
                    {children}
                  </code>
                ),
                a: ({ children, ...props }) => (
                  <a {...props} className="underline decoration-[#8A2FFF] text-[#A855FF] hover:text-[#C084FC]">
                    {children}
                  </a>
                ),
                p: ({ children }) => (
                  <p className="text-[#F2F2F2] mb-2 last:mb-0">{children}</p>
                ),
                h1: ({ children }) => (
                  <h1 className="text-[#F2F2F2] font-bold text-xl mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-[#F2F2F2] font-bold text-lg mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-[#F2F2F2] font-semibold text-base mb-2">{children}</h3>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 space-y-1 text-[#D1D1D1]">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 space-y-1 text-[#D1D1D1]">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-[#D1D1D1]">{children}</li>
                ),
              }}
            >
              {message.content || "…"}
            </ReactMarkdown>
          </div>

          {message.files && message.files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {message.files.map((file) => (
                <Badge key={file.id} variant="outline" className="gap-2 border-[#8A2FFF]/30 bg-[#8A2FFF]/10 text-[#C084FC]">
                  {file.name}
                  <span className="text-[10px] opacity-70">
                    {(file.size / 1024).toFixed(1)} КБ
                  </span>
                </Badge>
              ))}
            </div>
          )}

          {message.streaming && (
            <p className="text-xs uppercase tracking-wide text-[#A855FF] mt-2">
              Генерация…
            </p>
          )}

          {message.error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-400 mt-2">
              {message.error}
            </div>
          )}
        </div>
        {!isAssistant && (
          <Avatar className="mt-0.5 h-7 w-7 md:h-8 md:w-8 flex-shrink-0 border border-[#8A2FFF]/30">
            <AvatarFallback className="bg-gradient-to-br from-[#A855FF] to-[#C084FC] text-white">
              <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className={cn(
        "flex items-center gap-1.5 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200",
        isAssistant ? "justify-start pl-9 md:pl-11" : "justify-end pr-9 md:pr-11"
      )}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 md:h-8 md:w-8 transition-all duration-200 hover:bg-[#8A2FFF]/20 hover:text-[#C084FC] active:scale-95 md:hover:scale-105 text-[#9ca0ab]"
              onClick={handleCopy}
              aria-label="Скопировать"
            >
              <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Скопировать сообщение</p>
          </TooltipContent>
        </Tooltip>
        {isAssistant ? (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 md:h-8 md:w-8 transition-all duration-200 hover:bg-[#8A2FFF]/20 hover:text-[#C084FC] active:scale-95 md:hover:scale-105 text-[#9ca0ab]",
                    feedback === "up" && "bg-[#8A2FFF]/20 text-[#C084FC]"
                  )}
                  onClick={() => handleFeedback("up")}
                  aria-label="Понравилось"
                >
                  <ThumbsUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Оценить ответ положительно</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 md:h-8 md:w-8 transition-all duration-200 hover:bg-[#8A2FFF]/20 hover:text-[#C084FC] active:scale-95 md:hover:scale-105 text-[#9ca0ab]",
                    feedback === "down" && "bg-[#8A2FFF]/20 text-[#C084FC]"
                  )}
                  onClick={() => handleFeedback("down")}
                  aria-label="Не понравилось"
                >
                  <ThumbsDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Оценить ответ отрицательно</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 md:h-8 md:w-8 transition-all duration-200 hover:bg-[#8A2FFF]/20 hover:text-[#C084FC] active:scale-95 md:hover:scale-105 text-[#9ca0ab]"
                  onClick={handleReport}
                  aria-label="Пожаловаться"
                >
                  <Flag className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Пожаловаться на ответ</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 md:h-8 md:w-8 transition-all duration-200 hover:bg-[#8A2FFF]/20 hover:text-[#C084FC] active:scale-95 md:hover:scale-105 text-[#9ca0ab]"
                  onClick={handleShare}
                  aria-label="Поделиться"
                >
                  <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Поделиться ответом</p>
              </TooltipContent>
            </Tooltip>
          </>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 transition-all duration-200 hover:bg-[#8A2FFF]/20 hover:text-[#C084FC] active:scale-95 md:hover:scale-105 text-[#9ca0ab]"
                onClick={handleEdit}
                aria-label="Редактировать"
              >
                <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Редактировать сообщение</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </motion.div>
  );
}
