import { useState, useEffect, useCallback } from 'react';
import type { AyahTranslation } from '../types';

// Module-level cache
let translationMap: Map<string, string> | null = null;
let pendingLoad: Promise<Map<string, string>> | null = null;

function loadTranslations(): Promise<Map<string, string>> {
  if (translationMap) return Promise.resolve(translationMap);
  if (pendingLoad) return pendingLoad;

  pendingLoad = fetch(`./data/ayah-translations.json`)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load translations');
      return res.json() as Promise<AyahTranslation[]>;
    })
    .then((data) => {
      const map = new Map<string, string>();
      for (const t of data) {
        map.set(`${t.surahNum}:${t.ayahNum}`, t.text);
      }
      translationMap = map;
      pendingLoad = null;
      return map;
    })
    .catch((err) => {
      pendingLoad = null;
      throw err;
    });

  return pendingLoad;
}

export function useTranslations(enabled: boolean) {
  const [loaded, setLoaded] = useState(translationMap !== null);

  useEffect(() => {
    if (!enabled) return;
    if (translationMap) {
      setLoaded(true);
      return;
    }

    let cancelled = false;
    loadTranslations()
      .then(() => {
        if (!cancelled) setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const getTranslation = useCallback(
    (surah: number, ayah: number): string | null => {
      if (!translationMap) return null;
      return translationMap.get(`${surah}:${ayah}`) ?? null;
    },
    [],
  );

  return { loaded, getTranslation };
}
