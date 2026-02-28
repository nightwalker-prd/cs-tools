import { useState, useRef, useEffect } from 'react';
import type { WordFamily } from '@arabtools/data';
import type { ResponseQuality } from '@arabtools/srs';
import { useSpeechSynthesis } from '@arabtools/core';
import { fuzzyMatch } from '../utils/vocab-helpers';
import { CardBack } from './CardBack';

interface TypeAnswerProps {
  word: WordFamily;
  onGrade: (quality: ResponseQuality) => void;
}

export function TypeAnswer({ word, onGrade }: TypeAnswerProps) {
  const { speak, isSpeaking } = useSpeechSynthesis({ rate: 0.7 });
  const [input, setInput] = useState('');
  const [result, setResult] = useState<'exact' | 'close' | 'none' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (result !== null) return;
    const match = fuzzyMatch(input, word.meanings);
    setResult(match);
  };

  const handleContinue = () => {
    switch (result) {
      case 'exact': onGrade(2); break;  // Good
      case 'close': onGrade(1); break;  // Hard
      default: onGrade(0); break;       // Again
    }
  };

  if (result !== null) {
    return (
      <div>
        {/* Result indicator */}
        <div className={`result-feedback ${result === 'exact' ? 'correct' : result === 'close' ? 'close' : 'incorrect'}`}>
          {result === 'exact' && 'Correct!'}
          {result === 'close' && 'Close! Accepted as hard.'}
          {result === 'none' && `Incorrect — the answer was: ${word.meanings.join('; ')}`}
        </div>

        {/* Show what they typed */}
        <div className="study-hint" style={{ marginTop: '0.5rem' }}>
          You typed: <strong>{input}</strong>
        </div>

        <CardBack word={word} onGrade={() => {}} showGradeButtons={false} />

        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleContinue}>
          Continue
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Arabic word */}
      <div className="study-card-arabic font-arabic" dir="rtl">
        {word.headwordVocalized}
      </div>

      <div className="study-card-meta">
        <span className="word-pos-badge">{word.partOfSpeech}</span>
        <button
          className="word-tts-btn"
          onClick={() => speak(word.headwordVocalized)}
          disabled={isSpeaking}
          aria-label="Play pronunciation"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </button>
      </div>

      {/* Prompt */}
      <p className="study-hint">Type the English meaning</p>

      {/* Input */}
      <form onSubmit={handleSubmit} className="type-answer-form">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type meaning..."
          className="type-answer-input"
          autoComplete="off"
          autoCapitalize="off"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          Check
        </button>
      </form>
    </div>
  );
}
