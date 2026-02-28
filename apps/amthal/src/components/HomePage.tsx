import { Lightbulb, Users, Smile, Mountain, BookOpen, Heart } from 'lucide-react';
import type { ProverbCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { getProverbCount, getProverbsByCategory } from '../data/proverbs';
import { useDailyProverb } from '../hooks/useDailyProverb';
import { DailyProverbCard } from './DailyProverbCard';
import type { AmthalProgress } from '../types';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Lightbulb,
  Users,
  Smile,
  Mountain,
  BookOpen,
  Heart,
};

interface HomePageProps {
  navigate: (hash: string) => void;
  progress: AmthalProgress;
}

export function HomePage({ navigate, progress }: HomePageProps) {
  const dailyProverb = useDailyProverb();

  return (
    <div className="animate-fade-in-up">
      <DailyProverbCard
        proverb={dailyProverb}
        onViewDetail={(id) => navigate(`proverb/${id}`)}
      />

      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-value">{getProverbCount()}</div>
          <div className="stat-label">Proverbs</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{CATEGORIES.length}</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{progress.viewedProverbs.length}</div>
          <div className="stat-label">Explored</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{progress.currentStreak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
      </div>

      <div className="section-header">
        <h2 className="section-title">Categories</h2>
        <button className="section-link" onClick={() => navigate('browse')}>
          Browse All →
        </button>
      </div>

      <div className="category-grid">
        {CATEGORIES.map(cat => {
          const Icon = ICON_MAP[cat.icon] || BookOpen;
          const count = getProverbsByCategory(cat.id as ProverbCategory).length;
          return (
            <button
              key={cat.id}
              className="category-card"
              style={{ '--category-color': cat.color } as React.CSSProperties}
              onClick={() => navigate(`browse/${cat.id}`)}
            >
              <div className="category-card-icon">
                <Icon size={20} />
              </div>
              <div className="category-card-name">{cat.nameEn}</div>
              <div className="category-card-name-ar">{cat.nameAr}</div>
              <div className="category-card-count">{count} proverbs</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
