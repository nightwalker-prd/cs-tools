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
  // Topic 1: Pure Functions & Referential Transparency (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "Which of the following functions is NOT pure?",
    options: [
      "A function that takes two numbers and returns their sum",
      "A function that takes an array and returns a new sorted copy",
      "A function that reads the current system time and returns it as a string",
      "A function that takes a string and returns its length",
    ],
    answer: 2,
    explanation:
      "Reading the current system time is a side effect — the function's return value depends on when it is called, not just on its arguments. The same call at different times produces different results, violating the determinism requirement of pure functions. The other three functions always return the same output for the same input and perform no observable side effects.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "What does referential transparency enable that is impossible with side-effecting expressions?",
    options: [
      "Compiling code to machine language",
      "Using variables to store intermediate values",
      "Replacing any expression with its computed value without changing program behavior — enabling equational reasoning and safe memoization",
      "Defining recursive functions",
    ],
    answer: 2,
    explanation:
      "Referential transparency means an expression can be replaced by its value (and vice versa) without changing the program's behavior. This enables equational reasoning — you can simplify and refactor code algebraically. It also makes memoization safe because the expression is guaranteed to produce the same result on repeated evaluations. Side-effecting expressions cannot be substituted because their behavior depends on when and how often they are evaluated.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "What is the 'functional core / imperative shell' pattern?",
    options: [
      "A pattern where all code is written in a functional language and compiled to an imperative target",
      "A pattern where pure functions handle all business logic and decisions, while a thin impure layer at the edges handles I/O, database access, and side effects",
      "A pattern where imperative loops are wrapped in functional interfaces",
      "A pattern where the core uses global mutable state and the shell provides functional access to it",
    ],
    answer: 1,
    explanation:
      "The functional core / imperative shell pattern structures applications so that all decisions, transformations, and business logic are implemented as pure functions (the core), while side effects like I/O, database access, and user interaction are pushed to the edges (the shell). The shell reads input, calls pure core functions to make decisions, and then performs the resulting actions. This maximizes testability because the core can be tested without mocking any external systems.",
  },

  // ============================================================
  // Topic 2: Immutability & Persistent Data Structures (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "How do persistent data structures achieve efficient updates without mutating the original?",
    options: [
      "They deep-copy the entire data structure on every update",
      "They use structural sharing — new versions share unchanged subtrees with the old version, only creating new nodes along the path to the change",
      "They compress the data to reduce copying costs",
      "They use a write-ahead log to defer actual changes",
    ],
    answer: 1,
    explanation:
      "Persistent data structures use structural sharing to make updates efficient. When you update one element in a tree-based structure, only the nodes on the path from the root to the changed element are newly created — all other subtrees are shared by reference between the old and new versions. For a 32-way trie of depth 7 (holding billions of elements), an update creates at most 7 new nodes while sharing the rest. This gives O(log32 n) ≈ O(1) amortized update cost.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "Why is immutable data inherently thread-safe?",
    options: [
      "Immutable data uses internal locks to prevent concurrent access",
      "Immutable data is stored in thread-local memory",
      "Since immutable data cannot be modified after creation, concurrent reads from multiple threads are always safe — there are no race conditions because no thread can change the data",
      "Immutable data is copied to each thread's stack",
    ],
    answer: 2,
    explanation:
      "Thread safety issues arise from concurrent writes to shared mutable state — one thread modifying data while another reads it leads to race conditions, torn reads, and inconsistent state. Immutable data eliminates this entirely because once created, the data never changes. Any number of threads can read the same immutable data concurrently without locks, atomic operations, or synchronization. This is one of the primary motivations for immutability in concurrent systems like Clojure and Erlang.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "What is the main disadvantage of copy-on-write (COW) semantics?",
    options: [
      "COW prevents any form of data sharing between copies",
      "COW can cause unexpected latency spikes — a write operation may trigger a deep copy that is much slower than surrounding read operations",
      "COW requires garbage collection and cannot work with reference counting",
      "COW data structures cannot be used in functional programming languages",
    ],
    answer: 1,
    explanation:
      "Copy-on-write defers copying until a mutation actually occurs, making reads and shared references very cheap. However, when a write does happen, the full copy must be performed at that moment, which can be significantly slower than a typical read operation. This creates unpredictable latency — most operations are fast (reads on shared data), but occasional writes trigger expensive copies. In latency-sensitive applications, this unpredictability can be problematic. Swift mitigates this by uniqueness checking — if the reference count is 1, the copy is skipped.",
  },

  // ============================================================
  // Topic 3: First-Class & Higher-Order Functions (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "What makes a function 'first-class' in a programming language?",
    options: [
      "The function is defined at the top level of the module, not nested inside another function",
      "The function has been optimized by the compiler for maximum performance",
      "The function can be treated as a value — assigned to variables, passed as arguments, returned from functions, and stored in data structures",
      "The function is part of the language's standard library rather than user-defined",
    ],
    answer: 2,
    explanation:
      "A first-class function is a function that the language treats as a value, just like integers or strings. You can assign it to a variable (const f = Math.sqrt), pass it as an argument (array.map(f)), return it from another function (function makeAdder(n) { return x => x + n }), and store it in a data structure ([add, subtract, multiply]). This is not about where the function is defined or how fast it runs — it is about the language treating functions as data that can flow through the program.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "Which of the following is a higher-order function?",
    options: [
      "A function that returns the larger of two numbers",
      "A function that takes an array and returns its length",
      "A function that takes a predicate function and an array, and returns only the elements for which the predicate returns true",
      "A function that concatenates two strings",
    ],
    answer: 2,
    explanation:
      "A higher-order function (HOF) either takes one or more functions as arguments OR returns a function as its result. The filter function takes a predicate function (a function returning boolean) and an array, and returns the filtered array — it takes a function as an argument, making it a higher-order function. The other options only take and return plain values (numbers, strings, arrays) without accepting or returning functions.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "What problem can closures over mutable variables cause?",
    options: [
      "Closures always consume too much memory to be practical",
      "Closures prevent garbage collection of all variables in the program",
      "All closures in a loop can capture the same mutable variable and share its final value instead of capturing the value at each iteration — the classic loop-and-closure bug",
      "Closures cannot access variables from the outer scope",
    ],
    answer: 2,
    explanation:
      "The classic loop-and-closure problem occurs in JavaScript's var-based for loops: 'for (var i = 0; i < 5; i++) { setTimeout(() => console.log(i), 100) }' prints 5 five times because all closures capture the same var i, which has value 5 after the loop. Each closure does not get its own copy of i — they all share the single mutable variable. The fix is to use 'let' (which creates a new binding per iteration) or an IIFE to create a new scope for each closure.",
  },

  // ============================================================
  // Topic 4: Recursion & Tail Call Optimization (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "Why is 'function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1) }' NOT tail-recursive?",
    options: [
      "Because it uses a conditional expression (ternary operator)",
      "Because factorial is called more than once",
      "Because the last operation is multiplication (n * result), not the recursive call itself — the recursive call's result must be multiplied before returning",
      "Because n is decremented instead of incremented",
    ],
    answer: 2,
    explanation:
      "For a function to be tail-recursive, the recursive call must be the LAST operation — nothing can happen after the recursive call returns. In 'n * factorial(n - 1)', the recursive call to factorial(n - 1) returns a value, and then that value is multiplied by n. This multiplication happens AFTER the recursive call, meaning the call is not in tail position. A tail-recursive version uses an accumulator: 'factorial(n, acc = 1) { return n <= 1 ? acc : factorial(n - 1, n * acc) }' where factorial is the last operation.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "What does a trampoline do to achieve stack-safe recursion?",
    options: [
      "It allocates a larger stack to accommodate deep recursion",
      "It compiles recursive functions into machine code loops",
      "Instead of making recursive calls, the function returns a thunk (deferred computation), and a loop repeatedly invokes these thunks — keeping the stack depth at O(1)",
      "It caches intermediate results to avoid redundant recursive calls",
    ],
    answer: 2,
    explanation:
      "A trampoline converts recursive calls into a flat loop. Instead of the function directly calling itself (which adds a stack frame), it returns a thunk — a zero-argument function wrapping the next recursive step. The trampoline loop then calls this thunk, which may return another thunk or a final value. Since the loop calls one thunk at a time (each returning before the next is called), the stack never grows beyond O(1). This achieves stack safety in languages without tail call optimization.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "Which of these languages guarantees tail call optimization by specification?",
    options: [
      "Python — it is a high-level language designed for readability",
      "Java — the JVM is optimized for performance",
      "Scheme — the R5RS and later standards require implementations to perform proper tail calls",
      "JavaScript — ES6 specifies TCO and all major engines implement it",
    ],
    answer: 2,
    explanation:
      "Scheme (R5RS, R6RS, R7RS) is one of the few languages that REQUIRES tail call optimization by specification — any conforming Scheme implementation must support proper tail calls, meaning tail-recursive functions run in O(1) stack space. Python explicitly rejects TCO (Guido van Rossum considers it harmful to debugging). Java does not support TCO. JavaScript ES6 does specify TCO, but only Safari's JavaScriptCore actually implements it — V8 and SpiderMonkey do not, making it unreliable in practice.",
  },

  // ============================================================
  // Topic 5: Function Composition & Pipelines (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "What is the difference between compose(f, g) and pipe(f, g)?",
    options: [
      "compose applies functions in parallel; pipe applies them sequentially",
      "compose(f, g)(x) computes f(g(x)) — right to left; pipe(f, g)(x) computes g(f(x)) — left to right, matching natural reading order",
      "There is no difference; they are aliases for the same operation",
      "compose works only with pure functions; pipe works with any functions",
    ],
    answer: 1,
    explanation:
      "compose follows the mathematical convention of function composition: compose(f, g)(x) means f(g(x)) — g is applied first, then f (right to left). pipe reverses this to match natural reading order: pipe(f, g)(x) means g(f(x)) — f is applied first, then g (left to right). Most developers find pipe more readable because you read the transformations in the order they are applied, like reading a recipe from top to bottom. Both produce the same result when the arguments are reversed.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "Why is the data-last convention important for currying and composition?",
    options: [
      "Data-last makes functions run faster by optimizing the last argument",
      "Data-last allows partial application of configuration/behavior arguments first, producing a specialized function that awaits only the data — perfect for composing into pipelines",
      "Data-last is required by the JavaScript specification for Array methods",
      "Data-last prevents type errors in TypeScript generics",
    ],
    answer: 1,
    explanation:
      "With data-last convention, the 'data' argument (the thing being transformed) is the last parameter. This means you can partially apply the configuration arguments first: map(double) partially applies the transformation, returning a function that awaits only the array. This specialized function composes naturally: pipe(map(double), filter(isEven), take(5)) creates a pipeline where each step is a partially applied function waiting for data. With data-first (lodash style), you cannot partially apply without wrapper functions.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "What problem do transducers solve?",
    options: [
      "Transducers enable parallel execution of map and filter operations across multiple CPU cores",
      "Transducers eliminate intermediate collections — array.map(f).filter(g).map(h) creates three intermediate arrays, while a transducer fuses these into a single pass over the data",
      "Transducers allow composition of async operations like Promises",
      "Transducers convert recursive algorithms into iterative ones",
    ],
    answer: 1,
    explanation:
      "When you chain array.map(f).filter(g).map(h), each step creates a new intermediate array — the first map creates array 1, filter creates array 2, the second map creates array 3. For large arrays, this wastes memory and CPU on allocating and iterating through throwaway arrays. Transducers compose the transformations themselves (not the data) into a single reducing function that applies f, g, and h to each element in one pass, producing only the final result. This is especially impactful for large datasets with many transformation steps.",
  },

  // ============================================================
  // Topic 6: Algebraic Data Types (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "How do sum types make 'illegal states unrepresentable'?",
    options: [
      "Sum types encrypt data to prevent unauthorized access",
      "Sum types use runtime validation to reject invalid states",
      "Sum types define exactly which variants are possible — each variant carries only the data it needs, so combinations of fields that shouldn't coexist are impossible to construct",
      "Sum types perform garbage collection to remove invalid objects",
    ],
    answer: 2,
    explanation:
      "Instead of a single type with nullable fields (e.g., { status: string, data?: T, error?: string } where data and error could both be present or both absent), sum types define distinct variants: Loading | Success(data: T) | Error(message: string). Each variant carries exactly the data it needs — Success always has data and never has an error, Error always has a message and never has data. The invalid state 'has both data and error' is literally impossible to construct because no variant includes both fields.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What is exhaustiveness checking in pattern matching?",
    options: [
      "A performance optimization that checks if pattern matching can be compiled to a jump table",
      "A runtime check that throws an error if no pattern matches",
      "A compile-time check that ensures every possible variant of a sum type is handled — if you add a new variant, the compiler flags every match expression that doesn't handle it",
      "A static analysis that determines the most common pattern to optimize for",
    ],
    answer: 2,
    explanation:
      "Exhaustiveness checking is a compile-time guarantee that every possible case in a sum type is handled by a pattern match. If Shape = Circle | Rectangle | Triangle and your match only handles Circle and Rectangle, the compiler reports an error saying Triangle is not covered. This is especially valuable during refactoring — when you add a new variant, every match expression in the codebase that doesn't handle it is flagged, ensuring you cannot forget to update handlers. Languages with exhaustiveness checking include Rust, Haskell, Scala, OCaml, and TypeScript (via never type).",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "What is the cardinality of a product type { active: boolean, role: 'admin' | 'user' | 'guest' }?",
    options: [
      "2 (boolean has 2 values)",
      "3 (role has 3 values)",
      "5 (2 + 3, the sum of field cardinalities)",
      "6 (2 * 3, the product of field cardinalities — every combination of active and role is valid)",
    ],
    answer: 3,
    explanation:
      "A product type's cardinality is the PRODUCT (multiplication) of its fields' cardinalities — this is why they are called product types. active: boolean has 2 possible values (true, false) and role has 3 possible values ('admin', 'user', 'guest'). The total number of distinct values is 2 * 3 = 6: (true, admin), (true, user), (true, guest), (false, admin), (false, user), (false, guest). In contrast, a sum type's cardinality is the SUM of its variants' cardinalities.",
  },

  // ============================================================
  // Topic 7: Functors & Applicatives (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "Which functor law does this violate: array.map(x => x) returns a different array than the original?",
    options: [
      "It violates the composition law (map(f).map(g) === map(g . f))",
      "It violates the identity law — mapping the identity function should return the functor unchanged (F.map(id) === F)",
      "It does not violate any law because arrays are compared by reference, not value",
      "It violates the associativity law",
    ],
    answer: 1,
    explanation:
      "The functor identity law states that mapping the identity function (x => x) over a functor must return a value equal to the original functor: F.map(id) === F. In JavaScript, [1,2,3].map(x => x) returns a new array [1,2,3] which is referentially different (=== returns false), but structurally equal. The functor law is about structural/value equality, not reference identity. If a map implementation changed the order or values when given the identity function, THAT would violate the identity law. JavaScript arrays satisfy functor laws under value equality.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "What can applicative functors do that plain functors cannot?",
    options: [
      "Applicatives can map a function over a single wrapped value",
      "Applicatives can unwrap values from their context",
      "Applicatives can apply a function of multiple arguments to multiple independently wrapped values — for example, applying add to Some(3) and Some(5) to get Some(8)",
      "Applicatives can create infinite lazy sequences",
    ],
    answer: 2,
    explanation:
      "A plain functor's map can only apply a single-argument function to a single wrapped value: Some(3).map(double) gives Some(6). But what if you want to apply add (which takes two arguments) to Some(3) and Some(5)? Functors cannot do this. Applicatives provide 'ap' (apply) which takes a wrapped function (Some(add(3))) and a wrapped value (Some(5)) and produces a wrapped result (Some(8)). This enables combining multiple independent wrapped values — crucial for validation where you want to accumulate all errors from multiple fields.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "What does traverse(fetchUser, [1, 2, 3]) return if all fetches succeed?",
    options: [
      "An array of three Promises, each resolving to a user",
      "A single Promise resolving to an array of three users — it maps the effectful function over the list and sequences the effects",
      "Three separate user objects, unwrapped from their Promises",
      "An error because traverse cannot handle arrays",
    ],
    answer: 1,
    explanation:
      "traverse combines map and sequence in a single operation. It maps the effectful function (fetchUser) over the list [1, 2, 3], producing [Promise<User>, Promise<User>, Promise<User>], then sequences the effects, turning the structure 'inside out' to produce Promise<[User, User, User]> — a single Promise that resolves to an array of all three users. This is equivalent to Promise.all(ids.map(fetchUser)) in JavaScript. If any fetch fails, the entire result fails (because Promise is a monad, not just an applicative).",
  },

  // ============================================================
  // Topic 8: Monads (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "What is the key difference between map (functor) and flatMap (monad)?",
    options: [
      "map is synchronous while flatMap is asynchronous",
      "map applies a function A -> B to F<A> producing F<B>, while flatMap applies a function A -> F<B> to F<A> producing F<B> — flatMap flattens the nested layer that would result from applying a context-producing function",
      "map works on arrays while flatMap works on objects",
      "There is no difference; they are synonyms",
    ],
    answer: 1,
    explanation:
      "The crucial difference is in the function's return type. map takes a plain function (A -> B) and lifts it into the functor context: F<A>.map(A -> B) = F<B>. If the function itself returns a wrapped value (A -> F<B>), using map produces a nested result: F<A>.map(A -> F<B>) = F<F<B>>. flatMap handles this case by flattening: F<A>.flatMap(A -> F<B>) = F<B>. This flattening is what makes monads powerful — it allows sequencing operations that each produce wrapped values without nesting accumulating.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "Why does the Maybe/Option monad short-circuit on None?",
    options: [
      "None throws an exception that interrupts the chain",
      "None causes a runtime error that terminates the program",
      "flatMap is defined so that None.flatMap(f) returns None without calling f — once a None appears, all subsequent operations are skipped and the final result is None",
      "None is converted to a default value automatically",
    ],
    answer: 2,
    explanation:
      "The Maybe/Option monad's flatMap is defined as: Some(x).flatMap(f) = f(x) and None.flatMap(f) = None. Once any step produces None, flatMap simply returns None without invoking the function f. This provides automatic null-safe chaining: user.flatMap(getAddress).flatMap(getZipCode) returns None if user is None, or if getAddress returns None, or if getZipCode returns None — no null checks needed. The function f is only called when there is a value to apply it to.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "What does do-notation desugar to?",
    options: [
      "A series of if-else statements checking for errors",
      "A chain of nested flatMap calls — each '<-' becomes a flatMap, and the final expression becomes a map",
      "A promise chain using .then()",
      "A loop that iterates over monadic values",
    ],
    answer: 1,
    explanation:
      "Do-notation is syntactic sugar for nested flatMap/map chains. 'do { x <- getUser(id); orders <- getOrders(x.id); return (x, orders) }' desugars to 'getUser(id).flatMap(x => getOrders(x.id).map(orders => (x, orders)))'. Each '<-' binding becomes a flatMap that passes the unwrapped value to the rest of the block. The final expression (after the last <-) uses map instead of flatMap because it produces a plain value, not a monadic one. This transformation is purely syntactic — the behavior is identical to manually written flatMap chains.",
  },

  // ============================================================
  // Topic 9: Type Systems & Type Inference (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What does Hindley-Milner type inference achieve that explicit typing does not?",
    options: [
      "It makes programs run faster by optimizing types at compile time",
      "It automatically deduces the most general (principal) type of every expression without any type annotations — meaning the compiler infers types that are as polymorphic as possible",
      "It allows mixing typed and untyped code in the same module",
      "It eliminates the possibility of type errors entirely",
    ],
    answer: 1,
    explanation:
      "Hindley-Milner (HM) type inference determines the principal type of every expression — the most general type that is compatible with all uses. For example, it infers that 'id x = x' has type 'forall a. a -> a' (works for any type) rather than 'Int -> Int'. The compiler uses unification to solve type equations generated from the code. This means you get the safety of static typing with the conciseness of dynamic typing — you rarely need to write type annotations. HM is used in Haskell, OCaml, SML, and partially in Scala and TypeScript.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "What does the parametricity 'free theorem' tell us about a function with type 'forall a. [a] -> [a]'?",
    options: [
      "The function must sort the list",
      "The function must return the list unchanged",
      "The function can only rearrange, duplicate, or drop elements — it cannot create new elements or inspect their values because the type 'a' is abstract",
      "The function must reverse the list",
    ],
    answer: 2,
    explanation:
      "Parametricity guarantees that a function polymorphic in 'a' cannot inspect, create, or modify values of type 'a' — it only knows they exist. A function [a] -> [a] can: return the same list, reverse it, take the first n elements, drop elements, repeat elements, return the empty list, or rearrange elements. It CANNOT sort (requires comparison), filter by value (requires inspection), or insert new elements (cannot create values of unknown type a). This constraint, derived purely from the type, is called a 'free theorem'.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "What are phantom types used for?",
    options: [
      "Types that exist only in documentation but are not checked by the compiler",
      "Type parameters that appear in the type signature but not in the value — used to encode compile-time distinctions between values with the same runtime representation",
      "Types that are automatically garbage collected when no longer referenced",
      "Types that can only be used in test code, not production code",
    ],
    answer: 1,
    explanation:
      "Phantom types are type parameters that do not appear in the data structure's runtime representation — they exist only at the type level. For example, Token<Admin> and Token<User> both contain a string at runtime, but the type system treats them as different types, preventing you from using a User token where an Admin token is required. Similarly, Length<Meters> and Length<Feet> prevent accidental mixing of units. The phantom type parameter is 'phantom' because it has no runtime cost — it is erased during compilation.",
  },

  // ============================================================
  // Topic 10: Category Theory Essentials (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "In the category of types and functions, what are the objects and morphisms?",
    options: [
      "Objects are classes and morphisms are method calls",
      "Objects are values and morphisms are operators",
      "Objects are types (Int, String, Bool, etc.) and morphisms are functions between types — a function f: A -> B is a morphism from A to B",
      "Objects are modules and morphisms are imports",
    ],
    answer: 2,
    explanation:
      "In the programming category (often called Hask for Haskell), types are the objects and functions are the morphisms (arrows). A function f: Int -> String is a morphism from the object Int to the object String. Composition of morphisms corresponds to function composition: if f: A -> B and g: B -> C, then g . f: A -> C. The identity morphism for each type is the identity function (id: A -> A). These categorical properties — composition and identity — are exactly the properties that make functional programming compositional.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "Why is associativity important for monoids?",
    options: [
      "Associativity ensures that the monoid operation is commutative",
      "Associativity allows you to group operations in any way without changing the result — enabling parallel computation by splitting work into chunks and combining results in any order",
      "Associativity prevents stack overflow during recursive reduction",
      "Associativity guarantees that the identity element is unique",
    ],
    answer: 1,
    explanation:
      "Associativity means (a + b) + c = a + (b + c) — you can group operations however you like and get the same result. This is crucial for parallelization: to sum [1, 2, 3, 4, 5, 6, 7, 8], you can split into [1+2+3+4] and [5+6+7+8] on two cores, then combine the results. Without associativity, you would be forced to process elements left-to-right sequentially. MapReduce relies on this property — the 'reduce' step combines partial results from different mappers, and associativity guarantees the grouping does not affect the final result.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "What is a natural transformation in programming terms?",
    options: [
      "A function that changes the type of values inside a container",
      "A polymorphic function that converts one type of container to another — e.g., Array<A> to Option<A> — working uniformly for any element type A",
      "A compiler optimization that transforms code into a more efficient form",
      "A function that converts mutable data structures to immutable ones",
    ],
    answer: 1,
    explanation:
      "A natural transformation is a polymorphic function between two functors — it converts the container/context without knowing or caring about the element type. For example, safeHead: Array<A> -> Option<A> takes the first element of any array and wraps it in Option. It works the same way whether the array contains numbers, strings, or users. The key property (naturality condition) is that safeHead(xs.map(f)) === safeHead(xs).map(f) — transforming then mapping equals mapping then transforming. Common examples include Promise.all (turning Array<Promise<A>> into Promise<Array<A>>).",
  },

  // ============================================================
  // Topic 11: Error Handling & Effects (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "What is 'railway-oriented programming'?",
    options: [
      "A programming paradigm inspired by train scheduling algorithms",
      "A visual metaphor where computation flows on two tracks — the success track (Ok/Right) continues forward while the error track (Err/Left) bypasses remaining operations, automatically propagating the first error to the end",
      "A method of parallelizing computations across multiple CPU cores arranged in a pipeline",
      "A debugging technique that traces function calls in a linear sequence",
    ],
    answer: 1,
    explanation:
      "Railway-oriented programming, coined by Scott Wlaschin, visualizes Result/Either-based computation as two railway tracks. Functions that can fail are 'switches' — they take input from the success track and either continue on the success track (Ok) or shunt to the error track (Err). flatMap chains these switches: if any function produces Err, all subsequent functions are bypassed and the error flows directly to the end. This replaces nested try-catch blocks with a linear pipeline where errors automatically propagate without explicit checking at each step.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "How do algebraic effects differ from monads for handling side effects?",
    options: [
      "Algebraic effects are slower but more type-safe than monads",
      "Algebraic effects separate effect declaration from interpretation — you declare what effects a function uses, and handlers provide the implementation, avoiding the composition problems of monad transformer stacks",
      "Algebraic effects only work in dynamically typed languages",
      "Algebraic effects replace the type system with runtime checks",
    ],
    answer: 1,
    explanation:
      "Monads encode effects in the return type and compose via monad transformers, which have known issues: performance overhead, fixed ordering, and complex type signatures (ReaderT Config (StateT AppState (ExceptT Error IO))). Algebraic effects take a different approach — functions declare the effects they use (like declaring exceptions), and handlers at call sites provide the interpretation. Effects compose naturally without transformers, can be reordered freely, and can have multiple handlers for the same effect (e.g., different database handlers for testing vs production).",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "Why are Promises considered 'approximate monads' rather than true monads?",
    options: [
      "Promises do not support chaining with .then()",
      "Promises eagerly evaluate and auto-flatten nested Promises — Promise<Promise<T>> is impossible because .then() automatically unwraps inner Promises, and Promises execute immediately upon creation rather than being lazy descriptions of computation",
      "Promises can only handle asynchronous operations, not synchronous ones",
      "Promises do not have an identity operation (Promise.resolve)",
    ],
    answer: 1,
    explanation:
      "True monads distinguish between M<A> and M<M<A>> — flatMap explicitly flattens one layer while map does not. JavaScript Promises auto-flatten: Promise.resolve(Promise.resolve(5)) gives Promise<number>, not Promise<Promise<number>>. This means .then() is simultaneously map AND flatMap, and you cannot have a Promise of a Promise. Additionally, Promises are eager — they begin executing immediately upon creation, while monadic IO in Haskell is a lazy description that only executes when the runtime demands it. These differences mean Promises do not satisfy the monad laws precisely.",
  },

  // ============================================================
  // Topic 12: Property-Based Testing (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "How does property-based testing differ from example-based (unit) testing?",
    options: [
      "Property-based tests are faster to execute than unit tests",
      "Property-based tests only work with pure functions, unlike unit tests",
      "Property-based tests assert that universal properties hold for many randomly generated inputs — instead of testing 'sort([3,1,2]) === [1,2,3]', you test 'for all arrays xs: sort(xs) is ordered AND has the same elements as xs'",
      "Property-based tests do not require assertions; they only check for crashes",
    ],
    answer: 2,
    explanation:
      "Example-based tests verify specific input/output pairs — sort([3,1,2]) should give [1,2,3]. They cover exactly the cases you think of. Property-based tests assert universal properties — 'for all valid inputs xs: the output of sort(xs) is non-decreasing AND is a permutation of xs'. The framework generates hundreds of random inputs to try to find a counterexample. This can discover edge cases (empty arrays, arrays with duplicates, very large arrays, negative numbers) that you might not think to test manually.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "What is 'shrinking' in property-based testing?",
    options: [
      "Reducing the number of test cases to speed up the test suite",
      "Compressing test data to save memory during test execution",
      "Automatically reducing a failing input to the smallest counterexample that still fails — making it easier to understand and debug the root cause",
      "Removing redundant properties from the test specification",
    ],
    answer: 2,
    explanation:
      "When a property-based test finds a failing input (e.g., an array of 100 elements that causes sort to crash), the raw counterexample is usually too large to be useful for debugging. Shrinking systematically reduces the input — trying smaller arrays, smaller numbers, removing elements — while checking that the property still fails. It continues until no further reduction is possible, producing the minimal counterexample (e.g., [0, -1] causes the crash). This minimal example makes the bug obvious and is one of the most valuable features of property-based testing.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "What is a roundtrip property?",
    options: [
      "A property that tests the performance of a round-trip network call",
      "A property asserting that encoding then decoding (or serializing then deserializing) returns the original value — decode(encode(x)) === x for all valid inputs x",
      "A property that checks a function returns to its initial state after two calls",
      "A property that verifies bidirectional data binding in UI frameworks",
    ],
    answer: 1,
    explanation:
      "A roundtrip property asserts that two inverse operations cancel each other out: decode(encode(x)) === x for all valid x. This is extremely useful for testing serialization (JSON.parse(JSON.stringify(obj))), compression (decompress(compress(data))), encryption (decrypt(encrypt(message))), and parsing (prettyPrint(parse(source))). It is one of the easiest and most powerful properties to write because it requires no knowledge of the correct output — only that the round trip preserves the input. Any failure indicates a bug in either the encoder or decoder.",
  },

  // ============================================================
  // Topic 13: FP in Practice (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "What FP concept does Redux's reducer pattern directly implement?",
    options: [
      "Monads — each action is wrapped in a monadic context",
      "A pure function fold (reduce) — the reducer takes the current state and an action, returning a new state without mutation, exactly like a fold over a stream of actions",
      "Applicative functors — actions are independent computations combined by Redux",
      "Category theory — Redux dispatchers are morphisms between state objects",
    ],
    answer: 1,
    explanation:
      "A Redux reducer is a pure function (state, action) => newState — it takes the current state and an action, and returns a new state without mutating the original. This is exactly the signature of a fold/reduce accumulator function. The application state is the result of folding (reducing) all dispatched actions over the initial state: finalState = actions.reduce(reducer, initialState). Because reducers are pure functions, they are easily testable, composable, and support time-travel debugging (replaying actions to reproduce state).",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "What is the key benefit of the 'functional core / imperative shell' architecture?",
    options: [
      "It eliminates the need for any imperative code in the application",
      "It makes the application run faster by using pure functions for I/O",
      "The pure functional core containing all business logic can be tested without mocking databases, APIs, or file systems — because it is pure, you only need to test inputs and outputs",
      "It allows the application to run without a garbage collector",
    ],
    answer: 2,
    explanation:
      "By isolating all business logic, decisions, and transformations into pure functions (the core), you can test them with simple unit tests — no database mocking, no HTTP stubbing, no file system setup. The pure core receives data as arguments and returns results as return values. The imperative shell handles I/O (reading from databases, calling APIs, writing files) and passes data to the core for processing. This means the most complex and important part of your application (the business logic) has the simplest and most reliable tests.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "How does fp-ts differ from Ramda in its approach to functional programming in JavaScript/TypeScript?",
    options: [
      "fp-ts is for backend code while Ramda is for frontend code",
      "fp-ts provides type-safe algebraic abstractions (Option, Either, TaskEither, type classes like Functor and Monad) with pipe, while Ramda provides auto-curried utility functions focused on data transformation without algebraic types",
      "fp-ts is faster at runtime while Ramda has a smaller bundle size",
      "fp-ts only works with TypeScript while Ramda only works with JavaScript",
    ],
    answer: 1,
    explanation:
      "fp-ts brings Haskell-style functional programming to TypeScript — it provides algebraic data types (Option, Either, TaskEither), type classes (Functor, Monad, Monoid), and lawful abstractions with full type safety. It emphasizes correctness and leverages TypeScript's type system. Ramda, on the other hand, is a practical utility library — it provides auto-curried, data-last functions (map, filter, assoc, path) focused on data transformation and composition. Ramda does not provide Option/Either types or type class hierarchies. The choice depends on whether you want algebraic FP (fp-ts) or pragmatic functional utilities (Ramda).",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
