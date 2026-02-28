import { useState, useEffect, useCallback } from 'react';
import type { GameType, GameCategory } from '../types';

const allGameTypes: GameType[] = [
  'sequence-memory',
  'number-memory',
  'chimp-memory',
  'working-memory',
  'operation-span',
  'corsi-block-tapping',
  'digit-span-forward',
  'digit-span-backward',
  'dual-n-back',
  // Quran games
  'first-word',
  'complete-ayah',
  'word-order',
  'chain-reaction',
  'similar-ayah',
  'audio-recall',
  'blind-listen',
  'reverse-lookup',
  'last-words',
  'speed-round',
  'ayah-sprint',
  'mistake-marathon',
  'quran-wordle',
  'quran-word-search',
  'first-letters',
  'surah-sleuth',
  'before-after',
  'progressive-blanking',
  'meaning-links',
  'phrase-chunks',
  'memory-palace',
  'story-chain',
  'ayah-pegs',
  'elaborative-recall',
];

interface RouterState {
  category: GameCategory | null;
  gameId: GameType | null;
}

function parse(): RouterState {
  const raw = window.location.hash.replace('#', '');
  if (raw.startsWith('cognitive/')) {
    const gameId = raw.slice(10) as GameType;
    if (allGameTypes.includes(gameId)) {
      return { category: 'cognitive', gameId };
    }
  }
  if (raw.startsWith('quran/')) {
    const gameId = raw.slice(6) as GameType;
    if (allGameTypes.includes(gameId)) {
      return { category: 'quran', gameId };
    }
  }
  return { category: null, gameId: null };
}

export function useHashRouter() {
  const [state, setState] = useState<RouterState>(parse);

  useEffect(() => {
    const onHashChange = () => setState(parse());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((category: GameCategory, gameId: GameType) => {
    window.location.hash = category + '/' + gameId;
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setState({ category: null, gameId: null });
  }, []);

  return { category: state.category, gameId: state.gameId, navigate, goHome };
}
