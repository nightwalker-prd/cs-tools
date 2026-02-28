import { cn } from '@cstools/ui';

interface PseudocodePanelProps {
  lines: string[];
  activeLine: number;
}

export function PseudocodePanel({ lines, activeLine }: PseudocodePanelProps) {
  return (
    <div className="bg-[#010409] rounded-md border border-[#30363D] p-4 font-mono text-sm">
      <div className="text-xs text-[#8B949E] mb-3 font-sans font-medium">Pseudocode</div>
      {lines.map((line, i) => (
        <div
          key={i}
          className={cn(
            'px-2 py-0.5 rounded transition-colors',
            i === activeLine && 'bg-[#58A6FF]/15 text-[#58A6FF] border-l-2 border-[#58A6FF] -ml-0.5'
          )}
        >
          <span className="text-[#484F58] mr-3 select-none text-xs">{i + 1}</span>
          <span className={i === activeLine ? 'text-[#E6EDF3]' : 'text-[#8B949E]'}>{line}</span>
        </div>
      ))}
    </div>
  );
}
