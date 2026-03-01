export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ─── Topic 1: RESTful Design Principles ────────────────────────────
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'Which URI design best follows RESTful resource modeling conventions?',
    options: [
      '/api/getUsers?active=true',
      '/api/user/list/active',
      '/api/users?active=true',
      '/api/fetchActiveUsers',
    ],
    answer: 2,
    explanation:
      'RESTful URIs should use plural nouns (/users) representing resources, with query parameters for filtering (?active=true). Verbs like "get", "fetch", or "list" belong in HTTP methods, not in the URI path.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      'What does the statelessness constraint in REST require?',
    options: [
      'Each request must contain all information needed for the server to process it, with no session stored on the server.',
      'The server must not use a database to store persistent data.',
      'The client must not maintain any local state between requests.',
      'API responses must not include caching headers.',
    ],
    answer: 0,
    explanation:
      'Statelessness means the server stores no client session between requests. Every request must include authentication tokens, context, and any other data the server needs. This enables horizontal scaling because any server instance can handle any request.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'What is the primary benefit of embedding hypermedia links (_links) in API responses?',
    options: [
      'It reduces the response payload size by replacing data with links.',
      'It eliminates the need for API documentation entirely.',
      'It prevents clients from making invalid requests to the server.',
      'It allows clients to discover available actions dynamically rather than hardcoding URLs.',
    ],
    answer: 3,
    explanation:
      'Hypermedia links tell clients what actions are available next based on the current resource state. This decouples clients from hardcoded URL patterns and enables the API to evolve its URL structure without breaking clients.',
  },

  // ─── Topic 2: HTTP Methods, Headers & Status Codes ─────────────────
  {
    id: 't2-q1',
    chapterId: 2,
    question:
      'Which HTTP method is idempotent and replaces the entire resource?',
    options: ['POST', 'PATCH', 'PUT', 'DELETE'],
    answer: 2,
    explanation:
      'PUT is idempotent and replaces the entire resource representation. Sending the same PUT request multiple times produces the same result. Unlike PATCH (partial update) or POST (create, not idempotent), PUT requires the complete resource in the request body.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'Why should API credentials be sent in HTTP headers rather than query parameters?',
    options: [
      'Headers are encrypted while query parameters are not.',
      'Query parameters appear in server logs, browser history, and referrer headers, risking accidental exposure.',
      'Query parameters have a strict length limit that credentials might exceed.',
      'HTTP headers are automatically validated by the browser for correctness.',
    ],
    answer: 1,
    explanation:
      'Query parameters are logged by proxies, stored in browser history, and included in Referer headers when navigating away from a page. Sending credentials in headers (like Authorization: Bearer <token>) avoids these exposure risks.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'Which HTTP status code should be returned when a server successfully processes a request but has no content to return?',
    options: [
      '200 OK',
      '202 Accepted',
      '201 Created',
      '204 No Content',
    ],
    answer: 3,
    explanation:
      '204 No Content indicates the request was successful but there is no response body to return. This is commonly used for DELETE operations or PUT updates where the client does not need the updated resource back.',
  },

  // ─── Topic 3: Content Negotiation & HATEOAS ────────────────────────
  {
    id: 't3-q1',
    chapterId: 3,
    question:
      'What is the purpose of the Vary header in content negotiation?',
    options: [
      'It tells caches which request headers affect the response, so each variant is cached separately.',
      'It specifies which content types the server supports.',
      'It instructs the client to vary its retry interval on failures.',
      'It lists alternative URLs where the resource can be found.',
    ],
    answer: 0,
    explanation:
      'The Vary header tells caches (CDNs, proxies) which request headers cause different responses. For example, Vary: Accept means the cache must store separate copies for application/json and application/xml requests to the same URL.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'What is the main advantage of cursor-based pagination over offset pagination?',
    options: [
      'Cursor pagination allows jumping to any arbitrary page number.',
      'Cursor pagination provides stable results regardless of concurrent data modifications and performs well on large datasets.',
      'Cursor pagination uses less memory on the client side.',
      'Cursor pagination automatically sorts results in reverse chronological order.',
    ],
    answer: 1,
    explanation:
      'Cursor-based pagination uses an opaque token encoding the last seen record, providing stable results even when data is inserted or deleted between page requests. It also avoids the costly OFFSET scanning that degrades performance on large tables.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'In the Richardson Maturity Model, what distinguishes Level 3 from Level 2?',
    options: [
      'Level 3 uses JSON instead of XML for all responses.',
      'Level 3 requires all endpoints to support all HTTP methods.',
      'Level 3 adds hypermedia controls (HATEOAS) to guide clients through available state transitions.',
      'Level 3 mandates the use of HTTPS for all communications.',
    ],
    answer: 2,
    explanation:
      'Level 2 uses proper HTTP verbs and status codes with resource-based URIs. Level 3 adds hypermedia controls (HATEOAS), where responses include links that tell clients what actions are available next, making the API self-documenting and evolvable.',
  },

  // ─── Topic 4: GraphQL Design & Schema ──────────────────────────────
  {
    id: 't4-q1',
    chapterId: 4,
    question:
      'In GraphQL, what does the "nullable by default" design mean?',
    options: [
      'All input arguments are optional unless marked required.',
      'Database NULL values are automatically converted to empty strings in responses.',
      'Clients must explicitly request null handling in their queries.',
      'Every field can return null unless explicitly marked with ! (non-null), promoting resilience when individual resolvers fail.',
    ],
    answer: 3,
    explanation:
      'In GraphQL, fields are nullable by default. A field must be marked with ! to guarantee a non-null value. This design promotes resilience: if one resolver fails, it returns null for that field while the rest of the response is still delivered.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'What problem does DataLoader solve in GraphQL resolvers?',
    options: [
      'It compresses GraphQL responses for faster network transmission.',
      'It caches the entire GraphQL schema in memory for faster type resolution.',
      'It batches multiple individual database queries into a single query per tick of the event loop, solving the N+1 problem.',
      'It automatically generates resolvers from database table schemas.',
    ],
    answer: 2,
    explanation:
      'The N+1 problem occurs when a list resolver triggers one database query per item for related data. DataLoader collects all individual requests within a single tick of the event loop and batches them into one query, drastically reducing database calls.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'Why should GraphQL introspection be disabled in production?',
    options: [
      'Introspection exposes the full API schema, allowing attackers to discover all available types, fields, and operations.',
      'Introspection queries consume too much memory and will crash the server.',
      'Introspection responses are not compatible with production CDN caching.',
      'Introspection conflicts with persisted queries and causes runtime errors.',
    ],
    answer: 0,
    explanation:
      'Introspection allows anyone to query the complete schema, discovering every type, field, mutation, and subscription. In production, this gives attackers a complete map of the API surface. Disabling it forces reliance on separate documentation.',
  },

  // ─── Topic 5: gRPC & Protocol Buffers ──────────────────────────────
  {
    id: 't5-q1',
    chapterId: 5,
    question:
      'Why must Protocol Buffer field numbers never be reused once deployed?',
    options: [
      'Reusing field numbers causes memory corruption in the protoc compiler.',
      'Protocol Buffers enforce a global registry that rejects duplicate field numbers.',
      'Field numbers must be sequential; reusing them creates gaps that waste bandwidth.',
      'Field numbers are the wire format identity; reusing them causes existing clients to misinterpret the data as the old field type.',
    ],
    answer: 3,
    explanation:
      'In Protocol Buffers, field numbers (not names) identify fields on the wire. If a field number is reused for a different field, existing clients built against the old schema will deserialize the new data as the old type, causing silent data corruption.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'What gRPC streaming pattern would be most appropriate for a real-time chat application?',
    options: [
      'Unary RPC (single request, single response)',
      'Server streaming (one request, multiple responses)',
      'Bidirectional streaming (both sides send messages independently)',
      'Client streaming (multiple requests, one response)',
    ],
    answer: 2,
    explanation:
      'Bidirectional streaming opens a persistent channel where both client and server can send messages independently at any time. This is ideal for chat applications where both sides need to send and receive messages in real time.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'What is the purpose of gRPC deadlines?',
    options: [
      'They propagate a maximum time limit across service boundaries, preventing cascading timeouts in distributed systems.',
      'They specify when the protobuf schema definition expires and must be updated.',
      'They define how long a gRPC connection can remain idle before being closed.',
      'They set the maximum message size allowed in a single RPC call.',
    ],
    answer: 0,
    explanation:
      'gRPC deadlines propagate across service boundaries: a client sets a deadline and every downstream service inherits the remaining time. This prevents a single slow service from causing an entire chain of requests to hang indefinitely.',
  },

  // ─── Topic 6: WebSockets & Real-Time APIs ──────────────────────────
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'How does a WebSocket connection begin?',
    options: [
      'The client opens a raw TCP connection on port 443 with a WebSocket magic byte.',
      'The client sends a WebSocket CONNECT request that bypasses HTTP entirely.',
      'The server initiates the connection by sending a push notification to the client.',
      'The client sends an HTTP/1.1 GET request with Upgrade: websocket and Connection: Upgrade headers, and the server responds with 101 Switching Protocols.',
    ],
    answer: 3,
    explanation:
      'WebSocket connections start with a standard HTTP/1.1 handshake. The client sends a GET request with Upgrade: websocket headers. If the server supports WebSockets, it responds with 101 Switching Protocols, and the connection transitions to the WebSocket frame protocol.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'When would Server-Sent Events (SSE) be preferred over WebSockets?',
    options: [
      'When the client needs to send frequent messages to the server.',
      'When only the server needs to push updates to the client, since SSE works with standard HTTP infrastructure.',
      'When bidirectional real-time communication is required.',
      'When binary data transmission is required for performance.',
    ],
    answer: 1,
    explanation:
      'SSE is ideal for one-way server-to-client streaming (notifications, live feeds, AI response streaming). It works over standard HTTP, supports automatic reconnection, and is compatible with proxies and load balancers without special configuration.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question:
      'Why is a pub/sub layer (like Redis) needed when scaling WebSocket servers horizontally?',
    options: [
      'Redis is required to store the WebSocket handshake credentials securely.',
      'Redis compresses WebSocket frames for faster transmission between servers.',
      'A pub/sub layer allows multiple server instances to broadcast messages to all connected clients regardless of which server holds their connection.',
      'Pub/sub is needed to convert WebSocket messages to HTTP for backend processing.',
    ],
    answer: 2,
    explanation:
      'When WebSocket connections are distributed across multiple server instances, a message published on one server must reach clients connected to other servers. A shared pub/sub layer (Redis, Kafka) relays messages between server instances.',
  },

  // ─── Topic 7: Authentication & Authorization ───────────────────────
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'Which OAuth 2.0 flow is recommended for machine-to-machine communication with no user involvement?',
    options: [
      'Authorization Code with PKCE',
      'Implicit flow',
      'Device Authorization flow',
      'Client Credentials flow',
    ],
    answer: 3,
    explanation:
      'The Client Credentials flow is designed for machine-to-machine scenarios where no user is involved. The application authenticates directly with its client_id and client_secret to obtain an access token for accessing its own resources.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'What is the main challenge of JWT revocation?',
    options: [
      'JWTs are self-contained and validated without server state, so there is no built-in mechanism to invalidate a token before its expiration.',
      'JWTs cannot be signed with asymmetric algorithms, making them inherently insecure.',
      'JWT revocation requires all clients to update their signing keys simultaneously.',
      'JWTs can only be revoked by the authorization server that originally issued them.',
    ],
    answer: 0,
    explanation:
      'Since JWTs are self-contained, the resource server validates them using the signature and expiration without contacting the auth server. This means once issued, a JWT cannot be easily revoked. Workarounds include short expiration times, blacklists, or token versioning.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'Why are API keys not a substitute for user authentication?',
    options: [
      'API keys expire too quickly to be useful for user sessions.',
      'API keys identify the calling application, not the individual user making the request.',
      'API keys cannot be transmitted over HTTPS.',
      'API keys are limited to read-only access by specification.',
    ],
    answer: 1,
    explanation:
      'API keys identify which application is making the request (for tracking, quota enforcement, and billing) but do not identify which user is behind the request. User authentication requires separate mechanisms like OAuth tokens or JWTs.',
  },

  // ─── Topic 8: Rate Limiting & Throttling ───────────────────────────
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'What is the main drawback of the fixed window rate limiting algorithm?',
    options: [
      'It requires O(n) memory per client to track individual request timestamps.',
      'It allows up to 2x the intended rate at window boundaries when a client sends bursts at the end of one window and the start of the next.',
      'It cannot distinguish between different client identities.',
      'It does not support configurable rate limits per client tier.',
    ],
    answer: 1,
    explanation:
      'Fixed window divides time into fixed intervals. A client can send the maximum number of requests at the end of one window and again at the start of the next, effectively doubling the rate momentarily. Sliding window approaches eliminate this boundary burst problem.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'What is the purpose of adding jitter to exponential backoff retry strategies?',
    options: [
      'Jitter increases the maximum retry delay to prevent server overload.',
      'Jitter ensures that retries happen at exactly the same intervals for predictable behavior.',
      'Jitter reduces the total number of retry attempts to conserve client resources.',
      'Jitter randomizes retry timing to prevent the thundering herd problem where all clients retry simultaneously.',
    ],
    answer: 3,
    explanation:
      'Without jitter, all clients hitting a rate limit at the same time will retry at the same exponentially increasing intervals, creating synchronized bursts (thundering herd). Random jitter spreads retries over time, reducing peak load on the server.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'How do quotas differ from rate limits?',
    options: [
      'Quotas manage total usage over longer periods (daily/monthly) for resource allocation, while rate limits control requests per second/minute for burst protection.',
      'Quotas apply to read operations while rate limits apply to write operations.',
      'Quotas are enforced per user while rate limits are enforced per API key.',
      'Quotas are optional guidelines while rate limits are strict enforcement.',
    ],
    answer: 0,
    explanation:
      'Rate limits protect against short-term traffic bursts (100 requests/minute) while quotas manage overall resource allocation over longer periods (10,000 requests/day, 1GB/month). Both work together for comprehensive traffic management.',
  },

  // ─── Topic 9: Versioning & API Evolution ───────────────────────────
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'Which of the following is a safe, non-breaking change to an existing API?',
    options: [
      'Renaming an existing response field from "name" to "fullName".',
      'Changing a field type from string to integer.',
      'Adding a new optional field to the response body.',
      'Making a previously optional request parameter required.',
    ],
    answer: 2,
    explanation:
      'Adding new optional fields to responses is always safe because well-behaved clients following the robustness principle (Postel law) ignore unknown fields. Renaming fields, changing types, or making fields required are all breaking changes.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'What does the Sunset HTTP header (RFC 8594) communicate?',
    options: [
      'The time when the server will restart for maintenance.',
      'The timestamp when the response data was last updated.',
      'The duration for which the response can be cached.',
      'The date after which an API version or endpoint will be decommissioned.',
    ],
    answer: 3,
    explanation:
      'The Sunset header indicates when an API endpoint or version will be removed. Clients can parse this header to alert developers about upcoming deprecations, giving them time to migrate to newer versions before the endpoint is decommissioned.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question:
      'What is the Postel law (robustness principle) as applied to API evolution?',
    options: [
      'Be conservative in what you send and liberal in what you accept, so servers accept old formats and clients ignore unknown fields.',
      'APIs should always return the minimum amount of data to reduce bandwidth.',
      'APIs should enforce strict validation on all inputs and outputs to prevent data corruption.',
      'Every API change must be accompanied by a major version bump.',
    ],
    answer: 0,
    explanation:
      'The robustness principle states: "Be conservative in what you send, and liberal in what you accept." For APIs, this means servers should accept old request formats gracefully, and clients should ignore unrecognized response fields, enabling smoother evolution.',
  },

  // ─── Topic 10: API Documentation & OpenAPI ─────────────────────────
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'What key improvement did OpenAPI 3.1 introduce?',
    options: [
      'Support for GraphQL schema definitions alongside REST endpoints.',
      'Full alignment with JSON Schema draft 2020-12, making any valid JSON Schema a valid OpenAPI schema.',
      'Built-in support for WebSocket endpoint documentation.',
      'Automatic SDK generation without third-party tools.',
    ],
    answer: 1,
    explanation:
      'OpenAPI 3.1 aligned its schema objects with JSON Schema draft 2020-12, meaning any valid JSON Schema is now a valid OpenAPI schema. This unification simplifies validation tooling and enables reuse of the extensive JSON Schema ecosystem.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'What is the main difference between code-first and design-first API development?',
    options: [
      'Code-first uses REST while design-first uses GraphQL.',
      'Code-first does not produce documentation, while design-first always produces interactive docs.',
      'Code-first generates the OpenAPI spec from code annotations, while design-first writes the spec before implementation and generates code from it.',
      'Code-first is for internal APIs while design-first is for public APIs.',
    ],
    answer: 2,
    explanation:
      'Code-first derives the OpenAPI spec from code annotations/decorators (e.g., NestJS, FastAPI), ensuring the spec matches implementation. Design-first writes the spec as the contract before any code is written, then generates server stubs and client SDKs from it.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'What is the purpose of component schemas ($ref) in OpenAPI?',
    options: [
      'They reference external API specifications for microservice integration.',
      'They link to external documentation pages for each endpoint.',
      'They define environment-specific configuration variables.',
      'They promote reuse by defining common objects once and referencing them throughout the specification.',
    ],
    answer: 3,
    explanation:
      'Component schemas use $ref to define reusable objects (User, Error, Pagination) once in the components section and reference them throughout the spec. This keeps the specification DRY and ensures consistent schema definitions across all endpoints.',
  },

  // ─── Topic 11: Testing & Contract Testing ──────────────────────────
  {
    id: 't11-q1',
    chapterId: 11,
    question:
      'What is the core idea behind consumer-driven contract testing?',
    options: [
      'The API provider writes tests that all consumers must pass before integrating.',
      'Consumers and providers share a single end-to-end test suite that both teams maintain together.',
      'Each consumer defines the minimum fields and behaviors it expects, and the provider verifies its implementation satisfies all consumer contracts.',
      'A third-party service validates API contracts against industry standards.',
    ],
    answer: 2,
    explanation:
      'In consumer-driven contract testing, each consumer defines what it expects from the provider. The provider runs all consumer contracts as tests. If any contract breaks, the provider knows before deployment that a consumer would be affected.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'What does soak testing specifically detect that shorter load tests miss?',
    options: [
      'Memory leaks, connection pool exhaustion, and other time-dependent issues that emerge over extended periods.',
      'Authentication vulnerabilities that only appear under load.',
      'Network routing errors between data centers.',
      'Schema validation failures in request payloads.',
    ],
    answer: 0,
    explanation:
      'Soak testing runs sustained load over hours or days to detect issues that only emerge over time: memory leaks, connection pool exhaustion, database connection drift, file handle leaks, and other resource degradation that short burst tests cannot reveal.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'What does the Pact Broker compatibility matrix show?',
    options: [
      'Which programming languages are compatible with the Pact testing framework.',
      'Which HTTP methods each endpoint supports across all API versions.',
      'Which provider versions are compatible with which consumer versions based on contract verification results.',
      'The performance benchmarks for each provider-consumer pair.',
    ],
    answer: 2,
    explanation:
      'The Pact Broker stores contracts and verification results, then generates a compatibility matrix showing which provider versions satisfy which consumer contracts. This enables teams to make safe, independent deployment decisions.',
  },

  // ─── Topic 12: API Gateways & Service Mesh ─────────────────────────
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'What is the Backend for Frontend (BFF) pattern?',
    options: [
      'A database optimization pattern that creates separate read and write schemas.',
      'A caching strategy that stores pre-rendered frontend assets at the API gateway.',
      'A testing pattern that simulates frontend requests to validate backend behavior.',
      'A pattern where specialized gateway endpoints are created for each client type (mobile, web, IoT), aggregating and transforming data for specific clients.',
    ],
    answer: 3,
    explanation:
      'The BFF pattern creates dedicated gateway endpoints tailored to each client type. A mobile BFF might aggregate data from multiple services into a single response optimized for mobile bandwidth, while a web BFF returns richer data for desktop experiences.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'How do sidecar proxies in a service mesh handle communication transparently?',
    options: [
      'They intercept all inbound and outbound traffic, so the application communicates with localhost while the sidecar handles encryption, routing, and observability.',
      'They replace the application network stack with a custom protocol.',
      'They run inside the application process as a linked library.',
      'They require applications to use a mesh-specific SDK for all network calls.',
    ],
    answer: 0,
    explanation:
      'Sidecar proxies (like Envoy) are deployed alongside each service, intercepting all network traffic transparently. The application sends requests to localhost; the sidecar handles mTLS, routing, retries, and telemetry without any application code changes.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'What is traffic mirroring (shadowing) used for?',
    options: [
      'Creating backup copies of all API requests for disaster recovery.',
      'Copying live production traffic to a test environment to validate new versions against real traffic patterns without affecting production responses.',
      'Encrypting API traffic by creating a mirror of the TLS handshake.',
      'Duplicating database writes across multiple regions for consistency.',
    ],
    answer: 1,
    explanation:
      'Traffic mirroring copies real production requests to a test environment where a new version processes them. The production response is unaffected. This validates new versions against real-world traffic patterns, catching issues that synthetic tests miss.',
  },

  // ─── Topic 13: Error Handling & Observability ──────────────────────
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'What fields does RFC 7807 Problem Details require in error responses?',
    options: [
      'error, message, timestamp, and path.',
      'code, description, severity, and stack_trace.',
      'type (URI identifying the error), title, status, detail, and instance.',
      'status, error_id, user_message, and developer_message.',
    ],
    answer: 2,
    explanation:
      'RFC 7807 defines a standard error format with type (a URI identifying the error kind), title (human-readable summary), status (HTTP status code), detail (specific explanation), and instance (URI identifying this particular occurrence).',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'What is the W3C Trace Context standard used for?',
    options: [
      'Encrypting trace data as it passes between services.',
      'Defining the visual format for displaying distributed traces in monitoring dashboards.',
      'Compressing trace span data for efficient storage in tracing backends.',
      'Propagating trace IDs across service boundaries using standardized traceparent and tracestate headers, ensuring interoperability between tracing implementations.',
    ],
    answer: 3,
    explanation:
      'W3C Trace Context standardizes trace propagation through traceparent (trace ID, span ID, sampling flags) and tracestate headers. This ensures traces flow correctly across services using different tracing implementations (Jaeger, Zipkin, Datadog).',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'What is an error budget in the context of SLOs?',
    options: [
      'The monetary cost allocated for fixing production errors each quarter.',
      'The quantified amount of acceptable unreliability derived from the SLO target, which teams can spend on deployments and experiments.',
      'The maximum number of error log entries allowed before an alert fires.',
      'A reserve capacity of server resources kept available for handling error spikes.',
    ],
    answer: 1,
    explanation:
      'If the SLO is 99.9% availability, the error budget is 0.1% (about 43 minutes of downtime per month). Teams can "spend" this budget on risky deployments or experiments. When the budget is exhausted, focus shifts from features to reliability work.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
