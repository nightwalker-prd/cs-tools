import type { ForgePattern } from '../types';

interface PatternSelectorProps {
  patterns: ForgePattern[];
  selectedPattern: ForgePattern | null;
  onSelect: (pattern: ForgePattern) => void;
}

export function PatternSelector({ patterns, selectedPattern, onSelect }: PatternSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xs uppercase tracking-[0.12em] text-destructive mb-2.5 font-sans font-semibold">
        &#x2461; Select Pattern — &#x627;&#x644;&#x648;&#x64E;&#x632;&#x652;&#x646;
      </h3>
      <div className="flex flex-wrap gap-2">
        {patterns.map((pattern) => {
          const isSelected = selectedPattern?.id === pattern.id;

          return (
            <button
              key={pattern.id}
              onClick={() => onSelect(pattern)}
              className={`
                px-3.5 py-2.5 rounded-[10px] text-center
                transition-all duration-200 cursor-pointer
                hover:-translate-y-0.5
                border-[1.5px]
                ${isSelected
                  ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  : 'border-white/[0.08] bg-white/[0.03]'
                }
              `}
              style={{
                borderColor: isSelected ? `${pattern.color}99` : undefined,
                background: isSelected ? `${pattern.color}15` : undefined,
              }}
            >
              <div
                className="font-arabic text-xl"
                dir="rtl"
                style={{ color: pattern.color }}
              >
                {pattern.display}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 font-sans">
                {pattern.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
