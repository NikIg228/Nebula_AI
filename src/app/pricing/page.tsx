import { Metadata } from "next";
import Link from "next/link";
import { Pricing } from "@/components/marketing/pricing";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Тарифы Nebula AI",
  description:
    "Сравните тарифы Nebula AI и выберите тот, который подходит вашей команде.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen text-foreground">
      <main>
        <Pricing />
        <section className="border-t border-border/60 bg-background py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center md:px-6">
            <h2 className="text-2xl font-semibold">Нужен кастомный тариф?</h2>
            <p className="text-muted-foreground">
              Напишите нам о задачах, и мы предложим индивидуальный план с выделенными ресурсами LLM.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href="mailto:hello@nebula.ai">Связаться с продажами</a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/chat">Попробовать сейчас</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/60 bg-background/80 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <span>Nebula AI © {new Date().getFullYear()}</span>
          <div className="flex items-center gap-4">
            <Link className="transition hover:text-foreground" href="/about">
              О сервисе
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

