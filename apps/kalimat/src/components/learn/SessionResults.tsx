import { ProgressRing } from '@/components/shared/ProgressRing';

interface GradeCount {
  again: number;
  hard: number;
  good: number;
  easy: number;
}

interface SessionResultsProps {
  total: number;
  grades: GradeCount;
  navigate: (path: string) => void;
}

export function SessionResults({ total, grades, navigate }: SessionResultsProps) {
  const correct = grades.good + grades.easy;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 560 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Results</span>
        </div>
        <h1 className="topic-title-en">Session Complete</h1>
      </div>

      <div className="results-container">
        {/* Accuracy ring */}
        <div className="results-accuracy-ring" style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <ProgressRing value={accuracy} size={120} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.8rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              color: 'var(--color-primary)',
            }}>
              {accuracy}%
            </div>
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-muted-foreground)',
            marginTop: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            Accuracy
          </div>
        </div>

        {/* Breakdown */}
        <div className="results-breakdown">
          <div className="results-row">
            <span className="results-row-label">Total Cards</span>
            <span className="results-row-value">{total}</span>
          </div>
          <div className="results-row">
            <span className="results-row-label">Again</span>
            <span className="results-row-value" style={{ color: 'var(--color-grade-again)' }}>{grades.again}</span>
          </div>
          <div className="results-row">
            <span className="results-row-label">Hard</span>
            <span className="results-row-value" style={{ color: 'var(--color-grade-hard)' }}>{grades.hard}</span>
          </div>
          <div className="results-row">
            <span className="results-row-label">Good</span>
            <span className="results-row-value" style={{ color: 'var(--color-grade-good)' }}>{grades.good}</span>
          </div>
          <div className="results-row">
            <span className="results-row-label">Easy</span>
            <span className="results-row-value" style={{ color: 'var(--color-grade-easy)' }}>{grades.easy}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="results-actions">
          <button
            className="btn btn-accent"
            style={{ padding: '0.7rem 1.5rem' }}
            onClick={() => navigate('#/learn')}
          >
            New Session
          </button>
          <button
            className="btn"
            style={{ padding: '0.7rem 1.5rem' }}
            onClick={() => navigate('#/')}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
