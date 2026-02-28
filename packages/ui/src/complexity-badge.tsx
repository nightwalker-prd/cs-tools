import { cn } from './utils';

const complexityColors: Record<string, string> = {
  'O(1)': 'bg-[#3FB950]/15 text-[#3FB950] border-[#3FB950]/30',
  'O(log n)': 'bg-[#58A6FF]/15 text-[#58A6FF] border-[#58A6FF]/30',
  'O(n)': 'bg-[#D2A8FF]/15 text-[#D2A8FF] border-[#D2A8FF]/30',
  'O(n log n)': 'bg-[#D29922]/15 text-[#D29922] border-[#D29922]/30',
  'O(n^2)': 'bg-[#FFA657]/15 text-[#FFA657] border-[#FFA657]/30',
  'O(n^3)': 'bg-[#FF7B72]/15 text-[#FF7B72] border-[#FF7B72]/30',
  'O(2^n)': 'bg-[#F85149]/15 text-[#F85149] border-[#F85149]/30',
  'O(n!)': 'bg-[#F85149]/15 text-[#F85149] border-[#F85149]/30',
};

interface ComplexityBadgeProps {
  complexity: string;
  label?: string;
  className?: string;
}

export function ComplexityBadge({ complexity, label, className }: ComplexityBadgeProps) {
  const colorClass = complexityColors[complexity] || 'bg-[#21262D] text-[#8B949E] border-[#30363D]';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border',
        colorClass,
        className
      )}
    >
      {label && <span className="text-[#8B949E] font-sans">{label}:</span>}
      {complexity}
    </span>
  );
}
