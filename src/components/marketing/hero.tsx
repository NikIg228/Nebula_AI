"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollVelocity from "@/components/marketing/ScrollVelocity";

const heroPhrases = [
  "понимает структуру",
  "анализирует PDF",
  "редактирует Word",
  "обрабатывает Excel",
] as const;

const heroDescription =
  "Профессиональный документ-ассистент: сравнивает версии, чистит стиль и формулировки, извлекает таблицы, конвертирует форматы и собирает шаблонные отчёты. Загружайте Word, PDF, Excel или презентации — Nebula всё структурирует и подготовит за секунды.";

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const activePhrase = useMemo(() => heroPhrases[phraseIndex], [phraseIndex]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Energy lines effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#8A2FFF] to-transparent opacity-20" />
        <div className="absolute right-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#A855FF] to-transparent opacity-15" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 text-center sm:gap-14 md:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-[#C084FC] via-[#A855FF] to-white bg-clip-text text-transparent">
            Nebula AI —
          </span>
          <br />
          <span className="relative block h-[1.6em] text-foreground text-glow overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={activePhrase}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="block"
              >
                {activePhrase}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5 }}
          className="mx-auto w-full max-w-4xl"
        >
          <ScrollVelocity
            texts={[heroDescription]}
            velocity={60}
            className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            numCopies={4}
            parallaxClassName="parallax w-full"
            scrollerClassName="scroller"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.45 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button 
            size="lg" 
            asChild 
            className="w-full sm:w-auto neon-button text-white font-semibold"
          >
            <Link href="/chat">Загрузить документ</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto border-[#8A2FFF]/30 bg-transparent text-foreground hover:bg-[#8A2FFF]/10 hover:border-[#8A2FFF]/50 hover:text-[#C084FC] transition-all"
          >
            <Link href="/pricing">Посмотреть тарифы</Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/40 to-transparent" />
    </section>
  );
}
