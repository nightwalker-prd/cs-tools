import * as LucideIcons from 'lucide-react';
import type { Milestone } from '@/types/progress';

type IconMap = Record<string, React.ComponentType<{ size?: number }>>;

interface MilestoneChipProps {
  milestone: Milestone;
}

export function MilestoneChip({ milestone }: MilestoneChipProps) {
  const IconComponent = (LucideIcons as unknown as IconMap)[milestone.icon];

  return (
    <div
      className={`milestone-chip ${milestone.earned ? 'milestone-chip--earned' : 'milestone-chip--locked'}`}
      title={milestone.description}
    >
      {IconComponent && <IconComponent size={14} />}
      <span>{milestone.label}</span>
    </div>
  );
}
