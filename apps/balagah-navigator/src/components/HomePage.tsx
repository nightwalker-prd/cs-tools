import type { BalagahTopic, BalagahUnit } from '../data/types';

interface HomePageProps {
  units: BalagahUnit[];
  allTopics: BalagahTopic[];
  onNavigate: (slug: string) => void;
}

export function HomePage({ units, allTopics, onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="hero">
        <h1 className="hero-title">Balagah Navigator</h1>
        <p className="hero-subtitle font-arabic">دليل البلاغة</p>
        <p className="hero-description">
          Interactive Arabic rhetoric reference based on <em>First Steps to Understanding Balagah</em> by Hashim Mohamed.
          Covering the sciences of meanings, clarity, and embellishment.
        </p>
      </div>

      <div className="nav-cards">
        {units.map(unit => {
          const topicCount = allTopics.filter(t => t.unitId === unit.id).length;
          const firstTopicId = unit.parts[0]?.topicIds[0];

          return (
            <button
              key={unit.id}
              className="nav-card"
              onClick={() => firstTopicId && onNavigate(firstTopicId)}
            >
              <div className="nav-card-header">
                <h2>{unit.titleEn}</h2>
                <span className="font-arabic">{unit.titleAr}</span>
              </div>
              <p className="nav-card-desc">{unit.description}</p>
              <div className="nav-card-tags">
                <span className="tag">{topicCount} topics</span>
                {unit.parts.map(part => (
                  <span key={part.id} className="tag">{part.titleEn}</span>
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
            <div className="stat-value">{units.reduce((sum, u) => sum + u.parts.length, 0)}</div>
            <div className="stat-label">Parts</div>
          </div>
          <div className="stat">
            <div className="stat-value">{units.length}</div>
            <div className="stat-label">Units</div>
          </div>
        </div>
      </div>
    </div>
  );
}
