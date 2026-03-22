import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Clock,
  Shield,
  Phone,
} from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import { services, getService } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getService(id);
  if (!service) return { title: "Услуга не найдена" };
  return {
    title: `${service.name} — ADAS ЦЕНТР`,
    description: service.shortDesc,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getService(id);
  if (!service) notFound();

  const currentIndex = services.findIndex((s) => s.id === id);
  const otherServices = services.filter((s) => s.id !== id);

  return (
    <PageShell>
      {/* Hero banner with image */}
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <Image
          src={service.image}
          alt={service.name}
          width={1400}
          height={400}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />

        {/* Breadcrumb over image */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <nav className="mb-4 flex items-center gap-2 text-xs text-white/40">
              <Link
                href="/"
                className="transition-colors hover:text-primary"
              >
                Главная
              </Link>
              <ChevronRight size={12} />
              <Link
                href="/services"
                className="transition-colors hover:text-primary"
              >
                Услуги
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{service.name}</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 backdrop-blur-sm">
                <service.icon
                  size={24}
                  className="text-primary"
                  strokeWidth={1.4}
                />
              </div>
              <h1 className="font-heading text-3xl font-bold text-white/95 md:text-4xl">
                {service.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Description */}
          <p className="mb-12 text-base leading-relaxed text-white/50 md:text-lg md:leading-relaxed">
            {service.description}
          </p>

          {/* Quick stats bar */}
          <div className="mb-12 grid grid-cols-3 gap-4 rounded-2xl border border-white/[0.06] bg-[rgba(10,10,26,0.4)] p-6">
            <div className="text-center">
              <Clock
                size={20}
                className="mx-auto mb-2 text-primary/60"
                strokeWidth={1.5}
              />
              <p className="text-xs text-white/30">Время работы</p>
              <p className="font-heading text-sm font-semibold text-white/70">
                от 30 мин
              </p>
            </div>
            <div className="text-center">
              <Shield
                size={20}
                className="mx-auto mb-2 text-primary/60"
                strokeWidth={1.5}
              />
              <p className="text-xs text-white/30">Гарантия</p>
              <p className="font-heading text-sm font-semibold text-white/70">
                Официальный отчёт
              </p>
            </div>
            <div className="text-center">
              <Phone
                size={20}
                className="mx-auto mb-2 text-primary/60"
                strokeWidth={1.5}
              />
              <p className="text-xs text-white/30">Формат</p>
              <p className="font-heading text-sm font-semibold text-white/70">
                Выездная
              </p>
            </div>
          </div>

          {/* Two-column: Features + When needed */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {/* Features */}
            <div className="rounded-2xl border border-white/[0.06] bg-[rgba(10,10,26,0.4)] p-8">
              <h2 className="mb-6 font-heading text-lg font-semibold text-white/80">
                Что калибруем
              </h2>
              <div className="space-y-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-primary/60"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm text-white/50">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* When needed */}
            <div className="rounded-2xl border border-white/[0.06] bg-[rgba(10,10,26,0.4)] p-8">
              <h2 className="mb-6 flex items-center gap-2 font-heading text-lg font-semibold text-white/80">
                <AlertTriangle
                  size={18}
                  className="text-primary/60"
                  strokeWidth={1.5}
                />
                Когда нужна
              </h2>
              <ul className="space-y-3">
                {service.when.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                    <span className="text-sm text-white/50">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Process — timeline style */}
          <div className="mb-16">
            <h2 className="mb-8 font-heading text-lg font-semibold text-white/80">
              Как проходит процесс
            </h2>
            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-[13px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent" />

              {service.process.map((step, i) => (
                <div key={i} className="relative flex items-start gap-5 pb-6 last:pb-0">
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-background text-xs font-semibold text-primary/80">
                    {i + 1}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-sm text-white/55">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mb-20 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/[0.04] to-secondary/[0.04] p-8 text-center md:p-12">
            <h3 className="mb-3 font-heading text-xl font-semibold text-white/85">
              Нужна {service.name.toLowerCase()}?
            </h3>
            <p className="mb-6 text-sm text-white/40">
              Оставьте заявку и мы свяжемся с вами в ближайшее время
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-3 font-heading text-sm font-semibold text-background transition-all hover:shadow-[0_0_24px_rgba(0,240,200,0.3)]"
              >
                Записаться на калибровку
              </a>
              <a
                href="tel:+79001234567"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 font-heading text-sm font-semibold text-white/50 transition-all hover:border-white/20 hover:text-white/70"
              >
                <Phone size={14} />
                Позвонить
              </a>
            </div>
          </div>

          {/* Other services */}
          <div>
            <h2 className="mb-6 font-heading text-lg font-semibold text-white/80">
              Другие услуги
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="group rounded-xl border border-white/[0.06] bg-[rgba(10,10,26,0.4)] p-5 transition-all hover:border-primary/15"
                >
                  <s.icon
                    size={20}
                    className="mb-3 text-primary/60"
                    strokeWidth={1.4}
                  />
                  <h4 className="mb-1 font-heading text-sm font-semibold text-white/70 transition-colors group-hover:text-white/90">
                    {s.name}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs text-primary/50 transition-colors group-hover:text-primary/80">
                    Подробнее
                    <ArrowRight
                      size={10}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Prev/Next navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
            {currentIndex > 0 ? (
              <Link
                href={`/services/${services[currentIndex - 1].id}`}
                className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-primary"
              >
                <ArrowLeft size={14} />
                {services[currentIndex - 1].name}
              </Link>
            ) : (
              <span />
            )}
            {currentIndex < services.length - 1 ? (
              <Link
                href={`/services/${services[currentIndex + 1].id}`}
                className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-primary"
              >
                {services[currentIndex + 1].name}
                <ArrowRight size={14} />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
