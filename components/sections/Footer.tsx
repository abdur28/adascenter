import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const navColumns = [
  {
    title: "Компания",
    links: [
      { label: "Главная", href: "/" },
      { label: "Услуги", href: "/services" },
      { label: "Преимущества", href: "/#advantages" },
      { label: "Оборудование", href: "/#equipment" },
    ],
  },
  {
    title: "Клиентам",
    links: [
      { label: "Партнёрство", href: "/#partnership" },
      { label: "FAQ", href: "/#faq" },
      { label: "Контакты", href: "/#contact" },
      { label: "Записаться", href: "/#contact" },
    ],
  },
  {
    title: "Услуги",
    links: [
      { label: "Калибровка камер", href: "/services/cameras" },
      { label: "Калибровка радаров", href: "/services/radars" },
      { label: "Калибровка LiDAR", href: "/services/lidar" },
      { label: "Диагностика ADAS", href: "/services/diagnostics" },
    ],
  },
];

const contacts = [
  { icon: Phone, text: "+7 (916) 099-97-38", href: "tel:+79160999738" },
  {
    icon: Mail,
    text: "adasmsk@mail.ru",
    href: "mailto:adasmsk@mail.ru",
  },
  { icon: MapPin, text: "Москва, выездная калибровка", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-brand text-xl font-bold tracking-wide text-primary">
                ADAS
              </span>
              <span className="font-heading text-xl font-semibold text-white/80">
                ЦЕНТР
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/35">
              Профессиональная выездная калибровка систем помощи водителю.
              Работаем с автосервисами, дилерскими центрами и частными клиентами.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              {contacts.map((c) => (
                <a
                  key={c.text}
                  href={c.href}
                  className="flex items-center gap-3 text-sm text-white/40 transition-colors hover:text-primary"
                >
                  <c.icon
                    size={15}
                    strokeWidth={1.5}
                    className="shrink-0 text-primary/50"
                  />
                  {c.text}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-heading text-xs font-semibold uppercase tracking-wider text-white/60">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-white/5 py-8 md:flex-row md:justify-between">
          <p className="text-xs text-white/20">
            &copy; 2026 ADAS ЦЕНТР. Все права защищены.
          </p>
          <p className="text-xs text-white/20">
            Москва и Московская область
          </p>
        </div>
      </div>
    </footer>
  );
}
