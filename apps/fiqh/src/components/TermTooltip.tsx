import { useState, useCallback } from 'react';
import { removeDiacritics } from '@arabtools/core';
import type { FiqhTerm } from '../types';

interface TermTooltipProps {
  textAr: string;
  terms: FiqhTerm[];
}

export function TermTooltip({ textAr, terms }: TermTooltipProps) {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  const handleClick = useCallback((termId: string) => {
    setActiveTerm(prev => prev === termId ? null : termId);
  }, []);

  if (terms.length === 0) {
    return <span>{textAr}</span>;
  }

  // Build a map of normalized term → term data
  const termMap = new Map<string, FiqhTerm>();
  for (const t of terms) {
    termMap.set(removeDiacritics(t.termAr), t);
  }

  // Split text into segments, highlighting known terms
  const normalizedText = removeDiacritics(textAr);
  const words = textAr.split(/(\s+)/);
  const normalizedWords = normalizedText.split(/(\s+)/);

  const segments: Array<{ text: string; term?: FiqhTerm }> = [];

  for (let i = 0; i < words.length; i++) {
    const nw = normalizedWords[i];
    const term = termMap.get(nw);
    if (term) {
      segments.push({ text: words[i], term });
    } else {
      segments.push({ text: words[i] });
    }
  }

  return (
    <span>
      {segments.map((seg, i) => {
        if (!seg.term) return <span key={i}>{seg.text}</span>;

        const isActive = activeTerm === seg.term.id;

        return (
          <span
            key={i}
            className={`term-highlight ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(seg.term!.id)}
          >
            {seg.text}
            <span className="term-tooltip">
              <span className="term-tooltip-ar">{seg.term.termAr}</span>
              <span className="term-tooltip-translit">{seg.term.transliteration}</span>
              <span className="term-tooltip-en">{seg.term.termEn}</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
