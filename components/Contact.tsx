"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="aurora opacity-50" />
      <div className="mx-auto w-full max-w-5xl px-5 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-bg-elev)]/60 backdrop-blur-xl p-10 sm:p-16"
        >
          <div
            className="absolute inset-0 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(70% 90% at 100% 0%, rgba(0,245,255,0.18), transparent 60%), radial-gradient(70% 90% at 0% 100%, rgba(181,55,242,0.18), transparent 60%)",
            }}
          />
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-neon-cyan)]">
                /05 — contact
              </p>
              <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
                Let&apos;s build <br />
                something
                <span className="text-gradient-neon">.</span>
              </h2>
              <p className="mt-5 max-w-md text-[var(--color-text-2)] leading-relaxed">
                Currently seeking opportunities in AI and Data Science. Open to
                research collabs, contract work, and full-time roles.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--color-neon-cyan)] px-6 py-3 text-sm font-medium text-black shadow-[var(--shadow-glow-cyan)] hover:scale-[1.03] transition-transform"
              >
                {profile.email}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <div className="grid gap-3">
              {[
                { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: "✉" },
                { label: "WhatsApp", value: "+92 370 1422152", href: profile.socials[2].href, icon: "💬" },
                { label: "LinkedIn", value: "muhammad-talha-javed", href: profile.socials[1].href, icon: "in" },
                { label: "GitHub", value: "MuhammadTalhaJaved-0303", href: profile.socials[0].href, icon: "</>" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[var(--color-border-soft)] bg-black/30 px-5 py-4 hover:border-[var(--color-neon-cyan)]/40 hover:shadow-[0_0_24px_rgba(0,245,255,0.15)] transition"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-elev)] font-mono text-xs text-[var(--color-neon-cyan)]">
                    {c.icon}
                  </span>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-2)]">
                      {c.label}
                    </p>
                    <p className="text-sm text-[var(--color-text-1)] truncate">{c.value}</p>
                  </div>
                  <span className="text-[var(--color-text-2)] group-hover:text-[var(--color-neon-cyan)] transition">→</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
