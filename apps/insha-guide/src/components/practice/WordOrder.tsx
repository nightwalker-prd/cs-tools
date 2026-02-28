import { useState } from 'react';
import type { WordOrderQuestion } from '../../data/types';

interface WordOrderProps {
  question: WordOrderQuestion;
  onCorrect: () => void;
}

export function WordOrder({ question, onCorrect }: WordOrderProps) {
  const [placed, setPlaced] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const remaining = question.words.filter(w => !placed.includes(w));
  const isCorrect = placed.length === question.answer.length &&
    placed.every((w, i) => w === question.answer[i]);

  const addWord = (word: string) => {
    if (checked) return;
    setPlaced(prev => [...prev, word]);
  };

  const removeWord = (index: number) => {
    if (checked) return;
    setPlaced(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    setChecked(true);
    if (isCorrect) onCorrect();
  };

  const handleReset = () => {
    setPlaced([]);
    setChecked(false);
  };

  return (
    <div className="exercise-question">
      {question.translation && (
        <p className="exercise-prompt" style={{ fontStyle: 'italic' }}>{question.translation}</p>
      )}

      <div className="answer-zone" dir="rtl">
        {placed.length === 0 && (
          <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.85rem' }}>
            Tap words to build the sentence...
          </span>
        )}
        {placed.map((word, i) => (
          <button key={i} className="placed-word" onClick={() => removeWord(i)}>
            {word}
          </button>
        ))}
      </div>

      <div className="word-bank">
        {remaining.map((word, i) => (
          <button key={i} className="word-chip" onClick={() => addWord(word)}>
            {word}
          </button>
        ))}
      </div>

      {!checked ? (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-primary"
            onClick={handleCheck}
            disabled={placed.length !== question.answer.length}
          >
            Check
          </button>
          <button className="btn" onClick={handleReset} disabled={placed.length === 0}>
            Reset
          </button>
        </div>
      ) : (
        <div className={`exercise-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect
            ? 'Correct!'
            : `Incorrect. Correct order: ${question.answer.join(' ')}`}
        </div>
      )}
    </div>
  );
}
