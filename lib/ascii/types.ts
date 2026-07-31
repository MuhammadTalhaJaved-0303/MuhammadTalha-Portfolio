/* Shared types for the ASCII portrait pipeline.
   Pipeline: source image -> AsciiCell[] (sampling) -> AsciiParticle[] (physics) -> canvas. */

/** A single character cell sampled from the source image. Immutable once produced. */
export interface AsciiCell {
  /** Resting x position, in CSS pixels relative to the portrait square. */
  readonly x: number;
  /** Resting y position, in CSS pixels relative to the portrait square. */
  readonly y: number;
  /** Glyph chosen from the density ramp. */
  readonly char: string;
  /** Contrast-stretched luminance, 0–1. Drives glyph choice and colour. */
  readonly level: number;
  /** Resting opacity, 0–1 (luminance blended with the edge feather). */
  readonly alpha: number;
}

/** Elliptical crop applied to the source image, as fractions of the square's size. */
export interface MaskOptions {
  /** Ellipse centre. `{ x: 0.5, y: 0.5 }` is dead centre. */
  readonly center: { readonly x: number; readonly y: number };
  /** Ellipse half-width and half-height. */
  readonly radius: { readonly x: number; readonly y: number };
  /**
   * Where the feather begins, as a fraction of the radius (0–1).
   * Cells past this point dissolve probabilistically for an organic edge.
   */
  readonly featherStart: number;
}

/** An inclusive range used as smoothstep edges. `from` may exceed `to` to invert. */
export interface Range {
  readonly from: number;
  readonly to: number;
}

/**
 * Separates the subject from a flat studio backdrop when the source image has
 * no alpha channel to cull against.
 *
 * The backdrop in `profile.jpg` is a near-neutral mid-grey, while every part of
 * the subject is either saturated (skin, cardigan), very dark (hair), or very
 * bright (collar). Scoring each of those and taking the strongest gives a clean
 * matte without needing a pre-cut PNG.
 */
export interface BackgroundKeyOptions {
  /** Saturation range over which a pixel is accepted as subject. */
  readonly saturation: Range;
  /** Luminance range accepting *dark* pixels; `from` is above `to`. */
  readonly shadow: Range;
  /** Luminance range accepting *bright* pixels. */
  readonly highlight: Range;
  /** Cells scoring below this are dropped outright. */
  readonly floor: number;
}

export interface SampleOptions {
  /** Width and height of the square sampling canvas, in CSS pixels. */
  readonly size: number;
  /** Rendered glyph size, in CSS pixels. Determines the sampling grid density. */
  readonly fontSize: number;
  /** Density ramp, ordered sparse -> dense. */
  readonly ramp: string;
  readonly mask: MaskOptions;
  /** Backdrop matte for opaque sources. `null` relies on the alpha channel alone. */
  readonly key: BackgroundKeyOptions | null;
  /**
   * Fraction of pixels clipped at each end of the histogram before the
   * contrast stretch. 0 disables auto-levels.
   */
  readonly contrastClip: number;
  /** Source pixels below this alpha (0–255) are skipped, for PNG cut-outs. */
  readonly alphaThreshold: number;
  /** Scale multiplier applied on top of a cover-fit. 1 = exact cover. */
  readonly zoom: number;
  /** Vertical framing nudge as a fraction of `size`. Negative moves the image up. */
  readonly offsetY: number;
}

/**
 * A live particle. Unlike `AsciiCell` these are mutated in place every frame:
 * a portrait is 2,000–4,000 particles at 60fps, so allocating replacements
 * would churn ~200k objects/second through the GC and visibly stutter the hero.
 * Mutation is contained entirely within the animation loop — nothing outside
 * `stepParticle` ever writes to one.
 */
export interface AsciiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  readonly targetX: number;
  readonly targetY: number;
  readonly char: string;
  /** Quantised colour index into the duotone palette cache. */
  readonly colorBucket: number;
  /** Resting opacity from the source cell. */
  readonly baseAlpha: number;
  /** Opacity for the current frame. */
  alpha: number;
  /** Per-particle stagger before it starts animating, in seconds. */
  readonly delay: number;
  /** Random phase offset so shimmer and drift never sync up across particles. */
  readonly phase: number;
}

export interface PointerState {
  x: number;
  y: number;
  active: boolean;
}
