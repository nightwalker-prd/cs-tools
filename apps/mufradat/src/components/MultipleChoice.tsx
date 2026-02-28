import { useState } from 'react';
import type { WordFamily } from '@arabtools/data';
import type { ResponseQuality } from '@arabtools/srs';
import { useSpeechSynthesis } from '@arabtools/core';
import { generateDistractors, shuffleOptions } from '../utils/vocab-helpers';
import { CardBack } from './CardBack';

interface MultipleChoiceProps {
  word: WordFamily;
  allWords: WordFamily[];
  onGrade: (quality: ResponseQuality) => void;
}

export function MultipleChoice({ word, allWords, onGrade }: MultipleChoiceProps) {
  const { speak, isSpeaking } = useSpeechSynthesis({ rate: 0.7 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [options] = useState(() => {
    const distractors = generateDistractors(word, allWords);
    return shuffleOptions(word.meanings[0], distractors);
  });

  const answered = selectedIndex !== null;
  const isCorrect = answered && options[selectedIndex].isCorrect;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
  };

  const handleContinue = () => {
    if (isCorrect) {
      onGrade(2); // Good
    } else {
      onGrade(0); // Again
    }
  };

  if (answered) {
    return (
      <div>
        {/* Result indicator */}
        <div className={`result-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : `Incorrect — the answer was: ${word.meanings[0]}`}
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
      <p className="study-hint">Choose the correct meaning</p>

      {/* Options */}
      <div className="mc-options">
        {options.map((option, index) => (
          <button
            key={index}
            className="mc-option"
            onClick={() => handleSelect(index)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
