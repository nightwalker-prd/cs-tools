export interface Transform {
  scale: number;
  x: number;
  y: number;
}

export interface DiagramNode {
  id: string;
  labelEn: string;
  labelAr: string;
  tooltip: string;
  type: 'category' | 'subtopic' | 'topic' | 'rule';
}

export interface DomainDiagram {
  id: string;
  titleEn: string;
  titleAr: string;
  icon: string;
  description: string;
  topicCount: number;
  ruleCount: number;
  miniMermaid: string;
  fullMermaid: string;
  nodes: DiagramNode[];
}
