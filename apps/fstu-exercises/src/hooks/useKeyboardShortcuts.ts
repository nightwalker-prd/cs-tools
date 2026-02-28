import { useEffect } from 'react';
import type { ExerciseMode } from '../types';

interface KeyboardHandlers {
  mode: ExerciseMode;
  onSwitchMode: (mode: ExerciseMode) => void;
  onClosePanel: () => void;
  // Flashcard
  onFlip?: () => void;
  onNextCard?: () => void;
  onPrevCard?: () => void;
  onMarkKnown?: () => void;
  onMarkLearning?: () => void;
  onShuffleCards?: () => void;
  // Practice
  onRevealAll?: () => void;
  onHideAll?: () => void;
  onShuffleQuestions?: () => void;
}

export function useKeyboardShortcuts(handlers: KeyboardHandlers) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      // Global: mode switching
      if (e.key === '1') { handlers.onSwitchMode('practice'); return; }
      if (e.key === '2') { handlers.onSwitchMode('quiz'); return; }
      if (e.key === '3') { handlers.onSwitchMode('flashcard'); return; }
      if (e.key === 'Escape') { handlers.onClosePanel(); return; }

      if (handlers.mode === 'flashcard') {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handlers.onFlip?.(); }
        else if (e.key === 'ArrowRight' || e.key === 'l') { handlers.onNextCard?.(); }
        else if (e.key === 'ArrowLeft' || e.key === 'h') { handlers.onPrevCard?.(); }
        else if (e.key === 'k') { handlers.onMarkKnown?.(); }
        else if (e.key === 'j') { handlers.onMarkLearning?.(); }
        else if (e.key === 's') { handlers.onShuffleCards?.(); }
      }

      if (handlers.mode === 'practice') {
        if (e.key === 'r') { handlers.onRevealAll?.(); }
        else if (e.key === 'h') { handlers.onHideAll?.(); }
        else if (e.key === 's') { handlers.onShuffleQuestions?.(); }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlers]);
}
