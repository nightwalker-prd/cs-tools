import type { WordDictionary } from '../types';

let _cache: Record<string, string> | null = null;
let _promise: Promise<Record<string, string>> | null = null;

export async function loadDictionary(): Promise<Record<string, string>> {
  if (_cache) return _cache;
  if (_promise) return _promise;

  _promise = fetch('/data/dictionary.json')
    .then(res => res.json())
    .then((data: WordDictionary) => {
      _cache = data.entries;
      return _cache;
    })
    .catch(() => {
      _promise = null;
      return {};
    });

  return _promise;
}
