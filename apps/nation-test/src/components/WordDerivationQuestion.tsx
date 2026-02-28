/**
 * Word Derivation Question Component
 *
 * Tests the ability to derive related words from Arabic roots,
 * including participles, verbal nouns, place nouns, etc.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, ArrowRight } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { WordDerivationItem } from '../data/wordDerivation';
import { derivationTypeLabels } from '../data/wordDerivation';

interface WordDerivationQuestionProps {
  item: WordDerivationItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function WordDerivationQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: WordDerivationQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const allOptions = [item.correctAnswer, ...item.distractors];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id, item.correctAnswer, item.distractors]);

  const handleSelect = (option: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(option);
    setHasAnswered(true);
    const isCorrect = option === item.correctAnswer;
    onAnswer(option, isCorrect);
  };

  const handleSpeakSource = () => {
    speak(item.sourceWordVocalized);
  };

  const handleSpeakAnswer = () => {
    speak(item.correctAnswerVocalized);
  };

  const isCorrect = selectedAnswer === item.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Derivation Type and Level Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {derivationTypeLabels[item.derivationType].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {derivationTypeLabels[item.derivationType].arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Source Word */}
      <div className="text-center p-6 bg-muted/30 rounded-xl space-y-3">
        {/* Root */}
        <div className="text-sm text-muted-foreground">
          Root: <span className="font-arabic text-base font-medium" dir="rtl">{item.root}</span>
        </div>

        {/* Source Word with Audio */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-4xl font-arabic text-primary" dir="rtl">
            {item.sourceWordVocalized}
          </h2>
          <button
            onClick={handleSpeakSource}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Listen to source word"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>

        {/* Meaning and Type */}
        <p className="text-muted-foreground">
          <span className="italic">{item.sourceWordMeaning}</span>
          <span className="mx-2">-</span>
          <span className="text-sm">{item.sourceType}</span>
        </p>
      </div>

      {/* Derivation Prompt */}
      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
        <p className="text-lg font-medium text-primary">{item.prompt}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Pattern: <span className="font-arabic" dir="rtl">{item.patternArabic}</span> ({item.pattern})
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.correctAnswer;

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
              <span className="text-2xl font-arabic" dir="rtl">
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
              derivation is:{' '}
              <strong className="font-arabic text-xl" dir="rtl">
                {item.correctAnswerVocalized}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Derivation Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
          {/* Derivation Chain */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="text-center">
              <p className="text-2xl font-arabic text-muted-foreground" dir="rtl">
                {item.sourceWordVocalized}
              </p>
              <p className="text-xs text-muted-foreground">{item.sourceWordMeaning}</p>
            </div>
            <ArrowRight className="w-6 h-6 text-primary" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-arabic text-primary" dir="rtl">
                  {item.correctAnswerVocalized}
                </p>
                <button
                  onClick={handleSpeakAnswer}
                  disabled={isSpeaking}
                  className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="Listen to derived word"
                >
                  <Volume2
                    className={cn(
                      'w-4 h-4',
                      isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                    )}
                  />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">{item.correctAnswerMeaning}</p>
            </div>
          </div>

          {/* Pattern Info */}
          <div className="pt-3 border-t border-primary/20 flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Pattern</p>
              <p className="font-arabic text-lg" dir="rtl">{item.patternArabic}</p>
              <p className="text-xs text-muted-foreground">{item.pattern}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="font-semibold">{derivationTypeLabels[item.derivationType].english}</p>
              <p className="font-arabic text-sm" dir="rtl">
                {derivationTypeLabels[item.derivationType].arabic}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Rule:</strong> {item.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
