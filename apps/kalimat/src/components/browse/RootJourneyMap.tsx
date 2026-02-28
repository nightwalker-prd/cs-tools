import { useMemo, useState } from 'react';
import { surahWordStats } from '@/data/surah-word-stats';
import { surahNames } from '@/data/surah-names';

interface RootJourneyMapProps {
  root: string;
  navigate: (path: string) => void;
}

function getLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (max <= 1) return 1;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

const LEVEL_COLORS = [
  'var(--color-muted)',       // 0: no occurrences
  'rgba(34, 197, 94, 0.25)', // 1: light
  'rgba(34, 197, 94, 0.45)', // 2: medium-light
  'rgba(34, 197, 94, 0.65)', // 3: medium
  'rgba(34, 197, 94, 0.9)',  // 4: dark
];

export function RootJourneyMap({ root, navigate }: RootJourneyMapProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { counts, max, totalOccurrences, surahSpread } = useMemo(() => {
    const c = surahWordStats.map(s => s.wordsByRoot[root] ?? 0);
    const m = Math.max(...c);
    const total = c.reduce((a, b) => a + b, 0);
    const spread = c.filter(v => v > 0).length;
    return { counts: c, max: m, totalOccurrences: total, surahSpread: spread };
  }, [root]);

  if (totalOccurrences === 0) return null;

  return (
    <div className="journey-map">
      <div className="journey-map-stats">
        <span>
          <strong>{totalOccurrences}</strong> occurrences across <strong>{surahSpread}</strong> surah{surahSpread !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="journey-map-grid">
        {counts.map((count, i) => {
          const level = getLevel(count, max);
          const surah = surahNames[i];
          return (
            <div
              key={i}
              className="journey-map-cell"
              style={{ background: LEVEL_COLORS[level] }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => navigate(`#/read/${i + 1}`)}
            >
              {hoveredIdx === i && (
                <div className="journey-map-tooltip">
                  <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>
                    {surah?.transliteration}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-foreground)' }}>
                    Surah {i + 1} &middot; {count} occurrence{count !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="journey-map-legend">
        <span style={{ fontSize: '0.7rem', color: 'var(--color-muted-foreground)' }}>Less</span>
        {[0, 1, 2, 3, 4].map(lvl => (
          <div
            key={lvl}
            className="journey-map-legend-cell"
            style={{ background: LEVEL_COLORS[lvl] }}
          />
        ))}
        <span style={{ fontSize: '0.7rem', color: 'var(--color-muted-foreground)' }}>More</span>
      </div>
    </div>
  );
}
