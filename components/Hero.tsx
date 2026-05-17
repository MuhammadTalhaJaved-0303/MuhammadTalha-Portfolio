"use client";

import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { HeroVideo } from "./hero/HeroVideo";
import { profile } from "@/lib/data";

/* ─────────────────────────────────────────────
   Centered minimal hero
   – Vercel / Contra freelancer style
   – Small avatar, centered name + tagline,
     short bio, paired CTAs, stats strip
───────────────────────────────────────────── */

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden noise pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      <HeroVideo />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center">
        {/* Avatar */}
        <Avatar />

        {/* Status badge */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-neon-mint)]/25 bg-[var(--color-neon-mint)]/[0.06] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--color-neon-mint)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-neon-mint)] opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-neon-mint)]" />
          </span>
          Available for hire
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-5 font-semibold leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl"
        >
          <span className="text-[var(--color-text-1)]">Muhammad </span>
          <span className="text-gradient-neon">Talha Javed</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[var(--color-text-2)]"
        >
          AI Engineer
          <span className="mx-3 text-[var(--color-neon-cyan)]">·</span>
          Python Developer
          <span className="mx-3 text-[var(--color-neon-cyan)]">·</span>
          UET Lahore
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-7 max-w-xl text-base sm:text-lg text-[var(--color-text-2)] leading-relaxed"
        >
          I build production-grade AI systems with{" "}
          <span className="text-[var(--color-text-1)]">FastAPI</span>,{" "}
          <span className="text-[var(--color-text-1)]">LangChain</span>, and{" "}
          <span className="text-[var(--color-text-1)]">AWS</span> — focused on
          machine learning, data quality, and scalable infrastructure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--color-neon-cyan)] px-6 py-3 text-sm font-medium text-black shadow-[var(--shadow-glow-cyan)] transition-transform hover:scale-[1.03]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            Start a project
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-black/30 px-5 py-3 text-sm text-[var(--color-text-1)] backdrop-blur hover:border-[var(--color-border-bright)] hover:bg-white/[0.04] transition"
          >
            View selected work
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={6}
          className="mt-6 flex items-center gap-2"
        >
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-black/30 text-[10px] font-mono uppercase text-[var(--color-text-2)] hover:text-[var(--color-neon-cyan)] hover:border-[var(--color-neon-cyan)]/40 transition"
              aria-label={s.label}
            >
              {s.label.slice(0, 2)}
            </a>
          ))}
        </motion.div>

        {/* Stats strip */}
        <StatsStrip />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.5em] text-[var(--color-text-3)] hover:text-[var(--color-text-1)] transition"
      >
        scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--color-neon-cyan)]"
        >
          ▾
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ───────────────────────────────────────── */

function Avatar() {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      animate="show"
      custom={0}
      className="relative h-24 w-24 sm:h-28 sm:w-28"
    >
      {/* Glow ring */}
      <div
        aria-hidden
        className="absolute -inset-2 rounded-full opacity-70 blur-xl"
        style={{
          background:
            "conic-gradient(from 200deg, var(--color-neon-cyan), var(--color-neon-violet), rgba(0,245,255,0.4), var(--color-neon-cyan))",
        }}
      />
      {/* Gradient border */}
      <div
        className="relative h-full w-full rounded-full p-[2px]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-violet))",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-[var(--color-bg-elev)]">
          {/* Initials backplate */}
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xl text-gradient-neon select-none">
            {profile.initials}
          </span>
          {/* Photo */}
          <img
            src="/profile.jpg"
            alt={profile.name}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>
      {/* Live dot */}
      <span
        className="absolute right-1 top-1 h-3 w-3 rounded-full bg-[var(--color-neon-mint)] ring-2 ring-[var(--color-bg-base)] shadow-[0_0_12px_var(--color-neon-mint)]"
        aria-label="online"
      />
    </motion.div>
  );
}

function StatsStrip() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: profile.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  const stats: Array<[string, React.ReactNode]> = [
    [profile.stats.projects, "Projects"],
    [profile.stats.githubCommits, "Commits"],
    [profile.stats.certifications, "Certifications"],
    [profile.stats.cgpa, "CGPA"],
  ];

  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      animate="show"
      custom={7}
      className="mt-14 w-full max-w-2xl"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-[var(--color-border-soft)] pt-6">
        {stats.map(([value, label]) => (
          <div key={String(label)} className="flex flex-col items-center gap-1">
            <span className="text-2xl sm:text-3xl font-semibold text-gradient-neon">
              {value}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-3)]">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-3)]">
        Lahore, Pakistan
        <span className="mx-2 text-[var(--color-text-3)]">·</span>
        <span className="text-[var(--color-neon-cyan)]">{time ?? "--:--"}</span>
      </p>
    </motion.div>
  );
}
