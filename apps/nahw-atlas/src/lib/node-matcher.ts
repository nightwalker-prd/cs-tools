import type { DiagramNode } from '@/data/types';

function normalizeEnglish(value: string): string {
  return value
    .toLowerCase()
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeArabic(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function collectNodeText(el: HTMLElement): string {
  const text = el.textContent ?? '';
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Extract the English label from a mermaid .node element.
 *
 * Mermaid 11.x renders HTML labels inside foreignObject > .nodeLabel:
 *   - Category/subtopic: <b>Words</b><br/><small>الكلمات</small>
 *   - Topic/rule:        Definite & Indefinite<br/><small>المعرفة والنكرة</small>
 *
 * Strategy: try <b> first, then fall back to text before <small>.
 */
export function extractLabelEn(el: HTMLElement): string | null {
  const nodeLabel = el.querySelector('.nodeLabel');
  if (!nodeLabel) return null;

  // Try <b> first (category/subtopic nodes)
  const boldEl = nodeLabel.querySelector('b');
  if (boldEl) return boldEl.textContent?.trim() ?? null;

  // For topic/rule nodes: clone, strip <small> and <br>, take remaining text
  const clone = nodeLabel.cloneNode(true) as HTMLElement;
  clone.querySelector('small')?.remove();
  clone.querySelectorAll('br').forEach((lineBreak) => lineBreak.remove());
  return clone.textContent?.trim() ?? null;
}

export function extractLabelAr(el: HTMLElement): string | null {
  const nodeLabel = el.querySelector('.nodeLabel');
  if (!nodeLabel) return null;
  const small = nodeLabel.querySelector('small');
  return small?.textContent?.trim() ?? null;
}

export function resolveDiagramNodeFromElement(
  el: HTMLElement,
  nodes: DiagramNode[]
): DiagramNode | null {
  const rawEn = extractLabelEn(el);
  const rawAr = extractLabelAr(el);
  const rawFull = collectNodeText(el);

  const normalizedEn = rawEn ? normalizeEnglish(rawEn) : '';
  const normalizedAr = rawAr ? normalizeArabic(rawAr) : '';
  const normalizedFullEn = rawFull ? normalizeEnglish(rawFull) : '';
  const normalizedFullAr = rawFull ? normalizeArabic(rawFull) : '';

  if (!normalizedEn && !normalizedAr && !normalizedFullEn && !normalizedFullAr) return null;

  const exactEn = nodes.find((node) => normalizeEnglish(node.labelEn) === normalizedEn);
  if (exactEn) return exactEn;

  if (normalizedAr) {
    const exactAr = nodes.find((node) => normalizeArabic(node.labelAr) === normalizedAr);
    if (exactAr) return exactAr;
  }

  if (normalizedEn) {
    const fuzzyEn = nodes.find((node) => {
      const candidate = normalizeEnglish(node.labelEn);
      return candidate.includes(normalizedEn) || normalizedEn.includes(candidate);
    });
    if (fuzzyEn) return fuzzyEn;
  }

  if (normalizedFullEn) {
    const fullContainsEn = nodes.find((node) => {
      const candidate = normalizeEnglish(node.labelEn);
      return normalizedFullEn.includes(candidate);
    });
    if (fullContainsEn) return fullContainsEn;
  }

  if (normalizedFullAr) {
    const fullContainsAr = nodes.find((node) => {
      const candidate = normalizeArabic(node.labelAr);
      return candidate.length > 0 && normalizedFullAr.includes(candidate);
    });
    if (fullContainsAr) return fullContainsAr;
  }

  return null;
}

/**
 * Build a map from SVG .node elements to DiagramNode data
 * by matching the English label text in each node.
 */
export function buildNodeMap(
  container: HTMLElement,
  nodes: DiagramNode[]
): Map<HTMLElement, DiagramNode> {
  const map = new Map<HTMLElement, DiagramNode>();
  const nodeElements = container.querySelectorAll<HTMLElement>('.node');

  nodeElements.forEach((el) => {
    const matched = resolveDiagramNodeFromElement(el, nodes);
    if (matched) {
      map.set(el, matched);
      // Ensure the node type class is present for CSS selectors
      el.classList.add(matched.type);
    }
  });

  return map;
}
