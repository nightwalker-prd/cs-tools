import { usePersistedState } from '@arabtools/core';
import type { Lesson, Unit, ProgressData, ComposeDraft, FluencySession } from '../data/types';
import { Breadcrumb } from './Breadcrumb';
import { StudyContent } from './StudyContent';
import { PracticeContent } from './PracticeContent';
import { ComposeContent } from './compose';
import { FluencyContent } from './fluency';

interface LessonViewProps {
  lesson: Lesson;
  unit: Unit;
  progress: ProgressData;
  onGoHome: () => void;
  onMarkExerciseCompleted: (exerciseId: string, score: number) => void;
  onMarkQuestionMastered: (questionId: string) => void;
  onSaveComposeDraft: (composeId: string, draft: ComposeDraft) => void;
  onMarkComposeCompleted: (composeId: string) => void;
  getComposeDraft: (composeId: string) => ComposeDraft | null;
  isComposeCompleted: (composeId: string) => boolean;
  onSaveFluencySession: (session: FluencySession) => void;
  getFluencyStats: (lessonId?: string) => { totalSessions: number; avgWpm: number; bestWpm: number; totalWords: number; recentWpms: number[] };
  getFluencySessions: (lessonId?: string) => FluencySession[];
}

type Tab = 'study' | 'practice' | 'compose' | 'fluency';

export function LessonView({
  lesson,
  unit,
  progress,
  onGoHome,
  onMarkExerciseCompleted,
  onMarkQuestionMastered,
  onSaveComposeDraft,
  onMarkComposeCompleted,
  getComposeDraft,
  isComposeCompleted,
  onSaveFluencySession,
  getFluencyStats,
  getFluencySessions,
}: LessonViewProps) {
  const [activeTab, setActiveTab] = usePersistedState<Tab>('arabtools-insha-tab', 'study');
  const hasExercises = lesson.exercises.length > 0;
  const hasCompose = !!lesson.compose;
  const composeCompleted = hasCompose && isComposeCompleted(lesson.compose!.id);
  const hasFluency = !!progress.lessonsVisited[lesson.id];

  // Count mastered questions for this lesson
  const masteredCount = lesson.exercises
    .flatMap(ex => ex.questions)
    .filter(q => progress.questionsMastered[q.data.id])
    .length;
  const totalQuestions = lesson.exercises.reduce((sum, ex) => sum + ex.questions.length, 0);

  return (
    <div className="lesson-view animate-fade-in">
      <Breadcrumb unit={unit} lessonTitle={lesson.titleEn} onGoHome={onGoHome} />

      <div className="lesson-header">
        <h1 className="lesson-title-en">Lesson {lesson.number}: {lesson.titleEn}</h1>
        <p className="lesson-title-ar font-arabic">{lesson.titleAr}</p>
      </div>

      <div className="lesson-tabs">
        <button
          className={`lesson-tab ${activeTab === 'study' ? 'active' : ''}`}
          onClick={() => setActiveTab('study')}
        >
          Study <span className="font-arabic">الدرس</span>
        </button>
        <button
          className={`lesson-tab ${activeTab === 'practice' ? 'active' : ''} ${!hasExercises ? 'disabled' : ''}`}
          onClick={() => hasExercises && setActiveTab('practice')}
          disabled={!hasExercises}
        >
          Practice <span className="font-arabic">تدريبات</span>
          {hasExercises ? (
            <span className="tab-badge">{masteredCount}/{totalQuestions}</span>
          ) : (
            <span className="tab-badge muted">(coming soon)</span>
          )}
        </button>
        <button
          className={`lesson-tab ${activeTab === 'compose' ? 'active' : ''} ${!hasCompose ? 'disabled' : ''}`}
          onClick={() => hasCompose && setActiveTab('compose')}
          disabled={!hasCompose}
        >
          Compose <span className="font-arabic">إنشاء</span>
          {hasCompose ? (
            composeCompleted ? <span className="tab-badge completed">✓</span> : null
          ) : (
            <span className="tab-badge muted">(not available)</span>
          )}
        </button>
        <button
          className={`lesson-tab ${activeTab === 'fluency' ? 'active' : ''} ${!hasFluency ? 'disabled' : ''}`}
          onClick={() => hasFluency && setActiveTab('fluency')}
          disabled={!hasFluency}
        >
          Fluency <span className="font-arabic">طلاقة</span>
          {!hasFluency && (
            <span className="tab-badge muted">(visit first)</span>
          )}
        </button>
      </div>

      {activeTab === 'study' ? (
        <StudyContent blocks={lesson.content} />
      ) : activeTab === 'practice' && hasExercises ? (
        <PracticeContent
          exercises={lesson.exercises}
          onExerciseCompleted={onMarkExerciseCompleted}
          onQuestionMastered={onMarkQuestionMastered}
        />
      ) : activeTab === 'compose' && hasCompose ? (
        <ComposeContent
          compose={lesson.compose!}
          lessonId={lesson.id}
          draft={getComposeDraft(lesson.compose!.id)}
          isCompleted={composeCompleted}
          onSaveDraft={onSaveComposeDraft}
          onComplete={onMarkComposeCompleted}
        />
      ) : activeTab === 'fluency' && hasFluency ? (
        <FluencyContent
          lesson={lesson}
          progress={progress}
          onSaveFluencySession={onSaveFluencySession}
          getFluencyStats={getFluencyStats}
          getFluencySessions={getFluencySessions}
          getComposeDraft={getComposeDraft}
        />
      ) : null}
    </div>
  );
}
