import { useRef, useCallback, useEffect } from 'react';
import type { Stroke, DrawingSettings } from '@/types';
import { getPenPreset } from '@/engine/pen-presets';
import { renderAllStrokes, renderLiveStroke, getStrokeBounds } from '@/engine/renderer';

interface UseCanvasOptions {
  strokes: Stroke[];
  settings: DrawingSettings;
  isErasing: boolean;
  onStrokeComplete: (stroke: Stroke) => void;
  onStrokeErase: (strokeId: string) => void;
}

export function useCanvas({
  strokes,
  settings,
  isErasing,
  onStrokeComplete,
  onStrokeErase,
}: UseCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const currentPoints = useRef<number[][]>([]);
  const activePointerId = useRef<number | null>(null);

  // Redraw all strokes when strokes array changes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    renderAllStrokes(ctx, strokes, canvas.width, canvas.height);
  }, [strokes]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  // Resize canvas to match viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    redraw();
  }, [redraw]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // Also handle visualViewport resize for iPad keyboard
    window.visualViewport?.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.visualViewport?.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only accept pen and mouse, not touch (reserve touch for scrolling)
    if (e.pointerType === 'touch') return;
    if (activePointerId.current !== null) return;

    e.preventDefault();
    activePointerId.current = e.pointerId;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure || 0.5;

    if (isErasing) {
      // Check if pointer hits any stroke
      for (let i = strokes.length - 1; i >= 0; i--) {
        const bounds = getStrokeBounds(strokes[i]);
        const margin = 10;
        if (x >= bounds.minX - margin && x <= bounds.maxX + margin &&
            y >= bounds.minY - margin && y <= bounds.maxY + margin) {
          onStrokeErase(strokes[i].id);
          break;
        }
      }
      activePointerId.current = null;
      return;
    }

    isDrawing.current = true;
    currentPoints.current = [[x, y, pressure]];
  }, [isErasing, strokes, onStrokeErase]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDrawing.current || e.pointerId !== activePointerId.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure || 0.5;

    currentPoints.current.push([x, y, pressure]);

    // Redraw all committed strokes + live stroke
    renderAllStrokes(ctx, strokes, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
    const preset = getPenPreset(settings.penStyle, settings.penSize);
    renderLiveStroke(ctx, currentPoints.current, settings.inkColor, preset);
  }, [strokes, settings]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerId !== activePointerId.current) return;
    activePointerId.current = null;

    if (!isDrawing.current || currentPoints.current.length < 2) {
      isDrawing.current = false;
      currentPoints.current = [];
      return;
    }

    isDrawing.current = false;

    // Flatten points to [x,y,p, x,y,p, ...] format
    const flat: number[] = [];
    for (const [x, y, p] of currentPoints.current) {
      flat.push(x, y, p);
    }

    const stroke: Stroke = {
      id: crypto.randomUUID(),
      points: flat,
      color: settings.inkColor,
      size: settings.penSize,
      penStyle: settings.penStyle,
    };

    currentPoints.current = [];
    onStrokeComplete(stroke);
  }, [settings, onStrokeComplete]);

  return {
    canvasRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    redraw,
    resizeCanvas,
  };
}
