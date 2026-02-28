import { useMemo } from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import type { Poet, EraInfo, Poem } from '../types';

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

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

interface PoetViewProps {
  poet: Poet;
  eras: EraInfo[];
  poems: Poem[];
  onNavigatePoem: (poemId: string) => void;
  onGoHome: () => void;
}

export function PoetView({
  poet,
  eras,
  poems,
  onNavigatePoem,
  onGoHome,
}: PoetViewProps) {
  const era = useMemo(() => eras.find(e => e.id === poet.era), [eras, poet.era]);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button className="breadcrumb-link" onClick={onGoHome}>Home</button>
        <ChevronRight size={12} className="breadcrumb-sep" />
        <span className="breadcrumb-current">{poet.nameEn}</span>
      </div>

      {/* Poet Header */}
      <div className="poet-header">
        <h1 className="poet-name-ar-large font-arabic" dir="rtl">{poet.nameAr}</h1>
        <h2 className="poet-name-en-large">{poet.nameEn}</h2>
        <div className="poet-meta">
          <span className="poet-dates">
            <Calendar size={13} />
            {poet.dates}
          </span>
          {era && <span className="era-badge">{era.nameEn}</span>}
          {poet.genres.map(g => (
            <span key={g} className="genre-badge">
              {GENRE_NAMES[g]?.en ?? g}
            </span>
          ))}
        </div>
        <p className="poet-bio">{poet.bioEn}</p>
      </div>

      {/* Poem Listing */}
      <h3 className="section-heading">
        Poems ({poems.length})
      </h3>

      <div className="poem-cards">
        {poems.map((poem, i) => {
          const firstVerse = poem.verses[0];
          const preview = firstVerse
            ? firstVerse.ajuz
              ? `${firstVerse.sadr}  ***  ${firstVerse.ajuz}`
              : firstVerse.sadr
            : '';

          return (
            <button
              key={poem.id}
              className="poem-card"
              onClick={() => onNavigatePoem(poem.id)}
              style={{ animationDelay: `${i * 0.04}s`, animation: 'fadeInUp 0.4s ease both' }}
            >
              <div className="poem-card-title-ar font-arabic" dir="rtl">{poem.titleAr}</div>
              <div className="poem-card-title-en">{poem.titleEn}</div>
              <div className="poem-card-badges">
                <span className="genre-badge">
                  {GENRE_NAMES[poem.genre]?.en ?? poem.genre}
                </span>
                <span className={`level-badge ${poem.level}`}>
                  {LEVEL_LABELS[poem.level]}
                </span>
              </div>
              {preview && (
                <div className="poem-card-preview font-arabic" dir="rtl">
                  {preview}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
