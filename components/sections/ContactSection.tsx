"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      car: (form.elements.namedItem("car") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{ background: "rgba(15, 15, 20, 0.80)" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading className="mb-16">Контакты</SectionHeading>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {status === "sent" ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-primary/20 bg-[rgba(10,10,26,0.6)] p-12">
                <div className="text-center">
                  <p className="font-heading text-xl font-bold text-primary">
                    Заявка отправлена
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-white/5 bg-[rgba(10,10,26,0.6)] p-8"
              >
                <div>
                  <label className="mb-1.5 block font-heading text-xs font-semibold text-white/50">
                    Имя
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white/90 outline-none transition-colors focus:border-primary/40"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-heading text-xs font-semibold text-white/50">
                    Телефон
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white/90 outline-none transition-colors focus:border-primary/40"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-heading text-xs font-semibold text-white/50">
                    Марка и модель автомобиля
                  </label>
                  <input
                    name="car"
                    type="text"
                    className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white/90 outline-none transition-colors focus:border-primary/40"
                    placeholder="Например: Toyota Camry 2023"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-heading text-xs font-semibold text-white/50">
                    Сообщение
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white/90 outline-none transition-colors focus:border-primary/40"
                    placeholder="Опишите задачу или задайте вопрос"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Не удалось отправить. Попробуйте ещё раз.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary py-3.5 font-heading text-sm font-semibold text-background transition-shadow hover:shadow-[0_0_24px_rgba(0,240,200,0.3)] disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-heading text-sm font-semibold text-white/80">
                    Телефон
                  </p>
                  <a
                    href="tel:+79160999738"
                    className="text-sm text-white/50 transition-colors hover:text-primary"
                  >
                    +7 (916) 099-97-38
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-heading text-sm font-semibold text-white/80">
                    Электронная почта
                  </p>
                  <a
                    href="mailto:adasrus@mail.ru"
                    className="text-sm text-white/50 transition-colors hover:text-primary"
                  >
                    adasrus@mail.ru
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-heading text-sm font-semibold text-white/80">
                    Режим работы
                  </p>
                  <p className="text-sm text-white/50">Пн–Сб: 9:00–19:00</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[rgba(10,10,26,0.6)] p-6">
              <p className="font-heading text-sm font-semibold text-white/70">
                Зона обслуживания
              </p>
              <p className="mt-2 text-sm text-white/40">
                Выезд по Москве и Московской области. Для других регионов —
                свяжитесь с нами для уточнения условий.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
