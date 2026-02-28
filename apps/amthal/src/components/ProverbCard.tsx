import { Heart } from 'lucide-react';
import { useState } from 'react';
import type { Proverb } from '../types';
import { CategoryBadge } from './CategoryBadge';

interface ProverbCardProps {
  proverb: Proverb;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (id: string) => void;
  index?: number;
}

export function ProverbCard({ proverb, isFavorite, onToggleFavorite, onClick, index = 0 }: ProverbCardProps) {
  const [bouncing, setBouncing] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBouncing(true);
    onToggleFavorite(proverb.id);
    setTimeout(() => setBouncing(false), 400);
  };

  return (
    <div
      className="proverb-card"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onClick(proverb.id)}
    >
      <div className="proverb-card-arabic">{proverb.arabic}</div>
      <div className="proverb-card-translation">{proverb.translation}</div>
      <div className="proverb-card-footer">
        <CategoryBadge category={proverb.category} />
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''} ${bouncing ? 'bounce' : ''}`}
          onClick={handleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}
