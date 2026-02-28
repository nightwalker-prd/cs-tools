import type { ExerciseSet } from '../types';

export const sortingExercises: ExerciseSet = {
  id: 'sorting',
  title: 'Sorting Algorithms',
  description: 'Exercises covering sorting algorithm behavior, complexity, and implementation.',
  questions: [
    {
      id: 'sort-1',
      type: 'multiple-choice',
      question: 'What is the worst-case time complexity of Quick Sort?',
      options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
      answer: 'O(n^2)',
      explanation: 'Quick Sort degrades to O(n^2) when the pivot selection consistently produces unbalanced partitions (e.g., already sorted array with first/last element as pivot).',
      difficulty: 'easy',
      tags: ['sorting', 'complexity'],
    },
    {
      id: 'sort-2',
      type: 'multiple-choice',
      question: 'Which sorting algorithm is stable?',
      options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
      answer: 'Merge Sort',
      explanation: 'Merge Sort is stable because equal elements maintain their relative order during the merge step. Quick Sort and Heap Sort are not stable.',
      difficulty: 'easy',
      tags: ['sorting'],
    },
    {
      id: 'sort-3',
      type: 'trace-output',
      question: 'After one pass of Bubble Sort (left to right), what is the state of the array?',
      codeSnippet: 'arr = [5, 3, 8, 1, 2]',
      language: 'pseudocode',
      answer: '[3, 5, 1, 2, 8]',
      explanation: 'Bubble Sort compares adjacent pairs and swaps if out of order. After one pass: (5,3)->swap->[3,5,8,1,2], (5,8)->no swap, (8,1)->swap->[3,5,1,8,2], (8,2)->swap->[3,5,1,2,8]. The largest element (8) bubbles to the end.',
      difficulty: 'medium',
      tags: ['sorting'],
    },
    {
      id: 'sort-4',
      type: 'complexity-match',
      question: 'Match each sorting algorithm to its average-case time complexity.',
      options: ['Bubble Sort: O(n^2)', 'Merge Sort: O(n log n)', 'Insertion Sort: O(n^2)', 'Heap Sort: O(n log n)'],
      answer: ['Bubble Sort: O(n^2)', 'Merge Sort: O(n log n)', 'Insertion Sort: O(n^2)', 'Heap Sort: O(n log n)'],
      explanation: 'Bubble Sort and Insertion Sort are O(n^2) average case. Merge Sort and Heap Sort are O(n log n) average case.',
      difficulty: 'easy',
      tags: ['sorting', 'complexity'],
    },
    {
      id: 'sort-5',
      type: 'multiple-choice',
      question: 'What is the space complexity of Merge Sort?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      answer: 'O(n)',
      explanation: 'Merge Sort requires O(n) additional space for the temporary arrays used during the merge step.',
      difficulty: 'easy',
      tags: ['sorting', 'complexity'],
    },
    {
      id: 'sort-6',
      type: 'order-steps',
      question: 'Order the steps of the Quick Sort partition process:',
      options: [
        'Choose a pivot element',
        'Move elements smaller than pivot to the left',
        'Move elements larger than pivot to the right',
        'Place pivot in its final position',
        'Recursively sort left and right sub-arrays',
      ],
      answer: [
        'Choose a pivot element',
        'Move elements smaller than pivot to the left',
        'Move elements larger than pivot to the right',
        'Place pivot in its final position',
        'Recursively sort left and right sub-arrays',
      ],
      explanation: 'Quick Sort picks a pivot, partitions elements around it, places the pivot in its sorted position, then recursively sorts the sub-arrays.',
      difficulty: 'medium',
      tags: ['sorting'],
    },
    {
      id: 'sort-7',
      type: 'multiple-choice',
      question: 'Which sorting algorithm has the best worst-case time complexity?',
      options: ['Quick Sort', 'Bubble Sort', 'Merge Sort', 'Insertion Sort'],
      answer: 'Merge Sort',
      explanation: 'Merge Sort guarantees O(n log n) in all cases (best, average, worst). Quick Sort worst case is O(n^2), Bubble Sort and Insertion Sort are O(n^2).',
      difficulty: 'easy',
      tags: ['sorting', 'complexity'],
    },
    {
      id: 'sort-8',
      type: 'trace-output',
      question: 'Given the array [4, 2, 7, 1], show the array after each step of Insertion Sort.',
      codeSnippet: 'arr = [4, 2, 7, 1]',
      language: 'pseudocode',
      answer: '[2, 4, 7, 1] -> [2, 4, 7, 1] -> [1, 2, 4, 7]',
      explanation: 'Step 1: Insert 2 before 4 -> [2,4,7,1]. Step 2: 7 is already in place -> [2,4,7,1]. Step 3: Insert 1 at beginning -> [1,2,4,7].',
      difficulty: 'medium',
      tags: ['sorting'],
    },
    {
      id: 'sort-9',
      type: 'code-fix',
      question: 'Fix the bug in this Bubble Sort implementation:',
      codeSnippet: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      language: 'javascript',
      answer: 'j < arr.length - 1 - i',
      explanation: 'The inner loop should go to arr.length - 1 - i. Without "- 1", it accesses arr[j+1] out of bounds. Without "- i", it re-checks already sorted elements at the end.',
      hints: ['Look at the inner loop bound', 'What happens when j = arr.length - 1?'],
      difficulty: 'medium',
      tags: ['sorting'],
    },
    {
      id: 'sort-10',
      type: 'multiple-choice',
      question: 'Which sorting algorithm is most efficient for nearly sorted data?',
      options: ['Merge Sort', 'Quick Sort', 'Insertion Sort', 'Heap Sort'],
      answer: 'Insertion Sort',
      explanation: 'Insertion Sort has O(n) best case when the array is nearly sorted, because most elements need minimal or no shifting. Other algorithms are O(n log n) regardless.',
      difficulty: 'medium',
      tags: ['sorting', 'complexity'],
    },
  ],
};
