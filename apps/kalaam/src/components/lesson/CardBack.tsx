import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import type { WordBatchItem } from '@/types';
import { useQuranData } from '@/hooks/useQuranData';

interface CardBackProps {
  word: WordBatchItem;
  onMoreInfo: () => void;
}

export default function CardBack({ word, onMoreInfo }: CardBackProps) {
  const { textBefore, match, textAfter } = word.contextTranslation;
  const { surahNum, ayahNum } = word.bestExample;
  const { data: surahData } = useQuranData(surahNum);

  // Get the full ayah and highlight the target word
  const ayahContext = useMemo(() => {
    if (!surahData) return null;
    const ayah = surahData.ayahs.find((a) => a.ayahNum === ayahNum);
    if (!ayah) return null;

    // Parse wordLoc to find the word index (1-based)
    const locParts = word.bestExample.wordLoc.split(':');
    const wordIdx = parseInt(locParts[2], 10); // 1-based

    return {
      surahName: surahData.name.transliteration,
      ayahArabic: ayah.arabic,
      ayahTranslation: ayah.translation,
      words: ayah.words,
      highlightIdx: wordIdx,
    };
  }, [surahData, ayahNum, word.bestExample.wordLoc]);

  return (
    <div className="flex flex-col items-center min-h-[320px]">
      {/* Arabic word */}
      <div className="font-quran text-2xl text-text leading-relaxed mb-1">
        {word.lemma}
      </div>

      {/* Root letters */}
      {word.root && (
        <div className="text-xs text-text-secondary mb-3">
          Root: <span className="font-arabic text-sm">{word.root}</span>
        </div>
      )}

      {/* English meaning — main reveal */}
      <div className="text-2xl font-bold text-primary mb-2 text-center">
        {word.meaning}
      </div>

      {/* Transliteration */}
      <div className="text-sm text-text-secondary mb-5">
        {word.transliteration}
      </div>

      {/* Quranic context */}
      <div className="w-full bg-card rounded-xl p-3 mb-4">
        <div className="text-xs text-text-secondary font-medium mb-1.5">
          Quranic context
          {ayahContext && (
            <span className="text-text-secondary/70">
              {' '}— {ayahContext.surahName} {ayahNum}
            </span>
          )}
        </div>

        {/* Full ayah with highlighted word */}
        <div className="font-quran text-lg text-text text-center leading-[2] mb-2" dir="rtl">
          {ayahContext ? (
            ayahContext.words.map((w, i) => {
              const idx = i + 1; // wordLoc is 1-based
              const isTarget = idx === ayahContext.highlightIdx;
              return (
                <span key={w.wordLoc}>
                  {i > 0 && ' '}
                  <span className={isTarget ? 'text-primary font-bold' : 'text-text/70'}>
                    {w.arabic}
                  </span>
                </span>
              );
            })
          ) : (
            word.bestExample.arabic
          )}
        </div>

        {/* Translation with highlighted match */}
        {(textBefore || match || textAfter) ? (
          <div className="text-xs text-text-secondary text-center leading-relaxed">
            {ayahContext ? (
              // Show full ayah translation
              ayahContext.ayahTranslation
            ) : (
              <>
                {textBefore && <span>{textBefore} </span>}
                {match && <span className="font-semibold text-primary">{match}</span>}
                {textAfter && <span> {textAfter}</span>}
              </>
            )}
          </div>
        ) : ayahContext?.ayahTranslation ? (
          <div className="text-xs text-text-secondary text-center leading-relaxed">
            {ayahContext.ayahTranslation}
          </div>
        ) : null}
      </div>

      {/* More information button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMoreInfo();
        }}
        className="mt-auto flex items-center gap-1 text-sm text-primary font-medium
          hover:text-primary-dark transition-colors"
      >
        More information
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
