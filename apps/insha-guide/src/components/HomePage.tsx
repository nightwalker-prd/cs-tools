import type { Unit, Lesson, ProgressData } from '../data/types';

interface HomePageProps {
  units: Unit[];
  lessons: Lesson[];
  progress: ProgressData;
  onNavigate: (slug: string) => void;
}

export function HomePage({ units, lessons, progress, onNavigate }: HomePageProps) {
  const totalLessons = lessons.length;
  const visitedCount = Object.keys(progress.lessonsVisited).length;
  const exercisesCompleted = Object.keys(progress.exerciseScores).length;
  const composeCount = Object.keys(progress.composeCompleted).length;
  const fluencyCount = (progress.fluencySessions ?? []).length;

  const lastViewed = progress.lastViewed
    ? lessons.find(l => l.id === progress.lastViewed!.lessonId)
    : null;

  return (
    <div className="animate-fade-in-up home-page-layout">
      <div className="hero">
        <h1 className="hero-title">Insha Guide</h1>
        <p className="hero-subtitle font-arabic">دليل الإنشاء</p>
        <p className="hero-description">
          Interactive Arabic composition guide based on Al-Ibtida' fi al-Kitabah wa al-Insha'.
          40 lessons across 6 units covering speech foundations, sentences, paragraphs, spelling, writing, and correspondence.
        </p>
      </div>

      {lastViewed && (
        <button
          className="nav-card"
          style={{ marginBottom: '1.5rem', maxWidth: '720px', width: '100%', marginInline: 'auto', borderLeftColor: 'var(--color-accent)', borderLeftWidth: '3px' }}
          onClick={() => onNavigate(lastViewed.id)}
        >
          <div className="nav-card-header">
            <h2>Continue Learning</h2>
            <span className="font-arabic">{lastViewed.titleAr}</span>
          </div>
          <p className="nav-card-desc">
            Lesson {lastViewed.number}: {lastViewed.titleEn}
          </p>
        </button>
      )}

      <div className="nav-cards">
        {units.map(unit => {
          const unitLessons = lessons.filter(l => l.unitId === unit.id);
          const unitVisited = unitLessons.filter(l => progress.lessonsVisited[l.id]).length;
          const progressPct = unitLessons.length > 0 ? Math.round((unitVisited / unitLessons.length) * 100) : 0;
          const firstLessonId = unit.lessonIds[0];

          return (
            <button
              key={unit.id}
              className="nav-card"
              onClick={() => firstLessonId && onNavigate(firstLessonId)}
            >
              <div className="nav-card-header">
                <h2>Unit {unit.number}: {unit.titleEn}</h2>
                <span className="font-arabic">{unit.titleAr}</span>
              </div>
              <p className="nav-card-desc">{unit.description}</p>
              <div className="nav-card-progress">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="progress-text">
                  {unitVisited}/{unitLessons.length} lessons &middot; {progressPct}%
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="home-stats">
        <div className="stat">
          <div className="stat-value">{visitedCount}</div>
          <div className="stat-label">Visited</div>
        </div>
        <div className="stat">
          <div className="stat-value">{totalLessons}</div>
          <div className="stat-label">Lessons</div>
        </div>
        <div className="stat">
          <div className="stat-value">{exercisesCompleted}</div>
          <div className="stat-label">Exercises</div>
        </div>
        <div className="stat">
          <div className="stat-value">{composeCount}</div>
          <div className="stat-label">Composed</div>
        </div>
        <div className="stat">
          <div className="stat-value">{fluencyCount}</div>
          <div className="stat-label">Fluency</div>
        </div>
        <div className="stat">
          <div className="stat-value">{progress.streak.count}</div>
          <div className="stat-label">Streak</div>
        </div>
      </div>
    </div>
  );
}
