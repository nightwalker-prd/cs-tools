import { useState } from 'react';
import type { SentenceBuildQuestion } from '../../data/types';

interface SentenceBuildProps {
  question: SentenceBuildQuestion;
  onCorrect: () => void;
}

export function SentenceBuild({ question, onCorrect }: SentenceBuildProps) {
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const builtSentence = question.components
    .map((_, i) => selections[i] ?? '')
    .join(' ')
    .trim();
  const isCorrect = builtSentence === question.answer;
  const allSelected = question.components.every((_, i) => selections[i]);

  const handleSelect = (componentIndex: number, value: string) => {
    if (checked) return;
    setSelections(prev => ({ ...prev, [componentIndex]: value }));
  };

  const handleCheck = () => {
    setChecked(true);
    if (isCorrect) onCorrect();
  };

  return (
    <div className="exercise-question">
      <p className="exercise-prompt">{question.prompt}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', direction: 'rtl' }}>
        {question.components.map((comp, i) => (
          <div key={i}>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground)', marginBottom: '0.25rem', textAlign: 'center' }}>
              {comp.type}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {comp.options.map((opt, oi) => (
                <button
                  key={oi}
                  className={`word-chip ${selections[i] === opt ? 'placed' : ''}`}
                  style={selections[i] === opt ? { opacity: 1, borderColor: 'var(--color-primary)', background: 'rgba(26, 49, 80, 0.06)' } : {}}
                  onClick={() => handleSelect(i, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allSelected && (
        <div className="answer-zone" dir="rtl" style={{ marginBottom: '1rem' }}>
          <span className="font-arabic" style={{ fontSize: '1.15rem', color: 'var(--color-primary)' }}>
            {builtSentence}
          </span>
        </div>
      )}

      {!checked ? (
        <button
          className="btn btn-primary"
          onClick={handleCheck}
          disabled={!allSelected}
        >
          Check
        </button>
      ) : (
        <div className={`exercise-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${question.answer}`}
        </div>
      )}
    </div>
  );
}
