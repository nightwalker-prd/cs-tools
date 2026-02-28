import { BookOpen } from 'lucide-react';
import type { KitabMeta } from '../types';
import { CATEGORIES } from '../data/categories';

interface HomePageProps {
  index: KitabMeta[];
  onNavigateCategory: (categoryId: string) => void;
}

export function HomePage({ index, onNavigateCategory }: HomePageProps) {
  const totalSections = index.reduce((sum, k) => sum + k.sectionCount, 0);

  return (
    <div className="animate-fade-in">
      <div className="hero">
        <div className="hero-icon">
          <BookOpen size={32} />
        </div>
        <h1 className="hero-title">Mukhtasar al-Quduri</h1>
        <p className="hero-subtitle">مختصر القدوري</p>
        <p className="hero-description">
          A foundational text of Hanafi fiqh by Imam al-Quduri (d. 428 AH).
          Study the complete text with interactive navigation, glossary, and quizzes.
        </p>
      </div>

      <div className="home-stats">
        <div className="home-stat">
          <div className="home-stat-value">{index.length}</div>
          <div className="home-stat-label">Kutub</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">{totalSections}</div>
          <div className="home-stat-label">Sections</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">{CATEGORIES.length}</div>
          <div className="home-stat-label">Categories</div>
        </div>
      </div>

      <h2 className="section-heading">Browse by Category</h2>

      <div className="category-cards">
        {CATEGORIES.map(cat => {
          const kutub = index.filter(k => cat.kitabIds.includes(k.id));
          return (
            <button
              key={cat.id}
              className="category-card"
              onClick={() => onNavigateCategory(cat.id)}
            >
              <div className="category-card-icon">{cat.icon}</div>
              <div className="category-card-header">
                <div>
                  <div className="category-card-name-en">{cat.titleEn}</div>
                  <div className="category-card-name-ar">{cat.titleAr}</div>
                </div>
              </div>
              <div className="category-card-description">{cat.description}</div>
              <div className="category-card-count">
                {kutub.length} kutub
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
