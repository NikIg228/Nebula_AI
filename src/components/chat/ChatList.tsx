"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Folder, Edit, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { cn } from "@/lib/utils";
import { ChatSession, ChatFolder } from "@/types/chat";
import { ChatContextMenu } from "./ChatContextMenu";
import { useChatStore } from "@/store/chat-store";
import { ConfirmDialog } from "./ConfirmDialog";
import { toast } from "sonner";

type ChatListProps = {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelect: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
};

export function ChatList({
  sessions,
  activeSessionId,
  onSelect,
  onDelete,
}: ChatListProps) {
  const folders = useChatStore((state) => state.folders);
  const renameFolder = useChatStore((state) => state.renameFolder);
  const removeFolder = useChatStore((state) => state.removeFolder);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [expandedFoldersSection, setExpandedFoldersSection] = useState(true);
  const [isRenameOpen, setIsRenameOpen] = useState<{ id: string; name: string } | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState<{ id: string; name: string } | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Фильтруем только неархивированные чаты
  const visibleSessions = useMemo(
    () => sessions.filter((session) => !session.archived),
    [sessions]
  );

  // Группируем чаты по папкам
  const { folderSessions, rootSessions } = useMemo(() => {
    const folderMap = new Map<string, ChatSession[]>();
    const root: ChatSession[] = [];

    visibleSessions.forEach((session) => {
      if (session.folderId) {
        if (!folderMap.has(session.folderId)) {
          folderMap.set(session.folderId, []);
        }
        folderMap.get(session.folderId)!.push(session);
      } else {
        root.push(session);
      }
    });

    // Сортируем чаты в каждой группе
    folderMap.forEach((sessions) => {
      sessions.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    });
    root.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return { folderSessions: folderMap, rootSessions: root };
  }, [visibleSessions]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const renderSession = (session: ChatSession) => {
    const isActive = activeSessionId === session.id;
    return (
      <motion.div
        key={session.id}
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="group relative"
      >
        <div
          onClick={() => onSelect(session.id)}
          className={cn(
            "relative flex w-full items-center gap-2 md:gap-3 rounded-lg px-2.5 py-2 md:px-3 md:py-2.5 text-left transition-all duration-200 cursor-pointer",
            "hover:bg-[#8A2FFF]/10 active:bg-[#8A2FFF]/15",
            isActive
              ? "bg-[#8A2FFF]/15 text-[#F2F2F2] border-l-2 border-[#8A2FFF] shadow-[0_0_15px_rgba(138,47,255,0.3)]"
              : "text-[#D1D1D1] hover:text-[#F2F2F2]"
          )}
        >
          <span className="flex-1 truncate text-xs md:text-sm font-medium">
            {session.title}
          </span>
          <ChatContextMenu session={session} />
        </div>
      </motion.div>
    );
  };

  const handleRenameFolder = () => {
    if (isRenameOpen && renameValue.trim()) {
      renameFolder(isRenameOpen.id, renameValue.trim());
      setIsRenameOpen(null);
      setRenameValue("");
      toast.success("Папка переименована");
    }
  };

  const handleDeleteFolder = () => {
    if (isDeleteOpen) {
      removeFolder(isDeleteOpen.id);
      setIsDeleteOpen(null);
      toast.success("Папка удалена");
    }
  };

  const renderFolder = (folder: ChatFolder) => {
    const folderChats = folderSessions.get(folder.id) || [];
    const isExpanded = expandedFolders.has(folder.id);

    return (
      <div key={folder.id} className="space-y-1 group">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={() => toggleFolder(folder.id)}
            className={cn(
              "flex-1 justify-start gap-2 px-2.5 py-1.5 md:px-3 md:py-2 h-auto text-xs md:text-sm font-medium",
              "text-[#9ca0ab] hover:text-[#F2F2F2] hover:bg-[#8A2FFF]/10"
            )}
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            )}
            <Folder className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="flex-1 text-left truncate">{folder.name}</span>
            <span className="text-[#9ca0ab] text-xs">
              {folderChats.length}
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-6 w-6 md:h-7 md:w-7 opacity-0 group-hover:opacity-100 transition-opacity",
                  "hover:bg-[#8A2FFF]/20 text-[#9ca0ab] hover:text-[#C084FC]"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-[#0B0B0D]/95 backdrop-blur-xl border-[#8A2FFF]/30"
            >
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRenameOpen({ id: folder.id, name: folder.name });
                  setRenameValue(folder.name);
                }}
                className="cursor-pointer"
              >
                <Edit className="h-4 w-4" />
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteOpen({ id: folder.id, name: folder.name });
                }}
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-4 space-y-1 border-l border-[#8A2FFF]/20 pl-2"
            >
              {folderChats.map((session) => renderSession(session))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const hasFoldersWithChats = folders.some(
    (folder) => (folderSessions.get(folder.id) || []).length > 0
  );

  return (
    <>
      <div className="space-y-4 px-1.5 md:px-2 py-2">
        {/* Раздел Папки */}
        {hasFoldersWithChats && (
          <div>
            <Button
              variant="ghost"
              onClick={() => setExpandedFoldersSection(!expandedFoldersSection)}
              className={cn(
                "w-full justify-start gap-2 px-2.5 py-1.5 text-xs font-semibold text-[#9ca0ab] uppercase tracking-wider hover:text-[#9ca0ab] hover:bg-transparent"
              )}
            >
              {expandedFoldersSection ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" />
              )}
              Папки
            </Button>
            <AnimatePresence>
              {expandedFoldersSection && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  {folders
                    .filter((folder) => (folderSessions.get(folder.id) || []).length > 0)
                    .map((folder) => renderFolder(folder))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Раздел Чаты */}
        <div>
          <div className="px-2.5 py-1.5 text-xs font-semibold text-[#9ca0ab] uppercase tracking-wider">
            Чаты
          </div>
          <div className="space-y-1">
            {rootSessions.length === 0 && !hasFoldersWithChats ? (
              <div className="px-3 py-8 text-center">
                <p className="text-sm text-[#9ca0ab]">История пока пуста</p>
              </div>
            ) : (
              rootSessions.map((session) => renderSession(session))
            )}
          </div>
        </div>
      </div>

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

      {/* Диалог подтверждения удаления папки */}
      <ConfirmDialog
        open={isDeleteOpen !== null}
        onOpenChange={(open) => !open && setIsDeleteOpen(null)}
        title="Удалить папку?"
        description={
          isDeleteOpen
            ? `Вы уверены, что хотите удалить папку "${isDeleteOpen.name}"? Чаты из папки будут перемещены в основной список.`
            : ""
        }
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={handleDeleteFolder}
        variant="destructive"
      />
    </>
  );
}

export default ChatList;