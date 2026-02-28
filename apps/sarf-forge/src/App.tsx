import { useMemo } from 'react';
import { useForgeState } from './hooks/useForgeState';
import { getAvailableRoots, ROOTS } from './data/roots';
import { getAvailablePatterns, PATTERNS } from './data/patterns';
import { StatsBar } from './components/StatsBar';
import { RootSelector } from './components/RootSelector';
import { PatternSelector } from './components/PatternSelector';
import { ForgeArea } from './components/ForgeArea';
import { ForgeResultDisplay } from './components/ForgeResult';
import { Lexicon } from './components/Lexicon';

export default function App() {
  const {
    selectedRoot,
    selectedPattern,
    selectRoot,
    selectPattern,
    forge,
    isForging,
    result,
    showParticles,
    discoveries,
    stats,
    unlockedTiers,
    showLexicon,
    setShowLexicon,
  } = useForgeState();

  const availableRoots = useMemo(
    () => getAvailableRoots(unlockedTiers),
    [unlockedTiers]
  );

  const availablePatterns = useMemo(
    () => getAvailablePatterns(unlockedTiers),
    [unlockedTiers]
  );

  const hasLockedRoots = availableRoots.length < ROOTS.length;
  const totalPossible = ROOTS.length * PATTERNS.length;

  // Determine last forge success for particle color
  const lastSuccess = result?.success ?? false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#121225] to-[#0d1117] text-foreground font-serif p-5 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Header */}
      <div className="text-center mb-7 relative z-[1]">
        <h1
          className="text-[32px] font-arabic font-bold m-0 tracking-[0.02em]"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
          }}
        >
          مَصْنَعُ الصَّرْف
        </h1>
        <p className="text-sm text-muted-foreground mt-1 tracking-[0.1em] uppercase font-sans">
          The Sarf Forge — Craft Words from Roots & Patterns
        </p>

        <StatsBar
          discovered={discoveries.length}
          totalPossible={totalPossible}
          failed={stats.failed}
          unlockedTiers={unlockedTiers}
          onShowLexicon={() => setShowLexicon(true)}
        />

        {/* Tier unlock notification */}
        {unlockedTiers.size > 1 && stats.attempts > 0 && stats.attempts <= 12 && (
          <div
            className="mt-2.5 px-4 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 inline-block text-sm text-amber-400 font-sans"
            style={{ animation: 'unlockPulse 2s ease infinite' }}
          >
            ✦ Tier {Math.max(...Array.from(unlockedTiers))} Unlocked — New roots and patterns available
          </div>
        )}
      </div>

      {/* Lexicon overlay */}
      {showLexicon && (
        <Lexicon
          discoveries={discoveries}
          totalPossible={totalPossible}
          onClose={() => setShowLexicon(false)}
        />
      )}

      {/* Main layout */}
      <div className="max-w-[900px] mx-auto relative z-[1]">
        <RootSelector
          roots={availableRoots}
          selectedRoot={selectedRoot}
          onSelect={selectRoot}
          hasLockedRoots={hasLockedRoots}
        />

        <PatternSelector
          patterns={availablePatterns}
          selectedPattern={selectedPattern}
          onSelect={selectPattern}
        />

        <ForgeArea
          selectedRoot={selectedRoot}
          selectedPattern={selectedPattern}
          isForging={isForging}
          showParticles={showParticles}
          lastSuccess={lastSuccess}
          onForge={forge}
        />

        {/* Result */}
        {result && selectedRoot && selectedPattern && (
          <ForgeResultDisplay
            result={result}
            root={selectedRoot}
            pattern={selectedPattern}
          />
        )}
      </div>
    </div>
  );
}
