import { useState } from 'react';
import type { FrequencyLevel } from '@arabtools/data';
import type { MufradatSessionConfig } from '../types';

interface StudyConfigProps {
  onStart: (config: MufradatSessionConfig) => void;
  onBack: () => void;
  dueCount: number;
}

const LEVELS: { value: FrequencyLevel; label: string; labelAr: string }[] = [
  { value: '1k', label: 'Top 1,000', labelAr: 'الألف الأولى' },
  { value: '2k', label: 'Top 2,000', labelAr: 'الألف الثانية' },
  { value: '3k', label: 'Top 3,000', labelAr: 'الألف الثالثة' },
  { value: '5k', label: 'Top 5,000', labelAr: 'حتى الخمسة آلاف' },
  { value: '10k', label: 'Top 10,000', labelAr: 'حتى العشرة آلاف' },
];

const SESSION_SIZES = [10, 20, 30];
const NEW_WORD_COUNTS = [3, 5, 10];

export function StudyConfig({ onStart, onBack, dueCount }: StudyConfigProps) {
  const [selectedLevels, setSelectedLevels] = useState<FrequencyLevel[]>([
    '1k', '2k', '3k', '5k', '10k',
  ]);
  const [sessionSize, setSessionSize] = useState(20);
  const [newWords, setNewWords] = useState(5);

  const toggleLevel = (level: FrequencyLevel) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level],
    );
  };

  const handleStart = () => {
    if (selectedLevels.length === 0) return;
    onStart({
      levels: selectedLevels,
      sessionSize,
      newWordsPerSession: Math.min(newWords, sessionSize),
    });
  };

  return (
    <div className="topic-view animate-fade-in-up">
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="breadcrumb-link" onClick={onBack}>
          &larr; Back to Home
        </button>
      </div>

      <div className="topic-header">
        <h1 className="topic-title">Study Session</h1>
        <p className="topic-description">
          {dueCount > 0
            ? `You have ${dueCount} words due for review.`
            : 'Configure your study session below.'}
        </p>
      </div>

      {/* Frequency Bands */}
      <div className="study-config">
        <div className="config-section">
          <h3 className="config-section-title">Frequency Bands</h3>
          <div className="config-band-grid">
            {LEVELS.map(({ value, label, labelAr }) => (
              <label key={value} className="band-check-card">
                <input
                  type="checkbox"
                  checked={selectedLevels.includes(value)}
                  onChange={() => toggleLevel(value)}
                />
                <span className="band-check-label">{label}</span>
                <span className="band-check-ar font-arabic">{labelAr}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Session Size */}
        <div className="config-section">
          <h3 className="config-section-title">Session Size</h3>
          <div className="config-toggle-group">
            {SESSION_SIZES.map(size => (
              <button
                key={size}
                className={`config-toggle ${sessionSize === size ? 'active' : ''}`}
                onClick={() => setSessionSize(size)}
              >
                {size} cards
              </button>
            ))}
          </div>
        </div>

        {/* New Words */}
        <div className="config-section">
          <h3 className="config-section-title">New Words</h3>
          <div className="config-toggle-group">
            {NEW_WORD_COUNTS.map(count => (
              <button
                key={count}
                className={`config-toggle ${newWords === count ? 'active' : ''}`}
                onClick={() => setNewWords(count)}
              >
                {count} new
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}
        onClick={handleStart}
        disabled={selectedLevels.length === 0}
      >
        Start Session
      </button>
    </div>
  );
}
