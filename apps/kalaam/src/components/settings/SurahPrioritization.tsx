import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import type { SurahIndex } from '@/types';

interface SurahPrioritizationProps {
  prioritizedSurahs: number[];
  onUpdate: (surahs: number[]) => void;
}

let surahCache: SurahIndex[] | null = null;

export default function SurahPrioritization({
  prioritizedSurahs,
  onUpdate,
}: SurahPrioritizationProps) {
  const [expanded, setExpanded] = useState(false);
  const [surahs, setSurahs] = useState<SurahIndex[] | null>(surahCache);
  const [loading, setLoading] = useState(surahCache === null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (surahCache) {
      setSurahs(surahCache);
      setLoading(false);
      return;
    }

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
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const prioritizedSet = useMemo(() => new Set(prioritizedSurahs), [prioritizedSurahs]);

  const filteredSurahs = useMemo(() => {
    if (!surahs) return [];
    if (!searchQuery.trim()) return surahs;

    const q = searchQuery.trim().toLowerCase();
    return surahs.filter(
      (s) =>
        s.english.toLowerCase().includes(q) ||
        s.arabic.includes(q) ||
        s.transliteration.toLowerCase().includes(q) ||
        s.surahNum.toString() === q,
    );
  }, [surahs, searchQuery]);

  const handleToggle = useCallback(
    (surahNum: number) => {
      if (prioritizedSet.has(surahNum)) {
        onUpdate(prioritizedSurahs.filter((n) => n !== surahNum));
      } else {
        onUpdate([...prioritizedSurahs, surahNum].sort((a, b) => a - b));
      }
    },
    [prioritizedSurahs, prioritizedSet, onUpdate],
  );

  const selectedCount = prioritizedSurahs.length;

  return (
    <div className="bg-card rounded-2xl overflow-hidden">
      {/* Collapsible header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div>
          <h2 className="text-lg font-semibold text-text">Surah Prioritization</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            {selectedCount} surah{selectedCount !== 1 ? 's' : ''} prioritized
          </p>
        </div>
        {expanded ? (
          <ChevronUp size={20} className="text-text-secondary" />
        ) : (
          <ChevronDown size={20} className="text-text-secondary" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5">
          {/* Search input */}
          <div className="relative mb-3">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Search surahs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white border border-border
                focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                placeholder:text-text-secondary/50"
            />
          </div>

          {/* Surah list */}
          <div className="max-h-80 overflow-y-auto space-y-0.5 -mx-1 px-1">
            {loading && (
              <div className="py-6 text-center text-sm text-text-secondary">
                Loading surahs...
              </div>
            )}

            {!loading && filteredSurahs.length === 0 && (
              <div className="py-6 text-center text-sm text-text-secondary">
                No surahs match your search.
              </div>
            )}

            {filteredSurahs.map((surah) => {
              const isChecked = prioritizedSet.has(surah.surahNum);
              return (
                <label
                  key={surah.surahNum}
                  className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-card-hover
                    cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(surah.surahNum)}
                    className="w-4 h-4 rounded border-border text-primary
                      focus:ring-primary/30 focus:ring-2 shrink-0 accent-primary"
                  />
                  <span className="w-7 text-xs text-text-secondary text-right shrink-0">
                    {surah.surahNum}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-text truncate">
                        {surah.english}
                      </span>
                      <span className="font-arabic text-base shrink-0">{surah.arabic}</span>
                    </div>
                    <span className="text-xs text-text-secondary">
                      {surah.ayahCount} ayahs
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
