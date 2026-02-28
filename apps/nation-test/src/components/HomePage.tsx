import type { TestType } from '../types';
import { categories, testTypes, presets } from './test-config/constants';

interface HomePageProps {
  onNavigate: (type: TestType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="home-page">
      {/* Hero */}
      <div className="hero">
        <h1 className="hero-title">Arabic Vocabulary Test</h1>
        <p className="hero-subtitle font-arabic" dir="rtl">اختبار المفردات العربية</p>
        <p className="hero-description">
          Research-based vocabulary assessment implementing Paul Nation's methodology.
          Estimate your vocabulary size, test at specific frequency levels, and track
          your Arabic language growth.
        </p>
      </div>

      {/* Presets */}
      <div className="preset-grid">
        {presets.map(preset => (
          <button
            key={preset.id}
            className="preset-card"
            onClick={() => onNavigate(preset.config.type)}
          >
            <div className="preset-card-header">
              <h3>{preset.name}</h3>
              <span className="preset-type-badge">
                {testTypes.find(t => t.type === preset.config.type)?.icon}
              </span>
            </div>
            <p className="preset-card-desc">{preset.description}</p>
          </button>
        ))}
      </div>

      {/* Category overview */}
      <div className="category-overview">
        <h2>Test Categories</h2>
        <div className="category-cards">
          {categories.map(cat => (
            <div key={cat.id} className="category-card">
              <div className="category-card-header">
                <h3>{cat.name}</h3>
                <span className="category-count">{cat.types.length} tests</span>
              </div>
              <p className="category-card-desc">{cat.description}</p>
              <div className="category-card-types">
                {cat.types.slice(0, 4).map(type => {
                  const info = testTypes.find(t => t.type === type);
                  return info ? (
                    <button
                      key={type}
                      className="category-type-chip"
                      onClick={() => onNavigate(type)}
                    >
                      {info.icon}
                      <span>{info.name}</span>
                    </button>
                  ) : null;
                })}
                {cat.types.length > 4 && (
                  <span className="category-more">+{cat.types.length - 4} more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Note */}
      <div className="research-note">
        <p className="research-note-title">About This Test</p>
        <p>
          Based on Paul Nation's vocabulary testing research. The Vocabulary Size Test (VST)
          estimates total vocabulary knowledge, while the Vocabulary Levels Test (VLT) measures
          mastery at specific frequency bands. The Yes/No test includes pseudowords to control
          for guessing, with scores adjusted accordingly.
        </p>
      </div>
    </div>
  );
}
