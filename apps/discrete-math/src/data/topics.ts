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

export type Chapter = Topic;

export const parts = [
  { id: 1, title: 'Logic & Proofs' },
  { id: 2, title: 'Sets, Relations & Functions' },
  { id: 3, title: 'Graph Theory' },
  { id: 4, title: 'Combinatorics & Number Theory' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Logic & Proofs (Topics 1-3)
  // ============================================================
  {
    id: 1,
    title: 'Propositional Logic',
    part: 1,
    partTitle: 'Logic & Proofs',
    summary:
      'Propositional logic is the foundation of mathematical reasoning, dealing with statements that are either true or false and the logical connectives that combine them into compound propositions.',
    concepts: [
      {
        id: 'propositions-connectives',
        name: 'Propositions & Logical Connectives',
        description:
          'Propositions are declarative statements with a definite truth value. Logical connectives (AND, OR, NOT, XOR, implication, biconditional) combine propositions into compound statements whose truth values are determined by truth tables.',
        keyPoints: [
          'A proposition is a declarative sentence that is either true or false but not both — questions, commands, and paradoxes like "this statement is false" are not propositions',
          'The five primary connectives are negation (NOT, ~p), conjunction (AND, p /\\ q), disjunction (OR, p \\/ q), conditional (implication, p -> q), and biconditional (p <-> q)',
          'Truth tables enumerate all possible combinations of truth values for atomic propositions — a compound proposition with n variables has 2^n rows in its truth table',
          'A tautology is a compound proposition that is always true regardless of variable assignments (e.g., p \\/ ~p); a contradiction is always false (e.g., p /\\ ~p); a contingency is neither',
          'The conditional p -> q is only false when p is true and q is false — this means a false hypothesis makes any implication vacuously true, which is counterintuitive but mathematically consistent',
        ],
        tradeoffs: [
          'Propositional logic is decidable (truth tables always work) but cannot express statements about individual objects or quantify over domains — predicate logic is needed for that',
          'Truth tables grow exponentially with the number of variables (2^n rows), making them impractical for complex formulas with many variables — algebraic manipulation or resolution is preferred',
        ],
        realWorld: [
          'Digital circuit design (logic gates)',
          'Boolean search queries in databases',
          'Conditional branching in programming (if/else)',
        ],
      },
      {
        id: 'logical-equivalences',
        name: 'Logical Equivalences & Laws',
        description:
          'Logical equivalences allow us to transform propositions into simpler or more useful forms without changing their truth values, using laws like De Morgan\'s, distributive, absorption, and contrapositive.',
        keyPoints: [
          'De Morgan\'s Laws: ~(p /\\ q) is equivalent to (~p \\/ ~q), and ~(p \\/ q) is equivalent to (~p /\\ ~q) — negation distributes over connectives by flipping AND/OR',
          'The distributive law allows AND to distribute over OR (p /\\ (q \\/ r) = (p /\\ q) \\/ (p /\\ r)) and vice versa, similar to multiplication distributing over addition',
          'The contrapositive of p -> q is ~q -> ~p, and they are logically equivalent — this is the basis for proof by contraposition',
          'Absorption laws simplify expressions: p \\/ (p /\\ q) = p and p /\\ (p \\/ q) = p — useful for circuit simplification and query optimization',
          'Two propositions are logically equivalent (p = q) if and only if p <-> q is a tautology — this can be verified by truth tables or algebraic manipulation',
        ],
        tradeoffs: [
          'Algebraic simplification can produce shorter equivalent forms but finding the minimal form is NP-hard in general (circuit minimization problem)',
          'Different equivalent forms may be better suited for different purposes — CNF is preferred for resolution proofs while DNF is preferred for satisfiability checking',
        ],
        realWorld: [
          'Compiler optimizations for boolean expressions',
          'Digital circuit minimization (Karnaugh maps)',
          'SQL query optimization by rewriting WHERE clauses',
        ],
      },
      {
        id: 'propositional-satisfiability',
        name: 'Propositional Satisfiability',
        description:
          'The satisfiability problem (SAT) asks whether there exists an assignment of truth values to variables that makes a propositional formula true. SAT is the canonical NP-complete problem with profound theoretical and practical significance.',
        keyPoints: [
          'A formula is satisfiable if at least one truth assignment makes it true, unsatisfiable if no assignment makes it true, and valid (tautology) if every assignment makes it true',
          'Conjunctive Normal Form (CNF) is a conjunction of clauses where each clause is a disjunction of literals — every propositional formula can be converted to CNF, and SAT solvers typically operate on CNF',
          'Disjunctive Normal Form (DNF) is a disjunction of terms where each term is a conjunction of literals — satisfiability of DNF is trivial (check if any term has no contradicting literals) but conversion to DNF can cause exponential blowup',
          'The Cook-Levin theorem (1971) proved that SAT is NP-complete — every problem in NP can be reduced to SAT in polynomial time, making SAT the foundational NP-complete problem',
          'Resolution is a proof technique for CNF: from clauses (A \\/ B) and (~B \\/ C), derive (A \\/ C) — repeated resolution can determine unsatisfiability by deriving the empty clause',
        ],
        tradeoffs: [
          'Modern SAT solvers (DPLL, CDCL) can handle millions of variables in practice despite SAT being NP-complete — average-case performance is much better than worst-case',
          'Converting to CNF preserves satisfiability but may introduce auxiliary variables (Tseitin transformation) — this keeps the formula polynomial in size but adds variables',
        ],
        realWorld: [
          'Hardware verification and model checking',
          'Software testing and constraint solving',
          'AI planning and scheduling systems',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Predicate Logic & Quantifiers',
    part: 1,
    partTitle: 'Logic & Proofs',
    summary:
      'Predicate logic extends propositional logic with predicates, variables, and quantifiers, allowing us to express statements about objects in a domain and reason about properties that hold for some or all elements.',
    concepts: [
      {
        id: 'predicates-quantifiers',
        name: 'Predicates & Quantifiers',
        description:
          'Predicates are functions that return true or false for given arguments. Quantifiers — universal (for all) and existential (there exists) — bind variables and specify the scope of claims over a domain.',
        keyPoints: [
          'A predicate P(x) is a propositional function — it becomes a proposition once the variable x is bound by a quantifier or assigned a specific value from the domain of discourse',
          'The universal quantifier (for all x, P(x)) asserts P(x) is true for every element x in the domain — a single counterexample suffices to disprove it',
          'The existential quantifier (there exists x, P(x)) asserts P(x) is true for at least one element x in the domain — a single witness suffices to prove it',
          'Nested quantifiers allow expressing complex relationships: "for all x, there exists y such that P(x,y)" means for each x we can find a (possibly different) y — order matters and changing it changes meaning',
          'The scope of a quantifier is the part of the formula where the bound variable is active — free variables (not bound by any quantifier) make the formula a predicate rather than a proposition',
        ],
        tradeoffs: [
          'Predicate logic is more expressive than propositional logic but satisfiability becomes undecidable — there is no algorithm that can determine the truth of every predicate logic formula',
          'Evaluating universal quantifiers over infinite domains requires proof techniques rather than exhaustive checking, adding complexity to reasoning',
        ],
        realWorld: [
          'Database query languages (SQL WHERE clauses with EXISTS/ALL)',
          'Type systems in programming languages',
          'Formal specification of software requirements',
        ],
      },
      {
        id: 'inference-rules',
        name: 'Logical Inference Rules',
        description:
          'Inference rules are valid argument forms that allow us to derive new true statements from existing ones. They form the building blocks of formal proofs and automated reasoning systems.',
        keyPoints: [
          'Modus ponens: from p -> q and p, conclude q — the most fundamental inference rule, used constantly in mathematical proofs and everyday reasoning',
          'Modus tollens: from p -> q and ~q, conclude ~p — the contrapositive reasoning pattern; if the consequent is false, the antecedent must be false',
          'Universal instantiation: from "for all x, P(x)", conclude P(c) for any specific constant c in the domain — allows applying general statements to specific cases',
          'Existential generalization: from P(c) for some specific c, conclude "there exists x, P(x)" — if a property holds for a specific element, it holds for at least one element',
          'Hypothetical syllogism: from p -> q and q -> r, conclude p -> r — allows chaining implications to build longer chains of reasoning',
        ],
        tradeoffs: [
          'Sound inference rules never derive false conclusions from true premises, but complete systems (that can derive all valid conclusions) may require many rules and be complex to implement',
          'Automated theorem provers using inference rules can get stuck in infinite derivation chains — heuristics and search strategies are needed to guide the proof search efficiently',
        ],
        realWorld: [
          'Expert systems and rule-based AI',
          'Type checking and type inference in compilers',
          'Legal reasoning and argument analysis',
        ],
      },
      {
        id: 'first-order-logic',
        name: 'First-Order Logic & Limitations',
        description:
          'First-order logic (FOL) is the standard formal system for mathematics, combining predicates, quantifiers, equality, and function symbols. Despite its power, FOL has fundamental limitations established by Goedel\'s incompleteness theorems.',
        keyPoints: [
          'FOL extends propositional logic with variables ranging over a domain of discourse, predicates, function symbols, and quantifiers — it can express most mathematical statements',
          'FOL is semi-decidable: if a formula is valid (true in all interpretations), a proof can always be found; but if it is invalid, the proof search may run forever — there is no general decision procedure',
          'Goedel\'s first incompleteness theorem (1931): any consistent formal system powerful enough to express basic arithmetic contains true statements that cannot be proved within the system',
          'Goedel\'s second incompleteness theorem: such a system cannot prove its own consistency — a system cannot certify itself as consistent using only its own axioms and rules',
          'Higher-order logics allow quantification over predicates and functions (not just individual elements) but are even less decidable than FOL — there are tradeoffs between expressiveness and tractability',
        ],
        tradeoffs: [
          'FOL strikes a balance between expressiveness and tractability — it is expressive enough for most mathematics but more tractable than higher-order logics',
          'The undecidability of FOL means automated reasoning must use heuristics, time limits, and human guidance — fully automatic theorem proving for arbitrary FOL formulas is impossible',
        ],
        realWorld: [
          'Formal methods in software verification (Z notation, Alloy)',
          'Knowledge representation in AI (ontologies, description logics)',
          'Mathematical proof assistants (Coq, Lean, Isabelle)',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Proof Techniques',
    part: 1,
    partTitle: 'Logic & Proofs',
    summary:
      'Proof techniques are the methods mathematicians and computer scientists use to establish the truth of statements rigorously. Different proof strategies are suited to different types of claims, from direct construction to contradiction and induction.',
    concepts: [
      {
        id: 'direct-proof-contraposition',
        name: 'Direct Proof & Proof by Contraposition',
        description:
          'A direct proof starts from known facts and axioms, applying inference rules step by step to reach the desired conclusion. Proof by contraposition proves p -> q by instead proving the logically equivalent ~q -> ~p.',
        keyPoints: [
          'In a direct proof of p -> q, assume p is true and use definitions, axioms, and previously proven theorems to derive q through a chain of logical steps',
          'Proof by contraposition proves p -> q by assuming ~q and deriving ~p — this is valid because p -> q is logically equivalent to ~q -> ~p (the contrapositive)',
          'Contraposition is often easier when the conclusion q is hard to work with directly but its negation ~q provides a useful starting point — e.g., proving "if n^2 is even then n is even"',
          'Direct proofs are preferred when the forward direction naturally flows — e.g., algebraic identities, constructive existence proofs, and properties that follow from definitions',
          'A proof by exhaustion (case analysis) divides the statement into a finite number of cases and proves each separately — this is a valid direct proof technique when the cases are manageable',
        ],
        tradeoffs: [
          'Direct proofs are more intuitive and constructive (they show how to build the result) but may require creative insight to find the right chain of steps',
          'Contraposition avoids working with the conclusion directly but introduces negations that may be harder to reason about in some contexts',
        ],
        realWorld: [
          'Algorithm correctness proofs',
          'Security proofs (reducing to known hard problems)',
          'Formal verification of hardware and software',
        ],
      },
      {
        id: 'proof-by-contradiction',
        name: 'Proof by Contradiction',
        description:
          'Proof by contradiction (reductio ad absurdum) assumes the negation of the statement to be proved and derives a logical contradiction, thereby establishing that the original statement must be true.',
        keyPoints: [
          'To prove statement S, assume ~S is true and derive a contradiction (a statement that is always false, such as p /\\ ~p) — since the assumption leads to absurdity, ~S must be false, so S is true',
          'The classic proof that the square root of 2 is irrational assumes sqrt(2) = a/b in lowest terms, then shows both a and b must be even — contradicting the "lowest terms" assumption',
          'Proof by contradiction is especially useful for proving impossibility results and non-existence claims — e.g., proving there are infinitely many primes (Euclid\'s proof)',
          'The key challenge is identifying what contradiction to aim for — the derived contradiction must follow logically from the negated assumption combined with known facts',
          'Proof by contradiction is non-constructive: it shows something exists or is true without necessarily showing how to find or construct it — some mathematical traditions (constructivism) reject this',
        ],
        tradeoffs: [
          'Contradiction proofs are powerful and widely applicable but non-constructive — they prove existence without providing an explicit example or construction',
          'The negation of complex statements can be difficult to work with, and the path to contradiction may be long and non-obvious',
        ],
        realWorld: [
          'Proving the halting problem is undecidable (Turing)',
          'Impossibility results in distributed systems',
          'Lower bound proofs in computational complexity',
        ],
      },
      {
        id: 'mathematical-induction',
        name: 'Mathematical Induction',
        description:
          'Mathematical induction proves that a property holds for all natural numbers (or more generally, for all elements of a well-ordered set) by establishing a base case and showing that each case implies the next.',
        keyPoints: [
          'Standard induction has two steps: prove the base case P(0) or P(1), then prove the inductive step — for all k >= base, P(k) implies P(k+1). Together these establish P(n) for all n >= base',
          'The inductive hypothesis is the assumption P(k) made during the inductive step — it is not assumed without justification but rather used to show P(k) -> P(k+1) as part of a valid proof structure',
          'Strong induction (complete induction) assumes P(0), P(1), ..., P(k) are all true (not just P(k)) to prove P(k+1) — this is equivalent to standard induction but sometimes makes the inductive step easier',
          'Structural induction generalizes mathematical induction to recursively defined structures like trees, lists, and formulas — the base case handles atomic elements and the inductive step handles recursive constructions',
          'Common mistakes include forgetting the base case (the proof would then "prove" false statements), using the wrong inductive hypothesis, or failing to handle all cases in the inductive step',
        ],
        tradeoffs: [
          'Induction is the standard technique for proving properties of natural numbers and recursive structures but requires identifying the right induction variable and structure',
          'Strong induction is more flexible but the inductive hypothesis is more complex — standard induction suffices for most cases and is conceptually simpler',
        ],
        realWorld: [
          'Proving algorithm correctness (loop invariants, recursive algorithms)',
          'Analyzing recursive data structures (trees, linked lists)',
          'Proving properties of programming language semantics',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Sets, Relations & Functions (Topics 4-6)
  // ============================================================
  {
    id: 4,
    title: 'Set Theory',
    part: 2,
    partTitle: 'Sets, Relations & Functions',
    summary:
      'Set theory provides the foundational language of mathematics, defining collections of objects and operations on them. Sets underpin virtually every area of computer science, from data structures to type theory.',
    concepts: [
      {
        id: 'sets-operations',
        name: 'Sets & Set Operations',
        description:
          'Sets are unordered collections of distinct objects. Set operations — union, intersection, complement, difference, and symmetric difference — combine sets to form new sets, often visualized with Venn diagrams.',
        keyPoints: [
          'A set is an unordered collection of distinct elements — {1, 2, 3} = {3, 1, 2} and repeated elements are ignored ({1, 1, 2} = {1, 2})',
          'Union (A U B) contains all elements in A or B or both; intersection (A n B) contains elements in both A and B; difference (A - B or A \\ B) contains elements in A but not in B',
          'The complement of A (A\') contains all elements in the universal set U that are not in A — complement depends on the choice of universal set',
          'Symmetric difference (A triangle B) contains elements in exactly one of A or B — equivalent to (A - B) U (B - A) or (A U B) - (A n B)',
          'Venn diagrams visually represent set relationships and operations — they are useful for developing intuition but formal proofs require element-wise or algebraic arguments',
        ],
        tradeoffs: [
          'Set-builder notation {x | P(x)} is concise but can lead to paradoxes (Russell\'s paradox) if the predicate P is unrestricted — axiomatic set theory (ZFC) resolves this',
          'Venn diagrams work well for 2-3 sets but become unwieldy for more sets — algebraic methods scale better for complex set expressions',
        ],
        realWorld: [
          'Database operations (UNION, INTERSECT, EXCEPT in SQL)',
          'Access control and permissions (set of allowed operations)',
          'Search engine result filtering and combination',
        ],
      },
      {
        id: 'power-sets-cartesian',
        name: 'Power Sets & Cartesian Products',
        description:
          'The power set of A is the set of all subsets of A, with cardinality 2^|A|. The Cartesian product of sets produces ordered pairs (or tuples), forming the basis for relations and multi-dimensional data.',
        keyPoints: [
          'The power set P(A) contains every possible subset of A, including the empty set and A itself — if |A| = n, then |P(A)| = 2^n because each element is independently included or excluded',
          'The Cartesian product A x B = {(a, b) | a in A, b in B} produces all ordered pairs — |A x B| = |A| * |B|, and it generalizes to n-tuples with A1 x A2 x ... x An',
          'Unlike sets, ordered pairs respect order: (a, b) != (b, a) unless a = b — this ordering is essential for defining relations and functions',
          'The power set grows exponentially — P({1,2,3}) has 8 elements, P of a 10-element set has 1024 elements — this exponential growth appears throughout combinatorics and complexity theory',
          'The empty set is a subset of every set and appears in every power set — P(empty set) = {empty set}, which has cardinality 1 (not 0)',
        ],
        tradeoffs: [
          'Power sets provide a complete enumeration of all subsets but their exponential size makes exhaustive enumeration impractical for large sets — algorithms on power sets are inherently exponential',
          'Cartesian products are straightforward but can produce very large sets — A x B with |A| = 1000 and |B| = 1000 has 1,000,000 elements',
        ],
        realWorld: [
          'Relational databases (tables as subsets of Cartesian products)',
          'Configuration spaces in testing (all combinations of options)',
          'Feature selection in machine learning (subsets of features)',
        ],
      },
      {
        id: 'set-identities-proofs',
        name: 'Set Identities & Proofs',
        description:
          'Set identities are equalities between set expressions that hold for all possible sets. They can be proved using element-wise arguments, algebraic manipulation, or the inclusion-exclusion principle.',
        keyPoints: [
          'Element-wise proofs show A = B by proving A is a subset of B and B is a subset of A — to show A subset B, take arbitrary x in A and show x must be in B',
          'Algebraic proofs apply known set identities (De Morgan\'s, distributive, absorption, complement laws) to transform one side into the other — similar to algebraic simplification',
          'De Morgan\'s laws for sets: (A U B)\' = A\' n B\' and (A n B)\' = A\' U B\' — complement distributes over union/intersection by swapping the operation',
          'The inclusion-exclusion principle: |A U B| = |A| + |B| - |A n B| — generalizes to n sets by alternately adding and subtracting intersection sizes',
          'Set identities mirror logical equivalences: union corresponds to OR, intersection to AND, complement to NOT — this duality (Boolean algebra) connects logic and set theory',
        ],
        tradeoffs: [
          'Element-wise proofs are rigorous and always applicable but can be verbose — algebraic proofs are more concise but require knowing the relevant identities',
          'The inclusion-exclusion principle gives exact counts but involves 2^n - 1 terms for n sets — approximations or Mobius inversion may be needed for large n',
        ],
        realWorld: [
          'Probability calculations (overlapping events)',
          'Database query optimization (pushing predicates through joins)',
          'Network packet classification rules',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Relations',
    part: 2,
    partTitle: 'Sets, Relations & Functions',
    summary:
      'Relations formalize the concept of connections between elements of sets. They are fundamental to database theory, order theory, and the classification of mathematical structures.',
    concepts: [
      {
        id: 'binary-relations-properties',
        name: 'Binary Relations & Properties',
        description:
          'A binary relation R on a set A is a subset of A x A. Relations can have properties like reflexivity, symmetry, antisymmetry, and transitivity, which classify them into important categories.',
        keyPoints: [
          'A binary relation R from set A to set B is a subset of A x B — we write aRb or (a,b) in R to mean a is related to b; relations generalize functions by allowing multiple outputs or none',
          'Reflexive: aRa for all a in A (every element is related to itself) — examples include equality (=), "divides" on positive integers, and "is a subset of"',
          'Symmetric: if aRb then bRa — examples include "is a sibling of" and equality; antisymmetric: if aRb and bRa then a = b — examples include "less than or equal" and "divides"',
          'Transitive: if aRb and bRc then aRc — examples include all order relations, "is an ancestor of", and "is reachable from" in a graph',
          'A relation can be represented as a directed graph (elements as nodes, related pairs as edges), an adjacency matrix (M[i][j] = 1 if iRj), or a set of ordered pairs',
        ],
        tradeoffs: [
          'Matrix representation allows fast property checking (reflexivity = diagonal all 1s, symmetry = M = M^T) but uses O(n^2) space even for sparse relations',
          'Checking transitivity requires examining all triples, which is O(n^3) — computing the transitive closure is equivalent to matrix multiplication or reachability in a graph',
        ],
        realWorld: [
          'Database foreign keys and joins (relations between tables)',
          'Social networks (friendship, following relationships)',
          'File system permissions (user-resource access relations)',
        ],
      },
      {
        id: 'equivalence-relations',
        name: 'Equivalence Relations & Partitions',
        description:
          'An equivalence relation is reflexive, symmetric, and transitive. It partitions a set into disjoint equivalence classes, establishing a fundamental connection between grouping and equality-like relationships.',
        keyPoints: [
          'An equivalence relation combines all three properties: reflexive (a ~ a), symmetric (a ~ b implies b ~ a), and transitive (a ~ b and b ~ c implies a ~ c)',
          'The equivalence class [a] is the set of all elements related to a: [a] = {x in A | x ~ a} — every element belongs to exactly one equivalence class',
          'The partition theorem: equivalence relations on A correspond bijectively to partitions of A — each equivalence relation induces a partition into equivalence classes, and each partition defines an equivalence relation',
          'The quotient set A/~ is the set of all equivalence classes — it is a "simplified" version of A where equivalent elements are collapsed into a single representative',
          'Common examples: congruence modulo n (integers), similarity of matrices, isomorphism of graphs — each groups objects that are "the same" in some relevant sense',
        ],
        tradeoffs: [
          'Equivalence relations provide a clean partition but not all natural groupings are equivalence relations — clustering in machine learning, for instance, may not satisfy transitivity',
          'Computing equivalence classes requires finding connected components in the relation graph, which is efficient (O(n + m)) but maintaining classes dynamically under updates requires union-find data structures',
        ],
        realWorld: [
          'Union-Find data structure for connected components',
          'Type equivalence in programming languages',
          'Modular arithmetic in cryptography',
        ],
      },
      {
        id: 'partial-total-orders',
        name: 'Partial & Total Orders',
        description:
          'A partial order is reflexive, antisymmetric, and transitive, defining a hierarchy where not all elements need to be comparable. A total order additionally requires that every pair of elements is comparable.',
        keyPoints: [
          'A partial order (poset) satisfies reflexivity (a <= a), antisymmetry (a <= b and b <= a implies a = b), and transitivity (a <= b and b <= c implies a <= c)',
          'In a partial order, two elements a and b may be incomparable — neither a <= b nor b <= a holds; a total order requires comparability for all pairs',
          'Hasse diagrams visualize finite posets by drawing only the "covering" relations (direct connections with no intermediate elements) — transitive edges are omitted for clarity',
          'A lattice is a poset where every pair of elements has a unique least upper bound (join/supremum) and greatest lower bound (meet/infimum) — important in type theory and abstract interpretation',
          'Topological sort produces a linear extension of a partial order — a total order consistent with the partial order, used for scheduling tasks with dependencies',
        ],
        tradeoffs: [
          'Partial orders model real-world dependencies more naturally than total orders (tasks may be independent) but many algorithms require total orders — topological sort bridges this gap',
          'Well-ordering (every non-empty subset has a least element) is a strong property equivalent to the axiom of choice — it guarantees termination of certain recursive processes but may not be constructive',
        ],
        realWorld: [
          'Task scheduling and dependency management (topological sort)',
          'Version control (partial order of commits)',
          'Class hierarchy and inheritance in OOP (subtype ordering)',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Functions',
    part: 2,
    partTitle: 'Sets, Relations & Functions',
    summary:
      'Functions are special relations that assign exactly one output to each input. Properties like injectivity, surjectivity, and bijectivity are essential for understanding cardinality, invertibility, and the structure of mathematical mappings.',
    concepts: [
      {
        id: 'injections-surjections-bijections',
        name: 'Injections, Surjections & Bijections',
        description:
          'An injection (one-to-one) maps distinct inputs to distinct outputs. A surjection (onto) covers every element of the codomain. A bijection is both injective and surjective, establishing a perfect one-to-one correspondence.',
        keyPoints: [
          'Injective (one-to-one): f(a) = f(b) implies a = b — no two distinct inputs map to the same output; the function "preserves distinctness"',
          'Surjective (onto): for every y in the codomain, there exists an x in the domain such that f(x) = y — every element of the codomain is "hit" by at least one input',
          'Bijective: both injective and surjective — establishes a perfect pairing between domain and codomain; the function has an inverse f^(-1) that is also a bijection',
          'Composition of functions: (g o f)(x) = g(f(x)) — composition preserves injectivity (if both are injective) and surjectivity (if both are surjective)',
          'For finite sets: if |A| = |B|, then f: A -> B is injective if and only if it is surjective if and only if it is bijective — this equivalence fails for infinite sets',
        ],
        tradeoffs: [
          'Bijections are the strongest property but also the most restrictive — many useful functions are only injective (embeddings) or only surjective (projections)',
          'Checking injectivity requires comparing all pairs of outputs (O(n^2) naively) or using a hash set (O(n)) — surjectivity requires checking coverage of the entire codomain',
        ],
        realWorld: [
          'Hash functions (ideally injective for unique mapping)',
          'Encryption/decryption (bijective for reversibility)',
          'Database primary keys (injective mapping from key to row)',
        ],
      },
      {
        id: 'countability-cardinality',
        name: 'Countability & Cardinality',
        description:
          'Cardinality measures the "size" of sets, even infinite ones. Cantor\'s groundbreaking work showed that not all infinities are equal — the real numbers are strictly "more infinite" than the natural numbers.',
        keyPoints: [
          'Two sets have the same cardinality if there exists a bijection between them — this definition works for both finite and infinite sets',
          'A set is countably infinite if it can be put in bijection with the natural numbers N — the integers Z and rationals Q are countably infinite (surprising but provable)',
          'Cantor\'s diagonal argument proves the real numbers R are uncountable: any attempted listing of reals in [0,1] can be "diagonalized" to produce a real not in the list — so |R| > |N|',
          'The cardinality of the power set is always strictly larger than the original set: |P(A)| > |A| for any set A (Cantor\'s theorem) — this creates an infinite hierarchy of infinities',
          'Aleph-null (aleph_0) is the cardinality of N; the cardinality of R is 2^(aleph_0), called the "continuum" — the continuum hypothesis asks whether there is a cardinality between these two',
        ],
        tradeoffs: [
          'Countability proofs require constructing explicit bijections, which can be non-obvious — the standard technique for rationals uses a diagonal enumeration of a 2D grid',
          'Uncountability has practical implications: the set of all possible programs is countable but the set of all functions from N to N is uncountable — so most functions are not computable',
        ],
        realWorld: [
          'Computability theory (countable programs vs uncountable functions)',
          'Data compression (some data is incompressible by counting arguments)',
          'Formal language theory (countable vs uncountable languages)',
        ],
      },
      {
        id: 'recursive-functions-closures',
        name: 'Recursive Functions & Closures',
        description:
          'Recursive definitions specify objects in terms of simpler versions of themselves. Closures extend a relation or operation to include all elements reachable through repeated application.',
        keyPoints: [
          'A recursive definition has a base case (defining the simplest instances) and a recursive step (defining complex instances in terms of simpler ones) — e.g., n! = n * (n-1)! with 0! = 1',
          'The transitive closure R+ of a relation R adds (a,c) whenever (a,b) and (b,c) are in R (or its closure) — it represents "reachable in one or more steps"',
          'The reflexive transitive closure R* adds all pairs (a,a) to R+ — it represents "reachable in zero or more steps" and corresponds to the Kleene star in formal language theory',
          'Computing the transitive closure can be done by matrix methods (Warshall\'s algorithm, O(n^3)) or graph traversal (BFS/DFS from each node)',
          'Well-founded recursion requires that the recursive calls always make progress toward the base case — this ensures termination and is formalized by well-ordering or well-founded relations',
        ],
        tradeoffs: [
          'Recursive definitions are elegant and match the structure of recursive data but can be inefficient if not memoized — naive recursion for Fibonacci is O(2^n) vs O(n) with memoization',
          'Transitive closure computation is O(n^3) in the worst case — for sparse graphs, BFS/DFS-based approaches can be more efficient but still require O(n^2) in the worst case',
        ],
        realWorld: [
          'Recursive data structures (trees, linked lists, JSON)',
          'Reachability analysis in program verification',
          'Regular expressions and finite automata (Kleene star)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Graph Theory (Topics 7-9)
  // ============================================================
  {
    id: 7,
    title: 'Graph Fundamentals',
    part: 3,
    partTitle: 'Graph Theory',
    summary:
      'Graphs model pairwise relationships between objects and are one of the most widely used structures in computer science. Understanding graph types, representations, and structural properties is essential for algorithm design.',
    concepts: [
      {
        id: 'graph-types-terminology',
        name: 'Graph Types & Terminology',
        description:
          'Graphs consist of vertices (nodes) connected by edges. They come in many varieties — directed/undirected, weighted/unweighted, simple/multi — each modeling different kinds of relationships.',
        keyPoints: [
          'An undirected graph G = (V, E) has edges as unordered pairs {u, v}; a directed graph (digraph) has edges as ordered pairs (u, v) where direction matters',
          'The degree of a vertex is the number of edges incident to it — in directed graphs, in-degree counts incoming edges and out-degree counts outgoing edges; the handshaking lemma states the sum of all degrees equals 2|E|',
          'A weighted graph assigns a numerical value (weight/cost) to each edge — used to model distances, capacities, costs, or probabilities',
          'A multigraph allows multiple edges between the same pair of vertices; a simple graph does not allow self-loops or multiple edges — most algorithms assume simple graphs unless stated otherwise',
          'Special graph types include complete graphs K_n (all possible edges), bipartite graphs (vertices split into two groups with edges only between groups), and regular graphs (all vertices have the same degree)',
        ],
        tradeoffs: [
          'Directed graphs are more expressive (they can model asymmetric relationships) but many algorithms are simpler for undirected graphs — e.g., connectivity is easier than strong connectivity',
          'Weighted graphs model real-world problems more accurately but weighted algorithms are often more complex than their unweighted counterparts — e.g., BFS vs Dijkstra for shortest paths',
        ],
        realWorld: [
          'Social networks (undirected: friendship, directed: following)',
          'Road networks and GPS navigation (weighted, directed)',
          'Computer networks and internet routing',
        ],
      },
      {
        id: 'graph-representations',
        name: 'Graph Representations',
        description:
          'Graphs can be stored as adjacency matrices, adjacency lists, or incidence matrices. The choice of representation affects the time and space complexity of graph algorithms.',
        keyPoints: [
          'An adjacency matrix is a |V| x |V| matrix where M[i][j] = 1 (or the edge weight) if edge (i,j) exists — uses O(V^2) space regardless of edge count',
          'An adjacency list stores a list of neighbors for each vertex — uses O(V + E) space, which is much smaller for sparse graphs where E << V^2',
          'Edge existence check is O(1) with an adjacency matrix but O(degree) with an adjacency list — iterating over all neighbors is O(V) with a matrix but O(degree) with a list',
          'An incidence matrix is a |V| x |E| matrix where M[v][e] = 1 if vertex v is an endpoint of edge e — useful for theoretical analysis but rarely used in practice due to O(V*E) space',
          'For weighted graphs, the adjacency matrix stores weights instead of 0/1, and adjacency lists store (neighbor, weight) pairs — both adapt naturally to weighted graphs',
        ],
        tradeoffs: [
          'Adjacency matrices provide O(1) edge lookup and are cache-friendly for dense graphs but waste space on sparse graphs — adjacency lists are space-efficient for sparse graphs but have slower edge lookup',
          'Matrix representation enables matrix multiplication-based algorithms (transitive closure, counting paths) but adjacency lists are better suited for traversal algorithms (BFS, DFS)',
        ],
        realWorld: [
          'Sparse graphs in practice (social networks, web graphs) favor adjacency lists',
          'Dense graphs in scientific computing favor adjacency matrices',
          'Database query planners modeling join dependencies',
        ],
      },
      {
        id: 'graph-isomorphism-planarity',
        name: 'Graph Isomorphism & Planarity',
        description:
          'Two graphs are isomorphic if they have the same structure (a relabeling of vertices maps one to the other). Planar graphs can be drawn in the plane without edge crossings, with structure governed by Euler\'s formula.',
        keyPoints: [
          'Graphs G1 and G2 are isomorphic if there exists a bijection f: V1 -> V2 such that (u,v) is an edge in G1 if and only if (f(u),f(v)) is an edge in G2 — isomorphism preserves all graph properties',
          'Graph isomorphism testing is in NP but not known to be NP-complete or in P — Babai\'s 2015 quasi-polynomial algorithm is the best known general result',
          'A graph is planar if it can be drawn in the plane with no edge crossings — Euler\'s formula for connected planar graphs states V - E + F = 2, where F is the number of faces (regions)',
          'Kuratowski\'s theorem: a graph is planar if and only if it contains no subdivision of K5 (complete graph on 5 vertices) or K3,3 (complete bipartite graph with parts of size 3)',
          'For simple connected planar graphs: E <= 3V - 6 (general) and E <= 2V - 4 (bipartite) — these upper bounds are useful for quickly proving a graph is non-planar',
        ],
        tradeoffs: [
          'Planarity testing can be done in linear time O(V + E) using algorithms by Hopcroft-Tarjan or Boyer-Myrvold, but these algorithms are complex to implement',
          'Graph isomorphism invariants (degree sequence, spectrum, number of triangles) can quickly rule out isomorphism but cannot confirm it — no polynomial set of invariants is known to be complete',
        ],
        realWorld: [
          'Circuit board layout and VLSI design (planar routing)',
          'Chemical compound identification (molecular graph isomorphism)',
          'Network topology analysis and comparison',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Graph Traversal & Connectivity',
    part: 3,
    partTitle: 'Graph Theory',
    summary:
      'Graph traversal algorithms systematically visit vertices and edges, enabling the discovery of paths, connected components, and structural properties. BFS and DFS are the two fundamental traversal strategies.',
    concepts: [
      {
        id: 'bfs-dfs',
        name: 'BFS & DFS',
        description:
          'Breadth-First Search (BFS) explores vertices layer by layer using a queue, finding shortest paths in unweighted graphs. Depth-First Search (DFS) explores as deep as possible before backtracking using a stack.',
        keyPoints: [
          'BFS uses a queue (FIFO) to explore vertices in order of their distance from the source — it discovers all vertices at distance k before any at distance k+1, guaranteeing shortest paths in unweighted graphs',
          'DFS uses a stack (LIFO) or recursion to explore as deeply as possible along each branch before backtracking — it produces a DFS tree with tree edges, back edges, forward edges, and cross edges',
          'Both BFS and DFS visit every vertex and edge exactly once, giving O(V + E) time complexity — they form the basis for many more advanced graph algorithms',
          'BFS applications: shortest path in unweighted graphs, level-order traversal, finding connected components, checking bipartiteness (odd cycle detection)',
          'DFS applications: topological sorting, cycle detection, finding strongly connected components (Tarjan\'s or Kosaraju\'s algorithm), articulation points, and bridges',
        ],
        tradeoffs: [
          'BFS guarantees shortest paths in unweighted graphs but uses O(V) memory for the queue (entire frontier) — DFS uses O(V) stack space in the worst case but typically less in practice',
          'DFS is better for problems requiring backtracking or exhaustive search (maze solving, puzzle solving) while BFS is better for shortest-path and level-based problems',
        ],
        realWorld: [
          'Web crawlers (BFS for breadth-first crawling)',
          'Social network friend suggestions (BFS for degrees of separation)',
          'Garbage collection in programming languages (DFS reachability)',
        ],
      },
      {
        id: 'connectivity-components',
        name: 'Connectivity & Components',
        description:
          'A graph is connected if there is a path between every pair of vertices. Connected components partition the graph into maximal connected subgraphs. In directed graphs, strong connectivity requires paths in both directions.',
        keyPoints: [
          'An undirected graph is connected if there is a path between every pair of vertices — connected components can be found in O(V + E) time using BFS or DFS',
          'A directed graph is strongly connected if there is a directed path from every vertex to every other vertex — strongly connected components (SCCs) can be found using Tarjan\'s algorithm in O(V + E)',
          'A bridge is an edge whose removal disconnects the graph; an articulation point is a vertex whose removal disconnects the graph — both can be found in O(V + E) using modified DFS',
          'The condensation of a directed graph collapses each SCC into a single super-node, producing a directed acyclic graph (DAG) — this DAG reveals the high-level dependency structure',
          'Edge connectivity is the minimum number of edges whose removal disconnects the graph; vertex connectivity is the minimum number of vertices — Menger\'s theorem relates these to the number of disjoint paths',
        ],
        tradeoffs: [
          'Finding connected components is simple and efficient (O(V + E)) but maintaining them dynamically under edge insertions/deletions requires more sophisticated data structures (dynamic connectivity)',
          'Strong connectivity is a stricter requirement than weak connectivity — computing SCCs requires two passes of DFS (Kosaraju\'s) or careful bookkeeping (Tarjan\'s)',
        ],
        realWorld: [
          'Network reliability analysis (identifying single points of failure)',
          'Compiler optimization (SCC-based analysis of call graphs)',
          'Internet autonomous system connectivity analysis',
        ],
      },
      {
        id: 'euler-hamilton-paths',
        name: 'Euler & Hamilton Paths',
        description:
          'An Eulerian path visits every edge exactly once; a Hamiltonian path visits every vertex exactly once. Despite their similar descriptions, their computational complexities differ dramatically.',
        keyPoints: [
          'An Euler circuit exists in a connected graph if and only if every vertex has even degree — an Euler path (not a circuit) exists if exactly two vertices have odd degree; this can be checked in O(V) time',
          'Finding an Euler circuit/path can be done efficiently in O(V + E) time using Hierholzer\'s algorithm — the problem is in P and has a complete characterization',
          'A Hamiltonian path visits every vertex exactly once; a Hamiltonian circuit returns to the starting vertex — determining existence is NP-complete with no known efficient algorithm or simple characterization',
          'Dirac\'s theorem provides a sufficient (but not necessary) condition: if every vertex in a simple graph with n >= 3 vertices has degree >= n/2, then the graph has a Hamiltonian circuit',
          'The Travelling Salesman Problem (TSP) is the optimization version of the Hamiltonian circuit problem: find the shortest Hamiltonian circuit in a weighted complete graph — it is NP-hard',
        ],
        tradeoffs: [
          'Euler circuit existence has a clean characterization (even degrees) and efficient algorithms, but Hamiltonian circuit existence has no known polynomial characterization — this is one of the starkest complexity separations in graph theory',
          'Approximation algorithms for TSP exist (e.g., Christofides\' algorithm gives a 3/2 approximation for metric TSP) but exact solutions require exponential time in the worst case',
        ],
        realWorld: [
          'Route planning and logistics (TSP and vehicle routing)',
          'DNA fragment assembly (Euler paths in de Bruijn graphs)',
          'Network cable routing (Chinese postman problem)',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Trees & Spanning Trees',
    part: 3,
    partTitle: 'Graph Theory',
    summary:
      'Trees are connected acyclic graphs that appear everywhere in computer science. Spanning trees connect all vertices of a graph with minimum edges, and minimum spanning trees optimize total edge weight.',
    concepts: [
      {
        id: 'tree-properties-types',
        name: 'Tree Properties & Types',
        description:
          'A tree is a connected graph with no cycles. Trees have exactly V-1 edges for V vertices and serve as the foundation for hierarchical data structures, parsing, and search algorithms.',
        keyPoints: [
          'A tree on n vertices has exactly n-1 edges — adding any edge creates exactly one cycle, and removing any edge disconnects the tree; these properties are all equivalent definitions',
          'A rooted tree designates one vertex as the root, inducing parent-child relationships — every non-root vertex has exactly one parent, and the root has no parent',
          'Binary trees have at most two children per node (left and right) — a full binary tree has every node with 0 or 2 children; a complete binary tree fills levels left to right',
          'Tree traversals for rooted trees: pre-order (root, left, right), in-order (left, root, right), post-order (left, right, root), and level-order (BFS) — each produces a different ordering of nodes',
          'n-ary trees allow up to n children per node — B-trees (used in databases) are balanced n-ary trees optimized for disk I/O with large branching factors',
        ],
        tradeoffs: [
          'Binary trees are simple and support efficient search (BST) but may become unbalanced — balanced variants (AVL, red-black, B-trees) add complexity to maintain O(log n) operations',
          'Trees cannot represent arbitrary relationships (no cycles) — if the data has cycles, a general graph representation is needed',
        ],
        realWorld: [
          'File system directory hierarchies',
          'HTML/XML DOM trees',
          'Decision trees in machine learning',
        ],
      },
      {
        id: 'minimum-spanning-trees',
        name: 'Minimum Spanning Trees',
        description:
          'A minimum spanning tree (MST) of a weighted graph is a spanning tree with the smallest total edge weight. Kruskal\'s and Prim\'s algorithms efficiently find MSTs using greedy strategies.',
        keyPoints: [
          'A spanning tree of a connected graph G includes all vertices and exactly V-1 edges with no cycles — an MST minimizes the total weight among all spanning trees',
          'Kruskal\'s algorithm sorts edges by weight and greedily adds the smallest edge that does not create a cycle — uses a union-find data structure, runs in O(E log E) time',
          'Prim\'s algorithm grows the MST from a starting vertex, always adding the cheapest edge connecting a tree vertex to a non-tree vertex — uses a priority queue, runs in O(E log V) with a binary heap',
          'The cut property: for any cut (partition of vertices into two groups), the minimum weight edge crossing the cut must be in every MST — this justifies both Kruskal\'s and Prim\'s greedy choices',
          'The cycle property: for any cycle, the maximum weight edge in the cycle is not in any MST (assuming unique weights) — this is the dual of the cut property',
        ],
        tradeoffs: [
          'Kruskal\'s is better for sparse graphs (sorts edges) while Prim\'s with a Fibonacci heap achieves O(E + V log V), better for dense graphs — the choice depends on graph density',
          'MSTs assume undirected graphs — the directed analog (minimum spanning arborescence) requires more complex algorithms like Edmonds\'/Chu-Liu\'s algorithm',
        ],
        realWorld: [
          'Network design (minimum cost wiring/piping)',
          'Cluster analysis (removing longest MST edges creates clusters)',
          'Approximation algorithms for NP-hard problems (TSP approximation)',
        ],
      },
      {
        id: 'shortest-paths',
        name: 'Shortest Paths',
        description:
          'Shortest path algorithms find the minimum-weight path between vertices in a weighted graph. Different algorithms handle different scenarios: single-source, all-pairs, and graphs with negative weights.',
        keyPoints: [
          'Dijkstra\'s algorithm finds shortest paths from a single source in graphs with non-negative edge weights — uses a priority queue, runs in O((V + E) log V) with a binary heap or O(E + V log V) with a Fibonacci heap',
          'Bellman-Ford algorithm handles graphs with negative edge weights by relaxing all edges V-1 times — runs in O(V * E) and can detect negative-weight cycles (where shortest paths are undefined)',
          'Floyd-Warshall algorithm computes shortest paths between all pairs of vertices using dynamic programming — runs in O(V^3) and handles negative weights (but not negative cycles)',
          'Negative-weight cycles make shortest paths undefined because you can loop through the cycle to make the path arbitrarily short — Bellman-Ford detects these by checking for further relaxations after V-1 rounds',
          'For unweighted graphs, BFS gives shortest paths in O(V + E) — for DAGs, a single pass in topological order gives shortest paths in O(V + E) even with negative weights',
        ],
        tradeoffs: [
          'Dijkstra\'s is faster than Bellman-Ford but cannot handle negative weights — the choice depends on whether negative weights are possible in the problem domain',
          'Floyd-Warshall is simple and computes all-pairs shortest paths but its O(V^3) cost makes it impractical for large graphs — running Dijkstra from each source is O(V * E log V), better for sparse graphs',
        ],
        realWorld: [
          'GPS navigation and route planning',
          'Network routing protocols (OSPF uses Dijkstra, RIP uses Bellman-Ford)',
          'Game AI pathfinding (A* is Dijkstra with heuristics)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Combinatorics & Number Theory (Topics 10-13)
  // ============================================================
  {
    id: 10,
    title: 'Counting & Combinatorics',
    part: 4,
    partTitle: 'Combinatorics & Number Theory',
    summary:
      'Combinatorics is the mathematics of counting, arrangement, and selection. Its fundamental principles — the sum rule, product rule, permutations, and combinations — are essential for algorithm analysis and probability.',
    concepts: [
      {
        id: 'counting-principles',
        name: 'Fundamental Counting Principles',
        description:
          'The sum rule, product rule, subtraction principle, and division rule form the foundation of combinatorial counting, providing systematic methods to count complex arrangements.',
        keyPoints: [
          'The sum rule (addition principle): if a task can be done in n1 ways OR n2 ways (mutually exclusive), the total is n1 + n2 — generalizes to k mutually exclusive alternatives',
          'The product rule (multiplication principle): if a task consists of step 1 (n1 ways) AND step 2 (n2 ways), the total is n1 * n2 — generalizes to k sequential independent steps',
          'The subtraction principle (complementary counting): count the complement and subtract — |A| = |U| - |A\'|; useful when counting what you don\'t want is easier than counting what you do',
          'The division rule: if a task can be done in n ways but each outcome is counted k times due to symmetry, the actual count is n/k — used to avoid overcounting in symmetric arrangements',
          'These principles combine: counting strings of length 3 from {a,b,c} with no repeats uses the product rule: 3 * 2 * 1 = 6; counting with repeats: 3 * 3 * 3 = 27',
        ],
        tradeoffs: [
          'The product rule assumes independence between steps — if the number of choices in step 2 depends on step 1, the counting becomes more complex (conditional counting)',
          'Complementary counting is powerful but requires correctly defining the universe and the complement — misidentifying either leads to errors',
        ],
        realWorld: [
          'Password strength estimation (number of possible passwords)',
          'Algorithm complexity analysis (counting operations)',
          'Probability calculations (favorable outcomes / total outcomes)',
        ],
      },
      {
        id: 'permutations-combinations',
        name: 'Permutations & Combinations',
        description:
          'Permutations count ordered arrangements; combinations count unordered selections. Both can be computed with or without repetition, yielding different formulas for different selection scenarios.',
        keyPoints: [
          'Permutations P(n,r) = n! / (n-r)! count the number of ways to arrange r items from n distinct items in order — when r = n, P(n,n) = n! (all arrangements)',
          'Combinations C(n,r) = n! / (r!(n-r)!) count the number of ways to choose r items from n distinct items without regard to order — C(n,r) = C(n, n-r) by symmetry',
          'Permutations with repetition: n^r ways to fill r positions from n items when repetition is allowed — e.g., 26^8 possible 8-character lowercase passwords',
          'Combinations with repetition (multisets): C(n+r-1, r) ways to choose r items from n types with repetition — equivalent to distributing r identical balls into n distinct bins',
          'Permutations of multisets: n! / (n1! * n2! * ... * nk!) for arrangements of n objects where ni are identical of type i — e.g., arrangements of MISSISSIPPI = 11! / (1! * 4! * 4! * 2!)',
        ],
        tradeoffs: [
          'Factorials grow extremely fast (20! > 2.4 * 10^18) making exact computation challenging for large n — Stirling\'s approximation n! ~ sqrt(2*pi*n) * (n/e)^n is useful for analysis',
          'The distinction between ordered (permutations) and unordered (combinations) is crucial — misidentifying which applies is a common source of counting errors',
        ],
        realWorld: [
          'Lottery probability calculations',
          'Cryptographic key space analysis',
          'A/B testing (number of possible experiment configurations)',
        ],
      },
      {
        id: 'binomial-theorem',
        name: 'Binomial Theorem & Pascal\'s Triangle',
        description:
          'The binomial theorem expands (x + y)^n using binomial coefficients. Pascal\'s triangle arranges these coefficients in a triangular array with elegant recursive properties and combinatorial interpretations.',
        keyPoints: [
          'The binomial theorem: (x + y)^n = sum from k=0 to n of C(n,k) * x^(n-k) * y^k — each term corresponds to choosing k factors of y (and n-k factors of x) from the n factors',
          'Pascal\'s identity: C(n,k) = C(n-1,k-1) + C(n-1,k) — each entry in Pascal\'s triangle is the sum of the two entries above it; this gives an efficient recursive computation',
          'Row n of Pascal\'s triangle gives the coefficients of (x+y)^n — the row sum is 2^n (set x=y=1), confirming that the total number of subsets of an n-element set is 2^n',
          'The Vandermonde identity: C(m+n, r) = sum of C(m,k)*C(n,r-k) for k=0 to r — proved combinatorially by choosing r items from two groups of sizes m and n',
          'Combinatorial proofs establish identities by showing both sides count the same thing in different ways — they are often more elegant and insightful than algebraic proofs',
        ],
        tradeoffs: [
          'Computing C(n,k) directly using factorials can cause integer overflow — using Pascal\'s identity or the multiplicative formula C(n,k) = product of (n-i)/(i+1) for i=0 to k-1 avoids this',
          'Combinatorial proofs require creative insight to construct but provide deeper understanding than mechanical algebraic manipulation',
        ],
        realWorld: [
          'Probability distributions (binomial distribution)',
          'Polynomial expansion in computer algebra systems',
          'Error-correcting codes (combinatorial designs)',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'Advanced Counting',
    part: 4,
    partTitle: 'Combinatorics & Number Theory',
    summary:
      'Advanced counting techniques handle overcounting, forced collisions, and sequential structures. The inclusion-exclusion principle, pigeonhole principle, and generating functions extend basic combinatorics to solve complex problems.',
    concepts: [
      {
        id: 'inclusion-exclusion',
        name: 'Inclusion-Exclusion Principle',
        description:
          'The inclusion-exclusion principle computes the size of a union of sets by alternately adding and subtracting intersection sizes. It generalizes to n sets and has important applications in counting derangements and surjections.',
        keyPoints: [
          'For two sets: |A U B| = |A| + |B| - |A n B| — we subtract the intersection because it was counted twice; for three sets, we must add back |A n B n C| after subtracting pairwise intersections',
          'The general formula for n sets involves 2^n - 1 terms: sum of individual sizes, minus sum of pairwise intersections, plus sum of triple intersections, and so on with alternating signs',
          'A derangement is a permutation with no fixed points (no element stays in its original position) — the number of derangements D(n) = n! * sum from k=0 to n of (-1)^k / k!, approximately n!/e',
          'Counting surjections from an n-set to a k-set uses inclusion-exclusion: start with k^n total functions, subtract those missing at least one codomain element, add back those missing at least two, etc.',
          'The Euler totient function phi(n) (counting integers from 1 to n coprime to n) can be computed using inclusion-exclusion over the prime factors of n',
        ],
        tradeoffs: [
          'Inclusion-exclusion gives exact counts but involves 2^n - 1 terms for n sets — for large n, this is exponential and approximation methods may be needed',
          'The principle is powerful but requires carefully identifying the correct sets to include and exclude — incorrect setup leads to wrong counts',
        ],
        realWorld: [
          'Probability of at least one event occurring',
          'Database query cardinality estimation',
          'Counting permutations with forbidden positions (rook polynomials)',
        ],
      },
      {
        id: 'pigeonhole-principle',
        name: 'Pigeonhole Principle',
        description:
          'The pigeonhole principle states that if more than n objects are placed into n containers, at least one container must hold more than one object. Despite its simplicity, it yields surprisingly powerful existence proofs.',
        keyPoints: [
          'Simple form: if n+1 objects are placed into n boxes, at least one box contains at least 2 objects — no clever arrangement can avoid a collision',
          'Generalized form: if N objects are placed into k boxes, at least one box contains at least ceil(N/k) objects — this provides a lower bound on the maximum occupancy',
          'The pigeonhole principle proves existence without construction — it guarantees a collision exists but typically does not tell you which box or which objects collide',
          'Classic applications: among any 13 people, at least 2 share a birth month; in any group of 6 people, either 3 mutually know each other or 3 are mutual strangers (Ramsey theory)',
          'Ramsey theory generalizes the pigeonhole principle: for any coloring of a sufficiently large structure, some monochromatic substructure must exist — R(3,3) = 6 is the simplest Ramsey number',
        ],
        tradeoffs: [
          'The pigeonhole principle is non-constructive — it proves existence but finding the actual collision may require exhaustive search in the worst case',
          'The principle gives a lower bound but often not a tight one — more refined counting arguments may be needed for exact results',
        ],
        realWorld: [
          'Hash collisions (more items than hash buckets guarantees collisions)',
          'Data compression limits (not all files can be compressed)',
          'Birthday paradox in cryptographic hash functions',
        ],
      },
      {
        id: 'generating-functions',
        name: 'Generating Functions',
        description:
          'Generating functions encode sequences as coefficients of formal power series, transforming counting problems into algebraic manipulation. They are a powerful tool for solving recurrences and counting partitions.',
        keyPoints: [
          'The ordinary generating function (OGF) for a sequence {a_n} is G(x) = sum of a_n * x^n — the coefficient of x^n in G(x) encodes the count a_n',
          'Multiplication of generating functions corresponds to convolution of sequences — if G(x) = A(x) * B(x), then the coefficient of x^n in G is sum of a_k * b_(n-k)',
          'The generating function for the Fibonacci sequence satisfies G(x) = x / (1 - x - x^2) — partial fractions yield the closed-form Binet formula involving the golden ratio',
          'Integer partitions (ways to write n as a sum of positive integers) have the generating function product of 1/(1-x^k) for k=1,2,3,... — each factor accounts for how many times k appears in the partition',
          'Exponential generating functions (EGFs) use a_n * x^n / n! as terms — they are natural for counting labeled structures (permutations, labeled trees) where order matters',
        ],
        tradeoffs: [
          'Generating functions turn counting into algebra but require familiarity with power series manipulation — the initial learning curve is steep but the technique is extremely powerful once mastered',
          'Extracting the coefficient of x^n from a complex generating function may require partial fractions, contour integration, or asymptotic methods — not always straightforward',
        ],
        realWorld: [
          'Analysis of algorithms (average-case complexity via GFs)',
          'Coding theory (weight enumerators of codes)',
          'Queueing theory and probability generating functions',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Recurrence Relations',
    part: 4,
    partTitle: 'Combinatorics & Number Theory',
    summary:
      'Recurrence relations define sequences where each term depends on previous terms. Solving recurrences is essential for analyzing recursive algorithms, with techniques ranging from characteristic equations to the Master Theorem.',
    concepts: [
      {
        id: 'linear-recurrences',
        name: 'Linear Recurrences',
        description:
          'A linear homogeneous recurrence with constant coefficients has the form a_n = c1*a_(n-1) + c2*a_(n-2) + ... + ck*a_(n-k). The characteristic equation method finds closed-form solutions.',
        keyPoints: [
          'The characteristic equation is r^k - c1*r^(k-1) - c2*r^(k-2) - ... - ck = 0 — its roots determine the form of the general solution',
          'For distinct roots r1, r2, ..., rk: a_n = A1*r1^n + A2*r2^n + ... + Ak*rk^n, where constants are determined by initial conditions',
          'For a repeated root r with multiplicity m: the contribution is (A1 + A2*n + A3*n^2 + ... + Am*n^(m-1)) * r^n — polynomial terms multiply the exponential',
          'The Fibonacci recurrence F(n) = F(n-1) + F(n-2) has characteristic equation r^2 - r - 1 = 0 with roots phi = (1+sqrt(5))/2 and psi = (1-sqrt(5))/2 — yielding the Binet formula F(n) = (phi^n - psi^n) / sqrt(5)',
          'Complex roots come in conjugate pairs and contribute oscillating terms of the form |r|^n * (A*cos(n*theta) + B*sin(n*theta)) — these model damped oscillations in sequences',
        ],
        tradeoffs: [
          'The characteristic equation method gives exact closed-form solutions but only works for linear recurrences with constant coefficients — more general recurrences require other techniques',
          'Closed-form solutions enable O(1) computation of a_n but may involve irrational or complex numbers — matrix exponentiation provides an O(log n) integer-arithmetic alternative',
        ],
        realWorld: [
          'Fibonacci in nature (phyllotaxis, spiral patterns)',
          'Linear feedback shift registers (LFSRs) in cryptography',
          'Population growth models (Leslie matrices)',
        ],
      },
      {
        id: 'non-homogeneous-recurrences',
        name: 'Non-homogeneous Recurrences',
        description:
          'Non-homogeneous recurrences have the form a_n = c1*a_(n-1) + ... + ck*a_(n-k) + f(n), where f(n) is a non-zero forcing function. The solution combines the homogeneous solution with a particular solution.',
        keyPoints: [
          'The general solution is a_n = a_n^(h) + a_n^(p), where a_n^(h) is the general solution to the homogeneous part and a_n^(p) is any particular solution to the full recurrence',
          'The method of undetermined coefficients guesses the form of the particular solution based on f(n) — if f(n) is a polynomial of degree d, try a polynomial of degree d; if f(n) = c * s^n, try A * s^n',
          'If the guessed form for the particular solution overlaps with the homogeneous solution, multiply by n^m where m is the multiplicity of the overlapping root — this avoids zero solutions',
          'For f(n) = n * 2^n + 3^n, the particular solution is a sum of particular solutions for each term (by linearity) — solve for each forcing term separately and combine',
          'Annihilator method: find an operator that "kills" f(n) and apply it to both sides, reducing to a higher-order homogeneous recurrence — more systematic than guessing',
        ],
        tradeoffs: [
          'The method of undetermined coefficients is straightforward for standard forcing functions (polynomials, exponentials, products) but does not easily handle arbitrary f(n)',
          'The annihilator method is more general but produces higher-order characteristic equations that may be harder to solve — the degree increases by the order of the annihilator',
        ],
        realWorld: [
          'Amortized analysis of dynamic data structures',
          'Financial calculations (loan payments with interest)',
          'Signal processing (digital filter design)',
        ],
      },
      {
        id: 'master-theorem',
        name: 'Master Theorem & Divide-and-Conquer',
        description:
          'The Master Theorem provides a direct formula for solving recurrences of the form T(n) = a*T(n/b) + f(n), which arise from divide-and-conquer algorithms. It classifies solutions into three cases based on the relationship between f(n) and n^(log_b(a)).',
        keyPoints: [
          'The recurrence T(n) = a*T(n/b) + f(n) describes an algorithm that divides the problem into a subproblems of size n/b, with f(n) work to divide and combine — a >= 1 and b > 1',
          'Case 1: if f(n) = O(n^(log_b(a) - epsilon)) for some epsilon > 0, then T(n) = Theta(n^(log_b(a))) — the subproblems dominate; e.g., T(n) = 8T(n/2) + n^2 gives Theta(n^3)',
          'Case 2: if f(n) = Theta(n^(log_b(a)) * log^k(n)) for k >= 0, then T(n) = Theta(n^(log_b(a)) * log^(k+1)(n)) — work is evenly distributed; e.g., merge sort T(n) = 2T(n/2) + n gives Theta(n log n)',
          'Case 3: if f(n) = Omega(n^(log_b(a) + epsilon)) for some epsilon > 0, and a*f(n/b) <= c*f(n) for some c < 1 (regularity condition), then T(n) = Theta(f(n)) — the combine step dominates',
          'The Akra-Bazzi method generalizes the Master Theorem to recurrences with unequal subproblem sizes: T(n) = sum of a_i * T(n/b_i) + f(n) — it finds p such that sum of a_i / b_i^p = 1, then T(n) = Theta(n^p * (1 + integral from 1 to n of f(u)/(u^(p+1)) du))',
        ],
        tradeoffs: [
          'The Master Theorem is quick and easy to apply but has gaps — recurrences where f(n) falls between cases (non-polynomial differences) require the extended/generalized Master Theorem or other methods',
          'The Akra-Bazzi method handles more cases but is more complex to apply — for standard textbook divide-and-conquer, the basic Master Theorem usually suffices',
        ],
        realWorld: [
          'Merge sort analysis: T(n) = 2T(n/2) + O(n) = O(n log n)',
          'Binary search analysis: T(n) = T(n/2) + O(1) = O(log n)',
          'Strassen\'s matrix multiplication: T(n) = 7T(n/2) + O(n^2) = O(n^2.81)',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Number Theory',
    part: 4,
    partTitle: 'Combinatorics & Number Theory',
    summary:
      'Number theory studies the properties of integers, including divisibility, primes, and modular arithmetic. These concepts are foundational to cryptography, hash functions, and error-correcting codes in computer science.',
    concepts: [
      {
        id: 'divisibility-gcd',
        name: 'Divisibility & GCD',
        description:
          'Divisibility defines a fundamental ordering on integers. The Greatest Common Divisor (GCD) is computed efficiently by the Euclidean algorithm, and the Extended Euclidean algorithm expresses the GCD as a linear combination of the inputs.',
        keyPoints: [
          'An integer a divides b (written a | b) if there exists an integer k such that b = a*k — divisibility is reflexive, antisymmetric (for positive integers), and transitive',
          'The GCD of a and b, gcd(a,b), is the largest positive integer that divides both a and b — two integers are coprime (relatively prime) if gcd(a,b) = 1',
          'The Euclidean algorithm computes gcd(a,b) by repeated division: gcd(a,b) = gcd(b, a mod b), stopping when the remainder is 0 — runs in O(log(min(a,b))) steps, making it extremely efficient',
          'Bezout\'s identity: for any integers a and b, there exist integers x and y such that ax + by = gcd(a,b) — the Extended Euclidean algorithm finds these coefficients',
          'The LCM (least common multiple) relates to GCD: lcm(a,b) = |a*b| / gcd(a,b) — this identity is useful for computing LCM efficiently',
        ],
        tradeoffs: [
          'The Euclidean algorithm is optimal for GCD computation (O(log n) divisions) but the Extended version requires tracking additional state (coefficients x and y)',
          'Bezout\'s identity guarantees the existence of the linear combination but the coefficients are not unique — the general solution forms an infinite family',
        ],
        realWorld: [
          'RSA key generation (computing modular inverses)',
          'Reducing fractions to lowest terms',
          'Synchronization in distributed systems (LCM of periods)',
        ],
      },
      {
        id: 'modular-arithmetic',
        name: 'Modular Arithmetic',
        description:
          'Modular arithmetic performs arithmetic within a fixed modulus, wrapping around at the modulus value. It is the backbone of cryptography, hash functions, and computer arithmetic.',
        keyPoints: [
          'a is congruent to b modulo m (a = b mod m) if m divides (a - b) — congruence is an equivalence relation partitioning integers into m residue classes {0, 1, ..., m-1}',
          'Modular arithmetic preserves addition and multiplication: (a + b) mod m = ((a mod m) + (b mod m)) mod m, and similarly for multiplication — this enables efficient computation with large numbers',
          'The modular inverse of a modulo m exists if and only if gcd(a, m) = 1 — it is computed using the Extended Euclidean algorithm: find x such that ax = 1 (mod m)',
          'Fermat\'s Little Theorem: if p is prime and gcd(a, p) = 1, then a^(p-1) = 1 (mod p) — this provides an alternative method for computing modular inverses: a^(-1) = a^(p-2) mod p',
          'The Chinese Remainder Theorem (CRT): if m1, m2, ..., mk are pairwise coprime, then for any set of congruences x = a_i (mod m_i), there exists a unique solution modulo m1*m2*...*mk',
        ],
        tradeoffs: [
          'Modular arithmetic enables computation with bounded-size numbers (preventing overflow) but modular division requires computing inverses, which only exist when gcd(a,m) = 1',
          'CRT enables parallel computation (solve modulo each m_i independently, then combine) but requires the moduli to be pairwise coprime — non-coprime moduli may have no solution',
        ],
        realWorld: [
          'RSA encryption and Diffie-Hellman key exchange',
          'Hash functions (modular hashing)',
          'Checksums and error detection (ISBN, credit card validation)',
        ],
      },
      {
        id: 'primes-cryptography',
        name: 'Primes & Cryptography Applications',
        description:
          'Prime numbers are the building blocks of integers. The Fundamental Theorem of Arithmetic guarantees unique prime factorization, and the computational difficulty of factoring large numbers underpins modern public-key cryptography.',
        keyPoints: [
          'The Fundamental Theorem of Arithmetic: every integer greater than 1 can be uniquely expressed as a product of prime powers (up to ordering) — this unique factorization is the basis for many number-theoretic results',
          'There are infinitely many primes (Euclid\'s proof by contradiction) — the Prime Number Theorem states that the number of primes up to n is approximately n / ln(n)',
          'Primality testing determines whether a number is prime — trial division takes O(sqrt(n)) time, while the Miller-Rabin probabilistic test runs in O(k * log^2(n)) with error probability 4^(-k)',
          'The AKS algorithm (2002) proved that primality testing is in P with a deterministic polynomial-time algorithm — though Miller-Rabin is faster in practice for most applications',
          'RSA encryption relies on the difficulty of factoring the product of two large primes: n = p*q is easy to compute but factoring n back into p and q is believed to be computationally infeasible for large primes (1024+ bits)',
        ],
        tradeoffs: [
          'Probabilistic primality tests (Miller-Rabin) are fast and practical but have a small probability of error — deterministic tests (AKS) are slower but certain; in practice, repeated Miller-Rabin is preferred',
          'The security of RSA depends on the assumed difficulty of factoring — quantum computers running Shor\'s algorithm could factor efficiently, motivating post-quantum cryptography research',
        ],
        realWorld: [
          'RSA and elliptic curve cryptography',
          'Digital signatures and certificate authorities',
          'Pseudorandom number generators (Blum-Blum-Shub)',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
