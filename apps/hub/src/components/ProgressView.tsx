import { Compass } from 'lucide-react';
import { useProgressDashboard } from '@/hooks/useProgressDashboard';
import { useGamification } from '@arabtools/gamification/hooks';
import { ScoreCard } from './ScoreCard';
import { PillarJourney } from './PillarJourney';
import { GamificationHeader } from './GamificationHeader';

export function ProgressView() {
  const data = useProgressDashboard();
  const gamification = useGamification();
  const hasAnyData = data.pillars.some((p) => p.tools.some((t) => t.hasData));

  if (!hasAnyData && gamification.xpState.totalXp === 0) {
    return (
      <div className="progress-empty">
        <Compass size={48} />
        <h3>Start your journey!</h3>
        <p>Use any tool to begin tracking your Arabic learning progress across all five pillars.</p>
      </div>
    );
  }

  return (
    <div className="progress-view">
      <GamificationHeader gamification={gamification} />
      <ScoreCard data={data} />
      <div className="progress-pillars">
        {data.pillars.map((pillar) => (
          <PillarJourney key={pillar.pillarId} pillar={pillar} />
        ))}
      </div>
    </div>
  );
}
