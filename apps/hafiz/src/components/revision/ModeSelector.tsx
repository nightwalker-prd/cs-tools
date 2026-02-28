import type { RevisionMode } from '../../types';

interface ModeSelectorProps {
  value: RevisionMode;
  onChange: (mode: RevisionMode) => void;
}

const MODES: Array<{ id: RevisionMode; label: string }> = [
  { id: 'listen-repeat', label: 'Listen & Repeat' },
  { id: 'read-along', label: 'Read Along' },
  { id: 'active-recall', label: 'Active Recall' },
  { id: 'word-order', label: 'Word Order' },
];

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="mode-selector">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          className={`mode-btn ${value === mode.id ? 'active' : ''}`}
          onClick={() => onChange(mode.id)}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
