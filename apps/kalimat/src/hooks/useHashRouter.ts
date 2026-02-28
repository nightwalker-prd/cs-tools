import { useState, useEffect, useCallback } from 'react';
import type { Route } from '@/types';

function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, '');
  const parts = path.split('/');

  if (!path || path === '') return { page: 'home' };

  switch (parts[0]) {
    case 'explore':
      return { page: 'explore' };
    case 'surah':
      if (parts[1]) return { page: 'surah', num: parseInt(parts[1], 10) };
      return { page: 'surah-list' };
    case 'surahs':
      return { page: 'surah-list' };
    case 'root':
      if (parts[1]) return { page: 'root', root: decodeURIComponent(parts[1]) };
      return { page: 'root-browser' };
    case 'roots':
      return { page: 'root-browser' };
    case 'frequency':
      if (parts[1]) return { page: 'frequency', tier: parseInt(parts[1], 10) };
      return { page: 'home' };
    case 'lemma':
      if (parts[1]) return { page: 'lemma', id: parseInt(parts[1], 10) };
      return { page: 'home' };
    case 'ayah':
      if (parts[1] && parts[2])
        return { page: 'ayah', surah: parseInt(parts[1], 10), ayah: parseInt(parts[2], 10) };
      return { page: 'home' };
    case 'word':
      if (parts[1] && parts[2] && parts[3])
        return { page: 'word-anatomy', surah: parseInt(parts[1], 10), ayah: parseInt(parts[2], 10), word: parseInt(parts[3], 10) };
      return { page: 'home' };
    case 'patterns':
      return { page: 'patterns' };
    case 'pattern':
      if (parts[1]) return { page: 'pattern', id: parseInt(parts[1], 10) };
      return { page: 'patterns' };
    case 'assessment':
      return { page: 'assessment' };
    case 'progress':
      return { page: 'progress' };
    case 'read':
      if (parts[1]) return { page: 'read', surahNum: parseInt(parts[1], 10) };
      return { page: 'read', surahNum: 1 };
    case 'learn':
      return { page: 'learn' };
    case 'session':
      return { page: 'session' };
    case 'results':
      return { page: 'results' };
    case 'weak-verbs':
      return { page: 'weak-verbs' };
    case 'similar-words':
      return { page: 'similar-words' };
    case 'families':
      return { page: 'family-hub' };
    case 'family':
      if (parts[1]) return { page: 'family-tree', root: decodeURIComponent(parts[1]) };
      return { page: 'family-hub' };
    case 'clusters':
      return { page: 'cluster-browser' };
    case 'cluster':
      if (parts[1]) return { page: 'cluster-detail', id: decodeURIComponent(parts[1]) };
      return { page: 'cluster-browser' };
    default:
      return { page: 'home' };
  }
}

export function useHashRouter() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return { route, navigate };
}
