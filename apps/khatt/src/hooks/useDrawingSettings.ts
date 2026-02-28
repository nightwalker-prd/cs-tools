import { usePersistedState } from '@arabtools/core';
import type { DrawingSettings } from '@/types';
import { DEFAULT_SETTINGS } from '@/types';
import { useCallback } from 'react';

export function useDrawingSettings(): [DrawingSettings, (updates: Partial<DrawingSettings>) => void] {
  const [settings, setSettings] = usePersistedState<DrawingSettings>('arabtools-khatt-settings', DEFAULT_SETTINGS);

  const updateSettings = useCallback((updates: Partial<DrawingSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  return [settings, updateSettings];
}
