"use client";

import { useScroll, type MotionValue } from "framer-motion";
import { useRef } from "react";

export function useScrollProgress(): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return { containerRef, progress: scrollYProgress };
}
