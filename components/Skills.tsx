"use client";

import { motion } from "motion/react";
import { skills, education, techStack } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

const MARQUEE = [...techStack, ...techStack];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading num="/04" title="Capabilities" kicker="skills" accent="violet" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-elev)]/60 backdrop-blur p-6 hover:border-[var(--color-border-bright)] hover:-translate-y-0.5 transition"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--color-neon-violet)]/10 blur-2xl group-hover:bg-[var(--color-neon-cyan)]/20 transition" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-2)]">
                /0{i + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--color-border-soft)] bg-black/30 px-2.5 py-1 font-mono text-[10px] text-[var(--color-text-1)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech marquee */}
        <div className="relative mt-14 overflow-hidden mask-fade-x py-4">
          <div className="flex w-max gap-8 animate-[marquee-x_28s_linear_infinite]">
            {MARQUEE.map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="font-mono text-2xl sm:text-3xl text-[var(--color-text-2)] hover:text-[var(--color-neon-cyan)] transition"
              >
                {t}
                <span className="mx-6 text-[var(--color-neon-violet)]/40">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <h3 className="mt-20 mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-2)]">
          education & certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {education.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-elev)]/60 backdrop-blur p-5"
            >
              <span className="absolute top-4 right-4 text-2xl">
                {e.icon === "grad" ? "🎓" : "📜"}
              </span>
              <h4 className="text-base font-semibold leading-snug">{e.title}</h4>
              <p className="mt-1 text-xs text-[var(--color-text-2)]">{e.org} · {e.date}</p>
              {e.highlight && (
                <p className="mt-3 inline-block rounded-md bg-[var(--color-neon-cyan)]/10 px-2 py-1 font-mono text-[10px] text-[var(--color-neon-cyan)] border border-[var(--color-neon-cyan)]/30">
                  {e.highlight}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .mask-fade-x {
          -webkit-mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
                  mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
        }
      `}</style>
    </section>
  );
}
