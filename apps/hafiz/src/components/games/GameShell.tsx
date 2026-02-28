import { ArrowLeft, Trophy } from 'lucide-react';
import type { GameState } from '../../types';

interface GameShellProps {
  title: string;
  score: number;
  total: number;
  timeElapsed: number;
  gameState: GameState;
  onBack: () => void;
  children: React.ReactNode;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function GameShell({
  title,
  score,
  total,
  timeElapsed,
  gameState,
  onBack,
  children,
}: GameShellProps) {
  const progress = total > 0 ? (score / total) * 100 : 0;

  return (
    <div className="game-shell fade-in-up">
      <div className="game-shell-header">
        <button className="btn btn-ghost" onClick={onBack}>
          <ArrowLeft size={18} />
          Back
        </button>
        <h2 className="game-shell-title">{title}</h2>
        <div className="game-shell-stats">
          <span className="game-shell-score">
            {score}/{total}
          </span>
          <span className="game-shell-timer">{formatTime(timeElapsed)}</span>
        </div>
      </div>

      <div className="game-progress-bar">
        <div
          className="game-progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="game-shell-content">
        {children}
      </div>

      {gameState === 'complete' && (
        <div className="game-complete-overlay">
          <div className="game-complete-card">
            <Trophy size={48} className="game-complete-icon" />
            <h3 className="game-complete-title">Game Complete!</h3>
            <p className="game-complete-score">
              {score} / {total} correct
            </p>
            <p className="game-complete-percent">
              {total > 0 ? Math.round((score / total) * 100) : 0}%
            </p>
            <p className="game-complete-time">
              Time: {formatTime(timeElapsed)}
            </p>
            <button className="btn btn-primary" onClick={onBack}>
              Back to Games
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
