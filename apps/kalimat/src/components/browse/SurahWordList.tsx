import { useState, useEffect } from 'react';
import { surahNames } from '@/data/surah-names';
import { rootFrequencyMap } from '@/data/root-frequency';
import { useSurahLoader } from '@/hooks/useSurahLoader';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';
import type { QuranWord } from '@/types';

interface SurahWordListProps {
  surahNum: number;
  navigate: (path: string) => void;
}

export function SurahWordList({ surahNum, navigate }: SurahWordListProps) {
  const { loadSurah, loading } = useSurahLoader();
  const [words, setWords] = useState<QuranWord[]>([]);

  const surah = surahNames.find(s => s.num === surahNum);

  useEffect(() => {
    loadSurah(surahNum).then(setWords);
  }, [surahNum, loadSurah]);

  // Group words by ayah
  const ayahs = new Map<number, QuranWord[]>();
  for (const w of words) {
    const list = ayahs.get(w.ayahNum) ?? [];
    list.push(w);
    ayahs.set(w.ayahNum, list);
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => navigate('#/surahs')}>Surahs</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{surah?.english ?? `Surah ${surahNum}`}</span>
        </div>
        <h1 className="topic-title-en">{surah?.english}</h1>
        <h2 className="topic-title-ar font-arabic" dir="rtl">{surah?.arabic}</h2>
        <p className="topic-description">{words.length} words across {ayahs.size} ayahs</p>
      </div>

      {loading ? (
        <p style={{ color: 'var(--color-muted-foreground)' }}>Loading words...</p>
      ) : (
        <div className="word-table-wrapper">
          <table className="word-table">
            <thead>
              <tr>
                <th>Ayah</th>
                <th className="arabic-col">Word</th>
                <th>Meaning</th>
                <th>Root</th>
                <th>Freq</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {words.map(w => {
                const rootFreq = rootFrequencyMap[w.root];
                return (
                  <tr
                    key={w.id}
                    onClick={() => navigate(`#/ayah/${surahNum}/${w.ayahNum}`)}
                  >
                    <td>{w.ayahNum}:{w.wordNum}</td>
                    <td className="arabic-cell">{w.word}</td>
                    <td style={{ fontSize: '0.82rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {w.meaning}
                    </td>
                    <td className="root-cell">{w.root}</td>
                    <td>
                      {rootFreq && <FrequencyBadge tier={rootFreq.tier} />}
                    </td>
                    <td>
                      <button
                        className="btn"
                        style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', whiteSpace: 'nowrap' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`#/word/${surahNum}/${w.ayahNum}/${w.wordNum}`);
                        }}
                      >
                        Anatomy
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
