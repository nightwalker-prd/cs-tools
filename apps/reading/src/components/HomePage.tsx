import { collections, totalTextCount } from '../data/navigation';

interface HomePageProps {
  onNavigate: (textId: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      <div className="hero">
        <h1 className="hero-title">Reading Tool</h1>
        <p className="hero-subtitle font-arabic">قراءة</p>
        <p className="hero-description">
          Progressive Arabic reading texts with word-by-word translations, vocabulary highlights, and grammar concepts.
        </p>
      </div>

      <div className="nav-cards">
        {collections.map((col) => (
          <button
            key={col.id}
            className="nav-card"
            onClick={() => {
              // Navigate to the first text in the collection
              if (col.texts.length > 0) {
                onNavigate(col.texts[0].id);
              }
            }}
          >
            <div className="nav-card-header">
              <h2>{col.icon} {col.titleEn}</h2>
              <span className="font-arabic">{col.titleAr}</span>
            </div>
            <p className="nav-card-desc">{col.description}</p>
            <div className="nav-card-count">{col.texts.length} texts</div>
          </button>
        ))}
      </div>

      <div className="home-content">
        <div className="home-stats">
          <div className="stat">
            <div className="stat-value">{totalTextCount}</div>
            <div className="stat-label">Total Texts</div>
          </div>
          <div className="stat">
            <div className="stat-value">{collections.length}</div>
            <div className="stat-label">Collections</div>
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
