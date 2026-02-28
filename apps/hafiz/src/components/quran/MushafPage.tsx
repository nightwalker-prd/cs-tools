import { useState, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { useQCFPage } from '../../hooks/useQCFPage';
import { useWordData } from '../../hooks/useWordData';
import { WordTooltip } from './WordTooltip';
import type { QuranWord } from '../../types';

interface MushafPageProps {
  pageNumber: number;
  currentAyah: { surah: number; ayah: number } | null;
  onAyahClick: (surah: number, ayah: number) => void;
  rubAyahKeys?: Set<string>;
  getTranslation?: (surah: number, ayah: number) => string | null;
  showTranslation?: boolean;
}

function MushafLine({
  fontFamily,
  fontSize,
  children,
}: {
  fontFamily: string;
  fontSize: number;
  children: React.ReactNode;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    function measure() {
      if (!el) return;
      const scrollW = el.scrollWidth;
      const clientW = el.clientWidth;
      const newScale = scrollW > clientW + 1 ? clientW / scrollW : 1;
      setScale((prev) => (Math.abs(prev - newScale) < 0.001 ? prev : newScale));
    }

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={lineRef}
      className="mushaf-line"
      style={{
        fontFamily,
        fontSize: `${fontSize}rem`,
        textAlign: 'center',
        lineHeight: '2',
        minHeight: `${fontSize * 2.2}rem`,
        ...(scale < 1 ? { transform: `scaleX(${scale})` } : {}),
      }}
    >
      {children}
    </div>
  );
}

function toArabicIndic(n: number): string {
  return n.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

export function MushafPage({
  pageNumber,
  currentAyah,
  onAyahClick,
  rubAyahKeys,
  getTranslation,
  showTranslation,
}: MushafPageProps) {
  const { lines, loading, error, fontFamily } = useQCFPage(pageNumber);

  // Collect unique surah numbers from the words on this page
  const surahNums = useMemo(() => {
    const nums = new Set<number>();
    for (const line of lines) {
      for (const word of line.words) {
        const surah = Number(word.verse_key.split(':')[0]);
        if (surah) nums.add(surah);
      }
    }
    return [...nums];
  }, [lines]);

  const { getWord } = useWordData(surahNums);

  const [tooltip, setTooltip] = useState<{
    word: QuranWord;
    rect: DOMRect;
  } | null>(null);

  const handleWordClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, verseKey: string, position: number, inRub: boolean) => {
      if (!inRub) return;

      const [s, a] = verseKey.split(':');
      const surah = Number(s);
      const ayah = Number(a);

      // Look up word data for tooltip
      const wordData = getWord(surah, ayah, position);
      if (wordData) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        setTooltip({ word: wordData, rect });
      } else {
        onAyahClick(surah, ayah);
      }
    },
    [getWord, onAyahClick],
  );

  const closeTooltip = useCallback(() => setTooltip(null), []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const fontSize = isMobile ? 1.5 : 2;

  const currentKey = currentAyah ? `${currentAyah.surah}:${currentAyah.ayah}` : null;
  const fontStack = error
    ? '"KFGQPC Hafs", "Amiri", serif'
    : `"${fontFamily}", "KFGQPC Hafs", "Amiri", serif`;

  if (loading) {
    return <div className="mushaf-skeleton" />;
  }

  if (lines.length === 0) return null;

  // Collect unique verse_keys per line for translations
  const getLineTranslations = (lineWords: typeof lines[0]['words']) => {
    if (!showTranslation || !getTranslation) return null;
    const seen = new Set<string>();
    const translations: string[] = [];
    for (const w of lineWords) {
      if (!seen.has(w.verse_key)) {
        seen.add(w.verse_key);
        const [s, a] = w.verse_key.split(':');
        const t = getTranslation(Number(s), Number(a));
        if (t) translations.push(t);
      }
    }
    return translations.length > 0 ? translations : null;
  };

  return (
    <div className="mushaf-page">
      <div className="mushaf-page-number">{toArabicIndic(pageNumber)}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          direction: 'rtl',
        }}
      >
        {lines.map((line) => {
          const translations = getLineTranslations(line.words);
          return (
            <div key={line.lineNumber} className="mushaf-line-group">
              <MushafLine fontFamily={fontStack} fontSize={fontSize}>
                {line.words.map((word) => {
                  const inRub = !rubAyahKeys || rubAyahKeys.has(word.verse_key);
                  const isPlaying = word.verse_key === currentKey;
                  const isWord = word.char_type_name === 'word';

                  return (
                    <span
                      key={word.id}
                      className={`mushaf-word${isPlaying ? ' playing' : ''}${!inRub ? ' dimmed' : ''}${isWord && inRub ? ' tappable' : ''}`}
                      onClick={
                        inRub
                          ? isWord
                            ? (e) => handleWordClick(e, word.verse_key, word.position, inRub)
                            : () => {
                                const [s, a] = word.verse_key.split(':');
                                onAyahClick(Number(s), Number(a));
                              }
                          : undefined
                      }
                      dangerouslySetInnerHTML={{ __html: word.code_v1 }}
                    />
                  );
                })}
              </MushafLine>
              {translations && (
                <div className="mushaf-translation-line" dir="ltr">
                  {translations.map((t, i) => (
                    <span key={i} className="mushaf-translation-text">{t}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {error && (
        <div className="mushaf-font-fallback">Using fallback font — QCF unavailable</div>
      )}
      {tooltip && (
        <WordTooltip
          word={tooltip.word}
          anchorRect={tooltip.rect}
          onClose={closeTooltip}
        />
      )}
    </div>
  );
}
