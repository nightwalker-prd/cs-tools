import type { ExerciseSet } from '../types';

export const complexityExercises: ExerciseSet = {
  id: 'complexity',
  title: 'Time & Space Complexity',
  description: 'Exercises on Big-O analysis, time and space complexity of algorithms and data structures.',
  questions: [
    {
      id: 'cx-1',
      type: 'multiple-choice',
      question: 'What is the time complexity of this code?',
      codeSnippet: `for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log(i, j);
  }
}`,
      language: 'javascript',
      options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
      answer: 'O(n^2)',
      explanation: 'Two nested loops each running n times gives n * n = O(n^2) iterations.',
      difficulty: 'easy',
      tags: ['complexity'],
    },
    {
      id: 'cx-2',
      type: 'multiple-choice',
      question: 'What is the time complexity of binary search?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 'O(log n)',
      explanation: 'Binary search halves the search space each iteration, giving O(log n) time complexity.',
      difficulty: 'easy',
      tags: ['complexity', 'searching'],
    },
    {
      id: 'cx-3',
      type: 'trace-output',
      question: 'How many times does the inner operation execute?',
      codeSnippet: `for (let i = 1; i < n; i *= 2) {
  doSomething();
}`,
      language: 'javascript',
      answer: 'O(log n)',
      explanation: 'The loop variable doubles each iteration (1, 2, 4, 8, ...), so it takes log2(n) iterations to reach n.',
      difficulty: 'easy',
      tags: ['complexity'],
    },
    {
      id: 'cx-4',
      type: 'multiple-choice',
      question: 'What is the space complexity of a recursive Fibonacci implementation without memoization?',
      options: ['O(1)', 'O(n)', 'O(n^2)', 'O(2^n)'],
      answer: 'O(n)',
      explanation: 'The call stack goes at most n levels deep. While there are O(2^n) total calls, only O(n) are on the stack simultaneously.',
      difficulty: 'medium',
      tags: ['complexity', 'recursion'],
    },
    {
      id: 'cx-5',
      type: 'complexity-match',
      question: 'Match each operation to its time complexity in a hash table (average case):',
      options: ['Search: O(1)', 'Insert: O(1)', 'Delete: O(1)', 'Find min: O(n)'],
      answer: ['Search: O(1)', 'Insert: O(1)', 'Delete: O(1)', 'Find min: O(n)'],
      explanation: 'Hash tables provide O(1) average for search, insert, delete. Finding the minimum requires scanning all elements: O(n).',
      difficulty: 'medium',
      tags: ['complexity', 'hash-tables'],
    },
    {
      id: 'cx-6',
      type: 'multiple-choice',
      question: 'What is the time complexity of this code?',
      codeSnippet: `for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
    console.log(i, j);
  }
}`,
      language: 'javascript',
      options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(n^3)'],
      answer: 'O(n^2)',
      explanation: 'The inner loop runs n-i times for each i. Total iterations: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n^2).',
      difficulty: 'medium',
      tags: ['complexity'],
    },
    {
      id: 'cx-7',
      type: 'multiple-choice',
      question: 'Which Big-O expression dominates as n grows large?',
      options: ['O(n^2)', 'O(2^n)', 'O(n!)', 'O(n^3)'],
      answer: 'O(n!)',
      explanation: 'Growth rate order: O(n^2) < O(n^3) < O(2^n) < O(n!). Factorial grows faster than exponential for large n.',
      difficulty: 'medium',
      tags: ['complexity'],
    },
    {
      id: 'cx-8',
      type: 'multiple-choice',
      question: 'What is the amortized time complexity of appending to a dynamic array?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      answer: 'O(1)',
      explanation: 'While individual resizes are O(n), they happen rarely (when capacity doubles). Amortized over n operations, each append is O(1).',
      difficulty: 'medium',
      tags: ['complexity', 'data-structures'],
    },
    {
      id: 'cx-9',
      type: 'trace-output',
      question: 'What is the time complexity of this recursive function?',
      codeSnippet: `function foo(n) {
  if (n <= 1) return;
  foo(n / 2);
  foo(n / 2);
}`,
      language: 'javascript',
      answer: 'O(n)',
      explanation: 'By the Master theorem: T(n) = 2T(n/2) + O(1). Here a=2, b=2, c=0 (no work outside recursion). Since log_b(a) = 1 > 0, T(n) = O(n^1) = O(n).',
      difficulty: 'hard',
      tags: ['complexity', 'recursion'],
    },
    {
      id: 'cx-10',
      type: 'multiple-choice',
      question: 'Building a heap from an unsorted array takes:',
      options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
      answer: 'O(n)',
      explanation: 'Build-heap (heapify from bottom up) is O(n), not O(n log n). This is because most nodes are near the bottom and require few swaps.',
      difficulty: 'hard',
      tags: ['complexity', 'data-structures'],
    },
  ],
};
