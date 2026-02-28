import { X } from 'lucide-react';
import { MermaidRenderer } from './MermaidRenderer';
import { detailThemeConfig } from '@/data/mermaid-theme';
import type { DetailDiagram } from '@/data/detail-diagrams';

interface DetailDiagramPanelProps {
  detail: DetailDiagram;
  onClose: () => void;
}

export function DetailDiagramPanel({ detail, onClose }: DetailDiagramPanelProps) {
  return (
    <div
      data-nahw-floating="true"
      className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[92vh] rounded-2xl bg-white border border-border shadow-2xl flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b">
          <div>
            <h3 className="text-xl font-serif font-semibold text-primary">{detail.titleEn}</h3>
            <p className="font-arabic text-muted-foreground" dir="rtl">{detail.titleAr}</p>
            <p className="text-sm text-muted-foreground mt-1">{detail.summary}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Close detailed diagram"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <MermaidRenderer
            chart={detail.mermaid}
            id={`detail-${detail.nodeId}`}
            className="w-full"
            config={detailThemeConfig}
          />

          <div className="mt-5 rounded-xl bg-parchment/70 border border-parchment-dark p-4">
            <h4 className="text-sm font-semibold text-primary mb-2">Reference Material</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {detail.references.map((reference) => (
                <li key={`${detail.nodeId}-${reference.path}`}>
                  <span className="font-medium text-foreground">{reference.title}</span>
                  <span className="mx-1.5">·</span>
                  <span>{reference.source}</span>
                  <span className="mx-1.5">·</span>
                  <span className="font-mono">{reference.path}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
