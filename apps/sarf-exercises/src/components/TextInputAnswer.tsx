import { useState, useRef, useEffect } from 'react';

interface TextInputAnswerProps {
  isArabic: boolean;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  revealedResult?: { isCorrect: boolean };
}

export function TextInputAnswer({
  isArabic,
  onAnswer,
  disabled,
  revealedResult,
}: TextInputAnswerProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onAnswer(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const inputClass = revealedResult
    ? revealedResult.isCorrect ? 'correct' : 'incorrect'
    : '';

  return (
    <div className="text-input-area">
      <input
        ref={inputRef}
        type="text"
        className={`text-input-field ${isArabic ? '' : 'english'} ${inputClass}`}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={isArabic ? 'اكتب الإجابة هنا...' : 'Type your answer...'}
        dir={isArabic ? 'rtl' : 'ltr'}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {!disabled && (
        <button
          className="text-submit-btn"
          onClick={handleSubmit}
          disabled={!value.trim()}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}
