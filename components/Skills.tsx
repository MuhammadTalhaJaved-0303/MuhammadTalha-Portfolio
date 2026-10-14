"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { skills, education, techStack } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

const TECH_LOGOS: Record<string, string> = {
  Python: "python",
  FastAPI: "fastapi",
  LangChain: "langchain",
  PyTorch: "pytorch",
  AWS: "aws",
  Docker: "docker",
  PostgreSQL: "postgresql",
  Redis: "redis",
  ChromaDB: "chroma",
  Pandas: "pandas",
  "scikit-learn": "scikitlearn",
  "Next.js": "nextdotjs",
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading num="/04" title="Capabilities" kicker="skills" accent="sage" />

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
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--color-sage)]/10 blur-2xl group-hover:bg-[var(--color-gold)]/20 transition" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-2)]">
                /0{i + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-base)]/40 px-2.5 py-1 font-mono text-[10px] text-[var(--color-text-1)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech marquee */}
        <div className="tech-marquee relative mt-14 overflow-hidden mask-fade-x py-4" role="region" aria-label="Technology stack">
          <div className="tech-marquee-track flex w-max animate-[marquee-x_28s_linear_infinite]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className="tech-marquee-group flex shrink-0 items-center"
              >
                {techStack.map((technology) => (
                  <li key={technology} title={technology} className="flex h-16 w-28 shrink-0 items-center justify-center px-4">
                    <Image
                      src={`/tech/${TECH_LOGOS[technology]}.svg`}
                      alt={copy === 0 ? technology : ""}
                      width={80}
                      height={48}
                      loading="eager"
                      className="h-12 w-20 object-contain brightness-0 invert opacity-70 transition-opacity hover:opacity-100"
                    />
                  </li>
                ))}
              </ul>
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
                <p className="mt-3 inline-block rounded-md bg-[var(--color-gold)]/10 px-2 py-1 font-mono text-[10px] text-[var(--color-gold)] border border-[var(--color-gold)]/30">
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
        .tech-marquee:hover .tech-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee {
            -webkit-mask-image: none;
            mask-image: none;
          }
          .tech-marquee-track {
            animation: none;
            width: 100%;
          }
          .tech-marquee-group {
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
          }
          .tech-marquee-group[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
