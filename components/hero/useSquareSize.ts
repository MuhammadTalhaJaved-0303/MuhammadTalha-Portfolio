"use client";

import { useEffect, useState, type RefObject } from "react";
import { SIZE } from "@/lib/ascii/config";

/**
 * Clamps to the portrait's size bounds and snaps to `SIZE.quantum` steps, so a
 * window drag re-samples a handful of times instead of once per pixel.
 */
function quantize(width: number): number {
  const clamped = Math.min(SIZE.max, Math.max(SIZE.min, width));
  return Math.round(clamped / SIZE.quantum) * SIZE.quantum;
}

/**
 * Measures a container and returns a quantised square size in CSS pixels.
 * Returns 0 until the first measurement lands, which keeps the canvas inert
 * during SSR and the first client paint.
 */
export function useSquareSize(ref: RefObject<HTMLElement | null>): number {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      // React bails out when the quantised value is unchanged, so this does not
      // re-render on every resize tick.
      if (width > 0) setSize(quantize(width));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
