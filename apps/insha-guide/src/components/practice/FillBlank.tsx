import { useState } from 'react';
import type { FillBlankQuestion } from '../../data/types';

interface FillBlankProps {
  question: FillBlankQuestion;
  onCorrect: () => void;
}

export function FillBlank({ question, onCorrect }: FillBlankProps) {
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const isCorrect = answer.trim() === question.answer.trim();

  const handleCheck = () => {
    setChecked(true);
    if (isCorrect) onCorrect();
  };

  // Split sentence on ___ to show input inline
  const parts = question.sentence.split('___');

  return (
    <div className="exercise-question">
      <div className="exercise-prompt-ar font-arabic" dir="rtl">
        {parts[0]}
        <input
          className={`fill-blank-input ${checked ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
          type="text"
          value={answer}
          onChange={e => { setAnswer(e.target.value); setChecked(false); }}
          dir="rtl"
          disabled={checked && isCorrect}
        />
        {parts[1] ?? ''}
      </div>

      {question.hint && !checked && (
        <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-foreground)', marginTop: '0.5rem' }}>
          Hint: {question.hint}
        </p>
      )}

      {question.options && !checked && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
          {question.options.map((opt, i) => (
            <button
              key={i}
              className="word-chip"
              onClick={() => setAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {!checked ? (
        <button
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          onClick={handleCheck}
          disabled={!answer.trim()}
        >
          Check
        </button>
      ) : (
        <div className={`exercise-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : `Incorrect. The answer is: ${question.answer}`}
        </div>
      )}
    </div>
  );
}
