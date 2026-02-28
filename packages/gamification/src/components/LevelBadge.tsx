import type { LevelInfo } from '../types/xp';

interface LevelBadgeProps {
  levelInfo: LevelInfo;
}

export function LevelBadge({ levelInfo }: LevelBadgeProps) {
  const progressPercent = Math.round(levelInfo.progress * 100);

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-primary rounded-lg border border-[#2d4a6f] font-sans text-primary-foreground">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-[#d4b56a] flex items-center justify-center text-base font-bold text-primary shrink-0">
        {levelInfo.level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className="font-semibold text-[0.85rem]">
            {levelInfo.titleEn}
          </span>
          <span dir="rtl" className="font-arabic text-[0.85rem] text-accent">
            {levelInfo.titleAr}
          </span>
        </div>
        <div className="mt-1 h-1.5 bg-[#2d4a6f] rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-[#d4b56a] rounded transition-[width] duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-[0.65rem] text-muted-foreground mt-0.5">
          {levelInfo.xpRequired.toLocaleString()} / {levelInfo.xpForNext.toLocaleString()} XP
        </div>
      </div>
    </div>
  );
}
