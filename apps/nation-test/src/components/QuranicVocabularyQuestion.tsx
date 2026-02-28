/**
 * Quranic/Classical Vocabulary Question Component
 *
 * Tests knowledge of vocabulary commonly found in the Quran,
 * hadith, and classical Arabic texts.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, BookOpen } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { QuranicVocabularyItem } from '../data/quranicVocabulary';
import { quranicCategoryLabels } from '../data/quranicVocabulary';

interface QuranicVocabularyQuestionProps {
  item: QuranicVocabularyItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function QuranicVocabularyQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: QuranicVocabularyQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  useEffect(() => {
    const options = [item.correctAnswer, ...item.distractors];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id]);

  const handleSelect = (answer: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    const isCorrect = answer === item.correctAnswer;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const isCorrect = selectedAnswer === item.correctAnswer;
  const categoryLabel = quranicCategoryLabels[item.category];

  return (
    <div className="space-y-6">
      {/* Category and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
          Quranic Vocabulary
        </span>
        <span
          className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {categoryLabel.arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Word Display */}
      <div className="text-center p-6 bg-emerald-50/50 rounded-xl space-y-3">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600/50" />
          <p className="text-sm text-muted-foreground">
            What is the meaning of this Quranic term?
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <h2 className="text-5xl font-arabic text-emerald-700" dir="rtl">
            {item.wordVocalized}
          </h2>
          <button
            onClick={() => handleSpeak(item.wordVocalized)}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-emerald-100 transition-colors"
            aria-label="Listen"
          >
            <Volume2
              className={cn(
                'w-6 h-6',
                isSpeaking ? 'text-emerald-500 animate-pulse' : 'text-emerald-400'
              )}
            />
          </button>
        </div>

        {item.root && (
          <p className="text-sm text-muted-foreground">
            Root: <span className="font-arabic text-emerald-600" dir="rtl">{item.root}</span>
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.correctAnswer;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all relative',
                'hover:border-emerald-400/50 hover:bg-emerald-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                // Before answering
                !hasAnswered && isSelected && 'border-emerald-500 bg-emerald-50',
                !hasAnswered && !isSelected && 'border-border',
                // After answering with feedback
                hasAnswered && showFeedback && isThisCorrect && 'border-green-500 bg-green-50',
                hasAnswered && showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50',
                hasAnswered && showFeedback && !isThisCorrect && !isSelected && 'opacity-50'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{option}</span>
                {hasAnswered && showFeedback && (
                  <span>
                    {isThisCorrect && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {isSelected && !isThisCorrect && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </span>
                )}
              </div>
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
              <span className="font-semibold">Incorrect.</span> The correct answer is:{' '}
              <span className="font-semibold">{item.correctAnswer}</span>
            </p>
          )}
        </div>
      )}

      {/* Quranic Usage (after answering) */}
      {hasAnswered && item.quranicUsage && (
        <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
          {/* Quranic Example */}
          <div className="text-center">
            <p className="text-sm text-emerald-600 mb-2">Quranic Usage:</p>
            <p className="text-xl font-arabic text-emerald-800 leading-relaxed" dir="rtl">
              {item.quranicUsage}
            </p>
            {item.surahReference && (
              <p className="text-sm text-emerald-600 mt-2">
                — {item.surahReference}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="pt-3 border-t border-emerald-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-emerald-700">Category:</strong>{' '}
              {categoryLabel.english} ({categoryLabel.arabic})
            </p>
          </div>

          {/* Classical Note if present */}
          {item.classicalNote && (
            <div className="pt-3 border-t border-emerald-200">
              <p className="text-sm text-muted-foreground">
                <strong className="text-emerald-700">Note:</strong> {item.classicalNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
