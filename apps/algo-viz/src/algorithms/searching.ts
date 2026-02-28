export interface SearchStep {
  array: number[];
  left: number;
  right: number;
  mid: number;
  target: number;
  found: boolean;
  description: string;
  line: number;
}

export function binarySearch(input: number[], target: number): SearchStep[] {
  const arr = [...input].sort((a, b) => a - b);
  const steps: SearchStep[] = [];
  let left = 0, right = arr.length - 1;

  steps.push({ array: arr, left, right, mid: -1, target, found: false, description: `Search for ${target} in sorted array`, line: 0 });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({ array: arr, left, right, mid, target, found: false, description: `Check middle element arr[${mid}] = ${arr[mid]}`, line: 3 });

    if (arr[mid] === target) {
      steps.push({ array: arr, left, right, mid, target, found: true, description: `Found ${target} at index ${mid}!`, line: 4 });
      return steps;
    } else if (arr[mid] < target) {
      left = mid + 1;
      steps.push({ array: arr, left, right, mid, target, found: false, description: `${arr[mid]} < ${target}, search right half`, line: 6 });
    } else {
      right = mid - 1;
      steps.push({ array: arr, left, right, mid, target, found: false, description: `${arr[mid]} > ${target}, search left half`, line: 8 });
    }
  }

  steps.push({ array: arr, left, right, mid: -1, target, found: false, description: `${target} not found in array`, line: 10 });
  return steps;
}

export const SEARCH_PSEUDOCODE = {
  binary: [
    'function binarySearch(arr, target):',
    '  left = 0, right = n - 1',
    '  while left <= right:',
    '    mid = (left + right) / 2',
    '    if arr[mid] == target:',
    '      return mid',
    '    else if arr[mid] < target:',
    '      left = mid + 1',
    '    else:',
    '      right = mid - 1',
    '  return -1  // not found',
  ],
};
