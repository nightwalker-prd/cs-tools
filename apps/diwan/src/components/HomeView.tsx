import { useMemo } from 'react';
import { Feather, BookMarked, Calendar } from 'lucide-react';
import type { Poet, EraInfo } from '../types';

const GENRE_NAMES: Record<string, { ar: string; en: string }> = {
  ghazal: { ar: 'غزل', en: 'Love Poetry' },
  madih: { ar: 'مديح', en: 'Panegyric' },
  hija: { ar: 'هجاء', en: 'Satire' },
  ritha: { ar: 'رثاء', en: 'Elegy' },
  zuhd: { ar: 'زهد', en: 'Ascetic' },
  khamriyyat: { ar: 'خمريات', en: 'Wine Poetry' },
  wasf: { ar: 'وصف', en: 'Descriptive' },
  fakhr: { ar: 'فخر', en: 'Boastful' },
  hikma: { ar: 'حكمة', en: 'Wisdom' },
  sufi: { ar: 'تصوّف', en: 'Sufi' },
  hanin: { ar: 'حنين', en: 'Nostalgia' },
  wataniyyat: { ar: 'وطنيات', en: 'Patriotic' },
};

interface HomeViewProps {
  poets: Poet[];
  eras: EraInfo[];
  totalPoems: number;
  poemCountByPoet: (poetId: string) => number;
  onNavigatePoet: (poetId: string) => void;
}

export function HomeView({
  poets,
  eras,
  totalPoems,
  poemCountByPoet,
  onNavigatePoet,
}: HomeViewProps) {
  const eraMap = useMemo(() => {
    const map = new Map<string, EraInfo>();
    for (const era of eras) {
      map.set(era.id, era);
    }
    return map;
  }, [eras]);

  return (
    <div className="animate-fade-in">
      <div className="hero">
        <div className="hero-icon">
          <Feather size={32} />
        </div>
        <h1 className="hero-title">Diwan</h1>
        <p className="hero-subtitle font-arabic">ديوان الشعر العربي</p>
        <p className="hero-description">
          A curated collection of Arabic poetry spanning fourteen centuries,
          from the pre-Islamic odes to modern free verse. Read, study, and
          appreciate the masterpieces of the Arabic poetic tradition.
        </p>
      </div>

      <div className="home-stats">
        <div className="home-stat">
          <div className="home-stat-value">{poets.length}</div>
          <div className="home-stat-label">Poets</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">{totalPoems}</div>
          <div className="home-stat-label">Poems</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">{eras.length}</div>
          <div className="home-stat-label">Eras</div>
        </div>
      </div>

      <h2 className="section-heading">Poets</h2>

      <div className="nav-cards">
        {poets.map((poet, i) => {
          const era = eraMap.get(poet.era);
          const poemCount = poemCountByPoet(poet.id);

          return (
            <button
              key={poet.id}
              className="nav-card"
              onClick={() => onNavigatePoet(poet.id)}
              style={{ animationDelay: `${i * 0.04}s`, animation: 'fadeInUp 0.4s ease both' }}
            >
              <div className="nav-card-name-ar font-arabic">{poet.nameAr}</div>
              <h2 className="nav-card-name-en">{poet.nameEn}</h2>
              <div className="nav-card-dates">
                <Calendar size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem' }} />
                {poet.dates}
              </div>
              <div className="nav-card-badges">
                {era && <span className="era-badge">{era.nameEn}</span>}
                {poet.genres.map(g => (
                  <span key={g} className="genre-badge">
                    {GENRE_NAMES[g]?.en ?? g}
                  </span>
                ))}
              </div>
              <div className="nav-card-count">
                <BookMarked size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem' }} />
                {poemCount} {poemCount === 1 ? 'poem' : 'poems'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
