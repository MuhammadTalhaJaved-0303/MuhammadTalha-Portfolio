"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-with-buildings-and-circles-30750-large.mp4";
const VIDEO_FALLBACK =
  "https://assets.mixkit.co/videos/preview/mixkit-neon-lights-on-a-dark-background-31734-large.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    v.play().catch(() => {
      /* autoplay blocked — keep poster */
    });
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {!failed && (
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-70" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <source src={VIDEO_FALLBACK} type="video/mp4" />
        </video>
      )}

      {/* Always-on canvas particle fallback */}
      <ParticleField />

      {/* Aurora glow layer */}
      <div className="aurora" />

      {/* Vignette/legibility overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(8,8,12,0.2) 0%, rgba(8,8,12,0.85) 70%, #08080c 100%)",
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
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
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
        hue: Math.random() > 0.5 ? 188 : 282,
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
            ctx!.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 90%, 60%, ${alpha * 0.22})`;
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
        ctx!.fillStyle = `hsla(${p.hue}, 95%, 65%, 0.85)`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduced) raf = requestAnimationFrame(tick);
    }

    function resize() {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
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
      className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
    />
  );
}
