import { useState, useEffect, useCallback } from 'react';

interface Route {
  type: 'home' | 'poet' | 'poem';
  id?: string;
}

export function useHashRouter() {
  const parseHash = (): Route => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return { type: 'home' };
    const parts = hash.split('/');
    if (parts[0] === 'poet' && parts[1]) return { type: 'poet', id: parts[1] };
    if (parts[0] === 'poem' && parts[1]) return { type: 'poem', id: parts[1] };
    return { type: 'home' };
  };

  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToPoet = useCallback((poetId: string) => {
    window.location.hash = `poet/${poetId}`;
  }, []);

  const navigateToPoem = useCallback((poemId: string) => {
    window.location.hash = `poem/${poemId}`;
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setRoute({ type: 'home' });
  }, []);

  return { route, navigateToPoet, navigateToPoem, goHome };
}
