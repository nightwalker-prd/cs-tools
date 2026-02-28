import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PrevNextNavProps {
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  currentIndex?: number;
  totalCount?: number;
}

export function PrevNextNav({ onPrevious, onNext, previousLabel, nextLabel, currentIndex, totalCount }: PrevNextNavProps) {
  return (
    <div className="text-nav">
      <button
        className="text-nav-btn"
        onClick={onPrevious}
        disabled={!onPrevious}
      >
        <ChevronLeft size={16} />
        {previousLabel || 'Previous'}
      </button>

      {currentIndex !== undefined && totalCount !== undefined && (
        <span className="text-nav-position">
          {currentIndex + 1} / {totalCount}
        </span>
      )}

      <button
        className="text-nav-btn"
        onClick={onNext}
        disabled={!onNext}
      >
        {nextLabel || 'Next'}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
