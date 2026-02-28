export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════════
  // Pattern 1: Two Pointers
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p1-q1',
    chapterId: 1,
    question: 'Why does the two-pointer approach for Two Sum on a sorted array work in O(n) time?',
    options: [
      'It uses binary search on each element',
      'Moving the left pointer right increases the sum, moving the right pointer left decreases it — so exactly one pointer moves each step',
      'It processes each element exactly twice',
      'It uses a hash map internally to speed up lookups',
    ],
    answer: 1,
    explanation: 'With a sorted array, the sum of elements at two pointers has a monotonic property: moving left right increases the sum, moving right left decreases it. This means we can always determine which pointer to move based on whether the current sum is too small or too large, eliminating half the remaining search space each step.',
  },
  {
    id: 'p1-q2',
    chapterId: 1,
    question: 'In Floyd\'s cycle detection algorithm, after the fast and slow pointers meet, how do you find the start of the cycle?',
    options: [
      'The meeting point is always the cycle start',
      'Reset the fast pointer to the head and move both at the same speed — they meet at the cycle start',
      'Count the cycle length and use binary search',
      'Reset both pointers to the head and repeat the algorithm',
    ],
    answer: 1,
    explanation: 'After the fast and slow pointers meet inside the cycle, reset one pointer to the head. Then move both pointers one step at a time. The point where they meet again is the start of the cycle. This works because the distance from the head to the cycle start equals the distance from the meeting point to the cycle start (going around the cycle).',
  },
  {
    id: 'p1-q3',
    chapterId: 1,
    question: 'What is the key advantage of the Dutch National Flag partitioning algorithm over standard quicksort partitioning?',
    options: [
      'It runs in O(n log n) instead of O(n)',
      'It handles arrays with many duplicate values efficiently by creating a three-way partition',
      'It doesn\'t require any comparisons',
      'It works on unsorted arrays while quicksort doesn\'t',
    ],
    answer: 1,
    explanation: 'The Dutch National Flag algorithm creates a three-way partition (less than, equal to, greater than pivot) in a single pass. This is especially efficient when there are many duplicate values, as all elements equal to the pivot are placed correctly in one pass, unlike standard two-way partitioning which may process duplicates multiple times.',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 2: Sliding Window
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p2-q1',
    chapterId: 2,
    question: 'What property must a constraint have for the variable-size sliding window technique to work correctly?',
    options: [
      'The constraint must involve prime numbers',
      'The constraint must be monotonic — if window [l, r] is invalid, expanding it further keeps it invalid',
      'The constraint must involve at most 2 distinct elements',
      'The array must be sorted',
    ],
    answer: 1,
    explanation: 'The sliding window technique requires a monotonic constraint: if a window violates the constraint, expanding it (moving the right pointer further right) should also violate it. This ensures that when the constraint is violated, shrinking from the left is the correct action, and we never need to revisit positions — giving us O(n) amortized time.',
  },
  {
    id: 'p2-q2',
    chapterId: 2,
    question: 'In the "Minimum Window Substring" problem, why do we shrink the window from the left when we find a valid window?',
    options: [
      'To reset the window and start fresh',
      'Because we want the minimum valid window — once valid, shrinking might give a smaller valid window',
      'To avoid processing duplicate characters',
      'Because the left pointer must always move faster than the right',
    ],
    answer: 1,
    explanation: 'When we find a window containing all required characters, we shrink from the left to find the smallest such window. We keep shrinking until the window becomes invalid, recording the minimum valid window size along the way. This greedy shrinking ensures we find the optimal answer without needing to check all O(n²) windows.',
  },
  {
    id: 'p2-q3',
    chapterId: 2,
    question: 'How does the "matches" counter optimization work in the window-with-hash-map pattern for anagram finding?',
    options: [
      'It counts the total number of characters in the window',
      'It tracks how many distinct characters in the window have exactly the required frequency, enabling O(1) validity checks',
      'It stores the hash code of the current window for fast comparison',
      'It counts the number of windows that have been processed',
    ],
    answer: 1,
    explanation: 'Instead of comparing the entire frequency map of the window against the target map each step (O(k) per step), we maintain a counter of how many character frequencies currently match the target. When a character is added/removed, we update only that character\'s match status — O(1) per update. The window is valid when matches equals the number of required distinct characters.',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 3: Binary Search
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p3-q1',
    chapterId: 3,
    question: 'Why should you use `lo + (hi - lo) / 2` instead of `(lo + hi) / 2` to compute the midpoint in binary search?',
    options: [
      'It produces a more accurate floating-point result',
      'It avoids integer overflow when lo + hi exceeds the maximum integer value',
      'It runs faster due to fewer arithmetic operations',
      'It handles negative numbers correctly',
    ],
    answer: 1,
    explanation: 'When lo and hi are both large positive integers, their sum lo + hi can overflow the integer type\'s maximum value, producing an incorrect (possibly negative) midpoint. The formula lo + (hi - lo) / 2 avoids this because (hi - lo) is always non-negative and smaller than the maximum value, so no overflow occurs.',
  },
  {
    id: 'p3-q2',
    chapterId: 3,
    question: 'In "binary search on answer" problems like Koko Eating Bananas, what is actually being binary searched?',
    options: [
      'The index in the input array where the answer is stored',
      'The space of possible answer values — for each candidate, a feasibility check determines if it works',
      'The number of iterations needed to solve the problem',
      'The optimal sorting order for the input',
    ],
    answer: 1,
    explanation: 'Instead of searching within the input array, we binary search over the range of possible answers (e.g., eating speed from 1 to max_pile). For each candidate answer, we run a feasibility check (can Koko finish all bananas in H hours at this speed?). The feasibility function is monotonic: if speed X works, all speeds > X also work, enabling binary search.',
  },
  {
    id: 'p3-q3',
    chapterId: 3,
    question: 'In a rotated sorted array without duplicates, how do you determine which half to search?',
    options: [
      'Always search the left half first, then the right half',
      'Identify which half is sorted (compare mid with endpoints), then check if the target falls within that sorted range',
      'Compare the target with every element until found',
      'Use a hash map to find the rotation point first',
    ],
    answer: 1,
    explanation: 'In a rotated sorted array, at least one half (either [lo, mid] or [mid, hi]) is always properly sorted. By comparing arr[lo] with arr[mid], we can determine which half is sorted. If the target falls within the sorted half\'s range, we search there; otherwise, we search the other half. This maintains O(log n) time.',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 4: Hashing & Frequency Counting
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p4-q1',
    chapterId: 4,
    question: 'In the "Subarray Sum Equals K" problem, why is the prefix sum + hash map approach O(n) while brute force is O(n²)?',
    options: [
      'The hash map sorts the elements automatically',
      'Each prefix sum is checked against previously seen prefix sums in O(1), and subarray sum = prefix[j] - prefix[i]',
      'The prefix sum eliminates the need to look at all elements',
      'The hash map compresses the array to a smaller size',
    ],
    answer: 1,
    explanation: 'The key insight is that the sum of any subarray from index i+1 to j equals prefix[j] - prefix[i]. So instead of computing every subarray sum (O(n²)), we compute the running prefix sum and check if (current_prefix - K) exists in our hash map of previously seen prefix sums. Each lookup is O(1), and we process each element once, giving O(n) total.',
  },
  {
    id: 'p4-q2',
    chapterId: 4,
    question: 'How does the Longest Consecutive Sequence algorithm achieve O(n) time without sorting?',
    options: [
      'It uses counting sort which is O(n) for integers',
      'It puts all numbers in a hash set, then only starts counting from sequence beginnings (numbers whose predecessor is absent)',
      'It uses two pointers to find consecutive pairs',
      'It uses dynamic programming to track sequence lengths',
    ],
    answer: 1,
    explanation: 'After inserting all numbers into a hash set (O(n)), we iterate through each number but only start counting a sequence when num-1 is NOT in the set (meaning num is the start of a sequence). This ensures each element is visited at most twice (once in the iteration, once during sequence counting), giving O(n) total despite the nested-looking loop.',
  },
  {
    id: 'p4-q3',
    chapterId: 4,
    question: 'What is the bucket sort approach for "Top K Frequent Elements" and why is it O(n)?',
    options: [
      'Sort elements by value and pick the first K',
      'Use frequency as the bucket index — bucket[f] contains elements with frequency f — then scan buckets from highest to lowest',
      'Use K hash maps to partition the elements',
      'Apply quicksort with a custom comparator based on frequency',
    ],
    answer: 1,
    explanation: 'After counting frequencies in O(n), create an array of buckets where index = frequency. Since the maximum frequency is n, we need at most n+1 buckets. Place each element in the bucket matching its frequency. Then scan from the highest bucket downward, collecting elements until we have K. Building the frequency map is O(n), bucket placement is O(n), and scanning is O(n).',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 5: BFS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p5-q1',
    chapterId: 5,
    question: 'Why does BFS guarantee the shortest path in an unweighted graph?',
    options: [
      'Because it uses a priority queue to always process the nearest node',
      'Because nodes are discovered in order of their distance from the source — all distance-d nodes are processed before any distance-(d+1) node',
      'Because it visits every possible path and picks the shortest',
      'Because it sorts all paths by length before choosing',
    ],
    answer: 1,
    explanation: 'BFS uses a FIFO queue, which naturally processes nodes in order of their discovery. Since each edge has weight 1, the first time a node is discovered, it\'s via the shortest path. All nodes at distance d are enqueued before any node at distance d+1, so BFS explores level by level, guaranteeing shortest paths.',
  },
  {
    id: 'p5-q2',
    chapterId: 5,
    question: 'What is the key insight that makes multi-source BFS efficient for the "01 Matrix" problem?',
    options: [
      'Running BFS once from each zero cell individually',
      'Starting BFS from all zero cells simultaneously — they are all initialized in the queue at distance 0, and BFS propagates outward to find minimum distances',
      'Using DFS instead of BFS for better performance',
      'Converting the matrix to a graph and running Dijkstra\'s algorithm',
    ],
    answer: 1,
    explanation: 'Instead of running separate BFS from each zero cell (which would be O(mn × mn)), we initialize the queue with ALL zero cells at distance 0 and run a single BFS. As BFS expands level by level, each non-zero cell is reached via the nearest zero cell first. This gives O(mn) total time — the same as a single BFS.',
  },
  {
    id: 'p5-q3',
    chapterId: 5,
    question: 'In state-space BFS problems like "Word Ladder", what serves as the "graph" that BFS traverses?',
    options: [
      'The adjacency list explicitly given in the input',
      'An implicit graph where states are nodes and valid transitions are edges — the graph is generated during exploration',
      'A pre-built trie of all dictionary words',
      'A 2D grid where each cell represents a word',
    ],
    answer: 1,
    explanation: 'In state-space BFS, the graph is implicit: each "state" (e.g., current word) is a node, and each valid "transition" (e.g., changing one letter to form another valid word) is an edge. The graph is not given explicitly but is generated during BFS exploration. This pattern applies whenever you need the minimum number of steps to transform one state into another.',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 6: DFS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p6-q1',
    chapterId: 6,
    question: 'Why does inorder traversal of a Binary Search Tree produce elements in sorted order?',
    options: [
      'Because BSTs store elements in sorted arrays internally',
      'Because inorder visits left subtree → root → right subtree, and in a BST all left descendants < root < all right descendants',
      'Because BSTs automatically sort elements during insertion',
      'Because inorder traversal sorts elements as a side effect',
    ],
    answer: 1,
    explanation: 'The BST property guarantees that all nodes in the left subtree are less than the root, and all nodes in the right subtree are greater. Inorder traversal (left → root → right) therefore visits all smaller elements first, then the root, then all larger elements. This recursively produces a fully sorted sequence.',
  },
  {
    id: 'p6-q2',
    chapterId: 6,
    question: 'In backtracking, what does the "choose → explore → unchoose" pattern accomplish?',
    options: [
      'It sorts the candidates before exploring them',
      'It builds solutions incrementally, exploring branches with a choice made and then undoing it to try other branches — exhaustive search with implicit cleanup',
      'It ensures each element is visited exactly once',
      'It converts the problem into a dynamic programming formulation',
    ],
    answer: 1,
    explanation: 'The choose-explore-unchoose pattern is the heart of backtracking: we make a choice (add to current path), recursively explore all possibilities with that choice, then undo it (remove from path) to try other options. This systematically generates all valid solutions while reusing the same data structure, keeping space proportional to the recursion depth rather than the number of solutions.',
  },
  {
    id: 'p6-q3',
    chapterId: 6,
    question: 'How is tree diameter computed using DFS, and why does it require a global variable?',
    options: [
      'It\'s the number of nodes at the deepest level, tracked globally for efficiency',
      'At each node, the diameter candidate is left_height + right_height, but the function returns max(left, right) + 1 — the diameter is tracked globally since it may pass through any node, not just the root',
      'The global variable counts the total number of edges in the tree',
      'It stores the path from root to the deepest leaf',
    ],
    answer: 1,
    explanation: 'The diameter of a tree is the longest path between any two nodes. At each node, the longest path passing through it is left_height + right_height. However, the DFS function needs to return max(left, right) + 1 (the height, for its parent\'s computation). Since the diameter might pass through any node (not necessarily the root), we track the maximum left_height + right_height in a global variable across all recursive calls.',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 7: Heap & Priority Queue
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p7-q1',
    chapterId: 7,
    question: 'Why use a min-heap of size K (instead of a max-heap of size n) to find the K-th largest element?',
    options: [
      'A min-heap is faster than a max-heap by a constant factor',
      'A min-heap of size K keeps the K largest seen so far — the root is the K-th largest, and we only do O(log K) operations per element instead of O(log n)',
      'A max-heap cannot store K elements',
      'The min-heap automatically sorts all elements',
    ],
    answer: 1,
    explanation: 'A min-heap of size K naturally maintains the K largest elements: when a new element is larger than the root (current K-th largest), we replace the root and heapify in O(log K). The root always holds the K-th largest element. This gives O(n log K) total, which is much better than O(n log n) when K << n.',
  },
  {
    id: 'p7-q2',
    chapterId: 7,
    question: 'In the two-heap pattern for finding the running median, why do we need both a max-heap and a min-heap?',
    options: [
      'One heap stores even numbers and the other stores odd numbers',
      'The max-heap holds the smaller half and the min-heap holds the larger half — the median is at the boundary between them (tops of the heaps)',
      'Using two heaps doubles the processing speed',
      'One heap is for insertions and the other for deletions',
    ],
    answer: 1,
    explanation: 'By splitting elements into a lower half (max-heap) and upper half (min-heap), the median is always accessible at the tops of the heaps in O(1). The max-heap\'s top is the largest of the smaller half, and the min-heap\'s top is the smallest of the larger half. Keeping them balanced (sizes differ by at most 1) ensures the median is always one of these two values.',
  },
  {
    id: 'p7-q3',
    chapterId: 7,
    question: 'When merging K sorted lists, why is the heap-based approach O(N log K) instead of O(N log N)?',
    options: [
      'The heap never contains more than K elements (one from each list), so each heap operation is O(log K) instead of O(log N)',
      'The heap sorts K elements at a time in batches',
      'The algorithm skips duplicate elements across lists',
      'Each list is processed independently without comparison',
    ],
    answer: 0,
    explanation: 'The min-heap maintains exactly one element from each of the K sorted lists. Since the heap size is at most K, each insertion and extraction takes O(log K). We perform N total insertions/extractions (one per element across all lists), giving O(N log K). When K is much smaller than N, this is significantly better than sorting all N elements in O(N log N).',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 8: Dynamic Programming
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p8-q1',
    chapterId: 8,
    question: 'What distinguishes dynamic programming from plain recursion?',
    options: [
      'Dynamic programming uses iteration while recursion uses function calls',
      'Dynamic programming caches results of overlapping subproblems to avoid redundant computation — without caching, the same subproblems are solved exponentially many times',
      'Dynamic programming works on arrays while recursion works on trees',
      'Dynamic programming is always faster than recursion',
    ],
    answer: 1,
    explanation: 'The key distinction is memoization of overlapping subproblems. Plain recursion (e.g., naive Fibonacci) recomputes the same subproblems exponentially many times. DP stores the result of each subproblem the first time it\'s computed and reuses it for subsequent calls. This transforms exponential time (e.g., O(2^n) Fibonacci) to polynomial time (O(n)).',
  },
  {
    id: 'p8-q2',
    chapterId: 8,
    question: 'In 2D string DP problems like Edit Distance, what does dp[i][j] typically represent?',
    options: [
      'The character at position (i, j) in a 2D grid',
      'The optimal answer for the subproblem involving the first i characters of string 1 and the first j characters of string 2',
      'The number of common characters between position i and position j',
      'The hash value of the substring from i to j',
    ],
    answer: 1,
    explanation: 'In 2D string DP, dp[i][j] represents the answer for the prefixes of both strings: the first i characters of string 1 and the first j characters of string 2. For Edit Distance, it\'s the minimum number of operations to convert one prefix into the other. The final answer is dp[m][n] where m and n are the string lengths.',
  },
  {
    id: 'p8-q3',
    chapterId: 8,
    question: 'How does the state machine DP approach simplify the "Best Time to Buy and Sell Stock with Cooldown" problem?',
    options: [
      'It converts the stock prices into a graph and finds shortest paths',
      'It defines states (holding, sold, rest) with transitions (buy, sell, hold) — at each day, compute optimal value for each state based on previous day\'s states',
      'It sorts the stock prices first then applies greedy',
      'It uses a sliding window over K consecutive days',
    ],
    answer: 1,
    explanation: 'State machine DP models the problem as states (holding stock, just sold, resting) with allowed transitions (buy, sell, hold). At each day, we compute the optimal profit for each state: hold[i] = max(hold[i-1], rest[i-1] - price), sold[i] = hold[i-1] + price, rest[i] = max(rest[i-1], sold[i-1]). The cooldown constraint is naturally encoded in the transitions.',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 9: Greedy Algorithms
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p9-q1',
    chapterId: 9,
    question: 'For the "maximum number of non-overlapping intervals" problem, why do we sort by end time rather than start time?',
    options: [
      'Sorting by start time is more expensive computationally',
      'Sorting by end time and greedily picking the earliest-ending interval maximizes room for future intervals — each choice leaves the most remaining time',
      'Sorting by start time would miss some intervals',
      'End time sorting is a convention with no algorithmic advantage',
    ],
    answer: 1,
    explanation: 'Sorting by end time ensures that when we greedily pick the earliest-finishing interval, we leave the maximum possible time for subsequent intervals. This is the greedy choice property: taking the earliest-ending non-conflicting interval is always part of an optimal solution. Sorting by start time doesn\'t have this property — an early-starting but long interval could block many shorter ones.',
  },
  {
    id: 'p9-q2',
    chapterId: 9,
    question: 'In the Jump Game II problem, how does the greedy approach find the minimum number of jumps in O(n)?',
    options: [
      'It always jumps to the farthest reachable position',
      'It tracks the "current jump range" and "farthest reachable" — when the current position reaches the end of the current range, a new jump is taken to extend the range',
      'It uses BFS with each position as a node',
      'It tries all possible jump sequences and picks the minimum',
    ],
    answer: 1,
    explanation: 'The greedy approach maintains two variables: the end of the current jump range and the farthest position reachable from within that range. As we scan through positions, we update the farthest reachable. When we reach the end of the current range, we must take a new jump (increment jump count) and extend the range to the farthest reachable position. This gives the minimum jumps in O(n).',
  },
  {
    id: 'p9-q3',
    chapterId: 9,
    question: 'Why does the two-pass approach work for the Candy problem?',
    options: [
      'Each pass distributes exactly half the total candies',
      'The left-to-right pass handles "right neighbor has higher rating" constraints, the right-to-left pass handles "left neighbor has higher rating" — taking the max at each position satisfies both directions',
      'One pass assigns minimum candies and the other assigns maximum',
      'The two passes cancel out any errors from a single pass',
    ],
    answer: 1,
    explanation: 'A single pass cannot satisfy constraints from both directions simultaneously. The left-to-right pass ensures each child with a higher rating than their left neighbor gets more candy. The right-to-left pass ensures the same for right neighbors. Taking the maximum of both passes at each position guarantees both constraints are satisfied simultaneously with the minimum total candy.',
  },

  // ═══════════════════════════════════════════════════════════════
  // Pattern 10: Union-Find & Advanced Graph
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'p10-q1',
    chapterId: 10,
    question: 'Why is Union-Find with path compression and union by rank nearly O(1) per operation?',
    options: [
      'It uses hash maps for O(1) lookups',
      'Path compression flattens the tree on each Find, and union by rank keeps the tree shallow — together they give amortized O(α(n)) ≈ O(1) where α is the inverse Ackermann function',
      'It stores all elements in a flat array with direct indexing',
      'It uses memoization to cache previous results',
    ],
    answer: 1,
    explanation: 'Path compression makes every node point directly to the root during Find, flattening the tree. Union by rank ensures the shorter tree is always attached under the taller tree\'s root, keeping the overall tree shallow. Together, these optimizations give an amortized time complexity of O(α(n)) per operation, where α is the inverse Ackermann function — effectively constant for all practical input sizes.',
  },
  {
    id: 'p10-q2',
    chapterId: 10,
    question: 'How does Kahn\'s algorithm detect a cycle in a directed graph?',
    options: [
      'It checks if any node has more than one parent',
      'If the topological sort result contains fewer nodes than the graph, the remaining nodes are in a cycle — they never reach in-degree 0',
      'It compares the graph with its reverse',
      'It uses DFS to find back edges after the topological sort',
    ],
    answer: 1,
    explanation: 'Kahn\'s algorithm processes nodes with in-degree 0. In a DAG, eventually all nodes reach in-degree 0 as their predecessors are processed. If there\'s a cycle, the nodes in the cycle never reach in-degree 0 (they always have at least one unprocessed predecessor in the cycle). So if the result has fewer nodes than the total, the missing nodes form cycles.',
  },
  {
    id: 'p10-q3',
    chapterId: 10,
    question: 'Why does Dijkstra\'s algorithm fail with negative edge weights?',
    options: [
      'The priority queue cannot store negative values',
      'Dijkstra\'s assumes that once a node is finalized, no shorter path exists — but a negative edge could create a shorter path through an already-finalized node',
      'Negative weights cause integer overflow in the distance array',
      'The algorithm\'s time complexity becomes exponential with negative weights',
    ],
    answer: 1,
    explanation: 'Dijkstra\'s greedy strategy assumes that when a node is extracted from the priority queue with distance d, no shorter path to it can exist. With negative edges, this assumption breaks: a longer path through a not-yet-processed node could later be shortened by a negative edge, making the total distance less than d. Bellman-Ford handles negative weights by relaxing all edges V-1 times.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.chapterId === chapterId);
}
