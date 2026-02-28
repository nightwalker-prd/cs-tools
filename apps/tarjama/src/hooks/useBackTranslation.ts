import { useState, useCallback } from 'react';
import { usePersistedState } from '@arabtools/core/hooks';
import type { BackTranslationPassage, BackTranslationAttempt, SelfRating } from '../data/types';

export type BTPhase = 'translate' | 'reconstruct' | 'compare';

export interface BTExerciseState {
  passageId: string;
  phase: BTPhase;
  englishText: string;
  arabicReconstruction: string;
}

const EMPTY_EXERCISE: BTExerciseState | null = null;

export function useBackTranslation() {
  const [history, setHistory] = usePersistedState<BackTranslationAttempt[]>(
    'arabtools-tarjama-bt-history',
    [],
  );
  const [savedExercise, setSavedExercise] = usePersistedState<BTExerciseState | null>(
    'arabtools-tarjama-bt-current',
    EMPTY_EXERCISE,
  );

  const [passage, setPassage] = useState<BackTranslationPassage | null>(null);
  const [phase, setPhase] = useState<BTPhase>('translate');
  const [englishText, setEnglishText] = useState('');
  const [arabicReconstruction, setArabicReconstruction] = useState('');

  const startExercise = useCallback((p: BackTranslationPassage) => {
    // Check for saved in-progress exercise for this passage
    if (savedExercise && savedExercise.passageId === p.id) {
      setPassage(p);
      setPhase(savedExercise.phase);
      setEnglishText(savedExercise.englishText);
      setArabicReconstruction(savedExercise.arabicReconstruction);
      return;
    }

    setPassage(p);
    setPhase('translate');
    setEnglishText('');
    setArabicReconstruction('');
    setSavedExercise({
      passageId: p.id,
      phase: 'translate',
      englishText: '',
      arabicReconstruction: '',
    });
  }, [savedExercise, setSavedExercise]);

  const persistState = useCallback((updates: Partial<BTExerciseState>) => {
    setSavedExercise(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  }, [setSavedExercise]);

  const updateEnglish = useCallback((text: string) => {
    setEnglishText(text);
    persistState({ englishText: text });
  }, [persistState]);

  const updateArabic = useCallback((text: string) => {
    setArabicReconstruction(text);
    persistState({ arabicReconstruction: text });
  }, [persistState]);

  const submitEnglish = useCallback(() => {
    setPhase('reconstruct');
    persistState({ phase: 'reconstruct' });
  }, [persistState]);

  const submitReconstruction = useCallback(() => {
    setPhase('compare');
    persistState({ phase: 'compare' });
  }, [persistState]);

  const rate = useCallback((rating: SelfRating) => {
    if (!passage) return;

    const attempt: BackTranslationAttempt = {
      passageId: passage.id,
      date: new Date().toISOString(),
      rating,
      englishTranslation: englishText,
      arabicReconstruction,
    };

    setHistory(prev => [...prev, attempt]);
    setSavedExercise(EMPTY_EXERCISE);
  }, [passage, englishText, arabicReconstruction, setHistory, setSavedExercise]);

  const reset = useCallback(() => {
    setPassage(null);
    setPhase('translate');
    setEnglishText('');
    setArabicReconstruction('');
    setSavedExercise(EMPTY_EXERCISE);
  }, [setSavedExercise]);

  const getLastAttempt = useCallback((passageId: string): BackTranslationAttempt | undefined => {
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].passageId === passageId) return history[i];
    }
    return undefined;
  }, [history]);

  return {
    passage,
    phase,
    englishText,
    arabicReconstruction,
    history,
    startExercise,
    updateEnglish,
    updateArabic,
    submitEnglish,
    submitReconstruction,
    rate,
    reset,
    getLastAttempt,
  };
}
