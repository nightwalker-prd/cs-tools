import type { ForgeRoot } from '../types';

interface RootSelectorProps {
  roots: ForgeRoot[];
  selectedRoot: ForgeRoot | null;
  onSelect: (root: ForgeRoot) => void;
  hasLockedRoots: boolean;
}

export function RootSelector({ roots, selectedRoot, onSelect, hasLockedRoots }: RootSelectorProps) {
  return (
    <div className="mb-5">
      <h3 className="text-xs uppercase tracking-[0.12em] text-accent mb-2.5 font-sans font-semibold">
        &#x2460; Select Root — &#x627;&#x644;&#x62C;&#x64E;&#x630;&#x652;&#x631;
      </h3>
      <div className="flex flex-wrap gap-2">
        {roots.map((root) => {
          const isSelected = selectedRoot?.id === root.id;
          const isTier1 = root.tier === 1;

          return (
            <button
              key={root.id}
              onClick={() => onSelect(root)}
              className={`
                px-3.5 py-2.5 rounded-[10px] text-center relative overflow-hidden
                transition-all duration-200 cursor-pointer
                ${isSelected
                  ? isTier1
                    ? 'border-accent/70 bg-accent/10 shadow-[0_0_20px_rgba(78,205,196,0.15)]'
                    : 'border-amber-400/70 bg-amber-400/10 shadow-[0_0_20px_rgba(255,180,50,0.15)]'
                  : isTier1
                    ? 'border-white/[0.08] bg-white/[0.03] hover:border-accent/40 hover:bg-accent/[0.06] hover:-translate-y-0.5'
                    : 'border-amber-400/30 bg-white/[0.03] hover:border-amber-400/50 hover:bg-amber-400/[0.06] hover:-translate-y-0.5'
                }
                border-[1.5px]
              `}
            >
              <div className="font-arabic text-[22px]" dir="rtl">{root.letters}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 font-sans">
                {root.field}
                {root.type !== 'Regular' && (
                  <span className="text-amber-400 ml-1">&#x26A1;{root.type}</span>
                )}
              </div>
            </button>
          );
        })}
        {hasLockedRoots && (
          <div className="px-3.5 py-2.5 rounded-[10px] border-[1.5px] border-dashed border-amber-400/20 bg-amber-400/[0.02] text-center opacity-50 flex items-center gap-2">
            <span className="text-[11px] text-amber-400 font-sans">&#x1F512; More roots at next tier</span>
          </div>
        )}
      </div>
    </div>
  );
}
