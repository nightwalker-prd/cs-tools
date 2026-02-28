import { Flame, Trophy, Target, BookOpen, ArrowRight } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { allChallenges, getChallengesByDifficulty } from '../data/challenges';
import { categories } from '../data/categories';
import { getChallengesByCategory } from '../data/challenges';
import { DifficultyBadge } from './DifficultyBadge';

interface HomePageProps {
  onNavigate: (id: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { progress } = useProgress();
  const totalChallenges = allChallenges.length;
  const completedCount = progress.totalCompleted;

  // Find the next uncompleted challenge
  const nextChallenge = allChallenges.find(c => !progress.challenges[c.id]?.completed);

  return (
    <div className="home-page animate-fade-in">
      <div className="hero">
        <h1 className="hero-title">Bina</h1>
        <p className="hero-subtitle">بِناء</p>
        <p className="hero-description">
          Build Arabic sentences that pass grammar test cases.
          Write, test, and master sentence construction — one challenge at a time.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">{completedCount}/{totalChallenges}</div>
          <div className="stat-label">
            <Trophy size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }} />
            Completed
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{progress.currentStreak}</div>
          <div className="stat-label">
            <Flame size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }} />
            Day Streak
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{getChallengesByDifficulty('easy').length}</div>
          <div className="stat-label">
            <Target size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }} />
            Easy
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{getChallengesByDifficulty('hard').length}</div>
          <div className="stat-label">
            <Target size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }} />
            Hard
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: '400px', margin: '0 auto 2.5rem' }}>
        <div className="progress-bar" style={{ height: '8px' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0}%` }}
          />
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--color-muted-foreground)', marginTop: '0.35rem' }}>
          {Math.round(totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0)}% complete
        </div>
      </div>

      {/* Continue or Start */}
      {nextChallenge && (
        <div className="featured-section">
          <h2>{completedCount > 0 ? 'Continue' : 'Start Here'}</h2>
          <button
            className="challenge-card"
            onClick={() => onNavigate(nextChallenge.id)}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <div className="challenge-card-header">
                <h3 className="challenge-card-title">
                  #{nextChallenge.number} — {nextChallenge.title}
                </h3>
              </div>
              <p className="challenge-card-desc">{nextChallenge.description}</p>
              <div className="challenge-card-ar">{nextChallenge.titleAr}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, marginLeft: '1rem' }}>
              <DifficultyBadge difficulty={nextChallenge.difficulty} />
              <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
            </div>
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="featured-section">
        <h2>
          <BookOpen size={18} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
          Topics
        </h2>
        <div className="challenge-grid">
          {categories.map(cat => {
            const challenges = getChallengesByCategory(cat.id);
            const completed = challenges.filter(c => progress.challenges[c.id]?.completed).length;

            return (
              <button
                key={cat.id}
                className="challenge-card"
                onClick={() => {
                  const first = challenges.find(c => !progress.challenges[c.id]?.completed) || challenges[0];
                  if (first) onNavigate(first.id);
                }}
              >
                <div className="challenge-card-header">
                  <h3 className="challenge-card-title">{cat.name}</h3>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: completed === challenges.length ? 'var(--color-success)' : 'var(--color-muted-foreground)',
                  }}>
                    {completed}/{challenges.length}
                  </span>
                </div>
                <p className="challenge-card-desc">{cat.description}</p>
                <div className="challenge-card-ar">{cat.nameAr}</div>
                <div className="progress-bar" style={{ marginTop: '0.5rem' }}>
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${challenges.length > 0 ? (completed / challenges.length) * 100 : 0}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* How it works */}
      <div style={{
        padding: '1.25rem',
        background: 'var(--color-parchment-warm)',
        borderRadius: '10px',
        marginBottom: '2rem',
      }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--color-primary)', margin: '0 0 0.75rem', fontFamily: 'var(--font-serif)' }}>
          How It Works
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {[
            { step: '1', label: 'RED', desc: 'See the challenge and failing test cases', color: 'var(--color-test-fail)' },
            { step: '2', label: 'GREEN', desc: 'Write Arabic in the editor to make all tests pass', color: 'var(--color-test-pass)' },
            { step: '3', label: 'REFACTOR', desc: 'Rewrite using a different structure (optional)', color: 'var(--color-accent)' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: item.color,
                background: `color-mix(in srgb, ${item.color} 10%, transparent)`,
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                minWidth: '65px',
                textAlign: 'center',
              }}>
                {item.label}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-foreground)' }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
