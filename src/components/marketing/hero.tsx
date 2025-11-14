"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Energy lines effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#8A2FFF] to-transparent opacity-20" />
        <div className="absolute right-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#A855FF] to-transparent opacity-15" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 text-center sm:gap-16 md:px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full border border-[#8A2FFF]/30 px-4 py-1.5 text-sm backdrop-blur-md",
            "glass-card text-[#C084FC]"
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8A2FFF] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8A2FFF]"></span>
          </span>
          AI-ассистент нового поколения для команд и бизнеса
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-foreground">Nebula AI —</span>
          <br />
          <span className="bg-gradient-to-r from-[#8A2FFF] via-[#A855FF] to-[#C084FC] bg-clip-text text-transparent text-glow">
            понимает контекст, помнит историю, работает с файлами
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5 }}
          className="mx-auto max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Продвинутый AI-ассистент с памятью в Supabase, поддержкой файлов и гибкими режимами общения. 
          От быстрых ответов до глубокого исследования — всё в едином интерфейсе.
        </motion.p>
        
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
            <Link href="/chat">Начать чат</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto border-[#8A2FFF]/30 bg-transparent text-foreground hover:bg-[#8A2FFF]/10 hover:border-[#8A2FFF]/50 hover:text-[#C084FC] transition-all"
          >
            <Link href="/pricing">Тарифы</Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/40 to-transparent" />
    </section>
  );
}
