import { useRef, useCallback, useMemo } from 'react';
import type { Transform } from '@/data/types';

interface MinimapProps {
  svgHtml: string;
  transform: Transform;
  containerSize: { w: number; h: number };
  contentSize: { w: number; h: number };
  onNavigate: (x: number, y: number) => void;
}

const MINIMAP_W = 180;
const MINIMAP_H = 120;

export function Minimap({ svgHtml, transform, containerSize, contentSize, onNavigate }: MinimapProps) {
  const minimapRef = useRef<HTMLDivElement>(null);

  // Scale content to fit minimap
  const minimapScale = useMemo(() => {
    if (contentSize.w === 0 || contentSize.h === 0) return 1;
    return Math.min(MINIMAP_W / contentSize.w, MINIMAP_H / contentSize.h);
  }, [contentSize]);

  // Viewport rectangle in minimap coordinates
  const viewportRect = useMemo(() => {
    if (containerSize.w === 0 || containerSize.h === 0) return null;

    const visibleX = -transform.x / transform.scale;
    const visibleY = -transform.y / transform.scale;
    const visibleW = containerSize.w / transform.scale;
    const visibleH = containerSize.h / transform.scale;

    return {
      left: visibleX * minimapScale,
      top: visibleY * minimapScale,
      width: visibleW * minimapScale,
      height: visibleH * minimapScale,
    };
  }, [transform, containerSize, minimapScale]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = minimapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Convert minimap coords to content coords
    const contentX = mx / minimapScale;
    const contentY = my / minimapScale;

    // Center the viewport on this point
    const newX = -(contentX * transform.scale - containerSize.w / 2);
    const newY = -(contentY * transform.scale - containerSize.h / 2);

    onNavigate(newX, newY);
  }, [minimapScale, transform.scale, containerSize, onNavigate]);

  if (!svgHtml || contentSize.w === 0) return null;

  return (
    <div
      ref={minimapRef}
      className="no-print hidden sm:block absolute bottom-14 right-3 glass-card !transform-none rounded-lg overflow-hidden cursor-crosshair z-10"
      style={{ width: MINIMAP_W, height: MINIMAP_H }}
      onClick={handleClick}
    >
      <div
        className="origin-top-left pointer-events-none opacity-60 [&_.node]:cursor-default"
        style={{
          transform: `scale(${minimapScale})`,
          width: contentSize.w,
          height: contentSize.h,
        }}
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />

      {/* Viewport indicator */}
      {viewportRect && (
        <div
          className="absolute border-2 border-accent rounded-sm pointer-events-none"
          style={{
            left: viewportRect.left,
            top: viewportRect.top,
            width: Math.max(viewportRect.width, 8),
            height: Math.max(viewportRect.height, 8),
          }}
        />
      )}
    </div>
  );
}
