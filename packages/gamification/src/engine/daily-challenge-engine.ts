import type { DailyChallengeQuestion, DailyChallengeState } from '../types/daily-challenge';

/**
 * Simple seeded PRNG from a string (date).
 * Returns a function that produces pseudo-random numbers [0, 1).
 */
function createSeededRng(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }

  return () => {
    hash = (hash * 1664525 + 1013904223) | 0;
    return ((hash >>> 0) / 4294967296);
  };
}

// ─── Question Pool ─────────────────────────────────────────────

const QUESTION_POOL: DailyChallengeQuestion[] = [
  // Data Structures
  {
    question: 'What is the time complexity of searching in a balanced BST?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctIndex: 1,
    category: 'dsa',
  },
  {
    question: 'Which data structure uses FIFO ordering?',
    options: ['Stack', 'Queue', 'Binary Tree', 'Hash Table'],
    correctIndex: 1,
    category: 'dsa',
  },
  {
    question: 'What is the worst-case time complexity of hash table lookup?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correctIndex: 2,
    category: 'dsa',
  },
  {
    question: 'Which traversal of a BST gives sorted output?',
    options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
    correctIndex: 1,
    category: 'dsa',
  },
  {
    question: 'What data structure is used to implement Dijkstra\'s algorithm efficiently?',
    options: ['Stack', 'Queue', 'Priority Queue (Min-Heap)', 'Hash Table'],
    correctIndex: 2,
    category: 'dsa',
  },
  {
    question: 'In a max-heap, the root element is always the:',
    options: ['Smallest element', 'Median element', 'Largest element', 'Most recently inserted'],
    correctIndex: 2,
    category: 'dsa',
  },
  {
    question: 'What is the space complexity of an adjacency matrix for V vertices?',
    options: ['O(V)', 'O(V + E)', 'O(V^2)', 'O(E)'],
    correctIndex: 2,
    category: 'dsa',
  },
  {
    question: 'Which sorting algorithm has O(n) best-case time complexity?',
    options: ['Merge Sort', 'Heap Sort', 'Insertion Sort', 'Selection Sort'],
    correctIndex: 2,
    category: 'algorithms',
  },
  // Algorithms
  {
    question: 'What is the time complexity of Merge Sort in all cases?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
    correctIndex: 1,
    category: 'algorithms',
  },
  {
    question: 'Which algorithm is used to find the shortest path in a weighted graph with non-negative edges?',
    options: ['BFS', 'DFS', 'Dijkstra\'s', 'Bellman-Ford'],
    correctIndex: 2,
    category: 'algorithms',
  },
  {
    question: 'What technique does dynamic programming use to avoid redundant computation?',
    options: ['Recursion', 'Memoization', 'Sorting', 'Hashing'],
    correctIndex: 1,
    category: 'algorithms',
  },
  {
    question: 'Binary search requires the input to be:',
    options: ['Linked list', 'Sorted', 'A tree', 'Doubly linked'],
    correctIndex: 1,
    category: 'algorithms',
  },
  {
    question: 'What is the space complexity of Quick Sort?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correctIndex: 1,
    category: 'algorithms',
  },
  {
    question: 'Which graph algorithm can detect negative weight cycles?',
    options: ['Dijkstra\'s', 'Bellman-Ford', 'Kruskal\'s', 'Prim\'s'],
    correctIndex: 1,
    category: 'algorithms',
  },
  // Systems
  {
    question: 'What does the "C" in CAP theorem stand for?',
    options: ['Caching', 'Consistency', 'Concurrency', 'Compression'],
    correctIndex: 1,
    category: 'systems',
  },
  {
    question: 'Which protocol provides reliable, ordered delivery over the internet?',
    options: ['UDP', 'TCP', 'HTTP', 'DNS'],
    correctIndex: 1,
    category: 'systems',
  },
  {
    question: 'What does ACID stand for in database transactions?',
    options: [
      'Atomicity, Consistency, Isolation, Durability',
      'Access, Control, Integration, Data',
      'Asynchronous, Concurrent, Isolated, Distributed',
      'Atomic, Cached, Indexed, Durable',
    ],
    correctIndex: 0,
    category: 'systems',
  },
  {
    question: 'Which HTTP method is idempotent?',
    options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
    correctIndex: 1,
    category: 'systems',
  },
  {
    question: 'What is the purpose of a load balancer?',
    options: [
      'Encrypt data in transit',
      'Distribute traffic across servers',
      'Store session data',
      'Compile code faster',
    ],
    correctIndex: 1,
    category: 'systems',
  },
  // Engineering Principles
  {
    question: 'What does the "S" in SOLID stand for?',
    options: ['Substitution', 'Single Responsibility', 'Segregation', 'Simple'],
    correctIndex: 1,
    category: 'engineering',
  },
  {
    question: 'Which design pattern ensures only one instance of a class exists?',
    options: ['Factory', 'Observer', 'Singleton', 'Strategy'],
    correctIndex: 2,
    category: 'engineering',
  },
  {
    question: 'What does DRY stand for?',
    options: [
      'Data Retrieval Yield',
      'Don\'t Repeat Yourself',
      'Dynamic Resource Yielding',
      'Direct Reference Yielding',
    ],
    correctIndex: 1,
    category: 'engineering',
  },
];

const QUESTIONS_PER_CHALLENGE = 5;

/**
 * Generate a daily challenge deterministically from a date string.
 * Uses a simple hash-based PRNG seeded by the date.
 */
export function generateDailyChallenge(dateStr: string): DailyChallengeState {
  const rng = createSeededRng(dateStr);
  const pool = [...QUESTION_POOL];

  // Fisher-Yates shuffle using seeded RNG
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const questions = pool.slice(0, QUESTIONS_PER_CHALLENGE);

  return {
    date: dateStr,
    questions,
    answeredIndices: [],
    correctCount: 0,
    completed: false,
    xpEarned: 0,
  };
}

/**
 * Submit an answer to a daily challenge question.
 * Returns a new state object (immutable).
 */
export function submitAnswer(
  state: DailyChallengeState,
  questionIndex: number,
  answerIndex: number,
): DailyChallengeState {
  // Already answered this question
  if (state.answeredIndices.includes(questionIndex)) {
    return state;
  }

  // Already completed
  if (state.completed) {
    return state;
  }

  const question = state.questions[questionIndex];
  if (!question) return state;

  const isCorrect = answerIndex === question.correctIndex;
  const newAnsweredIndices = [...state.answeredIndices, questionIndex];
  const newCorrectCount = state.correctCount + (isCorrect ? 1 : 0);
  const completed = newAnsweredIndices.length === state.questions.length;

  return {
    ...state,
    answeredIndices: newAnsweredIndices,
    correctCount: newCorrectCount,
    completed,
    xpEarned: state.xpEarned, // XP is computed by the consuming hook, not here
  };
}
