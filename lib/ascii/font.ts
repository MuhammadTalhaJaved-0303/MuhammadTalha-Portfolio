/**
 * Resolves the monospace stack for `CanvasRenderingContext2D.font`.
 *
 * The canvas font shorthand is parsed as CSS but *not* resolved against custom
 * properties — assigning `"7px var(--font-jetbrains-mono)"` fails to parse and
 * is silently dropped, leaving the default 10px sans-serif. So read the
 * computed value of the Next font variable and inline it.
 */
export function monoFontStack(element: Element): string {
  const fallback = "ui-monospace, SFMono-Regular, Menlo, monospace";

  const resolved = getComputedStyle(element)
    .getPropertyValue("--font-jetbrains-mono")
    .trim();

  return resolved ? `${resolved}, ${fallback}` : fallback;
}
