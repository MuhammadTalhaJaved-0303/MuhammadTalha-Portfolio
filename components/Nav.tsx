"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          "mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 transition-all",
          "rounded-full",
          scrolled
            ? "border border-[var(--color-border-soft)] bg-[var(--color-bg-glass)] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
            : "border border-transparent bg-transparent"
        )}
      >
        <a
          href="#hero"
          className="font-mono text-sm tracking-tight text-[var(--color-text-1)] py-3"
        >
          <span className="text-[var(--color-neon-cyan)]">&lt;</span>
          {profile.initials}
          <span className="text-[var(--color-neon-violet)]">/&gt;</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-2 text-[var(--color-text-2)] transition-colors hover:text-[var(--color-text-1)] hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-black/30 px-3 py-1.5 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-neon-mint)] opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-[var(--color-neon-mint)]" />
          </span>
          <span className="hidden sm:inline text-[var(--color-text-1)]">
            Available for work
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
