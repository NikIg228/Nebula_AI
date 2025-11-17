"use client";

import { motion } from "framer-motion";
import { FilePenLine, Table, Layers, FileSignature, FileDiff, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Редактирование документов",
    description:
      "Умные правки Word, PDF и текстовых файлов: стиль, факты, формулировки, вычитка и согласование правок в одном интерфейсе.",
    icon: FilePenLine,
    gradient: "from-[#8A2FFF] to-[#A855FF]",
  },
  {
    title: "Извлечение данных",
    description:
      "Таблицы из PDF и сканов автоматически превращаются в Excel. Nebula распознаёт структуру и проверяет корректность чисел.",
    icon: Table,
    gradient: "from-[#A855FF] to-[#C084FC]",
  },
  {
    title: "Структурирование информации",
    description:
      "Автоматическое оглавление, секции и сводки для длинных документов. AI выстраивает логичную структуру и подсвечивает важные фрагменты.",
    icon: Layers,
    gradient: "from-[#C084FC] to-[#8A2FFF]",
  },
  {
    title: "Генерация документов",
    description:
      "Шаблоны договоров, отчётов и презентаций. Загружайте данные — Nebula собирает готовые документы с нужным стилем.",
    icon: FileSignature,
    gradient: "from-[#8A2FFF] to-[#C084FC]",
  },
  {
    title: "Сравнение версий",
    description:
      "Мгновенный diff между двумя документами с подсветкой формулировок, чисел и правок. Экспорт отчёта об отличиях.",
    icon: FileDiff,
    gradient: "from-[#A855FF] to-[#8A2FFF]",
  },
  {
    title: "Конвертация форматов",
    description:
      "Word ↔ PDF, PDF → Excel, PPT → текст. Все встроенные преобразования с сохранением форматирования и проверкой данных.",
    icon: Repeat,
    gradient: "from-[#C084FC] to-[#A855FF]",
  },
] as const;

export function Features() {
  return (
    <section className="relative py-24 lg:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#8A2FFF]/5 to-transparent" />
      
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Всё, что нужно для</span>
            <br />
            <span className="bg-gradient-to-r from-[#8A2FFF] via-[#A855FF] to-[#C084FC] bg-clip-text text-transparent">
              профессиональной работы с документами
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Nebula AI объединяет мощь современных LLM с инструментами для команд: память, файлы, 
            режимы общения и гибкая настройка. Всё в одном интерфейсе.
          </p>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="group"
            >
              <Card className="h-full border-[#8A2FFF]/20 bg-transparent shadow-none transition-all duration-300 hover:border-[#8A2FFF]/40 hover:shadow-[0_0_30px_rgba(138,47,255,0.15)]">
                <CardHeader className="space-y-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
