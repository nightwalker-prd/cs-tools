import { BookOpen, BookMarked, Sprout, BarChart3, Shapes, Zap, Swords } from 'lucide-react';
import { lemmas } from '@/data/lemmas';
import { rootFrequency } from '@/data/root-frequency';
import { surahNames } from '@/data/surah-names';
import { grammarPatterns } from '@/data/grammar-patterns';
import { useLearningEngine } from '@/hooks/useLearningEngine';
import { useComprehension } from '@/hooks/useComprehension';

interface HomeProps {
  navigate: (path: string) => void;
}

export function Home({ navigate }: HomeProps) {
  const { progress, summary, stats } = useLearningEngine();
  const { overall } = useComprehension(progress);

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900 }}>
      {/* Hero */}
      <div className="hero">
        <div className="hero-gold-line" />
        <h1 className="hero-title-ar">كلمات القرآن</h1>
        <p className="hero-title-en">Quranic Vocabulary</p>
        <p className="hero-description">
          Explore and master the vocabulary of the Holy Quran through contextual study,
          root-based browsing, and spaced repetition.
        </p>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-value">{overall}%</div>
            <div className="hero-stat-label">Comprehension</div>
          </div>
          <div>
            <div className="hero-stat-value">{lemmas.length.toLocaleString()}</div>
            <div className="hero-stat-label">Words</div>
          </div>
          <div>
            <div className="hero-stat-value">{rootFrequency.length.toLocaleString()}</div>
            <div className="hero-stat-label">Roots</div>
          </div>
          <div>
            <div className="hero-stat-value">{surahNames.length}</div>
            <div className="hero-stat-label">Surahs</div>
          </div>
        </div>
      </div>

      {/* Nav Cards */}
      <div className="nav-cards">
        <button className="nav-card" onClick={() => navigate('#/read/1')}>
          <div className="nav-card-icon"><BookOpen size={28} /></div>
          <h3>Read the Quran</h3>
          <p>Read with mastery-colored words. See your comprehension grow as you learn.</p>
        </button>

        <button className="nav-card" onClick={() => navigate('#/surahs')}>
          <div className="nav-card-icon"><BookMarked size={28} /></div>
          <h3>By Surah</h3>
          <p>Browse words organized by their surah, verse by verse with word-by-word breakdowns.</p>
        </button>

        <button className="nav-card" onClick={() => navigate('#/roots')}>
          <div className="nav-card-icon"><Sprout size={28} /></div>
          <h3>By Root</h3>
          <p>Explore the 1,650 Arabic roots and see all Quranic words derived from each root.</p>
        </button>

        <button className="nav-card" onClick={() => navigate('#/frequency/1')}>
          <div className="nav-card-icon"><BarChart3 size={28} /></div>
          <h3>By Frequency</h3>
          <p>Study the most common roots first. Top 100 roots cover 60% of all Quran words.</p>
        </button>

        <button className="nav-card" onClick={() => navigate('#/patterns')}>
          <div className="nav-card-icon"><Shapes size={28} /></div>
          <h3>Grammar Patterns</h3>
          <p>Explore {grammarPatterns.length} Arabic grammar patterns with explanations and examples.</p>
        </button>

        <button className="nav-card" onClick={() => navigate('#/weak-verbs')}>
          <div className="nav-card-icon"><Zap size={28} /></div>
          <h3>Weak Verbs</h3>
          <p>Train on hollow, defective, and assimilated verbs with interactive exercises.</p>
        </button>

        <button className="nav-card" onClick={() => navigate('#/similar-words')}>
          <div className="nav-card-icon"><Swords size={28} /></div>
          <h3>Similar Words</h3>
          <p>Test your discrimination — pick the right Arabic word from visually similar options.</p>
        </button>
      </div>

      {/* Assessment CTA for users with no progress */}
      {summary.total === 0 && (
        <button
          className="btn btn-accent"
          style={{ width: '100%', maxWidth: 900, padding: '0.85rem 1.5rem', fontSize: '1rem', marginBottom: '1rem' }}
          onClick={() => navigate('#/assessment')}
        >
          Test Your Level
        </button>
      )}

      {/* Start Review CTA */}
      <button
        className="btn btn-accent"
        style={{ width: '100%', maxWidth: 900, padding: '0.85rem 1.5rem', fontSize: '1rem', marginBottom: '2rem' }}
        onClick={() => navigate('#/learn')}
      >
        Start Learning Session
      </button>

      {/* Progress Stats */}
      {summary.total > 0 && (
        <div className="stats-bar">
          <div className="stat">
            <div className="stat-value">{summary.total}</div>
            <div className="stat-label">Studied</div>
          </div>
          <div className="stat">
            <div className="stat-value">{summary.mastered}</div>
            <div className="stat-label">Mastered</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {stats.totalReviewed > 0 ? Math.round((stats.totalCorrect / stats.totalReviewed) * 100) : 0}%
            </div>
            <div className="stat-label">Accuracy</div>
          </div>
          <button
            className="btn"
            style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
            onClick={() => navigate('#/progress')}
          >
            View Full Progress
          </button>
        </div>
      )}
    </div>
  );
}
