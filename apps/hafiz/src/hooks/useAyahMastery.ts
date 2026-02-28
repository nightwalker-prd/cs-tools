import { useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';

const STORAGE_KEY = 'hafiz-mastery';

interface MasteryRecord {
  correct: number;
  total: number;
}

type MasteryData = Record<string, MasteryRecord>;

function makeKey(surah: number, ayah: number): string {
  return `${surah}:${ayah}`;
}

export function useAyahMastery() {
  const [data, setData] = usePersistedState<MasteryData>(STORAGE_KEY, {});

  const recordAttempt = useCallback(
    (surah: number, ayah: number, correct: boolean) => {
      const key = makeKey(surah, ayah);
      setData((prev) => {
        const existing = prev[key] ?? { correct: 0, total: 0 };
        return {
          ...prev,
          [key]: {
            correct: existing.correct + (correct ? 1 : 0),
            total: existing.total + 1,
          },
        };
      });
    },
    [setData],
  );

  const getMastery = useCallback(
    (surah: number, ayah: number): number => {
      const key = makeKey(surah, ayah);
      const record = data[key];
      if (!record || record.total === 0) return 0;
      return record.correct / record.total;
    },
    [data],
  );

  return { recordAttempt, getMastery };
}
