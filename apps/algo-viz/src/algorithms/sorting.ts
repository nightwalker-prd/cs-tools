export interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  description: string;
  line: number;
}

export function bubbleSort(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], description: 'Initial array', line: 0 });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...arr], comparing: [j, j + 1], swapping: [], sorted: [...sorted], description: `Compare ${arr[j]} and ${arr[j + 1]}`, line: 3 });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ array: [...arr], comparing: [], swapping: [j, j + 1], sorted: [...sorted], description: `Swap ${arr[j + 1]} and ${arr[j]}`, line: 4 });
      }
    }
    sorted.unshift(n - 1 - i);
  }
  sorted.unshift(0);
  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), description: 'Array is sorted!', line: 7 });
  return steps;
}

export function insertionSort(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [0], description: 'First element is trivially sorted', line: 0 });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    steps.push({ array: [...arr], comparing: [i], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), description: `Pick element ${key} at index ${i}`, line: 2 });

    while (j >= 0 && arr[j] > key) {
      steps.push({ array: [...arr], comparing: [j, j + 1], swapping: [], sorted: [], description: `Compare ${arr[j]} > ${key}`, line: 4 });
      arr[j + 1] = arr[j];
      steps.push({ array: [...arr], comparing: [], swapping: [j, j + 1], sorted: [], description: `Shift ${arr[j]} right`, line: 5 });
      j--;
    }
    arr[j + 1] = key;
    steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: i + 1 }, (_, k) => k), description: `Insert ${key} at position ${j + 1}`, line: 7 });
  }

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), description: 'Array is sorted!', line: 8 });
  return steps;
}

export function selectionSort(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], description: 'Initial array', line: 0 });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ array: [...arr], comparing: [i], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), description: `Find minimum starting from index ${i}`, line: 2 });

    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...arr], comparing: [minIdx, j], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), description: `Compare ${arr[minIdx]} with ${arr[j]}`, line: 4 });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ array: [...arr], comparing: [], swapping: [i, minIdx], sorted: Array.from({ length: i }, (_, k) => k), description: `Swap ${arr[minIdx]} and ${arr[i]}`, line: 7 });
    }
  }

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), description: 'Array is sorted!', line: 9 });
  return steps;
}

export function mergeSort(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], description: 'Initial array', line: 0 });

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    steps.push({ array: [...arr], comparing: Array.from({ length: right - left + 1 }, (_, idx) => left + idx), swapping: [], sorted: [], description: `Merge subarrays [${left}..${mid}] and [${mid + 1}..${right}]`, line: 3 });

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      steps.push({ array: [...arr], comparing: [], swapping: [k], sorted: [], description: `Place ${arr[k]} at position ${k}`, line: 5 });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({ array: [...arr], comparing: [], swapping: [k], sorted: [], description: `Place remaining ${arr[k]}`, line: 8 });
      i++; k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({ array: [...arr], comparing: [], swapping: [k], sorted: [], description: `Place remaining ${arr[k]}`, line: 10 });
      j++; k++;
    }
  }

  function sort(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      sort(left, mid);
      sort(mid + 1, right);
      merge(left, mid, right);
    }
  }

  sort(0, arr.length - 1);
  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: arr.length }, (_, i) => i), description: 'Array is sorted!', line: 12 });
  return steps;
}

export function quickSort(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], description: 'Initial array', line: 0 });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    steps.push({ array: [...arr], comparing: [high], swapping: [], sorted: [], description: `Pivot = ${pivot} at index ${high}`, line: 2 });
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({ array: [...arr], comparing: [j, high], swapping: [], sorted: [], description: `Compare ${arr[j]} with pivot ${pivot}`, line: 4 });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ array: [...arr], comparing: [], swapping: [i, j], sorted: [], description: `Swap ${arr[j]} and ${arr[i]}`, line: 6 });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ array: [...arr], comparing: [], swapping: [i + 1, high], sorted: [], description: `Place pivot ${pivot} at position ${i + 1}`, line: 8 });
    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, arr.length - 1);
  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: Array.from({ length: arr.length }, (_, i) => i), description: 'Array is sorted!', line: 10 });
  return steps;
}

export const SORTING_ALGORITHMS = {
  bubble: { name: 'Bubble Sort', fn: bubbleSort, time: { best: 'O(n)', average: 'O(n\u00B2)', worst: 'O(n\u00B2)' }, space: 'O(1)', stable: true },
  insertion: { name: 'Insertion Sort', fn: insertionSort, time: { best: 'O(n)', average: 'O(n\u00B2)', worst: 'O(n\u00B2)' }, space: 'O(1)', stable: true },
  selection: { name: 'Selection Sort', fn: selectionSort, time: { best: 'O(n\u00B2)', average: 'O(n\u00B2)', worst: 'O(n\u00B2)' }, space: 'O(1)', stable: false },
  merge: { name: 'Merge Sort', fn: mergeSort, time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' }, space: 'O(n)', stable: true },
  quick: { name: 'Quick Sort', fn: quickSort, time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n\u00B2)' }, space: 'O(log n)', stable: false },
};

export const SORTING_PSEUDOCODE: Record<string, string[]> = {
  bubble: [
    'function bubbleSort(arr):',
    '  for i from 0 to n-2:',
    '    for j from 0 to n-i-2:',
    '      if arr[j] > arr[j+1]:',
    '        swap(arr[j], arr[j+1])',
    '    // Largest element bubbled to end',
    '  // Array is now sorted',
    '  return arr',
  ],
  insertion: [
    'function insertionSort(arr):',
    '  for i from 1 to n-1:',
    '    key = arr[i]',
    '    j = i - 1',
    '    while j >= 0 and arr[j] > key:',
    '      arr[j+1] = arr[j]',
    '      j = j - 1',
    '    arr[j+1] = key',
    '  return arr',
  ],
  selection: [
    'function selectionSort(arr):',
    '  for i from 0 to n-2:',
    '    minIdx = i',
    '    for j from i+1 to n-1:',
    '      if arr[j] < arr[minIdx]:',
    '        minIdx = j',
    '    if minIdx != i:',
    '      swap(arr[i], arr[minIdx])',
    '  // Array is now sorted',
    '  return arr',
  ],
  merge: [
    'function mergeSort(arr, left, right):',
    '  if left < right:',
    '    mid = (left + right) / 2',
    '    mergeSort(arr, left, mid)',
    '    mergeSort(arr, mid+1, right)',
    '    merge(arr, left, mid, right)',
    '',
    'function merge(arr, left, mid, right):',
    '  copy left and right subarrays',
    '  merge back in sorted order',
    '  copy remaining elements',
    '',
    '  // Merged subarray is sorted',
  ],
  quick: [
    'function quickSort(arr, low, high):',
    '  if low < high:',
    '    pi = partition(arr, low, high)',
    '    quickSort(arr, low, pi-1)',
    '    quickSort(arr, pi+1, high)',
    '',
    'function partition(arr, low, high):',
    '  pivot = arr[high]',
    '  i = low - 1',
    '  for j from low to high-1:',
    '    if arr[j] < pivot:',
    '      i++; swap(arr[i], arr[j])',
    '  swap(arr[i+1], arr[high])',
    '  return i + 1',
  ],
};
