import { useState, useEffect, useCallback } from 'react';

export type Route =
  | { page: 'study' }
  | { page: 'read' }
  | { page: 'surah'; params: { surahNum: number } }
  | { page: 'lesson'; params?: { mode?: string } }
  | { page: 'word'; params: { lemmaId: number } }
  | { page: 'settings' };

function parseHash(): Route {
  const hash = window.location.hash.slice(1) || '/';
  const [path, queryString] = hash.split('?');
  const segments = path.split('/').filter(Boolean);

  // #/ or empty → study
  if (segments.length === 0) {
    return { page: 'study' };
  }

  const first = segments[0];

  // #/read/:surahNum
  if (first === 'read' && segments.length === 2) {
    const surahNum = parseInt(segments[1], 10);
    if (!isNaN(surahNum)) {
      return { page: 'surah', params: { surahNum } };
    }
  }

  // #/read
  if (first === 'read') {
    return { page: 'read' };
  }

  // #/lesson or #/lesson?mode=quiz
  if (first === 'lesson') {
    const params = new URLSearchParams(queryString || '');
    const mode = params.get('mode');
    return mode ? { page: 'lesson', params: { mode } } : { page: 'lesson' };
  }

  // #/word/:lemmaId
  if (first === 'word' && segments.length === 2) {
    const lemmaId = parseInt(segments[1], 10);
    if (!isNaN(lemmaId)) {
      return { page: 'word', params: { lemmaId } };
    }
  }

  // #/settings
  if (first === 'settings') {
    return { page: 'settings' };
  }

  // Fallback to study
  return { page: 'study' };
}

export function useRouter(): {
  route: Route;
  navigate: (hash: string) => void;
} {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  return { route, navigate };
}
