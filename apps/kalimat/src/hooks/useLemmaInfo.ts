import { useState, useRef, useCallback } from 'react';

type EtymologyMap = Record<number, string>;
export type ContextEntry = { ref: string; before: string; match: string; after: string; ar?: string };
type ContextMap = Record<number, ContextEntry[]>;

const chunkImports: Record<number, () => Promise<{ [key: string]: EtymologyMap }>> = {
  0: () => import('@/data/lemma-etymology/chunk-0'),
  1: () => import('@/data/lemma-etymology/chunk-1'),
  2: () => import('@/data/lemma-etymology/chunk-2'),
  3: () => import('@/data/lemma-etymology/chunk-3'),
  4: () => import('@/data/lemma-etymology/chunk-4'),
  5: () => import('@/data/lemma-etymology/chunk-5'),
  6: () => import('@/data/lemma-etymology/chunk-6'),
  7: () => import('@/data/lemma-etymology/chunk-7'),
  8: () => import('@/data/lemma-etymology/chunk-8'),
  9: () => import('@/data/lemma-etymology/chunk-9'),
};

const contextImports: Record<number, () => Promise<{ [key: string]: ContextMap }>> = {
  0: () => import('@/data/lemma-context/chunk-0'),
  1: () => import('@/data/lemma-context/chunk-1'),
  2: () => import('@/data/lemma-context/chunk-2'),
  3: () => import('@/data/lemma-context/chunk-3'),
  4: () => import('@/data/lemma-context/chunk-4'),
  5: () => import('@/data/lemma-context/chunk-5'),
  6: () => import('@/data/lemma-context/chunk-6'),
  7: () => import('@/data/lemma-context/chunk-7'),
  8: () => import('@/data/lemma-context/chunk-8'),
  9: () => import('@/data/lemma-context/chunk-9'),
};

const CHUNK_SIZE = 479; // ~4784/10

function getChunkIndex(lemmaId: number): number {
  // lemmaId is 1-based from the DB
  return Math.min(Math.floor((lemmaId - 1) / CHUNK_SIZE), 9);
}

export function useLemmaInfo() {
  const loadedChunks = useRef<Map<number, EtymologyMap>>(new Map());
  const loadedContextChunks = useRef<Map<number, ContextMap>>(new Map());
  const [loading, setLoading] = useState(false);

  const getEtymology = useCallback(async (lemmaId: number): Promise<string | null> => {
    const chunkIdx = getChunkIndex(lemmaId);

    if (loadedChunks.current.has(chunkIdx)) {
      return loadedChunks.current.get(chunkIdx)![lemmaId] ?? null;
    }

    setLoading(true);
    try {
      const mod = await chunkImports[chunkIdx]();
      const chunkKey = `etymologyChunk${chunkIdx}`;
      const data = mod[chunkKey] as EtymologyMap;
      loadedChunks.current.set(chunkIdx, data);
      return data[lemmaId] ?? null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getContext = useCallback(async (lemmaId: number): Promise<ContextEntry[] | null> => {
    const chunkIdx = getChunkIndex(lemmaId);

    if (loadedContextChunks.current.has(chunkIdx)) {
      return loadedContextChunks.current.get(chunkIdx)![lemmaId] ?? null;
    }

    try {
      const mod = await contextImports[chunkIdx]();
      const chunkKey = `contextChunk${chunkIdx}`;
      const data = mod[chunkKey] as ContextMap;
      loadedContextChunks.current.set(chunkIdx, data);
      return data[lemmaId] ?? null;
    } catch {
      return null;
    }
  }, []);

  return { getEtymology, getContext, loading };
}
