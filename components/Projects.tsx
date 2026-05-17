"use client";

import { motion } from "motion/react";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/cn";

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-neon-cyan), transparent)",
            opacity: 0.4,
          }}
        />
      </div>
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading num="/02" title="Selected work" kicker="projects" accent="violet" />

        {featured && <FeaturedCard project={featured} />}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-bg-elev)]/60 backdrop-blur transition hover:border-[var(--color-border-bright)]"
    >
      <div
        className="absolute inset-0 -z-10 opacity-50 group-hover:opacity-80 transition-opacity"
        style={{
          background:
            "radial-gradient(60% 80% at 0% 0%, rgba(0,245,255,0.18), transparent 55%), radial-gradient(60% 80% at 100% 100%, rgba(181,55,242,0.18), transparent 55%)",
        }}
      />
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="p-7 sm:p-10 flex flex-col gap-6">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]">
            <span className="rounded-full bg-[var(--color-neon-cyan)]/10 text-[var(--color-neon-cyan)] px-2 py-1 border border-[var(--color-neon-cyan)]/30">
              {project.tag}
            </span>
            <span className="text-[var(--color-text-2)]">{project.year}</span>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-2)]">
              {project.subtitle}
            </p>
          </div>
          <p className="text-[var(--color-text-2)] leading-relaxed">{project.description}</p>
          {project.highlights && (
            <ul className="space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-[var(--color-text-1)]">
                  <span className="mt-1.5 h-1 w-3 shrink-0 rounded-full bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-violet)]" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-black/30 border border-[var(--color-border-soft)] px-2 py-1 font-mono text-[10px] text-[var(--color-text-2)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[260px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[var(--color-border-soft)] overflow-hidden">
          <ProjectVisual seed={project.title} />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-elev)]/60 backdrop-blur p-6 transition",
        "hover:border-[var(--color-border-bright)] hover:-translate-y-1 hover:shadow-[var(--shadow-glow-mixed)]"
      )}
    >
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(0,245,255,0.10), transparent 60%)",
        }}
      />
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
        <span className="text-[var(--color-neon-cyan)]">{project.tag}</span>
        <span className="text-[var(--color-text-2)]">{project.year}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-snug">{project.title}</h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-2)]">
        {project.subtitle}
      </p>
      <p className="mt-4 text-sm text-[var(--color-text-2)] leading-relaxed flex-1">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="rounded-md bg-black/30 border border-[var(--color-border-soft)] px-2 py-1 font-mono text-[10px] text-[var(--color-text-2)]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* Decorative SVG visual unique per project (deterministic seed) */
function ProjectVisual({ seed }: { seed: string }) {
  const hash = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);
  const offset = hash % 360;
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${offset}deg at 60% 40%, rgba(0,245,255,0.25), rgba(181,55,242,0.3), rgba(0,245,255,0.15), rgba(181,55,242,0.25))`,
          filter: "blur(28px)",
          opacity: 0.7,
        }}
      />
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full opacity-70 mix-blend-screen"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`pv-${hash}`} x1="0" x2="1">
            <stop offset="0%" stopColor="var(--color-neon-cyan)" />
            <stop offset="100%" stopColor="var(--color-neon-violet)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 7 }).map((_, i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={40 + i * 22}
            fill="none"
            stroke={`url(#pv-${hash})`}
            strokeWidth="0.6"
            strokeDasharray={i % 2 ? "1 4" : "0"}
            opacity={1 - i * 0.1}
          />
        ))}
        <text
          x="200"
          y="208"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="14"
          fill="var(--color-text-1)"
          opacity="0.6"
        >
          {seed.toUpperCase().slice(0, 3)}
        </text>
      </svg>
      {/* dotted grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
    </div>
  );
}
