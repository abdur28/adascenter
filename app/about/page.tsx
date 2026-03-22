import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Radar,
  ScanLine,
  Eye,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Wrench,
  MapPin,
  FileCheck,
  BadgeRussianRuble,
} from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

const adasSystems = [
  {
    icon: Camera,
    name: "Камеры",
    desc: "Распознавание полос, знаков, пешеходов и других автомобилей. Обеспечивают работу систем предупреждения о сходе с полосы (LDW), автоматического экстренного торможения (AEB) и распознавания дорожных знаков.",
  },
  {
    icon: Radar,
    name: "Радары",
    desc: "Определение расстояния и скорости объектов вокруг автомобиля. Отвечают за адаптивный круиз-контроль (ACC), мониторинг слепых зон (BSM) и систему предупреждения о перекрёстном трафике (RCTA).",
  },
  {
    icon: ScanLine,
    name: "LiDAR",
    desc: "Создание трёхмерной карты окружающего пространства с помощью лазерных лучей. Используется в автомобилях премиум-класса для полуавтономного вождения и максимально точного обнаружения препятствий.",
  },
  {
    icon: Eye,
    name: "Ультразвуковые датчики",
    desc: "Работают на малых скоростях и при парковке. Обнаруживают препятствия в непосредственной близости от автомобиля и обеспечивают работу систем автоматической парковки.",
  },
];

const whyCalibration = [
  "Замена лобового стекла",
  "Кузовной ремонт любой сложности",
  "ДТП (даже незначительное)",
  "Замена камеры, радара или бампера",
  "Регулировка подвески или схождения",
  "Появление ошибок ADAS на панели приборов",
];

const advantages = [
  {
    icon: Wrench,
    title: "Профессиональное оборудование",
    desc: "Калибровочный стенд SmartSafe и диагностический сканер Launch",
  },
  {
    icon: MapPin,
    title: "Выездной формат",
    desc: "Приезжаем к вам — в автосервис, дилерский центр или на стоянку",
  },
  {
    icon: FileCheck,
    title: "Официальный отчёт",
    desc: "Документальное подтверждение калибровки для клиента и страховой",
  },
  {
    icon: BadgeRussianRuble,
    title: "Экономия для сервисов",
    desc: "Не нужно покупать оборудование за миллионы — передайте калибровку нам",
  },
];

export const metadata = {
  title: "О системе ADAS — ADAS ЦЕНТР",
  description:
    "Что такое ADAS, как работают системы помощи водителю и зачем нужна калибровка",
};

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-primary/60">
            Advanced Driver Assistance Systems
          </p>
          <h1 className="mb-6 font-heading text-4xl font-bold text-white/90 md:text-5xl">
            Что такое{" "}
            <span className="font-brand text-primary">ADAS</span>?
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">
            ADAS — это комплекс электронных систем помощи водителю, которые
            повышают безопасность вождения. Они используют камеры, радары, лидары
            и ультразвуковые датчики для контроля обстановки вокруг автомобиля
            в реальном времени.
          </p>
        </div>
      </section>

      {/* Image banner */}
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative h-64 overflow-hidden rounded-2xl border border-white/[0.06] md:h-80">
          <Image
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=80&auto=format&fit=crop"
            alt="Современный автомобиль с системами ADAS"
            width={1200}
            height={400}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-sm text-white/50">
              Современные автомобили оснащены десятками датчиков, которые требуют
              точной калибровки
            </p>
          </div>
        </div>
      </div>

      {/* ADAS systems grid */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeading className="mb-4">Компоненты системы</SectionHeading>
          <p className="mx-auto mb-14 max-w-xl text-center text-sm text-white/40">
            Каждый тип датчика отвечает за определённые функции безопасности
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {adasSystems.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-white/[0.06] bg-[rgba(10,10,26,0.5)] p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/5">
                  <s.icon
                    size={24}
                    className="text-primary"
                    strokeWidth={1.4}
                  />
                </div>
                <h3 className="mb-3 font-heading text-lg font-semibold text-white/85">
                  {s.name}
                </h3>
                <p className="text-sm leading-relaxed text-white/45">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why calibration is needed */}
      <section className="py-20 md:py-24" style={{ background: "rgba(15, 15, 20, 0.6)" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading align="left" className="mb-4">
                Зачем нужна калибровка?
              </SectionHeading>
              <p className="mb-8 text-sm leading-relaxed text-white/45 md:text-base">
                Все датчики ADAS настроены с заводской точностью. Любое
                механическое воздействие — от замены стекла до незначительного ДТП
                — смещает датчики и нарушает их работу. Некалиброванные системы
                могут неправильно определять расстояние до препятствий, не
                распознавать полосы движения или ложно срабатывать.
              </p>
              <p className="text-sm leading-relaxed text-white/45 md:text-base">
                <strong className="text-white/70">Профессиональная калибровка</strong>{" "}
                восстанавливает заводские параметры датчиков и гарантирует
                корректную работу всех систем безопасности.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-[rgba(10,10,26,0.5)] p-8">
              <h3 className="mb-6 flex items-center gap-2 font-heading text-lg font-semibold text-white/80">
                <AlertTriangle
                  size={18}
                  className="text-primary/60"
                  strokeWidth={1.5}
                />
                Когда требуется калибровка
              </h3>
              <ul className="space-y-3">
                {whyCalibration.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-primary/60"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm text-white/50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeading className="mb-4">
            Почему{" "}
            <span className="font-brand text-primary">ADAS</span> ЦЕНТР?
          </SectionHeading>
          <p className="mx-auto mb-14 max-w-xl text-center text-sm text-white/40">
            Мы специализируемся исключительно на калибровке ADAS
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-white/[0.06] bg-[rgba(10,10,26,0.5)] p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/5">
                  <a.icon
                    size={22}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="mb-2 font-heading text-sm font-semibold text-white/80">
                  {a.title}
                </h4>
                <p className="text-xs leading-relaxed text-white/40">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety warning */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/[0.04] to-secondary/[0.04] p-8 md:p-12">
            <div className="flex items-start gap-4">
              <ShieldCheck
                size={28}
                className="mt-1 shrink-0 text-primary"
                strokeWidth={1.4}
              />
              <div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-white/85">
                  Безопасность — не опция
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/45">
                  Некалиброванные системы ADAS создают ложное чувство
                  защищённости. Автоматическое торможение может сработать поздно,
                  адаптивный круиз-контроль — неверно рассчитать дистанцию, а
                  система контроля полосы — не распознать разметку. Калибровка —
                  это не рекомендация, а необходимость.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-3 font-heading text-sm font-semibold text-background transition-all hover:shadow-[0_0_24px_rgba(0,240,200,0.3)]"
                  >
                    Наши услуги
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-heading text-sm font-semibold text-white/50 transition-all hover:border-white/20 hover:text-white/70"
                  >
                    Записаться на калибровку
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
