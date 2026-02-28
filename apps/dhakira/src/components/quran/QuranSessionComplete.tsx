interface QuranSessionCompleteProps {
  correctCount: number
  totalCount: number
  perfectRun: number
  onPlayAgain: () => void
  onExit: () => void
}

export function QuranSessionComplete({ correctCount, totalCount, perfectRun, onPlayAgain, onExit }: QuranSessionCompleteProps) {
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

  return (
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', margin: '2rem auto' }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
        {accuracy >= 90 ? '🌟' : accuracy >= 70 ? '✅' : accuracy >= 50 ? '📖' : '💪'}
      </div>
      <h2 style={{ marginBottom: '1rem' }}>Session Complete</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '0.75rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent)' }}>{accuracy}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>Accuracy</div>
        </div>
        <div className="glass-card" style={{ padding: '0.75rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{correctCount}/{totalCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>Correct</div>
        </div>
      </div>

      {perfectRun > 2 && (
        <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          🔥 Best streak: {perfectRun} in a row!
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={onPlayAgain}>Play Again</button>
        <button className="btn-secondary" onClick={onExit}>Exit</button>
      </div>
    </div>
  )
}
