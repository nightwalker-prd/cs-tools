import type { GameType, GameCategory } from '../types';
import { categories, cognitiveGames, allQuranGames } from '../data/categories';
import { useAllGameStats } from '../hooks/useGameStats';

interface HomePageProps {
  onNavigate: (category: GameCategory, gameId: GameType) => void;
}

const quickStarts: { gameId: GameType; label: string; category: GameCategory }[] = [
  { gameId: 'sequence-memory', label: 'Sequence Memory', category: 'cognitive' },
  { gameId: 'chimp-memory', label: 'Chimp Test', category: 'cognitive' },
  { gameId: 'dual-n-back', label: 'Dual N-Back', category: 'cognitive' },
  { gameId: 'digit-span-forward', label: 'Digit Span', category: 'cognitive' },
];

const quranQuickStarts: { gameId: GameType; label: string; category: GameCategory }[] = [
  { gameId: 'first-word', label: 'First Word Recall', category: 'quran' },
  { gameId: 'complete-ayah', label: 'Complete the Ayah', category: 'quran' },
  { gameId: 'quran-wordle', label: 'Quran Wordle', category: 'quran' },
  { gameId: 'speed-round', label: 'Speed Round', category: 'quran' },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const allStats = useAllGameStats();
  const totalGames = Object.values(allStats).reduce((sum, s) => sum + s.attempts.length, 0);

  return (
    <div className="home-page">
      {/* Hero */}
      <div className="hero">
        <h1 className="hero-title">Memory Training Lab</h1>
        <p className="hero-subtitle font-arabic" dir="rtl">
          مختبر الذاكرة
        </p>
        <p className="hero-description">
          Evidence-based cognitive training games targeting working memory, attention, and processing
          speed. Track your progress and push your limits.
        </p>
      </div>

      {/* Quick Start - Cognitive */}
      <div className="preset-grid">
        {quickStarts.map((qs) => {
          const game = cognitiveGames.find((g) => g.id === qs.gameId);
          if (!game) return null;
          const stats = allStats[qs.gameId];
          return (
            <button key={qs.gameId} className="preset-card" onClick={() => onNavigate(qs.category, qs.gameId)}>
              <div className="preset-card-header">
                <h3>{qs.label}</h3>
                <span className="preset-type-badge">{game.icon}</span>
              </div>
              <p className="preset-card-desc">{game.description}</p>
              {stats && stats.highScore > 0 && (
                <div className="preset-card-stat">Best: {stats.highScore}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Start - Quran */}
      <h2 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Quran Memorization</h2>
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>
        Interactive games for Quran memorization with mastery tracking (Juz 1-5)
      </p>
      <div className="preset-grid">
        {quranQuickStarts.map((qs) => {
          const game = allQuranGames.find((g) => g.id === qs.gameId);
          if (!game) return null;
          const stats = allStats[qs.gameId];
          return (
            <button key={qs.gameId} className="preset-card" onClick={() => onNavigate(qs.category, qs.gameId)}>
              <div className="preset-card-header">
                <h3>{qs.label}</h3>
                <span className="preset-type-badge">{game.icon}</span>
              </div>
              <p className="preset-card-desc">{game.description}</p>
              {stats && stats.highScore > 0 && (
                <div className="preset-card-stat">Best: {stats.highScore}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Category overview */}
      <div className="category-overview">
        <h2>Game Categories</h2>
        <div className="category-cards">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-card-header">
                <h3>{cat.title}</h3>
                <span className="category-count">{cat.games.length} games</span>
              </div>
              <p className="category-card-desc">{cat.description}</p>
              <div className="category-card-types">
                {cat.games.slice(0, 4).map((game) => (
                  <button
                    key={game.id}
                    className="category-type-chip"
                    onClick={() => onNavigate(cat.id, game.id)}
                  >
                    {game.icon}
                    <span>{game.title}</span>
                  </button>
                ))}
                {cat.games.length > 4 && (
                  <span className="category-more">+{cat.games.length - 4} more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats summary */}
      {totalGames > 0 && (
        <div className="research-note">
          <p className="research-note-title">Your Progress</p>
          <p>
            You've completed {totalGames} game{totalGames !== 1 ? 's' : ''} so far. Keep training
            consistently to see improvements in working memory and cognitive performance.
          </p>
        </div>
      )}

      {/* Research Note */}
      <div className="research-note">
        <p className="research-note-title">About Cognitive Training</p>
        <p>
          These games are based on established cognitive psychology paradigms including N-back,
          operation span, Corsi block tapping, and digit span. Research suggests that consistent
          training on these tasks can improve working memory capacity and fluid intelligence.
        </p>
      </div>
    </div>
  );
}
