/**
 * Question Words Question Component
 *
 * Tests knowledge of Arabic interrogative words (أدوات الاستفهام):
 * من، ما، ماذا، أين، متى، كيف، لماذا، كم، أي، هل
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, HelpCircle } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { QuestionWordItem } from '../data/questionWords';
import { questionWordLabels } from '../data/questionWords';

interface QuestionWordsQuestionProps {
  item: QuestionWordItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function QuestionWordsQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: QuestionWordsQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<typeof item.distractors>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  useEffect(() => {
    const correctOption = {
      word: item.correctWord,
      arabic: item.correctWordArabic,
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

    const isCorrect = answer === item.correctWordArabic;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const isCorrect = selectedAnswer === item.correctWordArabic;
  const wordInfo = questionWordLabels[item.correctWord];

  return (
    <div className="space-y-6">
      {/* Type and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-medium rounded-full">
          Question Words
        </span>
        <span
          className="px-3 py-1 bg-cyan-50 text-cyan-600 text-sm font-arabic rounded-full"
          dir="rtl"
        >
          أدوات الاستفهام
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Question with Blank */}
      <div className="text-center p-6 bg-cyan-50/50 rounded-xl space-y-4">
        <div className="flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-500/50" />
          <p className="text-sm text-muted-foreground">
            Choose the correct question word:
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-arabic text-foreground leading-relaxed" dir="rtl">
            {item.blankQuestion.replace('_____', '______')}
          </p>
          <button
            onClick={() => handleSpeak(item.questionVocalized)}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-cyan-100 transition-colors"
            aria-label="Listen to complete question"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-cyan-500 animate-pulse' : 'text-cyan-400'
              )}
            />
          </button>
        </div>

        <p className="text-muted-foreground">"{item.translation}"</p>

        <p className="text-sm text-cyan-600 bg-cyan-100/50 px-3 py-1 rounded-full inline-block">
          Expected answer: {item.expectedAnswerType}
        </p>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.arabic;
          const isThisCorrect = option.arabic === item.correctWordArabic;
          const optionInfo = questionWordLabels[option.word];

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option.arabic)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all relative',
                'hover:border-cyan-400/50 hover:bg-cyan-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                // Before answering - selected state
                !hasAnswered && isSelected && 'border-cyan-500 bg-cyan-50',
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
                  <p className="text-sm text-muted-foreground mt-1">
                    {optionInfo.meaning}
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
              <span className="font-semibold">Incorrect.</span> The correct word is:{' '}
              <span className="font-arabic text-xl" dir="rtl">{item.correctWordArabic}</span>{' '}
              ({questionWordLabels[item.correctWord].meaning})
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-200 space-y-3">
          {/* Complete Question */}
          <div className="text-center">
            <p className="text-sm text-cyan-600 mb-2">Complete question:</p>
            <p className="text-xl font-arabic text-cyan-800 leading-relaxed" dir="rtl">
              {item.questionVocalized}
            </p>
          </div>

          {/* Word Info */}
          <div className="pt-3 border-t border-cyan-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-cyan-700">{wordInfo.arabic}:</strong>{' '}
              {wordInfo.meaning} — asks about: {wordInfo.asksAbout}
            </p>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-cyan-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-cyan-700">Usage:</strong>{' '}
              {item.explanation}
            </p>
          </div>

          {/* Example Answer */}
          {item.exampleAnswer && (
            <div className="pt-3 border-t border-cyan-200">
              <p className="text-sm text-muted-foreground">
                <strong className="text-cyan-700">Example answer:</strong>{' '}
                <span className="font-arabic" dir="rtl">{item.exampleAnswer}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
