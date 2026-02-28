import type { DiagramNode } from './types';
import { classDefs } from './mermaid-theme';

export interface DetailReference {
  title: string;
  source: 'tarkib-guide' | 'nahw-guide';
  path: string;
}

export interface DetailDiagram {
  nodeId: string;
  titleEn: string;
  titleAr: string;
  summary: string;
  mermaid: string;
  references: DetailReference[];
}

const curated: Record<string, Omit<DetailDiagram, 'nodeId'>> = {
  'nominal-sentence': {
    titleEn: 'Nominal Sentence Deep Dive',
    titleAr: 'تفصيل الجملة الاسمية',
    summary: 'Step-by-step structure of mubtada and khabar with agreement and common patterns.',
    mermaid: `flowchart TD
      A[Nominal Sentence الجملة الاسمية]:::category --> B[Mubtada المبتدأ]:::subtopic
      A --> C[Khabar الخبر]:::subtopic
      B --> B1[Usually definite]:::topic
      B --> B2[Marfu\' by default]:::topic
      C --> C1[Can be noun phrase]:::topic
      C --> C2[Can be shibh al-jumla]:::topic
      C --> C3[Can be full sentence]:::topic
      B --> R1[Check DING agreement with khabar contextually]:::rule
      C --> R2[Classify khabar type before i\'rab label]:::rule
      ${classDefs}`,
    references: [
      { title: 'Nominal Sentence', source: 'tarkib-guide', path: 'apps/tarkib-guide/src/data/content/nominal-sentence.md' },
      { title: 'Nominal Sentence Topic', source: 'nahw-guide', path: 'apps/nahw-navigator/src/data/topics/nominal-sentence.ts' },
    ],
  },
  'verbal-sentence': {
    titleEn: 'Verbal Sentence Deep Dive',
    titleAr: 'تفصيل الجملة الفعلية',
    summary: 'How fi\'l, faa\'il, and maf\'ul organize, including order and agreement behavior.',
    mermaid: `flowchart TD
      A[Verbal Sentence الجملة الفعلية]:::category --> B[Fi\'l الفعل]:::subtopic
      A --> C[Faa\'il الفاعل]:::subtopic
      A --> D[Maf\'ul bih المفعول به]:::subtopic
      B --> B1[Past / Present / Imperative]:::topic
      C --> C1[Always marfu\']:::topic
      D --> D1[Usually mansub]:::topic
      A --> R1[Detect main verb first]:::rule
      A --> R2[Then assign subject, then objects]:::rule
      A --> R3[Passive voice promotes na\'ib al-faa\'il]:::rule
      ${classDefs}`,
    references: [
      { title: 'Verbal Sentence', source: 'tarkib-guide', path: 'apps/tarkib-guide/src/data/content/verbal-sentence.md' },
      { title: 'Verbal Sentence Topic', source: 'nahw-guide', path: 'apps/nahw-navigator/src/data/topics/verbal-sentence.ts' },
    ],
  },
  mudaf: {
    titleEn: 'Mudaf–Mudaf Ilayhi Deep Dive',
    titleAr: 'تفصيل الإضافة',
    summary: 'Possessive phrase mechanics, restrictions, and nested constructions.',
    mermaid: `flowchart TD
      A[Idaafa الإضافة]:::category --> B[Mudaf المضاف]:::subtopic
      A --> C[Mudaf Ilayhi المضاف إليه]:::subtopic
      B --> B1[Drops tanween / nuun]:::topic
      B --> B2[Case by sentence role]:::topic
      C --> C1[Always majruur]:::topic
      A --> D[Nested idaafa]:::subtopic
      D --> D1[Middle nouns can be both mudaf and mudaf ilayhi]:::topic
      A --> R1[No DING agreement requirement between both sides]:::rule
      ${classDefs}`,
    references: [
      { title: 'Possessive Phrases', source: 'tarkib-guide', path: 'apps/tarkib-guide/src/data/content/possessive-phrases.md' },
      { title: 'Mudaf Ilayhi Topic', source: 'nahw-guide', path: 'apps/nahw-navigator/src/data/topics/possessive-prepositional.ts' },
    ],
  },
  shart: {
    titleEn: 'Conditional Sentences Deep Dive',
    titleAr: 'تفصيل جمل الشرط',
    summary: 'Conditional tool, protasis, and apodosis with jazm and connector fa\'.',
    mermaid: `flowchart TD
      A[Conditional Sentence الشرط]:::category --> B[Adat al-shart أداة الشرط]:::subtopic
      A --> C[Fi\'l al-shart فعل الشرط]:::subtopic
      A --> D[Jawab al-shart جواب الشرط]:::subtopic
      D --> D1[May require fa\' rabita]:::topic
      B --> B1[Jazm tools vs non-jazm tools]:::topic
      A --> R1[Check if both verbs are majzuum]:::rule
      A --> R2[Add fa\' when jawab form requires connector]:::rule
      ${classDefs}`,
    references: [
      { title: 'Conditional Sentences', source: 'tarkib-guide', path: 'apps/tarkib-guide/src/data/content/conditional-sentences.md' },
      { title: 'Shart Topic', source: 'nahw-guide', path: 'apps/nahw-navigator/src/data/topics/conditional.ts' },
    ],
  },
  'na-t': {
    titleEn: 'Na\'t Deep Dive',
    titleAr: 'تفصيل النعت',
    summary: 'Adjective agreement system and when adjectives are clause-based.',
    mermaid: `flowchart TD
      A[Na\'t النعت]:::category --> B[Man\'uut المنعوت]:::subtopic
      A --> C[Na\'t adjective]:::subtopic
      A --> R1[DING: Definiteness, I\'rab, Number, Gender]:::rule
      C --> C1[Single-word adjective]:::topic
      C --> C2[Sentence adjective (for indefinite)]:::topic
      A --> R2[Identify phrase boundary before labeling]:::rule
      ${classDefs}`,
    references: [
      { title: 'Descriptive Phrases', source: 'tarkib-guide', path: 'apps/tarkib-guide/src/data/content/descriptive-phrases.md' },
      { title: 'Na\'t Topic', source: 'nahw-guide', path: 'apps/nahw-navigator/src/data/topics/descriptive-demonstrative.ts' },
    ],
  },
  tawkid: {
    titleEn: 'Tawkid Deep Dive',
    titleAr: 'تفصيل التوكيد',
    summary: 'Verbal and semantic emphasis with pronoun-sensitive patterns.',
    mermaid: `flowchart TD
      A[Tawkid التأكيد]:::category --> B[Lafzi لفظي]:::subtopic
      A --> C[Ma\'nawi معنوي]:::subtopic
      B --> B1[Repeat same word/phrase]:::topic
      C --> C1[Nafs / Ayn / Kull + pronoun linkage]:::topic
      A --> R1[Match i\'rab with emphasized word]:::rule
      A --> R2[Attached pronouns use separate emphatic forms]:::rule
      ${classDefs}`,
    references: [
      { title: 'Emphasis Guide', source: 'tarkib-guide', path: 'apps/tarkib-guide/src/data/content/emphasis-guide.md' },
      { title: 'Tawkid Topic', source: 'nahw-guide', path: 'apps/nahw-navigator/src/data/topics/emphasis.ts' },
    ],
  },
};

function escapeLabel(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/"/g, "'")
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mermaidLabel(input: string): string {
  return `["${escapeLabel(input)}"]`;
}

function buildGenericDetail(node: DiagramNode): DetailDiagram {
  const en = node.labelEn;
  const ar = node.labelAr;
  const tip = node.tooltip;

  return {
    nodeId: node.id,
    titleEn: `${node.labelEn} — Detailed Diagram`,
    titleAr: `تفصيل ${node.labelAr}`,
    summary: `Structured breakdown for ${node.labelEn} with role, scope, and analysis steps.`,
    mermaid: `flowchart TD
      A${mermaidLabel(`${en} — ${ar}`)}:::category --> B${mermaidLabel('Definition') }:::subtopic
      A --> C${mermaidLabel('Core Pattern')}:::subtopic
      A --> D${mermaidLabel('Analysis Steps')}:::subtopic
      B --> B1${mermaidLabel(tip)}:::topic
      C --> C1${mermaidLabel('Identify governing relation first')}:::topic
      C --> C2${mermaidLabel("Assign i'rab and role labels")}:::topic
      D --> D1${mermaidLabel('Check agreement and dependencies')}:::rule
      D --> D2${mermaidLabel('Validate with sentence context')}:::rule
      ${classDefs}`,
    references: [
      { title: 'Tarkib Guide Reference', source: 'tarkib-guide', path: 'apps/tarkib-guide/src/data/content/home.md' },
      { title: 'Nahw Guide Reference', source: 'nahw-guide', path: 'apps/nahw-navigator/src/data/topics/index.ts' },
    ],
  };
}

export function getDetailDiagramForNode(node: DiagramNode): DetailDiagram {
  const entry = curated[node.id];
  if (!entry) return buildGenericDetail(node);
  return { nodeId: node.id, ...entry };
}
