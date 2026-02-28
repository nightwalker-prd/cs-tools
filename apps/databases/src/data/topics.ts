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
  { id: 1, title: 'Foundations & Storage' },
  { id: 2, title: 'Transactions & Concurrency' },
  { id: 3, title: 'Distributed Data' },
  { id: 4, title: 'Advanced & Operational' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Foundations & Storage (Topics 1-4)
  // ============================================================
  {
    id: 1,
    title: 'Relational Model & SQL',
    part: 1,
    partTitle: 'Foundations & Storage',
    summary:
      'The relational model organizes data into tables with typed columns and relationships enforced by constraints \u2014 along with SQL as the declarative query language for defining, manipulating, and querying that data.',
    concepts: [
      {
        id: 'schema-design',
        name: 'Schema Design & Data Modeling',
        description:
          'Relations (tables) with typed columns, primary/foreign keys, and constraints define the logical structure of data.',
        keyPoints: [
          'Tables are relations with columns as attributes \u2014 each row is a tuple representing one entity instance with a fixed set of typed fields',
          'Primary keys uniquely identify rows \u2014 either natural keys (e.g., email) or surrogate keys (auto-incrementing integers or UUIDs)',
          'Foreign keys enforce referential integrity \u2014 a column in one table must reference an existing primary key in another table, preventing orphan records',
          'CHECK constraints and NOT NULL enforce data validation rules at the database level, catching invalid data regardless of which application writes it',
          'Entity-relationship (ER) modeling maps real-world domains to tables \u2014 entities become tables, relationships become foreign keys or junction tables for many-to-many associations',
        ],
        tradeoffs: [
          'Rigid schemas catch errors early and enforce data quality, but resist change \u2014 ALTER TABLE on large tables can lock the table and take hours',
          'Normalization reduces redundancy and update anomalies, but increases JOIN complexity and can hurt read performance on analytical queries',
        ],
        realWorld: [
          'PostgreSQL schemas with declarative constraints and domain types for type safety',
          'MySQL InnoDB tables with foreign key enforcement and cascading deletes',
          'Oracle database design with advanced constraint types and materialized zone maps',
        ],
      },
      {
        id: 'sql-language',
        name: 'SQL Query Language',
        description:
          'Structured Query Language is the declarative standard for querying and manipulating relational data \u2014 SELECT, INSERT, UPDATE, DELETE plus DDL for schema management.',
        keyPoints: [
          'SELECT with WHERE/GROUP BY/HAVING/ORDER BY provides a composable pipeline for data retrieval \u2014 filtering rows, grouping for aggregation, filtering groups, and sorting results',
          'JOINs combine data across tables \u2014 INNER (matching rows only), LEFT/RIGHT (preserve one side), FULL (preserve both sides), and CROSS (cartesian product)',
          'Subqueries and CTEs (WITH clause) decompose complex queries into readable, reusable logical blocks \u2014 CTEs can be recursive for hierarchical data (org charts, bill of materials)',
          'Window functions (ROW_NUMBER, RANK, LAG/LEAD, SUM OVER) perform calculations across related rows without collapsing them \u2014 essential for analytics like running totals and moving averages',
          'EXPLAIN/ANALYZE reveals the query execution plan \u2014 showing which indexes are used, join strategies chosen, and actual vs estimated row counts for performance tuning',
        ],
        tradeoffs: [
          'Declarative syntax hides execution complexity (the optimizer decides how to execute), but can produce slow plans when statistics are stale or the query shape confuses the optimizer',
          'Standard SQL is portable across databases, but each DBMS adds proprietary extensions (PostgreSQL LATERAL, MySQL optimizer hints, Oracle CONNECT BY) that create vendor lock-in',
        ],
        realWorld: [
          'PostgreSQL\'s advanced SQL features including LATERAL joins, JSONB operators, and full-text search with tsvector/tsquery',
          'MySQL\'s optimizer hints and index hints for guiding query execution in performance-critical applications',
          'Amazon Redshift SQL for analytics with distribution keys, sort keys, and columnar-aware query execution',
        ],
      },
      {
        id: 'normalization',
        name: 'Normalization & Denormalization',
        description:
          'Normalization eliminates data redundancy through normal forms (1NF through BCNF/5NF), while denormalization intentionally re-introduces redundancy for read performance.',
        keyPoints: [
          '1NF eliminates repeating groups \u2014 each cell contains atomic (indivisible) values, and each row is uniquely identifiable',
          '2NF removes partial dependencies \u2014 every non-key column depends on the full composite primary key, not just a subset of it',
          '3NF removes transitive dependencies \u2014 non-key columns depend only on the primary key, not on other non-key columns (e.g., zip code should not determine city in an orders table)',
          'Denormalization precomputes JOINs by storing redundant copies of data for faster reads \u2014 trading write complexity and storage for query performance',
          'Over-normalization leads to excessive JOINs in read-heavy workloads \u2014 a query touching 10+ tables becomes slow and hard to optimize regardless of indexing',
        ],
        tradeoffs: [
          'Normalization ensures consistency and eliminates update anomalies, but slows reads with many JOINs across highly decomposed tables',
          'Denormalization speeds reads dramatically but risks data inconsistency (redundant copies diverging) and complicates write logic with multi-table updates',
        ],
        realWorld: [
          'OLTP systems normalized to 3NF for transactional integrity in banking and e-commerce applications',
          'Data warehouses using star schemas (one fact table, multiple dimension tables) and snowflake schemas for analytical workloads',
          'Facebook denormalizing user feed data for read performance \u2014 storing precomputed feed entries rather than assembling from normalized social graph tables at query time',
        ],
      },
    ],
  },

  {
    id: 2,
    title: 'Indexing & Data Structures',
    part: 1,
    partTitle: 'Foundations & Storage',
    summary:
      'Indexes are auxiliary data structures that trade write overhead and storage for dramatically faster lookups \u2014 from B-trees for range queries to hash indexes for point lookups and LSM trees for write-heavy workloads.',
    concepts: [
      {
        id: 'btree-indexes',
        name: 'B-Trees & B+ Trees',
        description:
          'B+ trees are the default index structure in most relational databases \u2014 balanced trees where internal nodes contain keys for navigation and leaf nodes store pointers to actual data rows, connected in a linked list for efficient range scans.',
        keyPoints: [
          'O(log n) lookup, insert, and delete \u2014 typically 3-4 levels deep for millions of rows, meaning any row can be found with 3-4 disk page reads',
          'Leaf nodes are linked in a doubly-linked list for sequential range scans without needing to traverse back up and down the tree',
          'Clustered indexes store actual row data in the leaf nodes (e.g., InnoDB primary key) \u2014 the table is physically ordered by the index key',
          'Covering indexes include all columns needed by a query, enabling index-only scans that never access the heap (base table) at all',
          'Page splits occur when inserting into a full leaf node \u2014 the node is divided in two, causing additional I/O and potential fragmentation that degrades scan performance over time',
        ],
        tradeoffs: [
          'Excellent for range queries and ordered access (ORDER BY, BETWEEN, LIKE prefix%), but random inserts cause page splits and fragmentation requiring periodic maintenance (REINDEX)',
          'Write amplification from maintaining the B-tree on every insert, update, and delete \u2014 each write may cascade changes up multiple tree levels and trigger page splits',
        ],
        realWorld: [
          'PostgreSQL btree indexes \u2014 the default index type, used automatically for primary keys and UNIQUE constraints',
          'MySQL InnoDB clustered indexes where the primary key IS the table \u2014 secondary indexes store the primary key value as their pointer, causing a double lookup',
          'Oracle index-organized tables (IOTs) that store the entire row within the B-tree leaf for tables accessed primarily by primary key',
        ],
      },
      {
        id: 'hash-indexes',
        name: 'Hash Indexes',
        description:
          'Hash indexes map keys through a hash function to bucket locations for O(1) point lookups \u2014 extremely fast for equality comparisons but useless for range queries.',
        keyPoints: [
          'O(1) average-case lookup by hashing the key to a bucket \u2014 significantly faster than B-tree O(log n) for pure equality predicates',
          'Only supports equality predicates (= and IN), not range queries (<, >, BETWEEN) or ORDER BY \u2014 because hashing destroys key ordering',
          'Hash collisions are handled by chaining (linked list per bucket) or open addressing (probing to the next empty slot), affecting worst-case performance',
          'In-memory hash tables are used internally for hash joins during query execution \u2014 the smaller table is built into a hash table, then the larger table probes it',
          'Bitcask storage engine (Riak) keeps all keys in an in-memory hash map pointing to on-disk value locations \u2014 enabling O(1) reads with the constraint that all keys must fit in RAM',
        ],
        tradeoffs: [
          'Constant-time equality lookups are the fastest possible access, but cannot serve ORDER BY, range scans, or prefix matching at all',
          'The entire hash table may need rebuilding (rehashing) if the hash function changes or the number of buckets grows significantly, causing a temporary performance hit',
        ],
        realWorld: [
          'Redis in-memory hash tables for sub-millisecond key-value lookups serving millions of operations per second',
          'PostgreSQL hash indexes \u2014 historically not WAL-logged (crash-unsafe) before PostgreSQL 10, now safe but still rarely preferred over btree',
          'Bitcask (Riak) key-value store using an in-memory hash map with append-only on-disk log files for durability',
        ],
      },
      {
        id: 'lsm-trees',
        name: 'LSM Trees & SSTables',
        description:
          'Log-Structured Merge trees write all data to an in-memory memtable first, then flush sorted runs (SSTables) to disk \u2014 optimizing for write throughput at the cost of read amplification from checking multiple levels.',
        keyPoints: [
          'Writes go to an in-memory sorted structure (memtable, typically a red-black tree or skip list) then flush as immutable sorted runs (SSTables) when the memtable reaches a size threshold',
          'Background compaction merges overlapping SSTables to reclaim space from deleted/overwritten keys and reduce the number of files reads must check',
          'Bloom filters attached to each SSTable allow reads to skip files that definitely do not contain the requested key \u2014 reducing read amplification from O(levels) to typically 1-2 disk reads',
          'Leveled compaction (LevelDB/RocksDB) limits size per level and ensures no overlapping key ranges within a level; size-tiered compaction (Cassandra default) groups similarly-sized SSTables',
          'A write-ahead log (WAL) protects the in-memory memtable against crashes \u2014 on recovery, the WAL is replayed to reconstruct the memtable contents that had not yet been flushed',
        ],
        tradeoffs: [
          'Much higher write throughput than B-trees (sequential I/O only) but reads may need to check multiple SSTable levels before finding the value, especially for keys that do not exist',
          'Compaction consumes significant CPU and I/O bandwidth in the background, which can interfere with foreground read/write operations and cause latency spikes during heavy compaction',
        ],
        realWorld: [
          'RocksDB \u2014 the LSM engine underlying CockroachDB, TiDB (TiKV), and Meta\'s internal services, handling billions of writes per day',
          'Apache Cassandra uses LSM trees with size-tiered or leveled compaction strategies configurable per table',
          'LevelDB (Google) \u2014 the original leveled-compaction LSM implementation, used in Chrome\'s IndexedDB and as the basis for RocksDB',
        ],
      },
    ],
  },

  {
    id: 3,
    title: 'Storage Engines & Pages',
    part: 1,
    partTitle: 'Foundations & Storage',
    summary:
      'Storage engines manage how data is physically laid out on disk \u2014 row-oriented stores for transactional workloads, column-oriented stores for analytics, and the buffer pool that caches frequently accessed pages in memory.',
    concepts: [
      {
        id: 'row-vs-column',
        name: 'Row vs Column Stores',
        description:
          'Row stores keep all columns of a row together on a single page (optimal for OLTP \u2014 read/write entire rows), while column stores keep all values of a single column together (optimal for OLAP \u2014 scan/aggregate specific columns across millions of rows).',
        keyPoints: [
          'Row stores excel at point lookups and transactional updates \u2014 reading or writing one complete row requires accessing only a single page, making OLTP workloads efficient',
          'Column stores enable massive compression ratios (10x-100x) because similar values are stored together, and vectorized CPU execution processes thousands of values per instruction using SIMD',
          'Column stores skip irrelevant columns entirely \u2014 a query selecting 3 columns out of 100 reads only 3% of the data compared to a row store that must read entire rows',
          'Hybrid approaches like PAX (Partition Attributes Across) and row-group formats (Parquet, ORC) combine both \u2014 data is partitioned into row groups, but within each group columns are stored separately',
          'Columnar encoding schemes include run-length encoding (repeated values), dictionary encoding (replace values with integer codes), delta encoding (store differences), and bit-packing for maximum compression',
        ],
        tradeoffs: [
          'Row stores are fast for OLTP (single-row reads and writes) but wasteful for analytical full-column scans that touch only a few columns across millions of rows',
          'Column stores are fast for analytics (aggregations, scans) but expensive for single-row updates \u2014 modifying one row requires updating multiple column files',
        ],
        realWorld: [
          'PostgreSQL (row-oriented) for transactional workloads, with the cstore_fdw/Citus columnar extension for analytical tables',
          'ClickHouse (column-oriented) achieving millions of rows per second for analytics with MergeTree engine and vectorized execution',
          'Apache Parquet (columnar file format) as the standard for data lakes, used by Spark, Presto/Trino, and AWS Athena',
        ],
      },
      {
        id: 'buffer-pool',
        name: 'Buffer Pool Management',
        description:
          'The buffer pool is an in-memory cache of disk pages \u2014 the database reads and writes pages in the buffer pool and a replacement policy (typically LRU or clock) decides which pages to evict when memory is full.',
        keyPoints: [
          'All page accesses go through the buffer pool \u2014 a hit avoids disk I/O entirely, making the difference between microsecond and millisecond access times',
          'Dirty pages (modified in memory but not yet written to disk) are flushed asynchronously by a background writer, batching writes for efficiency',
          'LRU (Least Recently Used) is the most common eviction policy but is vulnerable to sequential scan pollution \u2014 one large table scan can evict all frequently-used pages',
          'Buffer pool hit ratio is a key performance metric \u2014 should be >99% for OLTP workloads; a ratio below 95% indicates the working set exceeds available memory',
          'Page size is typically 8KB (PostgreSQL) or 16KB (MySQL InnoDB) \u2014 larger pages reduce I/O count but waste memory when only a few rows per page are needed',
        ],
        tradeoffs: [
          'Larger buffer pools reduce disk I/O and improve query performance, but consume RAM that could serve application processes or operating system file cache',
          'LRU can be polluted by one-time sequential scans evicting frequently-used hot pages \u2014 mitigated by LRU-K variants, clock sweep (PostgreSQL), or midpoint insertion (InnoDB)',
        ],
        realWorld: [
          'PostgreSQL shared_buffers (typically 25% of RAM) with clock-sweep eviction algorithm to resist scan pollution',
          'MySQL InnoDB buffer pool with midpoint insertion strategy \u2014 new pages enter the middle of the LRU list, not the head, reducing scan pollution',
          'Oracle SGA buffer cache with multiple buffer pools (KEEP, RECYCLE, DEFAULT) for different access patterns',
        ],
      },
      {
        id: 'wal',
        name: 'Write-Ahead Logging (WAL)',
        description:
          'Write-Ahead Logging ensures durability by writing all changes to a sequential log file before modifying the actual data pages \u2014 enabling crash recovery by replaying the log to reconstruct any committed transactions lost in the buffer pool.',
        keyPoints: [
          'WAL rule \u2014 log records must be flushed to stable storage (fsync) before the corresponding dirty data page can be written to disk, guaranteeing recoverability',
          'Sequential log writes are much faster than random data page writes on both spinning disks (100x) and SSDs (10x), because the log is append-only',
          'ARIES recovery protocol uses the WAL for three phases: analysis (determine dirty pages and active transactions), redo (replay all logged changes), and undo (rollback uncommitted transactions)',
          'Log sequence numbers (LSN) on each page track which log records have been applied \u2014 during recovery, only log records with LSN greater than the page\'s LSN need to be replayed',
          'WAL is also the foundation for replication \u2014 streaming replicas consume the WAL feed to stay synchronized with the primary, enabling read scaling and failover',
        ],
        tradeoffs: [
          'WAL adds latency to every commit (must fsync log to disk) but prevents any data loss on crash \u2014 without WAL, committed transactions in the buffer pool would be lost',
          'WAL volume can be significant under heavy write loads (gigabytes per hour), requiring log archiving, rotation, and sufficient disk space management',
        ],
        realWorld: [
          'PostgreSQL WAL (pg_wal directory) with configurable wal_level for replication and point-in-time recovery (PITR) via pg_basebackup and WAL archiving',
          'MySQL InnoDB redo log (ib_logfile0/1) with configurable size \u2014 too small causes excessive checkpointing, too large increases crash recovery time',
          'SQLite WAL mode enabling concurrent readers and a single writer without readers blocking, using a separate WAL file alongside the main database',
        ],
      },
    ],
  },

  {
    id: 4,
    title: 'Query Processing & Optimization',
    part: 1,
    partTitle: 'Foundations & Storage',
    summary:
      'The query optimizer transforms declarative SQL into an efficient physical execution plan \u2014 parsing the query, generating candidate plans with different join orders and access methods, then choosing the cheapest based on statistics about data distribution and index availability.',
    concepts: [
      {
        id: 'query-parsing',
        name: 'Query Parsing & Planning',
        description:
          'The query processor parses SQL text into an abstract syntax tree (AST), validates it against the catalog (schema), and transforms it into a logical query plan expressed as a tree of relational algebra operators.',
        keyPoints: [
          'Lexer/parser converts SQL text into an AST and checks syntax \u2014 detecting errors like missing keywords, unbalanced parentheses, and invalid token sequences before any execution',
          'Semantic analysis validates table names, column names, and data types against the system catalog \u2014 ensuring the query references existing objects with compatible types',
          'The logical plan is a tree of relational operators (Scan, Project, Filter, Join, Aggregate) that defines what data to retrieve without specifying how',
          'View expansion inlines view definitions, and subquery unnesting (decorrelation) transforms correlated subqueries into more efficient JOINs at the logical level',
          'Prepared statements skip parsing on re-execution \u2014 the plan is cached and reused, only re-planned if schema changes or statistics are updated significantly',
        ],
        tradeoffs: [
          'Parsing overhead is minimal for simple queries but complex queries with many CTEs, subqueries, and UNION branches increase planning time \u2014 sometimes to hundreds of milliseconds',
          'Prepared statements save parsing time and enable plan caching, but may produce suboptimal generic plans if parameter values have very different selectivities across executions',
        ],
        realWorld: [
          'PostgreSQL query parser and planner with its rich EXPLAIN output showing both logical and physical plan details',
          'MySQL parser/optimizer with the EXPLAIN FORMAT=TREE output introduced in MySQL 8.0 for hierarchical plan visualization',
          'EXPLAIN ANALYZE output showing actual execution time, rows processed, and loops per node for identifying plan estimation errors',
        ],
      },
      {
        id: 'cost-optimization',
        name: 'Cost-Based Optimization',
        description:
          'The cost-based optimizer estimates the cost (I/O, CPU, memory) of candidate plans using statistics about table sizes, column cardinalities, value distributions (histograms), and index selectivity \u2014 then chooses the plan with the lowest estimated cost.',
        keyPoints: [
          'Statistics include row count, ndistinct (number of distinct values), most-common-values lists, and histograms of value distributions for each column',
          'Selectivity estimation predicts what fraction of rows pass each filter predicate \u2014 e.g., WHERE status = \'active\' might select 30% of rows based on histogram data',
          'Join ordering is the most impactful optimization decision \u2014 n tables have n! possible orderings, and the wrong order can make a query 1000x slower',
          'Dynamic programming explores the full plan space for queries with few tables (typically up to 10-12); genetic algorithms (PostgreSQL GEQO) are used for larger join counts where exhaustive search is impractical',
          'Stale statistics can cause the optimizer to choose catastrophically wrong plans \u2014 e.g., estimating 100 rows when 10 million exist, leading to a nested-loop join instead of a hash join',
        ],
        tradeoffs: [
          'Cost-based optimization usually finds good plans automatically, but occasionally estimates are wildly wrong due to correlated columns, skewed distributions, or stale statistics',
          'Collecting statistics (ANALYZE/UPDATE STATISTICS) takes time and may require sampling large tables, but is essential \u2014 the optimizer is only as good as its statistics',
        ],
        realWorld: [
          'PostgreSQL ANALYZE command and pg_stats system view showing per-column statistics including most common values and histogram bounds',
          'MySQL histogram statistics introduced in 8.0 for non-indexed columns, significantly improving optimizer decisions for skewed data',
          'Oracle cost-based optimizer with adaptive cursor sharing and SQL plan baselines to prevent plan regressions',
        ],
      },
      {
        id: 'execution-strategies',
        name: 'Execution Strategies',
        description:
          'Physical operators implement the logical plan \u2014 choosing between sequential scan vs index scan for access, nested-loop vs hash join vs merge join for joins, and sort vs hash for aggregation and DISTINCT.',
        keyPoints: [
          'Nested-loop join is O(n*m) but efficient when the inner side is indexed (index nested-loop join) \u2014 for each outer row, perform an index lookup on the inner table, achieving effectively O(n * log m)',
          'Hash join builds a hash table on the smaller input then probes with the larger \u2014 O(n+m) time complexity but requires enough memory to hold the hash table (spills to disk if memory is insufficient)',
          'Sort-merge join sorts both inputs on the join key then merges them in a single pass \u2014 efficient when inputs are already sorted (from an index or prior sort) and excellent for range joins',
          'Index-only scan reads data directly from a covering index without accessing the heap table at all \u2014 dramatically reducing I/O for queries where all needed columns are in the index',
          'Pipeline (Volcano/iterator) execution processes rows one-at-a-time through a chain of operators via next() calls; vectorized/batch execution processes arrays of values for better CPU cache utilization and SIMD opportunities',
        ],
        tradeoffs: [
          'Hash joins are fastest for large unsorted equi-joins but require sufficient memory for the hash table \u2014 if the hash table spills to disk, performance degrades significantly',
          'Nested-loop joins shine with small outer tables and indexed inner tables but degrade quadratically on large unindexed inputs, making them catastrophic for the wrong query shape',
        ],
        realWorld: [
          'PostgreSQL EXPLAIN output showing Seq Scan, Index Scan, Bitmap Index Scan, Hash Join, Merge Join, and Nested Loop with actual timing and row counts',
          'MySQL EXPLAIN showing table access types (ALL, index, range, ref, eq_ref, const) indicating progressively more selective access methods',
          'ClickHouse vectorized execution engine processing thousands of rows per function call with SIMD instructions for maximum analytical throughput',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Transactions & Concurrency (Topics 5-7)
  // ============================================================
  {
    id: 5,
    title: 'ACID Transactions',
    part: 2,
    partTitle: 'Transactions & Concurrency',
    summary:
      'ACID properties \u2014 Atomicity, Consistency, Isolation, Durability \u2014 guarantee that database transactions are reliable units of work, even in the presence of concurrent access, crashes, and hardware failures.',
    concepts: [
      {
        id: 'acid-properties',
        name: 'ACID Properties',
        description:
          'Atomicity ensures transactions are all-or-nothing, Consistency ensures transitions between valid states, Isolation controls how concurrent transactions see each other\'s changes, and Durability guarantees committed data survives crashes.',
        keyPoints: [
          'Atomicity \u2014 if any operation in a transaction fails, the entire transaction is rolled back leaving no partial effects; implemented via undo logs that reverse incomplete changes',
          'Consistency \u2014 transactions bring the database from one valid state to another, respecting all constraints (primary keys, foreign keys, CHECK, UNIQUE) and application-level invariants',
          'Isolation \u2014 concurrent transactions appear to execute serially even though they run in parallel, preventing anomalies like dirty reads, non-repeatable reads, and phantom reads',
          'Durability \u2014 once a transaction commits, its changes survive power loss, OS crashes, or hardware failures; implemented via WAL and fsync to stable storage',
          'BASE (Basically Available, Soft-state, Eventually consistent) is the alternative model for distributed systems that intentionally relax ACID for availability and partition tolerance',
        ],
        tradeoffs: [
          'Full ACID guarantees add latency (fsync on every commit for durability, locking or MVCC overhead for isolation) but prevent data corruption and maintain business invariants',
          'Relaxing isolation to lower levels improves concurrency and throughput, but allows anomalies that can cause subtle data inconsistencies in applications that assume stronger guarantees',
        ],
        realWorld: [
          'PostgreSQL provides full ACID compliance with configurable synchronous_commit levels to trade durability for write performance',
          'MySQL InnoDB is the ACID-compliant storage engine (unlike MyISAM which lacks transactions) \u2014 default since MySQL 5.5',
          'Banking systems requiring strict ACID guarantees for fund transfers \u2014 debiting one account and crediting another must be atomic to prevent money from appearing or disappearing',
        ],
      },
      {
        id: 'isolation-levels',
        name: 'Isolation Levels',
        description:
          'SQL defines four isolation levels \u2014 Read Uncommitted, Read Committed, Repeatable Read, and Serializable \u2014 that trade off between consistency anomalies allowed and concurrency/performance.',
        keyPoints: [
          'Read Uncommitted allows dirty reads \u2014 a transaction can see uncommitted changes from other transactions that may later be rolled back, potentially reading data that never actually existed',
          'Read Committed (PostgreSQL default) prevents dirty reads by only showing committed data, but allows non-repeatable reads (same query returns different results) and phantom reads (new rows appear)',
          'Repeatable Read (MySQL InnoDB default) prevents dirty reads and non-repeatable reads by reading from a consistent snapshot, but may allow phantom reads (new rows matching a predicate appear between queries)',
          'Serializable guarantees transactions appear to execute one at a time serially \u2014 no anomalies possible, but lowest concurrency due to predicate locking or serialization conflict detection',
          'Most production applications run at Read Committed or Repeatable Read \u2014 Serializable is used only for critical financial operations or when correctness is paramount',
        ],
        tradeoffs: [
          'Higher isolation prevents more anomalies but reduces throughput \u2014 Serializable can cause significant transaction rollbacks and retries under high contention workloads',
          'Serializable gives the strongest correctness guarantees but can cause serialization failures requiring application-level retry logic, adding development complexity',
        ],
        realWorld: [
          'PostgreSQL defaults to Read Committed and implements Serializable via SSI (Serializable Snapshot Isolation) that detects and aborts conflicting transactions',
          'MySQL InnoDB defaults to Repeatable Read and uses gap locks to prevent phantom reads \u2014 effectively providing snapshot isolation',
          'CockroachDB uses Serializable by default, arguing that weaker levels create subtle bugs that are hard to diagnose in production',
        ],
      },
      {
        id: 'mvcc',
        name: 'Multi-Version Concurrency Control (MVCC)',
        description:
          'MVCC allows readers and writers to operate concurrently without blocking each other by maintaining multiple versions of each row \u2014 readers see a consistent snapshot while writers create new versions rather than overwriting in place.',
        keyPoints: [
          'Each transaction sees a snapshot of the database as of its start time \u2014 reads never block writes and writes never block reads, enabling high concurrency',
          'Each row version has a creation transaction ID and deletion transaction ID defining its visibility window \u2014 a transaction can only see versions created by committed transactions before its snapshot',
          'PostgreSQL stores old row versions in the main heap table alongside current versions, requiring VACUUM to periodically reclaim dead tuples and prevent table bloat',
          'MySQL InnoDB stores current data in the primary key pages and old versions in a separate undo log (rollback segment), reconstructing past versions on demand by applying undo records in reverse',
          'Snapshot isolation via MVCC prevents most anomalies (dirty reads, non-repeatable reads, phantoms) but allows write skew \u2014 two transactions reading overlapping data and making conflicting writes that individually seem valid',
        ],
        tradeoffs: [
          'MVCC eliminates read-write lock conflicts (readers never block writers) but old versions consume storage until garbage collected \u2014 PostgreSQL\'s VACUUM can struggle under heavy update workloads',
          'Snapshot isolation is weaker than true serializability \u2014 write skew anomalies are possible (e.g., two doctors both check they\'re not the last on-call and both take leave, leaving no one on-call)',
        ],
        realWorld: [
          'PostgreSQL MVCC with heap-based versioning and the VACUUM/autovacuum daemon for dead tuple cleanup \u2014 the most critical maintenance process for PostgreSQL performance',
          'MySQL InnoDB MVCC using undo logs in the system tablespace, with purge threads that clean up old undo records no longer needed by any active transaction',
          'Oracle Consistent Read using rollback/undo segments to reconstruct past row versions, with the ORA-01555 "snapshot too old" error when undo is recycled before a long-running query completes',
        ],
      },
    ],
  },

  {
    id: 6,
    title: 'Concurrency Control & Locking',
    part: 2,
    partTitle: 'Transactions & Concurrency',
    summary:
      'Concurrency control mechanisms \u2014 from pessimistic locking (two-phase locking) to optimistic approaches \u2014 ensure that concurrent transactions produce correct results while maximizing throughput.',
    concepts: [
      {
        id: 'two-phase-locking',
        name: 'Two-Phase Locking (2PL)',
        description:
          'Two-Phase Locking ensures serializability by requiring that a transaction acquires all its locks in a growing phase and releases them only in a shrinking phase \u2014 once any lock is released, no new locks can be acquired.',
        keyPoints: [
          'Growing phase \u2014 the transaction acquires locks (shared for reads, exclusive for writes) as it accesses data, accumulating more locks over its lifetime',
          'Shrinking phase \u2014 in strict 2PL (most common), the transaction releases all locks only at commit or abort time, preventing other transactions from seeing intermediate states',
          'Shared (S) locks allow multiple concurrent readers; exclusive (X) locks block all other access including other readers, creating a mutual exclusion on the locked resource',
          'Lock granularity ranges from row-level (highest concurrency, most overhead) to page-level (compromise) to table-level (lowest concurrency, least overhead)',
          'Lock escalation automatically promotes many fine-grained row locks to a single coarser table lock to conserve lock manager memory when a transaction locks a large percentage of a table',
        ],
        tradeoffs: [
          'Two-phase locking guarantees serializability (the gold standard of correctness) but can severely limit concurrency under contention, causing transactions to wait in queues',
          'Fine-grained row-level locking increases concurrency but adds significant memory and CPU overhead for the lock manager maintaining potentially millions of lock entries',
        ],
        realWorld: [
          'MySQL InnoDB row-level locking with shared (S) and exclusive (X) locks, plus intention locks (IS, IX) at the table level for lock compatibility checking',
          'SQL Server lock escalation from row to page to table when a transaction exceeds a memory threshold for lock structures',
          'PostgreSQL explicit LOCK TABLE commands for bulk operations, though PostgreSQL primarily relies on MVCC rather than traditional 2PL for concurrency',
        ],
      },
      {
        id: 'optimistic-concurrency',
        name: 'Optimistic Concurrency Control',
        description:
          'Optimistic concurrency control assumes conflicts are rare \u2014 transactions execute without acquiring locks, then validate at commit time that no conflicting modifications occurred, aborting and retrying if conflicts are detected.',
        keyPoints: [
          'Three phases \u2014 read phase (execute against a private snapshot), validation phase (check for conflicts with concurrent transactions), write phase (apply changes to the database if validation passes)',
          'No locks are held during the execution phase, so there is no blocking and deadlocks are structurally impossible',
          'Validation checks whether any data read by the transaction was modified by another committed transaction during the execution window \u2014 if so, the transaction is aborted',
          'High abort rates under contention make OCC expensive \u2014 all work done in the read phase is wasted on abort, and retries compound the problem under sustained contention',
          'Timestamp-based ordering assigns each transaction a unique timestamp and enforces that all reads and writes respect timestamp order, aborting transactions that would violate the ordering',
        ],
        tradeoffs: [
          'OCC avoids all locking overhead and eliminates deadlocks entirely, but wastes significant work when abort rates are high due to frequent write conflicts',
          'Best suited for read-heavy workloads with rare write conflicts \u2014 under high contention, OCC performs worse than pessimistic locking due to the retry overhead',
        ],
        realWorld: [
          'Google Percolator (used by Google\'s web indexing pipeline) uses optimistic cross-row transactions with conflict detection built on Bigtable',
          'CockroachDB uses optimistic transaction execution \u2014 transactions proceed without locks and are restarted if a write-write conflict is detected at commit time',
          'Application-level optimistic locking using version columns (UPDATE ... WHERE version = @old_version) \u2014 common in web frameworks like Rails, Django, and Hibernate',
        ],
      },
      {
        id: 'deadlock-detection',
        name: 'Deadlock Detection & Prevention',
        description:
          'Deadlocks occur when two or more transactions are each waiting for a lock held by the other \u2014 resolved either by detecting the cycle in a wait-for graph and aborting a victim, or by preventing deadlocks with timeout or ordered lock acquisition.',
        keyPoints: [
          'A wait-for graph tracks which transaction is waiting for which lock held by which other transaction \u2014 a cycle in this graph indicates a deadlock that cannot resolve itself',
          'Deadlock detection runs periodically (every second in PostgreSQL by default) or on each lock wait (InnoDB) to find cycles in the wait-for graph',
          'Victim selection typically aborts the transaction that has done the least work (fewest locks held, smallest undo log) to minimize wasted effort and resources',
          'Deadlock prevention strategies include wait-die (older transactions wait, younger ones are aborted and retry) and wound-wait (older transactions preempt younger ones)',
          'Application-level deadlock prevention is achieved by always acquiring locks in a consistent global order \u2014 e.g., always lock rows by ascending primary key to prevent cycles',
        ],
        tradeoffs: [
          'Detection allows maximum concurrency (transactions only wait when truly necessary) but has the overhead of maintaining and periodically checking the wait-for graph',
          'Prevention is simpler to implement and avoids deadlocks entirely, but may abort transactions unnecessarily (conservative) or require application code changes (lock ordering)',
        ],
        realWorld: [
          'PostgreSQL automatic deadlock detection via background process checking the wait-for graph every deadlock_timeout interval (default 1 second)',
          'MySQL InnoDB performs immediate deadlock detection on every lock wait using a depth-first search on the wait-for graph, aborting the victim instantly',
          'Oracle uses timeout-based deadlock detection for distributed transactions across database links, where a global wait-for graph is impractical',
        ],
      },
    ],
  },

  {
    id: 7,
    title: 'Distributed Transactions',
    part: 2,
    partTitle: 'Transactions & Concurrency',
    summary:
      'Distributed transactions coordinate commits across multiple nodes or services \u2014 from the classic Two-Phase Commit protocol to the Saga pattern for long-lived business processes, all built on consensus algorithms like Paxos and Raft.',
    concepts: [
      {
        id: 'two-phase-commit',
        name: 'Two-Phase Commit (2PC)',
        description:
          '2PC is a coordination protocol where a coordinator asks all participants to prepare (vote commit/abort), then in a second phase tells all participants to commit or abort based on the unanimous vote \u2014 ensuring atomicity across multiple nodes.',
        keyPoints: [
          'Phase 1 (prepare) \u2014 the coordinator sends a prepare request to all participants; each participant writes its changes to WAL, acquires all necessary locks, and votes commit or abort',
          'Phase 2 (commit/abort) \u2014 if all participants voted commit, the coordinator sends a global commit; if any participant voted abort, the coordinator sends a global abort to all participants',
          'Participants must hold all locks between the prepare and commit phases \u2014 if the coordinator fails during this window, participants are blocked indefinitely holding locks',
          'The coordinator\'s commit/abort decision is made durable by writing it to its own transaction log before sending the decision to participants, ensuring the decision survives coordinator crashes',
          '2PC is a blocking protocol \u2014 if the coordinator crashes after sending prepare but before sending the commit decision, all participants are stuck in a "prepared" state unable to commit or abort until the coordinator recovers',
        ],
        tradeoffs: [
          '2PC guarantees atomicity across distributed nodes but is blocking \u2014 a single coordinator failure can freeze all participants, and latency is at least 2 network round trips plus forced log writes',
          'Latency of at least 2 round trips (prepare + commit) plus forced log writes at each participant make 2PC significantly slower than local transactions, limiting throughput',
        ],
        realWorld: [
          'PostgreSQL PREPARE TRANSACTION and COMMIT PREPARED commands for explicit two-phase commit in distributed setups',
          'XA distributed transactions in Java (JTA/JTS) coordinating commits across multiple databases and message brokers within a single business transaction',
          'MySQL XA transactions for cross-database atomicity, though rarely used in practice due to performance overhead and operational complexity',
        ],
      },
      {
        id: 'saga-pattern',
        name: 'Saga Pattern',
        description:
          'Sagas break a distributed transaction into a sequence of local transactions, each with a compensating action \u2014 if any step fails, previously completed steps are undone by executing their compensations in reverse order.',
        keyPoints: [
          'Each saga step is a local ACID transaction within a single service that publishes an event or triggers the next step upon completion',
          'Compensating transactions are the semantic inverse of each completed step \u2014 e.g., a "refund payment" compensates a "charge payment," and "release inventory" compensates "reserve inventory"',
          'Choreography-based sagas \u2014 each service listens for events and autonomously decides its next action, creating a decentralized chain of reactions with no central controller',
          'Orchestration-based sagas \u2014 a central saga orchestrator directs the sequence of steps, handles failures, and triggers compensations, providing a single place to understand the workflow',
          'Sagas provide eventual consistency \u2014 intermediate states are visible to other transactions (no isolation), meaning a user might briefly see an order as "confirmed" before payment actually processes',
        ],
        tradeoffs: [
          'Sagas avoid distributed locking and the blocking problems of 2PC, but sacrifice isolation (providing ACD but not full ACID) \u2014 concurrent sagas can interfere with each other',
          'Compensating transactions can be complex to design and some operations are inherently non-reversible (sending an email, charging a credit card) \u2014 requiring idempotent compensations or semantic reversals',
        ],
        realWorld: [
          'Uber trip lifecycle implementing sagas across services: ride matching \u2192 driver dispatch \u2192 trip tracking \u2192 payment processing, with compensations for cancellations at each stage',
          'E-commerce order processing: reserve inventory \u2192 charge payment \u2192 schedule shipping, with compensating actions (release inventory, refund payment) if any step fails',
          'AWS Step Functions providing saga orchestration with built-in compensation support via Catch/Retry/Fail states in the state machine definition',
        ],
      },
      {
        id: 'consensus-algorithms',
        name: 'Consensus (Paxos & Raft)',
        description:
          'Consensus algorithms enable a group of nodes to agree on a single value (or sequence of values) even if some nodes fail \u2014 Paxos is the theoretical foundation, while Raft is designed for understandability with an explicit leader election and log replication protocol.',
        keyPoints: [
          'Consensus requires a majority quorum of nodes to agree \u2014 a cluster of 2f+1 nodes can tolerate f failures while still making progress (e.g., 3 nodes tolerates 1 failure, 5 tolerates 2)',
          'Paxos uses three roles (proposers, acceptors, learners) with two phases (prepare/accept), but is notoriously difficult to implement correctly \u2014 many production implementations have subtle bugs',
          'Raft simplifies consensus with a strong leader that handles all client requests, replicates log entries to followers, and is the single source of truth for the cluster state',
          'Raft leader election uses randomized election timeouts \u2014 if a follower does not receive a heartbeat within its timeout, it becomes a candidate and requests votes from other nodes',
          'Log replication in Raft \u2014 the leader appends entries to its log and sends them to followers; an entry is committed once a majority of followers acknowledge it, and the leader then applies it to its state machine',
        ],
        tradeoffs: [
          'Consensus guarantees strong consistency (all nodes agree on the same sequence of operations) but adds latency from quorum round-trips \u2014 every write must wait for a majority acknowledgment',
          'Leader-based protocols like Raft are simpler to understand and implement, but the leader is a throughput bottleneck since all writes flow through it and a leader failure triggers an election pause',
        ],
        realWorld: [
          'etcd uses Raft for consensus \u2014 the coordination backbone of Kubernetes, storing all cluster state and configuration reliably',
          'Google Chubby lock service and Spanner database use Multi-Paxos variants for consensus across globally distributed datacenters',
          'CockroachDB uses Raft for per-range replication, running thousands of independent Raft groups (one per range) across the cluster',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Distributed Data (Topics 8-10)
  // ============================================================
  {
    id: 8,
    title: 'Replication',
    part: 3,
    partTitle: 'Distributed Data',
    summary:
      'Replication copies data across multiple nodes for fault tolerance, lower latency, and read scalability \u2014 from single-leader architectures to multi-leader and leaderless designs, each with different consistency and conflict-resolution tradeoffs.',
    concepts: [
      {
        id: 'leader-follower',
        name: 'Leader-Follower Replication',
        description:
          'A single leader (primary) handles all writes and propagates changes to read-only followers (replicas) via a replication log \u2014 followers serve read queries to scale read throughput and provide failover capability.',
        keyPoints: [
          'All writes go to the single leader, which streams changes to followers via WAL-based (physical) or logical replication, ensuring followers eventually converge to the same state',
          'Synchronous replication guarantees the follower is fully up-to-date before confirming the write to the client, but adds latency to every write equal to the network round-trip to the follower',
          'Asynchronous replication confirms writes immediately on the leader without waiting for followers, providing faster writes but allowing followers to lag behind (replication lag)',
          'Failover promotes a follower to leader if the primary fails \u2014 risk of data loss if the promoted follower was behind (async replication), and potential split-brain if the old leader comes back',
          'Read-your-writes consistency can be achieved by routing a user\'s reads to the leader (or a guaranteed-up-to-date follower) immediately after that user\'s own writes',
        ],
        tradeoffs: [
          'Simple and well-understood architecture, but the leader is a single point of failure for writes and a throughput bottleneck \u2014 writes cannot be horizontally scaled',
          'Asynchronous replication gives better write performance and availability, but allows stale reads from lagging followers \u2014 a trade-off most applications accept for read scalability',
        ],
        realWorld: [
          'PostgreSQL streaming replication with synchronous_standby_names for configuring which replicas are synchronous vs asynchronous',
          'MySQL binary log (binlog) replication \u2014 the most common MySQL high-availability setup, with GTID-based replication for reliable failover since MySQL 5.6',
          'Amazon RDS read replicas providing up to 15 read replicas per primary instance for read-heavy workloads like reporting and analytics',
        ],
      },
      {
        id: 'multi-leader',
        name: 'Multi-Leader Replication',
        description:
          'Multiple nodes accept writes independently and replicate changes to each other \u2014 useful for multi-datacenter deployments where each datacenter has a local leader, but concurrent writes to different leaders can conflict.',
        keyPoints: [
          'Each leader independently accepts writes with low latency (local datacenter) and asynchronously replicates to other leaders, enabling multi-region write availability',
          'Write conflicts occur when two leaders modify the same row concurrently \u2014 these must be detected (usually when replication streams cross) and resolved automatically or manually',
          'Conflict resolution strategies include last-writer-wins (LWW) using timestamps, converging values by merging, and custom application-level merge functions for domain-specific logic',
          'CRDTs (Conflict-free Replicated Data Types) provide mathematically guaranteed automatic conflict resolution for specific data structures like counters, sets, and registers',
          'Replication topology options include circular (A\u2192B\u2192C\u2192A), star (hub-and-spoke), and all-to-all \u2014 all-to-all is most resilient but generates the most replication traffic',
        ],
        tradeoffs: [
          'Enables writes in multiple datacenters with local latency and survives entire datacenter failures, but conflict resolution is inherently complex and error-prone',
          'Last-writer-wins (LWW) is the simplest conflict resolution but silently drops concurrent writes \u2014 data loss is built into the strategy, which is unacceptable for many use cases',
        ],
        realWorld: [
          'CouchDB multi-master replication with revision trees for conflict tracking and application-level conflict resolution',
          'PostgreSQL BDR (Bi-Directional Replication) for active-active multi-master setups with conflict detection and resolution rules',
          'Multi-datacenter MySQL Group Replication providing automatic conflict detection and distributed consensus among group members',
        ],
      },
      {
        id: 'leaderless',
        name: 'Leaderless Replication (Dynamo-Style)',
        description:
          'All replicas accept reads and writes directly \u2014 clients send requests to multiple replicas in parallel, using quorum conditions (R + W > N) to ensure overlap between read and write sets for consistency.',
        keyPoints: [
          'No single leader exists \u2014 any replica can accept writes, eliminating the need for leader election and failover, and providing continuous availability even when nodes fail',
          'Quorum reads and writes \u2014 with N replicas, write to W nodes and read from R nodes; when R + W > N, at least one node in the read set has the most recent write, ensuring consistency',
          'Sloppy quorums allow writes to go to non-home nodes during a network partition (hinted handoff), maintaining availability at the cost of temporary inconsistency until the home node recovers',
          'Read repair detects stale values during normal read operations by comparing responses from multiple replicas and updating the lagging replicas with the newest value',
          'Anti-entropy is a background process that continuously compares replicas using Merkle trees (hash trees) and repairs any divergence found, ensuring eventual convergence',
        ],
        tradeoffs: [
          'Highly available with no leader failover needed, but quorum coordination adds latency (must wait for multiple responses) and consistency guarantees are probabilistic, not absolute',
          'Sloppy quorums improve availability during network partitions, but temporarily weaken consistency guarantees \u2014 reads may not overlap with the nodes that received the most recent write',
        ],
        realWorld: [
          'Amazon DynamoDB \u2014 inspired by the original Dynamo paper, offering configurable consistency (eventual or strong) per read operation',
          'Apache Cassandra using tunable consistency levels (ONE, QUORUM, ALL) per query, allowing developers to choose the consistency-availability trade-off per operation',
          'Riak KV with configurable N/R/W values, CRDTs for automatic conflict resolution, and active anti-entropy for background replica repair',
        ],
      },
    ],
  },

  {
    id: 9,
    title: 'Partitioning & Sharding',
    part: 3,
    partTitle: 'Distributed Data',
    summary:
      'Partitioning (sharding) splits a large dataset across multiple nodes so each node stores only a subset \u2014 enabling horizontal scaling for both storage and throughput, with strategies for key distribution and secondary index management.',
    concepts: [
      {
        id: 'range-partitioning',
        name: 'Range Partitioning',
        description:
          'Data is split into contiguous ranges of the partition key \u2014 each partition owns a key range (e.g., A-F, G-M, N-Z), enabling efficient range queries within a single partition but risking hot spots if keys are not uniformly distributed.',
        keyPoints: [
          'Partition boundaries are chosen to distribute data evenly \u2014 can be set manually by an administrator or adjusted automatically by the system based on data volume per partition',
          'Range queries on the partition key only need to contact partitions whose key ranges overlap the query range, avoiding full scatter-gather across all partitions',
          'Hot spots occur when writes concentrate on one key range \u2014 e.g., timestamp-based partition keys direct all current writes to the latest partition, overloading a single node',
          'Split and merge operations dynamically adjust partition boundaries as data grows or shrinks \u2014 a partition that grows too large is split in two, and underpopulated partitions can be merged',
          'Secondary indexes within a partition are local to that partition \u2014 queries on secondary indexes that span multiple partitions require scatter-gather across all partitions',
        ],
        tradeoffs: [
          'Efficient range scans on the partition key (only touch relevant partitions) but vulnerable to hot spots on sequential keys like timestamps or auto-incrementing IDs',
          'Automatic range splitting adds operational complexity \u2014 splits can cause brief unavailability and must be coordinated with replication for data safety',
        ],
        realWorld: [
          'HBase region servers automatically split regions when they exceed a size threshold, distributing the two halves across the cluster for load balancing',
          'Google Bigtable tablet splitting based on row key ranges, with the tablet server managing automatic splits and the metadata table tracking tablet locations',
          'CockroachDB automatic range splitting where each range (default 512MB) is independently replicated via Raft and can be moved between nodes for load balancing',
        ],
      },
      {
        id: 'hash-partitioning',
        name: 'Hash Partitioning & Consistent Hashing',
        description:
          'A hash function maps partition keys to a hash space and assigns hash ranges to partitions \u2014 distributes data more uniformly than range partitioning but destroys key ordering, making range queries impossible on the partition key.',
        keyPoints: [
          'Simple hash(key) mod N assigns keys to partitions, but adding or removing nodes (changing N) reshuffles the majority of keys, causing massive data movement',
          'Consistent hashing maps both keys and nodes to positions on a hash ring \u2014 adding a node only moves keys from its immediate neighbors, minimizing data movement to roughly 1/N of all keys',
          'Virtual nodes (vnodes) assign each physical node multiple positions on the ring, creating a more uniform distribution and allowing heterogeneous hardware (more vnodes on more powerful nodes)',
          'Hash partitioning eliminates hot spots for keys that would be sequential (e.g., timestamps hash to random positions) but scatters naturally ordered keys across all partitions',
          'Compound partition keys (Cassandra) hash the first component for partition assignment and range-sort the second component within the partition \u2014 enabling efficient range queries within a partition',
        ],
        tradeoffs: [
          'Uniform data distribution prevents hot spots, but range queries on the partition key require scatter-gather to all partitions since hash ordering differs from key ordering',
          'Consistent hashing minimizes data movement when nodes join or leave, but adds implementation complexity and may still produce uneven distribution without sufficient virtual nodes',
        ],
        realWorld: [
          'Cassandra Murmur3 partitioner hashing partition keys to token ranges distributed across the ring, with vnodes for automatic rebalancing',
          'DynamoDB consistent hashing for automatic partition management \u2014 transparent to the application, with adaptive capacity to handle hot partitions',
          'Redis Cluster dividing the key space into 16,384 hash slots assigned to nodes, with slot migration for online rebalancing when nodes are added or removed',
        ],
      },
      {
        id: 'secondary-indexes',
        name: 'Secondary Indexes in Partitioned Systems',
        description:
          'Secondary indexes on non-partition-key columns create a challenge in partitioned systems \u2014 local (document-partitioned) indexes are fast to write but require scatter-gather on reads, while global (term-partitioned) indexes enable efficient reads but require cross-partition writes.',
        keyPoints: [
          'Local secondary indexes \u2014 each partition maintains its own index covering only its local data, so writes update a single partition\'s index with no cross-partition coordination',
          'Global secondary indexes \u2014 the index itself is partitioned by the indexed term (e.g., by color or category), allowing targeted reads to a single index partition but requiring writes to update multiple index partitions',
          'Scatter-gather queries fan out to all partitions when using local indexes, and the overall latency is determined by the slowest partition (tail latency amplification)',
          'Global indexes require distributed transactions or asynchronous update propagation to keep index partitions consistent with the base data \u2014 async updates mean the index may be temporarily stale',
          'Materialized views can pre-aggregate or pre-join cross-partition query results for common access patterns, trading write-time computation and storage for dramatically faster reads',
        ],
        tradeoffs: [
          'Local indexes are write-efficient (single-partition update) but read-expensive (scatter-gather to all partitions), making them best for write-heavy workloads with infrequent secondary lookups',
          'Global indexes are read-efficient (targeted single-partition lookup) but write-expensive (cross-partition coordination or eventual consistency), making them best for read-heavy secondary access patterns',
        ],
        realWorld: [
          'Elasticsearch distributes inverted indexes across shards (global partitioning by term) \u2014 a search query is routed to the shard holding the relevant term\'s posting list',
          'Cassandra secondary indexes are local to each node \u2014 queries on secondary indexes require contacting all nodes (scatter-gather), which is why Cassandra documentation advises using them sparingly',
          'DynamoDB Global Secondary Indexes (GSI) asynchronously project data from the base table to a separately partitioned index, with eventual consistency between the base and GSI',
        ],
      },
    ],
  },

  {
    id: 10,
    title: 'NoSQL Data Models',
    part: 3,
    partTitle: 'Distributed Data',
    summary:
      'NoSQL databases offer alternative data models optimized for specific access patterns \u2014 document stores for hierarchical data, key-value/wide-column stores for massive-scale simple lookups, and graph databases for highly connected data.',
    concepts: [
      {
        id: 'document-stores',
        name: 'Document Stores',
        description:
          'Document databases store data as self-contained JSON/BSON documents with flexible schemas \u2014 each document can have a different structure, making them natural for hierarchical data that maps to application objects (no impedance mismatch).',
        keyPoints: [
          'Schema-on-read \u2014 documents can have different fields without altering a formal schema definition; the application interprets the structure at read time, enabling rapid iteration',
          'Nested documents and arrays model one-to-many relationships within a single document without JOINs \u2014 e.g., an order document containing an array of line items',
          'Poor support for many-to-many relationships \u2014 cross-document references require application-level joins (multiple queries) or data denormalization with the associated consistency risks',
          'Aggregation pipelines (MongoDB) provide SQL-like analytics capabilities on document collections \u2014 grouping, filtering, projecting, and computing aggregates in a staged pipeline',
          'Document size limits (16MB in MongoDB) prevent unbounded growth within a single document, enforcing a practical boundary on denormalization depth',
        ],
        tradeoffs: [
          'Flexible schema speeds development and handles evolving data structures naturally, but makes cross-document consistency and data validation harder to enforce at the database level',
          'Denormalized documents avoid JOINs and enable single-document reads for common access patterns, but duplicate data that must be updated in multiple places when the source changes',
        ],
        realWorld: [
          'MongoDB \u2014 the most popular document database, widely used in web applications, content management systems, and IoT platforms for its flexible document model',
          'Amazon DocumentDB \u2014 a managed MongoDB-compatible document database service on AWS with automatic scaling and backup',
          'Couchbase \u2014 combines a document store with a distributed cache layer, used for low-latency user profile stores and session management at scale',
        ],
      },
      {
        id: 'kv-wide-column',
        name: 'Key-Value & Wide-Column Stores',
        description:
          'Key-value stores provide the simplest data model \u2014 get/put/delete by primary key with opaque values. Wide-column stores (Bigtable model) extend this with sorted columns within each row key, enabling efficient scans of column ranges.',
        keyPoints: [
          'Key-value stores treat the value as an opaque blob \u2014 all access is by primary key only, with no ability to query or index the contents of the value',
          'Wide-column model organizes data into column families \u2014 each row can have a different set of columns within a family, creating a sparse, flexible structure',
          'Column families are stored together on disk \u2014 designing families around access patterns (co-locating frequently queried columns) is critical for read performance',
          'Time-series data fits naturally in wide-column stores \u2014 row key is the entity identifier, and columns are timestamped values, enabling efficient retrieval of a time range for a specific entity',
          'TTL (time-to-live) on individual cells enables automatic data expiration without manual deletion \u2014 essential for time-series data, session stores, and cache-like use cases',
        ],
        tradeoffs: [
          'Extreme simplicity and horizontal scalability (just add more nodes for more capacity), but very limited query capability \u2014 no secondary indexes, no JOINs, no ad-hoc queries',
          'Wide-column stores support column-range queries within a row, but require careful row key design to avoid hot spots and to co-locate related data on the same node',
        ],
        realWorld: [
          'Redis (in-memory key-value) and Memcached (in-memory cache) for sub-millisecond access to session data, feature flags, rate limiting counters, and application caches',
          'Apache Cassandra (wide-column) and HBase (wide-column on HDFS) for massive-scale time-series data, messaging systems, and IoT sensor data',
          'Google Bigtable \u2014 the original wide-column store serving Google Search, Maps, and Gmail, with single-digit millisecond latency at petabyte scale',
        ],
      },
      {
        id: 'graph-databases',
        name: 'Graph Databases',
        description:
          'Graph databases store data as nodes (entities) and edges (relationships) with properties on both \u2014 enabling efficient traversal of highly connected data where relationship queries (shortest path, social network friends-of-friends) would require expensive recursive JOINs in relational databases.',
        keyPoints: [
          'Property graph model \u2014 nodes and edges both have typed labels and key-value properties, creating a rich, flexible structure for modeling complex domains',
          'Index-free adjacency \u2014 each node physically stores pointers to its neighbors, enabling O(1) traversal per relationship step vs O(n) JOIN scans in relational databases',
          'Cypher (Neo4j) and Gremlin (Apache TinkerPop) are the two dominant graph query languages \u2014 Cypher uses a declarative pattern-matching syntax while Gremlin is more imperative/traversal-based',
          'Graph databases excel at variable-length path queries \u2014 shortest path, all paths between nodes, pattern matching (find all triangles), and reachability queries that would be recursive CTEs in SQL',
          'Graph queries can traverse the entire connected component in a single query, making them natural for social networks, recommendation engines, knowledge graphs, and fraud detection',
        ],
        tradeoffs: [
          'Excellent for relationship-heavy traversal queries, but poor for bulk analytics and aggregations across the entire dataset \u2014 "compute the average of all nodes" is not a graph-native operation',
          'Graph query performance can be unpredictable \u2014 traversing a densely connected subgraph (e.g., a celebrity\'s followers) may unexpectedly touch millions of nodes and edges',
        ],
        realWorld: [
          'Neo4j for fraud detection (finding cycles of suspicious transactions), knowledge graphs (connecting entities and facts), and recommendation engines (collaborative filtering via graph traversal)',
          'Amazon Neptune \u2014 a managed graph database supporting both property graph (Gremlin) and RDF (SPARQL) models on AWS',
          'JanusGraph \u2014 a distributed graph database that uses Cassandra or HBase as its storage backend, combining graph traversal with the scalability of wide-column stores',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Advanced & Operational (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Caching & Performance',
    part: 4,
    partTitle: 'Advanced & Operational',
    summary:
      'Caching strategies dramatically reduce database load and response latency \u2014 from application-level cache-aside patterns to database-integrated materialized views, each with different consistency, complexity, and invalidation tradeoffs.',
    concepts: [
      {
        id: 'cache-strategies',
        name: 'Cache Strategies (Aside/Through/Behind)',
        description:
          'Cache-aside (lazy loading) \u2014 the application checks the cache first and populates it on miss from the database. Write-through \u2014 writes go to both cache and database synchronously. Write-behind \u2014 writes go to cache immediately and asynchronously batch-flush to the database.',
        keyPoints: [
          'Cache-aside \u2014 the application explicitly manages cache population on read miss: check cache, if miss then query database, write result to cache, return to caller (most common pattern)',
          'Write-through \u2014 every write updates both the cache and the database synchronously, guaranteeing the cache is always consistent but adding latency to every write operation',
          'Write-behind (write-back) \u2014 writes update only the cache immediately and a background process asynchronously flushes changes to the database in batches, providing the lowest write latency',
          'Read-through \u2014 the cache itself fetches from the database on a miss (the application only interacts with the cache, never the database directly), simplifying application code',
          'Cache warming pre-populates the cache with hot data on startup or after a deployment, avoiding the thundering herd problem where thousands of cold-start cache misses simultaneously hit the database',
        ],
        tradeoffs: [
          'Cache-aside is simple and widely understood, but can serve stale data until TTL expires or explicit invalidation occurs \u2014 the application must tolerate eventual consistency between cache and database',
          'Write-behind has the best write performance (writes complete at cache speed) but risks data loss if the cache server fails before flushing pending writes to the database',
        ],
        realWorld: [
          'Redis as a cache-aside layer for web applications \u2014 the most common caching architecture, storing serialized objects with TTL-based expiration',
          'AWS ElastiCache (Redis or Memcached) providing managed caching infrastructure with automatic failover and cluster scaling',
          'Facebook\'s TAO cache \u2014 a write-through graph cache in front of MySQL, serving billions of social graph queries per second with sub-millisecond latency',
        ],
      },
      {
        id: 'cache-invalidation',
        name: 'Cache Invalidation',
        description:
          'Invalidation is the hardest problem in caching \u2014 ensuring cached data is removed or updated when the source data changes. Strategies include TTL-based expiration, event-driven invalidation, and versioned keys.',
        keyPoints: [
          'TTL (time-to-live) \u2014 the simplest strategy where cache entries automatically expire after a fixed duration, bounding staleness but not eliminating it (data can be stale up to TTL seconds)',
          'Event-driven invalidation \u2014 database change events (Change Data Capture, triggers, or application hooks) proactively invalidate or update cache entries when the source data changes',
          'Cache stampede \u2014 when a popular cache entry expires, hundreds of concurrent requests simultaneously miss the cache and hit the database, potentially overwhelming it',
          'Dog-piling prevention \u2014 use a mutex lock (only one request regenerates the cache entry while others wait) or probabilistic early expiration (randomly refresh before actual TTL) to prevent stampedes',
          'Versioned cache keys \u2014 include a version number or hash in the cache key (e.g., user:42:v3), so incrementing the version instantly invalidates old entries without explicit deletion',
        ],
        tradeoffs: [
          'TTL-based expiration is simple to implement and requires no infrastructure, but allows staleness up to the TTL duration \u2014 shorter TTLs reduce staleness but increase cache miss rates',
          'Event-driven invalidation provides precise, immediate consistency but adds infrastructure complexity \u2014 requiring message queues, CDC pipelines, or database triggers that must themselves be reliable',
        ],
        realWorld: [
          'CDN cache purging in Cloudflare and Fastly \u2014 purging cached content by URL, tag, or prefix when the origin content changes',
          'Facebook\'s cache invalidation via MySQL commit hooks \u2014 a MySQL plugin publishes invalidation events to Memcached clusters within milliseconds of each commit',
          'Application-level cache invalidation with Redis pub/sub \u2014 when one application instance updates data, it publishes an invalidation message that all instances subscribe to and act on',
        ],
      },
      {
        id: 'materialized-views',
        name: 'Materialized Views',
        description:
          'Materialized views precompute and store query results \u2014 turning expensive aggregations and JOINs into simple table lookups. They trade storage and write-time computation for dramatically faster reads of common query patterns.',
        keyPoints: [
          'Materialized views store the result of a query physically on disk as a table \u2014 reads are as fast as scanning a regular table, regardless of how complex the original query was',
          'Refresh strategies include full refresh (drop and rebuild entirely), incremental refresh (apply only the changes/deltas since last refresh), and on-commit refresh (update immediately when underlying tables change)',
          'Stale materialized views can return outdated results if the underlying tables are modified between refreshes \u2014 applications must decide whether staleness is acceptable for their use case',
          'Materialized views are particularly useful for OLAP dashboards, periodic roll-up reports, and pre-joined dimension tables that would otherwise require expensive repeated computation',
          'Indexes can be created on materialized views for even faster lookups \u2014 treating the materialized view as a first-class table with its own access paths',
        ],
        tradeoffs: [
          'Dramatically speeds read queries (from seconds to milliseconds) but adds storage cost for the materialized data and write/compute cost for refresh operations',
          'Incremental refresh is the most efficient approach but is complex to implement correctly for all query types \u2014 some queries (involving outer joins, aggregates with HAVING) are difficult to refresh incrementally',
        ],
        realWorld: [
          'PostgreSQL materialized views with REFRESH MATERIALIZED VIEW CONCURRENTLY for updating the view without blocking concurrent reads',
          'Oracle materialized views with query rewrite \u2014 the optimizer automatically rewrites queries to read from the materialized view instead of the base tables when it detects a match',
          'ClickHouse materialized views that incrementally insert aggregated data in real-time as new rows arrive, providing always-up-to-date pre-aggregated results',
        ],
      },
    ],
  },

  {
    id: 12,
    title: 'Database Security & Reliability',
    part: 4,
    partTitle: 'Advanced & Operational',
    summary:
      'Database security encompasses authentication, authorization (RBAC/ABAC), encryption at rest and in transit, and defense against injection attacks \u2014 forming multiple layers of protection for the most valuable asset in any system.',
    concepts: [
      {
        id: 'auth-rbac',
        name: 'Authentication & Role-Based Access Control',
        description:
          'Authentication verifies identity (who you are) via passwords, certificates, or tokens, while RBAC assigns permissions to roles and grants roles to users \u2014 enabling principle-of-least-privilege access control.',
        keyPoints: [
          'Authentication methods include password-based (md5, scram-sha-256), certificate-based (mTLS with client certificates), LDAP/Kerberos integration for enterprise SSO, and IAM-based auth (AWS RDS IAM)',
          'RBAC assigns privileges (SELECT, INSERT, UPDATE, DELETE, EXECUTE) on database objects (tables, views, schemas, functions) to roles, which are then granted to users \u2014 never grant privileges directly to users',
          'Row-level security (RLS) adds fine-grained access control by filtering rows based on the current user or role \u2014 enabling multi-tenant data isolation within a single shared table',
          'Column-level privileges restrict access to sensitive columns (SSN, salary, credit card number) within a table, allowing users to query the table while hiding specific fields',
          'pg_hba.conf (PostgreSQL) is the host-based authentication configuration file that controls which hosts, users, and databases can connect and which authentication method is required',
        ],
        tradeoffs: [
          'Fine-grained RBAC with row-level and column-level security provides strong data protection, but increases administrative complexity \u2014 managing dozens of roles and policies requires careful documentation',
          'IAM-based authentication eliminates the need to manage database passwords (tokens are short-lived and automatically rotated), but adds a dependency on the cloud provider\'s identity system',
        ],
        realWorld: [
          'PostgreSQL roles with CREATE ROLE/GRANT and RLS policies (CREATE POLICY ... USING) for multi-tenant SaaS applications isolating customer data',
          'MySQL user privileges with GRANT/REVOKE statements and mysql.user system table for authentication and authorization management',
          'AWS RDS IAM database authentication generating temporary tokens from IAM credentials \u2014 eliminating long-lived database passwords',
        ],
      },
      {
        id: 'encryption',
        name: 'Encryption at Rest & in Transit',
        description:
          'Encryption at rest protects data files on disk (using AES-256 with key management), while encryption in transit protects data flowing between clients and the database server (using TLS 1.3) \u2014 defending against physical theft and network eavesdropping.',
        keyPoints: [
          'TDE (Transparent Data Encryption) encrypts data files, WAL, and backups at the storage level \u2014 completely transparent to the application with no code changes required',
          'Column-level encryption encrypts specific sensitive fields (credit card numbers, PII, health records) with application-managed keys, providing fine-grained protection even from database administrators',
          'TLS/SSL encrypts the client-to-database connection, preventing eavesdropping, credential theft, and man-in-the-middle attacks on the network path',
          'Key management is the hardest part of encryption \u2014 keys must be stored securely in HSMs (Hardware Security Modules) or cloud KMS (AWS KMS, GCP Cloud KMS, Azure Key Vault) with access controls and audit logging',
          'Envelope encryption uses a data encryption key (DEK) to encrypt data and a master key (KEK) to encrypt the DEK \u2014 enabling key rotation by re-encrypting only the DEK without re-encrypting all the data',
        ],
        tradeoffs: [
          'Encryption adds CPU overhead (2-5% for TDE, more for column-level) and operational complexity (key management, rotation, backup of keys), but is often legally required by GDPR, PCI-DSS, and HIPAA regulations',
          'Column-level encryption provides the strongest per-field protection, but prevents the database from performing queries (indexing, sorting, filtering) on encrypted values \u2014 searchable encryption schemes exist but are still maturing',
        ],
        realWorld: [
          'AWS RDS encryption at rest using AES-256 with AWS KMS-managed keys \u2014 enabled with a single checkbox, encrypting storage, backups, snapshots, and replicas',
          'PostgreSQL pgcrypto extension for column-level encryption with pgp_sym_encrypt/pgp_sym_decrypt functions for application-managed field encryption',
          'MongoDB client-side field-level encryption (CSFLE) where the application encrypts fields before sending them to the server \u2014 the server never sees plaintext sensitive data',
        ],
      },
      {
        id: 'sql-injection',
        name: 'SQL Injection Defense',
        description:
          'SQL injection occurs when untrusted user input is concatenated into SQL queries, allowing attackers to execute arbitrary SQL \u2014 defense requires parameterized queries (prepared statements), input validation, and principle of least privilege for database accounts.',
        keyPoints: [
          'Parameterized queries (prepared statements) separate SQL code from data \u2014 the database treats parameters as literal values, never as executable SQL syntax, completely preventing injection regardless of input content',
          'ORM query builders (SQLAlchemy, ActiveRecord, Prisma, Drizzle) generate parameterized queries automatically, protecting developers from injection without manual parameter binding',
          'Stored procedures can limit the attack surface by exposing only specific, pre-defined operations to the application \u2014 the application account has EXECUTE permission on procedures but no direct table access',
          'Input validation (allowlist, not blocklist) provides defense-in-depth \u2014 validating that an email looks like an email or an ID is numeric, but should never be the primary defense against injection',
          'Database accounts used by the application should have minimal privileges (SELECT/INSERT/UPDATE on specific tables only) \u2014 never use the superuser or root account, limiting the damage if injection occurs',
        ],
        tradeoffs: [
          'Parameterized queries are the gold standard defense and have zero performance cost (in fact, prepared statements are often faster due to plan caching), but require discipline across every single database call',
          'ORMs abstract SQL injection away automatically, but developers must be cautious with raw query escape hatches (e.g., .raw(), .execute()) which bypass the ORM\'s parameterization',
        ],
        realWorld: [
          'OWASP SQL Injection Prevention Cheat Sheet \u2014 the industry-standard guide listing parameterized queries as the #1 defense, referenced by security auditors worldwide',
          'PostgreSQL prepared statements using $1, $2 parameter placeholders with PQexecParams or the PREPARE/EXECUTE SQL commands',
          'PDO prepared statements in PHP using named (:param) or positional (?) placeholders \u2014 PDO\'s default emulated prepares should be disabled in favor of native driver prepares for full protection',
        ],
      },
    ],
  },

  {
    id: 13,
    title: 'Cloud & Specialized Databases',
    part: 4,
    partTitle: 'Advanced & Operational',
    summary:
      'Cloud-native databases like Aurora and Spanner decouple compute from storage and provide global distribution, while specialized engines (time-series, NewSQL) optimize for specific workload patterns that traditional databases handle poorly.',
    concepts: [
      {
        id: 'aurora-spanner',
        name: 'Aurora & Spanner',
        description:
          'Amazon Aurora decouples compute from a distributed storage layer (6-way replication across 3 AZs) for MySQL/PostgreSQL compatibility with cloud-native resilience. Google Spanner provides globally distributed strongly consistent transactions using TrueTime (GPS/atomic clock synchronization).',
        keyPoints: [
          'Aurora replicates each 10GB data segment 6 ways across 3 Availability Zones \u2014 writes require a 4/6 quorum and reads require a 3/6 quorum, tolerating AZ failures without data loss',
          'Aurora separates compute (SQL processing, buffer pool) from a shared distributed storage layer \u2014 up to 15 read replicas share the same storage with typically less than 10ms replication lag',
          'Spanner uses TrueTime (GPS receivers + atomic clocks in every datacenter) to assign globally ordered timestamps, enabling external consistency (linearizability) for transactions spanning continents',
          'Spanner\'s split-based architecture automatically partitions data by primary key ranges and moves splits between nodes for load balancing, with each split replicated via Paxos',
          'Both provide fully managed operations \u2014 automated failover, continuous backups, point-in-time recovery, automatic patching, and monitoring as part of the cloud service',
        ],
        tradeoffs: [
          'Aurora provides cloud-native resilience with MySQL/PostgreSQL wire-protocol compatibility (easy migration), but creates strong vendor lock-in to AWS infrastructure',
          'Spanner provides global strong consistency (the holy grail of distributed databases) but at premium cost ($0.90/node-hour+) and with a SQL dialect that differs from standard PostgreSQL/MySQL',
        ],
        realWorld: [
          'Aurora PostgreSQL-Compatible Edition for SaaS applications needing PostgreSQL compatibility with automatic storage scaling up to 128TB and fast failover',
          'Google Spanner powering global financial systems (banks, payment processors) where cross-region strong consistency is a hard requirement for regulatory compliance',
          'Aurora Serverless v2 for variable workloads \u2014 automatically scales compute capacity up and down based on demand, from minimum to maximum ACUs (Aurora Capacity Units)',
        ],
      },
      {
        id: 'time-series-dbs',
        name: 'Time-Series Databases',
        description:
          'Time-series databases are optimized for append-heavy workloads with timestamp-indexed data \u2014 using columnar storage, aggressive compression, automatic downsampling, and time-based partitioning to handle millions of data points per second.',
        keyPoints: [
          'Data model is typically (timestamp, metric-name, tags/labels, value) with writes almost always appending new points at the current time \u2014 updates and deletes of historical data are rare',
          'Time-based partitioning (chunks or shards by time range) enables efficient range queries ("last 24 hours") and automatic expiration of old data by dropping entire partitions',
          'Columnar storage with delta-of-delta encoding (timestamps) and gorilla compression (floating-point values) achieves 10-20x compression ratios, dramatically reducing storage costs',
          'Continuous aggregation automatically precomputes rollups (raw \u2192 1-minute \u2192 5-minute \u2192 1-hour \u2192 1-day) for dashboard queries, trading storage for query speed at coarser time granularities',
          'Retention policies automatically drop or downsample data older than a configured threshold (e.g., keep raw data for 30 days, 1-hour rollups for 1 year, daily rollups forever)',
        ],
        tradeoffs: [
          'Extremely efficient for timestamped append-only data (millions of points per second ingest), but poorly suited for random updates, complex JOINs, or non-time-series access patterns',
          'Specialized query languages like PromQL (Prometheus) and Flux (InfluxDB) are powerful for time-series analysis, but have a learning curve for developers familiar only with SQL',
        ],
        realWorld: [
          'TimescaleDB \u2014 a PostgreSQL extension for time-series data, combining PostgreSQL\'s full SQL with time-series optimizations (hypertables, compression, continuous aggregates)',
          'InfluxDB \u2014 a purpose-built time-series database with its own query language (Flux), widely used for DevOps monitoring, IoT sensor data, and financial market data',
          'Prometheus \u2014 a pull-based monitoring system with its own time-series database and PromQL query language, the standard for Kubernetes cluster monitoring and alerting',
        ],
      },
      {
        id: 'newsql',
        name: 'NewSQL & Convergence',
        description:
          'NewSQL databases combine the scalability of NoSQL with the ACID guarantees and SQL interface of traditional relational databases \u2014 distributing data across nodes while maintaining strong consistency and familiar SQL semantics.',
        keyPoints: [
          'NewSQL provides horizontal scaling (add nodes for more capacity) with full ACID transactions and standard SQL \u2014 the promise of "NoSQL scale with SQL guarantees"',
          'Distributed SQL execution \u2014 the query optimizer considers data locality and pushes computation down to the node holding the data, minimizing network transfers for large queries',
          'Automatic sharding and rebalancing \u2014 the system automatically splits data ranges and moves them between nodes without application changes or downtime, handling growth transparently',
          'Wire-protocol compatibility with PostgreSQL or MySQL \u2014 applications can switch from a single-node database to a distributed NewSQL database with minimal or no code changes',
          'HTAP (Hybrid Transactional/Analytical Processing) systems serve both OLTP transactions and OLAP analytics from a single database, eliminating the need for a separate data warehouse and ETL pipeline',
        ],
        tradeoffs: [
          'NewSQL offers the best of both worlds (SQL + scale) but cross-node transactions add latency compared to single-node databases \u2014 network round-trips for distributed commits are unavoidable',
          'Operational complexity of distributed systems (network partitions, node failures, split-brain scenarios) still applies \u2014 these databases are more complex to operate than a single PostgreSQL instance',
        ],
        realWorld: [
          'CockroachDB \u2014 a PostgreSQL-compatible distributed SQL database with automatic sharding, Raft-based replication, and Serializable isolation by default',
          'TiDB \u2014 a MySQL-compatible NewSQL database from PingCAP with TiKV (distributed key-value storage) and TiFlash (columnar storage for HTAP analytics)',
          'YugabyteDB \u2014 compatible with both PostgreSQL (YSQL) and Cassandra (YCQL) wire protocols, offering a migration path from either ecosystem to a distributed database',
        ],
      },
    ],
  },
];

// Compatibility aliases - components use "chapter" terminology from DDIA pattern
export const chapters = topics;

export function getTopicsByPart(partId: number): Topic[] {
  return topics.filter((t) => t.part === partId);
}

export function getTopic(id: number): Topic | undefined {
  return topics.find((t) => t.id === id);
}

// Aliases for component compatibility
export const getChaptersByPart = getTopicsByPart;
export const getChapter = getTopic;

export function getAllConcepts(): Concept[] {
  return topics.flatMap((t) => t.concepts);
}
