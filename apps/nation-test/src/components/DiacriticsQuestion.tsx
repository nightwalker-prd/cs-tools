/**
 * Diacritics Question Component
 *
 * Tests the ability to correctly vocalize (add tashkeel to)
 * Arabic words based on context and grammar rules.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { DiacriticsItem } from '../data/diacriticsTest';
import { partOfSpeechLabels } from '../data/diacriticsTest';

interface DiacriticsQuestionProps {
  item: DiacriticsItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function DiacriticsQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: DiacriticsQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const allOptions = [item.wordVocalized, ...item.distractors];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id, item.wordVocalized, item.distractors]);

  const handleSelect = (option: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(option);
    setHasAnswered(true);
    const isCorrect = option === item.wordVocalized;
    onAnswer(option, isCorrect);
  };

  const handleSpeakWord = () => {
    speak(item.wordVocalized);
  };

  const handleSpeakSentence = () => {
    speak(item.contextSentenceVocalized);
  };

  const isCorrect = selectedAnswer === item.wordVocalized;

  // Get part of speech label (handle unknown types)
  const posLabel = partOfSpeechLabels[item.partOfSpeech] || {
    english: item.partOfSpeech,
    arabic: item.partOfSpeech,
  };

  return (
    <div className="space-y-6">
      {/* Part of Speech and Level Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {posLabel.english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {posLabel.arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Word without diacritics */}
      <div className="text-center p-6 bg-muted/30 rounded-xl space-y-3">
        <p className="text-sm text-muted-foreground mb-2">
          Add the correct diacritics (تشكيل):
        </p>

        <h2 className="text-5xl font-arabic text-primary" dir="rtl">
          {item.word}
        </h2>

        <p className="text-muted-foreground italic">({item.meaning})</p>
      </div>

      {/* Context Sentence */}
      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-sm font-medium text-primary mb-2">Context:</p>
        <p className="text-xl font-arabic text-center" dir="rtl">
          {item.contextSentence.split(item.word).map((part, index, arr) => (
            <span key={index}>
              {part}
              {index < arr.length - 1 && (
                <span className="underline decoration-2 decoration-primary/50 underline-offset-4 px-1">
                  {item.word}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.wordVocalized;

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
              <span className="text-2xl font-arabic" dir="rtl">
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
              vocalization is:{' '}
              <strong className="font-arabic text-xl" dir="rtl">
                {item.wordVocalized}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Correct Answer with Audio and Grammar Rule (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
          {/* Vocalized word */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <p className="text-3xl font-arabic text-primary" dir="rtl">
                {item.wordVocalized}
              </p>
              <button
                onClick={handleSpeakWord}
                disabled={isSpeaking}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Listen to word"
              >
                <Volume2
                  className={cn(
                    'w-5 h-5',
                    isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Full sentence vocalized */}
          <div className="pt-3 border-t border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-primary">Full Sentence:</p>
              <button
                onClick={handleSpeakSentence}
                disabled={isSpeaking}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Listen to sentence"
              >
                <Volume2
                  className={cn(
                    'w-4 h-4',
                    isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                  )}
                />
              </button>
            </div>
            <p className="text-xl font-arabic text-center" dir="rtl">
              {item.contextSentenceVocalized}
            </p>
          </div>

          {/* Grammar Rule */}
          <div className="pt-3 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Grammar Rule:</strong>{' '}
              {item.grammarRule}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
