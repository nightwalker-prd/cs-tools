import { Card, CardContent, CardHeader, CardTitle } from '@cstools/ui';
import { useWeeklyReport, useMistakePatterns } from '@cstools/analytics';
import type { TrendDirection, Severity } from '@cstools/analytics';
import { LevelBadge, StreakDisplay, ACHIEVEMENT_DEFS } from '@cstools/gamification';
import type { LevelInfo, StreakData } from '@cstools/gamification';
import { Trophy, Target, Brain, TrendingUp, TrendingDown, Minus, CalendarDays, AlertTriangle, Award } from 'lucide-react';

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
  };
  levelInfo: LevelInfo;
  streakData: StreakData;
  streakMultiplier: number;
  xp: number;
  unlockedAchievements: number;
  totalAchievements: number;
  achievements: Record<string, string>;
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

function trendArrow(trend: TrendDirection): { icon: typeof TrendingUp; label: string; color: string } {
  switch (trend) {
    case 'improving':
      return { icon: TrendingUp, label: 'Improving', color: 'text-[#3FB950]' };
    case 'worsening':
      return { icon: TrendingDown, label: 'Worsening', color: 'text-[#F85149]' };
    default:
      return { icon: Minus, label: 'Stable', color: 'text-[#8B949E]' };
  }
}

function severityBadge(severity: Severity): { label: string; bg: string; text: string } {
  switch (severity) {
    case 'severe':
      return { label: 'Severe', bg: 'bg-[#F85149]/20', text: 'text-[#F85149]' };
    case 'moderate':
      return { label: 'Moderate', bg: 'bg-[#D29922]/20', text: 'text-[#D29922]' };
    default:
      return { label: 'Mild', bg: 'bg-[#8B949E]/20', text: 'text-[#8B949E]' };
  }
}

function formatCategoryName(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDayName(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
}

const TIER_COLORS: Record<string, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#58A6FF',
  diamond: '#B9F2FF',
};

export function Dashboard({
  stats,
  levelInfo,
  streakData,
  streakMultiplier,
  xp,
  unlockedAchievements,
  totalAchievements,
  achievements,
  categoryStats,
}: DashboardProps) {
  // Only include categories that have been attempted
  const attempted = categoryStats.filter(c => c.solved > 0);
  const sorted = [...attempted].sort((a, b) => accuracyPct(a) - accuracyPct(b));

  // Weak = bottom half (lowest accuracy), Strong = top half (highest accuracy)
  const midpoint = Math.ceil(sorted.length / 2);
  const weakAreas = sorted.slice(0, midpoint);
  const strongAreas = [...sorted.slice(midpoint)].reverse(); // best first

  // Analytics hooks
  const weeklyReport = useWeeklyReport();
  const mistakePatterns = useMistakePatterns();

  const weeklyAccuracyPct = weeklyReport.thisWeek.totalExercises > 0
    ? Math.round(weeklyReport.thisWeek.accuracy * 100)
    : 0;

  const exerciseTrend = trendArrow(weeklyReport.exercisesTrend);
  const accTrend = trendArrow(weeklyReport.accuracyTrend);
  const ExerciseTrendIcon = exerciseTrend.icon;
  const AccTrendIcon = accTrend.icon;

  const topPatterns = mistakePatterns.slice(0, 5);

  // Recent achievements (sorted by unlock date, newest first)
  const recentAchievements = Object.entries(achievements)
    .sort(([, dateA], [, dateB]) => dateB.localeCompare(dateA))
    .slice(0, 6)
    .map(([id, unlockedAt]) => {
      const def = ACHIEVEMENT_DEFS.find(d => d.id === id);
      return def ? { ...def, unlockedAt } : null;
    })
    .filter((a): a is NonNullable<typeof a> => a !== null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#E6EDF3]">Dashboard</h2>

      {/* Gamification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <LevelBadge levelInfo={levelInfo} />
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4">
            <StreakDisplay streak={streakData.currentStreak} multiplier={streakMultiplier} />
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#D29922]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{xp.toLocaleString()}</p>
              <p className="text-xs text-[#8B949E]">Total XP</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardContent className="p-4 flex items-center gap-3">
            <Award className="w-8 h-8 text-[#D2A8FF]" />
            <div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{unlockedAchievements}/{totalAchievements}</p>
              <p className="text-xs text-[#8B949E]">Achievements</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-sm text-[#D2A8FF] flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recentAchievements.map(achievement => {
                const borderColor = TIER_COLORS[achievement.tier] ?? TIER_COLORS.bronze;
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#0D1117] border"
                    style={{ borderColor: `${borderColor}44` }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${borderColor}22`, border: `1px solid ${borderColor}` }}
                    >
                      <Trophy size={14} color={borderColor} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#E6EDF3] truncate">{achievement.title}</p>
                      <p className="text-xs text-[#8B949E] truncate">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* This Week - Analytics */}
      <Card className="bg-[#161B22] border-[#30363D]">
        <CardHeader>
          <CardTitle className="text-sm text-[#58A6FF] flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Exercises this week */}
            <div className="space-y-1">
              <p className="text-xs text-[#8B949E]">Exercises</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#E6EDF3]">
                  {weeklyReport.thisWeek.totalExercises}
                </span>
                <ExerciseTrendIcon className={`w-4 h-4 ${exerciseTrend.color}`} />
              </div>
              {weeklyReport.lastWeek && (
                <p className="text-xs text-[#8B949E]">
                  vs {weeklyReport.lastWeek.totalExercises} last week
                </p>
              )}
            </div>

            {/* Accuracy this week */}
            <div className="space-y-1">
              <p className="text-xs text-[#8B949E]">Accuracy</p>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${weeklyAccuracyPct >= 70 ? 'text-[#3FB950]' : weeklyAccuracyPct >= 50 ? 'text-[#D29922]' : 'text-[#F85149]'}`}>
                  {weeklyAccuracyPct}%
                </span>
                <AccTrendIcon className={`w-4 h-4 ${accTrend.color}`} />
              </div>
              {weeklyReport.lastWeek && (
                <p className="text-xs text-[#8B949E]">
                  vs {Math.round(weeklyReport.lastWeek.accuracy * 100)}% last week
                </p>
              )}
            </div>

            {/* Errors this week */}
            <div className="space-y-1">
              <p className="text-xs text-[#8B949E]">Errors</p>
              <span className="text-lg font-bold text-[#E6EDF3]">
                {weeklyReport.thisWeek.totalErrors}
              </span>
            </div>

            {/* Most active day */}
            <div className="space-y-1">
              <p className="text-xs text-[#8B949E]">Most Active Day</p>
              <span className="text-lg font-bold text-[#E6EDF3]">
                {weeklyReport.thisWeek.totalExercises > 0
                  ? formatDayName(weeklyReport.thisWeek.mostActiveDay)
                  : '--'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mistake Patterns - Analytics */}
      {topPatterns.length > 0 && (
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardHeader>
            <CardTitle className="text-sm text-[#FFA657] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Mistake Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPatterns.map(pattern => {
                const badge = severityBadge(pattern.severity);
                const trend = trendArrow(pattern.trend);
                const TrendIcon = trend.icon;
                return (
                  <div key={pattern.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                      <span className="text-sm text-[#E6EDF3]">
                        {formatCategoryName(pattern.category)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#8B949E]">
                        {pattern.frequency}x
                      </span>
                      <TrendIcon className={`w-3.5 h-3.5 ${trend.color}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

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
