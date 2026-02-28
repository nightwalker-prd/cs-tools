import { cn } from './utils';

interface StepIndicatorProps {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
}

export function StepIndicator({ current, total, className, showLabel = true }: StepIndicatorProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {showLabel && (
        <span className="text-sm font-mono text-[#8B949E] whitespace-nowrap">
          Step {current}/{total}
        </span>
      )}
      <div className="flex-1 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#58A6FF] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
