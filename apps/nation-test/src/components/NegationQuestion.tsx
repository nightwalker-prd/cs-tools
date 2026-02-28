/**
 * Negation Patterns Question Component
 *
 * Tests knowledge of Arabic negation particles:
 * لا، ما، لم، لن، ليس، لمّا
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, Ban } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { NegationItem } from '../data/negationPatterns';
import { negationParticleLabels } from '../data/negationPatterns';

interface NegationQuestionProps {
  item: NegationItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function NegationQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: NegationQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<typeof item.distractors>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  useEffect(() => {
    const correctOption = {
      particle: item.correctParticle,
      arabic: item.correctParticleArabic,
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

    const isCorrect = answer === item.correctParticleArabic;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const isCorrect = selectedAnswer === item.correctParticleArabic;
  const particleInfo = negationParticleLabels[item.correctParticle];

  return (
    <div className="space-y-6">
      {/* Type and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
          Negation Patterns
        </span>
        <span
          className="px-3 py-1 bg-red-50 text-red-600 text-sm font-arabic rounded-full"
          dir="rtl"
        >
          أدوات النفي
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Sentence with Blank */}
      <div className="text-center p-6 bg-red-50/50 rounded-xl space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Ban className="w-5 h-5 text-red-500/50" />
          <p className="text-sm text-muted-foreground">
            Choose the correct negation particle:
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-arabic text-foreground leading-relaxed" dir="rtl">
            {item.blankSentence.replace('_____', '______')}
          </p>
          <button
            onClick={() => handleSpeak(item.sentenceVocalized)}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-red-100 transition-colors"
            aria-label="Listen to complete sentence"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-red-500 animate-pulse' : 'text-red-400'
              )}
            />
          </button>
        </div>

        <p className="text-muted-foreground">"{item.translation}"</p>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.arabic;
          const isThisCorrect = option.arabic === item.correctParticleArabic;
          const optionInfo = negationParticleLabels[option.particle];

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option.arabic)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all relative',
                'hover:border-red-400/50 hover:bg-red-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                // Before answering - selected state
                !hasAnswered && isSelected && 'border-red-500 bg-red-50',
                !hasAnswered && !isSelected && 'border-border',
                // After answering with feedback
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
                    {optionInfo.usage.split(',')[0]}
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
              <span className="font-arabic text-xl" dir="rtl">{item.correctParticleArabic}</span>
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 space-y-3">
          {/* Complete Sentence */}
          <div className="text-center">
            <p className="text-sm text-red-600 mb-2">Complete sentence:</p>
            <p className="text-xl font-arabic text-red-800 leading-relaxed" dir="rtl">
              {item.sentenceVocalized}
            </p>
          </div>

          {/* Grammar Rule */}
          <div className="pt-3 border-t border-red-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-red-700">Grammar Rule:</strong>{' '}
              {item.grammarRule}
            </p>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-red-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-red-700">Explanation:</strong>{' '}
              {item.explanation}
            </p>
          </div>

          {/* Particle Usage */}
          <div className="pt-3 border-t border-red-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-red-700">{particleInfo.arabic}:</strong>{' '}
              {particleInfo.usage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
