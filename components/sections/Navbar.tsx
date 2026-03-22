"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Camera, Radar, ScanLine, Activity } from "lucide-react";

const SERVICE_ITEMS = [
  { label: "Калибровка камер", href: "/services/cameras", icon: Camera },
  { label: "Калибровка радаров", href: "/services/radars", icon: Radar },
  { label: "Калибровка LiDAR", href: "/services/lidar", icon: ScanLine },
  { label: "Диагностика ADAS", href: "/services/diagnostics", icon: Activity },
];

const NAV_LINKS: { label: string; href?: string; home?: string }[] = [
  { label: "О системе", href: "/about" },
  { label: "Оборудование", home: "/#equipment" },
  { label: "Партнёрство", home: "/#partnership" },
  { label: "Контакты", home: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function resolveHome(home: string) {
    if (isHome) return home.replace("/", "");
    return home;
  }

  function openDropdown() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  }

  function closeDropdown() {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  }

  const linkClass = (active: boolean) =>
    `relative font-heading text-[13px] font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-primary after:transition-all hover:text-primary hover:after:w-full ${
      active ? "text-primary after:w-full" : "text-white/50 after:w-0"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(5,5,16,0.85)] backdrop-blur-xl shadow-[0_1px_0_rgba(0,240,200,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-brand text-xl font-bold tracking-wide text-primary">
              ADAS
            </span>
            <span className="font-heading text-xl font-semibold text-white/80">
              ЦЕНТР
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-7 lg:flex">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <Link
                href="/services"
                className={`flex items-center gap-1 ${linkClass(pathname.startsWith("/services"))}`}
              >
                Услуги
                <ChevronDown
                  size={12}
                  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </Link>

              {/* Dropdown */}
              <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all ${
                  dropdownOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <div className="w-64 rounded-xl border border-white/[0.06] bg-[rgba(12,12,20,0.95)] p-2 shadow-2xl backdrop-blur-xl">
                  {SERVICE_ITEMS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/[0.04] hover:text-primary"
                    >
                      <s.icon size={16} strokeWidth={1.5} className="shrink-0 text-primary/50" />
                      <span className="font-heading text-[13px]">{s.label}</span>
                    </Link>
                  ))}
                  <div className="mx-2 my-1.5 border-t border-white/[0.04]" />
                  <Link
                    href="/services"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center rounded-lg px-3 py-2 text-xs text-white/30 transition-colors hover:text-primary"
                  >
                    Все услуги →
                  </Link>
                </div>
              </div>
            </div>

            {/* Regular links */}
            {NAV_LINKS.map((link) => {
              const href = link.href ?? resolveHome(link.home!);
              const active = link.href ? pathname.startsWith(link.href) : false;
              return (
                <Link
                  key={link.label}
                  href={href}
                  className={linkClass(active)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+79001234567"
              className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
            >
              <Phone size={14} strokeWidth={1.5} />
              <span className="font-heading text-[13px]">
                +7 (900) 123-45-67
              </span>
            </a>
            <Link
              href={isHome ? "#contact" : "/#contact"}
              className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-2.5 font-heading text-[13px] font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,240,200,0.12)]"
            >
              Записаться
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center text-white/70 lg:hidden"
            aria-label="Меню"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-[rgba(5,5,16,0.95)] backdrop-blur-2xl lg:hidden">
          {/* Services group */}
          <p className="font-heading text-xs font-semibold uppercase tracking-wider text-white/25">
            Услуги
          </p>
          {SERVICE_ITEMS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 font-heading text-lg font-semibold text-white/60 transition-colors hover:text-primary"
            >
              <s.icon size={18} strokeWidth={1.5} className="text-primary/50" />
              {s.label}
            </Link>
          ))}

          <div className="my-2 h-px w-16 bg-white/10" />

          {/* Regular links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href ?? resolveHome(link.home!)}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-lg font-semibold text-white/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={() => setMenuOpen(false)}
            className="mt-4 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-3 font-heading text-sm font-semibold text-background"
          >
            Записаться на калибровку
          </Link>
        </div>
      )}
    </>
  );
}
