import { useState, useCallback, useMemo, useEffect } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { ForgeRoot, ForgePattern, ForgeResult, GameState, Tier } from '../types';
import { TIER_THRESHOLDS } from '../types';
import { forgeWord } from '../engine/forge';

const INITIAL_STATE: GameState = {
  discoveries: [],
  stats: { attempts: 0, found: 0, failed: 0 },
  unlockedTiers: [1],
};

export function useForgeState() {
  const [gameState, setGameState] = usePersistedState<GameState>(
    'sarf-forge-state',
    INITIAL_STATE
  );

  const [selectedRoot, setSelectedRoot] = useState<ForgeRoot | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<ForgePattern | null>(null);
  const [result, setResult] = useState<ForgeResult | null>(null);
  const [isForging, setIsForging] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showLexicon, setShowLexicon] = useState(false);

  // Check for tier unlocks whenever discoveries change
  useEffect(() => {
    const discoveryCount = gameState.discoveries.length;
    const newTiers: Tier[] = [];

    for (const [tier, threshold] of Object.entries(TIER_THRESHOLDS)) {
      const tierNum = Number(tier) as Tier;
      if (discoveryCount >= threshold && !gameState.unlockedTiers.includes(tierNum)) {
        newTiers.push(tierNum);
      }
    }

    if (newTiers.length > 0) {
      setGameState(prev => ({
        ...prev,
        unlockedTiers: [...prev.unlockedTiers, ...newTiers],
      }));
    }
  }, [gameState.discoveries.length, gameState.unlockedTiers, setGameState]);

  const unlockedTiersSet = useMemo(
    () => new Set(gameState.unlockedTiers),
    [gameState.unlockedTiers]
  );

  const discoveredKeys = useMemo(
    () => new Set(gameState.discoveries.map(d => d.key)),
    [gameState.discoveries]
  );

  const forge = useCallback(() => {
    if (!selectedRoot || !selectedPattern || isForging) return;

    setIsForging(true);
    setResult(null);

    // Simulate forge delay for dramatic effect
    setTimeout(() => {
      const forgeResult = forgeWord(selectedRoot, selectedPattern);
      setResult(forgeResult);
      setIsForging(false);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1000);

      const key = `${selectedRoot.id}+${selectedPattern.id}`;

      setGameState(prev => {
        const newStats = {
          attempts: prev.stats.attempts + 1,
          found: prev.stats.found + (forgeResult.success ? 1 : 0),
          failed: prev.stats.failed + (forgeResult.success ? 0 : 1),
        };

        const newDiscoveries = forgeResult.success && !prev.discoveries.find(d => d.key === key)
          ? [...prev.discoveries, {
              key,
              word: forgeResult.word,
              meaning: forgeResult.meaning,
              root: selectedRoot,
              pattern: selectedPattern,
              timestamp: Date.now(),
            }]
          : prev.discoveries;

        return {
          ...prev,
          stats: newStats,
          discoveries: newDiscoveries,
        };
      });
    }, 800);
  }, [selectedRoot, selectedPattern, isForging, setGameState]);

  const selectRoot = useCallback((root: ForgeRoot) => {
    setSelectedRoot(root);
    setResult(null);
  }, []);

  const selectPattern = useCallback((pattern: ForgePattern) => {
    setSelectedPattern(pattern);
    setResult(null);
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    setSelectedRoot(null);
    setSelectedPattern(null);
    setResult(null);
  }, [setGameState]);

  return {
    // Selection state
    selectedRoot,
    selectedPattern,
    selectRoot,
    selectPattern,

    // Forge
    forge,
    isForging,
    result,

    // Particles
    showParticles,

    // Game state
    discoveries: gameState.discoveries,
    stats: gameState.stats,
    unlockedTiers: unlockedTiersSet,
    discoveredKeys,

    // Lexicon
    showLexicon,
    setShowLexicon,

    // Reset
    resetGame,
  };
}
