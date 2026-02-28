import { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import type { AchievementDef } from '../types/achievements';

const TIER_COLORS: Record<string, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#c5a253',
  diamond: '#B9F2FF',
};

interface AchievementToastProps {
  achievement: AchievementDef;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const borderColor = TIER_COLORS[achievement.tier] ?? TIER_COLORS.bronze;

  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex items-center gap-3 px-4 py-3 bg-primary rounded-xl max-w-80 font-sans text-primary-foreground"
      style={{
        border: `2px solid ${borderColor}`,
        boxShadow: `0 4px 20px ${borderColor}44`,
        animationName: 'gamification-toast-in',
        animationDuration: '0.4s',
        animationTimingFunction: 'ease-out',
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: `${borderColor}22`,
          border: `1px solid ${borderColor}`,
        }}
      >
        <Trophy size={18} color={borderColor} />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-[0.7rem] uppercase tracking-wide mb-0.5"
          style={{ color: borderColor }}
        >
          Achievement Unlocked
        </div>
        <div className="font-semibold text-sm">
          {achievement.titleEn}
        </div>
        <div dir="rtl" className="font-arabic text-[0.85rem] text-muted">
          {achievement.titleAr}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {achievement.description}
        </div>
      </div>
    </div>
  );
}
