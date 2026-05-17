# Portfolio Revamp — Premium Edition

**Date:** 2026-05-16
**Owner:** Muhammad Talha Javed
**Status:** In progress

## Goals

Revamp the existing single-page portfolio (vanilla HTML/CSS/JS) into a premium Next.js site with:
- Cinematic video background in the hero
- Bento-grid "About me" mosaic with Lottie animations
- Dark cinematic + neon visual identity
- Smooth scroll motion throughout

## Stack

- **Next.js 15** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — design tokens via CSS vars
- **Framer Motion** — component motion, scroll reveals, hover, layout transitions
- **GSAP + ScrollTrigger** — hero text reveal, section pinning
- **lottie-react** — Lottie playback (lazy, off-screen pause)
- **next/font** — Geist Sans + JetBrains Mono
- **Vercel** — deployment

## Visual System

### Tokens
```
--bg-base:     #08080c
--bg-elev:     #13131f
--bg-glass:    rgba(20, 20, 32, 0.55) + backdrop-blur
--border:      rgba(255, 255, 255, 0.08)
--text-1:      #f0f0ff
--text-2:      #8b8b9e
--neon-cyan:   #00f5ff
--neon-violet: #b537f2
--neon-glow:   0 0 24px rgba(0,245,255,.35), 0 0 48px rgba(181,55,242,.18)
```

Cyan is the protagonist (CTAs, focus, active state). Violet supports as ambient glow. One bold accent — no rainbow trap.

### Typography
- Display: Geist Sans 700, tight tracking, gradient-fill on key words
- Body: Geist Sans 400, 1.6 line-height
- Mono: JetBrains Mono — section numbers, labels, code

## Page Structure

1. **Hero** — full-bleed video bg, animated title (character-by-character via GSAP), neon CTA, floating tags
2. **Bento Grid (About-me mosaic)** — the showpiece
3. **Projects** — premium asymmetric cards, hover reveals, image parallax
4. **Experience** — vertical neon timeline
5. **Skills** — animated marquee + tag cluster
6. **Contact** — premium glass card + CTA

## Hero Details

- Background: looped MP4 + WebM stock video (AI/neural mesh, abstract particles) from Pexels/Coverr
- Autoplay, muted, playsinline, poster fallback
- Dark gradient overlay for legibility (`linear-gradient(180deg, rgba(8,8,12,.4) 0%, rgba(8,8,12,.85) 100%)`)
- Title: name reveals character-by-character with subtle blur-to-clear motion
- CTA: pill button with cyan glow + hover scale
- Floating tags from current site, repurposed with subtle neon outline + ambient float animation
- Scroll cue at bottom (animated chevron + "scroll" mono label)

## Bento Grid (About-me Mosaic)

8 tiles in a 4-col responsive grid (collapses to 1-col mobile, 2-col tablet):

| Tile | Span | Content | Lottie |
|------|------|---------|--------|
| **About** (lead tile) | 2×2 | Photo + name + 2-line bio + tagline | Subtle animated grain/glow |
| **Live Clock** | 1×1 | "Lahore" + real-time HH:MM:SS, day | Animated clock face |
| **Tech Stack** | 2×1 | Icon row: Python, PyTorch, TF, FastAPI, etc. | Pulse/dot animation |
| **Currently Learning** | 1×1 | "RAG systems & LangGraph" | Book/code animation |
| **GitHub** | 1×1 | Static-but-real numbers (commits, repos) | Pulse animation |
| **Now Playing** | 1×1 | "Lofi Coding Vol. 4" — static playlist | Waveform animation |
| **Quote / Fun Fact** | 2×1 | Typewriter-style favourite quote | Typewriter Lottie |
| **Certifications** | 1×1 | Count + featured cert name | Ribbon/badge animation |

Each tile:
- `bg-glass` surface with `border-border` 1px outline
- Hover: subtle scale (1.02), border brightens, mouse-parallax tilt (max 5°)
- Lottie loads via Intersection Observer (only when in viewport)
- All Lotties looped, paused when off-screen

## Motion Strategy

- **Framer Motion** for component-level: `whileInView` scroll reveals, hover/tap, layout
- **GSAP ScrollTrigger** for hero title sequence and section pinning where needed
- **Lottie** for the bento tile decorations
- **`prefers-reduced-motion`** respected — disables video autoplay, removes parallax, keeps content readable

## Data Strategy

- Static content for everything except clock
- Clock: real-time client-side (`new Date()`, formatted to Asia/Karachi via `Intl.DateTimeFormat`)
- Profile data lives in `lib/data.ts` as typed constants — single source of truth for projects, experience, skills

## Migration Plan

- ✅ Legacy files moved to `legacy/` (preserved, not deleted)
- ⏳ Next.js scaffolded into `portfolio-site/`, then contents moved up
- ⏳ `profile.jpg` copied from `legacy/` into `public/`
- ⏳ Vercel deploys from `main`; preview branches for major changes

## Out of Scope (YAGNI)

- CMS / headless content (static data is faster, simpler)
- Blog (not requested)
- Multi-language i18n (single-locale)
- Spotify OAuth integration (static now-playing is sufficient)
- Live GitHub API (static numbers, refreshed manually)

## Open Decisions Made Inline (Reversible)

- Section order: kept from existing site (About merged into bento, then Projects → Experience → Skills → Contact)
- Profile photo reused from legacy
- Project content carried over from legacy unless user updates it
