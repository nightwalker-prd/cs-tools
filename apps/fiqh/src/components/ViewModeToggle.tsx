import type { ViewMode } from '../types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, onViewChange }: ViewModeToggleProps) {
  return (
    <div className="view-toggle">
      <button
        className={`view-toggle-btn ${viewMode === 'reader' ? 'active' : ''}`}
        onClick={() => onViewChange('reader')}
      >
        Reader
      </button>
      <button
        className={`view-toggle-btn ${viewMode === 'topic' ? 'active' : ''}`}
        onClick={() => onViewChange('topic')}
      >
        Topics
      </button>
    </div>
  );
}
