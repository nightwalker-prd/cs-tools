export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Reliable, Scalable, and Maintainable Applications
  {
    id: 'ch1-q1',
    chapterId: 1,
    question: 'What is the difference between a fault and a failure?',
    options: [
      'They mean the same thing',
      'A fault is one component deviating from spec; a failure is when the whole system stops working',
      'A failure is one component deviating from spec; a fault is when the whole system stops working',
      'A fault is always caused by hardware; a failure is always caused by software',
    ],
    answer: 1,
    explanation: 'A fault is a single component deviating from its specification, while a failure is when the system as a whole stops providing the required service to the user. Fault-tolerant systems prevent faults from causing failures.',
  },
  {
    id: 'ch1-q2',
    chapterId: 1,
    question: 'Why are percentiles (p95, p99) better than averages for measuring response times?',
    options: [
      'Percentiles are easier to calculate',
      'Averages don\'t tell you how many users experience delays — outliers are hidden',
      'Percentiles use less memory to compute',
      'Averages are always higher than percentiles',
    ],
    answer: 1,
    explanation: 'Averages hide outliers. If the average is 100ms but p99 is 5 seconds, 1% of users have a terrible experience. Percentiles reveal the distribution and help you understand the real user experience, especially at the tail.',
  },
  {
    id: 'ch1-q3',
    chapterId: 1,
    question: 'What does tail latency amplification mean?',
    options: [
      'Network latency gets worse over time',
      'A single slow backend call slows down an entire user request that depends on multiple backend calls',
      'The database gets slower as it stores more data',
      'CPU caches become less effective with more data',
    ],
    answer: 1,
    explanation: 'When a user request requires multiple parallel backend calls, the overall response time is determined by the slowest call. Even if only 1 in 1000 calls is slow, a request touching 100 backends has a ~10% chance of hitting a slow one.',
  },

  // Chapter 2: Data Models and Query Languages
  {
    id: 'ch2-q1',
    chapterId: 2,
    question: 'What is the impedance mismatch in the relational model?',
    options: [
      'The mismatch between SQL syntax and NoSQL syntax',
      'The awkward translation layer between in-memory objects and database tables/rows/columns',
      'The difference between read and write performance',
      'The gap between database theory and practical implementation',
    ],
    answer: 1,
    explanation: 'The object-relational impedance mismatch refers to the disconnect between the data structures used in application code (objects, lists, nested structures) and the flat tables of a relational database. ORMs try to bridge this gap.',
  },
  {
    id: 'ch2-q2',
    chapterId: 2,
    question: 'When is the document model a poor choice?',
    options: [
      'When data has a one-to-many structure',
      'When you need schema flexibility',
      'When data has many-to-many relationships between documents',
      'When data is read more often than written',
    ],
    answer: 2,
    explanation: 'The document model works well for self-contained documents with one-to-many relationships. But for many-to-many relationships, you need application-level joins (fetching related documents manually), which is awkward and less efficient than database-level joins in the relational model.',
  },

  // Chapter 3: Storage and Retrieval
  {
    id: 'ch3-q1',
    chapterId: 3,
    question: 'What is the key advantage of LSM-trees over B-trees?',
    options: [
      'Faster reads',
      'Simpler implementation',
      'Higher write throughput due to sequential I/O',
      'Lower memory usage',
    ],
    answer: 2,
    explanation: 'LSM-trees use append-only writes (sequential I/O), which is much faster than the random I/O required by B-tree in-place updates. This gives LSM-trees higher write throughput, especially on spinning disks.',
  },
  {
    id: 'ch3-q2',
    chapterId: 3,
    question: 'What is the purpose of a Bloom filter in an LSM-tree?',
    options: [
      'To compress data on disk',
      'To sort keys within SSTables',
      'To quickly determine that a key does NOT exist, avoiding unnecessary disk reads',
      'To merge SSTables during compaction',
    ],
    answer: 2,
    explanation: 'A Bloom filter is a space-efficient probabilistic data structure. It can tell you definitively that a key does NOT exist (no false negatives), saving disk reads to SSTables that don\'t contain the key. It may have false positives (saying a key might exist when it doesn\'t).',
  },
  {
    id: 'ch3-q3',
    chapterId: 3,
    question: 'What is the star schema in data warehousing?',
    options: [
      'A schema shaped like a star, with one fact table surrounded by dimension tables',
      'A highly normalized schema with many levels of tables',
      'A schema that stores data in a star-shaped graph database',
      'A schema specifically for time-series data',
    ],
    answer: 0,
    explanation: 'The star schema has a central fact table (recording events like sales) surrounded by dimension tables (who, what, where, when, how). It\'s called a star schema because the fact table is in the center and the dimension tables radiate out from it.',
  },

  // Chapter 4: Encoding and Evolution
  {
    id: 'ch4-q1',
    chapterId: 4,
    question: 'What does backward compatibility mean?',
    options: [
      'Old code can read data written by new code',
      'New code can read data written by old code',
      'Data can be read in reverse order',
      'Older versions of the software run faster',
    ],
    answer: 1,
    explanation: 'Backward compatibility means newer code can read data that was written by older code. This is generally easier to achieve because the new code knows about the old format. Forward compatibility (old code reading new data) is harder.',
  },
  {
    id: 'ch4-q2',
    chapterId: 4,
    question: 'Why are language-specific serialization formats (Java Serializable, Python pickle) problematic?',
    options: [
      'They are too slow',
      'They tie you to one programming language and often have security vulnerabilities',
      'They don\'t support nested data structures',
      'They require too much disk space',
    ],
    answer: 1,
    explanation: 'Language-specific formats lock you into that language for both reading and writing. They also often have security issues (e.g., pickle can execute arbitrary code during deserialization) and poor versioning support.',
  },

  // Chapter 5: Replication
  {
    id: 'ch5-q1',
    chapterId: 5,
    question: 'What is the split-brain problem in leader-based replication?',
    options: [
      'The replication log gets corrupted',
      'Two nodes both believe they are the leader, potentially accepting conflicting writes',
      'The network splits but all nodes remain available',
      'Followers are unable to catch up with the leader',
    ],
    answer: 1,
    explanation: 'Split-brain occurs during failover when two nodes both think they are the leader. Both may accept writes, leading to conflicting or lost data. This is a dangerous situation that requires careful handling (e.g., fencing tokens, STONITH).',
  },
  {
    id: 'ch5-q2',
    chapterId: 5,
    question: 'In leaderless replication, what does the quorum condition w + r > n ensure?',
    options: [
      'That all replicas are always in sync',
      'That you are guaranteed to read the most recent write (at least one read replica saw the latest write)',
      'That writes never fail',
      'That the network never partitions',
    ],
    answer: 1,
    explanation: 'If w + r > n (where w = write replicas, r = read replicas, n = total replicas), there must be at least one node that participated in both the latest write and the read. This overlap ensures you see up-to-date data (assuming no edge cases like sloppy quorums).',
  },
  {
    id: 'ch5-q3',
    chapterId: 5,
    question: 'What does "read-after-write consistency" guarantee?',
    options: [
      'All users see the same data at the same time',
      'A user who made a write will always see their own write reflected in subsequent reads',
      'Reads are always faster than writes',
      'All writes are applied in the order they were sent',
    ],
    answer: 1,
    explanation: 'Read-after-write consistency (also called read-your-writes consistency) guarantees that if a user makes a write and then reads, they will see their own write. Other users may still see stale data. This is typically implemented by routing the user\'s own reads to the leader.',
  },

  // Chapter 6: Partitioning
  {
    id: 'ch6-q1',
    chapterId: 6,
    question: 'Why is "hash mod N" a bad partitioning strategy?',
    options: [
      'Hash functions are too slow',
      'It creates hot spots',
      'Adding or removing a node (changing N) moves most of the data to different partitions',
      'It doesn\'t distribute data evenly',
    ],
    answer: 2,
    explanation: 'When N changes (a node is added or removed), hash mod N gives a different result for most keys, causing massive data redistribution. Consistent hashing or fixed partition counts avoid this by only redistributing a small fraction of keys.',
  },
  {
    id: 'ch6-q2',
    chapterId: 6,
    question: 'What is scatter/gather in the context of partitioned secondary indexes?',
    options: [
      'A technique for distributing writes across partitions',
      'Sending a query to all partitions and combining the results, because each partition has its own local index',
      'A data compression algorithm for partitioned data',
      'A method of rebalancing partitions',
    ],
    answer: 1,
    explanation: 'With document-partitioned (local) secondary indexes, each partition indexes only its own data. A query on a secondary index must be sent to ALL partitions (scatter), and the results must be combined (gather). This can be expensive.',
  },

  // Chapter 7: Transactions
  {
    id: 'ch7-q1',
    chapterId: 7,
    question: 'In ACID, which property is really the application\'s responsibility, not the database\'s?',
    options: [
      'Atomicity',
      'Consistency',
      'Isolation',
      'Durability',
    ],
    answer: 1,
    explanation: 'Consistency in ACID means application-defined invariants (like "credits = debits") are maintained. The database can\'t enforce arbitrary application rules — it only provides tools (atomicity, isolation) that the application uses to maintain its invariants.',
  },
  {
    id: 'ch7-q2',
    chapterId: 7,
    question: 'What is write skew?',
    options: [
      'Two transactions write to different objects but the combination violates an invariant that depends on both',
      'One transaction overwrites another transaction\'s uncommitted write',
      'A write that takes much longer than expected',
      'Data becoming skewed across partitions',
    ],
    answer: 0,
    explanation: 'Write skew occurs when two transactions read the same data, make decisions based on it, and then write to different objects in a way that violates an invariant. For example, two doctors both check there are enough on-call doctors and both go off duty, leaving nobody on call.',
  },

  // Chapter 8: The Trouble with Distributed Systems
  {
    id: 'ch8-q1',
    chapterId: 8,
    question: 'Why can\'t you reliably determine if a remote node is down?',
    options: [
      'Remote nodes always respond eventually',
      'Because you can\'t distinguish between a lost request, a crashed node, a lost response, or a slow response',
      'Network monitoring tools always detect failures',
      'TCP guarantees message delivery',
    ],
    answer: 1,
    explanation: 'In an asynchronous network, if you send a request and get no response, there is no way to know whether the request was lost, the remote node crashed, the response was lost, or everything is just slow. Timeouts are the only option, but choosing the right timeout is a tradeoff.',
  },
  {
    id: 'ch8-q2',
    chapterId: 8,
    question: 'What are fencing tokens used for?',
    options: [
      'Encrypting communication between nodes',
      'Preventing a node that was paused (e.g., GC pause) from making stale writes after its lease expired',
      'Partitioning data across nodes',
      'Measuring network latency between nodes',
    ],
    answer: 1,
    explanation: 'A fencing token is a monotonically increasing number issued every time a lock is granted. The storage system checks that the token is greater than the previous one, rejecting writes with old tokens. This prevents a node that experienced a pause from making stale writes after its lock expired.',
  },

  // Chapter 9: Consistency and Consensus
  {
    id: 'ch9-q1',
    chapterId: 9,
    question: 'What does linearizability guarantee?',
    options: [
      'All transactions are serializable',
      'The system behaves as if there is only one copy of the data with all operations being atomic',
      'All nodes have the same data at all times',
      'Read operations are always faster than write operations',
    ],
    answer: 1,
    explanation: 'Linearizability makes a distributed system behave as if there is only one copy of the data and all operations are atomic. Once a write completes, all subsequent reads (from any node) must return that value or a later one.',
  },
  {
    id: 'ch9-q2',
    chapterId: 9,
    question: 'What is the FLP impossibility result?',
    options: [
      'You cannot achieve both consistency and availability during a partition (CAP theorem)',
      'No consensus algorithm can guarantee termination in an asynchronous system if even one node can crash',
      'Distributed systems cannot scale beyond a certain number of nodes',
      'It is impossible to have both low latency and high throughput',
    ],
    answer: 1,
    explanation: 'The Fischer-Lynch-Paterson (FLP) result proves that in a purely asynchronous model (no timeouts), there is no consensus algorithm that always terminates if even one node can crash. In practice, algorithms assume partial synchrony (using timeouts) to work around this.',
  },

  // Chapter 10: Batch Processing
  {
    id: 'ch10-q1',
    chapterId: 10,
    question: 'Why are dataflow engines (Spark, Flink) considered an improvement over MapReduce?',
    options: [
      'They use different programming languages',
      'They allow flexible DAGs of operators and avoid materializing all intermediate state to disk',
      'They only work with streaming data',
      'They require less hardware',
    ],
    answer: 1,
    explanation: 'MapReduce is limited to rigid map→reduce stages and writes all intermediate state to HDFS. Dataflow engines allow arbitrary DAGs of operators, can pipeline data through memory without materializing, and only sort when needed. This is significantly more efficient for multi-stage pipelines.',
  },

  // Chapter 11: Stream Processing
  {
    id: 'ch11-q1',
    chapterId: 11,
    question: 'What is the key difference between a log-based message broker (Kafka) and a traditional message broker (RabbitMQ)?',
    options: [
      'Kafka is faster',
      'RabbitMQ uses TCP while Kafka uses UDP',
      'Kafka retains messages in an ordered log and allows replay; RabbitMQ typically deletes messages after delivery',
      'RabbitMQ supports more programming languages',
    ],
    answer: 2,
    explanation: 'Log-based brokers like Kafka append messages to an ordered, durable log. Consumers track their position (offset) and can re-read past messages. Traditional brokers like RabbitMQ route messages to consumers and typically delete them after acknowledgment, making replay impossible.',
  },
  {
    id: 'ch11-q2',
    chapterId: 11,
    question: 'What is Change Data Capture (CDC)?',
    options: [
      'A technique for backing up databases',
      'Observing all changes written to a database and extracting them as a stream of events',
      'A method for encrypting database changes',
      'A way to compress data before storing it',
    ],
    answer: 1,
    explanation: 'CDC taps into the database\'s write-ahead log to capture every insert, update, and delete as an event. These events can feed derived systems (search indexes, caches, data warehouses) keeping them in sync with the primary database.',
  },

  // Chapter 12: The Future of Data Systems
  {
    id: 'ch12-q1',
    chapterId: 12,
    question: 'What does the "end-to-end argument" mean for data system correctness?',
    options: [
      'Data should be encrypted from end to end',
      'Reliability features like duplicate suppression must be implemented at the application level, not just the transport level',
      'Systems should be tested from frontend to backend',
      'Data should flow in only one direction through the system',
    ],
    answer: 1,
    explanation: 'The end-to-end argument states that certain functions can only be correctly implemented with the knowledge and help of the application at the endpoints. Transport-level guarantees (like TCP delivery) are not sufficient — the application must ensure end-to-end correctness (e.g., idempotent operations, deduplication).',
  },
  {
    id: 'ch12-q2',
    chapterId: 12,
    question: 'What is the "unbundling databases" concept?',
    options: [
      'Splitting a database into smaller databases',
      'Decomposing traditional database features into composable, specialized components connected by change streams',
      'Removing unused features from a database',
      'Converting a relational database to NoSQL',
    ],
    answer: 1,
    explanation: 'Rather than using one database that bundles storage, indexing, query processing, and transactions, the idea is to compose specialized systems (OLTP store, search engine, cache, analytics) and keep them in sync via a log of change events — each system does what it does best.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.chapterId === chapterId);
}
