import type { FrequencyLevel } from '@arabtools/data';
import type { DashboardData } from '@arabtools/srs';
import { Card, CardContent, CardHeader, CardTitle } from '@arabtools/ui';
import type { BandStatsMap } from '../types';

interface DashboardProps {
  bandStats: BandStatsMap;
  dashboard: DashboardData;
  streak: number;
  onStartSession: () => void;
}

const BAND_LABELS: { level: FrequencyLevel; label: string; color: string }[] = [
  { level: '1k', label: 'Top 1,000', color: 'bg-emerald-500' },
  { level: '2k', label: 'Top 2,000', color: 'bg-blue-500' },
  { level: '3k', label: 'Top 3,000', color: 'bg-violet-500' },
  { level: '5k', label: 'Top 5,000', color: 'bg-amber-500' },
  { level: '10k', label: 'Top 10,000', color: 'bg-rose-500' },
];

export function Dashboard({ bandStats, dashboard, streak, onStartSession }: DashboardProps) {
  const vocabStats = dashboard.pillarStats.vocabulary;
  const dueCount = vocabStats?.due ?? dashboard.dueNow;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-fade-in-up">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          <span className="font-arabic text-4xl">مفردات</span>
        </h1>
        <p className="text-muted-foreground">Root-Family Vocabulary Builder</p>
      </header>

      {/* Today's Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Due Today" value={dueCount} />
        <StatCard label="Reviewed" value={dashboard.reviewsToday} />
        <StatCard label="Streak" value={`${streak}d`} />
      </div>

      {/* Frequency Band Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequency Bands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {BAND_LABELS.map(({ level, label, color }) => {
            const stats = bandStats[level];
            const learned = stats.learning + stats.review + stats.mastered;
            const pct = stats.total > 0 ? (learned / stats.total) * 100 : 0;

            return (
              <div key={level} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{label}</span>
                  <span className="text-muted-foreground">
                    {learned} / {stats.total}
                    {stats.mastered > 0 && (
                      <span className="text-emerald-600 ml-1">
                        ({stats.mastered} mastered)
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Start Session */}
      <button
        onClick={onStartSession}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
      >
        Start Session
      </button>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-card rounded-xl p-4 text-center border">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
