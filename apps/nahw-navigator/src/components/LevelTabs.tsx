import type { Difficulty, LevelContent } from '../data/types';

interface LevelTabsProps {
  levels: LevelContent[];
  activeLevel: Difficulty;
  onChangeLevel: (level: Difficulty) => void;
}

const LEVEL_CONFIG: { key: Difficulty; label: string; labelAr: string; color: string }[] = [
  { key: 'beginner', label: 'Beginner', labelAr: 'مبتدئ', color: 'level-beginner' },
  { key: 'intermediate', label: 'Intermediate', labelAr: 'متوسط', color: 'level-intermediate' },
  { key: 'advanced', label: 'Advanced', labelAr: 'متقدم', color: 'level-advanced' },
];

export function LevelTabs({ levels, activeLevel, onChangeLevel }: LevelTabsProps) {
  if (levels.length <= 1) return null;

  const availableLevels = new Set(levels.map(l => l.difficulty));

  return (
    <div className="level-tabs">
      {LEVEL_CONFIG.map(cfg => {
        const available = availableLevels.has(cfg.key);
        const active = cfg.key === activeLevel && available;

        return (
          <button
            key={cfg.key}
            className={`level-tab ${cfg.color} ${active ? 'active' : ''} ${!available ? 'disabled' : ''}`}
            onClick={() => available && onChangeLevel(cfg.key)}
            disabled={!available}
            title={!available ? `No ${cfg.label.toLowerCase()} content available yet` : undefined}
          >
            <span className="level-tab-label">{cfg.label}</span>
            <span className="level-tab-ar font-arabic">{cfg.labelAr}</span>
          </button>
        );
      })}
    </div>
  );
}

export function LevelDots({ levels }: { levels: LevelContent[] }) {
  const available = new Set(levels.map(l => l.difficulty));
  return (
    <span className="level-dots">
      {available.has('beginner') && <span className="level-dot dot-beginner" title="Beginner" />}
      {available.has('intermediate') && <span className="level-dot dot-intermediate" title="Intermediate" />}
      {available.has('advanced') && <span className="level-dot dot-advanced" title="Advanced" />}
    </span>
  );
}
