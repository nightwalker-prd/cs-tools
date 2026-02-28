/**
 * Morphological Chain Question Component
 *
 * Displays a vertical timeline of word derivation steps from root
 * to final Quranic word, with one step hidden. The user picks
 * the missing Arabic form from 4 options.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Check, X, ArrowDown } from 'lucide-react';
import type { MorphChainItem } from '../data/morphChain';

interface MorphChainQuestionProps {
  item: MorphChainItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function MorphChainQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: MorphChainQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const correctWord = item.steps[item.blankStep]?.arabic || '';

  useEffect(() => {
    const options = [correctWord, ...item.distractors];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id]);

  const handleSelect = (answer: string) => {
    if (hasAnswered || disabled) return;
    setSelectedAnswer(answer);
    setHasAnswered(true);
    onAnswer(answer, answer === correctWord);
  };

  const isCorrect = selectedAnswer === correctWord;

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">
          Morph Chain
        </span>
        <span className="px-2 py-0.5 bg-violet-50 text-violet-500 text-xs font-arabic rounded-full" dir="rtl">
          {item.root}
        </span>
        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">
          {item.steps.length} steps
        </span>
      </div>

      {/* Root Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Root: <span className="font-arabic text-violet-700 text-lg" dir="rtl">{item.root}</span>
          {item.rootMeaning && (
            <span className="ml-2 text-violet-600">({item.rootMeaning})</span>
          )}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          What is the missing word in step {item.blankStep + 1}?
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative px-4">
        {item.steps.map((step, idx) => {
          const isBlank = idx === item.blankStep;
          const showRevealed = isBlank && hasAnswered && showFeedback;

          return (
            <div key={idx} className="relative">
              {/* Connector arrow */}
              {idx > 0 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-violet-300" />
                </div>
              )}

              {/* Step Card */}
              <div
                className={cn(
                  'rounded-lg border-2 p-3 transition-all',
                  isBlank && !hasAnswered && 'border-dashed border-violet-400 bg-violet-50/50',
                  isBlank && hasAnswered && showFeedback && isCorrect && 'border-green-500 bg-green-50',
                  isBlank && hasAnswered && showFeedback && !isCorrect && 'border-red-500 bg-red-50',
                  !isBlank && 'border-violet-200 bg-white'
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Step number */}
                  <span className={cn(
                    'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                    isBlank ? 'bg-violet-500 text-white' : 'bg-violet-100 text-violet-600'
                  )}>
                    {idx + 1}
                  </span>

                  {/* Arabic word or blank */}
                  <div className="flex-1 text-center">
                    {isBlank && !showRevealed ? (
                      <span className="text-2xl font-arabic text-violet-400">???</span>
                    ) : (
                      <span className="text-2xl font-arabic text-violet-800" dir="rtl">
                        {step.arabic}
                      </span>
                    )}
                  </div>

                  {/* Meaning */}
                  <div className="flex-1 text-right">
                    <p className="text-sm text-slate-600">{step.meaning}</p>
                  </div>
                </div>

                {/* Change description (always visible as hint) */}
                {step.changeDesc && (
                  <p className={cn(
                    'text-xs mt-1 text-center',
                    isBlank ? 'text-violet-500 font-medium' : 'text-slate-400'
                  )}>
                    {step.changeDesc}
                    {step.form && <span className="ml-1 text-slate-400">({step.form})</span>}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === correctWord;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-3 rounded-xl border-2 text-center transition-all',
                'hover:border-violet-400/50 hover:bg-violet-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                !hasAnswered && isSelected && 'border-violet-500 bg-violet-50',
                !hasAnswered && !isSelected && 'border-border',
                hasAnswered && showFeedback && isThisCorrect && 'border-green-500 bg-green-50',
                hasAnswered && showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50',
                hasAnswered && showFeedback && !isThisCorrect && !isSelected && 'opacity-50'
              )}
            >
              <span className="text-xl font-arabic" dir="rtl">{option}</span>
              {hasAnswered && showFeedback && (
                <span className="block mt-1">
                  {isThisCorrect && <Check className="w-4 h-4 text-green-600 mx-auto" />}
                  {isSelected && !isThisCorrect && <X className="w-4 h-4 text-red-600 mx-auto" />}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Result Banner */}
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
              <span className="font-semibold">Incorrect.</span> The answer is:{' '}
              <span className="font-arabic text-lg" dir="rtl">{correctWord}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
