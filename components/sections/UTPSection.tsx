"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  BadgeRussianRuble,
  Car,
  FileCheck,
  Clock,
  MapPin,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cards = [
  {
    icon: Wrench,
    title: "Профессиональное оборудование",
    desc: "Специализированные стенды для точной калибровки камер и радаров",
  },
  {
    icon: BadgeRussianRuble,
    title: "Экономия для автосервисов",
    desc: "Не нужно покупать дорогое оборудование — передайте калибровку на аутсорсинг",
  },
  {
    icon: Car,
    title: "Поддержка большинства марок",
    desc: "Работаем с современными системами различных производителей",
  },
  {
    icon: FileCheck,
    title: "Официальный отчёт",
    desc: "Документальное подтверждение выполненных работ",
  },
  {
    icon: Clock,
    title: "Быстрая запись",
    desc: "Минимальное время ожидания для партнёрских автосервисов",
  },
  {
    icon: MapPin,
    title: "Выездная калибровка",
    desc: "Мы приезжаем прямо в ваш автосервис или на территорию клиента и выполняем точную калибровку всех систем помощи водителю",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function UTPSection() {
  return (
    <section id="advantages" className="py-24 md:py-32" style={{ background: "rgba(15, 15, 20, 0.80)" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading className="mb-16">
          Наши преимущества
        </SectionHeading>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="group rounded-2xl border border-white/5 bg-[rgba(10,10,26,0.6)] p-6 transition-all hover:border-primary/20 hover:shadow-[0_0_24px_rgba(0,240,200,0.06)]"
            >
              <card.icon
                size={28}
                className="mb-4 text-primary"
                strokeWidth={1.5}
              />
              <h3 className="mb-2 font-heading text-base font-semibold text-white/85">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/45">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
