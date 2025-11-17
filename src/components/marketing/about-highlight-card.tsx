"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type AboutHighlightCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
};

export function AboutHighlightCard({
  icon,
  title,
  description,
  index,
}: AboutHighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="group"
    >
      <Card
        className={cn(
          "h-full border border-[#8A2FFF]/30 bg-[#07040e]/70 px-2 py-2",
          "shadow-[0_0_35px_rgba(138,47,255,0.15)] backdrop-blur-2xl",
          "transition-all duration-400 group-hover:border-[#C084FC]/60 group-hover:shadow-[0_0_55px_rgba(138,47,255,0.3)]",
          "rounded-2xl"
        )}
      >
        <CardHeader className="space-y-5 pb-0">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8A2FFF] via-[#A855FF] to-[#C084FC] text-white shadow-[0_10px_30px_rgba(138,47,255,0.35)]">
            {icon}
          </div>
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </CardContent>
      </Card>
    </motion.div>
  );
}

