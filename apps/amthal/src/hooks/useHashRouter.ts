import { useState, useEffect, useCallback } from 'react';
import type { Route } from '../types';

export function useHashRouter() {
  const parseHash = (): Route => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return { type: 'home' };

    const parts = hash.split('/');

    if (parts[0] === 'browse' && parts[1]) return { type: 'browse-category', id: parts[1] };
    if (parts[0] === 'browse') return { type: 'browse' };
    if (parts[0] === 'proverb' && parts[1]) return { type: 'proverb', id: parts[1] };
    if (parts[0] === 'quiz' && parts[1]) return { type: 'quiz-session', id: parts[1] };
    if (parts[0] === 'quiz') return { type: 'quiz' };
    if (parts[0] === 'favorites') return { type: 'favorites' };

    return { type: 'home' };
  };

  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setRoute({ type: 'home' });
  }, []);

  return { route, navigate, goHome };
}
