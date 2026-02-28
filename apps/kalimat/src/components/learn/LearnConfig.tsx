import { useState } from 'react';
import { surahNames } from '@/data/surah-names';
import type { SessionConfig } from '@/types';

interface LearnConfigProps {
  onStart: (config: SessionConfig) => void;
  navigate: (path: string) => void;
}

export function LearnConfig({ onStart, navigate }: LearnConfigProps) {
  const [source, setSource] = useState<SessionConfig['source']>('tier');
  const [surahNum, setSurahNum] = useState(1);
  const [tier, setTier] = useState<1 | 2 | 3 | 4>(1);
  const [size, setSize] = useState<10 | 20 | 30>(10);
  const [quizTypes, setQuizTypes] = useState<SessionConfig['quizTypes']>(['flashcard', 'multiple-choice']);

  const toggleQuizType = (type: SessionConfig['quizTypes'][number]) => {
    setQuizTypes(prev => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev; // must have at least one
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const handleStart = () => {
    const config: SessionConfig = {
      source,
      size,
      quizTypes,
      ...(source === 'surah' ? { surahNum } : {}),
      ...(source === 'tier' ? { tier } : {}),
    };
    onStart(config);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 560 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Learn</span>
        </div>
        <h1 className="topic-title-en">Start a Session</h1>
        <p className="topic-description">
          Configure your study session, then begin practicing Quranic vocabulary.
        </p>
      </div>

      <div className="study-config">
        {/* Source */}
        <div className="config-section">
          <div className="config-section-title">Word Source</div>
          <div className="config-toggle-group">
            <button
              className={`config-toggle ${source === 'tier' ? 'active' : ''}`}
              onClick={() => setSource('tier')}
            >
              By Frequency
            </button>
            <button
              className={`config-toggle ${source === 'surah' ? 'active' : ''}`}
              onClick={() => setSource('surah')}
            >
              By Surah
            </button>
            <button
              className={`config-toggle ${source === 'due' ? 'active' : ''}`}
              onClick={() => setSource('due')}
            >
              Due for Review
            </button>
          </div>
        </div>

        {/* Source-specific options */}
        {source === 'tier' && (
          <div className="config-section">
            <div className="config-section-title">Frequency Tier</div>
            <div className="config-toggle-group">
              {([1, 2, 3, 4] as const).map(t => (
                <button
                  key={t}
                  className={`config-toggle ${tier === t ? 'active' : ''}`}
                  onClick={() => setTier(t)}
                >
                  Tier {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {source === 'surah' && (
          <div className="config-section">
            <div className="config-section-title">Select Surah</div>
            <select
              value={surahNum}
              onChange={e => setSurahNum(parseInt(e.target.value, 10))}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                background: 'var(--color-card)',
              }}
            >
              {surahNames.map(s => (
                <option key={s.num} value={s.num}>
                  {s.num}. {s.english} ({s.arabic})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Session Size */}
        <div className="config-section">
          <div className="config-section-title">Session Size</div>
          <div className="config-toggle-group">
            {([10, 20, 30] as const).map(s => (
              <button
                key={s}
                className={`config-toggle ${size === s ? 'active' : ''}`}
                onClick={() => setSize(s)}
              >
                {s} words
              </button>
            ))}
          </div>
        </div>

        {/* Quiz Types */}
        <div className="config-section">
          <div className="config-section-title">Quiz Types</div>
          <div className="config-toggle-group">
            {([
              ['flashcard', 'Flashcard'],
              ['multiple-choice', 'Multiple Choice'],
              ['context', 'In Context'],
            ] as const).map(([type, label]) => (
              <button
                key={type}
                className={`config-toggle ${quizTypes.includes(type) ? 'active' : ''}`}
                onClick={() => toggleQuizType(type)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          className="btn btn-accent"
          style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '1rem' }}
          onClick={handleStart}
        >
          Start Session
        </button>
      </div>
    </div>
  );
}
