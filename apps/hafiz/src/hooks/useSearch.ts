import { useState, useMemo } from 'react';
import { SURAH_DATA, getRubDescription, getJuzForRub } from '@arabtools/data';
import type { SearchResult } from '../types';

export function useSearch() {
  const [query, setQuery] = useState('');

  const results: SearchResult[] = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    // Search surahs
    for (const surah of SURAH_DATA) {
      if (surah.name.toLowerCase().includes(q)) {
        matches.push({
          type: 'surah',
          id: surah.number,
          label: surah.name,
          sublabel: `Surah ${surah.number} - ${surah.ayahCount} ayahs`,
        });
      }
    }

    // Search rubs by description or number
    for (let rubId = 1; rubId <= 240; rubId++) {
      const desc = getRubDescription(rubId).toLowerCase();
      const juz = getJuzForRub(rubId);
      const rubLabel = `Rub ${rubId}`;

      if (
        desc.includes(q) ||
        rubLabel.toLowerCase().includes(q) ||
        `juz ${juz}`.includes(q)
      ) {
        matches.push({
          type: 'rub',
          id: rubId,
          label: `Rub' ${rubId}`,
          sublabel: `Juz ${juz} - ${getRubDescription(rubId)}`,
        });
      }
    }

    return matches.slice(0, 20);
  }, [query]);

  const clearSearch = () => setQuery('');

  return { query, setQuery, results, clearSearch };
}
