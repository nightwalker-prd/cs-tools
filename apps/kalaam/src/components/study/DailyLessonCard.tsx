import { Settings, ArrowRight, Zap, CheckCircle, BookOpen } from 'lucide-react';

interface DailyLessonCardProps {
  newCount: number;
  reviewCount: number;
  totalLearned?: number;
  onStartLesson: () => void;
  onStartChallenge: () => void;
  onOpenSettings: () => void;
}

export default function DailyLessonCard({
  newCount,
  reviewCount,
  totalLearned = 0,
  onStartLesson,
  onStartChallenge,
  onOpenSettings,
}: DailyLessonCardProps) {
  const totalDue = newCount + reviewCount;
  const reviewProgress = reviewCount > 0 ? 1 : 0; // Will animate when user starts reviewing

  // Empty state: user has learned words but nothing due today
  const allCaughtUp = totalDue === 0 && totalLearned > 0;
  // Empty state: user hasn't started learning yet
  const notStarted = totalDue === 0 && totalLearned === 0;

  return (
    <div className="bg-card rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text">Daily Lesson</h2>
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg text-text-secondary hover:bg-card-hover transition-colors"
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Empty state: all caught up */}
      {allCaughtUp && (
        <div className="text-center py-4 mb-3">
          <CheckCircle className="mx-auto text-success mb-2" size={36} />
          <p className="font-medium text-text">All caught up!</p>
          <p className="text-sm text-text-secondary mt-1">
            Come back tomorrow for more reviews.
          </p>
        </div>
      )}

      {/* Empty state: not started */}
      {notStarted && (
        <div className="text-center py-4 mb-3">
          <BookOpen className="mx-auto text-primary mb-2" size={36} />
          <p className="font-medium text-text">Start your first lesson</p>
          <p className="text-sm text-text-secondary mt-1">
            Begin learning to build your vocabulary!
          </p>
        </div>
      )}

      {/* Stat boxes — show when cards are due */}
      {!allCaughtUp && !notStarted && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* New cards */}
          <div className="bg-white rounded-xl p-3 border border-border">
            <div className="text-xs text-text-secondary font-medium mb-1">New cards</div>
            <div className="text-2xl font-bold text-primary">{newCount}</div>
          </div>

          {/* Review cards */}
          <div className="bg-white rounded-xl p-3 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-text-secondary font-medium mb-1">Review cards</div>
                <div className="text-2xl font-bold text-accent">{reviewCount}</div>
              </div>
              {/* Circular progress indicator */}
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-border"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${reviewProgress * 88} 88`}
                    strokeLinecap="round"
                    className="text-accent transition-all duration-500"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Start lesson button */}
      <button
        onClick={onStartLesson}
        disabled={totalDue === 0}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium
          py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {notStarted ? 'Start your first lesson' : "Start today's lesson"}
        <ArrowRight size={18} />
      </button>

      {/* Challenge link */}
      {reviewCount > 0 && (
        <button
          onClick={onStartChallenge}
          className="w-full flex items-center justify-center gap-1.5 text-primary font-medium
            text-sm mt-2 py-2 hover:bg-primary-light rounded-lg transition-colors"
        >
          <Zap size={14} />
          Start challenge
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
