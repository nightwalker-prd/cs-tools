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
  // Topic 1: Lexical Analysis (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "Why do most compilers recognize keywords by first scanning them as identifiers and then checking a reserved word table?",
    options: [
      "Because keywords and identifiers have different character sets",
      "Because keywords follow the same lexical pattern as identifiers — distinguishing them in the scanner's regular expressions would require a separate pattern for each keyword, complicating the DFA",
      "Because keywords are always longer than identifiers",
      "Because the parser, not the lexer, is responsible for recognizing keywords",
    ],
    answer: 1,
    explanation:
      "Keywords like 'if', 'while', and 'return' are lexically identical to identifiers — they match the pattern [a-zA-Z_][a-zA-Z0-9_]*. Rather than adding a separate regular expression for each keyword (which would bloat the DFA and require updating it whenever a keyword is added), the lexer scans them as identifiers and then performs a table lookup to reclassify matching lexemes as keyword tokens. This keeps the scanner simple and the keyword set easily modifiable.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "What is the key advantage of DFA-based regex engines (like RE2) over backtracking engines (like Perl's)?",
    options: [
      "DFA-based engines support backreferences and lookahead",
      "DFA-based engines use less memory in all cases",
      "DFA-based engines guarantee linear-time matching — O(n) for input length n — while backtracking engines can exhibit exponential O(2^n) time on pathological patterns",
      "DFA-based engines produce more readable regular expressions",
    ],
    answer: 2,
    explanation:
      "Backtracking regex engines try different matching alternatives and backtrack on failure, which can lead to catastrophic backtracking — exponential runtime on patterns like '(a+)+b' with input 'aaaaaa...'. DFA-based engines (RE2, Rust's regex crate) convert the regex to a DFA that processes each input character exactly once, guaranteeing O(n) runtime regardless of the pattern. The tradeoff is that DFA engines cannot support backreferences (\\1) or certain lookahead constructs that require backtracking.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "Why do most production compilers (GCC, Clang, V8, Go) use hand-written lexers instead of lexer generators like Flex?",
    options: [
      "Hand-written lexers are easier to implement",
      "Lexer generators cannot handle Unicode",
      "Hand-written lexers provide full control over performance, error messages, and special cases — generated scanners produce opaque code that is difficult to customize and debug",
      "Lexer generators produce slower code than hand-written lexers in all cases",
    ],
    answer: 2,
    explanation:
      "While lexer generators like Flex guarantee correctness (the generated DFA provably matches the specification), the generated code is opaque and hard to customize. Production compilers need fine-grained control over error recovery (producing helpful messages for common mistakes), performance (exploiting language-specific patterns like keyword recognition via perfect hashing), and special cases (context-dependent tokenization). Hand-written lexers are more work but give engineers complete control over these aspects.",
  },

  // ============================================================
  // Topic 2: Context-Free Grammars (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "What is the 'dangling else' problem and how is it typically resolved?",
    options: [
      "The parser cannot determine where an 'else' clause ends — resolved by requiring explicit 'endif' keywords",
      "The 'else' keyword conflicts with 'elsif' — resolved by renaming one of them",
      "In 'if a then if b then s1 else s2', the else could associate with either if — typically resolved by grammar restructuring (matched/unmatched statements) or the rule that else binds to the nearest unmatched if",
      "The else clause is optional and may be accidentally omitted — resolved by making it mandatory",
    ],
    answer: 2,
    explanation:
      "The dangling else ambiguity arises in nested if-else statements: 'if a then if b then s1 else s2' has two valid parse trees — one where 'else s2' belongs to the inner 'if b' and one where it belongs to the outer 'if a'. Most languages resolve this by the convention that else associates with the nearest preceding unmatched if. In the grammar, this is formalized by splitting statements into 'matched' (all ifs have elses) and 'unmatched' categories, eliminating the ambiguity structurally.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "Why must left recursion be eliminated for recursive descent parsers?",
    options: [
      "Left recursion makes the grammar ambiguous",
      "Left recursion causes the parser to consume too much memory",
      "A recursive descent parser for a left-recursive rule like 'E -> E + T' would call parseE() which immediately calls parseE() again without consuming any input — causing infinite recursion",
      "Left recursion prevents the parser from generating an AST",
    ],
    answer: 2,
    explanation:
      "In a recursive descent parser, each nonterminal has a corresponding parsing function. For a left-recursive rule like 'E -> E + T | T', the function parseE() would first try the production 'E + T' by calling parseE() — but this recursive call would again try 'E + T' by calling parseE(), and so on infinitely without ever consuming a token. The solution is to rewrite the grammar: 'E -> T E'' and 'E' -> + T E' | epsilon', which uses right recursion (consuming a token before recursing).",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "What is the relationship between LALR(1) and canonical LR(1) parsing?",
    options: [
      "LALR(1) is strictly more powerful than canonical LR(1)",
      "LALR(1) merges LR(1) states with identical cores, producing much smaller tables with the same power as SLR(1) but nearly the same power as canonical LR(1) — a few valid LR(1) grammars have conflicts under LALR(1) but this rarely matters in practice",
      "LALR(1) and canonical LR(1) are identical in power",
      "LALR(1) uses more lookahead tokens than canonical LR(1)",
    ],
    answer: 1,
    explanation:
      "Canonical LR(1) builds parser states from items that include a lookahead token, producing very large tables (thousands of states for typical languages). LALR(1) identifies states with the same core items (ignoring lookahead) and merges them, reducing the table to SLR-sized while retaining most of LR(1)'s parsing power. The merging can introduce spurious reduce-reduce conflicts in rare cases (where LR(1) would use different lookaheads to disambiguate), but virtually all practical programming language grammars are LALR(1). Yacc/Bison use LALR(1).",
  },

  // ============================================================
  // Topic 3: Parsing Techniques (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "How does Pratt parsing (top-down operator precedence) handle expression precedence more elegantly than traditional recursive descent?",
    options: [
      "Pratt parsing uses a separate expression grammar with no recursion",
      "Pratt parsing assigns each operator a binding power (precedence level) — the parser recursively parses sub-expressions, using binding powers to decide whether to continue the current expression or return, naturally encoding precedence and associativity without multiple grammar levels",
      "Pratt parsing generates an LR parse table at compile time",
      "Pratt parsing only works for arithmetic expressions, not full languages",
    ],
    answer: 1,
    explanation:
      "Traditional recursive descent encodes precedence by creating a separate function for each precedence level (parseExpr calls parseComparison calls parseAddition calls parseMultiplication calls parseUnary calls parsePrimary). Pratt parsing simplifies this to a single function with a minimum binding power parameter. Each operator token has a left binding power. The parser continues parsing (consuming the operator and recursing) as long as the next operator's binding power exceeds the minimum. Left-associative operators recurse with power+1, right-associative with power. This is more concise, easier to extend, and avoids deep call stacks.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "What is a shift-reduce conflict in LR parsing and what typically causes it?",
    options: [
      "The parser cannot decide whether to read the next token or apply a grammar rule to reduce the stack — typically caused by ambiguous constructs like the dangling else where both shifting (reading more input) and reducing (completing a rule) are valid actions",
      "The parser has two different rules it could reduce by",
      "The parser encounters an invalid token that doesn't match any grammar rule",
      "The parser's stack overflows from too many shifts without reduces",
    ],
    answer: 0,
    explanation:
      "A shift-reduce conflict occurs when the LR parser's state and lookahead token make both shifting (pushing the token onto the stack to match a longer right-hand side) and reducing (popping symbols to complete a shorter rule) appear valid. The classic example is the dangling else: after parsing 'if E then if E then S', with 'else' as the lookahead, the parser can shift the 'else' (associating it with the inner if) or reduce 'if E then S' (associating the else with the outer if). Yacc/Bison resolve this by defaulting to shift, which gives the desired nearest-if behavior.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "What is packrat parsing and what problem does it solve for PEGs?",
    options: [
      "Packrat parsing compresses the parse tree for memory efficiency",
      "Packrat parsing parallelizes the parsing process across multiple cores",
      "Packrat parsing memoizes all intermediate parse results at every input position — guaranteeing O(n) parsing time for any PEG, which would otherwise be exponential due to unlimited backtracking in ordered choice",
      "Packrat parsing converts PEGs to deterministic context-free grammars",
    ],
    answer: 2,
    explanation:
      "PEGs use ordered choice (A / B): try A first, if it fails, backtrack and try B. Without memoization, this backtracking can revisit the same input positions exponentially many times — e.g., trying to parse the same expression from the same position in multiple alternatives. Packrat parsing caches the result of every rule application at every input position in a memoization table. Since there are O(n) positions and a fixed number of rules, the table size is O(n) and each entry is computed at most once, guaranteeing O(n) total parsing time. The tradeoff is O(n) memory overhead.",
  },

  // ============================================================
  // Topic 4: Abstract Syntax Trees (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "What is the key difference between a concrete syntax tree (parse tree) and an abstract syntax tree?",
    options: [
      "Concrete syntax trees are smaller because they omit node types",
      "Abstract syntax trees include all tokens including parentheses and semicolons",
      "A concrete syntax tree preserves every grammar symbol (parentheses, commas, semicolons, intermediate nonterminals) while an AST retains only semantically meaningful nodes — discarding syntactic sugar that guided parsing but carries no semantic content",
      "Concrete syntax trees are used for code generation; ASTs are only for type checking",
    ],
    answer: 2,
    explanation:
      "A concrete syntax tree (CST/parse tree) is a direct representation of the grammar derivation — every terminal (including delimiters like parentheses, semicolons, and commas) and every nonterminal appears as a node. An AST strips away these syntactic artifacts, keeping only the meaningful structure: for '(3 + 4) * 5', the CST would include nodes for '(' and ')', while the AST would just have Multiply(Add(3, 4), 5). The AST is smaller, easier to traverse, and more suitable for analysis and transformation.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "Why is the visitor pattern commonly used for AST traversal in compilers?",
    options: [
      "The visitor pattern reduces memory usage of the AST",
      "The visitor pattern is faster than recursive traversal",
      "The visitor pattern separates the algorithm (what to do at each node) from the data structure (the AST nodes) — allowing new operations (type checking, code generation, optimization) to be added as new visitor classes without modifying the node hierarchy",
      "The visitor pattern prevents infinite recursion during tree traversal",
    ],
    answer: 2,
    explanation:
      "Compilers need many different operations on the AST — type checking, constant folding, dead code elimination, code generation — each requiring different logic at each node type. Without the visitor pattern, adding a new operation would require modifying every node class to add a new method. The visitor pattern uses double dispatch: each node has an 'accept(visitor)' method that calls 'visitor.visitBinaryExpr(this)' etc., and each operation implements a visitor with methods for each node type. New operations are new visitor classes — no changes to the node hierarchy needed.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What are synthesized attributes in syntax-directed translation?",
    options: [
      "Attributes that are generated randomly during parsing",
      "Attributes that flow downward from parent nodes to child nodes",
      "Attributes computed at a node from the attributes of its children — flowing upward in the parse tree, like computing an expression's value from its subexpressions' values",
      "Attributes stored in a separate symbol table outside the parse tree",
    ],
    answer: 2,
    explanation:
      "Synthesized attributes flow bottom-up in the parse tree — each node computes its attribute value from the attributes of its child nodes. For example, in evaluating '3 + 4 * 5', the leaf node '3' synthesizes the value 3, '4' synthesizes 4, '5' synthesizes 5. The multiplication node computes 4 * 5 = 20 from its children, and the addition node computes 3 + 20 = 23. S-attributed grammars (using only synthesized attributes) can be evaluated in a single bottom-up pass, making them compatible with LR parsing and natural for expression evaluation.",
  },

  // ============================================================
  // Topic 5: Type Systems & Type Checking (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "What is the fundamental difference between structural and nominal subtyping?",
    options: [
      "Structural subtyping is used in compiled languages; nominal is used in interpreted languages",
      "Structural subtyping checks that a type has the required shape (methods, fields) regardless of its declared name, while nominal subtyping requires an explicit declaration of the subtype relationship (implements, extends) — even if two types have identical structure, they are unrelated without a declared relationship",
      "Nominal subtyping supports generics; structural subtyping does not",
      "Structural subtyping is always faster at compile time than nominal subtyping",
    ],
    answer: 1,
    explanation:
      "In structural subtyping (TypeScript, Go interfaces), a type 'Duck' with method 'quack()' is a subtype of an interface requiring 'quack()' purely based on shape — no 'implements' declaration needed. In nominal subtyping (Java, C#), 'class Duck implements Quackable' explicitly declares the relationship, and a class with the same methods but without the declaration is NOT considered a subtype. Structural typing is more flexible (any matching type works) but nominal typing provides stronger intent — accidentally matching an interface doesn't make unrelated types interchangeable.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "How does Hindley-Milner type inference determine the type of a function without any annotations?",
    options: [
      "It runs the function with sample inputs and observes the output types",
      "It uses the function's name to look up the type in a standard library",
      "It generates type constraints from how variables are used in the function, then solves them via unification — if 'x' appears in 'x + 1', the constraint 'type(x) = Int' is generated because '+' requires numeric operands",
      "It defaults all unannotated types to a special 'any' type",
    ],
    answer: 2,
    explanation:
      "Hindley-Milner type inference (Algorithm W) works by: (1) assigning fresh type variables to all unannotated expressions, (2) generating equality constraints from how types are used — 'f(x)' constrains f's type to be 'A -> B' where x has type A; 'x + 1' constrains x to be Int, (3) solving constraints via unification — substituting type variables until all constraints are satisfied or a contradiction is found. The result is the most general (principal) type that works for all valid uses. This is why Haskell and ML can infer types like 'map :: (a -> b) -> [a] -> [b]' without any annotations.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "What does variance in generic types control, and why does it matter?",
    options: [
      "Variance controls how many type parameters a generic type can have",
      "Variance controls whether generic types can be nested inside each other",
      "Variance determines how subtyping between type parameters affects subtyping between generic types — if Cat is a subtype of Animal, covariance makes List<Cat> a subtype of List<Animal>, while invariance means they are unrelated",
      "Variance determines the runtime performance of generic type instantiation",
    ],
    answer: 2,
    explanation:
      "Variance governs the subtyping relationship of generic types based on their type arguments. If Cat extends Animal: covariant (out) means List<Cat> is a subtype of List<Animal> — safe for producers (reading); contravariant (in) means Consumer<Animal> is a subtype of Consumer<Cat> — safe for consumers (writing); invariant means neither relationship holds — required for types that both read and write. Java arrays are covariant (Cat[] extends Animal[]) which is unsound — you can store a Dog in an Animal[] that's actually a Cat[], causing an ArrayStoreException. Generics use wildcards (? extends/super) to safely express variance.",
  },

  // ============================================================
  // Topic 6: Intermediate Representations (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "What is the key property of SSA (Static Single Assignment) form that makes it beneficial for optimization?",
    options: [
      "SSA form reduces the total number of variables in the program",
      "SSA form eliminates all temporary variables",
      "Every variable is assigned exactly once — making data flow explicit because each use of a variable has exactly one reaching definition, eliminating the need for separate reaching-definitions analysis",
      "SSA form converts all loops to recursive functions",
    ],
    answer: 2,
    explanation:
      "In SSA form, each variable is defined (assigned) exactly once in the program text. Multiple assignments to the same variable are renamed: 'x = 1; x = x + 1; y = x' becomes 'x1 = 1; x2 = x1 + 1; y = x2'. This makes the def-use chain trivial — each use points to exactly one definition. Optimizations like constant propagation (if x1 = 5, replace all uses of x1 with 5), dead code elimination (if x2 has no uses, remove it), and common subexpression elimination become simpler because each variable's value is immutable once defined.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What are phi functions in SSA form and why are they needed?",
    options: [
      "Phi functions handle function calls by merging return values from different call sites",
      "Phi functions select between multiple reaching definitions at control flow merge points — 'x3 = phi(x1, x2)' means x3 gets x1's value if control came from the left branch or x2's value from the right branch",
      "Phi functions compute mathematical constants like pi during compilation",
      "Phi functions eliminate redundant variables to reduce register pressure",
    ],
    answer: 1,
    explanation:
      "When control flow merges (after an if-else, at a loop header), a variable may have been defined differently on each incoming path. SSA requires one definition per variable, so phi functions are inserted at merge points to select the correct value. For 'if (cond) { x = 1; } else { x = 2; } y = x;', SSA produces: 'if (cond) { x1 = 1; } else { x2 = 2; } x3 = phi(x1, x2); y = x3;'. The phi function is a pseudo-instruction — at runtime it's implemented by ensuring each branch stores its value in the same register or memory location.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "What advantage does a sea-of-nodes IR have over a traditional CFG-based IR?",
    options: [
      "Sea-of-nodes uses less memory because it has fewer nodes",
      "Sea-of-nodes is easier to implement and debug than CFG-based IRs",
      "Sea-of-nodes merges the data-flow graph and control-flow graph into one unified graph — operations are constrained only by their actual dependencies (data and control), not by an artificial ordering within basic blocks, enabling more flexible scheduling and optimization",
      "Sea-of-nodes eliminates the need for register allocation",
    ],
    answer: 2,
    explanation:
      "In a traditional CFG-based IR, instructions are ordered within basic blocks even when no dependency exists between them. In a sea-of-nodes IR (used by V8 TurboFan, Java HotSpot C2, Graal), operations are nodes in a graph connected only by their actual dependencies — data edges (an add depends on its operands) and control edges (a store must happen after a branch). This makes operations freely reorderable as long as dependencies are respected, naturally enabling optimizations like instruction scheduling and code motion without explicit analysis. The tradeoff is significantly more implementation complexity.",
  },

  // ============================================================
  // Topic 7: Optimization Passes (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "What is strength reduction and when is it applied?",
    options: [
      "Strength reduction removes unnecessary type casts to reduce runtime overhead",
      "Strength reduction replaces expensive operations with cheaper equivalent ones — multiplication by a power of 2 becomes a left shift, division by a constant becomes multiplication by its reciprocal, and loop induction variable multiplications become additions",
      "Strength reduction decreases the precision of floating-point operations for speed",
      "Strength reduction combines multiple weak operations into a single strong one",
    ],
    answer: 1,
    explanation:
      "Strength reduction replaces computationally expensive operations with equivalent cheaper ones. Classic examples: 'x * 8' becomes 'x << 3' (multiplication to shift), 'x / 7' becomes 'x * 0x24924925 >> 35' (division to multiply-and-shift with a magic constant), and in loops, 'address = base + i * sizeof(element)' becomes an incremental 'address += sizeof(element)' each iteration (eliminating the multiplication entirely). This is especially impactful in tight loops where the replaced operation executes millions of times.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "What is loop-invariant code motion (LICM) and what must be true for it to be safe?",
    options: [
      "LICM reorders loop iterations for better cache performance — safe when iterations are independent",
      "LICM moves computations that produce the same result every iteration to before the loop — safe when the operands are not modified inside the loop and the loop is guaranteed to execute at least once (or the moved code has no side effects)",
      "LICM unrolls the loop body to reduce branch overhead — safe when the iteration count is known",
      "LICM parallelizes loop iterations across CPU cores — safe when there are no data dependencies",
    ],
    answer: 1,
    explanation:
      "LICM identifies expressions inside a loop whose operands don't change across iterations — if 'x = a * b' is inside a loop and neither a nor b is modified in the loop, the computation is invariant and can be moved to the loop's preheader (just before the loop). For safety: (1) the operands must not be modified in the loop, (2) the computation must dominate all loop exits where its result is used, and (3) if the loop might execute zero times, moving code with side effects to before the loop would change behavior — the code might execute when it shouldn't have.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "Why is function inlining considered one of the most important interprocedural optimizations?",
    options: [
      "Inlining reduces the total number of functions in the program",
      "Inlining allows the program to use fewer source files",
      "Inlining eliminates call overhead (save/restore registers, stack frame setup) AND exposes the function body to the caller's optimization context — enabling constant propagation through arguments, dead code elimination of unused paths, and further inlining of nested calls",
      "Inlining converts recursive functions to iterative ones",
    ],
    answer: 2,
    explanation:
      "While eliminating call overhead (typically 5-10 nanoseconds) is a minor benefit, the major impact of inlining is enabling cross-function optimization. After inlining 'f(x)' into the caller where x = 5, the compiler can constant-propagate 5 into f's body, eliminate branches that depend on x, remove dead code in paths not taken, and inline further calls within f — creating a cascade of optimization opportunities that were invisible across the function boundary. This is why JVMs aggressively inline hot methods and why LTO (link-time optimization) provides cross-module inlining.",
  },

  // ============================================================
  // Topic 8: Register Allocation & Code Generation (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "Why is register allocation modeled as graph coloring, and why is it NP-hard?",
    options: [
      "The graph represents memory addresses; coloring determines cache placement",
      "The interference graph has variables as nodes and edges between variables that are simultaneously live — coloring with K colors (K = number of registers) assigns each variable a register such that no two simultaneously live variables share a register, which is the NP-hard graph coloring problem",
      "The graph represents function calls; coloring determines calling conventions",
      "Register allocation is actually polynomial-time; the NP-hard claim is outdated",
    ],
    answer: 1,
    explanation:
      "Two variables 'interfere' if they are both live (have future uses) at the same point in the program — they cannot be stored in the same register because that would overwrite one's value. The interference graph has a node per variable and an edge between every pair of interfering variables. Register allocation assigns one of K colors (registers) to each node such that no two adjacent nodes share a color. Graph coloring with K >= 3 colors is NP-hard in general, though practical algorithms (Chaitin's with simplification heuristics) work well because real interference graphs have special structure (chordal or nearly chordal).",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "Why do JIT compilers typically use linear scan register allocation instead of graph coloring?",
    options: [
      "Linear scan produces better code quality than graph coloring",
      "Linear scan doesn't require building an interference graph — it processes variables ordered by live intervals in a single pass, running in O(n) time vs graph coloring's higher complexity, making it fast enough for JIT compilation where compile time directly impacts application latency",
      "Graph coloring cannot handle the instruction sets of modern processors",
      "Linear scan works with unlimited registers while graph coloring requires a fixed number",
    ],
    answer: 1,
    explanation:
      "JIT compilers must compile code at runtime, so compilation speed directly impacts application startup and responsiveness. Graph coloring requires building the full interference graph (expensive), then running simplify/select/spill phases (potentially iterating). Linear scan sorts variables by their start position, maintains a list of active (currently live) variables, and assigns registers greedily — when no register is free, it spills the variable with the furthest next use. This runs in O(n log n) time (dominated by sorting) vs graph coloring's higher complexity. The code quality is slightly worse (more spills) but the compilation is much faster, which is the right tradeoff for JIT.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "What is instruction tiling in the context of code generation?",
    options: [
      "Tiling divides the program into sections that can be compiled in parallel",
      "Tiling arranges instructions in memory to improve cache locality",
      "Tiling covers the expression tree with machine instruction patterns — each pattern (tile) matches a subtree of IR operations and produces one or more machine instructions, and the optimal tiling minimizes total cost (cycles or code size)",
      "Tiling duplicates instructions across multiple execution units",
    ],
    answer: 2,
    explanation:
      "Instruction selection maps IR operations to machine instructions by 'tiling' the expression tree. Each tile is a pattern that matches a subtree and specifies the machine instruction(s) that implement it. For example, on x86, a tile for 'address = base + index * 4' might match the LEA instruction (one tile covering three IR operations), while simpler tiles would use separate add and shift instructions (three tiles). Dynamic programming (BURG-style) finds the minimum-cost tiling in O(n) time by annotating each node with the cheapest tile that can produce its result, considering all possible tiles bottom-up.",
  },

  // ============================================================
  // Topic 9: Runtime Systems (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "Why does generational garbage collection improve performance over simple mark-and-sweep?",
    options: [
      "Generational GC uses a more efficient marking algorithm",
      "Generational GC compresses objects more effectively",
      "Generational GC exploits the generational hypothesis — most objects die young — by collecting the small young generation frequently (fast, most garbage found) and the large old generation rarely, reducing average pause times compared to scanning the entire heap every time",
      "Generational GC eliminates the need for root scanning",
    ],
    answer: 2,
    explanation:
      "The generational hypothesis (observed empirically across many programs) states that most objects are short-lived. Generational GC partitions the heap: new objects go to the young generation (small, collected frequently) and survivors are promoted to the old generation (large, collected rarely). Since most young objects are dead by collection time, young generation collections are fast (small area, most is garbage). A full mark-and-sweep must scan the entire heap every time, including long-lived objects that are almost never garbage — wasting time. Write barriers track old-to-young references to keep young collections safe.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "What is tail call optimization (TCO) and why is it important for functional programming?",
    options: [
      "TCO caches the results of function calls to avoid recomputation",
      "TCO parallelizes recursive calls across CPU cores",
      "TCO reuses the caller's stack frame when a function's last action is a function call — converting tail recursion to iteration and preventing stack overflow on deeply recursive functions, which is critical for functional languages that use recursion instead of loops",
      "TCO inlines all recursive function calls to eliminate call overhead",
    ],
    answer: 2,
    explanation:
      "When a function's last action before returning is calling another function (a tail call), TCO replaces the current stack frame with the callee's frame instead of pushing a new one. For 'factorial(n, acc) = if n == 0 then acc else factorial(n-1, n*acc)', each recursive call reuses the same stack frame. Without TCO, factorial(1000000) would need 1M stack frames and crash with stack overflow. Functional languages like Scheme mandate TCO in their specification because they use recursion as the primary control structure (no for/while loops). Most other languages (Java, Python, JavaScript*) don't guarantee TCO.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "What is deoptimization in a JIT compiler and why is it necessary?",
    options: [
      "Deoptimization removes unused code from the compiled program to save memory",
      "Deoptimization reduces optimization levels to decrease compilation time",
      "Deoptimization reverts from optimized compiled code back to interpreted execution when speculative assumptions become invalid — e.g., if JIT-compiled code assumed a variable was always an integer but receives a string, the compiled code is discarded and execution continues in the interpreter with the correct state",
      "Deoptimization slows down the program intentionally to reduce CPU temperature",
    ],
    answer: 2,
    explanation:
      "JIT compilers make speculative optimizations based on observed behavior — type specialization (this variable is always an integer), monomorphic inline caches (this method always resolves to Dog.bark), and guard-based optimizations (this branch is always taken). When speculation fails at runtime (a guard check fails), the JIT cannot continue executing the optimized code. Deoptimization reconstructs the interpreter's state (variable values, stack frames, program counter) from the compiled code's state and transfers control back to the interpreter. This is extremely complex — the compiled code may have reordered operations, eliminated variables, or inlined functions that must be 'un-done'.",
  },

  // ============================================================
  // Topic 10: Internal DSLs (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "How do type-safe builders enforce correct construction order at compile time?",
    options: [
      "They throw runtime exceptions when methods are called in the wrong order",
      "They use documentation comments to describe the required order",
      "They use phantom types or generic state parameters — e.g., QueryBuilder<NoTable> transitions to QueryBuilder<WithTable> after calling .from(), and .select() is only available on QueryBuilder<WithTable>, making incorrect orderings a compile-time type error",
      "They alphabetically sort method calls during compilation",
    ],
    answer: 2,
    explanation:
      "Type-safe builders encode the construction state in the type system. A QueryBuilder starts as QueryBuilder<Init>. Calling .from('users') returns QueryBuilder<HasTable>. The .where() method is only defined on QueryBuilder<HasTable> (not on QueryBuilder<Init>), so calling .where() before .from() is a compile-time error — no method found. This pattern uses generics/phantom types to represent state transitions, turning an ordering bug into a type error. The Kotlin Exposed DSL and Java's jOOQ use this approach for type-safe SQL query construction.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What advantage do Kotlin's 'lambda with receiver' and extension functions provide for building internal DSLs?",
    options: [
      "They make the DSL code run faster by eliminating lambda overhead",
      "They automatically generate documentation for the DSL",
      "They allow DSL constructs like 'html { body { p { +\"Hello\" } } }' where each block's code executes in the scope of a builder object — methods like 'body' and 'p' are called on the receiver without explicit qualification, creating clean, nested, domain-specific syntax",
      "They prevent users from writing invalid DSL code at runtime",
    ],
    answer: 2,
    explanation:
      "Kotlin's 'lambda with receiver' (e.g., 'fun html(init: HTML.() -> Unit)') means the lambda's 'this' is set to an HTML builder object. Inside the lambda, calling 'body { ... }' is actually calling 'this.body { ... }' on the HTML builder. The body function similarly takes a lambda with a BODY receiver. This creates a natural nesting syntax that reads like a domain-specific language: 'html { body { p { +\"Hello\" } } }' looks like markup but is valid Kotlin that constructs an HTML object graph. Extension functions add methods to existing types without modifying them, enabling '5.seconds' or '\"text\".bold'.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "Why should a well-designed DSL restrict what it can express rather than being as general as possible?",
    options: [
      "Restricted DSLs compile faster because they have fewer features to implement",
      "Restricted DSLs are cheaper to license from vendors",
      "Restricting expressiveness makes programs easier to analyze, optimize, and validate — if the DSL cannot express loops or side effects, every program terminates and produces deterministic output; a DSL that can express everything is just another general-purpose language with no domain advantage",
      "Restricted DSLs require fewer unit tests",
    ],
    answer: 2,
    explanation:
      "A DSL's power comes from what it cannot do, not what it can. SQL's restriction to declarative set operations (no manual iteration, no mutable state) enables the query optimizer to choose the best execution plan — something impossible if users specified imperative algorithms. Terraform's declarative infrastructure DSL (no general-purpose programming) enables static analysis of infrastructure changes before applying them. CSS's restriction to styling rules (no logic) enables browsers to apply styles independently and efficiently. When a DSL can express arbitrary computation, it loses these analytical advantages and becomes a poorly-designed general-purpose language.",
  },

  // ============================================================
  // Topic 11: External DSLs (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "Why should external DSL design start with concrete examples of desired syntax rather than with grammar formalization?",
    options: [
      "Grammar formalization is too complex for DSL designers",
      "Concrete examples are required by all parser generators",
      "Starting with examples ensures the syntax matches how domain experts think and communicate — working backwards from the desired surface syntax to the grammar keeps the language user-centered, while starting from grammar rules risks creating syntax that is correct but unnatural for the domain",
      "Concrete examples automatically generate the parser without additional work",
    ],
    answer: 2,
    explanation:
      "DSLs are designed for domain experts (network engineers, data analysts, DevOps practitioners) who may not be programmers. Starting with grammar rules (BNF, EBNF) produces syntax that is technically unambiguous and parseable but may feel awkward to users. Starting with examples — 'what do users want to write?' — ensures the language feels natural. For instance, a deployment DSL user might want to write 'deploy myapp to production with 3 replicas' — working backwards from this to a grammar produces a more usable language than starting with abstract grammar rules. Usability testing with domain experts during design catches issues early.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "What is a tree-walking interpreter and when is it sufficient for a DSL?",
    options: [
      "A tree-walking interpreter converts the AST to bytecode before execution",
      "A tree-walking interpreter only works for expression languages, not statement-based DSLs",
      "A tree-walking interpreter recursively traverses the AST, evaluating each node by pattern-matching on its type — it is sufficient for most DSLs because DSL programs are typically small, run infrequently, and prioritize correctness and maintainability over raw execution speed",
      "A tree-walking interpreter requires a virtual machine to run",
    ],
    answer: 2,
    explanation:
      "A tree-walking interpreter has an 'eval' function that recurses over the AST: for a BinaryExpr node, it evaluates the left and right children, then applies the operator; for an IfStmt, it evaluates the condition and executes the appropriate branch. This is the simplest execution strategy — no bytecode, no virtual machine, no compilation. For DSLs like configuration languages (Terraform, Dhall), query languages, or build specifications, programs are small and executed infrequently. The simplicity of a tree-walking interpreter (easy to implement, debug, and extend) outweighs its performance overhead. Only if the DSL involves tight loops or large data processing would compilation to bytecode or native code be necessary.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "How does Protocol Buffers exemplify multi-target code generation from a DSL?",
    options: [
      "Protocol Buffers generate code only for C++ and are then cross-compiled to other languages",
      "Protocol Buffers use a single runtime library that works across all languages",
      "Protocol Buffers define a schema DSL (.proto files) that is compiled by protoc to generate serialization/deserialization code in C++, Java, Python, Go, and many other languages — one schema definition produces type-safe, efficient code for every target language",
      "Protocol Buffers convert all data to JSON for language interoperability",
    ],
    answer: 2,
    explanation:
      "Protocol Buffers is a classic example of a DSL with multi-target code generation. The .proto schema file defines message types, fields, and services in a language-neutral syntax. The protoc compiler has pluggable code generators (plugins) for each target language. From a single 'message User { string name = 1; int32 age = 2; }' definition, protoc generates: a C++ class with getters/setters and binary serialization, a Java class with Builders, a Python class with descriptor metadata, a Go struct with field tags, etc. Each generator produces idiomatic code for its target language while ensuring binary compatibility across all of them.",
  },

  // ============================================================
  // Topic 12: Language Tooling (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "Why was the Language Server Protocol (LSP) created, and what problem did it solve?",
    options: [
      "LSP was created to standardize programming language syntax across all languages",
      "LSP was created to replace language-specific compilers with a universal compiler",
      "Before LSP, each editor needed a custom integration for each language — N editors times M languages required N*M implementations; LSP standardizes the protocol so each language needs one server and each editor needs one client, reducing the effort to N+M",
      "LSP was created to enable programming on mobile devices",
    ],
    answer: 2,
    explanation:
      "Before LSP, adding language support to an editor required building a custom plugin for that specific editor-language combination. VS Code needed separate TypeScript, Python, and Rust plugins; Vim needed separate plugins for the same languages; and so did Emacs, Sublime, etc. With M languages and N editors, this is M*N integrations to build and maintain. LSP defines a standard JSON-RPC protocol for language intelligence operations (completion, hover, go-to-definition, diagnostics). Each language implements one server, each editor implements one LSP client, and any server works with any client — reducing the problem to M+N implementations. This dramatically accelerated language tooling development.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "Why do opinionated formatters like gofmt and Black succeed where configurable formatters often fail?",
    options: [
      "Opinionated formatters produce faster code than configurable ones",
      "Opinionated formatters support more programming languages",
      "By offering zero configuration and one canonical style, opinionated formatters eliminate all style debates — teams don't waste time discussing formatting preferences, code reviews focus on logic not style, and every Go/Python codebase worldwide looks the same, reducing cognitive load when reading unfamiliar code",
      "Opinionated formatters are easier to install and configure",
    ],
    answer: 2,
    explanation:
      "Configurable formatters (like clang-format with its many options) paradoxically reintroduce the problem they're meant to solve — teams spend time debating which configuration to use, and different projects use different configurations, so reading unfamiliar code still requires adjustment. gofmt (Go) was revolutionary: it ships with the language, has zero options, and the entire Go ecosystem uses the same style. 'gofmt's style is no one's favorite, yet gofmt is everyone's favorite.' By removing choice, it eliminates an entire category of unproductive discussions and makes all Go code immediately readable. Python's Black adopted the same philosophy.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "Why do compiler optimizations make source-level debugging difficult?",
    options: [
      "Optimizations change the programming language the code is written in",
      "Optimizations encrypt the generated code for security",
      "Optimizations reorder, eliminate, and duplicate code — inlining merges functions (which instance is the breakpoint in?), dead code elimination removes variables (can't inspect them), and instruction reordering changes the apparent execution order, making source line-to-instruction mapping unreliable",
      "Optimizations disable the debugger to improve performance",
    ],
    answer: 2,
    explanation:
      "At -O0 (no optimization), there's a clean mapping between source lines and machine instructions — each source statement produces a contiguous block of instructions, and variables live in predictable locations. With optimizations: inlining copies a function's code into multiple callers (setting a breakpoint in the function triggers in all copies); dead code elimination removes unused variables (the debugger can't show their values); instruction reordering makes it appear that code executes in a different order than written; and register allocation may reuse a register, making a variable's old value disappear. This is why debug builds use -O0, and why -g with -O2 produces degraded debugging experiences.",
  },

  // ============================================================
  // Topic 13: Modern Compiler Infrastructure (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "How does LLVM enable new programming languages to get production-quality code generation without implementing a compiler backend?",
    options: [
      "LLVM provides a standard library that all languages share",
      "LLVM automatically translates source code without any frontend",
      "Language designers implement a frontend that emits LLVM IR — LLVM then handles optimization, register allocation, instruction selection, and machine code emission for all supported architectures (x86, ARM, RISC-V, etc.), sharing the same industrial-strength backend infrastructure used by Clang, Rust, Swift, and others",
      "LLVM converts all languages to C first, then compiles the C code",
    ],
    answer: 2,
    explanation:
      "Before LLVM, creating a new language with good performance required implementing the entire compilation pipeline including platform-specific code generation — an enormous engineering effort. LLVM's modular architecture separates the frontend (parsing, type checking, IR generation) from the backend (optimization, code generation). A new language only needs to generate LLVM IR, and LLVM handles the rest — the same optimization passes that make Clang's C++ output fast will optimize the new language's IR, and the same x86/ARM/RISC-V code generators will produce efficient machine code. This is why so many languages (Rust, Swift, Julia, Zig, Crystal) use LLVM as their backend.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "Why are WebAssembly binaries from garbage-collected languages (Go, C#) often very large?",
    options: [
      "WebAssembly uses a verbose binary encoding format",
      "Garbage-collected languages produce more instructions than non-GC languages",
      "Wasm currently lacks built-in garbage collection support — languages with GC must include their entire garbage collector runtime in the Wasm module, adding megabytes to the binary size that would normally be provided by the host runtime (JVM, CLR, browser engine)",
      "WebAssembly requires all debug information to be included in the binary",
    ],
    answer: 2,
    explanation:
      "Languages like C and Rust that manage memory manually compile to compact Wasm binaries because they don't need a runtime memory manager. But languages like Go, C#, and Java require a garbage collector, and since Wasm (historically) doesn't provide one, the entire GC implementation must be compiled into the Wasm module. A Go Wasm binary is typically 5-15MB because it includes Go's concurrent garbage collector, goroutine scheduler, and runtime. The Wasm GC proposal (being standardized) adds native GC support to Wasm, allowing GC languages to use the host's garbage collector — dramatically reducing binary sizes and improving interop with the host environment.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "How does GraalVM's Truffle framework turn an AST interpreter into a JIT compiler?",
    options: [
      "Truffle rewrites the interpreter source code to generate machine code",
      "Truffle uses traditional method-based JIT compilation on the interpreter code",
      "Truffle uses partial evaluation — it specializes the interpreter for the specific AST being executed, effectively 'constant-folding away the interpreter' to produce native code that performs the same operations without the interpretive overhead",
      "Truffle converts the AST to LLVM IR and uses LLVM's JIT framework",
    ],
    answer: 2,
    explanation:
      "The key insight behind Truffle is that an AST interpreter is a program that reads the AST and dispatches on node types. If the AST is known (it doesn't change during execution), the interpreter's dispatch logic can be constant-folded away through partial evaluation. For example, if the AST node is 'Add(Var(x), Const(5))', partial evaluation specializes the interpreter's eval() method to produce code equivalent to 'load x; add 5' — no AST traversal, no node type dispatch, no boxing. Truffle also uses self-specializing nodes: an add node starts generic, observes that it always receives integers, and specializes to an integer-add node, enabling further optimization. This approach lets language implementers write a simple interpreter and get JIT performance automatically.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
