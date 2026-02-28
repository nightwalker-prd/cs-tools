import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@arabtools/ui';
import { Printer } from 'lucide-react';
import { MermaidRenderer } from './MermaidRenderer';
import { Legend } from './Legend';
import { PanZoomContainer, INITIAL_TRANSFORM } from './PanZoomContainer';
import { NodeTooltip } from './NodeTooltip';
import { Minimap } from './Minimap';
import { DetailDiagramPanel } from './DetailDiagramPanel';
import { buildNodeMap, resolveDiagramNodeFromElement } from '@/lib/node-matcher';
import { classifyEdges } from '@/lib/edge-classifier';
import { fullThemeConfig } from '@/data/mermaid-theme';
import { getDetailDiagramForNode } from '@/data/detail-diagrams';
import type { DomainDiagram, DiagramNode, Transform } from '@/data/types';

interface DiagramModalProps {
  domain: DomainDiagram | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLearned: (domainId: string, nodeId: string) => boolean;
  toggleLearned: (domainId: string, nodeId: string) => void;
}

const REVEAL_LABELS = ['Overview', 'Topics', 'All rules'];

export function DiagramModal({ domain, open, onOpenChange, isLearned, toggleLearned }: DiagramModalProps) {
  const config = useMemo(() => fullThemeConfig, []);

  // Feature 1: Node tooltip
  const [activeNode, setActiveNode] = useState<DiagramNode | null>(null);
  const [tooltipAnchor, setTooltipAnchor] = useState<DOMRect | null>(null);
  const [detailNode, setDetailNode] = useState<DiagramNode | null>(null);

  // Feature 3: Level reveal
  const [revealLevel, setRevealLevel] = useState<0 | 1 | 2>(0);

  // Feature 4: Minimap + controlled pan/zoom
  const [transform, setTransform] = useState<Transform>(INITIAL_TRANSFORM);
  const [svgHtml, setSvgHtml] = useState('');
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [contentSize, setContentSize] = useState({ w: 0, h: 0 });

  // Refs
  const wasDraggedRef = useRef(false);
  const mermaidContainerRef = useRef<HTMLDivElement | null>(null);
  const nodeMapRef = useRef<Map<HTMLElement, DiagramNode>>(new Map());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const clickHandlerRef = useRef<((event: MouseEvent) => void) | null>(null);
  const doubleClickHandlerRef = useRef<((event: MouseEvent) => void) | null>(null);

  // Reset state when domain changes
  useEffect(() => {
    setTransform(INITIAL_TRANSFORM);
    setRevealLevel(0);
    setActiveNode(null);
    setTooltipAnchor(null);
    setDetailNode(null);
    setSvgHtml('');
    setContentSize({ w: 0, h: 0 });
    nodeMapRef.current = new Map();
    mermaidContainerRef.current = null;
  }, [domain?.id]);

  // Close tooltip when modal closes
  useEffect(() => {
    if (!open) {
      setActiveNode(null);
      setTooltipAnchor(null);
      setDetailNode(null);
    }
  }, [open]);

  // Measure container size for minimap
  useEffect(() => {
    if (!open || !wrapperRef.current) return;
    const el = wrapperRef.current;
    setContainerSize({ w: el.clientWidth, h: el.clientHeight });

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerSize({ w: entry.contentRect.width, h: entry.contentRect.height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [open]);

  // One-time setup after SVG renders: build node map, classify edges, attach click listeners
  const handleRendered = useCallback((container: HTMLDivElement) => {
    if (!domain) return;

    if (mermaidContainerRef.current) {
      if (clickHandlerRef.current) {
        mermaidContainerRef.current.removeEventListener('click', clickHandlerRef.current);
      }
      if (doubleClickHandlerRef.current) {
        mermaidContainerRef.current.removeEventListener('dblclick', doubleClickHandlerRef.current);
      }
    }

    mermaidContainerRef.current = container;

    // Set initial reveal level immediately to avoid flash
    container.setAttribute('data-reveal', '0');

    // Build node map
    const nodeMap = buildNodeMap(container, domain.nodes);
    nodeMapRef.current = nodeMap;

    // Classify edges for level reveal
    classifyEdges(container, nodeMap);

    console.log('[nahw] handleRendered:', nodeMap.size, 'nodes matched');

    const allNodeElements = container.querySelectorAll<HTMLElement>('.node');
    allNodeElements.forEach((element) => {
      element.style.cursor = 'pointer';
    });

    const resolveClickedNode = (event: MouseEvent): HTMLElement | null => {
      const path = event.composedPath();
      for (const entry of path) {
        if (!(entry instanceof Element)) continue;
        if (entry.classList.contains('node')) return entry as HTMLElement;
      }

      const target = event.target as Element | null;
      const byClosest = target?.closest('.node') as HTMLElement | null;
      if (byClosest) return byClosest;

      // Fallback: detect clicked node by pointer position against node bounds.
      const nodeMap = nodeMapRef.current;
      for (const nodeElement of nodeMap.keys()) {
        const rect = nodeElement.getBoundingClientRect();
        const withinX = event.clientX >= rect.left && event.clientX <= rect.right;
        const withinY = event.clientY >= rect.top && event.clientY <= rect.bottom;
        if (withinX && withinY) {
          return nodeElement;
        }
      }

      return null;
    };

    const handleContainerClick = (event: MouseEvent) => {
      const clickedNode = resolveClickedNode(event);
      if (!clickedNode) return;

      event.stopPropagation();

      const matchedNode = nodeMap.get(clickedNode) ?? resolveDiagramNodeFromElement(clickedNode, domain.nodes);
      if (!matchedNode) return;

      setActiveNode(matchedNode);
      setTooltipAnchor(clickedNode.getBoundingClientRect());
    };

    const handleContainerDoubleClick = (event: MouseEvent) => {
      if (resolveClickedNode(event)) {
        event.stopPropagation();
      }
    };

    clickHandlerRef.current = handleContainerClick;
    doubleClickHandlerRef.current = handleContainerDoubleClick;
    container.addEventListener('click', handleContainerClick);
    container.addEventListener('dblclick', handleContainerDoubleClick);

    // Measure content size for minimap
    const svg = container.querySelector('svg');
    if (svg) {
      setContentSize({ w: svg.scrollWidth, h: svg.scrollHeight });
    }
  }, [domain]);

  // Update learned CSS classes when progress changes
  useEffect(() => {
    if (!domain) return;
    const nodeMap = nodeMapRef.current;
    nodeMap.forEach((node, el) => {
      if (isLearned(domain.id, node.id)) {
        el.classList.add('learned');
      } else {
        el.classList.remove('learned');
      }
    });
  }, [domain, isLearned]);

  // Update data-reveal attribute when reveal level changes
  useEffect(() => {
    if (mermaidContainerRef.current) {
      mermaidContainerRef.current.setAttribute('data-reveal', String(revealLevel));
    }
  }, [revealLevel]);

  // SVG ready callback for minimap
  const handleSvgReady = useCallback((html: string) => {
    setSvgHtml(html);
  }, []);

  // Minimap navigation
  const handleMinimapNavigate = useCallback((x: number, y: number) => {
    setTransform((prev) => ({ ...prev, x, y }));
  }, []);

  // Close tooltip
  const handleCloseTooltip = useCallback(() => {
    setActiveNode(null);
    setTooltipAnchor(null);
  }, []);

  const handleOpenDetail = useCallback((node: DiagramNode) => {
    setDetailNode(node);
    setActiveNode(null);
    setTooltipAnchor(null);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailNode(null);
  }, []);

  const isTooltipInteractionTarget = useCallback((target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(target.closest('[data-nahw-floating="true"]'));
  }, []);

  if (!domain) return null;

  function handlePrint() {
    window.print();
  }

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-[95vw] max-h-[95vh] w-full h-[90vh] flex flex-col gap-0 p-4 sm:p-6 animate-fade-in-up"
        onInteractOutside={(event) => {
          if (isTooltipInteractionTarget(event.target)) {
            event.preventDefault();
          }
        }}
        onPointerDownOutside={(event) => {
          if (isTooltipInteractionTarget(event.target)) {
            event.preventDefault();
          }
        }}
      >
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-serif text-xl text-primary">
                {domain.titleEn}
                <span className="font-arabic text-base text-muted-foreground ml-2" dir="rtl">
                  {domain.titleAr}
                </span>
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                {domain.description}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* Feature 3: Reveal controls */}
              <div className="no-print flex items-center gap-1.5 border rounded-lg px-2 py-1">
                <button
                  onClick={() => setRevealLevel((l) => Math.max(0, l - 1) as 0 | 1 | 2)}
                  disabled={revealLevel === 0}
                  className="px-1.5 py-0.5 rounded text-[11px] font-medium hover:bg-muted disabled:opacity-30 transition-colors"
                >
                  Less
                </button>
                <div className="flex gap-1">
                  {[0, 1, 2].map((level) => (
                    <div
                      key={level}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        level <= revealLevel ? 'bg-accent' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setRevealLevel((l) => Math.min(2, l + 1) as 0 | 1 | 2)}
                  disabled={revealLevel === 2}
                  className="px-1.5 py-0.5 rounded text-[11px] font-medium hover:bg-muted disabled:opacity-30 transition-colors"
                >
                  More
                </button>
                <span className="text-[10px] text-muted-foreground hidden sm:inline">
                  {REVEAL_LABELS[revealLevel]}
                </span>
              </div>
              <button
                onClick={handlePrint}
                className="no-print p-2 rounded-lg hover:bg-muted transition-colors mr-8"
                title="Print diagram"
              >
                <Printer className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="mt-2">
            <Legend />
          </div>
        </DialogHeader>

        {/* Pan/Zoom area with minimap overlay */}
        <div ref={wrapperRef} className="flex-1 mt-4 rounded-lg relative overflow-hidden">
          <PanZoomContainer
            className="h-full"
            transform={transform}
            onTransformChange={setTransform}
            wasDraggedRef={wasDraggedRef}
          >
            <div className="p-4">
              <MermaidRenderer
                chart={domain.fullMermaid}
                id={`full-${domain.id}`}
                className="w-full"
                config={config}
                onRendered={handleRendered}
                onSvgReady={handleSvgReady}
              />
            </div>
          </PanZoomContainer>

          {/* Feature 4: Minimap */}
          <Minimap
            svgHtml={svgHtml}
            transform={transform}
            containerSize={containerSize}
            contentSize={contentSize}
            onNavigate={handleMinimapNavigate}
          />
        </div>
      </DialogContent>

    </Dialog>
    {/* Portal tooltip to body so it renders above the dialog overlay (z-50) */}
    {activeNode && tooltipAnchor && createPortal(
      <NodeTooltip
        node={activeNode}
        anchor={tooltipAnchor}
        onClose={handleCloseTooltip}
        isLearned={isLearned(domain.id, activeNode.id)}
        onToggleLearned={() => toggleLearned(domain.id, activeNode.id)}
        onOpenDetail={handleOpenDetail}
      />,
      document.body,
    )}
    {detailNode && createPortal(
      <DetailDiagramPanel
        detail={getDetailDiagramForNode(detailNode)}
        onClose={handleCloseDetail}
      />,
      document.body,
    )}
    </>
  );
}
