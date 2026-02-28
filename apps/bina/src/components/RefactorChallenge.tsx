import { useState, useCallback, useEffect } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import type { RefactorChallenge as RefactorType } from '../types';
import { useTestEngine } from '../hooks/useTestEngine';
import { useProgress } from '../hooks/useProgress';
import { TestResultsPanel } from './TestResultsPanel';

interface RefactorChallengeProps {
  refactor: RefactorType;
  challengeId: string;
}

export function RefactorChallenge({ refactor, challengeId }: RefactorChallengeProps) {
  const [input, setInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const { result, run } = useTestEngine(refactor.tests);
  const { markRefactorCompleted } = useProgress();

  const handleRun = useCallback(() => {
    run(input);
  }, [input, run]);

  useEffect(() => {
    if (result.status === 'passed' && !completed) {
      setCompleted(true);
      markRefactorCompleted(challengeId);
    }
  }, [result.status, completed, challengeId, markRefactorCompleted]);

  return (
    <div className="refactor-banner" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
        <div className="refactor-icon">
          {completed ? <CheckCircle2 size={20} /> : <RefreshCw size={20} />}
        </div>
        <div className="refactor-content">
          <h4>{completed ? 'Refactor Complete!' : 'Refactor Challenge'}</h4>
          <p>{refactor.description}</p>
        </div>
      </div>

      {refactor.constraints.length > 0 && (
        <ul style={{ fontSize: '0.78rem', color: 'var(--color-muted-foreground)', margin: '0 0 0.75rem 1.25rem', paddingLeft: '0' }}>
          {refactor.constraints.map((c, i) => (
            <li key={i} style={{ marginBottom: '0.15rem' }}>{c}</li>
          ))}
        </ul>
      )}

      {!completed && (
        <>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب البديل هنا..."
            dir="rtl"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontFamily: 'var(--font-arabic)',
              fontSize: '1.2rem',
              lineHeight: '2',
              background: 'var(--color-parchment)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              outline: 'none',
              textAlign: 'right',
              marginBottom: '0.5rem',
              resize: 'vertical',
              minHeight: '60px',
            }}
          />
          <button
            onClick={handleRun}
            style={{
              padding: '0.4rem 1rem',
              background: 'var(--color-accent)',
              color: 'var(--color-primary)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            Run Refactor Tests
          </button>

          {result.results.length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <TestResultsPanel result={result} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
