import getStroke from 'perfect-freehand';
import type { StrokeOptions } from 'perfect-freehand';
import type { Stroke } from '@/types';
import { getPenPreset } from './pen-presets';

/** Convert flat [x,y,p, x,y,p, ...] array to [[x,y,p], ...] for perfect-freehand */
function unflattenPoints(flat: number[]): number[][] {
  const pts: number[][] = [];
  for (let i = 0; i < flat.length; i += 3) {
    pts.push([flat[i], flat[i + 1], flat[i + 2]]);
  }
  return pts;
}

/** Convert perfect-freehand polygon points to an SVG path string */
function getSvgPathFromStroke(points: number[][]): string {
  if (points.length < 2) return '';

  let d = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points.length; i++) {
    const [cx, cy] = points[i];
    const [nx, ny] = points[(i + 1) % points.length];
    d += ` Q ${cx} ${cy} ${(cx + nx) / 2} ${(cy + ny) / 2}`;
  }

  d += ' Z';
  return d;
}

/** Render a single stroke to a canvas context */
export function renderStroke(
  ctx: CanvasRenderingContext2D,
  stroke: Stroke,
  options?: StrokeOptions,
): void {
  const pts = unflattenPoints(stroke.points);
  if (pts.length === 0) return;

  const preset = options ?? getPenPreset(stroke.penStyle, stroke.size);
  const outlinePoints = getStroke(pts, preset);

  if (outlinePoints.length < 2) return;

  const path = new Path2D(getSvgPathFromStroke(outlinePoints));
  ctx.fillStyle = stroke.color;
  ctx.fill(path);
}

/** Render a stroke being drawn (from live points) */
export function renderLiveStroke(
  ctx: CanvasRenderingContext2D,
  points: number[][],
  color: string,
  preset: StrokeOptions,
): void {
  if (points.length === 0) return;

  const outlinePoints = getStroke(points, preset);
  if (outlinePoints.length < 2) return;

  const path = new Path2D(getSvgPathFromStroke(outlinePoints));
  ctx.fillStyle = color;
  ctx.fill(path);
}

/** Render all strokes onto a canvas */
export function renderAllStrokes(
  ctx: CanvasRenderingContext2D,
  strokes: Stroke[],
  width: number,
  height: number,
): void {
  ctx.clearRect(0, 0, width, height);
  for (const stroke of strokes) {
    renderStroke(ctx, stroke);
  }
}

/** Get bounding box of a stroke for hit testing */
export function getStrokeBounds(stroke: Stroke): {
  minX: number; minY: number; maxX: number; maxY: number;
} {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < stroke.points.length; i += 3) {
    const x = stroke.points[i];
    const y = stroke.points[i + 1];
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}
