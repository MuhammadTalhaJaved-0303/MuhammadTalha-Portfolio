"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  num: string;
  title: string;
  kicker?: string;
  accent?: "cyan" | "violet";
}

export function SectionHeading({ num, title, kicker, accent = "cyan" }: SectionHeadingProps) {
  const dotColor = accent === "cyan" ? "var(--color-neon-cyan)" : "var(--color-neon-violet)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="flex flex-col gap-3 mb-12 md:mb-16"
    >
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-2)]">
        <span className="text-[var(--color-neon-cyan)]">{num}</span>
        <span className="h-px w-10 bg-[var(--color-border-soft)]" />
        {kicker && <span>{kicker}</span>}
      </div>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
        {title}
        <span style={{ color: dotColor }}>.</span>
      </h2>
    </motion.div>
  );
}
