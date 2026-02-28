import { Flame, Star, Trophy } from 'lucide-react';
import type { UseGamificationReturn } from '@arabtools/gamification/hooks';

interface GamificationHeaderProps {
  gamification: UseGamificationReturn;
}

export function GamificationHeader({ gamification }: GamificationHeaderProps) {
  const { levelInfo, streakData, streakMultiplier, xpState, achievements } = gamification;
  const achievementCount = Object.keys(achievements).length;

  return (
    <div className="gamification-header">
      <div className="gamification-level">
        <div className="gamification-level-badge">
          <span className="gamification-level-num">{levelInfo.level}</span>
        </div>
        <div className="gamification-level-info">
          <span className="gamification-level-title font-arabic" dir="rtl">
            {levelInfo.titleAr}
          </span>
          <span className="gamification-level-en">{levelInfo.titleEn}</span>
          <div className="gamification-xp-bar">
            <div
              className="gamification-xp-fill"
              style={{ width: `${Math.round(levelInfo.progress * 100)}%` }}
            />
          </div>
          <span className="gamification-xp-text">
            {xpState.totalXp.toLocaleString()} XP
          </span>
        </div>
      </div>

      <div className="gamification-stats">
        {streakData.currentStreak > 0 && (
          <div className="gamification-stat gamification-stat--streak">
            <Flame size={18} />
            <span className="gamification-stat-value">{streakData.currentStreak}</span>
            <span className="gamification-stat-label">day streak</span>
            {streakMultiplier.multiplier > 1 && (
              <span className="gamification-multiplier">{streakMultiplier.multiplier}x</span>
            )}
          </div>
        )}

        <div className="gamification-stat">
          <Star size={18} />
          <span className="gamification-stat-value">{xpState.totalXp.toLocaleString()}</span>
          <span className="gamification-stat-label">total XP</span>
        </div>

        <div className="gamification-stat">
          <Trophy size={18} />
          <span className="gamification-stat-value">{achievementCount}</span>
          <span className="gamification-stat-label">achievements</span>
        </div>
      </div>
    </div>
  );
}
