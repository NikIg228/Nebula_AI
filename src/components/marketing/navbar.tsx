"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#8A2FFF]/20 bg-[#0B0B0D]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#8A2FFF] to-[#A855FF] text-lg font-bold text-white shadow-lg shadow-[#8A2FFF]/50">
            N
          </span>
          <span className="text-lg font-bold text-foreground">
            Nebula <span className="bg-gradient-to-r from-[#8A2FFF] to-[#C084FC] bg-clip-text text-transparent">AI</span>
          </span>
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
          <ThemeToggle />
          <Button 
            size="sm" 
            asChild
            className="neon-button text-white font-semibold"
          >
            <Link href="/chat">Войти</Link>
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
