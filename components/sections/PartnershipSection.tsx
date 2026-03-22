"use client";

import { motion } from "framer-motion";
import { Handshake, Timer, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const benefits = [
  { icon: Timer, text: "Быстрые сроки выполнения" },
  { icon: ShieldCheck, text: "Стабильные и прозрачные условия" },
  { icon: Handshake, text: "Экспертная помощь в сложных случаях" },
];

export default function PartnershipSection() {
  return (
    <section id="partnership" className="py-24 md:py-32" style={{ background: "rgba(13, 13, 13, 0.78)" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — sticky image (desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/5">
                <Image
                  src="/shutterstock_1126869740.jpg"
                  alt="ADAS калибровка автомобиля"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover"
                />
                {/* Dark overlay + gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                {/* Decorative corner accents */}
                <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-primary/20" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-primary/20" />          
              </div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 lg:py-12"
          >
            <SectionHeading align="left">
              Партнёрство с{" "}
              <span className="font-brand text-primary">ADAS</span> ЦЕНТР
            </SectionHeading>

            <p className="text-sm leading-relaxed text-white/50 md:text-base">
              Мы сотрудничаем с кузовными станциями, сервисами замены стёкол,
              автосервисами общего профиля, дилерскими центрами, автопарками и
              корпоративными клиентами.
            </p>

            <div className="space-y-4">
              {benefits.map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <b.icon size={20} className="shrink-0 text-primary" strokeWidth={1.5} />
                  <span className="text-sm text-white/65">{b.text}</span>
                </div>
              ))}
            </div>

            <Button href="#contact" variant="outline">
              Стать партнёром
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
