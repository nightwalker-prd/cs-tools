/**
 * One-time generator script: fetches ayah→page mapping from Quran.com API
 * and writes the static data file.
 *
 * Usage: npx tsx apps/hafiz/scripts/generate-page-map.ts
 */

const API_BASE = 'https://api.quran.com/api/v4';

// Ayah counts per surah (1-indexed)
const SURAH_AYAH_COUNTS = [
  0, 7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99,
  128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30,
  73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
  60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52,
  52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17,
  19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7,
  3, 6, 3, 5, 4, 5, 6,
];

interface VerseResponse {
  verses: Array<{
    verse_key: string;
    page_number: number;
  }>;
  pagination: {
    total_pages: number;
    current_page: number;
  };
}

async function fetchSurahPages(surahNumber: number): Promise<Map<number, number>> {
  const ayahPages = new Map<number, number>();
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${API_BASE}/verses/by_chapter/${surahNumber}?page=${page}&per_page=50&fields=page_number`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error for surah ${surahNumber} page ${page}: ${response.status}`);
    }
    const data: VerseResponse = await response.json();
    totalPages = data.pagination.total_pages;

    for (const verse of data.verses) {
      const [, ayahStr] = verse.verse_key.split(':');
      ayahPages.set(Number(ayahStr), verse.page_number);
    }

    page++;
    // Rate limiting
    await new Promise(r => setTimeout(r, 100));
  }

  return ayahPages;
}

async function main() {
  console.log('Fetching ayah→page mapping from Quran.com API...');

  const allPages: number[][] = [[]]; // Index 0 is empty (surahs are 1-indexed)

  for (let surah = 1; surah <= 114; surah++) {
    console.log(`  Surah ${surah}/114...`);
    const ayahPages = await fetchSurahPages(surah);

    const surahArr = [0]; // ayah 0 placeholder
    for (let ayah = 1; ayah <= SURAH_AYAH_COUNTS[surah]; ayah++) {
      surahArr.push(ayahPages.get(ayah) ?? 0);
    }
    allPages.push(surahArr);
  }

  // Generate TypeScript output
  let output = `/**
 * Static ayah→page mapping for the standard Medina Mushaf (604 pages).
 * Generated from Quran.com API. Do not edit manually.
 *
 * AYAH_PAGES[surahNumber][ayahNumber] = pageNumber
 * Both surah and ayah are 1-indexed. Index 0 in each array is unused.
 */

import { expandRubToAyahs } from '@arabtools/data';

export const AYAH_PAGES: number[][] = [\n`;

  for (let s = 0; s < allPages.length; s++) {
    if (s === 0) {
      output += '  [],\n';
    } else {
      output += `  [${allPages[s].join(',')}],\n`;
    }
  }

  output += `];

export function getPageForAyah(surah: number, ayah: number): number {
  return AYAH_PAGES[surah]?.[ayah] ?? 0;
}

export function getPagesForRub(rubId: number): number[] {
  const ayahs = expandRubToAyahs(rubId);
  const pageSet = new Set<number>();
  for (const { surah, ayah } of ayahs) {
    const page = getPageForAyah(surah, ayah);
    if (page > 0) pageSet.add(page);
  }
  return Array.from(pageSet).sort((a, b) => a - b);
}
`;

  const fs = await import('fs');
  const path = await import('path');
  const outPath = path.resolve(import.meta.dirname, '../src/data/ayah-page-map.ts');
  fs.writeFileSync(outPath, output);
  console.log(`Written to ${outPath}`);
}

main().catch(console.error);
