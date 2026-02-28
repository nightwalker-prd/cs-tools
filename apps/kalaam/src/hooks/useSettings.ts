import { useState, useCallback, useMemo } from 'react';
import { DEFAULT_SETTINGS, STORAGE_KEY } from '@/lib/settings';
import type { KalaamSettings } from '@/lib/settings';

/**
 * Hook for managing Kalaam app settings with localStorage persistence.
 */
export function useSettings() {
  const [settings, setSettingsState] = useState<KalaamSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const updateSettings = useCallback((partial: Partial<KalaamSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return useMemo(() => ({ settings, updateSettings }), [settings, updateSettings]);
}
