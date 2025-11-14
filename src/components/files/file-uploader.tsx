"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { parseFiles } from "@/lib/file-parsers";
import { ChatFile } from "@/types/chat";
import { toast } from "sonner";

type FileUploaderProps = {
  files: ChatFile[];
  onChange: (files: ChatFile[]) => void;
};

export function FileUploader({ files, onChange }: FileUploaderProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const parsed = await parseFiles(acceptedFiles);
        onChange([...files, ...parsed]);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Не удалось загрузить файл";
        toast.error("Ошибка загрузки", {
          description: message,
        });
      }
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 5,
  });

  const totalSize = useMemo(
    () => files.reduce((acc, file) => acc + file.size, 0),
    [files]
  );

  const handleRemove = (id: string) => {
    onChange(files.filter((file) => file.id !== id));
  };

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border/70 p-6 text-center transition",
          isDragActive ? "border-primary bg-primary/10" : "bg-background/80"
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-8 w-8 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Перетащите файлы сюда или нажмите, чтобы выбрать
          </p>
          <p className="text-xs text-muted-foreground">
            Поддерживаемые форматы: PDF, TXT, DOCX, CSV, изображения
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="space-y-2 rounded-xl border border-border/70 bg-muted/10 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Выбрано файлов: {files.length}</span>
            <span>Общий размер: {(totalSize / 1024 / 1024).toFixed(2)} МБ</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {files.map((file) => (
              <Badge
                key={file.id}
                variant="outline"
                className="flex items-center gap-2 rounded-xl border-border bg-background/90 px-3 py-2"
              >
                <FileIcon className="h-4 w-4 text-primary" />
                <span className="text-xs text-foreground">{file.name}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-muted-foreground"
                  onClick={() => handleRemove(file.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

