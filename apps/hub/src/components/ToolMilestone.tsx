import * as LucideIcons from 'lucide-react';
import type { ToolScore } from '@/types/progress';
import { tools as allTools } from '@/data/tools';

type IconMap = Record<string, React.ComponentType<{ size?: number }>>;

interface ToolMilestoneProps {
  tool: ToolScore;
}

export function ToolMilestone({ tool }: ToolMilestoneProps) {
  const toolDef = allTools.find((t) => t.id === tool.toolId);
  const iconName = toolDef?.icon ?? 'Circle';
  const IconComponent = (LucideIcons as unknown as IconMap)[iconName];

  const statusClass = !tool.hasData
    ? 'tool-milestone--none'
    : tool.score >= 70
      ? 'tool-milestone--mastered'
      : 'tool-milestone--progress';

  return (
    <div className={`tool-milestone ${statusClass}`} title={`${tool.name}: ${tool.hasData ? `${tool.score}%` : 'No data'}`}>
      <div className="tool-milestone-icon">
        {IconComponent && <IconComponent size={16} />}
      </div>
      <span className="tool-milestone-label">{tool.name}</span>
    </div>
  );
}
