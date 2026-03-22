"use client";

import { useState, useEffect } from "react";

interface MotionPrefs {
  shouldAnimate: boolean;
  isMobile: boolean;
}

export function useReducedMotion(): MotionPrefs {
  const [prefs, setPrefs] = useState<MotionPrefs>({
    shouldAnimate: true,
    isMobile: false,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;
    const lowEnd =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 2;

    setPrefs({
      shouldAnimate: !prefersReduced && !lowEnd,
      isMobile,
    });
  }, []);

  return prefs;
}
