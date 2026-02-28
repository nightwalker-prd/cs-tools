import { useState, useEffect, useCallback } from 'react';

export type Route = '' | 'config' | 'exercise' | 'results';

export function useHashRouter() {
  const parse = (): Route => {
    const raw = window.location.hash.replace('#', '');
    if (raw === 'config' || raw === 'exercise' || raw === 'results') return raw;
    return '';
  };

  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onHashChange = () => setRoute(parse());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((r: Route) => {
    if (r === '') {
      history.pushState(null, '', window.location.pathname);
      setRoute('');
    } else {
      window.location.hash = r;
    }
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setRoute('');
  }, []);

  return { route, navigate, goHome };
}
