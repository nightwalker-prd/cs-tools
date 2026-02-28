import type { HafizRub, HafizStats } from '../../types';
import { RubGrid } from './RubGrid';
import { StatsBar } from './StatsBar';

interface HomePageProps {
  rubs: HafizRub[];
  stats: HafizStats;
  dueCount: number;
  onSelectRub: (rubId: number) => void;
  onStartRevision: () => void;
}

export function HomePage({ rubs, stats, dueCount, onSelectRub, onStartRevision }: HomePageProps) {
  return (
    <div className="home-page fade-in-up">
      <div className="page-header">
        <h2>Quran Memorization Tracker</h2>
        <p className="page-subtitle">
          Track your hifz progress across all 240 rub&apos; of the Quran
        </p>
      </div>

      <StatsBar stats={stats} />

      {dueCount > 0 && (
        <div className="due-banner">
          <div className="due-banner-text">
            <strong>{dueCount} rub&apos;</strong> due for revision
          </div>
          <button className="btn btn-primary" onClick={onStartRevision}>
            Start Revision
          </button>
        </div>
      )}

      <RubGrid rubs={rubs} onSelectRub={onSelectRub} />
    </div>
  );
}
