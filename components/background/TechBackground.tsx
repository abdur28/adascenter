"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TECH_BG } from "./techBackgroundConfig";
import {
  initState,
  drawDotGrid,
  drawPulseRings,
  drawCircuitTraces,
  drawParticles,
  type LayerState,
} from "./techBackgroundLayers";

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<LayerState | null>(null);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const { shouldAnimate, isMobile } = useReducedMotion();

  const frameInterval = isMobile
    ? 1000 / TECH_BG.performance.targetFpsMobile
    : 1000 / TECH_BG.performance.targetFps;

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio, TECH_BG.performance.maxDpr);
    const w = parent.clientWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    stateRef.current = initState(w, h, isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!shouldAnimate) return;

    setupCanvas();

    // Resize handler (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupCanvas, 200);
    };
    window.addEventListener("resize", onResize);

    // Visibility — pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !rafRef.current) {
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    const wrapper = canvasRef.current?.parentElement;
    if (wrapper) observer.observe(wrapper);

    // Animation loop
    function animate(time: number) {
      if (!visibleRef.current) {
        rafRef.current = 0;
        return;
      }

      if (time - lastFrameRef.current < frameInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = time;

      const canvas = canvasRef.current;
      const state = stateRef.current;
      if (!canvas || !state) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(
        window.devicePixelRatio,
        TECH_BG.performance.maxDpr
      );
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      drawDotGrid(ctx, w, h);
      drawPulseRings(ctx, state.emitters, time);
      if (!isMobile) drawCircuitTraces(ctx, state.traces, time);
      drawParticles(ctx, state.particles, w, h);

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, [shouldAnimate, isMobile, frameInterval, setupCanvas]);

  if (!shouldAnimate) return null;

  return (
    <canvas
      ref={canvasRef}
      className="sticky top-0 h-screen w-full pointer-events-none"
      style={{ gridArea: "1/1", zIndex: 0 }}
    />
  );
}
