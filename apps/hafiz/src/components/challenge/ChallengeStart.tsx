import { useState } from 'react';

interface ChallengeStartProps {
  onStart: (targetJuz: number[]) => void;
}

export function ChallengeStart({ onStart }: ChallengeStartProps) {
  const [selectedJuz, setSelectedJuz] = useState<Set<number>>(new Set());

  const toggleJuz = (juz: number) => {
    setSelectedJuz((prev) => {
      const next = new Set(prev);
      if (next.has(juz)) {
        next.delete(juz);
      } else {
        next.add(juz);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedJuz(new Set(Array.from({ length: 30 }, (_, i) => i + 1)));
  };

  const clearAll = () => {
    setSelectedJuz(new Set());
  };

  const handleStart = () => {
    if (selectedJuz.size === 0) return;
    onStart(Array.from(selectedJuz));
  };

  return (
    <div className="challenge-start">
      <div className="challenge-start-header">
        <h3>30-Day Hifz Challenge</h3>
        <p className="challenge-start-description">
          Select the ajzaa you want to memorize or review over 30 days. Each
          day, you&apos;ll be assigned rub&apos; targets to work through. Track
          your progress with daily checklists and build a consistent streak.
        </p>
      </div>

      <div className="challenge-juz-section">
        <div className="challenge-juz-header">
          <span className="form-label">Select Ajzaa ({selectedJuz.size} selected)</span>
          <div className="challenge-juz-actions">
            <button className="btn btn-ghost btn-sm" onClick={selectAll}>
              Select All
            </button>
            <button className="btn btn-ghost btn-sm" onClick={clearAll}>
              Clear
            </button>
          </div>
        </div>

        <div className="challenge-juz-grid">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
            <button
              key={juz}
              className={`challenge-juz-btn ${selectedJuz.has(juz) ? 'selected' : ''}`}
              onClick={() => toggleJuz(juz)}
            >
              {juz}
            </button>
          ))}
        </div>
      </div>

      {selectedJuz.size > 0 && (
        <div className="challenge-start-summary">
          <p>
            {selectedJuz.size} juz &middot; {selectedJuz.size * 8} rub&apos;
            &middot; ~{Math.ceil((selectedJuz.size * 8) / 30)} rub&apos; per day
          </p>
        </div>
      )}

      <button
        className="btn btn-primary challenge-start-btn"
        onClick={handleStart}
        disabled={selectedJuz.size === 0}
      >
        Start 30-Day Challenge
      </button>
    </div>
  );
}
