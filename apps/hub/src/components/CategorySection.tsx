import type { Tool, Category } from '@/data/tools';
import { ToolCard } from './ToolCard';

interface CategorySectionProps {
  category: Category;
  tools: Tool[];
  isPinned: (id: string) => boolean;
  onPin: (id: string) => void;
  onUnpin: (id: string) => void;
  onHide: (id: string) => void;
}

export function CategorySection({
  category,
  tools,
  isPinned,
  onPin,
  onUnpin,
  onHide,
}: CategorySectionProps) {
  return (
    <section className="animate-fade-in-up">
      <div className="nav-card-header" style={{ marginBottom: '1rem' }}>
        <h2>{category}</h2>
        <span className="tag">{tools.length} {tools.length === 1 ? 'tool' : 'tools'}</span>
      </div>
      <div className="nav-cards" style={{ marginBottom: 0 }}>
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isPinned={isPinned(tool.id)}
            onPin={() => onPin(tool.id)}
            onUnpin={() => onUnpin(tool.id)}
            onHide={() => onHide(tool.id)}
          />
        ))}
      </div>
    </section>
  );
}
