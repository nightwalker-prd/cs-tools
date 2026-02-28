import type { Algorithm } from '../types';

export const linearSearch: Algorithm = {
  id: 'linear-search',
  name: 'Linear Search',
  category: 'searching',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'Sequentially checks each element of the list until the target is found or the list is exhausted.',
  timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(1)',
  pseudocode: [
    'for i = 0 to n-1:',
    '  if arr[i] == target:',
    '    return i',
    'return -1',
  ],
  keyPoints: [
    'Works on unsorted arrays',
    'No preprocessing required',
    'O(n) in the worst and average case',
    'Simple to implement but inefficient for large datasets',
  ],
};

export const binarySearch: Algorithm = {
  id: 'binary-search',
  name: 'Binary Search',
  category: 'searching',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'Efficiently searches a sorted array by repeatedly dividing the search interval in half. Compares the target to the middle element and eliminates half the remaining elements.',
  timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
  spaceComplexity: 'O(1)',
  pseudocode: [
    'low = 0, high = n - 1',
    'while low <= high:',
    '  mid = (low + high) / 2',
    '  if arr[mid] == target: return mid',
    '  if arr[mid] < target: low = mid + 1',
    '  else: high = mid - 1',
    'return -1',
  ],
  keyPoints: [
    'Requires a sorted array',
    'O(log n) time complexity',
    'Can be implemented iteratively or recursively',
    'Watch for integer overflow in mid calculation: use low + (high - low) / 2',
  ],
};

export const bfs: Algorithm = {
  id: 'bfs',
  name: 'Breadth-First Search',
  category: 'searching',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Explores a graph level by level, visiting all neighbors of the current node before moving to the next level. Uses a queue data structure.',
  timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
  spaceComplexity: 'O(V)',
  pseudocode: [
    'queue = [startNode]',
    'visited = {startNode}',
    'while queue is not empty:',
    '  node = queue.dequeue()',
    '  for neighbor in node.neighbors:',
    '    if neighbor not in visited:',
    '      visited.add(neighbor)',
    '      queue.enqueue(neighbor)',
  ],
  keyPoints: [
    'Finds shortest path in unweighted graphs',
    'Uses a queue (FIFO)',
    'Time: O(V + E) where V = vertices, E = edges',
    'Level-order traversal of trees is BFS',
    'Good for finding closest nodes or shortest paths',
  ],
};

export const dfs: Algorithm = {
  id: 'dfs',
  name: 'Depth-First Search',
  category: 'searching',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Explores a graph by going as deep as possible along each branch before backtracking. Can be implemented with a stack or recursion.',
  timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
  spaceComplexity: 'O(V)',
  pseudocode: [
    'dfs(node, visited):',
    '  visited.add(node)',
    '  for neighbor in node.neighbors:',
    '    if neighbor not in visited:',
    '      dfs(neighbor, visited)',
  ],
  keyPoints: [
    'Uses a stack (explicit or call stack)',
    'Does NOT guarantee shortest path',
    'Useful for topological sorting, cycle detection, connected components',
    'Pre-order, in-order, post-order tree traversals are DFS variants',
    'Can cause stack overflow on deep graphs if recursive',
  ],
};

export const searchingAlgorithms: Algorithm[] = [
  linearSearch,
  binarySearch,
  bfs,
  dfs,
];
