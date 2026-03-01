export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ============================================================
  // Topic 1: Propositional Logic (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "When is the conditional statement p -> q false?",
    options: [
      "When both p and q are false",
      "When p is false and q is true",
      "When p is true and q is false",
      "When both p and q are true",
    ],
    answer: 2,
    explanation:
      "The conditional p -> q (if p then q) is false only when the hypothesis p is true but the conclusion q is false. In all other cases — including when p is false — the conditional is vacuously true. This is counterintuitive at first but is mathematically consistent: a false hypothesis makes any promise trivially kept. For example, 'if pigs fly, then the moon is made of cheese' is considered true because the hypothesis is false.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "Which of the following is De Morgan's Law applied to ~(p AND q)?",
    options: [
      "~p AND ~q",
      "~p OR ~q",
      "p OR q",
      "~(p OR q)",
    ],
    answer: 1,
    explanation:
      "De Morgan's Law states that the negation of a conjunction is the disjunction of the negations: ~(p AND q) is equivalent to (~p OR ~q). Similarly, ~(p OR q) is equivalent to (~p AND ~q). The key pattern is that negation distributes over the connective while flipping AND to OR (or vice versa). This law is fundamental in circuit design, compiler optimizations, and simplifying logical expressions.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "What does it mean for a propositional formula to be in Conjunctive Normal Form (CNF)?",
    options: [
      "It is a disjunction (OR) of conjunctive (AND) clauses, where each clause is a conjunction of literals",
      "It is a conjunction (AND) of disjunctive (OR) clauses, where each clause is a disjunction of literals",
      "It is a sequence of if-then statements connected by AND",
      "It contains only negation and AND operators",
    ],
    answer: 1,
    explanation:
      "CNF is a conjunction (AND) of clauses, where each clause is a disjunction (OR) of literals. For example, (p OR ~q) AND (~p OR q OR r) AND (q OR ~r) is in CNF. SAT solvers operate on CNF because the structure enables efficient unit propagation and conflict analysis. Every propositional formula can be converted to an equivalent CNF (possibly with auxiliary variables via Tseitin transformation to avoid exponential blowup).",
  },

  // ============================================================
  // Topic 2: Predicate Logic & Quantifiers (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "How does changing the order of nested quantifiers affect meaning? Consider 'for all x, exists y, P(x,y)' vs 'exists y, for all x, P(x,y)'.",
    options: [
      "They always mean the same thing",
      "The first says for each x we can find a (possibly different) y; the second says there is a single y that works for all x — the second is strictly stronger",
      "The second is weaker because it only requires one y",
      "Order never matters for nested quantifiers",
    ],
    answer: 1,
    explanation:
      "In 'for all x, exists y, P(x,y)', the choice of y can depend on x — each x gets its own y. In 'exists y, for all x, P(x,y)', one fixed y must satisfy P(x,y) for every x simultaneously. The second statement implies the first (if one y works for all x, then certainly for each x there exists a y), but not vice versa. For example, 'for every person, there exists someone they like' vs 'there exists someone whom everyone likes' — the latter is much stronger.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "What does modus tollens allow you to conclude from p -> q and ~q?",
    options: [
      "p",
      "~p",
      "q",
      "p -> ~q",
    ],
    answer: 1,
    explanation:
      "Modus tollens is the inference rule: from p -> q and ~q, conclude ~p. The reasoning is: if p implies q, and q is false, then p must also be false (otherwise p -> q would be false). This is equivalent to reasoning via the contrapositive: p -> q is the same as ~q -> ~p, and since ~q is true, ~p follows by modus ponens on the contrapositive. Modus tollens is used extensively in proofs by contraposition.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "What is the significance of Goedel's first incompleteness theorem?",
    options: [
      "It proves that all mathematical statements can be decided by a computer",
      "It shows that any consistent formal system capable of expressing basic arithmetic contains true statements that cannot be proved within the system",
      "It proves that propositional logic is undecidable",
      "It shows that first-order logic is always complete",
    ],
    answer: 1,
    explanation:
      "Goedel's first incompleteness theorem (1931) demonstrates a fundamental limitation of formal systems: any consistent system that is powerful enough to express basic arithmetic (like Peano arithmetic or ZFC set theory) necessarily contains statements that are true but unprovable within the system. This means no single formal system can capture all mathematical truths. The proof constructs a self-referential statement analogous to 'this statement is not provable' — if the system is consistent, this statement must be true but unprovable.",
  },

  // ============================================================
  // Topic 3: Proof Techniques (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "What is the key difference between a direct proof of p -> q and a proof by contraposition?",
    options: [
      "A direct proof assumes q and derives p; contraposition assumes ~p and derives ~q",
      "A direct proof assumes p and derives q; contraposition assumes ~q and derives ~p — both establish p -> q but start from different assumptions",
      "Direct proofs only work for algebraic statements; contraposition works for all statements",
      "There is no difference — they always produce identical proofs",
    ],
    answer: 1,
    explanation:
      "A direct proof of p -> q starts by assuming p is true and uses logical deductions to arrive at q. Proof by contraposition instead assumes ~q (the negation of the conclusion) and derives ~p (the negation of the hypothesis). Since p -> q is logically equivalent to its contrapositive ~q -> ~p, both approaches are equally valid. Contraposition is preferred when negating q provides a more useful starting point — for example, proving 'if n^2 is even, then n is even' is easier by assuming n is odd and showing n^2 is odd.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "In a proof by contradiction of statement S, what do you assume and what do you aim to derive?",
    options: [
      "Assume S is true; derive a known theorem",
      "Assume ~S (the negation of S) is true; derive a logical contradiction such as p AND ~p",
      "Assume S is false; derive S",
      "Assume an unrelated statement; derive S from it",
    ],
    answer: 1,
    explanation:
      "In proof by contradiction (reductio ad absurdum), you assume the negation of the statement you want to prove (~S) and then derive a logical contradiction — a statement that is always false, such as p AND ~p. Since a valid chain of reasoning from a true premise cannot produce a false conclusion, the assumption ~S must be false, meaning S is true. Classic examples include proving the irrationality of sqrt(2) and the infinitude of primes.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "What are the two steps required in a proof by mathematical induction to prove P(n) for all n >= 1?",
    options: [
      "Assume P(n) for some n, then prove P(n+1); repeat for all values of n",
      "Prove the base case P(1); then prove the inductive step — that for any k >= 1, if P(k) is true then P(k+1) is true",
      "Prove P(1) and P(2); then assume P(n) holds for all n",
      "Prove the statement for an arbitrary n; then generalize",
    ],
    answer: 1,
    explanation:
      "Mathematical induction requires two steps: (1) the base case — prove P(1) is true (or P(0), depending on the starting point); (2) the inductive step — prove that for any k >= 1, the truth of P(k) (the inductive hypothesis) implies the truth of P(k+1). Together, these establish P(n) for all n >= 1 because: P(1) is true (base case), so P(2) is true (inductive step with k=1), so P(3) is true (inductive step with k=2), and so on for all natural numbers.",
  },

  // ============================================================
  // Topic 4: Set Theory (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "If set A has 5 elements, how many elements does the power set P(A) have?",
    options: [
      "5",
      "10",
      "25",
      "32",
    ],
    answer: 3,
    explanation:
      "The power set P(A) is the set of all subsets of A. For a set with n elements, |P(A)| = 2^n because each element is independently either included or excluded from a subset, giving 2 choices per element. With n = 5: |P(A)| = 2^5 = 32. These 32 subsets include the empty set (which is a subset of every set) and A itself, plus all 30 other subsets of various sizes from 1 to 4 elements.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "What does the symmetric difference A triangle B compute?",
    options: [
      "All elements in both A and B (intersection)",
      "All elements in A or B but not both — equivalent to (A - B) union (B - A)",
      "All elements in A but not in B (set difference)",
      "All elements in neither A nor B (complement of union)",
    ],
    answer: 1,
    explanation:
      "The symmetric difference A triangle B contains elements that are in exactly one of the two sets — elements in A or B but not in both. It can be expressed as (A - B) union (B - A), or equivalently as (A union B) - (A intersect B). The symmetric difference is commutative, associative, and has the empty set as its identity element. It is particularly useful in error detection (XOR operation in binary) and in measuring the 'distance' between two sets.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "Using inclusion-exclusion, what is |A union B| if |A| = 30, |B| = 20, and |A intersect B| = 8?",
    options: [
      "50",
      "42",
      "58",
      "22",
    ],
    answer: 1,
    explanation:
      "The inclusion-exclusion principle states |A union B| = |A| + |B| - |A intersect B|. This is necessary because elements in the intersection are counted once in |A| and once in |B|, so they are double-counted in the sum |A| + |B|. Subtracting |A intersect B| corrects for this: |A union B| = 30 + 20 - 8 = 42. This principle generalizes to three or more sets, with alternating addition and subtraction of intersection sizes.",
  },

  // ============================================================
  // Topic 5: Relations (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "A relation R on set A is an equivalence relation if and only if it is:",
    options: [
      "Reflexive, symmetric, and antisymmetric",
      "Reflexive, symmetric, and transitive",
      "Reflexive, antisymmetric, and transitive",
      "Symmetric, antisymmetric, and transitive",
    ],
    answer: 1,
    explanation:
      "An equivalence relation must satisfy three properties: reflexive (every element is related to itself: aRa), symmetric (if aRb then bRa), and transitive (if aRb and bRc then aRc). This combination partitions the set into equivalence classes where all elements within a class are equivalent to each other. Note that a relation cannot be both symmetric and antisymmetric unless it is a subset of the identity relation, so equivalence relations (option B) and partial orders (option C — reflexive, antisymmetric, transitive) are fundamentally different.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "What is the fundamental connection between equivalence relations and partitions?",
    options: [
      "Every equivalence relation defines a total order on the set",
      "Every equivalence relation on a set induces a partition into disjoint equivalence classes, and conversely every partition defines an equivalence relation — they are two views of the same structure",
      "Equivalence relations can only partition finite sets",
      "Partitions define equivalence relations only when the set has prime cardinality",
    ],
    answer: 1,
    explanation:
      "The partition theorem establishes a bijection between equivalence relations on a set A and partitions of A. Given an equivalence relation ~, the equivalence classes [a] = {x | x ~ a} are disjoint (two classes are either identical or disjoint) and cover all of A, forming a partition. Conversely, given a partition, define x ~ y if and only if x and y are in the same block — this is an equivalence relation. This duality is fundamental: any time you have a notion of 'sameness', you get a grouping, and vice versa.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "What is a Hasse diagram used to represent?",
    options: [
      "Equivalence classes of an equivalence relation",
      "The truth table of a propositional formula",
      "The covering relations of a partially ordered set — showing direct order relationships with transitive edges omitted",
      "The adjacency matrix of a graph",
    ],
    answer: 2,
    explanation:
      "A Hasse diagram visualizes a finite partially ordered set (poset) by drawing elements as points and drawing upward lines for covering relations (a covers b if a > b and there is no c with a > c > b). Transitive edges are omitted because they can be inferred (if a line goes from x up to y and from y up to z, we know x < z without drawing a direct line). Reflexive loops are also omitted. This produces a clean visualization of the order structure, commonly used for divisibility lattices, subset orderings, and type hierarchies.",
  },

  // ============================================================
  // Topic 6: Functions (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "A function f: A -> B is a bijection if and only if it is:",
    options: [
      "Injective (one-to-one) only",
      "Surjective (onto) only",
      "Both injective and surjective — every element of B is hit by exactly one element of A",
      "Neither injective nor surjective",
    ],
    answer: 2,
    explanation:
      "A bijection is a function that is both injective (no two inputs map to the same output) and surjective (every element of the codomain is an output of some input). Together, these properties establish a perfect one-to-one correspondence between A and B, meaning |A| = |B| for finite sets. Bijections are invertible — there exists a unique inverse function f^(-1): B -> A. Bijections are fundamental to the concept of cardinality: two sets have the same cardinality if and only if a bijection exists between them.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What does Cantor's diagonal argument prove about the real numbers?",
    options: [
      "The real numbers are countable, just like the rational numbers",
      "The real numbers are uncountable — any attempted listing of real numbers in [0,1] can be 'diagonalized' to produce a real not in the list, so no bijection with the natural numbers exists",
      "The real numbers have the same cardinality as the integers",
      "The real numbers form a well-ordered set",
    ],
    answer: 1,
    explanation:
      "Cantor's diagonal argument (1891) proves that the real numbers are uncountable by contradiction. Assume a complete listing of all reals in [0,1] as infinite decimal expansions: r1, r2, r3, .... Construct a new real number d by making the nth digit of d different from the nth digit of r_n. Then d differs from every r_n in at least one digit, so d is not in the list — contradicting the assumption of a complete listing. This proves |R| > |N|, establishing that there are 'more' real numbers than natural numbers.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "What is the transitive closure R+ of a relation R?",
    options: [
      "The smallest symmetric relation containing R",
      "The relation R with all self-loops added",
      "The smallest transitive relation containing R — it adds (a,c) whenever there is a path from a to c through R",
      "The complement of R",
    ],
    answer: 2,
    explanation:
      "The transitive closure R+ of a relation R is the smallest transitive relation that contains R. Concretely, (a,c) is in R+ if there exists a sequence a = x0, x1, ..., xk = c with k >= 1 such that (x_i, x_{i+1}) is in R for all i. In graph terms, R+ represents reachability: (a,c) is in R+ if and only if there is a directed path from a to c in the graph of R. It can be computed using Warshall's algorithm in O(n^3) time or by BFS/DFS from each vertex.",
  },

  // ============================================================
  // Topic 7: Graph Fundamentals (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "What does the handshaking lemma state about the sum of vertex degrees in any undirected graph?",
    options: [
      "The sum of all vertex degrees equals the number of vertices",
      "The sum of all vertex degrees equals the number of edges",
      "The sum of all vertex degrees equals twice the number of edges — because each edge contributes 1 to the degree of each of its two endpoints",
      "The sum of all vertex degrees equals the number of vertices squared",
    ],
    answer: 2,
    explanation:
      "The handshaking lemma states that the sum of degrees of all vertices in an undirected graph equals 2|E|, where |E| is the number of edges. This is because each edge {u,v} is counted once in the degree of u and once in the degree of v, contributing 2 to the total sum. A direct consequence is that the number of vertices with odd degree must be even. This lemma is one of the most fundamental results in graph theory and is useful for proving properties about degree sequences.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "When is an adjacency matrix representation preferred over an adjacency list?",
    options: [
      "For sparse graphs where E << V^2, because it saves space",
      "For dense graphs where E is close to V^2, because O(1) edge lookup outweighs the O(V^2) space cost — and the space is used efficiently",
      "Always, because adjacency matrices are simpler",
      "When the graph is a tree",
    ],
    answer: 1,
    explanation:
      "Adjacency matrices use O(V^2) space regardless of the number of edges, with O(1) edge existence checks. For dense graphs (where E approaches V^2), this space is mostly utilized and the constant-time lookup is advantageous. Adjacency lists use O(V + E) space, which is much smaller for sparse graphs. For a graph with 1000 vertices and 2000 edges, an adjacency list uses ~3000 entries vs a matrix with 1,000,000 entries. The matrix is also cache-friendly for dense graph algorithms like Floyd-Warshall.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "What does Euler's formula V - E + F = 2 apply to?",
    options: [
      "Any graph with at least 3 vertices",
      "Connected planar graphs drawn in the plane — where V is vertices, E is edges, and F is faces (regions including the outer infinite region)",
      "Only complete graphs K_n",
      "Directed acyclic graphs (DAGs)",
    ],
    answer: 1,
    explanation:
      "Euler's formula V - E + F = 2 applies to connected planar graphs drawn in the plane without edge crossings. V is the number of vertices, E the number of edges, and F the number of faces (bounded regions plus the one unbounded outer face). For example, a triangle (K3) has V=3, E=3, F=2 (one inner triangle face and the outer face): 3 - 3 + 2 = 2. This formula is used to derive bounds like E <= 3V - 6 for simple planar graphs, which can quickly prove certain graphs (like K5) are non-planar.",
  },

  // ============================================================
  // Topic 8: Graph Traversal & Connectivity (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "Why does BFS guarantee finding the shortest path in an unweighted graph?",
    options: [
      "BFS always visits the minimum number of vertices",
      "BFS explores vertices in order of their distance from the source — it discovers all vertices at distance k before any at distance k+1, so the first time it reaches a vertex is via the shortest path",
      "BFS uses a priority queue to prioritize shorter paths",
      "BFS visits every possible path and selects the shortest",
    ],
    answer: 1,
    explanation:
      "BFS uses a queue (FIFO) to process vertices in the order they are discovered. Starting from the source, it first visits all neighbors (distance 1), then all neighbors of neighbors (distance 2), and so on. Because of this layer-by-layer exploration, the first time BFS reaches a vertex is guaranteed to be via the shortest path. This property relies on all edges having equal weight (or weight 1). For weighted graphs, Dijkstra's algorithm is needed because a path with fewer edges may have higher total weight.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "What is a strongly connected component (SCC) in a directed graph?",
    options: [
      "A subgraph where every vertex has the same degree",
      "A maximal set of vertices such that there is a directed path from every vertex to every other vertex in the set",
      "A set of vertices that are all connected to a single hub vertex",
      "A subgraph with no cycles",
    ],
    answer: 1,
    explanation:
      "A strongly connected component is a maximal subset of vertices in a directed graph such that for every pair of vertices u and v in the subset, there exists a directed path from u to v AND a directed path from v to u. 'Maximal' means no additional vertex can be added while maintaining this property. Algorithms by Tarjan (single DFS) and Kosaraju (two DFS passes) find all SCCs in O(V + E) time. The condensation graph (collapsing each SCC to a single node) is always a DAG.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "What condition guarantees the existence of an Euler circuit in a connected undirected graph?",
    options: [
      "Every vertex has degree at least 2",
      "The graph has an even number of edges",
      "Every vertex has even degree",
      "The graph is bipartite",
    ],
    answer: 2,
    explanation:
      "A connected undirected graph has an Euler circuit (a closed walk visiting every edge exactly once) if and only if every vertex has even degree. This is because at each vertex the circuit must enter and leave an equal number of times, using distinct edges each time — requiring pairs of edges at each vertex. An Euler path (not necessarily closed) exists if exactly two vertices have odd degree — the path starts at one odd-degree vertex and ends at the other. This characterization was first proved by Euler in 1736.",
  },

  // ============================================================
  // Topic 9: Trees & Spanning Trees (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "How many edges does a tree with n vertices have?",
    options: [
      "n",
      "n - 1",
      "n + 1",
      "2n - 2",
    ],
    answer: 1,
    explanation:
      "A tree with n vertices always has exactly n - 1 edges. This can be proved by induction: a single vertex (n=1) has 0 = 1-1 edges; adding a new vertex to a tree requires connecting it with exactly one new edge (otherwise it would either be disconnected or create a cycle), increasing both the vertex count and edge count by 1. This property is one of several equivalent characterizations of trees: a connected graph with n-1 edges, a connected acyclic graph, or a graph where any two vertices are connected by exactly one path.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "What greedy strategy does Kruskal's algorithm use to find the minimum spanning tree?",
    options: [
      "Start from a vertex and always add the nearest unvisited vertex",
      "Sort all edges by weight and add the smallest edge that does not create a cycle — using union-find to efficiently detect cycles",
      "Randomly select edges and check if the result is a spanning tree",
      "Use BFS from the lightest edge to build the tree",
    ],
    answer: 1,
    explanation:
      "Kruskal's algorithm sorts all edges by weight in non-decreasing order, then iterates through them, adding each edge to the MST if it does not create a cycle. Cycle detection is efficiently done using a union-find (disjoint set) data structure: an edge (u,v) creates a cycle if u and v are already in the same component. The algorithm runs in O(E log E) time (dominated by sorting). The cut property justifies this greedy approach: the minimum weight edge crossing any cut must be in the MST.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "Why can't Dijkstra's algorithm handle graphs with negative edge weights?",
    options: [
      "Dijkstra's algorithm doesn't use a priority queue",
      "Negative edges cause integer overflow in distance calculations",
      "Dijkstra's algorithm assumes that once a vertex is finalized (removed from the priority queue), no shorter path to it can be found — negative edges can violate this by providing a shorter path through a longer route",
      "Negative edges make the graph disconnected",
    ],
    answer: 2,
    explanation:
      "Dijkstra's algorithm greedily finalizes vertices in order of their distance from the source. Once a vertex v is removed from the priority queue with distance d, the algorithm assumes no shorter path to v exists. With negative edges, a longer path (more hops) through a negative edge could yield a shorter total distance, but v has already been finalized. For example, with edges A->B (weight 1), A->C (weight 5), C->B (weight -10): Dijkstra finalizes B with distance 1, but the path A->C->B has distance -5. Bellman-Ford handles this correctly.",
  },

  // ============================================================
  // Topic 10: Counting & Combinatorics (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "How many ways can you arrange 3 items chosen from 5 distinct items (order matters, no repetition)?",
    options: [
      "10",
      "60",
      "125",
      "15",
    ],
    answer: 1,
    explanation:
      "This is a permutation without repetition: P(5,3) = 5! / (5-3)! = 5! / 2! = (5 * 4 * 3 * 2 * 1) / (2 * 1) = 120 / 2 = 60. Alternatively, by the product rule: 5 choices for the first position, 4 for the second (one item used), and 3 for the third = 5 * 4 * 3 = 60. Order matters (ABC is different from CBA), and no item can be reused. If order did not matter, the answer would be C(5,3) = 10 combinations.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What is C(n, k) also known as and what does it count?",
    options: [
      "The permutation count — the number of ordered arrangements of k items from n",
      "The binomial coefficient — the number of ways to choose k items from n distinct items without regard to order",
      "The factorial function — the product of all positive integers up to n",
      "The partition number — the number of ways to write n as a sum of positive integers",
    ],
    answer: 1,
    explanation:
      "C(n,k), also written as 'n choose k' or (n over k), is the binomial coefficient. It counts the number of ways to select k items from n distinct items where order does not matter. The formula is C(n,k) = n! / (k! * (n-k)!). It is called 'binomial' because these values appear as coefficients in the binomial theorem: (x+y)^n = sum of C(n,k) * x^(n-k) * y^k. Symmetry gives C(n,k) = C(n, n-k), and the values form Pascal's triangle.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "What does Pascal's identity C(n,k) = C(n-1,k-1) + C(n-1,k) mean combinatorially?",
    options: [
      "It means choosing k items from n is impossible",
      "It means choosing k items from n can be split into two cases: either a specific element is included (requiring k-1 more from the remaining n-1) or it is excluded (requiring k from the remaining n-1)",
      "It means the sum of any row of Pascal's triangle equals n",
      "It means C(n,k) is always even",
    ],
    answer: 1,
    explanation:
      "Pascal's identity has a beautiful combinatorial interpretation. Fix any particular element e in the n-element set. Every k-element subset either contains e or doesn't. Subsets containing e: we need k-1 more elements from the remaining n-1 = C(n-1, k-1) ways. Subsets not containing e: we need all k elements from the remaining n-1 = C(n-1, k) ways. Since these cases are mutually exclusive and exhaustive, C(n,k) = C(n-1,k-1) + C(n-1,k). This identity builds Pascal's triangle row by row.",
  },

  // ============================================================
  // Topic 11: Advanced Counting (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "What is a derangement, and approximately what fraction of permutations are derangements for large n?",
    options: [
      "A permutation where every element stays in place — approximately 100% for large n",
      "A permutation where no element remains in its original position — approximately 1/e (about 36.8%) for large n",
      "A permutation sorted in reverse order — exactly 1 out of n! permutations",
      "A cyclic permutation — approximately 1/n for large n",
    ],
    answer: 1,
    explanation:
      "A derangement is a permutation where no element appears in its original position — every element is displaced. The number of derangements D(n) = n! * sum from k=0 to n of (-1)^k / k!, which is the nearest integer to n!/e. As n grows large, the fraction D(n)/n! converges to 1/e approximately 0.3679. This surprising result means that about 36.8% of all permutations are derangements, regardless of n (for large n). The formula is derived using the inclusion-exclusion principle.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "If 13 people are in a room, what does the pigeonhole principle guarantee about their birth months?",
    options: [
      "All 12 months are represented",
      "At least two people share the same birth month — because 13 people in 12 months means at least one month has more than one person",
      "Exactly one month has two people",
      "At least three people share a birth month",
    ],
    answer: 1,
    explanation:
      "The pigeonhole principle states that if n+1 objects are placed into n containers, at least one container holds at least 2 objects. With 13 people (pigeons) and 12 months (pigeonholes), at least one month must contain at least 2 people. The principle does not tell us which month or which people — it only guarantees the existence of a shared month. To guarantee at least 3 people share a month, you would need 2*12 + 1 = 25 people (by the generalized pigeonhole principle with ceil(N/k)).",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "What is the key idea behind ordinary generating functions (OGFs)?",
    options: [
      "They generate random sequences for statistical testing",
      "They encode a counting sequence {a_n} as coefficients of a formal power series G(x) = sum of a_n * x^n, transforming counting problems into algebraic operations on power series",
      "They produce all permutations of a set",
      "They generate prime numbers using a recursive formula",
    ],
    answer: 1,
    explanation:
      "An ordinary generating function encodes the sequence a_0, a_1, a_2, ... as the power series G(x) = a_0 + a_1*x + a_2*x^2 + .... The value of x is typically treated formally (we don't evaluate it — we just manipulate the series algebraically). The power of this approach is that operations on generating functions correspond to operations on sequences: multiplication gives convolution (useful for counting compositions), and algebraic manipulation can solve recurrences by converting them to closed-form generating functions.",
  },

  // ============================================================
  // Topic 12: Recurrence Relations (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "What is the characteristic equation of the recurrence a_n = 5a_(n-1) - 6a_(n-2)?",
    options: [
      "r^2 + 5r - 6 = 0",
      "r^2 - 5r + 6 = 0",
      "r^2 - 5r - 6 = 0",
      "5r^2 - 6r + 1 = 0",
    ],
    answer: 1,
    explanation:
      "To find the characteristic equation, substitute a_n = r^n into the recurrence: r^n = 5r^(n-1) - 6r^(n-2). Dividing both sides by r^(n-2) gives r^2 = 5r - 6, which rearranges to r^2 - 5r + 6 = 0. This factors as (r-2)(r-3) = 0, giving roots r = 2 and r = 3. The general solution is a_n = A * 2^n + B * 3^n, where A and B are constants determined by the initial conditions. The characteristic equation method works for any linear homogeneous recurrence with constant coefficients.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "What additional challenge arises when solving a non-homogeneous recurrence a_n = 2a_(n-1) + 3^n?",
    options: [
      "The characteristic equation has no roots",
      "You must find a particular solution for the non-homogeneous term 3^n in addition to the homogeneous solution — the general solution is the sum of both",
      "Non-homogeneous recurrences have no solution",
      "The initial conditions become irrelevant",
    ],
    answer: 1,
    explanation:
      "A non-homogeneous recurrence a_n = 2a_(n-1) + 3^n has two components: the homogeneous part (a_n = 2a_(n-1), solved by the characteristic equation giving a_n^(h) = A * 2^n) and the non-homogeneous forcing term 3^n. A particular solution must be found for the full equation — trying a_n^(p) = C * 3^n and substituting: C * 3^n = 2C * 3^(n-1) + 3^n, solving gives C = 3. The general solution is a_n = A * 2^n + 3 * 3^n = A * 2^n + 3^(n+1), with A determined by initial conditions.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "Using the Master Theorem, what is the solution to T(n) = 2T(n/2) + n?",
    options: [
      "T(n) = O(n)",
      "T(n) = O(n log n)",
      "T(n) = O(n^2)",
      "T(n) = O(log n)",
    ],
    answer: 1,
    explanation:
      "Applying the Master Theorem to T(n) = 2T(n/2) + n: a = 2, b = 2, f(n) = n. We compute n^(log_b(a)) = n^(log_2(2)) = n^1 = n. Since f(n) = n = Theta(n^(log_b(a)) * log^0(n)), this is Case 2 with k = 0, giving T(n) = Theta(n * log n). This is the recurrence for merge sort: divide the array into 2 halves (a=2, b=2), recursively sort each, and merge in O(n) time. The result confirms the well-known O(n log n) complexity of merge sort.",
  },

  // ============================================================
  // Topic 13: Number Theory (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "What is the time complexity of the Euclidean algorithm for computing gcd(a, b)?",
    options: [
      "O(a * b)",
      "O(a + b)",
      "O(log(min(a, b))) — the number of steps is at most proportional to the number of digits in the smaller input",
      "O(sqrt(a * b))",
    ],
    answer: 2,
    explanation:
      "The Euclidean algorithm computes gcd(a, b) by repeated division: gcd(a, b) = gcd(b, a mod b), stopping when the remainder is 0. The key insight is that the remainder a mod b is at most a/2 (when b > a/2, a mod b = a - b < a/2; when b <= a/2, a mod b < b <= a/2). So the pair of values (a, b) is reduced by at least half every two steps, giving O(log(min(a,b))) divisions. This makes it one of the oldest and most efficient algorithms known, dating back to Euclid (~300 BC).",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "When does the modular inverse of a modulo m exist?",
    options: [
      "When a is a prime number",
      "When m is greater than a",
      "When gcd(a, m) = 1 — that is, when a and m are coprime (share no common factor other than 1)",
      "When a divides m evenly",
    ],
    answer: 2,
    explanation:
      "The modular inverse of a modulo m is an integer x such that a*x = 1 (mod m). By Bezout's identity, integers x and y exist such that a*x + m*y = gcd(a,m). For a*x = 1 (mod m), we need gcd(a,m) = 1 (coprime). When this holds, the Extended Euclidean algorithm finds x directly. If gcd(a,m) > 1, no inverse exists because a*x mod m can only produce multiples of gcd(a,m), and 1 is not such a multiple. For prime m, every a from 1 to m-1 has an inverse, which is why arithmetic modulo a prime forms a field.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "Why is the difficulty of integer factorization important for RSA encryption?",
    options: [
      "RSA requires factoring large numbers quickly, which is easy",
      "RSA uses the fact that multiplying two large primes p and q is easy (O(n^2) digit operations) but factoring their product n = p*q back into p and q is believed to be computationally infeasible for large primes — this asymmetry is the basis of RSA's security",
      "RSA doesn't actually depend on factoring — it uses discrete logarithms instead",
      "Factoring is only hard for even numbers",
    ],
    answer: 1,
    explanation:
      "RSA security rests on the computational asymmetry between multiplication and factoring. Generating an RSA key pair: choose two large primes p and q (each 512+ bits), compute n = p*q (easy, polynomial time), and derive the public/private keys using Euler's totient phi(n) = (p-1)(q-1) (easy if you know p and q). Breaking RSA requires factoring n to find p and q — but the best known classical factoring algorithms are sub-exponential (e.g., general number field sieve), making this infeasible for 2048+ bit keys. Shor's quantum algorithm could factor in polynomial time, motivating post-quantum cryptography.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.chapterId === chapterId);
}
