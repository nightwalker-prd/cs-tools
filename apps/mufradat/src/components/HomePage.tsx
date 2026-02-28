import type { VocabBand, BandStatsMap } from '../types';

interface HomePageProps {
  bands: VocabBand[];
  bandStats: BandStatsMap;
  dueCount: number;
  masteredCount: number;
  totalCount: number;
  onNavigate: (slug: string) => void;
}

export function HomePage({ bands, bandStats, dueCount, masteredCount, totalCount, onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="hero">
        <h1 className="hero-title">Mufradat</h1>
        <p className="hero-subtitle font-arabic">مفردات</p>
        <p className="hero-description">
          Root-family vocabulary builder with {totalCount.toLocaleString()} words across 5 frequency bands.
          Browse word families by frequency and part of speech, or study with spaced repetition.
        </p>
      </div>

      <div className="nav-cards">
        {bands.map(band => {
          const stats = bandStats[band.id as keyof BandStatsMap];
          const totalWords = band.posGroups.reduce((sum, g) => sum + g.wordIds.length, 0);
          const learned = stats ? stats.learning + stats.review + stats.mastered : 0;
          const bandDue = stats ? stats.learning + stats.review : 0;
          const pct = totalWords > 0 ? Math.round((learned / totalWords) * 100) : 0;

          return (
            <button
              key={band.id}
              className="nav-card"
              onClick={() => onNavigate(`band-${band.id}`)}
            >
              <div className="nav-card-header">
                <h2>{band.titleEn}</h2>
                <span className="font-arabic">{band.titleAr}</span>
              </div>
              <p className="nav-card-desc">{band.description}</p>
              <div className="progress-bar" style={{ marginTop: '0.75rem' }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${pct}%`, backgroundColor: band.color }}
                />
              </div>
              <div className="nav-card-tags">
                <span className="tag">{totalWords} words</span>
                {stats?.mastered ? <span className="tag">{stats.mastered} mastered</span> : null}
                {bandDue > 0 && <span className="tag">{bandDue} due</span>}
              </div>
            </button>
          );
        })}
      </div>

      {dueCount > 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="btn btn-primary"
            style={{ padding: '0.875rem 2.5rem', fontSize: '1.1rem' }}
            onClick={() => onNavigate('study')}
          >
            Start Study Session — {dueCount} words due
          </button>
        </div>
      )}

      <div className="home-content">
        <div className="home-stats">
          <div className="stat">
            <div className="stat-value">{masteredCount}</div>
            <div className="stat-label">Mastered</div>
          </div>
          <div className="stat">
            <div className="stat-value">{dueCount}</div>
            <div className="stat-label">Due</div>
          </div>
          <div className="stat">
            <div className="stat-value">{totalCount.toLocaleString()}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}
