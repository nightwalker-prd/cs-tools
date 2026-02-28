export interface Concept {
  id: string;
  name: string;
  description: string;
  keyPoints: string[];
  tradeoffs?: string[];
  realWorld?: string[];
}

export interface Topic {
  id: number;
  title: string;
  part: number;
  partTitle: string;
  summary: string;
  concepts: Concept[];
}

// Aliases for component compatibility with DDIA pattern
export type Chapter = Topic;

export const parts = [
  { id: 1, title: 'Array & String Patterns' },
  { id: 2, title: 'Graph & Tree Patterns' },
  { id: 3, title: 'Advanced Optimization Patterns' },
  { id: 4, title: 'Specialized Techniques' },
];

export const topics: Topic[] = [
  // ═══════════════════════════════════════════════════════════════
  // PART 1: Array & String Patterns
  // ═══════════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Two Pointers',
    part: 1,
    partTitle: 'Array & String Patterns',
    summary: 'The two-pointer technique uses two indices to traverse a data structure simultaneously, reducing O(n²) brute-force searches to O(n). Essential for sorted array problems, palindrome checks, and partitioning.',
    concepts: [
      {
        id: 'opposite-direction',
        name: 'Opposite-Direction Pointers',
        description: 'Two pointers start at opposite ends of a sorted array and move toward each other, narrowing the search space by half each step.',
        keyPoints: [
          'Initialize left = 0, right = n-1; move based on comparison to target',
          'Works on sorted arrays — if sum too small, move left right; if too large, move right left',
          'Classic pattern for Two Sum II (sorted input) — O(n) time, O(1) space',
          'Also applies to Container With Most Water — maximize area between two lines',
          'Can be extended to 3Sum by fixing one element and running two-pointer on the rest',
        ],
        tradeoffs: [
          'Requires sorted input or a monotonic property to decide which pointer moves',
          'O(n) vs O(n log n) if sorting is needed first',
        ],
        realWorld: ['LC 167: Two Sum II', 'LC 11: Container With Most Water', 'LC 15: 3Sum'],
      },
      {
        id: 'fast-slow',
        name: 'Fast & Slow Pointers',
        description: 'One pointer moves faster than the other — used for cycle detection (Floyd\'s algorithm) and finding the middle of a linked list in one pass.',
        keyPoints: [
          'Slow moves 1 step, fast moves 2 steps per iteration',
          'If there is a cycle, fast and slow will eventually meet inside the cycle',
          'To find cycle start: reset one pointer to head, then both move 1 step until they meet',
          'Middle of linked list: when fast reaches end, slow is at the middle',
          'Also used in "happy number" detection and duplicate finding (LC 287)',
        ],
        tradeoffs: [
          'Only works when there is a well-defined "speed" relationship between pointers',
          'Cycle detection is O(n) time, O(1) space vs. O(n) space with a hash set',
        ],
        realWorld: ['LC 141: Linked List Cycle', 'LC 142: Linked List Cycle II', 'LC 876: Middle of Linked List'],
      },
      {
        id: 'partitioning',
        name: 'Partitioning (Dutch National Flag)',
        description: 'Three-way partitioning uses two (or three) pointers to classify elements in a single pass — grouping values less than, equal to, and greater than a pivot.',
        keyPoints: [
          'Three pointers: low, mid, high — elements before low are < pivot, after high are > pivot',
          'Process element at mid: if < pivot, swap with low and advance both; if > pivot, swap with high and decrement high; if equal, advance mid',
          'Achieves single-pass O(n) partitioning with O(1) space',
          'Useful for problems with a small set of distinct values (colors, categories)',
          'Foundation for quicksort\'s partition step',
        ],
        tradeoffs: [
          'Only applicable when elements can be categorized into a fixed number of groups',
          'Three-way partition handles duplicates better than standard two-way',
        ],
        realWorld: ['LC 75: Sort Colors', 'LC 283: Move Zeroes', 'LC 905: Sort Array By Parity'],
      },
      {
        id: 'merging-sorted',
        name: 'Merging Sorted Arrays',
        description: 'Two pointers walk through two sorted arrays simultaneously, comparing elements to merge them in order — the core operation in merge sort.',
        keyPoints: [
          'Compare elements at both pointers; take the smaller one and advance that pointer',
          'When one array is exhausted, append the remaining elements from the other',
          'For in-place merge (LC 88), work backwards from the end to avoid overwriting',
          'Time O(n + m), space O(1) for in-place or O(n + m) for new array',
          'Extends to merging K sorted arrays using a min-heap',
        ],
        tradeoffs: [
          'Requires both inputs to already be sorted',
          'In-place merge is trickier — backward iteration avoids the need for extra space',
        ],
        realWorld: ['LC 88: Merge Sorted Array', 'LC 21: Merge Two Sorted Lists', 'LC 977: Squares of a Sorted Array'],
      },
    ],
  },
  {
    id: 2,
    title: 'Sliding Window',
    part: 1,
    partTitle: 'Array & String Patterns',
    summary: 'The sliding window pattern maintains a contiguous subarray/substring and adjusts its boundaries to find optimal solutions. Converts O(n²) substring problems to O(n) by reusing computation from the previous window position.',
    concepts: [
      {
        id: 'fixed-window',
        name: 'Fixed-Size Window',
        description: 'The window has a predetermined size K. Slide it across the array, adding the new element and removing the old one each step.',
        keyPoints: [
          'Initialize window with first K elements, compute initial result (sum, max, etc.)',
          'For each step: add arr[i], remove arr[i-K], update result',
          'Each element is added once and removed once → O(n) total',
          'Common for "maximum sum of subarray of size K" problems',
          'Can maintain additional structures (deque for sliding window maximum)',
        ],
        tradeoffs: [
          'Simple and efficient but only works when the window size is known upfront',
          'For sliding window maximum, need a monotonic deque for O(n) instead of O(nK)',
        ],
        realWorld: ['LC 643: Maximum Average Subarray I', 'LC 239: Sliding Window Maximum', 'LC 1456: Max Vowels in Substring'],
      },
      {
        id: 'variable-window',
        name: 'Variable-Size Window (Expand/Shrink)',
        description: 'The window dynamically expands by moving the right pointer and shrinks by moving the left pointer when a constraint is violated.',
        keyPoints: [
          'Template: for right in range(n): expand window; while constraint violated: shrink from left',
          'Track window state with a counter, sum, or hash map',
          'The "shrink" condition determines what makes a valid window',
          'Both pointers move at most n times total → O(n) amortized',
          'Minimum window: shrink when valid, track smallest; Maximum window: expand when valid, track largest',
        ],
        tradeoffs: [
          'Must identify the correct constraint and when to shrink vs. expand',
          'Not all substring problems are sliding window — check if the "window validity" property is monotonic',
        ],
        realWorld: ['LC 3: Longest Substring Without Repeating Characters', 'LC 76: Minimum Window Substring', 'LC 209: Minimum Size Subarray Sum'],
      },
      {
        id: 'window-hashmap',
        name: 'Window with Hash Map',
        description: 'Combine sliding window with a frequency map to track character/element counts within the current window — essential for anagram and permutation problems.',
        keyPoints: [
          'Maintain a frequency map of the window contents and compare against a target map',
          'Use a "matches" counter to avoid comparing entire maps each step — O(1) per update',
          'When a character enters the window, update count; when it leaves, update count',
          'A window is valid when all target frequencies are satisfied (matches == required)',
          'Pattern works for both fixed-size (anagram) and variable-size windows',
        ],
        tradeoffs: [
          'Extra O(k) space for the hash map where k is the alphabet/element size',
          'The "matches" optimization avoids O(k) comparison per step',
        ],
        realWorld: ['LC 438: Find All Anagrams', 'LC 567: Permutation in String', 'LC 30: Substring with Concatenation'],
      },
      {
        id: 'window-pattern-recognition',
        name: 'Pattern Recognition: When to Use Sliding Window',
        description: 'Recognizing when a problem is a sliding window problem — look for contiguous subarrays/substrings with an optimization objective and a constraint.',
        keyPoints: [
          'Keywords: "contiguous subarray", "substring", "at most K distinct", "minimum length"',
          'The constraint must be monotonic: if window [l, r] violates, then [l, r+1] also violates (for shrink direction)',
          'Fixed window: "exactly size K" or "K consecutive"',
          'Variable window: "minimum/maximum length such that..." or "longest/shortest substring..."',
          'Not sliding window if: elements can be non-contiguous, or window validity is not monotonic',
        ],
        tradeoffs: [
          'Sliding window is O(n) but only for contiguous subproblems with monotonic constraints',
          'For non-contiguous selections, consider DP or greedy instead',
        ],
        realWorld: ['LC 424: Longest Repeating Character Replacement', 'LC 1004: Max Consecutive Ones III', 'LC 904: Fruit Into Baskets'],
      },
    ],
  },
  {
    id: 3,
    title: 'Binary Search',
    part: 1,
    partTitle: 'Array & String Patterns',
    summary: 'Binary search eliminates half the search space each step, achieving O(log n) time. Beyond simple lookups, it applies to boundary finding, search on answer, and modified sorted structures.',
    concepts: [
      {
        id: 'standard-binary-search',
        name: 'Standard Binary Search',
        description: 'The classic divide-and-conquer search on a sorted array: compare target with the middle element and recurse on the appropriate half.',
        keyPoints: [
          'Initialize lo = 0, hi = n-1; while lo <= hi: mid = lo + (hi - lo) / 2',
          'If arr[mid] == target, found; if arr[mid] < target, lo = mid + 1; else hi = mid - 1',
          'Use lo + (hi - lo) / 2 instead of (lo + hi) / 2 to avoid integer overflow',
          'Time O(log n), space O(1) iterative or O(log n) recursive',
          'Requires the array to be sorted (or have a monotonic predicate)',
        ],
        tradeoffs: [
          'Only works on sorted data — sorting first adds O(n log n)',
          'Off-by-one errors are the most common bug — be precise with lo, hi, and loop condition',
        ],
        realWorld: ['LC 704: Binary Search', 'LC 374: Guess Number Higher or Lower', 'LC 35: Search Insert Position'],
      },
      {
        id: 'boundary-search',
        name: 'Boundary Search (Lower/Upper Bound)',
        description: 'Find the first or last position of a target value — or the insertion point — by modifying the binary search condition to find boundaries rather than exact matches.',
        keyPoints: [
          'Lower bound (leftmost): when arr[mid] >= target, hi = mid; else lo = mid + 1 — use lo < hi loop',
          'Upper bound (rightmost): when arr[mid] <= target, lo = mid + 1; else hi = mid — result is lo - 1',
          'bisect_left / bisect_right in Python; lower_bound / upper_bound in C++',
          'Useful for counting occurrences: upper_bound - lower_bound',
          'Template: define predicate P(mid), find first mid where P(mid) is true',
        ],
        tradeoffs: [
          'More error-prone than standard binary search — loop invariants must be carefully maintained',
          'The "predicate" formulation generalizes to any monotonic boolean function',
        ],
        realWorld: ['LC 34: Find First and Last Position', 'LC 278: First Bad Version', 'LC 69: Sqrt(x)'],
      },
      {
        id: 'search-on-answer',
        name: 'Binary Search on Answer',
        description: 'Instead of searching in the input array, binary search on the space of possible answers. For each candidate answer, check feasibility with a greedy/linear scan.',
        keyPoints: [
          'Identify the answer range [lo, hi] — e.g., minimum capacity, maximum distance, etc.',
          'For each mid, run a feasibility check: "can we achieve the goal with answer = mid?"',
          'Feasibility check is typically O(n) — total is O(n log(answer_range))',
          'If feasible(mid) is true, try smaller (hi = mid); else try larger (lo = mid + 1)',
          'Common pattern: "minimize the maximum" or "maximize the minimum"',
        ],
        tradeoffs: [
          'Requires a monotonic feasibility function — if answer X works, all answers > X also work (or vice versa)',
          'The key insight is recognizing the answer space is searchable',
        ],
        realWorld: ['LC 875: Koko Eating Bananas', 'LC 1011: Capacity to Ship Packages', 'LC 410: Split Array Largest Sum'],
      },
      {
        id: 'rotated-array',
        name: 'Search in Rotated/Modified Arrays',
        description: 'Binary search on arrays that are sorted but modified — rotated, bitonic, or with duplicates. Identify which half is sorted and decide accordingly.',
        keyPoints: [
          'In a rotated sorted array, at least one half [lo, mid] or [mid, hi] is always sorted',
          'Check which half is sorted; if target is in the sorted range, search there; else search the other half',
          'With duplicates: when arr[lo] == arr[mid] == arr[hi], cannot determine sorted half — shrink both ends (worst case O(n))',
          'Finding the rotation point (minimum): if arr[mid] > arr[hi], min is in right half; else left half',
          'Bitonic arrays: find peak first, then binary search each half',
        ],
        tradeoffs: [
          'Duplicates can degrade worst-case to O(n) — standard rotated search is O(log n) without duplicates',
          'More complex invariants — draw out examples to verify logic',
        ],
        realWorld: ['LC 33: Search in Rotated Sorted Array', 'LC 153: Find Minimum in Rotated Sorted Array', 'LC 81: Search in Rotated Sorted Array II'],
      },
    ],
  },
  {
    id: 4,
    title: 'Hashing & Frequency Counting',
    part: 1,
    partTitle: 'Array & String Patterns',
    summary: 'Hash maps and sets provide O(1) average-case lookups, enabling efficient complement finding, frequency counting, and prefix sum queries. A fundamental tool for reducing time complexity at the cost of space.',
    concepts: [
      {
        id: 'complement-finding',
        name: 'Complement / Pair Finding',
        description: 'Store seen elements in a hash map; for each new element, check if its complement (target - current) already exists — the classic Two Sum approach.',
        keyPoints: [
          'One-pass solution: for each element, check if complement exists in map, then add current to map',
          'Time O(n), space O(n) — trades space for time vs. sorting + two pointers O(n log n) / O(1)',
          'Works for unsorted arrays (unlike two-pointer approach)',
          'Extends to k-sum problems by nesting: 4Sum = fix two + hash for remaining two',
          'Can store indices (Two Sum) or counts (pair counting) depending on the problem',
        ],
        tradeoffs: [
          'O(n) extra space vs. O(1) for sorted two-pointer approach',
          'Hash collisions can degrade to O(n) worst case, though rare in practice',
        ],
        realWorld: ['LC 1: Two Sum', 'LC 454: 4Sum II', 'LC 560: Subarray Sum Equals K (with prefix sum)'],
      },
      {
        id: 'frequency-counter',
        name: 'Frequency Counter Pattern',
        description: 'Count occurrences of each element using a hash map — enables O(n) solutions for anagram checking, majority element finding, and "top K frequent" problems.',
        keyPoints: [
          'Build frequency map in O(n), then query in O(1) per lookup',
          'Anagram check: two strings are anagrams iff they have identical frequency maps',
          'Majority element (Boyer-Moore): can be done in O(1) space, but hash map is simpler O(n)',
          'For "top K frequent", combine with a min-heap of size K for O(n log K)',
          'Bucket sort approach for "top K frequent": use frequency as index → O(n) time',
        ],
        tradeoffs: [
          'O(n) space for the frequency map',
          'Bucket sort for top-K is O(n) but uses O(n) space; heap approach uses O(K) space',
        ],
        realWorld: ['LC 242: Valid Anagram', 'LC 347: Top K Frequent Elements', 'LC 169: Majority Element'],
      },
      {
        id: 'prefix-sum-hashmap',
        name: 'Prefix Sum + Hash Map',
        description: 'Combine running prefix sums with a hash map to find subarrays with a target sum in O(n) — the key insight is that subarray sum = prefix[j] - prefix[i].',
        keyPoints: [
          'Maintain running prefix sum and a hash map of {prefix_sum: count}',
          'For target sum K: at each position, check if (current_prefix - K) exists in the map',
          'Initialize map with {0: 1} to handle subarrays starting from index 0',
          'Counts all subarrays summing to K, not just the first one',
          'Extends to "subarray with sum divisible by K" using prefix_sum % K as the key',
        ],
        tradeoffs: [
          'O(n) time and space — much better than O(n²) brute force',
          'Cannot find the actual subarray boundaries without additional bookkeeping',
        ],
        realWorld: ['LC 560: Subarray Sum Equals K', 'LC 523: Continuous Subarray Sum', 'LC 974: Subarray Sums Divisible by K'],
      },
      {
        id: 'hashset-patterns',
        name: 'Hash Set Patterns',
        description: 'Hash sets provide O(1) membership testing — used for duplicate detection, longest consecutive sequence, and set operations.',
        keyPoints: [
          'Contains Duplicate: insert into set, check size or existence → O(n)',
          'Longest Consecutive Sequence: put all in set, for each element that is a sequence start (num-1 not in set), count forward → O(n)',
          'The "sequence start" optimization avoids O(n²) by only starting counts from the smallest element',
          'Set intersection/union for problems involving two collections',
          'Cycle detection alternative to Floyd\'s: store visited states in a set',
        ],
        tradeoffs: [
          'O(n) space for the set',
          'Hash set is unordered — use a sorted set (TreeSet) if you need order, but at O(log n) per operation',
        ],
        realWorld: ['LC 217: Contains Duplicate', 'LC 128: Longest Consecutive Sequence', 'LC 349: Intersection of Two Arrays'],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART 2: Graph & Tree Patterns
  // ═══════════════════════════════════════════════════════════════
  {
    id: 5,
    title: 'BFS (Breadth-First Search)',
    part: 2,
    partTitle: 'Graph & Tree Patterns',
    summary: 'BFS explores nodes level by level using a queue, guaranteeing shortest paths in unweighted graphs. Applies to graph traversal, tree level-order, multi-source problems, and implicit state-space search.',
    concepts: [
      {
        id: 'graph-bfs',
        name: 'Graph BFS (Shortest Path)',
        description: 'Standard BFS on an unweighted graph finds the shortest path from a source to all reachable nodes — the queue ensures nodes are processed in order of their distance.',
        keyPoints: [
          'Use a queue (FIFO): enqueue source, mark visited; dequeue and process neighbors',
          'Each node is visited at most once → O(V + E) time and space',
          'Distance to each node = number of edges from source (in unweighted graphs)',
          'Track parent pointers to reconstruct the actual shortest path',
          'Works on adjacency list or adjacency matrix representations',
        ],
        tradeoffs: [
          'Only gives shortest paths in unweighted graphs — use Dijkstra\'s for weighted',
          'O(V) space for the queue in worst case (wide graphs)',
        ],
        realWorld: ['LC 133: Clone Graph', 'LC 994: Rotting Oranges (with multi-source)', 'LC 1091: Shortest Path in Binary Matrix'],
      },
      {
        id: 'level-order',
        name: 'Level-Order Traversal',
        description: 'BFS on a tree processes nodes level by level — at each step, process all nodes in the current level before moving to the next.',
        keyPoints: [
          'Track level size: levelSize = queue.length before processing; process exactly levelSize nodes',
          'This groups nodes by depth — useful for "right side view", "zigzag", "level averages"',
          'Alternative: track depth with each node in the queue as (node, depth) pairs',
          'Time O(n), space O(w) where w is the maximum width of the tree',
          'Can be adapted for n-ary trees by enqueuing all children',
        ],
        tradeoffs: [
          'BFS uses O(w) space (width) vs. DFS O(h) space (height) — BFS is worse for very wide trees',
          'Simpler than DFS for level-based problems but DFS is more natural for path-based problems',
        ],
        realWorld: ['LC 102: Binary Tree Level Order Traversal', 'LC 199: Binary Tree Right Side View', 'LC 103: Zigzag Level Order Traversal'],
      },
      {
        id: 'multi-source-bfs',
        name: 'Multi-Source BFS',
        description: 'Start BFS from multiple sources simultaneously by initializing the queue with all source nodes at distance 0 — propagates outward from all sources in parallel.',
        keyPoints: [
          'Initialize queue with ALL source nodes marked as visited at distance 0',
          'Process normally — each cell gets the minimum distance to any source',
          'Classic for "distance to nearest X" or "simultaneous spreading" problems',
          'Rotting oranges: all rotten oranges start in queue, fresh ones get infected level by level',
          'Time O(V + E) same as single-source BFS — just a different initialization',
        ],
        tradeoffs: [
          'Much more efficient than running BFS from each source individually (O(V × (V+E)) vs. O(V+E))',
          'Requires identifying all sources upfront',
        ],
        realWorld: ['LC 994: Rotting Oranges', 'LC 542: 01 Matrix', 'LC 286: Walls and Gates'],
      },
      {
        id: 'state-space-bfs',
        name: 'Implicit Graph / State-Space Search',
        description: 'BFS on an implicit graph where nodes are "states" and edges are "transitions" — the graph is not given explicitly but generated during exploration.',
        keyPoints: [
          'Define state (e.g., position + keys collected, current number as string, board configuration)',
          'Transitions = all valid moves from current state (e.g., add/subtract/multiply, swap tiles)',
          'Use a hash set of visited states to avoid cycles',
          'BFS guarantees finding the minimum number of transitions (shortest path in state space)',
          'State serialization: convert state to a string or tuple for the visited set',
        ],
        tradeoffs: [
          'State space can be exponentially large — BFS may be impractical without pruning',
          'Memory intensive — every visited state must be stored',
        ],
        realWorld: ['LC 127: Word Ladder', 'LC 752: Open the Lock', 'LC 773: Sliding Puzzle'],
      },
    ],
  },
  {
    id: 6,
    title: 'DFS (Depth-First Search)',
    part: 2,
    partTitle: 'Graph & Tree Patterns',
    summary: 'DFS explores as deep as possible before backtracking, naturally implemented with recursion or an explicit stack. Essential for tree traversals, graph component finding, cycle detection, and backtracking problems.',
    concepts: [
      {
        id: 'tree-traversals',
        name: 'Tree Traversals (Pre/In/Post-order)',
        description: 'Three orderings of visiting nodes in a binary tree — preorder (root-left-right), inorder (left-root-right), postorder (left-right-root) — each suited to different problem types.',
        keyPoints: [
          'Preorder: process root first — used for serialization, copying trees, prefix expressions',
          'Inorder: process root between children — gives sorted order for BSTs',
          'Postorder: process root last — used for deletion, computing sizes, evaluating expressions',
          'All three are DFS and run in O(n) time, O(h) space where h is tree height',
          'Iterative versions use an explicit stack — more complex but avoid stack overflow',
        ],
        tradeoffs: [
          'Recursive is cleaner but risks stack overflow for very deep trees (h > ~10K)',
          'Morris traversal achieves O(1) space but modifies the tree temporarily',
        ],
        realWorld: ['LC 144: Binary Tree Preorder', 'LC 94: Binary Tree Inorder', 'LC 145: Binary Tree Postorder'],
      },
      {
        id: 'graph-dfs',
        name: 'Graph DFS (Components & Cycles)',
        description: 'DFS on graphs finds connected components, detects cycles, and determines reachability — mark nodes as visited to avoid infinite loops in cyclic graphs.',
        keyPoints: [
          'Connected components: run DFS from each unvisited node; each DFS call discovers one component',
          'Cycle detection (undirected): if we visit a neighbor that is already visited and not the parent → cycle',
          'Cycle detection (directed): use three states (unvisited, in-progress, done) — back edge to in-progress node means cycle',
          'Island counting: DFS/BFS on a grid, marking visited cells; each DFS from an unvisited "1" is one island',
          'Time O(V + E), space O(V) for visited set + recursion stack',
        ],
        tradeoffs: [
          'DFS uses O(h) stack space vs. BFS O(w) queue space — DFS is better for deep graphs, BFS for wide',
          'BFS finds shortest paths; DFS does not (but DFS finds paths faster in some cases)',
        ],
        realWorld: ['LC 200: Number of Islands', 'LC 207: Course Schedule (cycle detection)', 'LC 547: Number of Provinces'],
      },
      {
        id: 'backtracking',
        name: 'Backtracking',
        description: 'A DFS-based technique that builds candidates incrementally, abandoning a candidate ("backtracking") as soon as it violates a constraint — generates all valid solutions without brute-forcing every possibility.',
        keyPoints: [
          'Template: choose → explore → unchoose (add to path, recurse, remove from path)',
          'Pruning: skip branches that cannot lead to valid solutions (constraint propagation)',
          'Permutations: swap elements or use a "used" boolean array',
          'Combinations/subsets: use a start index to avoid duplicates',
          'For duplicates in input: sort first, then skip consecutive equal elements at the same level',
        ],
        tradeoffs: [
          'Worst case is still exponential (all possibilities) but pruning often reduces practical runtime significantly',
          'Space is O(depth) for the recursion stack plus O(solution_size) for the current path',
        ],
        realWorld: ['LC 46: Permutations', 'LC 78: Subsets', 'LC 39: Combination Sum'],
      },
      {
        id: 'dfs-with-state',
        name: 'DFS with State (Path Sum, Diameter)',
        description: 'DFS that carries or returns state — passing information down (top-down) or computing results up (bottom-up) through the recursion.',
        keyPoints: [
          'Top-down (preorder-like): pass accumulated state as parameters (e.g., current path sum, path so far)',
          'Bottom-up (postorder-like): return computed values from children (e.g., subtree height, count)',
          'Tree diameter: at each node, compute left_height + right_height, track global max; return max(left, right) + 1',
          'Path sum problems: accumulate sum top-down, check at leaves',
          'LCA (Lowest Common Ancestor): return the node if it matches target, bubble up through recursion',
        ],
        tradeoffs: [
          'Top-down is simpler for path-based problems; bottom-up is necessary for subtree aggregation',
          'Global variable or class member for tracking results across recursive calls (e.g., diameter)',
        ],
        realWorld: ['LC 112: Path Sum', 'LC 543: Diameter of Binary Tree', 'LC 236: Lowest Common Ancestor'],
      },
    ],
  },
  {
    id: 7,
    title: 'Heap & Priority Queue',
    part: 2,
    partTitle: 'Graph & Tree Patterns',
    summary: 'Heaps (priority queues) provide O(log n) insertion and O(1) access to the min/max element. Critical for top-K problems, merging sorted streams, running medians, and scheduling with priorities.',
    concepts: [
      {
        id: 'top-k',
        name: 'Top-K / K-th Element',
        description: 'Find the K largest (or smallest) elements using a min-heap of size K — each element is processed in O(log K), giving O(n log K) total.',
        keyPoints: [
          'Min-heap of size K for top-K largest: push element; if heap size > K, pop the smallest',
          'After processing all elements, the heap contains the K largest; the root is the K-th largest',
          'Alternative: Quickselect gives O(n) average but O(n²) worst case',
          'For "K-th largest in a stream", maintain the heap as elements arrive',
          'For "top K frequent", first count frequencies, then use heap on (frequency, element) pairs',
        ],
        tradeoffs: [
          'Heap: O(n log K) guaranteed vs. Quickselect: O(n) average but O(n²) worst case',
          'Full sort O(n log n) is simpler but slower when K << n',
        ],
        realWorld: ['LC 215: Kth Largest Element', 'LC 347: Top K Frequent Elements', 'LC 703: Kth Largest Element in Stream'],
      },
      {
        id: 'merge-k-sorted',
        name: 'Merge K Sorted Lists/Arrays',
        description: 'Use a min-heap to efficiently merge K sorted streams — always extract the smallest element across all streams, then push the next element from that stream.',
        keyPoints: [
          'Initialize heap with the first element from each of the K lists',
          'Pop minimum, add to result, push next element from the same list',
          'Time O(N log K) where N is total elements and K is number of lists',
          'Space O(K) for the heap (plus O(N) for the result)',
          'Divide and conquer alternative: merge pairs of lists log K times → same O(N log K)',
        ],
        tradeoffs: [
          'Heap approach is online (can process elements as they arrive); merge-sort approach needs all data',
          'For K = 2, a simple two-pointer merge is more efficient (no heap overhead)',
        ],
        realWorld: ['LC 23: Merge K Sorted Lists', 'LC 378: Kth Smallest Element in Sorted Matrix', 'LC 373: Find K Pairs with Smallest Sums'],
      },
      {
        id: 'two-heap',
        name: 'Two-Heap Pattern (Running Median)',
        description: 'Maintain two heaps — a max-heap for the lower half and a min-heap for the upper half — to efficiently find the median of a data stream.',
        keyPoints: [
          'Max-heap stores the smaller half; min-heap stores the larger half',
          'Balance: max-heap size == min-heap size (even total) or max-heap has one extra (odd total)',
          'Median = max-heap top (odd count) or average of both tops (even count)',
          'Insertion: add to max-heap first, then rebalance if top of max-heap > top of min-heap',
          'Each insert is O(log n); finding median is O(1)',
        ],
        tradeoffs: [
          'O(log n) per insert, O(1) median query — much better than sorting each time O(n log n)',
          'Deletion is harder — lazy deletion with a hash map of pending removals',
        ],
        realWorld: ['LC 295: Find Median from Data Stream', 'LC 480: Sliding Window Median', 'LC 502: IPO'],
      },
      {
        id: 'interval-heap',
        name: 'Interval Scheduling with Heap',
        description: 'Use a heap to track active intervals — commonly for meeting rooms problems where you need to find the minimum number of concurrent intervals.',
        keyPoints: [
          'Sort intervals by start time; use min-heap of end times for currently active intervals',
          'For each new interval: if its start >= heap top (earliest end), pop the top (room freed)',
          'Push the new interval\'s end time; heap size = number of concurrent rooms needed',
          'Maximum heap size at any point = minimum rooms required',
          'Also applies to CPU scheduling, event overlap counting',
        ],
        tradeoffs: [
          'O(n log n) for sorting + O(n log n) for heap operations = O(n log n) total',
          'Alternative: sweep line with sorted start/end events is conceptually simpler',
        ],
        realWorld: ['LC 253: Meeting Rooms II', 'LC 1094: Car Pooling', 'LC 621: Task Scheduler'],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART 3: Advanced Optimization Patterns
  // ═══════════════════════════════════════════════════════════════
  {
    id: 8,
    title: 'Dynamic Programming',
    part: 3,
    partTitle: 'Advanced Optimization Patterns',
    summary: 'Dynamic programming solves complex problems by breaking them into overlapping subproblems and caching results. The key is defining the state, recurrence relation, and base cases — then choosing top-down (memoization) or bottom-up (tabulation).',
    concepts: [
      {
        id: 'dp-1d',
        name: '1D DP (Linear)',
        description: 'DP where the state depends on a single dimension — typically dp[i] represents the optimal solution considering the first i elements.',
        keyPoints: [
          'Classic examples: Climbing Stairs dp[i] = dp[i-1] + dp[i-2]; House Robber dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
          'Often can be space-optimized from O(n) to O(1) by keeping only the last 2-3 values',
          'Longest Increasing Subsequence: dp[i] = length of LIS ending at index i; check all j < i where nums[j] < nums[i]',
          'LIS can be optimized to O(n log n) with patience sorting (binary search on tails array)',
          'Identify the recurrence: what decision do I make at position i? Take/skip, extend, etc.',
        ],
        tradeoffs: [
          'Bottom-up (iterative) avoids recursion overhead and stack limits; top-down (memoization) is easier to derive',
          'Space optimization trades readability for O(1) space — harder to debug',
        ],
        realWorld: ['LC 70: Climbing Stairs', 'LC 198: House Robber', 'LC 300: Longest Increasing Subsequence'],
      },
      {
        id: 'dp-2d',
        name: '2D DP (Grid / String)',
        description: 'DP where the state depends on two dimensions — common for grid paths, string matching, and problems involving two sequences.',
        keyPoints: [
          'Grid DP: dp[i][j] = number of paths or minimum cost to reach cell (i, j)',
          'String DP: dp[i][j] compares prefixes of two strings (LCS, edit distance)',
          'Edit Distance: dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1] + (s[i]!=t[j]))',
          'LCS: dp[i][j] = dp[i-1][j-1]+1 if match, else max(dp[i-1][j], dp[i][j-1])',
          'Space optimization: use two rows (or even one row) since dp[i] only depends on dp[i-1]',
        ],
        tradeoffs: [
          'O(n×m) time and space — space can often be reduced to O(min(n,m)) with rolling array',
          'Drawing the DP table helps visualize transitions and verify correctness',
        ],
        realWorld: ['LC 62: Unique Paths', 'LC 72: Edit Distance', 'LC 1143: Longest Common Subsequence'],
      },
      {
        id: 'dp-interval',
        name: 'Interval DP',
        description: 'DP on intervals where dp[i][j] represents the optimal answer for the subarray from index i to j — solved by trying all possible split points.',
        keyPoints: [
          'Recurrence: dp[i][j] = optimize over k in [i, j-1] of dp[i][k] + dp[k+1][j] + cost(i, j)',
          'Fill order: by increasing interval length (len = 1, 2, ..., n)',
          'Base case: dp[i][i] for single elements',
          'Matrix chain multiplication: minimize total scalar multiplications by choosing split points',
          'Burst Balloons: dp[i][j] = max coins from bursting balloons in range (i, j)',
        ],
        tradeoffs: [
          'O(n³) time, O(n²) space — relatively expensive but necessary for these problem types',
          'Can sometimes be optimized with Knuth\'s optimization to O(n²)',
        ],
        realWorld: ['LC 312: Burst Balloons', 'LC 516: Longest Palindromic Subsequence', 'LC 1039: Minimum Score Triangulation'],
      },
      {
        id: 'dp-state-machine',
        name: 'State Machine DP',
        description: 'Model the problem as a finite state machine where transitions between states have costs/rewards — dp tracks the optimal value in each state at each step.',
        keyPoints: [
          'Best Time to Buy and Sell Stock: states = {holding, not_holding}; transitions = buy, sell, hold',
          'With cooldown: add a "cooldown" state after selling',
          'With transaction limit K: dp[k][state] where k is remaining transactions',
          'At each step, compute the optimal action for each state based on previous step\'s states',
          'Often reducible to a small number of variables (e.g., hold, sold, rest) — O(1) space per step',
        ],
        tradeoffs: [
          'State machine formulation makes complex constraints (cooldown, fees, limits) manageable',
          'Identifying the right states and transitions is the hard part — draw the state diagram first',
        ],
        realWorld: ['LC 121: Best Time to Buy and Sell Stock', 'LC 309: Best Time with Cooldown', 'LC 188: Best Time with K Transactions'],
      },
    ],
  },
  {
    id: 9,
    title: 'Greedy Algorithms',
    part: 3,
    partTitle: 'Advanced Optimization Patterns',
    summary: 'Greedy algorithms make the locally optimal choice at each step, hoping to find the global optimum. When a greedy choice property and optimal substructure exist, greedy gives correct results more efficiently than DP.',
    concepts: [
      {
        id: 'interval-scheduling',
        name: 'Interval Scheduling & Merging',
        description: 'Sort intervals and greedily select or merge them — the foundation for scheduling problems, finding overlaps, and computing coverage.',
        keyPoints: [
          'Maximum non-overlapping intervals: sort by end time, greedily pick the earliest-ending interval that doesn\'t conflict',
          'Minimum intervals to remove = total - maximum non-overlapping (LC 435)',
          'Merge overlapping intervals: sort by start, merge if current start <= previous end',
          'Insert interval: find position, merge with overlapping neighbors',
          'All interval problems start with sorting — by start or end time depending on the goal',
        ],
        tradeoffs: [
          'Greedy is O(n log n) (dominated by sort) — much better than DP alternatives for these problems',
          'Sort by end time for selection; sort by start time for merging',
        ],
        realWorld: ['LC 56: Merge Intervals', 'LC 435: Non-overlapping Intervals', 'LC 57: Insert Interval'],
      },
      {
        id: 'jump-greedy',
        name: 'Jump / Reach Greedy',
        description: 'Track the farthest reachable position as you scan through the array — a greedy approach to jump game and minimum jump problems.',
        keyPoints: [
          'Jump Game I: track maxReach; if at any point i > maxReach, cannot reach end',
          'Jump Game II (min jumps): track current end of jump range; when i reaches it, increment jumps and extend range',
          'The "current range" and "farthest reachable" pattern avoids BFS/DP overhead',
          'Gas Station: track running surplus; if total gas >= total cost, a solution exists; start where surplus is minimized',
          'These problems have optimal substructure — greedy choice at each step leads to global optimum',
        ],
        tradeoffs: [
          'O(n) greedy vs. O(n²) DP — greedy is dramatically better when the greedy property holds',
          'Must prove the greedy choice property — not all jump/reach problems are greedy',
        ],
        realWorld: ['LC 55: Jump Game', 'LC 45: Jump Game II', 'LC 134: Gas Station'],
      },
      {
        id: 'two-pass-greedy',
        name: 'Two-Pass (Left-Right Scan)',
        description: 'Scan the array twice — once left-to-right and once right-to-left — to combine local greedy decisions from both directions.',
        keyPoints: [
          'Candy problem: first pass ensures right neighbor > left if rating higher; second pass ensures left neighbor > right',
          'Trapping Rain Water: compute left_max[] and right_max[], water at each position = min(left_max, right_max) - height',
          'Product Except Self: prefix products from left, suffix products from right, multiply',
          'Each pass captures one "direction" of constraints; combining both gives the full solution',
          'Often achievable in O(n) time and O(1) extra space with clever variable tracking',
        ],
        tradeoffs: [
          'Two passes is O(n) time — simple and efficient',
          'Sometimes one pass suffices with a stack (trapping rain water with monotonic stack)',
        ],
        realWorld: ['LC 135: Candy', 'LC 42: Trapping Rain Water', 'LC 238: Product of Array Except Self'],
      },
      {
        id: 'greedy-sorting',
        name: 'Greedy with Sorting',
        description: 'Sort the input to create a structure that makes the greedy choice obvious — a common preprocessing step that enables simple greedy selection.',
        keyPoints: [
          'Assign cookies: sort both children\'s greed and cookie sizes, match smallest to smallest',
          'Minimum number of arrows to burst balloons: sort by end, greedy pick (same as interval scheduling)',
          'Reorganize string: sort by frequency, place most frequent character first to avoid adjacency',
          'Task scheduler: the most frequent task determines the minimum idle time',
          'Key insight: sorting reveals the optimal order for greedy selection',
        ],
        tradeoffs: [
          'Sorting adds O(n log n) but enables O(n) greedy scan — total O(n log n)',
          'Must prove that the sorted order leads to optimal greedy choices',
        ],
        realWorld: ['LC 455: Assign Cookies', 'LC 452: Minimum Number of Arrows', 'LC 767: Reorganize String'],
      },
    ],
  },
  {
    id: 10,
    title: 'Union-Find & Advanced Graph',
    part: 3,
    partTitle: 'Advanced Optimization Patterns',
    summary: 'Advanced graph algorithms for connectivity (Union-Find), ordering (topological sort), shortest paths with weights (Dijkstra\'s), and structural properties (bipartiteness). These patterns appear in harder interview problems.',
    concepts: [
      {
        id: 'union-find',
        name: 'Union-Find (Disjoint Set Union)',
        description: 'A data structure that tracks elements partitioned into disjoint sets, supporting near-O(1) union and find operations with path compression and union by rank.',
        keyPoints: [
          'Find(x): return the root of x\'s set, compressing the path along the way',
          'Union(x, y): merge the sets containing x and y by connecting their roots',
          'Path compression: point every node directly to the root during Find → amortized O(α(n)) ≈ O(1)',
          'Union by rank/size: attach the smaller tree under the larger tree\'s root',
          'Count components: initialize n components, decrement on each successful union',
        ],
        tradeoffs: [
          'Near-O(1) per operation vs. BFS/DFS O(V+E) for connectivity queries',
          'Excellent for dynamic connectivity (edges added over time) but cannot handle deletions efficiently',
        ],
        realWorld: ['LC 684: Redundant Connection', 'LC 721: Accounts Merge', 'LC 323: Number of Connected Components'],
      },
      {
        id: 'topological-sort',
        name: 'Topological Sort',
        description: 'Linear ordering of vertices in a DAG (directed acyclic graph) such that for every edge u→v, u comes before v. Used for dependency resolution and course scheduling.',
        keyPoints: [
          'Kahn\'s algorithm (BFS): compute in-degrees, enqueue nodes with in-degree 0, process and decrement neighbors',
          'DFS approach: run DFS, add node to result in postorder, then reverse',
          'If the result has fewer nodes than the graph, a cycle exists (no valid ordering)',
          'Course Schedule: prerequisites form edges; topological sort determines a valid course order',
          'Can detect cycles in directed graphs — if topological sort fails, there\'s a cycle',
        ],
        tradeoffs: [
          'Kahn\'s is iterative and naturally detects cycles; DFS approach is recursive and needs cycle detection separately',
          'O(V + E) for both approaches',
        ],
        realWorld: ['LC 207: Course Schedule', 'LC 210: Course Schedule II', 'LC 269: Alien Dictionary'],
      },
      {
        id: 'dijkstra',
        name: 'Dijkstra\'s Algorithm',
        description: 'Finds shortest paths from a source to all nodes in a weighted graph with non-negative edge weights, using a priority queue to always expand the nearest unvisited node.',
        keyPoints: [
          'Initialize distances to infinity, source distance to 0; use min-heap (distance, node)',
          'Pop minimum-distance node, relax all its neighbors: if dist[node] + weight < dist[neighbor], update',
          'Skip nodes that have already been finalized (distance already set optimally)',
          'Time O((V + E) log V) with a binary heap; O(V² ) with a simple array',
          'Does NOT work with negative edge weights — use Bellman-Ford for that',
        ],
        tradeoffs: [
          'O((V+E) log V) with heap vs. BFS O(V+E) for unweighted — Dijkstra handles weights but is slower',
          'For dense graphs, O(V²) array version can outperform the heap version',
        ],
        realWorld: ['LC 743: Network Delay Time', 'LC 787: Cheapest Flights Within K Stops', 'LC 1514: Path with Maximum Probability'],
      },
      {
        id: 'graph-coloring',
        name: 'Graph Coloring & Bipartiteness',
        description: 'Check if a graph is bipartite (2-colorable) by attempting to color nodes with two colors such that no adjacent nodes share the same color — fails if an odd cycle exists.',
        keyPoints: [
          'BFS/DFS coloring: assign color 0 to start node, alternate colors for neighbors',
          'If a neighbor already has the same color → not bipartite',
          'Bipartite graphs have no odd-length cycles',
          'Applications: "is this graph 2-colorable?", "can we split into two groups with no conflicts?"',
          'Can also detect whether a graph is bipartite using Union-Find (union neighbors of each node)',
        ],
        tradeoffs: [
          'O(V + E) for BFS/DFS coloring — same complexity as basic traversal',
          'General graph coloring (k > 2) is NP-hard, but 2-coloring is polynomial',
        ],
        realWorld: ['LC 785: Is Graph Bipartite?', 'LC 886: Possible Bipartition', 'LC 1042: Flower Planting With No Adjacent'],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART 4: Specialized Techniques
  // ═══════════════════════════════════════════════════════════════
  {
    id: 11,
    title: 'Trie (Prefix Tree)',
    part: 4,
    partTitle: 'Specialized Techniques',
    summary: 'A Trie (prefix tree) stores strings character by character in a tree structure, enabling O(L) lookups, prefix matching, and autocomplete. Combined with backtracking, Tries power efficient word search in grids and dictionary-based problems.',
    concepts: [
      {
        id: 'p11-c1',
        name: 'Trie Structure & Operations',
        description: 'A Trie is a tree where each node represents a character, and paths from root to marked nodes spell out stored words. Insert, search, and delete all run in O(L) where L is the word length.',
        keyPoints: [
          'Each node has up to 26 children (for lowercase English) and an isEnd flag marking complete words',
          'Insert: walk character by character, creating nodes as needed, mark the last node as end-of-word',
          'Search: walk character by character — if any child is missing, word is absent; if path exists and isEnd is true, word is found',
          'Space complexity: O(N × L × Σ) where N is number of words, L is average length, Σ is alphabet size',
          'Can store additional data at nodes (e.g., frequency counts, word references) for advanced queries',
        ],
        tradeoffs: [
          'O(L) lookup vs. hash map O(L) average — Trie excels at prefix queries where hash maps fail',
          'Higher memory usage than hash maps due to pointer overhead per character',
        ],
        realWorld: ['LC 208: Implement Trie', 'LC 211: Design Add and Search Words', 'LC 648: Replace Words'],
      },
      {
        id: 'p11-c2',
        name: 'Prefix Matching & Autocomplete',
        description: 'Tries enable efficient prefix-based operations: checking if any word starts with a given prefix, enumerating all words with that prefix, and building autocomplete systems.',
        keyPoints: [
          'startsWith: walk the Trie along the prefix — if the path exists, at least one word has that prefix',
          'Autocomplete: navigate to the prefix node, then DFS/BFS to collect all words in that subtree',
          'Ranked autocomplete: store frequency at each end-of-word node, use a priority queue during collection',
          'Longest common prefix: traverse the Trie until a node has more than one child or is an end-of-word',
          'Prefix count: store a count at each node tracking how many words pass through it',
        ],
        tradeoffs: [
          'Trie-based autocomplete is O(P + K) where P is prefix length and K is results — hash maps require scanning all entries',
          'For very large dictionaries, compressed Tries (radix trees) reduce memory by collapsing single-child chains',
        ],
        realWorld: ['LC 14: Longest Common Prefix', 'LC 1268: Search Suggestions System', 'LC 642: Design Search Autocomplete System'],
      },
      {
        id: 'p11-c3',
        name: 'Word Search in Grids with Trie Pruning',
        description: 'Combining a Trie with grid backtracking solves multi-word search problems efficiently — the Trie prunes branches where no dictionary word can be formed, avoiding redundant DFS paths.',
        keyPoints: [
          'Build a Trie from the dictionary, then DFS from each cell using the Trie to guide exploration',
          'At each cell, check if the current character exists as a child in the current Trie node — if not, prune immediately',
          'When an end-of-word node is reached, record the found word and optionally remove it to avoid duplicates',
          'Trie pruning reduces time from O(cells × 4^L × words) to O(cells × 4^L) — shared prefixes are explored once',
          'Remove leaf nodes after finding a word (backtracking cleanup) to further prune future searches',
        ],
        tradeoffs: [
          'Trie + DFS is optimal for searching many words simultaneously vs. running DFS once per word',
          'Building the Trie costs O(N × L) time and space upfront, but amortizes over multiple searches',
        ],
        realWorld: ['LC 212: Word Search II', 'LC 79: Word Search', 'LC 425: Word Squares'],
      },
    ],
  },
  {
    id: 12,
    title: 'Intervals & Line Sweep',
    part: 4,
    partTitle: 'Specialized Techniques',
    summary: 'Interval problems involve ranges [start, end] that may overlap, conflict, or need merging. The line sweep technique processes events (start/end points) in sorted order, enabling efficient solutions for scheduling, coverage, and intersection problems.',
    concepts: [
      {
        id: 'p12-c1',
        name: 'Merge Overlapping Intervals',
        description: 'Sort intervals by start time, then scan linearly, merging any interval whose start overlaps with the previous interval\'s end. Produces a minimal set of non-overlapping intervals.',
        keyPoints: [
          'Sort by start time — overlapping intervals become adjacent after sorting',
          'Maintain a "current" interval; for each next interval: if next.start <= current.end, extend current.end = max(current.end, next.end)',
          'If no overlap, push the current interval to results and start a new current',
          'Time O(n log n) for sorting + O(n) scan = O(n log n) overall',
          'Edge case: intervals that touch (e.g., [1,3] and [3,5]) may or may not merge depending on problem definition',
        ],
        tradeoffs: [
          'Sorting is required — if intervals arrive pre-sorted, the merge step is O(n)',
          'In-place merging is possible but tricky; typically O(n) extra space for the result array',
        ],
        realWorld: ['LC 56: Merge Intervals', 'LC 986: Interval List Intersections', 'LC 57: Insert Interval'],
      },
      {
        id: 'p12-c2',
        name: 'Insert & Schedule Intervals',
        description: 'Insert a new interval into a sorted, non-overlapping set (merging as needed), or determine the minimum resources needed to handle all intervals without conflict.',
        keyPoints: [
          'Insert interval: add all intervals that end before the new one, merge overlapping ones, then add remaining — O(n) with sorted input',
          'Meeting Rooms I: sort by start, check if any consecutive pair overlaps — O(n log n)',
          'Meeting Rooms II: sort start and end times separately, sweep to find max concurrent meetings',
          'Alternatively, use a min-heap of end times: for each meeting, if heap top <= current start, reuse that room; otherwise allocate a new room',
          'The peak number of overlapping intervals equals the minimum number of resources needed (pigeonhole principle)',
        ],
        tradeoffs: [
          'Sorting + sweep is O(n log n) and works for all interval scheduling variants',
          'Heap approach gives O(n log n) and is intuitive for "minimum rooms/resources" problems',
        ],
        realWorld: ['LC 57: Insert Interval', 'LC 252: Meeting Rooms', 'LC 253: Meeting Rooms II'],
      },
      {
        id: 'p12-c3',
        name: 'Line Sweep for Concurrent Events',
        description: 'The line sweep technique converts intervals into +1 (start) and -1 (end) events, sorts them, and sweeps left to right tracking the running count — the maximum count is the peak concurrency.',
        keyPoints: [
          'Create events: for each interval [s, e], add (+1, s) and (-1, e) — or (-1, e+1) for inclusive ends',
          'Sort events by time; break ties by processing ends before starts (to avoid overcounting at boundaries)',
          'Sweep through events, maintaining a running counter; track the maximum — this is the answer for "max overlap"',
          'Time O(n log n) for sorting events + O(n) sweep',
          'Generalizes to 2D sweep lines for rectangle intersection and computational geometry problems',
        ],
        tradeoffs: [
          'Line sweep is more general than the two-pointer approach — handles arbitrary event types and weights',
          'For simple overlap counting, the sorted start/end arrays approach avoids creating event objects',
        ],
        realWorld: ['LC 253: Meeting Rooms II', 'LC 1094: Car Pooling', 'LC 731: My Calendar II'],
      },
    ],
  },
  {
    id: 13,
    title: 'Monotonic Stack & Queue',
    part: 4,
    partTitle: 'Specialized Techniques',
    summary: 'A monotonic stack or queue maintains elements in sorted order, enabling O(n) solutions for "next greater/smaller element" patterns, histogram problems, and sliding window extrema. The key insight is that elements which can never be useful are discarded eagerly.',
    concepts: [
      {
        id: 'p13-c1',
        name: 'Next Greater Element Pattern',
        description: 'A monotonic decreasing stack processes elements right-to-left (or left-to-right with popping), efficiently finding the next greater or next smaller element for every position in O(n) total.',
        keyPoints: [
          'Maintain a stack of candidates in decreasing order; for each element, pop all smaller elements (they found their "next greater")',
          'After popping, the stack top (if exists) is the current element\'s next greater element',
          'Each element is pushed and popped at most once — total O(n) despite nested loops',
          'Variants: next smaller element (maintain increasing stack), previous greater/smaller (reverse direction)',
          'Circular array variant: process the array twice (indices 0 to 2n-1, using modulo) to handle wrap-around',
        ],
        tradeoffs: [
          'O(n) vs. brute force O(n^2) — each element enters and leaves the stack exactly once',
          'Stack stores indices (not values) to also track distances like "days until warmer temperature"',
        ],
        realWorld: ['LC 496: Next Greater Element I', 'LC 503: Next Greater Element II', 'LC 739: Daily Temperatures'],
      },
      {
        id: 'p13-c2',
        name: 'Largest Rectangle in Histogram',
        description: 'Use a monotonic increasing stack to find the largest rectangular area in a histogram — when a bar shorter than the stack top is encountered, compute the area of rectangles that can no longer extend right.',
        keyPoints: [
          'Maintain a stack of bar indices in increasing height order',
          'When a shorter bar is encountered, pop taller bars and compute their maximum rectangle: height × (current_index - stack_top - 1)',
          'The popped bar\'s rectangle extends from the previous stack top + 1 to the current index - 1',
          'After processing all bars, pop remaining stack entries using n as the right boundary',
          'Extends to "maximal rectangle in a binary matrix" by treating each row as a histogram and applying the algorithm per row',
        ],
        tradeoffs: [
          'O(n) time and O(n) space — each bar is pushed and popped exactly once',
          'The stack-based approach is harder to implement correctly than the O(n^2) brute force but dramatically faster',
        ],
        realWorld: ['LC 84: Largest Rectangle in Histogram', 'LC 85: Maximal Rectangle', 'LC 42: Trapping Rain Water'],
      },
      {
        id: 'p13-c3',
        name: 'Sliding Window Maximum with Monotonic Deque',
        description: 'A monotonic decreasing deque maintains potential maximum values for a sliding window — elements are discarded from the back when a larger element arrives, and from the front when they exit the window.',
        keyPoints: [
          'Deque stores indices; front of deque is always the current window maximum',
          'When adding element at index i: remove all indices from the back whose values are <= arr[i] (they can never be the max)',
          'Remove front index if it is outside the window (i.e., front index <= i - k for window size k)',
          'Each element enters and leaves the deque at most once — O(n) total for all windows',
          'The deque is "monotonic decreasing" because each new element removes all smaller ones before being added',
        ],
        tradeoffs: [
          'O(n) vs. O(n log k) with a heap or balanced BST — the deque avoids log-factor overhead',
          'Also applicable to sliding window minimum by maintaining a monotonic increasing deque',
        ],
        realWorld: ['LC 239: Sliding Window Maximum', 'LC 862: Shortest Subarray with Sum at Least K', 'LC 1438: Longest Subarray With Abs Diff <= Limit'],
      },
    ],
  },
];

// Aliases for chapter-based component compatibility
export const chapters = topics;
export function getTopic(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
export const getChapter = getTopic;
