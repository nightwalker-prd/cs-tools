/**
 * Morphological Analysis Question Component
 *
 * Tests the ability to break down Arabic words into their
 * morphological components: root, pattern, and affixes.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Layers } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { MorphologicalAnalysisItem } from '../data/morphologicalAnalysis';
import { morphComponentLabels } from '../data/morphologicalAnalysis';

interface MorphologicalAnalysisQuestionProps {
  item: MorphologicalAnalysisItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function MorphologicalAnalysisQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: MorphologicalAnalysisQuestionProps) {
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

  const handleSpeak = () => {
    speak(item.wordVocalized);
  };

  const isCorrect = selectedAnswer === item.correctAnswer;

  const getQuestionText = () => {
    switch (item.questionType) {
      case 'root':
        return 'Identify the root (الجذر) of this word:';
      case 'pattern':
        return 'Identify the pattern (الوزن) of this word:';
      case 'prefix':
        return 'Identify the prefix(es) (السوابق) of this word:';
      case 'suffix':
        return 'Identify the suffix(es) (اللواحق) of this word:';
    }
  };

  return (
    <div className="space-y-6">
      {/* Component Type and Level Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {morphComponentLabels[item.questionType].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {morphComponentLabels[item.questionType].arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Word Display */}
      <div className="text-center p-6 bg-muted/30 rounded-xl space-y-3">
        <p className="text-sm text-muted-foreground">{getQuestionText()}</p>

        <div className="flex items-center justify-center gap-3">
          <h2 className="text-5xl font-arabic text-primary" dir="rtl">
            {item.wordVocalized}
          </h2>
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Listen to word"
          >
            <Volume2
              className={cn(
                'w-6 h-6',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>

        <p className="text-muted-foreground italic">{item.meaning}</p>
      </div>

      {/* Morphological Info Hint */}
      <div className="flex justify-center gap-4 text-sm">
        <div className="text-center px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="font-semibold text-blue-700">Root</div>
          <div className="font-arabic text-blue-600" dir="rtl">{item.root}</div>
        </div>
        <div className="text-center px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
          <div className="font-semibold text-purple-700">Pattern</div>
          <div className="font-arabic text-purple-600" dir="rtl">{item.patternArabic}</div>
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
              <span className={cn(
                'text-xl',
                item.questionType === 'root' || item.questionType === 'pattern'
                  ? 'font-arabic'
                  : 'font-medium'
              )} dir="rtl">
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
              <strong className={cn(
                'text-xl',
                item.questionType === 'root' || item.questionType === 'pattern'
                  ? 'font-arabic'
                  : ''
              )} dir="rtl">
                {item.correctAnswer}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
          {/* Morphological Breakdown */}
          <div className="flex items-center justify-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Morphological Breakdown</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {item.prefixes && item.prefixes.length > 0 && (
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-xs text-amber-600 mb-1">Prefixes</div>
                <div className="font-arabic text-amber-700" dir="rtl">
                  {item.prefixes.join(' + ')}
                </div>
              </div>
            )}
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 mb-1">Root</div>
              <div className="font-arabic text-blue-700" dir="rtl">{item.root}</div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-xs text-purple-600 mb-1">Pattern</div>
              <div className="font-arabic text-purple-700" dir="rtl">{item.patternArabic}</div>
              <div className="text-xs text-purple-600">{item.pattern}</div>
            </div>
            {item.suffixes && item.suffixes.length > 0 && (
              <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                <div className="text-xs text-green-600 mb-1">Suffixes</div>
                <div className="font-arabic text-green-700" dir="rtl">
                  {item.suffixes.join(' + ')}
                </div>
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Analysis:</strong> {item.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
