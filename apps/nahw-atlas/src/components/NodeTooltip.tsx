import { useEffect, useRef } from 'react';
import { CircleCheck, X } from 'lucide-react';
import type { DiagramNode } from '@/data/types';

interface NodeTooltipProps {
  node: DiagramNode;
  anchor: DOMRect;
  onClose: () => void;
  isLearned: boolean;
  onToggleLearned: () => void;
  onOpenDetail: (node: DiagramNode) => void;
}

const typeLabels: Record<DiagramNode['type'], string> = {
  category: 'Category',
  subtopic: 'Subtopic',
  topic: 'Topic',
  rule: 'Rule',
};

const typeColors: Record<DiagramNode['type'], string> = {
  category: 'bg-primary text-primary-foreground',
  subtopic: 'bg-parchment-warm text-primary border border-accent',
  topic: 'bg-parchment text-foreground border border-parchment-dark',
  rule: 'bg-white text-primary border border-accent border-dashed',
};

export function NodeTooltip({ node, anchor, onClose, isLearned, onToggleLearned, onOpenDetail }: NodeTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    // Delay to avoid the same click that opened it
    const timer = setTimeout(() => {
      window.addEventListener('click', handleClick);
    }, 10);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  // Smart positioning
  const tooltipWidth = 300;
  const tooltipHeight = 200;
  const padding = 12;

  let left = anchor.left + anchor.width / 2 - tooltipWidth / 2;
  let top = anchor.bottom + padding;

  // Flip up if it would overflow bottom
  if (top + tooltipHeight > window.innerHeight - padding) {
    top = anchor.top - tooltipHeight - padding;
  }

  // Clamp horizontal
  if (left < padding) left = padding;
  if (left + tooltipWidth > window.innerWidth - padding) {
    left = window.innerWidth - tooltipWidth - padding;
  }

  // Clamp top
  if (top < padding) top = padding;

  return (
    <div
      ref={ref}
      data-nahw-floating="true"
      className="no-print fixed z-[100] w-[300px] rounded-xl glass-card !transform-none p-4 shadow-lg animate-fade-in-up"
      style={{ left, top, pointerEvents: 'auto' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-serif font-semibold text-primary text-sm leading-tight">
            {node.labelEn}
          </h4>
          <p className="font-arabic text-sm text-muted-foreground mt-0.5" dir="rtl">
            {node.labelAr}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-muted transition-colors flex-shrink-0"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[node.type]}`}>
          {typeLabels[node.type]}
        </span>
      </div>

      <p className="text-xs text-foreground/80 leading-relaxed">{node.tooltip}</p>

      <button
        onClick={() => onOpenDetail(node)}
        className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      >
        View Detailed Diagram
      </button>

      <button
        onClick={onToggleLearned}
        className={`mt-3 flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 transition-colors ${
          isLearned
            ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
      >
        <CircleCheck className={`h-3.5 w-3.5 ${isLearned ? 'fill-green-500 text-white' : ''}`} />
        {isLearned ? 'Learned' : 'Mark as learned'}
      </button>
    </div>
  );
}
