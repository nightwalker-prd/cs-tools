interface FrequencyBadgeProps {
  tier: 1 | 2 | 3 | 4;
  count?: number;
}

const tierLabels: Record<number, string> = {
  1: 'T1',
  2: 'T2',
  3: 'T3',
  4: 'T4',
};

export function FrequencyBadge({ tier, count }: FrequencyBadgeProps) {
  return (
    <span className={`freq-badge tier-${tier}`}>
      {tierLabels[tier]}
      {count != null && <span> ({count})</span>}
    </span>
  );
}
