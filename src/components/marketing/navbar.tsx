"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function Navbar() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoadingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setIsLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setIsLoadingSession(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (session) {
      setIsAuthOpen(false);
    }
  }, [session]);

  const userEmail = session?.user?.email ?? "";
  const userName =
    (session?.user?.user_metadata?.full_name as string | undefined) ||
    (session?.user?.user_metadata?.name as string | undefined) ||
    "";
  const avatarFallback =
    (userName || userEmail)
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  async function handleSignOut() {
    if (!supabase) {
      toast.error("Supabase не настроен");
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Вы вышли из аккаунта");
  }

  const userMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white transition hover:border-white/30"
          aria-label="Меню пользователя"
        >
          <Avatar className="h-8 w-8 border border-white/20">
            <AvatarFallback className="bg-gradient-to-br from-[#8A2FFF] to-[#C084FC] text-white text-xs">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline-block max-w-[120px] truncate text-sm">
            {userName || userEmail}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="text-sm font-semibold">Профиль</div>
          <div className="text-xs text-muted-foreground">{userEmail || "Нет email"}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/chat" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Настройки
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="flex items-center gap-2">
          <User className="h-4 w-4" />
          ID: {session?.user?.id?.slice(0, 8) ?? "—"}…
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            handleSignOut();
          }}
          className="flex items-center gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#8A2FFF]/20 bg-[#0B0B0D]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
              <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f011f] via-[#160028] to-[#040008] shadow-lg shadow-[#8A2FFF]/40 ring-1 ring-[#8A2FFF]/30">
                <Image
                  src="/logo.png"
                  alt="Логотип Nebula AI"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                  sizes="40px"
                  priority
                />
              </span>
              <span className="text-lg font-bold text-foreground">
                Nebula{" "}
                <span className="bg-gradient-to-r from-[#8A2FFF] to-[#C084FC] bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="hidden items-center gap-8 text-sm text-muted-foreground md:flex"
          >
            <Link
              className="transition-colors hover:text-[#C084FC]"
              href="/#features"
            >
              Возможности
            </Link>
            <Link
              className="transition-colors hover:text-[#C084FC]"
              href="/pricing"
            >
              Тарифы
            </Link>
            <Link
              className="transition-colors hover:text-[#C084FC]"
              href="/about"
            >
              О сервисе
            </Link>
            <Link
              className="transition-colors hover:text-[#C084FC]"
              href="/#faq"
            >
              FAQ
            </Link>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            {isLoadingSession ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-white/10" />
            ) : session ? (
              userMenu
            ) : (
              <Button
                size="sm"
                className="neon-button text-white font-semibold"
                onClick={() => setIsAuthOpen(true)}
              >
                Войти
              </Button>
            )}
          </motion.div>
        </div>
      </header>

      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
}
