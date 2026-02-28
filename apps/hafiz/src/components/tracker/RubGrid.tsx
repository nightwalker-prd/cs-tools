import { getJuzForRub } from '@arabtools/data';
import type { HafizRub, RubStage } from '../../types';

interface RubGridProps {
  rubs: HafizRub[];
  onSelectRub: (rubId: number) => void;
}

function getStageClass(stage: RubStage): string {
  switch (stage) {
    case 'not_started': return 'grid-cell-muted';
    case 'learning': return 'grid-cell-gold';
    case 'memorized': return 'grid-cell-sage';
    case 'solid': return 'grid-cell-green';
  }
}

export function RubGrid({ rubs, onSelectRub }: RubGridProps) {
  return (
    <div className="rub-grid-section">
      <h3 className="section-title">240 Rub&apos; Grid</h3>
      <div className="rub-grid-legend">
        <span className="legend-item"><span className="legend-dot grid-cell-muted" /> Not Started</span>
        <span className="legend-item"><span className="legend-dot grid-cell-gold" /> Learning</span>
        <span className="legend-item"><span className="legend-dot grid-cell-sage" /> Memorized</span>
        <span className="legend-item"><span className="legend-dot grid-cell-green" /> Solid</span>
      </div>

      <div className="rub-grid">
        {rubs.map(rub => {
          const juz = getJuzForRub(rub.id);
          return (
            <button
              key={rub.id}
              className={`rub-grid-cell ${getStageClass(rub.stage)}`}
              onClick={() => onSelectRub(rub.id)}
              title={`Rub' ${rub.id} — Juz ${juz}`}
            >
              {rub.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
