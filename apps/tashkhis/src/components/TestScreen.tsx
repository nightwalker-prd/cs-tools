import { useEffect } from 'react';
import type { PlacementResult } from '../types';
import { useQuestionPool } from '../hooks/useQuestionPool';
import { usePlacementTest } from '../hooks/usePlacementTest';

interface TestScreenProps {
  maxQuestions: number;
  onComplete: (result: PlacementResult) => void;
  onCancel: () => void;
}

export function TestScreen({ maxQuestions, onComplete, onCancel }: TestScreenProps) {
  const { pool, loading, error } = useQuestionPool();
  const {
    engineState,
    currentQuestion,
    currentCategoryLabel,
    feedbackState,
    selectedIndex,
    start,
    answer,
    endEarly,
  } = usePlacementTest(pool, maxQuestions, onComplete);

  // Auto-start when pool is ready
  useEffect(() => {
    if (pool && !engineState) {
      start();
    }
  }, [pool, engineState, start]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-destructive">Error: {error}</p>
        <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground">
          Go Back
        </button>
      </div>
    );
  }

  if (!currentQuestion || !engineState) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const progress = engineState.questionsAnswered / engineState.maxQuestions;

  return (
    <div className="py-8 animate-fade-in-up">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">
            Question {engineState.questionsAnswered + 1} / {engineState.maxQuestions}
          </span>
          <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
            {currentCategoryLabel}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl border p-8 mb-6" key={currentQuestion.id}>
        <div className="animate-fade-in-up">
          {currentQuestion.arabicText && (
            <p className="font-arabic text-3xl text-center mb-6 leading-relaxed" dir="rtl">
              {currentQuestion.arabicText}
            </p>
          )}
          <p className="text-center text-lg text-foreground mb-8">
            {currentQuestion.prompt}
          </p>
        </div>

        {/* Options */}
        <div className="grid gap-3 sm:grid-cols-2">
          {currentQuestion.options.map((option, idx) => {
            let className = 'option-btn p-4 rounded-xl border text-left transition-all ';

            if (feedbackState !== 'none') {
              if (idx === currentQuestion.correctIndex) {
                className += 'correct border-success bg-success/10';
              } else if (idx === selectedIndex) {
                className += 'incorrect border-destructive bg-destructive/10';
              } else {
                className += 'opacity-50';
              }
            } else {
              className += 'hover:border-primary/30 hover:bg-primary/5';
            }

            // Check if this is Arabic text
            const isArabic = /[\u0600-\u06FF]/.test(option);

            return (
              <button
                key={idx}
                onClick={() => answer(idx)}
                disabled={feedbackState !== 'none'}
                className={className}
              >
                <span className={isArabic ? 'font-arabic text-xl' : ''} dir={isArabic ? 'rtl' : 'ltr'}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* End early link */}
      <div className="text-center">
        <button
          onClick={() => endEarly()}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          End Test Early
        </button>
      </div>
    </div>
  );
}
