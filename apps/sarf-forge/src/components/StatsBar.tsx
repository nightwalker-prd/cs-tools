import type { Tier } from '../types';
import { TIER_THRESHOLDS } from '../types';

interface StatsBarProps {
  discovered: number;
  totalPossible: number;
  failed: number;
  unlockedTiers: Set<number>;
  onShowLexicon: () => void;
}

export function StatsBar({ discovered, totalPossible, failed, unlockedTiers, onShowLexicon }: StatsBarProps) {
  // Find next tier to unlock
  const nextTier = ([2, 3, 4] as Tier[]).find(t => !unlockedTiers.has(t));
  const nextThreshold = nextTier ? TIER_THRESHOLDS[nextTier] : null;

  return (
    <div className="flex justify-center gap-4 mt-3.5 flex-wrap">
      <div className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
        <div className="text-xl font-bold text-accent">{discovered}</div>
        <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wide">Discovered</div>
      </div>
      <div className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
        <div className="text-xl font-bold text-primary">{totalPossible}</div>
        <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wide">Total Words</div>
      </div>
      <div className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
        <div className="text-xl font-bold text-destructive">{failed}</div>
        <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wide">Dead Ends</div>
      </div>
      <button
        onClick={onShowLexicon}
        className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center cursor-pointer hover:bg-white/[0.08] transition-colors"
      >
        <div className="text-xl">&#x1F4D6;</div>
        <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wide">Lexicon</div>
      </button>

      {nextTier && nextThreshold && (
        <div className="w-full flex justify-center mt-1">
          <div className="text-xs text-muted-foreground font-sans">
            {discovered}/{nextThreshold} to unlock Tier {nextTier}
          </div>
        </div>
      )}
    </div>
  );
}
