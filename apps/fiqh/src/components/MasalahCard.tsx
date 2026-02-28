import type { Masalah } from '../types';
import { BookmarkButton } from './BookmarkButton';

interface MasalahCardProps {
  masalah: Masalah;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onViewSource?: () => void;
}

export function MasalahCard({ masalah, isBookmarked, onToggleBookmark, onViewSource }: MasalahCardProps) {
  return (
    <div className="masalah-card">
      <div className="masalah-card-header">
        <div>
          <div className="masalah-card-title-ar">{masalah.titleAr}</div>
          <div className="masalah-card-title-en">{masalah.titleEn}</div>
        </div>
        <BookmarkButton isBookmarked={isBookmarked} onToggle={onToggleBookmark} />
      </div>

      <div className="masalah-card-ruling">
        {masalah.rulingAr && (
          <div className="masalah-card-ruling-ar" dir="rtl">{masalah.rulingAr}</div>
        )}
        {masalah.rulingEn && (
          <div>{masalah.rulingEn}</div>
        )}
      </div>

      {masalah.conditions && masalah.conditions.length > 0 && (
        <div className="masalah-card-conditions">
          <h4>Conditions</h4>
          <ul>
            {masalah.conditions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="masalah-card-footer">
        <div className="masalah-card-badges">
          <span className={`difficulty-badge ${masalah.difficulty}`}>
            {masalah.difficulty}
          </span>
          {masalah.evidence?.map((ev, i) => (
            <span key={i} className={`evidence-badge ${ev.type}`}>
              {ev.type}
            </span>
          ))}
        </div>
        {onViewSource && (
          <button className="view-source-link" onClick={onViewSource}>
            View in text
          </button>
        )}
      </div>
    </div>
  );
}
