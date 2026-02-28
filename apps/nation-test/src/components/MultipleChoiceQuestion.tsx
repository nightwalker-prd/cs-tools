/**
 * Multiple Choice Question Component
 *
 * Used for VST (Vocabulary Size Test) and VLT (Vocabulary Levels Test)
 * Based on Nation's format: target word + 4 options (1 correct, 3 distractors)
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2 } from 'lucide-react';
import type { MultipleChoiceItem } from '../types';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import { shuffle } from '@arabtools/core';

interface MultipleChoiceQuestionProps {
  item: MultipleChoiceItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function MultipleChoiceQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: MultipleChoiceQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const allOptions = [item.correctMeaning, ...item.distractors];
    setOptions(shuffle(allOptions));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id, item.correctMeaning, item.distractors]);

  const handleSelect = (option: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(option);
    setHasAnswered(true);
    const isCorrect = option === item.correctMeaning;
    onAnswer(option, isCorrect);
  };

  const handleSpeak = () => {
    speak(item.targetWordVocalized);
  };

  const getOptionClass = (option: string) => {
    if (!showFeedback || !hasAnswered) {
      return selectedAnswer === option ? 'selected' : '';
    }

    if (option === item.correctMeaning) {
      return 'correct';
    }

    if (selectedAnswer === option && option !== item.correctMeaning) {
      return 'incorrect';
    }

    return '';
  };

  return (
    <div className="space-y-6">
      {/* Target Word */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2
            className="text-4xl font-arabic text-primary"
            dir="rtl"
          >
            {item.targetWordVocalized}
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

        {/* Optional context */}
        {item.context && (
          <p className="text-lg text-muted-foreground font-arabic" dir="rtl">
            {item.context}
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid gap-3">
        {options.map((option, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={() => handleSelect(option)}
            disabled={hasAnswered || disabled}
            className={cn(
              'test-option p-4 rounded-xl border-2 text-left transition-all',
              'hover:border-primary/50',
              getOptionClass(option),
              (hasAnswered || disabled) && 'cursor-default'
            )}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold mr-3">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-lg">{option}</span>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && hasAnswered && (
        <div
          className={cn(
            'p-4 rounded-xl text-center',
            selectedAnswer === item.correctMeaning
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          )}
        >
          {selectedAnswer === item.correctMeaning ? (
            <p className="font-semibold">Correct!</p>
          ) : (
            <p>
              <span className="font-semibold">Incorrect.</span> The correct
              answer is: <strong>{item.correctMeaning}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
