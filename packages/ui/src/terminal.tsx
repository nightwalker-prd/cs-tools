import { cn } from './utils';

interface TerminalProps {
  lines: string[];
  title?: string;
  className?: string;
  showPrompt?: boolean;
}

export function Terminal({ lines, title = 'Output', className, showPrompt = false }: TerminalProps) {
  return (
    <div className={cn('rounded-md border border-[#30363D] bg-[#010409] overflow-hidden', className)}>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#30363D] bg-[#161B22]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#F85149]" />
          <div className="w-3 h-3 rounded-full bg-[#D29922]" />
          <div className="w-3 h-3 rounded-full bg-[#3FB950]" />
        </div>
        <span className="text-xs text-[#8B949E] font-mono ml-2">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className="text-[#E6EDF3]">
            {showPrompt && <span className="text-[#3FB950]">$ </span>}
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
