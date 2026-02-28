import { useState, useMemo, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { shuffle, pickRandom } from '@arabtools/core';
import { lemmas } from '@/data/lemmas';
import { rootFrequency } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';
import { useLearningEngine } from '@/hooks/useLearningEngine';
import { FlashcardView } from './FlashcardView';
import { MultipleChoice } from './MultipleChoice';
import { ContextQuiz } from './ContextQuiz';
import { SessionProgress } from './SessionProgress';
import { SessionResults } from './SessionResults';
import type { SessionConfig } from '@/types';
import type { Lemma } from '@/data/lemmas';

interface StudySessionProps {
  config: SessionConfig;
  navigate: (path: string) => void;
}

type GradeCount = { again: number; hard: number; good: number; easy: number };

function selectLemmas(config: SessionConfig, getProgress: (id: number) => { phase: string }): Lemma[] {
  let pool: Lemma[] = [];

  if (config.source === 'tier' && config.tier) {
    const tierRoots = rootFrequency
      .filter(r => r.tier === config.tier)
      .map(r => r.root);
    const lemmaIds = new Set<number>();
    for (const root of tierRoots) {
      const ids = rootToLemma[root];
      if (ids) ids.forEach(id => lemmaIds.add(id));
    }
    pool = lemmas.filter(l => lemmaIds.has(l.id));
  } else if (config.source === 'surah' && config.surahNum) {
    // Filter lemmas that appear in the selected surah via root frequency data
    pool = lemmas.filter(l => {
      const entry = rootFrequency.find(r => {
        const ids = rootToLemma[r.root];
        return ids && ids.includes(l.id);
      });
      return entry != null;
    });
  } else if (config.source === 'due') {
    pool = lemmas.filter(l => {
      const p = getProgress(l.id);
      return p.phase === 'learning' || p.phase === 'review';
    });
    // Return empty pool if nothing due — StudySession shows empty state
    if (pool.length === 0) return [];
  } else {
    pool = [...lemmas];
  }

  if (pool.length === 0) pool = [...lemmas];

  const shuffled = shuffle([...pool]);
  return shuffled.slice(0, config.size);
}

export function StudySession({ config, navigate }: StudySessionProps) {
  const { recordReview, getProgress } = useLearningEngine();

  // Compute session lemmas once on mount, using a ref to prevent reshuffling mid-session
  const sessionLemmasRef = useRef<Lemma[] | null>(null);
  if (sessionLemmasRef.current === null) {
    sessionLemmasRef.current = selectLemmas(config, getProgress);
  }
  const sessionLemmas = sessionLemmasRef.current;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [grades, setGrades] = useState<GradeCount>({ again: 0, hard: 0, good: 0, easy: 0 });
  const [done, setDone] = useState(false);

  const currentLemma = sessionLemmas[currentIdx];
  const quizType = useMemo(() => {
    return pickRandom(config.quizTypes);
  }, [currentIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGrade = useCallback((grade: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentLemma) return;
    recordReview(currentLemma.id, grade);
    setGrades(prev => ({ ...prev, [grade]: prev[grade] + 1 }));

    if (currentIdx + 1 >= sessionLemmas.length) {
      setDone(true);
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  }, [currentLemma, currentIdx, sessionLemmas.length, recordReview]);

  if (done) {
    return (
      <SessionResults
        total={sessionLemmas.length}
        grades={grades}
        navigate={navigate}
      />
    );
  }

  if (sessionLemmas.length === 0) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 560 }}>
        <div className="topic-header">
          <div className="breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
            <span className="breadcrumb-sep">/</span>
            <button className="breadcrumb-link" onClick={() => navigate('#/learn')}>Learn</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Session</span>
          </div>
        </div>
        <div className="study-card" style={{ textAlign: 'center' }}>
          <div className="study-card-content">
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              No words due for review
            </p>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Start a frequency or surah session to learn new words first.
            </p>
            <button className="btn btn-accent" onClick={() => navigate('#/learn')}>
              Back to Config
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Find root for current lemma (for flashcard view)
  const rootEntry = rootFrequency.find(r => {
    const ids = rootToLemma[r.root];
    return ids && ids.includes(currentLemma.id);
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: 560 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => navigate('#/learn')}>Learn</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Session</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1 }}>
          <SessionProgress current={currentIdx + 1} total={sessionLemmas.length} />
        </div>
        <button
          className="btn"
          style={{ padding: '0.35rem', lineHeight: 1, flexShrink: 0 }}
          onClick={() => navigate('#/learn')}
          title="Exit session"
        >
          <X size={18} />
        </button>
      </div>

      {quizType === 'flashcard' && (
        <FlashcardView
          key={currentLemma.id}
          lemma={currentLemma}
          root={rootEntry?.root}
          onGrade={handleGrade}
        />
      )}
      {quizType === 'multiple-choice' && (
        <MultipleChoice
          key={currentLemma.id}
          lemma={currentLemma}
          onGrade={handleGrade}
        />
      )}
      {quizType === 'context' && (
        <ContextQuiz
          key={currentLemma.id}
          lemma={currentLemma}
          onGrade={handleGrade}
        />
      )}
    </div>
  );
}
