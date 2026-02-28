import { memo, useCallback, useMemo } from 'react';
import { splitArabicWords } from '@arabtools/core';
import type { VocabLookup, VocabMatch } from '../utils/vocab-matcher';
import type { IrabWord } from '../types';

interface AnnotatedVerseProps {
  text: string;
  className?: string;
  vocabLookup: VocabLookup;
  onWordClick: (el: HTMLElement) => void;
  verseIndex: number;
  half: 'sadr' | 'ajuz';
  irabWords?: IrabWord[];
  showIrab?: boolean;
  onIrabClick?: (annotation: IrabWord, el: HTMLElement) => void;
}

interface Token {
  text: string;
  match: VocabMatch | null;
  wordIndex: number;
}

export const AnnotatedVerse = memo(function AnnotatedVerse({
  text,
  className,
  vocabLookup,
  onWordClick,
  verseIndex,
  half,
  irabWords,
  showIrab,
  onIrabClick,
}: AnnotatedVerseProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const target = e.currentTarget;
      onWordClick(target);
    },
    [onWordClick],
  );

  const handleIrabBadgeClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, annotation: IrabWord) => {
      e.stopPropagation();
      if (onIrabClick) {
        onIrabClick(annotation, e.currentTarget);
      }
    },
    [onIrabClick],
  );

  const words = splitArabicWords(text);

  const tokens = useMemo(() => {
    const result: Token[] = [];
    let i = 0;
    while (i < words.length) {
      // When showIrab is active, skip phrase matching so each word gets its own badge
      if (!showIrab) {
        let phraseMatch: VocabMatch | null = null;
        if (vocabLookup.maxPhraseLength > 0) {
          phraseMatch = vocabLookup.matchPhrase(words, i);
        }
        if (phraseMatch) {
          result.push({
            text: words.slice(i, i + phraseMatch.span).join(' '),
            match: phraseMatch,
            wordIndex: i,
          });
          i += phraseMatch.span;
          continue;
        }
      }
      const singleMatch = vocabLookup.match(words[i]);
      result.push({
        text: words[i],
        match: singleMatch,
        wordIndex: i,
      });
      i++;
    }
    return result;
  }, [words, vocabLookup, showIrab]);

  const containerClass = showIrab
    ? `${className ?? ''} irab-active`
    : className;

  return (
    <span className={containerClass}>
      {tokens.map((token, ti) => {
        const irab = showIrab && irabWords ? irabWords[token.wordIndex] : null;

        const wordContent = !token.match ? (
          <span className="irab-word-text">{token.text}</span>
        ) : (
          <span
            className={token.match.tier === 'curated' ? 'vocab-word-highlight' : 'vocab-word-dict'}
            data-tooltip-id={`${verseIndex}-${half}-${token.wordIndex}`}
            onClick={handleClick}
          >
            {token.text}
            <span className="vocab-tooltip">
              <span className="vocab-tooltip-ar">{token.match.word}</span>
              <span className="vocab-tooltip-en">{token.match.meaning}</span>
            </span>
          </span>
        );

        if (irab) {
          return (
            <span key={token.wordIndex} className="irab-word-stack">
              {ti > 0 ? ' ' : ''}
              {wordContent}
              <span
                className={`irab-badge irab-${irab.category}`}
                onClick={(e) => handleIrabBadgeClick(e, irab)}
              >
                {irab.roleAr}
              </span>
            </span>
          );
        }

        return (
          <span key={token.wordIndex}>
            {ti > 0 ? ' ' : ''}
            {wordContent}
          </span>
        );
      })}
    </span>
  );
});
