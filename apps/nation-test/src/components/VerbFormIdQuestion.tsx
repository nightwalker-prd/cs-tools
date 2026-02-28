/**
 * Verb Form Identification Question Component
 *
 * Tests the ability to identify Arabic verb forms (I-X)
 * from conjugated verbs.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { VerbFormIdItem, ArabicVerbForm } from '../data/verbFormId';
import { verbFormLabels } from '../data/verbFormId';

interface VerbFormIdQuestionProps {
  item: VerbFormIdItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function VerbFormIdQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: VerbFormIdQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<ArabicVerbForm | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle options when item changes
  const [options, setOptions] = useState<ArabicVerbForm[]>([]);

  useEffect(() => {
    const allOptions = [item.correctForm, ...item.distractors];
    setOptions(allOptions.sort(() => Math.random() - 0.5) as ArabicVerbForm[]);
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [item.id, item.correctForm, item.distractors]);

  const handleSelect = (option: ArabicVerbForm) => {
    if (hasAnswered || disabled) return;

    setSelectedAnswer(option);
    setHasAnswered(true);
    const isCorrect = option === item.correctForm;
    onAnswer(option, isCorrect);
  };

  const handleSpeak = () => {
    speak(item.verbVocalized);
  };

  const isCorrect = selectedAnswer === item.correctForm;

  const getTenseLabel = () => {
    switch (item.tense) {
      case 'past':
        return { english: 'Past', arabic: 'الماضي' };
      case 'present':
        return { english: 'Present', arabic: 'المضارع' };
      case 'masdar':
        return { english: 'Verbal Noun', arabic: 'المصدر' };
    }
  };

  const tenseLabel = getTenseLabel();

  return (
    <div className="space-y-6">
      {/* Tense and Level Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {tenseLabel.english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {tenseLabel.arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Verb Display */}
      <div className="text-center p-6 bg-muted/30 rounded-xl space-y-3">
        <p className="text-sm text-muted-foreground">
          Identify the verb form (الوزن) of this verb:
        </p>

        <div className="flex items-center justify-center gap-3">
          <h2 className="text-5xl font-arabic text-primary" dir="rtl">
            {item.verbVocalized}
          </h2>
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Listen to verb"
          >
            <Volume2
              className={cn(
                'w-6 h-6',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>

        <p className="text-muted-foreground italic">{item.meaning}</p>

        {/* Root Info */}
        <div className="pt-2">
          <span className="text-sm text-muted-foreground">Root: </span>
          <span className="font-arabic text-base font-medium text-primary" dir="rtl">
            {item.root}
          </span>
        </div>
      </div>

      {/* Form Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((form, index) => {
          const isSelected = selectedAnswer === form;
          const isThisCorrect = form === item.correctForm;
          const formInfo = verbFormLabels[form];

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => handleSelect(form)}
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
              <div className="font-bold text-lg">{formInfo.english}</div>
              <div className="font-arabic text-xl" dir="rtl">{formInfo.arabic}</div>
              <div className="text-xs text-muted-foreground mt-1">{formInfo.meaning}</div>
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
              <span className="font-semibold">Not quite.</span> This is{' '}
              <strong>{verbFormLabels[item.correctForm].english}</strong> (
              <span className="font-arabic" dir="rtl">
                {verbFormLabels[item.correctForm].arabic}
              </span>
              )
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
          {/* Form Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Correct Form</div>
              <div className="font-bold text-primary">
                {verbFormLabels[item.correctForm].english}
              </div>
              <div className="font-arabic text-xl" dir="rtl">
                {verbFormLabels[item.correctForm].arabic}
              </div>
              <div className="text-xs text-muted-foreground">
                {verbFormLabels[item.correctForm].pattern}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Form Meaning</div>
              <div className="font-semibold text-primary">
                {verbFormLabels[item.correctForm].meaning}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {item.formMeaning}
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="pt-3 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">How to identify:</strong>{' '}
              {item.formCharacteristics}
            </p>
          </div>

          {/* All Forms Reference */}
          <div className="pt-3 border-t border-primary/20">
            <p className="text-xs text-muted-foreground mb-2">Quick Reference:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as ArabicVerbForm[]).map((form) => (
                <span
                  key={form}
                  className={cn(
                    'px-2 py-1 text-xs rounded',
                    form === item.correctForm
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {form}: <span className="font-arabic">{verbFormLabels[form].arabic}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
