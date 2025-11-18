"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MoreVertical,
  Share2,
  Archive,
  Folder,
  Edit,
  Trash2,
} from "lucide-react";
import { useChatStore } from "@/store/chat-store";
import { ChatSession } from "@/types/chat";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "./ConfirmDialog";

type ChatContextMenuProps = {
  session: ChatSession;
  onSelect?: () => void;
};

export function ChatContextMenu({ session, onSelect }: ChatContextMenuProps) {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [renameValue, setRenameValue] = useState(session.title);
  const [newFolderName, setNewFolderName] = useState("");

  const archiveSession = useChatStore((state) => state.archiveSession);
  const unarchiveSession = useChatStore((state) => state.unarchiveSession);
  const removeSession = useChatStore((state) => state.removeSession);
  const renameSession = useChatStore((state) => state.renameSession);
  const moveSessionToFolder = useChatStore((state) => state.moveSessionToFolder);
  const folders = useChatStore((state) => state.folders);
  const createFolder = useChatStore((state) => state.createFolder);

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/chat?session=${session.id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Ссылка скопирована в буфер обмена");
    } catch (error) {
      toast.error("Не удалось скопировать ссылку");
    }
  };

  const handleArchive = () => {
    if (session.archived) {
      unarchiveSession(session.id);
      toast.success("Чат восстановлен из архива");
    } else {
      archiveSession(session.id);
      toast.success("Чат перемещён в архив");
    }
  };

  const handleDelete = () => {
    removeSession(session.id);
    toast.success("Чат удалён");
  };

  const handleRename = () => {
    if (renameValue.trim()) {
      renameSession(session.id, renameValue.trim());
      setIsRenameOpen(false);
      toast.success("Название чата изменено");
    }
  };

  const handleMoveToFolder = (folderId: string | null) => {
    moveSessionToFolder(session.id, folderId);
    const folderName = folderId
      ? folders.find((f) => f.id === folderId)?.name || "папку"
      : "основной список";
    toast.success(`Чат перемещён в ${folderName}`);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // Проверяем, существует ли папка с таким названием
      const existingFolder = folders.find(
        (f) => f.name.toLowerCase() === newFolderName.trim().toLowerCase()
      );
      
      if (existingFolder) {
        // Если папка существует, перемещаем чат в неё
        moveSessionToFolder(session.id, existingFolder.id);
        toast.success(`Чат перемещён в папку "${existingFolder.name}"`);
      } else {
        // Если папки нет, создаём новую
        const folderId = createFolder(newFolderName.trim());
        moveSessionToFolder(session.id, folderId);
        toast.success("Папка создана и чат перемещён");
      }
      
      setIsCreateFolderOpen(false);
      setNewFolderName("");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 md:h-7 md:w-7 opacity-100 md:opacity-0 transition-all duration-200 md:group-hover:opacity-100 flex-shrink-0",
              "hover:bg-[#8A2FFF]/20 active:bg-[#8A2FFF]/30",
              "text-[#9ca0ab] hover:text-[#C084FC]"
            )}
            onClick={(e) => e.stopPropagation()}
            aria-label="Меню чата"
          >
            <MoreVertical className="h-3 w-3 md:h-3.5 md:w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-[#0B0B0D]/95 backdrop-blur-xl border-[#8A2FFF]/30"
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            Поделиться
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsRenameOpen(true);
            }}
            className="cursor-pointer"
          >
            <Edit className="h-4 w-4" />
            Редактировать
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsCreateFolderOpen(true);
            }}
            className="cursor-pointer"
          >
            <Folder className="h-4 w-4" />
            Перенести в папку
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleArchive();
            }}
            className="cursor-pointer"
          >
            <Archive className="h-4 w-4" />
            {session.archived ? "Восстановить из архива" : "Архивировать"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteOpen(true);
            }}
            variant="destructive"
            className="cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Диалог подтверждения удаления чата */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Удалить чат?"
        description="Вы уверены, что хотите удалить этот чат? Это действие нельзя отменить."
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={handleDelete}
        variant="destructive"
      />

      {/* Диалог переименования */}
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent className="bg-[#0B0B0D]/95 backdrop-blur-xl border-[#8A2FFF]/30">
          <DialogHeader>
            <DialogTitle>Переименовать чат</DialogTitle>
            <DialogDescription>
              Введите новое название для чата
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rename">Название</Label>
              <Input
                id="rename"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRename();
                  }
                }}
                placeholder="Введите название"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsRenameOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleRename}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог создания папки */}
      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
        <DialogContent className="bg-[#0B0B0D]/95 backdrop-blur-xl border-[#8A2FFF]/30">
          <DialogHeader>
            <DialogTitle>Перенести в папку</DialogTitle>
            <DialogDescription>
              Укажите название папки. Если папка с таким названием существует, чат будет перемещён в неё. Если нет — будет создана новая папка.
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
                  if (e.key === "Enter" && newFolderName.trim()) {
                    handleCreateFolder();
                  }
                }}
                placeholder="Введите название папки"
                autoFocus
              />
            </div>
            {folders.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Или выберите существующую:</Label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {folders.map((folder) => (
                    <Button
                      key={folder.id}
                      variant="ghost"
                      onClick={() => {
                        handleMoveToFolder(folder.id);
                        setIsCreateFolderOpen(false);
                        setNewFolderName("");
                      }}
                      className="w-full justify-start text-sm"
                    >
                      <Folder className="h-4 w-4 mr-2" />
                      {folder.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => {
              setIsCreateFolderOpen(false);
              setNewFolderName("");
            }}>
              Отмена
            </Button>
            <Button 
              onClick={handleCreateFolder}
              disabled={!newFolderName.trim()}
            >
              Создать и переместить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

