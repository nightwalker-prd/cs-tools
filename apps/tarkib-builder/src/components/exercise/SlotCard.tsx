import { Check, X } from 'lucide-react';
import { removeDiacritics } from '@arabtools/core';
import type { ConstructionSlot, WordComponent, SlotResult } from '../../data/types';

interface SlotCardProps {
  slot: ConstructionSlot;
  placedWord: WordComponent | undefined;
  correctWord: WordComponent | undefined;
  result: SlotResult | undefined;
  isChecked: boolean;
  showDiacritics: boolean;
  onTap: (slotId: string) => void;
  onDrop: (slotId: string, wordId: string) => void;
}

export function SlotCard({ slot, placedWord, correctWord, result, isChecked, showDiacritics, onTap, onDrop }: SlotCardProps) {
  const isEmpty = !placedWord;
  const isCorrect = isChecked && result?.isCorrect;
  const isIncorrect = isChecked && result && !result.isCorrect;

  const displayText = (word: WordComponent) =>
    showDiacritics ? word.word : removeDiacritics(word.word);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const wordId = e.dataTransfer.getData('text/plain');
    if (wordId) {
      onDrop(slot.id, wordId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTap(slot.id);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => onTap(slot.id)}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        tabIndex={0}
        className={`
          relative min-w-[100px] min-h-[80px] px-5 py-4 rounded-2xl border-2 transition-all duration-200
          ${isEmpty
            ? 'border-dashed border-[#E8DFD4] bg-white/50 hover:border-accent/40 hover:bg-accent/5'
            : isCorrect
              ? 'border-green-400 bg-green-50'
              : isIncorrect
                ? 'border-red-400 bg-red-50'
                : 'border-solid bg-white shadow-sm hover:shadow-md cursor-pointer active:scale-95'
          }
        `}
        style={!isEmpty && !isChecked ? { borderColor: slot.color } : undefined}
        aria-label={`${slot.labelEn} slot${placedWord ? `: ${placedWord.word}` : ' (empty)'}`}
      >
        {isEmpty ? (
          <div className="text-center">
            <div className="text-2xl font-arabic text-muted-foreground/40" dir="rtl">
              ___
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-arabic text-primary leading-relaxed" dir="rtl">
              {displayText(placedWord)}
            </div>
          </div>
        )}

        {/* Correct/incorrect icon */}
        {isCorrect && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center animate-scale-in">
            <Check className="w-4 h-4" />
          </div>
        )}
        {isIncorrect && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center animate-scale-in">
            <X className="w-4 h-4" />
          </div>
        )}
      </button>

      {/* Slot label below */}
      <div className="text-center">
        <span
          className="text-sm font-arabic font-bold"
          style={{ color: slot.color }}
          dir="rtl"
        >
          {slot.label}
        </span>
        <span className="text-xs text-muted-foreground block">
          {slot.labelEn}
        </span>
      </div>

      {/* Error message + correct answer */}
      {isIncorrect && (
        <div className="text-center mt-1 max-w-[140px] animate-fade-in-up">
          {result?.errorMessageAr && (
            <div className="text-xs text-red-600">
              <span className="font-arabic" dir="rtl">{result.errorMessageAr}</span>
            </div>
          )}
          {correctWord && (
            <div className="text-xs text-green-600 mt-0.5">
              <span className="font-arabic" dir="rtl">{displayText(correctWord)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
