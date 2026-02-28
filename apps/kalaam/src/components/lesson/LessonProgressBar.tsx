import { ChevronLeft, Star } from 'lucide-react';

interface LessonProgressBarProps {
  current: number;
  total: number;
  points: number;
  onBack: () => void;
}

export default function LessonProgressBar({
  current,
  total,
  points,
  onBack,
}: LessonProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3 px-4 pt-3 pb-2">
      {/* Back button */}
      <button
        onClick={onBack}
        className="p-1 -ml-1 rounded-lg text-text-secondary hover:bg-card-hover transition-colors"
        aria-label="Back to study"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Progress bar */}
      <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Points counter */}
      <div className="flex items-center gap-1 text-sm font-medium text-accent min-w-[48px] justify-end">
        <Star size={14} className="fill-accent" />
        {points}
      </div>
    </div>
  );
}
