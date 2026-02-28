import { Lock } from 'lucide-react';

interface EpisodeLockedProps {
  episodeNum: number;
  onBack: () => void;
}

export function EpisodeLocked({ episodeNum, onBack }: EpisodeLockedProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-parchment-warm flex items-center justify-center">
        <Lock className="w-8 h-8 text-parchment-dark/50" />
      </div>
      <h2 className="text-xl font-serif text-lapis">Episode {episodeNum} Locked</h2>
      <p className="text-parchment-dark max-w-sm">
        Complete the previous episode to unlock this one.
      </p>
      <button
        onClick={onBack}
        className="px-5 py-2.5 bg-lapis text-white rounded-lg font-medium hover:bg-lapis/90 transition-colors"
      >
        Back to Stories
      </button>
    </div>
  );
}
