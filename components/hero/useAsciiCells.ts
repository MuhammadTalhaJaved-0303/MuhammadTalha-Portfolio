"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SAMPLE, FONT_SIZE } from "@/lib/ascii/config";
import { loadImage } from "@/lib/ascii/loadImage";
import { sampleImage } from "@/lib/ascii/sample";
import type { AsciiCell } from "@/lib/ascii/types";

/** Sampled cells are pure per (src, size), so they survive remounts. */
const cache = new Map<string, AsciiCell[]>();

export function glyphSizeFor(size: number): number {
  return size < FONT_SIZE.mobileBreakpoint ? FONT_SIZE.small : FONT_SIZE.large;
}

export type AsciiCellsStatus = "idle" | "loading" | "ready" | "error";

export interface AsciiCellsResult {
  readonly cells: AsciiCell[] | null;
  readonly status: AsciiCellsStatus;
}

/**
 * Samples `src` into ASCII cells at the given square `size`.
 * Pass `size = 0` to defer work until the container has been measured.
 */
export function useAsciiCells(src: string, size: number): AsciiCellsResult {
  const [cells, setCells] = useState<AsciiCell[] | null>(null);
  const [status, setStatus] = useState<AsciiCellsStatus>("idle");

  useEffect(() => {
    if (size <= 0) return;

    const key = `${src}@${size}`;
    const hit = cache.get(key);
    if (hit) {
      setCells(hit);
      setStatus("ready");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    loadImage(src)
      .then((image) => {
        if (cancelled) return;

        const sampled = sampleImage(image, {
          ...DEFAULT_SAMPLE,
          size,
          fontSize: glyphSizeFor(size),
        });

        cache.set(key, sampled);
        setCells(sampled);
        setStatus("ready");
      })
      .catch(() => {
        // The consumer renders a plain <img> fallback on error; there is no
        // useful recovery here and no logger configured in this project.
        if (cancelled) return;
        setCells(null);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [src, size]);

  return { cells, status };
}
