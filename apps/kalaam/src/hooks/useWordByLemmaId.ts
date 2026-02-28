import { useState, useEffect } from 'react';
import type { LemmaIndexEntry, WordBatchItem } from '@/types';

const BATCH_SIZE = 479;
const wordCache = new Map<number, WordBatchItem>();
const batchCache = new Map<number, WordBatchItem[]>();

/**
 * Finds a WordBatchItem by lemmaId.
 * Uses the lemma index to determine which batch the word is in,
 * then loads that batch and finds the matching item.
 */
export function useWordByLemmaId(
  lemmaId: number,
  lemmaIndex: LemmaIndexEntry[] | null,
) {
  const [data, setData] = useState<WordBatchItem | null>(
    wordCache.get(lemmaId) ?? null,
  );
  const [loading, setLoading] = useState(!wordCache.has(lemmaId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (wordCache.has(lemmaId)) {
      setData(wordCache.get(lemmaId)!);
      setLoading(false);
      setError(null);
      return;
    }

    if (!lemmaIndex) {
      // Wait for lemma index to be available
      return;
    }

    // Find the position of this lemmaId in the frequency-sorted index
    const position = lemmaIndex.findIndex((entry) => entry.id === lemmaId);
    if (position === -1) {
      setError('Word not found in index');
      setLoading(false);
      return;
    }

    const batchNum = Math.floor(position / BATCH_SIZE);

    setLoading(true);
    setError(null);

    // Check if we already have this batch cached
    if (batchCache.has(batchNum)) {
      const batch = batchCache.get(batchNum)!;
      const word = batch.find((w) => w.lemmaId === lemmaId);
      if (word) {
        wordCache.set(lemmaId, word);
        setData(word);
      } else {
        setError('Word not found in batch');
      }
      setLoading(false);
      return;
    }

    fetch(`/data/words/batch-${batchNum}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<WordBatchItem[]>;
      })
      .then((batch) => {
        batchCache.set(batchNum, batch);
        const word = batch.find((w) => w.lemmaId === lemmaId);
        if (word) {
          wordCache.set(lemmaId, word);
          setData(word);
        } else {
          setError('Word not found in batch');
        }
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, [lemmaId, lemmaIndex]);

  return { data, loading, error };
}
