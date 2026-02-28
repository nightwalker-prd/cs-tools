/**
 * Root Pattern Question Component
 *
 * Tests morphological awareness - ability to recognize
 * which words derive from a common Arabic root.
 * Multiple selection format (checkboxes).
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Check, X, Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { RootPatternItem } from '../data/rootPatterns';

interface RootPatternQuestionProps {
  item: RootPatternItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

type WordOption = {
  word: string;
  wordVocalized: string;
  isCorrect: boolean;
  // For feedback
  pattern?: string;
  patternName?: string;
  meaning?: string;
  actualRoot?: string;
};

export function RootPatternQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: RootPatternQuestionProps) {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Build options from correct forms and distractors
  const [options, setOptions] = useState<WordOption[]>([]);

  useEffect(() => {
    const correctOptions: WordOption[] = item.correctForms.map((form) => ({
      word: form.word,
      wordVocalized: form.wordVocalized,
      isCorrect: true,
      pattern: form.pattern,
      patternName: form.patternName,
      meaning: form.meaning,
    }));

    const distractorOptions: WordOption[] = item.distractors.map((d) => ({
      word: d.word,
      wordVocalized: d.wordVocalized,
      isCorrect: false,
      actualRoot: d.actualRoot,
      meaning: d.meaning,
    }));

    const allOptions = [...correctOptions, ...distractorOptions];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setSelectedWords(new Set());
    setHasAnswered(false);
  }, [item.id, item.correctForms, item.distractors]);

  const toggleWord = (word: string) => {
    if (hasAnswered || disabled) return;

    const newSelected = new Set(selectedWords);
    if (newSelected.has(word)) {
      newSelected.delete(word);
    } else {
      newSelected.add(word);
    }
    setSelectedWords(newSelected);
  };

  const handleSubmit = () => {
    if (hasAnswered || disabled || selectedWords.size === 0) return;

    setHasAnswered(true);

    // Calculate correctness
    const correctWords = new Set(item.correctForms.map((f) => f.word));
    const selectedCorrect = [...selectedWords].filter((w) => correctWords.has(w)).length;
    const selectedIncorrect = [...selectedWords].filter((w) => !correctWords.has(w)).length;

    // Score: correct selections - incorrect selections, minimum 0
    const score = Math.max(0, selectedCorrect - selectedIncorrect);
    const maxScore = item.correctForms.length;
    const isCorrect = score >= maxScore * 0.7; // 70% threshold

    onAnswer(JSON.stringify([...selectedWords]), isCorrect);
  };

  const handleSpeak = (word: string) => {
    speak(word);
  };

  // Calculate results for feedback
  const correctWords = new Set(item.correctForms.map((f) => f.word));
  const selectedCorrectCount = [...selectedWords].filter((w) => correctWords.has(w)).length;
  const selectedIncorrectCount = [...selectedWords].filter((w) => !correctWords.has(w)).length;
  const missedCount = item.correctForms.length - selectedCorrectCount;

  return (
    <div className="space-y-6">
      {/* Root Display */}
      <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-sm text-muted-foreground mb-2">
          Which words derive from this root?
        </p>
        <h2 className="text-4xl font-arabic text-primary mb-2" dir="rtl">
          {item.root}
        </h2>
        <p className="text-lg text-muted-foreground">
          ({item.rootMeaning})
        </p>
      </div>

      {/* Instructions */}
      <p className="text-center text-sm text-muted-foreground">
        Select all words that come from this root (multiple answers)
      </p>

      {/* Word Options */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedWords.has(option.word);

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => toggleWord(option.word)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all relative',
                'hover:border-primary/50 hover:bg-primary/5',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                // Before answering
                !hasAnswered && isSelected && 'border-primary bg-primary/10',
                // After answering with feedback
                hasAnswered && showFeedback && option.isCorrect && isSelected && 'border-green-500 bg-green-50',
                hasAnswered && showFeedback && option.isCorrect && !isSelected && 'border-amber-500 bg-amber-50',
                hasAnswered && showFeedback && !option.isCorrect && isSelected && 'border-red-500 bg-red-50',
                hasAnswered && showFeedback && !option.isCorrect && !isSelected && 'opacity-50'
              )}
            >
              {/* Checkbox indicator */}
              <div
                className={cn(
                  'absolute top-2 right-2 w-5 h-5 rounded border-2 flex items-center justify-center',
                  isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                )}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>

              <span className="text-xl font-arabic block" dir="rtl">
                {option.wordVocalized}
              </span>

              {/* Show meaning after answering */}
              {hasAnswered && showFeedback && (
                <span className="text-xs text-muted-foreground block mt-1">
                  {option.meaning}
                </span>
              )}

              {/* Show result indicator after answering */}
              {hasAnswered && showFeedback && (
                <div className="absolute bottom-2 left-2">
                  {option.isCorrect && isSelected && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                  {option.isCorrect && !isSelected && (
                    <span className="text-xs text-amber-600">missed</span>
                  )}
                  {!option.isCorrect && isSelected && (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!hasAnswered && (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedWords.size === 0 || disabled}
            className={cn(
              'px-8 py-3 bg-primary text-white rounded-xl font-semibold',
              'hover:bg-primary/90 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            Check Answers
          </button>
        </div>
      )}

      {/* Feedback Summary */}
      {showFeedback && hasAnswered && (
        <div
          className={cn(
            'p-4 rounded-xl',
            selectedIncorrectCount === 0 && missedCount === 0
              ? 'bg-green-100 text-green-800'
              : selectedIncorrectCount > selectedCorrectCount
                ? 'bg-red-100 text-red-800'
                : 'bg-amber-100 text-amber-800'
          )}
        >
          <p className="font-semibold mb-2">
            {selectedIncorrectCount === 0 && missedCount === 0
              ? 'Perfect!'
              : `${selectedCorrectCount}/${item.correctForms.length} correct`}
          </p>
          {missedCount > 0 && (
            <p className="text-sm">
              You missed {missedCount} word{missedCount > 1 ? 's' : ''} from this root.
            </p>
          )}
          {selectedIncorrectCount > 0 && (
            <p className="text-sm">
              {selectedIncorrectCount} incorrect selection{selectedIncorrectCount > 1 ? 's' : ''}.
            </p>
          )}
        </div>
      )}

      {/* Detailed Feedback - Correct Forms */}
      {hasAnswered && showFeedback && (
        <div className="p-4 bg-muted/30 rounded-xl">
          <p className="text-sm font-medium text-primary mb-3">
            Words from root {item.root}:
          </p>
          <div className="space-y-2">
            {item.correctForms.map((form, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSpeak(form.wordVocalized)}
                    disabled={isSpeaking}
                    className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-primary" />
                  </button>
                  <span className="font-arabic text-lg" dir="rtl">
                    {form.wordVocalized}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">{form.meaning}</span>
                  {form.pattern && (
                    <span className="text-xs text-primary ml-2 font-arabic" dir="rtl">
                      ({form.pattern})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show distractor roots */}
          {item.distractors.some((d) => selectedWords.has(d.word)) && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Words from other roots:
              </p>
              {item.distractors
                .filter((d) => selectedWords.has(d.word))
                .map((d, index) => (
                  <p key={index} className="text-sm">
                    <span className="font-arabic" dir="rtl">{d.wordVocalized}</span>
                    {' '}← root:{' '}
                    <span className="font-arabic text-primary" dir="rtl">{d.actualRoot}</span>
                  </p>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
