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
  { id: 1, title: 'Lexical & Syntax Analysis' },
  { id: 2, title: 'Semantic Analysis & IR' },
  { id: 3, title: 'Optimization & Code Generation' },
  { id: 4, title: 'DSL Design & Language Tools' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Lexical & Syntax Analysis (Topics 1-3)
  // ============================================================
  {
    id: 1,
    title: 'Lexical Analysis',
    part: 1,
    partTitle: 'Lexical & Syntax Analysis',
    summary:
      'Lexical analysis (scanning) is the first phase of compilation — it reads raw source characters and groups them into meaningful tokens like identifiers, keywords, literals, and operators, stripping whitespace and comments along the way.',
    concepts: [
      {
        id: 'tokens-and-lexemes',
        name: 'Tokens & Lexemes',
        description:
          'Tokens are the atomic syntactic units of a language (e.g., IF, IDENTIFIER, NUMBER), while lexemes are the actual character sequences in the source code that match a token pattern.',
        keyPoints: [
          'A token has a type (e.g., IDENTIFIER, INTEGER_LITERAL, PLUS) and optionally a value — the lexeme "count" produces token (IDENTIFIER, "count"), while "42" produces (INTEGER_LITERAL, 42)',
          'Keywords like "if", "while", and "return" are typically recognized by first scanning them as identifiers, then checking against a reserved word table to reclassify them as keyword tokens',
          'Whitespace and comments are usually consumed by the lexer but not emitted as tokens — though some languages (Python, Haskell) make indentation significant, requiring the lexer to emit INDENT/DEDENT tokens',
          'Token position tracking (line number, column) is essential for producing meaningful error messages and for source maps in transpiled languages',
        ],
        tradeoffs: [
          'Maximal munch (longest match) simplifies tokenization but can cause surprising behavior — e.g., "x+++++y" being tokenized as "x ++ ++ + y" rather than "x ++ + ++ y"',
          'Reserved words reduce the identifier namespace — languages with many keywords (COBOL, SQL) limit what programmers can name their variables',
        ],
        realWorld: [
          'GCC\'s libcpp lexer',
          'V8 JavaScript scanner',
          'Rust\'s rustc_lexer crate',
        ],
      },
      {
        id: 'regex-and-automata',
        name: 'Regular Expressions & Finite Automata',
        description:
          'Token patterns are formally described using regular expressions, which are equivalent to finite automata — NFAs (nondeterministic) and DFAs (deterministic) that recognize the same regular languages.',
        keyPoints: [
          'Each token type is defined by a regular expression — for example, an identifier might be [a-zA-Z_][a-zA-Z0-9_]* and an integer literal [0-9]+',
          'Thompson\'s construction converts a regular expression into an equivalent NFA with epsilon transitions — each regex operator (concatenation, alternation, Kleene star) maps to a small NFA fragment',
          'Subset construction (powerset construction) converts an NFA into a DFA by treating sets of NFA states as single DFA states — the resulting DFA may have exponentially more states but runs in O(n) time on input of length n',
          'DFA minimization (Hopcroft\'s algorithm) reduces the DFA to its minimal form by merging indistinguishable states, producing the smallest possible automaton that recognizes the same language',
          'The combined lexer DFA merges all token patterns into a single automaton — on each input character the DFA transitions to the next state, and when no further transition exists, the last accepting state determines the token type',
        ],
        tradeoffs: [
          'NFAs are compact (linear in regex size) but slow to simulate directly (exponential worst-case without caching); DFAs are fast (one state transition per character) but can be exponentially larger than the equivalent NFA',
          'Backtracking regex engines (Perl, Python re) support backreferences and lookahead but can exhibit catastrophic backtracking — O(2^n) — on pathological patterns; DFA-based engines (RE2, Rust regex) guarantee linear time but sacrifice some features',
        ],
        realWorld: [
          'RE2 (Google\'s linear-time regex engine)',
          'Flex\'s DFA-based scanner generator',
          'ripgrep\'s Rust regex crate',
        ],
      },
      {
        id: 'lexer-generators-and-handwritten',
        name: 'Lexer Generators & Hand-written Lexers',
        description:
          'Lexers can be automatically generated from token specifications using tools like Flex/Lex, or hand-written as explicit state machines for maximum control over performance and error handling.',
        keyPoints: [
          'Lexer generators (Flex, JFlex, re2c) take a specification of token patterns (regular expressions with actions) and produce an optimized DFA-based scanner — trading development effort for correctness guarantees',
          'Hand-written lexers use explicit switch statements or lookup tables to classify characters and advance through the input — most production compilers (GCC, Clang, Go, Rust, V8) use hand-written lexers for performance and control',
          'Lookahead is sometimes necessary to distinguish tokens — for example, distinguishing "<" (less-than) from "<<" (left-shift) from "<<=" (shift-assign) requires peeking at upcoming characters',
          'Error recovery in lexers typically involves skipping the offending character and continuing from the next position, accumulating multiple lexical errors before aborting',
        ],
        tradeoffs: [
          'Lexer generators guarantee correctness (the generated DFA provably matches the specification) but produce opaque code that is hard to debug and customize; hand-written lexers are more work but give full control over error messages and performance',
          'Generated lexers handle the full regular language class but may be slower than hand-tuned scanners that exploit language-specific patterns — for example, a hand-written lexer can recognize keywords via a perfect hash rather than the DFA\'s state transitions',
        ],
        realWorld: [
          'Flex (C/C++ lexer generator)',
          'ANTLR\'s combined lexer/parser',
          'Go compiler\'s hand-written scanner',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Context-Free Grammars',
    part: 1,
    partTitle: 'Lexical & Syntax Analysis',
    summary:
      'Context-free grammars (CFGs) formally describe the syntactic structure of programming languages — defining how tokens can be combined into valid programs through production rules, derivations, and parse trees.',
    concepts: [
      {
        id: 'cfg-notation-and-derivations',
        name: 'CFG Notation & Derivations',
        description:
          'A context-free grammar consists of terminals (tokens), nonterminals (syntactic categories), production rules, and a start symbol — derivations apply rules to transform the start symbol into a string of terminals.',
        keyPoints: [
          'BNF (Backus-Naur Form) notation writes rules as <nonterminal> ::= sequence of terminals and nonterminals — EBNF extends this with repetition (*,+), optionality (?), and grouping for more concise grammars',
          'A leftmost derivation always expands the leftmost nonterminal first (used by top-down parsers), while a rightmost derivation expands the rightmost nonterminal first (used by bottom-up parsers in reverse)',
          'A parse tree (concrete syntax tree) shows the full derivation structure including all grammar symbols — every internal node is a nonterminal and every leaf is a terminal, capturing the complete syntactic structure',
          'A grammar is ambiguous if some input string has more than one parse tree — classic examples include the dangling else problem ("if a then if b then s1 else s2") and expression grammars without precedence rules',
        ],
        tradeoffs: [
          'More expressive grammar notations (EBNF, ABNF) make specifications easier to read and write, but may hide the underlying complexity and make it less obvious which parser class (LL, LR) the grammar belongs to',
          'Compact grammars with fewer nonterminals are easier to understand but may introduce ambiguity — disambiguating often requires splitting nonterminals and adding more rules, increasing grammar size',
        ],
        realWorld: [
          'ECMAScript specification grammar',
          'Python\'s PEG grammar (CPython 3.9+)',
          'SQL standard BNF grammar',
        ],
      },
      {
        id: 'ambiguity-and-transformations',
        name: 'Ambiguity & Grammar Transformations',
        description:
          'Ambiguous grammars produce multiple parse trees for some inputs — grammar transformations like left factoring and left recursion elimination restructure rules to make them suitable for specific parsing algorithms.',
        keyPoints: [
          'The dangling else ambiguity arises because "if E then if E then S else S" can associate the "else" with either "if" — resolved by grammar restructuring (matched/unmatched statements) or by parser rules (associate else with nearest if)',
          'Left factoring extracts common prefixes from alternatives — transforming "A -> aB | aC" into "A -> aA\', A\' -> B | C" — enabling LL parsers to choose between alternatives after seeing the common prefix',
          'Left recursion elimination converts rules like "E -> E + T | T" into "E -> T E\', E\' -> + T E\' | epsilon" — necessary because recursive descent parsers would infinitely recurse on left-recursive rules',
          'Operator precedence and associativity are encoded in the grammar by introducing nonterminal levels — "expr -> expr + term" (left-associative addition) with "term -> term * factor" (higher-precedence multiplication)',
          'Not all ambiguities can be resolved by grammar transformation — some require semantic analysis or explicit disambiguation rules in the parser specification',
        ],
        tradeoffs: [
          'Eliminating left recursion and left factoring makes grammars suitable for LL parsing but makes them harder to read and maintain — the transformed grammar obscures the original language structure',
          'Using disambiguation rules (precedence declarations in yacc/bison) keeps the grammar readable but moves language specification from the grammar into the parser generator\'s meta-language, making the specification less portable',
        ],
        realWorld: [
          'Bison/Yacc precedence declarations',
          'C\'s typedef ambiguity (lexer hack)',
          'JavaScript\'s automatic semicolon insertion',
        ],
      },
      {
        id: 'grammar-classes',
        name: 'Grammar Classes',
        description:
          'Programming language grammars fall into a hierarchy of classes — LL, LR, LALR — each defining how much context (lookahead) a parser needs and what grammar constructs it can handle.',
        keyPoints: [
          'LL(k) grammars can be parsed top-down using k tokens of lookahead — LL(1) is the most common, requiring that the parser can always decide which production to use by looking at the next token',
          'LR(k) grammars are parsed bottom-up and are strictly more powerful than LL(k) — LR(0) uses no lookahead, SLR(1) uses FOLLOW sets for lookahead, and canonical LR(1) uses the full lookahead item sets',
          'LALR(1) is a practical compromise — it merges LR(1) states with identical cores, producing tables as compact as SLR(1) but nearly as powerful as canonical LR(1), and is the class used by yacc/bison',
          'The hierarchy is: Regular < LL(1) < LALR(1) < LR(1) < Unambiguous CFG < All CFG — each level strictly includes the previous, and most practical programming languages fit within LALR(1)',
        ],
        tradeoffs: [
          'LL grammars are more restrictive (no left recursion, limited lookahead) but produce parsers that are easier to understand, debug, and generate good error messages — ideal for hand-written recursive descent parsers',
          'LR/LALR grammars handle more language constructs (left recursion, more complex syntax) but produce opaque table-driven parsers where debugging shift/reduce or reduce/reduce conflicts requires understanding the parser\'s state machine',
        ],
        realWorld: [
          'ANTLR (LL(*) / ALL(*) parsing)',
          'Bison (LALR(1) parser generator)',
          'Tree-sitter (GLR parsing for editors)',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Parsing Techniques',
    part: 1,
    partTitle: 'Lexical & Syntax Analysis',
    summary:
      'Parsing transforms a flat token stream into a structured tree representation — top-down parsers (recursive descent, LL) build the tree from the root, while bottom-up parsers (LR, LALR) build it from the leaves.',
    concepts: [
      {
        id: 'top-down-parsing',
        name: 'Top-Down Parsing',
        description:
          'Top-down parsers start from the start symbol and try to derive the input string by expanding nonterminals — recursive descent is the most intuitive approach, where each grammar rule becomes a function.',
        keyPoints: [
          'Recursive descent parsers have one function per nonterminal — the function for "expr -> term + term" calls parseTerm(), expects a PLUS token, then calls parseTerm() again, building the AST as it goes',
          'LL(1) parsing requires computing FIRST sets (tokens that can begin a production) and FOLLOW sets (tokens that can appear after a nonterminal) to build a predictive parsing table that determines which production to use',
          'Predictive parsers use the LL(1) table to avoid backtracking entirely — at each step the parser looks at the current nonterminal and the next token, and the table entry specifies exactly which production to apply',
          'Pratt parsing (top-down operator precedence) handles expression parsing elegantly — each token has a binding power, and the parser uses it to decide whether to continue the current expression or return, naturally handling precedence and associativity',
          'Error recovery in recursive descent uses panic mode (skip tokens until a synchronization token like ";" or "}") or error productions (grammar rules that match common mistakes)',
        ],
        tradeoffs: [
          'Recursive descent is easy to write, understand, and debug — but requires grammar transformations (left recursion elimination, left factoring) that can distort the grammar\'s natural structure',
          'LL(1) table-driven parsing is more systematic and handles error recovery uniformly, but is less flexible than hand-written recursive descent which can incorporate arbitrary code and lookahead at decision points',
        ],
        realWorld: [
          'GCC\'s recursive descent C/C++ parser',
          'Rust\'s hand-written recursive descent parser',
          'Pratt parser in Crafting Interpreters (Bob Nystrom)',
        ],
      },
      {
        id: 'bottom-up-parsing',
        name: 'Bottom-Up Parsing',
        description:
          'Bottom-up parsers (shift-reduce) build the parse tree from leaves to root by shifting tokens onto a stack and reducing sequences that match grammar rule right-hand sides, ultimately reducing to the start symbol.',
        keyPoints: [
          'Shift-reduce parsing uses a stack and two operations: "shift" pushes the next input token onto the stack, and "reduce" pops symbols matching a rule\'s right-hand side and pushes the left-hand nonterminal',
          'LR parsing uses a parse table with ACTION (shift/reduce/accept/error for each state-token pair) and GOTO (next state after a reduce for each state-nonterminal pair) entries to drive the shift-reduce automaton',
          'SLR(1) uses FOLLOW sets to determine when to reduce — simpler but may have conflicts on valid grammars; LALR(1) uses more precise lookahead from merging LR(1) item sets, resolving most SLR conflicts',
          'Shift-reduce conflicts occur when the parser cannot decide whether to shift (read more input) or reduce (apply a rule) — typically resolved by precedence and associativity declarations in the parser specification',
          'Reduce-reduce conflicts are more serious — they occur when the parser cannot decide which of two rules to reduce by, and usually indicate a genuine grammar ambiguity that must be resolved by restructuring the grammar',
        ],
        tradeoffs: [
          'Bottom-up parsers handle a larger class of grammars than top-down (including left recursion and more complex syntax), but produce parsers that are harder to debug — the state machine is opaque and error messages are less intuitive',
          'Parser generators (yacc/bison) automate LR table construction, but debugging shift-reduce conflicts requires understanding the parser\'s item sets and state transitions, which is notoriously difficult',
        ],
        realWorld: [
          'Yacc/Bison (LALR(1) parser generators)',
          'PostgreSQL\'s SQL parser (bison-generated)',
          'Ruby\'s parser (bison-generated LALR)',
        ],
      },
      {
        id: 'parser-combinators-and-peg',
        name: 'Parser Combinators & PEG',
        description:
          'Parser combinators are higher-order functions that compose small parsers into larger ones, while PEGs (Parsing Expression Grammars) use ordered choice to eliminate ambiguity — both offer alternatives to traditional parser generators.',
        keyPoints: [
          'Parser combinators model parsers as first-class values that can be combined with operators like sequence (>>), alternative (|), repetition (many), and map — building complex parsers from simple primitives like "parseChar" or "parseString"',
          'Monadic parser combinators thread state (remaining input, position) through the parser chain — enabling sequential composition where each parser consumes some input and passes the rest to the next parser',
          'PEGs (Parsing Expression Grammars) replace CFG\'s unordered choice (A | B) with ordered choice (A / B) — the parser tries A first, and only tries B if A fails, eliminating ambiguity by construction',
          'Packrat parsing memoizes all intermediate parse results, guaranteeing O(n) parsing time for any PEG at the cost of O(n) memory — without memoization, PEG parsing can be exponential due to backtracking',
          'PEGs can express some context-sensitive constructs (like matching a^n b^n c^n) that CFGs cannot, but cannot express all CFGs — they are incomparable rather than strictly more or less powerful',
        ],
        tradeoffs: [
          'Parser combinators produce highly readable, modular parsers that are easy to extend and test individually — but may suffer from poor error messages (backtracking obscures the actual failure point) and performance overhead from closures and allocations',
          'PEGs eliminate ambiguity but make it easy to accidentally shadow alternatives — if A in "A / B" consumes a prefix that prevents B from matching, B is silently unreachable, and this can be hard to detect',
        ],
        realWorld: [
          'Haskell\'s Parsec / Megaparsec libraries',
          'Rust\'s nom parser combinator crate',
          'CPython 3.9+ PEG parser (pegen)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Semantic Analysis & IR (Topics 4-6)
  // ============================================================
  {
    id: 4,
    title: 'Abstract Syntax Trees',
    part: 2,
    partTitle: 'Semantic Analysis & IR',
    summary:
      'Abstract syntax trees (ASTs) are the central data structure in most compilers — they capture the hierarchical structure of source code without syntactic sugar, serving as the foundation for analysis, transformation, and code generation.',
    concepts: [
      {
        id: 'ast-design-and-construction',
        name: 'AST Design & Construction',
        description:
          'An AST represents the essential syntactic structure of source code, discarding tokens like parentheses and semicolons that guided parsing but carry no semantic meaning.',
        keyPoints: [
          'Concrete syntax trees (CSTs/parse trees) include every grammar symbol — parentheses, commas, semicolons — while ASTs keep only semantically meaningful nodes like expressions, statements, and declarations',
          'AST node types typically form a sealed hierarchy — an Expression node might have subtypes BinaryExpr, UnaryExpr, CallExpr, Literal, Identifier — enabling exhaustive pattern matching and the visitor pattern',
          'The visitor pattern separates AST node structure from operations on nodes — each pass (type checking, optimization, code generation) implements a visitor that traverses the tree without modifying the node classes',
          'AST nodes typically carry metadata including source location (file, line, column), type annotations (filled in during type checking), and scope references for name resolution',
          'Arena allocation (allocating all AST nodes in a contiguous memory block) improves cache locality and simplifies memory management — the entire AST is freed at once when compilation finishes',
        ],
        tradeoffs: [
          'Rich AST nodes with many fields are expressive but consume more memory and are harder to pattern-match; minimal nodes with separate annotation tables (side tables) are leaner but require more indirection',
          'Mutable ASTs allow in-place transformation (faster, less memory) but make it harder to reason about pass ordering and debugging; immutable ASTs (persistent data structures) are safer but require more allocations',
        ],
        realWorld: [
          'Babel\'s JavaScript AST (ESTree specification)',
          'Roslyn (C#/VB.NET compiler) syntax trees',
          'clang\'s AST with rich source location tracking',
        ],
      },
      {
        id: 'ast-transformations',
        name: 'AST Transformations',
        description:
          'AST transformations rewrite the tree to simplify, optimize, or translate code — from desugaring syntactic sugar to source-to-source compilation between languages.',
        keyPoints: [
          'Desugaring transforms high-level syntax into simpler forms using existing constructs — for-in loops become while loops with iterators, optional chaining (?.) becomes conditional expressions, and async/await becomes state machines',
          'Tree rewriting applies pattern-matching rules to replace subtrees — e.g., constant folding replaces "3 + 4" with "7", dead code elimination removes "if (false) { ... }", and algebraic simplification replaces "x * 1" with "x"',
          'Lowering passes transform high-level AST constructs into lower-level ones closer to the target — e.g., lowering class declarations into prototype assignments, or lowering match expressions into chains of if-else',
          'Source-to-source transformation (transpilation) maps the AST of one language to the AST of another — TypeScript to JavaScript, JSX to React.createElement calls, or Kotlin to JVM bytecode via a Java-like IR',
        ],
        tradeoffs: [
          'Early desugaring (before type checking) simplifies the type checker but loses the original source structure, making error messages refer to desugared code; late desugaring preserves source fidelity but complicates analysis passes',
          'Macro-based transformations (Rust macros, Lisp macros) are extremely powerful but can produce hard-to-debug code — errors in expanded code may not correspond to the original macro invocation',
        ],
        realWorld: [
          'TypeScript compiler\'s emit phase',
          'Babel plugins for JavaScript transformation',
          'Rust\'s macro expansion phase',
        ],
      },
      {
        id: 'syntax-directed-translation',
        name: 'Syntax-Directed Translation',
        description:
          'Syntax-directed translation attaches semantic actions to grammar productions — using attribute grammars to compute values (types, code, etc.) as the parse tree is built, bridging syntax and semantics.',
        keyPoints: [
          'Synthesized attributes flow upward in the parse tree — a child node computes a value (e.g., the type of a subexpression) and passes it to its parent, enabling bottom-up evaluation like calculating expression values',
          'Inherited attributes flow downward — a parent passes context (e.g., expected type, scope information) to its children, enabling top-down information propagation like passing variable declarations into nested scopes',
          'S-attributed grammars (synthesized only) can be evaluated in a single bottom-up pass, making them efficient and compatible with LR parsing — most expression evaluation fits this pattern',
          'L-attributed grammars allow inherited attributes that depend only on left siblings and the parent — they can be evaluated in a single left-to-right pass and are compatible with LL parsing',
        ],
        tradeoffs: [
          'Embedding semantic actions directly in grammar rules (as in yacc) keeps the grammar and semantics together but tightly couples parsing and analysis — changing one requires changing the other',
          'Separating the grammar from semantic analysis (building an AST first, then running analysis passes) is more modular and testable but requires additional memory for the tree and multiple traversals',
        ],
        realWorld: [
          'Yacc/Bison embedded actions ($$ = $1 + $3)',
          'ANTLR listener and visitor patterns',
          'Attribute grammars in JastAdd (Java compiler framework)',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Type Systems & Type Checking',
    part: 2,
    partTitle: 'Semantic Analysis & IR',
    summary:
      'Type systems assign types to program expressions and check that operations are applied to compatible operands — catching errors at compile time that would otherwise manifest as runtime crashes or silent data corruption.',
    concepts: [
      {
        id: 'static-type-checking',
        name: 'Static Type Checking',
        description:
          'Static type checking verifies at compile time that every expression, variable, and function is used in a type-consistent manner, catching mismatches before the program runs.',
        keyPoints: [
          'Type rules specify how to compute the type of each expression form — e.g., "if e1 has type int and e2 has type int, then e1 + e2 has type int" — the type checker applies these rules recursively over the AST',
          'A type environment (symbol table/context) maps variable names to their declared types — the type checker looks up identifiers and verifies they are used consistently with their declared types throughout their scope',
          'Bidirectional type checking combines top-down "checking" (propagating an expected type into an expression) with bottom-up "synthesis" (inferring a type from an expression) — reducing the need for explicit type annotations',
          'Subtype checking (is type A a subtype of type B?) enables polymorphism — structural subtyping checks shape compatibility (TypeScript), while nominal subtyping checks declared relationships (Java, C#)',
          'Type checking function calls verifies that argument types match parameter types, the correct number of arguments is provided, and the return type is used consistently — this is where most type errors are caught',
        ],
        tradeoffs: [
          'Strict type systems catch more errors at compile time but require more annotations and may reject valid programs — the expressiveness-safety tradeoff is fundamental to type system design',
          'Structural typing is more flexible (any object with the right shape matches) but makes it harder to enforce semantic intent — nominal typing is more restrictive but prevents accidental type compatibility',
        ],
        realWorld: [
          'TypeScript\'s structural type system',
          'Java\'s nominal type system',
          'Rust\'s ownership-based type system',
        ],
      },
      {
        id: 'type-inference',
        name: 'Type Inference',
        description:
          'Type inference automatically deduces types from how values are used, eliminating the need for explicit annotations while maintaining the safety guarantees of static typing.',
        keyPoints: [
          'Hindley-Milner type inference (used in ML, Haskell, and adapted in Rust) can infer the most general (principal) type for any expression without any type annotations — it finds the type that works for all possible uses',
          'Algorithm W performs type inference by generating type constraints from the program and solving them via unification — when two types must be equal, unification finds a substitution that makes them identical',
          'Unification works by decomposing type equations: unifying "List<A>" with "List<Int>" yields A = Int; unifying "A -> B" with "Int -> String" yields A = Int, B = String; unifying "Int" with "String" fails with a type error',
          'Let-polymorphism (generalization) allows a let-bound function to be used at multiple types — the inferred type is generalized by universally quantifying over free type variables, giving "id" the type "forall a. a -> a"',
          'Type inference has limits — it struggles with higher-rank polymorphism (passing polymorphic functions as arguments), overloaded functions, and subtyping, often requiring annotations in these cases',
        ],
        tradeoffs: [
          'Full type inference (no annotations needed) makes code concise but can produce confusing error messages far from the actual mistake — when unification fails, the reported location may not be where the programmer made the error',
          'Local type inference (inferring within expressions but requiring function signatures) balances conciseness with readability — TypeScript, Kotlin, and Rust use this approach to keep function boundaries explicit',
        ],
        realWorld: [
          'Haskell\'s Hindley-Milner with extensions',
          'Rust\'s local type inference',
          'TypeScript\'s control-flow narrowing',
        ],
      },
      {
        id: 'advanced-type-features',
        name: 'Advanced Type Features',
        description:
          'Modern type systems go beyond simple type checking with features like generics, variance annotations, dependent types, and gradual typing — enabling more expressive and safer programs.',
        keyPoints: [
          'Generics (parametric polymorphism) allow types and functions to be parameterized over type variables — List<T>, Map<K, V> — enabling code reuse without sacrificing type safety',
          'Variance controls how subtyping interacts with generic types: covariant (List<Cat> is a subtype of List<Animal>), contravariant (Consumer<Animal> is a subtype of Consumer<Cat>), and invariant (neither direction)',
          'Dependent types allow types to depend on values — e.g., Vector<n> where n is a natural number, ensuring at compile time that you cannot index past the end of a vector; used in Idris, Agda, and partially in TypeScript\'s literal types',
          'Gradual typing allows mixing typed and untyped code in the same program — untyped code uses a dynamic "any" type that is compatible with everything, enabling incremental migration from dynamic to static typing',
          'Effect systems track computational effects (I/O, exceptions, mutation) in the type system — enabling the compiler to verify that pure functions don\'t perform side effects, as in Haskell\'s IO monad or Koka\'s effect types',
        ],
        tradeoffs: [
          'More expressive type features increase safety and catch more bugs but add complexity to the language and the learning curve — developers must understand variance, higher-kinded types, or dependent type theory',
          'Gradual typing provides migration flexibility but weakens guarantees — the boundary between typed and untyped code requires runtime checks, and "any" types can silently propagate type errors',
        ],
        realWorld: [
          'Java/C# generics with variance',
          'TypeScript\'s gradual/structural type system',
          'Idris dependent types',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Intermediate Representations',
    part: 2,
    partTitle: 'Semantic Analysis & IR',
    summary:
      'Intermediate representations (IRs) bridge the gap between source language and target machine code — providing a platform-independent form suitable for analysis and optimization, separating the front-end from the back-end.',
    concepts: [
      {
        id: 'three-address-code-and-ssa',
        name: 'Three-Address Code & SSA',
        description:
          'Three-address code (TAC) uses instructions with at most one operator and three operands (two sources and one destination), while SSA (Static Single Assignment) form ensures every variable is assigned exactly once.',
        keyPoints: [
          'TAC instructions have the form "x = y op z" — complex expressions are broken into sequences of simple operations using temporary variables, making it easy to rearrange and optimize individual instructions',
          'SSA form renames variables so each name is assigned exactly once — "x = 1; x = x + 1" becomes "x1 = 1; x2 = x1 + 1" — making data flow explicit and enabling powerful optimizations',
          'Phi functions (phi nodes) are inserted at control flow merge points to select between reaching definitions — "x3 = phi(x1, x2)" means x3 gets the value of x1 or x2 depending on which branch was taken',
          'Dominance frontiers determine where phi functions must be inserted — a node D dominates node N if every path from the entry to N passes through D, and the dominance frontier of D is the set of nodes just past D\'s dominance boundary',
          'SSA simplifies many optimizations: constant propagation (replace x = 5; y = x + 1 with y = 6), dead code elimination (if no use of x2, remove it), and global value numbering (detect redundant computations)',
        ],
        tradeoffs: [
          'SSA makes optimization simpler and more powerful (each variable has one definition, so use-def chains are trivial) but adds complexity from phi functions and requires SSA construction/destruction passes',
          'TAC is simpler to generate from the AST and closer to machine code, but lacks SSA\'s explicit data-flow information — optimizations on TAC require separate reaching-definitions analysis',
        ],
        realWorld: [
          'LLVM IR (SSA-based)',
          'GCC\'s GIMPLE (SSA form)',
          'Java HotSpot\'s SSA-based IR (C2 compiler)',
        ],
      },
      {
        id: 'control-flow-graphs',
        name: 'Control Flow Graphs',
        description:
          'A control flow graph (CFG) represents the possible execution paths through a function, with basic blocks as nodes and jumps/branches as edges — serving as the foundation for data flow analysis and optimization.',
        keyPoints: [
          'A basic block is a maximal sequence of instructions with one entry point (the first instruction) and one exit point (the last instruction) — execution enters at the top and exits at the bottom without any branches or jump targets in between',
          'CFG construction identifies basic block boundaries: the first instruction, any instruction that is a branch target, and any instruction immediately following a branch — then connects blocks with edges for fall-through and branch targets',
          'A dominator tree captures the dominance relationship — node A dominates node B if every path from the entry block to B must pass through A; the immediate dominator is the closest dominator, forming a tree rooted at the entry block',
          'Post-dominators are the dual of dominators — node A post-dominates B if every path from B to the exit block passes through A; useful for determining which computations are always needed regardless of control flow',
          'Loop detection uses dominance: a back edge goes from a node to one of its dominators, and the natural loop of a back edge is the set of nodes from which the loop header (dominator) can be reached without going through the back edge',
        ],
        tradeoffs: [
          'Reducible CFGs (no irreducible loops from gotos) are easier to analyze and optimize — most structured languages produce reducible CFGs, but unstructured goto can create irreducible graphs that complicate loop optimization',
          'Fine-grained basic blocks (few instructions each) simplify analysis but increase the number of edges and nodes; coarse blocks are more cache-friendly but may mix code with different properties',
        ],
        realWorld: [
          'LLVM\'s BasicBlock and Function classes',
          'GCC\'s CFG in GIMPLE/RTL',
          'V8 TurboFan\'s sea-of-nodes graph',
        ],
      },
      {
        id: 'ir-design-choices',
        name: 'IR Design Choices',
        description:
          'Compilers choose between high-level IRs (close to the source language), low-level IRs (close to machine code), and multi-level IRs — each level suited to different kinds of analysis and transformation.',
        keyPoints: [
          'High-level IRs preserve source-level constructs (loops, arrays, objects) enabling optimizations like loop interchange and vectorization — but are harder to map directly to machine instructions',
          'Low-level IRs resemble machine code with explicit registers, memory operations, and control flow — good for instruction selection and register allocation but too late for high-level transformations',
          'Multi-level IR designs (like MLIR) define a hierarchy of dialects from source-level to machine-level, with explicit lowering between levels — allowing each optimization to work at the appropriate abstraction level',
          'The sea-of-nodes IR (used in V8\'s TurboFan, Java HotSpot C2) merges the CFG and data-flow graph into a single graph where nodes represent operations and edges represent both data dependencies and control dependencies',
          'Graph-based IRs (SSA + CFG, sea-of-nodes) enable more flexible scheduling than linear IRs (TAC) because operations are constrained only by their dependencies, not by a fixed ordering',
        ],
        tradeoffs: [
          'A single IR level is simpler to implement but forces compromises — high-level optimizations need source-level constructs while code generation needs low-level details; multi-level IRs address this but add implementation complexity',
          'Sea-of-nodes is extremely flexible and enables powerful optimizations (GVN, redundancy elimination) but is significantly harder to implement, debug, and understand than traditional CFG-based IRs',
        ],
        realWorld: [
          'LLVM IR (low-level SSA)',
          'MLIR (Multi-Level IR framework)',
          'GraalVM\'s sea-of-nodes IR',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Optimization & Code Generation (Topics 7-9)
  // ============================================================
  {
    id: 7,
    title: 'Optimization Passes',
    part: 3,
    partTitle: 'Optimization & Code Generation',
    summary:
      'Optimization passes transform the IR to produce faster, smaller, or more efficient code — from simple local improvements within basic blocks to sophisticated global and interprocedural analyses across entire programs.',
    concepts: [
      {
        id: 'local-and-peephole-optimization',
        name: 'Local & Peephole Optimization',
        description:
          'Local optimizations work within a single basic block, while peephole optimization examines small windows of instructions to replace inefficient patterns with better ones.',
        keyPoints: [
          'Constant folding evaluates expressions with known constant operands at compile time — replacing "3 * 4 + 1" with "13" eliminates runtime computation without any behavioral change',
          'Dead code elimination removes instructions whose results are never used — in SSA form this is trivial: if a variable has no uses, its definition can be deleted (and recursively, its operands may become dead too)',
          'Strength reduction replaces expensive operations with cheaper equivalents — multiplication by a power of 2 becomes a left shift, division by a constant becomes multiplication by its reciprocal, and modulo by a power of 2 becomes a bitwise AND',
          'Peephole optimization scans a sliding window of 2-3 instructions looking for known inefficient patterns — e.g., "store x; load x" can be eliminated, "jump to next instruction" can be removed, "x = x + 0" can be deleted',
          'Algebraic simplification applies mathematical identities — x + 0 = x, x * 1 = x, x - x = 0, !!x = x — to simplify expressions throughout the program',
        ],
        tradeoffs: [
          'Local optimizations are safe and fast (no data flow analysis needed) but limited in scope — they miss opportunities that span multiple basic blocks, like a constant defined in one block and used in another',
          'Peephole optimization is simple to implement with pattern rules but may miss larger optimization opportunities that require understanding the broader context of the computation',
        ],
        realWorld: [
          'GCC\'s combine pass (peephole)',
          'LLVM\'s InstCombine pass',
          'V8\'s simplified lowering phase',
        ],
      },
      {
        id: 'global-and-loop-optimization',
        name: 'Global & Loop Optimization',
        description:
          'Global optimizations analyze entire functions using data flow analysis, while loop optimizations target the most performance-critical code regions since programs spend most execution time in loops.',
        keyPoints: [
          'Common subexpression elimination (CSE) identifies expressions computed multiple times with the same operands and replaces redundant computations with a single computation — "a = b + c; d = b + c" becomes "t = b + c; a = t; d = t"',
          'Loop-invariant code motion (LICM) moves computations that produce the same result in every loop iteration to before the loop — if "x = a + b" is inside a loop but a and b don\'t change, it\'s computed once before the loop instead of N times',
          'Induction variable elimination simplifies loop counter arithmetic — if a loop increments both "i" and "p = base + 4*i", the compiler can increment p directly by 4 each iteration, eliminating the multiplication and the variable i',
          'Loop unrolling replicates the loop body multiple times to reduce branch overhead and enable instruction-level parallelism — a loop that runs 100 times might be unrolled 4x, executing 25 iterations of 4 copies of the body',
          'Data flow analysis frameworks (reaching definitions, live variables, available expressions) propagate information through the CFG to determine properties at each program point, enabling the above optimizations',
        ],
        tradeoffs: [
          'Loop unrolling reduces branch overhead and enables ILP but increases code size, which can hurt instruction cache performance — the optimal unroll factor depends on the loop body size and the cache hierarchy',
          'Aggressive LICM can increase register pressure (more values live simultaneously) potentially causing extra spills to memory — sometimes it\'s better to recompute a value inside the loop than to spill a register',
        ],
        realWorld: [
          'LLVM\'s LICM and GVN passes',
          'GCC\'s loop optimization framework',
          'Intel ICC\'s aggressive loop transformations',
        ],
      },
      {
        id: 'interprocedural-optimization',
        name: 'Interprocedural Optimization',
        description:
          'Interprocedural optimizations analyze and transform across function boundaries — from inlining function bodies to whole-program analysis that eliminates virtual dispatch and unused code.',
        keyPoints: [
          'Function inlining replaces a function call with the function\'s body (with parameters substituted) — eliminating call overhead and enabling further optimizations in the combined code, like constant propagation through parameters',
          'Devirtualization resolves virtual/dynamic method calls to direct calls when the actual type is known — class hierarchy analysis (CHA) determines that if no subclass overrides a method, the virtual call can be replaced with a direct call',
          'Escape analysis determines whether an object allocated inside a function "escapes" (is accessible outside the function) — non-escaping objects can be stack-allocated instead of heap-allocated, and their locks can be eliminated',
          'Link-time optimization (LTO) defers optimization until link time, when the entire program is available — enabling cross-module inlining, dead function elimination, and interprocedural constant propagation across translation units',
          'Thin LTO is a scalable alternative that performs most optimizations within modules but uses a summary of cross-module information for inlining and import decisions, achieving most of LTO\'s benefits with better compile times',
        ],
        tradeoffs: [
          'Aggressive inlining improves runtime performance but increases code size and compile time exponentially — inlining everything would duplicate the entire program; heuristics balance call frequency, function size, and expected benefit',
          'Whole-program analysis (LTO) produces the best optimization but requires all source to be available, increases link time dramatically, and makes incremental compilation impossible — Thin LTO is a practical compromise',
        ],
        realWorld: [
          'LLVM ThinLTO',
          'GCC LTO and IPA passes',
          'JVM HotSpot\'s aggressive inlining and escape analysis',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Register Allocation & Code Generation',
    part: 3,
    partTitle: 'Optimization & Code Generation',
    summary:
      'Code generation maps the IR to target machine instructions, with register allocation as the critical bottleneck — assigning the program\'s many variables to the machine\'s limited registers while minimizing costly memory spills.',
    concepts: [
      {
        id: 'register-allocation',
        name: 'Register Allocation',
        description:
          'Register allocation assigns program variables to hardware registers, using graph coloring or linear scan algorithms to minimize the number of variables spilled to memory.',
        keyPoints: [
          'The interference graph has variables as nodes and edges between variables that are simultaneously live — two interfering variables cannot share a register, so register allocation is equivalent to graph coloring with K colors (K = number of registers)',
          'Graph coloring register allocation uses Chaitin\'s algorithm: simplify (remove nodes with degree < K), select (assign colors in reverse removal order), and spill (if a node can\'t be colored, spill it to memory and rebuild)',
          'Linear scan register allocation processes variables in order of their live intervals — faster than graph coloring (O(n) vs NP-hard) with slightly worse results; used by JIT compilers (HotSpot, V8) where compile time matters',
          'Spilling inserts load instructions before each use and store instructions after each definition of a spilled variable — the cost of spilling depends on how frequently the variable is accessed (hot loops are expensive to spill)',
          'Register coalescing merges variables connected by move instructions into the same register — eliminating the move entirely; this is integrated into graph coloring by first attempting to merge nodes that don\'t interfere',
        ],
        tradeoffs: [
          'Graph coloring produces better register assignments but is computationally expensive (the underlying problem is NP-hard) and requires building the full interference graph — suitable for ahead-of-time compilers but too slow for JIT',
          'Linear scan is fast enough for JIT compilation (V8, HotSpot C1) but may spill variables that graph coloring would keep in registers — the tradeoff is compilation speed vs generated code quality',
        ],
        realWorld: [
          'LLVM\'s greedy register allocator',
          'GCC\'s IRA (integrated register allocator)',
          'V8 TurboFan\'s linear scan allocator',
        ],
      },
      {
        id: 'instruction-selection',
        name: 'Instruction Selection',
        description:
          'Instruction selection maps IR operations to target machine instructions — finding the best sequence of native instructions to implement each IR construct, exploiting complex instructions and addressing modes.',
        keyPoints: [
          'Tree pattern matching tiles the expression tree with machine instruction patterns — each IR subtree is matched against a library of instruction templates, and the tiling that minimizes total cost (cycles, code size) is selected',
          'BURG-style (Bottom-Up Rewrite Grammar) code generators use dynamic programming to find the optimal tiling in O(n) time — each subtree is annotated with the cheapest instruction that can produce its result in each possible register class',
          'Complex instructions (CISC) like x86\'s LEA (load effective address) can compute "base + index * scale + displacement" in one instruction — instruction selection must recognize these patterns in the IR to exploit them',
          'Addressing mode selection determines how memory operands are accessed — register indirect, base+offset, base+index*scale — and interacts with instruction selection because some instructions support complex addressing modes',
          'Target-specific lowering handles IR operations that don\'t map directly to single instructions — e.g., 64-bit arithmetic on 32-bit targets is lowered to pairs of 32-bit operations with carry propagation',
        ],
        tradeoffs: [
          'Optimal instruction selection via dynamic programming produces the best code but requires implementing a pattern matcher for every target architecture; hand-written lowering is simpler but may miss optimization opportunities',
          'Using complex instructions reduces instruction count but may not reduce execution time — modern superscalar processors can execute multiple simple instructions in parallel, sometimes making them faster than a single complex instruction',
        ],
        realWorld: [
          'LLVM\'s SelectionDAG and GlobalISel',
          'GCC\'s RTL pattern matching',
          'Cranelift\'s ISLE DSL for instruction selection',
        ],
      },
      {
        id: 'code-scheduling',
        name: 'Code Scheduling',
        description:
          'Instruction scheduling reorders instructions to maximize throughput by keeping functional units busy and avoiding pipeline stalls from data dependencies, branch mispredictions, and cache misses.',
        keyPoints: [
          'Instruction scheduling reorders instructions within a basic block to minimize pipeline stalls — if instruction B depends on A\'s result (has data dependency), scheduling independent instruction C between them lets A\'s result arrive before B needs it',
          'Pipeline hazards occur when sequential instructions conflict: data hazards (RAW — read after write), structural hazards (two instructions need the same functional unit), and control hazards (branches disrupting the pipeline)',
          'List scheduling is the most common algorithm — it builds a dependency DAG, assigns priorities (critical path length, register pressure), and greedily schedules the highest-priority ready instruction each cycle',
          'Software pipelining overlaps iterations of a loop so that different stages of consecutive iterations execute simultaneously — like a hardware pipeline, it fills the pipeline with instructions from multiple iterations',
          'Phase ordering between register allocation and scheduling creates a dilemma: scheduling before register allocation can use unlimited virtual registers but may increase register pressure; scheduling after may be constrained by register assignments',
        ],
        tradeoffs: [
          'Aggressive scheduling improves throughput on in-order processors (where stalls directly reduce performance) but provides less benefit on out-of-order processors that dynamically reorder instructions in hardware',
          'Software pipelining achieves near-optimal throughput for loops but increases code complexity significantly (prologue/epilogue, increased register pressure) and only applies to loops with regular data access patterns',
        ],
        realWorld: [
          'LLVM\'s MachineScheduler pass',
          'GCC\'s instruction scheduling passes',
          'Intel compiler\'s software pipelining for Itanium',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Runtime Systems',
    part: 3,
    partTitle: 'Optimization & Code Generation',
    summary:
      'Runtime systems provide the execution environment for compiled programs — managing memory through garbage collection, implementing function calling conventions, and enabling just-in-time compilation for dynamic optimization.',
    concepts: [
      {
        id: 'memory-management-and-gc',
        name: 'Memory Management & GC',
        description:
          'Garbage collection automatically reclaims memory that is no longer reachable from the program, freeing developers from manual deallocation but introducing pauses and overhead.',
        keyPoints: [
          'Mark-and-sweep traverses all reachable objects starting from roots (stack variables, globals), marks them as live, then sweeps through all allocated objects freeing unmarked ones — simple but causes long pauses proportional to heap size',
          'Generational GC exploits the generational hypothesis (most objects die young) by partitioning the heap into young and old generations — collecting the small young generation frequently and the large old generation rarely, reducing average pause times',
          'Reference counting increments a counter when a reference is created and decrements when destroyed, freeing objects when the count reaches zero — no pauses but cannot handle reference cycles (A -> B -> A) without a supplemental cycle detector',
          'Tracing collectors (mark-sweep, generational, concurrent) find garbage by tracing from roots; non-tracing (reference counting, region-based) manage memory locally — tracing handles cycles but needs pauses; refcounting is incremental but leaks cycles',
          'Concurrent and incremental collectors (G1, ZGC, Shenandoah) minimize pause times by performing GC work concurrently with the application, using read/write barriers to maintain correctness as the mutator modifies the heap during collection',
        ],
        tradeoffs: [
          'Throughput vs latency: stop-the-world collectors maximize throughput (all CPU time goes to either mutator or GC) but cause long pauses; concurrent collectors reduce pauses but consume CPU time running GC alongside the application',
          'Memory overhead: generational GC requires write barriers (tracking references from old to young generation) and wastes space on survivor areas; compacting collectors require additional memory for object relocation',
        ],
        realWorld: [
          'JVM\'s G1 and ZGC collectors',
          'Go\'s concurrent tri-color mark-sweep',
          'Python\'s reference counting with cycle detector',
        ],
      },
      {
        id: 'call-conventions-and-stack-frames',
        name: 'Call Conventions & Stack Frames',
        description:
          'Calling conventions define how functions receive parameters, return values, and manage the stack — enabling interoperability between different languages, compilers, and libraries on the same platform.',
        keyPoints: [
          'Calling conventions specify which registers hold arguments (e.g., x86-64 System V uses RDI, RSI, RDX, RCX, R8, R9 for integers), which registers are caller-saved vs callee-saved, and where the return value goes (RAX for integers)',
          'Stack frames contain the return address, saved registers, local variables, and space for arguments that don\'t fit in registers — the frame pointer (RBP) provides a stable reference for accessing locals and parameters',
          'Register saving divides responsibility: caller-saved registers (volatile) must be saved by the calling function before the call if their values are needed later; callee-saved registers (non-volatile) must be saved by the called function if it uses them',
          'Variadic functions (like printf) pass arguments in a standardized way — on x86-64, the caller sets AL to the number of vector register arguments, and the callee saves all possible argument registers to the stack to enable va_arg access',
          'Tail call optimization reuses the caller\'s stack frame when a function\'s last action is a function call — converting recursion to iteration and preventing stack overflow on deeply recursive functions',
        ],
        tradeoffs: [
          'Passing more arguments in registers (faster access) reduces the number of registers available for computation within the function — the convention must balance call performance against local register pressure',
          'Frame pointer omission (using RSP-relative addressing instead of RBP) frees one register for computation but makes stack unwinding for debugging and profiling more complex, requiring unwind tables (DWARF .eh_frame)',
        ],
        realWorld: [
          'x86-64 System V ABI (Linux/macOS)',
          'Microsoft x64 calling convention (Windows)',
          'ARM64 AAPCS calling convention',
        ],
      },
      {
        id: 'jit-compilation',
        name: 'JIT Compilation',
        description:
          'Just-in-time compilation compiles code to native machine instructions at runtime, using profiling information to optimize hot paths — achieving performance close to ahead-of-time compiled code for dynamic languages.',
        keyPoints: [
          'Method JIT compiles entire functions to native code when they are called frequently (hot) — the runtime maintains a call counter and triggers compilation when the count exceeds a threshold, replacing the interpreted version with compiled code',
          'Tracing JIT records the actual execution path through a hot loop (the trace), compiles that specific path to native code with guards that check assumptions, and falls back to the interpreter if a guard fails (side exit)',
          'Tiered compilation uses multiple compilation levels — the interpreter (fast startup), a baseline compiler (quick compilation, moderate code quality), and an optimizing compiler (slow compilation, best code quality) — promoting hot code to higher tiers progressively',
          'Deoptimization allows the runtime to undo optimistic assumptions when they become invalid — if a JIT-compiled function assumed a variable was always an integer but it receives a string, the compiled code is discarded and execution reverts to the interpreter with the correct state',
          'On-stack replacement (OSR) replaces a running function\'s stack frame mid-execution — used to transition from interpreted to compiled code in the middle of a long-running loop without waiting for the function to return and be re-entered',
        ],
        tradeoffs: [
          'JIT compilation trades startup time for peak performance — the overhead of profiling and compilation means the program runs slower initially but eventually faster than an interpreter, with the crossover depending on how long the program runs',
          'Speculative optimizations (type specialization, monomorphic inline caches) produce fast code for common cases but require guard checks and deoptimization support, adding complexity and potential performance cliffs when speculation fails',
        ],
        realWorld: [
          'V8 (Ignition interpreter + TurboFan JIT)',
          'JVM HotSpot (C1 baseline + C2 optimizing + Graal)',
          'LuaJIT (tracing JIT compiler)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: DSL Design & Language Tools (Topics 10-13)
  // ============================================================
  {
    id: 10,
    title: 'Internal DSLs',
    part: 4,
    partTitle: 'DSL Design & Language Tools',
    summary:
      'Internal (embedded) DSLs are built within a host programming language, using its syntax and semantics — leveraging method chaining, operator overloading, and metaprogramming to create domain-specific abstractions without building a new parser.',
    concepts: [
      {
        id: 'fluent-apis-and-builders',
        name: 'Fluent APIs & Builder Patterns',
        description:
          'Fluent APIs use method chaining to create readable, domain-specific code within a general-purpose language — each method returns the builder object, enabling sequential configuration that reads almost like natural language.',
        keyPoints: [
          'Method chaining returns "this" (or a new builder) from each method call, enabling "query.select("name").from("users").where("age > 21").orderBy("name")" — the chain reads as a sequence of declarative operations',
          'The builder pattern separates construction from representation — the builder accumulates configuration (column names, conditions, ordering) and a final build/execute method produces the result, ensuring all required fields are set',
          'Type-safe builders use phantom types or generics to enforce construction ordering at compile time — e.g., a QueryBuilder<NoTable> becomes QueryBuilder<WithTable> after calling .from(), and .select() is only available on QueryBuilder<WithTable>',
          'Fluent APIs often use generic return types for progressive refinement — each method narrows the available operations, guiding the user through a valid construction sequence and preventing invalid combinations at compile time',
        ],
        tradeoffs: [
          'Fluent APIs are highly readable and discoverable (IDE autocompletion guides usage) but debugging is harder — long chains produce single-line expressions where stack traces don\'t indicate which method in the chain failed',
          'Type-safe builders catch errors at compile time but significantly increase type system complexity — the generic type parameters encoding builder state can make error messages cryptic and the implementation harder to maintain',
        ],
        realWorld: [
          'Java Stream API (filter/map/collect)',
          'Kotlin\'s type-safe SQL DSL (Exposed)',
          'Jest/Chai assertion chains',
        ],
      },
      {
        id: 'embedded-dsls',
        name: 'Embedded DSLs',
        description:
          'Embedded DSLs extend the host language with domain-specific constructs — using operator overloading, implicit conversions, macros, and metaprogramming to make domain code feel native within the host.',
        keyPoints: [
          'Operator overloading redefines the meaning of built-in operators for custom types — enabling mathematical DSLs where "matrix_a * matrix_b" uses the * operator for matrix multiplication, or where "route1 | route2" composes URL routes',
          'Implicit conversions (Scala\'s given/using, Kotlin\'s extension functions) allow automatic transformation between types — enabling "5.seconds" to convert an integer to a Duration, or "Hello".bold to wrap a string in HTML markup',
          'Compile-time metaprogramming (Rust\'s procedural macros, Scala\'s macros, Template Haskell) generates code at compile time — enabling DSLs that analyze and transform code, generate boilerplate, or validate domain constraints before runtime',
          'Kotlin\'s DSL features (lambda with receiver, extension functions, infix functions) enable constructs like "html { body { p { +"Hello World" } } }" where each block is a lambda that configures a builder in the receiver\'s scope',
          'Staged computation (MetaOCaml, LMS) separates code generation from execution — DSL expressions build up a representation of the computation at stage 1, then the runtime compiles and executes it at stage 2, combining abstraction with performance',
        ],
        tradeoffs: [
          'Embedded DSLs inherit the host language\'s tooling (IDE, debugger, type checker) for free but are constrained by its syntax — you can\'t create truly novel syntax, only approximate it within the host\'s syntactic rules',
          'Heavy use of metaprogramming and implicit conversions makes DSL code concise and readable but can make the implementation opaque — developers maintaining the DSL need deep knowledge of the host language\'s advanced features',
        ],
        realWorld: [
          'ScalaTest\'s "should" DSL',
          'Kotlin\'s Ktor routing DSL',
          'Ruby on Rails ActiveRecord query interface',
        ],
      },
      {
        id: 'dsl-design-principles',
        name: 'DSL Design Principles',
        description:
          'Designing effective DSLs requires understanding the target domain, choosing the right level of abstraction, and balancing expressiveness with simplicity — the DSL should make common tasks easy and complex tasks possible.',
        keyPoints: [
          'Domain modeling is the foundation — the DSL\'s vocabulary (keywords, operations, data types) should match how domain experts think and talk about their problems, not how programmers would model them in a general-purpose language',
          'The principle of least surprise means that DSL constructs should behave as users expect from their domain knowledge — a query DSL should use familiar SQL-like terminology, a build DSL should model dependencies naturally',
          'Expressiveness should be bounded — a DSL that can express everything is just another general-purpose language; restricting what the DSL can do (no loops, no mutation, no side effects) makes programs easier to analyze, optimize, and validate',
          'Error messages should use domain terminology — "Missing FROM clause in query" is better than "Expected token TABLE_REF at position 12"; the DSL should feel like a domain tool, not a programming language with errors',
          'Composability means DSL constructs can be combined freely — if queries can be composed with "union" and "intersect", users can build complex queries from simple ones without escaping to the host language',
        ],
        tradeoffs: [
          'Simpler DSLs are easier to learn and less likely to have bugs in their implementation, but may force users to work around limitations — the 80/20 rule suggests covering the common cases and providing escape hatches for the rest',
          'Domain-specific syntax improves readability for domain experts but requires investment in parsing, error reporting, and tooling — reusing host language syntax (internal DSL) trades domain fit for implementation effort',
        ],
        realWorld: [
          'Terraform HCL (infrastructure DSL)',
          'GraphQL (API query DSL)',
          'CSS (styling DSL)',
        ],
      },
    ],
  },
  {
    id: 11,
    title: 'External DSLs',
    part: 4,
    partTitle: 'DSL Design & Language Tools',
    summary:
      'External DSLs have their own custom syntax and parser, independent of any host language — offering maximum design freedom for domain-specific notation, at the cost of building and maintaining the entire language toolchain.',
    concepts: [
      {
        id: 'dsl-grammar-design',
        name: 'DSL Grammar Design',
        description:
          'Designing an external DSL\'s syntax involves choosing concrete syntax that is intuitive for domain users, defining the grammar formally, and ensuring the language is unambiguous and parseable.',
        keyPoints: [
          'Concrete syntax design starts with examples of what users want to write — working backwards from the desired surface syntax to the grammar ensures the language feels natural and meets real needs',
          'Keyword choice should use domain terminology — a deployment DSL might use "deploy", "to", "with" while a data transformation DSL might use "read", "filter", "aggregate", "write"',
          'Syntactic sugar provides convenient shorthand for common patterns — e.g., "port 8080" instead of "port: 8080", or allowing both "timeout 5s" and "timeout: 5" with implicit unit defaults',
          'User ergonomics include meaningful indentation (YAML-style), optional delimiters (semicolons), comments, and string interpolation — features that make the DSL pleasant to write and maintain',
          'Grammar testing with a comprehensive test suite of valid and invalid inputs ensures the parser accepts what it should and rejects what it shouldn\'t — edge cases around delimiters, escaping, and nesting are common sources of bugs',
        ],
        tradeoffs: [
          'Flexible syntax (optional semicolons, significant whitespace) is more pleasant to write but harder to parse and can lead to ambiguous situations — JavaScript\'s ASI (automatic semicolon insertion) is a notorious source of bugs',
          'Domain-specific syntax maximizes expressiveness but limits the user base — developers who don\'t know the domain must learn a new language, while a host-language-based DSL (internal) leverages existing knowledge',
        ],
        realWorld: [
          'Terraform HCL syntax',
          'Dockerfile syntax',
          'Nginx configuration language',
        ],
      },
      {
        id: 'dsl-parsing-and-interpretation',
        name: 'DSL Parsing & Interpretation',
        description:
          'External DSLs need a parser to read their custom syntax and an interpreter or compiler to execute them — choosing between parser generators, hand-written parsers, and tree-walking interpreters.',
        keyPoints: [
          'Parser generators (ANTLR, PEG.js, tree-sitter) generate a parser from a grammar specification — ideal for DSLs because the grammar is typically simpler than a full programming language, and generators provide free syntax error reporting',
          'Tree-walking interpreters traverse the AST recursively, evaluating each node by pattern-matching on its type — simple to implement and sufficient for most DSLs, which prioritize correctness and maintainability over raw performance',
          'REPL (Read-Eval-Print Loop) design makes DSLs interactive — users can experiment with expressions, see results immediately, and build up complex configurations incrementally, dramatically improving the development experience',
          'Semantic validation goes beyond parsing — the DSL interpreter should check domain-specific constraints (is this port number valid? does this file path exist? are these configuration options compatible?) and produce domain-specific error messages',
          'DSL versioning requires careful backward compatibility management — adding new features is easy, but removing or changing existing syntax breaks existing configurations; version fields and migration tools help manage evolution',
        ],
        tradeoffs: [
          'Tree-walking interpreters are simple and maintainable but slow for compute-intensive DSLs — if the DSL involves loops or large data processing, compiling to bytecode or native code may be necessary',
          'Parser generators reduce implementation effort but introduce a dependency on the generator tool, and generated error messages may be less domain-friendly than what a hand-written parser could produce',
        ],
        realWorld: [
          'ANTLR-based DSL parsers',
          'Dhall configuration language interpreter',
          'Jsonnet tree-walking evaluator',
        ],
      },
      {
        id: 'dsl-code-generation',
        name: 'DSL Code Generation',
        description:
          'DSL compilers generate code in target languages (SQL, Python, YAML, Terraform) from the DSL\'s AST — template-based generation is the simplest approach, while multi-target backends allow one DSL to emit code for different platforms.',
        keyPoints: [
          'Template-based code generation uses string templates with placeholders — the DSL AST is traversed, and each node is mapped to a template that produces the target language output, similar to how a React component renders HTML',
          'Multi-target backends allow the same DSL program to generate code for different platforms — a schema DSL might generate SQL DDL for PostgreSQL, TypeScript interfaces for the API layer, and GraphQL types for the frontend',
          'IDE integration for DSLs includes syntax highlighting (TextMate grammars, tree-sitter), autocompletion (suggesting valid keywords and identifiers), error highlighting (running the parser and validator on each keystroke), and go-to-definition',
          'Code generation validation ensures the generated output is correct — this includes generating well-formed code (proper escaping, indentation), running the target language\'s linter/type checker on the output, and round-trip testing',
        ],
        tradeoffs: [
          'Template-based generation is simple and readable but doesn\'t compose well — deeply nested or conditional output requires complex template logic; AST-to-AST transformation followed by pretty-printing is more principled but more complex',
          'Multi-target code generation multiplies maintenance burden — each target requires its own code generator and test suite, and feature parity across targets is difficult to maintain as the DSL evolves',
        ],
        realWorld: [
          'Protocol Buffers (multi-target code generation)',
          'OpenAPI/Swagger code generators',
          'Prisma schema to SQL/TypeScript generation',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Language Tooling',
    part: 4,
    partTitle: 'DSL Design & Language Tools',
    summary:
      'Language tooling — editors, linters, formatters, and debuggers — is essential for developer productivity and often more important to language adoption than the language itself, powered by technologies like the Language Server Protocol.',
    concepts: [
      {
        id: 'language-servers-and-lsp',
        name: 'Language Servers & LSP',
        description:
          'The Language Server Protocol (LSP) standardizes the interface between code editors and language-specific intelligence — enabling any editor to support any language through a single protocol instead of N*M integrations.',
        keyPoints: [
          'LSP defines a JSON-RPC protocol with messages for textDocument/completion (autocomplete), textDocument/hover (type info), textDocument/definition (go-to-definition), textDocument/references (find all references), and textDocument/diagnostics (errors/warnings)',
          'The language server runs as a separate process, receiving document change notifications from the editor and responding with computed results — this separation allows the server to use any language/framework and the editor to remain lightweight',
          'Incremental analysis is critical for responsiveness — the server must reparse and recheck only the changed portions of the file, using techniques like incremental parsing (tree-sitter), red-green trees (Roslyn), or lazy re-evaluation',
          'Workspace-wide operations like rename (all references across files), find all references, and diagnostics require the server to index the entire project — language servers maintain a symbol index updated incrementally as files change',
          'LSP has evolved to include semantic tokens (syntax highlighting based on type information), call hierarchy, type hierarchy, inlay hints, and code lenses — going far beyond basic completion and diagnostics',
        ],
        tradeoffs: [
          'LSP standardizes the protocol but the quality depends entirely on the language server implementation — a slow or inaccurate server provides a poor experience regardless of the editor; building a good language server is a major engineering effort',
          'Process separation (server in a separate process) provides isolation and flexibility but adds latency from IPC; in-process language services (like IntelliJ\'s) are faster but require the language tools to be written in the editor\'s language (JVM)',
        ],
        realWorld: [
          'rust-analyzer (Rust LSP)',
          'TypeScript language server (tsserver)',
          'clangd (C/C++ LSP)',
        ],
      },
      {
        id: 'linters-and-formatters',
        name: 'Linters & Formatters',
        description:
          'Linters detect potential errors, style violations, and suspicious patterns through static analysis, while formatters automatically enforce consistent code style — both are essential for maintaining code quality at scale.',
        keyPoints: [
          'Static analysis rules examine the AST for patterns that indicate bugs — unused variables, unreachable code, uninitialized reads, resource leaks, race conditions — without executing the program',
          'Auto-formatting removes style debates from code review by algorithmically determining whitespace, line breaks, and indentation — tools like Prettier, gofmt, and rustfmt produce deterministic output for any valid input',
          'Opinionated formatters (gofmt, Black) offer zero configuration and format all code identically — eliminating bikeshedding; configurable formatters (Prettier, clang-format) allow teams to customize style but reintroduce style debates',
          'Custom lint rules allow teams to enforce project-specific conventions — ESLint plugins, Clippy lints in Rust, and Semgrep rules let developers codify knowledge about their codebase\'s patterns and anti-patterns',
          'Fix suggestions (auto-fix) transform linter warnings into automated code changes — "unused import" warnings with auto-removal, or "use const instead of let" with auto-conversion, enabling bulk codebase-wide improvements',
        ],
        tradeoffs: [
          'Strict linting catches real bugs but too many false positives frustrate developers who start ignoring warnings or adding suppression comments everywhere — tuning lint rules to the team\'s tolerance is essential',
          'Opinionated formatters end style debates but may produce formatting that some developers find ugly — the benefit of consistency must outweigh individual preferences; community adoption (gofmt\'s "one true style") helps acceptance',
        ],
        realWorld: [
          'ESLint (JavaScript/TypeScript linter)',
          'Prettier / gofmt / rustfmt / Black',
          'Clippy (Rust linter)',
        ],
      },
      {
        id: 'source-maps-and-debugging',
        name: 'Source Maps & Debugging',
        description:
          'Source maps connect generated/compiled code back to original source, while debug information (DWARF, PDB) enables debuggers to set breakpoints, inspect variables, and step through code at the source level.',
        keyPoints: [
          'Source maps (JavaScript/CSS) store a mapping from generated code positions (line, column) to original source positions — enabling browser DevTools to show TypeScript/JSX source when debugging bundled/minified JavaScript',
          'DWARF debug information (used on Linux/macOS) encodes variable locations (register, stack offset), type information, line number mappings, and scope boundaries — enabling GDB/LLDB to provide source-level debugging for compiled languages',
          'Breakpoint resolution maps a source line number to the actual instruction address(es) to break at — this is non-trivial when optimizations have moved, duplicated, or eliminated the code corresponding to that line',
          'Debug info and optimizations conflict: inlining duplicates code (which instance to break in?), dead code elimination removes variables (can\'t inspect them), and instruction reordering changes apparent execution order — debug builds typically use -O0 to avoid these issues',
          'Hot code reloading and edit-and-continue features allow modifying source code during a debugging session and continuing execution with the new code — requiring the runtime to patch function bodies, update stack frames, and maintain variable state',
        ],
        tradeoffs: [
          'Including debug information increases binary size significantly (often 5-10x) and may reduce optimizations — release builds typically strip debug info or use split DWARF (debug info in separate files) to keep binaries small',
          'Source maps for JavaScript add a network request and processing overhead — production deployments often upload source maps to error tracking services (Sentry) rather than serving them to end users',
        ],
        realWorld: [
          'JavaScript source maps (V3 format)',
          'DWARF debug info (GCC, Clang, Rust)',
          'PDB files (Microsoft Visual C++)',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Modern Compiler Infrastructure',
    part: 4,
    partTitle: 'DSL Design & Language Tools',
    summary:
      'Modern compiler infrastructure provides reusable frameworks for building languages — from LLVM\'s modular compiler toolkit to WebAssembly\'s portable compilation target and GraalVM\'s polyglot runtime for language interoperability.',
    concepts: [
      {
        id: 'llvm-and-compiler-backends',
        name: 'LLVM & Compiler Backends',
        description:
          'LLVM is a collection of modular compiler technologies — its typed SSA-based IR, optimization passes, and code generators for multiple architectures allow language designers to focus on the frontend while reusing industrial-strength backend infrastructure.',
        keyPoints: [
          'LLVM IR is a typed, SSA-based intermediate representation with explicit control flow (basic blocks with terminators), memory operations (alloca, load, store), and function calls — it serves as the universal interchange format between frontends and backends',
          'The LLVM optimization pipeline consists of composable passes — analysis passes (dominator tree, alias analysis) provide information, transform passes (mem2reg, LICM, GVN, SROA) modify the IR, and the pass manager handles dependencies and ordering',
          'LLVM\'s target code generation uses SelectionDAG (tree-pattern matching) or GlobalISel (instruction-level selection) to map IR to machine instructions, followed by register allocation, instruction scheduling, and machine code emission',
          'New languages plug into LLVM by implementing a frontend that emits LLVM IR — Rust (rustc), Swift, Julia, Zig, and many others use LLVM as their backend, getting optimized x86/ARM/RISC-V code generation without implementing it themselves',
          'LLVM\'s JIT compilation framework (ORC) enables runtime code generation — languages like Julia use it for ahead-of-time compilation with runtime specialization, generating code optimized for the actual types encountered at runtime',
        ],
        tradeoffs: [
          'LLVM\'s IR is low-level (close to machine code), which makes it hard to express high-level optimizations (loop fusion, automatic parallelization) that need source-level information — this is why MLIR was created as a higher-level complement',
          'Depending on LLVM couples your language to LLVM\'s release cycle, build system, and design decisions — LLVM is a large C++ project that can be slow to build and requires significant expertise to modify',
        ],
        realWorld: [
          'Clang (C/C++ on LLVM)',
          'Rust\'s rustc backend',
          'Swift compiler (SIL -> LLVM IR)',
        ],
      },
      {
        id: 'webassembly-and-portable-targets',
        name: 'WebAssembly & Portable Targets',
        description:
          'WebAssembly (Wasm) is a portable, size-efficient binary format designed as a compilation target — enabling languages like C, Rust, and Go to run in web browsers and server-side runtimes with near-native performance.',
        keyPoints: [
          'Wasm\'s binary format uses a compact encoding with variable-length integers and a structured stack machine — programs are organized into modules with functions, tables, memories, and globals, validated before execution for safety',
          'Wasm\'s execution model is a stack-based virtual machine with structured control flow (block, loop, if/else, br) — unlike JVM bytecode, Wasm does not have goto, making validation simpler and compilation to native code straightforward',
          'WASI (WebAssembly System Interface) provides a standardized API for Wasm modules to interact with the operating system — file I/O, networking, clocks — enabling server-side Wasm without browser APIs',
          'Compile-to-Wasm toolchains exist for many languages: Emscripten (C/C++), wasm-pack (Rust), TinyGo (Go), AssemblyScript (TypeScript-like) — each handles language-specific features like garbage collection and exceptions differently',
          'The Wasm component model extends the basic module system with rich inter-module communication — typed interfaces, shared-nothing isolation, and WIT (Wasm Interface Type) definitions enable composing modules from different languages',
        ],
        tradeoffs: [
          'Wasm\'s sandboxed execution model provides strong security isolation but limits access to the host system — any system interaction must go through explicitly imported functions, which adds overhead and complexity',
          'Wasm\'s lack of built-in GC (being addressed by the GC proposal) means languages with garbage collection must ship their own GC runtime in the Wasm module, significantly increasing binary size — Go Wasm binaries are typically several MB',
        ],
        realWorld: [
          'Figma (C++ compiled to Wasm)',
          'Cloudflare Workers (Wasm serverless)',
          'Blazor (C#/.NET on Wasm)',
        ],
      },
      {
        id: 'graalvm-and-polyglot-runtimes',
        name: 'GraalVM & Polyglot Runtimes',
        description:
          'GraalVM is a high-performance polyglot runtime that can execute programs written in multiple languages within the same process, using the Truffle framework to implement language interpreters that automatically get JIT compilation.',
        keyPoints: [
          'The Truffle framework provides an AST interpreter framework where language implementers define AST node types with execute methods — Truffle automatically specializes nodes based on observed types (e.g., add_int vs add_float) and compiles hot paths via partial evaluation',
          'Partial evaluation transforms the interpreter + AST into native code by specializing the interpreter for the specific program being run — effectively "removing the interpreter" and producing code as if a compiler had been written for the language',
          'Polyglot interop allows values from one language to be used seamlessly in another — a JavaScript function can call a Python function, pass a Ruby array, and receive a Java object, all within the same GraalVM process without serialization or FFI overhead',
          'GraalVM\'s native image (SubstrateVM) ahead-of-time compiles JVM applications into standalone executables with fast startup and low memory — using closed-world analysis to determine all reachable code at build time',
          'Language interop through shared intermediate representation — rather than each language implementing its own runtime, languages share GraalVM\'s memory management, JIT compiler, and debugging infrastructure, dramatically reducing the effort to create a new language implementation',
        ],
        tradeoffs: [
          'Truffle\'s automatic JIT through partial evaluation is powerful but produces long warmup times — the interpreter runs slowly until the JIT compiles hot paths, and peak performance may take seconds to minutes to achieve on complex programs',
          'GraalVM\'s native image requires closed-world assumptions (all code known at build time) which conflicts with dynamic features like reflection, class loading, and serialization — these require explicit configuration and may not work fully',
        ],
        realWorld: [
          'GraalJS (JavaScript on GraalVM)',
          'TruffleRuby (Ruby on GraalVM)',
          'Quarkus/Micronaut native images',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
