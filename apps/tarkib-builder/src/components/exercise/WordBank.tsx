import { useMemo } from 'react';
import { shuffle } from '@arabtools/core';
import type { WordComponent } from '../../data/types';
import { WordCard } from './WordCard';

interface WordBankProps {
  words: WordComponent[];
  selectedWordId: string | null;
  usedWordIds: Set<string>;
  isChecked: boolean;
  showDiacritics: boolean;
  onSelect: (wordId: string) => void;
}

export function WordBank({ words, selectedWordId, usedWordIds, isChecked, showDiacritics, onSelect }: WordBankProps) {
  // Shuffle word order once on mount so distractors aren't always last
  const shuffledWords = useMemo(() => shuffle([...words]), [words]);

  const remainingCount = words.filter(w => !usedWordIds.has(w.id)).length;

  return (
    <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl" role="listbox" aria-label="Word bank">
      <div className="text-xs text-muted-foreground mb-4 text-center">
        Word Bank — tap a word, then tap a slot
        <span className="ml-2 text-primary/60">({remainingCount} remaining)</span>
      </div>

      <div className="flex items-center justify-center gap-3 flex-wrap" dir="rtl">
        {shuffledWords.map(word => (
          <WordCard
            key={word.id}
            word={word}
            isSelected={selectedWordId === word.id}
            isUsed={usedWordIds.has(word.id)}
            isDistractorRevealed={isChecked && !!word.isDistractor}
            showDiacritics={showDiacritics}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
