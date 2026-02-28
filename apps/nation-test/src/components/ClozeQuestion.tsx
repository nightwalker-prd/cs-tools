/**
 * Cloze Question Component
 *
 * Fill-in-the-blank test that assesses vocabulary,
 * grammar, and collocation knowledge in context.
 * Supports both multiple choice and typed answers.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Lightbulb } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { ClozeItem } from '../data/clozeTest';
import { clozeTypeLabels } from '../data/clozeTest';

interface ClozeQuestionProps {
  item: ClozeItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function ClozeQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: ClozeQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const allOptions = [item.correctAnswer, ...item.distractors];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowHint(false);
  }, [item.id, item.correctAnswer, item.distractors]);

  const handleSelect = (option: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(option);
    setHasAnswered(true);

    // Check if correct (including acceptable alternatives)
    const isCorrect =
      option === item.correctAnswer ||
      (item.acceptableAnswers?.includes(option) ?? false);
    onAnswer(option, isCorrect);
  };

  const handleSpeak = () => {
    speak(item.sentenceVocalized);
  };

  const isCorrect =
    selectedAnswer === item.correctAnswer ||
    (item.acceptableAnswers?.includes(selectedAnswer ?? '') ?? false);

  // Render sentence with blank highlighted
  const renderSentenceWithBlank = () => {
    return (
      <span className="text-3xl font-arabic leading-relaxed" dir="rtl">
        {item.sentence.split('_____').map((part, index, arr) => (
          <span key={index}>
            {part}
            {index < arr.length - 1 && (
              <span className="inline-block min-w-[80px] border-b-2 border-primary mx-1 text-center">
                {hasAnswered && showFeedback ? (
                  <span
                    className={cn(
                      'font-semibold',
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {selectedAnswer}
                  </span>
                ) : (
                  <span className="text-muted-foreground/30">____</span>
                )}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Type and Level Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {clozeTypeLabels[item.clozeType].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {clozeTypeLabels[item.clozeType].arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Sentence with Blank */}
      <div className="text-center p-6 bg-muted/30 rounded-xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          {renderSentenceWithBlank()}
          <button
            onClick={handleSpeak}
            disabled={isSpeaking || !hasAnswered}
            className={cn(
              'p-2 rounded-full transition-colors',
              hasAnswered
                ? 'hover:bg-primary/10'
                : 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Listen to sentence"
            title={hasAnswered ? 'Listen to sentence' : 'Available after answering'}
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>

        {/* Translation */}
        <p className="text-muted-foreground italic">{item.translation}</p>
      </div>

      {/* Hint (if available) */}
      {item.hint && !hasAnswered && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
        </div>
      )}

      {showHint && item.hint && !hasAnswered && (
        <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Hint:</strong> {item.hint}
          </p>
        </div>
      )}

      {/* Instruction */}
      <p className="text-center text-sm text-muted-foreground">
        Choose the word that fits:
      </p>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect =
            option === item.correctAnswer ||
            (item.acceptableAnswers?.includes(option) ?? false);

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
              <span className="text-xl font-arabic" dir="rtl">
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
              answer is:{' '}
              <strong className="font-arabic text-xl" dir="rtl">
                {item.correctAnswerVocalized}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Complete Sentence (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary">Complete Sentence:</p>
            <button
              onClick={handleSpeak}
              disabled={isSpeaking}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Listen to sentence"
            >
              <Volume2
                className={cn(
                  'w-5 h-5',
                  isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                )}
              />
            </button>
          </div>

          <p className="text-2xl font-arabic text-primary text-center" dir="rtl">
            {item.sentenceVocalized}
          </p>

          <p className="text-sm text-muted-foreground text-center italic">
            {item.translation.replace('_____', item.correctAnswer)}
          </p>

          {item.acceptableAnswers && item.acceptableAnswers.length > 0 && (
            <div className="pt-3 border-t border-primary/20">
              <p className="text-xs text-muted-foreground">
                <strong>Also acceptable:</strong>{' '}
                <span className="font-arabic" dir="rtl">
                  {item.acceptableAnswers.join('، ')}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
