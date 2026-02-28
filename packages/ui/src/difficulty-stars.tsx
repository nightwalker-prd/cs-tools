import { cn } from './utils';

type Difficulty = 'easy' | 'medium' | 'hard';

const difficultyConfig: Record<Difficulty, { label: string; color: string; stars: number }> = {
  easy: { label: 'Easy', color: 'text-[#3FB950]', stars: 1 },
  medium: { label: 'Medium', color: 'text-[#D29922]', stars: 2 },
  hard: { label: 'Hard', color: 'text-[#F85149]', stars: 3 },
};

interface DifficultyStarsProps {
  difficulty: Difficulty;
  showLabel?: boolean;
  className?: string;
}

export function DifficultyStars({ difficulty, showLabel = true, className }: DifficultyStarsProps) {
  const config = difficultyConfig[difficulty];

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex gap-0.5">
        {[1, 2, 3].map((star) => (
          <svg
            key={star}
            className={cn('w-3.5 h-3.5', star <= config.stars ? config.color : 'text-[#21262D]')}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {showLabel && (
        <span className={cn('text-xs font-medium', config.color)}>{config.label}</span>
      )}
    </div>
  );
}
