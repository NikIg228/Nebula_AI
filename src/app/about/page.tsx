import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShieldCheck, Sparkles } from "lucide-react";
import ScrollVelocity from "@/components/marketing/ScrollVelocity";
import { AboutHighlightCard } from "@/components/marketing/about-highlight-card";

export const metadata: Metadata = {
  title: "О Nebula AI",
  description:
    "Узнайте больше о команде Nebula AI и о том, как мы создаём AI-сервис с вниманием к деталям.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-foreground bg-[radial-gradient(circle_at_25%_20%,rgba(138,47,255,0.08),transparent_55%),radial-gradient(circle_at_75%_10%,rgba(168,85,255,0.06),transparent_50%)]">
      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 md:px-6">
        <section className="space-y-6 text-center md:text-left">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            AI-инструменты для документов: Word, PDF, Excel и шаблоны
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Мы строим Nebula как студию документ-ассистентов: анализ, редактирование, сравнение версий и генерация отчётов в едином интерфейсе. 
            Сервис адаптируется под ваш регламент, хранит логику шаблонов и помогает автоматизировать документооборот.
          </p>
        </section>
        <section className="space-y-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold">Почему Nebula?</h2>
            <p className="text-muted-foreground">
              Премиальные AI-инструменты для документных команд: юридические отделы, аналитика, продуктовые команды и корпоративные архивы.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <AboutHighlightCard
              icon={<FileText className="h-6 w-6 text-white" />}
              title="Интеллектуальная обработка документов"
              description="Nebula анализирует структуру Word, PDF и Excel, понимает таблицы и выделяет ключевые места. AI чинит стиль и готовит итоговые версии."
              index={0}
            />
            <AboutHighlightCard
              icon={<ShieldCheck className="h-6 w-6 text-white" />}
              title="Безопасность и контроль данных"
              description="Данные остаются в вашем пространстве. Поддерживаем Supabase, приватные подключения к LLM и защищённые пайплайны."
              index={1}
            />
            <AboutHighlightCard
              icon={<Sparkles className="h-6 w-6 text-white" />}
              title="Автоматизация рутинных задач"
              description="Собирайте пакеты документов, отчёты и шаблоны одним кликом. Настраивайте сценарии: сравнивайте версии и извлекайте таблицы."
              index={2}
            />
          </div>
        </section>
        <section className="relative overflow-hidden rounded-3xl border border-[#8A2FFF]/30 bg-[#0B0B0D]/60 p-10 shadow-[0_0_60px_rgba(138,47,255,0.2)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#8A2FFF]/20 via-transparent to-[#C084FC]/10 opacity-60" />
          <div className="relative space-y-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-semibold text-foreground">
                Присоединяйтесь к студии документ-ассистентов
              </h2>
              <p className="text-lg text-muted-foreground">
                Создайте собственный AI-поток для документов: загрузите Word, PDF или Excel и задайте правила. Nebula соберёт шаблоны, сравнит версии и подготовит отчёты за минуты.
              </p>
            </div>
            <ScrollVelocity
              texts={[
                "Генерация шаблонов договоров",
                "Сравнение версий Word и PDF",
                "Автоматическое извлечение таблиц",
                "Конвертация PDF ↔ Excel",
              ]}
              velocity={40}
              className="text-sm tracking-wide text-[#C084FC]"
              numCopies={6}
              parallaxClassName="parallax w-full"
              scrollerClassName="scroller"
            />
            <div className="flex flex-col gap-4 text-center sm:flex-row sm:justify-center md:justify-start">
              <Button asChild className="w-full sm:w-auto neon-button text-white">
                <a href="mailto:hello@nebula.ai">Связаться с нами</a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full border-[#8A2FFF]/40 text-foreground hover:border-[#C084FC]/60 hover:text-[#C084FC] sm:w-auto"
              >
                <Link href="/chat">Создать документ-ассистента</Link>
              </Button>
            </div>
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

