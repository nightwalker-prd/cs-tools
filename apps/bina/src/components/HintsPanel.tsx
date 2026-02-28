import { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import type { Hint } from '../types';

interface HintsPanelProps {
  hints: Hint[];
  challengeId: string;
  onHintUsed: () => void;
}

export function HintsPanel({ hints, challengeId: _challengeId, onHintUsed }: HintsPanelProps) {
  const [revealed, setRevealed] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const revealNext = () => {
    if (revealed < hints.length) {
      setRevealed(prev => prev + 1);
      onHintUsed();
    }
  };

  return (
    <div className="hints-panel">
      <div className="hints-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="hints-title">
          <Lightbulb size={15} />
          <span>Hints</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="hints-count">{revealed}/{hints.length} revealed</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      {isOpen && (
        <>
          {hints.slice(0, revealed).map((hint, i) => (
            <div key={i} className="hint-item">
              <div className="hint-level">Hint {hint.level}</div>
              <div className="hint-text">{hint.text}</div>
              {hint.textAr && (
                <div
                  className="hint-text font-arabic"
                  style={{ direction: 'rtl', textAlign: 'right', marginTop: '0.35rem', color: 'var(--color-primary)' }}
                >
                  {hint.textAr}
                </div>
              )}
            </div>
          ))}

          {revealed < hints.length && (
            <button className="hint-reveal-btn" onClick={revealNext}>
              <Eye size={14} />
              <span>Reveal hint {revealed + 1}</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
