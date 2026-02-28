import { useState, useEffect, useCallback } from 'react';

export function useHashRouter() {
  const getSlug = () => window.location.hash.replace('#', '') || '';

  const [slug, setSlug] = useState(getSlug);

  useEffect(() => {
    const onHashChange = () => setSlug(getSlug());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((newSlug: string) => {
    window.location.hash = newSlug;
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setSlug('');
  }, []);

  return { slug, navigate, goHome };
}
