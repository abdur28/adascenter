import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/services";

export const metadata = {
  title: "Услуги — ADAS ЦЕНТР",
  description:
    "Калибровка камер, радаров, LiDAR и полная диагностика ADAS систем",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeading className="mb-4">Наши услуги</SectionHeading>
          <p className="mx-auto mb-16 max-w-xl text-center text-sm leading-relaxed text-white/40">
            Профессиональная выездная калибровка всех типов датчиков ADAS
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[rgba(10,10,26,0.5)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(0,240,200,0.08)]"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    width={600}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,26,1)] via-[rgba(10,10,26,0.4)] to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-8 pt-4">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                      <s.icon
                        size={20}
                        className="text-primary"
                        strokeWidth={1.4}
                      />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-white/85">
                      {s.name}
                    </h3>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-white/40">
                    {s.shortDesc}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary/70 transition-colors group-hover:text-primary">
                    Подробнее
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
