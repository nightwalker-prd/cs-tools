import type { ProverbCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { useProverbSearch } from '../hooks/useProverbSearch';
import { SearchInput } from './SearchInput';
import { ProverbCard } from './ProverbCard';

interface BrowsePageProps {
  category?: ProverbCategory;
  navigate: (hash: string) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export function BrowsePage({ category, navigate, isFavorite, onToggleFavorite }: BrowsePageProps) {
  const { query, setQuery, results } = useProverbSearch(category);
  const activeCategory = category || null;

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
          {category
            ? CATEGORIES.find(c => c.id === category)?.nameEn || 'Browse'
            : 'All Proverbs'}
        </h2>
        {category && (
          <button
            className="section-link"
            onClick={() => navigate('browse')}
            style={{ fontSize: '0.82rem' }}
          >
            ← All Categories
          </button>
        )}
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search by Arabic, English, or topic..."
      />

      {!category && (
        <div className="filter-chips">
          <button
            className={`filter-chip ${!activeCategory ? 'active' : ''}`}
            style={{ '--chip-color': '#1a3150' } as React.CSSProperties}
            onClick={() => navigate('browse')}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
              style={{ '--chip-color': cat.color } as React.CSSProperties}
              onClick={() => navigate(`browse/${cat.id}`)}
            >
              {cat.nameEn}
            </button>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <div className="empty-state">
          <h2>No proverbs found</h2>
          <p>Try a different search term or category.</p>
        </div>
      ) : (
        <div className="proverb-grid">
          {results.map((proverb, i) => (
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
      )}
    </div>
  );
}
