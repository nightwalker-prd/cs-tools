import { ChevronRight } from 'lucide-react';
import type { Collection } from '../data/navigation';

interface BreadcrumbProps {
  collection?: Collection;
  textTitle?: string;
  onGoHome: () => void;
  onNavigateCollection?: () => void;
}

export function Breadcrumb({ collection, textTitle, onGoHome, onNavigateCollection }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      <button className="breadcrumb-link" onClick={onGoHome}>Home</button>
      {collection && (
        <>
          <ChevronRight size={14} className="breadcrumb-sep" />
          {textTitle ? (
            <button className="breadcrumb-link" onClick={onNavigateCollection}>
              {collection.titleEn}
            </button>
          ) : (
            <span className="breadcrumb-current">{collection.titleEn}</span>
          )}
        </>
      )}
      {textTitle && (
        <>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">{textTitle}</span>
        </>
      )}
    </nav>
  );
}
