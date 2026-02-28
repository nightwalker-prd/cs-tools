import { Star } from 'lucide-react';
import type { Tool } from '@/data/tools';
import { ToolCard } from './ToolCard';

interface PinnedSectionProps {
  tools: Tool[];
  onUnpin: (id: string) => void;
  onHide: (id: string) => void;
}

export function PinnedSection({ tools, onUnpin, onHide }: PinnedSectionProps) {
  if (tools.length === 0) return null;

  return (
    <section className="animate-fade-in-up">
      <div className="nav-card-header" style={{ marginBottom: '1rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={18} style={{ color: 'var(--color-accent)', fill: 'var(--color-accent)' }} />
          My Tools
        </h2>
        <span className="tag">{tools.length} pinned</span>
      </div>
      <div className="nav-cards">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isPinned={true}
            onPin={() => {}}
            onUnpin={() => onUnpin(tool.id)}
            onHide={() => onHide(tool.id)}
          />
        ))}
      </div>

      <div className="decorative-hr">
        <div className="hr-diamond" />
      </div>
    </section>
  );
}
