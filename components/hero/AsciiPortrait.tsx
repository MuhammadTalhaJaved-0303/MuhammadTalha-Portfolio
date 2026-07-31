"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { IDLE, MAX_DEVICE_PIXEL_RATIO, PHYSICS } from "@/lib/ascii/config";
import { monoFontStack } from "@/lib/ascii/font";
import { fillStyleFor } from "@/lib/ascii/palette";
import { createParticles, settleParticles, stepParticle } from "@/lib/ascii/physics";
import type { AsciiParticle, PointerState } from "@/lib/ascii/types";
import { glyphSizeFor, useAsciiCells } from "./useAsciiCells";
import { useSquareSize } from "./useSquareSize";

interface AsciiPortraitProps {
  src: string;
  /** Describes the portrait for assistive tech. */
  alt: string;
  className?: string;
}

const OFFSCREEN: PointerState = { x: -9999, y: -9999, active: false };

/**
 * A portrait rendered as drifting ASCII characters on a canvas.
 * Assembles on load, repels the cursor, and idles with a slow drift.
 * Honours `prefers-reduced-motion` by drawing a single static frame.
 */
export function AsciiPortrait({ src, alt, className }: AsciiPortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particlesRef = useRef<AsciiParticle[]>([]);
  const pointerRef = useRef<PointerState>({ ...OFFSCREEN });
  const pointerTargetRef = useRef<PointerState>({ ...OFFSCREEN });
  const startRef = useRef(0);

  const size = useSquareSize(frameRef);
  const { cells, status } = useAsciiCells(src, size);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !cells || size <= 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(MAX_DEVICE_PIXEL_RATIO, window.devicePixelRatio || 1);

    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${glyphSizeFor(size)}px ${monoFontStack(canvas)}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    particlesRef.current = createParticles(cells, !reduceMotion);
    pointerRef.current = { ...OFFSCREEN };
    pointerTargetRef.current = { ...OFFSCREEN };
    startRef.current = performance.now();

    const paintStatic = () => {
      settleParticles(particlesRef.current);
      ctx.clearRect(0, 0, size, size);
      for (const p of particlesRef.current) {
        ctx.fillStyle = fillStyleFor(p.colorBucket, p.alpha);
        ctx.fillText(p.char, p.x, p.y);
      }
    };

    if (reduceMotion) {
      paintStatic();
      return;
    }

    let raf = 0;
    let pausedAt = 0;
    let idleFrames = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, size, size);

      const pointer = pointerRef.current;
      const target = pointerTargetRef.current;
      pointer.x += (target.x - pointer.x) * PHYSICS.pointerEase;
      pointer.y += (target.y - pointer.y) * PHYSICS.pointerEase;
      pointer.active = target.active;

      const context = {
        elapsed: (performance.now() - startRef.current) / 1000,
        pointer,
        size,
      };

      let moving = false;

      for (const p of particlesRef.current) {
        if (!stepParticle(p, context)) continue;
        if (!moving && (Math.abs(p.vx) > IDLE.velocity || Math.abs(p.vy) > IDLE.velocity)) {
          moving = true;
        }
        if (p.alpha < PHYSICS.alphaCutoff) continue;
        ctx.fillStyle = fillStyleFor(p.colorBucket, p.alpha);
        ctx.fillText(p.char, p.x, p.y);
      }

      /* Once the portrait has assembled and nothing is moving, stop the loop
         and leave the last frame on the canvas. A hero that keeps redrawing
         thousands of glyphs at 60fps for the whole visit is a battery bug.
         `toLocal` restarts it the moment the cursor comes back. */
      const restable = !pointer.active && context.elapsed > PHYSICS.introActive && !moving;
      idleFrames = restable ? idleFrames + 1 : 0;
      if (idleFrames > IDLE.frames) pause();
    };

    /* Run only while the hero is on screen and the tab is focused. Shifting
       `startRef` by the paused duration keeps the intro from jumping ahead if
       the visitor tabs away mid-assembly. */
    const resume = () => {
      if (raf) return;
      if (pausedAt) {
        startRef.current += performance.now() - pausedAt;
        pausedAt = 0;
      }
      draw();
    };

    const pause = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
      pausedAt = performance.now();
    };

    let onScreen = true;

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (onScreen) resume();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) resume();
        else pause();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const toLocal = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerTargetRef.current.x = event.clientX - rect.left;
      pointerTargetRef.current.y = event.clientY - rect.top;
      pointerTargetRef.current.active = true;
      resume(); // wakes the loop if it parked itself while idle
    };

    const onLeave = () => {
      pointerTargetRef.current.x = OFFSCREEN.x;
      pointerTargetRef.current.y = OFFSCREEN.y;
      pointerTargetRef.current.active = false;
    };

    // No `touch-action: none` here — repulsion is a nicety, scrolling past the
    // hero on a phone is not.
    canvas.addEventListener("pointermove", toLocal, { passive: true });
    canvas.addEventListener("pointerleave", onLeave, { passive: true });
    canvas.addEventListener("pointercancel", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    draw();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointermove", toLocal);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [cells, size]);

  return (
    <div
      ref={frameRef}
      role="img"
      aria-label={alt}
      className={`relative flex aspect-square w-full max-w-[420px] items-center justify-center ${className ?? ""}`}
    >
      {/* Champagne bloom behind the glyphs so the portrait reads as lit, not flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[8%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(212,175,110,0.16), rgba(143,181,164,0.08) 55%, transparent 72%)",
        }}
      />

      {status === "error" ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 60vw, 420px"
          className="rounded-full object-cover opacity-80 [mask-image:radial-gradient(circle_at_center,black_58%,transparent_78%)]"
          priority
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="relative cursor-crosshair transition-opacity duration-700"
          style={{
            width: size || undefined,
            height: size || undefined,
            opacity: status === "ready" ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
