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
  // Topic 1: Relational Model & SQL (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "What does Third Normal Form (3NF) specifically eliminate that Second Normal Form does not?",
    options: [
      "Repeating groups in columns",
      "Partial dependencies on composite keys",
      "Transitive dependencies — where a non-key column depends on another non-key column",
      "Multi-valued dependencies across tables",
    ],
    answer: 2,
    explanation:
      "3NF builds on 2NF by eliminating transitive dependencies — situations where a non-key column X determines another non-key column Y. For example, if a table has (StudentID, DepartmentID, DepartmentName), DepartmentName transitively depends on StudentID via DepartmentID. 3NF would split DepartmentName into a separate Departments table.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "Why can a CTE (Common Table Expression) be more efficient than a subquery in some databases?",
    options: [
      "CTEs are always materialized and cached",
      "CTEs allow the optimizer to evaluate the expression once and reference it multiple times",
      "CTEs bypass the query parser",
      "CTEs automatically create temporary indexes",
    ],
    answer: 1,
    explanation:
      "In databases like PostgreSQL (pre-12), CTEs are materialized — computed once and stored in a temporary buffer, which avoids re-evaluating complex subqueries that appear multiple times. However, this can also prevent the optimizer from pushing predicates into the CTE. PostgreSQL 12+ made non-recursive CTEs inline by default, allowing the optimizer to treat them like subqueries.",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "What is the main disadvantage of denormalizing a database schema?",
    options: [
      "Slower read queries due to additional JOINs",
      "Higher storage costs from larger indexes",
      "Update anomalies — the same data stored in multiple places can become inconsistent when one copy is updated but others are not",
      "Increased query parsing time",
    ],
    answer: 2,
    explanation:
      "Denormalization deliberately stores redundant copies of data to avoid JOINs, but when the source data changes, all copies must be updated. If any copy is missed, the database contains contradictory information (update anomaly). For example, if a customer's address is stored in both the Customers table and every Order row, updating the address in Customers but not in Orders creates inconsistency.",
  },

  // ============================================================
  // Topic 2: Indexing & Data Structures (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question: "Why do B+ trees link leaf nodes in a doubly-linked list?",
    options: [
      "To speed up single-key lookups",
      "To enable efficient sequential range scans without repeatedly traversing the tree from the root",
      "To reduce the height of the tree",
      "To support concurrent inserts",
    ],
    answer: 1,
    explanation:
      "Once a B+ tree locates the starting leaf for a range query (e.g., WHERE price BETWEEN 10 AND 50), the linked list allows sequential traversal to the ending leaf without climbing back to the root for each subsequent leaf. This makes range scans as efficient as sequential I/O, which is critical for B+ tree performance in databases.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "What is write amplification in the context of LSM trees?",
    options: [
      "The delay caused by writing to the WAL before the memtable",
      "Data being written multiple times due to compaction — once to the memtable, once to L0 SSTable, then again during each compaction level",
      "The overhead of maintaining Bloom filters for each SSTable",
      "Network overhead when replicating writes to follower nodes",
    ],
    answer: 1,
    explanation:
      "In LSM trees, a single logical write is physically written multiple times: first to the WAL, then to the memtable, then flushed as an L0 SSTable, and then rewritten during compaction as data moves through levels (L0 -> L1 -> L2...). Write amplification ratios of 10-30x are common. This is a fundamental tradeoff — LSM trees optimize for sequential writes at the cost of background I/O from compaction.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "When would you choose a hash index over a B-tree index?",
    options: [
      "When you need to sort query results by the indexed column",
      "When queries only use equality predicates (WHERE key = value) and never range scans",
      "When the table has more reads than writes",
      "When the indexed column has low cardinality",
    ],
    answer: 1,
    explanation:
      "Hash indexes provide O(1) lookup for exact-match queries but cannot serve range queries (>, <, BETWEEN), ORDER BY, or prefix matching because the hash function destroys key ordering. B-tree indexes handle all these operations. Hash indexes are ideal for point lookups on high-cardinality columns (e.g., user IDs, session tokens) where you never need ordering.",
  },

  // ============================================================
  // Topic 3: Storage Engines & Pages (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "Why are column-oriented stores significantly faster than row stores for analytical queries like 'SELECT AVG(price) FROM orders'?",
    options: [
      "Column stores use faster disk drives",
      "Column stores only read the price column from disk — row stores must read all columns of every row even though only price is needed",
      "Column stores don't use indexes",
      "Column stores keep data in memory while row stores use disk",
    ],
    answer: 1,
    explanation:
      "In a row store, data is laid out as complete rows on disk pages. To compute AVG(price), the engine reads every row — including all other columns (customer_id, order_date, address, etc.) — wasting I/O bandwidth. A column store stores each column separately, so only the price column is read, dramatically reducing I/O. Additionally, columnar data compresses better (similar values together) and enables vectorized SIMD operations.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "What problem does the WAL (Write-Ahead Log) solve that simply writing dirty pages to disk would not?",
    options: [
      "WAL reduces disk space usage",
      "WAL enables faster full table scans",
      "WAL guarantees that committed transactions survive a crash — even if dirty pages haven't been flushed from the buffer pool yet",
      "WAL eliminates the need for indexes",
    ],
    answer: 2,
    explanation:
      "Without WAL, if the system crashes after committing a transaction but before its dirty pages are flushed to disk, the committed data is lost. The WAL rule ensures that log records describing changes are always flushed to disk before the transaction is reported as committed. On crash recovery, the database replays the WAL to redo committed changes and undo uncommitted ones (ARIES protocol), restoring the database to a consistent state.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "What is buffer pool pollution and how do databases mitigate it?",
    options: [
      "Memory corruption from concurrent writes — solved by locking",
      "A large sequential scan evicting frequently-accessed pages from the buffer pool — mitigated by using separate buffer pools or LRU-K algorithms",
      "Fragmentation of free memory — solved by compaction",
      "Cache entries growing too large — solved by page compression",
    ],
    answer: 1,
    explanation:
      "A one-time sequential scan (e.g., full table scan for a report) touches every page once, filling the LRU buffer pool with pages that won't be accessed again — while evicting frequently-used \"hot\" pages. PostgreSQL uses a clock-sweep algorithm and limits large scans to a small ring buffer. MySQL InnoDB uses a young/old page list where new pages enter the old sublist and only move to the young sublist after a second access within a time window.",
  },

  // ============================================================
  // Topic 4: Query Processing & Optimization (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "Why is join ordering the most impactful decision the query optimizer makes?",
    options: [
      "Different join orders use different lock types",
      "Join order affects which indexes can be used",
      "The number of possible orderings grows factorially with the number of tables — and different orders can differ by orders of magnitude in cost due to intermediate result sizes",
      "Join ordering determines the transaction isolation level",
    ],
    answer: 2,
    explanation:
      "For n tables, there are n!/2 possible join orderings (considering commutativity). Joining a 10-row table with a 1M-row table first (producing ~10 rows) then joining the result with a 100K-row table is vastly cheaper than starting with the two large tables (producing millions of intermediate rows). The optimizer estimates cardinalities at each step to find the cheapest ordering.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "What advantage does a hash join have over a nested-loop join for large unsorted inputs?",
    options: [
      "Hash joins use less memory",
      "Hash joins work on sorted data",
      "Hash joins are O(n + m) — building a hash table on the smaller input and probing with the larger — vs O(n * m) for nested-loop without an index",
      "Hash joins can return results in sorted order",
    ],
    answer: 2,
    explanation:
      "Nested-loop join scans the inner table for every row of the outer table — O(n * m). A hash join builds a hash table on the smaller input (O(m) build phase), then probes it with each row of the larger input (O(n) probe phase), giving O(n + m) total. The tradeoff is that the hash table must fit in memory (or spill to disk with a grace hash join).",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What happens when the optimizer's cardinality estimates are wrong?",
    options: [
      "The query returns incorrect results",
      "The database automatically switches to a different plan mid-execution",
      "The optimizer may choose a catastrophically slow plan — e.g., choosing a nested-loop join over a hash join because it underestimated the number of rows",
      "The query is automatically cancelled",
    ],
    answer: 2,
    explanation:
      "Cost-based optimizers rely on statistics (row counts, distinct values, histograms) to estimate how many rows flow through each operator. If these estimates are wrong (stale statistics, correlated columns, skewed data), the optimizer may choose a plan suited for small data (nested-loop, index scan) when the actual data is large, causing orders-of-magnitude slowdowns. Running ANALYZE to refresh statistics is critical.",
  },

  // ============================================================
  // Topic 5: ACID Transactions (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "What is the write skew anomaly and which isolation level prevents it?",
    options: [
      "Two transactions read the same row and both update it — prevented by Read Committed",
      "Two transactions read overlapping data, make decisions based on what they read, and both write — creating a state that neither transaction alone would have allowed — only Serializable prevents it",
      "A transaction reads uncommitted data from another transaction — prevented by Read Uncommitted",
      "A transaction sees rows inserted by another concurrent transaction — prevented by Repeatable Read",
    ],
    answer: 1,
    explanation:
      "Write skew occurs when two transactions read the same data (e.g., \"at least one doctor must be on call\"), each decides it's safe to proceed (each sees the other doctor is on call), and both make a write (both go off call) — violating the invariant. Snapshot isolation (Repeatable Read in PostgreSQL) does NOT prevent this because each transaction sees a consistent snapshot that included the other doctor. Only Serializable isolation (using serializable snapshot isolation or 2PL) detects and prevents write skew.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "How does MVCC allow readers and writers to not block each other?",
    options: [
      "MVCC locks rows at the page level instead of the row level",
      "Readers always see the latest committed version",
      "Each transaction operates on a snapshot — readers see the version of data as of their snapshot timestamp while writers create new versions, so neither blocks the other",
      "MVCC disables locking entirely",
    ],
    answer: 2,
    explanation:
      "MVCC maintains multiple versions of each row. When a writer modifies a row, it creates a new version rather than overwriting in place. Readers operating under a snapshot see the version valid at their snapshot timestamp, completely ignoring newer versions. This means a reader never needs to wait for a writer's lock, and a writer never blocks readers — they simply operate on different versions of the data.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "Why does PostgreSQL need VACUUM and what happens if it doesn't run?",
    options: [
      "VACUUM defragments index files for faster lookups",
      "VACUUM reclaims space from dead tuples (old row versions) left behind by MVCC — without it the table grows unboundedly and eventually transaction ID wraparound can cause data loss",
      "VACUUM optimizes the query cache",
      "VACUUM rebuilds the WAL for faster crash recovery",
    ],
    answer: 1,
    explanation:
      "PostgreSQL's MVCC implementation stores old row versions (dead tuples) in the main heap table. When a row is updated or deleted, the old version remains until no transaction can see it anymore. VACUUM marks this space as reusable. Without VACUUM, tables bloat continuously. Worse, PostgreSQL uses 32-bit transaction IDs that wrap around after ~2 billion transactions — VACUUM also freezes old transaction IDs to prevent wraparound, which would make data invisible.",
  },

  // ============================================================
  // Topic 6: Concurrency Control & Locking (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "Why does Strict Two-Phase Locking (Strict 2PL) hold all locks until the transaction commits?",
    options: [
      "To minimize the total number of locks acquired",
      "To ensure that no other transaction can read dirty data from a transaction that might later abort — preventing cascading aborts",
      "To reduce CPU overhead from lock management",
      "To enable parallel execution of transactions",
    ],
    answer: 1,
    explanation:
      "If a transaction releases a lock before committing, another transaction could read the released data. If the first transaction then aborts, the second has read data that never existed (dirty read), potentially cascading the abort. Strict 2PL holds all locks until commit/abort, ensuring that any data read by other transactions is from committed transactions only. This prevents cascading aborts and provides recoverability.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "What is the main disadvantage of optimistic concurrency control under high contention?",
    options: [
      "It requires more memory for lock tables",
      "It cannot detect write-write conflicts",
      "Transactions do all their work then abort and retry at validation — wasting CPU and I/O proportional to the conflict rate",
      "It doesn't support read operations",
    ],
    answer: 2,
    explanation:
      "OCC lets transactions execute without acquiring locks, then validates at commit time. Under high contention, many transactions will discover conflicts at validation and must abort and retry — wasting all the work done during execution. The higher the conflict rate, the more wasted work. Under low contention, OCC outperforms locking (no lock overhead), but under high contention, the retry cost makes it significantly worse.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question: "How does a wait-for graph detect deadlocks?",
    options: [
      "It tracks the total time each transaction has been running",
      "It records which transactions are waiting for locks held by other transactions — a cycle in this directed graph indicates deadlock",
      "It counts the number of locks each transaction holds",
      "It monitors CPU usage of each transaction",
    ],
    answer: 1,
    explanation:
      "The wait-for graph has transactions as nodes and directed edges from a waiting transaction to the transaction holding the desired lock. For example, T1->T2 means T1 is waiting for a lock held by T2. If there's a cycle (T1->T2->T3->T1), those transactions are deadlocked — each is waiting for a resource held by another in the cycle. The database detects this cycle and aborts one transaction (the victim) to break the deadlock.",
  },

  // ============================================================
  // Topic 7: Distributed Transactions (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question: "What makes Two-Phase Commit (2PC) a blocking protocol?",
    options: [
      "It blocks read queries during the prepare phase",
      "If the coordinator crashes after sending prepare but before sending the commit/abort decision, participants that voted 'yes' are stuck holding locks indefinitely — they cannot safely commit or abort without the coordinator's decision",
      "It requires all participants to run on the same operating system",
      "Network latency between phases causes blocking",
    ],
    answer: 1,
    explanation:
      "In 2PC, once a participant votes \"yes\" in the prepare phase, it has promised to commit if told to do so. If the coordinator crashes before delivering the final decision, participants cannot unilaterally decide — committing might violate atomicity (if others were told to abort), and aborting breaks the promise. They must wait for the coordinator to recover. This is the fundamental limitation of 2PC and why 3PC and consensus-based approaches were developed.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "How do Sagas differ from distributed ACID transactions?",
    options: [
      "Sagas use stronger isolation than ACID",
      "Sagas are faster because they use two-phase commit internally",
      "Sagas break the transaction into local transactions with compensating actions — providing atomicity through compensation but sacrificing isolation (intermediate states are visible)",
      "Sagas only work with NoSQL databases",
    ],
    answer: 2,
    explanation:
      "A distributed ACID transaction (2PC) holds locks across all participants until commit, providing isolation. A Saga splits the work into independent local transactions, each immediately committed. If step 3 fails, compensating transactions undo steps 2 and 1. This means intermediate states are visible to other transactions (no isolation), and compensating actions must be carefully designed. Sagas provide ACD (no I) but avoid the blocking problem of 2PC.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question: "What does Raft's leader election mechanism ensure?",
    options: [
      "That the node with the most data becomes leader",
      "That at most one leader exists per term — using randomized election timeouts so followers become candidates at different times, ensuring a single winner in most cases",
      "That the oldest node always becomes leader",
      "That leader election completes in exactly one round trip",
    ],
    answer: 1,
    explanation:
      "In Raft, each node has a randomized election timeout. When a follower's timer expires without hearing from a leader, it increments the term, votes for itself, and requests votes from others. Because timeouts are randomized, typically only one node times out first, wins the election with a majority of votes, and becomes the sole leader for that term. If two candidates split the vote, a new election with fresh random timeouts resolves it.",
  },

  // ============================================================
  // Topic 8: Replication (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "What is the fundamental tradeoff between synchronous and asynchronous replication?",
    options: [
      "Synchronous uses more network bandwidth",
      "Synchronous guarantees the replica has every committed write but adds latency to every commit; asynchronous is faster but the replica may lag and lose data on failover",
      "Asynchronous replication doesn't support read replicas",
      "Synchronous replication only works within a single data center",
    ],
    answer: 1,
    explanation:
      "Synchronous replication waits for the replica to acknowledge every write before confirming the commit — guaranteeing the replica is up-to-date but adding network round-trip latency to every transaction. Asynchronous replication confirms the commit immediately and streams changes to the replica in the background — faster writes but the replica may lag behind. If the primary fails with async replication, recent committed writes not yet replicated are lost.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "What conflict resolution strategy does 'last-writer-wins' (LWW) use, and what is its weakness?",
    options: [
      "LWW merges all conflicting writes into a single combined value",
      "LWW uses the write with the highest timestamp and silently discards concurrent writes — its weakness is data loss since valid concurrent writes are dropped",
      "LWW requires manual intervention for every conflict",
      "LWW aborts all conflicting transactions",
    ],
    answer: 1,
    explanation:
      "LWW attaches a timestamp to each write and, when conflicts occur (concurrent writes to the same key from different leaders), keeps only the one with the highest timestamp. All other concurrent writes are silently discarded. This is simple and guarantees convergence, but it loses data — perfectly valid writes are thrown away. Clock skew between nodes can make this even worse, as the \"latest\" timestamp may not correspond to the actually latest write.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "How does a quorum system (R + W > N) ensure consistency in leaderless replication?",
    options: [
      "It requires all N replicas to agree on every operation",
      "It ensures that every read overlaps with at least one replica that has the latest write — because R readers and W writers together exceed N total replicas, at least one node is in both sets",
      "It uses a coordinator to order all writes",
      "It locks all replicas during writes",
    ],
    answer: 1,
    explanation:
      "With N replicas, if writes go to at least W replicas and reads query at least R replicas, and R + W > N, then there's guaranteed overlap — at least one replica in the read set has seen the latest write. The reader compares version numbers from all R responses and uses the newest value. For example, with N=3, W=2, R=2: the write is on 2 out of 3 replicas, and reading from any 2 replicas guarantees hitting at least one with the latest value.",
  },

  // ============================================================
  // Topic 9: Partitioning & Sharding (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "Why does consistent hashing minimize data movement when adding or removing nodes?",
    options: [
      "Consistent hashing doesn't actually move any data",
      "Consistent hashing assigns each node a position on a hash ring — when a node is added it only takes keys from its neighbors on the ring rather than reshuffling all keys",
      "Consistent hashing uses a centralized directory to track all keys",
      "Consistent hashing replicates all keys to all nodes",
    ],
    answer: 1,
    explanation:
      "In simple hash(key) % N, changing N reshuffles almost all keys. Consistent hashing maps both keys and nodes to positions on a hash ring. Each key belongs to the nearest node clockwise. When a new node is added at position P, it only takes keys between P and the previous node — all other keys stay where they are. On average, only K/N keys move (where K is total keys and N is number of nodes), vs K*(N-1)/N with simple modular hashing.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "What is the scatter-gather problem with local secondary indexes in partitioned systems?",
    options: [
      "Local indexes consume too much storage",
      "Local indexes can't be updated atomically",
      "A query on a secondary index must be sent to ALL partitions because each partition only indexes its own data — then results from all partitions are gathered and merged, adding latency proportional to the slowest partition",
      "Local indexes don't support range queries",
    ],
    answer: 2,
    explanation:
      "With local (document-partitioned) secondary indexes, each partition maintains an index covering only its local data. A query like \"find all orders with status='pending'\" has no way to know which partitions contain matching rows, so it must query every partition, wait for all responses, and merge the results. The latency is determined by the slowest partition (tail latency). This is why global (term-partitioned) indexes exist — they allow targeted reads but complicate writes.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "What problem do virtual nodes (vnodes) solve in consistent hashing?",
    options: [
      "Virtual nodes encrypt data for security",
      "Virtual nodes allow nodes to store more data",
      "Virtual nodes give each physical node multiple positions on the hash ring — producing a more uniform data distribution and enabling proportional load based on node capacity",
      "Virtual nodes speed up hash computation",
    ],
    answer: 2,
    explanation:
      "With one position per node on the hash ring, data distribution can be very uneven — a node might get a large arc of the ring by chance. Virtual nodes assign each physical node many positions (e.g., 256 vnodes per node), spreading its responsibility across the ring. This averages out the key distribution. It also allows heterogeneous hardware — a more powerful node can be assigned more vnodes to handle a proportionally larger share of data and traffic.",
  },

  // ============================================================
  // Topic 10: NoSQL Data Models (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "When would you choose a document database over a relational database?",
    options: [
      "When your data has many-to-many relationships requiring complex JOINs",
      "When your data is naturally hierarchical (nested objects) with few cross-document relationships — each document is a self-contained aggregate that maps directly to application objects",
      "When you need strong multi-document ACID transactions",
      "When you need to enforce a strict schema across all records",
    ],
    answer: 1,
    explanation:
      "Document databases excel when data naturally forms self-contained aggregates — like a product listing with nested reviews, specs, and images. The entire aggregate is fetched in a single read without JOINs. However, if your data has many cross-references (many-to-many relationships), you'll end up doing application-level joins or denormalizing heavily, negating the document model's advantages. For highly relational data, a relational database is more appropriate.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What advantage does index-free adjacency give graph databases for relationship traversal?",
    options: [
      "It eliminates the need for any indexes in the database",
      "It stores data in a column-oriented format for faster scans",
      "Each node physically stores direct pointers to its neighboring nodes — making relationship traversal O(1) per hop regardless of total graph size, unlike relational JOINs which depend on index lookups or table scans",
      "It compresses relationship data for smaller storage footprint",
    ],
    answer: 2,
    explanation:
      "In a relational database, following a relationship requires an index lookup or hash join — cost depends on table size. With index-free adjacency (used by Neo4j), each node contains a direct physical pointer (reference) to its adjacent nodes. Traversing a relationship is a simple pointer dereference — O(1) — regardless of whether the graph has 100 or 100 million nodes. This makes multi-hop queries (friends-of-friends, shortest path) dramatically faster than recursive JOINs.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question: "Why do wide-column stores use column families?",
    options: [
      "Column families limit the number of columns per row for performance",
      "Column families group related columns that are frequently accessed together and are stored contiguously on disk — optimizing I/O for common access patterns",
      "Column families enforce schema constraints similar to relational tables",
      "Column families are required by the Cassandra Query Language (CQL)",
    ],
    answer: 1,
    explanation:
      "Column families in Bigtable-style databases (Cassandra, HBase) group columns that are typically accessed together into a storage unit. Since columns within a family are stored contiguously on disk, reading one column family doesn't require reading data from other families. For example, a user profile might have a \"basic\" family (name, email) and a \"preferences\" family (theme, language) — accessing basic info doesn't read preferences data.",
  },

  // ============================================================
  // Topic 11: Caching & Performance (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "What is the cache stampede (thundering herd) problem and how is it prevented?",
    options: [
      "Too many cache entries consuming all memory — prevented by setting max memory limits",
      "When a popular cache entry expires many concurrent requests simultaneously miss the cache and all hit the database — prevented by request coalescing (only one request regenerates the entry while others wait)",
      "Cache data becoming corrupted — prevented by checksums",
      "Cache servers becoming unreachable — prevented by replication",
    ],
    answer: 1,
    explanation:
      "When a heavily-accessed cache entry expires (or the cache is cold), thousands of concurrent requests may simultaneously discover the cache miss and all query the database to regenerate the value. This can overwhelm the database. Solutions include: mutex/lock so only one request regenerates while others wait, probabilistic early expiration (regenerate before actual expiry), and request coalescing (batch concurrent requests for the same key into a single database query).",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "What is the fundamental tradeoff between cache-aside and write-through caching?",
    options: [
      "Cache-aside is faster for reads; write-through is faster for writes",
      "Cache-aside only caches data on read misses (lazy) leading to potential staleness but simple implementation; write-through writes to cache and DB synchronously ensuring freshness but adding latency to every write",
      "Write-through doesn't support eviction; cache-aside does",
      "Cache-aside requires more memory than write-through",
    ],
    answer: 1,
    explanation:
      "Cache-aside populates the cache only when a read miss occurs — the first request after an update reads stale data until the TTL expires and the cache is refreshed. Write-through updates the cache synchronously on every write, so the cache is always fresh — but every write now has the latency of two writes (cache + database). The choice depends on whether your workload is read-heavy (cache-aside) or needs strong cache consistency (write-through).",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "How do materialized views differ from regular database views?",
    options: [
      "Materialized views support more complex SQL syntax",
      "Regular views are virtual (query is re-executed each time) while materialized views physically store the query results on disk — trading storage for read performance",
      "Materialized views automatically update in real-time; regular views require manual refresh",
      "Regular views can't be indexed; materialized views can only be indexed",
    ],
    answer: 1,
    explanation:
      "A regular view is just a stored query — every time you SELECT from it, the underlying query runs again. A materialized view computes the query once and stores the results as a physical table on disk. Reading from it is as fast as reading a regular table. The tradeoff is that materialized views can become stale — they must be explicitly refreshed (full or incremental) when underlying data changes, and they consume storage space for the precomputed results.",
  },

  // ============================================================
  // Topic 12: Database Security & Reliability (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "Why are parameterized queries the primary defense against SQL injection?",
    options: [
      "Parameterized queries encrypt the SQL statement",
      "Parameterized queries run faster than dynamic SQL",
      "Parameterized queries separate SQL code from data — the database engine treats parameter values as literal data never as executable SQL syntax, making it impossible for injected input to alter the query structure",
      "Parameterized queries automatically validate input data types",
    ],
    answer: 2,
    explanation:
      "In a parameterized query like 'SELECT * FROM users WHERE id = $1', the SQL structure is compiled first, then the parameter value is bound separately. Even if the input is \"1; DROP TABLE users\", the database treats the entire string as a literal value for comparison — it cannot be interpreted as SQL syntax. This is fundamentally different from string concatenation ('...WHERE id = ' + userInput), where the input becomes part of the SQL syntax and can alter the query structure.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "What is the purpose of Row-Level Security (RLS) in PostgreSQL?",
    options: [
      "RLS encrypts individual rows with different keys",
      "RLS prevents rows from being deleted",
      "RLS adds policies that filter which rows a user can see or modify based on their identity — enabling multi-tenant data isolation within a single table",
      "RLS compresses rows to reduce storage",
    ],
    answer: 2,
    explanation:
      "RLS policies are expressions evaluated for each row that determine whether the current user can SELECT, INSERT, UPDATE, or DELETE that row. For example, a policy 'USING (tenant_id = current_setting('app.tenant_id'))' ensures each tenant only sees their own rows — even if they try to query without a WHERE clause. This enforces data isolation at the database level, providing defense-in-depth beyond application-level filtering.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "What does Transparent Data Encryption (TDE) protect against, and what doesn't it protect against?",
    options: [
      "TDE protects against network eavesdropping but not physical theft",
      "TDE protects against physical theft of disk/backups (data at rest) but NOT against SQL injection or compromised database credentials — a logged-in user sees decrypted data normally",
      "TDE protects against all forms of unauthorized access",
      "TDE only protects against ransomware attacks",
    ],
    answer: 1,
    explanation:
      "TDE encrypts data files, WAL, and backups at the storage level — if someone steals the hard drive or backup tape, the data is unreadable without the encryption key. However, TDE is transparent to authenticated users — the database decrypts data automatically for any user who connects with valid credentials. TDE does NOT protect against SQL injection (which runs queries as the application user), compromised passwords, or an insider with database access.",
  },

  // ============================================================
  // Topic 13: Cloud & Specialized Databases (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "How does Amazon Aurora achieve faster failover than traditional MySQL replication?",
    options: [
      "Aurora uses faster network connections between nodes",
      "Aurora's shared distributed storage layer means a new compute node can immediately access all data without copying — failover only requires starting a new compute instance, not replicating data",
      "Aurora pre-warms standby instances with all cached data",
      "Aurora uses synchronous replication to a hot standby in the same availability zone",
    ],
    answer: 1,
    explanation:
      "Traditional MySQL replication copies the entire dataset to replicas, so promoting a replica requires it to have caught up with all changes. Aurora separates compute from storage — the storage layer is a shared, distributed, replicated service. When the primary fails, a read replica is promoted — since it already shares the same storage, there's no data to copy. Failover typically completes in under 30 seconds. The storage layer handles replication independently (6-way across 3 AZs).",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "What makes Google Spanner unique in providing globally distributed strong consistency?",
    options: [
      "Spanner uses faster fiber optic cables between data centers",
      "Spanner uses a distributed consensus algorithm without any clock synchronization",
      "Spanner's TrueTime API uses GPS receivers and atomic clocks to provide bounded clock uncertainty — enabling it to assign globally ordered timestamps to transactions and wait out the uncertainty to guarantee external consistency",
      "Spanner only operates within a single geographic region",
    ],
    answer: 2,
    explanation:
      "Most distributed systems can't rely on clocks because they can be skewed. Spanner's TrueTime API returns a time interval [earliest, latest] rather than a single timestamp, with bounded uncertainty (typically <7ms). When committing, Spanner waits out the uncertainty interval before reporting success — guaranteeing that the commit timestamp is in the past by the time the client sees it. This enables globally ordered timestamps without the blocking of traditional 2PC across regions.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question: "What is HTAP and what problem does it solve?",
    options: [
      "HTAP is a backup protocol that combines full and incremental backups",
      "HTAP is a security protocol for encrypting database traffic",
      "HTAP (Hybrid Transactional/Analytical Processing) combines OLTP and OLAP in a single database — eliminating the need to ETL data from an operational database to a separate analytics warehouse",
      "HTAP is a replication protocol for multi-region databases",
    ],
    answer: 2,
    explanation:
      "Traditionally, OLTP databases handle live transactions while separate OLAP data warehouses handle analytics, connected by ETL pipelines that introduce latency and complexity. HTAP databases (TiDB, SingleStore, CockroachDB) serve both workloads from one system — using techniques like row-store + column-store hybrid engines, or replicating data in both formats internally. This eliminates ETL delays, providing real-time analytics on live operational data.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
