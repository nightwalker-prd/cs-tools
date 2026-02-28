import { useState, useEffect, useCallback } from 'react';
import { shuffle } from '@arabtools/core';
import { getSurahName } from '@arabtools/data';
import { useQuranText } from '../../hooks/useQuranText';
import type { AyahData } from '../../types';

interface WordOrderModeProps {
  ayahs: Array<{ surah: number; ayah: number }>;
}

interface AyahEntry {
  surah: number;
  ayah: number;
  text: string;
  surahName: string;
}

type WordOrderState = 'idle' | 'playing' | 'feedback';

export function WordOrderMode({ ayahs }: WordOrderModeProps) {
  const { loadSurah, loading: textLoading } = useQuranText();
  const [ayahTexts, setAyahTexts] = useState<AyahEntry[]>([]);
  const [currentAyah, setCurrentAyah] = useState<AyahEntry | null>(null);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [state, setState] = useState<WordOrderState>('idle');
  const [isCorrect, setIsCorrect] = useState(false);

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

      const texts = ayahs
        .map((ref) => ({
          surah: ref.surah,
          ayah: ref.ayah,
          text: surahMap.get(ref.surah)?.get(ref.ayah)?.text ?? '',
          surahName: getSurahName(ref.surah),
        }))
        .filter((a) => a.text.length > 0);
      setAyahTexts(texts);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [ayahs]); // eslint-disable-line react-hooks/exhaustive-deps

  const startRound = useCallback(() => {
    if (ayahTexts.length === 0) return;
    const randomIndex = Math.floor(Math.random() * ayahTexts.length);
    const ayah = ayahTexts[randomIndex];
    const words = ayah.text.split(/\s+/).filter((w) => w.length > 0);
    const shuffled = shuffle(words);

    setCurrentAyah(ayah);
    setScrambledWords(shuffled);
    setRemainingWords([...shuffled]);
    setSelectedWords([]);
    setState('playing');
    setIsCorrect(false);
  }, [ayahTexts]);

  const selectWord = (index: number) => {
    if (state !== 'playing') return;

    const word = remainingWords[index];
    const newSelected = [...selectedWords, word];
    const newRemaining = [...remainingWords];
    newRemaining.splice(index, 1);

    setSelectedWords(newSelected);
    setRemainingWords(newRemaining);

    // Check completion
    if (newRemaining.length === 0 && currentAyah) {
      const correctWords = currentAyah.text.split(/\s+/).filter((w) => w.length > 0);
      const correct =
        newSelected.length === correctWords.length &&
        newSelected.every((w, i) => w === correctWords[i]);
      setIsCorrect(correct);
      setState('feedback');
    }
  };

  const undoLastWord = () => {
    if (state !== 'playing' || selectedWords.length === 0) return;

    const lastWord = selectedWords[selectedWords.length - 1];
    setSelectedWords(selectedWords.slice(0, -1));
    setRemainingWords([...remainingWords, lastWord]);
  };

  const resetRound = () => {
    if (!currentAyah) return;
    setRemainingWords([...scrambledWords]);
    setSelectedWords([]);
    setState('playing');
    setIsCorrect(false);
  };

  if (textLoading) {
    return (
      <div className="revision-mode word-order-mode">
        <div className="loading-state">Loading ayah text...</div>
      </div>
    );
  }

  if (ayahTexts.length === 0) {
    return (
      <div className="revision-mode word-order-mode">
        <p className="mode-instruction">
          No ayah text available for word order exercise.
        </p>
      </div>
    );
  }

  return (
    <div className="revision-mode word-order-mode">
      <p className="mode-instruction">
        Tap the words in the correct order to reconstruct the ayah.
      </p>

      {state === 'idle' && (
        <button className="btn btn-primary" onClick={startRound}>
          Start
        </button>
      )}

      {(state === 'playing' || state === 'feedback') && currentAyah && (
        <div className="word-order-game">
          <p className="word-order-ref">
            {currentAyah.surahName} {currentAyah.surah}:{currentAyah.ayah}
          </p>

          <div className="selected-words" dir="rtl">
            {selectedWords.length > 0 ? (
              selectedWords.map((word, i) => (
                <span key={`sel-${i}`} className="word-chip selected">
                  {word}
                </span>
              ))
            ) : (
              <span className="word-placeholder">Tap words below...</span>
            )}
          </div>

          {state === 'playing' && (
            <>
              <div className="scrambled-words" dir="rtl">
                {remainingWords.map((word, i) => (
                  <button
                    key={`rem-${i}`}
                    className="word-chip scrambled"
                    onClick={() => selectWord(i)}
                  >
                    {word}
                  </button>
                ))}
              </div>

              <div className="word-order-actions">
                {selectedWords.length > 0 && (
                  <button className="btn btn-ghost btn-sm" onClick={undoLastWord}>
                    Undo
                  </button>
                )}
                <button className="btn btn-ghost btn-sm" onClick={resetRound}>
                  Reset
                </button>
              </div>
            </>
          )}

          {state === 'feedback' && (
            <div className={`word-order-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              <p className="feedback-text">
                {isCorrect ? 'Correct!' : 'Not quite right.'}
              </p>
              {!isCorrect && (
                <p className="ayah-text font-arabic correct-answer" dir="rtl">
                  {currentAyah.text}
                </p>
              )}
              <div className="feedback-actions">
                <button className="btn btn-primary" onClick={startRound}>
                  Next Ayah
                </button>
                {!isCorrect && (
                  <button className="btn btn-ghost" onClick={resetRound}>
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
