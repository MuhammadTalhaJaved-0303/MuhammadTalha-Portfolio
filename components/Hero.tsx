"use client";

import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { HeroBackdrop } from "./hero/HeroBackdrop";
import { profile, products } from "@/lib/data";
import { SOCIAL_ICONS, MailIcon } from "./icons/SocialIcons";

/* ─────────────────────────────────────────────
   Restructured hero (no avatar — name leads)
   – Status pill kicker
   – Bigger name + champagne serif surname
   – Tagline · short bio
   – Primary CTA + secondary outline
   – Real brand-logo social row (interactive)
   – Stats strip + Lahore live clock
───────────────────────────────────────────── */

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 + i * 0.08, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden noise pt-32 pb-24 sm:pt-36 sm:pb-28"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center">
        {/* Status pill */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-sage)]/25 bg-[var(--color-sage)]/[0.06] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--color-sage)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-sage)] opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-sage)]" />
          </span>
          Open for projects
          <span className="text-[var(--color-text-3)]">·</span>
          <span className="text-[var(--color-text-2)]">remote worldwide</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 font-semibold leading-[1.02] tracking-tight text-5xl sm:text-6xl md:text-7xl"
        >
          <span className="text-[var(--color-text-1)]">Muhammad </span>
          <span className="text-gradient-gold">Talha Javed</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[var(--color-text-2)]"
        >
          AI Engineer
          <span className="mx-3 text-[var(--color-gold)]">·</span>
          Python &amp; ML
          <span className="mx-3 text-[var(--color-gold)]">·</span>
          UET Lahore
        </motion.p>

        {/* Industries row */}
        <IndustryChips />

        {/* Bio */}
        <motion.p
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-7 max-w-2xl text-base sm:text-lg text-[var(--color-text-2)] leading-relaxed"
        >
          I help startups and teams ship production AI products as a
          freelancer. In{" "}
          <span className="text-[var(--color-text-1)]">EdTech</span> I shipped{" "}
          <ProductLink href={products[0].url} accent="gold">
            {products[0].name}
          </ProductLink>{" "}
          and{" "}
          <ProductLink href={products[1].url} accent="sage">
            {products[1].name}
          </ProductLink>
          , with more delivered across{" "}
          <span className="text-[var(--color-text-1)]">healthcare</span> and{" "}
          <span className="text-[var(--color-text-1)]">SaaS</span>. From ML
          systems and AI agents to data pipelines and full-stack delivery.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-medium text-[#14110a] shadow-[var(--shadow-glow-gold)] transition-transform hover:scale-[1.03]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            <MailIcon className="h-4 w-4" />
            Start a project
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-base)]/40 px-5 py-3 text-sm text-[var(--color-text-1)] backdrop-blur hover:border-[var(--color-border-bright)] hover:bg-white/[0.04] transition"
          >
            View selected work
          </a>
        </motion.div>

        {/* Brand-logo social row */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={6}
          className="mt-7 flex items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-3)]">
            connect
          </span>
          <span className="h-px w-8 bg-[var(--color-border-soft)]" />
          {(["github", "linkedin", "whatsapp"] as const).map((k) => {
            const s = SOCIAL_ICONS[k];
            return (
              <a
                key={k}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className={`group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-base)]/50 text-[var(--color-text-2)] backdrop-blur transition-all duration-200 ${s.hoverClass}`}
              >
                <s.Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0b0d12]/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-1)] opacity-0 transition-opacity group-hover:opacity-100">
                  {s.label}
                </span>
              </a>
            );
          })}
        </motion.div>

        {/* Stats strip */}
        <StatsStrip />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.5em] text-[var(--color-text-3)] hover:text-[var(--color-text-1)] transition"
      >
        scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--color-gold)]"
        >
          ▾
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ───────────────────────────────────────── */

const INDUSTRIES: Array<{ label: string; icon: string; tint: string }> = [
  { label: "EdTech",     icon: "✶", tint: "var(--color-gold)" },
  { label: "Healthcare", icon: "✚", tint: "var(--color-sage)" },
  { label: "SaaS",       icon: "◆", tint: "var(--color-gold-bright)" },
];

function IndustryChips() {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      animate="show"
      custom={3}
      className="mt-5 flex flex-wrap items-center justify-center gap-2"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-3)]">
        industries
      </span>
      <span className="h-px w-6 bg-[var(--color-border-soft)]" />
      {INDUSTRIES.map((it) => (
        <span
          key={it.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-base)]/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-1)] backdrop-blur"
        >
          <span style={{ color: it.tint }}>{it.icon}</span>
          {it.label}
        </span>
      ))}
    </motion.div>
  );
}

interface ProductLinkProps {
  href: string;
  accent: "gold" | "sage";
  children: React.ReactNode;
}

function ProductLink({ href, accent, children }: ProductLinkProps) {
  const color =
    accent === "gold"
      ? "var(--color-gold)"
      : "var(--color-sage)";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex items-baseline gap-0.5 font-medium text-[var(--color-text-1)] transition-colors"
      style={{ ["--accent" as string]: color }}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 right-0 h-px transition-opacity"
          style={{ background: "var(--accent)", opacity: 0.45 }}
        />
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
          style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
        />
      </span>
      <span
        className="text-[10px] opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5"
        style={{ color: "var(--accent)" }}
      >
        ↗
      </span>
    </a>
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

  const stats: Array<[string, string]> = [
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
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="text-2xl sm:text-3xl font-semibold text-gradient-gold">
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
        <span className="text-[var(--color-gold)]">{time ?? "--:--"}</span>
      </p>
    </motion.div>
  );
}
