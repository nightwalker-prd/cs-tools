import type { ExerciseQuestion } from '@cstools/exercises/types';

export const sampleQuestions: ExerciseQuestion[] = [
  {
    id: 'trace-1',
    type: 'trace-output',
    question: 'What is the output of this code?',
    codeSnippet: `const arr = [3, 1, 4, 1, 5];
arr.sort((a, b) => a - b);
console.log(arr[2]);`,
    language: 'javascript',
    answer: '3',
    explanation: 'After sorting [3,1,4,1,5] ascending, we get [1,1,3,4,5]. Index 2 is 3.',
    hints: ['Think about what .sort() does with the comparator function'],
    difficulty: 'easy',
    tags: ['sorting', 'data-structures'],
  },
  {
    id: 'complexity-1',
    type: 'complexity-match',
    question: 'What is the time complexity of binary search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    answer: 'O(log n)',
    explanation: 'Binary search halves the search space with each comparison, giving O(log n) time complexity.',
    difficulty: 'easy',
    tags: ['complexity', 'searching'],
  },
  {
    id: 'mc-1',
    type: 'multiple-choice',
    question: 'Which data structure uses LIFO (Last In, First Out) ordering?',
    options: ['Queue', 'Stack', 'Linked List', 'Hash Table'],
    answer: 'Stack',
    explanation: 'A Stack follows LIFO ordering — the last element pushed is the first one popped.',
    difficulty: 'easy',
    tags: ['data-structures'],
  },
  {
    id: 'trace-2',
    type: 'trace-output',
    question: 'What does this function return for input 5?',
    codeSnippet: `function mystery(n) {
  if (n <= 1) return n;
  return mystery(n - 1) + mystery(n - 2);
}
console.log(mystery(5));`,
    language: 'javascript',
    answer: '5',
    explanation: 'This is the Fibonacci function. fib(5) = fib(4) + fib(3) = 3 + 2 = 5.',
    hints: ['This is a well-known recursive sequence'],
    difficulty: 'medium',
    tags: ['recursion', 'dynamic-programming'],
  },
  {
    id: 'complexity-2',
    type: 'complexity-match',
    question: 'What is the worst-case time complexity of QuickSort?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
    answer: 'O(n^2)',
    explanation: 'QuickSort degrades to O(n^2) when the pivot is consistently the smallest or largest element (already sorted array with first/last element as pivot).',
    difficulty: 'medium',
    tags: ['complexity', 'sorting'],
  },
  {
    id: 'mc-2',
    type: 'multiple-choice',
    question: 'In a min-heap, where is the smallest element?',
    options: ['At any leaf node', 'At the root', 'At the last position', 'It could be anywhere'],
    answer: 'At the root',
    explanation: 'In a min-heap, the parent is always smaller than its children, so the smallest element is always at the root.',
    difficulty: 'easy',
    tags: ['data-structures', 'trees'],
  },
  {
    id: 'code-fix-1',
    type: 'code-fix',
    question: 'This binary search has a bug. What should the condition be?',
    codeSnippet: `function binarySearch(arr, target) {
  let left = 0, right = arr.length;
  while (left < right) {  // Bug is here
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    language: 'javascript',
    answer: 'left <= right',
    explanation: 'The condition should be left <= right (inclusive) because when left === right, we still need to check that element. Also, right should be initialized to arr.length - 1.',
    hints: ['What happens when there is exactly one element left to check?'],
    difficulty: 'medium',
    tags: ['searching', 'data-structures'],
  },
  {
    id: 'mc-3',
    type: 'multiple-choice',
    question: 'Which traversal of a BST gives elements in sorted order?',
    options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
    answer: 'In-order',
    explanation: 'In-order traversal (left, root, right) of a BST visits nodes in ascending sorted order.',
    difficulty: 'easy',
    tags: ['trees', 'data-structures'],
  },
  {
    id: 'complexity-3',
    type: 'complexity-match',
    question: 'What is the time complexity of inserting at the beginning of an array?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    answer: 'O(n)',
    explanation: 'Inserting at the beginning requires shifting all existing elements one position to the right, taking O(n) time.',
    difficulty: 'easy',
    tags: ['complexity', 'data-structures'],
  },
  {
    id: 'mc-4',
    type: 'multiple-choice',
    question: 'What approach does Dijkstra\'s algorithm use?',
    options: ['Dynamic Programming', 'Greedy', 'Divide and Conquer', 'Backtracking'],
    answer: 'Greedy',
    explanation: 'Dijkstra\'s algorithm uses a greedy approach, always selecting the unvisited vertex with the smallest tentative distance.',
    difficulty: 'medium',
    tags: ['graphs', 'searching'],
  },
];
