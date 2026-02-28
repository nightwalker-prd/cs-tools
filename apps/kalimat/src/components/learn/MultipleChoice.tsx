import { useState, useMemo, useEffect, useCallback } from 'react';
import { shuffle } from '@arabtools/core';
import { lemmas } from '@/data/lemmas';
import type { Lemma } from '@/data/lemmas';

interface MultipleChoiceProps {
  lemma: Lemma;
  onGrade: (grade: 'again' | 'hard' | 'good' | 'easy') => void;
}

export function MultipleChoice({ lemma, onGrade }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const options = useMemo(() => {
    // Pick 3 distractors from lemmas (different from the correct one)
    const others = lemmas.filter(l => l.id !== lemma.id && l.meaning !== lemma.meaning);
    const shuffled = shuffle([...others]);
    const distractors = shuffled.slice(0, 3);
    const all = shuffle([lemma, ...distractors]);
    return all;
  }, [lemma]);

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect = options[idx].id === lemma.id;
    setTimeout(() => {
      onGrade(isCorrect ? 'good' : 'again');
    }, 1200);
  }, [selected, options, lemma.id, onGrade]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= options.length) {
        handleSelect(num - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleSelect, options.length]);

  return (
    <div className="study-card">
      <div className="study-card-content">
        <div className="study-card-arabic font-arabic" dir="rtl">
          {lemma.lemma}
        </div>

        <div className="mc-options">
          {options.map((opt, i) => {
            let className = 'mc-option';
            if (selected !== null) {
              if (opt.id === lemma.id) className += ' correct';
              else if (i === selected) className += ' incorrect';
            }
            return (
              <button
                key={opt.id}
                className={className}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
              >
                {opt.meaning}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
