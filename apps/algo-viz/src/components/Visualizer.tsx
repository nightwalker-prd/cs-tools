import { cn } from '@cstools/ui';

interface VisualizerProps {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  maxValue?: number;
}

export function Visualizer({ array, comparing, swapping, sorted, maxValue }: VisualizerProps) {
  const max = maxValue || Math.max(...array, 1);

  return (
    <div className="flex items-end justify-center gap-1 h-64 p-4">
      {array.map((value, index) => {
        const height = (value / max) * 100;
        const isComparing = comparing.includes(index);
        const isSwapping = swapping.includes(index);
        const isSorted = sorted.includes(index);

        return (
          <div
            key={index}
            className={cn(
              'flex-1 max-w-12 rounded-t-sm transition-all duration-200 relative',
              isSwapping ? 'bg-[#F85149]' :
              isComparing ? 'bg-[#D29922]' :
              isSorted ? 'bg-[#3FB950]' :
              'bg-[#58A6FF]'
            )}
            style={{ height: `${height}%` }}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-mono text-[#8B949E]">
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
