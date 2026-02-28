import { ExternalLink } from 'lucide-react';
import type { PillarScore } from '@/types/progress';
import { tools as allTools } from '@/data/tools';
import { ToolMilestone } from './ToolMilestone';

interface PillarJourneyProps {
  pillar: PillarScore;
}

export function PillarJourney({ pillar }: PillarJourneyProps) {
  const hasData = pillar.tools.some((t) => t.hasData);
  const fillColor = pillar.score >= 70 ? 'var(--progress-green)' : 'var(--color-accent)';

  // CTA: link to the lowest-scoring active tool, or first tool if none active
  const activeTool = pillar.tools
    .filter((t) => t.hasData)
    .sort((a, b) => a.score - b.score)[0] ?? pillar.tools[0];
  const ctaUrl = allTools.find((t) => t.id === activeTool.toolId)?.url;

  return (
    <div className="pillar-journey">
      <div className="pillar-header">
        <div className="pillar-header-titles">
          <h3 className="pillar-header-name">{pillar.nameEn}</h3>
          <span className="pillar-header-ar font-arabic" dir="rtl">{pillar.nameAr}</span>
        </div>
        <span className="pillar-header-pct">{hasData ? `${pillar.score}%` : '—'}</span>
      </div>

      <div className="pillar-progress-bar">
        <div
          className="pillar-progress-fill"
          style={{ width: `${pillar.score}%`, background: fillColor }}
        />
      </div>

      <div className="milestone-track">
        <div className="milestone-track-line" />
        {pillar.tools.map((tool) => (
          <ToolMilestone key={`${pillar.pillarId}-${tool.toolId}`} tool={tool} />
        ))}
      </div>

      {ctaUrl && (
        <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="pillar-cta">
          Continue <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
