/**
 * usePersistedState Hook
 *
 * A hook for persisting state in localStorage with type safety.
 * Useful for filter preferences, user settings, etc.
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'arabtools-';

/**
 * Persist state in localStorage with automatic serialization.
 *
 * @param key - Storage key (will be prefixed with 'arabtools-')
 * @param initialValue - Default value if nothing in storage
 * @returns [value, setValue, clearValue] tuple
 *
 * @example
 * const [filters, setFilters, clearFilters] = usePersistedState('sarf-filters', {
 *   difficulty: 'beginner',
 *   showHints: true,
 * });
 */
export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const storageKey = `${STORAGE_PREFIX}${key}`;

  // Initialize from localStorage or use default
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved) as T;
      }
    } catch (error) {
      console.warn(`Failed to load state for ${key}:`, error);
    }
    return initialValue;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn(`localStorage quota exceeded for ${key}. Consider clearing old data.`);
      } else {
        console.warn(`Failed to save state for ${key}:`, error);
      }
    }
  }, [state, storageKey, key]);

  // Clear the stored value
  const clearValue = useCallback(() => {
    setState(initialValue);
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn(`Failed to clear state for ${key}:`, error);
    }
  }, [initialValue, storageKey, key]);

  return [state, setState, clearValue];
}

/**
 * Filter configuration type for tool-specific filter persistence.
 */
export interface FilterConfig {
  [key: string]: string | number | boolean | string[];
}

/**
 * Hook for persisting filter preferences per tool.
 *
 * @param toolId - Unique identifier for the tool
 * @param defaultFilters - Default filter values
 * @returns Filter state and actions
 */
export function useFilterPersistence<T extends FilterConfig>(
  toolId: string,
  defaultFilters: T
) {
  const [filters, setFilters, clearFilters] = usePersistedState<T>(
    `filters-${toolId}`,
    defaultFilters
  );

  const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, [setFilters]);

  const updateFilters = useCallback((updates: Partial<T>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, [setFilters]);

  const resetFilters = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const isModified = JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    isModified,
  };
}
