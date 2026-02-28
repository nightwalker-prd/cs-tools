import { useMemo } from 'react';
import { testTypes, categories, type TestTypeInfo } from '../components/test-config/constants';

export interface TestSearchResult {
  testType: TestTypeInfo;
  categoryName: string;
}

// Build a lookup: testType -> category name
const typeToCategoryName: Record<string, string> = {};
for (const cat of categories) {
  for (const t of cat.types) {
    typeToCategoryName[t] = cat.name;
  }
}

export function useTestSearch(query: string): TestSearchResult[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const results: TestSearchResult[] = [];
    for (const tt of testTypes) {
      const catName = typeToCategoryName[tt.type] || '';
      const haystack = `${tt.name} ${tt.description} ${catName}`.toLowerCase();
      if (haystack.includes(q)) {
        results.push({ testType: tt, categoryName: catName });
        if (results.length >= 10) break;
      }
    }
    return results;
  }, [query]);
}
