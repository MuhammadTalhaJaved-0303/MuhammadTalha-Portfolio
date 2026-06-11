"use client";

import { useEffect, useRef } from "react";

/* Champagne constellation backdrop — particles + aurora + vignette.
   Self-contained (no external video) so the hero never pops in late. */

const GOLD_HUE = 42;
const SAGE_HUE = 152;

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <ParticleField />

      {/* Aurora glow layer */}
      <div className="aurora" />

      {/* Vignette/legibility overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(16,19,25,0.2) 0%, rgba(16,19,25,0.85) 70%, #101319 100%)",
        }}
      />

      {/* Subtle grid wash */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-40" />
    </div>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const density = Math.min(window.innerWidth * 0.08, 110);
    const particles = Array.from({ length: density }, () => spawn(canvas));

    function spawn(c: HTMLCanvasElement) {
      return {
        x: Math.random() * c.offsetWidth,
        y: Math.random() * c.offsetHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random() > 0.4 ? GOLD_HUE : SAGE_HUE,
      };
    }

    function tick() {
      const cw = canvas!.offsetWidth;
      const ch = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, cw, ch);

      // links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 11000) {
            const alpha = 1 - d2 / 11000;
            ctx!.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 45%, 65%, ${alpha * 0.16})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > cw) p.vx *= -1;
        if (p.y < 0 || p.y > ch) p.vy *= -1;
        ctx!.fillStyle = `hsla(${p.hue}, 55%, 68%, 0.75)`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduced) raf = requestAnimationFrame(tick);
    }

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }
    window.addEventListener("resize", resize);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-50 mix-blend-screen"
    />
  );
}
