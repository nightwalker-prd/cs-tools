import { usePersistedState } from '@arabtools/core';
import type { VocabBand, ViewMode } from '../types';
import type { BandStatsMap } from '../types';

interface WordTreeProps {
  bands: VocabBand[];
  activeSlug: string;
  onNavigate: (slug: string) => void;
  viewMode: ViewMode;
  bandStats: BandStatsMap;
}

export function WordTree({ bands, activeSlug, onNavigate, viewMode, bandStats }: WordTreeProps) {
  const [expanded, setExpanded] = usePersistedState<string[]>('arabtools-mufradat-expanded', ['1k']);

  const toggleSection = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Extract active band from slug
  const activeBandId = activeSlug.startsWith('band-') ? activeSlug.replace('band-', '') : '';

  return (
    <nav className="sidebar-nav">
      {bands.map(band => {
        const isExpanded = expanded.includes(band.id);
        const isBandActive = band.id === activeBandId;
        const stats = bandStats[band.id as keyof BandStatsMap];

        // In study mode, compute due count for this band
        const bandDueCount = stats
          ? stats.learning + stats.review + stats.newCount
          : 0;

        // In study mode, skip bands with nothing to study
        if (viewMode === 'study' && bandDueCount === 0) return null;

        const totalWords = band.posGroups.reduce((sum, g) => sum + g.wordIds.length, 0);

        return (
          <div key={band.id} className="folder-group">
            <button
              className={`folder-header ${isBandActive ? 'active' : ''}`}
              onClick={() => toggleSection(band.id)}
            >
              <svg className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="folder-name">{band.titleEn}</span>
              <span className="folder-count">
                {viewMode === 'study' ? bandDueCount : totalWords}
              </span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {/* Band overview link */}
                <button
                  className={`nav-item ${activeSlug === `band-${band.id}` ? 'active' : ''}`}
                  onClick={() => onNavigate(`band-${band.id}`)}
                >
                  <span
                    className="nav-dot"
                    style={{ backgroundColor: band.color, opacity: 0.7 }}
                  />
                  <span className="nav-title">All Words</span>
                </button>

                {/* POS subcategories */}
                {band.posGroups.map(group => {
                  const count = group.wordIds.length;
                  if (viewMode === 'study' && count === 0) return null;

                  return (
                    <button
                      key={group.id}
                      className={`nav-item ${activeSlug === `band-${band.id}?pos=${group.pos}` ? 'active' : ''}`}
                      onClick={() => onNavigate(`band-${band.id}?pos=${group.pos}`)}
                    >
                      <span className="nav-dot" />
                      <span className="nav-title">{group.posAr}</span>
                      <span className="folder-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
