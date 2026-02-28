import type { Poem, PoemMeta } from '../../types';

// Lightweight poem index loaded once at startup (no verses/translations)
let _poemIndex: PoemMeta[] = [];
let _indexLoaded = false;
let _indexPromise: Promise<PoemMeta[]> | null = null;

export function getPoemIndex(): PoemMeta[] {
  return _poemIndex;
}

export async function loadPoemIndex(): Promise<PoemMeta[]> {
  if (_indexLoaded) return _poemIndex;
  if (_indexPromise) return _indexPromise;

  _indexPromise = fetch('/data/poems/_index.json')
    .then(res => res.json())
    .then((data: PoemMeta[]) => {
      _poemIndex = data;
      _indexLoaded = true;
      return data;
    });

  return _indexPromise;
}

// Per-poet poem cache
const cache = new Map<string, Poem[]>();

export async function loadPoemsByPoet(poetId: string): Promise<Poem[]> {
  const cached = cache.get(poetId);
  if (cached) return cached;

  try {
    const res = await fetch(`/data/poems/${poetId}.json`);
    if (!res.ok) return [];
    const poems: Poem[] = await res.json();
    cache.set(poetId, poems);
    return poems;
  } catch {
    return [];
  }
}

export async function loadPoemById(id: string): Promise<Poem | undefined> {
  // Extract poetId from poem id (e.g. "mutanabbi-01" -> "mutanabbi")
  const poetId = id.replace(/-\d+$/, '');
  const poems = await loadPoemsByPoet(poetId);
  return poems.find(p => p.id === id);
}

// Helper to get poem count per poet from the index (sync, after index loaded)
export function getPoemCountByPoet(poetId: string): number {
  return _poemIndex.filter(p => p.poetId === poetId).length;
}

// Helper to get poem metadata by poet (sync, after index loaded)
export function getPoemMetaByPoet(poetId: string): PoemMeta[] {
  return _poemIndex.filter(p => p.poetId === poetId);
}
