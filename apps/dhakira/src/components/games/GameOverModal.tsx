interface GameOverModalProps {
  score: number;
  highScore: number;
  label?: string;
  onPlayAgain: () => void;
  onExit: () => void;
}

export function GameOverModal({ score, highScore, label = 'Score', onPlayAgain, onExit }: GameOverModalProps) {
  const isNewRecord = score > 0 && score >= highScore;

  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h2>Game Over</h2>

        {isNewRecord && <div className="game-over-record">New Record!</div>}

        <div className="game-over-stats">
          <div className="game-over-stat">
            <span className="game-over-stat-value">{score}</span>
            <span className="game-over-stat-label">{label}</span>
          </div>
          <div className="game-over-stat">
            <span className="game-over-stat-value">{highScore}</span>
            <span className="game-over-stat-label">Best</span>
          </div>
        </div>

        <div className="game-over-actions">
          <button className="btn-primary" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="btn-secondary" onClick={onExit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
