/**
 * Verb Conjugation Question Component
 *
 * Tests the ability to conjugate Arabic verbs across
 * different tenses, persons, and verb forms.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { VerbConjugationItem } from '../data/verbConjugation';
import { personLabels, tenseLabels, formLabels } from '../data/verbConjugation';

interface VerbConjugationQuestionProps {
  item: VerbConjugationItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function VerbConjugationQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: VerbConjugationQuestionProps) {
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

  const handleSpeakBase = () => {
    speak(item.baseVerbVocalized);
  };

  const handleSpeakAnswer = () => {
    speak(item.correctAnswer);
  };

  const isCorrect = selectedAnswer === item.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Form and Level Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {formLabels[item.form].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {formLabels[item.form].arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Verb Information */}
      <div className="text-center p-6 bg-muted/30 rounded-xl space-y-4">
        {/* Root */}
        <div className="text-sm text-muted-foreground">
          Root: <span className="font-arabic text-base" dir="rtl">{item.root}</span>
        </div>

        {/* Base Verb with Audio */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-4xl font-arabic text-primary" dir="rtl">
            {item.baseVerbVocalized}
          </h2>
          <button
            onClick={handleSpeakBase}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Listen to base verb"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>

        {/* Meaning */}
        <p className="text-muted-foreground italic">{item.meaning}</p>
      </div>

      {/* Conjugation Prompt */}
      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-sm font-medium text-primary mb-2">Conjugate for:</p>
        <div className="flex items-center justify-center gap-4 text-lg">
          <div className="text-center">
            <div className="font-semibold">{tenseLabels[item.tense].english}</div>
            <div className="text-sm font-arabic text-muted-foreground" dir="rtl">
              {tenseLabels[item.tense].arabic}
            </div>
          </div>
          <div className="text-2xl text-muted-foreground">+</div>
          <div className="text-center">
            <div className="font-semibold">{personLabels[item.person].english}</div>
            <div className="text-sm font-arabic text-muted-foreground" dir="rtl">
              {personLabels[item.person].arabic}
            </div>
          </div>
        </div>
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
              answer is:{' '}
              <strong className="font-arabic text-xl" dir="rtl">
                {item.correctAnswer}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Correct Answer with Audio and Grammar Note (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary">Correct Conjugation:</p>
            <button
              onClick={handleSpeakAnswer}
              disabled={isSpeaking}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Listen to correct answer"
            >
              <Volume2
                className={cn(
                  'w-5 h-5',
                  isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                )}
              />
            </button>
          </div>

          <p className="text-3xl font-arabic text-primary text-center" dir="rtl">
            {item.correctAnswer}
          </p>

          {item.grammarNote && (
            <div className="pt-3 border-t border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>Grammar Note:</strong> {item.grammarNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
