import { useState, useEffect, useMemo } from 'react';
import { Flame, Trophy } from 'lucide-react';

const STREAK_KEY = 'kalaam-streak';

interface StreakData {
  current: number;
  record: number;
  lastDate: string;
  weekActivity: boolean[];
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

function getDefaultStreak(): StreakData {
  return { current: 0, record: 0, lastDate: '', weekActivity: [false, false, false, false, false, false, false] };
}

function loadStreak(): StreakData {
  try {
    const stored = localStorage.getItem(STREAK_KEY);
    if (!stored) return getDefaultStreak();
    return { ...getDefaultStreak(), ...JSON.parse(stored) };
  } catch {
    return getDefaultStreak();
  }
}

function getTodayDayIndex(): number {
  const day = new Date().getDay();
  // Convert from Sunday=0 to Monday=0
  return day === 0 ? 6 : day - 1;
}

export default function ProgressSection() {
  const [streak, setStreak] = useState<StreakData>(loadStreak);

  // Sync from localStorage on mount (in case another tab updated)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STREAK_KEY) {
        setStreak(loadStreak());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const todayIndex = useMemo(() => getTodayDayIndex(), []);

  const hasActivity = streak.current > 0 || streak.weekActivity.some(Boolean);

  return (
    <div className="bg-card rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-text mb-4">My Progress</h2>

      {/* Streak stats */}
      <div className="flex items-center gap-6 mb-4">
        {/* Current streak */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center">
            <Flame size={18} className="text-accent" />
          </div>
          <div>
            <div className="text-lg font-bold text-text leading-tight">{streak.current}</div>
            <div className="text-xs text-text-secondary">Current streak</div>
          </div>
        </div>

        {/* Record streak */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center">
            <Trophy size={18} className="text-primary" />
          </div>
          <div>
            <div className="text-lg font-bold text-text leading-tight">{streak.record}</div>
            <div className="text-xs text-text-secondary">Record streak</div>
          </div>
        </div>
      </div>

      {/* Week activity circles */}
      <div className="flex items-center justify-between gap-1 px-1">
        {DAY_LABELS.map((label, index) => {
          const isToday = index === todayIndex;
          const isActive = streak.weekActivity[index] ?? false;

          return (
            <div key={index} className="flex flex-col items-center gap-1.5">
              <div className="text-[10px] text-text-secondary font-medium">{label}</div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isToday && isActive
                    ? 'bg-primary text-white'
                    : isToday
                      ? 'bg-primary/15 text-primary ring-2 ring-primary/30'
                      : isActive
                        ? 'bg-success text-white'
                        : 'bg-border/50 text-text-secondary'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {!hasActivity && (
        <p className="text-xs text-text-secondary text-center mt-3">
          Start learning to track your streak!
        </p>
      )}
    </div>
  );
}
