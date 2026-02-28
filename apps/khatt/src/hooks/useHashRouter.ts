import { useState, useEffect, useCallback } from 'react';

type View = 'home' | 'notebook' | 'page';

interface RouterState {
  view: View;
  notebookId: string | null;
  pageId: string | null;
}

function parseHash(): RouterState {
  const raw = window.location.hash.replace('#', '');

  if (raw.startsWith('page/')) {
    return { view: 'page', notebookId: null, pageId: raw.slice(5) };
  }
  if (raw.startsWith('notebook/')) {
    return { view: 'notebook', notebookId: raw.slice(9), pageId: null };
  }
  return { view: 'home', notebookId: null, pageId: null };
}

export function useHashRouter() {
  const [state, setState] = useState<RouterState>(parseHash);

  useEffect(() => {
    const onChange = () => setState(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setState({ view: 'home', notebookId: null, pageId: null });
  }, []);

  return { ...state, navigate, goHome };
}
