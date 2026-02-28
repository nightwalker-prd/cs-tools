import { ChevronLeft, Volume2 } from 'lucide-react';

interface WordHeaderProps {
  wordLoc?: string;
  activeTab: 'details' | 'usages';
  onTabChange: (tab: 'details' | 'usages') => void;
  onBack: () => void;
}

export default function WordHeader({ wordLoc, activeTab, onTabChange, onBack }: WordHeaderProps) {
  return (
    <div className="sticky top-0 bg-background z-30 pb-2">
      {/* Top bar */}
      <div className="flex items-center justify-between py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-0.5 text-sm text-primary hover:text-primary-dark transition-colors"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <div className="flex items-center gap-2">
          {wordLoc && (
            <span className="text-xs text-text-secondary">{wordLoc}</span>
          )}
          <button
            className="p-1.5 text-text-secondary opacity-50 cursor-default"
            aria-label="Play pronunciation"
            disabled
          >
            <Volume2 size={18} />
          </button>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex gap-1 bg-card rounded-lg p-1">
        {(['details', 'usages'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-background text-primary shadow-sm'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {tab === 'details' ? 'Details' : 'Usages'}
          </button>
        ))}
      </div>
    </div>
  );
}
