"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/cn";

const SECTION_IDS = navLinks.map((l) => l.href.replace(/^#/, ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(SECTION_IDS[0] ?? "");

  /* glass-on-scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active section tracking via IntersectionObserver */
  useEffect(() => {
    const els = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 px-2.5 transition-all rounded-full",
          scrolled
            ? "border border-[var(--color-border-soft)] bg-[var(--color-bg-glass)] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
            : "border border-transparent bg-transparent"
        )}
      >
        <Brand />

        <NavLinks active={active} />

        <div className="flex items-center gap-2">
          <HireButton />
          <ProfileChip />
        </div>
      </div>
    </motion.nav>
  );
}

/* ─────────────────────────────────────── */

function Brand() {
  return (
    <a
      href="#hero"
      aria-label="Home"
      className="group relative inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-sm tracking-tight text-[var(--color-text-1)] transition-colors hover:text-[var(--color-gold)]"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-gold)] opacity-60" />
        <span className="relative h-2 w-2 rounded-full bg-[var(--color-gold)] shadow-[0_0_10px_var(--color-gold)]" />
      </span>
      <span>
        <span className="text-[var(--color-gold)]">&lt;</span>
        {profile.initials}
        <span className="text-[var(--color-sage)]">/&gt;</span>
      </span>
    </a>
  );
}

interface NavLinksProps {
  active: string;
}

function NavLinks({ active }: NavLinksProps) {
  return (
    <ul className="hidden md:flex items-center gap-0.5 text-sm">
      {navLinks.map((link) => {
        const id = link.href.replace(/^#/, "");
        const isActive = active === id;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group relative inline-flex items-center px-3.5 py-2 transition-colors",
                isActive
                  ? "text-[var(--color-text-1)]"
                  : "text-[var(--color-text-2)] hover:text-[var(--color-text-1)]"
              )}
            >
              {link.label}
              {/* Underline indicator — slides into place when active, fades on hover */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full transition-all duration-300",
                  isActive
                    ? "opacity-100 bg-gradient-to-r from-[var(--color-gold-bright)] to-[var(--color-gold)] shadow-[0_0_8px_rgba(212,175,110,0.6)]"
                    : "opacity-0 bg-[var(--color-text-2)] group-hover:opacity-60"
                )}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function HireButton() {
  return (
    <a
      href="#contact"
      className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-base)]/50 px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-1)] transition hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/[0.08] hover:text-[var(--color-gold)]"
    >
      Hire me
      <span className="font-mono text-[10px] text-[var(--color-text-2)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-gold)]">
        →
      </span>
    </a>
  );
}

function ProfileChip() {
  return (
    <a
      href="#about"
      aria-label={`${profile.name} — open about section`}
      className="group flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] py-1 pl-1 pr-3 transition hover:border-white/15 hover:bg-white/[0.06]"
    >
      {/* Avatar — clean photo, subtle border, Discord/FB style */}
      <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center">
        <span className="relative h-full w-full overflow-hidden rounded-full bg-[var(--color-bg-elev)] ring-1 ring-white/10">
          {/* fallback initials backplate */}
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-semibold text-[var(--color-text-2)] select-none">
            {profile.initials}
          </span>
          <img
            src="/profile.jpg"
            alt={profile.name}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </span>
        {/* Status indicator — Discord-style: small dot, bottom-right, bg-base ring */}
        <span
          aria-label="online"
          className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22c55e] ring-2 ring-[var(--color-bg-base)] group-hover:ring-white/10 transition"
        />
      </span>

      {/* Name + status — lg-only so the bar never crowds on tablets */}
      <span className="hidden lg:flex flex-col items-start leading-tight">
        <span className="text-[12px] font-semibold text-[var(--color-text-1)]">
          {profile.name.split(" ").slice(-2).join(" ")}
        </span>
        <span className="mt-0.5 flex items-center gap-1 text-[10px] text-[var(--color-text-2)]">
          <span className="h-1 w-1 rounded-full bg-[#22c55e]" />
          Online
        </span>
      </span>

      {/* Caret — Discord/FB style affordance */}
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="hidden lg:block h-3 w-3 text-[var(--color-text-3)] transition group-hover:text-[var(--color-text-1)]"
      >
        <path
          d="M3 5l3 3 3-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
