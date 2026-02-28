import { Map } from 'lucide-react';
import { useGamification } from '@arabtools/gamification/hooks';
import { useBlindSpots, useWeeklyReport, useSrsInsights, useStreakCalendar } from '@arabtools/analytics/hooks';
import { StreakCalendar } from './StreakCalendar';
import { XpChart } from './XpChart';
import { MasteryDistribution } from './MasteryDistribution';
import { MemoryStrengthChart } from './MemoryStrengthChart';
import { MistakeInsightCards } from './MistakeInsightCards';
import { ReviewForecast } from './ReviewForecast';
import { DailyChallengeCard } from './DailyChallengeCard';

export function JourneyView() {
  const gamification = useGamification();
  const blindSpots = useBlindSpots();
  const weeklyReport = useWeeklyReport();
  const srsInsights = useSrsInsights();
  const streakCalendar = useStreakCalendar();

  const hasAnyData = gamification.xpState.totalXp > 0 ||
    blindSpots.spots.length > 0 ||
    srsInsights.totalItems > 0;

  if (!hasAnyData) {
    return (
      <div className="progress-empty">
        <Map size={48} />
        <h3>Your Journey Awaits</h3>
        <p>Start practicing with any tool to see your learning journey unfold here — streaks, XP, memory strength, and insights.</p>
      </div>
    );
  }

  return (
    <div className="journey-view">
      <DailyChallengeCard />

      <div className="journey-grid">
        <div className="journey-card journey-card--wide">
          <h3 className="journey-card-title">Practice Streak</h3>
          <StreakCalendar
            activityMap={streakCalendar}
            currentStreak={gamification.streakData.currentStreak}
          />
        </div>

        <div className="journey-card">
          <h3 className="journey-card-title">XP This Week</h3>
          <XpChart xpHistory={gamification.xpState.history} />
        </div>

        {srsInsights.totalItems > 0 && (
          <div className="journey-card">
            <h3 className="journey-card-title">Memory Strength</h3>
            <MemoryStrengthChart buckets={srsInsights.retentionBuckets} />
          </div>
        )}

        {srsInsights.totalItems > 0 && (
          <div className="journey-card">
            <h3 className="journey-card-title">Mastery Distribution</h3>
            <MasteryDistribution insights={srsInsights} />
          </div>
        )}

        {srsInsights.forecast.length > 0 && (
          <div className="journey-card journey-card--wide">
            <h3 className="journey-card-title">Upcoming Reviews</h3>
            <ReviewForecast forecast={srsInsights.forecast} />
          </div>
        )}
      </div>

      {blindSpots.spots.length > 0 && (
        <div className="journey-section">
          <h3 className="journey-section-title">Blind Spots</h3>
          <MistakeInsightCards analysis={blindSpots} />
        </div>
      )}

      {weeklyReport.thisWeek.totalExercises > 0 && (
        <div className="journey-section">
          <h3 className="journey-section-title">Weekly Summary</h3>
          <div className="weekly-summary">
            <div className="weekly-stat">
              <span className="weekly-stat-value">{weeklyReport.thisWeek.totalExercises}</span>
              <span className="weekly-stat-label">exercises</span>
              {weeklyReport.exercisesTrend === 'improving' && <span className="trend trend--up">↑</span>}
              {weeklyReport.exercisesTrend === 'worsening' && <span className="trend trend--down">↓</span>}
            </div>
            <div className="weekly-stat">
              <span className="weekly-stat-value">{Math.round(weeklyReport.thisWeek.accuracy)}%</span>
              <span className="weekly-stat-label">accuracy</span>
              {weeklyReport.accuracyTrend === 'improving' && <span className="trend trend--up">↑</span>}
              {weeklyReport.accuracyTrend === 'worsening' && <span className="trend trend--down">↓</span>}
            </div>
            <div className="weekly-stat">
              <span className="weekly-stat-value">{weeklyReport.thisWeek.totalErrors}</span>
              <span className="weekly-stat-label">errors</span>
              {weeklyReport.errorsTrend === 'improving' && <span className="trend trend--up">↓</span>}
              {weeklyReport.errorsTrend === 'worsening' && <span className="trend trend--down">↑</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
