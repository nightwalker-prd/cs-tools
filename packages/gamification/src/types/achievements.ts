export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'diamond';
export type AchievementCategory = 'streak' | 'mastery' | 'practice' | 'milestone';

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  condition: (stats: UserStats) => boolean;
  icon: string; // lucide icon name
}

export interface Achievement {
  id: string;
  unlockedAt: string; // ISO date
}

export interface UserStats {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  totalExercisesCompleted: number;
  totalExercisesCorrect: number;
  totalPerfectSessions: number;
  totalDaysActive: number;
  appsUsed: string[];
  totalAchievements: number;
}
