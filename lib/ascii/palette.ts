/* Duotone palette + a memoised fillStyle cache for the portrait.

   Shadows read sage, midtones champagne, highlights bright gold — the same
   three tokens the rest of the site uses, so the portrait sits inside the
   theme instead of next to it. */

interface Rgb {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

/** --color-sage */
const SHADOW: Rgb = { r: 143, g: 181, b: 164 };
/** --color-gold */
const MID: Rgb = { r: 212, g: 175, b: 110 };
/** --color-gold-bright */
const HIGHLIGHT: Rgb = { r: 236, g: 217, b: 168 };

/** Number of quantised colour steps across the ramp. */
export const COLOR_BUCKETS = 24;

/** Number of quantised alpha steps. */
const ALPHA_STEPS = 40;

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

/** Maps a 0–1 luminance level onto the three-stop duotone gradient. */
export function duotone(level: number): Rgb {
  const t = Math.min(1, Math.max(0, level));
  return t < 0.5 ? mix(SHADOW, MID, t * 2) : mix(MID, HIGHLIGHT, (t - 0.5) * 2);
}

export function toColorBucket(level: number): number {
  const i = Math.round(level * (COLOR_BUCKETS - 1));
  return Math.min(COLOR_BUCKETS - 1, Math.max(0, i));
}

/*
 * A 4,000-particle portrait at 60fps builds 240k fillStyle strings per second
 * if you interpolate naively. Quantising colour and alpha caps the set at
 * COLOR_BUCKETS × (ALPHA_STEPS + 1) distinct strings, each built once.
 */
const styleCache: Array<string | undefined> = new Array(
  COLOR_BUCKETS * (ALPHA_STEPS + 1),
);

/** Returns a cached `rgba(...)` string for a quantised colour bucket and alpha. */
export function fillStyleFor(colorBucket: number, alpha: number): string {
  const step = Math.min(ALPHA_STEPS, Math.max(0, Math.round(alpha * ALPHA_STEPS)));
  const key = colorBucket * (ALPHA_STEPS + 1) + step;

  const cached = styleCache[key];
  if (cached !== undefined) return cached;

  const { r, g, b } = duotone(colorBucket / (COLOR_BUCKETS - 1));
  const built = `rgba(${r},${g},${b},${(step / ALPHA_STEPS).toFixed(3)})`;
  styleCache[key] = built;
  return built;
}
