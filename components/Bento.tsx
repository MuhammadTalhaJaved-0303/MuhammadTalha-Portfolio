"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { profile, techStack, education } from "@/lib/data";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

export function Bento() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg radial-fade opacity-30 -z-10" />
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading num="/01" title="The shape of me" kicker="about" />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-3 sm:gap-4"
          style={{ gridAutoFlow: "dense" }}
        >
          <AboutTile />
          <ClockTile />
          <LearningTile />
          <StackTile />
          <GithubTile />
          <NowPlayingTile />
          <CertTile />
          <QuoteTile />
        </div>
      </div>
    </section>
  );
}

/* -------- Tile shell + reveal -------- */
interface TileProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

function Tile({ className, children, delay = 0 }: TileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -6;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-2px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay }}
      className={cn("contents")}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onLeave}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-elev)]/60 backdrop-blur transition-[border-color,transform,box-shadow] duration-300 will-change-transform",
          "hover:border-[var(--color-border-bright)] hover:shadow-[var(--shadow-glow-mixed)]",
          className
        )}
      >
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(60% 80% at 20% 0%, rgba(212,175,110,0.10), transparent 60%), radial-gradient(60% 80% at 90% 100%, rgba(143,181,164,0.10), transparent 60%)",
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}

function TileLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-4 left-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-2)]">
      <span className="h-1 w-1 rounded-full bg-[var(--color-gold)]" />
      {children}
    </div>
  );
}

/* -------- 1. About lead tile (2x2) -------- */
function AboutTile() {
  return (
    <Tile className="sm:col-span-2 sm:row-span-2 min-h-[360px] sm:min-h-[420px]" delay={0}>
      <div className="relative flex h-full flex-col justify-between p-6">
        <TileLabel>about</TileLabel>
        <div className="flex items-end gap-4 pt-12">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--color-border-soft)]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from 200deg, var(--color-gold), var(--color-sage), var(--color-gold))",
                filter: "blur(8px)",
                opacity: 0.7,
              }}
            />
            <div className="absolute inset-[3px] overflow-hidden rounded-full bg-[var(--color-bg-base)]">
              {/* Stable initials backplate */}
              <span className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-gradient-gold select-none">
                {profile.initials}
              </span>
              {/* Photo on top, hides on error */}
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
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-2)]">
              {profile.role}
            </p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
              {profile.name}
            </h3>
          </div>
        </div>

        <p className="mt-6 text-[var(--color-text-2)] leading-relaxed text-sm sm:text-base">
          {profile.bio}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 pt-4 border-t border-[var(--color-border-soft)]">
          {[
            ["CGPA", profile.stats.cgpa],
            ["Projects", profile.stats.projects],
            ["Certs", profile.stats.certifications],
          ].map(([label, v]) => (
            <div key={label}>
              <div className="text-2xl font-semibold text-gradient-gold">{v}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-2)] mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Decorative orbit lines */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 opacity-30"
          viewBox="0 0 200 200"
        >
          <defs>
            <linearGradient id="orbit-grad" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--color-gold)" />
              <stop offset="100%" stopColor="var(--color-sage)" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="none" stroke="url(#orbit-grad)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="url(#orbit-grad)" strokeWidth="0.5" strokeDasharray="2 3" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="url(#orbit-grad)" strokeWidth="0.5" />
        </svg>
      </div>
    </Tile>
  );
}

/* -------- 2. Live Clock -------- */
function ClockTile() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    now ? new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, ...opts }).format(now) : "--";

  const time = fmt({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const day = fmt({ weekday: "long" });
  const date = fmt({ day: "2-digit", month: "short", year: "numeric" });

  // Clock hand angle (minute precision for the visual)
  const minutes = now ? now.getMinutes() + now.getSeconds() / 60 : 0;
  const hours = now ? (now.getHours() % 12) + minutes / 60 : 0;

  return (
    <Tile delay={0.05}>
      <div className="relative flex h-full flex-col justify-between p-5">
        <TileLabel>local time</TileLabel>
        <div className="absolute top-3 right-3">
          <ClockSVG hours={hours} minutes={minutes} />
        </div>
        <div className="mt-auto">
          <div className="font-mono text-3xl tracking-tight text-[var(--color-text-1)]">{time}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-2)]">
            {day} · {date}
          </div>
          <div className="mt-2 text-sm text-[var(--color-gold)]">📍 {profile.location}</div>
        </div>
      </div>
    </Tile>
  );
}

function ClockSVG({ hours, minutes }: { hours: number; minutes: number }) {
  return (
    <svg viewBox="0 0 60 60" className="h-14 w-14 text-[var(--color-gold)]" fill="none">
      <circle cx="30" cy="30" r="26" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
      <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.5" />
      <g transform={`rotate(${hours * 30} 30 30)`}>
        <line x1="30" y1="30" x2="30" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform={`rotate(${minutes * 6} 30 30)`}>
        <line x1="30" y1="30" x2="30" y2="10" stroke="var(--color-sage)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <circle cx="30" cy="30" r="2" fill="currentColor" />
    </svg>
  );
}

/* -------- 3. Currently Learning -------- */
function LearningTile() {
  return (
    <Tile delay={0.1}>
      <div className="relative flex h-full flex-col justify-between p-5">
        <TileLabel>learning</TileLabel>
        <BookAnim />
        {/* mt-auto keeps this pinned to the bottom — the label and book
            graphic are absolutely positioned at the top of the tile */}
        <div className="mt-auto pt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-2)]">
            currently studying
          </p>
          <h4 className="mt-1 text-lg font-semibold leading-snug">
            {profile.currentlyLearning}
          </h4>
        </div>
      </div>
    </Tile>
  );
}

function BookAnim() {
  return (
    <svg viewBox="0 0 80 60" className="absolute right-4 top-3 h-16 w-20" fill="none">
      <defs>
        <linearGradient id="book-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--color-gold)" />
          <stop offset="100%" stopColor="var(--color-sage)" />
        </linearGradient>
      </defs>
      <rect x="14" y="14" width="50" height="34" rx="2" stroke="url(#book-grad)" strokeWidth="1.2" opacity="0.7" />
      <line x1="39" y1="14" x2="39" y2="48" stroke="url(#book-grad)" strokeWidth="0.8" opacity="0.6" />
      {[20, 24, 28].map((y, i) => (
        <line key={`l${y}`} x1="18" y1={y} x2="35" y2={y} stroke="var(--color-text-2)" strokeWidth="0.6">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}
      {[20, 24, 28].map((y, i) => (
        <line key={`r${y}`} x1="43" y1={y} x2="60" y2={y} stroke="var(--color-text-2)" strokeWidth="0.6">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  );
}

/* -------- 4. Tech Stack (2 col) -------- */
function StackTile() {
  return (
    <Tile className="sm:col-span-2" delay={0.15}>
      <div className="relative flex h-full flex-col justify-between p-5 min-h-[180px]">
        <TileLabel>tech stack</TileLabel>
        <div className="absolute right-4 top-3 flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]"
              style={{ animation: `pulse-glow 1.6s ease-in-out ${i * 0.25}s infinite` }}
            />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-base)]/40 px-3 py-1.5 font-mono text-xs text-[var(--color-text-1)] hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)] transition"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Tile>
  );
}

/* -------- 5. GitHub -------- */
function GithubTile() {
  return (
    <Tile delay={0.2}>
      <a
        href={profile.socials[0].href}
        target="_blank"
        rel="noreferrer"
        className="relative block h-full p-5"
      >
        <TileLabel>github</TileLabel>
        <GithubGraph />
        <div className="mt-12">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-gradient-gold">{profile.stats.githubCommits}</span>
            <span className="text-xs text-[var(--color-text-2)]">commits</span>
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-2)]">
            {profile.stats.githubRepos} repos
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--color-text-1)] group-hover:text-[var(--color-gold)] transition">
            View profile →
          </div>
        </div>
      </a>
    </Tile>
  );
}

// Deterministic activity pattern — keeps SSR + client in sync (no hydration mismatch).
const GH_PATTERN = [
  3, 1, 2, 0, 3, 2, 1, 3, 0, 2, 3, 1, 0, 2,
  1, 3, 0, 2, 3, 1, 2, 0, 3, 2, 1, 0, 2, 3,
] as const;

function GithubGraph() {
  return (
    <svg viewBox="0 0 80 30" className="absolute right-3 top-3 h-12 w-24" fill="none">
      {GH_PATTERN.map((level, i) => {
        const fill =
          level === 3
            ? "var(--color-gold)"
            : level === 2
            ? "rgba(212,175,110,0.5)"
            : level === 1
            ? "rgba(212,175,110,0.22)"
            : "rgba(237,233,223,0.08)";
        return (
          <rect
            key={i}
            x={(i % 14) * 5}
            y={Math.floor(i / 14) * 5}
            width="3.5"
            height="3.5"
            rx="0.6"
            fill={fill}
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${1 + (i % 4) * 0.4}s`}
              begin={`${(i % 8) * 0.12}s`}
              repeatCount="indefinite"
            />
          </rect>
        );
      })}
    </svg>
  );
}

/* -------- 6. Now Playing -------- */
function NowPlayingTile() {
  return (
    <Tile delay={0.25}>
      <div className="relative flex h-full flex-col justify-between p-5">
        <TileLabel>now playing</TileLabel>
        <Waveform />
        <div className="mt-auto">
          <p className="text-sm font-medium text-[var(--color-text-1)] truncate">
            {profile.nowPlaying.title}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-2)] mt-1 truncate">
            {profile.nowPlaying.artist}
          </p>
        </div>
      </div>
    </Tile>
  );
}

function Waveform() {
  const bars = 22;
  return (
    <div className="absolute right-4 top-3 flex h-12 items-end gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="block w-[3px] rounded-full bg-gradient-to-t from-[var(--color-gold)] to-[var(--color-sage)]"
          style={{
            height: `${20 + Math.sin(i * 0.8) * 20 + 20}%`,
            animation: `float-y ${0.6 + (i % 5) * 0.18}s ease-in-out ${i * 0.04}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* -------- 7. Quote / Fun Fact (full-width banner) -------- */
function QuoteTile() {
  return (
    <Tile className="sm:col-span-2 lg:col-span-4" delay={0.3}>
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 min-h-[180px]">
        <TileLabel>fun fact</TileLabel>
        <div className="absolute right-5 top-4 font-serif text-5xl leading-none text-[var(--color-sage)]/40">&ldquo;</div>
        <div className="mt-12">
          <p className="text-lg sm:text-xl font-medium leading-snug text-[var(--color-text-1)]">
            {profile.funFact}
          </p>
          <Typecursor />
        </div>
      </div>
    </Tile>
  );
}

function Typecursor() {
  return (
    <span className="ml-1 inline-block h-5 w-[2px] align-middle bg-[var(--color-gold)] animate-pulse" />
  );
}

/* -------- 8. Certifications -------- */
function CertTile() {
  const featured = education.find((e) => e.icon === "cert");
  return (
    <Tile delay={0.35}>
      <div className="relative flex h-full flex-col justify-between p-5">
        <TileLabel>certifications</TileLabel>
        <RibbonAnim />
        <div className="mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-gradient-gold">{profile.stats.certifications}</span>
            <span className="text-xs text-[var(--color-text-2)]">earned</span>
          </div>
          {featured && (
            <p className="mt-1 text-xs text-[var(--color-text-1)] truncate">
              {featured.title}
            </p>
          )}
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-2)] mt-1 truncate">
            {featured?.org}
          </p>
        </div>
      </div>
    </Tile>
  );
}

function RibbonAnim() {
  return (
    <svg viewBox="0 0 48 60" className="absolute right-3 top-3 h-16 w-12" fill="none">
      <defs>
        <linearGradient id="rib" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gold)" />
          <stop offset="100%" stopColor="var(--color-sage)" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="20" r="13" stroke="url(#rib)" strokeWidth="1.5">
        <animate attributeName="r" values="13;14;13" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="24" cy="20" r="7" stroke="url(#rib)" strokeWidth="1" opacity="0.6" />
      <path d="M18 30 L14 50 L24 44 L34 50 L30 30" stroke="url(#rib)" strokeWidth="1.2" strokeLinejoin="round" />
      <text x="24" y="24" textAnchor="middle" fontSize="9" fill="var(--color-gold)" fontFamily="monospace">★</text>
    </svg>
  );
}
