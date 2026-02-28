import { useRef } from 'react';
import type { WordData } from '@/types';

interface TappableWordProps {
  word: WordData;
  showInlineTranslation?: boolean;
  onClick: (word: WordData, rect: DOMRect) => void;
}

export default function TappableWord({ word, showInlineTranslation, onClick }: TappableWordProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    if (ref.current) {
      onClick(word, ref.current.getBoundingClientRect());
    }
  };

  return (
    <span
      ref={ref}
      onClick={handleClick}
      className="inline-block cursor-pointer hover:bg-primary-light/50 rounded px-1 py-0.5 transition-colors"
    >
      <span className="font-quran text-xl">{word.arabic}</span>
      {showInlineTranslation && (
        <span className="block text-xs text-text-secondary text-center">
          {word.translation}
        </span>
      )}
    </span>
  );
}
