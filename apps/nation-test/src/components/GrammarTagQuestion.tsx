/**
 * Grammar Tag Identification Question Component
 *
 * Shows a Quranic ayah with a highlighted word and asks the user
 * to identify its grammatical role from color-coded options.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Check, X } from 'lucide-react';
import type { GrammarTagItem } from '../data/grammarTag';

interface GrammarTagQuestionProps {
  item: GrammarTagItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

interface TagOption {
  tag: string;
  desc: string;
  color: string;
}

export function GrammarTagQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: GrammarTagQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<TagOption[]>([]);

  useEffect(() => {
    const correct: TagOption = {
      tag: item.correctTag,
      desc: item.correctTagDesc,
      color: item.correctTagColor,
    };
    const options = [correct, ...item.distractors];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id]);

  const handleSelect = (tag: string) => {
    if (hasAnswered || disabled) return;
    setSelectedAnswer(tag);
    setHasAnswered(true);
    onAnswer(tag, tag === item.correctTag);
  };

  const isCorrect = selectedAnswer === item.correctTag;

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
          Grammar Tag
        </span>
        <span className="px-2 py-0.5 bg-teal-50 text-teal-500 text-xs rounded-full">
          {item.surahNum}:{item.ayahNum}
        </span>
      </div>

      {/* Ayah with highlighted word */}
      <div className="text-center p-5 bg-teal-50/50 rounded-xl space-y-4">
        <p className="text-sm text-teal-600">
          What is the grammatical role of the highlighted word?
        </p>

        <p className="text-2xl font-arabic text-slate-800 leading-loose" dir="rtl">
          {item.ayahArabic}
        </p>

        {/* Target word */}
        <div className="flex items-center justify-center gap-3">
          <span
            className="text-3xl font-arabic px-4 py-2 rounded-lg border-2 border-teal-400 bg-teal-100/50"
            dir="rtl"
          >
            {item.arabic}
          </span>
        </div>

        {item.meaning && (
          <p className="text-sm text-muted-foreground italic">{item.meaning}</p>
        )}
      </div>

      {/* Color-coded grammar tag options */}
      <div className="grid gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.tag;
          const isThisCorrect = option.tag === item.correctTag;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option.tag)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all',
                'hover:bg-slate-50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                !hasAnswered && !isSelected && 'border-border',
                !hasAnswered && isSelected && 'border-teal-500 bg-teal-50',
                hasAnswered && showFeedback && isThisCorrect && 'border-green-500 bg-green-50',
                hasAnswered && showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50',
                hasAnswered && showFeedback && !isThisCorrect && !isSelected && 'opacity-50'
              )}
            >
              <div className="flex items-center gap-3">
                {/* Color badge */}
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: option.color }}
                />
                <div className="flex-1">
                  <span className="font-mono text-sm text-slate-500">{option.tag}</span>
                  {option.desc && option.desc !== option.tag && (
                    <span className="ml-2 text-base text-slate-700">{option.desc}</span>
                  )}
                </div>
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
              <span className="font-mono">{item.correctTag}</span>
              {item.correctTagDesc && item.correctTagDesc !== item.correctTag && (
                <span> — {item.correctTagDesc}</span>
              )}
            </p>
          )}
        </div>
      )}

      {/* Morphology Breakdown (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200">
          <p className="text-sm text-teal-600 font-medium mb-3">Morphological Breakdown:</p>
          <table className="w-full text-sm">
            <tbody>
              {item.root && (
                <tr className="border-b border-teal-100">
                  <td className="py-1.5 text-slate-500 pr-4">Root</td>
                  <td className="py-1.5 font-arabic text-lg" dir="rtl">{item.root}</td>
                </tr>
              )}
              <tr className="border-b border-teal-100">
                <td className="py-1.5 text-slate-500 pr-4">Lemma</td>
                <td className="py-1.5 font-arabic text-lg" dir="rtl">{item.lemma}</td>
              </tr>
              <tr className="border-b border-teal-100">
                <td className="py-1.5 text-slate-500 pr-4">POS</td>
                <td className="py-1.5">{item.pos}</td>
              </tr>
              {item.verbForm && (
                <tr className="border-b border-teal-100">
                  <td className="py-1.5 text-slate-500 pr-4">Verb Form</td>
                  <td className="py-1.5">{item.verbForm}</td>
                </tr>
              )}
              <tr>
                <td className="py-1.5 text-slate-500 pr-4">Grammar</td>
                <td className="py-1.5">
                  <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ backgroundColor: item.correctTagColor + '22', color: item.correctTagColor }}>
                    {item.correctTag}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {item.ayahEnglish && (
            <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-teal-200 italic">
              {item.ayahEnglish}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
