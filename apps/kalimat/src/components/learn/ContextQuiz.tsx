import { useState, useEffect, useMemo } from 'react';
import { shuffle } from '@arabtools/core';
import { lemmas } from '@/data/lemmas';
import { ayahTranslations } from '@/data/ayah-translations';
import { useSurahLoader } from '@/hooks/useSurahLoader';
import type { Lemma } from '@/data/lemmas';
import type { QuranWord } from '@/types';

interface ContextQuizProps {
  lemma: Lemma;
  onGrade: (grade: 'again' | 'hard' | 'good' | 'easy') => void;
}

// Module-level cache for the lemma-location index
let lemmaLocationIndex: Record<string, { s: number; a: number }> | null = null;
async function getLemmaLocation(lemmaId: number): Promise<{ s: number; a: number } | null> {
  if (!lemmaLocationIndex) {
    try {
      const resp = await fetch('/data/lemma-locations.json');
      lemmaLocationIndex = await resp.json();
    } catch {
      lemmaLocationIndex = {};
    }
  }
  return lemmaLocationIndex![String(lemmaId)] ?? null;
}

export function ContextQuiz({ lemma, onGrade }: ContextQuizProps) {
  const { loadSurah } = useSurahLoader();
  const [ayahWords, setAyahWords] = useState<QuranWord[]>([]);
  const [targetWord, setTargetWord] = useState<QuranWord | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Find an ayah containing this lemma via pre-built index (1 fetch, O(1) lookup)
  useEffect(() => {
    let cancelled = false;
    const findAyah = async () => {
      const loc = await getLemmaLocation(lemma.id);
      if (!loc || cancelled) {
        if (!cancelled) setLoading(false);
        return;
      }
      const words = await loadSurah(loc.s);
      if (cancelled) return;
      const match = words.find(w => w.lemmaId === lemma.id && w.ayahNum === loc.a);
      if (match) {
        const ayahW = words.filter(w => w.ayahNum === match.ayahNum).sort((a, b) => a.wordNum - b.wordNum);
        setAyahWords(ayahW);
        setTargetWord(match);
      }
      setLoading(false);
    };
    findAyah();
    return () => { cancelled = true; };
  }, [lemma.id, loadSurah]);

  const options = useMemo(() => {
    const others = lemmas.filter(l => l.id !== lemma.id && l.meaning !== lemma.meaning);
    const shuffled = shuffle([...others]);
    const distractors = shuffled.slice(0, 3);
    return shuffle([lemma, ...distractors]);
  }, [lemma]);

  const translation = targetWord
    ? (() => {
        const parts = targetWord.id.split(':');
        const surah = parseInt(parts[0], 10);
        const ayah = parseInt(parts[1], 10);
        return ayahTranslations.find(t => t.surahNum === surah && t.ayahNum === ayah);
      })()
    : undefined;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = options[idx].id === lemma.id;
    setTimeout(() => {
      onGrade(isCorrect ? 'good' : 'again');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="study-card">
        <div className="study-card-content">
          <p style={{ color: 'var(--color-muted-foreground)' }}>Finding an ayah with this word...</p>
        </div>
      </div>
    );
  }

  if (!targetWord || ayahWords.length === 0) {
    // Fallback to simple MC if no ayah found
    return (
      <div className="study-card">
        <div className="study-card-content">
          <div className="study-card-arabic font-arabic" dir="rtl">{lemma.lemma}</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
            What does this word mean?
          </p>
          <div className="mc-options">
            {options.map((opt, i) => {
              let className = 'mc-option';
              if (selected !== null) {
                if (opt.id === lemma.id) className += ' correct';
                else if (i === selected) className += ' incorrect';
              }
              return (
                <button key={opt.id} className={className} onClick={() => handleSelect(i)} disabled={selected !== null}>
                  {opt.meaning}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Ayah context card */}
      <div className="ayah-card" style={{ marginBottom: '1rem' }}>
        <div className="ayah-arabic-text" dir="rtl" style={{ fontSize: '1.5rem' }}>
          {ayahWords.map((w, i) => (
            <span key={w.id}>
              <span className={`ayah-word ${w.id === targetWord.id ? 'highlighted' : ''}`}>
                {w.word}
              </span>
              {i < ayahWords.length - 1 && ' '}
            </span>
          ))}
        </div>
        {translation && (
          <div className="ayah-translation" style={{ fontSize: '0.85rem' }}>{translation.text}</div>
        )}
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)', marginBottom: '0.75rem' }}>
        What does the highlighted word mean?
      </p>

      {/* MC options */}
      <div className="mc-options">
        {options.map((opt, i) => {
          let className = 'mc-option';
          if (selected !== null) {
            if (opt.id === lemma.id) className += ' correct';
            else if (i === selected) className += ' incorrect';
          }
          return (
            <button key={opt.id} className={className} onClick={() => handleSelect(i)} disabled={selected !== null}>
              {opt.meaning}
            </button>
          );
        })}
      </div>

      {/* After answering, show word-by-word */}
      {selected !== null && (
        <div style={{ marginTop: '1rem' }}>
          <div className="gold-separator">
            <div className="gold-separator-diamond" />
          </div>
          <div className="word-breakdown">
            {ayahWords.map(w => (
              <div key={w.id} className="word-breakdown-item">
                <span className="word-breakdown-arabic">{w.word}</span>
                <span className="word-breakdown-english">{w.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
