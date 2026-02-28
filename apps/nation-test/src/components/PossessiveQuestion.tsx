/**
 * Possessive Pronouns Question Component
 *
 * Tests knowledge of Arabic attached possessive pronouns (الضمائر المتصلة):
 * ـي، ـكَ، ـكِ، ـهُ، ـهَا، ـنَا، ـكُم، ـهُم
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, UserCircle } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { PossessiveItem } from '../data/possessivePronouns';
import { possessivePronounLabels } from '../data/possessivePronouns';

interface PossessiveQuestionProps {
  item: PossessiveItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function PossessiveQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: PossessiveQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<typeof item.distractors>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  useEffect(() => {
    const correctOption = {
      pronoun: item.correctPronoun,
      arabic: item.correctPronounArabic,
      completeWord: item.completeWord,
    };
    const options = [correctOption, ...item.distractors];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id]);

  const handleSelect = (answer: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    const isCorrect = answer === item.correctPronounArabic;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const isCorrect = selectedAnswer === item.correctPronounArabic;
  const pronounInfo = possessivePronounLabels[item.correctPronoun];

  return (
    <div className="space-y-6">
      {/* Type and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
          Possessive Pronouns
        </span>
        <span
          className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-arabic rounded-full"
          dir="rtl"
        >
          الضمائر المتصلة
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Sentence with Blank */}
      <div className="text-center p-6 bg-indigo-50/50 rounded-xl space-y-4">
        <div className="flex items-center justify-center gap-2">
          <UserCircle className="w-5 h-5 text-indigo-500/50" />
          <p className="text-sm text-muted-foreground">
            Choose the correct possessive pronoun:
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-arabic text-foreground leading-relaxed" dir="rtl">
            {item.blankSentence.replace('_____', '___')}
          </p>
          <button
            onClick={() => handleSpeak(item.sentenceVocalized)}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-indigo-100 transition-colors"
            aria-label="Listen to complete sentence"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-indigo-500 animate-pulse' : 'text-indigo-400'
              )}
            />
          </button>
        </div>

        <p className="text-muted-foreground">"{item.translation}"</p>

        {/* Base Word Info */}
        <div className="pt-2 text-sm text-indigo-600">
          <span>Base word: </span>
          <span className="font-arabic text-lg" dir="rtl">{item.baseWordVocalized}</span>
          <span className="mx-2">+</span>
          <span className="text-muted-foreground">pronoun</span>
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.arabic;
          const isThisCorrect = option.arabic === item.correctPronounArabic;
          const optionInfo = possessivePronounLabels[option.pronoun];

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option.arabic)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all relative',
                'hover:border-indigo-400/50 hover:bg-indigo-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                !hasAnswered && isSelected && 'border-indigo-500 bg-indigo-50',
                !hasAnswered && !isSelected && 'border-border',
                hasAnswered && showFeedback && isThisCorrect && 'border-green-500 bg-green-50',
                hasAnswered && showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50',
                hasAnswered && showFeedback && !isThisCorrect && !isSelected && 'opacity-50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-3xl font-arabic" dir="rtl">
                    {option.completeWord}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {optionInfo.meaning} ({optionInfo.person} person)
                  </p>
                </div>
                {hasAnswered && showFeedback && (
                  <span>
                    {isThisCorrect && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {isSelected && !isThisCorrect && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </span>
                )}
              </div>
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
              <span className="font-semibold">Incorrect.</span> The correct answer is:{' '}
              <span className="font-arabic text-xl" dir="rtl">{item.completeWord}</span>
              {' '}(<span className="font-arabic" dir="rtl">{item.correctPronounArabic}</span>)
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-3">
          {/* Complete Sentence */}
          <div className="text-center">
            <p className="text-sm text-indigo-600 mb-2">Complete sentence:</p>
            <p className="text-xl font-arabic text-indigo-800 leading-relaxed" dir="rtl">
              {item.sentenceVocalized}
            </p>
          </div>

          {/* Complete Word */}
          <div className="pt-3 border-t border-indigo-200 text-center">
            <p className="text-sm text-indigo-600 mb-2">Word with pronoun:</p>
            <p className="text-2xl font-arabic text-indigo-800" dir="rtl">
              {item.completeWordVocalized}
            </p>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-indigo-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-indigo-700">Explanation:</strong>{' '}
              {item.explanation}
            </p>
          </div>

          {/* Pronoun Info */}
          <div className="pt-3 border-t border-indigo-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-indigo-700">{pronounInfo.arabic}:</strong>{' '}
              {pronounInfo.meaning} — {pronounInfo.person} person, {pronounInfo.gender}, {pronounInfo.number}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
