import { TrendingUp } from 'lucide-react';

interface UnderstandingBarProps {
  percentage: number;
}

export default function UnderstandingBar({ percentage }: UnderstandingBarProps) {
  return (
    <div className="bg-card rounded-2xl p-4 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-text">Quran Understanding</span>
        {percentage > 0 && (
          <span className="flex items-center gap-1 text-xs text-success font-medium">
            +{percentage}% since joined
            <TrendingUp size={12} />
          </span>
        )}
      </div>
      <div className="h-2.5 bg-border/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>{percentage}%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
