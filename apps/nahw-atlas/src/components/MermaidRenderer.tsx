import { useEffect, useRef, useState } from 'react';
import { getMermaid, uniqueId } from '@/lib/mermaid-init';
import type { MermaidConfig } from 'mermaid';

interface MermaidRendererProps {
  chart: string;
  id: string;
  className?: string;
  config: MermaidConfig;
  onRendered?: (container: HTMLDivElement) => void;
  onSvgReady?: (svgHtml: string) => void;
}

export function MermaidRenderer({ chart, id, className, config, onRendered, onSvgReady }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        setLoading(true);
        setError(null);
        const mermaid = await getMermaid(config);
        const renderId = uniqueId(id);
        const { svg: renderedSvg } = await mermaid.render(renderId, chart);
        if (!cancelled) {
          setSvg(renderedSvg);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
          setLoading(false);
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [chart, id, config]);

  // Notify parent after SVG is rendered into the DOM
  useEffect(() => {
    if (!svg) return;
    if (onRendered && containerRef.current) {
      onRendered(containerRef.current);
    }
    if (onSvgReady) {
      onSvgReady(svg);
    }
  }, [svg, onRendered, onSvgReady]);

  if (error) {
    return (
      <div className={`flex items-center justify-center p-4 text-sm text-red-500 ${className ?? ''}`}>
        Diagram error: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className ?? ''}`}>
        <div className="animate-pulse space-y-3 w-full">
          <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
          <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
          <div className="h-3 bg-muted rounded w-2/3 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-container overflow-x-auto ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
