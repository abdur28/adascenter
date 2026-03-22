"use client";

import { useRef, useEffect, useMemo, useCallback, useState } from "react";
import { useMotionValueEvent } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useImageSequence } from "@/hooks/useImageSequence";

/* ── Constants ── */

const DISASSEMBLE_COUNT = 26;
const ROTATION_COUNT = 40;
const BG = "#0d0d0d";

type Beat = "hero" | "disassemble" | "services" | "reassemble" | "rotation" | "cta";

/* ── Scroll phase boundaries ── */
const PHASES = {
  hero:        [0.00, 0.12],
  disassemble: [0.12, 0.35],
  services:    [0.35, 0.55],
  reassemble:  [0.55, 0.70],
  rotation:    [0.70, 0.85],
  cta:         [0.85, 1.00],
} as const;

function buildPaths(folder: string, count: number, nameGen: (i: number) => string) {
  return Array.from({ length: count }, (_, i) => `/${folder}/${nameGen(i)}`);
}

/* ════════════════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════════════════ */

export default function HeroScrollCanvas() {
  const { containerRef, progress } = useScrollProgress();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrameRef = useRef(-1);
  const lastBeatRef = useRef<Beat>("hero");
  const [activeBeat, setActiveBeat] = useState<Beat>("hero");

  /* ── Image sequences ── */
  const disassemblePaths = useMemo(
    () =>
      buildPaths("dessemble-scene", DISASSEMBLE_COUNT, (i) => {
        const num = String(i + 1).padStart(3, "0");
        return `ezgif-frame-${num}.png`;
      }),
    []
  );
  const rotationPaths = useMemo(
    () =>
      buildPaths("rotation-scene", ROTATION_COUNT, (i) => {
        const num = String(i + 1).padStart(3, "0");
        return `ezgif-frame-${num}.png`;
      }),
    []
  );

  const { images: disassembleImages, loaded: disassembleLoaded } =
    useImageSequence(disassemblePaths);
  const { images: rotationImages } = useImageSequence(rotationPaths);

  /* ── Canvas resize (HiDPI aware) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── Draw a single frame to canvas ── */
  const drawFrame = useCallback((img: HTMLImageElement | undefined) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // High-quality upscaling for 720p source frames
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width;
    const ch = canvas.height;
    const isMobile = window.innerWidth < 768;
    const imgAspect = img.naturalWidth / img.naturalHeight;

    // Reset transform, then scale for HiDPI sharpness
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Work in CSS pixels from here
    const w = cw / dpr;
    const h = ch / dpr;

    // Clear
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    if (isMobile) {
      // ─── MOBILE: car in bottom 45% of viewport, full width ───
      const areaTop = h * 0.55;
      const areaH = h * 0.45;

      // Cover-fit into the bottom strip
      let drawW = w;
      let drawH = w / imgAspect;

      if (drawH < areaH) {
        drawH = areaH;
        drawW = drawH * imgAspect;
      }

      // Scale up 15% to crop watermark
      const scale = 1.15;
      drawW *= scale;
      drawH *= scale;

      const drawX = (w - drawW) / 2;
      const drawY = areaTop + (areaH - drawH) / 2 - drawH * 0.03;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Top fade on the car strip
      const fadeGrad = ctx.createLinearGradient(0, areaTop, 0, areaTop + areaH * 0.3);
      fadeGrad.addColorStop(0, "rgba(13,13,13,1)");
      fadeGrad.addColorStop(1, "rgba(13,13,13,0)");
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, areaTop, w, areaH);
    } else {
      // ─── DESKTOP: car centered, cover-fit ───
      let drawH = h;
      let drawW = drawH * imgAspect;

      if (drawW < w) {
        drawW = w;
        drawH = drawW / imgAspect;
      }

      const drawX = (w - drawW) / 2;
      const drawY = (h - drawH) / 2 + h * 0.08;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }, []);

  /* ── Initial draw on load ── */
  useEffect(() => {
    if (disassembleLoaded && disassembleImages.current[0]) {
      drawFrame(disassembleImages.current[0]);
    }
  }, [disassembleLoaded, disassembleImages, drawFrame]);

  /* ── Scroll-driven rendering + beat state ── */
  useMotionValueEvent(progress, "change", (p: number) => {
    let frameKey: number;
    let img: HTMLImageElement | undefined;
    let beat: Beat;

    if (p <= PHASES.hero[1]) {
      frameKey = 0;
      img = disassembleImages.current[0];
      beat = "hero";
    } else if (p <= PHASES.disassemble[1]) {
      const t = (p - PHASES.disassemble[0]) / (PHASES.disassemble[1] - PHASES.disassemble[0]);
      const idx = Math.min(Math.round(t * (DISASSEMBLE_COUNT - 1)), DISASSEMBLE_COUNT - 1);
      frameKey = idx;
      img = disassembleImages.current[idx];
      beat = "disassemble";
    } else if (p <= PHASES.services[1]) {
      frameKey = DISASSEMBLE_COUNT - 1;
      img = disassembleImages.current[DISASSEMBLE_COUNT - 1];
      beat = "services";
    } else if (p <= PHASES.reassemble[1]) {
      const t = (p - PHASES.reassemble[0]) / (PHASES.reassemble[1] - PHASES.reassemble[0]);
      const idx = Math.max(
        DISASSEMBLE_COUNT - 1 - Math.round(t * (DISASSEMBLE_COUNT - 1)),
        0
      );
      frameKey = 100 + idx;
      img = disassembleImages.current[idx];
      beat = "reassemble";
    } else if (p <= PHASES.rotation[1]) {
      const t = (p - PHASES.rotation[0]) / (PHASES.rotation[1] - PHASES.rotation[0]);
      const idx = Math.min(Math.round(t * (ROTATION_COUNT - 1)), ROTATION_COUNT - 1);
      frameKey = 200 + idx;
      img = rotationImages.current[idx];
      beat = "rotation";
    } else {
      frameKey = 300;
      img = rotationImages.current[ROTATION_COUNT - 1];
      beat = "cta";
    }

    // Only trigger a React re-render when the beat actually changes
    if (beat !== lastBeatRef.current) {
      lastBeatRef.current = beat;
      setActiveBeat(beat);
    }

    if (frameKey !== lastFrameRef.current) {
      lastFrameRef.current = frameKey;
      drawFrame(img);
    }
  });

  /* ── Render ── */
  return (
    <section ref={containerRef} className="relative" style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: BG }}>

        {/* Layer 1: Canvas (car image) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 md:canvas-mask"
        />


        {/* Layer 3: Text overlays — same content on all screen sizes */}
        <div className="absolute inset-0 z-10">
          <BeatOverlay active={activeBeat === "hero"} position="left">
            <HeroBeat />
          </BeatOverlay>
          <BeatOverlay active={activeBeat === "disassemble"} position="right">
            <DisassembleBeat />
          </BeatOverlay>
          <BeatOverlay active={activeBeat === "services"} position="left">
            <ServicesBeat />
          </BeatOverlay>
          <BeatOverlay active={activeBeat === "reassemble"} position="right">
            <ReassembleBeat />
          </BeatOverlay>
          <BeatOverlay active={activeBeat === "rotation"} position="full">
            <RotationBeat />
          </BeatOverlay>
          <BeatOverlay active={activeBeat === "cta"} position="center">
            <CTABeat />
          </BeatOverlay>
        </div>

      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   Desktop Beat Wrapper
   Text overlaid on the dimmed car image.
   "left" = left-aligned text area, "center" = centered
   ════════════════════════════════════════════════════════ */

function BeatOverlay({
  active,
  position,
  children,
}: {
  active: boolean;
  position: "left" | "right" | "center" | "full";
  children: React.ReactNode;
}) {
  // Mobile: always full-width centered with padding
  // Desktop: positioned based on `position` prop
  const posMap = {
    left:   "inset-0 flex items-start pt-32 px-5 md:items-center md:pt-0 md:pl-[6%] md:pr-[40%]",
    right:  "inset-0 flex items-start pt-32 px-5 md:items-center md:pt-0 md:pl-[52%] md:pr-[6%]",
    center: "inset-0 flex items-start pt-32 justify-center px-5 md:items-center md:pt-0 md:px-[10%]",
    full:   "inset-0 flex items-start pt-32 px-5 md:items-center md:pt-0 md:px-[6%]",
  };

  return (
    <div
      className={`absolute transition-all duration-700 ease-in-out ${posMap[position]} ${
        active
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="w-full md:rounded-2xl md:border md:border-white/[0.04] md:bg-[rgba(13,13,13,0.35)] md:backdrop-blur-xs md:p-7">
        {children}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   DESKTOP BEATS — Premium redesign
   ════════════════════════════════════════════════════════ */

/* Beat 1 — HERO (left) */
function HeroBeat() {
  return (
    <div className="space-y-3">
      {/* Accent label */}
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-primary" />
        <span className="font-brand text-[10px] tracking-[0.3em] text-primary uppercase">
          Выездная калибровка
        </span>
      </div>

      <h1 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white lg:text-6xl">
        Выездная калибровка{" "}
        <span
          className="font-brand text-transparent bg-clip-text"
          style={{ backgroundImage: "linear-gradient(135deg, #00F0C8 0%, #0080FF 100%)" }}
        >
          ADAS
        </span>{" "}
        там, где удобно вам
      </h1>

      <p className="max-w-lg font-heading text-base font-medium text-white/70 lg:text-lg">
        Мы привозим лабораторию прямо в ваш автосервис
      </p>

      <p className="max-w-lg text-sm leading-relaxed text-white/50 lg:text-base">
        Профессиональная настройка камер, радаров и датчиков после ремонта,
        замены стекла или ДТП. Работаем с современным оборудованием и выдаём
        официальный отчёт.
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-7 py-3.5 font-heading text-sm font-semibold text-background transition-all hover:shadow-[0_0_32px_rgba(0,240,200,0.3)]"
        >
          Получить консультацию
          <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center rounded-lg border border-primary/30 px-6 py-3.5 font-heading text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          Записаться на калибровку
        </a>
      </div>

      {/* Trust triggers */}
      <div className="flex flex-col gap-2 pt-4 border-t border-white/5 text-xs text-white/40">
        <span>&#10004; Точная калибровка по стандартам производителей</span>
        <span>&#10004; Работа с большинством современных автомобилей</span>
        <span>&#10004; Быстрые сроки выполнения</span>
      </div>
    </div>
  );
}

/* Beat 2 — DISASSEMBLE (right) — car explodes on the left, text on right */
function DisassembleBeat() {
  return (
    <div className="space-y-5 text-right">
      <div className="flex items-center justify-end gap-3">
        <span className="font-brand text-[10px] tracking-[0.3em] text-primary/70 uppercase">
          Анатомия системы
        </span>
        <span className="h-px w-8 bg-primary/50" />
      </div>

      <h2 className="font-heading text-3xl font-bold leading-tight text-white/90 lg:text-5xl">
        Каждый датчик
        <br />
        <span className="text-primary">имеет значение</span>
      </h2>

      <div className="ml-auto max-w-sm space-y-3">
        <p className="text-sm leading-relaxed text-white/55 lg:text-base">
          Камера, радар, лидар — точное положение и угол обзора. Минимальное
          смещение после ремонта нарушает работу всей системы.
        </p>
        <p className="text-sm leading-relaxed text-white/55 lg:text-base">
          Мы возвращаем каждому компоненту{" "}
          <span className="font-semibold text-white/80">заводскую точность</span>.
        </p>
      </div>

      {/* Floating accent numbers */}
      <div className="flex justify-end gap-6 pt-3">
        <div className="text-right">
          <span className="font-brand text-3xl font-bold text-white/10">0.1&deg;</span>
          <p className="text-[10px] text-white/30 mt-0.5">точность калибровки</p>
        </div>
        <div className="text-right">
          <span className="font-brand text-3xl font-bold text-white/10">12+</span>
          <p className="text-[10px] text-white/30 mt-0.5">типов датчиков</p>
        </div>
      </div>
    </div>
  );
}

/* Beat 3 — SERVICES (left) — compact card grid */
function ServicesBeat() {
  const services = [
    { abbr: "ACC", name: "Адаптивный круиз-контроль" },
    { abbr: "AEB", name: "Экстренное торможение" },
    { abbr: "LKA", name: "Удержание в полосе" },
    { abbr: "TSR", name: "Распознавание знаков" },
    { abbr: "BSM", name: "Контроль слепых зон" },
    { abbr: "360°", name: "Камеры кругового обзора" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-primary/50" />
        <span className="font-brand text-[10px] tracking-[0.3em] text-primary/70 uppercase">
          Что калибруем
        </span>
      </div>

      <h2 className="font-heading text-3xl font-bold leading-tight text-white/90 lg:text-5xl">
        Полный спектр{" "}
        <span className="font-brand text-primary">ADAS</span>
      </h2>

      <div className="grid grid-cols-2 gap-2.5 max-w-md">
        {services.map((s) => (
          <div
            key={s.abbr}
            className="group rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-primary/20 hover:bg-primary/[0.03]"
          >
            <span className="font-brand text-sm font-bold text-primary">{s.abbr}</span>
            <p className="text-xs text-white/50 mt-0.5">{s.name}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-white/30 pt-1">
        + Помощь при парковке &middot; LDW &middot; Автоматическая парковка
      </p>
    </div>
  );
}

/* Beat 4 — REASSEMBLE (right) — triggers with numbered list */
function ReassembleBeat() {
  const triggers = [
    { icon: "&#9632;", text: "Замена лобового стекла" },
    { icon: "&#9632;", text: "Ремонт кузова или бампера" },
    { icon: "&#9632;", text: "Любое ДТП" },
    { icon: "&#9632;", text: "Замена камеры или радара" },
    { icon: "&#9632;", text: "Регулировка подвески" },
  ];

  return (
    <div className="space-y-5 text-right">
      <div className="flex items-center justify-end gap-3">
        <span className="font-brand text-[10px] tracking-[0.3em] text-primary/70 uppercase">
          Когда нужна
        </span>
        <span className="h-px w-8 bg-primary/50" />
      </div>

      <h2 className="font-heading text-3xl font-bold leading-tight text-white/90 lg:text-5xl">
        Не откладывайте
        <br />
        <span className="text-primary">калибровку</span>
      </h2>

      <ul className="ml-auto max-w-sm space-y-2.5">
        {triggers.map((t, i) => (
          <li
            key={i}
            className="flex items-center justify-end gap-3 text-sm text-white/60 lg:text-base"
          >
            {t.text}
            <span
              className="text-[8px] text-primary/60"
              dangerouslySetInnerHTML={{ __html: t.icon }}
            />
          </li>
        ))}
      </ul>

      <div className="ml-auto max-w-sm rounded-lg border border-primary/10 bg-primary/[0.03] px-4 py-3 mt-2">
        <p className="text-xs text-white/50 text-right">
          Некалиброванные системы создают{" "}
          <span className="font-semibold text-primary/80">угрозу безопасности</span> на дороге
        </p>
      </div>
    </div>
  );
}

/* Beat 5 — ROTATION (full width) — process steps split across both sides */
function RotationBeat() {
  const stepsLeft = [
    { num: "01", title: "Заявка", desc: "По телефону или через сайт" },
    { num: "02", title: "Выезд", desc: "Приезжаем к вам с оборудованием" },
  ];
  const stepsRight = [
    { num: "04", title: "Проверка", desc: "Контроль всех систем" },
    { num: "05", title: "Отчёт", desc: "Официальный документ" },
  ];

  return (
    <div className="flex items-center justify-between gap-8">
      {/* Left column */}
      <div className="flex-1 space-y-6 max-w-xs">
        {stepsLeft.map((s) => (
          <div key={s.num} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-brand text-xl font-bold text-primary">{s.num}</span>
              <span className="h-px flex-1 bg-white/5" />
            </div>
            <p className="font-heading text-lg font-semibold text-white/80">{s.title}</p>
            <p className="text-xs text-white/40">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Center label */}
      <div className="flex flex-col items-center gap-3 shrink-0">
        <span className="font-brand text-[10px] tracking-[0.3em] text-primary/50 uppercase">
          Процесс
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-primary/30 to-transparent" />
        <div className="text-center">
          <span className="font-brand text-2xl font-bold text-primary">03</span>
          <p className="font-heading text-base font-semibold text-white/80 mt-1">Калибровка</p>
          <p className="text-xs text-white/40">Точная настройка датчиков</p>
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary/30" />
      </div>

      {/* Right column */}
      <div className="flex-1 space-y-6 max-w-xs text-right">
        {stepsRight.map((s) => (
          <div key={s.num} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-white/5" />
              <span className="font-brand text-xl font-bold text-primary">{s.num}</span>
            </div>
            <p className="font-heading text-lg font-semibold text-white/80">{s.title}</p>
            <p className="text-xs text-white/40">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Beat 6 — CTA (center) — dramatic final */
function CTABeat() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <span className="font-brand text-[10px] tracking-[0.3em] text-primary/60 uppercase">
          ADAS ЦЕНТР
        </span>
        <h2 className="font-heading text-3xl font-bold leading-tight text-white lg:text-6xl">
          Точная калибровка —
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #00F0C8 0%, #0080FF 100%)" }}
          >
            там, где удобно вам
          </span>
        </h2>
      </div>

      <p className="max-w-lg mx-auto text-base text-white/50 lg:text-lg">
        Выездная лаборатория калибровки систем помощи водителю.
        Оборудование SmartSafe, сканер Launch, официальный отчёт.
      </p>

      <div className="flex items-center justify-center gap-5 pt-2">
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 font-heading text-sm font-semibold text-background transition-all hover:shadow-[0_0_40px_rgba(0,240,200,0.35)]"
        >
          Записаться на калибровку
          <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </a>
        <a
          href="tel:+7XXXXXXXXXX"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-8 py-4 font-heading text-sm font-semibold text-white/60 transition-all hover:border-primary/30 hover:text-primary"
        >
          Позвонить нам
        </a>
      </div>

      {/* Trust badges */}
      <div className="flex justify-center gap-8 pt-4">
        <div className="flex items-center gap-2 text-xs text-white/25">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          Оборудование SmartSafe
        </div>
        <div className="flex items-center gap-2 text-xs text-white/25">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          Сканер Launch
        </div>
        <div className="flex items-center gap-2 text-xs text-white/25">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          Официальный отчёт
        </div>
      </div>
    </div>
  );
}
