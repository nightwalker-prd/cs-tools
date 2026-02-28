import type { Stroke } from '@/types';
import { renderAllStrokes } from './renderer';

const THUMB_W = 150;
const THUMB_H = 200;

/** Generate a small PNG thumbnail from strokes */
export function generateThumbnail(
  strokes: Stroke[],
  canvasWidth: number,
  canvasHeight: number,
): string | undefined {
  if (strokes.length === 0) return undefined;

  const offscreen = document.createElement('canvas');
  offscreen.width = THUMB_W;
  offscreen.height = THUMB_H;
  const ctx = offscreen.getContext('2d');
  if (!ctx) return undefined;

  // Scale strokes to fit thumbnail
  const scaleX = THUMB_W / canvasWidth;
  const scaleY = THUMB_H / canvasHeight;
  const scale = Math.min(scaleX, scaleY);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, THUMB_W, THUMB_H);

  ctx.save();
  ctx.scale(scale, scale);
  renderAllStrokes(ctx, strokes, canvasWidth, canvasHeight);
  ctx.restore();

  return offscreen.toDataURL('image/png', 0.6);
}
