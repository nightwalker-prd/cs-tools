import { Volume2 } from 'lucide-react';
import { useSpeechSynthesis, removeDiacritics } from '@arabtools/core';
import type { WordComponent } from '../../data/types';

interface WordCardProps {
  word: WordComponent;
  isSelected: boolean;
  isUsed: boolean;
  isDistractorRevealed: boolean;
  showDiacritics: boolean;
  onSelect: (wordId: string) => void;
}

export function WordCard({ word, isSelected, isUsed, isDistractorRevealed, showDiacritics, onSelect }: WordCardProps) {
  const { speak, isSupported } = useSpeechSynthesis({ lang: 'ar-SA', rate: 0.8 });

  const displayWord = showDiacritics ? word.word : removeDiacritics(word.word);

  const handleClick = () => {
    if (isUsed) return;
    onSelect(word.id);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(word.word);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isUsed}
      draggable={!isUsed}
      onDragStart={e => {
        e.dataTransfer.setData('text/plain', word.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      role="option"
      aria-selected={isSelected}
      className={`
        relative group px-4 py-3 rounded-xl border-2 transition-all duration-200
        ${isUsed
          ? 'opacity-40 cursor-default border-gray-200 bg-gray-100'
          : isSelected
            ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20 scale-105 animate-gold-pulse'
            : 'border-gray-200 bg-white hover:border-accent/50 hover:shadow-md cursor-pointer active:scale-95'
        }
        ${isDistractorRevealed && word.isDistractor ? 'line-through opacity-50' : ''}
      `}
      aria-label={`${word.translation} - ${word.word}`}
    >
      <div className="text-2xl font-arabic text-primary leading-relaxed" dir="rtl">
        {displayWord}
      </div>
      <div className="text-xs text-muted-foreground mt-1 truncate">
        {word.translation}
      </div>

      {isSupported && !isUsed && (
        <button
          onClick={handleSpeak}
          className="absolute -top-1 -right-1 p-1 rounded-full bg-white border border-gray-200 shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          aria-label={`Listen to ${word.word}`}
        >
          <Volume2 className="w-3 h-3 text-muted-foreground" />
        </button>
      )}
    </button>
  );
}
