export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ===== Topic 1: Requirements Engineering =====
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "What does the INVEST acronym stand for in the context of writing good user stories?",
    options: [
      "Iterative, Narrow, Verified, Engineered, Scoped, Tracked",
      "Integrated, Necessary, Validated, Estimated, Structured, Testable",
      "Independent, Negotiable, Valuable, Estimable, Small, Testable",
      "Incremental, Notable, Viable, Executable, Specific, Timely",
    ],
    answer: 2,
    explanation:
      "INVEST stands for Independent, Negotiable, Valuable, Estimable, Small, and Testable. These criteria help teams write user stories that are well-scoped and actionable. Each letter represents a quality that makes stories easier to plan, implement, and verify.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question: "Which of the following is a non-functional requirement (NFR)?",
    options: [
      "The system must respond within 200ms at p99 under 1000 concurrent users",
      "Users can upload profile pictures in JPEG or PNG format",
      "The dashboard displays a bar chart of monthly revenue",
      "Admins can export user data as a CSV file",
    ],
    answer: 0,
    explanation:
      "Non-functional requirements specify quality attributes like performance, scalability, and reliability rather than specific features. A measurable latency target under load is a classic NFR because it describes how well the system performs, not what it does. The other options describe functional capabilities the system provides.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      'In MoSCoW prioritization, what does the "S" stand for?',
    options: [
      "Shall have",
      "Should have",
      "Stretch goal",
      "Secondary priority",
    ],
    answer: 1,
    explanation:
      'MoSCoW stands for Must have, Should have, Could have, and Won\'t have (this time). "Should have" items are important but not critical for the current delivery — the system works without them, but they add significant value. They are typically included if time and resources allow.',
  },

  // ===== Topic 2: Software Architecture Fundamentals =====
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      'Why does Martin Fowler recommend a "monolith first" approach before adopting microservices?',
    options: [
      "Monoliths are always faster than microservices in production",
      "Microservices require proprietary tools that are too expensive for startups",
      "Most teams lack the infrastructure expertise to run microservices",
      "Microservices add significant complexity; starting simple lets you understand domain boundaries before splitting",
    ],
    answer: 3,
    explanation:
      "Fowler argues that microservices introduce distributed systems complexity including network latency, data consistency challenges, and operational overhead. Starting with a monolith lets you discover the natural boundaries of your domain. Once those boundaries are well understood, you can extract services with much greater confidence.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "What does an Architecture Decision Record (ADR) primarily capture?",
    options: [
      "The full technical specification of every component in the system",
      'The context, decision, and consequences of an architectural choice — focused on the "why"',
      "A chronological log of all code changes related to architecture",
      "Performance benchmarks comparing different architectural approaches",
    ],
    answer: 1,
    explanation:
      'An ADR documents the reasoning behind a specific architectural decision, including the context that led to it, the decision itself, and the expected consequences. The key value is capturing the "why" — future developers can understand the tradeoffs considered. ADRs are lightweight, typically one or two pages per decision.',
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question: "What does Conway's Law state?",
    options: [
      "Organizations design systems that mirror their own communication structure",
      "Software complexity always grows proportionally to team size",
      "Any system eventually becomes a distributed system given enough scale",
      "The cost of changing architecture doubles with each year of operation",
    ],
    answer: 0,
    explanation:
      "Conway's Law observes that the architecture of a system tends to reflect the organizational structure of the team that built it. For example, if three teams build a compiler, you are likely to get a three-pass compiler. This insight is why many organizations intentionally restructure teams to align with desired system architecture (the 'Inverse Conway Maneuver').",
  },

  // ===== Topic 3: API & Interface Design =====
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "Which HTTP method is both idempotent AND safe?",
    options: [
      "POST",
      "PUT",
      "GET",
      "DELETE",
    ],
    answer: 2,
    explanation:
      'GET is both safe and idempotent. "Safe" means the request has no side effects on the server — it only retrieves data. "Idempotent" means making the same request multiple times produces the same result. PUT and DELETE are idempotent but not safe (they modify state), while POST is neither safe nor idempotent.',
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "What is a key advantage of cursor-based pagination over offset-based pagination?",
    options: [
      "Stable results when data is being inserted or deleted, avoiding skipped or duplicated items",
      "It requires less memory on the server because cursors are smaller than offsets",
      "Cursor-based pagination is faster because it skips directly to the desired page",
      "It automatically caches previous pages for instant backward navigation",
    ],
    answer: 0,
    explanation:
      "With offset pagination, inserting or deleting rows can cause items to shift positions, leading to duplicated or skipped results across pages. Cursor-based pagination uses a stable pointer (like an ID or timestamp) to mark position, so results remain consistent even as data changes. This makes it especially valuable for feeds and real-time data.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "Which of the following constitutes a breaking API change?",
    options: [
      "Adding a new optional query parameter to an endpoint",
      "Adding a new field to a JSON response body",
      "Introducing a new endpoint under the same API version",
      "Removing a field from a response body",
    ],
    answer: 3,
    explanation:
      "Removing a field from a response body is a breaking change because existing clients may depend on that field. Additive changes — such as adding new fields, optional parameters, or new endpoints — are generally non-breaking because they do not affect existing clients. This is why API evolution guidelines favor additive, backward-compatible changes.",
  },

  // ===== Topic 4: Clean Code & Code Smells =====
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "What does the command-query separation (CQS) principle state?",
    options: [
      "Database reads and writes should go through separate microservices",
      "Functions should either change state (command) or return data (query), but not both",
      "API endpoints must separate GET requests from POST requests on different routes",
      "Test assertions should be in separate functions from test setup code",
    ],
    answer: 1,
    explanation:
      "Command-query separation, coined by Bertrand Meyer, states that a method should either perform an action (command) or return data (query), never both. Commands change the observable state of the system but return nothing; queries return data but have no side effects. This makes code easier to reason about because you can call queries freely without worrying about hidden state changes.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      'What is the "feature envy" code smell?',
    options: [
      "A class that has too many features and responsibilities",
      "A function that duplicates functionality already available in a library",
      "A method that uses another class's data more than its own, suggesting it belongs in that other class",
      "A module that imports features it never actually uses",
    ],
    answer: 2,
    explanation:
      "Feature envy occurs when a method accesses the data of another object more than its own data, suggesting the method would be more at home in that other class. It is a sign of misplaced responsibility. The typical refactoring is to move the method to the class whose data it primarily uses, improving cohesion.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "When does the DRY (Don't Repeat Yourself) principle become harmful?",
    options: [
      "When it creates the wrong abstraction — premature abstraction coupling unrelated code is worse than duplication",
      "When the duplicated code is fewer than five lines long",
      "When the project uses a dynamically typed language",
      "When the team has fewer than three developers",
    ],
    answer: 0,
    explanation:
      'DRY becomes harmful when developers extract shared abstractions too early, coupling code that only appears similar but serves different purposes. Sandi Metz famously stated that "duplication is far cheaper than the wrong abstraction." When requirements diverge, a premature abstraction forces awkward workarounds and makes the code harder to change than simple duplication would.',
  },

  // ===== Topic 5: Refactoring Techniques =====
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "What is the first step you should take before refactoring legacy code?",
    options: [
      "Rewrite the module from scratch using modern patterns",
      "Add detailed inline comments explaining the current behavior",
      "Create a UML diagram of the existing architecture",
      "Write characterization tests that capture the current behavior",
    ],
    answer: 3,
    explanation:
      'Characterization tests (also called "golden master" tests) document what the code actually does right now, even if that behavior includes bugs. They act as a safety net so you can refactor with confidence that you are not accidentally changing behavior. Michael Feathers describes this approach extensively in "Working Effectively with Legacy Code."',
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "What is the strangler fig pattern for modernizing legacy systems?",
    options: [
      "Rewriting the entire system in a new language during a feature freeze",
      "Gradually replacing a legacy system by routing functionality to a new system piece by piece, behind a facade",
      "Running the old and new systems in parallel and comparing outputs for correctness",
      "Removing unused code paths from the legacy system until only essential features remain",
    ],
    answer: 1,
    explanation:
      "Named after strangler fig trees that grow around host trees, this pattern incrementally replaces legacy functionality by intercepting requests at the edge and routing them to either the old or new system. Over time, more and more traffic flows to the new system until the legacy system can be decommissioned. This reduces the risk of a big-bang rewrite.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      'In the technical debt quadrant, what is "prudent deliberate" debt?',
    options: [
      "Debt caused by junior developers who do not know better design patterns",
      "Debt that accumulates naturally as the codebase ages and requirements change",
      'Knowingly taking shortcuts with a plan to address them later — "we know this is not ideal, but we will refactor next sprint"',
      "Debt from using experimental frameworks that later become deprecated",
    ],
    answer: 2,
    explanation:
      'Martin Fowler\'s technical debt quadrant classifies debt along two axes: reckless vs. prudent, and deliberate vs. inadvertent. Prudent deliberate debt is a conscious, strategic decision — the team understands the tradeoff and plans to pay it back. An example is shipping a quick implementation to meet a deadline with an explicit plan to refactor afterward.',
  },

  // ===== Topic 6: Testing Strategies =====
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "According to the test pyramid, which layer should have the most tests?",
    options: [
      "Unit tests — they are fast, cheap, and should form the broad base of the pyramid",
      "Integration tests — they catch the most real-world bugs",
      "End-to-end tests — they validate the full user experience",
      "Manual tests — they catch visual and UX issues that automation misses",
    ],
    answer: 0,
    explanation:
      "The test pyramid places unit tests at the base because they are fast to write, fast to execute, and inexpensive to maintain. Integration tests occupy the middle layer, and end-to-end tests sit at the top. The idea is to have many fast, focused unit tests and progressively fewer but broader tests at higher levels, balancing speed with confidence.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      'In the TDD red-green-refactor cycle, what happens during the "green" phase?',
    options: [
      "You identify a failing test scenario and write the test first",
      "You optimize the code for performance and readability",
      "You review the test coverage report and add missing tests",
      "You write the minimum code necessary to make the failing test pass",
    ],
    answer: 3,
    explanation:
      'The TDD cycle has three phases: Red (write a failing test), Green (write the simplest code that makes the test pass), and Refactor (clean up the code while keeping tests green). The green phase emphasizes minimalism — you only write enough code to pass the test, avoiding premature optimization or over-engineering.',
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "What is the key difference between a mock and a stub in testing?",
    options: [
      "Mocks are used in unit tests while stubs are used in integration tests",
      "A mock verifies that specific interactions occurred (was this method called?), while a stub simply provides canned responses",
      "Stubs simulate network failures while mocks simulate successful responses",
      "A mock replaces the entire class while a stub only replaces a single method",
    ],
    answer: 1,
    explanation:
      "The fundamental distinction is about verification. A stub provides predetermined responses to calls made during the test but does not verify how it was used. A mock, on the other hand, has expectations set on it — you assert that specific methods were called with specific arguments. Gerard Meszaros formalized this distinction in his test doubles taxonomy.",
  },

  // ===== Topic 7: Advanced Testing =====
  {
    id: "t7-q1",
    chapterId: 7,
    question: "What is property-based testing?",
    options: [
      "Testing that CSS properties render correctly across different browsers",
      "Testing object properties and getter/setter methods for correctness",
      "Generating random inputs to test that invariant properties of code always hold, finding edge cases humans miss",
      "Testing that configuration properties are loaded correctly from environment variables",
    ],
    answer: 2,
    explanation:
      "Property-based testing, popularized by Haskell's QuickCheck, generates random inputs and verifies that certain properties (invariants) always hold. For example, testing that sorting a list always produces a result with the same length and elements. It excels at finding edge cases that example-based tests miss, such as empty inputs, boundary values, and unusual character encodings.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question: "What does mutation testing measure?",
    options: [
      "The quality of a test suite by introducing small code changes (mutants) and checking if tests catch them",
      "How well the application handles data mutations in a concurrent environment",
      "The rate at which bugs are introduced during refactoring",
      "Whether database mutations (INSERT, UPDATE, DELETE) maintain data integrity",
    ],
    answer: 0,
    explanation:
      'Mutation testing evaluates test suite effectiveness by making small, systematic changes to the source code (like changing > to >= or flipping a boolean) and running the tests. If a test fails, the mutant is "killed." A high mutation score means your tests are sensitive to code changes and likely catch real bugs. It is a stronger metric than simple code coverage.',
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "Why should you use p99 latency instead of average latency when setting SLOs?",
    options: [
      "p99 latency is always lower than average latency, making SLOs easier to meet",
      "Average latency is impossible to calculate accurately in distributed systems",
      "p99 is the industry standard required by cloud provider SLAs",
      "Averages hide tail latency — a good average can mask a terrible experience for 1% of users",
    ],
    answer: 3,
    explanation:
      "Average latency can be misleading because a small number of extremely slow requests get averaged out, hiding the poor experience of affected users. p99 latency tells you that 99% of requests complete within that time, giving a much clearer picture of worst-case user experience. In high-traffic systems, even 1% of slow requests can affect thousands of users.",
  },

  // ===== Topic 8: Agile Methodologies =====
  {
    id: "t8-q1",
    chapterId: 8,
    question: "What is the purpose of WIP (Work In Progress) limits in Kanban?",
    options: [
      "To ensure every developer has at least one task assigned at all times",
      "To prevent context switching and expose bottlenecks by forcing teams to finish work before starting new work",
      "To limit the total number of features shipped per quarter",
      "To restrict the number of developers who can work on a single feature",
    ],
    answer: 1,
    explanation:
      "WIP limits constrain how many items can be in a given stage at one time. When a stage hits its limit, no new work can enter until something moves forward. This exposes bottlenecks because work piles up visibly before the constrained stage. It also reduces context switching because team members focus on completing existing work rather than starting new tasks.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question: "What do story points measure in agile estimation?",
    options: [
      "The exact number of hours a task will take to complete",
      "The number of developers needed to complete the story",
      "Relative complexity and effort — a 5-point story is roughly twice as complex as a 3-point story",
      "The business value the story delivers to end users",
    ],
    answer: 2,
    explanation:
      "Story points are a unit of relative estimation that accounts for complexity, effort, and uncertainty — not calendar time. Teams calibrate their scale through experience. The key insight is that humans are better at comparing relative sizes (this story is about twice as hard as that one) than estimating absolute durations.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question: "What happens during a sprint retrospective?",
    options: [
      "The team reflects on the sprint process and identifies improvements for the next sprint",
      "The product owner presents the backlog items planned for the next sprint",
      "Stakeholders review the completed work and provide feedback on features",
      "The team estimates story points for all items in the upcoming sprint",
    ],
    answer: 0,
    explanation:
      "The sprint retrospective is a dedicated ceremony for process improvement. The team discusses what went well, what did not go well, and what they can improve. Unlike the sprint review (which focuses on the product), the retrospective focuses on the team's way of working. Actionable improvements are identified and carried into the next sprint.",
  },

  // ===== Topic 9: Code Review & Collaboration =====
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What does research suggest about optimal pull request size for effective code review?",
    options: [
      "Larger PRs are better because reviewers get full context of the change",
      "PR size does not significantly affect review quality",
      "PRs should contain exactly one commit regardless of line count",
      "Smaller PRs (under 400 lines) get more thorough reviews and have lower defect rates",
    ],
    answer: 3,
    explanation:
      "Studies by SmartBear and Microsoft Research show that review effectiveness drops sharply after about 200-400 lines of code. Reviewers suffer from fatigue and start skimming larger changes, missing defects. Smaller PRs also get reviewed faster, provide quicker feedback loops, and are easier to revert if something goes wrong.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question: "What is trunk-based development?",
    options: [
      "A workflow where developers commit to main frequently using short-lived branches, reducing merge conflicts",
      "A branching strategy where each developer maintains their own permanent branch",
      "A release process where the main branch is frozen during testing periods",
      "A development style that prohibits any form of branching or forking",
    ],
    answer: 0,
    explanation:
      "Trunk-based development keeps branches short-lived (ideally under a day) and merges to main frequently. This reduces the pain of merge conflicts and ensures the codebase stays integrated. Feature flags are often used to hide incomplete work. Research from the DORA team shows this practice correlates strongly with high-performing engineering organizations.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      'In pair programming, what is the role of the "navigator"?',
    options: [
      "Writing the code while the driver reviews it on a separate screen",
      "Managing the git workflow including commits, branches, and merges",
      "Thinking strategically about design, catching mistakes, and considering next steps while the driver writes code",
      "Running the test suite and reporting failures to the driver",
    ],
    answer: 2,
    explanation:
      "In pair programming, the driver focuses on the tactical work of typing code, while the navigator takes a strategic view — thinking about the overall approach, catching bugs and typos, considering edge cases, and planning the next steps. The two roles complement each other, and pairs should swap roles regularly to stay engaged and share knowledge.",
  },

  // ===== Topic 10: Documentation & Communication =====
  {
    id: "t10-q1",
    chapterId: 10,
    question: "What is the Diataxis framework for documentation?",
    options: [
      "A tool for auto-generating API documentation from code comments",
      "A framework that categorizes documentation into four types by user need: tutorials, how-to guides, reference, and explanation",
      "A methodology for writing documentation in multiple languages simultaneously",
      "A version control system specifically designed for documentation files",
    ],
    answer: 1,
    explanation:
      "Diataxis, created by Daniele Procida, organizes documentation along two axes: learning vs. working, and theory vs. practice. This produces four quadrants: tutorials (learning-oriented, practical), how-to guides (task-oriented, practical), reference (information-oriented, theoretical), and explanation (understanding-oriented, theoretical). Each type serves a different user need and should be written differently.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What does the C4 model provide for software architecture documentation?",
    options: [
      "Four coding conventions for consistent architecture: Classes, Contracts, Callbacks, Closures",
      "A standard color palette and icon set for architecture diagrams",
      "An automated tool that generates architecture diagrams from source code",
      "Four levels of abstraction for architecture diagrams: Context, Container, Component, and Code",
    ],
    answer: 3,
    explanation:
      "The C4 model, created by Simon Brown, provides a hierarchical approach to diagramming software architecture. Level 1 (Context) shows the system in its environment, Level 2 (Container) shows the high-level technology choices, Level 3 (Component) shows the internal structure of containers, and Level 4 (Code) shows class-level detail. You zoom in only as far as needed for your audience.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question: "What is README-driven development?",
    options: [
      "Writing the README before writing code to clarify the interface and user experience upfront",
      "A practice where every function must have a corresponding entry in the README",
      "Using the README file as the single source of truth for project configuration",
      "Generating code scaffolding automatically from a structured README template",
    ],
    answer: 0,
    explanation:
      "README-driven development, advocated by Tom Preston-Werner, proposes writing the README first as a form of design. By describing how the software will be used before building it, you clarify the user-facing interface, identify usability issues early, and create a specification that guides implementation. It is similar in spirit to test-driven development but focused on the user experience.",
  },

  // ===== Topic 11: Version Control Strategies =====
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "In semantic versioning (semver), what constitutes a MAJOR version bump?",
    options: [
      "Adding new features that are backward-compatible",
      "Fixing bugs without changing the public API",
      "Making a backward-incompatible or breaking API change",
      "Improving performance without changing functionality",
    ],
    answer: 2,
    explanation:
      "Semantic versioning uses the format MAJOR.MINOR.PATCH. A MAJOR bump signals backward-incompatible changes that may require consumers to update their code. MINOR bumps add functionality in a backward-compatible manner, and PATCH bumps fix bugs without changing the API. This convention helps dependency managers and consumers understand the impact of an upgrade.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "What is a key advantage of a monorepo over a polyrepo approach?",
    options: [
      "Each project can use a completely different programming language and build tool",
      "Atomic cross-project changes — you can update a library and all its consumers in a single commit",
      "Smaller repository size because code is not duplicated across repos",
      "Simpler CI/CD pipelines because there is only one build configuration",
    ],
    answer: 1,
    explanation:
      "The defining advantage of a monorepo is the ability to make atomic changes across multiple projects in a single commit. When you update a shared library, you can simultaneously update all consuming projects, ensuring everything stays in sync. This eliminates the 'diamond dependency' problem and version incompatibilities that plague polyrepo setups.",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "When is GitFlow more appropriate than trunk-based development?",
    options: [
      "When the team has more than ten developers working on the same codebase",
      "When continuous deployment is the primary release strategy",
      "When the project is an open-source library with many external contributors",
      "When maintaining multiple release versions simultaneously, such as v1.x and v2.x both in production",
    ],
    answer: 3,
    explanation:
      "GitFlow shines when you need to maintain multiple supported versions simultaneously, such as providing hotfixes for v1.x while developing v2.x. Its dedicated release and hotfix branches make this workflow manageable. For teams doing continuous deployment with a single production version, trunk-based development is generally simpler and faster.",
  },

  // ===== Topic 12: Production Readiness =====
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "What is the key difference between blue-green and canary deployments?",
    options: [
      "Blue-green switches all traffic at once between two environments; canary gradually increases traffic to the new version",
      "Blue-green is for database migrations; canary is for application code deployments",
      "Blue-green requires two identical production environments; canary only requires one",
      "Blue-green is automated; canary deployments must be manually approved at each stage",
    ],
    answer: 0,
    explanation:
      "In blue-green deployment, you maintain two identical environments and switch all traffic from the current (blue) to the new (green) at once, with instant rollback by switching back. Canary deployment instead routes a small percentage of traffic to the new version first, gradually increasing it while monitoring for errors. Canary provides more gradual risk reduction but is more complex to implement.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "What is the difference between readiness and liveness probes in Kubernetes?",
    options: [
      "Readiness probes check CPU usage; liveness probes check memory usage",
      "Readiness probes run at startup only; liveness probes run continuously",
      "Readiness determines if a pod should receive traffic; liveness determines if a pod should be restarted",
      "Readiness probes are for stateless services; liveness probes are for stateful services",
    ],
    answer: 2,
    explanation:
      "A readiness probe tells Kubernetes whether a pod is ready to handle requests — if it fails, the pod is removed from the service load balancer but keeps running. A liveness probe tells Kubernetes whether a pod is still alive — if it fails, Kubernetes restarts the pod. Using both correctly prevents sending traffic to unready pods while recovering from deadlocked or hung processes.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "What is an error budget in the context of Site Reliability Engineering?",
    options: [
      "The maximum dollar amount allocated for fixing production incidents per quarter",
      "The allowed amount of unreliability (100% minus SLO target) — once exhausted, feature work freezes to focus on reliability",
      "The number of errors a monitoring system can process before it starts dropping alerts",
      "A cap on the number of known bugs permitted in the backlog before a release",
    ],
    answer: 1,
    explanation:
      "An error budget, introduced by Google's SRE practices, quantifies how much unreliability is acceptable. For example, a 99.9% availability SLO gives you a 0.1% error budget — about 43 minutes of downtime per month. When the error budget is consumed, the team prioritizes reliability over new features. This creates a shared, data-driven framework for balancing innovation and stability.",
  },

  // ===== Topic 13: Incident Management & Reliability =====
  {
    id: "t13-q1",
    chapterId: 13,
    question: "What is the core principle behind blameless postmortems?",
    options: [
      "Identifying the single root cause of every incident for accountability",
      "Ensuring all incidents are resolved within a strict SLA timeframe",
      "Documenting incidents only when they result in customer-facing impact",
      'Focusing on systemic contributing factors rather than individual blame — "what in the system allowed this to happen?"',
    ],
    answer: 3,
    explanation:
      "Blameless postmortems, championed by John Allspaw and Etsy's engineering culture, recognize that human error is a symptom of systemic issues, not a root cause. By removing blame, team members feel safe to share the full truth about what happened, leading to deeper systemic fixes. The question shifts from \"who made the mistake?\" to \"what in the system made the mistake easy to make?\"",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "What is the first principle of chaos engineering before you start injecting failures?",
    options: [
      "Define the steady state of the system so you can measure the impact of failures",
      "Get written approval from all stakeholders and schedule a maintenance window",
      "Disable all alerting to prevent false positives during the experiment",
      "Run the experiment in a staging environment that mirrors production exactly",
    ],
    answer: 0,
    explanation:
      'The Principles of Chaos Engineering, as defined by Netflix, begin with defining "steady state" — the normal, measurable behavior of your system (such as transaction throughput, error rate, or latency). Without a clear baseline, you cannot determine whether injected failures actually caused degradation. This hypothesis-driven approach transforms chaos experiments from reckless testing into rigorous science.',
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "What is the incident commander's primary role during an incident?",
    options: [
      "Writing the postmortem document while the incident is still ongoing",
      "Directly debugging and fixing the root cause of the incident",
      "Coordinating the response, delegating tasks, and managing communication — not necessarily fixing the problem",
      "Approving all changes to production systems during the incident",
    ],
    answer: 2,
    explanation:
      "The incident commander (IC) serves as the central coordinator during an incident. They delegate technical investigation to subject matter experts, manage communication with stakeholders, track the timeline, and make decisions about escalation. Crucially, the IC should not be heads-down debugging — their value comes from maintaining the big picture and keeping the response organized.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
