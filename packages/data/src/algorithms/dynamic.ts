import type { Algorithm } from '../types';

export const fibonacci: Algorithm = {
  id: 'fibonacci-dp',
  name: 'Fibonacci (Dynamic Programming)',
  category: 'dynamic-programming',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'Computes the nth Fibonacci number using dynamic programming to avoid redundant calculations. Demonstrates the core DP concepts of overlapping subproblems and optimal substructure.',
  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(1)',
  pseudocode: [
    'if n <= 1: return n',
    'prev2 = 0, prev1 = 1',
    'for i = 2 to n:',
    '  curr = prev1 + prev2',
    '  prev2 = prev1',
    '  prev1 = curr',
    'return prev1',
  ],
  keyPoints: [
    'Classic introduction to dynamic programming',
    'Naive recursion is O(2^n) — DP reduces to O(n)',
    'Can optimize space to O(1) using two variables',
    'Top-down (memoization) vs bottom-up (tabulation) approaches',
  ],
};

export const knapsack: Algorithm = {
  id: 'knapsack-01',
  name: '0/1 Knapsack',
  category: 'dynamic-programming',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Given a set of items with weights and values, determine the maximum value that can fit in a knapsack of given capacity. Each item can only be taken once.',
  timeComplexity: { best: 'O(nW)', average: 'O(nW)', worst: 'O(nW)' },
  spaceComplexity: 'O(nW)',
  pseudocode: [
    'dp[0..n][0..W] = 0',
    'for i = 1 to n:',
    '  for w = 1 to W:',
    '    if weight[i] <= w:',
    '      dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])',
    '    else:',
    '      dp[i][w] = dp[i-1][w]',
    'return dp[n][W]',
  ],
  keyPoints: [
    'Pseudo-polynomial time O(nW) where W is capacity',
    'Can optimize space to O(W) using 1D array',
    'NP-hard in general (W can be exponentially large)',
    'Variations: unbounded knapsack, fractional knapsack (greedy)',
  ],
};

export const lcs: Algorithm = {
  id: 'lcs',
  name: 'Longest Common Subsequence',
  category: 'dynamic-programming',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Finds the longest subsequence common to two sequences. A subsequence need not be contiguous but must maintain relative order.',
  timeComplexity: { best: 'O(mn)', average: 'O(mn)', worst: 'O(mn)' },
  spaceComplexity: 'O(mn)',
  pseudocode: [
    'dp[0..m][0..n] = 0',
    'for i = 1 to m:',
    '  for j = 1 to n:',
    '    if X[i] == Y[j]:',
    '      dp[i][j] = dp[i-1][j-1] + 1',
    '    else:',
    '      dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
    'return dp[m][n]',
  ],
  keyPoints: [
    'O(mn) time and space where m, n are string lengths',
    'Used in diff tools (git diff, file comparison)',
    'Can backtrack through dp table to reconstruct the LCS',
    'Space can be optimized to O(min(m, n))',
  ],
};

export const coinChange: Algorithm = {
  id: 'coin-change',
  name: 'Coin Change',
  category: 'dynamic-programming',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Given a set of coin denominations and a target amount, find the minimum number of coins needed to make that amount.',
  timeComplexity: { best: 'O(amount * n)', average: 'O(amount * n)', worst: 'O(amount * n)' },
  spaceComplexity: 'O(amount)',
  pseudocode: [
    'dp[0] = 0',
    'dp[1..amount] = infinity',
    'for i = 1 to amount:',
    '  for each coin in coins:',
    '    if coin <= i and dp[i - coin] + 1 < dp[i]:',
    '      dp[i] = dp[i - coin] + 1',
    'return dp[amount] if dp[amount] != infinity else -1',
  ],
  keyPoints: [
    'Classic unbounded knapsack variant',
    'Bottom-up DP approach',
    'Greedy does NOT always work (e.g., coins [1, 3, 4], amount 6)',
    'Can also count the number of ways to make change (variation)',
  ],
};

export const dynamicAlgorithms: Algorithm[] = [
  fibonacci,
  knapsack,
  lcs,
  coinChange,
];
