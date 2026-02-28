export interface Concept {
  id: string;
  name: string;
  description: string;
  keyPoints: string[];
  tradeoffs?: string[];
  realWorld?: string[];
}

export interface Chapter {
  id: number;
  title: string;
  part: number;
  partTitle: string;
  summary: string;
  concepts: Concept[];
}

export const parts = [
  { id: 1, title: 'Foundations of Data Systems' },
  { id: 2, title: 'Distributed Data' },
  { id: 3, title: 'Derived Data' },
];

export const chapters: Chapter[] = [
  // ═══════════════════════════════════════════════════════════════
  // PART I: Foundations of Data Systems
  // ═══════════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Reliable, Scalable, and Maintainable Applications',
    part: 1,
    partTitle: 'Foundations of Data Systems',
    summary: 'The fundamental goals of data systems: reliability (continuing to work correctly even when things go wrong), scalability (handling growth), and maintainability (making life better for engineering and operations teams).',
    concepts: [
      {
        id: 'reliability',
        name: 'Reliability',
        description: 'The system continues to work correctly even when things go wrong. Faults are the things that can go wrong; a fault-tolerant system anticipates faults and copes with them.',
        keyPoints: [
          'Hardware faults: disk failures, RAM errors, power outages — use redundancy (RAID, dual power, hot-swap CPUs)',
          'Software errors: systematic faults like bugs, runaway processes, cascading failures — harder to anticipate than hardware',
          'Human errors: configuration errors are the leading cause of outages — use sandboxes, testing, monitoring',
          'Fault vs failure: a fault is one component deviating from spec; a failure is when the system as a whole stops working',
        ],
        tradeoffs: ['Building fault-tolerant systems adds complexity', 'Deliberate fault injection (chaos engineering) finds weaknesses but costs engineering time'],
        realWorld: ['Netflix Chaos Monkey', 'AWS multi-AZ deployments', 'Google SRE error budgets'],
      },
      {
        id: 'scalability',
        name: 'Scalability',
        description: "The system's ability to cope with increased load. Scalability means having strategies for keeping performance good even when load increases.",
        keyPoints: [
          'Describing load: use load parameters (requests/sec, read/write ratio, concurrent users, cache hit rate)',
          'Describing performance: throughput (batch systems) vs response time (online systems)',
          'Latency vs response time: latency is the duration a request waits to be handled; response time includes processing + network + queuing',
          'Percentiles (p50, p95, p99, p999) are better than averages for describing response time distributions',
          'Tail latency amplification: even if only 1/1000 calls is slow, a user request touching many backend calls amplifies this',
          'Scaling up (vertical) vs scaling out (horizontal) — often a pragmatic mix of both',
        ],
        tradeoffs: ['Vertical scaling is simpler but has hard limits', 'Horizontal scaling is more flexible but adds distribution complexity', 'Elastic scaling saves cost but adds unpredictability'],
        realWorld: ['Twitter fan-out problem: hybrid push/pull approach for celebrity tweets', 'Amazon: 100ms latency increase → 1% sales decrease'],
      },
      {
        id: 'maintainability',
        name: 'Maintainability',
        description: 'Over time, many different people will work on the system. Maintainability means making it easy for them to work on it productively.',
        keyPoints: [
          'Operability: make it easy for operations teams to keep the system running — monitoring, automation, documentation',
          'Simplicity: remove accidental complexity through good abstraction — not the same as reducing functionality',
          'Evolvability (extensibility): make it easy to make changes — agile practices, refactoring, test-driven development',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Data Models and Query Languages',
    part: 1,
    partTitle: 'Foundations of Data Systems',
    summary: 'Data models profoundly affect how we think about problems. The relational model, document model, and graph model each have different strengths for different use cases.',
    concepts: [
      {
        id: 'relational-model',
        name: 'Relational Model',
        description: 'Data is organized into relations (tables), where each relation is an unordered collection of tuples (rows). SQL is the best-known query language for the relational model.',
        keyPoints: [
          'Born from IBM\'s System R in the 1970s — battle-tested for 50+ years',
          'Schema-on-write: the schema is explicit and enforced at write time',
          'JOINs connect related data across tables efficiently',
          'Normalization reduces duplication — one source of truth for each piece of data',
          'Many-to-one and many-to-many relationships handled naturally with foreign keys',
        ],
        tradeoffs: ['Object-relational impedance mismatch: translating between objects and tables requires an ORM layer', 'Schema changes can be slow on large tables (ALTER TABLE)'],
        realWorld: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL Server'],
      },
      {
        id: 'document-model',
        name: 'Document Model',
        description: 'Data is stored as self-contained documents (usually JSON). Good for data that comes in self-contained units with few relationships between documents.',
        keyPoints: [
          'Schema-on-read: the structure is implicit, interpreted when data is read — like dynamic type checking',
          'Better data locality: an entire document can be fetched in one query without joins',
          'Schema flexibility: different documents can have different fields',
          'Poor for many-to-many relationships — requires application-level joins or denormalization',
          'Document references (foreign keys) are usually not well supported',
        ],
        tradeoffs: ['Simpler for 1:N relationships but awkward for N:M', 'Data locality advantage vanishes if documents are large and you need only a small portion'],
        realWorld: ['MongoDB', 'CouchDB', 'RethinkDB', 'Espresso (LinkedIn)'],
      },
      {
        id: 'graph-model',
        name: 'Graph Model',
        description: 'Data is modeled as vertices (nodes) and edges (relationships). Ideal for highly interconnected data where relationships are as important as the entities.',
        keyPoints: [
          'Property graph model: vertices and edges both have properties (key-value pairs)',
          'Cypher: declarative query language for property graphs (Neo4j)',
          'Triple-stores: (subject, predicate, object) — used in RDF and SPARQL',
          'Recursive queries (traversals of unknown depth) are natural in graph models but awkward in SQL',
          'Vertices and edges can represent heterogeneous data — no strict schema required',
        ],
        tradeoffs: ['Excellent for relationship-heavy queries, but less optimized for simple lookups', 'Graph databases can be harder to scale horizontally than key-value stores'],
        realWorld: ['Neo4j', 'Amazon Neptune', 'JanusGraph', 'Facebook TAO (social graph)'],
      },
      {
        id: 'query-languages',
        name: 'Query Languages',
        description: 'Declarative languages (SQL, CSS, Cypher) specify what you want, not how to get it. Imperative code tells the machine step-by-step. Declarative is generally preferred for data queries.',
        keyPoints: [
          'Declarative: specify pattern of results, optimizer chooses execution strategy — parallelizable',
          'Imperative: specify exact operations in order — harder to optimize automatically',
          'MapReduce: a programming model between declarative and imperative — map + reduce functions',
          'Aggregation pipelines (MongoDB) evolved MapReduce into a more declarative form',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Storage and Retrieval',
    part: 1,
    partTitle: 'Foundations of Data Systems',
    summary: 'How databases internally store and retrieve data. Understanding storage engines helps you tune performance and pick the right database for your workload.',
    concepts: [
      {
        id: 'log-structured-storage',
        name: 'Log-Structured Storage',
        description: 'Append-only storage engines: every write appends to a log. Background compaction merges and discards overwritten values.',
        keyPoints: [
          'Hash index: in-memory hash map pointing to byte offsets in the log file — fast lookups for key-value data',
          'SSTables (Sorted String Tables): segments sorted by key — enables efficient merging (like merge sort)',
          'LSM-Trees (Log-Structured Merge-Trees): cascade of SSTables at different levels, periodic compaction',
          'Bloom filters: probabilistic data structure to quickly check if a key exists before disk reads',
          'Write amplification: one write to the database results in multiple writes to disk due to compaction',
          'Compaction strategies: size-tiered (HBase, Cassandra) vs leveled (LevelDB, RocksDB)',
        ],
        tradeoffs: ['Fast writes (sequential I/O) but reads may need to check multiple SSTables', 'Compaction can cause write stalls if it can\'t keep up with incoming writes'],
        realWorld: ['LevelDB', 'RocksDB', 'Cassandra', 'HBase', 'Lucene (inverted index)'],
      },
      {
        id: 'b-tree-storage',
        name: 'B-Tree Storage',
        description: 'The most widely used indexing structure. B-trees break the database into fixed-size pages (typically 4 KB) and read/write one page at a time.',
        keyPoints: [
          'Balanced tree with branching factor typically in the hundreds — 4 levels can store 256 TB',
          'Updates modify pages in place — unlike append-only log structures',
          'Write-ahead log (WAL/redo log): append-only file for crash recovery before B-tree pages are modified',
          'Latches (lightweight locks) required for concurrent access — more complex than append-only structures',
          'Leaf pages store values; internal pages store keys and child pointers',
          'B+ trees: variation where only leaf nodes contain values, internal nodes contain only keys',
        ],
        tradeoffs: ['Faster reads (single tree lookup) but slower writes than LSM-trees', 'In-place updates mean no write amplification from compaction but need WAL for crash recovery', 'LSM-trees typically achieve higher write throughput; B-trees typically have more predictable read performance'],
        realWorld: ['PostgreSQL', 'MySQL InnoDB', 'Oracle', 'SQL Server'],
      },
      {
        id: 'oltp-vs-olap',
        name: 'OLTP vs OLAP',
        description: 'Two broad categories of workloads: OLTP (Online Transaction Processing) handles high-volume, low-latency reads/writes; OLAP (Online Analytical Processing) handles complex aggregate queries over large datasets.',
        keyPoints: [
          'OLTP: user-facing, read/write small number of records, access by key, random-access writes',
          'OLAP: analyst-facing, scan over huge number of records, aggregate (count, sum, avg), bulk import (ETL)',
          'Data warehousing: separate OLAP database, loaded via ETL from OLTP systems',
          'Star schema (dimensional modeling): central fact table + dimension tables (who, what, where, when, how)',
          'Snowflake schema: normalized variant of star schema where dimensions have sub-dimensions',
        ],
        tradeoffs: ['Separate OLTP/OLAP systems add infrastructure cost but prevent analytics queries from impacting production', 'Star schema denormalization makes queries simpler but wastes space'],
        realWorld: ['Amazon Redshift', 'Google BigQuery', 'Snowflake', 'Apache Hive', 'ClickHouse'],
      },
      {
        id: 'column-oriented-storage',
        name: 'Column-Oriented Storage',
        description: 'Instead of storing all values from one row together, store all values from one column together. Dramatically speeds up analytical queries that only access a few columns out of many.',
        keyPoints: [
          'Column compression: columns often have few distinct values → bitmap encoding, run-length encoding',
          'Vectorized processing: CPU can process a column of compressed data in L1 cache with SIMD instructions',
          'Sort order: rows can be sorted by a chosen column (or multiple) to improve compression and range queries',
          'Several different sort orders via replicated data — different queries benefit from different sort orders',
          'Materialized views and data cubes: precomputed aggregates for common queries',
          'Writing is harder: inserting a row touches every column file — LSM-tree approach helps',
        ],
        tradeoffs: ['Excellent for analytics (few columns, many rows) but poor for OLTP (need entire rows)', 'Column compression is very effective but adds CPU cost for decompression'],
        realWorld: ['Parquet', 'ORC', 'Redshift', 'Vertica', 'ClickHouse', 'C-Store'],
      },
    ],
  },
  {
    id: 4,
    title: 'Encoding and Evolution',
    part: 1,
    partTitle: 'Foundations of Data Systems',
    summary: 'Programs change over time, but data lives on. Data encoding formats and schema evolution strategies determine how smoothly you can deploy changes.',
    concepts: [
      {
        id: 'encoding-formats',
        name: 'Encoding Formats',
        description: 'Translating in-memory objects to byte sequences (encoding/serialization/marshalling) and back (decoding/deserialization). The format matters for both efficiency and compatibility.',
        keyPoints: [
          'Language-specific formats (Java Serializable, Python pickle): tied to one language, often insecure',
          'JSON, XML, CSV: human-readable, widely supported, but verbose and ambiguous about number types',
          'Binary JSON variants (MessagePack, BSON): smaller but still no schema',
          'Thrift and Protocol Buffers: schema-defined, compact binary encoding using field tags (numbers)',
          'Avro: schema-defined but uses schema resolution — writer\'s schema + reader\'s schema, no field tags',
        ],
        tradeoffs: ['Human-readable (JSON) vs compact binary (protobuf): debuggability vs efficiency', 'Schema-based formats enable better compatibility checks but require schema management'],
        realWorld: ['Protocol Buffers (Google)', 'Thrift (Facebook)', 'Avro (Hadoop ecosystem)', 'MessagePack'],
      },
      {
        id: 'schema-evolution',
        name: 'Schema Evolution',
        description: 'Forward and backward compatibility allow old and new code to coexist during rolling deployments. This is critical for zero-downtime upgrades.',
        keyPoints: [
          'Backward compatibility: new code can read old data — easier, new code knows about old format',
          'Forward compatibility: old code can read new data — harder, old code must ignore unknown fields',
          'Protobuf/Thrift: add new fields with new tag numbers; old code ignores unknown tags',
          'Avro: writer\'s schema and reader\'s schema can differ; Avro resolves differences at read time',
          'Never remove a required field; only add optional fields for backward compatibility',
          'Never reuse a field tag number after deleting a field',
        ],
      },
      {
        id: 'dataflow-modes',
        name: 'Modes of Dataflow',
        description: 'Data flows between processes via databases, service calls (REST/RPC), or message passing. Each mode has different implications for encoding compatibility.',
        keyPoints: [
          'Via databases: writing process encodes, reading process decodes — may be different versions of the app',
          'Via service calls (REST, RPC): client encodes request, server decodes; server encodes response, client decodes',
          'RPC problems: network requests are fundamentally different from function calls — failures, latency, retries, idempotency',
          'Via async message passing (message brokers): sender doesn\'t wait for response — decoupled, durable, acts as buffer',
          'Actor model (Akka, Orleans, Erlang): message passing within a single process or across nodes',
        ],
        tradeoffs: ['REST: simple and widely supported but chatty and no streaming', 'RPC: efficient but tight coupling and interoperability issues', 'Message queues: decoupled and durable but add latency and complexity'],
        realWorld: ['gRPC (protobuf over HTTP/2)', 'Apache Kafka (message broker)', 'RabbitMQ', 'Akka (actor model)'],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════
  // PART II: Distributed Data
  // ═══════════════════════════════════════════════════════════════
  {
    id: 5,
    title: 'Replication',
    part: 2,
    partTitle: 'Distributed Data',
    summary: 'Keeping a copy of the same data on multiple machines connected via a network. Replication provides redundancy, improves performance, and enables geographic distribution.',
    concepts: [
      {
        id: 'leader-follower',
        name: 'Leader-Based Replication',
        description: 'One replica is designated the leader (master/primary). Clients send writes to the leader, which sends the data change to all followers (read replicas) via a replication log.',
        keyPoints: [
          'Synchronous replication: leader waits for follower confirmation — guarantees up-to-date copy but one slow node blocks all writes',
          'Asynchronous replication: leader doesn\'t wait — fast writes but followers may lag (durability risk)',
          'Semi-synchronous: one follower is synchronous, rest are async — practical compromise',
          'Setting up new followers: take a snapshot, copy to new node, connect and request all changes since snapshot',
          'Handling node outages: follower catch-up (replay log), leader failover (promote a follower)',
          'Failover pitfalls: split-brain (two nodes both think they\'re leader), data loss from async replication',
        ],
        tradeoffs: ['Synchronous: strong consistency but higher write latency', 'Asynchronous: fast writes but risk of data loss and stale reads'],
        realWorld: ['PostgreSQL streaming replication', 'MySQL replication', 'MongoDB replica sets', 'RabbitMQ mirrored queues'],
      },
      {
        id: 'replication-lag',
        name: 'Replication Lag Problems',
        description: 'When using asynchronous replication, followers may be seconds or minutes behind the leader, causing users to see stale or inconsistent data.',
        keyPoints: [
          'Read-after-write consistency: user should see their own writes immediately — route own-data reads to leader',
          'Monotonic reads: user should not see data go backward in time — always read from same replica',
          'Consistent prefix reads: if A happens before B, everyone should see A before B — important for causal conversations',
          'These guarantees are application-level — the database doesn\'t provide them automatically with async replication',
        ],
      },
      {
        id: 'multi-leader',
        name: 'Multi-Leader Replication',
        description: 'Multiple nodes accept writes. Each leader simultaneously acts as a follower to the other leaders. Useful for multi-datacenter operation and offline-capable clients.',
        keyPoints: [
          'Multi-datacenter: one leader per datacenter, each replicates to others — better write latency and datacenter fault tolerance',
          'Offline operation (CouchDB, mobile apps): each device is a "datacenter" with a local leader, syncs later',
          'Collaborative editing (Google Docs): each user\'s edit is a write on their local replica',
          'Write conflicts: two leaders may modify the same data concurrently — must be resolved',
          'Conflict resolution: last write wins (LWW), merge values, custom resolution logic, CRDTs',
        ],
        tradeoffs: ['Better availability and write latency across datacenters but significantly more complex', 'Conflict resolution is the hardest problem — subtle bugs, data loss with LWW'],
        realWorld: ['CouchDB', 'Tungsten Replicator (MySQL)', 'BDR for PostgreSQL'],
      },
      {
        id: 'leaderless',
        name: 'Leaderless Replication',
        description: 'Any replica can accept writes directly. The client sends writes to several replicas in parallel. No failover needed since there is no leader.',
        keyPoints: [
          'Quorum reads and writes: w + r > n guarantees seeing an up-to-date value (w = write quorum, r = read quorum, n = replicas)',
          'Read repair: client detects stale value during read and writes newer value back to stale replica',
          'Anti-entropy process: background process that looks for differences between replicas and copies missing data',
          'Sloppy quorums and hinted handoff: during network partitions, writes go to reachable nodes and are transferred later',
          'Last Write Wins (LWW): attach timestamp, keep highest — simple but loses concurrent writes',
          'Version vectors: track versions per replica to detect concurrent writes accurately',
        ],
        tradeoffs: ['High availability (no failover delay) but weaker consistency guarantees', 'Quorum parameters are tunable: higher w/r = stronger consistency, lower w/r = lower latency'],
        realWorld: ['Amazon Dynamo', 'Cassandra', 'Riak', 'Voldemort'],
      },
    ],
  },
  {
    id: 6,
    title: 'Partitioning',
    part: 2,
    partTitle: 'Distributed Data',
    summary: 'Breaking a large dataset into partitions (shards) so each partition can live on a different node. The main goal is to spread data and query load evenly.',
    concepts: [
      {
        id: 'partitioning-strategies',
        name: 'Partitioning Strategies',
        description: 'How to decide which records go to which partition. The goal is to avoid skew (uneven distribution) and hot spots (one partition getting disproportionate load).',
        keyPoints: [
          'Key range partitioning: assign contiguous range of keys to each partition (like encyclopedia volumes A-B, C-D...)',
          'Hash partitioning: hash the key, assign hash ranges to partitions — distributes evenly but loses sort order',
          'Consistent hashing: a way to distribute load without moving all data when partitions are added/removed',
          'Compound key: partition by hash of first part, sort within partition by second part — useful for time-series within a user',
          'Hot spots: even with hashing, celebrity/trending keys can overload one partition — application-level mitigation needed (random suffix)',
        ],
        tradeoffs: ['Key range: enables efficient range scans but risk of hot spots on sequential keys', 'Hash: even distribution but range queries must scatter to all partitions'],
        realWorld: ['Cassandra compound partition keys', 'MongoDB hashed sharding', 'HBase region splitting'],
      },
      {
        id: 'secondary-indexes',
        name: 'Partitioning and Secondary Indexes',
        description: 'Secondary indexes don\'t map neatly to partitions. Two main approaches: local indexes (partition by document) and global indexes (partition by term).',
        keyPoints: [
          'Document-partitioned (local) index: each partition maintains its own secondary index for its data only',
          'Scatter/gather: query on a secondary index must be sent to all partitions and results combined — expensive',
          'Term-partitioned (global) index: the index itself is partitioned — a search only needs to query the partitions containing the terms',
          'Global indexes: reads hit fewer partitions but writes are slower (must update multiple index partitions)',
        ],
        tradeoffs: ['Local index: faster writes, slower reads (scatter/gather)', 'Global index: faster reads, slower and more complex writes (distributed transactions or async updates)'],
      },
      {
        id: 'rebalancing',
        name: 'Rebalancing Partitions',
        description: 'As data grows or nodes are added/removed, partitions need to be moved between nodes to maintain even distribution.',
        keyPoints: [
          'Don\'t use hash mod N: adding a node changes most keys\' partition assignment, causing massive data movement',
          'Fixed number of partitions: create many more partitions than nodes; reassign partitions when nodes change',
          'Dynamic partitioning: split a partition when it gets too big, merge when it shrinks — adapts to data volume',
          'Proportional to nodes: fixed number of partitions per node — new node steals partitions from existing nodes',
          'Automatic vs manual rebalancing: automatic is convenient but risky (cascading failures); manual requires human oversight',
        ],
        realWorld: ['Cassandra (vnodes / consistent hashing)', 'HBase (dynamic split)', 'Elasticsearch (fixed shards)'],
      },
    ],
  },
  {
    id: 7,
    title: 'Transactions',
    part: 2,
    partTitle: 'Distributed Data',
    summary: 'Transactions are an abstraction that simplifies programming with databases. They group reads and writes into a logical unit that either commits or aborts entirely.',
    concepts: [
      {
        id: 'acid',
        name: 'ACID Properties',
        description: 'The safety guarantees provided by transactions. In practice, implementations vary significantly between databases.',
        keyPoints: [
          'Atomicity: a transaction is all-or-nothing — if any part fails, the whole thing is rolled back (abortability)',
          'Consistency: application-level invariants are maintained (this is actually the application\'s responsibility, not the database\'s)',
          'Isolation: concurrently executing transactions don\'t interfere with each other — each sees a consistent snapshot',
          'Durability: once committed, data survives crashes — written to disk, WAL, or replicated',
          'BASE (Basically Available, Soft state, Eventual consistency): vague alternative to ACID used by some NoSQL systems',
        ],
      },
      {
        id: 'isolation-levels',
        name: 'Isolation Levels',
        description: 'Different degrees of protection from concurrency bugs. Stronger isolation has higher performance cost.',
        keyPoints: [
          'Read Committed: no dirty reads (only see committed data), no dirty writes (only overwrite committed data)',
          'Snapshot Isolation (MVCC): each transaction reads from a consistent snapshot — uses multi-version concurrency control',
          'MVCC: database keeps multiple versions of each object; each transaction sees the version from its snapshot',
          'Repeatable Read: confusingly defined in SQL standard — most implementations actually provide snapshot isolation',
          'Serializable: strongest level — result is the same as if transactions ran one at a time',
        ],
        tradeoffs: ['Read Committed: widely available, low overhead, but allows skew (non-repeatable reads)', 'Snapshot Isolation: good balance of performance and correctness, but doesn\'t prevent write skew', 'Serializable: prevents all anomalies but lower throughput'],
      },
      {
        id: 'serializability',
        name: 'Serializability',
        description: 'The strongest isolation level: guarantees that the result is the same as if transactions were executed serially (one at a time). Three implementation approaches.',
        keyPoints: [
          'Actual serial execution: literally run one transaction at a time on a single thread — feasible with in-memory data and stored procedures',
          'Two-phase locking (2PL): readers and writers block each other with shared/exclusive locks — high contention',
          'Serializable Snapshot Isolation (SSI): optimistic approach — allow transactions to proceed, detect and abort conflicts at commit time',
          'SSI: based on snapshot isolation + detecting when a transaction read stale data (rw-dependencies)',
          'Pessimistic (2PL) vs optimistic (SSI) concurrency control: 2PL waits, SSI retries',
        ],
        tradeoffs: ['Serial execution: simple but limited to single-core throughput and short transactions', '2PL: correct but high latency due to lock contention and deadlocks', 'SSI: best performance for read-heavy workloads but high abort rate under contention'],
        realWorld: ['VoltDB, Redis (serial)', 'MySQL InnoDB (2PL for serializable)', 'PostgreSQL (SSI since 9.1)'],
      },
      {
        id: 'write-skew',
        name: 'Write Skew and Phantoms',
        description: 'A concurrency anomaly that snapshot isolation doesn\'t prevent: two transactions read the same data, make decisions based on it, and write conflicting updates.',
        keyPoints: [
          'Write skew: two transactions both check a condition, both find it true, both make a write that violates the condition when combined',
          'Example: two doctors both check enough doctors are on call, both go off duty, leaving nobody on call',
          'Phantoms: a write in one transaction changes the result of a search query in another transaction',
          'Materializing conflicts: create artificial lock rows so snapshot isolation can detect the conflict',
          'Serializable isolation is the only general solution to write skew',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'The Trouble with Distributed Systems',
    part: 2,
    partTitle: 'Distributed Data',
    summary: 'Everything that can go wrong in distributed systems: unreliable networks, unreliable clocks, and the impossibility of nodes knowing anything for certain.',
    concepts: [
      {
        id: 'unreliable-networks',
        name: 'Unreliable Networks',
        description: 'In a distributed system, communication happens over an asynchronous packet network. The request may be lost, queued, delayed, or the response may be lost.',
        keyPoints: [
          'If you send a request and don\'t get a response, you cannot distinguish between lost request, remote node down, or lost response',
          'Timeouts: the only way to detect faults, but choosing the right timeout is hard',
          'Network partitions: some nodes can communicate, others can\'t — the network is "split"',
          'Unbounded delays: unlike phone circuits (bounded delay), packet networks have variable queuing delays',
          'TCP vs UDP: TCP gives reliability guarantees (retransmission, ordering) at the cost of latency',
        ],
        tradeoffs: ['Short timeouts: detect faults quickly but risk false positives during load spikes', 'Long timeouts: fewer false alarms but longer wait before declaring a node dead'],
      },
      {
        id: 'unreliable-clocks',
        name: 'Unreliable Clocks',
        description: 'Each machine has its own quartz clock, which drifts. NTP synchronization is imprecise. Time-of-day clocks and monotonic clocks serve different purposes.',
        keyPoints: [
          'Time-of-day clocks: wall-clock time, can jump forward or backward on NTP sync — unreliable for measuring elapsed time',
          'Monotonic clocks: always move forward, good for measuring durations (elapsed time) — but meaningless to compare across nodes',
          'Clock skew: NTP accuracy is typically 35ms over the internet, <1ms on a LAN — but can be much worse',
          'Logical clocks (Lamport timestamps, vector clocks): count events rather than wall-clock time — safer for ordering',
          'Last-write-wins relies on timestamps — clock skew can silently drop writes without anyone noticing',
          'Google Spanner TrueTime: hardware-assisted clock with bounded uncertainty — waits out the uncertainty interval',
        ],
        tradeoffs: ['Physical clocks: intuitive but unreliable across nodes', 'Logical clocks: reliable ordering but don\'t tell you actual wall-clock time'],
        realWorld: ['Google Spanner TrueTime (GPS + atomic clocks)', 'Amazon Time Sync Service', 'Cockroach DB (hybrid logical clocks)'],
      },
      {
        id: 'process-pauses',
        name: 'Process Pauses',
        description: 'A node may be paused at any point — GC pauses, virtual machine suspension, disk I/O stalls, context switches, paging. During a pause, the world keeps going but the paused node doesn\'t know.',
        keyPoints: [
          'GC pauses: stop-the-world garbage collection can last seconds — node becomes unresponsive',
          'Lease expiry: a node may think it still holds a lease (lock) but it expired during a GC pause',
          'Fencing tokens: monotonically increasing token attached to each lock acquisition — storage server rejects stale tokens',
          'A node cannot trust its own judgment about its own status — it may have been declared dead by others while paused',
        ],
      },
      {
        id: 'byzantine-faults',
        name: 'Byzantine Faults',
        description: 'When a node sends contradictory or malicious messages to different nodes. Most distributed systems assume non-Byzantine faults (crash-stop model).',
        keyPoints: [
          'Byzantine fault tolerance: reaching consensus even if some nodes are actively malicious — expensive (BFT protocols)',
          'Most systems assume crash-stop: nodes either work correctly or crash, they don\'t actively lie',
          'Weak forms of lying: hardware errors, corrupted network packets, software bugs — use checksums and sanity checks',
          'Blockchain/cryptocurrency systems are one area where Byzantine fault tolerance is needed',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Consistency and Consensus',
    part: 2,
    partTitle: 'Distributed Data',
    summary: 'The strongest consistency model (linearizability) and how to achieve consensus among distributed nodes. These are the foundational problems of distributed systems.',
    concepts: [
      {
        id: 'linearizability',
        name: 'Linearizability',
        description: 'Makes a distributed system appear as if there is only one copy of the data and all operations are atomic. Once a write completes, all subsequent reads return that value.',
        keyPoints: [
          'Also called atomic consistency, strong consistency, or external consistency',
          'If operation A completes before operation B starts, then B must see A\'s result (real-time ordering)',
          'Useful for leader election (exactly one leader), uniqueness constraints (exactly one user with that username), ordering (exactly one person gets that seat)',
          'CAP theorem: during a network partition, you must choose between linearizability (C) and availability (A)',
          'Linearizability ≠ serializability: linearizability is about recency of reads; serializability is about transaction isolation',
        ],
        tradeoffs: ['Linearizability provides simple semantics but requires coordination (high latency)', 'Many systems sacrifice linearizability for better performance and availability'],
        realWorld: ['ZooKeeper (linearizable writes)', 'etcd (Raft-based, linearizable)', 'Single-node databases are trivially linearizable'],
      },
      {
        id: 'ordering-guarantees',
        name: 'Ordering Guarantees',
        description: 'Different ordering guarantees from weakest to strongest: no ordering, causal consistency, and total order (linearizability).',
        keyPoints: [
          'Causal consistency: if event A causally depends on B, everyone sees B before A — but concurrent events can be in any order',
          'Causal consistency is the strongest consistency model that doesn\'t sacrifice availability (unlike linearizability)',
          'Lamport timestamps: total ordering of events but can\'t tell if two events are concurrent or causally related',
          'Total order broadcast: reliable delivery of messages in the same order to all nodes — equivalent to consensus',
          'Total order broadcast can implement linearizable compare-and-set (and vice versa)',
        ],
      },
      {
        id: 'consensus',
        name: 'Distributed Consensus',
        description: 'Getting several nodes to agree on something — seems simple but is one of the most fundamental and subtle problems in distributed computing.',
        keyPoints: [
          'FLP impossibility: in an asynchronous system, no consensus algorithm can guarantee termination if even one node can crash',
          'In practice: algorithms use timeouts (partial synchrony assumption) to work around FLP',
          'Raft: leader-based consensus — leader proposes, followers accept, committed when majority ACK',
          'Paxos: classic consensus algorithm — more general than Raft but harder to understand and implement',
          'Viewstamped Replication, Zab (ZooKeeper): other consensus algorithms with similar properties',
          'Epoch numbering + quorum: each consensus round has a unique epoch, decisions need a majority from the current epoch',
        ],
        tradeoffs: ['Consensus gives safety guarantees but requires at least 3 nodes (to tolerate 1 failure), adds latency', 'Leader-based consensus has a performance bottleneck at the leader'],
        realWorld: ['etcd (Raft)', 'ZooKeeper (Zab)', 'Consul (Raft)', 'Google Chubby (Paxos)'],
      },
      {
        id: 'membership',
        name: 'Membership and Coordination Services',
        description: 'ZooKeeper and similar systems provide a set of features useful for distributed coordination: linearizable operations, total ordering, failure detection, change notifications.',
        keyPoints: [
          'ZooKeeper: a "coordination kernel" — implements consensus internally, exposes an API for locks, leader election, configuration',
          'Service discovery: find the IP address of the node responsible for a particular service or partition',
          'Membership: which nodes are currently alive and part of the cluster',
          'Work allocation: assign partitions or tasks to nodes, rebalance on failures',
          'These services reduce the need for each application to implement its own consensus',
        ],
        realWorld: ['ZooKeeper', 'etcd', 'Consul', 'Chubby (Google internal)'],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════
  // PART III: Derived Data
  // ═══════════════════════════════════════════════════════════════
  {
    id: 10,
    title: 'Batch Processing',
    part: 3,
    partTitle: 'Derived Data',
    summary: 'Processing large volumes of data by running a job over a bounded input dataset to produce output. Unix pipes pioneered this philosophy; MapReduce scaled it to distributed clusters.',
    concepts: [
      {
        id: 'unix-philosophy',
        name: 'Unix Philosophy and Batch Processing',
        description: 'Unix tools (sort, awk, grep, uniq) compose into powerful data processing pipelines via stdin/stdout. MapReduce is the distributed equivalent of this philosophy.',
        keyPoints: [
          'Unix philosophy: each tool does one thing well, output of one is input to the next, use text as universal interface',
          'Sorting is fundamental: Unix sort can handle datasets larger than memory using disk-backed merge sort',
          'Immutable inputs, append-only outputs: original data is never modified, making it safe to retry and debug',
          'Separation of logic and wiring: the program doesn\'t know where its input comes from or output goes to',
          'Composability: small tools chained together can solve surprisingly complex problems',
        ],
      },
      {
        id: 'mapreduce',
        name: 'MapReduce',
        description: 'A distributed batch processing framework modeled after Unix tools. Map extracts key-value pairs from input; reduce combines all values for a given key.',
        keyPoints: [
          'Map: called once for every input record, extracts key-value pairs — can be parallelized since each record is independent',
          'Shuffle: framework sorts mapper output by key and distributes to reducers — the "sort" step',
          'Reduce: called once per distinct key with all values for that key — combines, counts, or aggregates',
          'Distributed joins: sort-merge join (both datasets sorted by join key, merge in reducer), broadcast hash join (small table broadcasted to all mappers)',
          'Output is written to a distributed filesystem (HDFS) — can be the input to another MapReduce job',
          'Materialization of intermediate state: every MapReduce job writes full output to HDFS — overhead for multi-stage pipelines',
        ],
        tradeoffs: ['Simple programming model but high latency due to sorting and materialization between stages', 'Good for throughput on huge datasets, poor for iterative algorithms (machine learning)'],
        realWorld: ['Hadoop MapReduce', 'Amazon EMR', 'Apache Pig', 'Apache Hive'],
      },
      {
        id: 'beyond-mapreduce',
        name: 'Beyond MapReduce',
        description: 'Dataflow engines like Spark, Tez, and Flink generalize MapReduce by allowing flexible DAGs of operators instead of rigid map-then-reduce stages.',
        keyPoints: [
          'Dataflow engines: arbitrary DAGs of operators, not just map→reduce — more flexible than MapReduce',
          'Operators can be chained without materializing intermediate state — pipelined through memory',
          'Fault tolerance: recompute from lineage (Spark RDDs) rather than materializing everything',
          'Sort only when needed: if the downstream operator doesn\'t need sorted input, skip sorting — saves time',
          'High-level APIs: SQL-like (Spark SQL, Hive on Tez) for ease of use',
          'Graph processing: iterative algorithms on graph data — Pregel model (BSP: Bulk Synchronous Parallel)',
        ],
        realWorld: ['Apache Spark', 'Apache Flink', 'Apache Tez', 'Google Dataflow', 'Pregel (Google), Giraph (Apache)'],
      },
    ],
  },
  {
    id: 11,
    title: 'Stream Processing',
    part: 3,
    partTitle: 'Derived Data',
    summary: 'Processing data as it arrives, in an unbounded, never-ending stream. Events are produced by one component and consumed by another, often through a message broker.',
    concepts: [
      {
        id: 'event-streams',
        name: 'Event Streams and Message Brokers',
        description: 'An event is an immutable record of something that happened. A message broker (event log) is the intermediary between producers and consumers.',
        keyPoints: [
          'Direct messaging (UDP multicast, ZeroMQ): fast but message loss is possible if consumer is slow or crashes',
          'Message brokers (RabbitMQ): queue messages, redeliver on failure — but typically delete messages after acknowledgment',
          'Log-based message brokers: append events to an ordered log, consumers read at their own pace — messages are retained',
          'Partitioned log: each partition is an ordered, append-only log — different partitions can be consumed in parallel',
          'Consumer offsets: each consumer tracks its position in the log — enables replay and re-processing',
        ],
        tradeoffs: ['Traditional broker (RabbitMQ): flexible routing but message ordering not guaranteed across consumers', 'Log-based (Kafka): strong ordering within partition, replay capability, but less flexible routing'],
        realWorld: ['Apache Kafka', 'Amazon Kinesis', 'Apache Pulsar', 'RabbitMQ', 'Google Pub/Sub'],
      },
      {
        id: 'change-data-capture',
        name: 'Change Data Capture (CDC)',
        description: 'Observing all data changes written to a database and extracting them as a stream of events. Keeps derived data systems (search indexes, caches, warehouses) in sync.',
        keyPoints: [
          'The database\'s write-ahead log is a stream of change events — CDC taps into this log',
          'Log compaction: retain only the latest value for each key, discard older versions — allows building a full database copy from the log',
          'Derived data systems as consumers: search index, data warehouse, cache — all consume the same change stream',
          'Event sourcing: a related idea — store every state change as an immutable event, derive current state by replaying',
          'Event sourcing vs CDC: event sourcing stores events at the application level; CDC captures database-level row changes',
          'Commands vs events: a command is a request (may be rejected); an event is a fact (already happened)',
        ],
        realWorld: ['Debezium (CDC for MySQL, PostgreSQL)', 'LinkedIn Databus', 'Kafka Connect', 'DynamoDB Streams'],
      },
      {
        id: 'stream-processing',
        name: 'Stream Processing Patterns',
        description: 'Processing events from streams: filtering, transforming, aggregating, and joining. Stream processing must handle the concept of time and out-of-order events.',
        keyPoints: [
          'Complex event processing (CEP): search for patterns of events matching a rule — like a database query running continuously',
          'Stream-stream joins: joining two event streams within a time window — e.g., correlating user clicks with ad impressions',
          'Stream-table joins: enrich a stream event with data from a database — database can be a changelog stream (CDC)',
          'Table-table joins: both inputs are CDC streams, result is a materialized view kept up to date',
          'Windows: tumbling (fixed-size, non-overlapping), hopping (fixed-size, overlapping), sliding, session',
          'Event time vs processing time: when the event happened vs when it is processed — watermarks track progress in event time',
          'Exactly-once semantics: microbatching (Spark Streaming), checkpointing (Flink), idempotent writes, transactions',
        ],
        tradeoffs: ['Event time processing handles late events correctly but adds complexity (watermarks, allowed lateness)', 'Processing time is simpler but results depend on processing speed, not when events actually occurred'],
        realWorld: ['Apache Flink', 'Apache Kafka Streams', 'Apache Spark Streaming', 'Apache Storm', 'Google Dataflow'],
      },
    ],
  },
  {
    id: 12,
    title: 'The Future of Data Systems',
    part: 3,
    partTitle: 'Derived Data',
    summary: 'Tying together the themes of the book. How to build reliable, correct, and evolvable applications by combining the building blocks discussed throughout.',
    concepts: [
      {
        id: 'data-integration',
        name: 'Data Integration',
        description: 'No single tool can serve all data access patterns. The challenge is keeping derived data (search indexes, caches, materialized views) consistent with the source of truth.',
        keyPoints: [
          'Derived data vs system of record: the system of record is the authoritative source; derived data is redundant but optimized for specific queries',
          'Total ordering of events: if all changes go through a single totally ordered log, derived systems can be kept in sync deterministically',
          'Log as the central integration mechanism: change events flow through the log, consumers build whatever derived view they need',
          'Lambda architecture: batch layer (complete, slow) + speed layer (approximate, fast) — complex to maintain',
          'Unifying batch and stream: process the same log with both batch and stream systems, or use a system that handles both (Flink)',
        ],
        tradeoffs: ['Single log gives strong ordering but can become a bottleneck', 'Lambda architecture handles reprocessing but requires maintaining two separate systems'],
      },
      {
        id: 'unbundling-databases',
        name: 'Unbundling Databases',
        description: 'A traditional database bundles many features (storage, indexes, query engine, transactions, replication). The trend is to unbundle these into composable, specialized components.',
        keyPoints: [
          'Indexes, caches, materialized views are all derived from the base data — like database indexes but across system boundaries',
          'Federated/composed databases: combine specialized storage systems (OLTP, search, OLAP) and keep them in sync via a log',
          'Create derived views by processing the full history of a changelog — like replaying a database\'s WAL',
          'Asynchronous updating of derived views: eventual consistency between source and derived, but deterministic if totally ordered',
          'The dataflow approach: instead of request/response (read from DB when needed), push changes to derived systems proactively',
        ],
      },
      {
        id: 'correctness',
        name: 'Aiming for Correctness',
        description: 'End-to-end correctness requires thinking beyond just the database. Exactly-once semantics, idempotency, and constraint enforcement across distributed systems.',
        keyPoints: [
          'End-to-end argument: reliability features (duplicate suppression, integrity checks) must be implemented at the application level, not just transport level',
          'Exactly-once execution: use idempotent operations — generate a unique ID for each operation, deduplicate at the receiver',
          'Enforcing uniqueness across partitions: funnel all requests for the same value through the same partition',
          'Multi-partition transactions: expensive coordination — consider if eventual consistency + compensation is acceptable',
          'Audit trail: immutable event log allows checking that derived state is consistent with the sequence of events',
        ],
        tradeoffs: ['Strong correctness requires coordination (lower performance)', 'Eventual consistency is faster but harder to reason about from the application perspective'],
      },
      {
        id: 'ethics',
        name: 'Ethics of Data Systems',
        description: 'The power of data systems comes with responsibility. Predictive analytics, surveillance, discrimination, and data ownership are ethical challenges for the field.',
        keyPoints: [
          'Predictive analytics can perpetuate bias and discrimination — "garbage in, garbage out" at scale',
          'Surveillance: systems that track behavior can be misused for control and manipulation',
          'Data as an asset vs data as a liability: data breaches turn stored data into a risk',
          'Right to be forgotten: deleting data is fundamentally at odds with immutable event logs',
          'Feedback loops: automated systems can amplify existing biases through self-reinforcing predictions',
        ],
      },
    ],
  },
];

export function getChaptersByPart(partId: number): Chapter[] {
  return chapters.filter(ch => ch.part === partId);
}

export function getChapter(id: number): Chapter | undefined {
  return chapters.find(ch => ch.id === id);
}

export function getAllConcepts(): Concept[] {
  return chapters.flatMap(ch => ch.concepts);
}
