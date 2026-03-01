export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ─── Topic 1: Syntax & Semantics ────────────────────────────────────
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'What is the primary advantage of using a restricted grammar class like LL(1) or LR(1) over a general context-free grammar?',
    options: [
      'They can describe more languages than general CFGs',
      'They automatically resolve all ambiguities in the grammar',
      'They eliminate the need for a lexer/tokenizer',
      'They can be parsed in linear time rather than cubic time',
    ],
    answer: 3,
    explanation:
      'General CFG parsing algorithms (like Earley or CYK) run in O(n^3) time, while restricted grammar classes like LL(k) and LR(k) can be parsed in O(n) linear time, which is essential for practical compilers that must handle large source files efficiently.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      'Which formal semantic approach defines program meaning by describing step-by-step execution on an abstract machine?',
    options: [
      'Operational semantics',
      'Denotational semantics',
      'Axiomatic semantics',
      'Algebraic semantics',
    ],
    answer: 0,
    explanation:
      'Operational semantics defines the meaning of a program by specifying how it executes on an abstract machine, step by step. Small-step operational semantics shows individual reduction steps, while big-step semantics relates expressions directly to their final values.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'What is the key difference between a parse tree (concrete syntax tree) and an abstract syntax tree (AST)?',
    options: [
      'Parse trees are created at runtime while ASTs are created at compile time',
      'Parse trees include all grammar derivation details while ASTs retain only semantically meaningful structure',
      'ASTs include all tokens including punctuation; parse trees omit them',
      'ASTs can only represent expressions, while parse trees represent entire programs',
    ],
    answer: 1,
    explanation:
      'A parse tree faithfully represents every grammar rule applied during derivation, including punctuation, grouping, and intermediate non-terminals. An AST strips away these syntactically necessary but semantically irrelevant details, keeping only nodes that represent meaningful language constructs.',
  },

  // ─── Topic 2: Variables, Binding & Scope ────────────────────────────
  {
    id: 't2-q1',
    chapterId: 2,
    question:
      'At which binding time is the type of a variable typically established in a statically typed language?',
    options: [
      'Runtime (when the value is assigned)',
      'Load time (when the program is loaded into memory)',
      'Compile time (during type checking)',
      'Language design time (when the language specification is written)',
    ],
    answer: 2,
    explanation:
      'In statically typed languages, type bindings are established at compile time during the type-checking phase. The compiler determines and verifies the type of each variable from declarations and type inference, and this binding cannot change at runtime.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'In a language with dynamic scoping, how is a variable reference resolved?',
    options: [
      'By searching the closest enclosing scope in the source code',
      'By looking up the variable in the global scope only',
      'By checking the module-level namespace first, then built-ins',
      'By searching the most recent binding on the runtime call stack',
    ],
    answer: 3,
    explanation:
      'Dynamic scoping resolves variable references by searching the call stack at runtime, finding the most recent binding of that name regardless of where the referencing code appears in the source text. This means the same code can access different variables depending on who called it.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'What problem does Go\'s escape analysis solve?',
    options: [
      'It determines whether a variable can be safely stack-allocated or must be heap-allocated',
      'It detects infinite loops and terminates them',
      'It identifies unused variables and removes them from the binary',
      'It resolves circular import dependencies between packages',
    ],
    answer: 0,
    explanation:
      'Go\'s escape analysis determines at compile time whether a variable\'s reference "escapes" the function (e.g., is returned or stored in a global). If it doesn\'t escape, the variable is stack-allocated for efficiency; if it does, it\'s heap-allocated so it survives the function return.',
  },

  // ─── Topic 3: Data Types & Type Systems ─────────────────────────────
  {
    id: 't3-q1',
    chapterId: 3,
    question:
      'What is the main advantage of gradual typing systems like TypeScript?',
    options: [
      'They compile to faster machine code than fully static languages',
      'They guarantee zero runtime type errors',
      'They allow mixing static and dynamic typing, enabling incremental adoption of type annotations',
      'They eliminate the need for any runtime type checking',
    ],
    answer: 2,
    explanation:
      'Gradual typing allows mixing statically typed and dynamically typed code in the same program, inserting runtime checks at the boundaries. This enables teams to incrementally add type annotations to existing dynamically typed codebases without a full rewrite.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'Why can\'t you write "new T()" or check "instanceof List<String>" at runtime in Java generics?',
    options: [
      'Because Java uses monomorphization that erases runtime type info',
      'Because Java uses type erasure, removing generic type information after compilation',
      'Because the JVM does not support generic types at all',
      'Because instanceof is deprecated in modern Java versions',
    ],
    answer: 1,
    explanation:
      'Java implements generics using type erasure for backward compatibility: generic type parameters are removed after compilation, replaced with their bounds (usually Object). At runtime, a List<String> and List<Integer> are both just List, making runtime generic type checks impossible.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'In algebraic data types, what is the cardinality of a product type (Bool, Bool)?',
    options: [
      '2 (the sum of the two booleans)',
      '8 (2 to the power of 3)',
      '1 (a single pair value)',
      '4 (the product 2 x 2)',
    ],
    answer: 3,
    explanation:
      'A product type\'s cardinality is the product of its components\' cardinalities. Bool has 2 values (true, false), so (Bool, Bool) has 2 x 2 = 4 possible values: (true, true), (true, false), (false, true), (false, false).',
  },

  // ─── Topic 4: Evaluation Strategies ─────────────────────────────────
  {
    id: 't4-q1',
    chapterId: 4,
    question:
      'What is a "thunk" in the context of lazy evaluation?',
    options: [
      'A compiled machine code function optimized for tail calls',
      'A pointer to a garbage-collected memory region',
      'An unevaluated expression packaged with its environment as a closure',
      'A thread-safe wrapper around a shared mutable variable',
    ],
    answer: 2,
    explanation:
      'A thunk is an unevaluated expression bundled with the variable bindings (environment) needed to evaluate it, stored as a closure. When the value is needed, the thunk is "forced" (evaluated), and in call-by-need, the result replaces the thunk to avoid recomputation.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'Why does Haskell use monads (especially IO) to handle side effects?',
    options: [
      'Because Haskell\'s compiler cannot generate machine code for I/O operations directly',
      'Because monads are faster than direct function calls for I/O operations',
      'Because the Haskell specification forbids any form of side effects entirely',
      'Because lazy evaluation makes the order of side effects unpredictable, so monads provide controlled sequencing',
    ],
    answer: 3,
    explanation:
      'In a lazy language, evaluation order depends on data dependencies rather than syntactic order, making the sequence of side effects unpredictable. The IO monad forces explicit sequencing of effectful operations, ensuring they execute in the intended order despite lazy evaluation.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'What problem can accumulated unevaluated thunks cause in a lazy language?',
    options: [
      'Space leaks where memory consumption grows unexpectedly',
      'Type inference failures',
      'Deadlocks in concurrent code',
      'Compilation errors in recursive functions',
    ],
    answer: 0,
    explanation:
      'Space leaks occur when lazy evaluation causes large chains of unevaluated thunks to accumulate in memory before being forced. Since each thunk occupies heap space, deferred computations can consume far more memory than their eager equivalents would.',
  },

  // ─── Topic 5: Control Flow & Exception Handling ─────────────────────
  {
    id: 't5-q1',
    chapterId: 5,
    question:
      'What does the structured programming theorem prove?',
    options: [
      'That all programs must use object-oriented design patterns',
      'That any computable function can be expressed using sequence, selection, and iteration',
      'That structured programs always terminate',
      'That goto statements are always more efficient than loops',
    ],
    answer: 1,
    explanation:
      'The structured programming theorem (Bohm-Jacopini theorem) proves that any computable function can be implemented using only three control structures: sequence (executing in order), selection (if/else branching), and iteration (while loops), eliminating the need for arbitrary goto jumps.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'How do Rust\'s Result<T, E> types differ from traditional exception handling?',
    options: [
      'Result types are slower but safer than exceptions',
      'Result types can only represent string error messages',
      'Result types encode errors in the return type, making error paths explicit rather than hidden',
      'Result types automatically retry failed operations',
    ],
    answer: 2,
    explanation:
      'Rust\'s Result<T, E> encodes success and failure as variants of a return type, making errors visible in function signatures. Unlike exceptions that create hidden control flow paths, Result forces callers to explicitly handle or propagate errors, with the ? operator providing concise propagation syntax.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'What is a continuation in programming language theory?',
    options: [
      'A function that continues executing after a runtime error',
      'A loop that continues indefinitely until explicitly broken',
      'A variable that persists across multiple function calls',
      'A representation of "the rest of the computation" from a given point that can be captured and invoked later',
    ],
    answer: 3,
    explanation:
      'A continuation captures the rest of the computation from a specific point, packaging the execution state into a first-class value. It can be stored, passed around, and invoked to resume execution at the captured point, serving as a foundation for implementing many control flow constructs.',
  },

  // ─── Topic 6: Subroutines & Parameter Passing ──────────────────────
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'In pass-by-sharing (as used by Java and Python for objects), what happens when the callee reassigns the parameter to a new object?',
    options: [
      'Only the callee\'s local copy of the reference changes; the caller\'s reference is unaffected',
      'The caller\'s original reference is updated to point to the new object',
      'A runtime error is thrown because reassignment is not allowed',
      'The original object is automatically garbage collected',
    ],
    answer: 0,
    explanation:
      'Pass-by-sharing passes a copy of the reference. The callee can mutate the referred object (both see the change), but reassigning the parameter to a new object only changes the callee\'s local copy of the reference. The caller\'s reference still points to the original object.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'Why does the Scheme specification mandate tail call optimization?',
    options: [
      'To ensure all Scheme programs run in constant memory',
      'Because Scheme expresses all iteration as recursion, and without TCO, recursive loops would overflow the stack',
      'To make Scheme faster than C for all programs',
      'To allow Scheme programs to call C functions efficiently',
    ],
    answer: 1,
    explanation:
      'Scheme has no built-in looping constructs; all iteration is expressed as recursion. Without tail call optimization, even simple loops written as tail-recursive functions would grow the stack with each iteration and eventually overflow. TCO reuses stack frames for tail calls, making recursion as efficient as loops.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question:
      'What is the difference between a closure\'s capture-by-reference and capture-by-value?',
    options: [
      'Capture-by-reference is only available in functional languages',
      'Capture-by-value shares the variable with the enclosing scope; capture-by-reference makes an independent copy',
      'There is no practical difference; they always produce the same result',
      'Capture-by-reference shares the variable with the enclosing scope; capture-by-value makes an independent copy',
    ],
    answer: 3,
    explanation:
      'Capture-by-reference means the closure and the enclosing scope share the same variable (mutations are visible to both). Capture-by-value copies the variable\'s current value into the closure, creating an independent copy. The choice affects whether the closure sees subsequent changes to the original variable.',
  },

  // ─── Topic 7: OOP Foundations ───────────────────────────────────────
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'What is the "diamond problem" in multiple inheritance?',
    options: [
      'When a class inherits from exactly four parent classes',
      'When a class hierarchy has more than four levels of depth',
      'When two parent classes inherit from the same grandparent, creating ambiguity about which copy of the grandparent\'s members the child gets',
      'When a class implements multiple interfaces with the same method name',
    ],
    answer: 2,
    explanation:
      'The diamond problem occurs when class D inherits from both B and C, which both inherit from A, forming a diamond shape. The ambiguity is whether D gets one or two copies of A\'s fields/methods. C++ resolves this with virtual inheritance; Python uses C3 linearization.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'How does Go implement polymorphism without class inheritance?',
    options: [
      'Through structural typing for interfaces: any type implementing the required methods satisfies the interface automatically',
      'Through template metaprogramming',
      'Through runtime reflection and dynamic method lookup only',
      'Go does not support polymorphism in any form',
    ],
    answer: 0,
    explanation:
      'Go uses structural typing for interfaces: a type satisfies an interface if it implements all the interface\'s methods, without explicitly declaring that it does. This enables ad-hoc polymorphism without coupling types to specific hierarchies or requiring inheritance.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'Why does Python use naming conventions (_prefix, __prefix) for access control rather than enforced access modifiers?',
    options: [
      'Because Python\'s interpreter cannot enforce access restrictions',
      'Following the philosophy "we\'re all consenting adults," providing a weaker but more flexible form of encapsulation',
      'Because enforced access control would break backward compatibility with Python 2',
      'Because Python does not have classes or objects',
    ],
    answer: 1,
    explanation:
      'Python\'s design philosophy trusts developers to respect naming conventions rather than enforcing strict access control. Single underscore (_) signals "internal" and double underscore (__) triggers name mangling, but neither truly prevents access, prioritizing flexibility and simplicity over enforcement.',
  },

  // ─── Topic 8: Functional Language Features ──────────────────────────
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'Why is memoization safe for pure functions but potentially problematic for impure functions?',
    options: [
      'Pure functions are always faster, so memoization has no benefit for impure functions',
      'Memoization requires more memory for impure functions',
      'Impure functions cannot be stored in hash maps',
      'Pure functions always return the same output for the same input, so cached results are always valid. Impure functions may return different results due to side effects.',
    ],
    answer: 3,
    explanation:
      'Pure functions are deterministic: the same inputs always produce the same output with no side effects. This means a cached result is always valid for those inputs. Impure functions might return different results depending on external state or produce side effects that should not be skipped.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'What is a Hash Array Mapped Trie (HAMT) and why is it important for functional programming?',
    options: [
      'A hash table implementation that provides O(1) lookup in mutable languages only',
      'A persistent data structure providing near-O(1) operations with structural sharing between versions',
      'A compression algorithm for storing immutable strings',
      'A type of binary tree used exclusively in Haskell\'s type system',
    ],
    answer: 1,
    explanation:
      'HAMTs are the primary persistent data structure for maps and vectors in functional languages like Clojure and Scala. They use 32-way branching with path compression to provide near-O(1) operations while sharing structure between versions, making immutable updates efficient.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'What problem do algebraic effect systems solve compared to monad transformers?',
    options: [
      'They provide faster runtime performance for all programs',
      'They eliminate the need for any type system',
      'They allow effects to be composed more naturally without the complexity of stacking monad transformer layers',
      'They automatically parallelize effectful computations',
    ],
    answer: 2,
    explanation:
      'Monad transformers stack effects in a fixed order with significant boilerplate and performance overhead. Algebraic effect systems allow functions to declare which effects they use and provide handlers that interpret those effects, composing more naturally without the rigid layering of transformers.',
  },

  // ─── Topic 9: Metaprogramming & Reflection ──────────────────────────
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'What makes hygienic macros (as in Rust and Scheme) safer than C preprocessor macros?',
    options: [
      'Hygienic macros run at runtime instead of compile time',
      'Hygienic macros can only generate pure functions',
      'Hygienic macros are limited to simple text substitution within function bodies',
      'Hygienic macros operate on the AST and automatically prevent variable name capture conflicts',
    ],
    answer: 3,
    explanation:
      'Hygienic macros operate on the abstract syntax tree rather than raw text, and they automatically rename variables to prevent accidental capture of names from the expansion site. This eliminates the common C macro bugs caused by name collisions, multiple evaluation, and broken scope boundaries.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'Why is Java reflection typically 10-100x slower than direct method invocation?',
    options: [
      'Because reflection bypasses compile-time optimizations, requires dynamic type checking, and involves boxing/unboxing of primitive types',
      'Because reflection uses interpreted mode rather than compiled mode',
      'Because reflection always makes network calls to verify permissions',
      'Because reflective calls are single-threaded by design',
    ],
    answer: 0,
    explanation:
      'Reflective invocation is slow because it bypasses the JIT compiler\'s optimizations (inlining, devirtualization), must perform runtime type checking for each call, requires boxing primitive arguments into objects, and involves looking up method metadata dynamically rather than using direct call instructions.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question:
      'How does Django\'s ORM use metaclasses?',
    options: [
      'To compile SQL queries at import time',
      'To generate JavaScript client code from Python models',
      'To transform class definitions with field declarations into full database-backed model classes with queries and migrations',
      'To enforce that all model fields use the same data type',
    ],
    answer: 2,
    explanation:
      'Django\'s ModelBase metaclass intercepts class creation for Model subclasses. It processes field declarations (CharField, IntegerField, etc.), builds the database schema mapping, registers the model for migrations, and adds query manager methods, transforming a simple class definition into a full ORM entity.',
  },

  // ─── Topic 10: Memory Management & Garbage Collection ───────────────
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'What is the "generational hypothesis" that generational garbage collectors are based on?',
    options: [
      'That each generation of programmers writes less buggy code',
      'That older objects use more memory than newer objects',
      'That garbage collection should run once per generation of CPU architectures',
      'That most objects die young, so collecting the young generation frequently is efficient',
    ],
    answer: 3,
    explanation:
      'The generational hypothesis observes that most heap-allocated objects have very short lifetimes. Generational GC exploits this by allocating new objects in a young generation that is collected frequently with a fast copying collector, while long-lived survivors are promoted to older generations collected less often.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'What key limitation does reference counting have compared to tracing garbage collection?',
    options: [
      'Reference counting cannot collect reference cycles (A -> B -> A) without supplementary cycle detection',
      'Reference counting cannot track objects on the stack',
      'Reference counting only works with immutable objects',
      'Reference counting requires more memory than tracing GC for every object',
    ],
    answer: 0,
    explanation:
      'Reference counting frees objects when their count drops to zero, but in a cycle (A references B, B references A), both counts remain at 1 even when no external references exist. Without a supplementary cycle detector (as Python adds), these objects leak forever.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'Why does the Array of Structures (AoS) vs Structure of Arrays (SoA) layout matter for performance?',
    options: [
      'SoA uses less total memory than AoS',
      'SoA provides better cache utilization when processing only a subset of fields across many entities',
      'AoS is required by all modern CPU architectures',
      'AoS allows parallel processing while SoA does not',
    ],
    answer: 1,
    explanation:
      'When processing only a few fields of many entities (e.g., updating all positions), SoA layout packs those fields contiguously in memory, maximizing cache line utilization. AoS interleaves all fields per entity, wasting cache space loading unused fields alongside the ones being processed.',
  },

  // ─── Topic 11: Concurrency Models ───────────────────────────────────
  {
    id: 't11-q1',
    chapterId: 11,
    question:
      'How does Rust prevent data races at compile time?',
    options: [
      'By forbidding all multi-threaded code',
      'By running a race detector at compile time that simulates all possible thread interleavings',
      'Through the type system: mutable references cannot be shared between threads unless wrapped in synchronization types (Mutex<T>), enforced by Send/Sync traits',
      'By using a global interpreter lock like Python\'s GIL',
    ],
    answer: 2,
    explanation:
      'Rust\'s type system prevents data races through ownership rules: the borrow checker ensures no value has simultaneous mutable and immutable references. The Send and Sync traits control which types can cross thread boundaries, and Mutex<T>/RwLock<T> provide safe shared mutable access.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'What is the key difference between the Actor model and CSP (Communicating Sequential Processes)?',
    options: [
      'Actors are synchronous while CSP is asynchronous',
      'CSP requires shared memory while the Actor model does not',
      'The Actor model only supports single-threaded execution',
      'In the Actor model, communication is between named actors via mailboxes; in CSP, communication occurs over named channels',
    ],
    answer: 3,
    explanation:
      'In the Actor model, messages are sent to specific named actors (each with a private mailbox). In CSP, processes communicate over named channels that are independent of the processes using them. Go implements CSP (goroutines + channels), while Erlang implements the Actor model.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'What is the "colored function" problem with async/await?',
    options: [
      'Async functions cannot be called from sync contexts without special handling, creating a bifurcation in the API surface',
      'Async functions have different syntax highlighting in IDEs',
      'Async functions are always slower than sync functions',
      'Async functions cannot return values, only void',
    ],
    answer: 0,
    explanation:
      'The "colored function" problem (from Bob Nystrom\'s blog post) describes how async and sync functions are not interchangeable. You cannot directly call an async function from sync code without bridging, causing the async annotation to spread virally through the codebase and splitting APIs into two incompatible "colors."',
  },

  // ─── Topic 12: Domain-Specific Languages ────────────────────────────
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'What is the fundamental difference between an external DSL and an internal (embedded) DSL?',
    options: [
      'External DSLs are always faster than internal DSLs',
      'Internal DSLs can only be used in functional languages',
      'External DSLs have their own independent syntax and parser, while internal DSLs are libraries that leverage the host language\'s syntax',
      'External DSLs cannot be compiled, only interpreted',
    ],
    answer: 2,
    explanation:
      'External DSLs have custom syntax parsed by a dedicated parser (like SQL or CSS), offering maximum syntactic freedom. Internal DSLs are implemented as libraries within a host language using method chaining, operator overloading, or macros to create domain-focused APIs that look like mini-languages.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'How does LINQ in C# use expression trees to enable database queries?',
    options: [
      'LINQ compiles C# code directly to SQL at build time',
      'LINQ requires writing raw SQL strings that are type-checked by the compiler',
      'LINQ uses reflection to inspect method calls and convert them to database operations',
      'LINQ captures lambda expressions as expression tree data structures that database providers translate to SQL at runtime',
    ],
    answer: 3,
    explanation:
      'When a LINQ query uses IQueryable<T>, lambda expressions are captured as expression tree objects rather than being compiled to executable code. Database providers like Entity Framework inspect these trees and translate them to optimized SQL queries, enabling type-safe database access that executes as SQL.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'What does the "progressive disclosure" pattern in DSL design mean?',
    options: [
      'Providing simple defaults for common cases while allowing detailed configuration for advanced cases',
      'Requiring users to learn all features before using the DSL',
      'Gradually deprecating features over multiple versions',
      'Showing error messages one at a time in order of severity',
    ],
    answer: 0,
    explanation:
      'Progressive disclosure means a DSL makes simple things simple (sensible defaults, minimal configuration for common use cases) while still making complex things possible (detailed options for advanced users). This avoids overwhelming newcomers while giving power users the control they need.',
  },

  // ─── Topic 13: Language Interoperability & FFI ──────────────────────
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'Why does the C ABI serve as the lingua franca for foreign function interfaces?',
    options: [
      'Because C is the fastest programming language',
      'Because C has the simplest type system',
      'Because virtually every programming language can call C functions, making C the common denominator for cross-language interop',
      'Because the C ABI is standardized by the W3C',
    ],
    answer: 2,
    explanation:
      'The C ABI is the universal interoperability layer because nearly every language provides mechanisms to call C functions (Python ctypes, Rust extern "C", Java JNI, etc.). This ubiquity makes C the standard bridge language: to interop between two languages, both can call through C.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'What advantage does WebAssembly provide for language interoperability in the browser?',
    options: [
      'It replaces JavaScript entirely in all browsers',
      'It provides a portable binary format that any language can compile to, enabling near-native performance in browsers',
      'It allows direct access to the DOM from any language without JavaScript',
      'It provides garbage collection for all languages running in the browser',
    ],
    answer: 1,
    explanation:
      'WebAssembly is a portable binary instruction format designed as a compilation target for any language (C, C++, Rust, Go, etc.). It runs at near-native speed in all modern browsers, enabling languages other than JavaScript to run in the browser with predictable performance.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'What is the key benefit of zero-copy serialization formats like FlatBuffers and Cap\'n Proto?',
    options: [
      'They produce smaller serialized data than any other format',
      'They automatically encrypt data during serialization',
      'They support more programming languages than Protocol Buffers',
      'They allow reading fields directly from the serialized buffer without parsing and copying into language-native objects',
    ],
    answer: 3,
    explanation:
      'Zero-copy serialization formats lay out data in the buffer in a way that allows direct field access without a deserialization step. Instead of parsing the entire buffer into native objects (which involves allocation and copying), programs read values directly from the buffer, providing the lowest possible access latency.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
