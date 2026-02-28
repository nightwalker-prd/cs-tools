import { useSpeechSynthesis } from '@arabtools/core';

interface ArabicWordProps {
  word: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTts?: boolean;
  className?: string;
}

const sizeMap = {
  sm: '1rem',
  md: '1.35rem',
  lg: '2rem',
  xl: '3.5rem',
};

export function ArabicWord({ word, size = 'md', showTts = false, className = '' }: ArabicWordProps) {
  const { speak } = useSpeechSynthesis();

  return (
    <span className={`font-arabic ${className}`} style={{ fontSize: sizeMap[size] }} dir="rtl">
      {word}
      {showTts && (
        <button
          className="word-tts-btn"
          onClick={(e) => { e.stopPropagation(); speak(word); }}
          title="Listen"
          style={{ display: 'inline-flex', marginInlineStart: '0.5rem', verticalAlign: 'middle', width: 28, height: 28 }}
        >
          🔊
        </button>
      )}
    </span>
  );
}
