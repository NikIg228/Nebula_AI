"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    title: "Starter",
    price: "Бесплатно",
    description:
      "Подходит для тех, кто регулярно работает с документами и хочет ускорить рутинные задачи.",
    cta: "Начать бесплатно",
    features: [
      "10 обработок документов в день",
      "Конвертация PDF ↔ DOCX до 5 МБ",
      "Простые правки текста и проверка стиля",
      "Извлечение таблиц и списков в Excel",
    ],
    highlighted: false,
  },
  {
    title: "Pro",
    price: "$29",
    period: "/мес",
    description:
      "Для профессионалов, которым нужны расширенные возможности анализа и подготовки документов.",
    cta: "Оформить подписку",
    features: [
      "Глубокий анализ текста и стилевых правок",
      "Сравнение версий документов и diff-отчёты",
      "Генерация структурированных отчётов и шаблонов",
      "Поддержка больших PDF и презентаций",
      "Массовая обработка документов",
      "Приоритетный отклик поддержки",
    ],
    highlighted: true,
  },
  {
    title: "Enterprise",
    price: "По запросу",
    description: "Для компаний с собственными регламентами и сложным документооборотом.",
    cta: "Связаться с нами",
    features: [
      "Автоматизация документооборота и маршрутов согласования",
      "Интеграции с SharePoint, Google Drive и API",
      "Генерация и подписание пакетов документов",
      "Обработка больших массивов данных и архивов",
      "Выделенная инфраструктура и SLA",
      "Персональные модели и безопасность",
    ],
    highlighted: false,
  },
] as const;

export function Pricing() {
  return (
    <section className="relative py-24 lg:py-32" id="pricing">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#A855FF]/5 to-transparent" />
      
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Тарифы для</span>
            <br />
            <span className="bg-gradient-to-r from-[#8A2FFF] via-[#A855FF] to-[#C084FC] bg-clip-text text-transparent">
              любых задач
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Начните бесплатно и масштабируйтесь по мере роста. Все тарифы включают удобный интерфейс, инструменты для работы с документами и доступ к продвинутым моделям.
          </p>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <Card
                className={`flex h-full flex-col bg-transparent shadow-none transition-all duration-300 ${
                  tier.highlighted
                    ? "border-[#8A2FFF]/50 ring-2 ring-[#8A2FFF]/20 shadow-[0_0_40px_rgba(138,47,255,0.2)]"
                    : "border-[#8A2FFF]/20 hover:border-[#8A2FFF]/40 hover:shadow-[0_0_30px_rgba(138,47,255,0.15)]"
                }`}
              >
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {tier.title}
                    </CardTitle>
                    {tier.highlighted && (
                      <div className="flex items-center gap-1 rounded-full bg-[#8A2FFF]/20 px-2 py-1 text-xs text-[#C084FC]">
                        <Sparkles className="h-3 w-3" />
                        Популярный
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {tier.price}
                    </span>
                    {'period' in tier && tier.period && (
                      <span className="text-muted-foreground">{tier.period}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tier.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <Check className="h-5 w-5 text-[#8A2FFF]" />
                      </div>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full font-semibold ${
                      tier.highlighted 
                        ? "neon-button text-white" 
                        : "border-[#8A2FFF]/30 bg-transparent text-foreground hover:bg-[#8A2FFF]/10 hover:border-[#8A2FFF]/50 hover:text-[#C084FC]"
                    }`}
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
