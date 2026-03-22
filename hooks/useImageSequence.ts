"use client";

import { useEffect, useRef, useState } from "react";

export function useImageSequence(paths: string[]): {
  images: React.RefObject<HTMLImageElement[]>;
  loaded: boolean;
} {
  const images = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (paths.length === 0) return;

    let loadedCount = 0;
    const total = paths.length;
    const imgs: HTMLImageElement[] = new Array(total);

    paths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) {
          setLoaded(true);
        }
      };
      imgs[i] = img;
    });

    images.current = imgs;
  }, [paths]);

  return { images, loaded };
}
