import { useState, useEffect, useCallback, useRef } from 'react';
import type { DrawingSettings, Stroke } from '@/types';
import { useCanvas } from '@/hooks/useCanvas';
import { useStrokes } from '@/hooks/useStrokes';
import { Toolbar } from './Toolbar';
import { RuledLines } from './RuledLines';
import { generateThumbnail } from '@/engine/thumbnail';

interface CanvasProps {
  pageId: string;
  notebook: ReturnType<typeof import('@/hooks/useNotebook').useNotebook>;
  settings: DrawingSettings;
  updateSettings: (updates: Partial<DrawingSettings>) => void;
  onNavigate: (path: string) => void;
}

export function Canvas({ pageId, notebook, settings, updateSettings, onNavigate }: CanvasProps) {
  const [isErasing, setIsErasing] = useState(false);
  const { strokes, addStroke, removeStroke, clearStrokes, undo, redo, canUndo, canRedo, loadStrokes } = useStrokes();
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pageLoadedRef = useRef<string>('');

  // Load page data
  useEffect(() => {
    if (pageLoadedRef.current === pageId) return;
    pageLoadedRef.current = pageId;
    notebook.openPage(pageId).then(page => {
      if (page) {
        loadStrokes(page.strokes);
      }
    });
  }, [pageId, notebook, loadStrokes]);

  // Auto-save with debounce
  const saveStrokes = useCallback((currentStrokes: Stroke[]) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      const canvas = canvasRef.current;
      const w = canvas ? canvas.getBoundingClientRect().width : 800;
      const h = canvas ? canvas.getBoundingClientRect().height : 600;
      const thumbnail = generateThumbnail(currentStrokes, w, h);
      notebook.saveCurrentPage(currentStrokes, thumbnail);
    }, 500);
  }, [notebook]);

  const handleStrokeComplete = useCallback((stroke: Stroke) => {
    addStroke(stroke);
  }, [addStroke]);

  const handleStrokeErase = useCallback((strokeId: string) => {
    removeStroke(strokeId);
  }, [removeStroke]);

  // Save whenever strokes change
  useEffect(() => {
    if (pageLoadedRef.current === pageId && strokes.length >= 0) {
      saveStrokes(strokes);
    }
  }, [strokes, pageId, saveStrokes]);

  const { canvasRef, handlePointerDown, handlePointerMove, handlePointerUp } = useCanvas({
    strokes,
    settings,
    isErasing,
    onStrokeComplete: handleStrokeComplete,
    onStrokeErase: handleStrokeErase,
  });

  // Export as PNG
  const handleExport = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `khatt-page-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [canvasRef]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [undo, redo]);

  // Find current page position in notebook
  const currentNb = notebook.currentNotebook;
  const pageIndex = currentNb ? currentNb.pages.indexOf(pageId) : -1;
  const totalPages = currentNb ? currentNb.pages.length : 0;

  const goToPrevPage = useCallback(() => {
    if (!currentNb || pageIndex <= 0) return;
    onNavigate('page/' + currentNb.pages[pageIndex - 1]);
  }, [currentNb, pageIndex, onNavigate]);

  const goToNextPage = useCallback(async () => {
    if (!currentNb) return;
    if (pageIndex < totalPages - 1) {
      onNavigate('page/' + currentNb.pages[pageIndex + 1]);
    } else {
      // Create new page and navigate to it
      const page = await notebook.addPage(currentNb.id);
      if (page) {
        onNavigate('page/' + page.id);
      }
    }
  }, [currentNb, pageIndex, totalPages, onNavigate, notebook]);

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: 'var(--color-paper)' }}>
      {/* Ruled lines background */}
      <RuledLines pattern={settings.linePattern} />

      {/* Drawing canvas */}
      <canvas
        ref={canvasRef}
        className={`drawing-canvas absolute inset-0 w-full h-full ${isErasing ? 'eraser-mode' : ''}`}
        style={{ zIndex: 1 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      {/* Top bar: back pill + page indicator */}
      <div className="canvas-top-bar">
        <button
          className="back-pill"
          onClick={() => {
            if (currentNb) {
              onNavigate('notebook/' + currentNb.id);
            } else {
              onNavigate('');
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {currentNb?.name ?? 'Back'}
        </button>

        {totalPages > 0 && (
          <div className="page-indicator">
            <span className="current-page">{pageIndex + 1}</span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>
        )}
      </div>

      {/* Page navigation */}
      <div className="page-turn page-turn-prev">
        <button onClick={goToPrevPage} disabled={pageIndex <= 0}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
      <div className="page-turn page-turn-next">
        <button onClick={goToNextPage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Toolbar */}
      <Toolbar
        settings={settings}
        updateSettings={updateSettings}
        isErasing={isErasing}
        onToggleEraser={() => setIsErasing(!isErasing)}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onClear={clearStrokes}
        onExport={handleExport}
      />
    </div>
  );
}
