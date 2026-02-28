import type { AyahData, WordData } from '@/types';
import TappableWord from './TappableWord';

interface AyahBlockProps {
  ayah: AyahData;
  showTranslation: boolean;
  wordByWord: boolean;
  onWordClick: (word: WordData, rect: DOMRect) => void;
}

export default function AyahBlock({ ayah, showTranslation, wordByWord, onWordClick }: AyahBlockProps) {
  return (
    <div className="py-4 border-b border-border last:border-b-0">
      {/* Ayah number badge */}
      <div className="flex items-start gap-2 mb-2">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-light text-primary text-xs font-semibold flex items-center justify-center mt-1">
          {ayah.ayahNum}
        </span>

        {/* Arabic text */}
        <div className="flex-1" dir="rtl">
          {wordByWord ? (
            <div className="flex flex-wrap gap-1 justify-end">
              {ayah.words.map((word, i) => (
                <TappableWord
                  key={`${word.wordLoc || i}`}
                  word={word}
                  showInlineTranslation
                  onClick={onWordClick}
                />
              ))}
            </div>
          ) : (
            <p className="font-quran text-xl leading-loose text-text">
              {ayah.arabic}
            </p>
          )}
        </div>
      </div>

      {/* English translation */}
      {showTranslation && (
        <p className="text-sm text-text-secondary pl-9 leading-relaxed">
          {ayah.translation}
        </p>
      )}
    </div>
  );
}
