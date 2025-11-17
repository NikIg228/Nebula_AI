"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
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
