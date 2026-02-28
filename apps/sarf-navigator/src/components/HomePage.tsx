import type { SarfTopic, SarfCategory } from '../data/types';

interface HomePageProps {
  categories: SarfCategory[];
  allTopics: SarfTopic[];
  onNavigate: (slug: string) => void;
}

export function HomePage({ categories, allTopics, onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="hero">
        <h1 className="hero-title">Sarf Navigator</h1>
        <p className="hero-subtitle font-arabic">دليل الصرف</p>
        <p className="hero-description">
          Interactive Arabic morphology reference with beginner, intermediate, and advanced levels.
        </p>
      </div>

      <div className="nav-cards">
        {categories.map(cat => {
          const topicCount = allTopics.filter(t => t.categoryId === cat.id).length;
          const firstTopicId = cat.subcategories[0]?.topicIds[0];

          return (
            <button
              key={cat.id}
              className="nav-card"
              onClick={() => firstTopicId && onNavigate(firstTopicId)}
            >
              <div className="nav-card-header">
                <h2>{cat.titleEn}</h2>
                <span className="font-arabic">{cat.titleAr}</span>
              </div>
              <p className="nav-card-desc">{cat.description}</p>
              <div className="nav-card-tags">
                <span className="tag">{topicCount} topics</span>
                {cat.subcategories.map(sub => (
                  <span key={sub.id} className="tag">{sub.titleEn}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="home-content">
        <div className="home-stats">
          <div className="stat">
            <div className="stat-value">{allTopics.length}</div>
            <div className="stat-label">Topics</div>
          </div>
          <div className="stat">
            <div className="stat-value">{allTopics.reduce((sum, t) => sum + t.levels.length, 0)}</div>
            <div className="stat-label">Lessons</div>
          </div>
          <div className="stat">
            <div className="stat-value">3</div>
            <div className="stat-label">Levels</div>
          </div>
        </div>
      </div>
    </div>
  );
}
