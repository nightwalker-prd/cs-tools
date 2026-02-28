import { useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';

export function useFavorites() {
  const [favorites, setFavorites] = usePersistedState<string[]>('amthal-favorites', []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, [setFavorites]);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
