import { useState, useEffect } from 'react';
import { getSurahName } from '@arabtools/data';
import { useQuranText } from '../../hooks/useQuranText';
import type { AyahData } from '../../types';

interface ActiveRecallModeProps {
  ayahs: Array<{ surah: number; ayah: number }>;
}

const VISIBLE_WORD_COUNT = 3;

export function ActiveRecallMode({ ayahs }: ActiveRecallModeProps) {
  const { loadSurah, loading: textLoading } = useQuranText();
  const [ayahTexts, setAyahTexts] = useState<
    Array<{ surah: number; ayah: number; text: string; surahName: string }>
  >([]);
  const [revealedAyahs, setRevealedAyahs] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const surahNums = [...new Set(ayahs.map((a) => a.surah))];
      const surahMap = new Map<number, Map<number, AyahData>>();

      for (const num of surahNums) {
        const data = await loadSurah(num);
        if (data) {
          const ayahMap = new Map<number, AyahData>();
          for (const a of data.ayahs) {
            ayahMap.set(a.num, a);
          }
          surahMap.set(num, ayahMap);
        }
      }

      if (cancelled) return;

      const texts = ayahs.map((ref) => ({
        surah: ref.surah,
        ayah: ref.ayah,
        text: surahMap.get(ref.surah)?.get(ref.ayah)?.text ?? '',
        surahName: getSurahName(ref.surah),
      }));
      setAyahTexts(texts);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [ayahs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset revealed state when ayahs change
  useEffect(() => {
    setRevealedAyahs(new Set());
  }, [ayahs]);

  const toggleReveal = (key: string) => {
    setRevealedAyahs((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const getFirstWords = (text: string): string => {
    const words = text.split(/\s+/);
    if (words.length <= VISIBLE_WORD_COUNT) return text;
    return words.slice(0, VISIBLE_WORD_COUNT).join(' ');
  };

  return (
    <div className="revision-mode active-recall-mode">
      <p className="mode-instruction">
        Try to recall the rest of each ayah from the first few words. Tap
        &quot;...&quot; to reveal the full text.
      </p>

      {textLoading ? (
        <div className="loading-state">Loading ayah text...</div>
      ) : (
        <div className="ayah-list">
          {ayahTexts.map((a) => {
            const key = `${a.surah}-${a.ayah}`;
            const isRevealed = revealedAyahs.has(key);
            const hasText = a.text.length > 0;
            const words = a.text.split(/\s+/);
            const canHide = words.length > VISIBLE_WORD_COUNT;

            return (
              <div key={key} className="ayah-row recall-row">
                <div className="ayah-content">
                  {hasText ? (
                    <p className="ayah-text font-arabic" dir="rtl">
                      {isRevealed || !canHide ? (
                        a.text
                      ) : (
                        <>
                          {getFirstWords(a.text)}{' '}
                          <button
                            className="reveal-btn"
                            onClick={() => toggleReveal(key)}
                          >
                            ...
                          </button>
                        </>
                      )}
                    </p>
                  ) : (
                    <p className="ayah-ref">
                      {a.surahName} {a.surah}:{a.ayah}
                    </p>
                  )}
                </div>
                {hasText && canHide && isRevealed && (
                  <button
                    className="btn btn-ghost btn-sm hide-btn"
                    onClick={() => toggleReveal(key)}
                  >
                    Hide
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
