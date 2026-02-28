import { Card, CardContent, CardHeader, CardTitle } from '@cstools/ui';
import { Trophy, Flame, Target, Brain } from 'lucide-react';

export interface CategoryStat {
  id: string;
  name: string;
  solved: number;
  correct: number;
}

interface DashboardProps {
  stats: {
    totalSolved: number;
    accuracy: number;
    streak: number;
    xp: number;
  };
  categoryStats: CategoryStat[];
}

function accuracyPct(s: CategoryStat): number {
  return s.solved > 0 ? Math.round((s.correct / s.solved) * 100) : -1;
}

function accuracyColor(pct: number): string {
  if (pct >= 80) return 'bg-[#3FB950]';
  if (pct >= 50) return 'bg-[#D29922]';
  return 'bg-[#F85149]';
}

function accuracyTextColor(pct: number): string {
  if (pct >= 80) return 'text-[#3FB950]';
  if (pct >= 50) return 'text-[#D29922]';
  return 'text-[#F85149]';
}

export function Dashboard({ stats, categoryStats }: DashboardProps) {
  // Only include categories that have been attempted
  const attempted = categoryStats.filter(c => c.solved > 0);
  const sorted = [...attempted].sort((a, b) => accuracyPct(a) - accuracyPct(b));

  // Weak = bottom half (lowest accuracy), Strong = top half (highest accuracy)
  const midpoint = Math.ceil(sorted.length / 2);
  const weakAreas = sorted.slice(0, midpoint);
  const strongAreas = [...sorted.slice(midpoint)].reverse(); // best first

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#E6EDF3]">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Target className="w-8 h-8 text-[#58A6FF]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stats.totalSolved}</p>
              <p className="text-xs text-[#8B949E]">Problems Solved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#D2A8FF]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stats.accuracy}%</p>
              <p className="text-xs text-[#8B949E]">Accuracy</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="w-8 h-8 text-[#FFA657]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stats.streak}</p>
              <p className="text-xs text-[#8B949E]">Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#D29922]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{stats.xp}</p>
              <p className="text-xs text-[#8B949E]">Total XP</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-category breakdown */}
      {attempted.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weak Areas */}
          <Card className="bg-[#161B22] border-[#30363D]">
            <CardHeader>
              <CardTitle className="text-sm text-[#F85149]">Needs Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weakAreas.length > 0 ? weakAreas.map(cat => {
                  const pct = accuracyPct(cat);
                  return (
                    <div key={cat.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-[#8B949E]">
                        <div className={`w-2 h-2 rounded-full ${accuracyColor(pct)}`} />
                        {cat.name}
                      </div>
                      <span className={`font-mono text-xs ${accuracyTextColor(pct)}`}>
                        {pct}% ({cat.correct}/{cat.solved})
                      </span>
                    </div>
                  );
                }) : (
                  <p className="text-sm text-[#8B949E]">No data yet. Start practicing!</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Strong Areas */}
          <Card className="bg-[#161B22] border-[#30363D]">
            <CardHeader>
              <CardTitle className="text-sm text-[#3FB950]">Strong Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {strongAreas.length > 0 ? strongAreas.map(cat => {
                  const pct = accuracyPct(cat);
                  return (
                    <div key={cat.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-[#8B949E]">
                        <div className={`w-2 h-2 rounded-full ${accuracyColor(pct)}`} />
                        {cat.name}
                      </div>
                      <span className={`font-mono text-xs ${accuracyTextColor(pct)}`}>
                        {pct}% ({cat.correct}/{cat.solved})
                      </span>
                    </div>
                  );
                }) : (
                  <p className="text-sm text-[#8B949E]">No data yet. Start practicing!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Not started message */}
      {attempted.length === 0 && (
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-6 text-center">
            <p className="text-[#8B949E]">No category data yet. Start practicing to see your strengths and weaknesses!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
