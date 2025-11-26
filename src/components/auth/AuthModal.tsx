"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { AlertCircle, Loader2, LogIn, Mail, ShieldCheck } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ViewMode = "login" | "signup";

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const supabaseAvailable = Boolean(supabase);
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useState<ViewMode>("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");

  useEffect(() => {
    if (!open) {
      setView("login");
    }
  }, [open]);

  const browserOrigin =
    typeof window !== "undefined" ? window.location.origin : undefined;
  const redirectTo =
    process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL || browserOrigin;

  async function handleEmailSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabaseAvailable || !supabase) {
      toast.error("Supabase не настроен. Укажите env переменные.");
      return;
    }

    if (!loginEmail || !loginPassword) {
      toast.error("Укажите почту и пароль");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Вы успешно вошли");
      onOpenChange(false);
    });
  }

  async function handleEmailSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabaseAvailable || !supabase) {
      toast.error("Supabase не настроен. Укажите env переменные.");
      return;
    }

    if (!signupEmail || !signupPassword) {
      toast.error("Укажите почту и пароль");
      return;
    }

    if (signupPassword !== signupConfirm) {
      toast.error("Пароли не совпадают");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: redirectTo ? { emailRedirectTo: redirectTo } : undefined,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Проверьте почту для подтверждения");
      onOpenChange(false);
    });
  }

  async function handleGoogleSignIn() {
    if (!supabaseAvailable || !supabase) {
      toast.error("Supabase не настроен. Укажите env переменные.");
      return;
    }
    startTransition(async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: redirectTo ? { redirectTo } : undefined,
      });

      if (error) {
        toast.error(error.message);
      }
    });
  }

  const googleButtonIcon = (
    <Image
      src="/Google__G__logo.svg.webp"
      alt="Google"
      width={20}
      height={20}
      className="h-5 w-5"
      priority
    />
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <ShieldCheck className="h-5 w-5 text-[#C084FC]" />
            {view === "login" ? "Авторизация" : "Регистрация"}
          </DialogTitle>
        </DialogHeader>

        {!supabaseAvailable && (
          <div className="mt-2 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            Добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY в .env
          </div>
        )}

        {view === "login" ? (
          <form className="mt-4 space-y-4" onSubmit={handleEmailSignIn}>
            <div className="space-y-2">
              <Label htmlFor="login-email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Почта
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Ваш email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="flex items-center gap-2">
                <LogIn className="h-4 w-4 text-muted-foreground" />
                Пароль
              </Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Введите пароль"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                minLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending || !supabaseAvailable}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Входим...
                </>
              ) : (
                "Войти"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onClick={handleGoogleSignIn}
              disabled={isPending || !supabaseAvailable}
            >
              {googleButtonIcon}
              Войти через Google
            </Button>

            <p className="pt-2 text-center text-sm text-muted-foreground">
              Нет аккаунта?{" "}
              <button
                type="button"
                className="font-semibold text-[#C084FC] transition hover:text-[#e3b2ff]"
                onClick={() => setView("signup")}
              >
                Зарегистрироваться
              </button>
            </p>
          </form>
        ) : (
          <form className="mt-4 space-y-4" onSubmit={handleEmailSignUp}>
            <div className="space-y-2">
              <Label htmlFor="signup-email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Почта
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Ваш email"
                value={signupEmail}
                onChange={(event) => setSignupEmail(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="flex items-center gap-2">
                <LogIn className="h-4 w-4 text-muted-foreground" />
                Пароль
              </Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Минимум 6 символов"
                value={signupPassword}
                onChange={(event) => setSignupPassword(event.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-confirm" className="flex items-center gap-2">
                <LogIn className="h-4 w-4 text-muted-foreground" />
                Повторите пароль
              </Label>
              <Input
                id="signup-confirm"
                type="password"
                placeholder="Повторите пароль"
                value={signupConfirm}
                onChange={(event) => setSignupConfirm(event.target.value)}
                minLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending || !supabaseAvailable}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Регистрируем...
                </>
              ) : (
                "Создать аккаунт"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onClick={handleGoogleSignIn}
              disabled={isPending || !supabaseAvailable}
            >
              {googleButtonIcon}
              Зарегистрироваться через Google
            </Button>

            <p className="pt-2 text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <button
                type="button"
                className="font-semibold text-[#C084FC] transition hover:text-[#e3b2ff]"
                onClick={() => setView("login")}
              >
                Войти
              </button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

