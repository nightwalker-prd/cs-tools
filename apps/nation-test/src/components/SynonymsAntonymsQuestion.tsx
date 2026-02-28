/**
 * Synonyms and Antonyms Question Component
 *
 * Tests the ability to identify words with similar (synonyms)
 * or opposite (antonyms) meanings in Arabic.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, ArrowLeftRight, ArrowRight } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { SynonymsAntonymsItem } from '../data/synonymsAntonyms';
import { relationTypeLabels } from '../data/synonymsAntonyms';

interface SynonymsAntonymsQuestionProps {
  item: SynonymsAntonymsItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function SynonymsAntonymsQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: SynonymsAntonymsQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<typeof item.distractors>([]);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  useEffect(() => {
    const correctOption = {
      word: item.correctAnswer,
      wordVocalized: item.correctAnswerVocalized,
      meaning: item.correctAnswerMeaning,
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

    const isCorrect = answer === item.correctAnswer;
    onAnswer(answer, isCorrect);
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const isCorrect = selectedAnswer === item.correctAnswer;
  const relationLabel = relationTypeLabels[item.relationType];
  const isSynonym = item.relationType === 'synonym';

  return (
    <div className="space-y-6">
      {/* Type and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className={cn(
          'px-3 py-1 text-sm font-medium rounded-full',
          isSynonym ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
        )}>
          {relationLabel.english}
        </span>
        <span
          className={cn(
            'px-3 py-1 text-sm font-arabic rounded-full',
            isSynonym ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
          )}
          dir="rtl"
        >
          {relationLabel.arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Word Display */}
      <div className={cn(
        'text-center p-6 rounded-xl space-y-3',
        isSynonym ? 'bg-blue-50/50' : 'bg-orange-50/50'
      )}>
        <div className="flex items-center justify-center gap-2">
          {isSynonym ? (
            <ArrowLeftRight className="w-6 h-6 text-blue-500/50" />
          ) : (
            <ArrowRight className="w-6 h-6 text-orange-500/50 rotate-180" />
          )}
          <p className="text-sm text-muted-foreground">
            Find a word with {isSynonym ? 'similar' : 'opposite'} meaning:
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <h2 className={cn(
            'text-5xl font-arabic',
            isSynonym ? 'text-blue-700' : 'text-orange-700'
          )} dir="rtl">
            {item.wordVocalized}
          </h2>
          <button
            onClick={() => handleSpeak(item.wordVocalized)}
            disabled={isSpeaking}
            className={cn(
              'p-2 rounded-full transition-colors',
              isSynonym ? 'hover:bg-blue-100' : 'hover:bg-orange-100'
            )}
            aria-label="Listen"
          >
            <Volume2
              className={cn(
                'w-6 h-6',
                isSpeaking
                  ? isSynonym ? 'text-blue-500 animate-pulse' : 'text-orange-500 animate-pulse'
                  : isSynonym ? 'text-blue-400' : 'text-orange-400'
              )}
            />
          </button>
        </div>

        <p className="text-lg text-muted-foreground">
          "{item.meaning}"
        </p>
      </div>

      {/* Answer Options */}
      <div className="grid gap-3">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.word;
          const isThisCorrect = option.word === item.correctAnswer;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(option.word)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all relative',
                isSynonym
                  ? 'hover:border-blue-400/50 hover:bg-blue-50/50'
                  : 'hover:border-orange-400/50 hover:bg-orange-50/50',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                // Before answering - selected state
                !hasAnswered && isSelected && (isSynonym ? 'border-blue-500 bg-blue-50' : 'border-orange-500 bg-orange-50'),
                !hasAnswered && !isSelected && 'border-border',
                // After answering with feedback
                hasAnswered && showFeedback && isThisCorrect && 'border-green-500 bg-green-50',
                hasAnswered && showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50',
                hasAnswered && showFeedback && !isThisCorrect && !isSelected && 'opacity-50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-arabic" dir="rtl">
                    {option.wordVocalized}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(option.wordVocalized);
                    }}
                    disabled={isSpeaking}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                    aria-label="Listen"
                  >
                    <Volume2
                      className={cn(
                        'w-4 h-4',
                        isSpeaking ? 'text-accent animate-pulse' : 'text-muted-foreground'
                      )}
                    />
                  </button>
                  <span className="text-muted-foreground">({option.meaning})</span>
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
              <span className="font-semibold">Incorrect.</span> The correct {isSynonym ? 'synonym' : 'antonym'} is:{' '}
              <span className="font-arabic" dir="rtl">{item.correctAnswerVocalized}</span>
              {' '}({item.correctAnswerMeaning})
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className={cn(
          'p-4 rounded-xl border space-y-3',
          isSynonym ? 'bg-blue-50/50 border-blue-200' : 'bg-orange-50/50 border-orange-200'
        )}>
          {/* Word Pair */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {isSynonym ? 'Synonym Pair' : 'Antonym Pair'}:
            </p>
            <div className="flex items-center justify-center gap-4 text-2xl font-arabic" dir="rtl">
              <span className={isSynonym ? 'text-blue-700' : 'text-orange-700'}>
                {item.wordVocalized}
              </span>
              {isSynonym ? (
                <ArrowLeftRight className="w-6 h-6 text-blue-500" />
              ) : (
                <span className="text-orange-500">≠</span>
              )}
              <span className={isSynonym ? 'text-blue-700' : 'text-orange-700'}>
                {item.correctAnswerVocalized}
              </span>
            </div>
          </div>

          {/* Explanation */}
          <div className={cn(
            'pt-3 border-t',
            isSynonym ? 'border-blue-200' : 'border-orange-200'
          )}>
            <p className="text-sm text-muted-foreground">
              <strong className={isSynonym ? 'text-blue-700' : 'text-orange-700'}>
                Explanation:
              </strong>{' '}
              {item.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
