import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  streak: number;
  multiplier: number;
  compact?: boolean;
}

export function StreakDisplay({ streak, multiplier, compact = false }: StreakDisplayProps) {
  const flameColor = streak >= 30 ? '#FF4500' : streak >= 7 ? '#FF8C00' : streak >= 1 ? '#FFA500' : '#A0AEC0';

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1 text-sm font-sans text-primary-foreground">
        <Flame size={16} color={flameColor} />
        <span className="font-semibold">{streak}</span>
        {multiplier > 1 && (
          <span className="text-[0.65rem] bg-accent text-primary rounded px-1 font-bold">
            {multiplier}x
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-primary rounded-lg border border-[#2d4a6f] font-sans text-primary-foreground">
      <Flame size={24} color={flameColor} />
      <div>
        <div className="text-xl font-bold leading-none">
          {streak}
        </div>
        <div className="text-[0.7rem] text-muted-foreground">
          day streak
        </div>
      </div>
      {multiplier > 1 && (
        <div className="ml-auto text-[0.8rem] bg-accent text-primary rounded-md px-2 py-0.5 font-bold">
          {multiplier}x XP
        </div>
      )}
    </div>
  );
}
