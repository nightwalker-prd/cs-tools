import { Pin, PinOff, EyeOff } from 'lucide-react';
import type { Tool } from '@/data/tools';

interface ToolCardProps {
  tool: Tool;
  isPinned: boolean;
  onPin: () => void;
  onUnpin: () => void;
  onHide: () => void;
}

export function ToolCard({ tool, isPinned, onPin, onUnpin, onHide }: ToolCardProps) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-card"
    >
      <div className="nav-card-header">
        <h2>{tool.name}</h2>
        <span className="font-arabic">{tool.nameAr}</span>
      </div>
      <p className="nav-card-desc">{tool.description}</p>
      <div className="nav-card-tags">
        <span className="tag">{tool.category}</span>
        <div className="card-actions">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isPinned ? onUnpin() : onPin();
            }}
            className="card-action-btn"
            title={isPinned ? 'Unpin' : 'Pin to My Tools'}
          >
            {isPinned ? <PinOff size={14} /> : <Pin size={14} />}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onHide();
            }}
            className="card-action-btn"
            title="Hide"
          >
            <EyeOff size={14} />
          </button>
        </div>
      </div>
    </a>
  );
}
