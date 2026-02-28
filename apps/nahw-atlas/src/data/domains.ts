import type { DomainDiagram, DiagramNode } from './types';
import { wordsDiagram } from './words-diagram';
import { sentencesDiagram } from './sentences-diagram';
import { phrasesDiagram } from './phrases-diagram';
import { irabDiagram } from './irab-diagram';
import { pronounsDiagram } from './pronouns-diagram';
import { nestedDiagram } from './nested-diagram';
import { joiningDiagram } from './joining-diagram';
import { advancedDiagram } from './advanced-diagram';

export const domains: DomainDiagram[] = [
  wordsDiagram,
  sentencesDiagram,
  phrasesDiagram,
  irabDiagram,
  pronounsDiagram,
  nestedDiagram,
  joiningDiagram,
  advancedDiagram,
];

export const allNodes: DiagramNode[] = domains.flatMap(d => d.nodes);

export function searchNodes(query: string): { matchedDomainIds: Set<string>; matchedNodeIds: Set<string> } {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { matchedDomainIds: new Set(domains.map(d => d.id)), matchedNodeIds: new Set() };
  }

  const matchedNodeIds = new Set<string>();
  const matchedDomainIds = new Set<string>();

  for (const domain of domains) {
    // Check domain title
    if (domain.titleEn.toLowerCase().includes(q) || domain.titleAr.includes(q)) {
      matchedDomainIds.add(domain.id);
      continue;
    }

    // Check nodes
    for (const node of domain.nodes) {
      if (
        node.labelEn.toLowerCase().includes(q) ||
        node.labelAr.includes(q) ||
        node.tooltip.toLowerCase().includes(q)
      ) {
        matchedNodeIds.add(node.id);
        matchedDomainIds.add(domain.id);
      }
    }
  }

  return { matchedDomainIds, matchedNodeIds };
}
