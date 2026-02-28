import { useState, useEffect, useCallback } from 'react';

export type Route =
  | { page: 'home' }
  | { page: 'story'; arcId: string; episodeNum: number };

function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '');
  const parts = clean.split('/');

  if (parts[0] === 'stories' && parts[1] && parts[2]) {
    const episodeNum = parseInt(parts[2], 10);
    if (!isNaN(episodeNum)) {
      return { page: 'story', arcId: parts[1], episodeNum };
    }
  }

  return { page: 'home' };
}

export function useHashRouter() {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash),
  );

  useEffect(() => {
    function onHashChange() {
      setRoute(parseHash(window.location.hash));
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return { route, navigate };
}
