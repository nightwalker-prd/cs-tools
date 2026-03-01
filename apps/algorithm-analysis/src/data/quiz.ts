export interface QuizQuestion {
  id: number;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ─── Chapter 1: Asymptotic Notation (3 questions) ─────────────────────
  {
    id: 1,
    chapterId: 1,
    question:
      "Which asymptotic notation provides both an upper and lower bound on a function's growth rate?",
    options: ["O (Big-O)", "\u0398 (Theta)", "\u03A9 (Big-Omega)", "o (little-o)"],
    answer: 1,
    explanation:
      "\u0398 notation gives a tight bound, meaning f(n) = \u0398(g(n)) implies f(n) is bounded both above and below by constant multiples of g(n) for sufficiently large n.",
  },
  {
    id: 2,
    chapterId: 1,
    question:
      "If f(n) = 3n\u00B2 + 7n + 5, which of the following is NOT a correct statement?",
    options: [
      "f(n) = O(n\u00B3)",
      "f(n) = \u0398(n\u00B2)",
      "f(n) = \u03A9(n\u00B3)",
      "f(n) = O(n\u00B2)",
    ],
    answer: 2,
    explanation:
      "f(n) = 3n\u00B2 + 7n + 5 grows as \u0398(n\u00B2), so it cannot be \u03A9(n\u00B3) because \u03A9(n\u00B3) would require f(n) to grow at least as fast as n\u00B3, which it does not.",
  },
  {
    id: 3,
    chapterId: 1,
    question:
      "What does f(n) = o(g(n)) (little-o notation) formally mean?",
    options: [
      "lim(n\u2192\u221E) f(n)/g(n) = 0",
      "f(n) \u2264 c \u00B7 g(n) for some constant c > 0 and all large n",
      "lim(n\u2192\u221E) f(n)/g(n) = \u221E",
      "f(n) = \u0398(g(n))",
    ],
    answer: 0,
    explanation:
      "Little-o notation means f(n) grows strictly slower than g(n). Formally, for every constant c > 0, there exists n\u2080 such that f(n) < c \u00B7 g(n) for all n > n\u2080, which is equivalent to lim(n\u2192\u221E) f(n)/g(n) = 0.",
  },

  // ─── Chapter 2: Growth Rate Hierarchy (3 questions) ───────────────────
  {
    id: 4,
    chapterId: 2,
    question:
      "Which of the following correctly orders functions from slowest to fastest growth?",
    options: [
      "log n, n, n log n, n\u00B2, 2\u207F",
      "n, log n, n\u00B2, n log n, 2\u207F",
      "log n, n\u00B2, n, n log n, 2\u207F",
      "log n, n, n\u00B2, n log n, 2\u207F",
    ],
    answer: 0,
    explanation:
      "The standard growth hierarchy is O(log n) < O(n) < O(n log n) < O(n\u00B2) < O(2\u207F). Each function in the correct sequence grows strictly faster than the previous one.",
  },
  {
    id: 5,
    chapterId: 2,
    question:
      "How does n! (factorial) compare to 2\u207F asymptotically?",
    options: [
      "n! = O(2\u207F)",
      "n! grows strictly faster than 2\u207F",
      "They are incomparable",
      "n! = \u0398(2\u207F)",
    ],
    answer: 1,
    explanation:
      "By Stirling's approximation, n! \u2248 \u221A(2\u03C0n)(n/e)\u207F, which grows much faster than 2\u207F. Equivalently, n! = \u03C9(2\u207F), meaning factorial dominates any simple exponential with a fixed base.",
  },
  {
    id: 6,
    chapterId: 2,
    question:
      "Which of the following is true about the relationship between log(n!) and n log n?",
    options: [
      "log(n!) = o(n log n)",
      "log(n!) = \u03C9(n log n)",
      "log(n!) = \u0398(n log n)",
      "They are incomparable",
    ],
    answer: 2,
    explanation:
      "By Stirling's approximation, log(n!) = n log n - n log e + O(log n) = \u0398(n log n). This is why the decision-tree lower bound for sorting gives \u03A9(n log n).",
  },

  // ─── Chapter 3: Best, Worst & Average Case (3 questions) ─────────────
  {
    id: 7,
    chapterId: 3,
    question:
      "What is the average-case time complexity of randomized quicksort?",
    options: ["O(n\u00B2)", "O(n)", "O(log n)", "O(n log n)"],
    answer: 3,
    explanation:
      "Randomized quicksort achieves O(n log n) expected time because a random pivot produces balanced partitions on average. The expected number of comparisons is approximately 2n ln n.",
  },
  {
    id: 8,
    chapterId: 3,
    question:
      "For which algorithm does the best-case running time differ most dramatically from the worst case?",
    options: [
      "Merge sort",
      "Heap sort",
      "Insertion sort",
      "Counting sort",
    ],
    answer: 2,
    explanation:
      "Insertion sort runs in O(n) on already-sorted input (best case) but O(n\u00B2) on reverse-sorted input (worst case). Merge sort and heap sort are \u0398(n log n) in all cases, and counting sort is always \u0398(n + k).",
  },
  {
    id: 9,
    chapterId: 3,
    question:
      "If an algorithm's worst-case complexity is O(n\u00B2) and its best-case is \u03A9(n log n), which statement is definitely true?",
    options: [
      "The average case lies between \u03A9(n log n) and O(n\u00B2)",
      "The average case is \u0398(n\u00B2)",
      "The average case is \u0398(n log n)",
      "The algorithm is always slower than merge sort",
    ],
    answer: 0,
    explanation:
      "The average case cannot be faster than the best case or slower than the worst case, so it must be between \u03A9(n log n) and O(n\u00B2). Without more information, we cannot determine the exact average-case complexity.",
  },

  // ─── Chapter 4: Recurrence Relations (3 questions) ────────────────────
  {
    id: 10,
    chapterId: 4,
    question: "What is the recurrence relation for merge sort?",
    options: [
      "T(n) = T(n/2) + O(n)",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = 2T(n-1) + O(1)",
      "T(n) = 2T(n/2) + O(n\u00B2)",
    ],
    answer: 1,
    explanation:
      "Merge sort divides the array into two halves (2 subproblems of size n/2) and merges them in O(n) time, giving T(n) = 2T(n/2) + O(n).",
  },
  {
    id: 11,
    chapterId: 4,
    question:
      "The recurrence T(n) = T(n-1) + O(n) describes which algorithm's behavior?",
    options: [
      "Selection sort (or quicksort worst case)",
      "Binary search",
      "Merge sort",
      "Strassen's matrix multiplication",
    ],
    answer: 0,
    explanation:
      "Selection sort makes one pass of O(n) to find the minimum, then recurses on the remaining n-1 elements, giving T(n) = T(n-1) + O(n). This same recurrence describes quicksort's worst case with an unbalanced partition.",
  },
  {
    id: 12,
    chapterId: 4,
    question:
      "What is the solution to the recurrence T(n) = T(n-1) + O(1) with T(1) = O(1)?",
    options: ["O(1)", "O(log n)", "O(n\u00B2)", "O(n)"],
    answer: 3,
    explanation:
      "Unrolling the recurrence gives T(n) = T(1) + (n-1) \u00B7 O(1) = O(n). This is the recurrence for a simple linear scan or traversal.",
  },

  // ─── Chapter 5: Master Theorem (3 questions) ──────────────────────────
  {
    id: 13,
    chapterId: 5,
    question:
      "For T(n) = 4T(n/2) + n, which case of the Master Theorem applies, and what is the solution?",
    options: [
      "Case 3: T(n) = \u0398(n)",
      "Case 2: T(n) = \u0398(n\u00B2 log n)",
      "Case 1: T(n) = \u0398(n\u00B2)",
      "The Master Theorem does not apply",
    ],
    answer: 2,
    explanation:
      "Here a=4, b=2, so log_b(a) = log\u2082(4) = 2. Since f(n) = n = O(n^(2-\u03B5)) for \u03B5=1, Case 1 applies, giving T(n) = \u0398(n\u00B2).",
  },
  {
    id: 14,
    chapterId: 5,
    question:
      "For T(n) = 2T(n/2) + n log n, can the standard Master Theorem be directly applied?",
    options: [
      "Yes, it falls into Case 1",
      "Yes, it falls into Case 2",
      "Yes, it falls into Case 3",
      "No, because f(n) = n log n is not polynomially larger or smaller than n^(log_b a) = n",
    ],
    answer: 3,
    explanation:
      "With a=2, b=2, log_b(a) = 1, so n^(log_b a) = n. The function f(n) = n log n is asymptotically larger than n but not polynomially larger (n log n \u2260 \u03A9(n^(1+\u03B5)) for any \u03B5 > 0), so the basic Master Theorem does not apply. The extended version gives \u0398(n log\u00B2 n).",
  },
  {
    id: 15,
    chapterId: 5,
    question:
      "Strassen's matrix multiplication has recurrence T(n) = 7T(n/2) + \u0398(n\u00B2). What is its time complexity?",
    options: [
      "\u0398(n\u00B2)",
      "\u0398(n^(log\u2082 7)) \u2248 \u0398(n^2.807)",
      "\u0398(n\u00B2 log n)",
      "\u0398(n\u00B3)",
    ],
    answer: 1,
    explanation:
      "With a=7, b=2, log_b(a) = log\u2082(7) \u2248 2.807. Since f(n) = n\u00B2 = O(n^(2.807-\u03B5)), Case 1 of the Master Theorem applies, giving T(n) = \u0398(n^(log\u2082 7)).",
  },

  // ─── Chapter 6: Recursion Trees & Substitution (3 questions) ──────────
  {
    id: 16,
    chapterId: 6,
    question:
      "In a recursion tree for T(n) = 2T(n/2) + n, what is the total work done at each level?",
    options: [
      "It doubles at each level",
      "It remains n at every level",
      "It halves at each level",
      "It is n\u00B2 at every level",
    ],
    answer: 1,
    explanation:
      "At level k, there are 2^k subproblems each of size n/2^k, contributing 2^k \u00B7 (n/2^k) = n total work per level. With log n levels, the total is \u0398(n log n).",
  },
  {
    id: 17,
    chapterId: 6,
    question:
      "When using the substitution method to prove T(n) = O(n log n) for T(n) = 2T(n/2) + n, what is the typical guess you substitute?",
    options: [
      "T(n) \u2264 cn",
      "T(n) \u2264 cn\u00B2",
      "T(n) \u2264 cn log n",
      "T(n) \u2264 c \u00B7 2\u207F",
    ],
    answer: 2,
    explanation:
      "The substitution method requires guessing T(n) \u2264 cn log n, then proving by induction that the guess holds. Substituting into the recurrence: T(n) \u2264 2 \u00B7 c(n/2)log(n/2) + n = cn log n - cn + n \u2264 cn log n for c \u2265 1.",
  },
  {
    id: 18,
    chapterId: 6,
    question:
      "In a recursion tree for T(n) = 3T(n/4) + cn\u00B2, what happens to the total work per level as you go deeper?",
    options: [
      "It decreases geometrically",
      "It stays the same",
      "It alternates between increasing and decreasing",
      "It increases geometrically",
    ],
    answer: 0,
    explanation:
      "At level k the work is 3^k \u00B7 c(n/4^k)\u00B2 = cn\u00B2 \u00B7 (3/16)^k. Since 3/16 < 1, the work decreases geometrically. The root dominates, and the total is \u0398(n\u00B2), consistent with Master Theorem Case 3.",
  },

  // ─── Chapter 7: Amortized Analysis (3 questions) ──────────────────────
  {
    id: 19,
    chapterId: 7,
    question:
      "In amortized analysis of a dynamic array that doubles in size when full, what is the amortized cost per insertion?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n\u00B2)"],
    answer: 1,
    explanation:
      "Although individual insertions that trigger a resize cost O(n), these resizes happen infrequently enough (at powers of 2) that the total cost of n insertions is O(n), making the amortized cost per insertion O(1).",
  },
  {
    id: 20,
    chapterId: 7,
    question:
      "Which of the following is NOT a standard method for amortized analysis?",
    options: [
      "Aggregate method",
      "Accounting (banker's) method",
      "Probabilistic method",
      "Potential method",
    ],
    answer: 2,
    explanation:
      "The three standard amortized analysis methods are aggregate, accounting (banker's), and potential. The probabilistic method is a technique in combinatorics and randomized algorithm analysis, not an amortized analysis technique.",
  },
  {
    id: 21,
    chapterId: 7,
    question:
      "In the potential method, if an operation's actual cost is c_i and the potential changes by \u0394\u03A6_i, what is the amortized cost?",
    options: [
      "c_i - \u0394\u03A6_i",
      "c_i \u00B7 \u0394\u03A6_i",
      "\u0394\u03A6_i / c_i",
      "c_i + \u0394\u03A6_i",
    ],
    answer: 3,
    explanation:
      "In the potential method, the amortized cost is defined as \u0109_i = c_i + \u03A6(D_i) - \u03A6(D_{i-1}) = c_i + \u0394\u03A6_i. Expensive operations that decrease potential have a lower amortized cost, while cheap operations that increase potential have a higher amortized cost.",
  },

  // ─── Chapter 8: Probabilistic & Randomized Analysis (3 questions) ─────
  {
    id: 22,
    chapterId: 8,
    question:
      "What is the expected number of comparisons in randomized quicksort on an array of n elements?",
    options: [
      "n log\u2082 n",
      "n\u00B2 / 2",
      "2n ln n \u2248 1.39n log\u2082 n",
      "n(n-1) / 4",
    ],
    answer: 2,
    explanation:
      "The expected number of comparisons in randomized quicksort is 2n H_n \u2248 2n ln n, where H_n is the n-th harmonic number. This is approximately 1.39n log\u2082 n, which is about 39% more comparisons than the information-theoretic optimum.",
  },
  {
    id: 23,
    chapterId: 8,
    question:
      "What is the expected time to find an element using a hash table with chaining, assuming simple uniform hashing and load factor \u03B1 = n/m?",
    options: [
      "\u0398(log n)",
      "\u0398(n)",
      "\u0398(\u03B1\u00B2)",
      "\u0398(1 + \u03B1)",
    ],
    answer: 3,
    explanation:
      "Under simple uniform hashing, the expected chain length is \u03B1 = n/m. A search requires O(1) to compute the hash plus O(\u03B1) to traverse the chain, giving \u0398(1 + \u03B1) expected time. When m = \u0398(n), this is O(1).",
  },
  {
    id: 24,
    chapterId: 8,
    question:
      "In a randomized algorithm, what does it mean for the algorithm to be 'Las Vegas' type?",
    options: [
      "It always gives the correct answer but its running time is random",
      "It always runs in polynomial time but may give an incorrect answer",
      "It uses random bits but is deterministic in behavior",
      "It gives an approximate answer with guaranteed error bounds",
    ],
    answer: 0,
    explanation:
      "A Las Vegas algorithm always produces the correct result, but its running time is a random variable (e.g., randomized quicksort). In contrast, a Monte Carlo algorithm has deterministic running time but may produce incorrect results with bounded probability.",
  },

  // ─── Chapter 9: Loop Invariants & Correctness (3 questions) ───────────
  {
    id: 25,
    chapterId: 9,
    question:
      "Which three properties must a loop invariant satisfy to prove an algorithm correct?",
    options: [
      "Precondition, invariant, postcondition",
      "Base case, inductive step, conclusion",
      "Soundness, completeness, decidability",
      "Initialization, maintenance, termination",
    ],
    answer: 3,
    explanation:
      "A loop invariant must hold at initialization (true before the first iteration), be maintained by each iteration (if true before, still true after), and upon termination yield a useful property that helps prove the algorithm's correctness.",
  },
  {
    id: 26,
    chapterId: 9,
    question:
      "For insertion sort, which of the following is a valid loop invariant for the outer loop (iterating with index j from 2 to n)?",
    options: [
      "A[1..n] is fully sorted",
      "A[j..n] is sorted",
      "A[1..j-1] contains the j-1 smallest elements of the original array",
      "A[1..j-1] consists of the elements originally in A[1..j-1] but in sorted order",
    ],
    answer: 3,
    explanation:
      "The invariant states that A[1..j-1] contains the same elements that were originally in those positions, now in sorted order. This is maintained each iteration as the new element A[j] is inserted into its correct position within A[1..j-1].",
  },
  {
    id: 27,
    chapterId: 9,
    question:
      "What is the primary purpose of proving termination separately from the loop invariant?",
    options: [
      "To show the loop runs in polynomial time",
      "To prove the loop invariant is tight",
      "To guarantee the algorithm halts and the invariant yields the postcondition",
      "Termination is already guaranteed by the invariant's maintenance property",
    ],
    answer: 2,
    explanation:
      "The invariant's maintenance property only shows the property is preserved each iteration. Proving termination (e.g., via a decreasing variant/measure) ensures the loop actually ends, at which point the invariant combined with the exit condition gives us the desired postcondition.",
  },

  // ─── Chapter 10: Space Complexity (3 questions) ───────────────────────
  {
    id: 28,
    chapterId: 10,
    question:
      "What is the space complexity of merge sort on an array of n elements?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 2,
    explanation:
      "Merge sort requires O(n) auxiliary space for the temporary arrays used during merging. Although the recursion depth is O(log n), the dominant space cost is the O(n) merge buffer.",
  },
  {
    id: 29,
    chapterId: 10,
    question:
      "Which sorting algorithm achieves O(n log n) worst-case time with only O(1) auxiliary space?",
    options: ["Merge sort", "Heapsort", "Quicksort", "Radix sort"],
    answer: 1,
    explanation:
      "Heapsort sorts in-place using O(1) auxiliary space and guarantees O(n log n) worst-case time. Merge sort needs O(n) space, quicksort's worst case is O(n\u00B2), and radix sort needs O(n + k) space.",
  },
  {
    id: 30,
    chapterId: 10,
    question:
      "What is the space complexity of a naive recursive Fibonacci implementation (without memoization) computing F(n)?",
    options: ["O(n)", "O(1)", "O(2\u207F)", "O(n\u00B2)"],
    answer: 0,
    explanation:
      "Although the naive recursive Fibonacci has O(2\u207F) time complexity, its space complexity is O(n) because the maximum recursion depth is n. The call stack never holds more than n frames simultaneously since branches are explored one at a time.",
  },

  // ─── Chapter 11: Lower Bounds (3 questions) ───────────────────────────
  {
    id: 31,
    chapterId: 11,
    question:
      "What is the lower bound for comparison-based sorting of n elements?",
    options: [
      "\u03A9(n\u00B2)",
      "\u03A9(n log n)",
      "\u03A9(log n)",
      "\u03A9(n)",
    ],
    answer: 1,
    explanation:
      "Any comparison-based sorting algorithm must make at least \u03A9(n log n) comparisons in the worst case. This is proven via the decision tree model: there are n! permutations, requiring a tree of height at least log(n!) = \u03A9(n log n).",
  },
  {
    id: 32,
    chapterId: 11,
    question:
      "Which technique is used to prove that comparison-based sorting requires \u03A9(n log n) comparisons?",
    options: [
      "Reduction from 3-SAT",
      "The decision tree model",
      "The pumping lemma",
      "Amortized analysis",
    ],
    answer: 1,
    explanation:
      "The decision tree model represents all possible execution paths of a comparison-based algorithm as a binary tree. Since the tree must have at least n! leaves (one per permutation), its height must be at least log\u2082(n!) = \u03A9(n log n).",
  },
  {
    id: 33,
    chapterId: 11,
    question:
      "What is the lower bound for finding the minimum element in an unsorted array of n elements?",
    options: [
      "\u03A9(n)",
      "\u03A9(1)",
      "\u03A9(log n)",
      "\u03A9(n log n)",
    ],
    answer: 0,
    explanation:
      "Finding the minimum requires examining every element at least once, since any unexamined element could be the minimum. This adversarial argument establishes a lower bound of \u03A9(n) comparisons, which is tight since a single pass achieves it.",
  },

  // ─── Chapter 12: Approximation Analysis (3 questions) ─────────────────
  {
    id: 34,
    chapterId: 12,
    question:
      "A 2-approximation algorithm for an NP-hard minimization problem guarantees that its solution is at most how far from optimal?",
    options: [
      "At most 2 units more than OPT",
      "Within 50% of optimal",
      "Exactly 2 times OPT",
      "At most twice the optimal value",
    ],
    answer: 3,
    explanation:
      "A \u03C1-approximation for a minimization problem guarantees that ALG \u2264 \u03C1 \u00B7 OPT. A 2-approximation therefore produces a solution that costs at most twice the optimal. The ratio is multiplicative, not additive.",
  },
  {
    id: 35,
    chapterId: 12,
    question:
      "The greedy algorithm for vertex cover (repeatedly picking an edge and adding both endpoints) achieves what approximation ratio?",
    options: ["1 (exact)", "log n", "2", "n / 2"],
    answer: 2,
    explanation:
      "The edge-picking greedy algorithm for vertex cover is a 2-approximation. It selects at most 2 \u00B7 OPT vertices because the selected edges form a matching, and any vertex cover must include at least one endpoint of each edge in that matching.",
  },
  {
    id: 36,
    chapterId: 12,
    question:
      "What is a Polynomial-Time Approximation Scheme (PTAS)?",
    options: [
      "An algorithm that runs in polynomial time and gives an exact answer",
      "An algorithm that gives a 2-approximation in O(n\u00B2) time",
      "A randomized algorithm with expected polynomial running time",
      "A family of algorithms where, for any fixed \u03B5 > 0, a (1+\u03B5)-approximate solution is found in time polynomial in n",
    ],
    answer: 3,
    explanation:
      "A PTAS provides a (1+\u03B5)-approximation for any chosen \u03B5 > 0, running in time polynomial in n (though possibly exponential in 1/\u03B5). This means you can get arbitrarily close to optimal, with increasing computation cost as \u03B5 shrinks.",
  },

  // ─── Chapter 13: Online & Competitive Analysis (3 questions) ──────────
  {
    id: 37,
    chapterId: 13,
    question:
      "In competitive analysis, an online algorithm is said to be c-competitive if its cost satisfies which condition for all input sequences I?",
    options: [
      "ALG(I) \u2264 OPT(I) / c",
      "ALG(I) \u2264 c \u00B7 OPT(I) + b for some constant b",
      "ALG(I) \u2264 c + OPT(I)",
      "ALG(I) = c \u00B7 OPT(I) exactly",
    ],
    answer: 1,
    explanation:
      "An online algorithm is c-competitive if there exists a constant b such that ALG(I) \u2264 c \u00B7 OPT(I) + b for all input sequences I. The additive constant b accounts for initialization costs and ensures the definition is not vacuous for small inputs.",
  },
  {
    id: 38,
    chapterId: 13,
    question:
      "What is the competitive ratio of the Least Recently Used (LRU) caching policy with cache size k?",
    options: ["k", "1", "2k", "log k"],
    answer: 0,
    explanation:
      "LRU is k-competitive, where k is the cache size. This means in the worst case, LRU incurs at most k times as many cache misses as the optimal offline algorithm (which has perfect future knowledge). This ratio is tight and matches the lower bound for deterministic online paging.",
  },
  {
    id: 39,
    chapterId: 13,
    question:
      "Which of the following problems is NOT typically studied in the context of online algorithms?",
    options: [
      "Paging / caching",
      "Online ski rental",
      "Online load balancing",
      "Topological sorting of a DAG",
    ],
    answer: 3,
    explanation:
      "Topological sorting requires knowing the entire graph structure upfront and is inherently an offline problem. Paging, ski rental, and load balancing are classic online problems where decisions must be made without knowledge of future inputs.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
