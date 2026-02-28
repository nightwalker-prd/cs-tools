/**
 * Idiomatic Expression Question Component
 *
 * Tests knowledge of Arabic idiomatic expressions (تعبيرات اصطلاحية)
 * and their meanings.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Lightbulb, Quote } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { IdiomaticExpressionItem } from '../data/idiomaticExpressions';
import { idiomCategoryLabels } from '../data/idiomaticExpressions';

interface IdiomaticExpressionQuestionProps {
  item: IdiomaticExpressionItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function IdiomaticExpressionQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: IdiomaticExpressionQuestionProps) {
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

  const handleSpeakExpression = () => {
    speak(item.expressionVocalized);
  };

  const handleSpeakExample = () => {
    if (item.usageExampleVocalized) {
      speak(item.usageExampleVocalized);
    } else if (item.usageExample) {
      speak(item.usageExample);
    }
  };

  const isCorrect = selectedAnswer === item.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Category and Level Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {idiomCategoryLabels[item.category].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {idiomCategoryLabels[item.category].arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Expression Display */}
      <div className="text-center p-6 bg-muted/30 rounded-xl space-y-4">
        <p className="text-sm text-muted-foreground">
          What does this expression mean?
        </p>

        <div className="flex items-center justify-center gap-3">
          <Quote className="w-6 h-6 text-primary/30" />
          <h2 className="text-4xl font-arabic text-primary" dir="rtl">
            {item.expressionVocalized}
          </h2>
          <button
            onClick={handleSpeakExpression}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Listen to expression"
          >
            <Volume2
              className={cn(
                'w-6 h-6',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>

        {/* Literal Meaning Hint */}
        <div className="pt-3 border-t border-primary/10">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Literal meaning:</span>{' '}
            <span className="italic">{item.literalMeaning}</span>
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.correctAnswer;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered || disabled}
              className={cn(
                'w-full p-4 rounded-xl border-2 text-left transition-all',
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
              <span className="text-base">{option}</span>
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
              <span className="font-semibold">Not quite.</span> This expression
              means: <strong>{item.actualMeaning}</strong>
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
          {/* Meaning Breakdown */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Literal Meaning</div>
              <p className="text-sm italic">{item.literalMeaning}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Actual Meaning</div>
              <p className="text-sm font-medium text-primary">{item.actualMeaning}</p>
            </div>
          </div>

          {/* Usage Example */}
          {item.usageExample && (
            <div className="pt-3 border-t border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Example Usage:</span>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-arabic text-center flex-1" dir="rtl">
                  {item.usageExampleVocalized || item.usageExample}
                </p>
                <button
                  onClick={handleSpeakExample}
                  disabled={isSpeaking}
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="Listen to example"
                >
                  <Volume2
                    className={cn(
                      'w-4 h-4',
                      isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                    )}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Cultural Note */}
          {item.culturalNote && (
            <div className="pt-3 border-t border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-primary">Cultural Note:</strong>{' '}
                {item.culturalNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
