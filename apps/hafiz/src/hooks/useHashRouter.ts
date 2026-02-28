import { useState, useEffect, useCallback } from 'react';
import type { Route, GameType } from '../types';

function parseHash(hash: string): Route {
  const raw = hash.replace('#', '');
  if (!raw) return { page: 'home' };

  const rubMatch = raw.match(/^rub-(\d+)$/);
  if (rubMatch) return { page: 'rub', rubId: parseInt(rubMatch[1], 10) };

  if (raw === 'revision') return { page: 'revision' };
  if (raw === 'games') return { page: 'games' };
  if (raw === 'challenge') return { page: 'challenge' };
  if (raw === 'settings') return { page: 'settings' };

  const gameMatch = raw.match(/^games\/(.+)$/);
  if (gameMatch) return { page: 'game', gameType: gameMatch[1] as GameType };

  return { page: 'home' };
}

export function useHashRouter() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setRoute({ page: 'home' });
  }, []);

  return { route, navigate, goHome };
}
