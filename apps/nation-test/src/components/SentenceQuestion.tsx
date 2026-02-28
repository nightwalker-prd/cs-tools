/**
 * Sentence Comprehension Question Component
 *
 * Tests vocabulary and grammar understanding in sentence context.
 * Based on Nation's principle of testing words in meaningful contexts.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, BookOpen, Info } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import { shuffle } from '@arabtools/core/utils';
import type { SentenceTestItem } from '../data/sentences';
import { sentenceTypeLabels } from '../data/sentences';

interface SentenceQuestionProps {
  item: SentenceTestItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function SentenceQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: SentenceQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showGrammarNote, setShowGrammarNote] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options on mount and when item changes
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const options = [item.correctAnswer, ...item.distractors];
    setShuffledOptions(shuffle(options));
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowGrammarNote(false);
  }, [item.id, item.correctAnswer, item.distractors]);

  const handleSelect = (answer: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    const isCorrect = answer === item.correctAnswer;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = () => {
    speak(item.sentenceVocalized);
  };

  const isCorrect = selectedAnswer === item.correctAnswer;


  return (
    <div className="space-y-6">
      {/* Sentence Type Badge */}
      <div className="flex items-center justify-center gap-2">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {sentenceTypeLabels[item.sentenceType].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {sentenceTypeLabels[item.sentenceType].arabic}
        </span>
      </div>

      {/* Arabic Sentence */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <p className="text-3xl font-arabic leading-relaxed text-primary" dir="rtl">
            {item.sentence.split(item.targetWord).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="underline decoration-accent decoration-2 underline-offset-4 font-semibold">
                    {item.targetWord}
                  </span>
                )}
              </span>
            ))}
          </p>
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors flex-shrink-0"
            aria-label="Listen to pronunciation"
          >
            <Volume2
              className={cn(
                'w-6 h-6',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>

        {/* Translation (revealed after answering or with feedback) */}
        {(showFeedback || hasAnswered) && (
          <p className="text-muted-foreground italic">
            "{item.translation}"
          </p>
        )}
      </div>

      {/* Question */}
      <div className="text-center py-4 border-y border-border">
        <p className="text-lg font-medium flex items-center justify-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {item.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.correctAnswer;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all',
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
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                    'border-2',
                    hasAnswered && showFeedback && isThisCorrect
                      ? 'border-green-500 bg-green-100 text-green-700'
                      : hasAnswered && showFeedback && isSelected && !isThisCorrect
                        ? 'border-red-500 bg-red-100 text-red-700'
                        : 'border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option}</span>
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
              <span className="font-semibold">Not quite.</span> The correct answer is:{' '}
              <strong>{item.correctAnswer}</strong>
            </p>
          )}
        </div>
      )}

      {/* Grammar Note (if available) */}
      {item.grammarNote && hasAnswered && (
        <div className="mt-4">
          <button
            onClick={() => setShowGrammarNote(!showGrammarNote)}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Info className="w-4 h-4" />
            {showGrammarNote ? 'Hide' : 'Show'} Grammar Note
          </button>

          {showGrammarNote && (
            <div className="mt-2 p-4 bg-muted/50 rounded-lg text-sm">
              <p className="text-muted-foreground">{item.grammarNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
