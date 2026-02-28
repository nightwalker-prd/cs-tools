/**
 * Preposition Usage Question Component
 *
 * Tests knowledge of Arabic prepositions and their correct usage
 * with verbs, nouns, and in fixed expressions.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, Link } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { PrepositionItem } from '../data/prepositionUsage';
import { prepositionLabels } from '../data/prepositionUsage';

interface PrepositionQuestionProps {
  item: PrepositionItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function PrepositionQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: PrepositionQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<typeof item.distractors>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  useEffect(() => {
    const correctOption = {
      preposition: item.correctPreposition,
      arabic: item.correctPrepositionArabic,
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

    const isCorrect = answer === item.correctPrepositionArabic;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const isCorrect = selectedAnswer === item.correctPrepositionArabic;
  const prepInfo = prepositionLabels[item.correctPreposition];

  const collocationTypeLabels: Record<string, string> = {
    verb_prep: 'Verb + Preposition',
    noun_prep: 'Noun + Preposition',
    adj_prep: 'Adjective + Preposition',
    fixed_expression: 'Fixed Expression',
  };

  return (
    <div className="space-y-6">
      {/* Type and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">
          Preposition Usage
        </span>
        <span
          className="px-3 py-1 bg-violet-50 text-violet-600 text-sm font-arabic rounded-full"
          dir="rtl"
        >
          حروف الجر
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
        <span className="px-3 py-1 bg-violet-50 text-violet-600 text-xs rounded-full">
          {collocationTypeLabels[item.collocationType]}
        </span>
      </div>

      {/* Sentence with Blank */}
      <div className="text-center p-6 bg-violet-50/50 rounded-xl space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Link className="w-5 h-5 text-violet-500/50" />
          <p className="text-sm text-muted-foreground">
            Choose the correct preposition:
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-arabic text-foreground leading-relaxed" dir="rtl">
            {item.blankSentence.replace('_____', '______')}
          </p>
          <button
            onClick={() => handleSpeak(item.sentenceVocalized)}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-violet-100 transition-colors"
            aria-label="Listen to complete sentence"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-violet-500 animate-pulse' : 'text-violet-400'
              )}
            />
          </button>
        </div>

        <p className="text-muted-foreground">"{item.translation}"</p>

        {item.verb && (
          <p className="text-sm text-violet-600">
            Verb: <span className="font-arabic" dir="rtl">{item.verb}</span> ({item.verbMeaning})
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.arabic;
          const isThisCorrect = option.arabic === item.correctPrepositionArabic;
          const optionInfo = prepositionLabels[option.preposition];

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option.arabic)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all relative',
                'hover:border-violet-400/50 hover:bg-violet-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                // Before answering - selected state
                !hasAnswered && isSelected && 'border-violet-500 bg-violet-50',
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
                    {optionInfo.meanings.join(', ')}
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
              <span className="font-semibold">Incorrect.</span> The correct preposition is:{' '}
              <span className="font-arabic text-xl" dir="rtl">{item.correctPrepositionArabic}</span>
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-violet-50/50 rounded-xl border border-violet-200 space-y-3">
          {/* Complete Sentence */}
          <div className="text-center">
            <p className="text-sm text-violet-600 mb-2">Complete sentence:</p>
            <p className="text-xl font-arabic text-violet-800 leading-relaxed" dir="rtl">
              {item.sentenceVocalized}
            </p>
          </div>

          {/* Preposition Info */}
          <div className="pt-3 border-t border-violet-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-violet-700">{prepInfo.arabic}:</strong>{' '}
              Meanings: {prepInfo.meanings.join(', ')}
            </p>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-violet-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-violet-700">Usage Note:</strong>{' '}
              {item.explanation}
            </p>
          </div>

          {/* Collocation Type */}
          <div className="pt-3 border-t border-violet-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-violet-700">Pattern:</strong>{' '}
              {collocationTypeLabels[item.collocationType]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
