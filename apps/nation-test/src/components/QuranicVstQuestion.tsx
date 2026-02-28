/**
 * Quranic Frequency VST Question Component
 *
 * Multiple choice vocabulary test using real Quranic lemmas with
 * pre-computed distractors. Shows ayah context in feedback panel.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, BookOpen } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { QuranicVstItem } from '../data/quranicVst';

interface QuranicVstQuestionProps {
  item: QuranicVstItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function QuranicVstQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: QuranicVstQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    const options = [item.meaning, ...item.distractors];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id]);

  const handleSelect = (answer: string) => {
    if (hasAnswered || disabled) return;
    setSelectedAnswer(answer);
    setHasAnswered(true);
    onAnswer(answer, answer === item.meaning);
  };

  const isCorrect = selectedAnswer === item.meaning;

  return (
    <div className="space-y-6">
      {/* Tier & Rank Badge */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
          Quranic VST
        </span>
        <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-mono rounded-full">
          #{item.rank} · {item.count}×
        </span>
        {item.pos !== 'N' && (
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
            {item.pos === 'V' ? 'Verb' : 'Particle'}
          </span>
        )}
      </div>

      {/* Word Display */}
      <div className="text-center p-6 bg-amber-50/50 rounded-xl space-y-3">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600/50" />
          <p className="text-sm text-muted-foreground">
            What does this Quranic word mean?
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <h2 className="text-5xl font-arabic text-amber-800" dir="rtl">
            {item.lemma}
          </h2>
          <button
            onClick={() => speak(item.lemma)}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-amber-100 transition-colors"
            aria-label="Listen"
          >
            <Volume2
              className={cn(
                'w-6 h-6',
                isSpeaking ? 'text-amber-500 animate-pulse' : 'text-amber-400'
              )}
            />
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          {item.root && (
            <span>
              Root: <span className="font-arabic text-amber-600" dir="rtl">{item.root}</span>
            </span>
          )}
          {item.transliteration && (
            <span className="italic">{item.transliteration}</span>
          )}
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.meaning;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all',
                'hover:border-amber-400/50 hover:bg-amber-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                !hasAnswered && isSelected && 'border-amber-500 bg-amber-50',
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
              <span className="font-semibold">Incorrect.</span> The correct answer is:{' '}
              <span className="font-semibold">{item.meaning}</span>
            </p>
          )}
        </div>
      )}

      {/* Ayah Context Feedback */}
      {hasAnswered && (item.ayahArabic || item.contextMatch) && (
        <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-3">
          {/* Context Snippet */}
          {item.contextMatch && (
            <div className="text-center">
              <p className="text-sm text-amber-600 mb-1">Context in English Translation:</p>
              <p className="text-base leading-relaxed">
                {item.contextBefore}
                <span className="font-semibold text-amber-700">{item.contextMatch}</span>
                {item.contextAfter}
              </p>
            </div>
          )}

          {/* Full Ayah */}
          {item.ayahArabic && (
            <div className="text-center pt-3 border-t border-amber-200">
              <p className="text-xl font-arabic text-amber-800 leading-relaxed" dir="rtl">
                {item.ayahArabic}
              </p>
              {item.ayahEnglish && (
                <p className="text-sm text-muted-foreground mt-2 italic">
                  {item.ayahEnglish}
                </p>
              )}
              <p className="text-xs text-amber-500 mt-1">
                Surah {item.surahNum}:{item.ayahNum}
              </p>
            </div>
          )}

          {/* Etymology */}
          {item.etymology && (
            <div className="pt-3 border-t border-amber-200">
              <p className="text-sm text-muted-foreground">
                <strong className="text-amber-700">Etymology:</strong> {item.etymology}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
