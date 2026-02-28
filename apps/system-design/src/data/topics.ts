export interface Concept {
  id: string;
  title: string;
  keyPoints: string[];
  tradeoffs: string[];
  realWorld: string[];
}

export interface Chapter {
  id: number;
  title: string;
  part: number;
  concepts: Concept[];
}

export const parts = [
  { id: 1, title: 'Fundamentals' },
  { id: 2, title: 'Distributed Systems' },
  { id: 3, title: 'Infrastructure & Reliability' },
  { id: 4, title: 'Real-World Design' },
];

export const chapters: Chapter[] = [
  // ─── Part 1: Fundamentals ───────────────────────────────────────────
  {
    id: 1,
    title: 'Scalability & Performance',
    part: 1,
    concepts: [
      {
        id: 'vertical-vs-horizontal-scaling',
        title: 'Vertical vs Horizontal Scaling',
        keyPoints: [
          'Vertical scaling (scale-up) adds more CPU, RAM, or disk to a single machine; limited by the maximum capacity of available hardware',
          'Horizontal scaling (scale-out) adds more machines to a pool; requires the application to be designed for distribution (stateless services, shared-nothing architecture)',
          'Vertical scaling is simpler operationally since there is no need for load balancers or distributed coordination, but introduces a single point of failure',
          'Horizontal scaling enables near-linear throughput growth when bottlenecks are properly identified, but introduces complexity around data consistency and network partitions',
          'Hybrid approaches are common: scale vertically first for simplicity, then scale horizontally when you hit hardware limits or need fault tolerance',
        ],
        tradeoffs: [
          'Vertical scaling has a hard ceiling (largest available machine) and causes downtime during upgrades; horizontal scaling has no theoretical limit but requires stateless design, service discovery, and distributed data management',
          'Horizontal scaling increases operational complexity (deployment, monitoring, debugging) but provides better fault isolation since the failure of one node does not take down the entire system',
        ],
        realWorld: [
          'Stack Overflow famously served millions of users on a single vertically-scaled SQL Server instance for years before adding read replicas',
          'Google, Facebook, and Netflix are architected for horizontal scaling from day one using thousands of commodity servers',
          'Amazon RDS offers vertical scaling (instance size changes) while DynamoDB is inherently horizontally scaled across partitions',
        ],
      },
      {
        id: 'load-balancing',
        title: 'Load Balancing',
        keyPoints: [
          'Load balancers distribute incoming traffic across multiple backend servers to improve throughput, reduce latency, and provide redundancy',
          'Layer 4 (transport) load balancers route based on IP and TCP/UDP port without inspecting packet contents, offering higher throughput and lower latency than Layer 7',
          'Layer 7 (application) load balancers can inspect HTTP headers, cookies, and URL paths to make content-aware routing decisions such as routing /api to backend servers and /static to a CDN origin',
          'Common algorithms include round-robin, least-connections, weighted round-robin, and consistent hashing; the choice depends on whether requests are homogeneous or vary in cost',
          'Health checks (active probes or passive monitoring) allow the load balancer to remove unhealthy backends from the pool automatically, enabling zero-downtime deployments',
          'Session affinity (sticky sessions) pins a user to a specific backend but reduces the effectiveness of load distribution and complicates scaling; prefer stateless backends with external session stores',
        ],
        tradeoffs: [
          'Layer 4 is faster and cheaper but cannot do path-based routing, SSL termination, or request-level rate limiting; Layer 7 provides richer features but adds processing overhead per request',
          'Hardware load balancers (F5, Citrix) offer high performance but are expensive and inflexible; software load balancers (HAProxy, Nginx, Envoy) are cheaper and programmable but consume server resources',
          'A single load balancer is itself a single point of failure; production setups use active-passive or active-active pairs with floating IPs or DNS failover',
        ],
        realWorld: [
          'AWS ELB provides both ALB (Layer 7) and NLB (Layer 4); Google Cloud Load Balancing offers a global anycast L7 balancer that routes to the nearest healthy region',
          'Netflix uses Zuul as an edge gateway / L7 load balancer for request routing, authentication, and canary deployments',
          'Cloudflare and Akamai act as global L7 load balancers via their CDN edge network, also providing DDoS mitigation',
        ],
      },
      {
        id: 'caching-strategies',
        title: 'Caching Strategies',
        keyPoints: [
          'Cache-aside (lazy loading): the application checks the cache first; on a miss it reads from the database, writes the result to the cache, and returns it. Simple but can serve stale data after DB writes',
          'Write-through: every write goes to both the cache and the database synchronously, guaranteeing the cache is always consistent but adding write latency',
          'Write-behind (write-back): writes go to the cache immediately and are asynchronously flushed to the database in batches, reducing write latency but risking data loss if the cache node crashes before flush',
          'Cache invalidation is one of the hardest problems: TTL-based expiration is simple but allows stale reads; event-driven invalidation is precise but requires a reliable eviction pipeline',
          'The cache hit ratio is the primary metric; even 90% hit rate means 10% of requests still hit the database at full latency, which can be a problem at scale',
        ],
        tradeoffs: [
          'More aggressive caching reduces database load and latency but increases memory costs and the risk of serving stale data; the TTL must balance freshness against hit ratio',
          'Distributed caches (Redis Cluster, Memcached) scale horizontally but introduce network hops and potential inconsistency between cache nodes; local in-process caches (Caffeine, Guava) are faster but cannot be shared across instances and are limited by heap size',
          'Cache stampede (thundering herd) occurs when many requests for the same key miss simultaneously; mitigations include request coalescing, probabilistic early expiration, and locking',
        ],
        realWorld: [
          'Facebook uses Memcached at massive scale (trillions of requests/day) with a custom lease mechanism to prevent stale sets and thundering herds',
          'Twitter uses Redis for timeline caching, fan-out-on-write for celebrity tweets, and a multi-tier caching hierarchy',
          'CDN edge caches (Cloudflare, Akamai) are effectively a global caching layer for static and semi-static content, using HTTP Cache-Control headers for TTL management',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Networking & Protocols',
    part: 1,
    concepts: [
      {
        id: 'http-rest-apis',
        title: 'HTTP & REST APIs',
        keyPoints: [
          'REST uses standard HTTP methods (GET, POST, PUT, PATCH, DELETE) mapped to CRUD operations on resources identified by URIs, making APIs predictable and cacheable',
          'HTTP/1.1 suffers from head-of-line blocking (one request per TCP connection at a time); HTTP/2 multiplexes streams over a single connection, and HTTP/3 uses QUIC (UDP) to eliminate TCP-level HOL blocking',
          'Idempotency is critical for reliability: GET, PUT, and DELETE should be idempotent so retries are safe; POST is not idempotent, so use idempotency keys for payment or creation endpoints',
          'REST APIs should use proper status codes (200, 201, 400, 404, 429, 500) rather than returning 200 with an error body',
          'Pagination strategies include offset-based (simple but slow for large offsets), cursor-based (efficient for infinite scroll), and keyset-based (good for sorted data with no skipping)',
          'GraphQL and gRPC are alternatives: GraphQL lets clients specify exact data shapes (solves over/under-fetching), gRPC uses Protocol Buffers for strongly-typed, high-performance inter-service communication',
        ],
        tradeoffs: [
          'REST is simple, widely understood, and leverages HTTP caching, but can lead to over-fetching or under-fetching; GraphQL solves this but adds query complexity and makes caching harder',
          'gRPC is significantly faster than JSON-based REST due to binary serialization and HTTP/2 streaming, but is harder to debug (not human-readable) and has limited browser support without a proxy like grpc-web',
        ],
        realWorld: [
          'Stripe is considered a gold standard for REST API design: consistent resource naming, idempotency keys, versioning via headers, and comprehensive error objects',
          'GitHub offers both REST and GraphQL APIs; their GraphQL API was introduced specifically to reduce the number of round-trips mobile clients needed',
          'Google Cloud APIs use gRPC internally between services and provide REST transcoding for external clients via Envoy proxy',
        ],
      },
      {
        id: 'websockets-long-polling',
        title: 'WebSockets & Long Polling',
        keyPoints: [
          'WebSockets provide full-duplex, persistent connections over a single TCP socket, enabling real-time bidirectional communication with low overhead after the initial HTTP upgrade handshake',
          'Long polling: the client sends a request and the server holds it open until new data is available or a timeout occurs, then the client immediately reconnects. Simpler than WebSockets but uses more resources per connection',
          'Server-Sent Events (SSE) provide a unidirectional server-to-client stream over HTTP, with automatic reconnection and event IDs built into the protocol; ideal for live feeds where the client only receives data',
          'WebSocket connections are stateful and pinned to a specific server, making horizontal scaling harder; you need sticky sessions or a pub/sub backplane (Redis Pub/Sub, Kafka) to broadcast messages across instances',
          'Connection management at scale requires heartbeat/ping-pong frames to detect dead connections, exponential backoff for reconnection, and graceful handling of connection limits per server (typically 50K-100K concurrent per instance)',
        ],
        tradeoffs: [
          'WebSockets have the lowest latency for bidirectional communication but are harder to scale, debug, and secure (firewalls and proxies sometimes block them); SSE is simpler for server-push-only use cases and works through most proxies',
          'Long polling is the most compatible (works everywhere HTTP works) but wastes server resources holding open connections and has higher latency than WebSockets due to reconnection overhead',
        ],
        realWorld: [
          'Slack uses WebSockets for real-time messaging with a fallback to long polling, backed by a Redis-based pub/sub layer to fan messages out across server instances',
          'Uber uses WebSockets for real-time driver location updates and ride status changes, handling millions of concurrent connections',
          'Figma uses WebSockets for real-time collaborative editing with operational transformation (OT) to handle concurrent document mutations',
        ],
      },
      {
        id: 'cdn-edge-computing',
        title: 'CDN & Edge Computing',
        keyPoints: [
          'CDNs cache content at Points of Presence (PoPs) geographically close to users, reducing latency by serving requests from the nearest edge server instead of the origin',
          'Pull-based CDNs fetch content from the origin on first request and cache it (lazy); push-based CDNs require you to upload content explicitly. Most modern CDNs use pull with configurable TTLs via Cache-Control headers',
          'Edge computing moves application logic to CDN edge locations, enabling computation close to users for latency-sensitive operations like A/B testing, personalization, authentication, and geo-routing',
          'Cache invalidation on CDNs is eventually consistent; purging a URL from all PoPs worldwide can take seconds to minutes. Use versioned URLs (content hashing) for instant cache busting',
          'Edge functions (Cloudflare Workers, Vercel Edge Functions, Lambda@Edge) run serverless code at edge locations with sub-millisecond cold starts, but have limited CPU time, memory, and no persistent local storage',
        ],
        tradeoffs: [
          'CDNs dramatically improve performance for static and semi-static content but add complexity for dynamic, personalized, or authenticated content that varies per user',
          'Edge computing reduces latency but is constrained by edge runtime limitations (small memory, short execution times, limited API access); complex business logic still belongs at the origin',
          'Multi-CDN strategies improve reliability and performance but increase operational complexity and cost; you need a DNS-based or client-side traffic manager to route to the best CDN',
        ],
        realWorld: [
          'Netflix uses its own CDN (Open Connect) with dedicated appliances in ISP facilities to serve streaming video, reducing transit costs and latency',
          'Cloudflare Workers power edge-side rendering, A/B testing, and API gateway logic for companies like Discord and Shopify at 300+ edge locations worldwide',
          'Vercel deploys Next.js applications to edge locations globally, using edge middleware for authentication, redirects, and geolocation-based routing before requests reach the origin',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Data Storage Fundamentals',
    part: 1,
    concepts: [
      {
        id: 'sql-vs-nosql',
        title: 'SQL vs NoSQL',
        keyPoints: [
          'SQL databases (PostgreSQL, MySQL) enforce a rigid schema with ACID transactions, making them ideal for data with complex relationships, strict consistency requirements, and ad-hoc query needs',
          'Document stores (MongoDB, CouchDB) store schema-flexible JSON-like documents, good for hierarchical data and rapid iteration, but lack efficient joins across collections',
          'Key-value stores (Redis, DynamoDB) offer the lowest latency for simple lookups by key, with O(1) access patterns; they are the backbone of caching layers and session stores',
          'Wide-column stores (Cassandra, HBase) excel at high write throughput and time-series data with tunable consistency, storing data in column families optimized for specific query patterns',
          'Graph databases (Neo4j, Amazon Neptune) model relationships as first-class citizens, enabling efficient traversal of highly connected data like social networks, fraud detection, and recommendation engines',
        ],
        tradeoffs: [
          'SQL databases provide strong consistency, powerful joins, and mature tooling but can become bottlenecks for write-heavy workloads and are harder to scale horizontally without sharding',
          'NoSQL databases offer flexible schemas and horizontal scalability but sacrifice joins, multi-document transactions (in many cases), and the ability to run arbitrary ad-hoc queries efficiently',
          'Polyglot persistence (using multiple database types) optimizes for each access pattern but increases operational complexity, data synchronization challenges, and the total number of systems to monitor',
        ],
        realWorld: [
          'Airbnb uses PostgreSQL as its primary relational store but migrated search to Elasticsearch and uses Redis for caching and rate limiting',
          'Instagram started on PostgreSQL and scaled it to handle thousands of writes per second using pgbouncer connection pooling and logical sharding before adding Cassandra for feed storage',
          'Amazon built DynamoDB after experiencing scaling limitations with Oracle during peak shopping events; it is now the backbone of most AWS services internally',
        ],
      },
      {
        id: 'database-indexing',
        title: 'Database Indexing',
        keyPoints: [
          'B-tree indexes are the default in most relational databases: they keep data sorted for efficient range queries and equality lookups in O(log n) time, supporting ordered scans and composite key searches',
          'Hash indexes provide O(1) lookups for exact-match queries but cannot support range scans or sorting; used in memory-optimized tables and some key-value engines',
          'Composite (multi-column) indexes follow the leftmost prefix rule: an index on (a, b, c) can be used for queries filtering on (a), (a, b), or (a, b, c), but not on (b) or (c) alone',
          'Covering indexes include all columns needed by a query, allowing the database to serve the query entirely from the index without accessing the base table (index-only scan), dramatically reducing I/O',
          'Over-indexing slows down write operations because every INSERT, UPDATE, and DELETE must update all affected indexes; each index also consumes disk space and memory for buffer pool caching',
        ],
        tradeoffs: [
          'Adding indexes accelerates read queries but degrades write performance proportionally to the number of indexes; write-heavy tables should have minimal, well-chosen indexes',
          'Partial indexes (indexing only rows matching a condition) reduce index size and maintenance cost but only benefit queries that match the partial condition exactly',
          'Full-text search indexes (GIN in PostgreSQL, inverted indexes in Elasticsearch) enable keyword search but are expensive to build and maintain, and may require separate infrastructure at scale',
        ],
        realWorld: [
          'PostgreSQL uses B-tree by default, GIN indexes for full-text search and JSONB queries, GiST indexes for geometric and geospatial data, and BRIN indexes for large append-only tables',
          'Elasticsearch builds inverted indexes on every field by default, which is why it excels at search but consumes significant disk space and memory compared to a relational database',
          'Uber switched from PostgreSQL to MySQL partly because of differences in how each handles index updates during high-frequency row modifications (UPDATE-heavy workloads)',
        ],
      },
      {
        id: 'data-partitioning-sharding',
        title: 'Data Partitioning & Sharding',
        keyPoints: [
          'Horizontal partitioning (sharding) splits rows across multiple database instances by a shard key, allowing each shard to handle a fraction of the total traffic independently',
          'Range-based sharding assigns contiguous key ranges to shards (e.g., users A-M on shard 1, N-Z on shard 2); simple to implement but prone to hotspots if access patterns are skewed',
          'Hash-based sharding applies a hash function to the shard key and assigns the result to a shard; provides even distribution but makes range queries across shards expensive',
          'Cross-shard queries (joins and aggregations spanning multiple shards) are expensive and complex, often requiring scatter-gather patterns that increase latency linearly with shard count',
          'Resharding (adding or removing shards) is operationally painful; consistent hashing or virtual shards minimize data movement but the process still requires careful coordination to avoid downtime',
        ],
        tradeoffs: [
          'Sharding enables near-unlimited horizontal write scaling but sacrifices cross-shard joins, distributed transactions, and the ability to enforce global uniqueness constraints easily',
          'Application-level sharding gives you full control over routing logic but pushes complexity into your codebase; database-native sharding (Vitess, Citus, CockroachDB) abstracts this but adds another infrastructure layer',
          'Choosing the wrong shard key can create hotspots that make one shard a bottleneck while others sit idle; the shard key should have high cardinality and be present in most queries',
        ],
        realWorld: [
          'Vitess, originally built at YouTube, provides application-transparent sharding for MySQL and is now used by Slack, Square, and GitHub for horizontal database scaling',
          'Pinterest shards MySQL by user ID across thousands of shards, using a custom routing layer that maps user IDs to specific database instances',
          'CockroachDB and TiDB provide distributed SQL with automatic range-based sharding and rebalancing, offering a SQL interface with horizontal scalability',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'CAP Theorem & Consistency',
    part: 1,
    concepts: [
      {
        id: 'cap-theorem',
        title: 'CAP Theorem',
        keyPoints: [
          'The CAP theorem states that a distributed system can guarantee at most two of three properties simultaneously: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition tolerance (the system operates despite network splits)',
          'Partition tolerance is not optional in distributed systems because network partitions will happen; the real choice is between consistency and availability during a partition (CP vs AP)',
          'CP systems (ZooKeeper, HBase, etcd) reject requests or return errors during a partition rather than serve potentially stale data; they prioritize correctness over availability',
          'AP systems (Cassandra, DynamoDB, CouchDB) continue serving requests during a partition, accepting that different nodes may temporarily have divergent data that must be reconciled later',
          'The PACELC extension adds nuance: even when there is no Partition, you must choose between Latency and Consistency; most systems make different tradeoffs in normal operation vs during partitions',
        ],
        tradeoffs: [
          'Choosing CP means financial systems, inventory counts, and leader elections remain correct but may become temporarily unavailable during network issues, potentially dropping requests or returning errors',
          'Choosing AP means the system stays responsive for user-facing reads and writes but may show stale data or require conflict resolution (last-writer-wins, vector clocks, CRDTs) after the partition heals',
        ],
        realWorld: [
          'Google Spanner achieves external consistency (linearizability) across global data centers using GPS-synchronized TrueTime clocks, trading some availability during partitions for strong consistency',
          'Amazon DynamoDB defaults to eventually consistent reads (AP) but offers strongly consistent reads at the cost of higher latency and reduced throughput; the choice is per-request',
          'Apache ZooKeeper is CP: during a leader election or partition, the minority partition becomes unavailable, which is acceptable because ZooKeeper is used for coordination metadata, not user-facing traffic',
        ],
      },
      {
        id: 'consistency-models',
        title: 'Consistency Models',
        keyPoints: [
          'Strong (linearizable) consistency ensures every read returns the most recent write; it behaves as if there is a single copy of the data, but requires coordination that increases latency',
          'Sequential consistency guarantees that all operations appear in some total order consistent with the order seen by each individual process, but the global order may not reflect real-time ordering',
          'Causal consistency ensures that causally related operations are seen in the correct order by all nodes, while concurrent (unrelated) operations may be seen in different orders by different nodes',
          'Eventual consistency guarantees that if no new writes occur, all replicas will converge to the same value eventually; the convergence window depends on replication lag and can range from milliseconds to seconds',
          'Read-your-writes consistency ensures a client always sees its own writes, even if other clients see stale data; often implemented by routing reads to the same replica that handled the write or using session tokens',
        ],
        tradeoffs: [
          'Stronger consistency models provide a simpler programming model (easier to reason about) but require more coordination between nodes, increasing latency and reducing throughput and availability',
          'Weaker consistency models allow higher performance and availability but push complexity to the application layer, which must handle stale reads, conflicts, and out-of-order operations',
          'Tunable consistency (as in Cassandra and DynamoDB) lets you choose the consistency level per operation, but you must understand the implications: QUORUM reads + QUORUM writes give strong consistency in Cassandra',
        ],
        realWorld: [
          'Cassandra offers tunable consistency: ONE, QUORUM, ALL for both reads and writes, letting developers choose the tradeoff per query based on the use case',
          'Amazon Aurora provides read-after-write consistency for the writer instance and eventual consistency for read replicas, with a typical replication lag under 20ms',
          'Google Spanner provides linearizability globally by using TrueTime (GPS + atomic clocks) to assign globally meaningful timestamps to transactions',
        ],
      },
      {
        id: 'distributed-consensus',
        title: 'Distributed Consensus',
        keyPoints: [
          'Consensus algorithms allow a group of nodes to agree on a single value or sequence of operations even when some nodes fail; they are the foundation of replicated state machines and distributed coordination',
          'Raft divides consensus into leader election, log replication, and safety; a leader is elected by majority vote, and all writes go through the leader, who replicates log entries to followers before committing',
          'Paxos is the foundational consensus algorithm but is notoriously difficult to implement correctly; Multi-Paxos optimizes for repeated consensus rounds by maintaining a stable leader',
          'Consensus requires a majority quorum (N/2 + 1 of N nodes) to make progress, meaning a 3-node cluster tolerates 1 failure, a 5-node cluster tolerates 2, and a 7-node cluster tolerates 3',
          'Leader-based consensus introduces a bottleneck at the leader node for write throughput; leaderless approaches (EPaxos, Mencius) can improve throughput but are significantly more complex',
        ],
        tradeoffs: [
          'Raft is easier to understand and implement than Paxos, making it the popular choice for new systems, but both have similar performance characteristics in practice',
          'Increasing the cluster size improves fault tolerance but reduces write performance because more nodes must acknowledge each write; 3 or 5 nodes is the sweet spot for most systems',
          'Consensus across wide-area networks (multi-region) is expensive due to round-trip latency; techniques like witness replicas, flexible Paxos, and hierarchical consensus reduce cross-region coordination',
        ],
        realWorld: [
          'etcd (used by Kubernetes for cluster state) implements Raft; every write to the Kubernetes API server goes through etcd Raft consensus across typically 3 or 5 etcd nodes',
          'CockroachDB uses a Raft group per data range, allowing thousands of independent consensus groups to operate in parallel for horizontal write scaling',
          'Apache ZooKeeper uses ZAB (ZooKeeper Atomic Broadcast), a protocol similar to Paxos, for leader election and configuration management in Hadoop, Kafka, and HBase',
        ],
      },
    ],
  },

  // ─── Part 2: Distributed Systems ────────────────────────────────────
  {
    id: 5,
    title: 'Distributed Computing Patterns',
    part: 2,
    concepts: [
      {
        id: 'microservices-architecture',
        title: 'Microservices Architecture',
        keyPoints: [
          'Microservices decompose a monolith into small, independently deployable services, each owning its own data store and communicating via well-defined APIs (REST, gRPC, or async messaging)',
          'Each service should be organized around a business capability (Bounded Context from DDD), not a technical layer; a "User Service" owns user data and all user-related business logic',
          'Service discovery (Consul, Eureka, Kubernetes DNS) enables services to locate each other dynamically without hardcoded addresses, supporting scaling and rolling deployments',
          'An API gateway (Kong, AWS API Gateway, Envoy) provides a single entry point for clients, handling cross-cutting concerns like authentication, rate limiting, request routing, and response aggregation',
          'The distributed monolith anti-pattern occurs when microservices are tightly coupled through synchronous calls, shared databases, or coordinated deployments, negating the benefits of the architecture',
        ],
        tradeoffs: [
          'Microservices enable independent deployment, technology diversity, and team autonomy, but introduce distributed system complexity: network failures, data consistency across services, and operational overhead',
          'Debugging a request that spans multiple services requires distributed tracing (Jaeger, Zipkin) and centralized logging; without proper observability, microservices are much harder to troubleshoot than a monolith',
          'Start with a monolith and extract services when clear boundaries emerge; premature decomposition leads to wrong service boundaries that are painful to refactor later',
        ],
        realWorld: [
          'Netflix has over 1,000 microservices, each managed by a small team, deployed independently multiple times a day using their custom Spinnaker deployment platform',
          'Amazon mandated the "two-pizza team" rule and service-oriented architecture in 2002 (the Bezos API mandate), which eventually led to AWS as teams built general-purpose infrastructure services',
          'Uber initially had a monolith and gradually extracted services; their service mesh (built on Envoy) handles millions of RPC calls per second between thousands of microservices',
        ],
      },
      {
        id: 'event-driven-architecture',
        title: 'Event-Driven Architecture',
        keyPoints: [
          'Event-driven architecture decouples producers from consumers: services emit domain events (OrderPlaced, PaymentReceived) and other services react to them asynchronously without direct coupling',
          'Event sourcing stores every state change as an immutable event in an append-only log; the current state is derived by replaying events, providing a complete audit trail and the ability to reconstruct state at any point in time',
          'CQRS (Command Query Responsibility Segregation) separates read and write models: commands mutate state through the event store, and queries read from denormalized projections optimized for specific read patterns',
          'Events should carry enough data for consumers to act without calling back to the producer (event-carried state transfer); this reduces coupling but increases event payload size and duplication',
          'Exactly-once processing is extremely hard in distributed systems; most event-driven systems achieve effectively-once by combining at-least-once delivery with idempotent event handlers',
        ],
        tradeoffs: [
          'Asynchronous event processing improves scalability and decoupling but makes the system harder to reason about, debug, and test since there is no synchronous request-response flow to trace',
          'Event sourcing provides a perfect audit log and temporal queries but increases storage requirements and makes it complex to handle schema evolution of events over time',
          'CQRS allows read and write models to scale independently but doubles the data storage and introduces eventual consistency between the command and query sides',
        ],
        realWorld: [
          'LinkedIn built its architecture around Apache Kafka as a central event log, with all data changes flowing as events that feed search indexes, recommendations, and analytics pipelines',
          'EventStoreDB is purpose-built for event sourcing with built-in projections, subscriptions, and guaranteed ordering per stream',
          'Walmart uses event-driven architecture for its e-commerce platform, processing millions of order events during peak shopping days through Kafka-based event pipelines',
        ],
      },
      {
        id: 'saga-pattern',
        title: 'Saga Pattern',
        keyPoints: [
          'The saga pattern manages distributed transactions across multiple services by breaking them into a sequence of local transactions, each with a compensating action that undoes its effect if a later step fails',
          'Choreography-based sagas have each service emit an event after completing its local transaction; the next service listens for that event and continues the saga, with no central coordinator',
          'Orchestration-based sagas use a central saga orchestrator that explicitly tells each service what to do and handles failure by invoking compensating actions in reverse order',
          'Compensating actions must be idempotent and semantically undo the effect (e.g., refund a payment, release a reservation) since you cannot literally rollback a committed local transaction',
          'Sagas provide eventual consistency, not ACID isolation; concurrent sagas can see intermediate states, so you may need semantic locks or countermeasures',
        ],
        tradeoffs: [
          'Choreography is simpler for small sagas (2-3 steps) and has no single point of failure, but becomes hard to follow and debug as the number of steps grows since the flow is implicit in the event chain',
          'Orchestration centralizes the saga logic, making it easier to understand, modify, and monitor, but the orchestrator is a potential single point of failure and can become a bottleneck',
          'Sagas cannot provide read isolation (other transactions can see intermediate states), which may require additional patterns like semantic locks or explicit saga state tracking',
        ],
        realWorld: [
          'Uber uses orchestration-based sagas for ride booking: reserve driver, charge payment, confirm ride; if payment fails, the driver reservation is released as a compensating action',
          'AWS Step Functions is essentially a managed saga orchestrator, coordinating multi-step workflows with built-in retry logic and compensation',
          'Temporal.io provides durable execution for saga orchestration with automatic retries, timeouts, and compensating workflows, used by Stripe, Netflix, and Datadog',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Message Queues & Streaming',
    part: 2,
    concepts: [
      {
        id: 'message-queues',
        title: 'Message Queues',
        keyPoints: [
          'Message queues decouple producers and consumers: the producer enqueues a message and continues immediately; the consumer processes it asynchronously, smoothing traffic spikes and enabling independent scaling',
          'Point-to-point queues deliver each message to exactly one consumer; competing consumers (multiple workers reading from the same queue) enable parallel processing with automatic load distribution',
          'Dead letter queues (DLQs) capture messages that fail processing after a configured number of retries, preventing poison messages from blocking the queue while preserving them for investigation',
          'Message ordering is only guaranteed within a single queue or partition; if strict global ordering is required, you must use a single partition (which limits throughput) or design for out-of-order processing',
          'Visibility timeout (SQS) or acknowledgment deadline (RabbitMQ) ensures that if a consumer crashes mid-processing, the message becomes visible again for another consumer to pick up',
        ],
        tradeoffs: [
          'Queues add resilience and decoupling but introduce latency (messages are not processed immediately) and complexity (monitoring queue depth, handling poison messages, ensuring idempotent consumers)',
          'At-least-once delivery (the default for most queues) means consumers must be idempotent since the same message may be delivered more than once; exactly-once requires transactional dequeue which is expensive',
          'In-memory queues (Redis lists) are fast but lose messages on crash; durable queues (RabbitMQ with persistence, SQS) survive crashes but have higher write latency due to disk persistence',
        ],
        realWorld: [
          'Amazon SQS processes hundreds of billions of messages per day and is the backbone of asynchronous communication across most AWS services internally',
          'RabbitMQ supports complex routing topologies (topic exchanges, headers exchanges, fanout) and is widely used in financial services for trade processing pipelines',
          'Sidekiq (Ruby), Celery (Python), and BullMQ (Node.js) are popular application-level job queues backed by Redis, used for background tasks like email sending, image processing, and report generation',
        ],
      },
      {
        id: 'event-streaming-kafka',
        title: 'Event Streaming & Kafka',
        keyPoints: [
          'Apache Kafka is a distributed, append-only commit log where messages are organized into topics, each partitioned across brokers for parallelism and replicated for durability',
          'Kafka retains messages for a configurable period (hours, days, or forever with compaction), allowing consumers to replay events, reprocess data, and build new derived views from historical data',
          'Consumer groups enable parallel processing: each partition is assigned to exactly one consumer in the group, so adding consumers up to the number of partitions increases throughput linearly',
          'Log compaction retains only the latest value for each key, making Kafka act as a distributed key-value changelog that consumers can use to rebuild materialized views from scratch',
          'Kafka Streams and ksqlDB enable stream processing directly on Kafka data without a separate processing cluster, supporting windowed aggregations, joins, and stateful transformations',
        ],
        tradeoffs: [
          'Kafka provides high throughput (millions of messages/sec per cluster), durability, and replay capability, but is operationally complex (ZooKeeper dependency until KRaft, partition rebalancing, topic configuration tuning)',
          'Kafka ordering is guaranteed only within a partition; if you need global ordering for a topic, you must use a single partition, which limits throughput to a single broker',
          'Kafka is optimized for high throughput with batching; for low-latency, small-message use cases (sub-millisecond), traditional message queues like RabbitMQ or Redis Streams may be more appropriate',
        ],
        realWorld: [
          'LinkedIn created Kafka and processes over 7 trillion messages per day across its clusters, using it as the central nervous system for data pipelines feeding search, recommendations, and analytics',
          'Uber uses Kafka for real-time event processing: trip events, driver location updates, and surge pricing signals flow through Kafka to hundreds of downstream consumers',
          'Confluent Cloud provides managed Kafka with Schema Registry (for Avro/Protobuf schema evolution), Kafka Connect (for database CDC), and ksqlDB (for stream SQL queries)',
        ],
      },
      {
        id: 'pub-sub-pattern',
        title: 'Pub/Sub Pattern',
        keyPoints: [
          'Publish-subscribe decouples message senders (publishers) from receivers (subscribers) through a message broker; publishers send to a topic without knowing who subscribes, enabling one-to-many communication',
          'Fan-out delivers a copy of each message to every subscriber, enabling multiple independent systems to react to the same event (e.g., an OrderPlaced event triggers inventory update, email notification, and analytics)',
          'Topic-based filtering lets subscribers receive only messages matching specific topics or routing keys, while content-based filtering uses message attributes or predicates for finer-grained subscription',
          'At-least-once delivery is the standard guarantee; subscribers must be idempotent because the broker may redeliver a message after a failed acknowledgment or network timeout',
          'Push vs pull delivery: push-based systems (Google Pub/Sub, SNS) deliver messages to subscriber endpoints immediately, while pull-based systems (Kafka, SQS) have consumers poll for new messages',
        ],
        tradeoffs: [
          'Pub/sub provides excellent decoupling and extensibility (add new subscribers without modifying publishers) but makes it harder to trace the flow of a message through the system and debug end-to-end issues',
          'Push delivery provides lower latency but requires subscribers to handle backpressure and may overwhelm slow consumers; pull delivery lets consumers control their processing rate but adds polling latency',
          'Guaranteed ordering in pub/sub typically requires partitioning by a key, which limits parallelism; unordered pub/sub is simpler and more scalable but requires consumers to handle out-of-order messages',
        ],
        realWorld: [
          'Google Cloud Pub/Sub provides global message delivery with at-least-once semantics, automatic scaling, and exactly-once processing via Dataflow integration; used by Spotify for event pipelines',
          'AWS SNS fans out to multiple SQS queues, Lambda functions, and HTTP endpoints, commonly used in the SNS-SQS pattern for reliable fan-out with independent consumer scaling',
          'Redis Pub/Sub is used for real-time notifications in applications like chat systems and live dashboards, but messages are fire-and-forget (no persistence) so it is not suitable for durable messaging',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Distributed Data',
    part: 2,
    concepts: [
      {
        id: 'replication-strategies',
        title: 'Replication Strategies',
        keyPoints: [
          'Single-leader replication sends all writes to one primary node that replicates to followers; reads can be served by any replica, scaling read throughput but not write throughput',
          'Multi-leader replication allows writes at multiple nodes (e.g., one per data center), improving write latency for geographically distributed users but requiring conflict resolution for concurrent writes to the same data',
          'Leaderless replication (Dynamo-style) sends reads and writes to multiple nodes simultaneously; a write succeeds if W of N nodes acknowledge it, and a read succeeds if R of N nodes respond, with W + R > N ensuring consistency',
          'Synchronous replication ensures data is durable on replicas before acknowledging the write, preventing data loss but increasing write latency; asynchronous replication acknowledges writes immediately but risks data loss if the primary fails',
          'Replication lag in async systems means followers may serve stale reads; techniques like read-your-writes consistency and monotonic reads mitigate this',
        ],
        tradeoffs: [
          'Single-leader is simplest and avoids write conflicts but the leader is a write bottleneck and a single point of failure during failover; multi-leader trades simplicity for better write availability and lower latency',
          'Leaderless replication tolerates node failures gracefully and has no single point of failure, but requires careful tuning of R and W quorum values and may return stale data during failures',
          'Synchronous replication guarantees zero data loss (RPO=0) but any slow or failed replica blocks writes; semi-synchronous (one sync replica, rest async) is a practical compromise used by MySQL and PostgreSQL',
        ],
        realWorld: [
          'PostgreSQL uses single-leader streaming replication with synchronous and asynchronous modes; pg_basebackup and logical replication support both physical and logical replication',
          'Amazon DynamoDB and Apache Cassandra use leaderless Dynamo-style replication with configurable read/write consistency levels',
          'CockroachDB uses Raft-based single-leader replication per range but distributes ranges across nodes, achieving both strong consistency and horizontal write scaling',
        ],
      },
      {
        id: 'consistent-hashing',
        title: 'Consistent Hashing',
        keyPoints: [
          'Consistent hashing maps both data keys and nodes to positions on a hash ring; a key is assigned to the first node encountered clockwise from its position on the ring',
          'When a node is added or removed, only the keys that map to the affected segment of the ring need to be redistributed, unlike modular hashing where adding a node reshuffles nearly all keys',
          'Virtual nodes (vnodes) assign multiple positions on the ring to each physical node, improving load distribution and ensuring that when a node fails, its load is spread evenly across remaining nodes',
          'The number of virtual nodes per physical node can be proportional to the node capacity, allowing heterogeneous hardware: a more powerful server gets more vnodes and handles more keys',
          'Consistent hashing is used for distributed caching, database sharding, and content delivery: it determines which node stores a given piece of data with minimal disruption during topology changes',
        ],
        tradeoffs: [
          'Consistent hashing minimizes data movement during scaling (only K/N keys move on average when adding a node) but the ring structure adds complexity compared to simple modular hashing',
          'Without virtual nodes, consistent hashing can produce uneven distribution; with too many virtual nodes, the ring metadata and lookup overhead increase',
          'Consistent hashing does not solve hot key problems; if one key receives disproportionate traffic, it will overload the responsible node regardless of how well the ring is balanced',
        ],
        realWorld: [
          'Amazon Dynamo (the internal system described in the 2007 paper) pioneered consistent hashing with virtual nodes for its distributed key-value store',
          'Apache Cassandra uses consistent hashing with virtual nodes (default 256 vnodes per node) to distribute data across the cluster and minimize data movement during scaling',
          'Memcached clients use consistent hashing (ketama algorithm) to distribute cached items across servers, so adding or removing a cache node invalidates only a fraction of the cache',
        ],
      },
      {
        id: 'distributed-transactions',
        title: 'Distributed Transactions',
        keyPoints: [
          'Two-phase commit (2PC) coordinates atomic commits across multiple nodes: the coordinator sends a prepare request, waits for all participants to vote yes/no, then sends a global commit or abort',
          '2PC has a blocking problem: if the coordinator crashes after the prepare phase, participants that voted "yes" are stuck holding locks until the coordinator recovers, potentially for an extended period',
          'Three-phase commit (3PC) adds a pre-commit phase to reduce the blocking window but does not eliminate it entirely and is rarely used in practice due to complexity and network partition issues',
          'Saga pattern (sequence of local transactions with compensating actions) is the preferred alternative to distributed transactions in microservices, trading atomicity for availability and performance',
          'Calvin and SLOG are deterministic database protocols that order transactions globally before execution, eliminating distributed coordination during execution and enabling low-latency cross-shard transactions',
        ],
        tradeoffs: [
          '2PC provides strong atomicity guarantees but significantly increases latency (two round-trips minimum), holds locks for the entire protocol duration, and the coordinator is a single point of failure',
          'Saga pattern avoids distributed locks and allows each service to commit independently, but provides only eventual consistency and requires careful design of compensating actions for rollback',
          'Avoiding distributed transactions entirely by designing services to own their data fully (single-service transactions only) is often the best approach, restructuring the domain model to avoid cross-service writes',
        ],
        realWorld: [
          'Google Spanner uses 2PC for cross-shard transactions but mitigates latency with TrueTime and Paxos groups, achieving single-digit millisecond cross-region commits',
          'MySQL XA transactions implement 2PC across multiple MySQL instances but are rarely used in practice due to performance overhead and operational complexity',
          'Temporal.io and AWS Step Functions implement saga orchestration as durable workflows, abstracting the complexity of compensating transactions and retry logic',
        ],
      },
    ],
  },

  // ─── Part 3: Infrastructure & Reliability ───────────────────────────
  {
    id: 8,
    title: 'System Reliability',
    part: 3,
    concepts: [
      {
        id: 'fault-tolerance',
        title: 'Fault Tolerance',
        keyPoints: [
          'Fault tolerance is the ability of a system to continue operating (possibly at reduced capacity) when components fail; it requires redundancy at every layer: servers, networks, data centers, and software',
          'Redundancy can be active-active (all replicas serve traffic simultaneously) or active-passive (standby replicas take over only when the primary fails)',
          'Graceful degradation serves a reduced experience instead of failing completely: show cached data when the database is down, disable recommendations when the ML service is unavailable, return default values for failed feature flags',
          'Bulkheads isolate failure domains so that a problem in one component does not cascade: separate thread pools per dependency, separate service instances per customer tier, separate database connections per workload type',
          'Chaos engineering proactively injects failures (kill instances, inject network latency, corrupt data) in production to discover weaknesses before they cause real outages',
        ],
        tradeoffs: [
          'More redundancy improves reliability but increases cost linearly or worse; you need to decide what level of availability (99.9% vs 99.99% vs 99.999%) justifies the additional infrastructure and complexity',
          'Active-active is more resilient and efficient than active-passive but requires stateless services or shared state management, conflict resolution, and careful traffic routing',
          'Graceful degradation requires explicit design and testing of fallback paths; untested fallbacks are themselves a source of failures since the fallback code rarely executes in normal operation',
        ],
        realWorld: [
          'Netflix Chaos Monkey randomly terminates production instances during business hours to ensure services are resilient; Chaos Kong simulates entire AWS region failures',
          'Google targets different availability tiers for different services: internal tools might target 99.9% (8.7 hours downtime/year) while Google Search targets 99.99% (52 minutes/year)',
          'AWS designs for fault isolation using Availability Zones: each AZ is one or more physically separate data centers with independent power, networking, and cooling within the same region',
        ],
      },
      {
        id: 'circuit-breaker-pattern',
        title: 'Circuit Breaker Pattern',
        keyPoints: [
          'A circuit breaker monitors calls to a downstream service and "trips open" when failures exceed a threshold, immediately failing fast on subsequent calls instead of waiting for timeouts',
          'Three states: Closed (normal, requests pass through), Open (circuit tripped, requests fail immediately), Half-Open (a limited number of test requests are allowed through to check if the downstream has recovered)',
          'Without circuit breakers, a failing downstream service causes cascading failures: callers accumulate waiting threads, exhaust connection pools, and eventually fail themselves',
          'Circuit breakers should be configured per downstream dependency with appropriate thresholds: failure rate percentage, minimum number of calls before evaluation, and timeout duration before transitioning to half-open',
          'Combine circuit breakers with retries (with exponential backoff and jitter), timeouts, and fallbacks for a comprehensive resilience strategy',
        ],
        tradeoffs: [
          'Circuit breakers prevent cascading failures and reduce load on struggling services, but misconfigured thresholds can cause the circuit to trip too aggressively (false positives) or not trip fast enough',
          'Failing fast returns errors to users faster than waiting for a timeout, but requires the calling service to have a meaningful fallback (cached data, default response, or a clear error message)',
          'Per-host circuit breakers provide finer granularity than per-service breakers but require more memory and configuration; client-side load balancers like Envoy support this natively',
        ],
        realWorld: [
          'Netflix Hystrix was the pioneering circuit breaker library for the JVM; though now in maintenance mode, its concepts influenced Resilience4j (Java), Polly (.NET), and opossum (Node.js)',
          'Envoy proxy implements circuit breaking at the connection pool level (max connections, max pending requests, max retries), providing infrastructure-level protection without application code changes',
          'AWS App Mesh and Istio service meshes provide circuit breaking configuration declaratively, applying it transparently to all inter-service communication via sidecar proxies',
        ],
      },
      {
        id: 'disaster-recovery',
        title: 'Disaster Recovery',
        keyPoints: [
          'Recovery Point Objective (RPO) defines the maximum acceptable data loss measured in time; lower RPO requires more frequent backups or synchronous replication',
          'Recovery Time Objective (RTO) defines the maximum acceptable downtime; lower RTO requires pre-provisioned standby infrastructure',
          'Backup strategies: full backups (complete copy, slow but simple), incremental (only changes since last backup, fast but complex restore), and continuous replication (real-time copy, lowest RPO/RTO but highest cost)',
          'Multi-region active-passive: the standby region has infrastructure provisioned but receives no traffic until failover; DNS or Route 53 health checks trigger automatic failover when the primary region becomes unhealthy',
          'Multi-region active-active: both regions serve traffic simultaneously, providing the lowest RTO (near-zero) but requiring data replication, conflict resolution, and globally distributed load balancing',
        ],
        tradeoffs: [
          'Lower RPO and RTO require exponentially more investment: going from 99.9% to 99.99% availability typically costs 10x more in infrastructure and operational complexity',
          'Active-passive DR is cheaper but has non-zero RTO (minutes to hours) and the standby may have issues when activated since it rarely handles real traffic; regular DR drills are essential',
          'Active-active DR provides near-zero RTO and better normal-operation performance but is the most complex to implement, especially for stateful services with write conflicts',
        ],
        realWorld: [
          'Netflix runs active-active across three AWS regions and can evacuate an entire region in under 10 minutes using their traffic management system Zuul',
          'GitHub experienced a 24-hour outage in 2018 due to a network partition that caused MySQL replication divergence; they had to carefully reconcile data, highlighting the importance of DR testing',
          'AWS provides pilot light, warm standby, and multi-site active-active DR architectures as reference patterns, each with different cost/RTO/RPO characteristics',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Monitoring & Observability',
    part: 3,
    concepts: [
      {
        id: 'logging-monitoring',
        title: 'Logging & Monitoring',
        keyPoints: [
          'The three pillars of observability are metrics (aggregated numerical measurements over time), logs (discrete timestamped events with context), and traces (request-scoped records spanning multiple services)',
          'Structured logging (JSON with consistent fields like timestamp, service, request_id, level, message) enables machine parsing, filtering, and aggregation; unstructured text logs are nearly useless at scale',
          'Metrics follow the RED method for services (Rate, Errors, Duration) and the USE method for infrastructure (Utilization, Saturation, Errors); these provide a systematic framework for dashboarding',
          'Centralized log aggregation (ELK stack, Loki, CloudWatch Logs) is essential for microservices: you cannot SSH into individual containers to read log files when you have hundreds of instances',
          'Log levels should be meaningful: ERROR for things that need human attention, WARN for unexpected but handled situations, INFO for significant business events, DEBUG for detailed troubleshooting data off by default in production',
        ],
        tradeoffs: [
          'More logging provides better debugging information but increases storage costs, network bandwidth, and can impact application performance; sampling (logging 1% of requests in detail) is a practical compromise',
          'Metrics are cheap to store and query (pre-aggregated numbers) but lose individual request detail; logs preserve full context but are expensive to store, index, and search at high volume',
          'Push-based monitoring (agents send metrics to a central server) is simpler for dynamic environments but can overwhelm the receiver; pull-based monitoring (Prometheus scraping) gives the server control over collection rate',
        ],
        realWorld: [
          'Prometheus + Grafana is the de facto open-source monitoring stack: Prometheus scrapes metrics endpoints, stores them in a time-series database, and Grafana visualizes them in dashboards',
          'Datadog provides unified metrics, logs, and traces in a single platform with ML-based anomaly detection; used by Airbnb, Samsung, and Peloton',
          'ELK Stack (Elasticsearch, Logstash, Kibana) processes terabytes of logs daily at organizations like Netflix, which also open-sourced Atlas for high-volume dimensional time-series metrics',
        ],
      },
      {
        id: 'distributed-tracing',
        title: 'Distributed Tracing',
        keyPoints: [
          'Distributed tracing tracks a single request as it flows through multiple services by propagating a unique trace ID in request headers; each service adds a span (a timed operation) to the trace',
          'A trace is a tree of spans: the root span represents the end-to-end request, and child spans represent each downstream call. Spans record start time, duration, service name, operation, status, and custom tags',
          'Context propagation passes the trace ID and parent span ID via HTTP headers (W3C Trace Context, B3 headers) or gRPC metadata; every service in the chain must propagate the context for the trace to be complete',
          'Head-based sampling decides at the trace root whether to sample (e.g., 1% of requests); tail-based sampling waits until the trace is complete and samples based on outcomes (e.g., keep all traces with errors or high latency)',
          'OpenTelemetry is the CNCF standard for instrumentation, providing vendor-neutral SDKs for metrics, logs, and traces that can export to any backend (Jaeger, Zipkin, Datadog, Honeycomb)',
        ],
        tradeoffs: [
          'Tracing provides invaluable visibility into cross-service latency and dependencies but adds overhead to every request (context propagation, span creation, data export); keep instrumentation lightweight',
          'Head-based sampling is simple and low-overhead but misses interesting traces (errors, slow requests); tail-based sampling catches all interesting traces but requires buffering complete traces before deciding',
          'Vendor-specific tracing (Datadog APM, New Relic) offers richer features and easier setup but creates vendor lock-in; OpenTelemetry provides portability but may require more configuration',
        ],
        realWorld: [
          'Google Dapper (2010 paper) pioneered distributed tracing at scale and inspired Jaeger (Uber), Zipkin (Twitter), and the OpenTelemetry project',
          'Uber built Jaeger for distributed tracing across its 4,000+ microservices and open-sourced it; it is now a CNCF graduated project and one of the most popular tracing backends',
          'Honeycomb provides high-cardinality observability that goes beyond traditional tracing, allowing engineers to query and slice trace data by arbitrary dimensions for exploratory debugging',
        ],
      },
      {
        id: 'alerting-slos',
        title: 'Alerting & SLOs',
        keyPoints: [
          'Service Level Indicators (SLIs) are quantitative measurements of service behavior: request latency p99, error rate, availability percentage, throughput. They must be measured from the user perspective',
          'Service Level Objectives (SLOs) are target values for SLIs: "99.9% of requests complete in under 200ms" or "error rate below 0.1% over a rolling 30-day window." SLOs define what "good enough" means',
          'Error budgets are the inverse of SLOs: a 99.9% availability SLO gives a 0.1% error budget (about 43 minutes/month). When the budget is exhausted, the team should freeze feature work and focus on reliability',
          'Alert on symptoms (high error rate, high latency) not causes (CPU usage, disk space); symptom-based alerts directly correlate with user impact while cause-based alerts often generate noise',
          'Multi-window, multi-burn-rate alerting (Google SRE) alerts quickly for fast burns (10% of monthly budget in 5 minutes) and slower for gradual degradation (50% of budget in 3 days), reducing alert fatigue',
        ],
        tradeoffs: [
          'Tight SLOs (99.99%) catch more issues but generate more alerts and leave less room for maintenance; loose SLOs (99.9%) give more operational freedom but may miss user-impacting degradation',
          'Too many alerts cause alert fatigue (engineers ignore them); too few alerts mean issues go undetected. Every alert should be actionable: if no one needs to do anything, it should not page someone',
          'SLOs should be set based on user expectations and business needs, not on what the system currently achieves; if your system runs at 99.99% but users only need 99.9%, a 99.99% SLO wastes engineering effort',
        ],
        realWorld: [
          'Google SRE book defines the SLI/SLO/SLA framework and error budget policy that has become the industry standard for reliability management',
          'Datadog, PagerDuty, and OpsGenie integrate SLO tracking with alerting and incident management, automatically calculating burn rates and triggering pages when error budgets are at risk',
          'Slack publishes its SLA commitments (99.99% uptime for Enterprise Grid) and uses error budgets internally to balance feature velocity with reliability work',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Security & API Design',
    part: 3,
    concepts: [
      {
        id: 'authentication-authorization',
        title: 'Authentication & Authorization',
        keyPoints: [
          'Authentication verifies identity (who are you?); authorization determines permissions (what can you do?). They are separate concerns and should be implemented independently',
          'OAuth 2.0 is an authorization framework where a user grants a third-party application limited access to their resources via an authorization server; the application receives an access token without ever seeing the user password',
          'JWT (JSON Web Token) is a self-contained signed token carrying claims (user ID, roles, expiration); the server can validate it without a database lookup, but tokens cannot be revoked before expiration without a blocklist',
          'API keys identify the calling application (not the user) and are used for server-to-server communication; they should be treated as secrets, rotated regularly, and scoped to minimum required permissions',
          'Role-Based Access Control (RBAC) assigns permissions to roles (admin, editor, viewer) and users are assigned roles; Attribute-Based Access Control (ABAC) makes decisions based on attributes for finer-grained control',
        ],
        tradeoffs: [
          'JWTs are stateless and scalable (no session store needed) but cannot be revoked instantly; session tokens stored server-side can be revoked immediately but require a shared session store',
          'OAuth 2.0 provides excellent delegation and third-party access but adds complexity (multiple grant types, token refresh flows); simpler apps may only need API keys or session cookies',
          'Centralized authorization (a dedicated auth service) provides consistent enforcement but is a latency bottleneck; distributed enforcement (each service checks JWT claims locally) is faster but harder to keep consistent',
        ],
        realWorld: [
          'Auth0, Okta, and AWS Cognito provide managed authentication and authorization as a service, handling OAuth 2.0 flows, social login, MFA, and user management',
          'Google uses BeyondCorp zero-trust architecture: every request is authenticated and authorized regardless of network location, eliminating the concept of a trusted internal network',
          'Stripe uses API keys with restricted permissions and automatic key rotation, along with webhook signatures (HMAC) to verify event authenticity',
        ],
      },
      {
        id: 'rate-limiting-throttling',
        title: 'Rate Limiting & Throttling',
        keyPoints: [
          'Rate limiting controls the number of requests a client can make in a time window, protecting services from abuse, DoS attacks, and noisy neighbors that would otherwise consume shared resources',
          'Token bucket algorithm: a bucket holds tokens replenished at a fixed rate; each request consumes a token, and requests are rejected when the bucket is empty. Allows short bursts up to the bucket capacity',
          'Sliding window algorithm tracks requests in a rolling time window (e.g., last 60 seconds) for smoother rate enforcement without the boundary problems of fixed windows',
          'Distributed rate limiting requires a shared counter (Redis with INCR and EXPIRE, or a dedicated service) to enforce limits consistently across multiple service instances',
          'Rate limit responses should include headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After) so clients can implement intelligent backoff',
        ],
        tradeoffs: [
          'Aggressive rate limiting protects the service but may reject legitimate traffic during bursts; generous limits may not prevent abuse. Tiered limits (different rates for different API key tiers) balance both',
          'Per-user rate limiting is fairest but requires identifying the user (hard for unauthenticated endpoints); per-IP limiting is simpler but penalizes users behind shared IPs (NAT, corporate proxies)',
          'Local (per-instance) rate limiting is fast but inaccurate when traffic is spread across many instances; global (centralized) rate limiting is accurate but adds a network hop and dependency',
        ],
        realWorld: [
          'Stripe rate limits API requests at 100/sec per API key in live mode and returns 429 with Retry-After header; they also use adaptive rate limiting that tightens during system stress',
          'Cloudflare provides edge-level rate limiting that can block abusive traffic before it reaches the origin server, using sliding window counters distributed across their edge network',
          'GitHub API enforces 5,000 requests per hour for authenticated users and 60 per hour for unauthenticated requests, with rate limit information in response headers',
        ],
      },
      {
        id: 'api-gateway-pattern',
        title: 'API Gateway Pattern',
        keyPoints: [
          'An API gateway is a single entry point for all client requests, routing them to appropriate backend services while handling cross-cutting concerns like authentication, rate limiting, logging, and TLS termination',
          'Request aggregation (Backend for Frontend / BFF pattern): the gateway combines responses from multiple microservices into a single response, reducing the number of round-trips for mobile and web clients',
          'The gateway can perform protocol translation: accepting REST from external clients and converting to gRPC for internal services, or aggregating multiple REST calls into a single GraphQL endpoint',
          'Canary releases and A/B testing can be implemented at the gateway level by routing a percentage of traffic to a new service version based on headers, cookies, or user attributes',
          'Gateway-level caching of responses for frequently accessed, slowly-changing endpoints can dramatically reduce load on backend services without any backend code changes',
        ],
        tradeoffs: [
          'A single API gateway simplifies client-side code and centralizes cross-cutting concerns, but becomes a potential single point of failure and performance bottleneck; it must be deployed with high availability',
          'The gateway team can become an organizational bottleneck if every backend team needs gateway configuration changes; self-service gateway configuration (declarative routing rules per team) mitigates this',
          'Putting too much logic in the gateway (business rules, complex transformations) creates a "smart pipe" that is hard to test and deploy independently; the gateway should be a thin routing and policy enforcement layer',
        ],
        realWorld: [
          'Kong is an open-source API gateway built on Nginx/OpenResty with a plugin ecosystem for authentication, rate limiting, logging, and transformations; used by NASA, Nasdaq, and Honeywell',
          'AWS API Gateway provides managed REST and WebSocket APIs with Lambda integration, authorization, throttling, and API key management, commonly used for serverless architectures',
          'Netflix Zuul handles billions of requests daily as the edge gateway, performing dynamic routing, load shedding, and authentication before requests reach internal microservices',
        ],
      },
    ],
  },

  // ─── Part 4: Real-World Design ──────────────────────────────────────
  {
    id: 11,
    title: 'URL Shortener & Key-Value Store',
    part: 4,
    concepts: [
      {
        id: 'url-shortener-design',
        title: 'URL Shortener Design',
        keyPoints: [
          'Core flow: client submits a long URL, the service generates a unique short code (e.g., 7-character base62), stores the mapping in a database, and returns the short URL. On access, a 301/302 redirect sends the user to the original URL',
          'Base62 encoding (a-z, A-Z, 0-9) of a 7-character code gives 62^7 = 3.5 trillion unique URLs, more than sufficient for most scale requirements',
          'ID generation approaches: auto-increment ID converted to base62 (simple but predictable), hash of the URL truncated to 7 characters (may collide), or pre-generated unique ID from a distributed ID service (Snowflake)',
          '301 (permanent redirect) is more cache-friendly but prevents click analytics since browsers cache the redirect; 302 (temporary redirect) ensures every click hits your service, enabling click tracking',
          'Read-heavy workload (100:1 read:write ratio typically): use caching aggressively (Redis/Memcached for hot URLs) with a simple key-value store (DynamoDB, Cassandra) as the persistent layer',
          'Custom short codes, expiration dates, and link analytics (clicks, referrers, geolocation) are common features that add complexity to the basic design',
        ],
        tradeoffs: [
          'Hash-based generation is stateless (same URL always gets the same short code) which enables deduplication, but requires collision detection; counter-based generation never collides but requires coordination in distributed systems',
          'Using 301 redirects improves user latency and reduces server load but you lose visibility into click-through data; 302 gives you analytics but every redirect adds server round-trip latency',
          'A global URL shortener needs multi-region deployment for low redirect latency, which complicates data replication; eventual consistency is acceptable since a few milliseconds of delay in availability is fine',
        ],
        realWorld: [
          'Bitly processes billions of link clicks monthly across a distributed architecture, using a combination of in-memory caching and persistent storage with real-time analytics pipelines',
          'TinyURL has been running since 2002 with a simple architecture that has scaled to handle billions of URLs, demonstrating that a well-designed simple system can last decades',
          'Twitter uses t.co as a mandatory URL shortener for all links in tweets, enabling link wrapping for analytics, malware detection, and consistent URL length for character counting',
        ],
      },
      {
        id: 'key-value-store-design',
        title: 'Key-Value Store Design',
        keyPoints: [
          'A distributed key-value store maps keys to values across multiple nodes using consistent hashing for data placement, replication for durability, and quorum reads/writes for tunable consistency',
          'Write path: the coordinator determines responsible replicas via consistent hashing, writes to a write-ahead log (WAL) for durability, updates an in-memory table (memtable), and periodically flushes to sorted on-disk files (SSTables)',
          'Read path: check memtable first (fastest), then Bloom filters to skip SSTables that definitely do not contain the key, then search SSTables from newest to oldest; compaction merges SSTables to reduce read amplification',
          'Conflict resolution for concurrent writes: last-writer-wins (simplest, may lose data), vector clocks (detect conflicts, application resolves), CRDTs (conflict-free data types that merge automatically)',
          'Failure detection uses gossip protocol: each node periodically shares its view of cluster membership with random peers, eventually propagating node health information to all nodes in O(log N) rounds',
        ],
        tradeoffs: [
          'LSM-tree storage optimizes for write throughput but read performance degrades as SSTables accumulate; B-tree storage has better read performance but lower write throughput due to random I/O',
          'Higher replication factor improves read throughput and fault tolerance but increases storage costs and write latency; 3 replicas is the standard balance for most workloads',
          'Strong consistency (quorum reads + writes) ensures linearizability but reduces availability during partitions; eventual consistency allows all replicas to accept reads and writes but may serve stale data',
        ],
        realWorld: [
          'Amazon DynamoDB is a managed key-value store based on the Dynamo paper principles: consistent hashing, quorum-based replication, and configurable consistency levels',
          'Apache Cassandra combines the Dynamo partition model with the Bigtable data model (column families), offering tunable consistency and linear horizontal scalability',
          'Redis is an in-memory key-value store supporting rich data structures (strings, hashes, lists, sets, sorted sets, streams) with optional persistence (RDB snapshots, AOF logging)',
        ],
      },
      {
        id: 'id-generation',
        title: 'Distributed ID Generation',
        keyPoints: [
          'Auto-increment IDs from a single database are simple but create a single point of failure and a write bottleneck; they also leak information about total record count and creation rate',
          'UUID v4 (128-bit random) requires no coordination and has negligible collision probability, but is not sortable by time, uses 36 characters in string form, and fragments B-tree indexes due to random ordering',
          'Snowflake IDs (Twitter, 2010) pack a 41-bit timestamp, 10-bit machine ID, and 12-bit sequence number into a 64-bit integer, producing time-sortable, unique IDs at up to 4,096 IDs per millisecond per machine',
          'ULID combines a 48-bit timestamp with 80 bits of randomness in a base32-encoded 26-character string, providing time-sortability with UUID-like uniqueness',
          'Database-specific sequences with pre-allocated ranges: each service instance requests a block of IDs from a central allocator, then generates IDs locally from that range until exhausted, minimizing coordination',
        ],
        tradeoffs: [
          'Snowflake-style IDs are compact (64-bit integer) and time-sortable but require unique machine ID assignment and clock synchronization; clock skew can cause duplicate or out-of-order IDs',
          'UUIDs require zero coordination and work everywhere but waste space (128 bits vs 64 bits), fragment indexes, and are not human-readable or time-sortable (except UUIDv7 which adds timestamp ordering)',
          'Centralized ID services are operationally simple to understand but are a dependency that must be highly available; pre-allocated ranges reduce this dependency',
        ],
        realWorld: [
          'Twitter Snowflake generates time-sortable 64-bit IDs for tweets, with the timestamp component enabling efficient range queries on creation time without a separate index',
          'Instagram uses a Snowflake-inspired scheme: 41 bits for time, 13 bits for logical shard ID, 10 bits for auto-increment sequence, all packed into a 64-bit ID stored in sharded PostgreSQL',
          'Discord uses Snowflake IDs for messages, channels, users, and every other entity; the time component allows efficient message pagination by ID range instead of database offset queries',
          'MongoDB ObjectID is a 12-byte ID containing a 4-byte timestamp, 5-byte random value, and 3-byte counter, providing roughly-time-ordered uniqueness without coordination',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Social Media & Messaging',
    part: 4,
    concepts: [
      {
        id: 'news-feed-design',
        title: 'News Feed Design',
        keyPoints: [
          'Fan-out-on-write (push model): when a user posts, the system immediately writes the post to the feed cache of every follower; reading a feed is a simple cache lookup, making reads O(1) but writes proportional to follower count',
          'Fan-out-on-read (pull model): the feed is constructed at read time by fetching recent posts from all users the reader follows and merging them; writes are O(1) but reads require fetching from many sources and sorting',
          'Hybrid approach: use fan-out-on-write for normal users (fast reads) and fan-out-on-read for celebrities with millions of followers (to avoid writing to millions of feed caches on every post)',
          'Feed ranking uses a combination of recency, engagement signals (likes, comments, shares), user affinity (how often you interact with the poster), and content type scoring, typically computed by an ML model',
          'Feed pagination uses cursor-based pagination (the client sends the ID of the last seen item) rather than offset-based, since new posts continuously shift offsets and would cause duplicate or missed items',
        ],
        tradeoffs: [
          'Fan-out-on-write makes reads fast but writes are expensive for popular users and the feed cache requires significant memory; fan-out-on-read makes writes cheap but reads are slow and require real-time merging',
          'Ranked feeds increase engagement but require an ML inference pipeline that adds latency; chronological feeds are simpler and more predictable but may show less relevant content',
          'Pre-computed feeds in cache are fast but may serve slightly stale content; real-time feeds are always fresh but have higher latency and compute cost',
        ],
        realWorld: [
          'Twitter uses a hybrid fan-out approach: tweets from users with fewer followers are fanned out on write to Redis timelines, while tweets from celebrities are merged at read time',
          'Facebook News Feed uses a complex ML ranking system that scores thousands of candidate posts per feed request, considering hundreds of signals including predicted engagement and content quality',
          'Instagram transitioned from chronological to ranked feeds in 2016, using machine learning to predict which posts a user would most want to see based on relationship, interest, and recency',
        ],
      },
      {
        id: 'chat-system-design',
        title: 'Chat System Design',
        keyPoints: [
          'Real-time messaging requires persistent connections (WebSockets) between clients and chat servers for instant delivery; the chat server maintains a mapping of connected users to their WebSocket connections',
          'Message flow: sender client sends via WebSocket to chat server, chat server persists the message to a message store, then pushes to the recipient if online (via WebSocket) or queues for later delivery with a push notification',
          'Message ordering in group chats uses a per-conversation sequence number assigned by the message store; total ordering across all conversations is unnecessary and would be a scalability bottleneck',
          'Presence system (online/offline/typing indicators) uses heartbeats from connected clients; the presence service maintains a distributed in-memory store of user states and publishes changes to subscribed clients',
          'Message storage is typically write-heavy and append-only: recent messages are served from cache (Redis), while historical messages are stored in a time-series-optimized database partitioned by conversation ID and time',
        ],
        tradeoffs: [
          'Storing messages permanently enables search and history but increases storage costs significantly; message retention policies (auto-delete after N days) balance user experience with cost',
          'End-to-end encryption (E2EE) protects user privacy but prevents server-side features like search, spam detection, and link previews since the server cannot read message content',
          'In-order delivery is simple for 1:1 chats but complex for group chats with many concurrent senders; eventual consistency with client-side reordering by sequence number is the pragmatic approach',
        ],
        realWorld: [
          'WhatsApp handles 100+ billion messages daily using Erlang/BEAM for its chat servers (high concurrency, fault tolerance) with a custom protocol over WebSockets and Mnesia for user state',
          'Discord uses Cassandra for message storage partitioned by channel ID and time bucket, with a migration to ScyllaDB (C++ Cassandra rewrite) for better tail latency on hot partitions',
          'Slack stores messages in MySQL (sharded by workspace) with a Solr-based search index and uses WebSockets with a Redis pub/sub backplane for real-time message delivery across instances',
        ],
      },
      {
        id: 'notification-system',
        title: 'Notification System',
        keyPoints: [
          'A notification system handles multiple channels: push notifications (APNs for iOS, FCM for Android), SMS (Twilio, AWS SNS), email (SendGrid, SES), and in-app notifications (WebSocket or polling)',
          'Architecture: event producers emit notification events to a message queue, a notification service reads events and determines recipients and channels based on user preferences, then dispatches to channel-specific workers',
          'User preference management: each user controls which notification types they receive on which channels. Store preferences in a fast key-value store for low-latency lookups',
          'Deduplication prevents sending the same notification multiple times: use an idempotency key (event type + entity ID + recipient) stored in a cache with a TTL to detect and drop duplicate events',
          'Rate limiting per user per channel prevents notification fatigue: cap push notifications to N per hour, batch low-priority notifications into digests, and implement quiet hours for non-critical notifications',
        ],
        tradeoffs: [
          'Immediate delivery ensures timely notifications but can overwhelm users during high-activity periods; batching and digesting reduce noise but delay potentially important information',
          'Push notifications have the highest engagement rate but are platform-dependent (APNs/FCM), can be disabled by users, and have payload size limits (4KB); email has universal reach but lower open rates',
          'Building a notification system in-house gives full control but is significant engineering effort; managed services (OneSignal, Braze) trade cost for speed of implementation',
        ],
        realWorld: [
          'Airbnb built a centralized notification infrastructure that handles 1M+ notifications per minute across push, email, SMS, and in-app channels with per-user preference management and intelligent batching',
          'LinkedIn uses a notification system with smart deduplication and relevance scoring: similar notifications (5 people viewed your profile) are aggregated into a single notification',
          'Uber sends time-critical push notifications for ride updates with strict latency requirements (sub-second delivery); they use a priority queue system where ride-related notifications bypass the normal queue',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Search & Recommendations',
    part: 4,
    concepts: [
      {
        id: 'search-engine-design',
        title: 'Search Engine Design',
        keyPoints: [
          'An inverted index maps each term to a sorted list of document IDs containing that term (posting list); searching for "distributed systems" intersects the posting lists for both terms to find matching documents',
          'Indexing pipeline: crawl/ingest documents, tokenize text (split into terms), apply analyzers (lowercase, stemming, stop word removal, synonym expansion), then build the inverted index with term frequencies and positions',
          'Ranking combines relevance scoring (TF-IDF or BM25 based on term frequency and document frequency) with quality signals (PageRank, freshness, click-through rate, domain authority) to order results',
          'Query processing includes query parsing, spell correction, query expansion (adding synonyms), and query understanding (intent classification); for "apple store near me" the system must understand this is a local business search',
          'Sharding the index by document (each shard holds a subset of documents) enables parallel search: a query is broadcast to all shards, each returns its top-K results, and a merge step combines them into the final ranked list',
        ],
        tradeoffs: [
          'Larger indexes improve recall (finding all relevant results) but increase storage costs and search latency; index pruning and tiered indexes (hot data in memory, cold data on disk) balance coverage and performance',
          'Real-time indexing (documents searchable within seconds) requires more complex index management compared to batch indexing (simpler but higher latency from write to searchability)',
          'More sophisticated ranking (ML-based learning-to-rank models) improves result quality but adds inference latency; a two-phase approach retrieves candidates with cheap scoring then re-ranks the top-K with an expensive model',
        ],
        realWorld: [
          'Elasticsearch is built on Apache Lucene and provides distributed search with automatic sharding, replication, and near-real-time indexing; used by Wikipedia, GitHub, and Stack Overflow for search',
          'Google uses a multi-tier index architecture: a smaller index of the most important pages is searched first for speed, and the full index is consulted only when the first tier does not return enough results',
          'Algolia provides search-as-a-service with single-digit millisecond response times by using an in-memory, globally distributed index with tie-breaking rules optimized for relevance and speed',
        ],
      },
      {
        id: 'recommendation-system',
        title: 'Recommendation System',
        keyPoints: [
          'Collaborative filtering finds patterns in user behavior: user-based CF recommends items liked by similar users, item-based CF recommends items similar to ones the user liked. Matrix factorization (SVD, ALS) scales both approaches',
          'Content-based filtering recommends items with features similar to what the user has engaged with before; it uses item metadata (genre, tags, text embeddings) and does not suffer from the cold-start problem for users with known preferences',
          'Hybrid approaches combine collaborative and content-based methods to leverage both behavioral patterns and item features; most production systems use hybrid models with multiple signal sources',
          'The recommendation pipeline has two phases: candidate generation (retrieve hundreds of candidates from millions using fast approximate methods like ANN) and ranking (score candidates with a detailed ML model)',
          'Cold-start problem: new users have no interaction history (mitigate with popularity-based recommendations, onboarding surveys, or content-based features); new items have no engagement data (mitigate with content features and exploration)',
        ],
        tradeoffs: [
          'Personalized recommendations increase engagement and revenue but create filter bubbles where users only see content similar to what they have already consumed; diversity injection and exploration mechanisms counteract this',
          'Real-time recommendations (based on current session) are more relevant but require low-latency inference; batch-computed recommendations (precomputed daily) are cheaper but may be stale',
          'More user data improves recommendation quality but raises privacy concerns and regulatory requirements (GDPR, CCPA); on-device ML and federated learning provide personalization while keeping data on the user device',
        ],
        realWorld: [
          'Netflix uses a multi-algorithm recommendation system: rows on the homepage are generated by different algorithms (trending, because you watched X, top picks), combining collaborative filtering, content analysis, and contextual signals',
          'YouTube uses a deep neural network recommendation system in two stages: candidate generation (retrieve hundreds from millions) and ranking (score candidates with a detailed model considering watch time prediction)',
          'Spotify Discover Weekly uses collaborative filtering combined with natural language processing of music reviews and audio features extracted from the raw audio signal',
          'Amazon attributes 35% of its revenue to its recommendation engine, which uses item-to-item collaborative filtering computed in batch and served from a precomputed index',
        ],
      },
      {
        id: 'content-delivery-design',
        title: 'Content Delivery System Design',
        keyPoints: [
          'A content delivery system must handle ingestion (upload and processing), storage (durable and tiered), transformation (encoding, resizing, format conversion), and delivery (low-latency serving worldwide)',
          'Video processing pipeline: uploaded video is transcoded into multiple resolutions (360p, 720p, 1080p, 4K) and codecs (H.264, VP9, AV1), split into small segments (2-10 seconds), and served via adaptive bitrate streaming (HLS/DASH)',
          'Adaptive bitrate streaming lets the client dynamically switch between quality levels based on network conditions: the manifest file lists available segments at each quality level, and the player requests appropriate quality per segment',
          'Storage tiering: hot content (recently uploaded, trending) on SSD-backed storage or CDN edge caches, warm content on standard object storage (S3), cold content (rarely accessed archives) on glacier/archival storage',
          'Image optimization: serve images in modern formats (WebP, AVIF) with responsive sizes (srcset), lazy loading for below-the-fold images, and on-the-fly transformation (Cloudinary, imgix) to generate optimized variants from a single source',
        ],
        tradeoffs: [
          'Pre-transcoding all quality levels at upload time ensures instant playback but is expensive in compute and storage; just-in-time transcoding saves storage but adds initial playback latency',
          'Storing content at the edge reduces latency for popular content but edge storage is expensive; a tiered caching strategy (edge -> regional cache -> origin) balances latency and cost',
          'Higher video quality improves user experience but increases bandwidth costs and storage; adaptive bitrate streaming automatically adjusts quality to network conditions, optimizing the balance per user',
        ],
        realWorld: [
          'YouTube ingests 500+ hours of video per minute, transcodes each into dozens of format/resolution combinations, and serves them from Google global edge network',
          'Netflix uses its Open Connect CDN with dedicated hardware appliances placed inside ISP networks, caching popular content locally to reduce transit costs and serve 15% of global internet bandwidth',
          'Cloudinary provides image and video management as a service with on-the-fly transformations via URL parameters, used by Hinge, Rivian, and Bombas',
          'TikTok uses a sophisticated CDN strategy with aggressive pre-fetching (loading the next video while the current one plays) and adaptive quality for smooth scrolling on variable mobile networks',
        ],
      },
    ],
  },
];

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
