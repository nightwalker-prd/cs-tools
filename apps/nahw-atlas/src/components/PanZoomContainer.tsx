import { useRef, useState, useCallback, useEffect, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';
import { Plus, Minus, Maximize2 } from 'lucide-react';
import type { Transform } from '@/data/types';

const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
const ZOOM_STEP = 0.15;

export const INITIAL_TRANSFORM: Transform = { scale: 1, x: 0, y: 0 };

interface PanZoomContainerProps {
  children: ReactNode;
  className?: string;
  transform: Transform;
  onTransformChange: (fn: Transform | ((prev: Transform) => Transform)) => void;
  wasDraggedRef?: React.MutableRefObject<boolean>;
}

function clampScale(s: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
}

export function PanZoomContainer({ children, className, transform, onTransformChange, wasDraggedRef }: PanZoomContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [useTransition, setUseTransition] = useState(false);

  // Refs for gesture tracking (avoids stale closures)
  const dragStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const dragDistRef = useRef(0);
  const capturedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const transformRef = useRef(transform);
  transformRef.current = transform;

  // Refs for callbacks to avoid stale closures
  const onTransformChangeRef = useRef(onTransformChange);
  onTransformChangeRef.current = onTransformChange;

  // Wheel zoom — must be non-passive to call preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const rect = el!.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      onTransformChangeRef.current((t) => {
        const direction = e.deltaY > 0 ? -1 : 1;
        const newScale = clampScale(t.scale + direction * ZOOM_STEP * t.scale);
        const ratio = newScale / t.scale;
        return {
          scale: newScale,
          x: cursorX - ratio * (cursorX - t.x),
          y: cursorY - ratio * (cursorY - t.y),
        };
      });
    }

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Pointer pan — defer pointer capture until actual drag to allow click events on children
  const handlePointerDown = useCallback((e: ReactPointerEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setUseTransition(false);
    const t = transformRef.current;
    dragStart.current = { x: e.clientX, y: e.clientY, tx: t.x, ty: t.y };
    dragDistRef.current = 0;
    capturedRef.current = false;
    pointerIdRef.current = e.pointerId;
  }, []);

  const handlePointerMove = useCallback((e: ReactPointerEvent) => {
    const drag = dragStart.current;
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    dragDistRef.current = Math.hypot(dx, dy);

    // Only capture after drag threshold so clicks on child elements still fire
    if (!capturedRef.current && dragDistRef.current >= 5 && containerRef.current && pointerIdRef.current !== null) {
      containerRef.current.setPointerCapture(pointerIdRef.current);
      capturedRef.current = true;
    }

    onTransformChange((t) => ({
      ...t,
      x: drag.tx + dx,
      y: drag.ty + dy,
    }));
  }, [onTransformChange]);

  const handlePointerUp = useCallback(() => {
    if (dragDistRef.current >= 5 && wasDraggedRef) {
      wasDraggedRef.current = true;
      setTimeout(() => { wasDraggedRef.current = false; }, 100);
    }
    setIsDragging(false);
    dragStart.current = null;
    dragDistRef.current = 0;
    capturedRef.current = false;
    pointerIdRef.current = null;
  }, [wasDraggedRef]);

  // Touch pinch zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      dragStart.current = null;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStart.current = { dist: Math.hypot(dx, dy), scale: transformRef.current.scale };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStart.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const newScale = clampScale(pinchStart.current.scale * (dist / pinchStart.current.dist));
      onTransformChange((t) => ({ ...t, scale: newScale }));
    }
  }, [onTransformChange]);

  const handleTouchEnd = useCallback(() => {
    pinchStart.current = null;
  }, []);

  // Button actions
  const resetView = useCallback(() => {
    setUseTransition(true);
    onTransformChange(INITIAL_TRANSFORM);
  }, [onTransformChange]);

  const zoomIn = useCallback(() => {
    setUseTransition(true);
    onTransformChange((t) => ({ ...t, scale: clampScale(t.scale + ZOOM_STEP * t.scale) }));
  }, [onTransformChange]);

  const zoomOut = useCallback(() => {
    setUseTransition(true);
    onTransformChange((t) => ({ ...t, scale: clampScale(t.scale - ZOOM_STEP * t.scale) }));
  }, [onTransformChange]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ''}`}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={resetView}
    >
      <div
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          transition: useTransition ? 'transform 0.3s ease' : 'none',
        }}
        onTransitionEnd={() => setUseTransition(false)}
      >
        {children}
      </div>

      {/* Overlay controls */}
      <div className="no-print absolute bottom-3 right-3 flex flex-col gap-1">
        <button
          onClick={zoomIn}
          className="glass-card !transform-none rounded-lg w-8 h-8 flex items-center justify-center text-primary hover:text-accent transition-colors"
          title="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={zoomOut}
          className="glass-card !transform-none rounded-lg w-8 h-8 flex items-center justify-center text-primary hover:text-accent transition-colors"
          title="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={resetView}
          className="glass-card !transform-none rounded-lg w-8 h-8 flex items-center justify-center text-primary hover:text-accent transition-colors"
          title="Fit to view"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
