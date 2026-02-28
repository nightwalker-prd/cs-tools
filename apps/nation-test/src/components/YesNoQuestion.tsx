/**
 * Yes/No Question Component
 *
 * Based on Nation's Yes/No vocabulary test format.
 * Learners indicate whether they know each word.
 * Includes pseudowords to control for guessing.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Check, X, Volume2 } from 'lucide-react';
import type { YesNoItem } from '../types';
import { useSpeechSynthesis } from '@arabtools/core/hooks';

interface YesNoQuestionProps {
  item: YesNoItem;
  onAnswer: (answer: boolean, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function YesNoQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: YesNoQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Reset state when item changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id]);

  const handleSelect = (answer: boolean) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    // For real words: Yes is correct, No is incorrect
    // For pseudowords: No is correct, Yes is incorrect (false alarm)
    const isCorrect = item.isReal ? answer === true : answer === false;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = () => {
    speak(item.word);
  };

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center text-muted-foreground">
        <p>Do you know this word?</p>
      </div>

      {/* Target Word */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2
            className="text-5xl font-arabic text-primary"
            dir="rtl"
          >
            {item.word}
          </h2>
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Listen to pronunciation"
          >
            <Volume2
              className={cn(
                'w-6 h-6',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>
      </div>

      {/* Yes/No Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleSelect(true)}
          disabled={hasAnswered || disabled}
          className={cn(
            'flex items-center gap-2 px-8 py-4 rounded-xl border-2 text-lg font-semibold transition-all',
            'hover:border-green-500 hover:bg-green-50',
            selectedAnswer === true && 'border-green-500 bg-green-100',
            (hasAnswered || disabled) && 'cursor-default'
          )}
        >
          <Check className="w-6 h-6 text-green-600" />
          <span>Yes, I know it</span>
        </button>

        <button
          onClick={() => handleSelect(false)}
          disabled={hasAnswered || disabled}
          className={cn(
            'flex items-center gap-2 px-8 py-4 rounded-xl border-2 text-lg font-semibold transition-all',
            'hover:border-red-500 hover:bg-red-50',
            selectedAnswer === false && 'border-red-500 bg-red-100',
            (hasAnswered || disabled) && 'cursor-default'
          )}
        >
          <X className="w-6 h-6 text-red-600" />
          <span>No, I don't</span>
        </button>
      </div>

      {/* Feedback */}
      {showFeedback && hasAnswered && (
        <div
          className={cn(
            'p-4 rounded-xl text-center',
            item.isReal
              ? selectedAnswer === true
                ? 'bg-green-100 text-green-800'
                : 'bg-amber-100 text-amber-800'
              : selectedAnswer === false
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
          )}
        >
          {item.isReal ? (
            selectedAnswer === true ? (
              <p>
                <span className="font-semibold">Correct!</span> This word means:{' '}
                <strong>{item.meaning}</strong>
              </p>
            ) : (
              <p>
                This is a real word meaning: <strong>{item.meaning}</strong>
              </p>
            )
          ) : selectedAnswer === false ? (
            <p className="font-semibold">
              Correct! This is not a real Arabic word.
            </p>
          ) : (
            <p className="font-semibold">
              This is not a real Arabic word (pseudoword).
            </p>
          )}
        </div>
      )}
    </div>
  );
}
