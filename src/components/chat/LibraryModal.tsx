"use client";

import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Image, FileText, Download, ExternalLink } from "lucide-react";
import { useChatStore } from "@/store/chat-store";
import { cn } from "@/lib/utils";
import { ChatFile } from "@/types/chat";

type LibraryModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

type FileWithContext = ChatFile & {
  sessionId: string;
  sessionTitle: string;
  messageId: string;
};

export function LibraryModal({ isOpen, onOpenChange }: LibraryModalProps) {
  const sessions = useChatStore((state) => state.sessions);
  const messages = useChatStore((state) => state.messages);
  const selectSession = useChatStore((state) => state.selectSession);

  const allFiles = useMemo(() => {
    const files: FileWithContext[] = [];

    sessions.forEach((session) => {
      const sessionMessages = messages[session.id] || [];
      sessionMessages.forEach((message) => {
        if (message.files && message.files.length > 0) {
          message.files.forEach((file) => {
            files.push({
              ...file,
              sessionId: session.id,
              sessionTitle: session.title,
              messageId: message.id,
            });
          });
        }
      });
    });

    // Сортируем по дате (новые сначала)
    return files.reverse();
  }, [sessions, messages]);

  const imageFiles = useMemo(
    () =>
      allFiles.filter((file) =>
        file.type.startsWith("image/")
      ),
    [allFiles]
  );

  const documentFiles = useMemo(
    () =>
      allFiles.filter(
        (file) =>
          !file.type.startsWith("image/") &&
          (file.type.includes("pdf") ||
            file.type.includes("word") ||
            file.type.includes("excel") ||
            file.type.includes("document") ||
            file.name.endsWith(".pdf") ||
            file.name.endsWith(".doc") ||
            file.name.endsWith(".docx") ||
            file.name.endsWith(".xls") ||
            file.name.endsWith(".xlsx"))
      ),
    [allFiles]
  );

  const handleOpenFile = (file: FileWithContext) => {
    if (file.url) {
      window.open(file.url, "_blank");
    }
  };

  const handleDownloadFile = (file: FileWithContext) => {
    if (file.url) {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleGoToSession = (sessionId: string) => {
    selectSession(sessionId);
    onOpenChange(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} Б`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col bg-[#0B0B0D]/95 backdrop-blur-xl border-[#8A2FFF]/30">
        <DialogHeader>
          <DialogTitle>Библиотека</DialogTitle>
          <DialogDescription>
            Все изображения и документы из всех чатов
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1">
          {allFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Image className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-sm text-muted-foreground text-center">
                Библиотека пуста
              </p>
              <p className="text-xs text-muted-foreground/70 text-center mt-2">
                Загруженные файлы будут отображаться здесь
              </p>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {/* Изображения */}
              {imageFiles.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Изображения ({imageFiles.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {imageFiles.map((file) => (
                      <div
                        key={`${file.sessionId}-${file.messageId}-${file.id}`}
                        className="group relative aspect-square rounded-lg overflow-hidden border border-[#8A2FFF]/30 bg-[#8A2FFF]/5 hover:bg-[#8A2FFF]/10 transition-all"
                      >
                        {file.url ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleOpenFile(file)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleDownloadFile(file)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs text-white truncate">{file.name}</p>
                          <p className="text-[10px] text-white/70">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Документы */}
              {documentFiles.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Документы ({documentFiles.length})
                  </h3>
                  <div className="space-y-2">
                    {documentFiles.map((file) => (
                      <div
                        key={`${file.sessionId}-${file.messageId}-${file.id}`}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border border-[#8A2FFF]/30",
                          "bg-[#8A2FFF]/5 hover:bg-[#8A2FFF]/10 transition-all"
                        )}
                      >
                        <FileText className="h-5 w-5 flex-shrink-0 text-[#C084FC]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {file.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                            <span className="text-xs text-muted-foreground">•</span>
                            <button
                              onClick={() => handleGoToSession(file.sessionId)}
                              className="text-xs text-[#C084FC] hover:underline"
                            >
                              {file.sessionTitle}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleOpenFile(file)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleDownloadFile(file)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

