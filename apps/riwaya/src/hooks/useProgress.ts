import { usePersistedState } from '@arabtools/core';
import type { RiwayaProgress } from '../types';

const defaultProgress: RiwayaProgress = {
  arcs: {},
  totalXp: 0,
  lastPlayedArcId: null,
};

const XP_PER_EPISODE = 50;
const XP_ARC_BONUS = 200;

export function useProgress() {
  const [progress, setProgress, clearProgress] =
    usePersistedState<RiwayaProgress>('riwaya-progress', defaultProgress);

  function isEpisodeCompleted(arcId: string, episodeNum: number): boolean {
    return (
      progress.arcs[arcId]?.completedEpisodes.includes(episodeNum) ?? false
    );
  }

  function isEpisodeUnlocked(arcId: string, episodeNum: number): boolean {
    if (episodeNum === 1) return true;
    return isEpisodeCompleted(arcId, episodeNum - 1);
  }

  function completeEpisode(arcId: string, episodeNum: number, totalEpisodesInArc: number): void {
    setProgress((prev) => {
      const arcProgress = prev.arcs[arcId] ?? {
        completedEpisodes: [],
        currentEpisode: 1,
        xpEarned: 0,
        startedAt: new Date().toISOString(),
        lastPlayedAt: new Date().toISOString(),
      };

      if (arcProgress.completedEpisodes.includes(episodeNum)) {
        return prev;
      }

      const newCompleted = [...arcProgress.completedEpisodes, episodeNum];
      let xpGained = XP_PER_EPISODE;

      if (newCompleted.length === totalEpisodesInArc) {
        xpGained += XP_ARC_BONUS;
      }

      return {
        ...prev,
        arcs: {
          ...prev.arcs,
          [arcId]: {
            ...arcProgress,
            completedEpisodes: newCompleted,
            currentEpisode: Math.max(arcProgress.currentEpisode, episodeNum + 1),
            xpEarned: arcProgress.xpEarned + xpGained,
            lastPlayedAt: new Date().toISOString(),
          },
        },
        totalXp: prev.totalXp + xpGained,
        lastPlayedArcId: arcId,
      };
    });
  }

  function getArcProgress(arcId: string) {
    return progress.arcs[arcId] ?? null;
  }

  return {
    progress,
    isEpisodeCompleted,
    isEpisodeUnlocked,
    completeEpisode,
    getArcProgress,
    clearProgress,
  };
}
