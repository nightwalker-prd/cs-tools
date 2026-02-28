import { useState, useCallback, useRef } from 'react';
import type { Stroke } from '@/types';

const MAX_UNDO = 50;

export function useStrokes(initialStrokes: Stroke[] = []) {
  const [strokes, setStrokes] = useState<Stroke[]>(initialStrokes);
  const undoStack = useRef<Stroke[][]>([]);
  const redoStack = useRef<Stroke[][]>([]);

  const pushUndo = useCallback((current: Stroke[]) => {
    undoStack.current.push([...current]);
    if (undoStack.current.length > MAX_UNDO) {
      undoStack.current.shift();
    }
    redoStack.current = [];
  }, []);

  const addStroke = useCallback((stroke: Stroke) => {
    setStrokes(prev => {
      pushUndo(prev);
      return [...prev, stroke];
    });
  }, [pushUndo]);

  const removeStroke = useCallback((strokeId: string) => {
    setStrokes(prev => {
      pushUndo(prev);
      return prev.filter(s => s.id !== strokeId);
    });
  }, [pushUndo]);

  const clearStrokes = useCallback(() => {
    setStrokes(prev => {
      if (prev.length === 0) return prev;
      pushUndo(prev);
      return [];
    });
  }, [pushUndo]);

  const undo = useCallback(() => {
    const prev = undoStack.current.pop();
    if (!prev) return;
    setStrokes(current => {
      redoStack.current.push([...current]);
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    const next = redoStack.current.pop();
    if (!next) return;
    setStrokes(current => {
      undoStack.current.push([...current]);
      return next;
    });
  }, []);

  const loadStrokes = useCallback((newStrokes: Stroke[]) => {
    setStrokes(newStrokes);
    undoStack.current = [];
    redoStack.current = [];
  }, []);

  const canUndo = undoStack.current.length > 0;
  const canRedo = redoStack.current.length > 0;

  return {
    strokes,
    addStroke,
    removeStroke,
    clearStrokes,
    undo,
    redo,
    canUndo,
    canRedo,
    loadStrokes,
  };
}
