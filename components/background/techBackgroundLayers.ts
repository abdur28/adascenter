import { TECH_BG } from "./techBackgroundConfig";

const [r, g, b] = TECH_BG.color;

// ── Types ──────────────────────────────────────────────

export interface RingEmitter {
  cx: number;
  cy: number;
  rings: { radius: number; born: number }[];
  lastSpawn: number;
}

export interface TraceLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
  pulses: { t: number; born: number }[]; // t = 0..1 along line
  lastPulse: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface LayerState {
  emitters: RingEmitter[];
  traces: TraceLine[];
  particles: Particle[];
}

// ── Initialization ─────────────────────────────────────

export function initState(
  w: number,
  h: number,
  isMobile: boolean
): LayerState {
  const cfg = TECH_BG;

  // Ring emitters — spread across canvas
  const emitterCount = isMobile ? cfg.rings.countMobile : cfg.rings.count;
  const emitters: RingEmitter[] = [];
  for (let i = 0; i < emitterCount; i++) {
    emitters.push({
      cx: Math.random() * w,
      cy: Math.random() * h,
      rings: [],
      lastSpawn: 0,
    });
  }

  // Circuit trace lines — random segments snapped to grid
  const traceCount = isMobile ? 0 : cfg.traces.count;
  const traces: TraceLine[] = [];
  const gs = cfg.grid.spacing;
  for (let i = 0; i < traceCount; i++) {
    const x1 = Math.floor(Math.random() * (w / gs)) * gs;
    const y1 = Math.floor(Math.random() * (h / gs)) * gs;
    // Lines are either horizontal or vertical (circuit board feel)
    const horizontal = Math.random() > 0.5;
    const segLen = (2 + Math.floor(Math.random() * 4)) * gs;
    const x2 = horizontal ? x1 + segLen : x1;
    const y2 = horizontal ? y1 : y1 + segLen;
    const length = Math.hypot(x2 - x1, y2 - y1);
    traces.push({ x1, y1, x2, y2, length, pulses: [], lastPulse: 0 });
  }

  // Floating particles
  const particleCount = isMobile ? cfg.particles.countMobile : cfg.particles.count;
  const particles: Particle[] = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * cfg.particles.speed * 2,
      vy: (Math.random() - 0.5) * cfg.particles.speed * 2,
    });
  }

  return { emitters, traces, particles };
}

// ── Draw: Dot Grid ─────────────────────────────────────

export function drawDotGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const { spacing, dotRadius, opacity } = TECH_BG.grid;
  ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
  ctx.beginPath();
  for (let x = spacing; x < w; x += spacing) {
    for (let y = spacing; y < h; y += spacing) {
      ctx.moveTo(x + dotRadius, y);
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
    }
  }
  ctx.fill();
}

// ── Draw: Pulse Rings ──────────────────────────────────

export function drawPulseRings(
  ctx: CanvasRenderingContext2D,
  emitters: RingEmitter[],
  time: number
) {
  const cfg = TECH_BG.rings;

  for (const em of emitters) {
    // Spawn new ring
    if (time - em.lastSpawn > cfg.spawnInterval) {
      em.rings.push({ radius: 0, born: time });
      em.lastSpawn = time;
    }

    // Draw & update rings
    ctx.lineWidth = cfg.strokeWidth;
    for (let i = em.rings.length - 1; i >= 0; i--) {
      const ring = em.rings[i];
      const age = (time - ring.born) / 1000; // seconds
      ring.radius = age * cfg.speed;

      if (ring.radius > cfg.maxRadius) {
        em.rings.splice(i, 1);
        continue;
      }

      const progress = ring.radius / cfg.maxRadius;
      const alpha = cfg.maxOpacity * (1 - progress);
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.beginPath();
      ctx.arc(em.cx, em.cy, ring.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

// ── Draw: Circuit Traces ───────────────────────────────

export function drawCircuitTraces(
  ctx: CanvasRenderingContext2D,
  traces: TraceLine[],
  time: number
) {
  const cfg = TECH_BG.traces;

  for (const tr of traces) {
    // Draw static line
    ctx.strokeStyle = `rgba(${r},${g},${b},${cfg.lineOpacity})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(tr.x1, tr.y1);
    ctx.lineTo(tr.x2, tr.y2);
    ctx.stroke();

    // Draw small nodes at endpoints
    ctx.fillStyle = `rgba(${r},${g},${b},${cfg.lineOpacity * 2})`;
    ctx.beginPath();
    ctx.arc(tr.x1, tr.y1, 2, 0, Math.PI * 2);
    ctx.arc(tr.x2, tr.y2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Spawn pulse
    if (time - tr.lastPulse > cfg.pulseSpawnInterval) {
      tr.pulses.push({ t: 0, born: time });
      tr.lastPulse = time;
    }

    // Draw & update pulses
    for (let i = tr.pulses.length - 1; i >= 0; i--) {
      const pulse = tr.pulses[i];
      const age = (time - pulse.born) / 1000;
      pulse.t = (age * cfg.pulseSpeed) / tr.length;

      if (pulse.t > 1) {
        tr.pulses.splice(i, 1);
        continue;
      }

      const px = tr.x1 + (tr.x2 - tr.x1) * pulse.t;
      const py = tr.y1 + (tr.y2 - tr.y1) * pulse.t;

      ctx.fillStyle = `rgba(${r},${g},${b},${cfg.pulseOpacity})`;
      ctx.beginPath();
      ctx.arc(px, py, cfg.pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.fillStyle = `rgba(${r},${g},${b},${cfg.pulseOpacity * 0.3})`;
      ctx.beginPath();
      ctx.arc(px, py, cfg.pulseRadius * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// ── Draw: Particles ────────────────────────────────────

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  w: number,
  h: number
) {
  const cfg = TECH_BG.particles;
  ctx.fillStyle = `rgba(${r},${g},${b},${cfg.opacity})`;
  ctx.beginPath();
  for (const p of particles) {
    // Move
    p.x += p.vx;
    p.y += p.vy;
    // Wrap
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.moveTo(p.x + cfg.radius, p.y);
    ctx.arc(p.x, p.y, cfg.radius, 0, Math.PI * 2);
  }
  ctx.fill();
}
