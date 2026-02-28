import { useState, useEffect, useCallback } from 'react';
import type { FiqhRoute } from '../types';

export function useHashRouter() {
  const parseHash = (): FiqhRoute => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return { type: 'home' };

    const parts = hash.split('/');

    if (parts[0] === 'kitab' && parts[1] && parts[2]) {
      return { type: 'section', kitabId: parts[1], babId: parts[2] };
    }
    if (parts[0] === 'kitab' && parts[1]) {
      return { type: 'kitab', kitabId: parts[1] };
    }
    if (parts[0] === 'topic' && parts[1]) {
      return { type: 'topic', topicId: parts[1] };
    }
    if (parts[0] === 'glossary') return { type: 'glossary' };
    if (parts[0] === 'quiz') return { type: 'quiz' };

    return { type: 'home' };
  };

  const [route, setRoute] = useState<FiqhRoute>(parseHash);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToKitab = useCallback((kitabId: string) => {
    window.location.hash = `kitab/${kitabId}`;
  }, []);

  const navigateToSection = useCallback((kitabId: string, babId: string) => {
    window.location.hash = `kitab/${kitabId}/${babId}`;
  }, []);

  const navigateToTopic = useCallback((topicId: string) => {
    window.location.hash = `topic/${topicId}`;
  }, []);

  const navigateToGlossary = useCallback(() => {
    window.location.hash = 'glossary';
  }, []);

  const navigateToQuiz = useCallback(() => {
    window.location.hash = 'quiz';
  }, []);

  const goHome = useCallback(() => {
    window.location.hash = '';
  }, []);

  return {
    route,
    navigateToKitab,
    navigateToSection,
    navigateToTopic,
    navigateToGlossary,
    navigateToQuiz,
    goHome,
  };
}
