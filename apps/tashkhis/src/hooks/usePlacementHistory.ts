import { useState, useCallback } from 'react';
import type { PlacementResult } from '../types';

const HISTORY_KEY = 'arabtools-tashkhis-history';
const SESSION_KEY = 'arabtools-tashkhis-session';

function loadHistory(): PlacementResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(results: PlacementResult[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(results));
}

export function usePlacementHistory() {
  const [history, setHistory] = useState<PlacementResult[]>(loadHistory);

  const addResult = useCallback((result: PlacementResult) => {
    setHistory(prev => {
      const updated = [result, ...prev];
      saveHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  return { history, addResult, clearHistory };
}

/** Save/load in-progress test session for crash recovery */
export function saveSession(data: unknown): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function loadSession<T>(): T | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
