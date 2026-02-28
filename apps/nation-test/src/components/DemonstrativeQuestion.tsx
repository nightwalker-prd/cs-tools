/**
 * Demonstratives Question Component
 *
 * Tests knowledge of Arabic demonstrative pronouns (أسماء الإشارة):
 * هذا، هذه، ذلك، تلك، هؤلاء، أولئك
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, Pointer } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { DemonstrativeItem } from '../data/demonstratives';
import { demonstrativeLabels } from '../data/demonstratives';

interface DemonstrativeQuestionProps {
  item: DemonstrativeItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function DemonstrativeQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: DemonstrativeQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<typeof item.distractors>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  useEffect(() => {
    const correctOption = {
      demonstrative: item.correctDemonstrative,
      arabic: item.correctDemonstrativeArabic,
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

    const isCorrect = answer === item.correctDemonstrativeArabic;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const isCorrect = selectedAnswer === item.correctDemonstrativeArabic;
  const demonstrativeInfo = demonstrativeLabels[item.correctDemonstrative];

  return (
    <div className="space-y-6">
      {/* Type and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-pink-100 text-pink-700 text-sm font-medium rounded-full">
          Demonstratives
        </span>
        <span
          className="px-3 py-1 bg-pink-50 text-pink-600 text-sm font-arabic rounded-full"
          dir="rtl"
        >
          أسماء الإشارة
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Sentence with Blank */}
      <div className="text-center p-6 bg-pink-50/50 rounded-xl space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Pointer className="w-5 h-5 text-pink-500/50" />
          <p className="text-sm text-muted-foreground">
            Choose the correct demonstrative:
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-arabic text-foreground leading-relaxed" dir="rtl">
            {item.blankSentence.replace('_____', '______')}
          </p>
          <button
            onClick={() => handleSpeak(item.sentenceVocalized)}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-pink-100 transition-colors"
            aria-label="Listen to complete sentence"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-pink-500 animate-pulse' : 'text-pink-400'
              )}
            />
          </button>
        </div>

        <p className="text-muted-foreground">"{item.translation}"</p>

        {/* Referent Info */}
        <div className="pt-2 flex items-center justify-center gap-4 text-sm">
          <span className={cn(
            'px-2 py-1 rounded-full',
            item.distance === 'near' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
          )}>
            {item.distance === 'near' ? '📍 Near' : '🔭 Far'}
          </span>
          <span className="text-pink-600">
            <span className="font-arabic" dir="rtl">{item.referent}</span>
            <span className="mx-2">→</span>
            <span>{item.referentGender} {item.referentNumber}</span>
          </span>
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.arabic;
          const isThisCorrect = option.arabic === item.correctDemonstrativeArabic;
          const optionInfo = demonstrativeLabels[option.demonstrative];

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option.arabic)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all relative',
                'hover:border-pink-400/50 hover:bg-pink-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                !hasAnswered && isSelected && 'border-pink-500 bg-pink-50',
                !hasAnswered && !isSelected && 'border-border',
                hasAnswered && showFeedback && isThisCorrect && 'border-green-500 bg-green-50',
                hasAnswered && showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50',
                hasAnswered && showFeedback && !isThisCorrect && !isSelected && 'opacity-50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-3xl font-arabic" dir="rtl">
                    {option.arabic}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {optionInfo.distance} • {optionInfo.gender} {optionInfo.number}
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
              <span className="font-arabic text-xl" dir="rtl">{item.correctDemonstrativeArabic}</span>
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-pink-50/50 rounded-xl border border-pink-200 space-y-3">
          {/* Complete Sentence */}
          <div className="text-center">
            <p className="text-sm text-pink-600 mb-2">Complete sentence:</p>
            <p className="text-xl font-arabic text-pink-800 leading-relaxed" dir="rtl">
              {item.sentenceVocalized}
            </p>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-pink-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-pink-700">Explanation:</strong>{' '}
              {item.explanation}
            </p>
          </div>

          {/* Demonstrative Info */}
          <div className="pt-3 border-t border-pink-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-pink-700">{demonstrativeInfo.arabic}:</strong>{' '}
              Used for {demonstrativeInfo.distance} {demonstrativeInfo.gender} {demonstrativeInfo.number} referents.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
