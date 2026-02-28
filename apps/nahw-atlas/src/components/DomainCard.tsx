import { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Badge } from '@arabtools/ui';
import { MermaidRenderer } from './MermaidRenderer';
import { miniThemeConfig } from '@/data/mermaid-theme';
import type { DomainDiagram } from '@/data/types';

interface DomainCardProps {
  domain: DomainDiagram;
  index: number;
  isMatch: boolean;
  isDimmed: boolean;
  onClick: () => void;
  progress: { learned: number; total: number; percentage: number };
}

export function DomainCard({ domain, index, isMatch, isDimmed, onClick, progress }: DomainCardProps) {
  const Icon = useMemo(() => {
    const iconName = domain.icon as keyof typeof LucideIcons;
    return (LucideIcons[iconName] as LucideIcons.LucideIcon) || LucideIcons.BookOpen;
  }, [domain.icon]);

  const config = useMemo(() => miniThemeConfig, []);

  return (
    <button
      onClick={onClick}
      className={`glass-card rounded-xl p-5 text-left stagger-enter cursor-pointer w-full transition-opacity ${
        isDimmed ? 'opacity-40' : ''
      } ${isMatch ? 'ring-2 ring-accent' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-primary leading-tight">
              {domain.titleEn}
            </h3>
            <p className="font-arabic text-sm text-muted-foreground" dir="rtl">
              {domain.titleAr}
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{domain.description}</p>

      <div className="mb-3 min-h-[80px] flex items-center justify-center pointer-events-none">
        <MermaidRenderer
          chart={domain.miniMermaid}
          id={`mini-${domain.id}`}
          className="w-full [&_svg]:max-h-[120px] [&_svg]:mx-auto"
          config={config}
        />
      </div>

      <div className="flex gap-2 mb-2">
        <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
          {domain.topicCount} topics
        </Badge>
        <Badge variant="outline" className="text-[10px] px-2 py-0.5">
          {domain.ruleCount} rules
        </Badge>
      </div>

      {/* Feature 2: Progress bar */}
      {progress.percentage > 0 && (
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-green-500/70 rounded-full transition-all"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      )}
    </button>
  );
}
