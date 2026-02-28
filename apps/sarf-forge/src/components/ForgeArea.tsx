import type { ForgeRoot, ForgePattern } from '../types';
import { Particles } from './Particles';

interface ForgeAreaProps {
  selectedRoot: ForgeRoot | null;
  selectedPattern: ForgePattern | null;
  isForging: boolean;
  showParticles: boolean;
  lastSuccess: boolean;
  onForge: () => void;
}

export function ForgeArea({
  selectedRoot,
  selectedPattern,
  isForging,
  showParticles,
  lastSuccess,
  onForge,
}: ForgeAreaProps) {
  const canForge = selectedRoot && selectedPattern && !isForging;

  return (
    <div
      className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 text-center mb-5"
      style={{
        animation: isForging ? 'forgePulse 0.8s ease' : 'forgeGlow 3s ease infinite',
      }}
    >
      <Particles active={showParticles} success={lastSuccess} />

      {/* Selected items display */}
      <div className="flex items-center justify-center gap-5 mb-4">
        <div
          className={`px-5 py-3 rounded-[10px] min-w-[100px] border ${
            selectedRoot
              ? 'bg-accent/10 border-accent/30'
              : 'bg-white/[0.03] border-white/[0.06]'
          }`}
        >
          {selectedRoot ? (
            <div className="font-arabic text-[26px] text-accent" dir="rtl">
              {selectedRoot.letters}
            </div>
          ) : (
            <div className="text-sm text-[#555] font-sans">Root</div>
          )}
        </div>

        <div
          className="text-[28px] font-arabic text-primary"
          style={{ opacity: canForge ? 1 : 0.3 }}
        >
          &#xd7;
        </div>

        <div
          className="px-5 py-3 rounded-[10px] min-w-[100px] border"
          style={{
            background: selectedPattern ? `${selectedPattern.color}15` : 'rgba(255,255,255,0.03)',
            borderColor: selectedPattern ? `${selectedPattern.color}50` : 'rgba(255,255,255,0.06)',
          }}
        >
          {selectedPattern ? (
            <div
              className="font-arabic text-[26px]"
              dir="rtl"
              style={{ color: selectedPattern.color }}
            >
              {selectedPattern.display}
            </div>
          ) : (
            <div className="text-sm text-[#555] font-sans">Pattern</div>
          )}
        </div>
      </div>

      {/* Forge button */}
      <button
        disabled={!canForge}
        onClick={onForge}
        className={`
          px-10 py-3.5 rounded-xl text-lg font-arabic font-bold
          transition-all duration-300 relative overflow-hidden border-none
          ${canForge
            ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,200,50,0.3)] active:translate-y-0'
            : 'opacity-30 cursor-not-allowed'
          }
        `}
        style={{
          background: canForge
            ? 'linear-gradient(135deg, #FFD700, #FFA500)'
            : 'rgba(255,255,255,0.05)',
          color: canForge ? '#1a1a2e' : '#555',
        }}
      >
        {isForging ? '\u2692 Forging...' : '\u2692 Forge Word'}
      </button>
    </div>
  );
}
