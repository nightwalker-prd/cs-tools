import { useState, useMemo, useCallback } from 'react';
import type { Lesson, ProgressData, FluencySession } from '../../data/types';
import { ALL_LESSONS } from '../../data/lessons';
import { poolVocabulary } from '../../utils/fluency-vocab';
import { generatePrompt } from '../../utils/fluency-prompts';
import { FluencyDashboard } from './FluencyDashboard';
import { FluencyActivityPicker } from './FluencyActivityPicker';
import { SprintWriter } from './SprintWriter';
import { SpeedWriter } from './SpeedWriter';
import { RewriteWriter } from './RewriteWriter';

interface FluencyContentProps {
  lesson: Lesson;
  progress: ProgressData;
  onSaveFluencySession: (session: FluencySession) => void;
  getFluencyStats: (lessonId?: string) => {
    totalSessions: number;
    avgWpm: number;
    bestWpm: number;
    totalWords: number;
    recentWpms: number[];
  };
  getFluencySessions: (lessonId?: string) => FluencySession[];
  getComposeDraft: (composeId: string) => { text: string; updatedAt: number; grammarChecked: string[]; selfAssessment: Record<string, number> } | null;
}

type Activity = 'sprint' | 'speed-writing' | 'rewrite' | null;

export function FluencyContent({
  lesson,
  progress,
  onSaveFluencySession,
  getFluencyStats,
  getFluencySessions,
  getComposeDraft,
}: FluencyContentProps) {
  const [activeActivity, setActiveActivity] = useState<Activity>(null);
  const [includeAllLessons, setIncludeAllLessons] = useState(false);

  const lessonStats = useMemo(() => getFluencyStats(lesson.id), [getFluencyStats, lesson.id]);
  const allStats = useMemo(() => getFluencyStats(), [getFluencyStats]);

  const vocab = useMemo(
    () => poolVocabulary(ALL_LESSONS, progress, lesson.id, includeAllLessons),
    [progress, lesson.id, includeAllLessons]
  );

  const previousSessions = useMemo(
    () => getFluencySessions(lesson.id),
    [getFluencySessions, lesson.id]
  );

  const previousBest = useMemo(() => {
    if (previousSessions.length === 0) return null;
    const wpms = previousSessions.flatMap(s => s.rounds.map(r => r.wpm));
    const words = previousSessions.flatMap(s => s.rounds.map(r => r.wordCount));
    return {
      wpm: Math.max(...wpms, 0),
      wordCount: Math.max(...words, 0),
    };
  }, [previousSessions]);

  const prompt = useMemo(() => {
    const previousPrompts = previousSessions.map(s => s.prompt);
    return generatePrompt(vocab.length > 0 ? vocab : [{ arabic: 'كتابة حرة', english: 'free writing' }], previousPrompts);
  }, [vocab, previousSessions]);

  // Get compose drafts for this lesson's rewrite activity
  const composeDrafts = useMemo(() => {
    if (!lesson.compose) return [];
    const draft = getComposeDraft(lesson.compose.id);
    if (!draft || !draft.text.trim()) return [];
    return [{ id: lesson.compose.id, text: draft.text, updatedAt: draft.updatedAt }];
  }, [lesson.compose, getComposeDraft]);

  const handleComplete = useCallback((session: FluencySession) => {
    onSaveFluencySession(session);
  }, [onSaveFluencySession]);

  const handleBack = useCallback(() => {
    setActiveActivity(null);
  }, []);

  if (activeActivity === 'sprint') {
    return (
      <SprintWriter
        lessonId={lesson.id}
        prompt={prompt}
        vocab={vocab}
        previousBest={previousBest}
        onComplete={handleComplete}
        onCancel={handleBack}
      />
    );
  }

  if (activeActivity === 'speed-writing') {
    return (
      <SpeedWriter
        lessonId={lesson.id}
        prompt={prompt}
        vocab={vocab}
        previousBest={previousBest}
        onComplete={handleComplete}
        onCancel={handleBack}
      />
    );
  }

  if (activeActivity === 'rewrite') {
    return (
      <RewriteWriter
        lessonId={lesson.id}
        drafts={composeDrafts}
        previousBest={previousBest}
        onComplete={handleComplete}
        onCancel={handleBack}
      />
    );
  }

  return (
    <div className="fluency-content animate-fade-in">
      <div className="fluency-header">
        <div>
          <h2 className="fluency-title">Fluency Development</h2>
          <p className="fluency-subtitle">Build speed and automaticity with familiar vocabulary</p>
        </div>
        <div className="fluency-vocab-toggle">
          <label className="fluency-toggle-label">
            <input
              type="checkbox"
              checked={includeAllLessons}
              onChange={e => setIncludeAllLessons(e.target.checked)}
            />
            <span>Include all completed lessons</span>
          </label>
        </div>
      </div>

      <FluencyDashboard lessonStats={lessonStats} allStats={allStats} />

      <FluencyActivityPicker
        hasDrafts={composeDrafts.length > 0}
        onSelect={setActiveActivity}
      />
    </div>
  );
}
