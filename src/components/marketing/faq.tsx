"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "Как работает память контекста в Nebula AI?",
    answer:
      "История диалогов и важные детали сохраняются в вашей базе Supabase. AI использует последние N сообщений (настраивается) для понимания контекста. Каждый чат имеет отдельную память, которую можно привязать к проекту или команде. Память синхронизируется между участниками в режиме реального времени.",
  },
  {
    question: "Какие файлы поддерживаются и как они обрабатываются?",
    answer:
      "Поддерживаются PDF, DOCX, изображения (JPG, PNG), CSV и текстовые файлы. Файлы автоматически конвертируются в текст, анализируются и используются в контексте диалога. На тарифе Team доступны векторные индексы для быстрого поиска по большим документам. Размер файлов ограничен тарифом: Starter — 5 МБ, Team — 50 МБ, Enterprise — по договорённости.",
  },
  {
    question: "Можно ли использовать свои модели или API-прокси?",
    answer:
      "Да. Nebula AI поддерживает OpenAI-совместимые API. Вы можете указать URL прокси и API-ключ в настройках проекта. Это позволяет использовать кастомные модели, локальные LLM через прокси или другие сервисы. В Enterprise доступны частные подключения и выделенные ресурсы.",
  },
  {
    question: "Как организована командная работа?",
    answer:
      "Команды могут создавать общие чаты, делиться контекстом и использовать единую память. Доступны теги проектов для организации работы, права доступа на уровне чатов и проектов. История синхронизируется между участниками. В Enterprise доступен единый вход (SSO) и детальный аудит действий.",
  },
  {
    question: "Где хранятся данные и как обеспечивается приватность?",
    answer:
      "Все данные (чаты, файлы, память) хранятся в вашей базе Supabase. Вы полностью контролируете доступ и политики безопасности через Row Level Security. Nebula AI не хранит ваши данные на своих серверах. Поддерживаются приватные подключения к LLM для Enterprise-клиентов.",
  },
  {
    question: "Чем Nebula AI отличается от ChatGPT?",
    answer:
      "Nebula AI — это платформа для команд с памятью, файлами и гибкой настройкой. В отличие от ChatGPT, здесь есть контекстная память между сессиями, работа с файлами в контексте, командные чаты, интеграция с вашей инфраструктурой (Supabase) и возможность использовать разные модели. Это не просто чат-бот, а инструмент для продуктивной работы команды.",
  },
];

export function FAQ() {
  return (
    <section className="relative bg-muted/5 py-24 lg:py-32" id="faq">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#8A2FFF]/3 to-transparent" />
      
      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Частые</span>
            <span className="bg-gradient-to-r from-[#8A2FFF] via-[#A855FF] to-[#C084FC] bg-clip-text text-transparent"> вопросы</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Если не нашли ответ — напишите нам. Мы постоянно обновляем документацию и добавляем новые возможности.
          </p>
        </motion.div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <AccordionItem 
                value={`item-${index + 1}`}
                className="glass-card rounded-lg border-[#8A2FFF]/20 px-4 transition-all hover:border-[#8A2FFF]/30"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-[#C084FC] transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
