import { Play, RefreshCw, Shuffle } from 'lucide-react';
import type { Route } from '../hooks/useHashRouter';
import type { SarfSrsState } from '../hooks/useSarfSrs';

interface HomePageProps {
  onNavigate: (route: Route) => void;
  srs: SarfSrsState;
}

export function HomePage({ onNavigate, srs }: HomePageProps) {
  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="hero-title font-arabic" dir="rtl">تمارين الصرف</h1>
        <h2 className="hero-subtitle">Sarf Exercises</h2>
        <p className="hero-description">
          Practice Arabic verb conjugation, translation, and form identification
          with SRS-powered spaced repetition across 500+ verbs.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className="quick-start-grid">
        <button className="quick-start-card" onClick={() => onNavigate('config')}>
          <div className="card-icon">
            <Play size={20} />
          </div>
          <h3>New Session</h3>
          <p>Configure a custom exercise session</p>
        </button>

        <button className="quick-start-card" onClick={() => onNavigate('config')}>
          <div className="card-icon">
            <RefreshCw size={20} />
          </div>
          <h3>Review Due</h3>
          <p>{srs.stats.due > 0 ? `${srs.stats.due} cards due` : 'No cards due'}</p>
        </button>

        <button className="quick-start-card" onClick={() => onNavigate('config')}>
          <div className="card-icon">
            <Shuffle size={20} />
          </div>
          <h3>Mixed Practice</h3>
          <p>Random exercises across all types</p>
        </button>
      </div>

      {/* SRS Dashboard */}
      {srs.stats.total > 0 && (
        <div className="srs-dashboard">
          <h2>SRS Progress</h2>
          <div className="srs-dashboard-stats">
            <div className="srs-dashboard-stat">
              <div className="stat-value">{srs.stats.total}</div>
              <div className="stat-label">Total Cards</div>
            </div>
            <div className="srs-dashboard-stat">
              <div className="stat-value">{srs.stats.due}</div>
              <div className="stat-label">Due Now</div>
            </div>
            <div className="srs-dashboard-stat">
              <div className="stat-value">{srs.stats.learning}</div>
              <div className="stat-label">Learning</div>
            </div>
            <div className="srs-dashboard-stat">
              <div className="stat-value">{srs.stats.review}</div>
              <div className="stat-label">Mastered</div>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Types Overview */}
      <div className="srs-dashboard exercise-types-section">
        <h2>Exercise Types</h2>
        <div className="exercise-types-grid">
          <div className="exercise-type-row">
            <span>
              <strong>Conjugation (تصريف)</strong> — Given root + seegah label, produce the conjugated form
            </span>
          </div>
          <div className="exercise-type-row">
            <span>
              <strong>Translation (ترجمة)</strong> — Translate between Arabic conjugated forms and English meanings
            </span>
          </div>
          <div className="exercise-type-row">
            <span>
              <strong>Labeling (تسمية)</strong> — Given a conjugated form, identify the seegah label
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
