import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, Heart } from 'lucide-react';
import { useState } from 'react';
import { useSpeechSynthesis } from '@arabtools/core';
import { getProverbById, getProverbsByCategory } from '../data/proverbs';
import { CategoryBadge } from './CategoryBadge';

interface ProverbDetailProps {
  proverbId: string;
  navigate: (hash: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewed: (id: string) => void;
}

export function ProverbDetail({ proverbId, navigate, isFavorite, onToggleFavorite, onViewed }: ProverbDetailProps) {
  const proverb = getProverbById(proverbId);
  const { speak, isSpeaking } = useSpeechSynthesis();
  const [bouncing, setBouncing] = useState(false);

  if (!proverb) {
    return (
      <div className="empty-state">
        <h2>Proverb not found</h2>
        <p>This proverb may have been moved or removed.</p>
        <button className="btn btn-primary" onClick={() => navigate('browse')}>
          Browse All
        </button>
      </div>
    );
  }

  // Mark as viewed
  onViewed(proverbId);

  // Find prev/next within same category
  const categoryProverbs = getProverbsByCategory(proverb.category);
  const currentIdx = categoryProverbs.findIndex(p => p.id === proverb.id);
  const prevProverb = currentIdx > 0 ? categoryProverbs[currentIdx - 1] : null;
  const nextProverb = currentIdx < categoryProverbs.length - 1 ? categoryProverbs[currentIdx + 1] : null;

  const handleFavorite = () => {
    setBouncing(true);
    onToggleFavorite(proverb.id);
    setTimeout(() => setBouncing(false), 400);
  };

  const sections = [
    { label: 'Meaning', text: proverb.meaning },
    proverb.literalTranslation ? { label: 'Literal Translation', text: proverb.literalTranslation } : null,
    proverb.usage ? { label: 'When It\'s Used', text: proverb.usage } : null,
    proverb.origin ? { label: 'Origin', text: proverb.origin } : null,
  ].filter(Boolean) as { label: string; text: string }[];

  return (
    <div className="detail-view">
      <button className="detail-back" onClick={() => navigate(`browse/${proverb.category}`)}>
        <ArrowLeft size={16} />
        Back to {proverb.category}
      </button>

      <div className="detail-card">
        <div style={{ marginBottom: '1rem' }}>
          <CategoryBadge category={proverb.category} />
        </div>
        <div className="detail-arabic">{proverb.arabic}</div>
        <div className="detail-transliteration">{proverb.transliteration}</div>
        <div className="detail-translation">{proverb.translation}</div>

        <div className="detail-actions">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => speak(proverb.arabic)}
            disabled={isSpeaking}
          >
            <Volume2 size={16} />
            {isSpeaking ? 'Speaking...' : 'Listen'}
          </button>
          <button
            className={`btn btn-ghost btn-sm ${bouncing ? 'bounce' : ''}`}
            onClick={handleFavorite}
            style={{ color: isFavorite ? '#e74c3c' : undefined }}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
        </div>
      </div>

      <div className="detail-sections">
        {sections.map(section => (
          <div key={section.label} className="detail-section">
            <div className="detail-section-label">{section.label}</div>
            <div className="detail-section-text">{section.text}</div>
          </div>
        ))}

        {proverb.tags.length > 0 && (
          <div className="detail-section">
            <div className="detail-section-label">Tags</div>
            <div className="filter-chips" style={{ marginBottom: 0 }}>
              {proverb.tags.map(tag => (
                <span key={tag} className="filter-chip" style={{ cursor: 'default' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="detail-nav">
        <button
          className="detail-nav-btn"
          disabled={!prevProverb}
          onClick={() => prevProverb && navigate(`proverb/${prevProverb.id}`)}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          className="detail-nav-btn"
          disabled={!nextProverb}
          onClick={() => nextProverb && navigate(`proverb/${nextProverb.id}`)}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
