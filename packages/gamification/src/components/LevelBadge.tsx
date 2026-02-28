import type { LevelInfo } from '../types/xp';

interface LevelBadgeProps {
  levelInfo: LevelInfo;
}

export function LevelBadge({ levelInfo }: LevelBadgeProps) {
  const progressPercent = Math.round(levelInfo.progress * 100);

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-primary rounded-lg border border-[#30363d] font-sans text-primary-foreground">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#58A6FF] to-[#388bfd] flex items-center justify-center text-base font-bold text-white shrink-0">
        {levelInfo.level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className="font-semibold text-[0.85rem]">
            {levelInfo.title}
          </span>
        </div>
        <div className="mt-1 h-1.5 bg-[#30363d] rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#58A6FF] to-[#388bfd] rounded transition-[width] duration-500 ease-out"
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
