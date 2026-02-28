import { useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';

type ProgressData = Record<string, string[]>;

export function useProgress() {
  const [progress, setProgress] = usePersistedState<ProgressData>('nahw-atlas-progress', {});

  const toggleLearned = useCallback((domainId: string, nodeId: string) => {
    setProgress((prev) => {
      const current = prev[domainId] || [];
      const isCurrentlyLearned = current.includes(nodeId);
      return {
        ...prev,
        [domainId]: isCurrentlyLearned
          ? current.filter((id) => id !== nodeId)
          : [...current, nodeId],
      };
    });
  }, [setProgress]);

  const isLearned = useCallback((domainId: string, nodeId: string): boolean => {
    return (progress[domainId] || []).includes(nodeId);
  }, [progress]);

  const getDomainProgress = useCallback((domainId: string, totalNodes: number) => {
    const learned = (progress[domainId] || []).length;
    return {
      learned,
      total: totalNodes,
      percentage: totalNodes > 0 ? Math.round((learned / totalNodes) * 100) : 0,
    };
  }, [progress]);

  return { toggleLearned, isLearned, getDomainProgress };
}
