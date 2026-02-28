import { useState, useEffect, useCallback } from 'react';
import type { SurahIndex } from '@/types';
import { JUZ_DIVISIONS } from '@/lib/quran-divisions';
import ErrorState from '@/components/ErrorState';

interface SurahListProps {
  viewType: 'surah' | 'juz';
  onSelectSurah: (surahNum: number) => void;
}

let surahCache: SurahIndex[] | null = null;

export default function SurahList({ viewType, onSelectSurah }: SurahListProps) {
  const [surahs, setSurahs] = useState<SurahIndex[] | null>(surahCache);
  const [loading, setLoading] = useState(surahCache === null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchSurahs = useCallback(() => {
    if (surahCache) {
      setSurahs(surahCache);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch('/data/meta/surah-index.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<SurahIndex[]>;
      })
      .then((data) => {
        surahCache = data;
        setSurahs(data);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchSurahs();
  }, [fetchSurahs, retryCount]);

  if (loading) {
    return (
      <div className="space-y-3 mt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-card" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-card rounded w-3/4" />
              <div className="h-3 bg-card rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load surah list"
        onRetry={() => setRetryCount((c) => c + 1)}
      />
    );
  }

  if (viewType === 'juz') {
    return (
      <div className="space-y-1 mt-2">
        {JUZ_DIVISIONS.map((juz) => {
          const surahName = surahs?.find((s) => s.surahNum === juz.startSurah);
          return (
            <button
              key={juz.number}
              onClick={() => onSelectSurah(juz.startSurah)}
              className="w-full flex items-center gap-3 p-3 hover:bg-card rounded-lg transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-primary-light text-primary text-sm font-medium flex items-center justify-center shrink-0">
                {juz.number}
              </span>
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium text-text truncate">
                  Juz {juz.number} &mdash; {juz.name}
                </div>
                <span className="text-xs text-text-secondary">
                  Starting from {surahName?.english ?? `Surah ${juz.startSurah}`}, Ayah {juz.startAyah}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // Surah view
  return (
    <div className="space-y-1 mt-2">
      {surahs?.map((item) => (
        <button
          key={item.surahNum}
          onClick={() => onSelectSurah(item.surahNum)}
          className="w-full flex items-center gap-3 p-3 hover:bg-card rounded-lg transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-primary-light text-primary text-sm font-medium flex items-center justify-center shrink-0">
            {item.surahNum}
          </span>
          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-medium text-text">{item.english}</span>
              <span className="font-arabic text-lg">{item.arabic}</span>
            </div>
            <span className="text-xs text-text-secondary">
              {item.ayahCount} ayahs &bull; {item.transliteration}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
