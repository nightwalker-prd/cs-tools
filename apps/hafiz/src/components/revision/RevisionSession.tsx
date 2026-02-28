import { useState, useMemo } from 'react';
import { getRubDescription, getJuzForRub, expandRubToAyahs } from '@arabtools/data';
import { ModeSelector } from './ModeSelector';
import { ListenRepeatMode } from './ListenRepeatMode';
import { ReadAlongMode } from './ReadAlongMode';
import { ActiveRecallMode } from './ActiveRecallMode';
import { WordOrderMode } from './WordOrderMode';
import type { RevisionMode } from '../../types';

interface RevisionSessionProps {
  dueRubs: number[];
  sessionSize: number;
  reciterId: string;
  onGrade: (rubId: number, quality: number) => void;
  onFinish: () => void;
}

interface GradedRub {
  rubId: number;
  quality: number;
}

export function RevisionSession({
  dueRubs,
  sessionSize,
  reciterId,
  onGrade,
  onFinish,
}: RevisionSessionProps) {
  const sessionQueue = useMemo(
    () => dueRubs.slice(0, sessionSize),
    [dueRubs, sessionSize],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<RevisionMode>('listen-repeat');
  const [gradedRubs, setGradedRubs] = useState<GradedRub[]>([]);

  // No due rubs
  if (sessionQueue.length === 0) {
    return (
      <div className="revision-session fade-in-up">
        <div className="empty-state">
          <h2>No Rubs Due</h2>
          <p>All your memorized rubs are up to date. Check back later.</p>
          <button className="btn btn-primary" onClick={onFinish}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isComplete = currentIndex >= sessionQueue.length;

  // Session complete
  if (isComplete) {
    const gradeLabels: Record<number, string> = {
      1: 'Again',
      2: 'Hard',
      3: 'Good',
      4: 'Easy',
    };

    const gradeCounts = gradedRubs.reduce<Record<string, number>>(
      (acc, g) => {
        const label = gradeLabels[g.quality] ?? 'Unknown';
        acc[label] = (acc[label] ?? 0) + 1;
        return acc;
      },
      {},
    );

    return (
      <div className="revision-session fade-in-up">
        <div className="revision-complete">
          <h2>Session Complete</h2>
          <p>
            You reviewed {gradedRubs.length} rub{gradedRubs.length !== 1 ? 's' : ''}.
          </p>

          <div className="grade-summary">
            {Object.entries(gradeCounts).map(([label, count]) => (
              <div key={label} className="grade-summary-item">
                <span className="grade-label">{label}</span>
                <span className="grade-count">{count}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary" onClick={onFinish}>
            Finish
          </button>
        </div>
      </div>
    );
  }

  const rubId = sessionQueue[currentIndex];
  const description = getRubDescription(rubId);
  const juz = getJuzForRub(rubId);
  const ayahRefs = expandRubToAyahs(rubId);

  const handleGrade = (quality: number) => {
    onGrade(rubId, quality);
    setGradedRubs((prev) => [...prev, { rubId, quality }]);
    setCurrentIndex((prev) => prev + 1);
  };

  const renderMode = () => {
    switch (mode) {
      case 'listen-repeat':
        return <ListenRepeatMode ayahs={ayahRefs} reciterId={reciterId} />;
      case 'read-along':
        return <ReadAlongMode ayahs={ayahRefs} reciterId={reciterId} rubId={rubId} />;
      case 'active-recall':
        return <ActiveRecallMode ayahs={ayahRefs} />;
      case 'word-order':
        return <WordOrderMode ayahs={ayahRefs} />;
      default:
        return null;
    }
  };

  return (
    <div className="revision-session fade-in-up">
      <div className="revision-progress">
        <span className="progress-text">
          {currentIndex + 1}/{sessionQueue.length}
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / sessionQueue.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="revision-card">
        <div className="revision-card-header">
          <h2>Rub&apos; {rubId}</h2>
          <span className="revision-card-meta">
            Juz {juz} &middot; {description}
          </span>
          <span className="revision-card-ayahs">
            {ayahRefs.length} ayah{ayahRefs.length !== 1 ? 's' : ''}
          </span>
        </div>

        <ModeSelector value={mode} onChange={setMode} />

        <div className="revision-mode-content">{renderMode()}</div>

        <div className="grade-buttons">
          <button
            className="btn btn-again"
            onClick={() => handleGrade(1)}
          >
            Again
          </button>
          <button
            className="btn btn-hard"
            onClick={() => handleGrade(2)}
          >
            Hard
          </button>
          <button
            className="btn btn-good"
            onClick={() => handleGrade(3)}
          >
            Good
          </button>
          <button
            className="btn btn-easy"
            onClick={() => handleGrade(4)}
          >
            Easy
          </button>
        </div>
      </div>
    </div>
  );
}
