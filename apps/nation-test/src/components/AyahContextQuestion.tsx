/**
 * Ayah Context Cloze Question Component
 *
 * Shows a real Quranic ayah with one content word's English
 * translation blanked out. Bilingual display with Arabic above
 * and English cloze below.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Check, X } from 'lucide-react';
import type { AyahContextItem } from '../data/ayahContext';

interface AyahContextQuestionProps {
  item: AyahContextItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

function makeBlankText(ayahEnglish: string, target: string, blankPos: number): string {
  if (blankPos >= 0) {
    return (
      ayahEnglish.slice(0, blankPos) +
      '_____' +
      ayahEnglish.slice(blankPos + target.length)
    );
  }
  // Fallback: replace first occurrence
  const idx = ayahEnglish.toLowerCase().indexOf(target.toLowerCase());
  if (idx >= 0) {
    return ayahEnglish.slice(0, idx) + '_____' + ayahEnglish.slice(idx + target.length);
  }
  return ayahEnglish + ' [_____]';
}

export function AyahContextQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: AyahContextQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const options = [item.targetTranslation, ...item.distractors];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id]);

  const handleSelect = (answer: string) => {
    if (hasAnswered || disabled) return;
    setSelectedAnswer(answer);
    setHasAnswered(true);
    onAnswer(answer, answer === item.targetTranslation);
  };

  const isCorrect = selectedAnswer === item.targetTranslation;
  const blankText = makeBlankText(item.ayahEnglish, item.targetTranslation, item.blankPosition);

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm font-medium rounded-full">
          Ayah Context
        </span>
        <span className="px-2 py-0.5 bg-sky-50 text-sky-500 text-xs rounded-full">
          {item.surahNum}:{item.ayahNum}
        </span>
      </div>

      {/* Arabic Ayah */}
      <div className="text-center p-5 bg-sky-50/50 rounded-xl space-y-4">
        <p className="text-sm text-sky-600 mb-2">Fill in the blank in the English translation:</p>

        <p className="text-2xl font-arabic text-sky-900 leading-loose" dir="rtl">
          {item.ayahArabic}
        </p>

        {/* English with blank */}
        <p className="text-base text-slate-700 leading-relaxed italic">
          {blankText}
        </p>
      </div>

      {/* Target word hint */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Target word: <span className="font-arabic text-lg text-sky-700" dir="rtl">{item.arabic}</span>
          {item.transliteration && (
            <span className="text-xs ml-2 italic">({item.transliteration})</span>
          )}
        </p>
      </div>

      {/* Answer Options */}
      <div className="grid gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.targetTranslation;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all',
                'hover:border-sky-400/50 hover:bg-sky-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                !hasAnswered && isSelected && 'border-sky-500 bg-sky-50',
                !hasAnswered && !isSelected && 'border-border',
                hasAnswered && showFeedback && isThisCorrect && 'border-green-500 bg-green-50',
                hasAnswered && showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50',
                hasAnswered && showFeedback && !isThisCorrect && !isSelected && 'opacity-50'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{option}</span>
                {hasAnswered && showFeedback && (
                  <span>
                    {isThisCorrect && <Check className="w-5 h-5 text-green-600" />}
                    {isSelected && !isThisCorrect && <X className="w-5 h-5 text-red-600" />}
                  </span>
                )}
              </div>
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
              <span className="font-semibold">{item.targetTranslation}</span>
            </p>
          )}
        </div>
      )}

      {/* Full translation feedback */}
      {hasAnswered && (
        <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-200 space-y-2">
          <p className="text-sm text-sky-600 font-medium">Full Translation:</p>
          <p className="text-base leading-relaxed italic">{item.ayahEnglish}</p>
          <p className="text-xs text-sky-500">
            Surah {item.surahNum}, Ayah {item.ayahNum} — Word {item.wordNum}
          </p>
        </div>
      )}
    </div>
  );
}
