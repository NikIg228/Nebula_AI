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
    question: "Какие типы файлов поддерживаются?",
    answer:
      "Nebula работает с DOCX, PDF, XLSX, PPTX, TXT и изображениями. Можно загружать архивы и смешанные форматы — сервис сам извлечёт документы и определит порядок обработки.",
  },
  {
    question: "Как Nebula редактирует Word-документы?",
    answer:
      "Вы загружаете файл, выбираете режим правок — стилистический, юридический, факт-чекинг или сокращение. Nebula формирует комментарии, правит текст напрямую и экспортирует версию с треком изменений.",
  },
  {
    question: "Можем ли мы загружать защищённые PDF?",
    answer:
      "Да, если у вас есть пароль. Nebula попросит ключ, снимет защиту для текущей сессии и сохранит шифрование при экспорте. Доступ к файлу сохраняется внутри вашего пространства.",
  },
  {
    question: "Как происходит извлечение таблиц из изображений?",
    answer:
      "Мы комбинируем OCR и структурный анализ: сначала распознаём текст, затем определяем сетку, объединяем ячейки и строим Excel-файл. Вы получаете готовую таблицу и журнал возможных неточностей.",
  },
  {
    question: "Какие ограничения по размеру файлов?",
    answer:
      "Starter — до 5 МБ и 150 страниц, Pro — до 100 МБ и 5 000 страниц, Enterprise — индивидуальные квоты. Для больших массивов доступна пакетная загрузка через API.",
  },
  {
    question: "Может ли сервис сравнивать версии документов?",
    answer:
      "Да. Загрузите два файла — Nebula покажет diff по абзацам, таблицам, числам и комментариям. Можно экспортировать отчёт в Word, PDF или markdown.",
  },
];

export function FAQ() {
  return (
    <section className="relative py-24 lg:py-32" id="faq">
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
                className="rounded-lg border border-[#8A2FFF]/20 bg-transparent px-4 transition-all hover:border-[#8A2FFF]/30"
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
