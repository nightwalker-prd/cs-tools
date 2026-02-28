import { Heart } from 'lucide-react';
import { getProverbById } from '../data/proverbs';
import { ProverbCard } from './ProverbCard';

interface FavoritesPageProps {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  navigate: (hash: string) => void;
}

export function FavoritesPage({ favorites, isFavorite, onToggleFavorite, navigate }: FavoritesPageProps) {
  const proverbs = favorites
    .map(id => getProverbById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProverbById>>[];

  if (proverbs.length === 0) {
    return (
      <div className="empty-state animate-fade-in-up">
        <div className="empty-state-icon">
          <Heart size={28} />
        </div>
        <h2>No Favorites Yet</h2>
        <p>Tap the heart icon on any proverb to save it here.</p>
        <button className="btn btn-primary" onClick={() => navigate('browse')}>
          Browse Proverbs
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="section-header">
        <h2 className="section-title">Favorites ({proverbs.length})</h2>
      </div>

      <div className="proverb-grid">
        {proverbs.map((proverb, i) => (
          <ProverbCard
            key={proverb.id}
            proverb={proverb}
            isFavorite={isFavorite(proverb.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={(id) => navigate(`proverb/${id}`)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
