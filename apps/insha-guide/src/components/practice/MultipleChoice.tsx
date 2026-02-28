import { useState } from 'react';
import type { MultipleChoiceQuestion } from '../../data/types';

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onCorrect: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function MultipleChoice({ question, onCorrect }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = selected === question.correctIndex;

  const handleSelect = (index: number) => {
    if (checked) return;
    setSelected(index);
  };

  const handleCheck = () => {
    setChecked(true);
    if (isCorrect) onCorrect();
  };

  return (
    <div className="exercise-question">
      <p className="exercise-prompt">{question.question}</p>

      <div className="choice-list">
        {question.options.map((option, i) => (
          <button
            key={i}
            className={`choice-btn ${
              selected === i ? 'selected' : ''
            } ${
              checked && i === question.correctIndex ? 'correct' : ''
            } ${
              checked && selected === i && !isCorrect ? 'incorrect' : ''
            }`}
            onClick={() => handleSelect(i)}
          >
            <span className="choice-letter">{LETTERS[i]}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {!checked ? (
        <button
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          onClick={handleCheck}
          disabled={selected === null}
        >
          Check
        </button>
      ) : (
        <div className={`exercise-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : `Incorrect. The answer is: ${question.options[question.correctIndex]}`}
          {question.explanation && (
            <div style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}>{question.explanation}</div>
          )}
        </div>
      )}
    </div>
  );
}
