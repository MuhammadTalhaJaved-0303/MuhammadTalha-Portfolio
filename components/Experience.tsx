"use client";

import { motion } from "motion/react";
import { experience } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading num="/03" title="Experience" kicker="timeline" />

        <div className="relative grid lg:grid-cols-[1fr_2fr] gap-10">
          {/* Left summary */}
          <div className="hidden lg:block">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-2)] mb-3">
              roles
            </p>
            <p className="text-[var(--color-text-2)] text-sm leading-relaxed">
              Industry experience focused on production ML pipelines, EDA, and
              model evaluation — building data-quality first systems.
            </p>
          </div>

          {/* Right timeline */}
          <ol className="relative space-y-8 border-l border-[var(--color-border-soft)] pl-8 ml-2">
            {experience.map((e, i) => (
              <motion.li
                key={e.role + e.company}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-2 flex h-3 w-3 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-[var(--color-neon-cyan)] opacity-40 animate-ping" />
                  <span className="relative h-3 w-3 rounded-full bg-[var(--color-neon-cyan)] shadow-[0_0_18px_var(--color-neon-cyan)]" />
                </span>
                <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-elev)]/60 backdrop-blur p-6 hover:border-[var(--color-border-bright)] hover:shadow-[var(--shadow-glow-cyan)] transition">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{e.role}</h3>
                      <p className="mt-1 text-sm text-[var(--color-neon-cyan)]">
                        {e.company} · <span className="text-[var(--color-text-2)]">{e.location}</span>
                      </p>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-2)]">
                      {e.period}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-sm text-[var(--color-text-1)]"
                      >
                        <span className="mt-1.5 h-1 w-3 shrink-0 rounded-full bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-violet)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
