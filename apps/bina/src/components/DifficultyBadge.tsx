import type { Difficulty } from '../types';

const labels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Med',
  hard: 'Hard',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`difficulty-badge ${difficulty}`}>
      {labels[difficulty]}
    </span>
  );
}
