import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { QuranWord } from '../../types';

interface WordTooltipProps {
  word: QuranWord;
  anchorRect: DOMRect;
  onClose: () => void;
}

export function WordTooltip({ word, anchorRect, onClose }: WordTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleScroll() {
      onClose();
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [onClose]);

  // Position using viewport-relative coords (fixed positioning via portal)
  const tooltipHeight = 120;
  const padding = 8;

  // If tooltip would overflow below viewport, flip above the word
  const spaceBelow = window.innerHeight - anchorRect.bottom;
  const flipped = spaceBelow < tooltipHeight + padding;
  const top = flipped
    ? anchorRect.top - padding
    : anchorRect.bottom + padding;

  // Center horizontally, clamped to viewport
  const left = Math.max(padding, Math.min(
    anchorRect.left + anchorRect.width / 2,
    window.innerWidth - padding
  ));

  return createPortal(
    <div
      ref={ref}
      className="word-tooltip"
      style={{
        top,
        left,
        transform: flipped ? 'translateX(-50%) translateY(-100%)' : 'translateX(-50%)',
      }}
    >
      <div className="word-tooltip-arabic">{word.word}</div>
      <div className="word-tooltip-translit">{word.transliteration}</div>
      <div className="word-tooltip-meaning">{word.meaning}</div>
      {word.root && (
        <div className="word-tooltip-root">
          Root: <span className="word-tooltip-root-arabic">{word.root}</span>
        </div>
      )}
    </div>,
    document.body,
  );
}
