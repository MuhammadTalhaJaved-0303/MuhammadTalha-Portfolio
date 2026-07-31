import type { BackgroundKeyOptions, MaskOptions, SampleOptions } from "./types";

/** Classic ASCII luminance ramp, sparse -> dense. */
export const DENSITY_RAMP = " .:-=+*#%@";

/** Higher-fidelity ramp; more tonal steps, reads better at larger glyph sizes. */
export const DENSITY_RAMP_FINE = " .'^\",:;!~+?][}{1)(|\\/tfjrxnuvczmwqpdbkhao*#MW&8%B@$";

export const DEFAULT_MASK: MaskOptions = {
  center: { x: 0.5, y: 0.47 },
  radius: { x: 0.46, y: 0.49 },
  featherStart: 0.64,
};

/* Tuned against public/profile.jpg by rendering the sampler's output to a
   terminal and eyeballing the silhouette. Without the key, the grey backdrop
   maps onto the dense end of the ramp and wraps the portrait in a halo of
   `#` and `*`; with it, roughly 45% of cells drop and the subject reads clean. */
export const DEFAULT_KEY: BackgroundKeyOptions = {
  saturation: { from: 0.09, to: 0.21 },
  shadow: { from: 0.34, to: 0.2 },
  highlight: { from: 0.78, to: 0.92 },
  floor: 0.3,
};

export const DEFAULT_SAMPLE: Omit<SampleOptions, "size" | "fontSize"> = {
  ramp: DENSITY_RAMP,
  mask: DEFAULT_MASK,
  key: DEFAULT_KEY,
  contrastClip: 0.02,
  alphaThreshold: 24,
  zoom: 1.04,
  offsetY: -0.02,
};

/** Glyph cell aspect ratio — monospace cells are roughly 0.6 as wide as they are tall. */
export const GRID = {
  columnRatio: 0.7,
  rowRatio: 1.1,
} as const;

/** Portrait square size in CSS pixels, clamped to its container. */
export const SIZE = {
  min: 200,
  max: 420,
  /** Resize steps, so dragging a window doesn't re-sample on every pixel. */
  quantum: 20,
} as const;

export const FONT_SIZE = {
  /** Applied below `SIZE.mobileBreakpoint` to keep the particle count sane on phones. */
  small: 5,
  large: 7,
  mobileBreakpoint: 300,
} as const;

/** Tuning for the particle simulation. All durations in seconds, forces in px/frame². */
export const PHYSICS = {
  /** How far particles scatter from their target on spawn, in px. */
  scatter: 380,
  /** Longest random stagger before a particle starts animating. */
  maxDelay: 0.4,
  fadeIn: 1.5,
  settle: 2.5,
  /** Idle drift and shimmer run for this long after load, then stop until hover. */
  introActive: 3,
  /** Particles hard-snap to their target after this long, once at rest. */
  snapAfter: 4,
  snapEpsilon: 0.01,
  /** Spring pull toward target: ramps from `pullBase` to `pullBase + pullGain`. */
  pullBase: 0.01,
  pullGain: 0.08,
  damping: 0.92,
  dampingSettle: 0.85,
  /** Cursor repulsion radius as a fraction of the portrait size. */
  repelRadius: 0.2,
  repelForce: 4,
  breathAmplitude: 0.15,
  breathSpeed: 0.5,
  shimmerAmplitude: 0.1,
  shimmerSpeed: 2,
  /** Easing applied to the pointer position itself, so repulsion feels weighted. */
  pointerEase: 0.15,
  /** Below this the glyph is invisible; skip the fillText entirely. */
  alphaCutoff: 0.012,
} as const;

/** When to stop the render loop entirely because the portrait has come to rest. */
export const IDLE = {
  /** Per-particle speed (px/frame) below which a particle counts as still. */
  velocity: 0.02,
  /** Consecutive still frames required before the loop parks itself. */
  frames: 30,
} as const;

/** Retina is worth it; 3x on a phone is not — the fill rate cost outweighs the gain. */
export const MAX_DEVICE_PIXEL_RATIO = 2;
