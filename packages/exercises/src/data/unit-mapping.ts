/** Maps FSTU book page ranges to curriculum units */
export const UNIT_MAPPING: {
  unit: number;
  title: string;
  pageStart: number;
  pageEnd: number;
}[] = [
  { unit: 1, title: 'Words & Nouns', pageStart: 15, pageEnd: 59 },
  { unit: 2, title: 'Sentences & Verbs', pageStart: 61, pageEnd: 134 },
  { unit: 3, title: 'Phrases', pageStart: 135, pageEnd: 295 },
  { unit: 4, title: 'Pronouns & Emphasis', pageStart: 296, pageEnd: 416 },
  { unit: 5, title: 'Advanced Topics', pageStart: 417, pageEnd: 602 },
];

export function getUnitForPages(start: number): number {
  for (const m of UNIT_MAPPING) {
    if (start >= m.pageStart && start <= m.pageEnd) return m.unit;
  }
  return 5; // fallback to advanced
}
