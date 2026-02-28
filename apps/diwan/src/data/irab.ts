import type { PoemIrab } from '../types';

const _cache = new Map<string, PoemIrab[]>();
const _promises = new Map<string, Promise<PoemIrab[]>>();

export async function loadIrabByPoet(poetId: string): Promise<PoemIrab[]> {
  const cached = _cache.get(poetId);
  if (cached) return cached;

  const pending = _promises.get(poetId);
  if (pending) return pending;

  const promise = fetch(`/data/irab/${poetId}.json`)
    .then(res => res.json())
    .then((data: PoemIrab[]) => {
      _cache.set(poetId, data);
      _promises.delete(poetId);
      return data;
    })
    .catch(() => {
      _promises.delete(poetId);
      return [];
    });

  _promises.set(poetId, promise);
  return promise;
}

export function getIrabForPoem(allIrab: PoemIrab[], poemId: string): PoemIrab | undefined {
  return allIrab.find(p => p.poemId === poemId);
}
