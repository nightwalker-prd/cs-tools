import type { Algorithm } from '../types';

export const bubbleSort: Algorithm = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'sorting',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
  spaceComplexity: 'O(1)',
  pseudocode: [
    'for i = 0 to n-1:',
    '  for j = 0 to n-i-2:',
    '    if arr[j] > arr[j+1]:',
    '      swap(arr[j], arr[j+1])',
  ],
  keyPoints: [
    'Stable sorting algorithm',
    'In-place algorithm (O(1) extra space)',
    'Best case O(n) when array is already sorted (with early termination)',
    'Rarely used in practice due to poor performance',
  ],
};

export const insertionSort: Algorithm = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'sorting',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'Builds the sorted array one element at a time by repeatedly picking the next element and inserting it into its correct position among the previously sorted elements.',
  timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
  spaceComplexity: 'O(1)',
  pseudocode: [
    'for i = 1 to n-1:',
    '  key = arr[i]',
    '  j = i - 1',
    '  while j >= 0 and arr[j] > key:',
    '    arr[j+1] = arr[j]',
    '    j = j - 1',
    '  arr[j+1] = key',
  ],
  keyPoints: [
    'Stable sorting algorithm',
    'In-place algorithm',
    'Efficient for small datasets and nearly sorted arrays',
    'Used as the base case in hybrid sorting algorithms like Timsort',
  ],
};

export const mergeSort: Algorithm = {
  id: 'merge-sort',
  name: 'Merge Sort',
  category: 'sorting',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Divides the array into halves, recursively sorts each half, then merges the two sorted halves back together. A classic divide-and-conquer algorithm.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  spaceComplexity: 'O(n)',
  pseudocode: [
    'mergeSort(arr, left, right):',
    '  if left < right:',
    '    mid = (left + right) / 2',
    '    mergeSort(arr, left, mid)',
    '    mergeSort(arr, mid+1, right)',
    '    merge(arr, left, mid, right)',
  ],
  keyPoints: [
    'Stable sorting algorithm',
    'Guaranteed O(n log n) time complexity',
    'Requires O(n) additional space',
    'Well-suited for linked lists (can be done in-place)',
    'Used in external sorting for large datasets',
  ],
};

export const quickSort: Algorithm = {
  id: 'quick-sort',
  name: 'Quick Sort',
  category: 'sorting',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Selects a pivot element and partitions the array around it so that elements less than the pivot come before it and elements greater come after. Recursively sorts the sub-arrays.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
  spaceComplexity: 'O(log n)',
  pseudocode: [
    'quickSort(arr, low, high):',
    '  if low < high:',
    '    pivotIndex = partition(arr, low, high)',
    '    quickSort(arr, low, pivotIndex - 1)',
    '    quickSort(arr, pivotIndex + 1, high)',
  ],
  keyPoints: [
    'Not stable (relative order of equal elements may change)',
    'In-place with O(log n) stack space',
    'Average case O(n log n), worst case O(n^2) with poor pivot selection',
    'Randomized pivot selection avoids worst case in practice',
    'Generally fastest comparison-based sort in practice',
  ],
};

export const heapSort: Algorithm = {
  id: 'heap-sort',
  name: 'Heap Sort',
  category: 'sorting',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Builds a max-heap from the array, then repeatedly extracts the maximum element and places it at the end of the sorted portion.',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  spaceComplexity: 'O(1)',
  pseudocode: [
    'buildMaxHeap(arr)',
    'for i = n-1 down to 1:',
    '  swap(arr[0], arr[i])',
    '  heapify(arr, 0, i)',
  ],
  keyPoints: [
    'Not stable',
    'In-place with O(1) extra space',
    'Guaranteed O(n log n) regardless of input',
    'Poor cache locality compared to quicksort',
    'Useful when worst-case guarantee is needed without extra memory',
  ],
};

export const sortingAlgorithms: Algorithm[] = [
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
];
