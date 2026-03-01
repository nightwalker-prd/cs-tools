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
  { id: 1, title: 'Finite Automata' },
  { id: 2, title: 'Regular Languages' },
  { id: 3, title: 'Context-Free Languages' },
  { id: 4, title: 'Computability & Complexity' },
];

export const topics: Topic[] = [
  // ── Part 1: Finite Automata ──────────────────────────────────────────
  {
    id: 1,
    title: 'Deterministic Finite Automata (DFA)',
    part: 1,
    partTitle: 'Finite Automata',
    summary:
      'DFAs are the simplest model of computation, recognizing regular languages with a fixed amount of memory represented by a finite set of states.',
    concepts: [
      {
        id: 'dfa-definition',
        name: 'Formal Definition of a DFA',
        description:
          'A DFA is a 5-tuple (Q, Sigma, delta, q0, F) consisting of a finite set of states, an input alphabet, a transition function, a start state, and a set of accept states.',
        keyPoints: [
          'Q is a finite, non-empty set of states. Each state represents a distinct configuration of the machine at any point during computation.',
          'Sigma is the input alphabet, a finite set of symbols the machine can read. The machine processes exactly one symbol per step from left to right.',
          'The transition function delta: Q x Sigma -> Q maps every (state, symbol) pair to exactly one next state, making the machine completely deterministic.',
          'q0 in Q is the unique start state where every computation begins. F is a subset of Q containing the accept (final) states.',
          'A string is accepted if and only if the sequence of transitions starting from q0, reading each symbol in order, ends in a state belonging to F.',
        ],
        tradeoffs: [
          'DFAs guarantee O(n) processing time for a string of length n, but may require exponentially more states than an equivalent NFA.',
          'The deterministic transition function simplifies implementation but limits expressiveness to regular languages only.',
        ],
        realWorld: [
          'Lexical analyzers in compilers use DFAs to tokenize source code into keywords, identifiers, literals, and operators.',
          'Network protocol parsers use DFA-based state machines to validate packet headers and manage connection states (e.g., TCP state machine).',
          'Vending machine controllers use DFAs to track coin insertion states and dispense products when sufficient payment is received.',
        ],
      },
      {
        id: 'dfa-computation',
        name: 'DFA Computation & Language Recognition',
        description:
          'A DFA processes an input string one symbol at a time, transitioning between states, and accepts or rejects based on whether it ends in an accept state.',
        keyPoints: [
          'The extended transition function delta-hat generalizes delta to strings: delta-hat(q, epsilon) = q and delta-hat(q, wa) = delta(delta-hat(q, w), a) for string w and symbol a.',
          'The language of a DFA M, denoted L(M), is the set of all strings w such that delta-hat(q0, w) is in F. This is always a regular language.',
          'A DFA partitions Sigma* (all possible strings) into exactly two sets: accepted strings L(M) and rejected strings Sigma* \\ L(M).',
          'Dead states (trap states) are non-accepting states with all transitions looping back to themselves. They represent permanent rejection once entered.',
          'Two DFAs are equivalent if and only if they recognize the same language. Equivalence is decidable via the product construction or minimization.',
        ],
        tradeoffs: [
          'DFAs always halt after reading the entire input (guaranteed termination), unlike more powerful models that may loop forever.',
          'Single-pass left-to-right reading is efficient but prevents the machine from revisiting earlier parts of the input.',
        ],
        realWorld: [
          'Input validation in web forms uses DFA-like logic to check formats such as email addresses, phone numbers, and postal codes.',
          'Traffic light controllers cycle through states (green, yellow, red) based on timer signals and sensor inputs.',
          'Digital circuit design uses finite state machines to implement sequential logic in hardware like elevators and washing machines.',
        ],
      },
      {
        id: 'dfa-design',
        name: 'DFA Design Strategies',
        description:
          'Designing a correct DFA requires identifying what information the machine must remember and encoding that information into a finite set of states.',
        keyPoints: [
          'The key design insight is determining what "memory" the DFA needs. Each distinct piece of information the machine must track becomes a dimension of the state space.',
          'Product construction combines two DFAs by creating states that are pairs (qi, rj), enabling intersection, union, and symmetric difference of languages.',
          'Complement construction is trivially achieved by swapping accept and non-accept states: if M accepts L, then M-complement (with F\' = Q \\ F) accepts Sigma* \\ L.',
          'For modular arithmetic languages (e.g., binary numbers divisible by 3), states represent remainder classes, and transitions update the remainder as new digits are read.',
          'Common pitfalls include forgetting the dead state, failing to handle all alphabet symbols from every state, and confusing "contains" with "ends with" patterns.',
        ],
        tradeoffs: [
          'Systematic design via product construction guarantees correctness but may produce many unreachable states that need pruning.',
          'Intuitive ad-hoc design can yield smaller DFAs but is error-prone and harder to verify for correctness.',
        ],
        realWorld: [
          'Regular expression engines in text editors compile patterns into DFAs for fast search-and-replace operations across large files.',
          'Spam filters use finite automata to scan email content for known patterns of phishing URLs and malicious keywords.',
          'Game AI uses state machines to control NPC behavior, transitioning between patrol, chase, attack, and retreat states based on player proximity.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Nondeterministic Finite Automata (NFA)',
    part: 1,
    partTitle: 'Finite Automata',
    summary:
      'NFAs extend DFAs by allowing multiple simultaneous transitions, epsilon-transitions, and nondeterministic choice, while recognizing exactly the same class of regular languages.',
    concepts: [
      {
        id: 'nfa-definition',
        name: 'Formal Definition of an NFA',
        description:
          'An NFA is a 5-tuple (Q, Sigma, delta, q0, F) where the transition function maps a state and symbol to a set of possible next states, allowing nondeterminism.',
        keyPoints: [
          'The transition function delta: Q x (Sigma union {epsilon}) -> P(Q) maps each (state, symbol) pair to a subset of Q (the power set), allowing zero, one, or many next states.',
          'Epsilon-transitions (epsilon-moves) allow the NFA to change state without consuming any input symbol, enabling spontaneous transitions between states.',
          'Nondeterminism means the NFA can be in multiple states simultaneously. Conceptually, it explores all possible computation paths in parallel.',
          'An NFA accepts a string if there exists at least one computation path that ends in an accept state. Rejection requires all paths to fail.',
          'The epsilon-closure of a state q, denoted ECLOSE(q), is the set of all states reachable from q by following zero or more epsilon-transitions.',
        ],
        tradeoffs: [
          'NFAs are often exponentially more concise than equivalent DFAs, but their nondeterminism makes direct hardware implementation impractical.',
          'Epsilon-transitions simplify modular construction of automata but add complexity to the transition computation via epsilon-closures.',
        ],
        realWorld: [
          'Pattern matching in text search tools like grep conceptually uses NFAs to handle alternation and optional patterns efficiently.',
          'Bioinformatics sequence alignment uses nondeterministic models to explore multiple possible alignments of DNA or protein sequences.',
          'Natural language processing uses nondeterministic models to handle lexical and syntactic ambiguity in human language parsing.',
        ],
      },
      {
        id: 'nfa-computation',
        name: 'NFA Computation & Acceptance',
        description:
          'An NFA processes input by maintaining a set of active states and transitioning all of them simultaneously, accepting if any active state at the end is accepting.',
        keyPoints: [
          'The subset tracking method simulates an NFA by maintaining the set of all currently active states. For each input symbol, compute the union of transitions from every active state.',
          'After each transition step, the epsilon-closure must be computed to include all states reachable via epsilon-transitions from the new set of active states.',
          'A string w is accepted if the final set of active states after processing all symbols of w has a non-empty intersection with the accept states F.',
          'The computation tree of an NFA on input w has branching at nondeterministic choices. Acceptance requires at least one root-to-leaf path ending in an accept state.',
          'NFAs can have transitions to the empty set (delta(q, a) = {}), representing a branch that "dies" without explicit rejection.',
        ],
        tradeoffs: [
          'Existential acceptance (accept if any path succeeds) makes NFAs natural for search problems but harder to reason about for rejection.',
          'Tracking all active states during simulation requires space proportional to |Q|, which is manageable but adds overhead compared to DFA simulation.',
        ],
        realWorld: [
          'Web crawlers use nondeterministic strategies to explore multiple hyperlinks simultaneously, following all promising paths through a website.',
          'Packet classification in software-defined networking evaluates multiple firewall rules concurrently, matching a packet if any rule applies.',
          'Spell checkers explore multiple edit distance paths nondeterministically to suggest corrections for misspelled words.',
        ],
      },
      {
        id: 'nfa-construction',
        name: 'NFA Construction Techniques',
        description:
          'Systematic NFA construction methods allow building complex automata by composing simpler ones using union, concatenation, and Kleene star operations.',
        keyPoints: [
          'Thompson\'s construction converts a regular expression to an NFA by recursively building sub-NFAs for each operator and combining them with epsilon-transitions.',
          'Union construction creates a new start state with epsilon-transitions to the start states of both sub-NFAs, merging two machines that accept L1 and L2 into one that accepts L1 union L2.',
          'Concatenation construction connects the accept states of the first NFA to the start state of the second NFA via epsilon-transitions, accepting L1 followed by L2.',
          'Kleene star construction adds a new start/accept state with epsilon-transitions to and from the original NFA, allowing zero or more repetitions of the original language.',
          'These modular constructions produce NFAs with at most 2n states for a regular expression of length n, making them efficient building blocks for larger automata.',
        ],
        tradeoffs: [
          'Thompson\'s construction produces simple, modular NFAs but introduces many epsilon-transitions that must be resolved during simulation or conversion.',
          'Direct NFA design can be more compact than Thompson\'s construction but requires more insight and is harder to automate.',
        ],
        realWorld: [
          'Compiler front-ends use Thompson\'s construction to convert lexical specification patterns into NFAs for building scanners.',
          'Intrusion detection systems build NFAs from signature databases to match multiple attack patterns simultaneously in network traffic.',
          'Search engines construct NFAs from user queries with wildcards and alternations to match documents in an inverted index.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'NFA-to-DFA Conversion & Minimization',
    part: 1,
    partTitle: 'Finite Automata',
    summary:
      'The subset construction converts any NFA to an equivalent DFA, and minimization algorithms produce the unique smallest DFA for any regular language.',
    concepts: [
      {
        id: 'subset-construction',
        name: 'Subset Construction (Powerset Construction)',
        description:
          'The subset construction algorithm converts an NFA to an equivalent DFA by treating each set of NFA states as a single DFA state.',
        keyPoints: [
          'Each DFA state corresponds to a subset of NFA states. The DFA start state is ECLOSE(q0), the epsilon-closure of the NFA start state.',
          'For each DFA state S and symbol a, the DFA transition is delta_D(S, a) = ECLOSE(union of delta_N(q, a) for all q in S), combining all NFA transitions.',
          'A DFA state S is accepting if S contains at least one NFA accept state (S intersection F_N is non-empty).',
          'In the worst case, an NFA with n states produces a DFA with up to 2^n states, and this exponential blowup is achievable (e.g., the language of strings whose nth-from-last symbol is "a").',
          'Lazy (on-demand) subset construction only creates DFA states as they are reached during processing, avoiding the full exponential blowup for many practical cases.',
        ],
        tradeoffs: [
          'The resulting DFA guarantees O(n) matching time but may require exponentially more space than the original NFA.',
          'Lazy construction saves space for sparse NFAs but loses the benefit of precomputed transitions for repeated queries.',
        ],
        realWorld: [
          'Regular expression libraries like RE2 use lazy DFA construction to avoid exponential blowup while maintaining near-DFA matching speed.',
          'Hardware packet filters convert NFA rule sets to DFAs for wire-speed classification in network switches and routers.',
          'Database query optimizers convert nondeterministic query plans to deterministic execution plans for predictable performance.',
        ],
      },
      {
        id: 'dfa-minimization',
        name: 'DFA Minimization',
        description:
          'DFA minimization produces the unique smallest DFA for a given regular language by merging indistinguishable states using partition refinement.',
        keyPoints: [
          'Two states p and q are distinguishable if there exists a string w such that exactly one of delta-hat(p, w) and delta-hat(q, w) is in F. Otherwise they are equivalent.',
          'The table-filling (marking) algorithm iteratively marks pairs of distinguishable states: first mark (accept, non-accept) pairs, then propagate via transitions.',
          'Hopcroft\'s algorithm performs partition refinement in O(n log n) time by starting with {F, Q\\F} and splitting groups based on transition disagreements.',
          'The Myhill-Nerode theorem guarantees that every regular language has a unique (up to isomorphism) minimum-state DFA, establishing a canonical form.',
          'Unreachable states must be removed before minimization. A state is unreachable if no string leads from the start state to that state.',
        ],
        tradeoffs: [
          'The minimal DFA is unique and canonical, making it ideal for language equivalence testing, but minimization has upfront computational cost.',
          'Hopcroft\'s O(n log n) algorithm is efficient but more complex to implement than the simpler O(n^2) table-filling approach.',
        ],
        realWorld: [
          'Model checking in hardware verification minimizes state machines to reduce the state space explored during property verification.',
          'Compression of lexical analyzers minimizes the DFA transition table to reduce memory footprint in embedded compilers.',
          'Telecommunication protocol testing minimizes protocol state machines to generate efficient conformance test suites.',
        ],
      },
      {
        id: 'myhill-nerode',
        name: 'Myhill-Nerode Theorem',
        description:
          'The Myhill-Nerode theorem provides a necessary and sufficient condition for a language to be regular, based on the finiteness of an equivalence relation on strings.',
        keyPoints: [
          'The relation x ~L y holds if for every string z, xz is in L if and only if yz is in L. This is a right-invariant equivalence relation on Sigma*.',
          'The Myhill-Nerode theorem states: L is regular if and only if ~L has a finite number of equivalence classes (finite index).',
          'The number of equivalence classes of ~L equals the number of states in the minimum DFA for L, providing a tight lower bound on DFA size.',
          'To prove a language is not regular using Myhill-Nerode, exhibit an infinite set of pairwise distinguishable strings (each pair separated by some suffix).',
          'Unlike the pumping lemma, the Myhill-Nerode theorem provides an exact characterization: it is both necessary and sufficient for regularity.',
        ],
        tradeoffs: [
          'Myhill-Nerode gives a complete characterization of regularity but requires reasoning about all possible distinguishing extensions, which can be complex.',
          'The pumping lemma is easier to apply for non-regularity proofs but is only a necessary condition (not sufficient), meaning it can fail to prove non-regularity.',
        ],
        realWorld: [
          'Automata learning algorithms (like L*) use equivalence queries inspired by Myhill-Nerode to infer minimal DFAs from black-box systems.',
          'State merging in model inference uses distinguishability to decide which observed states can be safely merged in learned models.',
          'Formal verification tools use Myhill-Nerode equivalence to canonicalize regular specifications before checking system compliance.',
        ],
      },
    ],
  },

  // ── Part 2: Regular Languages ────────────────────────────────────────
  {
    id: 4,
    title: 'Regular Expressions & Regular Grammars',
    part: 2,
    partTitle: 'Regular Languages',
    summary:
      'Regular expressions and regular grammars are alternative formalisms for specifying regular languages, each equivalent in power to finite automata.',
    concepts: [
      {
        id: 'regex-syntax',
        name: 'Regular Expression Syntax & Semantics',
        description:
          'Regular expressions define regular languages using three core operations -- union, concatenation, and Kleene star -- applied to alphabet symbols and the empty string.',
        keyPoints: [
          'The base cases are: the empty set (matching nothing), epsilon (matching the empty string), and each symbol a in Sigma (matching that single character).',
          'Union (R1 | R2) matches any string matched by R1 or R2. Concatenation (R1 R2) matches a string in R1 followed by a string in R2.',
          'Kleene star (R*) matches zero or more concatenations of strings from R. It always includes epsilon and is the only operator that produces infinite languages from finite ones.',
          'Operator precedence from highest to lowest: Kleene star, concatenation, union. Parentheses override default precedence.',
          'Every regular expression defines a regular language, and conversely every regular language can be described by a regular expression (Kleene\'s theorem).',
        ],
        tradeoffs: [
          'Regular expressions are concise and human-readable for pattern specification, but can be ambiguous without careful use of parentheses.',
          'Practical regex engines (PCRE, etc.) add backreferences and lookahead that go beyond theoretical regular expressions and can cause exponential matching time.',
        ],
        realWorld: [
          'Search tools like grep, sed, and awk use regular expressions for pattern matching and text transformation in Unix command-line workflows.',
          'Input validation in web applications uses regex to verify formats of emails, URLs, dates, and credit card numbers.',
          'Log analysis tools like Splunk and ELK use regex to extract structured fields from unstructured log entries.',
        ],
      },
      {
        id: 'regex-to-nfa',
        name: 'Converting Between Regex and Finite Automata',
        description:
          'Systematic algorithms convert regular expressions to NFAs and DFAs to regular expressions, proving the equivalence of these formalisms.',
        keyPoints: [
          'Thompson\'s construction converts a regex to an NFA in O(n) time and space, producing an NFA with at most 2n states for a regex of length n.',
          'State elimination converts a DFA/NFA to a regular expression by removing states one at a time and labeling transitions with regular expressions instead of single symbols.',
          'During state elimination, when removing state q, for each pair (p, r) of remaining states, the new transition from p to r combines the old direct path with the path through q.',
          'The order in which states are eliminated affects the size of the resulting regular expression but not the language it describes.',
          'The resulting regular expression may be exponentially larger than the original automaton, as state elimination can produce doubly exponential expressions in the worst case.',
        ],
        tradeoffs: [
          'Thompson\'s NFA construction is simple and linear but produces NFAs with many epsilon-transitions that need subsequent processing.',
          'State elimination is conceptually simple but can produce very large regular expressions; choosing a good elimination order is an NP-hard optimization problem.',
        ],
        realWorld: [
          'Compiler generators like Lex/Flex convert regular expression token specifications to DFAs for efficient lexical analysis.',
          'Network intrusion detection systems compile regex signatures to DFAs for wire-speed deep packet inspection.',
          'Code migration tools extract regex patterns from legacy finite state machine implementations for documentation and modernization.',
        ],
      },
      {
        id: 'regular-grammars',
        name: 'Regular (Right-Linear) Grammars',
        description:
          'Regular grammars are restricted context-free grammars where every production has at most one nonterminal, appearing only at the rightmost position, generating exactly the regular languages.',
        keyPoints: [
          'A right-linear grammar has productions of the form A -> wB or A -> w, where A and B are nonterminals and w is a (possibly empty) string of terminals.',
          'A left-linear grammar has productions A -> Bw or A -> w. Left-linear and right-linear grammars generate the same class of languages, but mixing them yields context-free power.',
          'Converting a DFA to a right-linear grammar: each state becomes a nonterminal, each transition delta(q, a) = p becomes q -> ap, and accept states get productions q -> epsilon.',
          'Converting a right-linear grammar to an NFA: each nonterminal becomes a state, each production A -> aB becomes transition delta(A, a) = B, and A -> a leads to an accept state.',
          'Regular grammars provide a generative perspective on regular languages, complementing the recognitive perspective of automata and the denotational perspective of regex.',
        ],
        tradeoffs: [
          'Regular grammars fit naturally into grammar-based frameworks but are less intuitive than regex for pattern specification.',
          'The restriction to one nonterminal per production makes regular grammars less expressive than general CFGs but ensures efficient parsing.',
        ],
        realWorld: [
          'Communication protocol specifications use regular grammars to define valid message sequences in standards documents like RFCs.',
          'Music theory uses regular grammars to describe rhythmic patterns and simple melodic structures in algorithmic composition.',
          'DNA sequence motif databases use grammar-like notations to describe regular patterns in biological sequences for annotation.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Pumping Lemma for Regular Languages',
    part: 2,
    partTitle: 'Regular Languages',
    summary:
      'The pumping lemma provides a necessary condition for regularity, enabling proofs that certain languages (like {a^n b^n}) are not regular.',
    concepts: [
      {
        id: 'pumping-lemma-statement',
        name: 'Statement of the Pumping Lemma',
        description:
          'The pumping lemma states that for any regular language, sufficiently long strings must contain a short substring that can be repeated (pumped) any number of times while staying in the language.',
        keyPoints: [
          'Formally: if L is regular, there exists a pumping length p >= 1 such that every string s in L with |s| >= p can be split as s = xyz satisfying three conditions.',
          'Condition 1: |y| > 0 (the pumped portion is non-empty). Condition 2: |xy| <= p (the pump occurs within the first p characters). Condition 3: for all i >= 0, xy^i z is in L.',
          'The pumping length p can be taken as the number of states in the DFA for L. The proof relies on the pigeonhole principle: reading p symbols visits p+1 states, so some state repeats.',
          'The repeated state creates a cycle (the y portion). Traversing this cycle any number of times (including zero) produces strings that must still be accepted.',
          'The lemma is a necessary but not sufficient condition for regularity. There exist non-regular languages that satisfy the pumping lemma.',
        ],
        tradeoffs: [
          'The pumping lemma is widely applicable and relatively easy to use for proving non-regularity, but cannot prove a language IS regular.',
          'The adversarial game structure (the adversary picks p and the split) requires careful reasoning about all possible decompositions.',
        ],
        realWorld: [
          'Language design in programming languages uses pumping arguments to justify why certain features (like matched parentheses) require more than regular expressions.',
          'Data format validation relies on understanding that formats requiring counting (like matched XML tags) cannot be handled by regular expressions alone.',
          'Interview preparation for computer science positions frequently covers pumping lemma proofs as a test of theoretical reasoning ability.',
        ],
      },
      {
        id: 'pumping-proofs',
        name: 'Pumping Lemma Proof Technique',
        description:
          'Proving a language is not regular using the pumping lemma involves a structured adversarial argument where we show no valid decomposition can satisfy all conditions.',
        keyPoints: [
          'The proof structure is a game: (1) the adversary picks p, (2) we choose s in L with |s| >= p, (3) the adversary picks a split xyz satisfying |y|>0 and |xy|<=p, (4) we find i such that xy^i z is not in L.',
          'Choosing the right string s is critical. The string must be in L, depend on p (usually involving p in the length), and be structured so any valid y causes a contradiction when pumped.',
          'For {a^n b^n | n >= 0}: choose s = a^p b^p. Since |xy| <= p, y = a^k for some k > 0. Pumping up (i=2) gives a^(p+k) b^p, which is not in L since p+k != p.',
          'For {ww | w in {a,b}*}: choose s = a^p b a^p b. Any y in the first p characters is a string of a\'s. Pumping changes the first half but not the second, breaking the ww structure.',
          'Common mistakes include choosing a string that doesn\'t depend on p, failing to consider all possible splits, or confusing the quantifier structure (the adversary chooses the split, not you).',
        ],
        tradeoffs: [
          'The pumping lemma proof technique is mechanical once the right string is chosen, but choosing that string requires insight specific to each language.',
          'Alternative proof methods (Myhill-Nerode, closure properties) can sometimes handle cases where the pumping lemma is cumbersome or fails.',
        ],
        realWorld: [
          'Complexity analysis in software engineering uses similar adversarial arguments to prove lower bounds on the resources required by algorithms.',
          'Security analysis uses game-based proof techniques analogous to the pumping lemma game to reason about the limits of detection systems.',
          'Type system design uses formal arguments about expressiveness limits to justify the need for dependent types or higher-kinded types beyond simple pattern matching.',
        ],
      },
      {
        id: 'pumping-limitations',
        name: 'Limitations & Alternatives to the Pumping Lemma',
        description:
          'The pumping lemma cannot prove regularity and may fail to prove non-regularity for some non-regular languages; alternative techniques like Myhill-Nerode and closure properties fill these gaps.',
        keyPoints: [
          'The language L = {a^i b^j c^k | if i=1 then j=k} is not regular but satisfies the pumping lemma, showing the lemma is not a sufficient condition for regularity.',
          'The Myhill-Nerode theorem provides an exact characterization: L is regular iff the equivalence relation ~L has finite index. It is both necessary and sufficient.',
          'Closure properties offer indirect proofs: if L is non-regular and L\' is regular, then L intersect L\' being non-regular (by assumption) proves L is non-regular using closure under intersection.',
          'Kolmogorov complexity arguments can also prove non-regularity: if a language contains strings of high descriptive complexity, it cannot be regular.',
          'In practice, combining multiple techniques -- pumping lemma, closure, and Myhill-Nerode -- provides the most robust toolkit for classifying languages.',
        ],
        tradeoffs: [
          'Myhill-Nerode is more powerful than the pumping lemma but requires constructing an infinite distinguishable set, which can be harder to find.',
          'Closure-based proofs are elegant and modular but require an appropriate regular language to intersect/complement with.',
        ],
        realWorld: [
          'Programming language specification committees use multiple formal methods to determine which syntactic constructs can be handled by regular expression-based lexers.',
          'Database query optimization uses decidability results about regular vs. non-regular query fragments to choose between different evaluation strategies.',
          'Formal methods courses teach multiple proof techniques because real-world verification problems require selecting the most appropriate tool for each case.',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Closure Properties & Decision Problems',
    part: 2,
    partTitle: 'Regular Languages',
    summary:
      'Regular languages are closed under all Boolean operations, concatenation, and Kleene star, and key questions like emptiness, equivalence, and membership are all decidable.',
    concepts: [
      {
        id: 'closure-properties',
        name: 'Closure Properties of Regular Languages',
        description:
          'Regular languages are closed under union, intersection, complement, concatenation, Kleene star, reversal, homomorphism, and inverse homomorphism.',
        keyPoints: [
          'Union closure: given DFAs M1 and M2, the product construction with F = F1 x Q2 union Q1 x F2 builds a DFA for L(M1) union L(M2).',
          'Intersection closure follows from the product construction with F = F1 x F2, accepting only when both component DFAs simultaneously accept.',
          'Complement closure is immediate: swap accepting and non-accepting states in a DFA. This only works for DFAs (not NFAs) because DFAs have exactly one active state.',
          'Concatenation and Kleene star closure follow from NFA constructions: connect accept states of the first to the start of the second (concatenation), or add epsilon-loops (star).',
          'Homomorphism h: Sigma -> Delta* maps each symbol to a string. If L is regular, h(L) = {h(w) | w in L} is regular. Inverse homomorphism h^(-1)(L) is also regular.',
        ],
        tradeoffs: [
          'Product construction for union/intersection preserves determinism but squares the state count (|Q1| x |Q2| states).',
          'NFA-based closure constructions are simpler and more compact, but may require subsequent subset construction if a DFA is needed.',
        ],
        realWorld: [
          'Firewall rule composition uses intersection and union of regular languages to combine multiple packet filtering policies into a single efficient filter.',
          'Search query refinement uses Boolean combinations (AND, OR, NOT) of regular pattern matches, relying on closure properties for correctness.',
          'Access control systems combine regular expressions describing permitted URL paths using union and intersection to define security policies.',
        ],
      },
      {
        id: 'decision-problems',
        name: 'Decision Problems for Regular Languages',
        description:
          'Fundamental questions about regular languages -- emptiness, finiteness, membership, and equivalence -- are all algorithmically decidable.',
        keyPoints: [
          'Membership: given a DFA M and string w, simulate M on w in O(|w|) time. The answer is "yes" iff the final state is accepting.',
          'Emptiness: L(M) = {} iff no accept state is reachable from the start state. This is checked via BFS/DFS on the transition graph in O(|Q| + |delta|) time.',
          'Finiteness: L(M) is finite iff the DFA (after removing unreachable states) has no cycle that is reachable from the start state and can reach an accept state.',
          'Equivalence: L(M1) = L(M2) iff the symmetric difference (L1 \\ L2) union (L2 \\ L1) is empty. Alternatively, minimize both DFAs and check isomorphism.',
          'Universality: L(M) = Sigma* iff the complement of L(M) is empty. Since regular languages are closed under complement, this reduces to the emptiness problem.',
        ],
        tradeoffs: [
          'DFA-based decision algorithms are polynomial-time, but constructing the DFA from an NFA or regex may involve exponential blowup.',
          'Minimization-based equivalence checking produces a canonical form (enabling hashing) but has higher upfront cost than direct symmetric-difference emptiness checks.',
        ],
        realWorld: [
          'Compiler optimizations check emptiness of automata intersections to determine if two code paths can ever both execute (dead code elimination).',
          'Network policy verification checks equivalence of firewall configurations before and after updates to ensure no unintended changes in access control.',
          'Static analysis tools check language inclusion (L1 subset L2) to verify that a program\'s possible behaviors are within its specification.',
        ],
      },
      {
        id: 'regular-language-identities',
        name: 'Algebraic Identities & Properties',
        description:
          'Regular expressions satisfy numerous algebraic identities that enable simplification, optimization, and equivalence testing of regular language specifications.',
        keyPoints: [
          'Union is commutative (R|S = S|R), associative ((R|S)|T = R|(S|T)), and idempotent (R|R = R). The empty set is the identity element for union.',
          'Concatenation is associative ((RS)T = R(ST)) with identity epsilon (R epsilon = epsilon R = R) and annihilator empty set (R empty = empty R = empty).',
          'Concatenation distributes over union from both sides: R(S|T) = RS|RT and (R|S)T = RT|ST.',
          'Key Kleene star identities: (R*)* = R*, epsilon|RR* = R*, R* = epsilon|R R*, and (R|S)* = (R*S*)*.',
          'These identities form the axioms of Kleene algebra, a complete axiomatization of regular expression equivalence that enables algebraic simplification.',
        ],
        tradeoffs: [
          'Algebraic simplification can produce more readable and compact expressions but finding the optimal simplification is computationally hard.',
          'Kleene algebra provides a complete axiomatization, but proofs in the algebra can be much longer than automata-based equivalence checks.',
        ],
        realWorld: [
          'Regular expression optimization in compilers applies algebraic identities to simplify patterns before converting to automata, reducing state count.',
          'Query optimization in database systems uses algebraic rewriting rules analogous to Kleene algebra to simplify pattern-matching queries.',
          'Automated theorem provers use Kleene algebra axioms to verify equivalences of concurrent program specifications and communication protocols.',
        ],
      },
    ],
  },

  // ── Part 3: Context-Free Languages ───────────────────────────────────
  {
    id: 7,
    title: 'Context-Free Grammars & Parse Trees',
    part: 3,
    partTitle: 'Context-Free Languages',
    summary:
      'Context-free grammars generate languages beyond regular, using recursive production rules to describe nested structures like matched parentheses and programming language syntax.',
    concepts: [
      {
        id: 'cfg-definition',
        name: 'Formal Definition of Context-Free Grammars',
        description:
          'A CFG is a 4-tuple (V, Sigma, R, S) with variables, terminals, production rules, and a start variable that generates strings by recursive substitution.',
        keyPoints: [
          'V is a finite set of variables (nonterminals) representing syntactic categories. Sigma is a finite set of terminals (the alphabet). V and Sigma are disjoint.',
          'R is a finite set of production rules of the form A -> alpha, where A is a variable and alpha is a string of variables and terminals (alpha in (V union Sigma)*).',
          'S in V is the start variable. A derivation begins with S and repeatedly replaces a variable with the right-hand side of one of its productions until only terminals remain.',
          'A leftmost derivation always expands the leftmost variable first. A rightmost derivation always expands the rightmost variable first. Both produce the same parse tree.',
          'The language generated by a CFG G, denoted L(G), is the set of all terminal strings derivable from S. Every regular language is also context-free, but not vice versa.',
        ],
        tradeoffs: [
          'CFGs can express nested structures (matched brackets, recursive syntax) that regular languages cannot, but membership testing is slower (O(n^3) vs O(n)).',
          'The freedom of context-free productions (any variable can be replaced anywhere) enables expressiveness but can lead to ambiguity.',
        ],
        realWorld: [
          'Programming language syntax is defined by CFGs (often in BNF notation), forming the basis for parsers in every compiler and interpreter.',
          'HTML and XML document structure is described by context-free grammars, enabling validation against DTDs and schemas.',
          'Natural language syntax is modeled with CFGs in computational linguistics, forming the basis for phrase-structure grammars in NLP.',
        ],
      },
      {
        id: 'parse-trees',
        name: 'Parse Trees & Ambiguity',
        description:
          'A parse tree graphically represents a derivation in a CFG, and a grammar is ambiguous if any string has more than one distinct parse tree.',
        keyPoints: [
          'A parse tree has the start variable as root, internal nodes are variables, leaves are terminals or epsilon, and each internal node\'s children correspond to a production rule.',
          'The yield (or frontier) of a parse tree is the string obtained by reading all leaves from left to right, which equals the derived string.',
          'A grammar is ambiguous if there exists at least one string with two or more distinct parse trees (equivalently, two distinct leftmost derivations).',
          'Some context-free languages are inherently ambiguous: every CFG generating them is ambiguous. The language {a^i b^j c^k | i=j or j=k} is a classic example.',
          'Ambiguity in programming languages causes parsing conflicts. Techniques like operator precedence declarations and grammar refactoring resolve practical ambiguity.',
        ],
        tradeoffs: [
          'Unambiguous grammars ensure unique parse trees, simplifying semantic analysis, but may require more complex grammar rules to eliminate ambiguity.',
          'Ambiguous grammars are often simpler and more natural to write but require disambiguation rules (precedence, associativity) for practical use.',
        ],
        realWorld: [
          'Arithmetic expression parsing resolves ambiguity by encoding operator precedence and associativity directly into the grammar (e.g., term/factor hierarchy).',
          'The "dangling else" ambiguity in C/Java is resolved by the convention that "else" associates with the nearest unmatched "if".',
          'Natural language processing deals with pervasive syntactic ambiguity, using probabilistic CFGs to rank the most likely parse tree for ambiguous sentences.',
        ],
      },
      {
        id: 'cfg-normal-forms',
        name: 'Normal Forms (CNF & GNF)',
        description:
          'Chomsky Normal Form and Greibach Normal Form are standardized grammar formats that simplify algorithms and proofs while preserving the generated language.',
        keyPoints: [
          'Chomsky Normal Form (CNF): every production is either A -> BC (two variables) or A -> a (one terminal). The start variable may also have S -> epsilon.',
          'Converting to CNF involves: eliminating epsilon-productions, eliminating unit productions (A -> B), eliminating useless symbols, and converting long/mixed productions.',
          'The CYK (Cocke-Younger-Kasami) algorithm uses CNF to parse any CFG in O(n^3) time and O(n^2) space using dynamic programming.',
          'Greibach Normal Form (GNF): every production is A -> a alpha where a is a terminal and alpha is a (possibly empty) string of variables. GNF ensures one terminal per derivation step.',
          'GNF grammars directly correspond to pushdown automata without epsilon-transitions, since each step reads exactly one input symbol.',
        ],
        tradeoffs: [
          'CNF enables the elegant CYK parsing algorithm but can quadratically increase the number of productions during conversion.',
          'GNF guarantees no epsilon-transitions in the equivalent PDA but the conversion process is complex and can significantly increase grammar size.',
        ],
        realWorld: [
          'The CYK algorithm (based on CNF) is used in computational linguistics for parsing natural language sentences with probabilistic context-free grammars.',
          'Grammar-based fuzzing tools convert grammars to CNF to systematically generate test inputs covering all production rule combinations.',
          'Bioinformatics uses CYK-like algorithms on covariance models (stochastic CFGs) to predict RNA secondary structure from nucleotide sequences.',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Pushdown Automata',
    part: 3,
    partTitle: 'Context-Free Languages',
    summary:
      'Pushdown automata extend finite automata with a stack, providing exactly the computational power needed to recognize context-free languages.',
    concepts: [
      {
        id: 'pda-definition',
        name: 'Formal Definition of Pushdown Automata',
        description:
          'A PDA is a 7-tuple (Q, Sigma, Gamma, delta, q0, Z0, F) that augments a finite automaton with a stack alphabet and stack operations for context-free language recognition.',
        keyPoints: [
          'Gamma is the stack alphabet (may differ from input alphabet Sigma). Z0 in Gamma is the initial stack symbol, present at the bottom of the stack at the start.',
          'The transition function delta: Q x (Sigma union {epsilon}) x Gamma -> P(Q x Gamma*) reads the current state, an optional input symbol, and the top of the stack.',
          'Each transition pops the top stack symbol and pushes a (possibly empty) string of stack symbols. Pushing epsilon effectively pops without replacement.',
          'PDAs are inherently nondeterministic. Deterministic PDAs (DPDAs) are strictly less powerful and recognize only a proper subset of CFLs (the deterministic CFLs).',
          'Two acceptance modes: accept by final state (end in accepting state) and accept by empty stack (stack becomes empty). These modes are equivalent in power for NPDAs.',
        ],
        tradeoffs: [
          'The stack gives PDAs the ability to match nested structures, but limits them to one "counter" at a time (unlike Turing machines with unlimited tape).',
          'Nondeterministic PDAs are more powerful than deterministic ones (unlike DFAs vs NFAs), creating an actual gap in language recognition capability.',
        ],
        realWorld: [
          'Recursive descent parsers in compilers implicitly implement PDAs, using the call stack as the PDA stack to parse nested programming constructs.',
          'XML/JSON validators use stack-based parsing to ensure properly nested opening and closing tags or braces.',
          'Syntax highlighting in code editors uses simplified PDA-like stack tracking to match brackets, parentheses, and begin/end blocks.',
        ],
      },
      {
        id: 'pda-cfg-equivalence',
        name: 'Equivalence of PDAs and CFGs',
        description:
          'PDAs and CFGs are equivalent in power: every CFG can be converted to a PDA, and every PDA can be converted to a CFG, both recognizing exactly the context-free languages.',
        keyPoints: [
          'CFG to PDA: the constructed PDA has three states. It pushes the start variable, then nondeterministically replaces the top variable using grammar productions or matches terminals with input.',
          'PDA to CFG: for each pair of states (p, q), create a variable A_pq that generates all strings causing the PDA to go from p (with some stack symbol) to q (with that symbol popped).',
          'The CFG-to-PDA construction produces a PDA that simulates leftmost derivations, with the stack holding the remaining sentential form.',
          'The PDA-to-CFG construction may produce O(|Q|^3) variables and a large number of productions, many of which may be useless and can be eliminated.',
          'This equivalence establishes that the class of context-free languages has both a generative characterization (CFGs) and a recognitive characterization (PDAs).',
        ],
        tradeoffs: [
          'The CFG-to-PDA direction is straightforward and practical, but the resulting PDA is highly nondeterministic.',
          'The PDA-to-CFG direction is theoretically important but produces unwieldy grammars that are rarely useful in practice without significant simplification.',
        ],
        realWorld: [
          'Parser generators like Yacc/Bison take a CFG specification and produce a PDA-based parser (typically LALR), directly applying the equivalence.',
          'Programming language design uses the CFG formalism for specification but PDA-based implementations for parsing, leveraging the equivalence.',
          'Formal verification of communication protocols converts between grammar and automaton representations to apply the most appropriate analysis technique.',
        ],
      },
      {
        id: 'dpda',
        name: 'Deterministic Pushdown Automata (DPDA)',
        description:
          'DPDAs are PDAs with at most one possible transition from any configuration, recognizing the deterministic context-free languages -- a proper subset of all CFLs.',
        keyPoints: [
          'A DPDA has at most one transition for each combination of state, input symbol (or epsilon), and stack top. No state may have both an epsilon-transition and a symbol-transition on the same stack top.',
          'Deterministic CFLs include all regular languages and many programming language constructs, but exclude inherently ambiguous languages.',
          'The canonical non-deterministic CFL is {ww^R | w in {a,b}*} (palindromes). A DPDA cannot recognize this because it cannot determine the string\'s midpoint without nondeterminism.',
          'LR(k) grammars correspond exactly to DPDA-recognizable languages (with endmarker), making DPDAs the theoretical foundation for practical bottom-up parsers.',
          'Deterministic CFLs are closed under complement (unlike general CFLs) but are not closed under union, intersection, or concatenation.',
        ],
        tradeoffs: [
          'DPDAs enable efficient O(n) parsing time, making them practical for real-world parsers, but cannot handle all context-free languages.',
          'The DPDA-NPDA gap means some languages require nondeterminism, forcing the use of general CFL parsing algorithms (O(n^3)) when DPDAs are insufficient.',
        ],
        realWorld: [
          'All practical programming language parsers (LL, LR, LALR) are based on DPDAs, ensuring linear-time parsing of source code.',
          'Expression evaluation in calculators uses DPDA-like stack-based computation (shunting-yard algorithm) for operator precedence parsing.',
          'Streaming data parsers for structured formats (JSON, CSV with nesting) use deterministic stack-based parsing for single-pass processing.',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'CFL Properties & Pumping Lemma',
    part: 3,
    partTitle: 'Context-Free Languages',
    summary:
      'Context-free languages have limited closure properties and their own pumping lemma, which proves languages like {a^n b^n c^n} are not context-free.',
    concepts: [
      {
        id: 'cfl-closure',
        name: 'Closure Properties of Context-Free Languages',
        description:
          'CFLs are closed under union, concatenation, Kleene star, reversal, and homomorphism, but notably NOT closed under intersection or complement.',
        keyPoints: [
          'Union: given CFGs G1 and G2 with disjoint variables, create new start variable S -> S1 | S2 where S1, S2 are the original start variables.',
          'Concatenation: create S -> S1 S2. Kleene star: create S -> S1 S | epsilon. Both follow directly from the grammar formalism.',
          'CFLs are NOT closed under intersection: L1 = {a^n b^n c^m} and L2 = {a^m b^n c^n} are both CFLs, but L1 intersect L2 = {a^n b^n c^n} is not context-free.',
          'CFLs are NOT closed under complement, since closure under complement plus union would give closure under intersection (by De Morgan), contradicting the above.',
          'The intersection of a CFL with a regular language IS always a CFL. This is proved by a product construction combining a PDA with a DFA.',
        ],
        tradeoffs: [
          'CFL closure under union/concatenation/star enables modular grammar design, but the lack of intersection closure limits compositional reasoning.',
          'The CFL-regular intersection property is extremely useful for restricting CFLs to specific patterns, enabling many practical and theoretical applications.',
        ],
        realWorld: [
          'Compiler design exploits CFL-regular intersection to handle lexer-parser interaction: the lexer (regular) filters tokens before the parser (context-free) processes structure.',
          'Access control policy analysis must account for non-closure under intersection when combining context-free access path specifications.',
          'Natural language processing handles the intersection of syntactic rules (CFG) with phonological constraints (regular) to model language phenomena.',
        ],
      },
      {
        id: 'cfl-pumping-lemma',
        name: 'Pumping Lemma for Context-Free Languages',
        description:
          'The CFL pumping lemma states that long strings in any CFL contain two short substrings that can be simultaneously pumped while keeping the string in the language.',
        keyPoints: [
          'Statement: for any CFL L, there exists p such that every s in L with |s| >= p can be split as s = uvxyz where |vy| > 0, |vxy| <= p, and uv^i xy^i z is in L for all i >= 0.',
          'The proof uses the parse tree: a sufficiently long string requires a tall parse tree, and by pigeonhole, some variable repeats on a root-to-leaf path.',
          'The repeated variable produces the two pumpable segments v and y, one on each side of the innermost occurrence. Replacing the outer subtree with the inner (or vice versa) gives the pumped strings.',
          'The condition |vy| > 0 ensures at least one of v, y is non-empty. The condition |vxy| <= p bounds the combined length of the pumpable region.',
          'Classic application: {a^n b^n c^n} is not context-free. Any split uvxyz with |vxy| <= p has v and y covering at most two of the three symbol groups, so pumping breaks the equality.',
        ],
        tradeoffs: [
          'The CFL pumping lemma is the standard tool for proving non-context-freeness, but like its regular counterpart, it is only a necessary condition.',
          'Ogden\'s lemma is a stronger variant that allows "marking" positions, handling cases where the basic CFL pumping lemma fails.',
        ],
        realWorld: [
          'Programming language designers use CFL pumping arguments to determine which language features require more than context-free power (e.g., type checking, scope resolution).',
          'Data format specification uses pumping arguments to justify the choice between context-free parsers and more powerful formalisms for complex nested constraints.',
          'Theoretical computer science education uses the CFL pumping lemma as a key tool for classifying languages in the Chomsky hierarchy.',
        ],
      },
      {
        id: 'cfl-decision-problems',
        name: 'Decision Problems for Context-Free Languages',
        description:
          'Some CFL decision problems are decidable (membership, emptiness) but others are undecidable (equivalence, universality), in stark contrast to regular languages.',
        keyPoints: [
          'Membership is decidable: the CYK algorithm tests if a string w is in L(G) in O(n^3) time using dynamic programming on the CNF grammar. Earley\'s algorithm also solves this in O(n^3).',
          'Emptiness is decidable: L(G) is non-empty iff the start variable is "generating" (can derive a terminal string). This is checked by iteratively marking generating variables.',
          'Finiteness is decidable: L(G) is infinite iff the grammar (after removing useless symbols) has a cycle of variable productions reachable from S that can reach a terminal string.',
          'Equivalence is UNDECIDABLE for CFGs: given two CFGs G1 and G2, there is no algorithm to determine if L(G1) = L(G2). This follows from undecidability of Post\'s correspondence problem.',
          'Universality is UNDECIDABLE: given a CFG G, there is no algorithm to determine if L(G) = Sigma*. Ambiguity detection is also undecidable for CFGs.',
        ],
        tradeoffs: [
          'The CYK O(n^3) membership algorithm is guaranteed to work for any CFG but is slower than linear-time parsing for restricted grammar classes (LL, LR).',
          'Undecidability of equivalence means CFG optimization and grammar comparison must rely on heuristics or restricted subclasses rather than general algorithms.',
        ],
        realWorld: [
          'Parser testing relies on the decidability of membership to verify that specific strings are accepted or rejected, even though full equivalence testing is impossible.',
          'Grammar evolution in software maintenance must use testing and manual inspection to verify grammar changes preserve the intended language, since equivalence is undecidable.',
          'Compilers use restricted grammar classes (LL(k), LALR(1)) where more decision problems become tractable, trading expressiveness for analyzability.',
        ],
      },
    ],
  },

  // ── Part 4: Computability & Complexity ───────────────────────────────
  {
    id: 10,
    title: 'Turing Machines',
    part: 4,
    partTitle: 'Computability & Complexity',
    summary:
      'Turing machines formalize the notion of algorithmic computation with an infinite tape, capturing everything that is mechanically computable.',
    concepts: [
      {
        id: 'tm-definition',
        name: 'Formal Definition & Operation of Turing Machines',
        description:
          'A Turing machine is a 7-tuple (Q, Sigma, Gamma, delta, q0, q_accept, q_reject) with an infinite tape, a read/write head, and the ability to move left or right.',
        keyPoints: [
          'Sigma is the input alphabet (not containing the blank symbol). Gamma is the tape alphabet (Sigma subset Gamma, blank in Gamma). The tape is infinite in at least one direction.',
          'The transition function delta: Q x Gamma -> Q x Gamma x {L, R} reads a symbol, writes a symbol, and moves the head left or right. It is undefined on q_accept and q_reject.',
          'A configuration (q, tape contents, head position) captures the complete instantaneous state of the TM. Computation is a sequence of configurations.',
          'A TM halts when it enters q_accept (accepting) or q_reject (rejecting). It may also loop forever, never halting -- this is the key difference from DFAs and PDAs.',
          'The Church-Turing thesis asserts that Turing machines capture the informal notion of "algorithm": anything computable by any reasonable model can be computed by a TM.',
        ],
        tradeoffs: [
          'Turing machines are universal (can compute anything computable) but have no guaranteed termination, unlike finite automata.',
          'The infinite tape provides unlimited memory but makes direct physical implementation impossible; real computers approximate TMs with finite but expandable memory.',
        ],
        realWorld: [
          'Every general-purpose programming language (Python, Java, C) is Turing-complete, meaning it can simulate any Turing machine given enough memory and time.',
          'The theoretical model of computation underlying cloud computing is essentially Turing machines, with scalable storage approximating the infinite tape.',
          'Alan Turing\'s original 1936 paper used this model to solve Hilbert\'s Entscheidungsproblem, proving that no general decision procedure exists for mathematical truth.',
        ],
      },
      {
        id: 'tm-variants',
        name: 'Turing Machine Variants',
        description:
          'Multiple variants of Turing machines -- multitape, nondeterministic, enumerators -- all have the same computational power as the basic single-tape deterministic model.',
        keyPoints: [
          'A multitape TM has k tapes, each with its own head. It can be simulated by a single-tape TM with a polynomial slowdown (O(t(n)^2) for t(n) steps of the multitape TM).',
          'A nondeterministic TM (NTM) can have multiple possible transitions. It accepts if any computation branch accepts. NTMs can be simulated by deterministic TMs with exponential time overhead.',
          'An enumerator TM prints strings onto an output tape. The language of an enumerator is the set of all strings it eventually prints. A language is recognizable iff some enumerator enumerates it.',
          'Two-way infinite tape, multi-dimensional tape, multi-head, and queue-based models are all equivalent to the standard single-tape TM in computational power.',
          'The robustness of the Turing machine model -- that all reasonable variants are equivalent -- provides strong evidence for the Church-Turing thesis.',
        ],
        tradeoffs: [
          'Multitape TMs are more convenient for algorithm design but add complexity to the formal model without increasing computational power.',
          'Nondeterministic TMs are more concise for some computations, but their simulation by deterministic TMs incurs exponential overhead (the P vs NP question asks whether this is necessary).',
        ],
        realWorld: [
          'Multi-core processors are analogous to multitape TMs, with each core operating on shared memory, achieving speedup without increasing theoretical computational power.',
          'Randomized algorithms correspond to TM variants with random transition choices, trading determinism for practical efficiency in problems like primality testing.',
          'Programming language designers prove Turing-completeness of new languages by simulating a known Turing-complete model, ensuring the language can express any algorithm.',
        ],
      },
      {
        id: 'universal-tm',
        name: 'Universal Turing Machine',
        description:
          'A Universal Turing Machine (UTM) takes as input the description of any TM M and an input w, then simulates M on w, embodying the concept of a stored-program computer.',
        keyPoints: [
          'TMs can be encoded as finite strings over a fixed alphabet. The encoding <M> describes M\'s states, transitions, and alphabet in a standard format.',
          'The UTM U reads <M, w> from its tape, simulates M\'s computation on w step by step, and accepts/rejects/loops exactly as M would on w.',
          'The existence of the UTM shows that a single fixed machine can compute any computable function -- it is a theoretical precursor to the stored-program computer.',
          'The UTM uses multiple tapes (or simulates them): one for M\'s tape contents, one for M\'s description, and one for tracking M\'s current state and head position.',
          'The UTM is fundamental to undecidability proofs: it enables diagonalization arguments by providing a mechanism for TMs to simulate other TMs.',
        ],
        tradeoffs: [
          'The UTM is universal but incurs simulation overhead (logarithmic slowdown for encoding state), making it less efficient than a purpose-built TM for any specific language.',
          'Encoding TMs as strings enables self-reference and diagonalization, which is both powerful (enabling universality proofs) and limiting (enabling undecidability proofs).',
        ],
        realWorld: [
          'Modern operating systems act as universal Turing machines, loading and executing arbitrary programs (encoded TM descriptions) from disk.',
          'Virtual machines and interpreters (JVM, Python interpreter) are practical UTMs that execute encoded programs written in their respective bytecode or source languages.',
          'Von Neumann architecture directly implements the UTM concept: programs (TM descriptions) and data (input) are both stored in the same memory.',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'Decidability & Recognizability',
    part: 4,
    partTitle: 'Computability & Complexity',
    summary:
      'Languages are classified as decidable, recognizable (but not decidable), or unrecognizable, with the halting problem being the canonical undecidable language.',
    concepts: [
      {
        id: 'decidable-languages',
        name: 'Decidable Languages & Deciders',
        description:
          'A language is decidable if some Turing machine always halts and correctly accepts or rejects every input, providing a definitive yes/no answer.',
        keyPoints: [
          'A decider (total TM) is a TM that halts on every input -- it never loops. The language it decides is the set of strings it accepts.',
          'All regular and context-free language decision problems (membership, emptiness, equivalence for DFAs) are decidable.',
          'Decidable problems about CFGs include membership (CYK, O(n^3)), emptiness (marking algorithm), and generation of specific strings.',
          'The class of decidable languages is closed under union, intersection, complement, concatenation, and Kleene star.',
          'Decidability is a property of languages (sets of strings), not individual strings. Even if individual membership seems easy, the general decision problem may be undecidable.',
        ],
        tradeoffs: [
          'Decidable languages guarantee termination (always get an answer), but the decision procedure may be arbitrarily slow (non-elementary time complexity).',
          'Restricting to decidable problems ensures correctness but excludes many natural questions about programs and Turing machines.',
        ],
        realWorld: [
          'Type checking in many programming languages is decidable, guaranteeing that the compiler will always determine whether a program is well-typed.',
          'Equivalence checking of regular expressions (used in firewall rules, routing policies) is decidable, enabling automated verification.',
          'Model checking of finite-state systems is decidable, allowing exhaustive verification of hardware designs and communication protocols.',
        ],
      },
      {
        id: 'halting-problem',
        name: 'The Halting Problem & Undecidability',
        description:
          'The halting problem -- determining whether a TM halts on a given input -- is undecidable, establishing fundamental limits on what algorithms can determine.',
        keyPoints: [
          'The halting language A_TM = {<M, w> | M is a TM and M accepts w} is recognizable but not decidable. No TM can correctly decide membership for all inputs.',
          'Proof by contradiction via diagonalization: assume a decider H(M, w) exists. Construct D(M) that runs H(M, <M>) and does the opposite. Then D(<D>) contradicts itself.',
          'The diagonalization argument is analogous to Cantor\'s proof that the reals are uncountable: it shows the set of TMs (countable) cannot cover all languages (uncountable).',
          'There are uncountably many languages over any alphabet (P(Sigma*) has cardinality 2^aleph_0) but only countably many TMs, so most languages are not even recognizable.',
          'Rice\'s theorem generalizes: any non-trivial semantic property of TMs (any property of L(M) that some TMs have and others don\'t) is undecidable.',
        ],
        tradeoffs: [
          'Undecidability means no algorithm can solve the halting problem in general, but heuristics and partial solutions work well in many practical cases.',
          'Rice\'s theorem is very general but only applies to semantic properties; syntactic properties of TM descriptions may still be decidable.',
        ],
        realWorld: [
          'Software verification tools (static analyzers, linters) are fundamentally limited by undecidability -- they must use approximations that may have false positives or false negatives.',
          'Antivirus software cannot perfectly detect all malicious programs due to undecidability of program behavior analysis (an instance of Rice\'s theorem).',
          'Compiler optimizations like dead code elimination are undecidable in general, so compilers use conservative approximations that may miss some opportunities.',
        ],
      },
      {
        id: 'recognizable-languages',
        name: 'Recognizable vs. Co-Recognizable Languages',
        description:
          'A language is recognizable (recursively enumerable) if some TM accepts all strings in it (but may loop on others), and a language is decidable iff both it and its complement are recognizable.',
        keyPoints: [
          'A TM recognizes L if it accepts every string in L and does not accept strings outside L (it may reject or loop on non-members).',
          'A language is co-recognizable if its complement is recognizable. Equivalently, L is co-recognizable if there is a TM that accepts all strings NOT in L.',
          'Theorem: L is decidable if and only if L is both recognizable and co-recognizable. Proof: run both recognizers in parallel; one must halt on each input.',
          'A_TM is recognizable but not co-recognizable (its complement is not recognizable). The complement of A_TM is not recognizable at all.',
          'The hierarchy is strict: decidable languages are a proper subset of recognizable languages, which are a proper subset of all languages.',
        ],
        tradeoffs: [
          'Recognizable languages allow semi-decision procedures (you can confirm membership but may wait forever for non-membership), which is useful but incomplete.',
          'Parallel simulation of a recognizer and co-recognizer yields a decider, but this requires both to exist, which is not always possible.',
        ],
        realWorld: [
          'Theorem provers are recognizers: they will eventually find a proof if one exists, but may run forever on unprovable statements.',
          'Web search engines are practical semi-decision procedures: they can find matching documents but cannot guarantee they have found all matches across the entire web.',
          'Software testing can find bugs (recognizing buggy programs) but cannot prove their absence (the complement problem), mirroring the recognizable vs. decidable distinction.',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Complexity Classes (P, NP, NP-Complete)',
    part: 4,
    partTitle: 'Computability & Complexity',
    summary:
      'Complexity theory classifies decidable problems by the resources (time, space) required to solve them, with P vs NP being the central open question.',
    concepts: [
      {
        id: 'p-class',
        name: 'The Class P',
        description:
          'P is the class of languages decidable by a deterministic Turing machine in polynomial time, representing problems with efficient algorithms.',
        keyPoints: [
          'TIME(t(n)) is the class of languages decidable by a deterministic TM in O(t(n)) steps. P = union of TIME(n^k) for all k >= 1.',
          'P is robust: the same class results whether we use single-tape TMs, multitape TMs, or RAM machines, because polynomial overhead in simulation preserves polynomial time.',
          'P is often equated with "efficiently solvable" or "tractable" problems. This is the Cobham-Edmonds thesis, an analog of the Church-Turing thesis for efficiency.',
          'Examples of problems in P: sorting, shortest path, primality testing (AKS), linear programming, matching in bipartite graphs, and 2-SAT.',
          'P is closed under union, intersection, complement, concatenation, and Kleene star. It is also closed under polynomial-time reductions.',
        ],
        tradeoffs: [
          'P captures "efficient" computation but the polynomial may have a large degree or constant (O(n^100) is in P but impractical), so membership in P is a necessary but not sufficient condition for practical efficiency.',
          'The machine-independence of P makes it a robust theoretical class, but practical algorithm design must also consider constant factors and lower-order terms.',
        ],
        realWorld: [
          'GPS navigation uses shortest-path algorithms (Dijkstra, A*) that run in polynomial time, enabling real-time route planning on road networks.',
          'Database query evaluation for relational algebra queries runs in polynomial time, making SQL databases efficient for standard operations.',
          'Bipartite matching algorithms in P are used for job assignment, resource allocation, and stable matching in markets and hiring platforms.',
        ],
      },
      {
        id: 'np-class',
        name: 'The Class NP',
        description:
          'NP is the class of languages for which a proposed solution (certificate) can be verified in polynomial time, or equivalently, decidable by a nondeterministic TM in polynomial time.',
        keyPoints: [
          'NP (Nondeterministic Polynomial time) = union of NTIME(n^k) for all k >= 1. Equivalently, L is in NP if there exists a polynomial-time verifier V such that x in L iff there exists certificate c with V(x, c) accepting.',
          'The certificate (witness) has polynomial length. The verifier checks in polynomial time that the certificate is valid proof of membership.',
          'P is a subset of NP (any polynomial-time decider is trivially a verifier). Whether P = NP is the most famous open problem in computer science and mathematics.',
          'Examples of NP problems: SAT (satisfiability), Hamiltonian path, graph coloring, subset sum, traveling salesman (decision version), and integer factoring.',
          'coNP is the class of languages whose complements are in NP. It is unknown whether NP = coNP. If they differ, then P != NP.',
        ],
        tradeoffs: [
          'NP captures problems where solutions are easy to check but may be hard to find, reflecting the asymmetry between verification and search.',
          'Membership in NP does not mean a problem is hard -- it means it is at most as hard as the hardest NP problems. Many NP problems are also in P.',
        ],
        realWorld: [
          'Cryptographic security relies on the assumption that P != NP: factoring and discrete logarithm are in NP, and their presumed hardness secures RSA and Diffie-Hellman.',
          'Sudoku solving is NP-complete (generalized), meaning any Sudoku puzzle solution can be quickly verified, but finding the solution may require significant search.',
          'Protein structure prediction (simplified models) is in NP: given a proposed 3D structure, its energy can be computed in polynomial time.',
        ],
      },
      {
        id: 'np-completeness',
        name: 'NP-Completeness',
        description:
          'NP-complete problems are the hardest problems in NP: every NP problem can be reduced to them in polynomial time, so solving any one efficiently would solve all of NP efficiently.',
        keyPoints: [
          'A language L is NP-hard if every language in NP is polynomial-time reducible to L. L is NP-complete if it is both in NP and NP-hard.',
          'The Cook-Levin theorem proved SAT (Boolean satisfiability) is NP-complete, establishing the first NP-complete problem through a direct simulation argument.',
          'Polynomial-time reduction: A <=_p B means there is a polynomial-time computable function f such that x in A iff f(x) in B. If B in P and A <=_p B, then A in P.',
          'To prove a new problem is NP-complete: (1) show it is in NP (give a polynomial-time verifier), (2) reduce a known NP-complete problem to it in polynomial time.',
          'Classic NP-complete problems include SAT, 3-SAT, CLIQUE, VERTEX-COVER, HAMILTONIAN-PATH, SUBSET-SUM, and 3-COLORING, all interreducible in polynomial time.',
        ],
        tradeoffs: [
          'NP-completeness is strong evidence of intractability (no polynomial algorithm is known for any NP-complete problem), but it does not prove hardness absolutely.',
          'Proving NP-completeness via reduction requires ingenuity in the reduction construction, but it then leverages decades of accumulated hardness evidence.',
        ],
        realWorld: [
          'Scheduling problems (job-shop, course timetabling, airline crew scheduling) are NP-complete, so airlines and universities use heuristic and approximation algorithms.',
          'Circuit layout optimization (VLSI design) involves NP-complete subproblems, motivating the use of simulated annealing and genetic algorithms in chip design.',
          'Network design problems (minimum Steiner tree, maximum flow with integer constraints) are NP-complete, driving the use of approximation algorithms in telecommunications.',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Reductions & Intractability',
    part: 4,
    partTitle: 'Computability & Complexity',
    summary:
      'Reductions are the primary tool for proving both undecidability and computational hardness, transferring known impossibility or difficulty from one problem to another.',
    concepts: [
      {
        id: 'mapping-reductions',
        name: 'Mapping Reductions (Many-One Reductions)',
        description:
          'A mapping reduction from A to B is a computable function that transforms instances of A into instances of B, preserving membership, and is used to transfer undecidability results.',
        keyPoints: [
          'A <=_m B (A is mapping-reducible to B) if there exists a computable function f such that for all w: w in A iff f(w) in B. The function f is called the reduction.',
          'If A <=_m B and B is decidable, then A is decidable. Contrapositive: if A is undecidable and A <=_m B, then B is undecidable.',
          'Similarly for recognizability: if A <=_m B and B is recognizable, then A is recognizable. This transfers non-recognizability as well.',
          'The halting problem (A_TM) reduces to many other problems, proving them undecidable: HALT_TM, E_TM (emptiness), EQ_TM (equivalence), and Rice\'s theorem covers all semantic properties.',
          'Mapping reductions are transitive: if A <=_m B and B <=_m C, then A <=_m C. This allows chaining reductions to propagate undecidability through a sequence of problems.',
        ],
        tradeoffs: [
          'Mapping reductions are simple and widely applicable but cannot capture all relationships between problems (Turing reductions are more general).',
          'The reduction direction matters critically: A <=_m B means "A is no harder than B," so proving B undecidable requires reducing FROM A_TM TO B, not the reverse.',
        ],
        realWorld: [
          'Showing that a new software verification question is undecidable by reducing the halting problem to it demonstrates fundamental limits of automated analysis.',
          'Database query containment for certain query languages is shown undecidable by reducing from the Post correspondence problem or the halting problem.',
          'Security proofs in cryptography use reductions to show that breaking a protocol is at least as hard as solving a believed-hard mathematical problem.',
        ],
      },
      {
        id: 'polynomial-reductions',
        name: 'Polynomial-Time Reductions & NP-Hardness Proofs',
        description:
          'Polynomial-time reductions map instances of one problem to another in polynomial time, enabling proofs that problems are NP-hard by reducing from known NP-complete problems.',
        keyPoints: [
          'A <=_p B (A polynomial-time reduces to B) if there is a polynomial-time computable f with w in A iff f(w) in B. This is the standard reduction for complexity classes.',
          'The reduction f must run in polynomial time AND the output f(w) must be a valid instance of B. Both the construction and correctness of the mapping must be proved.',
          'Common reduction chains: SAT -> 3-SAT -> CLIQUE -> VERTEX-COVER -> SET-COVER; SAT -> 3-SAT -> 3-COLORING; SAT -> 3-SAT -> SUBSET-SUM -> PARTITION -> KNAPSACK.',
          'Gadget construction is a key technique: reduce from 3-SAT by building "gadgets" (substructures in the target problem) that simulate variables, clauses, and their interactions.',
          'Restriction is another technique: if a known NP-complete problem is a special case of the target problem, the target is immediately NP-hard.',
        ],
        tradeoffs: [
          'Polynomial-time reductions preserve tractability (P) and intractability (NP-hardness) but erase finer distinctions within these classes.',
          'Designing correct reductions requires careful construction of the mapping and proof that it preserves both yes-instances and no-instances.',
        ],
        realWorld: [
          'When a new optimization problem arises in industry, proving it NP-hard (via reduction from a known NP-complete problem) justifies investing in heuristic rather than exact solutions.',
          'Cloud computing resource allocation is shown NP-hard by reduction from bin packing, motivating the use of greedy and approximation algorithms.',
          'Bioinformatics sequence alignment problems are classified by reductions from known hard problems, guiding the choice between exact and heuristic algorithms.',
        ],
      },
      {
        id: 'coping-intractability',
        name: 'Coping with Intractability',
        description:
          'When a problem is NP-hard, practical strategies include approximation algorithms, parameterized complexity, heuristics, and identifying tractable special cases.',
        keyPoints: [
          'Approximation algorithms find solutions guaranteed to be within a factor of optimal. For example, the greedy algorithm for vertex cover achieves a 2-approximation in polynomial time.',
          'Parameterized complexity isolates the exponential dependence into a parameter k (e.g., solution size), yielding FPT algorithms with time O(f(k) * n^c) that are efficient when k is small.',
          'Heuristics like simulated annealing, genetic algorithms, and local search often find good solutions in practice without worst-case guarantees.',
          'Special cases may be tractable: 2-SAT is in P while 3-SAT is NP-complete; planar graph coloring with 4 colors is in P while general 3-coloring is NP-complete.',
          'Average-case complexity and smoothed analysis show that many NP-hard problems are easy on "typical" inputs, explaining why algorithms like the simplex method work well in practice despite worst-case exponential behavior.',
        ],
        tradeoffs: [
          'Approximation algorithms guarantee solution quality but may not achieve optimality; the approximation ratio represents a fundamental trade-off between speed and precision.',
          'Heuristics often perform excellently in practice but lack worst-case guarantees, making them unsuitable for safety-critical applications requiring certified solutions.',
        ],
        realWorld: [
          'Delivery route optimization (vehicle routing) is NP-hard, so companies like UPS and FedEx use sophisticated heuristics that save millions in fuel costs annually.',
          'SAT solvers use heuristics (CDCL, unit propagation) that solve industrial SAT instances with millions of variables despite the NP-completeness of SAT.',
          'Genome assembly uses approximation algorithms and heuristics to piece together DNA sequences from short reads, handling an NP-hard optimization problem on massive datasets.',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find((t) => t.id === id);
}
