/**
 * Productive Vocabulary Question Component
 *
 * Based on Nation's Productive Vocabulary Levels Test (PVLT)
 * Tests ability to produce the target word from a definition.
 */

import { useState, useEffect, useRef } from 'react';
import { cn } from '@arabtools/ui';
import { removeDiacritics } from '@arabtools/core/utils';
import type { ProductiveItem } from '../types';

interface ProductiveQuestionProps {
  item: ProductiveItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function ProductiveQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: ProductiveQuestionProps) {
  const [inputValue, setInputValue] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state when item changes
  useEffect(() => {
    setInputValue('');
    setHasAnswered(false);
    setIsCorrect(false);
    inputRef.current?.focus();
  }, [item.id]);

  const checkAnswer = (answer: string): boolean => {
    // Normalize both the answer and correct answer (remove diacritics)
    const normalizedAnswer = removeDiacritics(answer.trim());
    const normalizedCorrect = removeDiacritics(item.correctAnswer);

    // Check against main answer
    if (normalizedAnswer === normalizedCorrect) {
      return true;
    }

    // Check against alternatives
    if (item.alternatives) {
      for (const alt of item.alternatives) {
        if (normalizedAnswer === removeDiacritics(alt)) {
          return true;
        }
      }
    }

    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasAnswered || disabled || !inputValue.trim()) return;

    const correct = checkAnswer(inputValue);
    setIsCorrect(correct);
    setHasAnswered(true);
    onAnswer(inputValue, correct);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Definition */}
      <div className="text-center">
        <p className="text-lg text-muted-foreground mb-2">
          What is the Arabic word for:
        </p>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          {item.definition}
        </h2>

        {/* Context sentence if available */}
        {item.contextSentence && (
          <p className="text-lg text-muted-foreground font-arabic" dir="rtl">
            {item.contextSentence}
          </p>
        )}
      </div>

      {/* Hint */}
      <div className="text-center">
        <span className="inline-block px-4 py-2 bg-accent/20 rounded-lg text-accent-foreground">
          Hint: <span className="font-arabic text-xl">{item.hint}</span>
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={hasAnswered || disabled}
            dir="rtl"
            placeholder="اكتب الكلمة هنا..."
            className={cn(
              'w-full max-w-md px-6 py-4 text-2xl font-arabic text-center',
              'border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50',
              hasAnswered && isCorrect && 'border-green-500 bg-green-50',
              hasAnswered && !isCorrect && 'border-red-500 bg-red-50'
            )}
          />
        </div>

        {!hasAnswered && (
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!inputValue.trim() || disabled}
              className={cn(
                'px-8 py-3 bg-primary text-white rounded-xl font-semibold',
                'hover:bg-primary/90 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Check Answer
            </button>
          </div>
        )}
      </form>

      {/* Feedback */}
      {showFeedback && hasAnswered && (
        <div
          className={cn(
            'p-4 rounded-xl text-center',
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
        >
          {isCorrect ? (
            <p className="font-semibold">Correct!</p>
          ) : (
            <div>
              <p className="font-semibold mb-2">Not quite.</p>
              <p>
                The correct answer is:{' '}
                <span className="font-arabic text-xl" dir="rtl">
                  {item.correctAnswer}
                </span>
              </p>
              {item.alternatives && item.alternatives.length > 0 && (
                <p className="text-sm mt-1">
                  Also accepted:{' '}
                  {item.alternatives.map((alt, i) => (
                    <span key={alt}>
                      <span className="font-arabic" dir="rtl">
                        {alt}
                      </span>
                      {i < item.alternatives!.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
