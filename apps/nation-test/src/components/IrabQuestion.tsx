/**
 * I'rab (Case Endings) Question Component
 *
 * Tests understanding of Arabic grammatical case endings
 * in context.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { IrabItem } from '../data/irabTest';
import { roleLabels, caseLabels } from '../data/irabTest';

interface IrabQuestionProps {
  item: IrabItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function IrabQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: IrabQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const allOptions = [item.correctAnswer, ...item.distractors];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id, item.correctAnswer, item.distractors]);

  const handleSelect = (option: string) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(option);
    setHasAnswered(true);
    const isCorrect = option === item.correctAnswer;
    onAnswer(option, isCorrect);
  };

  const handleSpeakSentence = () => {
    speak(item.sentenceVocalized);
  };

  const isCorrect = selectedAnswer === item.correctAnswer;

  // Highlight the target word in the sentence
  const renderSentenceWithHighlight = (sentence: string) => {
    const parts = sentence.split(item.targetWord);
    return parts.map((part, index, arr) => (
      <span key={index}>
        {part}
        {index < arr.length - 1 && (
          <span className="bg-primary/20 px-1 rounded underline decoration-2 decoration-primary underline-offset-4">
            {item.targetWord}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Role and Case Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {roleLabels[item.grammaticalRole].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {roleLabels[item.grammaticalRole].arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Sentence with highlighted word */}
      <div className="text-center p-6 bg-muted/30 rounded-xl space-y-3">
        <p className="text-sm text-muted-foreground mb-2">
          Choose the correct case ending for the highlighted word:
        </p>

        <h2 className="text-3xl font-arabic text-primary leading-relaxed" dir="rtl">
          {renderSentenceWithHighlight(item.sentence)}
        </h2>

        <p className="text-muted-foreground italic">{item.translation}</p>
      </div>

      {/* Case Ending Info */}
      <div className="flex justify-center gap-4 text-sm">
        <div className="text-center px-3 py-2 bg-green-50 rounded-lg border border-green-200">
          <div className="font-semibold text-green-700">Nominative</div>
          <div className="font-arabic text-green-600">مرفوع (ُ/ٌ)</div>
        </div>
        <div className="text-center px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
          <div className="font-semibold text-amber-700">Accusative</div>
          <div className="font-arabic text-amber-600">منصوب (َ/ً)</div>
        </div>
        <div className="text-center px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="font-semibold text-blue-700">Genitive</div>
          <div className="font-arabic text-blue-600">مجرور (ِ/ٍ)</div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-3 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === item.correctAnswer;

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
              form is:{' '}
              <strong className="font-arabic text-xl" dir="rtl">
                {item.correctAnswer}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Full sentence and explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
          {/* Full vocalized sentence */}
          <div>
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
                    'w-5 h-5',
                    isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                  )}
                />
              </button>
            </div>
            <p className="text-2xl font-arabic text-center" dir="rtl">
              {item.sentenceVocalized}
            </p>
          </div>

          {/* Case info */}
          <div className="pt-3 border-t border-primary/20 flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Case</p>
              <p className="font-semibold">{caseLabels[item.caseEnding].english}</p>
              <p className="font-arabic text-sm" dir="rtl">
                {caseLabels[item.caseEnding].arabic}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="font-semibold">{roleLabels[item.grammaticalRole].english}</p>
              <p className="font-arabic text-sm" dir="rtl">
                {roleLabels[item.grammaticalRole].arabic}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Rule:</strong> {item.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
