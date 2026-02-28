import { Volume2 } from 'lucide-react';
import type { WordBatchItem } from '@/types';

interface CardFrontProps {
  word: WordBatchItem;
}

export default function CardFront({ word }: CardFrontProps) {
  const { textBefore, match, textAfter } = word.contextTranslation;

  return (
    <div className="flex flex-col items-center min-h-[320px]">
      {/* Speaker icon */}
      <div className="self-start mb-4">
        <button
          className="p-1.5 rounded-lg text-text-secondary hover:bg-card-hover transition-colors"
          aria-label="Play pronunciation"
          tabIndex={-1}
        >
          <Volume2 size={18} />
        </button>
      </div>

      {/* Arabic word */}
      <div className="font-quran text-4xl text-text leading-relaxed mb-2">
        {word.lemma}
      </div>

      {/* Transliteration */}
      <div className="text-sm text-text-secondary mb-3">
        {word.transliteration}
      </div>

      {/* Frequency info */}
      <div className="text-xs text-text-secondary mb-6">
        Occurs <span className="font-medium text-primary">{word.count.toLocaleString()}</span> times in the Quran
      </div>

      {/* Quranic context */}
      {(textBefore || match || textAfter) && (
        <div className="w-full bg-card rounded-xl p-3 mb-4">
          <div className="text-xs text-text-secondary font-medium mb-1.5">Quranic context</div>
          <div className="font-quran text-lg text-text text-center leading-relaxed mb-2" dir="rtl">
            {word.bestExample.arabic}
          </div>
          <div className="text-xs text-text-secondary text-center leading-relaxed">
            {textBefore && <span>{textBefore} </span>}
            {match && <span className="font-semibold text-primary">{match}</span>}
            {textAfter && <span> {textAfter}</span>}
          </div>
        </div>
      )}

      {/* Tap to flip prompt */}
      <div className="mt-auto pt-2 text-xs text-text-secondary">
        Tap to flip
      </div>
    </div>
  );
}
