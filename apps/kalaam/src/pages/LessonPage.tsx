import { useEffect, useCallback } from 'react';
import { useRouter } from '@/hooks/useRouter';
import { useLessonSession } from '@/hooks/useLessonSession';
import { useQuizSession } from '@/hooks/useQuizSession';
import LessonProgressBar from '@/components/lesson/LessonProgressBar';
import FlashcardStack from '@/components/lesson/FlashcardStack';
import CardFront from '@/components/lesson/CardFront';
import CardBack from '@/components/lesson/CardBack';
import GradeButtons from '@/components/lesson/GradeButtons';
import QuizCard from '@/components/lesson/QuizCard';
import LessonComplete from '@/components/lesson/LessonComplete';
import ErrorState from '@/components/ErrorState';
import { Loader2 } from 'lucide-react';

export default function LessonPage() {
  const { route, navigate } = useRouter();
  const isQuizMode =
    route.page === 'lesson' && route.params?.mode === 'quiz';

  return isQuizMode ? (
    <QuizLessonPage navigate={navigate} />
  ) : (
    <FlashcardLessonPage navigate={navigate} />
  );
}

// ---------------------------------------------------------------------------
// Flashcard mode (existing behavior)
// ---------------------------------------------------------------------------

function FlashcardLessonPage({ navigate }: { navigate: (hash: string) => void }) {
  const session = useLessonSession();

  useEffect(() => {
    session.startSession();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcuts: Space to flip, Left for "Don't know", Right for "Know"
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!session.currentWord || session.isComplete) return;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (!session.isFlipped) {
          session.flip();
        }
      } else if (e.key === 'ArrowLeft' && session.isFlipped) {
        e.preventDefault();
        session.grade(0); // Don't know
      } else if (e.key === 'ArrowRight' && session.isFlipped) {
        e.preventDefault();
        session.grade(2); // Know
      }
    },
    [session],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lesson complete screen
  if (session.isComplete) {
    return (
      <LessonComplete
        results={session.results}
        onBack={() => navigate('#/')}
      />
    );
  }

  // Error state
  if (session.loadError) {
    return (
      <ErrorState
        message={session.loadError}
        onRetry={() => navigate('#/')}
      />
    );
  }

  // Loading state
  if (!session.currentWord) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 size={32} className="text-primary animate-spin" />
        <p className="text-sm text-text-secondary">Loading cards...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LessonProgressBar
        current={session.progress.current}
        total={session.progress.total}
        points={session.points}
        onBack={() => navigate('#/')}
      />

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <FlashcardStack
          isFlipped={session.isFlipped}
          onFlip={session.flip}
          front={<CardFront word={session.currentWord} />}
          back={
            <CardBack
              word={session.currentWord}
              onMoreInfo={() => navigate(`#/word/${session.currentWord!.lemmaId}`)}
            />
          }
          remaining={session.progress.total - session.progress.current}
        />
      </div>

      {/* Grade buttons — always rendered to prevent layout shift, hidden until flipped */}
      <div className={`transition-opacity duration-200 ${session.isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <GradeButtons onGrade={session.grade} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quiz mode (multiple-choice)
// ---------------------------------------------------------------------------

function QuizLessonPage({ navigate }: { navigate: (hash: string) => void }) {
  const session = useQuizSession();

  useEffect(() => {
    session.startSession();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Quiz complete screen
  if (session.isComplete) {
    return (
      <LessonComplete
        results={session.results}
        onBack={() => navigate('#/')}
      />
    );
  }

  // Error state
  if (session.loadError) {
    return (
      <ErrorState
        message={session.loadError}
        onRetry={() => navigate('#/')}
      />
    );
  }

  // Loading state
  if (!session.currentWord) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 size={32} className="text-primary animate-spin" />
        <p className="text-sm text-text-secondary">Loading quiz...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LessonProgressBar
        current={session.progress.current}
        total={session.progress.total}
        points={session.points}
        onBack={() => navigate('#/')}
      />

      {/* Score indicator */}
      <div className="flex justify-center px-4 pt-2">
        <div className="text-sm text-text-secondary">
          Score: <span className="font-semibold text-primary">{session.score.correct}</span>
          <span className="text-text-secondary">/{session.score.total}</span>
        </div>
      </div>

      {/* Quiz card area */}
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <QuizCard
          key={session.currentWord.lemmaId}
          word={session.currentWord}
          onAnswer={session.answer}
        />
      </div>
    </div>
  );
}
