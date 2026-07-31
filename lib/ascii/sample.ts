/* Image -> ASCII cell sampling.

   Three things this does beyond the naive "average RGB, index a ramp" version,
   all of which matter for a photographic headshot on a non-transparent background:

   1. Rec. 709 luma rather than a flat (r+g+b)/3 average, so skin tones and hair
      separate the way the eye expects.
   2. Histogram-based auto-levels. A studio headshot occupies a narrow slice of
      the tonal range; without a contrast stretch most cells collapse onto two or
      three adjacent glyphs and the face reads as mush.
   3. A feathered elliptical mask that dissolves the frame edge. The source is a
      JPEG with an opaque grey backdrop, so there is no alpha channel to cull
      against — the mask is what makes the portrait float. */

import { GRID } from "./config";
import type {
  AsciiCell,
  BackgroundKeyOptions,
  MaskOptions,
  SampleOptions,
} from "./types";

/** Rec. 709 relative luminance, normalised to 0–1. */
function luma(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/** Hermite smoothstep. `edge0 > edge1` inverts the ramp. */
function smoothStep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x < edge0 ? 0 : 1;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * Returns 1 inside the solid core of the ellipse, easing to 0 at its boundary.
 * `nx`/`ny` are offsets already normalised by the ellipse radii.
 */
function edgeFalloff(nx: number, ny: number, mask: MaskOptions): number {
  const d = Math.sqrt(nx * nx + ny * ny);
  if (d >= 1) return 0;
  if (d <= mask.featherStart) return 1;

  return 1 - smoothStep(mask.featherStart, 1, d);
}

/**
 * Scores how strongly a pixel belongs to the subject rather than the backdrop.
 * Saturated, very dark, and very bright pixels all qualify; a flat mid-grey
 * does not.
 */
function subjectScore(
  r: number,
  g: number,
  b: number,
  lum: number,
  key: BackgroundKeyOptions,
): number {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const saturation = max > 0.0001 ? (max - min) / max : 0;

  return Math.max(
    smoothStep(key.saturation.from, key.saturation.to, saturation),
    smoothStep(key.shadow.from, key.shadow.to, lum),
    smoothStep(key.highlight.from, key.highlight.to, lum),
  );
}

interface RawSample {
  readonly x: number;
  readonly y: number;
  readonly luma: number;
  /** Combined mask feather and background-key confidence, 0–1. */
  readonly gate: number;
}

const HISTOGRAM_BINS = 256;

/**
 * Finds the luminance range remaining after clipping `clip` of the population
 * from each tail. Returns a null range when the stretch would be degenerate.
 */
function stretchRange(
  histogram: Uint32Array,
  total: number,
  clip: number,
): { lo: number; hi: number } | null {
  if (total === 0 || clip <= 0) return null;

  const cut = Math.floor(total * clip);

  let lo = 0;
  for (let seen = 0, bin = 0; bin < HISTOGRAM_BINS; bin += 1) {
    seen += histogram[bin];
    if (seen > cut) {
      lo = bin;
      break;
    }
  }

  let hi = HISTOGRAM_BINS - 1;
  for (let seen = 0, bin = HISTOGRAM_BINS - 1; bin >= 0; bin -= 1) {
    seen += histogram[bin];
    if (seen > cut) {
      hi = bin;
      break;
    }
  }

  const loNorm = lo / (HISTOGRAM_BINS - 1);
  const hiNorm = hi / (HISTOGRAM_BINS - 1);

  // Too narrow to stretch safely — dividing by this would blow out to pure noise.
  if (hiNorm - loNorm < 0.05) return null;

  return { lo: loNorm, hi: hiNorm };
}

/** Draws the source into a square offscreen canvas using a cover fit. */
function rasterize(
  image: HTMLImageElement,
  options: SampleOptions,
): ImageData {
  const { size, zoom, offsetY } = options;

  const offscreen = document.createElement("canvas");
  offscreen.width = size;
  offscreen.height = size;

  const ctx = offscreen.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("ASCII portrait: 2D canvas context is unavailable.");
  }

  if (!image.naturalWidth || !image.naturalHeight) {
    throw new Error("ASCII portrait: source image has no intrinsic dimensions.");
  }

  const cover = Math.max(size / image.naturalWidth, size / image.naturalHeight);
  const scale = cover * zoom;
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;

  ctx.drawImage(
    image,
    (size - drawWidth) / 2,
    (size - drawHeight) / 2 + offsetY * size,
    drawWidth,
    drawHeight,
  );

  return ctx.getImageData(0, 0, size, size);
}

/**
 * Samples `image` onto a character grid and returns the surviving cells.
 * Pure with respect to its inputs apart from the dissolve jitter on the mask edge.
 *
 * @throws if a 2D context cannot be acquired or the image has not decoded.
 */
export function sampleImage(
  image: HTMLImageElement,
  options: SampleOptions,
): AsciiCell[] {
  const { size, fontSize, ramp, mask, key, alphaThreshold, contrastClip } = options;

  const { data } = rasterize(image, options);

  const columnGap = fontSize * GRID.columnRatio;
  const rowGap = fontSize * GRID.rowRatio;

  const centerX = mask.center.x * size;
  const centerY = mask.center.y * size;
  const radiusX = mask.radius.x * size;
  const radiusY = mask.radius.y * size;

  // Pass 1 — gather surviving samples and build the luminance histogram.
  const raw: RawSample[] = [];
  const histogram = new Uint32Array(HISTOGRAM_BINS);

  for (let y = rowGap / 2; y < size; y += rowGap) {
    const row = Math.floor(y);

    for (let x = columnGap / 2; x < size; x += columnGap) {
      const edge = edgeFalloff((x - centerX) / radiusX, (y - centerY) / radiusY, mask);
      if (edge <= 0) continue;

      const i = (row * size + Math.floor(x)) * 4;
      if (data[i + 3] < alphaThreshold) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const value = luma(r, g, b);

      const subject = key ? subjectScore(r, g, b, value, key) : 1;
      if (key && subject < key.floor) continue;

      // Dissolve the uncertain band — feathered edge and half-keyed pixels alike
      // — into discrete glyphs rather than a soft grey fog.
      const gate = edge * subject;
      if (gate < 1 && Math.random() > gate) continue;

      histogram[Math.min(HISTOGRAM_BINS - 1, Math.round(value * (HISTOGRAM_BINS - 1)))] += 1;
      raw.push({ x, y, luma: value, gate });
    }
  }

  // Pass 2 — apply auto-levels and resolve each sample to a glyph.
  const range = stretchRange(histogram, raw.length, contrastClip);
  const span = range ? range.hi - range.lo : 1;
  const lastGlyph = ramp.length - 1;

  const cells: AsciiCell[] = [];

  for (const sample of raw) {
    const level = range
      ? clamp01((sample.luma - range.lo) / span)
      : clamp01(sample.luma);

    const char = ramp[Math.min(lastGlyph, Math.max(0, Math.round(level * lastGlyph)))];

    // The sparse end of the ramp is a space, which paints nothing. Keeping those
    // would cost a particle and a fillText every frame for zero pixels.
    if (char === " ") continue;

    // Gated cells keep more of their brightness than a linear fade would give
    // them, so the boundary dissolves into sparse glyphs rather than grey haze.
    cells.push({
      x: sample.x,
      y: sample.y,
      char,
      level,
      alpha: (0.35 + level * 0.65) * Math.sqrt(sample.gate),
    });
  }

  return cells;
}
