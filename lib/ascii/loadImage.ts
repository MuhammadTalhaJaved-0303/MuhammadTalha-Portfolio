/* Decoded-image cache. Keyed by src so remounts and breakpoint changes reuse a
   single decode instead of re-fetching. */

const pending = new Map<string, Promise<HTMLImageElement>>();

/**
 * Loads and decodes an image for canvas sampling.
 *
 * @throws if the image fails to load, so callers can render a fallback rather
 *         than sitting on a blank canvas forever.
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = pending.get(src);
  if (cached) return cached;

  const request = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    // Same-origin assets under /public don't taint the canvas, but setting this
    // keeps getImageData working if the portrait is ever moved to a CDN.
    image.crossOrigin = "anonymous";
    image.decoding = "async";

    image.onload = () => resolve(image);
    image.onerror = () => {
      // Drop the rejected promise so a later mount can retry.
      pending.delete(src);
      reject(new Error(`ASCII portrait: failed to load image "${src}".`));
    };

    image.src = src;
  });

  pending.set(src, request);
  return request;
}
