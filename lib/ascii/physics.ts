/* Particle simulation for the ASCII portrait.

   Each glyph is a damped spring anchored to its resting position. Layered on
   top: a staggered fade-in, an inverse-distance cursor repulsion field, a slow
   positional "breathing" drift, and an alpha shimmer. Particles are mutated in
   place — see the note on `AsciiParticle` for why. */

import { PHYSICS } from "./config";
import { toColorBucket } from "./palette";
import type { AsciiCell, AsciiParticle, PointerState } from "./types";

/** Quadratic ease-out. */
function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/** Cubic ease-out. */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) * (1 - t) * (1 - t);
}

/**
 * Builds the live particle set from sampled cells. Particles spawn scattered
 * around their target so the portrait assembles itself on first paint.
 */
export function createParticles(
  cells: readonly AsciiCell[],
  animated: boolean,
): AsciiParticle[] {
  return cells.map((cell) => {
    const scatter = animated ? PHYSICS.scatter : 0;

    return {
      x: cell.x + (Math.random() - 0.5) * scatter,
      y: cell.y + (Math.random() - 0.5) * scatter,
      vx: 0,
      vy: 0,
      targetX: cell.x,
      targetY: cell.y,
      char: cell.char,
      colorBucket: toColorBucket(cell.level),
      baseAlpha: cell.alpha,
      alpha: animated ? 0 : cell.alpha,
      delay: animated ? Math.random() * PHYSICS.maxDelay : 0,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

export interface StepContext {
  /** Seconds since the animation started. */
  readonly elapsed: number;
  /** Eased pointer position in portrait-local pixels. */
  readonly pointer: PointerState;
  /** Portrait square size in CSS pixels; scales the repulsion radius. */
  readonly size: number;
}

/**
 * Advances one particle by a frame. Returns `false` when the particle has not
 * yet passed its stagger delay and should be skipped for this frame.
 */
export function stepParticle(p: AsciiParticle, ctx: StepContext): boolean {
  const t = ctx.elapsed - p.delay;
  if (t < 0) return false;

  // Drift and shimmer run during the intro, then only while the cursor is over
  // the portrait — a hero that never stops moving is a hero that never stops
  // burning battery.
  const lively = ctx.pointer.active || t < PHYSICS.introActive;

  const fade = easeOutQuad(Math.min(t / PHYSICS.fadeIn, 1));
  const shimmer = lively
    ? Math.sin(ctx.elapsed * PHYSICS.shimmerSpeed + p.phase) * PHYSICS.shimmerAmplitude
    : 0;
  p.alpha = Math.max(0, p.baseAlpha * fade + shimmer);

  if (ctx.pointer.active) {
    const dx = p.x - ctx.pointer.x;
    const dy = p.y - ctx.pointer.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const reach = ctx.size * PHYSICS.repelRadius;

    if (distance > 0 && distance < reach) {
      const force = (1 - distance / reach) * PHYSICS.repelForce;
      p.vx += (dx / distance) * force;
      p.vy += (dy / distance) * force;
    }
  }

  // Spring back home, tightening as the intro settles.
  const settle = easeOutCubic(Math.min(t / PHYSICS.settle, 1));
  const pull = PHYSICS.pullBase + settle * PHYSICS.pullGain;
  const toTargetX = p.targetX - p.x;
  const toTargetY = p.targetY - p.y;

  p.vx += toTargetX * pull;
  p.vy += toTargetY * pull;

  if (lively) {
    p.vx += Math.sin(ctx.elapsed * PHYSICS.breathSpeed + p.targetY * 0.1) * PHYSICS.breathAmplitude;
    p.vy += Math.cos(ctx.elapsed * PHYSICS.breathSpeed + p.targetX * 0.1) * PHYSICS.breathAmplitude;
    p.vx *= PHYSICS.damping;
    p.vy *= PHYSICS.damping;
  } else {
    p.vx *= PHYSICS.dampingSettle;
    p.vy *= PHYSICS.dampingSettle;

    const atRest =
      Math.abs(toTargetX) < PHYSICS.snapEpsilon && Math.abs(toTargetY) < PHYSICS.snapEpsilon;

    if (t > PHYSICS.snapAfter && atRest) {
      p.x = p.targetX;
      p.y = p.targetY;
      p.vx = 0;
      p.vy = 0;
      return true;
    }
  }

  p.x += p.vx;
  p.y += p.vy;
  return true;
}

/** Places every particle at its resting position — used for reduced-motion. */
export function settleParticles(particles: AsciiParticle[]): void {
  for (const p of particles) {
    p.x = p.targetX;
    p.y = p.targetY;
    p.vx = 0;
    p.vy = 0;
    p.alpha = p.baseAlpha;
  }
}
