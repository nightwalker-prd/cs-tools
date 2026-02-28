/**
 * Translation Question Component
 *
 * Tests translation ability in both directions:
 * - Arabic → English: Multiple choice
 * - English → Arabic: Text input with lenient matching
 */

import { useState, useEffect, useRef } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, ArrowRight } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import { removeDiacritics } from '@arabtools/core/utils';
import type { TranslationItem, TranslationDirection } from '../data/translations';

interface TranslationQuestionProps {
  item: TranslationItem;
  direction: TranslationDirection;
  distractors?: string[]; // For ar_to_en multiple choice
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function TranslationQuestion({
  item,
  direction,
  distractors = [],
  onAnswer,
  showFeedback,
  disabled = false,
}: TranslationQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options for multiple choice (ar_to_en)
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (direction === 'ar_to_en') {
      const allOptions = [item.english, ...distractors];
      setOptions(allOptions.sort(() => Math.random() - 0.5));
    }
    setSelectedAnswer(null);
    setInputValue('');
    setHasAnswered(false);
    setIsCorrect(false);
    if (direction === 'en_to_ar') {
      inputRef.current?.focus();
    }
  }, [item.id, direction, distractors]);

  /**
   * Lenient matching for typed Arabic answers
   */
  const checkArabicAnswer = (answer: string): boolean => {
    const normalizedAnswer = removeDiacritics(answer.trim());
    const normalizedCorrect = removeDiacritics(item.arabic);

    // Exact match (without diacritics)
    if (normalizedAnswer === normalizedCorrect) {
      return true;
    }

    // Check alternatives
    if (item.alternatives.arabic) {
      for (const alt of item.alternatives.arabic) {
        if (normalizedAnswer === removeDiacritics(alt)) {
          return true;
        }
      }
    }

    // Lenient check: all key vocabulary words present
    const keyWordsPresent = item.keyVocabulary.every((kw) =>
      normalizedAnswer.includes(removeDiacritics(kw))
    );

    // Length tolerance (±30%)
    const lengthOk =
      normalizedAnswer.length >= normalizedCorrect.length * 0.7 &&
      normalizedAnswer.length <= normalizedCorrect.length * 1.3;

    if (keyWordsPresent && lengthOk) {
      return true;
    }

    return false;
  };

  const handleSelectOption = (option: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(option);
    setHasAnswered(true);

    // Check if correct (for ar_to_en, check against english + alternatives)
    let correct = option === item.english;
    if (!correct && item.alternatives.english) {
      correct = item.alternatives.english.includes(option);
    }

    setIsCorrect(correct);
    onAnswer(option, correct);
  };

  const handleSubmitTyped = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasAnswered || disabled || !inputValue.trim()) return;

    const correct = checkArabicAnswer(inputValue);
    setIsCorrect(correct);
    setHasAnswered(true);
    onAnswer(inputValue, correct);
  };

  const handleSpeak = () => {
    speak(item.arabicVocalized);
  };

  // Render Arabic → English (Multiple Choice)
  if (direction === 'ar_to_en') {
    return (
      <div className="space-y-6">
        {/* Direction Badge */}
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full flex items-center gap-1">
            <span className="font-arabic">عربي</span>
            <ArrowRight className="w-4 h-4" />
            <span>English</span>
          </span>
        </div>

        {/* Arabic Sentence */}
        <div className="text-center p-6 bg-muted/30 rounded-xl">
          <p className="text-sm text-muted-foreground mb-3">
            Translate this sentence:
          </p>
          <div className="flex items-center justify-center gap-3">
            <h2
              className="text-2xl font-arabic text-primary leading-relaxed"
              dir="rtl"
            >
              {item.arabicVocalized}
            </h2>
            <button
              onClick={handleSpeak}
              disabled={isSpeaking}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors flex-shrink-0"
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

        {/* English Options */}
        <div className="space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isThisCorrect = option === item.english ||
              (item.alternatives.english?.includes(option) ?? false);

            return (
              <button
                key={`${item.id}-${index}`}
                onClick={() => handleSelectOption(option)}
                disabled={hasAnswered || disabled}
                className={cn(
                  'w-full p-4 rounded-xl border-2 text-left transition-all',
                  'hover:border-primary/50 hover:bg-primary/5',
                  !hasAnswered && 'cursor-pointer',
                  hasAnswered && 'cursor-default',
                  !hasAnswered && isSelected && 'border-primary bg-primary/10',
                  hasAnswered && showFeedback && isThisCorrect && 'border-green-500 bg-green-50',
                  hasAnswered && showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50',
                  hasAnswered && showFeedback && !isSelected && !isThisCorrect && 'opacity-50'
                )}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
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
                <span className="font-semibold">Not quite.</span> The correct translation is:{' '}
                <strong>{item.english}</strong>
              </p>
            )}
          </div>
        )}

        {/* Grammar Note */}
        {item.grammarNote && hasAnswered && (
          <div className="p-4 bg-muted/30 rounded-xl">
            <p className="text-sm text-muted-foreground">
              <strong>Grammar:</strong> {item.grammarNote}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Render English → Arabic (Text Input)
  return (
    <div className="space-y-6">
      {/* Direction Badge */}
      <div className="flex items-center justify-center gap-2">
        <span className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-medium rounded-full flex items-center gap-1">
          <span>English</span>
          <ArrowRight className="w-4 h-4" />
          <span className="font-arabic">عربي</span>
        </span>
      </div>

      {/* English Sentence */}
      <div className="text-center p-6 bg-muted/30 rounded-xl">
        <p className="text-sm text-muted-foreground mb-3">
          Translate this sentence into Arabic:
        </p>
        <h2 className="text-2xl font-semibold text-primary">
          "{item.english}"
        </h2>
      </div>

      {/* Key Vocabulary Hints */}
      <div className="flex flex-wrap justify-center gap-2">
        {item.keyVocabulary.map((word, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-accent/10 rounded-lg text-sm font-arabic"
            dir="rtl"
          >
            {word}
          </span>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmitTyped} className="space-y-4">
        <div>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={hasAnswered || disabled}
            dir="rtl"
            placeholder="اكتب الترجمة هنا..."
            rows={3}
            className={cn(
              'w-full px-4 py-3 text-xl font-arabic text-right',
              'border-2 rounded-xl resize-none',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              hasAnswered && isCorrect && 'border-green-500 bg-green-50',
              hasAnswered && !isCorrect && 'border-amber-500 bg-amber-50'
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
              Check Translation
            </button>
          </div>
        )}
      </form>

      {/* Feedback */}
      {showFeedback && hasAnswered && (
        <div className="space-y-4">
          <div
            className={cn(
              'p-4 rounded-xl',
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
            )}
          >
            {isCorrect ? (
              <p className="font-semibold">Excellent!</p>
            ) : (
              <p>
                <span className="font-semibold">Good attempt!</span> Compare with the model translation below.
              </p>
            )}
          </div>

          {/* Model Answer */}
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-primary">Model Translation:</p>
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
              {item.arabicVocalized}
            </p>

            {/* Alternatives */}
            {item.alternatives.arabic && item.alternatives.arabic.length > 0 && (
              <div className="mt-3 pt-3 border-t border-primary/10">
                <p className="text-xs text-muted-foreground mb-2">Also acceptable:</p>
                {item.alternatives.arabic.map((alt, i) => (
                  <p key={i} className="text-lg font-arabic text-muted-foreground" dir="rtl">
                    {alt}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Your answer comparison */}
          {!isCorrect && (
            <div className="p-4 bg-white rounded-xl border">
              <p className="text-sm font-medium text-muted-foreground mb-2">Your answer:</p>
              <p className="text-lg font-arabic" dir="rtl">
                {inputValue}
              </p>
            </div>
          )}

          {/* Grammar Note */}
          {item.grammarNote && (
            <div className="p-4 bg-muted/30 rounded-xl">
              <p className="text-sm text-muted-foreground">
                <strong>Grammar:</strong> {item.grammarNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
