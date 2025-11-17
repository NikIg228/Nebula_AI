"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative border-t border-[#8A2FFF]/20 py-20 lg:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#8A2FFF]/10 to-transparent" />
      
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8A2FFF]/30 px-4 py-1.5 text-sm text-[#C084FC]"
        >
          <Sparkles className="h-4 w-4" />
          Готовы начать?
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          <span className="text-foreground">Быстрая регистрация —</span>
          <br />
          <span className="bg-gradient-to-r from-[#8A2FFF] via-[#A855FF] to-[#C084FC] bg-clip-text text-transparent">
            загрузите Word, PDF или Excel и получите анализ за секунды
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.16, duration: 0.45 }}
          className="mt-6 text-lg leading-relaxed text-muted-foreground"
        >
          Nebula берёт на себя рутинные правки, сравнения и конвертацию. Просто загрузите документы — сервис подготовит отчёты, шаблоны и таблицы, а вы получите результат в нужном формате.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" asChild className="neon-button w-full sm:w-auto text-white font-semibold">
            <Link href="/chat">Обработать документ</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild
            className="w-full sm:w-auto border-[#8A2FFF]/30 bg-transparent text-foreground hover:bg-[#8A2FFF]/10 hover:border-[#8A2FFF]/50 hover:text-[#C084FC] transition-all"
          >
            <Link href="/about">Посмотреть возможности</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
