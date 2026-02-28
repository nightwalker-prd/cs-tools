/**
 * Spelling/Orthography Question Component
 *
 * Tests knowledge of Arabic spelling rules:
 * ألف مقصورة، تاء مربوطة، همزة الوصل/القطع
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, SpellCheck } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { SpellingItem } from '../data/spellingOrthography';
import { spellingRuleLabels } from '../data/spellingOrthography';

interface SpellingQuestionProps {
  item: SpellingItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function SpellingQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: SpellingQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  useEffect(() => {
    const options = [item.correctWord, ...item.incorrectSpellings];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id]);

  const handleSelect = (answer: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    const isCorrect = answer === item.correctWord;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const isCorrect = selectedAnswer === item.correctWord;
  const ruleInfo = spellingRuleLabels[item.spellingRule];

  return (
    <div className="space-y-6">
      {/* Type and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
          Spelling
        </span>
        <span
          className="px-3 py-1 bg-amber-50 text-amber-600 text-sm font-arabic rounded-full"
          dir="rtl"
        >
          الإملاء
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Prompt */}
      <div className="text-center p-6 bg-amber-50/50 rounded-xl space-y-4">
        <div className="flex items-center justify-center gap-2">
          <SpellCheck className="w-5 h-5 text-amber-500/50" />
          <p className="text-sm text-muted-foreground">
            Choose the correct spelling:
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className="text-lg text-amber-700 font-medium">
            "{item.meaning}"
          </p>
          <button
            onClick={() => handleSpeak(item.correctWordVocalized)}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-amber-100 transition-colors"
            aria-label="Listen to pronunciation"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-amber-500 animate-pulse' : 'text-amber-400'
              )}
            />
          </button>
        </div>

        {/* Rule Badge */}
        <div className="pt-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-arabic" dir="rtl">
            {ruleInfo.arabic}
          </span>
        </div>

        {/* Context Sentence (if available) */}
        {item.contextSentence && (
          <div className="pt-3 text-sm text-muted-foreground">
            <span className="font-arabic" dir="rtl">{item.contextSentence}</span>
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.correctWord;
          const isIncorrect = item.incorrectSpellings.includes(option);

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all relative',
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
                <div className="flex-1">
                  <span className="text-3xl font-arabic" dir="rtl">
                    {option}
                  </span>
                  {hasAnswered && showFeedback && isIncorrect && (
                    <p className="text-xs text-red-500 mt-1">
                      ✗ Incorrect spelling
                    </p>
                  )}
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
              <span className="font-semibold">Incorrect.</span> The correct spelling is:{' '}
              <span className="font-arabic text-xl" dir="rtl">{item.correctWord}</span>
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-3">
          {/* Correct Word with Vocalization */}
          <div className="text-center">
            <p className="text-sm text-amber-600 mb-2">Correct spelling with diacritics:</p>
            <p className="text-2xl font-arabic text-amber-800" dir="rtl">
              {item.correctWordVocalized}
            </p>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-amber-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-amber-700">Explanation:</strong>{' '}
              {item.explanation}
            </p>
          </div>

          {/* Rule Description */}
          <div className="pt-3 border-t border-amber-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-amber-700">{ruleInfo.english}:</strong>{' '}
              {item.ruleDescription}
            </p>
          </div>

          {/* Rule Info */}
          <div className="pt-3 border-t border-amber-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-amber-700">Rule Pattern:</strong>{' '}
              {ruleInfo.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
