import { useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { WordData } from '@/types';

interface WordPopupProps {
  word: WordData;
  position: { top: number; left: number };
  onClose: () => void;
  onMoreInfo: (lemmaId: number) => void;
}

export default function WordPopup({ word, position, onClose, onMoreInfo }: WordPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay attaching so the click that opened the popup doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Adjust position to stay within viewport
  useEffect(() => {
    if (!popupRef.current) return;
    const popup = popupRef.current;
    const rect = popup.getBoundingClientRect();

    // If overflowing right
    if (rect.right > window.innerWidth - 8) {
      popup.style.left = `${window.innerWidth - rect.width - 8}px`;
    }
    // If overflowing left
    if (rect.left < 8) {
      popup.style.left = '8px';
    }
    // If overflowing bottom, move above
    if (rect.bottom > window.innerHeight - 8) {
      popup.style.top = `${position.top - rect.height - 8}px`;
    }
  }, [position]);

  const firstPart = word.parts[0];
  const grammarColor = firstPart?.grammarColor || '#6B7280';
  const partOfSpeech = firstPart?.partOfSpeech || '';
  const lemmaId = firstPart?.lemmaId;

  return (
    <div
      ref={popupRef}
      className="fixed z-50 bg-white rounded-xl shadow-lg border border-border w-64 overflow-hidden"
      style={{ top: position.top, left: position.left }}
    >
      {/* Grammar color bar */}
      <div className="h-1.5" style={{ backgroundColor: grammarColor }} />

      <div className="p-4 space-y-3">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-secondary hover:text-text transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Arabic word */}
        <p className="font-quran text-2xl text-center text-text" dir="rtl">
          {word.arabic}
        </p>

        {/* Translation */}
        <p className="text-sm text-center text-text-secondary">
          {word.translation}
        </p>

        {/* Part of speech */}
        {partOfSpeech && (
          <div className="flex justify-center">
            <span
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: grammarColor }}
            >
              {partOfSpeech}
            </span>
          </div>
        )}

        {/* Transliteration */}
        {word.transliteration && (
          <p className="text-xs text-center text-text-secondary italic">
            {word.transliteration}
          </p>
        )}

        {/* More info link */}
        {lemmaId != null && lemmaId > 0 && (
          <button
            onClick={() => onMoreInfo(lemmaId)}
            className="w-full flex items-center justify-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors pt-2 border-t border-border"
          >
            More information <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
