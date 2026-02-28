/**
 * Calculate content overlap between two Arabic texts using Jaccard similarity.
 * Normalizes Arabic (removes diacritics), tokenizes, and computes word-set overlap.
 */

const DIACRITICS_RE = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g;

function normalizeArabic(text: string): string {
  return text
    .replace(DIACRITICS_RE, '')
    .replace(/[\u0622\u0623\u0625]/g, '\u0627') // normalize alef variants
    .replace(/\u0629/g, '\u0647')                // taa marbouta → haa
    .trim()
    .toLowerCase();
}

function tokenize(text: string): Set<string> {
  const normalized = normalizeArabic(text);
  const words = normalized.split(/\s+/).filter(w => w.length > 0);
  return new Set(words);
}

export function calculateOverlap(textA: string, textB: string): number {
  const setA = tokenize(textA);
  const setB = tokenize(textB);

  if (setA.size === 0 && setB.size === 0) return 100;
  if (setA.size === 0 || setB.size === 0) return 0;

  let intersection = 0;
  for (const word of setA) {
    if (setB.has(word)) intersection++;
  }

  const union = new Set([...setA, ...setB]).size;
  return Math.round((intersection / union) * 100);
}
