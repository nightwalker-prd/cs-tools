import { useState, useEffect, useCallback } from 'react';

export function useHashRouter() {
  const parse = () => {
    const raw = window.location.hash.replace('#', '');
    if (raw.startsWith('challenge/')) {
      return { slug: raw, challengeId: raw.slice(10) };
    }
    return { slug: raw, challengeId: null };
  };

  const [state, setState] = useState(parse);

  useEffect(() => {
    const onHashChange = () => setState(parse());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((id: string) => {
    window.location.hash = 'challenge/' + id;
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setState({ slug: '', challengeId: null });
  }, []);

  return { slug: state.slug, challengeId: state.challengeId, navigate, goHome };
}
