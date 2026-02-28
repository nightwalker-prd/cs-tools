import { useState } from 'react';
import { Lock, Unlock, Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core';

interface SolutionPanelProps {
  solutions: string[];
  attempts: number;
  completed: boolean;
}

export function SolutionPanel({ solutions, attempts, completed }: SolutionPanelProps) {
  const [revealed, setRevealed] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  const canReveal = completed || attempts >= 3;

  if (!canReveal) {
    return (
      <div className="solution-panel">
        <div className="solution-locked">
          <div className="solution-locked-icon">
            <Lock size={20} />
          </div>
          <p>Solutions unlock after 3 attempts or completing the challenge.</p>
          <p style={{ fontSize: '0.72rem', marginTop: '0.25rem' }}>
            {attempts}/3 attempts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="solution-panel">
      {!revealed ? (
        <div className="solution-locked" style={{ cursor: 'pointer' }} onClick={() => setRevealed(true)}>
          <div className="solution-locked-icon">
            <Unlock size={20} />
          </div>
          <p>Click to reveal {solutions.length} model answer{solutions.length > 1 ? 's' : ''}</p>
        </div>
      ) : (
        <div className="solution-content">
          <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-foreground)', marginBottom: '0.5rem', fontWeight: 500 }}>
            Model Answers
          </div>
          {solutions.map((sol, i) => (
            <div key={i} className="solution-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ flex: 1 }}>{sol}</span>
              <button
                onClick={() => speak(sol)}
                disabled={isSpeaking}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-accent)',
                  padding: '0.25rem',
                  flexShrink: 0,
                }}
                title="Listen"
              >
                <Volume2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
