import type { Challenge } from '../types';
import { DifficultyBadge } from './DifficultyBadge';

interface ChallengeHeaderProps {
  challenge: Challenge;
}

export function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  return (
    <div className="challenge-header">
      <div className="challenge-meta">
        <span className="challenge-number">#{challenge.number}</span>
        <DifficultyBadge difficulty={challenge.difficulty} />
        <span className="challenge-topic">{challenge.topic}</span>
      </div>
      <h2 className="challenge-title">{challenge.title}</h2>
      <p className="challenge-title-ar">{challenge.titleAr}</p>
      <div className="challenge-description">
        {challenge.description}
        {challenge.translation && (
          <p className="challenge-translation">
            Target: "{challenge.translation}"
          </p>
        )}
      </div>
    </div>
  );
}
