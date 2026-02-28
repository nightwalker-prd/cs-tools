import type { WordFamily } from '@arabtools/data';
import { useSpeechSynthesis } from '@arabtools/core';

interface CardFrontProps {
  word: WordFamily;
  onReveal: () => void;
}

export function CardFront({ word, onReveal }: CardFrontProps) {
  const { speak, isSpeaking } = useSpeechSynthesis({ rate: 0.7 });

  return (
    <div className="study-card-content">
      {/* Arabic word */}
      <div
        className="study-card-arabic font-arabic"
        dir="rtl"
        onClick={onReveal}
      >
        {word.headwordVocalized}
      </div>

      {/* POS badge + TTS */}
      <div className="study-card-meta">
        <span className="word-pos-badge">{word.partOfSpeech}</span>
        <button
          className="word-tts-btn"
          onClick={(e) => {
            e.stopPropagation();
            speak(word.headwordVocalized);
          }}
          disabled={isSpeaking}
          aria-label="Play pronunciation"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </button>
      </div>

      {/* Tap to reveal hint */}
      <p className="study-hint">Tap the word to reveal</p>
    </div>
  );
}
