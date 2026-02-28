import { ChevronRight, CheckCircle2, Lock, Circle } from 'lucide-react';
import type { StoryArc, ArcProgress } from '../types';
import { DifficultyBadge } from './DifficultyBadge';

interface StoryArcCardProps {
  arc: StoryArc;
  arcProgress: ArcProgress | null;
  isEpisodeCompleted: (arcId: string, episodeNum: number) => boolean;
  isEpisodeUnlocked: (arcId: string, episodeNum: number) => boolean;
  onSelectEpisode: (arcId: string, episodeNum: number) => void;
}

export function StoryArcCard({
  arc,
  arcProgress,
  isEpisodeCompleted,
  isEpisodeUnlocked,
  onSelectEpisode,
}: StoryArcCardProps) {
  const completedCount = arcProgress?.completedEpisodes.length ?? 0;
  const isArcComplete = completedCount === arc.totalEpisodes;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden ${isArcComplete ? 'border-gold/50' : 'border-parchment-dark/20'}`}
    >
      <div className="p-4 border-b border-parchment-warm">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-serif text-lapis">
              <span className="font-arabic text-xl">{arc.titleAr}</span>
              <span className="mx-2 text-parchment-dark/40">|</span>
              <span>{arc.titleEn}</span>
            </h3>
            <p className="text-sm text-parchment-dark mt-1">
              {arc.description}
            </p>
          </div>
          <DifficultyBadge difficulty={arc.difficulty} />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-2 bg-parchment-warm rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{
                width: `${(completedCount / arc.totalEpisodes) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-parchment-dark whitespace-nowrap">
            {completedCount}/{arc.totalEpisodes}
          </span>
        </div>
      </div>
      <div className="divide-y divide-parchment-warm/50">
        {arc.episodes.map((ep) => {
          const completed = isEpisodeCompleted(arc.id, ep.number);
          const unlocked = isEpisodeUnlocked(arc.id, ep.number);

          return (
            <button
              key={ep.id}
              onClick={() => unlocked && onSelectEpisode(arc.id, ep.number)}
              disabled={!unlocked}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                unlocked
                  ? 'hover:bg-parchment-warm/30 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex-shrink-0">
                {completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : unlocked ? (
                  <Circle className="w-5 h-5 text-lapis/40" />
                ) : (
                  <Lock className="w-4 h-4 text-parchment-dark/40" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-parchment-dark">
                    Ep. {ep.number}
                  </span>
                  <span className="font-arabic text-base">{ep.titleAr}</span>
                  <span className="text-sm text-parchment-dark truncate">
                    {ep.titleEn}
                  </span>
                </div>
              </div>
              {unlocked && (
                <ChevronRight className="w-4 h-4 text-parchment-dark/40 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
