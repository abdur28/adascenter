"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "Когда нужна калибровка ADAS?",
    a: "После замены стекла, кузовного ремонта, ДТП, замены камеры/радара или регулировки подвески.",
  },
  {
    q: "Сколько времени занимает процедура?",
    a: "От 30 минут до 2 часов в зависимости от автомобиля и количества систем.",
  },
  {
    q: "Какие автомобили поддерживаются?",
    a: "Большинство современных марок: европейские, японские, корейские, американские.",
  },
  {
    q: "Можно ли ездить без калибровки?",
    a: "Технически да, но некалиброванные системы могут работать некорректно и создавать угрозу безопасности.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32" style={{ background: "rgba(13, 13, 13, 0.78)" }}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading className="mb-16">
          Вопросы и ответы
        </SectionHeading>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-surface transition-colors hover:border-primary/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-heading text-sm font-semibold text-white/80 md:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/45">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
