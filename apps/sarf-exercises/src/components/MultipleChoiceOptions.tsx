import { useState } from 'react';
import { shuffle } from '@arabtools/core';

interface MultipleChoiceOptionsProps {
  correctAnswer: string;
  distractors: string[];
  isArabic: boolean;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  revealedAnswer?: string;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function MultipleChoiceOptions({
  correctAnswer,
  distractors,
  isArabic,
  onAnswer,
  disabled,
  revealedAnswer,
}: MultipleChoiceOptionsProps) {
  const [options] = useState(() =>
    shuffle([correctAnswer, ...distractors.slice(0, 3)])
  );
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (disabled) return;
    setSelected(option);
    onAnswer(option);
  };

  const getOptionClass = (option: string) => {
    if (!revealedAnswer) return '';
    if (option === correctAnswer) return 'correct';
    if (option === selected && option !== correctAnswer) return 'incorrect';
    return 'disabled';
  };

  return (
    <div className="mc-options">
      {options.map((option, i) => (
        <button
          key={i}
          className={`mc-option ${getOptionClass(option)} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleSelect(option)}
          disabled={disabled}
        >
          <span className="option-letter">{LETTERS[i]}</span>
          <span className={`option-text ${!isArabic ? 'english' : ''}`}>
            {option}
          </span>
        </button>
      ))}
    </div>
  );
}
