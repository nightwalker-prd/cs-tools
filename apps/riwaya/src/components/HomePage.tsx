import { allArcs } from '../data/arcs';
import { StoryArcCard } from './StoryArcCard';
import type { RiwayaProgress, ArcProgress } from '../types';

interface HomePageProps {
  progress: RiwayaProgress;
  isEpisodeCompleted: (arcId: string, episodeNum: number) => boolean;
  isEpisodeUnlocked: (arcId: string, episodeNum: number) => boolean;
  getArcProgress: (arcId: string) => ArcProgress | null;
  onSelectEpisode: (arcId: string, episodeNum: number) => void;
}

export function HomePage({
  isEpisodeCompleted,
  isEpisodeUnlocked,
  getArcProgress,
  onSelectEpisode,
}: HomePageProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif text-lapis mb-2">
          <span className="font-arabic text-3xl">قِصَصٌ عَرَبِيَّةٌ</span>
        </h2>
        <p className="text-parchment-dark">
          Learn Arabic through immersive stories
        </p>
      </div>
      <div className="space-y-4">
        {allArcs.map((arc) => (
          <StoryArcCard
            key={arc.id}
            arc={arc}
            arcProgress={getArcProgress(arc.id)}
            isEpisodeCompleted={isEpisodeCompleted}
            isEpisodeUnlocked={isEpisodeUnlocked}
            onSelectEpisode={onSelectEpisode}
          />
        ))}
      </div>
    </div>
  );
}
