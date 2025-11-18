"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Folder, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatStore } from "@/store/chat-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function FoldersTab() {
  const folders = useChatStore((state) => state.folders);
  const sessions = useChatStore((state) => state.sessions);
  const createFolder = useChatStore((state) => state.createFolder);
  const renameFolder = useChatStore((state) => state.renameFolder);
  const removeFolder = useChatStore((state) => state.removeFolder);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState<{ id: string; name: string } | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [renameValue, setRenameValue] = useState("");

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setIsCreateOpen(false);
      setNewFolderName("");
      toast.success("Папка создана");
    }
  };

  const handleRenameFolder = () => {
    if (isRenameOpen && renameValue.trim()) {
      renameFolder(isRenameOpen.id, renameValue.trim());
      setIsRenameOpen(null);
      setRenameValue("");
      toast.success("Папка переименована");
    }
  };

  const handleDeleteFolder = (folderId: string, folderName: string) => {
    if (confirm(`Удалить папку "${folderName}"? Чаты из папки будут перемещены в основной список.`)) {
      removeFolder(folderId);
      toast.success("Папка удалена");
    }
  };

  const getFolderChatCount = (folderId: string) => {
    return sessions.filter((s) => s.folderId === folderId && !s.archived).length;
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between px-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Папки</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Организуйте чаты по папкам для удобной навигации
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Создать папку
        </Button>
      </div>

      {folders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <Folder className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-sm text-muted-foreground text-center">
            Папок пока нет
          </p>
          <p className="text-xs text-muted-foreground/70 text-center mt-2">
            Создайте папку для организации чатов
          </p>
        </div>
      ) : (
        <div className="space-y-2 px-2">
          {folders.map((folder) => {
            const chatCount = getFolderChatCount(folder.id);
            return (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative"
              >
                <div
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                    "hover:bg-[#8A2FFF]/10"
                  )}
                >
                  <Folder className="h-4 w-4 flex-shrink-0 text-[#C084FC]" />
                  <span className="flex-1 truncate text-sm font-medium text-foreground">
                    {folder.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {chatCount} {chatCount === 1 ? "чат" : chatCount < 5 ? "чата" : "чатов"}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => {
                        setIsRenameOpen({ id: folder.id, name: folder.name });
                        setRenameValue(folder.name);
                      }}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteFolder(folder.id, folder.name)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Диалог создания папки */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-[#0B0B0D]/95 backdrop-blur-xl border-[#8A2FFF]/30">
          <DialogHeader>
            <DialogTitle>Создать папку</DialogTitle>
            <DialogDescription>
              Введите название для новой папки
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="folder-name">Название папки</Label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateFolder();
                  }
                }}
                placeholder="Введите название папки"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateFolder}>Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог переименования папки */}
      <Dialog
        open={isRenameOpen !== null}
        onOpenChange={(open) => !open && setIsRenameOpen(null)}
      >
        <DialogContent className="bg-[#0B0B0D]/95 backdrop-blur-xl border-[#8A2FFF]/30">
          <DialogHeader>
            <DialogTitle>Переименовать папку</DialogTitle>
            <DialogDescription>
              Введите новое название для папки
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rename-folder">Название</Label>
              <Input
                id="rename-folder"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRenameFolder();
                  }
                }}
                placeholder="Введите название"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsRenameOpen(null)}>
              Отмена
            </Button>
            <Button onClick={handleRenameFolder}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

