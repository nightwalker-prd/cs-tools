import type { DiagramNode } from '@/data/types';

/**
 * Classify edges by their target node type.
 * Dashed edges (stroke-dasharray) always connect to rules.
 * Solid edges are classified by finding the closest node to the path endpoint.
 */
export function classifyEdges(
  container: HTMLElement,
  nodeMap: Map<HTMLElement, DiagramNode>
): void {
  const edgePaths = container.querySelectorAll('.edgePath');
  const svg = container.querySelector('svg') as SVGSVGElement | null;
  if (!svg) return;

  // Collect node screen positions and types
  const nodeInfos: { cx: number; cy: number; type: DiagramNode['type'] }[] = [];
  nodeMap.forEach((node, el) => {
    const rect = el.getBoundingClientRect();
    nodeInfos.push({
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      type: node.type,
    });
  });

  edgePaths.forEach((edgePath) => {
    const path = edgePath.querySelector('path') as SVGPathElement | null;
    if (!path) return;

    // Dashed edges connect to rules
    if (path.getAttribute('stroke-dasharray')) {
      edgePath.setAttribute('data-target-level', 'rule');
      return;
    }

    // For solid edges, find the closest node to the path endpoint
    try {
      const len = path.getTotalLength();
      const endPt = path.getPointAtLength(len);
      const ctm = path.getScreenCTM();
      if (!ctm) {
        edgePath.setAttribute('data-target-level', 'subtopic');
        return;
      }

      // Transform SVG coordinates to screen coordinates
      const screenX = endPt.x * ctm.a + endPt.y * ctm.c + ctm.e;
      const screenY = endPt.x * ctm.b + endPt.y * ctm.d + ctm.f;

      let closestType: DiagramNode['type'] = 'subtopic';
      let minDist = Infinity;

      for (const { cx, cy, type } of nodeInfos) {
        const dist = Math.hypot(screenX - cx, screenY - cy);
        if (dist < minDist) {
          minDist = dist;
          closestType = type;
        }
      }

      edgePath.setAttribute('data-target-level', closestType);
    } catch {
      edgePath.setAttribute('data-target-level', 'subtopic');
    }
  });
}
