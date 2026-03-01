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
  { id: 1, title: 'Core Principles' },
  { id: 2, title: 'Composition & Abstraction' },
  { id: 3, title: 'Type Systems & Categories' },
  { id: 4, title: 'Applied FP' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Core Principles (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'Pure Functions & Referential Transparency',
    part: 1,
    partTitle: 'Core Principles',
    summary:
      'Pure functions are the foundation of functional programming — they always return the same output for the same input and produce no side effects. Referential transparency enables equational reasoning, making programs easier to understand, test, and optimize.',
    concepts: [
      {
        id: 'pure-functions',
        name: 'Pure Functions',
        description:
          'A pure function produces no side effects and its return value depends only on its arguments — given the same inputs, it always returns the same output.',
        keyPoints: [
          'A pure function has no observable side effects — it does not modify external state, perform I/O, throw exceptions, or depend on mutable variables outside its scope',
          'Deterministic output means the function is a mathematical mapping from inputs to outputs — calling add(2, 3) always returns 5 regardless of when, where, or how many times it is called',
          'Pure functions are inherently testable because they require no mocking, setup, or teardown — you simply assert that f(input) === expectedOutput',
          'Compiler optimizations like common subexpression elimination and automatic parallelization are safe on pure functions because the order and frequency of evaluation do not change the result',
          'Pure functions compose naturally — the output of one pure function can be directly fed as input to another without worrying about hidden state interactions',
        ],
        tradeoffs: [
          'Strict purity can be verbose — threading state explicitly through every function call instead of mutating a shared variable requires more parameters and return values',
          'Some operations are inherently impure (reading files, network calls, random numbers) — pure FP languages must use special constructs like monads or effect systems to handle them',
          'Performance-critical inner loops may benefit from local mutation — copying large data structures on every operation can be slower than in-place updates',
        ],
        realWorld: [
          'React pure components and hooks',
          'Redux reducers',
          'Mathematical libraries (e.g., lodash/fp)',
        ],
      },
      {
        id: 'referential-transparency',
        name: 'Referential Transparency',
        description:
          'An expression is referentially transparent if it can be replaced with its value without changing the program\'s behavior — enabling equational reasoning about code.',
        keyPoints: [
          'The substitution model allows you to reason about programs by replacing expressions with their values — if add(2, 3) is referentially transparent, every occurrence of add(2, 3) can be replaced with 5',
          'Equational reasoning means you can prove properties of programs algebraically — composing two functions f and g is the same as applying g then f, regardless of context',
          'Memoization is safe and automatic for referentially transparent expressions because the result is guaranteed to be the same on repeated calls with the same arguments',
          'Referential transparency enables lazy evaluation — since the expression always produces the same result, it does not matter when it is evaluated',
          'Breaking referential transparency (e.g., reading the current time, generating random numbers) makes local reasoning impossible because the expression\'s value depends on hidden context',
        ],
        tradeoffs: [
          'Maintaining referential transparency requires discipline — it is easy to accidentally break by reading global state, performing I/O, or using mutable data structures',
          'Debugging can be harder in some ways because there is no execution trace to step through — the value of an expression does not depend on when it was computed',
        ],
        realWorld: [
          'Haskell\'s entire evaluation model',
          'Nix package manager (reproducible builds)',
          'SQL query optimization (query rewriting)',
        ],
      },
      {
        id: 'side-effects-isolation',
        name: 'Side Effects & Isolation',
        description:
          'Side effects (I/O, mutation, exceptions) are necessary for useful programs but must be isolated and controlled to preserve the benefits of functional purity.',
        keyPoints: [
          'IO isolation pushes side effects to the edges of the program — the core business logic remains pure while a thin impure shell handles I/O, database access, and user interaction',
          'Effect tracking makes side effects explicit in function signatures — Haskell\'s IO monad, Scala\'s ZIO, and algebraic effect systems all encode effects in the type system so the compiler enforces effect boundaries',
          'Controlled impurity means using mutation locally within a function while presenting a pure interface externally — for example, using a mutable array internally for performance but returning an immutable result',
          'The functional core / imperative shell pattern structures applications so that all decisions and transformations happen in pure functions, while the shell orchestrates I/O and passes data to the core',
        ],
        tradeoffs: [
          'Strictly isolating all effects can feel over-engineered in small programs — the overhead of wrapping every I/O operation in a monad or effect type adds ceremony',
          'Mixing paradigms (pure core with imperative shell) requires clear architectural boundaries — without discipline the impure shell can grow and absorb logic that should be pure',
          'Effect systems add a learning curve and can make type signatures complex — a function returning IO[Either[Error, Result]] is harder to read than one returning Result',
        ],
        realWorld: [
          'Haskell IO monad',
          'Elm architecture (Model-Update-View)',
          'React useEffect (separating effects from rendering)',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Immutability & Persistent Data Structures',
    part: 1,
    partTitle: 'Core Principles',
    summary:
      'Immutable data cannot be changed after creation — any "update" produces a new value, leaving the original intact. Persistent data structures make this efficient through structural sharing, enabling safe concurrency and simpler reasoning.',
    concepts: [
      {
        id: 'immutable-data',
        name: 'Immutable Data',
        description:
          'Immutable values cannot be modified after creation — instead of changing a value in place, you create a new value with the desired changes.',
        keyPoints: [
          'Value semantics mean that two immutable values with the same content are interchangeable — there is no distinction between identity and equality, eliminating aliasing bugs',
          'Defensive copying becomes unnecessary with immutable data — you can freely share references without worrying that another part of the program will mutate the data underneath you',
          'Structural sharing allows new versions to reuse most of the old structure — changing one element in a list of 1000 creates a new list that shares 999 elements with the old one',
          'Thread safety is automatic — immutable data can be shared across threads without locks, atomic operations, or synchronized blocks because no thread can modify it',
          'Undo/redo and time-travel debugging are trivial with immutable data — you simply keep references to previous versions instead of tracking and reversing mutations',
        ],
        tradeoffs: [
          'Naive immutability (deep copying on every change) has O(n) overhead per update — persistent data structures mitigate this but add complexity',
          'Languages without built-in support (JavaScript, Python) require libraries or conventions to enforce immutability — Object.freeze is shallow and does not prevent deep mutation',
          'Garbage collection pressure increases because short-lived intermediate values are created frequently — GC-tuned runtimes (JVM, V8) handle this well but it can affect latency-sensitive applications',
        ],
        realWorld: [
          'Clojure\'s default data structures',
          'Immer.js (structural sharing in JavaScript)',
          'Redux state management',
        ],
      },
      {
        id: 'persistent-data-structures',
        name: 'Persistent Data Structures',
        description:
          'Persistent data structures preserve previous versions when modified — the old version remains accessible and unmodified while the new version shares as much structure as possible.',
        keyPoints: [
          'Hash Array Mapped Tries (HAMTs) provide near-O(1) lookup, insert, and update by using a 32-way branching trie indexed by hash code — Clojure\'s persistent vectors and maps are HAMTs',
          'Path copying creates a new path from the root to the modified node while sharing all other subtrees — updating one element in a tree of depth d creates only d new nodes',
          'Clojure\'s persistent vectors use a 32-way trie of depth up to 7, giving effectively O(1) access (at most 7 pointer dereferences for collections up to 32^7 = ~34 billion elements)',
          'Persistent data structures enable efficient versioning — git\'s internal data model is a persistent tree where each commit shares most of its tree with the parent commit',
        ],
        tradeoffs: [
          'Constant factors are higher than mutable arrays — a HAMT lookup requires multiple pointer dereferences and hash computations versus a single array index',
          'Cache performance suffers compared to contiguous mutable arrays — tree nodes are scattered in memory, causing more cache misses on modern CPUs',
          'Implementation complexity is significant — building correct and efficient persistent data structures requires deep knowledge of trees, hashing, and memory management',
        ],
        realWorld: [
          'Clojure persistent vectors and maps',
          'Scala immutable collections',
          'Git\'s content-addressable object store',
        ],
      },
      {
        id: 'copy-on-write',
        name: 'Copy-on-Write & Structural Sharing',
        description:
          'Copy-on-write defers copying until a mutation is actually needed, while structural sharing allows new versions of data structures to reuse unchanged portions of the old version.',
        keyPoints: [
          'Copy-on-write (COW) starts with a shared reference and only creates a copy when a write operation occurs — reads are zero-cost because they access the original data directly',
          'Structural sharing means that updating a single field in a deeply nested object only recreates the path from root to the changed node — sibling subtrees are shared by reference',
          'Memory efficiency of structural sharing means that N versions of a data structure with small changes between versions use O(N * change_size) memory instead of O(N * total_size)',
          'Garbage collection reclaims unreachable old versions automatically — versions that are no longer referenced are collected, so memory usage stays proportional to live versions',
          'Performance characteristics depend on the branching factor — higher branching (e.g., 32-way) gives shallower trees and fewer allocations per update but worse cache locality per node',
        ],
        tradeoffs: [
          'COW can cause unexpected latency spikes — a write that triggers a deep copy may be much slower than surrounding reads, leading to unpredictable performance',
          'Reference counting for COW (as in Swift) adds overhead to every copy and destroy operation — though it avoids GC pauses',
          'Structural sharing requires immutable nodes — you cannot mix mutable children with structurally shared parents without risking corruption of shared state',
        ],
        realWorld: [
          'Swift\'s Array and String types (COW)',
          'Immer.js produce() function',
          'Linux kernel fork() (COW pages)',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'First-Class & Higher-Order Functions',
    part: 1,
    partTitle: 'Core Principles',
    summary:
      'Functions as first-class values can be passed as arguments, returned from other functions, and stored in data structures. Higher-order functions take or return functions, enabling powerful abstractions like map, filter, and reduce.',
    concepts: [
      {
        id: 'first-class-functions',
        name: 'First-Class Functions',
        description:
          'In languages with first-class functions, functions are values — they can be assigned to variables, passed as arguments, returned from other functions, and stored in data structures.',
        keyPoints: [
          'Functions as values means a function is no different from an integer or a string — you can store it in a variable, put it in an array, or pass it to another function as an argument',
          'Callbacks are first-class functions passed to other functions to be called later — event handlers, comparators for sorting, and middleware in web frameworks are all callback patterns',
          'Function references allow passing existing named functions without wrapping them — in JavaScript, array.map(parseInt) passes the parseInt function directly to map',
          'First-class functions enable the strategy pattern without classes — you swap behavior by passing different functions rather than creating subclasses',
          'Anonymous functions (lambdas) are first-class function literals created inline — they avoid naming trivial one-off functions and keep behavior close to where it is used',
        ],
        tradeoffs: [
          'Passing functions around can make control flow harder to trace — when a callback is defined far from where it is called, understanding the execution path requires jumping between locations',
          'Type signatures for higher-order functions can become complex — a function that takes a function that takes a function requires nested arrow types that are hard to read',
        ],
        realWorld: [
          'JavaScript callbacks and event handlers',
          'Python decorators and key functions',
          'Java 8+ lambda expressions and method references',
        ],
      },
      {
        id: 'higher-order-functions',
        name: 'Higher-Order Functions',
        description:
          'A higher-order function (HOF) takes one or more functions as arguments or returns a function as its result — enabling abstraction over actions, not just data.',
        keyPoints: [
          'map/filter/reduce are the canonical HOFs — map transforms each element, filter selects elements matching a predicate, and reduce (fold) accumulates elements into a single result',
          'Function factories are HOFs that return new functions configured by their arguments — a createMultiplier(n) function returns a new function that multiplies its argument by n',
          'Decorators (wrappers) are HOFs that take a function and return an enhanced version — adding logging, timing, memoization, or retry logic without modifying the original function',
          'HOFs replace many OOP design patterns — strategy, template method, observer, and command patterns all reduce to passing functions in FP',
        ],
        tradeoffs: [
          'Deep nesting of HOFs can be hard to read — compose(map(f), filter(g), reduce(h)) requires reading inside-out and understanding each layer',
          'Performance overhead from function call indirection and closure allocation — tight loops with HOFs may be slower than equivalent imperative code due to per-element function calls and potential inability to inline',
          'Debugging stack traces through multiple HOF layers can be confusing — anonymous functions appear as <anonymous> in stack traces without clear context',
        ],
        realWorld: [
          'Array.map/filter/reduce in JavaScript',
          'Express.js middleware chains',
          'React higher-order components (withRouter, connect)',
        ],
      },
      {
        id: 'closures-lexical-scope',
        name: 'Closures & Lexical Scope',
        description:
          'A closure is a function that captures and remembers variables from its enclosing lexical scope, even after the outer function has returned.',
        keyPoints: [
          'Captured variables (free variables) are variables used in the function body but defined in an outer scope — the closure retains a reference to these variables, keeping them alive beyond the outer function\'s lifetime',
          'Closure-based encapsulation creates private state without classes — a function returning a closure that increments and returns a counter creates a private counter variable accessible only through the closure',
          'Partial application uses closures to fix some arguments of a function and return a new function expecting the remaining arguments — add(a)(b) where add(a) returns a closure that adds a to its argument',
          'Closures over mutable variables can cause bugs — the classic loop-and-closure problem in JavaScript where all closures share the same loop variable unless properly scoped with let or an IIFE',
          'Memory implications: closures keep their captured scope alive — if a closure captures a large object, that object cannot be garbage collected until the closure itself is collected',
        ],
        tradeoffs: [
          'Closures can cause memory leaks when they unintentionally capture large objects or DOM references — especially in long-lived event handlers or callbacks',
          'Reasoning about closure behavior with mutable captured variables requires understanding when and how the variable is shared versus copied',
          'Closures make serialization difficult — you cannot easily serialize a closure because it includes captured state from its creation context',
        ],
        realWorld: [
          'JavaScript module pattern (IIFE closures)',
          'React hooks (useState, useCallback)',
          'Python decorators capturing function arguments',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Recursion & Tail Call Optimization',
    part: 1,
    partTitle: 'Core Principles',
    summary:
      'Recursion is the primary looping mechanism in functional programming — a function calls itself with a modified argument until reaching a base case. Tail call optimization prevents stack overflow by reusing the current stack frame for recursive calls in tail position.',
    concepts: [
      {
        id: 'recursive-thinking',
        name: 'Recursive Thinking',
        description:
          'Recursion decomposes a problem into a base case (trivially solvable) and a recursive case that reduces toward the base case — it is the natural way to process recursive data structures like trees and lists.',
        keyPoints: [
          'Base case / recursive case structure: every recursive function must have at least one base case that returns without recursion and at least one recursive case that makes progress toward a base case',
          'Divide and conquer splits a problem into smaller independent subproblems, solves each recursively, and combines the results — merge sort divides the array in half, sorts each half recursively, then merges',
          'Recursive data structures (lists, trees, JSON) are naturally processed with recursive functions — the structure of the function mirrors the structure of the data',
          'Mutual recursion occurs when two or more functions call each other — isEven(n) calls isOdd(n-1) which calls isEven(n-1), useful for parsing alternating grammar rules',
          'Stack depth limits: each recursive call adds a frame to the call stack — deep recursion (thousands of levels) can cause stack overflow in languages without tail call optimization',
        ],
        tradeoffs: [
          'Recursion can be less efficient than iteration due to function call overhead and stack frame allocation — though compilers often optimize tail recursion into loops',
          'Deep recursion risks stack overflow — processing a linked list of 1 million elements recursively requires 1 million stack frames without TCO',
          'Recursive solutions can be harder to trace mentally for developers accustomed to imperative loops — building intuition requires practice with the substitution model',
        ],
        realWorld: [
          'Tree traversal (DOM, file systems, ASTs)',
          'Parsing recursive grammars (JSON, HTML)',
          'Merge sort and quicksort algorithms',
        ],
      },
      {
        id: 'tail-call-optimization',
        name: 'Tail Call Optimization',
        description:
          'Tail call optimization (TCO) allows recursive functions whose last action is a recursive call to reuse the current stack frame, converting recursion into a loop and preventing stack overflow.',
        keyPoints: [
          'Tail position means the recursive call is the very last operation — nothing is done with the result after the call returns. sum(n, acc) = sum(n-1, acc+n) is tail recursive; sum(n) = n + sum(n-1) is NOT because addition happens after the call',
          'The accumulator pattern transforms non-tail recursive functions into tail recursive ones by passing an accumulating parameter — factorial(n, acc=1) where acc carries the running product',
          'TCO guarantees vary by language — Scheme requires TCO by specification, Haskell and Erlang guarantee it, Scala has @tailrec annotation, JavaScript ES6 specifies it but most engines do not implement it, Java and Python do not support TCO at all',
          'When TCO is applied, the recursive function runs in O(1) stack space instead of O(n) — the compiler replaces the recursive call with a jump instruction, identical to a while loop',
        ],
        tradeoffs: [
          'Converting to tail-recursive form with accumulators can make the function less readable — the accumulator parameter is an implementation detail that obscures the algorithm\'s intent',
          'Lack of TCO in some languages (Python, Java, most JavaScript engines) means you cannot rely on recursion for large inputs — you must use explicit iteration or trampolining instead',
          'TCO eliminates stack frames, making debugging harder — the call stack no longer shows the recursion history, so you cannot inspect intermediate states',
        ],
        realWorld: [
          'Erlang/Elixir server loops (recursive processes)',
          'Scheme implementations (R5RS requires TCO)',
          'Scala @tailrec annotation',
        ],
      },
      {
        id: 'trampolining-cps',
        name: 'Trampolining & Continuation-Passing Style',
        description:
          'Trampolining and CPS are techniques to achieve stack-safe recursion in languages without tail call optimization — they convert recursive calls into data structures or explicit continuations.',
        keyPoints: [
          'A trampoline is a loop that repeatedly calls thunks (zero-argument functions) — instead of making a recursive call, the function returns a thunk wrapping the next call, and the trampoline loop invokes it, keeping stack depth at O(1)',
          'Continuation-Passing Style (CPS) transforms a function so that instead of returning a value, it takes an extra argument (the continuation) — a function representing "what to do next" with the result',
          'CPS transforms make control flow explicit — every function call becomes a tail call to its continuation, enabling TCO even for non-tail-recursive algorithms',
          'Thunks (deferred computations) wrap a computation in a zero-argument function to delay its execution — trampolines use thunks to represent "the next step" without actually executing it on the call stack',
        ],
        tradeoffs: [
          'CPS-transformed code is significantly harder to read — the natural flow of computation is inverted, with every return value passed to a callback instead of being returned directly',
          'Trampolining adds overhead from creating thunk objects on every iteration and invoking them through the trampoline loop — this is slower than native TCO but prevents stack overflow',
          'Library support is required — JavaScript does not have built-in trampolines, so you need a library or manual implementation',
        ],
        realWorld: [
          'Free monads in Scala/Haskell (CPS-based interpretation)',
          'clojure.core/trampoline',
          'Async/await (CPS transformation by the compiler)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Composition & Abstraction (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'Function Composition & Pipelines',
    part: 2,
    partTitle: 'Composition & Abstraction',
    summary:
      'Function composition combines simple functions into complex transformations — pipe(f, g, h) creates a new function that applies f, then g, then h. Pipelines and currying make composition ergonomic and readable.',
    concepts: [
      {
        id: 'function-composition',
        name: 'Function Composition',
        description:
          'Function composition combines two or more functions into a new function where the output of one becomes the input of the next — compose(f, g)(x) equals f(g(x)).',
        keyPoints: [
          'compose(f, g) applies g first then f (right to left), while pipe(f, g) applies f first then g (left to right) — pipe matches the natural reading order and is generally preferred for readability',
          'Pointfree (tacit) style defines functions without mentioning their arguments — const getUpperNames = pipe(map(getName), map(toUpper)) instead of const getUpperNames = (xs) => xs.map(getName).map(toUpper)',
          'Composition laws from category theory: associativity — compose(f, compose(g, h)) === compose(compose(f, g), h) — and identity — compose(f, identity) === f',
          'Type safety in composition requires that the output type of each function matches the input type of the next — TypeScript generics can enforce this at compile time',
          'Small, focused functions compose better than large monolithic ones — composition encourages breaking programs into tiny reusable units that each do one thing',
        ],
        tradeoffs: [
          'Pointfree style can become unreadable when taken too far — deeply nested compositions without named intermediate values hide what the data looks like at each step',
          'Debugging composed pipelines is harder because there are no intermediate variables to inspect — inserting a tap(console.log) between steps is the common workaround',
          'Type inference can struggle with long composition chains — TypeScript may require explicit type annotations to resolve ambiguous composed types',
        ],
        realWorld: [
          'Unix pipes (ls | grep | sort)',
          'Ramda.js compose/pipe',
          'RxJS operator pipelines',
        ],
      },
      {
        id: 'currying-partial-application',
        name: 'Currying & Partial Application',
        description:
          'Currying transforms a function of multiple arguments into a sequence of single-argument functions. Partial application fixes some arguments of a function, producing a new function with fewer parameters.',
        keyPoints: [
          'A curried function add(a)(b) returns a new function for each argument — add(3) returns a function that adds 3 to its argument, enabling reuse as const add3 = add(3)',
          'Auto-currying (as in Ramda, Haskell) automatically curries functions — you can call them with all arguments at once or supply them one at a time, and the library handles the rest',
          'Section syntax in Haskell allows partial application of infix operators — (*2) is a function that doubles its argument, (10/) divides 10 by its argument',
          'Currying and composition work together — curried functions produce single-argument functions that compose naturally with pipe/compose',
          'Partial application differs from currying — partial application can fix any subset of arguments (not just left-to-right), while currying always processes arguments one at a time from left to right',
        ],
        tradeoffs: [
          'Currying adds function call overhead — each argument creates a new closure, which is slower than a single multi-argument call in performance-critical paths',
          'Auto-currying can make it unclear whether a function has been fully or partially applied — TypeScript cannot always distinguish between "called with fewer args" and "called with all args returning a function"',
          'Argument order matters more with currying — the data argument should be last so you can partially apply the configuration arguments first (data-last convention)',
        ],
        realWorld: [
          'Haskell (all functions are curried by default)',
          'Ramda.js (auto-curried utility library)',
          'Scala (multiple parameter lists)',
        ],
      },
      {
        id: 'pipeline-operators',
        name: 'Pipeline Operators & Chaining',
        description:
          'Pipeline operators and method chaining provide readable left-to-right syntax for applying a sequence of transformations to data — making data flow explicit and reducing nesting.',
        keyPoints: [
          'Method chaining (fluent interfaces) returns `this` from each method, allowing calls like array.filter(f).map(g).reduce(h) — each method returns a new transformed collection',
          'The pipe operator (|> in Elixir, F#, proposed for JavaScript) passes the left-hand value as the argument to the right-hand function — x |> f |> g reads as "x, then f, then g"',
          'Transducers compose transformations without creating intermediate collections — instead of array.map(f).filter(g).map(h) creating three intermediate arrays, a transducer fuses the operations into a single pass',
          'Pipeline-style code reads top-to-bottom like a recipe — each step clearly shows what transformation is applied, making the data flow through the program visible and auditable',
        ],
        tradeoffs: [
          'Method chaining requires the object to support all desired operations — you cannot chain arbitrary functions, only methods defined on the return type',
          'Transducers are more complex to understand and implement — the performance benefit is only significant for large collections with many transformation steps',
          'The JavaScript pipe operator proposal (|>) has been in TC39 for years without reaching Stage 4 — relying on it requires a Babel plugin or alternative syntax',
        ],
        realWorld: [
          'Elixir |> pipe operator',
          'F# pipeline operator',
          'Java Stream API (stream().map().filter().collect())',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Algebraic Data Types',
    part: 2,
    partTitle: 'Composition & Abstraction',
    summary:
      'Algebraic data types (ADTs) model data as combinations of products (AND — records/tuples) and sums (OR — tagged unions). Combined with pattern matching, ADTs enable exhaustive, type-safe handling of all possible cases.',
    concepts: [
      {
        id: 'sum-types',
        name: 'Sum Types',
        description:
          'A sum type (tagged union / discriminated union) represents a value that can be one of several variants — each variant can carry different data, and the type system ensures all cases are handled.',
        keyPoints: [
          'Tagged unions encode "A or B or C" — a Shape type might be Circle(radius) | Rectangle(width, height) | Triangle(a, b, c), and a value is exactly one of these at any time',
          'Discriminated unions in TypeScript use a literal discriminant field — { kind: "circle", radius: number } | { kind: "rect", width: number, height: number } — and TypeScript narrows the type based on the discriminant',
          'Option/Maybe represents the presence or absence of a value — Some(value) | None replaces null/undefined with a type-safe alternative that forces you to handle the missing case',
          'Either/Result represents success or failure — Right(value) | Left(error) or Ok(value) | Err(error) makes error handling explicit in the type system rather than relying on thrown exceptions',
          'Sum types make illegal states unrepresentable — instead of a User with nullable fields that must be checked at runtime, you define LoggedIn(user) | Guest where each variant carries exactly the data it needs',
        ],
        tradeoffs: [
          'Languages without native sum types (Java, older TypeScript) require verbose workarounds — visitor patterns, sealed interfaces, or manual discriminant fields',
          'Adding a new variant to a sum type requires updating every pattern match — this is intentional (forces exhaustive handling) but can be a maintenance burden in large codebases',
          'Deep nesting of sum types (Option<Either<A, B>>) can become unwieldy — monadic operations (flatMap) help but add abstraction overhead',
        ],
        realWorld: [
          'Rust Result<T, E> and Option<T>',
          'TypeScript discriminated unions',
          'Haskell Maybe and Either types',
        ],
      },
      {
        id: 'product-types',
        name: 'Product Types',
        description:
          'A product type combines multiple values together — tuples, records, and structs are all product types where a value contains ALL of the specified fields simultaneously.',
        keyPoints: [
          'Tuples are anonymous product types — (Int, String, Bool) is a product of three types, and a value must provide all three, with access by position (._1, ._2, ._3)',
          'Records (structs) are named product types — { name: string, age: number } gives each field a name, improving readability and enabling access by name rather than position',
          'Named fields prevent the "boolean blindness" problem — createUser(true, false, true) is unclear, but createUser({ admin: true, active: false, verified: true }) is self-documenting',
          'The cardinality of a product type is the product of its fields\' cardinalities — a type with a Bool (2 values) and a Weekday (7 values) has 2 * 7 = 14 possible values',
        ],
        tradeoffs: [
          'Tuples with many elements become positionally confusing — (String, String, Int, String) provides no indication of which String is which; records are preferred for 3+ fields',
          'Product types with many fields can lead to "constructor bloat" — creating a value requires providing all fields, which is verbose without builder patterns or default values',
          'Flat product types lose hierarchical relationships — when modeling complex domains, nested product types (records of records) better capture the structure but add depth',
        ],
        realWorld: [
          'TypeScript interfaces and type aliases',
          'Python dataclasses and named tuples',
          'Rust structs',
        ],
      },
      {
        id: 'pattern-matching',
        name: 'Pattern Matching',
        description:
          'Pattern matching destructures values and dispatches based on their shape — it combines conditional logic, destructuring, and variable binding in a single construct with compile-time exhaustiveness checking.',
        keyPoints: [
          'Destructuring extracts values from data structures — matching Circle(r) binds the radius to r and Rectangle(w, h) binds width and height, eliminating manual field access',
          'Exhaustiveness checking ensures every possible case is handled — if you add a Triangle variant to Shape, the compiler flags every match expression that does not handle Triangle',
          'Guards and when clauses add boolean conditions to patterns — match value { x if x > 0 => "positive", x if x < 0 => "negative", _ => "zero" } combines structural and conditional matching',
          'Nested patterns match deeply into data structures — matching Some(Ok((x, y))) extracts x and y from a value nested inside Option and Result types in a single expression',
          'Wildcard patterns (_) match anything without binding — they serve as catch-all branches and explicitly indicate that a value is intentionally ignored',
        ],
        tradeoffs: [
          'Pattern matching can encourage long match expressions — a match with 15 branches may be better refactored into a lookup table or strategy pattern',
          'Languages without native pattern matching (JavaScript, Java) require libraries or verbose if-else chains — destructuring assignment covers some but not all use cases',
          'Exhaustiveness checking only works with closed sum types — open type hierarchies (class inheritance) cannot be exhaustively checked because new subclasses can always be added',
        ],
        realWorld: [
          'Rust match expressions',
          'Scala pattern matching with case classes',
          'Elixir function clause matching',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Functors & Applicatives',
    part: 2,
    partTitle: 'Composition & Abstraction',
    summary:
      'Functors and applicatives are abstractions for applying functions to wrapped values — functors apply a single-argument function inside a context, while applicatives extend this to multi-argument functions and independent computations.',
    concepts: [
      {
        id: 'functors',
        name: 'Functors',
        description:
          'A functor is a type that can be mapped over — it provides a map (fmap) operation that applies a function to the value(s) inside the functor while preserving the functor\'s structure.',
        keyPoints: [
          'map/fmap applies a function inside a context without unwrapping it — Array.map(f) applies f to each element, Option.map(f) applies f to the contained value if it exists, or returns None if it does not',
          'Functor law 1 (identity): mapping the identity function over a functor returns the functor unchanged — F.map(x => x) === F',
          'Functor law 2 (composition): mapping two functions sequentially equals mapping their composition — F.map(f).map(g) === F.map(x => g(f(x)))',
          'Lifting functions: a functor "lifts" a function from the plain value domain into the functor domain — if f: A -> B, then map(f): F<A> -> F<B> where F is the functor',
          'Common functors include arrays, Option/Maybe, Either, Promises, trees, and event streams — any type with a lawful map operation is a functor',
        ],
        tradeoffs: [
          'Functors only handle single-argument functions — applying a function of two arguments to two functors requires applicatives or monads',
          'The functor abstraction is so general that knowing something is a functor tells you very little about its specific behavior — the power comes from the laws it obeys, not its interface',
          'Nested functors (Option<Array<T>>) require multiple map calls — map(map(f)) to reach the inner value, which can be unwieldy without monad transformers',
        ],
        realWorld: [
          'Array.map in every language',
          'Promise.then (partial functor)',
          'React.Children.map',
        ],
      },
      {
        id: 'applicative-functors',
        name: 'Applicative Functors',
        description:
          'An applicative functor extends functors with the ability to apply a function wrapped in a context to a value wrapped in a context — enabling multi-argument function application and independent computations.',
        keyPoints: [
          'apply/ap takes a functor containing a function and a functor containing a value, and produces a functor containing the result — Some(add3).ap(Some(5)) produces Some(8)',
          'Independent computations can be combined with applicatives — validating a form\'s name, email, and age fields independently and combining all errors, rather than short-circuiting on the first error (as monads do)',
          'Validation with applicatives accumulates errors — Either used as an applicative collects all validation failures into a list, while monadic Either stops at the first failure',
          'Applicatives sit between functors and monads in power — they can apply multi-argument functions to independent wrapped values but cannot use the result of one computation to decide the next',
        ],
        tradeoffs: [
          'Applicatives cannot express sequential dependencies — if the second computation depends on the result of the first, you need a monad; applicatives only handle independent computations',
          'The abstraction can be confusing — understanding when to use applicative versus monad requires grasping the difference between independent and dependent computations',
          'Syntax support varies by language — Haskell has <*> and do-notation, but most languages require verbose method chains for applicative usage',
        ],
        realWorld: [
          'Form validation (accumulating all errors)',
          'Haskell parsec (parallel parsing alternatives)',
          'Concurrent API calls (independent requests)',
        ],
      },
      {
        id: 'traversable-foldable',
        name: 'Traversable & Foldable',
        description:
          'Traversable structures can be traversed while applying an effectful function, turning a structure of effects inside out. Foldable structures can be reduced to a single summary value.',
        keyPoints: [
          'sequence/traverse flips nested structures — traverse turns Array<Option<T>> into Option<Array<T>>, succeeding only if every element is Some and collecting all values',
          'Folding abstractions generalize reduction — foldLeft and foldRight accumulate a result by processing each element with a combining function, and many operations (sum, max, toList) are special cases of fold',
          'traverse combines map and sequence — traverse(f, list) maps f over the list (producing effects) and then sequences the effects, doing both in a single pass',
          'Accumulating results with traverse is useful for batch operations — traversing a list of user IDs with a fetchUser function produces either all users (if all fetches succeed) or an error',
        ],
        tradeoffs: [
          'Traversable requires the inner type to be an applicative — you can only traverse into applicative functors, which may limit what effects you can use',
          'Fold is very general but can be hard to reason about — a left fold processes elements from start to end (often more efficient), while a right fold processes end to start (better for lazy evaluation and building lists)',
          'The distinction between traverse and sequence is subtle — traverse is sequence composed with map, and in practice you usually want traverse because you are both transforming and sequencing',
        ],
        realWorld: [
          'Promise.all (traverse for Promises)',
          'Haskell mapM / sequence',
          'Scala Future.traverse for concurrent operations',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Type Systems & Categories (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'Monads',
    part: 3,
    partTitle: 'Type Systems & Categories',
    summary:
      'Monads are the fundamental abstraction for sequencing computations with effects in functional programming. They provide bind (flatMap) to chain operations that produce wrapped values, enabling sequential composition where each step can depend on the previous result.',
    concepts: [
      {
        id: 'monad-fundamentals',
        name: 'Monad Fundamentals',
        description:
          'A monad provides two operations — return (of/pure) to wrap a value, and bind (flatMap/chain/>>=) to sequence computations — satisfying three laws that ensure consistent behavior.',
        keyPoints: [
          'bind/flatMap/chain takes a monadic value M<A> and a function A -> M<B>, unwraps the A, applies the function, and returns M<B> — this is what distinguishes monads from functors, which cannot flatten nested layers',
          'return/of/pure wraps a plain value into the monadic context — Option.of(5) creates Some(5), Array.of(5) creates [5], Promise.resolve(5) creates a resolved Promise',
          'Left identity law: return(a).flatMap(f) === f(a) — wrapping a value and immediately flatMapping is the same as applying the function directly',
          'Right identity law: m.flatMap(return) === m — flatMapping with the wrapping function returns the original monad unchanged',
          'Associativity law: m.flatMap(f).flatMap(g) === m.flatMap(x => f(x).flatMap(g)) — the order of grouping does not matter, only the order of operations',
        ],
        tradeoffs: [
          'Monads introduce a learning curve — the abstract nature of monads (a design pattern for sequencing effects) is notoriously difficult to explain and understand initially',
          'Monadic code can be verbose without syntactic sugar — chaining multiple flatMaps creates deeply nested callbacks without do-notation or for-comprehensions',
          'Monads do not compose freely — combining two different monads (e.g., Option and Either) requires monad transformers, which add complexity',
        ],
        realWorld: [
          'Promise.then in JavaScript (approximate monad)',
          'Rust\'s ? operator (Result monad)',
          'Haskell do-notation',
        ],
      },
      {
        id: 'common-monads',
        name: 'Common Monads',
        description:
          'Different monads capture different computational effects — Maybe/Option handles absence, Either/Result handles errors, IO handles side effects, State threads mutable state, Reader provides shared configuration, and Writer accumulates logs.',
        keyPoints: [
          'Maybe/Option monad: flatMap propagates None — if any step in a chain produces None, the entire chain short-circuits to None without executing subsequent steps',
          'Either/Result monad: flatMap propagates errors — Left/Err short-circuits the chain, carrying the error to the end. This replaces try/catch with explicit, composable error handling',
          'IO monad: represents a computation that performs side effects — the computation is described as a value (a recipe) that is only executed at the program\'s edge, keeping the core pure',
          'State monad: threads state through a computation — each step receives the current state and returns a new state along with a result, without using mutable variables',
          'Reader monad: provides shared read-only configuration — each step can access the environment (database connection, config object) without passing it explicitly through every function call',
        ],
        tradeoffs: [
          'Each monad requires understanding its specific semantics — Maybe short-circuits on None, Either short-circuits on Left, IO defers execution, State threads a value — the unified interface hides very different behaviors',
          'Stacking monads (Reader inside Either inside IO) requires monad transformers (ReaderT, EitherT) which add complexity and can degrade performance',
          'Not all effects fit neatly into a single monad — real programs often need multiple effects simultaneously, motivating effect systems as an alternative to monad stacking',
        ],
        realWorld: [
          'Rust Option<T> and Result<T, E>',
          'Haskell IO, State, Reader, Writer',
          'fp-ts Option, Either, TaskEither in TypeScript',
        ],
      },
      {
        id: 'do-notation',
        name: 'Do-Notation & For-Comprehensions',
        description:
          'Do-notation (Haskell) and for-comprehensions (Scala) provide syntactic sugar that makes monadic code look like imperative sequential code — each line can depend on the results of previous lines.',
        keyPoints: [
          'Syntactic sugar transforms sequential-looking code into nested flatMap calls — "do { x <- getInput; y <- process(x); return (x, y) }" desugars to getInput.flatMap(x => process(x).flatMap(y => return (x, y)))',
          'Desugaring to flatMap/map means every <- is a flatMap and the final expression is a map — understanding the desugaring is essential for debugging and writing correct monadic code',
          'Monadic control flow enables writing effectful code in a familiar imperative style — early returns (via Maybe/Either short-circuiting), loops (via list monad), and error handling all work naturally within do-blocks',
          'For-comprehensions in Scala use for/yield syntax — "for { x <- xs; y <- ys; if x > y } yield (x, y)" combines flatMap, map, and withFilter',
          'Effect inference: the monad of the do-block is determined by the monadic values used inside — a do-block with IO actions runs in IO, one with Maybe values runs in Maybe',
        ],
        tradeoffs: [
          'Do-notation can obscure the monadic nature of the code — developers may write it without understanding the underlying flatMap chain, leading to confusion when the sugar breaks down',
          'Not all languages support do-notation — JavaScript and TypeScript require libraries (fp-ts Do, Effect) or generator-based emulation to approximate it',
          'Mixing different monads within a do-block does not work directly — you need monad transformers or effect systems to combine multiple monadic effects',
        ],
        realWorld: [
          'Haskell do-notation for IO, Maybe, Either',
          'Scala for-comprehensions',
          'Effect-ts gen/Do in TypeScript',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Type Systems & Type Inference',
    part: 3,
    partTitle: 'Type Systems & Categories',
    summary:
      'Type systems classify values and expressions to prevent entire categories of bugs at compile time. Hindley-Milner type inference automatically deduces types without annotations, while advanced type features enable precise modeling of program behavior.',
    concepts: [
      {
        id: 'static-type-systems',
        name: 'Static Type Systems',
        description:
          'Static type systems check types at compile time, catching errors before the program runs. Hindley-Milner type inference automatically deduces the most general type of every expression.',
        keyPoints: [
          'Hindley-Milner (HM) type inference determines the principal (most general) type of every expression without any annotations — the type of "map f xs" is inferred from the types of f and xs alone',
          'Type inference uses unification — when the compiler encounters an expression, it generates type equations and solves them by finding the most general substitution that makes all equations consistent',
          'Type annotations serve as documentation and error localization — while HM can infer everything, explicit annotations help both humans and the compiler pinpoint type errors faster',
          'Type soundness guarantees that well-typed programs do not get stuck — if the type checker accepts a program, it will not produce a type error at runtime (modulo escape hatches like unsafe casts)',
          'Bidirectional type checking (used in TypeScript, Scala 3) combines inference (bottom-up) with checking (top-down) — complex expressions infer their type, while annotations propagate types downward to resolve ambiguity',
        ],
        tradeoffs: [
          'Full HM inference can produce confusing error messages — when unification fails deep inside a large expression, the reported error location may be far from the actual mistake',
          'Type inference has limits — higher-rank polymorphism, GADTs, and type classes often require explicit annotations because the principal type is not always computable',
          'Static types add a compilation step — rapid prototyping may feel slower compared to dynamically typed languages where you can run partial programs immediately',
        ],
        realWorld: [
          'Haskell\'s type inference engine',
          'OCaml/ReasonML type inference',
          'TypeScript structural type inference',
        ],
      },
      {
        id: 'parametric-polymorphism',
        name: 'Parametric Polymorphism',
        description:
          'Parametric polymorphism (generics) allows functions and data types to work uniformly over all types — a function identity<T>(x: T): T works for any type T without knowing what T is.',
        keyPoints: [
          'Generics abstract over types — List<T> is a list that works for any element type T, and you only write the list operations once',
          'Type variables (T, A, B) stand for unknown types — a function map<A, B>(f: A => B, list: List<A>): List<B> transforms elements without knowing their concrete types',
          'Parametricity and free theorems: a function with type T -> T can ONLY be the identity function — the type alone, without looking at the implementation, guarantees this because the function cannot inspect or create values of an unknown type T',
          'Free theorems derive from parametricity — for any function with type List<A> -> List<A>, the function can only rearrange, duplicate, or drop elements; it cannot create new elements of type A because A is abstract',
          'Bounded polymorphism (type constraints) restricts type variables — <T extends Comparable<T>> allows the function to use comparison operations on T, trading universality for capability',
        ],
        tradeoffs: [
          'Parametric polymorphism alone cannot express ad-hoc behavior — you need type classes or interfaces to dispatch different implementations for different types',
          'Generic code can be harder to understand — seeing f<A, B, C>(a: A, g: (B) => C): C tells you the types but not the intent without good naming',
          'Generics interact complexly with variance — List<Dog> may or may not be a subtype of List<Animal> depending on whether List is covariant, contravariant, or invariant',
        ],
        realWorld: [
          'Java/TypeScript generics',
          'Haskell parametric polymorphism (forall a. a -> a)',
          'Rust generics with trait bounds',
        ],
      },
      {
        id: 'advanced-types',
        name: 'Advanced Types',
        description:
          'Advanced type system features like GADTs, type families, phantom types, and higher-kinded types enable precise modeling of program invariants at the type level.',
        keyPoints: [
          'GADTs (Generalized Algebraic Data Types) allow different constructors to specify different return types — Expr<Int> for literal integers and Expr<Bool> for comparisons, with the type checker ensuring operations are type-safe',
          'Type families (type-level functions) compute types from other types — a type family Element that maps Array to its element type, enabling generic programming over type constructors',
          'Phantom types use type parameters that do not appear in the value — Token<Admin> and Token<User> have the same runtime representation but the type system prevents using an Admin token where a User token is expected',
          'Higher-kinded types (HKTs) abstract over type constructors — instead of being polymorphic over types (T), you are polymorphic over type constructors (F<_>), enabling you to write a single Functor interface for Array, Option, and Promise',
          'Dependent types (Idris, Agda) allow types to depend on values — Vec<3, Int> is a vector of exactly 3 integers, and the compiler verifies array bounds at compile time',
        ],
        tradeoffs: [
          'Advanced types significantly increase language and tooling complexity — HKTs require higher-kinded type variables, kind annotations, and sophisticated type inference that most mainstream languages do not support',
          'Type-level programming can produce inscrutable error messages — when a complex type constraint fails, the error may reference internal type machinery rather than the user\'s code',
          'Diminishing returns: the last 5% of type safety (dependent types, proof-carrying code) often requires 50% more complexity — for most applications, simpler type features provide sufficient guarantees',
        ],
        realWorld: [
          'Haskell GADTs for type-safe ASTs',
          'TypeScript branded types (phantom types)',
          'Scala higher-kinded types for Cats/Scalaz',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Category Theory Essentials',
    part: 3,
    partTitle: 'Type Systems & Categories',
    summary:
      'Category theory provides the mathematical foundation for many FP abstractions — categories, functors, natural transformations, and monoids give precise meaning to composition, transformation, and aggregation.',
    concepts: [
      {
        id: 'categories-morphisms',
        name: 'Categories & Morphisms',
        description:
          'A category consists of objects and morphisms (arrows) between them, with composition of morphisms and identity morphisms — the programming analog is types as objects and functions as morphisms.',
        keyPoints: [
          'Objects in a programming category are types (Int, String, Bool) and morphisms are functions between types — a function f: A -> B is a morphism from object A to object B',
          'Composition: if f: A -> B and g: B -> C, then g . f: A -> C is a morphism from A to C — function composition in code directly corresponds to morphism composition in category theory',
          'Identity: every object A has an identity morphism id_A: A -> A that does nothing — composing with identity leaves a morphism unchanged (f . id = f and id . f = f)',
          'Associativity: (h . g) . f = h . (g . f) — the order of grouping compositions does not matter, only the order of application, which corresponds to the associativity of function composition',
          'The category of types and functions (Hask for Haskell) is the primary category programmers work with — but categories exist for many other structures (databases, proofs, processes)',
        ],
        tradeoffs: [
          'Category theory is very abstract — the practical programming benefits (consistent APIs, compositional design) do not require understanding the full mathematical theory',
          'Hask is not actually a category in the strict mathematical sense — the presence of bottom (undefined/non-termination) breaks some theoretical properties, though this rarely matters in practice',
          'Category-theoretic vocabulary (morphism, endofunctor, natural transformation) can be intimidating and may alienate developers unfamiliar with the mathematical tradition',
        ],
        realWorld: [
          'Haskell\'s Category type class',
          'Arrow notation in Haskell',
          'Database schema migrations (morphisms between schemas)',
        ],
      },
      {
        id: 'natural-transformations',
        name: 'Natural Transformations',
        description:
          'A natural transformation is a mapping between two functors that preserves the functor structure — in programming, it is a polymorphic function that converts one generic container into another.',
        keyPoints: [
          'A natural transformation converts F<A> to G<A> for any type A — safeHead: Array<A> -> Option<A> takes the first element of any array and wraps it in Option, working uniformly for all element types',
          'The naturality condition states that transforming then mapping equals mapping then transforming — safeHead(xs.map(f)) === safeHead(xs).map(f) for any function f',
          'Common natural transformations: Array to Option (safeHead), Option to Array (toArray), Either to Option (discarding the error), Promise to Observable',
          'Natural transformations are the "adapters" between different functor contexts — they change the container without changing the contained values',
        ],
        tradeoffs: [
          'The naturality condition must be verified manually in most languages — the type system alone does not enforce it (you could write a function Array<A> -> Option<A> that violates naturality)',
          'Not every polymorphic function between functors is a natural transformation — only those satisfying the naturality condition qualify, and incorrect implementations can break reasoning',
          'The concept is simple in practice but the name and definition are intimidating — "a family of morphisms indexed by objects that commute with fmap" is precise but opaque',
        ],
        realWorld: [
          'Array.prototype methods returning different types',
          'Converting between IO frameworks (Promises to Observables)',
          'Compiler transformations between intermediate representations',
        ],
      },
      {
        id: 'monoids-semigroups',
        name: 'Monoids & Semigroups',
        description:
          'A semigroup has an associative binary operation for combining values. A monoid adds an identity element — together they enable generic, parallelizable aggregation of any type with these properties.',
        keyPoints: [
          'A semigroup provides an associative binary operation combine(a, b) — string concatenation, number addition, array concatenation, and set union are all semigroups',
          'A monoid extends semigroup with an identity element (empty) — empty string for concatenation, 0 for addition, [] for array concatenation, so combine(a, empty) === a and combine(empty, a) === a',
          'Associativity enables parallelization — to combine [a, b, c, d], you can split into [combine(a,b), combine(c,d)] and combine in parallel, then combine the two results',
          'Foldable collections generalize to any monoid — instead of writing separate sum, product, and concatenation functions, you write a single fold that takes a monoid and works for any monoidal type',
          'The Monoid type class in Haskell/Scala provides a generic interface — any type with an associative operation and identity can implement Monoid, enabling generic algorithms like foldMap',
        ],
        tradeoffs: [
          'Not every type has a natural monoidal structure — complex domain types may not have an obvious way to combine values, requiring arbitrary choices',
          'Multiple valid monoids can exist for the same type — numbers have both addition (identity: 0) and multiplication (identity: 1) monoids, requiring explicit selection via newtypes (Sum, Product)',
          'The abstraction overhead may not be worthwhile for simple cases — folding a list of numbers with + is clearer than constructing a Sum monoid and calling foldMap',
        ],
        realWorld: [
          'MapReduce (parallel aggregation via monoids)',
          'Log aggregation (combining log entries)',
          'React state merging (Object.assign as monoid)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Applied FP (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Error Handling & Effects',
    part: 4,
    partTitle: 'Applied FP',
    summary:
      'Functional error handling replaces exceptions with explicit types (Result/Either), making failure a first-class value. Effect systems track and control side effects, and functional patterns extend naturally to async and concurrent programming.',
    concepts: [
      {
        id: 'functional-error-handling',
        name: 'Functional Error Handling',
        description:
          'Functional error handling uses types like Result/Either to make errors explicit in return types rather than hiding them in thrown exceptions — enabling composable, predictable error propagation.',
        keyPoints: [
          'Result/Either types encode success (Ok/Right) or failure (Err/Left) in the return type — the caller cannot ignore the error because the type forces handling both cases',
          'Railway-oriented programming visualizes computation as two tracks — the happy path (Ok) continues forward while errors (Err) shunt to the error track and skip all subsequent operations',
          'Error accumulation collects multiple errors instead of stopping at the first — validating a form can report "name is required AND email is invalid AND age must be positive" using applicative Either',
          'The ? operator in Rust (and similar do-notation patterns) provides ergonomic syntax for propagating errors — it unwraps Ok values and automatically returns Err, combining the readability of exceptions with the explicitness of Result types',
          'Error types should be domain-specific — ParseError, ValidationError, NetworkError are more useful than generic Error because pattern matching can handle each case differently',
        ],
        tradeoffs: [
          'Result types add syntactic overhead compared to exceptions — every function call that can fail must be explicitly unwrapped or propagated, which can be verbose without language support',
          'Nested Result types (Result<Result<T, E1>, E2>) can become unwieldy — flatMap prevents nesting, but complex error hierarchies require careful design',
          'Existing codebases using exceptions require significant refactoring to adopt Result-based error handling — mixing both styles in the same codebase creates inconsistency',
        ],
        realWorld: [
          'Rust Result<T, E> with ? operator',
          'fp-ts Either and TaskEither',
          'Go error values (similar concept, less type-safe)',
        ],
      },
      {
        id: 'effect-systems',
        name: 'Effect Systems',
        description:
          'Effect systems track which side effects a function may perform in its type signature — the compiler enforces that effects are handled properly, preventing accidental I/O in pure code.',
        keyPoints: [
          'Algebraic effects separate effect declaration from interpretation — you declare what effects your function uses (Read, Write, Exception) and provide handlers that interpret them, enabling different interpretations for testing versus production',
          'The IO monad in Haskell is the simplest effect system — any function performing I/O must return IO<T>, making side effects visible in the type and preventing accidental I/O in pure functions',
          'Free monads describe a program as a data structure (an AST of operations) that is then interpreted by a handler — this separates the description of what to do from how to do it',
          'Effect handlers compose — you can stack multiple effect handlers (logging + error handling + database) without the complexity of monad transformer stacks',
        ],
        tradeoffs: [
          "Effect systems add complexity to types — a function signature like 'Eff (Database ': Logging ': Error ': '[]) Result' is harder to read than a simple 'Result'",
          'Most mainstream languages lack native effect system support — Haskell uses monads, Scala uses ZIO/cats-effect, and JavaScript has no standard approach',
          'Free monads have performance overhead — interpreting a free monad AST requires allocating many intermediate data structures and traversing them at runtime',
        ],
        realWorld: [
          'Haskell IO monad and mtl',
          'Scala ZIO and cats-effect',
          'Effect-ts for TypeScript',
        ],
      },
      {
        id: 'async-concurrent-fp',
        name: 'Async & Concurrent FP',
        description:
          'Functional programming extends naturally to async and concurrent programming — Futures/Promises are monads, STM provides composable transactions, and functional reactive programming models time-varying values.',
        keyPoints: [
          'Futures/Promises as monads: flatMap chains async operations sequentially — fetchUser(id).flatMap(user => fetchOrders(user.id)) naturally sequences async calls with error propagation',
          'Software Transactional Memory (STM) provides composable, lock-free concurrency — you compose transactions with the same tools as other monadic operations, and the runtime handles retries and conflict detection',
          'Functional Reactive Programming (FRP) models time-varying values (Signals/Behaviors) and event streams (Events) as first-class values — combining, filtering, and transforming them with functional operations',
          'Structured concurrency (as in Kotlin coroutines, Java virtual threads) manages concurrent tasks as a tree — parent tasks own child tasks, ensuring cleanup and cancellation propagate correctly',
        ],
        tradeoffs: [
          'Monadic async code can suffer from "callback pyramid" without do-notation or async/await — deeply nested flatMap chains are hard to read',
          'STM can have performance issues under high contention — transactions that repeatedly conflict are retried, wasting computation',
          'FRP has a learning curve and can be overkill for simple UI interactions — the overhead of modeling everything as streams is only worthwhile for complex, reactive data flows',
        ],
        realWorld: [
          'Scala Future and ZIO fibers',
          'Haskell STM (concurrent data structures)',
          'RxJS reactive streams',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Property-Based Testing',
    part: 4,
    partTitle: 'Applied FP',
    summary:
      'Property-based testing verifies that functions satisfy universal properties across many randomly generated inputs — rather than checking specific examples, you assert invariants that must hold for all valid inputs, and the framework finds counterexamples automatically.',
    concepts: [
      {
        id: 'property-based-testing',
        name: 'Property-Based Testing',
        description:
          'Property-based testing generates random inputs and checks that specified properties hold for all of them — if a property fails, the framework automatically shrinks the failing input to a minimal counterexample.',
        keyPoints: [
          'QuickCheck (Haskell, ported to many languages) pioneered property-based testing — you define a property like "reverse(reverse(xs)) === xs" and the framework generates hundreds of random lists to verify it',
          'Generators produce random values of a given type — gen.int, gen.string, gen.list(gen.int) and you can compose generators for complex domain types',
          'Shrinking automatically reduces a failing input to the smallest counterexample — if a list of 100 elements fails a property, the shrinker tries progressively smaller lists until it finds the minimal failing case',
          'Invariant properties are more powerful than example-based tests — "sorting is idempotent: sort(sort(xs)) === sort(xs)" covers infinitely many cases, while assert sort([3,1,2]) === [1,2,3] covers exactly one',
          'Common property patterns: roundtrip (decode(encode(x)) === x), idempotency (f(f(x)) === f(x)), commutativity, associativity, and invariant preservation',
        ],
        tradeoffs: [
          'Finding good properties requires domain knowledge and creativity — many bugs hide in edge cases that are hard to express as universal properties',
          'Random generation may miss rare edge cases — 100 random integers are unlikely to include MAX_INT, 0, -1, or other boundary values unless the generator is specifically designed for them',
          'Test failures are non-deterministic by default — a test may pass 99 times and fail on the 100th due to a specific random seed, though seed-based reproducibility mitigates this',
        ],
        realWorld: [
          'QuickCheck (Haskell, Erlang)',
          'fast-check (JavaScript/TypeScript)',
          'Hypothesis (Python)',
        ],
      },
      {
        id: 'laws-specifications',
        name: 'Laws & Specifications',
        description:
          'Algebraic laws (functor laws, monad laws, monoid laws) serve as testable specifications — verifying these laws via property-based tests ensures your abstractions behave correctly and composably.',
        keyPoints: [
          'Algebraic laws as tests: the functor identity law (x.map(id) === x) and composition law (x.map(f).map(g) === x.map(g . f)) can be directly expressed as property-based tests over random functor values',
          'Roundtrip properties verify encode/decode pairs — property: "for all valid objects x, decode(encode(x)) === x" and optionally "for all valid strings s, encode(decode(s)) === s"',
          'Metamorphic testing checks relationships between inputs — if sorting xs gives ys, then sorting (xs ++ [0]) should give insert(0, ys), relating two runs of the function on related inputs',
          'Law-based testing catches subtle bugs that example-based tests miss — a monad implementation that passes simple examples might violate associativity for specific combinations, which property testing catches',
        ],
        tradeoffs: [
          'Writing law tests requires understanding the mathematical laws — developers must know what functor laws, monad laws, and monoid laws are before they can test them',
          'Some laws are difficult to test for effectful types — testing IO monad laws requires mocking effects, and testing equality of IO actions is philosophically tricky',
          'Over-reliance on law tests can give false confidence — passing the monad laws does not guarantee the monad does something useful, only that it is structurally valid',
        ],
        realWorld: [
          'cats-laws in Scala (automated law testing)',
          'Haskell checkers library',
          'fast-check-laws for TypeScript',
        ],
      },
      {
        id: 'fuzzing-generative-testing',
        name: 'Fuzzing & Generative Testing',
        description:
          'Fuzzing and generative testing use random or semi-random input generation to find bugs — domain-specific generators produce realistic inputs, and coverage-guided fuzzing evolves inputs to explore new code paths.',
        keyPoints: [
          'Domain-specific generators produce realistic test data — a generator for email addresses creates syntactically valid emails with random local parts and domains, rather than purely random strings',
          'Coverage-guided generation (as in AFL, libFuzzer) instruments the program and evolves inputs that trigger new code paths — combining the randomness of fuzzing with the intelligence of coverage tracking',
          'The test oracle problem asks "how do you know the output is correct?" — strategies include differential testing (compare two implementations), metamorphic testing (compare related inputs), and invariant checking',
          'Generative testing extends beyond unit tests — you can generate random API call sequences, random database queries, or random user interaction flows to test system-level properties',
        ],
        tradeoffs: [
          'Building good generators for complex domains is time-consuming — a generator for valid SQL queries or valid JSON schemas requires deep domain knowledge to produce useful inputs',
          'Fuzzing requires a way to detect failures — crash-only fuzzing misses logical bugs, and writing comprehensive assertions (oracles) is as hard as writing the code itself',
          'Coverage-guided fuzzing is most effective for parsing and input-handling code — business logic with complex state may not benefit as much from random input generation',
        ],
        realWorld: [
          'AFL and libFuzzer for C/C++',
          'Hypothesis strategies (Python)',
          'Jazzer for JVM applications',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'FP in Practice',
    part: 4,
    partTitle: 'Applied FP',
    summary:
      'Functional programming principles are increasingly adopted in mainstream languages and architectures. FP features in JavaScript, Python, and Java make many patterns accessible, while functional architectures and libraries provide structured approaches to building real applications.',
    concepts: [
      {
        id: 'fp-mainstream-languages',
        name: 'FP in Mainstream Languages',
        description:
          'Modern mainstream languages have adopted many FP features — lambda expressions, map/filter/reduce, immutable data structures, and pattern matching bring functional style to imperative ecosystems.',
        keyPoints: [
          'JavaScript/TypeScript offer first-class functions, closures, Array.map/filter/reduce, destructuring, and the spread operator for immutable updates — functional patterns are idiomatic in React, Redux, and RxJS',
          'Python provides lambda expressions, list comprehensions, map/filter, functools (partial, reduce, lru_cache), and dataclasses with frozen=True for immutability',
          'Java 8+ introduced lambda expressions, Stream API (map, filter, reduce, collect), Optional, and method references — enabling a functional style alongside OOP',
          'Kotlin combines FP and OOP with data classes, sealed classes (sum types), extension functions, null safety, and sequence (lazy evaluation) — popular for functional Android development',
          'TypeScript\'s type system enables many FP patterns — discriminated unions model sum types, generics enable parametric polymorphism, and mapped/conditional types provide type-level computation',
        ],
        tradeoffs: [
          'FP in mainstream languages is opt-in and not enforced — nothing prevents mixing mutable state, side effects, and pure functions in the same codebase, requiring team discipline',
          'Performance characteristics differ — Java Stream has significant overhead per element compared to a for-loop, and JavaScript closures allocate heap memory for captured variables',
          'Mainstream languages lack some FP features — no TCO (JavaScript engines, Java), no HKTs (TypeScript, Java), no algebraic effects — limiting how far you can take functional patterns',
        ],
        realWorld: [
          'React + Redux (functional UI)',
          'Java Streams for data processing',
          'Kotlin coroutines (structured concurrency)',
        ],
      },
      {
        id: 'functional-architecture',
        name: 'Functional Architecture',
        description:
          'Functional architecture patterns structure applications with a pure functional core for business logic surrounded by an imperative shell for I/O — keeping the core testable, composable, and free of side effects.',
        keyPoints: [
          'Functional core / imperative shell (ports and adapters) separates pure decision-making logic from impure I/O — the core is a pure function from input to output, and the shell handles databases, HTTP, and file I/O',
          'Onion architecture places domain logic at the center, application services in the middle, and infrastructure at the edges — dependencies point inward, with the pure domain layer depending on nothing external',
          'Ports and adapters (hexagonal architecture) define abstract interfaces (ports) for external systems and provide concrete implementations (adapters) — the pure core depends only on port interfaces, not on specific databases or APIs',
          'Event sourcing stores state as a sequence of immutable events — the current state is derived by folding (reducing) all events, which is a natural fit for FP since fold is a fundamental operation',
          'CQRS (Command Query Responsibility Segregation) separates reads from writes — write operations produce events (pure transformations), and read models are materialized views derived from the event log',
        ],
        tradeoffs: [
          'Strict separation of pure and impure code requires discipline and can feel over-engineered for small applications — the overhead of ports and adapters is disproportionate for simple CRUD apps',
          'Event sourcing adds complexity for querying current state — you need materialized views or projections, and replaying millions of events on startup can be slow without snapshots',
          'The functional core cannot directly access databases or APIs — it must describe what it needs, and the shell must provide it, which can lead to complex dependency injection or reader-monad patterns',
        ],
        realWorld: [
          'Elm architecture (Model-Update-View)',
          'Redux architecture (reducers as pure functions)',
          'Event sourcing in banking and financial systems',
        ],
      },
      {
        id: 'fp-libraries-ecosystems',
        name: 'FP Libraries & Ecosystems',
        description:
          'FP libraries bring functional abstractions (Option, Either, Task, pipe, functors, monads) to mainstream languages, providing the building blocks for functional programming without switching to a pure FP language.',
        keyPoints: [
          'fp-ts (TypeScript) provides Option, Either, TaskEither, pipe, and type classes (Functor, Monad, Monoid) — it brings Haskell-style FP to TypeScript with full type safety',
          'Ramda (JavaScript) is an auto-curried, data-last utility library — every function is curried and designed for composition, contrasting with lodash\'s data-first, non-curried approach',
          'cats and scalaz (Scala) provide type classes, monad transformers, free monads, and lawful abstractions — cats is the modern standard with better ergonomics, while scalaz is the original',
          'Arrow (Kotlin) provides Typed Errors, STM, resilience patterns, and optics — it brings FP patterns to Kotlin while leveraging Kotlin\'s coroutine support for concurrent effects',
          'Comparing libraries: fp-ts prioritizes type safety, Ramda prioritizes ease of use, cats prioritizes lawful abstractions, and Arrow prioritizes Kotlin idiomaticness — the choice depends on your language and team preferences',
        ],
        tradeoffs: [
          'FP libraries add a learning curve — team members must understand Option, Either, pipe, and monadic chaining before they can be productive',
          'Library choice creates lock-in — migrating from Ramda to fp-ts or from scalaz to cats requires significant refactoring across the codebase',
          'Type-heavy FP libraries (fp-ts, cats) can produce complex type errors — a type mismatch deep in a monadic chain can produce error messages that reference internal library types',
        ],
        realWorld: [
          'fp-ts in TypeScript backend services',
          'Ramda in JavaScript data pipelines',
          'cats-effect for Scala microservices',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
