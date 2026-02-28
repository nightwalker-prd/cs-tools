import { useCallback, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';

type ProgressStore = Record<string, string[]>;

export function useProgress() {
  const [progress, setProgress] = usePersistedState<ProgressStore>(
    'arabtools-durus-progress',
    {}
  );

  const toggleVideo = useCallback(
    (courseId: string, videoId: string) => {
      setProgress((prev) => {
        const watched = prev[courseId] ?? [];
        const isWatched = watched.includes(videoId);
        return {
          ...prev,
          [courseId]: isWatched
            ? watched.filter((id) => id !== videoId)
            : [...watched, videoId],
        };
      });
    },
    [setProgress]
  );

  const getWatchedSet = useCallback(
    (courseId: string): Set<string> => {
      return new Set(progress[courseId] ?? []);
    },
    [progress]
  );

  const getWatchedCount = useCallback(
    (courseId: string): number => {
      return (progress[courseId] ?? []).length;
    },
    [progress]
  );

  const markAllWatched = useCallback(
    (courseId: string, videoIds: string[]) => {
      setProgress((prev) => ({
        ...prev,
        [courseId]: videoIds,
      }));
    },
    [setProgress]
  );

  const clearProgress = useCallback(
    (courseId: string) => {
      setProgress((prev) => {
        const next = { ...prev };
        delete next[courseId];
        return next;
      });
    },
    [setProgress]
  );

  const totalWatched = useMemo(() => {
    return Object.values(progress).reduce((sum, arr) => sum + arr.length, 0);
  }, [progress]);

  return {
    toggleVideo,
    getWatchedSet,
    getWatchedCount,
    markAllWatched,
    clearProgress,
    totalWatched,
  };
}
