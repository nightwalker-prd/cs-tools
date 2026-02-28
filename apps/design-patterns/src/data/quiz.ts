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
  // Topic 1: SOLID Principles (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "What does 'a class should have only one reason to change' actually mean in the context of SRP?",
    options: [
      "A class should contain only one method",
      "A class should serve only one stakeholder or business concern — if two different stakeholders could request changes, the class has too many responsibilities",
      "A class should only be modified once in its lifetime",
      "A class should depend on only one other class",
    ],
    answer: 1,
    explanation:
      "Robert Martin defines 'reason to change' as a stakeholder or actor who might request changes. If a class handles both payroll calculation (requested by the CFO) and report formatting (requested by the COO), it has two reasons to change — two different stakeholders with different change drivers. Splitting into separate classes ensures that changes for one stakeholder don't risk breaking functionality for the other.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "A Square class extends Rectangle and overrides setWidth() to also set height. Why does this violate the Liskov Substitution Principle?",
    options: [
      "Square should not be a subclass of Rectangle because squares are simpler",
      "Client code using a Rectangle reference expects that setting width does not affect height — Square's override breaks this expectation, causing incorrect behavior when substituted",
      "The Square class has fewer methods than Rectangle",
      "Inheritance is always wrong for geometric shapes",
    ],
    answer: 1,
    explanation:
      "LSP requires that subtypes be substitutable for their base types without altering program correctness. Client code working with Rectangle expects that setWidth(5) changes only the width, leaving height unchanged. A Square that also sets height breaks this postcondition — code like 'rect.setWidth(5); rect.setHeight(3); assert area == 15' fails because the Square's area would be 9. The IS-A relationship in math (a square IS a rectangle) doesn't hold as a behavioral subtype in code.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "How does the Open/Closed Principle recommend adding new behavior to a system?",
    options: [
      "By modifying existing classes to add new conditions and branches",
      "By deleting old code and rewriting it with the new behavior",
      "By extending through new classes (inheritance, composition, or plugins) that implement existing abstractions — without modifying the tested, deployed code",
      "By adding feature flags that toggle new behavior in existing code",
    ],
    answer: 2,
    explanation:
      "The Open/Closed Principle states that software entities should be open for extension but closed for modification. This means new behavior should be added by creating new implementations of existing abstractions (new strategy classes, new plugins, new decorators) rather than editing existing code. The existing code is 'closed' — tested and stable — while the abstraction points are 'open' for new implementations. This reduces the risk of introducing regressions in proven code.",
  },

  // ============================================================
  // Topic 2: Factory Patterns (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "What is the key difference between Factory Method and Abstract Factory?",
    options: [
      "Factory Method uses static methods while Abstract Factory uses instance methods",
      "Factory Method creates one product type through subclass inheritance; Abstract Factory creates families of related products through composition",
      "Factory Method is a behavioral pattern; Abstract Factory is a structural pattern",
      "Factory Method is more complex than Abstract Factory",
    ],
    answer: 1,
    explanation:
      "Factory Method is about creating a single product — the base class declares an abstract creation method, and subclasses decide which concrete class to instantiate. Abstract Factory creates entire families of related objects — it declares methods for creating each product in the family (e.g., createButton(), createCheckbox(), createTextField()), and each concrete factory produces a consistent set. Abstract Factory is often implemented using multiple Factory Methods.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "Why does a Simple Factory violate the Open/Closed Principle?",
    options: [
      "It uses a private constructor",
      "Adding a new product type requires modifying the factory method — adding a new branch to the conditional (switch/if-else) that selects which class to create",
      "It creates objects that are too tightly coupled",
      "It uses static methods which cannot be overridden",
    ],
    answer: 1,
    explanation:
      "A Simple Factory centralizes creation logic in a single method with conditional statements: 'if type == A, return new A; if type == B, return new B'. Adding a new type C requires modifying this method to add 'if type == C, return new C' — changing existing code rather than extending through new classes. The Factory Method pattern solves this by using subclasses (each new product type gets a new factory subclass), and Abstract Factory solves it at the family level.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "What problem does the Abstract Factory pattern solve that the Factory Method pattern alone cannot?",
    options: [
      "It creates objects faster through parallel instantiation",
      "It ensures that products from the same family are used together — preventing accidental mixing of incompatible products (e.g., a Windows button with a macOS scrollbar)",
      "It reduces the total number of classes in the system",
      "It allows lazy initialization of products",
    ],
    answer: 1,
    explanation:
      "Abstract Factory enforces consistency within a product family. When you use a WindowsFactory, it produces WindowsButton, WindowsCheckbox, and WindowsTextField — all visually consistent. You cannot accidentally create a WindowsButton with a MacCheckbox because the factory produces the entire set. Factory Method alone creates individual products without guaranteeing cross-product consistency, so a system using multiple independent Factory Methods could mix products from different families.",
  },

  // ============================================================
  // Topic 3: Builder & Prototype (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "What problem does the Builder pattern solve that a constructor with many parameters does not?",
    options: [
      "Builders execute faster than constructors",
      "Builders avoid the telescoping constructor problem — named methods like .withColor('red').withSize(5) are self-documenting, while positional constructor arguments like new Car('red', 5, true, null, 'auto') are ambiguous and error-prone",
      "Builders use less memory than constructors",
      "Builders automatically validate parameters while constructors cannot",
    ],
    answer: 1,
    explanation:
      "Telescoping constructors occur when a class has many optional parameters — you end up with multiple constructors of increasing length, or a single constructor where callers must pass null for unneeded parameters. The positional nature makes it easy to swap arguments (is 5 the size or the weight?). Builders solve this with named setter methods that clearly communicate what each value represents, and the build() method can validate the complete configuration before creating the object.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "What is the critical design decision when implementing the Prototype pattern's clone() method?",
    options: [
      "Whether to use a factory to create prototypes",
      "Whether to perform a shallow copy (shared references to nested objects) or a deep copy (independent copies of all nested objects) — getting this wrong leads to subtle shared-state bugs or unnecessary expense",
      "Whether to use serialization or reflection for cloning",
      "Whether to make the clone immutable",
    ],
    answer: 1,
    explanation:
      "A shallow copy duplicates the top-level object but shares references to nested objects — modifying a nested object in the clone also modifies the original, leading to subtle bugs. A deep copy recursively copies all nested objects, creating a fully independent instance, but can be expensive and complex (handling circular references, shared objects in graphs). The right choice depends on whether the nested objects are immutable (shallow is safe) or mutable (deep is needed).",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "Why can fluent interfaces make debugging more difficult?",
    options: [
      "Fluent interfaces generate more bytecode than regular method calls",
      "Long method chains appear as a single expression in stack traces and debuggers — it is hard to inspect intermediate state or determine which method in the chain threw an exception",
      "Fluent interfaces bypass the type checker",
      "Fluent interfaces cannot handle null values",
    ],
    answer: 1,
    explanation:
      "In a chain like query.select('*').from('users').where('age > 18').orderBy('name').limit(10), if an exception occurs, the stack trace points to the entire chain as one line. A debugger cannot easily step into a specific method in the middle of the chain, and you cannot inspect the state after .where() but before .orderBy() without breaking the chain into separate statements. This is the primary practical tradeoff of the fluent style.",
  },

  // ============================================================
  // Topic 4: Singleton & Dependency Injection (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "Why is the Singleton pattern considered harmful for unit testing?",
    options: [
      "Singleton classes cannot be instantiated in test environments",
      "The singleton controls its own lifecycle and provides global access — tests cannot easily substitute a mock implementation because the class directly calls the static getInstance() method rather than receiving the dependency",
      "Singletons are too slow for unit tests",
      "Singletons cannot be serialized for test fixtures",
    ],
    answer: 1,
    explanation:
      "Unit testing requires isolating the class under test from its dependencies by substituting mocks or stubs. When a class calls Singleton.getInstance() directly, it creates a hard dependency on the concrete singleton class — you cannot inject a mock without modifying the singleton itself (e.g., adding a setInstance() method for testing, which undermines the pattern). Dependency injection solves this by passing the dependency through the constructor, making substitution trivial.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "What advantage does constructor injection have over setter injection for required dependencies?",
    options: [
      "Constructor injection is faster at runtime",
      "Constructor injection guarantees the object is fully initialized before use — the object cannot exist without its required dependencies, preventing null reference errors from forgotten setter calls",
      "Constructor injection uses less memory",
      "Constructor injection supports circular dependencies",
    ],
    answer: 1,
    explanation:
      "With setter injection, an object can be created in an incomplete state — if a caller forgets to call setDependency(), the object has a null reference that will fail at runtime when used. Constructor injection makes all required dependencies mandatory parameters — the object cannot be instantiated without them, shifting the error from runtime to compile time (or at least to construction time). This makes the invariant 'all dependencies are present' enforced by the type system.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What is the Service Locator anti-pattern and how does it relate to IoC containers?",
    options: [
      "Service Locator is a pattern where services are discovered at compile time through static analysis",
      "Service Locator occurs when classes pull dependencies from a container by calling container.resolve() inside their methods — hiding dependencies and making the class dependent on the container itself",
      "Service Locator is when services are located on different servers in a distributed system",
      "Service Locator is a valid alternative to constructor injection with no downsides",
    ],
    answer: 1,
    explanation:
      "The Service Locator anti-pattern occurs when a class internally calls the IoC container to resolve its dependencies: 'this.logger = container.get(Logger)'. This hides the class's dependencies (they're not visible in the constructor signature), creates a hard dependency on the container itself, and makes unit testing require a configured container rather than simple mock injection. Proper IoC uses constructor injection — the container resolves dependencies externally and passes them in, keeping the class container-agnostic.",
  },

  // ============================================================
  // Topic 5: Adapter & Facade (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "What distinguishes the Adapter pattern from the Facade pattern?",
    options: [
      "Adapter simplifies an interface while Facade converts an interface",
      "Adapter converts an existing interface to a different expected interface (making incompatible things compatible); Facade provides a simplified interface to a complex subsystem (making complex things easy)",
      "Adapter works with one class while Facade works with multiple classes",
      "Adapter uses inheritance while Facade uses composition",
    ],
    answer: 1,
    explanation:
      "The key distinction is intent. An Adapter makes two incompatible interfaces work together — it wraps an existing class whose interface doesn't match what the client expects and translates between them. A Facade provides a simpler, higher-level interface to a complex subsystem — it doesn't change interfaces for compatibility but rather hides complexity for convenience. An Adapter changes the interface; a Facade simplifies the entry point. Both use wrapping, but for fundamentally different reasons.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "Why is the object adapter approach generally preferred over the class adapter approach?",
    options: [
      "Object adapters are faster because they use composition instead of inheritance",
      "Object adapter uses composition (wrapping the adaptee as a field), allowing it to adapt any subclass of the adaptee and enabling runtime flexibility — while class adapter requires multiple inheritance, which many languages don't support",
      "Object adapters use less memory than class adapters",
      "Object adapters can adapt multiple classes simultaneously while class adapters cannot",
    ],
    answer: 1,
    explanation:
      "Class adapter inherits from both the target interface and the adaptee class, requiring multiple inheritance (available in C++ but not Java, C#, or TypeScript). Object adapter wraps the adaptee via composition — it holds a reference to any object implementing the adaptee interface. This means it can adapt the adaptee and all its subclasses, can swap the adaptee at runtime, and works in single-inheritance languages. The only advantage of class adapter is slightly less delegation code.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "When can a Facade pattern become problematic?",
    options: [
      "When the subsystem has fewer than three classes",
      "When the facade grows into a god class that exposes too much functionality, or when it oversimplifies to the point of hiding essential configuration options that power users need",
      "When the facade uses interfaces instead of concrete classes",
      "When multiple facades exist for the same subsystem",
    ],
    answer: 1,
    explanation:
      "A facade should expose the most common, high-level operations. If it tries to be the only entry point for every possible operation, it becomes a massive class with dozens of methods — a god class that defeats the purpose of simplification. Conversely, if it oversimplifies, power users are forced to bypass the facade and use the subsystem directly, negating its value. The best facades are focused, offer a clean 80% path, and explicitly allow direct subsystem access for advanced use cases.",
  },

  // ============================================================
  // Topic 6: Decorator & Proxy (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "How does the Decorator pattern avoid the class explosion problem that inheritance creates?",
    options: [
      "Decorators use abstract classes instead of concrete classes",
      "Decorators use multiple inheritance to combine features",
      "Each decorator adds one feature and multiple decorators compose freely — instead of needing separate classes for every combination (BufferedEncryptedStream, CompressedEncryptedStream, etc.), you stack independent decorators",
      "Decorators generate code at runtime to create combined classes",
    ],
    answer: 2,
    explanation:
      "With inheritance, combining N features requires up to 2^N subclasses (every combination). For 3 features (buffered, encrypted, compressed), you'd need BufferedStream, EncryptedStream, CompressedStream, BufferedEncryptedStream, BufferedCompressedStream, EncryptedCompressedStream, BufferedEncryptedCompressedStream — 7 classes. With decorators, you need only 3 decorator classes and compose them: new BufferedDecorator(new EncryptedDecorator(new CompressedDecorator(stream))). Any combination is just a different nesting order.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What is the fundamental difference in intent between the Decorator and Proxy patterns, even though both wrap an object with the same interface?",
    options: [
      "Decorator is a creational pattern while Proxy is a structural pattern",
      "Decorator adds new behavior/responsibilities to the object; Proxy controls access to the object (lazy loading, access control, caching) without adding new business functionality",
      "Decorator wraps interfaces while Proxy wraps concrete classes",
      "Decorator is applied at compile time while Proxy is applied at runtime",
    ],
    answer: 1,
    explanation:
      "Both Decorator and Proxy implement the same interface as the wrapped object and delegate calls, but their intent differs fundamentally. A Decorator enriches the object's behavior — adding logging, caching, validation, or transformation as new capabilities. A Proxy controls access to the object — delaying creation (virtual proxy), checking permissions (protection proxy), or representing a remote object (remote proxy). The Proxy's concern is 'should/can this operation happen?' while the Decorator's concern is 'what additional behavior should happen alongside this operation?'",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "Why does a Virtual Proxy need to be thread-safe in concurrent environments?",
    options: [
      "Virtual proxies always access network resources which require thread safety",
      "If multiple threads call a method on the virtual proxy simultaneously before the real object is created, multiple instances of the expensive real object could be created — wasting resources and potentially causing inconsistency",
      "Thread safety is needed for garbage collection of the proxy",
      "Virtual proxies must lock the file system during initialization",
    ],
    answer: 1,
    explanation:
      "A virtual proxy lazily initializes the real object on first use. In a concurrent environment, if threads T1 and T2 both check 'is the real object created?' simultaneously and both see 'no', they both proceed to create the real object — resulting in duplicate initialization of an expensive resource. This is the same problem as the double-checked locking issue with Singleton. Solutions include synchronized blocks, lock-free initialization with compare-and-swap, or eager initialization in the constructor.",
  },

  // ============================================================
  // Topic 7: Composite & Bridge (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "What is the main benefit of the Composite pattern's uniform interface for leaves and composites?",
    options: [
      "It reduces memory usage by sharing leaf implementations",
      "Client code can treat individual objects and compositions identically — calling the same method works on a single item or a nested tree of items, without the client needing conditional logic to distinguish between them",
      "It makes leaf objects faster because they skip delegation logic",
      "It prevents composites from containing other composites",
    ],
    answer: 1,
    explanation:
      "Without Composite, client code needs conditional logic: 'if (item is leaf) do X, else iterate children and do X on each'. With Composite, the client simply calls item.operation() — if it's a leaf, it handles the operation directly; if it's a composite, it delegates to children recursively. This eliminates type-checking code, makes the client simpler, and allows the tree structure to change without affecting client code. Adding a new component type requires only implementing the shared interface.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "What problem does the Bridge pattern solve that simple inheritance cannot?",
    options: [
      "Bridge allows classes to have multiple constructors",
      "Bridge prevents the Cartesian product explosion — when a class varies along two dimensions (e.g., shape type and rendering platform), inheritance requires M x N subclasses while Bridge separates them into M + N classes through composition",
      "Bridge makes classes serializable across network boundaries",
      "Bridge enables classes to be garbage collected more efficiently",
    ],
    answer: 1,
    explanation:
      "Consider shapes (Circle, Square, Triangle) that can be rendered on different platforms (OpenGL, DirectX, SVG). With inheritance alone, you'd need CircleOpenGL, CircleDirectX, CircleSVG, SquareOpenGL, SquareDirectX, SquareSVG, etc. — 3 x 3 = 9 classes. Adding a new shape or platform grows this multiplicatively. Bridge separates shape abstraction from rendering implementation through composition — 3 shape classes + 3 renderer classes = 6 classes, growing additively. The shape holds a reference to a renderer and delegates platform-specific work.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "What makes the Flyweight pattern different from simple object caching?",
    options: [
      "Flyweights are always stored in a database while caches are in memory",
      "Flyweight specifically separates intrinsic state (shared, immutable, stored in the flyweight) from extrinsic state (unique, passed by the client) — simple caching stores complete objects without this state separation",
      "Flyweights expire after a timeout while cached objects persist indefinitely",
      "Flyweights are thread-local while caches are shared",
    ],
    answer: 1,
    explanation:
      "Simple caching stores and retrieves complete objects to avoid re-computation. Flyweight fundamentally restructures how objects store state: intrinsic state (e.g., a character's font data) is shared among all instances via the flyweight, while extrinsic state (e.g., the character's position in the document) is managed by the client and passed to the flyweight's methods. This separation is the defining characteristic — without it, you're just caching, not using the Flyweight pattern.",
  },

  // ============================================================
  // Topic 8: Observer & Event Systems (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "What is the key difference between the Observer pattern and Pub/Sub architecture?",
    options: [
      "Observer supports multiple subscribers while Pub/Sub supports only one",
      "In Observer, the subject directly references and notifies observers; in Pub/Sub, a message broker mediates between publishers and subscribers who have no knowledge of each other",
      "Observer is for synchronous communication while Pub/Sub only works asynchronously",
      "Pub/Sub is a subset of the Observer pattern",
    ],
    answer: 1,
    explanation:
      "In the Observer pattern, the subject (observable) maintains a list of observer objects and calls their update() methods directly — there is a direct reference from subject to observers. In Pub/Sub, a message broker sits between publishers and subscribers. Publishers emit events to the broker without knowing who subscribes; subscribers register with the broker for topics without knowing who publishes. This additional layer of indirection enables cross-process and cross-network communication but makes the system harder to trace.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "Why is backpressure important in Reactive Streams?",
    options: [
      "Backpressure reduces network bandwidth usage",
      "Backpressure prevents a fast producer from overwhelming a slow consumer by allowing the consumer to signal how many items it can handle — without it, the consumer's buffer overflows or items are dropped",
      "Backpressure ensures messages are encrypted during transmission",
      "Backpressure orders events chronologically",
    ],
    answer: 1,
    explanation:
      "Without backpressure, if a producer emits 10,000 items per second but the consumer can only process 100, the consumer's buffer grows unboundedly until it runs out of memory (OOM), or items are dropped silently. Reactive Streams solve this with the request(n) protocol — the subscriber tells the publisher 'send me n more items', controlling the flow rate. The publisher respects this limit, buffering or slowing down as needed. This makes the system robust under varying load without data loss or crashes.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "What common bug does the Observer pattern introduce related to memory management?",
    options: [
      "Observers consume excessive CPU during idle periods",
      "Observers that are not unsubscribed from the subject are kept alive by the subject's reference, preventing garbage collection — creating memory leaks that grow as observers accumulate",
      "Observers cause stack overflow from recursive notifications",
      "Observers duplicate data in memory for each subscriber",
    ],
    answer: 1,
    explanation:
      "The subject holds strong references to all registered observers. If an observer's logical lifecycle ends (e.g., a UI component is removed from the screen) but it is not unsubscribed from the subject, the subject's reference prevents the observer from being garbage collected. Over time, these 'dead' observers accumulate, leaking memory. Solutions include weak references (the subject holds weak refs that are automatically cleared), explicit cleanup lifecycle methods, and frameworks that manage subscription lifetimes (RxJS unsubscribe, React useEffect cleanup).",
  },

  // ============================================================
  // Topic 9: Strategy & Command (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "How does the Strategy pattern eliminate complex conditional logic?",
    options: [
      "Strategy replaces if/else statements with try/catch blocks",
      "Strategy moves conditional logic into a configuration file",
      "Each algorithm is encapsulated in its own strategy class — the context delegates to the current strategy object instead of using switch/if-else to select behavior inline",
      "Strategy uses reflection to select algorithms at runtime",
    ],
    answer: 2,
    explanation:
      "Without Strategy, code often has patterns like: 'if (type == A) doAlgoA(); else if (type == B) doAlgoB(); else if (type == C) doAlgoC()'. Each new algorithm adds another branch, and the class grows and violates OCP. Strategy extracts each algorithm into its own class implementing a common interface. The context simply calls strategy.execute() — the conditional logic is replaced by polymorphism. Adding a new algorithm means creating a new strategy class without modifying the context or existing strategies.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "What makes the Command pattern essential for implementing undo/redo functionality?",
    options: [
      "Command objects are automatically serialized to disk for persistence",
      "Each command encapsulates both execute() and undo() as inverse operations, and commands are stored in a history stack — undo pops the last command and calls undo(), redo re-executes it",
      "Command objects are smaller than regular method calls, saving memory",
      "Command pattern uses database transactions for automatic rollback",
    ],
    answer: 1,
    explanation:
      "The Command pattern encapsulates an operation as an object with execute() and undo() methods. When the user performs an action, a command is created, executed, and pushed onto a history stack. Undo pops the most recent command and calls its undo() method, which reverses the operation. Redo re-executes the popped command. Without the Command pattern, undo would require saving complete state snapshots before each operation (expensive) or manually writing inverse logic inline (fragile and scattered).",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "What happens when a request reaches the end of a Chain of Responsibility without being handled?",
    options: [
      "The request is automatically retried from the beginning of the chain",
      "The system throws an exception by default",
      "The request falls through unhandled — the system must explicitly handle this case with a default handler at the end of the chain, logging, or an error response",
      "The request is queued for later processing",
    ],
    answer: 2,
    explanation:
      "Chain of Responsibility does not guarantee that a request will be handled — if no handler in the chain accepts responsibility, the request passes through all handlers and exits unhandled. This is a design decision: some chains have a default handler at the end that catches everything (like a default case in a switch statement), while others allow unhandled requests to be silently ignored or logged. The system architect must decide the policy for unmatched requests based on the domain requirements.",
  },

  // ============================================================
  // Topic 10: State & Template Method (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "How does the State pattern differ from using a switch statement on a state variable?",
    options: [
      "The State pattern is faster because it uses polymorphism instead of branching",
      "State encapsulates each state's behavior in its own class — adding a new state requires creating a new class without modifying existing states, while a switch statement requires modifying the existing method to add a new case",
      "The State pattern uses enums while switch statements use strings",
      "The State pattern only works with two states while switch supports unlimited states",
    ],
    answer: 1,
    explanation:
      "With a switch statement, all state-dependent behavior lives in one place, and every conditional block in every method must be updated when a new state is added — violating OCP and creating large, hard-to-maintain methods. The State pattern puts each state's behavior in its own class. Adding a new state means creating a new class that implements the state interface — existing state classes are untouched. Each state class is small, focused, and independently testable. The tradeoff is that the complete state machine is harder to see at a glance since transitions are distributed across state classes.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What is the Hollywood Principle and how does it relate to the Template Method pattern?",
    options: [
      "The Hollywood Principle means using actors (actor model) for concurrency",
      "The Hollywood Principle ('Don't call us, we'll call you') means the base class controls the flow and calls subclass methods when needed — subclasses provide specific steps but don't control the overall algorithm",
      "The Hollywood Principle means delegating all work to external services",
      "The Hollywood Principle is about making code production-ready",
    ],
    answer: 1,
    explanation:
      "In the Template Method pattern, the base class defines the algorithm skeleton and calls abstract/hook methods that subclasses implement. The subclass doesn't decide when its methods are called — the base class controls the flow ('don't call us, we'll call you'). This inverts the typical control flow where the caller controls execution. The subclass provides specific implementations of steps, but the ordering, initialization, and cleanup are dictated by the base class template method.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "Why is the Visitor pattern said to be biased toward stable element hierarchies?",
    options: [
      "Visitors can only visit elements that exist at compile time",
      "Adding a new element type requires modifying every existing visitor class to add a new visit method for that element — while adding a new operation only requires creating a new visitor class",
      "Visitors cache element references that become stale when elements change",
      "Elements must be immutable for the Visitor pattern to work",
    ],
    answer: 1,
    explanation:
      "The Visitor pattern has an asymmetry: adding a new operation (a new way to process elements) is easy — just create a new Visitor class with visit methods for each element type. But adding a new element type requires adding a new visitNewElement() method to the Visitor interface and every existing concrete Visitor. If you have 10 visitors, adding one element type requires modifying 10 classes. This makes Visitor ideal when the element hierarchy is stable but operations change frequently (e.g., AST nodes in a compiler — the node types are fixed but analyses evolve).",
  },

  // ============================================================
  // Topic 11: MVC, MVP & MVVM (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "In classic MVC, how does the View learn about Model changes?",
    options: [
      "The Controller pushes Model data to the View after every update",
      "The View directly observes the Model using the Observer pattern — when the Model changes, it notifies the View, which queries the Model for updated data and re-renders",
      "The View polls the Model on a timer to check for changes",
      "The Model writes changes to a shared file that the View reads",
    ],
    answer: 1,
    explanation:
      "In classic MVC (as in Smalltalk), the View registers as an observer of the Model. When the Model's state changes (triggered by Controller actions), it sends a change notification to all registered observers. The View receives this notification, queries the Model for the specific data it needs, and updates its display. This creates a direct coupling between View and Model — the View must know the Model's interface to query it. MVP and MVVM were developed partly to break this direct dependency.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "What makes the View in MVP (Model-View-Presenter) easier to unit test compared to MVC?",
    options: [
      "MVP Views are compiled into native code for faster execution",
      "In MVP, the View is a 'humble object' that implements a simple interface — the Presenter contains all logic and can be tested by injecting a mock View interface, without needing a real UI",
      "MVP Views automatically generate test cases",
      "MVP Views don't need testing because they have no logic",
    ],
    answer: 1,
    explanation:
      "In MVP, the View is intentionally kept 'dumb' — it implements a simple interface like IUserView with methods like showUserName(name), showError(msg), and displayLoading(). All decision-making logic lives in the Presenter. To test the Presenter, you inject a mock IUserView and verify that the Presenter calls the correct View methods with the correct data in response to events. No real UI rendering is needed. In MVC, the View has more intelligence (observing the Model directly), making it harder to test presentation logic in isolation.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "What problem can two-way data binding in MVVM introduce?",
    options: [
      "Two-way binding makes the application slower because it uses polling",
      "Changes in the View update the ViewModel which may trigger View updates, potentially creating infinite feedback loops — and binding errors often fail silently, making debugging difficult",
      "Two-way binding prevents the ViewModel from being garbage collected",
      "Two-way binding only works with string data types",
    ],
    answer: 1,
    explanation:
      "Two-way binding means a change in the View's input field updates the ViewModel property, and a change in the ViewModel property updates the View. If a ViewModel property setter triggers additional logic that modifies another bound property, that change flows back to the View, which may trigger another ViewModel update, creating a loop. Additionally, binding expressions are often evaluated at runtime — typos in binding paths fail silently (the UI just doesn't update), making bugs hard to find. Angular's change detection and React's unidirectional data flow were designed partly to address these issues.",
  },

  // ============================================================
  // Topic 12: Repository & Data Access (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "Why should a Repository return domain objects rather than database rows or DTOs?",
    options: [
      "Domain objects are smaller than database rows",
      "The Repository's purpose is to provide a collection-like illusion — the domain layer should work with rich domain objects that encapsulate behavior, not raw data structures that leak persistence concerns",
      "Domain objects are automatically cached while DTOs are not",
      "Database rows cannot be serialized across network boundaries",
    ],
    answer: 1,
    explanation:
      "The Repository pattern mediates between the domain and data mapping layers. The domain layer should depend on domain concepts, not persistence details. If a repository returns raw database rows or DTOs, the domain layer must know about column names, data types, and table structures — creating tight coupling to the database schema. By returning domain objects, the repository encapsulates the mapping between persistence format and domain model, allowing the domain to evolve independently and the database schema to change without affecting domain code.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "How does the Unit of Work pattern ensure database consistency?",
    options: [
      "It locks all tables at the beginning of the business operation",
      "It tracks all entity changes (inserts, updates, deletes) during a business operation and commits them in a single database transaction — either all changes succeed or none do, preventing partial updates",
      "It writes all changes to a log file before applying them to the database",
      "It uses optimistic locking on every row individually",
    ],
    answer: 1,
    explanation:
      "The Unit of Work acts as a transaction manager for in-memory changes. As the application modifies entities during a business operation, the Unit of Work tracks these changes without immediately persisting them. When the operation completes, calling commit() wraps all tracked changes in a single database transaction. If any change fails, the entire transaction rolls back — no partial updates. This ensures atomicity at the business operation level. Entity Framework's DbContext and Hibernate's Session are implementations of this pattern.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "When should you choose the Data Mapper pattern over Active Record?",
    options: [
      "When your application has fewer than 10 database tables",
      "When your domain model is complex and needs to evolve independently of the database schema — Data Mapper separates domain objects from persistence logic, enabling rich domain models that are not constrained by table structure",
      "When you need faster database queries",
      "When your application is a simple CRUD application",
    ],
    answer: 1,
    explanation:
      "Active Record works well for simple domains where each table maps directly to a domain class and business logic is minimal. But in complex domains, the domain model often diverges from the database schema — inheritance hierarchies, aggregates spanning multiple tables, or domain objects with behavior that doesn't map to columns. Data Mapper separates the two completely: domain objects are plain objects focused on business logic, and mapper classes handle the translation to/from the database. This enables domain-driven design and makes domain objects testable without a database.",
  },

  // ============================================================
  // Topic 13: Event Sourcing & CQRS (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "Why can't events in an event-sourced system be modified or deleted?",
    options: [
      "The event store uses append-only storage that physically prevents modification",
      "Events represent facts that happened — modifying or deleting them would rewrite history, invalidate downstream projections, break audit trails, and potentially cause inconsistency with systems that already processed the original events",
      "Event databases don't support UPDATE or DELETE operations",
      "Modifying events would require recalculating checksums",
    ],
    answer: 1,
    explanation:
      "Events are immutable facts: 'OrderPlaced at 2:00 PM', 'ItemAdded at 2:01 PM'. Deleting 'ItemAdded' doesn't un-add the item — the item was added, and that's a historical fact. To correct a mistake, you append a compensating event ('ItemRemoved'). This preserves the complete history, maintains audit trails, and ensures that all systems that consumed the original event can process the correction event too. Modifying an event would create inconsistency between the event store and any materialized views or external systems that already processed the original version.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "What is the primary benefit of separating read and write models in CQRS?",
    options: [
      "CQRS reduces the total amount of code in the application",
      "Each model can be independently optimized, scaled, and stored — writes use a normalized model optimized for consistency and business rules, while reads use denormalized views optimized for query performance",
      "CQRS eliminates the need for a database",
      "CQRS makes the application stateless",
    ],
    answer: 1,
    explanation:
      "In a traditional architecture, the same model serves both reads and writes, forcing compromises — normalization slows reads but prevents write anomalies, while denormalization speeds reads but complicates writes. CQRS eliminates this conflict by using separate models: the write side can be fully normalized (or event-sourced) with rich domain logic, while the read side can be aggressively denormalized with pre-computed views for each query pattern. They can even use different databases (SQL for writes, Elasticsearch for reads) and scale independently.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "Why is idempotency critical in event-driven architectures?",
    options: [
      "Idempotency makes events smaller for network transmission",
      "Idempotency ensures correct results even when events are delivered multiple times — since at-least-once delivery means duplicates are possible, consumers must handle reprocessing the same event without creating duplicate side effects",
      "Idempotency prevents events from being read by unauthorized consumers",
      "Idempotency orders events chronologically across all partitions",
    ],
    answer: 1,
    explanation:
      "Most message brokers provide at-least-once delivery — they guarantee events are delivered but may deliver the same event multiple times (due to retries after network failures, consumer crashes, or rebalancing). If a consumer processes 'PaymentReceived' twice without idempotency, it might credit the account twice. Idempotent consumers use techniques like tracking processed event IDs, using database upserts instead of inserts, or designing operations that naturally produce the same result regardless of repetition (e.g., 'set balance to $100' vs. 'add $100 to balance').",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
