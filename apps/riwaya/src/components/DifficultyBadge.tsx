interface DifficultyBadgeProps {
  difficulty: string;
}

const colors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[difficulty] ?? 'bg-gray-100 text-gray-800'}`}
    >
      {difficulty}
    </span>
  );
}
