import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "О Nebula AI",
  description:
    "Узнайте больше о команде Nebula AI и о том, как мы создаём AI-сервис с вниманием к деталям.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-lg font-semibold">
            Nebula AI
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" asChild>
              <Link href="/chat">Перейти в чат</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-16 md:px-6">
        <section className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight">
            Мы создаём AI, который чувствует контекст
          </h1>
          <p className="text-lg text-muted-foreground">
            Nebula AI вырос из внутренних инструментов поддержки и продуктовых команд.
            Мы хотели, чтобы AI был не просто чат-ботом, а настоящим участником
            процессов с памятью, доступом к документам и адаптивным тоном общения.
          </p>
        </section>
        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Продуктовый подход</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Мы ориентируемся на реальные кейсы: поддержка клиентов, обучение команд, быстрые
              исследования и принятие решений.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Приватность данных</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Данные клиентов всегда под вашим контролем. Поддерживаем Supabase Row Level Security
              и приватные подключения к LLM.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Команда энтузиастов</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Мы — инженеры, дизайнеры и исследователи, которые верят в персонализированные AI-решения.
            </CardContent>
          </Card>
        </section>
        <section className="rounded-2xl border border-border/60 bg-muted/10 p-8">
          <h2 className="text-2xl font-semibold">Присоединяйтесь</h2>
          <p className="mt-4 text-muted-foreground">
            Если хотите разрабатывать собственные AI-продукты или внедрять Nebula AI в компанию —
            мы открыты к совместной работе.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href="mailto:hello@nebula.ai">Написать нам</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/chat">Создать рабочее пространство</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/60 bg-background/80 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <span>Nebula AI © {new Date().getFullYear()}</span>
          <div className="flex items-center gap-4">
            <Link className="transition hover:text-foreground" href="/pricing">
              Тарифы
            </Link>
            <Link className="transition hover:text-foreground" href="/">
              Главная
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

