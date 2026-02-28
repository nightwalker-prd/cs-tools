import { useCallback, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';
import { tools, CATEGORIES, type Tool, type Category } from '@/data/tools';

interface HubPreferences {
  pinnedIds: string[];
  hiddenIds: string[];
}

const DEFAULT_PREFERENCES: HubPreferences = {
  pinnedIds: [],
  hiddenIds: [],
};

export function useHubPreferences() {
  const [prefs, setPrefs] = usePersistedState<HubPreferences>(
    'hub-preferences',
    DEFAULT_PREFERENCES
  );

  const pin = useCallback((id: string) => {
    setPrefs((prev) => ({
      pinnedIds: prev.pinnedIds.includes(id) ? prev.pinnedIds : [...prev.pinnedIds, id],
      hiddenIds: prev.hiddenIds.filter((h) => h !== id),
    }));
  }, [setPrefs]);

  const unpin = useCallback((id: string) => {
    setPrefs((prev) => ({
      ...prev,
      pinnedIds: prev.pinnedIds.filter((p) => p !== id),
    }));
  }, [setPrefs]);

  const hide = useCallback((id: string) => {
    setPrefs((prev) => ({
      pinnedIds: prev.pinnedIds.filter((p) => p !== id),
      hiddenIds: prev.hiddenIds.includes(id) ? prev.hiddenIds : [...prev.hiddenIds, id],
    }));
  }, [setPrefs]);

  const unhide = useCallback((id: string) => {
    setPrefs((prev) => ({
      ...prev,
      hiddenIds: prev.hiddenIds.filter((h) => h !== id),
    }));
  }, [setPrefs]);

  const pinnedTools = useMemo(
    () => prefs.pinnedIds.map((id) => tools.find((t) => t.id === id)).filter(Boolean) as Tool[],
    [prefs.pinnedIds]
  );

  const hiddenTools = useMemo(
    () => prefs.hiddenIds.map((id) => tools.find((t) => t.id === id)).filter(Boolean) as Tool[],
    [prefs.hiddenIds]
  );

  const visibleToolsByCategory = useMemo(() => {
    const visible = tools.filter(
      (t) => !prefs.pinnedIds.includes(t.id) && !prefs.hiddenIds.includes(t.id)
    );
    const grouped = new Map<Category, Tool[]>();
    for (const cat of CATEGORIES) {
      const catTools = visible.filter((t) => t.category === cat);
      if (catTools.length > 0) {
        grouped.set(cat, catTools);
      }
    }
    return grouped;
  }, [prefs.pinnedIds, prefs.hiddenIds]);

  const isPinned = useCallback((id: string) => prefs.pinnedIds.includes(id), [prefs.pinnedIds]);
  const isHidden = useCallback((id: string) => prefs.hiddenIds.includes(id), [prefs.hiddenIds]);

  return {
    pin,
    unpin,
    hide,
    unhide,
    pinnedTools,
    hiddenTools,
    visibleToolsByCategory,
    isPinned,
    isHidden,
    hiddenCount: prefs.hiddenIds.length,
  };
}
