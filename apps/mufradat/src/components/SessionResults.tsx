import type { SessionResultData } from '../types';

interface SessionResultsProps {
  results: SessionResultData;
  onContinue: () => void;
  onDone: () => void;
}

export function SessionResults({ results, onContinue, onDone }: SessionResultsProps) {
  return (
    <div className="topic-view animate-fade-in-up">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="topic-title">Session Complete</h2>
        <p className="topic-description">
          {results.totalReviewed} cards reviewed
        </p>
      </div>

      {/* Accuracy circle */}
      <div className="results-accuracy">
        <div className="results-accuracy-circle">
          <div className="results-accuracy-value">{results.accuracy}%</div>
          <div className="results-accuracy-label">accuracy</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="summary-box" style={{ marginTop: '1.5rem' }}>
        <div className="results-breakdown">
          <div className="results-row">
            <span className="results-row-label">New words learned</span>
            <span className="results-row-value" style={{ color: 'var(--color-band-2k)' }}>{results.newLearned}</span>
          </div>
          <div className="results-row">
            <span className="results-row-label">Easy</span>
            <span className="results-row-value" style={{ color: 'var(--color-band-2k)' }}>{results.easyCount}</span>
          </div>
          <div className="results-row">
            <span className="results-row-label">Good</span>
            <span className="results-row-value" style={{ color: 'var(--color-band-1k)' }}>{results.goodCount}</span>
          </div>
          <div className="results-row">
            <span className="results-row-label">Hard</span>
            <span className="results-row-value" style={{ color: 'var(--color-band-5k)' }}>{results.hardCount}</span>
          </div>
          <div className="results-row">
            <span className="results-row-label">Again</span>
            <span className="results-row-value" style={{ color: 'var(--color-band-10k)' }}>{results.againCount}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
        <button className="btn btn-primary" onClick={onContinue}>
          Another Session
        </button>
        <button className="btn" onClick={onDone}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
