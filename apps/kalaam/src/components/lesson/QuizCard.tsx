import { useState, useMemo, useEffect, useCallback } from 'react';
import { shuffle } from '@arabtools/core';
import type { WordBatchItem } from '@/types';

interface QuizCardProps {
  word: WordBatchItem;
  onAnswer: (correct: boolean) => void;
}

export default function QuizCard({ word, onAnswer }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;

  const correctAnswer = word.quiz.correctAnswer;

  // Shuffle options once per word (memoized by lemmaId)
  const options = useMemo(() => {
    return shuffle([correctAnswer, ...word.quiz.wrongChoices]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.lemmaId]);

  const { textBefore, match, textAfter } = word.contextTranslation;

  const handleSelect = useCallback((option: string) => {
    if (answered) return;

    setSelected(option);
    const isCorrect = option === correctAnswer;

    // Auto-advance after feedback delay
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelected(null);
    }, 1500);
  }, [answered, correctAnswer, onAnswer]);

  // Keyboard shortcuts: 1-4 to select options
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (answered) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= options.length) {
        e.preventDefault();
        handleSelect(options[num - 1]);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [answered, options, handleSelect]);

  return (
    <div className="w-full max-w-[380px] bg-white rounded-2xl border border-border shadow-sm p-6">
      {/* Arabic word */}
      <div className="text-center mb-1">
        <div className="font-quran text-3xl text-text leading-relaxed">
          {word.lemma}
        </div>
      </div>

      {/* Transliteration + frequency */}
      <div className="text-center mb-3">
        <div className="text-sm text-text-secondary">
          {word.transliteration}
        </div>
        <div className="text-xs text-text-secondary mt-0.5">
          <span className="font-medium text-primary">{word.count.toLocaleString()}</span> occurrences
        </div>
      </div>

      {/* Quranic context */}
      {(textBefore || match || textAfter) && (
        <div className="bg-card rounded-xl p-3 mb-4">
          <div className="text-xs text-text-secondary font-medium mb-1.5">Quranic context</div>
          <div className="font-quran text-lg text-text text-center leading-relaxed mb-1.5" dir="rtl">
            {word.bestExample.arabic}
          </div>
          <div className="text-xs text-text-secondary text-center leading-relaxed">
            {textBefore && <span>{textBefore} </span>}
            {match && <span className="font-semibold text-primary">{match}</span>}
            {textAfter && <span> {textAfter}</span>}
          </div>
        </div>
      )}

      {/* Instruction */}
      <div className="text-sm font-medium text-text mb-3">
        Translate the Arabic word:
      </div>

      {/* Option buttons */}
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const isCorrectOption = option === correctAnswer;
          const isSelectedOption = option === selected;

          let className =
            'w-full p-3 rounded-lg text-left border transition-colors text-sm flex items-center gap-2';

          if (answered && isCorrectOption) {
            className += ' bg-success/10 border-success text-success';
          } else if (answered && isSelectedOption && !isCorrectOption) {
            className += ' bg-danger/10 border-danger text-danger';
          } else if (answered) {
            className += ' border-border text-text-secondary opacity-50';
          } else {
            className += ' hover:bg-card-hover border-border text-text';
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={answered}
              className={className}
            >
              <span className="w-5 h-5 rounded text-xs font-medium bg-card flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
