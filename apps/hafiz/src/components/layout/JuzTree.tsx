import { usePersistedState } from '@arabtools/core';
import { getRubDescription, getJuzForRub } from '@arabtools/data';
import type { HafizRub, RubStage } from '../../types';

interface JuzTreeProps {
  rubs: HafizRub[];
  activeRubId: number | null;
  onSelectRub: (rubId: number) => void;
}

function getStageDotClass(stage: RubStage): string {
  switch (stage) {
    case 'not_started': return 'dot-muted';
    case 'learning': return 'dot-gold';
    case 'memorized': return 'dot-sage';
    case 'solid': return 'dot-green';
  }
}

export function JuzTree({ rubs, activeRubId, onSelectRub }: JuzTreeProps) {
  const [expanded, setExpanded] = usePersistedState<number[]>(
    'arabtools-hafiz-expanded',
    [],
  );

  const toggleJuz = (juz: number) => {
    setExpanded(prev =>
      prev.includes(juz) ? prev.filter(j => j !== juz) : [...prev, juz],
    );
  };

  return (
    <nav className="sidebar-nav">
      {Array.from({ length: 30 }, (_, i) => {
        const juz = i + 1;
        const isExpanded = expanded.includes(juz);
        const juzRubs = rubs.filter(r => getJuzForRub(r.id) === juz);
        const memorizedCount = juzRubs.filter(
          r => r.stage === 'memorized' || r.stage === 'solid',
        ).length;
        const hasActive = juzRubs.some(r => r.id === activeRubId);

        return (
          <div key={juz} className="folder-group">
            <button
              className={`folder-header ${hasActive ? 'active' : ''}`}
              onClick={() => toggleJuz(juz)}
            >
              <svg
                className={`chevron-icon ${isExpanded ? 'expanded' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="folder-name">Juz {juz}</span>
              <span className="folder-count">{memorizedCount}/8</span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {juzRubs.map(rub => (
                  <button
                    key={rub.id}
                    className={`nav-item ${rub.id === activeRubId ? 'active' : ''}`}
                    onClick={() => onSelectRub(rub.id)}
                  >
                    <span className={`nav-dot ${getStageDotClass(rub.stage)}`} />
                    <span className="nav-title">Rub&apos; {rub.id}</span>
                    <span className="nav-subtitle">{getRubDescription(rub.id)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
