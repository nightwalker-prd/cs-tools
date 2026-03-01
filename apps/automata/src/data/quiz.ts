export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ── Topic 1: Deterministic Finite Automata (DFA) ─────────────────────
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'What guarantees that a DFA has exactly one computation path for any input string?',
    options: [
      'The transition function maps each (state, symbol) pair to exactly one state.',
      'The DFA has a unique accept state.',
      'The input alphabet is finite.',
      'The start state has no incoming transitions.',
    ],
    answer: 0,
    explanation:
      'A DFA\'s transition function delta: Q x Sigma -> Q is a total function that maps every (state, symbol) pair to exactly one next state. This determinism ensures there is precisely one computation path for any given input string.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      'What is the time complexity of determining whether a DFA accepts a string of length n?',
    options: [
      'O(n log n)',
      'O(n^2)',
      'O(n)',
      'O(2^n)',
    ],
    answer: 2,
    explanation:
      'A DFA processes exactly one input symbol per step, transitioning from state to state. For a string of length n, it performs exactly n transitions, resulting in O(n) time complexity.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'Which of the following is NOT a valid DFA design strategy for combining two DFAs?',
    options: [
      'Product construction with F = F1 x F2 for intersection.',
      'Swapping accept and non-accept states for complementation.',
      'Taking the union of state sets for union (without new transitions).',
      'Product construction with F = (F1 x Q2) union (Q1 x F2) for union.',
    ],
    answer: 2,
    explanation:
      'Simply taking the union of state sets does not create valid transitions between the two machines. The correct method for union is the product construction, which creates paired states (qi, rj) and accepts when either component is in an accept state.',
  },

  // ── Topic 2: Nondeterministic Finite Automata (NFA) ──────────────────
  {
    id: 't2-q1',
    chapterId: 2,
    question:
      'How does an NFA\'s transition function differ from a DFA\'s?',
    options: [
      'It maps to a single state instead of a set of states.',
      'It cannot handle the empty string.',
      'It maps each (state, symbol) pair to a subset of states (possibly empty) and also allows epsilon-transitions.',
      'It requires all transitions to lead to accept states.',
    ],
    answer: 2,
    explanation:
      'An NFA\'s transition function delta: Q x (Sigma union {epsilon}) -> P(Q) maps to the power set of Q, meaning each (state, symbol-or-epsilon) pair can have zero, one, or many next states. This is what makes the automaton nondeterministic.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'When does an NFA accept an input string?',
    options: [
      'When all computation paths end in accept states.',
      'When the majority of computation paths end in accept states.',
      'When at least one computation path ends in an accept state.',
      'When the shortest computation path ends in an accept state.',
    ],
    answer: 2,
    explanation:
      'An NFA uses existential acceptance: a string is accepted if there exists at least one computation path (among all possible nondeterministic choices) that ends in an accept state. All other paths may reject or die.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'In Thompson\'s construction, how is the Kleene star R* represented?',
    options: [
      'By connecting the accept state of R back to its start state with a symbol transition.',
      'By duplicating the NFA for R multiple times in sequence.',
      'By adding a new start/accept state with epsilon-transitions to/from the original NFA.',
      'By removing all transitions from the NFA for R.',
    ],
    answer: 2,
    explanation:
      'Thompson\'s construction for R* adds a new state that serves as both start and accept state. This new state has epsilon-transitions to the original start state and from the original accept state back to itself, allowing zero or more repetitions.',
  },

  // ── Topic 3: NFA-to-DFA Conversion & Minimization ───────────────────
  {
    id: 't3-q1',
    chapterId: 3,
    question:
      'In the subset construction, what does each DFA state represent?',
    options: [
      'A single NFA transition.',
      'A subset of NFA states (the set of states the NFA could be in simultaneously).',
      'A regular expression.',
      'A pair of NFA start and accept states.',
    ],
    answer: 1,
    explanation:
      'The subset (powerset) construction converts an NFA to a DFA by treating each set of NFA states as a single DFA state. The DFA start state is the epsilon-closure of the NFA start state, and transitions are computed by taking unions of NFA transitions.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'What is the worst-case number of states in the DFA produced by subset construction from an NFA with n states?',
    options: [
      'n',
      'n^2',
      'n!',
      '2^n',
    ],
    answer: 3,
    explanation:
      'Since each DFA state is a subset of the n NFA states, there are at most 2^n possible subsets and therefore at most 2^n DFA states. This exponential blowup is achievable in worst-case examples.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'What does the Myhill-Nerode theorem state about regular languages?',
    options: [
      'Every regular language can be generated by a context-free grammar.',
      'A language is regular if and only if its Myhill-Nerode equivalence relation has finite index.',
      'Every regular language has exactly one NFA.',
      'Regular languages are closed under intersection only if they are finite.',
    ],
    answer: 1,
    explanation:
      'The Myhill-Nerode theorem provides a complete characterization: a language L is regular iff the equivalence relation ~L (where x ~L y iff for all z, xz in L iff yz in L) has finitely many equivalence classes. The number of classes equals the states in the minimal DFA.',
  },

  // ── Topic 4: Regular Expressions & Regular Grammars ──────────────────
  {
    id: 't4-q1',
    chapterId: 4,
    question:
      'What is the correct operator precedence (highest to lowest) for regular expressions?',
    options: [
      'Union, concatenation, Kleene star.',
      'Concatenation, Kleene star, union.',
      'Kleene star, concatenation, union.',
      'Kleene star, union, concatenation.',
    ],
    answer: 2,
    explanation:
      'In standard regular expression notation, Kleene star (*) has the highest precedence, followed by concatenation (juxtaposition), followed by union (|). So ab*|c means a(b*) | c, not (ab)*|c.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'Which conversion algorithm transforms a DFA into a regular expression by removing states one at a time?',
    options: [
      'Thompson\'s construction.',
      'Subset construction.',
      'State elimination.',
      'The CYK algorithm.',
    ],
    answer: 2,
    explanation:
      'State elimination removes states from the automaton one by one, replacing transitions with regular expressions that account for paths through the removed state. When only the start and accept states remain, the label on the transition between them is the desired regular expression.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'In a right-linear grammar, what form do all productions take?',
    options: [
      'A -> Ba or A -> a, where the nonterminal is on the left of the terminal.',
      'A -> aB or A -> a, where the nonterminal (if any) appears at the rightmost position.',
      'A -> AB or A -> epsilon, with two nonterminals allowed.',
      'A -> aBb, with terminals on both sides of the nonterminal.',
    ],
    answer: 1,
    explanation:
      'A right-linear grammar restricts productions to A -> wB or A -> w, where A and B are nonterminals and w is a string of terminals. The key restriction is that at most one nonterminal appears, and it must be at the rightmost position.',
  },

  // ── Topic 5: Pumping Lemma for Regular Languages ─────────────────────
  {
    id: 't5-q1',
    chapterId: 5,
    question:
      'Which of the following is a condition in the pumping lemma for regular languages?',
    options: [
      'The pumped portion y must contain at least two distinct symbols.',
      '|xy| <= p and |y| > 0, where p is the pumping length.',
      'The string must be shorter than the pumping length.',
      'The decomposition xyz must have |x| = |z|.',
    ],
    answer: 1,
    explanation:
      'The pumping lemma states that for s = xyz: (1) |y| > 0 (the pumped portion is non-empty), (2) |xy| <= p (the pump occurs in the first p characters), and (3) xy^i z is in L for all i >= 0.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'To prove {a^n b^n | n >= 0} is not regular using the pumping lemma, which string should you choose?',
    options: [
      'a^p (the string of p a\'s).',
      'a^p b^p (p a\'s followed by p b\'s).',
      '(ab)^p (alternating a\'s and b\'s).',
      'b^p a^p (p b\'s followed by p a\'s).',
    ],
    answer: 1,
    explanation:
      'Choosing s = a^p b^p ensures |s| >= p and s is in L. Since |xy| <= p, the portion y consists entirely of a\'s. Pumping up (i=2) gives more a\'s than b\'s, producing a string not in L, completing the contradiction.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'What is a key limitation of the pumping lemma for regular languages?',
    options: [
      'It cannot be applied to infinite languages.',
      'It only works for languages over a single-symbol alphabet.',
      'It is a necessary but not sufficient condition: some non-regular languages satisfy it.',
      'It requires the language to be context-free.',
    ],
    answer: 2,
    explanation:
      'The pumping lemma is only a necessary condition for regularity. There exist non-regular languages that satisfy the pumping lemma, so it cannot definitively prove a language IS regular. Alternative methods like the Myhill-Nerode theorem provide a complete characterization.',
  },

  // ── Topic 6: Closure Properties & Decision Problems ──────────────────
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'How is the complement of a regular language constructed from its DFA?',
    options: [
      'Reverse all transitions in the DFA.',
      'Add a new start state with epsilon-transitions.',
      'Swap accepting and non-accepting states.',
      'Remove all dead states.',
    ],
    answer: 2,
    explanation:
      'For a DFA, swapping accept and non-accept states (F\' = Q \\ F) produces a DFA that accepts exactly the strings the original rejects, and vice versa. This works because DFAs have exactly one active state at all times.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'Which decision problem for regular languages is decidable?',
    options: [
      'Whether two arbitrary context-free grammars generate the same language.',
      'Whether a DFA accepts any string at all (emptiness).',
      'Whether an arbitrary Turing machine halts on empty input.',
      'Whether a context-free grammar is ambiguous.',
    ],
    answer: 1,
    explanation:
      'Emptiness of a DFA is decidable: L(M) = empty set iff no accept state is reachable from the start state, which can be checked by BFS/DFS in O(|Q| + |delta|) time. All standard decision problems for regular languages are decidable.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question:
      'Which identity holds for Kleene star in the algebra of regular expressions?',
    options: [
      '(R*)* = R',
      'R* = R R*',
      '(R*)* = R*',
      'R* = empty set',
    ],
    answer: 2,
    explanation:
      'Applying the Kleene star twice has no additional effect: (R*)* = R*. This is because R* already includes zero or more repetitions of R, so repeating that process zero or more times produces the same language.',
  },

  // ── Topic 7: Context-Free Grammars & Parse Trees ─────────────────────
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'What makes a context-free grammar ambiguous?',
    options: [
      'It generates an infinite language.',
      'It has more nonterminals than terminals.',
      'At least one string in its language has two or more distinct parse trees.',
      'Its start variable appears on the right side of a production.',
    ],
    answer: 2,
    explanation:
      'A CFG is ambiguous if there exists at least one string that has two or more distinct parse trees (equivalently, two distinct leftmost derivations). Ambiguity is a property of the grammar, not the language.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'In Chomsky Normal Form (CNF), which production forms are allowed?',
    options: [
      'A -> BCD (three nonterminals) and A -> a (one terminal).',
      'A -> BC (two nonterminals) and A -> a (one terminal), plus optionally S -> epsilon.',
      'A -> aB (terminal then nonterminal) and A -> epsilon.',
      'A -> Ba (nonterminal then terminal) and A -> BC.',
    ],
    answer: 1,
    explanation:
      'In CNF, every production is either A -> BC (exactly two nonterminals) or A -> a (exactly one terminal). The start variable S may additionally have the production S -> epsilon if the empty string is in the language.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'What is the time complexity of the CYK parsing algorithm for a string of length n?',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n^3)',
      'O(2^n)',
    ],
    answer: 2,
    explanation:
      'The CYK algorithm uses dynamic programming on a CNF grammar to determine if a string of length n is in the language. It fills an n x n table, where each cell considers O(n) possible split points, yielding O(n^3) time complexity (with grammar size as a constant factor).',
  },

  // ── Topic 8: Pushdown Automata ───────────────────────────────────────
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'What additional component distinguishes a PDA from a finite automaton?',
    options: [
      'Multiple input tapes.',
      'A stack with push and pop operations.',
      'A two-way read head.',
      'An output tape for writing results.',
    ],
    answer: 1,
    explanation:
      'A pushdown automaton augments a finite automaton with a stack (LIFO data structure). Each transition can read the stack top, pop it, and push new symbols. This stack provides the memory needed to recognize context-free languages.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'Why are deterministic PDAs (DPDAs) strictly less powerful than nondeterministic PDAs?',
    options: [
      'DPDAs cannot use epsilon-transitions.',
      'DPDAs can only accept by empty stack.',
      'There exist context-free languages (like palindromes over {a,b}) that no DPDA can recognize.',
      'DPDAs are limited to finite languages.',
    ],
    answer: 2,
    explanation:
      'Unlike the DFA/NFA case, deterministic and nondeterministic PDAs are NOT equivalent. The language {ww^R | w in {a,b}*} (even-length palindromes) is context-free but not recognizable by any DPDA, because finding the midpoint requires nondeterminism.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'In the standard CFG-to-PDA construction, how does the PDA simulate a derivation?',
    options: [
      'It stores the entire derivation history in its state.',
      'It pushes the start variable, then nondeterministically replaces top-of-stack variables using productions or matches terminals with input.',
      'It reads the input twice: once forward and once backward.',
      'It uses two stacks to track both sides of each production.',
    ],
    answer: 1,
    explanation:
      'The CFG-to-PDA construction creates a PDA that pushes the start variable onto the stack. At each step, if the stack top is a variable, it nondeterministically replaces it with the right-hand side of one of that variable\'s productions. If the stack top is a terminal, it must match the current input symbol.',
  },

  // ── Topic 9: CFL Properties & Pumping Lemma ─────────────────────────
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'Under which operation are context-free languages NOT closed?',
    options: [
      'Union.',
      'Concatenation.',
      'Intersection.',
      'Kleene star.',
    ],
    answer: 2,
    explanation:
      'CFLs are NOT closed under intersection. The classic counterexample: L1 = {a^n b^n c^m} and L2 = {a^m b^n c^n} are both CFLs, but L1 intersect L2 = {a^n b^n c^n} is not context-free. CFLs are closed under union, concatenation, and Kleene star.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'In the CFL pumping lemma, the decomposition s = uvxyz must satisfy which conditions?',
    options: [
      '|uv| <= p and |xy| > 0.',
      '|vxy| <= p, |vy| > 0, and uv^i xy^i z is in L for all i >= 0.',
      '|v| = |y| and |ux| = |yz|.',
      '|uvxyz| = 2p and v = y.',
    ],
    answer: 1,
    explanation:
      'The CFL pumping lemma requires: (1) |vy| > 0 (at least one of v, y is non-empty), (2) |vxy| <= p (the pumpable region is bounded), and (3) uv^i xy^i z is in L for all i >= 0 (pumping v and y together preserves membership).',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question:
      'Which decision problem is UNDECIDABLE for context-free grammars?',
    options: [
      'Membership: is a given string in L(G)?',
      'Emptiness: is L(G) = empty set?',
      'Equivalence: does L(G1) = L(G2)?',
      'Finiteness: is L(G) finite?',
    ],
    answer: 2,
    explanation:
      'Equivalence of CFGs is undecidable: there is no algorithm that, given two arbitrary CFGs G1 and G2, determines whether L(G1) = L(G2). In contrast, membership, emptiness, and finiteness are all decidable for CFGs.',
  },

  // ── Topic 10: Turing Machines ────────────────────────────────────────
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'What is the key feature that makes Turing machines more powerful than pushdown automata?',
    options: [
      'Turing machines have a larger input alphabet.',
      'Turing machines have an infinite tape that can be read from and written to, with a head that moves in both directions.',
      'Turing machines have multiple accept states.',
      'Turing machines can only process binary strings.',
    ],
    answer: 1,
    explanation:
      'A Turing machine has an infinite tape serving as unlimited read/write memory, with a head that can move both left and right. This is fundamentally more powerful than a PDA\'s stack (LIFO access only) or a DFA\'s finite state (no external memory).',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'Which Turing machine variant increases computational power beyond a standard single-tape deterministic TM?',
    options: [
      'Multitape Turing machines.',
      'Nondeterministic Turing machines.',
      'Two-way infinite tape Turing machines.',
      'None of the above -- all variants have the same computational power.',
    ],
    answer: 3,
    explanation:
      'All standard TM variants (multitape, nondeterministic, multi-head, multi-dimensional tape, etc.) can simulate each other with at most polynomial overhead. They all recognize exactly the same class of languages, supporting the Church-Turing thesis.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'What is the significance of the Universal Turing Machine (UTM)?',
    options: [
      'It can decide any language.',
      'It proves that all languages are regular.',
      'It can simulate any other Turing machine given its description and input, embodying the stored-program concept.',
      'It runs in polynomial time on all inputs.',
    ],
    answer: 2,
    explanation:
      'The UTM takes as input the encoding <M, w> of a TM M and input w, then simulates M on w. It accepts/rejects/loops exactly as M would. This demonstrates that a single fixed machine can compute any computable function, and is the theoretical basis for stored-program computers.',
  },

  // ── Topic 11: Decidability & Recognizability ─────────────────────────
  {
    id: 't11-q1',
    chapterId: 11,
    question:
      'What is a decider (total Turing machine)?',
    options: [
      'A TM that accepts all strings.',
      'A TM that halts on every input, either accepting or rejecting.',
      'A TM that uses at most polynomial time.',
      'A TM with no reject state.',
    ],
    answer: 1,
    explanation:
      'A decider is a Turing machine that halts on every input -- it always reaches either q_accept or q_reject and never loops forever. The language it decides is the set of strings it accepts. Decidable languages are exactly those recognized by deciders.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'Why is the halting problem (A_TM) undecidable?',
    options: [
      'Because Turing machines have too many states to enumerate.',
      'Because a diagonalization argument shows that any proposed decider leads to a contradiction.',
      'Because the input alphabet is infinite.',
      'Because PDAs cannot simulate Turing machines.',
    ],
    answer: 1,
    explanation:
      'The proof assumes a decider H for A_TM exists, then constructs a machine D that runs H on <M, <M>> and does the opposite. Running D on <D> creates a contradiction: D accepts <D> iff D rejects <D>. This diagonalization proves no such decider can exist.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'When is a language decidable in terms of recognizability?',
    options: [
      'When it is recognizable by an NFA.',
      'When it is recognizable but not co-recognizable.',
      'When both the language and its complement are recognizable.',
      'When it contains only finite strings.',
    ],
    answer: 2,
    explanation:
      'A language L is decidable if and only if both L and its complement are recognizable. Given recognizers for both, run them in parallel on any input: one must eventually accept, giving a definitive answer (accept or reject) for every input.',
  },

  // ── Topic 12: Complexity Classes (P, NP, NP-Complete) ────────────────
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'What defines the class P?',
    options: [
      'Languages decidable by a nondeterministic TM in polynomial time.',
      'Languages decidable by a deterministic TM in polynomial time.',
      'Languages recognizable but not decidable.',
      'Languages with polynomial-size descriptions.',
    ],
    answer: 1,
    explanation:
      'P is the class of languages decidable by a deterministic Turing machine in time O(n^k) for some constant k. It represents the class of problems considered "efficiently solvable" and is robust across different reasonable computational models.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'What is the certificate-based definition of NP?',
    options: [
      'A language is in NP if every string can be checked in exponential time.',
      'A language is in NP if there exists a polynomial-time verifier that can confirm membership given a polynomial-length certificate.',
      'A language is in NP if it is decidable by a deterministic TM.',
      'A language is in NP if it has at most polynomially many strings.',
    ],
    answer: 1,
    explanation:
      'A language L is in NP if there exists a polynomial-time verifier V such that x is in L iff there exists a certificate c (of polynomial length) where V(x, c) accepts. The certificate serves as a "proof" of membership that can be efficiently checked.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'What was the first problem proven NP-complete, and by what theorem?',
    options: [
      'HAMILTONIAN-PATH, by Karp\'s theorem.',
      'CLIQUE, by the PCP theorem.',
      'SAT (Boolean satisfiability), by the Cook-Levin theorem.',
      'SUBSET-SUM, by Ladner\'s theorem.',
    ],
    answer: 2,
    explanation:
      'The Cook-Levin theorem (independently proven by Stephen Cook and Leonid Levin) established that SAT is NP-complete. The proof shows that any NP computation can be encoded as a Boolean formula, making SAT the foundational NP-complete problem.',
  },

  // ── Topic 13: Reductions & Intractability ────────────────────────────
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'If A is undecidable and A <=_m B (A mapping-reduces to B), what can we conclude about B?',
    options: [
      'B is decidable.',
      'B is undecidable.',
      'B is regular.',
      'B is in NP.',
    ],
    answer: 1,
    explanation:
      'If A <=_m B, then B is at least as hard as A. Since a decider for B could be composed with the reduction to decide A, and A is undecidable, B must also be undecidable. This is the standard technique for proving undecidability via reduction.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'What is the standard approach to prove a new problem X is NP-complete?',
    options: [
      'Show that X is in P and reduce X to SAT.',
      'Show that X is in NP and reduce a known NP-complete problem to X in polynomial time.',
      'Show that X has exponential-time solutions only.',
      'Show that X is undecidable.',
    ],
    answer: 1,
    explanation:
      'To prove NP-completeness of X: (1) show X is in NP by giving a polynomial-time verifier, and (2) reduce a known NP-complete problem (e.g., 3-SAT) TO X in polynomial time. This shows X is at least as hard as all NP problems.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'Which strategy is NOT a standard approach for coping with NP-hard problems?',
    options: [
      'Approximation algorithms that guarantee solutions within a factor of optimal.',
      'Parameterized algorithms that isolate exponential dependence into a small parameter.',
      'Waiting for P = NP to be proven so exact algorithms become available.',
      'Heuristics like simulated annealing that work well in practice without worst-case guarantees.',
    ],
    answer: 2,
    explanation:
      'Waiting for P = NP to be proven is not a practical strategy -- most researchers believe P != NP, and even if equality held, the polynomial algorithm might have impractically large exponents. Real approaches include approximation algorithms, parameterized complexity, heuristics, and exploiting tractable special cases.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
