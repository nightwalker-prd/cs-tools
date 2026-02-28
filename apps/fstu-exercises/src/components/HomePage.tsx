import { useMemo } from 'react';
import { Play, BookOpen, Sparkles } from 'lucide-react';
import { UNIT_INDEX } from '../data';
import type { ExerciseUnit } from '../types';
import type { useProgress } from '../hooks/useProgress';

interface HomePageProps {
  onSelectUnit: (unit: number) => void;
  onSelectExercise: (unitNum: number, sectionIdx: number, exerciseIdx: number) => void;
  progress: ReturnType<typeof useProgress>;
  loadedUnits: Record<number, ExerciseUnit>;
  onResumeExercise: () => void;
  hasLastViewed: boolean;
}

function getUnitProgress(unitNum: number, totalQs: number, mastered: Record<string, boolean>) {
  const count = Object.keys(mastered).filter(id => id.startsWith(`u${unitNum}-`)).length;
  return { count, total: totalQs, pct: totalQs > 0 ? Math.round((count / totalQs) * 100) : 0 };
}

export function HomePage({ onSelectUnit, onSelectExercise, progress, loadedUnits, onResumeExercise, hasLastViewed }: HomePageProps) {
  const { stats } = progress;

  const recommendations = useMemo(() => {
    const recs: Array<{
      type: 'resume' | 'continue' | 'start-new';
      label: string;
      title: string;
      context: string;
      unitNum?: number;
      sectionIdx?: number;
      exerciseIdx?: number;
    }> = [];

    // Resume card
    if (hasLastViewed && progress.data.lastViewed) {
      const exId = progress.data.lastViewed.exerciseId;
      let resumeTitle = 'Last Exercise';
      let resumeContext = '';
      for (const meta of UNIT_INDEX) {
        const unit = loadedUnits[meta.unit];
        if (!unit) continue;
        for (const section of unit.sections) {
          for (const ex of section.exercises) {
            if (ex.id === exId) {
              resumeTitle = ex.title;
              resumeContext = `Unit ${meta.unit} · ${section.title}`;
            }
          }
        }
      }
      recs.push({ type: 'resume', label: 'Resume', title: resumeTitle, context: resumeContext });
    }

    // Continue (partially done) and Start New cards
    let foundContinue = false;
    let foundNew = false;
    for (const meta of UNIT_INDEX) {
      if (foundContinue && foundNew) break;
      const unit = loadedUnits[meta.unit];
      if (!unit) continue;
      for (let sIdx = 0; sIdx < unit.sections.length; sIdx++) {
        if (foundContinue && foundNew) break;
        const section = unit.sections[sIdx];
        for (let eIdx = 0; eIdx < section.exercises.length; eIdx++) {
          if (foundContinue && foundNew) break;
          const ex = section.exercises[eIdx];
          const qIds = ex.questions.map(q => q.id);
          const { completed, total } = progress.getExerciseProgress(ex.id, qIds);
          if (!foundContinue && completed > 0 && completed < total) {
            recs.push({
              type: 'continue',
              label: 'Continue',
              title: ex.title,
              context: `Unit ${meta.unit} · ${section.title}`,
              unitNum: meta.unit,
              sectionIdx: sIdx,
              exerciseIdx: eIdx,
            });
            foundContinue = true;
          }
          if (!foundNew && completed === 0) {
            recs.push({
              type: 'start-new',
              label: 'Start New',
              title: ex.title,
              context: `Unit ${meta.unit} · ${section.title}`,
              unitNum: meta.unit,
              sectionIdx: sIdx,
              exerciseIdx: eIdx,
            });
            foundNew = true;
          }
        }
      }
    }

    return recs;
  }, [hasLastViewed, progress.data.lastViewed, loadedUnits, progress]);

  return (
    <div className="animate-fade-in-up">
      <div className="hero">
        <h1 className="hero-title">FSTU Exercises</h1>
        <p className="hero-subtitle font-arabic">تمارين فقه اللغة</p>
        <p className="hero-description">
          838 exercises with 11,789 questions across 5 units of the FSTU Arabic curriculum.
        </p>
      </div>

      <div className="nav-cards">
        {UNIT_INDEX.map(meta => {
          const up = getUnitProgress(meta.unit, meta.questionCount, progress.data.questionsMastered);
          return (
            <button
              key={meta.unit}
              className={`nav-card ${up.pct === 100 ? 'nav-card-complete' : ''}`}
              onClick={() => onSelectUnit(meta.unit)}
            >
              <div className="nav-card-header">
                <h2>Unit {meta.unit}: {meta.title}</h2>
              </div>
              <p className="nav-card-desc">
                {meta.sectionCount} sections · {meta.exerciseCount} exercises · {meta.questionCount} questions
              </p>
              <div className="nav-card-progress">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${up.pct}%` }} />
                </div>
                <span className="nav-card-progress-text">
                  {up.count} / {up.total} mastered ({up.pct}%)
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {recommendations.length > 0 && (
        <div className="continue-section">
          <h2 className="continue-title">Continue Learning</h2>
          <div className="continue-cards">
            {recommendations.map(rec => (
              <button
                key={rec.type}
                className="continue-card"
                onClick={() => {
                  if (rec.type === 'resume') {
                    onResumeExercise();
                  } else {
                    onSelectExercise(rec.unitNum!, rec.sectionIdx!, rec.exerciseIdx!);
                  }
                }}
              >
                <div className="continue-card-icon">
                  {rec.type === 'resume' && <Play size={18} />}
                  {rec.type === 'continue' && <BookOpen size={18} />}
                  {rec.type === 'start-new' && <Sparkles size={18} />}
                </div>
                <div className="continue-card-text">
                  <span className="continue-card-label">{rec.label}</span>
                  <span className="continue-card-title">{rec.title}</span>
                  <span className="continue-card-context">{rec.context}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="home-stats">
        <div className="stat">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Done</div>
        </div>
        <div className="stat">
          <div className="stat-value">{stats.mastered}</div>
          <div className="stat-label">Mastered</div>
        </div>
        <div className="stat">
          <div className="stat-value">{stats.streak}</div>
          <div className="stat-label">Streak</div>
        </div>
      </div>
    </div>
  );
}
