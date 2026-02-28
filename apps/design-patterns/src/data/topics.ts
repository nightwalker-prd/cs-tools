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
  { id: 1, title: 'Foundations & Creational' },
  { id: 2, title: 'Structural Patterns' },
  { id: 3, title: 'Behavioral Patterns' },
  { id: 4, title: 'Architectural Patterns' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Foundations & Creational (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'SOLID Principles',
    part: 1,
    partTitle: 'Foundations & Creational',
    summary:
      'The five SOLID principles form the foundation of maintainable object-oriented design. They guide developers toward code that is easier to extend, refactor, and test by promoting loose coupling and high cohesion.',
    concepts: [
      {
        id: 'single-responsibility-principle',
        name: 'Single Responsibility Principle',
        description:
          'A class should have only one reason to change, meaning it should encapsulate exactly one axis of responsibility.',
        keyPoints: [
          'A "reason to change" maps to a stakeholder or business concern — if two different stakeholders could request changes to the same class, it violates SRP',
          'SRP reduces coupling by ensuring that a change in one area of the system does not ripple into unrelated areas through a shared class',
          'Violation symptoms include classes with many unrelated methods, classes that change frequently for different reasons, and difficulty naming a class without using "and" or "manager"',
          'Applying SRP often leads to more classes, but each class is simpler, more testable, and easier to reason about in isolation',
          'SRP applies beyond classes — functions, modules, and microservices should each have a cohesive, focused responsibility',
        ],
        tradeoffs: [
          'Over-application leads to class explosion — dozens of tiny classes that are hard to navigate and require excessive coordination',
          'Finding the right granularity requires understanding the domain; premature splitting can be as harmful as god classes',
        ],
        realWorld: [
          'Separating UserAuth from UserProfile in web apps',
          'Report generation vs. report formatting as separate classes',
          'Microservices each owning a single bounded context',
        ],
      },
      {
        id: 'open-closed-principle',
        name: 'Open/Closed Principle',
        description:
          'Software entities should be open for extension but closed for modification — you should be able to add new behavior without changing existing code.',
        keyPoints: [
          'The goal is stability — once code is tested and deployed, modifying it risks introducing regressions in existing functionality',
          'Extension mechanisms include inheritance (subclassing), composition (injecting strategy objects), and plugin architectures',
          'Abstractions (interfaces, abstract classes) act as stable contracts — new implementations extend behavior without touching the abstraction',
          'The principle does not mean code is never modified — it means the design anticipates variation points and makes extension the preferred mechanism for adding features',
        ],
        tradeoffs: [
          'Requires upfront design effort to identify variation points — over-engineering extension points that are never used adds unnecessary complexity',
          'Not all changes can be anticipated — sometimes modifying existing code is simpler and safer than building elaborate extension mechanisms',
        ],
        realWorld: [
          'Plugin systems in IDEs (VSCode extensions)',
          'Middleware pipelines in Express/Koa',
          'Payment processor interfaces supporting new providers',
        ],
      },
      {
        id: 'liskov-substitution-principle',
        name: 'Liskov Substitution Principle',
        description:
          'Subtypes must be substitutable for their base types without altering the correctness of the program — a subclass should honor the contract of its parent.',
        keyPoints: [
          'LSP ensures that polymorphism works correctly — code using a base type reference must behave correctly regardless of which subtype is behind the reference',
          'Violations occur when a subclass strengthens preconditions (requires more), weakens postconditions (delivers less), or throws unexpected exceptions',
          'The classic example is Rectangle/Square — a Square that overrides setWidth to also set height violates LSP because clients of Rectangle do not expect this coupling',
          'LSP is about behavioral compatibility, not just structural compatibility — a subclass can add methods but must not change the meaning of inherited ones',
          'Composition is often preferred over inheritance precisely because inheritance hierarchies are prone to LSP violations',
        ],
        tradeoffs: [
          'Strictly adhering to LSP may require flattening inheritance hierarchies or using composition instead, which can increase boilerplate',
          'Real-world domain models sometimes have natural IS-A relationships that violate LSP in code — requiring careful design to reconcile',
        ],
        realWorld: [
          'Collection interfaces in Java (List, Set, Map)',
          'Stream abstractions (file streams, network streams, memory streams)',
          'Database driver interfaces (MySQL, PostgreSQL implementations)',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Factory Patterns',
    part: 1,
    partTitle: 'Foundations & Creational',
    summary:
      'Factory patterns encapsulate object creation logic, decoupling the client from concrete classes. They range from simple static methods to complex families of related objects, each solving different levels of creation complexity.',
    concepts: [
      {
        id: 'simple-factory',
        name: 'Simple Factory',
        description:
          'A method or class that encapsulates the creation logic for related objects, returning instances based on input parameters without exposing instantiation details.',
        keyPoints: [
          'Not a formal GoF pattern but a widely used idiom — a single method with conditional logic (switch/if) that decides which class to instantiate',
          'Centralizes creation logic in one place, making it easy to change which concrete class is used without modifying every call site',
          'The factory method typically returns an interface or base type, so the caller depends only on the abstraction, not the concrete class',
          'Simple factories work well when the set of types is small and rarely changes — they become unwieldy with many types due to growing conditionals',
        ],
        tradeoffs: [
          'Violates OCP when new types require modifying the factory method — each new type adds another branch to the conditional',
          'All creation logic is centralized, which can become a bottleneck if different types have very different construction requirements',
        ],
        realWorld: [
          'Document.createElement() in DOM APIs',
          'Logging framework factory methods (getLogger)',
          'Notification factories (email, SMS, push)',
        ],
      },
      {
        id: 'factory-method-pattern',
        name: 'Factory Method Pattern',
        description:
          'Defines an interface for creating an object but lets subclasses decide which class to instantiate — deferring instantiation to subclasses through inheritance.',
        keyPoints: [
          'A GoF creational pattern that uses inheritance — the base class declares an abstract factory method, and each subclass provides a concrete implementation',
          'Follows the Open/Closed Principle — new product types are added by creating new subclasses rather than modifying existing code',
          'The creator class often contains template method logic that calls the factory method, combining creation with a usage workflow',
          'Each subclass is responsible for exactly one product type, keeping creation logic focused and cohesive',
          'Factory Method creates a parallel hierarchy — one hierarchy of creators maps to one hierarchy of products',
        ],
        tradeoffs: [
          'Requires creating a new subclass for each product type, which can lead to class proliferation in systems with many product variants',
          'The inheritance-based approach is less flexible than composition-based alternatives — you cannot easily change the product type at runtime',
        ],
        realWorld: [
          'UI toolkit widget creation (each OS subclass creates native widgets)',
          'Document parsers (CSVParser, JSONParser, XMLParser)',
          'React.createElement as a factory method',
        ],
      },
      {
        id: 'abstract-factory-pattern',
        name: 'Abstract Factory Pattern',
        description:
          'Provides an interface for creating families of related objects without specifying their concrete classes — ensuring that products from the same family are used together.',
        keyPoints: [
          'Creates entire families of related objects — e.g., a UI factory that produces Button + Checkbox + TextField that all share the same visual theme',
          'Enforces consistency within a family — it is impossible to accidentally mix a Windows button with a macOS checkbox because the factory produces a complete set',
          'The client code works entirely with abstract interfaces, making it trivial to swap entire product families by changing which factory is injected',
          'Abstract Factory is often implemented using Factory Methods — each method in the abstract factory creates one product from the family',
        ],
        tradeoffs: [
          'Adding a new product type to the family requires changing the abstract factory interface and all concrete implementations — a significant modification cost',
          'The pattern adds significant structural complexity — multiple interfaces and classes for each product family, which may be overkill for simple scenarios',
        ],
        realWorld: [
          'Cross-platform UI toolkits (Qt, GTK)',
          'Database access layers (connection, command, reader per provider)',
          'Theme engines producing consistent styled components',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Builder & Prototype',
    part: 1,
    partTitle: 'Foundations & Creational',
    summary:
      'Builder separates the construction of complex objects from their representation, allowing the same construction process to produce different results. Prototype creates objects by cloning existing instances, avoiding expensive initialization.',
    concepts: [
      {
        id: 'builder-pattern',
        name: 'Builder Pattern',
        description:
          'Separates the construction of a complex object from its representation, allowing step-by-step construction with a director orchestrating the process.',
        keyPoints: [
          'Ideal for objects with many optional parameters — avoids telescoping constructors (constructors with increasing parameter counts) and the confusion of positional arguments',
          'The builder accumulates configuration through named methods, then produces the final object via a build() method that validates the complete state',
          'A Director class can encapsulate common construction sequences — e.g., buildSportsCar() vs. buildSUV() using the same CarBuilder interface',
          'Builders can enforce construction constraints — required fields, valid combinations, and ordering of build steps — that constructors cannot express',
          'The pattern produces immutable objects — the builder is mutable during construction, but the built object is fully initialized and can be made immutable',
        ],
        tradeoffs: [
          'Adds structural complexity — a separate Builder class (and optionally a Director) for each product type, which is overkill for simple objects',
          'The builder and product must be kept in sync — adding a field to the product requires updating the builder, creating a maintenance burden',
        ],
        realWorld: [
          'StringBuilder in Java/C#',
          'QueryBuilder in ORMs (Knex, TypeORM)',
          'HTTP request builders (OkHttp, Axios config)',
        ],
      },
      {
        id: 'prototype-pattern',
        name: 'Prototype Pattern',
        description:
          'Creates new objects by cloning an existing instance (the prototype) rather than constructing from scratch, useful when object creation is expensive or complex.',
        keyPoints: [
          'Avoids the cost of re-running expensive initialization (database lookups, file parsing, complex calculations) by copying a pre-configured instance',
          'Requires implementing a clone() method — the key design decision is whether to perform a shallow copy (shared references) or deep copy (independent copies)',
          'A prototype registry (map of named prototypes) allows selecting and cloning pre-built configurations at runtime without knowing their concrete classes',
          'Particularly useful when the system needs many similar objects with minor variations — clone the base and modify only what differs',
        ],
        tradeoffs: [
          'Deep cloning complex object graphs (circular references, shared state) is error-prone and can be as expensive as construction',
          'Cloned objects may inadvertently share mutable state if shallow copying is used incorrectly, leading to subtle bugs',
        ],
        realWorld: [
          'JavaScript Object.assign() and spread operator',
          'Game object spawning (clone enemy template, adjust position)',
          'Document template systems (clone template, fill in details)',
        ],
      },
      {
        id: 'fluent-interfaces',
        name: 'Fluent Interfaces',
        description:
          'A design approach where methods return the object itself (this), enabling method chaining that reads like a natural language sentence.',
        keyPoints: [
          'Each method performs an action and returns this (or a new instance for immutable variants), allowing .method1().method2().method3() call chains',
          'Dramatically improves readability for configuration and query-building code — the chain reads as a declarative specification rather than imperative steps',
          'Often combined with the Builder pattern — the fluent builder accumulates state through chained calls and finalizes with a terminal method like build() or execute()',
          'Fluent interfaces work well for DSLs (domain-specific languages) embedded in code — making the API feel like a specialized language for the domain',
          'Immutable fluent interfaces return new instances from each method call, enabling safe reuse of intermediate configurations',
        ],
        tradeoffs: [
          'Debugging long chains is difficult — stack traces point to the chain, and it is hard to inspect intermediate state without breaking the chain',
          'Method chaining can obscure the order of operations and make it unclear when side effects occur vs. when configuration is merely accumulated',
        ],
        realWorld: [
          'jQuery ($(".item").addClass("active").show())',
          'LINQ in C# (collection.Where().Select().OrderBy())',
          'Chai assertion library (expect(x).to.be.a("string"))',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Singleton & Dependency Injection',
    part: 1,
    partTitle: 'Foundations & Creational',
    summary:
      'Singleton ensures a class has only one instance with a global access point, while Dependency Injection inverts control by providing dependencies from outside rather than having classes create their own, dramatically improving testability and flexibility.',
    concepts: [
      {
        id: 'singleton-pattern',
        name: 'Singleton Pattern',
        description:
          'Ensures a class has exactly one instance and provides a global point of access to it, typically through a static method that lazily creates and returns the sole instance.',
        keyPoints: [
          'The constructor is made private, and a static getInstance() method controls access — creating the instance on first call and returning the cached instance thereafter',
          'Useful for resources that are inherently singular — a database connection pool, a configuration manager, a logging service, or a hardware interface',
          'Thread safety is critical in concurrent environments — naive implementations can create multiple instances if two threads call getInstance() simultaneously',
          'Common thread-safe approaches include eager initialization (create at class load), double-checked locking, or using language features like static initializers or enum types',
        ],
        tradeoffs: [
          'Introduces hidden global state that makes testing difficult — unit tests cannot easily substitute a mock because the singleton controls its own lifecycle',
          'Violates the Single Responsibility Principle by combining the business logic with lifecycle management (creation and access control)',
          'Creates tight coupling — every class that uses the singleton depends directly on the concrete class rather than an abstraction',
        ],
        realWorld: [
          'Runtime.getRuntime() in Java',
          'Database connection pools (HikariCP)',
          'Application configuration managers',
        ],
      },
      {
        id: 'constructor-injection',
        name: 'Constructor Injection',
        description:
          'Dependencies are provided through a class constructor, making them explicit, mandatory, and immutable — the class cannot be instantiated without all required dependencies.',
        keyPoints: [
          'Makes dependencies explicit in the constructor signature — you can see exactly what a class needs by looking at its constructor parameters',
          'Dependencies are typically stored in private readonly fields, making them immutable after construction and preventing accidental reassignment',
          'Enables easy substitution for testing — inject mock/stub implementations through the constructor without modifying the class',
          'Follows the Dependency Inversion Principle — the class depends on abstractions (interfaces) received through the constructor, not on concrete implementations it creates',
          'Constructor injection is preferred over setter injection for required dependencies because it guarantees the object is fully initialized before use',
        ],
        tradeoffs: [
          'Classes with many dependencies result in constructors with many parameters — a sign that the class may violate SRP and should be split',
          'Circular dependencies between classes are impossible with pure constructor injection, which is actually a benefit as it exposes design problems',
        ],
        realWorld: [
          'Angular services (@Injectable with constructor params)',
          'Spring Boot @Autowired constructor injection',
          'NestJS provider injection',
        ],
      },
      {
        id: 'ioc-containers',
        name: 'IoC Containers',
        description:
          'Inversion of Control containers automate dependency resolution by maintaining a registry of types and their dependencies, constructing entire object graphs automatically.',
        keyPoints: [
          'The container maps abstractions (interfaces) to concrete implementations — when a class requests an interface, the container provides the registered implementation',
          'Object graphs are resolved recursively — if A depends on B and B depends on C, the container creates C, injects it into B, then injects B into A',
          'Lifecycle management controls how instances are shared — singleton scope (one instance), transient scope (new instance each time), or request scope (one per HTTP request)',
          'Registration can be explicit (manual binding) or implicit (auto-scanning with decorators/annotations) — explicit registration is more predictable',
        ],
        tradeoffs: [
          'The container becomes a "magic" black box — errors in registration produce runtime failures rather than compile-time errors, and the object graph is implicit rather than visible in code',
          'Over-reliance on the container can lead to the Service Locator anti-pattern, where classes pull dependencies from the container rather than receiving them',
          'Learning curve and framework lock-in — the container is a significant infrastructure choice that pervades the entire application',
        ],
        realWorld: [
          'Spring Framework (Java/Kotlin)',
          'Angular dependency injection system',
          'InversifyJS for TypeScript applications',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Structural Patterns (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'Adapter & Facade',
    part: 2,
    partTitle: 'Structural Patterns',
    summary:
      'Adapter converts the interface of a class into another interface clients expect, enabling incompatible interfaces to work together. Facade provides a simplified interface to a complex subsystem, reducing the learning curve and coupling.',
    concepts: [
      {
        id: 'adapter-pattern',
        name: 'Adapter Pattern',
        description:
          'Converts the interface of an existing class into another interface that the client expects, allowing classes with incompatible interfaces to collaborate.',
        keyPoints: [
          'Acts as a translator between two incompatible interfaces — the adapter wraps the adaptee and implements the target interface, delegating calls with appropriate transformations',
          'Object adapter uses composition (wraps the adaptee as a field), while class adapter uses multiple inheritance (inherits from both target and adaptee) — object adapter is more flexible',
          'Follows the Open/Closed Principle — existing code is not modified; instead, a new adapter class bridges the gap between old and new interfaces',
          'Particularly valuable when integrating third-party libraries or legacy systems that cannot be modified but need to conform to your application interfaces',
          'Two-way adapters can translate in both directions, but they add complexity and should be used sparingly',
        ],
        tradeoffs: [
          'Adds an extra layer of indirection — each call passes through the adapter, which can obscure the actual behavior and make debugging harder',
          'If the adaptee and target interfaces are very different, the adapter may need significant transformation logic, becoming complex in its own right',
        ],
        realWorld: [
          'Java Arrays.asList() adapting arrays to List interface',
          'Power plug adapters (physical world analogy)',
          'API gateway adapting microservice responses to client format',
        ],
      },
      {
        id: 'facade-pattern',
        name: 'Facade Pattern',
        description:
          'Provides a unified, simplified interface to a set of interfaces in a subsystem, making the subsystem easier to use without hiding the underlying classes.',
        keyPoints: [
          'The facade does not add new functionality — it delegates to subsystem classes, orchestrating their interactions behind a simpler API',
          'Reduces coupling between client code and the subsystem — the client depends only on the facade, insulating it from changes in subsystem internals',
          'Does not prevent direct access to subsystem classes when needed — it is an additional convenience layer, not an access control mechanism',
          'Facades often emerge naturally as the entry point to a library or module — the "main" class that most users interact with',
        ],
        tradeoffs: [
          'A facade can become a god class if it tries to expose too much functionality — it should offer only the most common operations',
          'May oversimplify access to the subsystem, hiding important configuration options that power users need',
        ],
        realWorld: [
          'jQuery as a facade over DOM manipulation',
          'ORM facades simplifying database operations',
          'AWS SDK high-level clients vs. low-level API calls',
        ],
      },
      {
        id: 'wrapper-patterns',
        name: 'Wrapper Patterns',
        description:
          'A general category of patterns (Adapter, Decorator, Proxy) that wrap an existing object to modify its interface, add behavior, or control access — distinguished by their intent.',
        keyPoints: [
          'Adapter wraps to change the interface (make incompatible interfaces work together) — the wrapped and wrapper have different interfaces',
          'Decorator wraps to add behavior while keeping the same interface — the wrapper and wrapped implement the same interface',
          'Proxy wraps to control access while keeping the same interface — adding lazy loading, access control, or caching transparently',
          'All three use composition (holding a reference to the wrapped object) and delegation (forwarding calls), but their purpose and relationship to the wrapped interface differ',
          'Choosing the right wrapper pattern depends on intent: changing interfaces (Adapter), adding features (Decorator), or controlling access (Proxy)',
        ],
        tradeoffs: [
          'Multiple layers of wrapping can create deeply nested object structures that are hard to debug — unwrapping to find the actual object becomes tedious',
          'Wrapper identity issues — the wrapper is a different object than the wrapped, so equality checks (==) and instanceof may behave unexpectedly',
        ],
        realWorld: [
          'Java I/O streams (decorators wrapping readers/writers)',
          'HTTP middleware wrapping request handlers',
          'React higher-order components wrapping components',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Decorator & Proxy',
    part: 2,
    partTitle: 'Structural Patterns',
    summary:
      'Decorator dynamically adds responsibilities to objects without subclassing, while Proxy controls access to an object by interposing a surrogate with the same interface. Both use wrapping but differ fundamentally in intent.',
    concepts: [
      {
        id: 'decorator-pattern',
        name: 'Decorator Pattern',
        description:
          'Attaches additional responsibilities to an object dynamically by wrapping it in a decorator that implements the same interface, providing a flexible alternative to subclassing.',
        keyPoints: [
          'Decorators implement the same interface as the object they wrap — the client treats the decorator and the original object identically',
          'Multiple decorators can be stacked — each adds one responsibility, and the order of wrapping determines the order of behavior (e.g., encrypt then compress vs. compress then encrypt)',
          'Follows the Open/Closed Principle — new behavior is added by creating new decorator classes without modifying existing code',
          'Avoids the combinatorial explosion of subclasses — instead of separate classes for every combination of features, decorators compose freely',
          'Each decorator should add exactly one responsibility — keeping decorators focused makes them reusable and composable',
        ],
        tradeoffs: [
          'Many small decorator objects can be confusing to configure and debug — a deeply decorated object has many layers to trace through',
          'Decorators cannot easily access the internal state of the wrapped object — they can only work through the public interface',
          'Order-dependent behavior — the result changes based on decoration order, which can be subtle and error-prone',
        ],
        realWorld: [
          'Java I/O (BufferedInputStream wrapping FileInputStream)',
          'Express/Koa middleware (each adds logging, auth, etc.)',
          'Python decorators (@login_required, @cache)',
        ],
      },
      {
        id: 'proxy-pattern',
        name: 'Proxy Pattern',
        description:
          'Provides a surrogate or placeholder for another object to control access to it — the proxy has the same interface as the real object and intercepts operations.',
        keyPoints: [
          'The proxy implements the same interface as the real subject — the client cannot distinguish between the proxy and the real object',
          'Virtual Proxy delays expensive object creation until first use (lazy initialization) — the proxy creates the real object only when a method requiring it is called',
          'Protection Proxy controls access based on permissions — checking whether the caller has the right to perform the requested operation before delegating',
          'Remote Proxy represents an object in a different address space (different process, different machine) — handling serialization, network communication, and error handling transparently',
          'Caching Proxy stores results of expensive operations and returns cached results for repeated requests with the same parameters',
        ],
        tradeoffs: [
          'Adds latency to every operation — the proxy intercepts each call, which can be significant for high-frequency operations',
          'The proxy must stay in sync with the real subject interface — any interface change requires updating the proxy as well',
        ],
        realWorld: [
          'JavaScript Proxy object for metaprogramming',
          'ORM lazy loading (proxy loads related entities on access)',
          'API rate limiting proxies',
        ],
      },
      {
        id: 'virtual-protection-proxies',
        name: 'Virtual & Protection Proxies',
        description:
          'Two common proxy variants — Virtual Proxy manages lazy initialization of expensive resources, while Protection Proxy enforces access control rules before delegating to the real object.',
        keyPoints: [
          'Virtual Proxy holds a reference that is initially null — the real object is created (often involving I/O or computation) only when a method is first invoked on the proxy',
          'After initialization, the virtual proxy delegates all subsequent calls directly to the real object — the lazy loading is transparent to the client',
          'Protection Proxy checks credentials, roles, or permissions before each operation — returning an error or no-op if the caller lacks authorization',
          'Protection Proxies centralize authorization logic outside the business object, following the Single Responsibility Principle',
          'Both types maintain the same interface as the real subject, so they can be introduced or removed without changing client code',
        ],
        tradeoffs: [
          'Virtual proxies add complexity around initialization — thread safety, error handling during lazy creation, and determining when initialization should occur',
          'Protection proxies must be kept in sync with the authorization model — changes to permissions require updating proxy logic',
        ],
        realWorld: [
          'Image loading placeholders in web apps',
          'Hibernate/JPA lazy-loaded entity proxies',
          'RBAC middleware in web frameworks',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Composite & Bridge',
    part: 2,
    partTitle: 'Structural Patterns',
    summary:
      'Composite composes objects into tree structures to represent part-whole hierarchies, allowing clients to treat individual objects and compositions uniformly. Bridge separates an abstraction from its implementation so both can vary independently.',
    concepts: [
      {
        id: 'composite-pattern',
        name: 'Composite Pattern',
        description:
          'Composes objects into tree structures to represent part-whole hierarchies, enabling clients to treat individual objects (leaves) and compositions (branches) uniformly through a shared interface.',
        keyPoints: [
          'All components — both leaves and composites — implement the same interface, so the client does not need to know whether it is working with a single object or a group',
          'Composite nodes store a collection of child components and delegate operations (like render, calculate, or execute) recursively to their children',
          'Enables recursive structures — a composite can contain other composites, forming arbitrarily deep trees (e.g., a folder containing folders containing files)',
          'Adding new leaf or composite types requires only implementing the shared interface — the client code and existing tree structure remain unchanged',
        ],
        tradeoffs: [
          'The shared interface may include methods that do not make sense for all components — e.g., add(child) on a leaf, requiring either throwing exceptions or implementing no-ops',
          'Type safety is weakened because the client works with the base interface — it cannot distinguish leaves from composites at compile time without type checks',
          'Complex tree traversal, modification, and validation logic can emerge when the tree structure has constraints beyond the pattern itself',
        ],
        realWorld: [
          'File system (files and directories)',
          'React component trees (components containing components)',
          'GUI widget trees (panels containing buttons and other panels)',
        ],
      },
      {
        id: 'bridge-pattern',
        name: 'Bridge Pattern',
        description:
          'Decouples an abstraction from its implementation so that the two can vary independently — avoiding a Cartesian product explosion of subclasses.',
        keyPoints: [
          'Without Bridge, combining M abstractions with N implementations requires M x N subclasses — Bridge reduces this to M + N by separating the hierarchies',
          'The abstraction holds a reference to an implementation object and delegates platform-specific work to it — the two hierarchies evolve independently',
          'The "bridge" is the composition relationship between the abstraction and the implementation — it replaces inheritance with delegation',
          'Enables runtime switching of implementations — the abstraction can change its implementation object dynamically without client code changes',
          'Bridge is especially useful when a class hierarchy is growing in two orthogonal dimensions (e.g., shape types x rendering platforms)',
        ],
        tradeoffs: [
          'Adds complexity through indirection — the abstraction delegates to the implementation, adding a layer that must be understood and maintained',
          'Identifying the right split between abstraction and implementation requires careful domain analysis — a wrong split creates artificial separation',
        ],
        realWorld: [
          'JDBC driver architecture (API abstraction bridged to vendor drivers)',
          'Cross-platform GUI frameworks (Window abstraction bridged to OS-specific rendering)',
          'Remote controls (abstraction) for different devices (implementation)',
        ],
      },
      {
        id: 'flyweight-pattern',
        name: 'Flyweight Pattern',
        description:
          'Minimizes memory usage by sharing common state (intrinsic state) among many objects, while keeping unique state (extrinsic state) external to the shared objects.',
        keyPoints: [
          'Intrinsic state is shared and immutable — it is stored inside the flyweight object and is the same for all contexts where the flyweight is used',
          'Extrinsic state varies per context and is passed into flyweight methods by the client — the flyweight does not store it, eliminating per-object overhead',
          'A flyweight factory maintains a pool of shared flyweight instances, returning existing ones instead of creating duplicates',
          'The memory savings are proportional to the number of objects and the ratio of shared to unique state — most effective when thousands of similar objects exist',
          'Flyweight objects must be immutable to be safely shared — any mutable state would cause one user of the flyweight to affect all others',
        ],
        tradeoffs: [
          'Separating intrinsic and extrinsic state increases code complexity — the client must manage and pass extrinsic state explicitly',
          'Trading memory for CPU — looking up flyweights in the factory and passing extrinsic state adds runtime overhead per operation',
        ],
        realWorld: [
          'String interning in Java/Python (shared string instances)',
          'Character rendering in text editors (shared glyph objects)',
          'Game object pooling (shared tree/grass models with per-instance position)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Behavioral Patterns (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'Observer & Event Systems',
    part: 3,
    partTitle: 'Behavioral Patterns',
    summary:
      'Observer establishes a one-to-many dependency so that when one object changes state, all dependents are notified automatically. Event-driven architectures extend this concept to distributed systems with publish/subscribe and reactive streams.',
    concepts: [
      {
        id: 'observer-pattern',
        name: 'Observer Pattern',
        description:
          'Defines a one-to-many dependency between objects so that when the subject changes state, all registered observers are notified and updated automatically.',
        keyPoints: [
          'The subject maintains a list of observers and provides methods to subscribe (attach), unsubscribe (detach), and notify — observers implement an update interface',
          'Promotes loose coupling — the subject knows only that observers implement the observer interface, not their concrete types or what they do with the notification',
          'Push model sends the changed data with the notification; pull model sends a minimal notification and lets observers query the subject for details they need',
          'Observer is the foundation of the Model-View-Controller pattern — the model (subject) notifies views (observers) when data changes',
          'Memory leaks occur when observers are not properly unsubscribed — the subject holds references preventing garbage collection of defunct observers',
        ],
        tradeoffs: [
          'Notification order is typically undefined — observers should not depend on being notified in a particular sequence',
          'Cascading updates can occur when an observer modifies the subject during notification, triggering another round of notifications',
          'In large systems, the number of notifications can become a performance bottleneck — especially if many observers are registered and the subject changes frequently',
        ],
        realWorld: [
          'DOM event listeners (addEventListener)',
          'React state updates triggering re-renders',
          'RxJS Observables and Subscribers',
        ],
      },
      {
        id: 'pub-sub-architecture',
        name: 'Pub/Sub Architecture',
        description:
          'An evolution of Observer where publishers and subscribers are fully decoupled through a message broker — publishers emit events to topics without knowing who will receive them.',
        keyPoints: [
          'Unlike Observer where the subject directly references observers, Pub/Sub introduces a broker (event bus, message queue) that mediates between publishers and subscribers',
          'Publishers emit events to named topics/channels — they have no knowledge of subscribers, their count, or whether any exist at all',
          'Subscribers register interest in specific topics — the broker routes matching events to them, potentially with filtering, transformation, or guaranteed delivery',
          'Enables asynchronous, distributed communication — publishers and subscribers can be in different processes, servers, or even data centers',
          'Message ordering, at-least-once vs. exactly-once delivery, and dead letter queues are critical considerations in production Pub/Sub systems',
        ],
        tradeoffs: [
          'The indirection through the broker makes it harder to trace the flow of events through the system — debugging requires specialized tooling',
          'The broker is a single point of failure unless it is replicated — broker downtime affects all communication',
          'Eventually consistent by nature — subscribers may receive events with delay, leading to temporary inconsistency',
        ],
        realWorld: [
          'Apache Kafka for event streaming',
          'Redis Pub/Sub for real-time notifications',
          'AWS SNS/SQS for cloud event routing',
        ],
      },
      {
        id: 'reactive-streams',
        name: 'Reactive Streams',
        description:
          'A standard for asynchronous stream processing with non-blocking backpressure, allowing producers and consumers to negotiate data flow rates to prevent overwhelming slow consumers.',
        keyPoints: [
          'Reactive Streams define four interfaces: Publisher, Subscriber, Subscription, and Processor — together they form a pull-based protocol where consumers control the flow',
          'Backpressure is the key innovation — the subscriber tells the publisher how many items it can handle (request(n)), preventing buffer overflow when the producer is faster than the consumer',
          'Operators (map, filter, flatMap, merge) compose streams declaratively — building complex asynchronous data pipelines from simple transformations',
          'Cold streams produce data per subscriber (each subscriber gets its own sequence); hot streams share data among all subscribers (broadcast)',
          'Error handling is explicit — errors propagate through the stream and can be caught, retried, or replaced with fallback values at any point in the pipeline',
        ],
        tradeoffs: [
          'Steep learning curve — the declarative, functional style with operator composition is fundamentally different from imperative programming',
          'Debugging is notoriously difficult — stack traces show framework internals rather than user code, and the asynchronous nature makes stepping through code with a debugger impractical',
          'Overhead for simple use cases — reactive streams add complexity that is only justified when dealing with truly asynchronous, high-throughput data flows',
        ],
        realWorld: [
          'RxJS for Angular and React applications',
          'Project Reactor in Spring WebFlux',
          'Kotlin Flow for coroutine-based streams',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Strategy & Command',
    part: 3,
    partTitle: 'Behavioral Patterns',
    summary:
      'Strategy encapsulates interchangeable algorithms behind a common interface, while Command encapsulates a request as an object, enabling parameterization, queuing, logging, and undo operations. Chain of Responsibility passes requests along a chain of handlers.',
    concepts: [
      {
        id: 'strategy-pattern',
        name: 'Strategy Pattern',
        description:
          'Defines a family of algorithms, encapsulates each one in its own class, and makes them interchangeable — the algorithm can vary independently from the clients that use it.',
        keyPoints: [
          'The context holds a reference to a strategy interface and delegates the algorithm to it — swapping the strategy object changes the behavior without modifying the context',
          'Eliminates conditional statements (if/else, switch) that select between algorithms — each algorithm is encapsulated in its own class',
          'Strategies can be swapped at runtime — the context can change its strategy dynamically based on user input, configuration, or system state',
          'Each strategy encapsulates one algorithm completely, making individual algorithms easy to test, understand, and reuse independently',
          'In functional programming, strategies are simply functions — a method that accepts a function parameter is effectively the Strategy pattern without the class ceremony',
        ],
        tradeoffs: [
          'Clients must be aware of different strategies to select the appropriate one — the selection logic has to live somewhere',
          'Communication overhead — the context must pass enough data to the strategy, which may require either a broad interface or passing the context itself',
        ],
        realWorld: [
          'Sorting algorithms (Array.sort with custom comparator)',
          'Payment processing (credit card, PayPal, crypto strategies)',
          'Compression algorithms (gzip, brotli, zstd)',
        ],
      },
      {
        id: 'command-pattern',
        name: 'Command Pattern',
        description:
          'Encapsulates a request as an object, containing all information needed to perform the action — enabling parameterization, queuing, logging, and undoable operations.',
        keyPoints: [
          'A command object encapsulates a receiver (the object that performs the work), the action to invoke, and any parameters — decoupling the invoker from the receiver',
          'Commands can be stored in a history stack enabling undo/redo — each command implements both execute() and undo() methods that are inverses of each other',
          'Commands can be serialized, queued, and executed later — enabling job queues, scheduled tasks, and transactional behavior',
          'Macro commands compose multiple commands into a single command — executing the macro runs all sub-commands in sequence',
          'The Invoker triggers commands without knowing what they do — it simply calls execute(), achieving complete decoupling between UI actions and business logic',
        ],
        tradeoffs: [
          'Each distinct operation requires its own command class, which can lead to a proliferation of small classes in systems with many operations',
          'Implementing undo for commands with side effects (network calls, file I/O) is complex or impossible — undo works best for in-memory state changes',
        ],
        realWorld: [
          'Text editor undo/redo (each keystroke is a command)',
          'Database transaction logs (each operation is a command)',
          'GUI button/menu actions (click triggers command.execute())',
        ],
      },
      {
        id: 'chain-of-responsibility',
        name: 'Chain of Responsibility',
        description:
          'Passes a request along a chain of handlers, where each handler decides either to process the request or to pass it to the next handler in the chain.',
        keyPoints: [
          'Each handler has a reference to the next handler — when it receives a request, it either handles it and stops propagation, or passes it along to the next handler',
          'The sender does not know which handler will process the request — it sends to the first handler in the chain and the chain resolves it internally',
          'Handlers can be added, removed, or reordered at runtime — changing the chain changes the processing behavior without modifying any handler',
          'Two variants exist: pure (exactly one handler processes each request) and pipeline (every handler processes the request and passes it on, each adding its contribution)',
          'The pipeline variant is the basis of middleware architectures — each middleware in the chain processes the request and calls next()',
        ],
        tradeoffs: [
          'A request might reach the end of the chain without being handled — the system must have a strategy for unhandled requests (default handler, error)',
          'Debugging can be difficult because the request path through the chain is determined at runtime — it is not obvious from the code which handler will process a given request',
        ],
        realWorld: [
          'Express.js middleware chain',
          'DOM event bubbling (events propagate up the element tree)',
          'Exception handling (try/catch chains up the call stack)',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'State & Template Method',
    part: 3,
    partTitle: 'Behavioral Patterns',
    summary:
      'State allows an object to change its behavior when its internal state changes (appearing to change its class), Template Method defines the skeleton of an algorithm in a base class while letting subclasses override specific steps, and Visitor separates algorithms from the objects they operate on.',
    concepts: [
      {
        id: 'state-pattern',
        name: 'State Pattern',
        description:
          'Allows an object to alter its behavior when its internal state changes — the object appears to change its class by delegating behavior to the current state object.',
        keyPoints: [
          'The context holds a reference to a state object and delegates behavior to it — changing the state object changes how the context responds to the same method calls',
          'Each state is a separate class implementing a common state interface — the state-specific behavior is encapsulated in the state class rather than spread across conditionals',
          'State transitions can be managed by the context (centralized) or by the state objects themselves (distributed) — distributed transitions keep states self-contained but can be harder to trace',
          'Eliminates complex conditional logic (switch on state) in the context — adding a new state requires only creating a new state class without modifying existing states or the context',
          'State objects can be shared (flyweight) if they contain no instance-specific data, or unique per context if they maintain conversation state',
        ],
        tradeoffs: [
          'Can be overkill for simple state machines with few states — the overhead of separate classes for each state exceeds the benefit',
          'State transitions are spread across state classes when states manage their own transitions, making it harder to see the complete state machine at a glance',
        ],
        realWorld: [
          'TCP connection states (LISTEN, ESTABLISHED, CLOSED)',
          'Document workflow (Draft, Review, Published)',
          'Game character states (Idle, Walking, Jumping, Attacking)',
        ],
      },
      {
        id: 'template-method-pattern',
        name: 'Template Method Pattern',
        description:
          'Defines the skeleton of an algorithm in a base class method, deferring specific steps to subclasses — the overall structure is fixed but individual steps can be customized.',
        keyPoints: [
          'The template method in the base class calls a sequence of steps, some of which are abstract (must be overridden) and some have default implementations (hooks that can be overridden)',
          'Enforces the algorithm structure — subclasses cannot change the order of steps, only the implementation of individual steps, preventing inconsistent usage',
          'Hooks are optional overrides with default (often empty) implementations — they provide extension points without forcing subclasses to implement every step',
          'Follows the Hollywood Principle ("don\'t call us, we\'ll call you") — the base class controls the flow and calls subclass methods when needed',
          'Template Method uses inheritance, while Strategy uses composition for the same goal — Template Method is appropriate when the algorithm structure is fixed and only details vary',
        ],
        tradeoffs: [
          'Subclasses are tightly coupled to the base class — changes to the template method affect all subclasses, and the inheritance hierarchy can become rigid',
          'The more steps in the template method, the harder it is to understand and maintain — each step is an implicit requirement on subclasses',
        ],
        realWorld: [
          'React lifecycle methods (componentDidMount, render, componentWillUnmount)',
          'JUnit test framework (setUp, test, tearDown)',
          'Data processing pipelines (extract, transform, load)',
        ],
      },
      {
        id: 'visitor-pattern',
        name: 'Visitor Pattern',
        description:
          'Separates an algorithm from the object structure it operates on by placing the algorithm in a visitor object — allowing new operations to be added without modifying the element classes.',
        keyPoints: [
          'Elements accept a visitor through an accept(visitor) method — inside accept, the element calls the appropriate visit method on the visitor, passing itself as an argument (double dispatch)',
          'Double dispatch resolves the correct method based on both the element type and the visitor type — overcoming the limitation of single dispatch in most languages',
          'New operations are added by creating new visitor classes — the element hierarchy remains unchanged, following the Open/Closed Principle for operations',
          'The visitor accumulates state as it visits elements — computing aggregates, generating reports, or transforming the structure without modifying elements',
        ],
        tradeoffs: [
          'Adding a new element type requires modifying every visitor class to add a new visit method — the pattern is biased toward stable element hierarchies with frequently changing operations',
          'Visitors break encapsulation — they often need access to element internals (public getters or friend access) to perform meaningful operations',
          'The double-dispatch mechanism (accept calling visitX) is non-obvious and can be confusing to developers unfamiliar with the pattern',
        ],
        realWorld: [
          'AST (Abstract Syntax Tree) processing in compilers',
          'DOM traversal with different operations (rendering, serializing)',
          'Tax calculators visiting different product types',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Architectural Patterns (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'MVC, MVP & MVVM',
    part: 4,
    partTitle: 'Architectural Patterns',
    summary:
      'Three related architectural patterns for separating presentation from business logic in UI applications. Each defines different relationships between the model (data), view (display), and an intermediary component that coordinates them.',
    concepts: [
      {
        id: 'model-view-controller',
        name: 'Model-View-Controller',
        description:
          'Separates an application into three interconnected components — the Model manages data and business logic, the View renders the UI, and the Controller handles user input and updates the Model.',
        keyPoints: [
          'The Model is the single source of truth for application data — it is independent of the UI and notifies observers (Views) when it changes',
          'The View renders the Model data and sends user actions to the Controller — it should contain no business logic, only presentation logic',
          'The Controller receives user input from the View, interprets it, and invokes appropriate operations on the Model — it acts as a mediator between user actions and data changes',
          'The View observes the Model directly (in classic MVC) — when the Model changes, the View updates itself without going through the Controller',
          'MVC enables multiple Views of the same Model — e.g., a chart view and a table view both displaying the same dataset',
        ],
        tradeoffs: [
          'The direct View-Model connection creates coupling that can be problematic — the View must know the Model structure to observe and render it',
          'Controllers can become bloated ("fat controllers") if they accumulate business logic that belongs in the Model or service layer',
          'In web applications, the classic MVC cycle is adapted significantly — server-side MVC (Rails, Django) and client-side MVC differ in how they handle the request/response cycle',
        ],
        realWorld: [
          'Ruby on Rails (server-side MVC)',
          'ASP.NET MVC framework',
          'Cocoa/UIKit on iOS (UIViewController)',
        ],
      },
      {
        id: 'model-view-presenter',
        name: 'Model-View-Presenter',
        description:
          'A derivative of MVC where the Presenter fully mediates between the Model and View — the View is passive, containing no logic, and all presentation decisions are made by the Presenter.',
        keyPoints: [
          'The View is a "humble object" — it implements a simple interface that the Presenter calls to update the display, containing zero logic beyond basic rendering',
          'The Presenter holds references to both the View interface and the Model — it receives events from the View, updates the Model, and pushes changes back to the View',
          'Unlike MVC, the View does not observe the Model directly — all communication flows through the Presenter, creating a complete separation',
          'The passive View makes unit testing the Presenter straightforward — inject a mock View interface and verify that the Presenter calls the correct methods with correct data',
          'Two variants: Passive View (View has no logic) and Supervising Controller (View handles simple data binding, Presenter handles complex logic)',
        ],
        tradeoffs: [
          'The Presenter can become a god class if it handles too much logic — it needs to be carefully decomposed for complex views',
          'One-to-one relationship between View and Presenter is typical, which can lead to many Presenter classes in large applications',
          'More boilerplate than MVC — the View interface must be explicitly defined with methods for every UI update',
        ],
        realWorld: [
          'Android development (pre-Architecture Components)',
          'GWT (Google Web Toolkit)',
          'Windows Forms applications with testable presenters',
        ],
      },
      {
        id: 'model-view-viewmodel',
        name: 'Model-View-ViewModel',
        description:
          'The ViewModel exposes data and commands for the View through data binding — the View declaratively binds to ViewModel properties, automatically synchronizing the UI with the data.',
        keyPoints: [
          'The ViewModel is an abstraction of the View — it exposes observable properties and commands that the View binds to declaratively, eliminating manual UI update code',
          'Two-way data binding automatically synchronizes View input fields with ViewModel properties — changes in either direction propagate automatically',
          'The ViewModel transforms Model data into View-friendly formats (e.g., formatting dates, combining fields) — it contains presentation logic but no View technology references',
          'Commands in the ViewModel encapsulate actions (button clicks, form submissions) as bindable objects with canExecute/execute semantics',
          'The ViewModel is highly testable because it has no dependency on the View framework — tests can verify property values and command behavior without rendering UI',
        ],
        tradeoffs: [
          'Data binding can be difficult to debug — errors in binding expressions fail silently or produce obscure error messages',
          'Two-way binding can create unexpected feedback loops — a change in the View triggers a ViewModel update, which triggers a View update, and so on',
          'Overhead for simple views — the binding infrastructure and ViewModel class add complexity that is not justified for trivial screens',
        ],
        realWorld: [
          'WPF/XAML applications (Microsoft)',
          'Angular (component class as ViewModel)',
          'SwiftUI with ObservableObject',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Repository & Data Access',
    part: 4,
    partTitle: 'Architectural Patterns',
    summary:
      'Repository mediates between the domain and data mapping layers, providing a collection-like interface for accessing domain objects. Unit of Work tracks changes to objects during a business transaction and coordinates writing changes to the database.',
    concepts: [
      {
        id: 'repository-pattern',
        name: 'Repository Pattern',
        description:
          'Mediates between the domain and data mapping layers by providing a collection-like interface for accessing domain objects — encapsulating the logic required to access data sources.',
        keyPoints: [
          'The repository provides methods like find(id), findAll(criteria), add(entity), and remove(entity) — mimicking an in-memory collection of domain objects',
          'Encapsulates query logic — the domain layer works with repositories without knowing whether data comes from a database, API, file, or in-memory cache',
          'Enables switching data sources without changing domain logic — the repository interface stays the same; only the implementation changes',
          'Repositories should return domain objects, not database rows or DTOs — they are responsible for mapping between persistence format and domain model',
          'One repository per aggregate root (in DDD) — the repository manages the entire aggregate, not individual entities within it',
        ],
        tradeoffs: [
          'Can become a leaky abstraction — complex queries may not fit the collection metaphor, leading to method proliferation or the Specification pattern',
          'Adding a repository layer on top of an ORM that already provides similar functionality can be redundant abstraction',
          'Generic repositories (Repository<T>) can oversimplify — different aggregates may need very different query capabilities',
        ],
        realWorld: [
          'Spring Data JPA repositories',
          'Entity Framework DbSet<T> as implicit repositories',
          'Domain-Driven Design aggregate repositories',
        ],
      },
      {
        id: 'unit-of-work',
        name: 'Unit of Work',
        description:
          'Maintains a list of objects affected by a business transaction and coordinates the writing of changes and the resolution of concurrency problems.',
        keyPoints: [
          'Tracks all changes (inserts, updates, deletes) made to entities during a business operation — at the end, it commits all changes in a single database transaction',
          'Ensures atomicity — either all changes in the unit of work are persisted or none are, preventing partial updates that leave the database in an inconsistent state',
          'Batches database operations for efficiency — instead of executing individual SQL statements for each change, the Unit of Work can batch them into fewer round-trips',
          'Works closely with the Repository pattern — repositories register changes with the Unit of Work, which coordinates the actual persistence',
          'Identity Map is often part of the Unit of Work — tracking loaded entities to ensure that two loads of the same row return the same object instance',
        ],
        tradeoffs: [
          'All-or-nothing semantics can be too coarse — some business operations span multiple logical transactions that should not be coupled',
          'Holding changes in memory until commit increases memory usage — large batch operations may need to be chunked',
          'Complexity in tracking relationships and ordering SQL statements to satisfy foreign key constraints during the commit phase',
        ],
        realWorld: [
          'Entity Framework DbContext (implements Unit of Work)',
          'Hibernate Session (tracks dirty entities)',
          'Django ORM transaction.atomic() blocks',
        ],
      },
      {
        id: 'data-mapper-vs-active-record',
        name: 'Data Mapper vs Active Record',
        description:
          'Two approaches to object-relational mapping — Active Record combines data access with domain logic in the same class, while Data Mapper separates them completely.',
        keyPoints: [
          'Active Record: the domain object knows how to persist itself — it inherits from a base class that provides save(), delete(), and find() methods, combining domain logic with persistence',
          'Data Mapper: a separate mapper class handles all persistence logic — the domain object is a plain object with no knowledge of the database, keeping it pure and focused',
          'Active Record is simpler for CRUD-heavy applications with straightforward domain logic — the one-to-one mapping between table and class is intuitive',
          'Data Mapper is better for complex domain models — the domain objects can evolve independently of the database schema, and the mapping logic handles any mismatches',
          'Active Record creates a tight coupling between domain and database — schema changes directly affect domain objects; Data Mapper isolates this dependency',
        ],
        tradeoffs: [
          'Active Record simplicity comes at the cost of testability — domain objects depend on the database framework, making unit testing without a database difficult',
          'Data Mapper adds complexity — separate mapper classes, DTOs, and potentially different models for domain and persistence, increasing the amount of code to write and maintain',
          'Active Record struggles with complex mappings (inheritance, many-to-many) where the table structure diverges from the domain model',
        ],
        realWorld: [
          'Ruby on Rails ActiveRecord (Active Record pattern)',
          'Hibernate/JPA (Data Mapper pattern)',
          'Prisma (Data Mapper) vs Sequelize (Active Record)',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Event Sourcing & CQRS',
    part: 4,
    partTitle: 'Architectural Patterns',
    summary:
      'Event Sourcing stores the complete history of state changes as a sequence of immutable events rather than just the current state. CQRS separates the read and write models of an application, optimizing each independently. Together, they form the foundation of modern event-driven architectures.',
    concepts: [
      {
        id: 'event-sourcing',
        name: 'Event Sourcing',
        description:
          'Persists the state of a business entity as a sequence of immutable domain events — the current state is derived by replaying all events from the beginning.',
        keyPoints: [
          'Every state change is captured as an immutable event (e.g., OrderPlaced, ItemAdded, PaymentReceived) — events are facts that happened and are never modified or deleted',
          'The current state is computed by folding/reducing the event stream — applying each event in order to an initial empty state produces the current state',
          'Complete audit trail is built in — every change is recorded with who, what, when, and why, meeting compliance requirements naturally',
          'Temporal queries are trivial — replay events up to any point in time to see what the state was at that moment, enabling debugging and business analysis',
          'Events can be projected into multiple read models — the same event stream can power a relational table, a search index, a graph, and an analytics dashboard simultaneously',
        ],
        tradeoffs: [
          'Event schema evolution is complex — as the domain evolves, old events may not match new schemas, requiring upcasting (transforming old events to new formats) or versioning',
          'Rebuilding state from a long event stream is slow — snapshots (periodic state checkpoints) are needed to avoid replaying millions of events',
          'Eventually consistent read models — projections may lag behind the event stream, leading to stale reads',
          'Complexity overhead — event sourcing adds significant architectural complexity that is only justified for domains where the history of changes is as important as the current state',
        ],
        realWorld: [
          'Bank account ledgers (sequence of debits and credits)',
          'Git version control (commits are events)',
          'Shopping cart systems tracking every user action',
        ],
      },
      {
        id: 'cqrs-pattern',
        name: 'CQRS Pattern',
        description:
          'Command Query Responsibility Segregation separates the read model (queries) from the write model (commands), allowing each to be optimized, scaled, and evolved independently.',
        keyPoints: [
          'Commands change state but return no data; Queries return data but change no state — this strict separation enables independent optimization of each path',
          'The write model can use a normalized, event-sourced, or domain-rich representation optimized for consistency and business rules',
          'The read model can use denormalized, pre-computed views optimized for query performance — different read models for different query patterns',
          'Write and read models can use different databases — e.g., a relational database for writes and Elasticsearch for reads, each chosen for its strengths',
          'CQRS does not require Event Sourcing — it can be used with a traditional database where the write model updates both the primary store and the read models',
        ],
        tradeoffs: [
          'Eventual consistency between write and read models — after a command succeeds, the read model may not reflect the change immediately',
          'Significant infrastructure complexity — maintaining separate databases, synchronization mechanisms, and deployment pipelines for read and write sides',
          'Overkill for simple CRUD applications where the read and write models are identical — the added complexity provides no benefit',
        ],
        realWorld: [
          'E-commerce platforms (fast catalog reads, consistent order writes)',
          'Social media feeds (denormalized read model, normalized write model)',
          'Reporting systems with separate OLAP read stores',
        ],
      },
      {
        id: 'event-driven-architecture',
        name: 'Event-Driven Architecture',
        description:
          'A distributed architectural pattern where components communicate through the production, detection, and consumption of events — enabling loose coupling, scalability, and real-time responsiveness.',
        keyPoints: [
          'Components emit events when something significant happens — they do not call other components directly, enabling extreme loose coupling',
          'Event types include domain events (business-meaningful occurrences), integration events (cross-service communication), and system events (infrastructure-level signals)',
          'Event brokers (Kafka, RabbitMQ, EventBridge) provide reliable event delivery with features like ordering, replay, dead letter queues, and partitioning',
          'Choreography (each service reacts independently to events) vs. Orchestration (a central coordinator directs the workflow) — choreography is more decoupled but harder to understand',
          'Idempotency is critical — events may be delivered multiple times (at-least-once), so consumers must handle duplicate processing gracefully',
        ],
        tradeoffs: [
          'Distributed debugging is significantly harder — tracing an operation across multiple services reacting to events requires distributed tracing infrastructure (correlation IDs, Jaeger)',
          'Event ordering is only guaranteed within a partition — global ordering across all events is not feasible at scale, requiring careful partitioning design',
          'Schema management across producers and consumers requires a schema registry and compatibility rules to prevent breaking changes',
        ],
        realWorld: [
          'Microservices communication via Kafka',
          'Serverless architectures (AWS Lambda triggered by events)',
          'IoT systems processing sensor data streams',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
