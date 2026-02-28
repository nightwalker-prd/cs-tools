import { BookOpen, Brain, Flame, RotateCcw } from 'lucide-react';

interface StatsOverviewProps {
  wordsLearned: number;
  totalWords: number;
  understandingPct: number;
  streak: number;
  totalReviews: number;
}

export default function StatsOverview({
  wordsLearned,
  totalWords,
  understandingPct,
  streak,
  totalReviews,
}: StatsOverviewProps) {
  const progressPct = totalWords > 0 ? Math.min((wordsLearned / totalWords) * 100, 100) : 0;

  return (
    <div className="bg-card rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-text mb-4">Your Progress</h2>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="text-text-secondary">Words learned</span>
          <span className="font-medium text-text">
            {wordsLearned.toLocaleString()}{' '}
            <span className="text-text-secondary font-normal">/ {totalWords.toLocaleString()}</span>
          </span>
        </div>
        <div className="relative h-2.5 bg-border/50 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* 2x2 stat grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<BookOpen size={18} className="text-primary" />}
          label="Words Learned"
          value={wordsLearned.toLocaleString()}
        />
        <StatCard
          icon={<Brain size={18} className="text-accent" />}
          label="Understanding"
          value={`${understandingPct}%`}
        />
        <StatCard
          icon={<Flame size={18} className="text-danger" />}
          label="Current Streak"
          value={`${streak} day${streak !== 1 ? 's' : ''}`}
        />
        <StatCard
          icon={<RotateCcw size={18} className="text-success" />}
          label="Total Reviews"
          value={totalReviews.toLocaleString()}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl p-3 border border-border">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-text-secondary font-medium">{label}</span>
      </div>
      <div className="text-lg font-bold text-text">{value}</div>
    </div>
  );
}
