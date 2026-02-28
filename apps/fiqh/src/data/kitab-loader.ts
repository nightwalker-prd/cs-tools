import type { KitabMeta, Kitab, FiqhTerm, FiqhTopic } from '../types';

// ─── Index (loaded once at startup) ───
let _index: KitabMeta[] = [];
let _indexLoaded = false;
let _indexPromise: Promise<KitabMeta[]> | null = null;

export function getKitabIndex(): KitabMeta[] {
  return _index;
}

export async function loadKitabIndex(): Promise<KitabMeta[]> {
  if (_indexLoaded) return _index;
  if (_indexPromise) return _indexPromise;

  _indexPromise = fetch('/data/index.json')
    .then(res => res.json())
    .then((data: KitabMeta[]) => {
      _index = data;
      _indexLoaded = true;
      return data;
    });

  return _indexPromise;
}

// ─── Per-kitab data (lazy-loaded, cached) ───
const kitabCache = new Map<string, Kitab>();

export async function loadKitab(id: string): Promise<Kitab | undefined> {
  const cached = kitabCache.get(id);
  if (cached) return cached;

  try {
    const res = await fetch(`/data/kitab/${id}.json`);
    if (!res.ok) return undefined;
    const kitab: Kitab = await res.json();
    kitabCache.set(id, kitab);
    return kitab;
  } catch {
    return undefined;
  }
}

// ─── Terms (loaded once) ───
let _terms: FiqhTerm[] = [];
let _termsLoaded = false;
let _termsPromise: Promise<FiqhTerm[]> | null = null;

export function getTerms(): FiqhTerm[] {
  return _terms;
}

export async function loadTerms(): Promise<FiqhTerm[]> {
  if (_termsLoaded) return _terms;
  if (_termsPromise) return _termsPromise;

  _termsPromise = fetch('/data/terms.json')
    .then(res => res.json())
    .then((data: FiqhTerm[]) => {
      _terms = data;
      _termsLoaded = true;
      return data;
    });

  return _termsPromise;
}

// ─── Topics index (loaded once) ───
let _topics: FiqhTopic[] = [];
let _topicsLoaded = false;
let _topicsPromise: Promise<FiqhTopic[]> | null = null;

export function getTopics(): FiqhTopic[] {
  return _topics;
}

export async function loadTopics(): Promise<FiqhTopic[]> {
  if (_topicsLoaded) return _topics;
  if (_topicsPromise) return _topicsPromise;

  _topicsPromise = fetch('/data/topics/topics-index.json')
    .then(res => res.json())
    .then((data: FiqhTopic[]) => {
      _topics = data;
      _topicsLoaded = true;
      return data;
    });

  return _topicsPromise;
}

// ─── Helpers ───
export function getKitabMeta(id: string): KitabMeta | undefined {
  return _index.find(k => k.id === id);
}
