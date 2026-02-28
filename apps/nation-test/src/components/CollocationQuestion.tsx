/**
 * Collocation Question Component
 *
 * Tests knowledge of natural word combinations in Arabic.
 * Fill-in-the-blank format with multiple choice options.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { CollocationItem } from '../data/collocations';
import { collocationTypeLabels } from '../data/collocations';

interface CollocationQuestionProps {
  item: CollocationItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function CollocationQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: CollocationQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const allOptions = [item.correctCollocate, ...item.distractors];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id, item.correctCollocate, item.distractors]);

  const handleSelect = (option: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(option);
    setHasAnswered(true);
    const isCorrect = option === item.correctCollocate;
    onAnswer(option, isCorrect);
  };

  const handleSpeak = () => {
    speak(item.fullPhraseVocalized);
  };

  const isCorrect = selectedAnswer === item.correctCollocate;

  return (
    <div className="space-y-6">
      {/* Collocation Type Badge */}
      <div className="flex items-center justify-center gap-2">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {collocationTypeLabels[item.collocationType].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {collocationTypeLabels[item.collocationType].arabic}
        </span>
      </div>

      {/* Phrase with Blank */}
      <div className="text-center p-6 bg-muted/30 rounded-xl">
        <p className="text-sm text-muted-foreground mb-3">
          Complete the collocation:
        </p>
        <h2
          className="text-3xl font-arabic text-primary leading-relaxed"
          dir="rtl"
        >
          {item.phraseWithBlank}
        </h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.correctCollocate;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all',
                'hover:border-primary/50 hover:bg-primary/5',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                // Before answering
                !hasAnswered && isSelected && 'border-primary bg-primary/10',
                // After answering with feedback
                hasAnswered &&
                  showFeedback &&
                  isThisCorrect &&
                  'border-green-500 bg-green-50',
                hasAnswered &&
                  showFeedback &&
                  isSelected &&
                  !isThisCorrect &&
                  'border-red-500 bg-red-50',
                hasAnswered &&
                  showFeedback &&
                  !isSelected &&
                  !isThisCorrect &&
                  'opacity-50'
              )}
            >
              <span className="text-xl font-arabic" dir="rtl">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && hasAnswered && (
        <div
          className={cn(
            'p-4 rounded-xl',
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
        >
          {isCorrect ? (
            <p className="font-semibold">Correct!</p>
          ) : (
            <p>
              <span className="font-semibold">Not quite.</span> The correct
              answer is:{' '}
              <strong className="font-arabic" dir="rtl">
                {item.correctCollocateVocalized}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Full Phrase and Translation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-primary">Full Collocation:</p>
            <button
              onClick={handleSpeak}
              disabled={isSpeaking}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Listen to pronunciation"
            >
              <Volume2
                className={cn(
                  'w-5 h-5',
                  isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                )}
              />
            </button>
          </div>

          <p className="text-2xl font-arabic text-primary mb-2" dir="rtl">
            {item.fullPhraseVocalized}
          </p>

          <p className="text-muted-foreground italic">{item.translation}</p>
        </div>
      )}
    </div>
  );
}
