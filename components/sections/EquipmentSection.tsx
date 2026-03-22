"use client";

import { motion } from "framer-motion";
import {
  ScanLine,
  Cpu,
  CheckCircle2,
  Crosshair,
  Radio,
  Gauge,
  Wifi,
  Shield,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const equipment = [
  {
    icon: ScanLine,
    name: "Калибровочный стенд SmartSafe",
    tagline: "Статическая и динамическая калибровка",
    desc: "Профессиональная система для точной калибровки камер и радаров ADAS всех типов — фронтальных, боковых и задних",
    features: [
      { icon: Crosshair, text: "Точность до 0.1°" },
      { icon: Radio, text: "Камеры и радары" },
      { icon: Gauge, text: "Все типы калибровки" },
    ],
    gradient: "from-primary/20 via-primary/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_40px_rgba(0,240,200,0.12)]",
  },
  {
    icon: Cpu,
    name: "Диагностический сканер Launch",
    tagline: "Полная диагностика электронных систем",
    desc: "Мультимарочный сканер для глубокой диагностики электронных систем автомобиля и верификации калибровки",
    features: [
      { icon: Wifi, text: "Мультимарочный" },
      { icon: Shield, text: "Верификация результата" },
      { icon: CheckCircle2, text: "Протокол работ" },
    ],
    gradient: "from-secondary/20 via-secondary/5 to-transparent",
    borderGlow: "group-hover:shadow-[0_0_40px_rgba(0,128,255,0.12)]",
  },
];

export default function EquipmentSection() {
  return (
    <section id="equipment" className="py-24 md:py-32" style={{ background: "rgba(15, 15, 20, 0.80)" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading className="mb-6">Оборудование</SectionHeading>
        <p className="mx-auto mb-16 max-w-2xl text-center text-sm leading-relaxed text-white/40">
          Мы используем только профессиональное оборудование, соответствующее стандартам автопроизводителей
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {equipment.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[rgba(10,10,26,0.5)] transition-all duration-500 hover:border-white/[0.12] ${item.borderGlow}`}
            >
              {/* Top gradient accent */}
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${item.gradient}`}
              />

              {/* Corner glow */}
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative p-8 md:p-10">
                {/* Icon + badge row */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]">
                    <item.icon
                      size={28}
                      className={i === 0 ? "text-primary" : "text-secondary"}
                      strokeWidth={1.4}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white/90">
                      {item.name}
                    </h3>
                    <p className={`text-xs font-medium ${i === 0 ? "text-primary/60" : "text-secondary/60"}`}>
                      {item.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-8 text-sm leading-relaxed text-white/45">
                  {item.desc}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-3">
                  {item.features.map((feat) => (
                    <div
                      key={feat.text}
                      className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 text-xs text-white/55"
                    >
                      <feat.icon size={14} strokeWidth={1.6} className={i === 0 ? "text-primary/70" : "text-secondary/70"} />
                      {feat.text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-2 text-xs text-white/25"
        >
          <CheckCircle2 size={14} strokeWidth={1.5} />
          <span>Оборудование сертифицировано и проходит регулярную поверку</span>
        </motion.div>
      </div>
    </section>
  );
}
