export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Topic 1: Scalability & Performance
  {
    id: 'sd1-q1',
    chapterId: 1,
    question: 'Why does vertical scaling have a hard ceiling that horizontal scaling does not?',
    options: [
      'Vertical scaling requires more network bandwidth than horizontal scaling',
      'There is a physical limit to how much CPU/RAM a single machine can have, and costs grow superlinearly — horizontal scaling adds commodity machines linearly',
      'Vertical scaling cannot use SSDs, only spinning disks',
      'Horizontal scaling is always cheaper per unit of compute',
    ],
    answer: 1,
    explanation: 'Vertical scaling hits hardware limits — the largest single server has finite CPU cores and RAM slots, and high-end hardware costs grow exponentially. Horizontal scaling adds commodity servers with near-linear cost growth and no theoretical upper bound, though it introduces distributed systems complexity.',
  },
  {
    id: 'sd1-q2',
    chapterId: 1,
    question: 'What does Amdahl\'s Law tell us about the limits of parallelization for system performance?',
    options: [
      'Adding more servers always produces linear speedup',
      'The serial (non-parallelizable) portion of a workload becomes the bottleneck — if 10% of work is serial, maximum speedup is 10x regardless of how many cores or machines you add',
      'Parallel systems are always faster than single-threaded systems',
      'Distributed systems cannot achieve more than 2x speedup over a single machine',
    ],
    answer: 1,
    explanation: 'Amdahl\'s Law states that the maximum speedup is limited by the fraction of work that must be done sequentially. If 5% of your workload is inherently serial, you can never exceed 20x speedup no matter how many processors you add. This is why identifying and minimizing serial bottlenecks is critical in system design.',
  },
  {
    id: 'sd1-q3',
    chapterId: 1,
    question: 'Why is tail latency (p99/p999) more important than average latency for user-facing services?',
    options: [
      'Tail latency is easier to measure than average latency',
      'Average latency already accounts for the worst cases',
      'In fan-out architectures, the slowest backend call determines the user\'s experience — and a p99 latency becomes the median experience when a single request touches 100+ services',
      'Tail latency only affects batch processing workloads',
    ],
    answer: 2,
    explanation: 'When a single user request fans out to many backend services, the overall response time is gated by the slowest call. If each service has a 1% chance of being slow, a request touching 100 services has a ~63% chance of hitting at least one slow call. This is why p99 latency directly impacts real user experience at scale.',
  },

  // Topic 2: Networking & Protocols
  {
    id: 'sd2-q1',
    chapterId: 2,
    question: 'Why does TCP\'s three-way handshake make it unsuitable for latency-sensitive applications like real-time gaming or live video?',
    options: [
      'TCP encrypts data, which adds overhead',
      'The handshake requires 1.5 round trips before any data is sent — at 100ms cross-region RTT, that is 150ms of dead time per new connection. UDP skips this entirely, trading reliability for immediacy',
      'TCP cannot transmit packets larger than 64 bytes',
      'TCP requires dedicated hardware that UDP does not need',
    ],
    answer: 1,
    explanation: 'TCP\'s SYN, SYN-ACK, ACK handshake ensures reliable, ordered delivery but costs 1.5 RTTs before data flows. For real-time applications where a dropped frame is preferable to a delayed one, UDP eliminates this overhead. Protocols like QUIC build reliability on top of UDP to get the best of both worlds.',
  },
  {
    id: 'sd2-q2',
    chapterId: 2,
    question: 'When would you choose gRPC over REST for service-to-service communication?',
    options: [
      'When you need browser clients to directly call the API without any proxy',
      'When you need human-readable request and response bodies for debugging',
      'When you need high-throughput, low-latency communication with strong typing — gRPC uses HTTP/2 multiplexing and Protocol Buffers binary serialization, which is 5-10x faster to serialize than JSON',
      'When your services are written in different programming languages that cannot share schema definitions',
    ],
    answer: 2,
    explanation: 'gRPC uses HTTP/2 for multiplexed streams over a single connection and Protocol Buffers for compact binary serialization with code-generated clients. This makes it significantly faster than REST+JSON for internal service communication. The tradeoff is reduced debuggability (binary payloads) and less native browser support.',
  },
  {
    id: 'sd2-q3',
    chapterId: 2,
    question: 'What problem does DNS resolution introduce in high-availability systems, and how is it typically mitigated?',
    options: [
      'DNS is always perfectly reliable and introduces no issues',
      'DNS TTL caching means clients may continue routing to a failed server for minutes after failover — mitigations include low TTLs (30-60s), client-side health checks, and service meshes that bypass DNS for internal routing',
      'DNS cannot resolve more than one IP address per domain name',
      'DNS adds encryption overhead that slows down every request',
    ],
    answer: 1,
    explanation: 'When a server fails and DNS is updated to point to a healthy replacement, clients with cached DNS entries continue connecting to the dead server until the TTL expires. Low TTLs reduce this window but increase DNS query volume. Modern architectures use service discovery (Consul, Kubernetes DNS) or service meshes (Istio) with health-check-aware routing that reacts in seconds rather than minutes.',
  },

  // Topic 3: Data Storage Fundamentals
  {
    id: 'sd3-q1',
    chapterId: 3,
    question: 'Why do LSM-tree based databases (like Cassandra, RocksDB) offer better write throughput than B-tree based databases (like PostgreSQL)?',
    options: [
      'LSM-trees use less disk space than B-trees',
      'LSM-trees convert random writes into sequential writes by buffering in memory and flushing sorted runs to disk — sequential I/O is orders of magnitude faster than random I/O on both SSDs and HDDs',
      'LSM-trees do not need to maintain any indexes',
      'B-trees cannot handle concurrent writes',
    ],
    answer: 1,
    explanation: 'B-trees must update pages in-place on disk, requiring random I/O for each write. LSM-trees buffer writes in an in-memory memtable, then flush sorted data sequentially to disk as SSTables. This trades read amplification and space amplification for dramatically better write throughput.',
  },
  {
    id: 'sd3-q2',
    chapterId: 3,
    question: 'When should you choose a document database (like MongoDB) over a relational database?',
    options: [
      'When you need complex multi-table joins and ACID transactions across many entities',
      'When your data has a hierarchical, self-contained structure that maps naturally to documents and you rarely need cross-document joins — the data locality benefit means one read fetches everything',
      'When you need strict schema enforcement from day one',
      'When referential integrity between entities is your primary concern',
    ],
    answer: 1,
    explanation: 'Document databases excel when data is naturally self-contained (e.g., a user profile with embedded addresses, preferences, and recent orders). Reading one document retrieves all related data in a single disk seek. If your data has many-to-many relationships or needs cross-entity transactions, a relational database is better suited.',
  },
  {
    id: 'sd3-q3',
    chapterId: 3,
    question: 'What is write amplification in databases, and why does it matter for SSD-based storage engines?',
    options: [
      'It means writes are duplicated across replicas, affecting all distributed databases equally',
      'The database writes significantly more data to disk than the original write — this is critical for SSDs because they have limited write endurance (program/erase cycles), so high write amplification directly shortens drive lifespan',
      'It means the application sends redundant write requests to the database',
      'Write amplification only affects in-memory databases when flushing to disk',
    ],
    answer: 1,
    explanation: 'Write amplification is the ratio of actual bytes written to disk versus logical bytes written by the application. In LSM-trees, compaction rewrites data multiple times across levels. In B-trees, updating a single byte requires rewriting an entire page. SSDs have finite write endurance, so high write amplification directly reduces drive lifespan and is a key metric for storage engine selection.',
  },

  // Topic 4: CAP Theorem & Consistency
  {
    id: 'sd4-q1',
    chapterId: 4,
    question: 'What is the fundamental tradeoff that the CAP theorem forces during a network partition?',
    options: [
      'You must choose between speed and storage capacity',
      'You must choose between consistency (all nodes see the same data) and availability (every request gets a response) — you cannot guarantee both when nodes cannot communicate',
      'You must choose between encryption and performance',
      'You must choose between horizontal and vertical scaling',
    ],
    answer: 1,
    explanation: 'During a network partition, a system must either reject requests to nodes that cannot confirm they have the latest data (choosing Consistency, sacrificing Availability), or serve requests from all reachable nodes even if some may have stale data (choosing Availability, sacrificing Consistency). The PACELC theorem extends this: even without partitions, there is a latency-consistency tradeoff.',
  },
  {
    id: 'sd4-q2',
    chapterId: 4,
    question: 'Why is linearizability (strong consistency) expensive in distributed systems, and when is it worth the cost?',
    options: [
      'Linearizability is free to implement — databases just choose not to offer it',
      'Linearizability requires coordination between nodes on every read and write, adding latency proportional to network round-trip time — it is worth it for operations like leader election, distributed locks, and financial transactions where stale reads cause correctness bugs',
      'Linearizability only works with a single database node',
      'Linearizability slows down writes but has no effect on reads',
    ],
    answer: 1,
    explanation: 'Linearizability guarantees that once a write completes, all subsequent reads see it. This requires nodes to coordinate (via consensus protocols or quorum reads), adding at least one network round-trip to every operation. For most read-heavy workloads, eventual consistency is sufficient. Linearizability is essential when correctness depends on reading the latest value, such as compare-and-swap operations or unique constraint enforcement.',
  },
  {
    id: 'sd4-q3',
    chapterId: 4,
    question: 'What does "read-your-writes" consistency guarantee, and why is it important for user-facing applications?',
    options: [
      'It guarantees that all users see the most recent write globally',
      'It guarantees that after a user writes data, that same user will always see their own write in subsequent reads — without this, a user might update their profile and then see the old version, which feels like data loss',
      'It guarantees that writes are durable to disk before acknowledging',
      'It guarantees that reads never return stale data from any user',
    ],
    answer: 1,
    explanation: 'Read-your-writes (also called "read-after-write" consistency) is weaker than linearizability but stronger than eventual consistency. It is per-session: user A always sees their own updates, but might not immediately see user B\'s updates. This is implemented by routing reads to the replica that processed the user\'s last write, or by tracking write timestamps and waiting for replicas to catch up.',
  },

  // Topic 5: Distributed Computing Patterns
  {
    id: 'sd5-q1',
    chapterId: 5,
    question: 'Why is Raft generally preferred over Paxos for implementing consensus in practice?',
    options: [
      'Raft is faster than Paxos in all scenarios',
      'Raft decomposes consensus into understandable sub-problems (leader election, log replication, safety) with a strong leader model — Paxos is notoriously difficult to understand and implement correctly',
      'Paxos cannot handle node failures',
      'Raft uses less network bandwidth than Paxos',
    ],
    answer: 1,
    explanation: 'Paxos is proven correct but its specification is abstract and hard to translate into a working implementation. Raft was designed for understandability, with clearly separated mechanisms for leader election, log replication, and membership changes. This makes it easier to implement, debug, and reason about correctness, which is why etcd, CockroachDB, and TiKV all use Raft.',
  },
  {
    id: 'sd5-q2',
    chapterId: 5,
    question: 'What is the primary reason that distributed transactions (2PC) are avoided in microservices architectures?',
    options: [
      'Distributed transactions are impossible to implement',
      'Two-phase commit requires all participants to be available and hold locks until the transaction completes — this creates tight coupling, reduces availability, and a single slow participant blocks everyone',
      'Distributed transactions use too much network bandwidth',
      'Microservices cannot connect to databases',
    ],
    answer: 1,
    explanation: 'Two-phase commit (2PC) is a blocking protocol: if the coordinator crashes after the prepare phase, all participants must hold locks and wait. This creates tight coupling between services, degrades performance, and reduces availability. The Saga pattern is the preferred alternative, using a sequence of local transactions with compensating actions for rollback.',
  },
  {
    id: 'sd5-q3',
    chapterId: 5,
    question: 'What problem do vector clocks solve that simple Lamport timestamps cannot?',
    options: [
      'Vector clocks are faster to compute than Lamport timestamps',
      'Lamport timestamps establish a total order of events but cannot distinguish between causally related and concurrent events — vector clocks capture causality, letting you determine if two events are causally ordered or truly concurrent and need conflict resolution',
      'Vector clocks work without network communication',
      'Lamport timestamps require synchronized physical clocks',
    ],
    answer: 1,
    explanation: 'Lamport timestamps assign a single counter to each event. If event A has timestamp 5 and event B has timestamp 7, you know B did not cause A, but you cannot tell if A caused B or if they were concurrent. Vector clocks maintain a counter per node, allowing you to determine exact causal relationships. This is critical for conflict detection in systems like Dynamo-style databases.',
  },

  // Topic 6: Message Queues & Streaming
  {
    id: 'sd6-q1',
    chapterId: 6,
    question: 'Why is "exactly-once" message delivery considered impossible in distributed systems, and what do systems actually provide?',
    options: [
      'Network protocols already guarantee exactly-once delivery',
      'Due to network failures and timeouts, a sender can never know if a message was processed — it must either retry (risking duplicates: at-least-once) or not retry (risking loss: at-most-once). Systems achieve "effectively exactly-once" through idempotent consumers',
      'Exactly-once delivery is trivially achieved with acknowledgments',
      'Message queues always deliver messages exactly once by default',
    ],
    answer: 1,
    explanation: 'If a consumer processes a message and the ACK is lost, the broker retransmits it. The consumer has now processed it twice. Conversely, if the broker assumes delivery and the consumer crashes, the message is lost. True exactly-once requires idempotent consumers or transactional outbox patterns. Kafka achieves "exactly-once semantics" through idempotent producers and transactional consumers, but the underlying mechanism is still at-least-once with deduplication.',
  },
  {
    id: 'sd6-q2',
    chapterId: 6,
    question: 'When would you choose an event streaming platform (like Kafka) over a traditional message queue (like RabbitMQ)?',
    options: [
      'When you need messages to be deleted immediately after consumption',
      'When you need durable, replayable event logs that multiple independent consumers can read at their own pace — Kafka retains events and consumers track their own position, enabling event sourcing and stream processing',
      'When you need complex per-message routing based on headers and patterns',
      'When you only have a single consumer per topic',
    ],
    answer: 1,
    explanation: 'Traditional message queues delete messages after consumption, and each message goes to one consumer. Kafka retains events in an append-only log for a configurable retention period, and each consumer group independently tracks its offset. This enables multiple independent consumers, replaying history for new services, event sourcing, and building materialized views.',
  },
  {
    id: 'sd6-q3',
    chapterId: 6,
    question: 'What problem does the "transactional outbox" pattern solve in event-driven architectures?',
    options: [
      'It prevents message queues from running out of disk space',
      'It ensures a database write and its corresponding event publication succeed or fail atomically — by writing the event to an outbox table in the same database transaction, then asynchronously publishing it to the message broker',
      'It guarantees messages are delivered in order across all partitions',
      'It encrypts events before they are published to the message broker',
    ],
    answer: 1,
    explanation: 'Without the outbox pattern, a service might commit a database change but fail to publish the corresponding event (or vice versa). The transactional outbox writes the event to a table in the same ACID transaction as the business data. A separate process reads from the outbox table and publishes to the message broker, guaranteeing the event is eventually published if and only if the database commit succeeded.',
  },

  // Topic 7: Distributed Data
  {
    id: 'sd7-q1',
    chapterId: 7,
    question: 'What is the "split-brain" problem in leader-based replication, and why is it dangerous?',
    options: [
      'The leader runs out of memory and crashes',
      'Two nodes both believe they are the leader and accept writes independently — this causes conflicting data that may be impossible to reconcile without data loss',
      'The network bandwidth is split evenly between all nodes',
      'Followers cannot promote to leader when needed',
    ],
    answer: 1,
    explanation: 'Split-brain occurs when a network partition causes the cluster to fragment and each partition elects its own leader. Both leaders accept writes independently, creating divergent data histories. Consensus protocols prevent this by requiring a quorum (majority) to elect a leader — only one partition can have a majority.',
  },
  {
    id: 'sd7-q2',
    chapterId: 7,
    question: 'Why can hash-based partitioning lead to "hot partition" problems, and what exacerbates this?',
    options: [
      'Hash functions produce collisions that cause data corruption',
      'Even with uniform hash distribution, some partition keys are inherently more popular (celebrity posts, viral events) — all requests for one key hash to the same partition, creating a hotspot that cannot be split further',
      'Hash-based partitioning only works with numeric keys',
      'Hot partitions only occur with range-based partitioning, not hash-based',
    ],
    answer: 1,
    explanation: 'Hash partitioning distributes keys evenly across partitions, but it cannot break up a single hot key. If one user_id gets 100x more writes than average, all those writes hit one partition. Mitigations include adding a random suffix to hot keys (spreading them across partitions at the cost of read fan-out) or using a separate cache layer for hot keys.',
  },
  {
    id: 'sd7-q3',
    chapterId: 7,
    question: 'What is the advantage of multi-leader replication over single-leader replication for geographically distributed systems?',
    options: [
      'Multi-leader replication eliminates the need for conflict resolution',
      'Each datacenter has a local leader that accepts writes with low latency, rather than all writes routing to a single remote leader — but the tradeoff is that concurrent writes to different leaders can conflict',
      'Multi-leader replication uses less network bandwidth between datacenters',
      'Multi-leader replication provides stronger consistency guarantees',
    ],
    answer: 1,
    explanation: 'With single-leader replication, all writes must go to one datacenter, adding cross-region latency (often 100-300ms). Multi-leader replication places a leader in each datacenter so local writes are fast. The fundamental tradeoff is handling write conflicts when two leaders modify the same data concurrently, requiring conflict resolution strategies like last-write-wins, merge functions, or CRDTs.',
  },

  // Topic 8: System Reliability
  {
    id: 'sd8-q1',
    chapterId: 8,
    question: 'How does a circuit breaker pattern prevent cascading failures in a distributed system?',
    options: [
      'It encrypts communication between services to prevent data corruption',
      'It monitors failure rates to a downstream service and "trips" after a threshold — subsequent calls fail fast without making the request, giving the downstream service time to recover instead of being overwhelmed',
      'It ensures all services use the same programming language',
      'It removes failed services from the service registry permanently',
    ],
    answer: 1,
    explanation: 'Without a circuit breaker, a failing downstream service causes callers to pile up waiting requests, exhausting thread pools and connections, which then causes their callers to fail in a cascade. The circuit breaker tracks failures and enters the "open" state where calls fail immediately. It periodically allows a test request through ("half-open" state) to check if the downstream has recovered.',
  },
  {
    id: 'sd8-q2',
    chapterId: 8,
    question: 'Why do retries with exponential backoff include jitter (randomization)?',
    options: [
      'Jitter makes the system more secure by randomizing request timing',
      'Without jitter, all clients that failed at the same time retry at the same intervals, creating synchronized "retry storms" that overwhelm the recovering service — jitter spreads retries randomly across time',
      'Jitter reduces the total number of retry attempts needed',
      'Jitter is required by HTTP protocol standards',
    ],
    answer: 1,
    explanation: 'If 1000 clients all fail at time T and retry at T+1s, T+3s, T+7s (exponential backoff), they create synchronized spikes that can overwhelm the service repeatedly. Adding random jitter spreads the retries uniformly across each window, reducing peak load on the recovering service. AWS recommends "full jitter" as the most effective strategy.',
  },
  {
    id: 'sd8-q3',
    chapterId: 8,
    question: 'Why is chaos engineering (like Netflix\'s Chaos Monkey) valuable even when you have comprehensive unit and integration tests?',
    options: [
      'Chaos engineering replaces the need for automated testing',
      'Tests verify that components work correctly in isolation, but cannot surface emergent failures from complex interactions in production — chaos engineering reveals how the system actually behaves under real failure conditions like network partitions, instance crashes, and latency spikes',
      'Chaos engineering is only useful for companies with more than 1000 servers',
      'Tests cannot run in production environments',
    ],
    answer: 1,
    explanation: 'Tests verify expected behavior in controlled environments. But production has emergent complexity: garbage collection pauses, network partitions, clock skew, resource exhaustion, and cascading failures that are nearly impossible to simulate in tests. Chaos engineering deliberately injects real failures to discover systemic weaknesses before they cause outages.',
  },

  // Topic 9: Monitoring & Observability
  {
    id: 'sd9-q1',
    chapterId: 9,
    question: 'What is the fundamental difference between monitoring and observability?',
    options: [
      'Monitoring uses dashboards while observability uses logs',
      'Monitoring tells you WHEN something is broken (predefined metrics and alerts); observability lets you ask arbitrary questions about WHY it broke — through correlated metrics, logs, and traces that reveal emergent system behavior',
      'Observability is just a new name for monitoring',
      'Monitoring is for production; observability is for development',
    ],
    answer: 1,
    explanation: 'Monitoring checks known failure modes with predefined metrics and thresholds. Observability enables exploring unknown failure modes by correlating high-cardinality data — you can ask "why are requests from region X to service Y slow only on Tuesdays?" without having anticipated that question. The three pillars (metrics, logs, traces) must be correlated to provide true observability.',
  },
  {
    id: 'sd9-q2',
    chapterId: 9,
    question: 'Why are SLOs (Service Level Objectives) more useful than raw uptime percentages for engineering decisions?',
    options: [
      'SLOs are easier to calculate than uptime percentages',
      'SLOs define an "error budget" — the acceptable amount of unreliability — which lets teams make rational tradeoffs between velocity (shipping features) and reliability (reducing risk). When budget is exhausted, slow down; when budget remains, ship faster',
      'SLOs eliminate the need for monitoring',
      'SLOs are only relevant for external-facing services',
    ],
    answer: 1,
    explanation: 'A 99.9% SLO gives you an error budget of ~8.7 hours/year of downtime. This makes reliability a measurable resource: teams can objectively decide whether to push a risky deployment or freeze changes. Without SLOs, reliability discussions are subjective and there is no objective threshold for when to prioritize stability over feature velocity.',
  },
  {
    id: 'sd9-q3',
    chapterId: 9,
    question: 'Why is distributed tracing essential in microservices but unnecessary in a monolith?',
    options: [
      'Monoliths do not have performance problems',
      'In a monolith, a stack trace shows the full call path. In microservices, a single request traverses multiple services over the network — distributed tracing propagates a trace ID across service boundaries to reconstruct the full request path, revealing where latency and errors occur',
      'Distributed tracing only works with gRPC, which monoliths do not use',
      'Monoliths cannot generate trace data',
    ],
    answer: 1,
    explanation: 'A monolith stack trace shows exactly which function call chain led to an error or slow response. In microservices, a request might flow through 10+ services, each with its own logs. Without distributed tracing, correlating logs across services is essentially impossible. Traces reconstruct the full DAG of service calls, showing exactly where time was spent.',
  },

  // Topic 10: Security & API Design
  {
    id: 'sd10-q1',
    chapterId: 10,
    question: 'Why should passwords be hashed with bcrypt or Argon2 instead of SHA-256?',
    options: [
      'SHA-256 produces shorter hashes that are easier to crack',
      'SHA-256 is designed to be fast — an attacker with a GPU can compute billions of hashes per second. Bcrypt and Argon2 are intentionally slow (configurable work factor) and memory-hard, making brute-force attacks orders of magnitude more expensive',
      'SHA-256 is not a real hashing algorithm',
      'Bcrypt and Argon2 produce encrypted output that can be decrypted if needed',
    ],
    answer: 1,
    explanation: 'SHA-256 is a general-purpose hash optimized for speed — great for data integrity but terrible for password storage because attackers can test billions of candidates per second on GPUs. Bcrypt introduces a configurable cost factor, and Argon2 adds memory-hardness, making GPU-parallelized brute-force attacks economically infeasible.',
  },
  {
    id: 'sd10-q2',
    chapterId: 10,
    question: 'Why is the token bucket algorithm preferred over fixed-window rate limiting for most API rate limiting use cases?',
    options: [
      'Token bucket uses less memory than fixed-window',
      'Fixed-window allows burst traffic at window boundaries (up to 2x the rate if requests straddle the boundary) — token bucket provides smooth rate limiting with configurable burst capacity',
      'Token bucket is the only algorithm that works with distributed systems',
      'Fixed-window rate limiting cannot count requests accurately',
    ],
    answer: 1,
    explanation: 'With a fixed window (e.g., 100 requests per minute), a client can send 100 requests at 11:59:59 and 100 more at 12:00:00 — 200 requests in 2 seconds while technically staying within limits. Token bucket adds tokens at a steady rate with a maximum bucket size for bursts, providing predictable, smooth rate limiting.',
  },
  {
    id: 'sd10-q3',
    chapterId: 10,
    question: 'Why is JWT (JSON Web Token) stateless authentication a tradeoff compared to server-side sessions?',
    options: [
      'JWTs are more secure than server-side sessions in every way',
      'JWTs cannot be revoked before expiration without maintaining a server-side blocklist (reintroducing state) — server-side sessions can be instantly revoked by deleting the session, but require shared session storage that is harder to scale',
      'JWTs take up less network bandwidth than session cookies',
      'Server-side sessions do not work with HTTPS',
    ],
    answer: 1,
    explanation: 'JWTs are self-contained tokens verified by signature without a database lookup — great for scalability. However, once issued, a JWT is valid until expiration. If a user logs out or is compromised, you cannot invalidate the JWT without a server-side revocation list (defeating the stateless benefit). Short JWT lifetimes plus refresh tokens are the common compromise.',
  },

  // Topic 11: URL Shortener & Key-Value Store
  {
    id: 'sd11-q1',
    chapterId: 11,
    question: 'In a URL shortener design, why is base62 encoding of an auto-incrementing ID problematic at scale, and what alternatives exist?',
    options: [
      'Base62 encoding produces URLs that are too long',
      'Auto-incrementing IDs create a single-point-of-failure bottleneck and reveal creation order — alternatives include pre-generated ID pools distributed across nodes, or hashing the URL with collision handling via a Bloom filter or database check',
      'Base62 encoding is not supported by web browsers',
      'Auto-incrementing IDs consume too much storage space',
    ],
    answer: 1,
    explanation: 'A centralized auto-increment counter becomes a bottleneck and single point of failure. It also exposes business metrics (total URLs created) and allows enumeration. Better approaches include: pre-generating random IDs in batches (like Snowflake ID), using a distributed counter (like ZooKeeper ranges), or hashing with a short prefix. Each has different tradeoffs in collision probability, coordination overhead, and predictability.',
  },
  {
    id: 'sd11-q2',
    chapterId: 11,
    question: 'When designing a distributed key-value store, why would you choose consistent hashing with virtual nodes over simple modular hashing (key % N)?',
    options: [
      'Consistent hashing is always faster for lookups',
      'With modular hashing, adding or removing a node changes the mapping for nearly every key, causing massive data migration — consistent hashing limits redistribution to ~1/N of keys, and virtual nodes ensure uniform load distribution',
      'Modular hashing cannot handle string keys',
      'Consistent hashing uses less memory per node',
    ],
    answer: 1,
    explanation: 'With key % N, changing N from 10 to 11 nodes remaps ~90% of keys to different nodes, triggering massive data transfer. Consistent hashing maps both keys and nodes to a ring, so adding a node only takes keys from its neighbors (~1/N of total). Virtual nodes (100-200 per physical node) solve the uneven distribution problem by spreading each server across many ring positions.',
  },
  {
    id: 'sd11-q3',
    chapterId: 11,
    question: 'In a key-value store using quorum reads and writes (W + R > N), what happens when you set W=1, R=N for a read-heavy workload?',
    options: [
      'The system becomes eventually consistent with no durability guarantees',
      'Writes are fast (one replica acknowledgment) but reads must check all replicas to guarantee seeing the latest value — this optimizes for write latency at the cost of read latency and read availability, since any single node failure makes reads impossible',
      'This configuration violates the quorum formula and is invalid',
      'All reads return the same result regardless of which node responds',
    ],
    answer: 1,
    explanation: 'With W=1, a write succeeds as soon as one replica acknowledges, minimizing write latency. But to guarantee reading the latest value (since W+R > N), you must read from all N replicas. This makes reads slower and fragile — if any one replica is down, reads fail. The inverse (W=N, R=1) optimizes for read speed but makes writes fragile. W=N/2+1, R=N/2+1 is the balanced choice.',
  },

  // Topic 12: Social Media & Messaging
  {
    id: 'sd12-q1',
    chapterId: 12,
    question: 'In a social media news feed design, why is the "fan-out on write" approach problematic for users with millions of followers?',
    options: [
      'Fan-out on write uses too much network bandwidth during reads',
      'Writing to millions of follower timelines for every post by a celebrity creates a massive write amplification problem — a single post triggers millions of writes, causing latency spikes and resource contention. Hybrid approaches fan-out for normal users but fetch celebrity posts at read time',
      'Fan-out on write does not support multimedia content',
      'Fan-out on write cannot maintain chronological ordering',
    ],
    answer: 1,
    explanation: 'Fan-out on write pre-computes each user\'s feed by pushing new posts to all followers\' timelines. For a user with 10M followers, one post triggers 10M writes. Twitter\'s solution is a hybrid: fan-out on write for normal users (fast reads, manageable writes), but fan-out on read for celebrities (merge their posts into the feed at read time). This bounds write amplification while keeping reads fast for most cases.',
  },
  {
    id: 'sd12-q2',
    chapterId: 12,
    question: 'In a messaging system design, how do you guarantee message ordering within a conversation while scaling horizontally?',
    options: [
      'Use a global sequence counter shared across all servers',
      'Partition messages by conversation ID so all messages in one conversation go to the same partition — ordering is guaranteed within a partition. Cross-conversation ordering is unnecessary since users only see messages within their own conversations',
      'Assign timestamps from a single centralized clock server',
      'Sort messages on the client side after receiving them in any order',
    ],
    answer: 1,
    explanation: 'Partitioning by conversation ID ensures all messages in a chat room or DM thread are handled by the same partition, which maintains strict ordering via an append-only log or sequence number. This scales horizontally because different conversations are on different partitions. Global ordering across all conversations is neither necessary nor achievable without a single bottleneck.',
  },
  {
    id: 'sd12-q3',
    chapterId: 12,
    question: 'Why do social media platforms use a graph database or adjacency list for the social graph instead of a relational join table?',
    options: [
      'Graph databases are always faster than relational databases for all queries',
      'Relational joins for multi-hop traversals (friend-of-friend, mutual connections) require recursive self-joins that degrade exponentially with depth — graph databases store edges as direct pointers, making traversals O(neighbors) per hop instead of O(table) per join',
      'Relational databases cannot store bidirectional relationships',
      'Graph databases use less storage space for relationship data',
    ],
    answer: 1,
    explanation: 'A SQL query for "friends of friends" requires a self-join on a potentially billion-row edges table — for each hop, the database scans or index-lookups the entire table. Graph databases store edges as direct references between nodes, so traversing from node A to its neighbors is an O(degree) local operation regardless of total graph size. This makes multi-hop queries (2nd-degree connections, shortest path) orders of magnitude faster.',
  },

  // Topic 13: Search & Recommendations
  {
    id: 'sd13-q1',
    chapterId: 13,
    question: 'Why do search engines use an inverted index instead of scanning documents directly?',
    options: [
      'Inverted indexes compress documents to save storage space',
      'An inverted index maps each term to the list of documents containing it — looking up a query term is an O(1) hash lookup followed by an intersection of posting lists, versus scanning every document (O(N * doc_length)) on every query. This is the fundamental data structure that makes full-text search feasible at scale',
      'Inverted indexes only work with English text',
      'Direct document scanning is faster for small collections but inverted indexes are required by law for large ones',
    ],
    answer: 1,
    explanation: 'Without an inverted index, searching for "distributed systems" requires reading every document and checking for both words — O(total corpus size) per query. An inverted index pre-builds a map from each word to its document list (posting list). A query becomes: look up "distributed" (posting list A), look up "systems" (posting list B), intersect A and B. This is orders of magnitude faster and is why Elasticsearch, Solr, and Lucene all use inverted indexes.',
  },
  {
    id: 'sd13-q2',
    chapterId: 13,
    question: 'In a recommendation system, what is the "cold start" problem and why can\'t collaborative filtering alone solve it?',
    options: [
      'The cold start problem occurs when servers need time to warm up after deployment',
      'Collaborative filtering relies on user-item interaction history — new users with no history and new items with no interactions have no data to base recommendations on. This requires fallback strategies like content-based filtering, popularity-based defaults, or explicit preference collection during onboarding',
      'Cold start only affects recommendation systems running in cold climates',
      'Collaborative filtering cannot process more than 1 million items',
    ],
    answer: 1,
    explanation: 'Collaborative filtering finds patterns like "users who liked X also liked Y." A new user has no likes, so there are no patterns to match. A new item has no interactions, so it never appears in "also liked" lists. Solutions include: content-based filtering (recommend based on item attributes), demographic-based defaults, trending/popular items, and interactive onboarding that bootstraps the user\'s preference profile.',
  },
  {
    id: 'sd13-q3',
    chapterId: 13,
    question: 'Why do large-scale search systems use a two-phase retrieval architecture (candidate generation + ranking) instead of applying a complex ranking model to all documents?',
    options: [
      'Complex ranking models cannot process text data',
      'Applying a deep learning ranking model to billions of documents per query is computationally infeasible — candidate generation uses cheap, fast methods (inverted index, approximate nearest neighbors) to reduce billions of candidates to thousands, then an expensive ML model re-ranks only those thousands for quality',
      'Two-phase retrieval was mandated by an industry standard in 2010',
      'Single-phase retrieval always produces better results than two-phase',
    ],
    answer: 1,
    explanation: 'A state-of-the-art neural ranking model might take 10ms per document. At 10 billion documents, that is 100 million seconds per query. Two-phase retrieval solves this: phase 1 uses fast, approximate methods (BM25 on an inverted index, or approximate nearest neighbor search on embeddings) to retrieve ~1000 candidates in milliseconds. Phase 2 applies the expensive ML model only to those 1000 candidates, taking ~10 seconds total — a reduction of 7 orders of magnitude.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.chapterId === chapterId);
}
