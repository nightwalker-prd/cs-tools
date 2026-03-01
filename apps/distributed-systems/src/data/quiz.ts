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
  // Topic 1: Distributed System Models (chapterId: 1)
  // ============================================================
  {
    id: "t1-q1",
    chapterId: 1,
    question:
      "Why does tolerating Byzantine faults require at least 3f+1 nodes, rather than 2f+1 as in crash fault tolerance?",
    options: [
      "Byzantine nodes consume more network bandwidth, requiring extra nodes for load distribution",
      "Byzantine nodes can send contradictory messages to different peers — with only 2f+1 nodes and f Byzantine, the f+1 honest nodes cannot determine which messages are truthful since they may receive conflicting information from the faulty nodes",
      "Byzantine protocols require triple redundancy for all data storage",
      "The extra nodes serve as witnesses that observe but do not participate in consensus",
    ],
    answer: 1,
    explanation:
      "With 2f+1 nodes and f Byzantine faults, the remaining f+1 honest nodes receive messages from both honest and Byzantine nodes. Byzantine nodes can tell different honest nodes different things (equivocate), so an honest node receiving a message cannot tell if it came from an honest or Byzantine source. With 3f+1 nodes and f Byzantine faults, there are 2f+1 honest nodes — a majority can agree on the correct value even when f Byzantine nodes send conflicting messages, because the honest majority always outnumbers the Byzantine minority in any quorum.",
  },
  {
    id: "t1-q2",
    chapterId: 1,
    question:
      "What does PACELC add to the CAP theorem that CAP alone does not capture?",
    options: [
      "PACELC addresses data durability guarantees during network partitions",
      "PACELC captures the latency vs consistency tradeoff during normal (non-partitioned) operation — even without a partition, systems must choose between low latency and strong consistency",
      "PACELC extends CAP by adding a security dimension for encrypted communication",
      "PACELC accounts for the number of replicas needed for fault tolerance",
    ],
    answer: 1,
    explanation:
      "CAP only describes the tradeoff during network partitions (choose consistency or availability). But most of the time, there is no partition, and the system still faces a tradeoff: strong consistency requires coordination between replicas (adding latency), while weaker consistency allows faster responses. PACELC captures this: 'if Partition, choose A or C; Else, choose Latency or Consistency.' For example, DynamoDB is PA/EL (available during partitions, low latency otherwise), while Spanner is PC/EC (consistent always, accepting higher latency).",
  },
  {
    id: "t1-q3",
    chapterId: 1,
    question:
      "What does the FLP impossibility result actually prove, and what does it NOT prove?",
    options: [
      "It proves that consensus is impossible in all distributed systems — no practical system can achieve agreement",
      "It proves that no deterministic algorithm can guarantee consensus termination in a purely asynchronous system with even one crash failure — but it does NOT prove consensus is impossible in practice, as randomization, timeouts, and partial synchrony assumptions circumvent it",
      "It proves that Byzantine fault tolerance is impossible without specialized hardware",
      "It proves that distributed transactions cannot be atomic across more than two nodes",
    ],
    answer: 1,
    explanation:
      "FLP (1985) shows that in a purely asynchronous model (no timing assumptions whatsoever), there is no deterministic protocol that always terminates and reaches consensus if even one process can crash. The key insight is that you cannot distinguish a crashed node from an infinitely slow one. However, practical systems sidestep FLP by using randomized algorithms (random election timeouts in Raft), failure detectors (eventually perfect detectors), or partial synchrony assumptions (the network eventually behaves synchronously). FLP is a theoretical boundary, not a practical barrier.",
  },

  // ============================================================
  // Topic 2: Time & Ordering (chapterId: 2)
  // ============================================================
  {
    id: "t2-q1",
    chapterId: 2,
    question:
      "Why can't Lamport timestamps tell you whether two events are concurrent?",
    options: [
      "Lamport timestamps use floating-point numbers that lose precision",
      "Lamport timestamps guarantee that if A happened before B then L(A) < L(B), but the converse is not true — L(A) < L(B) does not imply A happened before B, so two events with different timestamps may actually be concurrent",
      "Lamport timestamps are only valid within a single data center",
      "Lamport timestamps overflow after a certain number of events",
    ],
    answer: 1,
    explanation:
      "Lamport clocks provide a one-way implication: if event A causally precedes event B (A -> B), then L(A) < L(B). But if L(A) < L(B), you cannot conclude that A happened before B — the events might be concurrent (at different nodes with no causal relationship), and the timestamp difference is merely an artifact of counter increments. Vector clocks solve this: V(A) < V(B) implies A -> B, and if neither V(A) < V(B) nor V(B) < V(A), the events are concurrent. This bidirectional implication is what makes vector clocks more powerful than Lamport timestamps.",
  },
  {
    id: "t2-q2",
    chapterId: 2,
    question:
      "What makes Google TrueTime fundamentally different from NTP for distributed systems?",
    options: [
      "TrueTime synchronizes clocks more frequently than NTP",
      "TrueTime returns a time interval [earliest, latest] with bounded uncertainty rather than a single timestamp — enabling algorithms to wait out the uncertainty and guarantee correct ordering, while NTP provides only a best-effort single timestamp with unknown error",
      "TrueTime uses software-only clock synchronization without network dependencies",
      "TrueTime eliminates clock drift entirely through GPS synchronization",
    ],
    answer: 1,
    explanation:
      "NTP provides a single timestamp with unknown error — you get a time but don't know how wrong it might be. TrueTime provides an interval [earliest, latest] where the true time is guaranteed to fall within that interval (typically <7ms uncertainty). This bounded uncertainty is what enables Spanner's external consistency: when committing a transaction, Spanner waits for the uncertainty interval to pass before reporting success, ensuring that the commit timestamp is truly in the past by the time the client sees it. No other system provides this guarantee because they lack the GPS receivers and atomic clocks that TrueTime relies on.",
  },
  {
    id: "t2-q3",
    chapterId: 2,
    question:
      "What problem do dotted version vectors solve that plain version vectors do not?",
    options: [
      "Dotted version vectors support a larger number of replicas",
      "Dotted version vectors use less memory than plain version vectors",
      "Dotted version vectors prevent the sibling explosion problem — where version vectors incorrectly detect false conflicts, generating an ever-growing number of concurrent versions (siblings) that are actually causally related",
      "Dotted version vectors enable faster conflict resolution algorithms",
    ],
    answer: 2,
    explanation:
      "Plain version vectors track the latest version seen from each replica but lose information about which specific update a value corresponds to. When a client reads a value, modifies it, and writes it back through a different coordinator, the version vector may not properly reflect that the new value supersedes the old one — causing the system to treat them as concurrent siblings even though one causally follows the other. Dotted version vectors add a 'dot' (a single event identifier) to each value, precisely identifying its causal origin and preventing these false conflicts. Riak switched from version vectors to dotted version vectors specifically to solve this problem.",
  },

  // ============================================================
  // Topic 3: Communication Patterns (chapterId: 3)
  // ============================================================
  {
    id: "t3-q1",
    chapterId: 3,
    question:
      "Why is 'exactly-once' delivery semantics so much harder to achieve than 'at-least-once'?",
    options: [
      "Exactly-once requires faster network connections between producer and consumer",
      "Exactly-once requires the message broker to keep larger buffers",
      "Exactly-once requires end-to-end coordination — the producer must deduplicate sends, the broker must deduplicate storage, and the consumer must process idempotently or use transactional commits — any gap in this chain breaks the guarantee",
      "Exactly-once is only harder because of message ordering constraints",
    ],
    answer: 2,
    explanation:
      "At-least-once is straightforward: retry until acknowledged. But exactly-once requires preventing duplicates at every stage. The producer might crash after sending but before receiving the broker's ack — retrying creates a duplicate. The broker must deduplicate using producer IDs and sequence numbers. The consumer might crash after processing but before committing its offset — restart reprocesses the message. Kafka achieves exactly-once within its ecosystem using idempotent producers (per-partition deduplication) and transactional consumers (atomic offset + output commits), but truly end-to-end exactly-once requires the external system to also be idempotent.",
  },
  {
    id: "t3-q2",
    chapterId: 3,
    question:
      "How does a gossip protocol achieve O(log N) convergence for disseminating information to N nodes?",
    options: [
      "Gossip protocols use a balanced binary tree structure for message routing",
      "Each node sends the information to all other nodes simultaneously",
      "Each round, every informed node tells a random uninformed peer — the number of informed nodes roughly doubles each round (like epidemic spread), so after O(log N) rounds, all N nodes are informed with high probability",
      "Gossip protocols use multicast networking to deliver to multiple nodes in one network packet",
    ],
    answer: 2,
    explanation:
      "In push gossip, each informed node picks a random peer each round and shares the information. In round 1, 1 node is informed. In round 2, approximately 2 nodes are informed (the original + its random peer). In round 3, approximately 4, and so on — the informed population roughly doubles each round, mirroring epidemic spread. After O(log N) rounds, all N nodes are informed with high probability. The 'with high probability' qualifier is important — there's a small chance some nodes are missed, which is why protocols run multiple rounds and use pull mechanisms to fill gaps.",
  },
  {
    id: "t3-q3",
    chapterId: 3,
    question:
      "What is the fundamental difference between RPC failure semantics and local function call semantics?",
    options: [
      "RPC calls are slower than local calls but have the same failure modes",
      "RPC calls can partially execute — the server may crash after executing the operation but before sending the response, leaving the client unable to determine whether the operation succeeded or not",
      "RPC calls require type checking at runtime while local calls are type-checked at compile time",
      "RPC calls cannot return complex data structures",
    ],
    answer: 1,
    explanation:
      "A local function call either succeeds and returns a result, or throws an exception — there's no ambiguity. An RPC can fail in ways that have no local equivalent: the request may never arrive (network loss), the server may crash mid-execution (partial failure), or the response may be lost (the operation succeeded but the client doesn't know). This means the client faces a fundamentally uncertain state: did the operation happen? Retrying might cause duplicates. Not retrying might lose the operation. This is why idempotency keys and at-most-once / at-least-once / exactly-once semantics are critical concepts in distributed systems.",
  },

  // ============================================================
  // Topic 4: Leader Election (chapterId: 4)
  // ============================================================
  {
    id: "t4-q1",
    chapterId: 4,
    question:
      "Why are ephemeral nodes in ZooKeeper effective for leader election?",
    options: [
      "Ephemeral nodes are stored in memory for faster access",
      "Ephemeral nodes automatically disappear when the creating client's session expires — so if the leader crashes or loses connectivity, its ephemeral node vanishes and other candidates can detect the vacancy and elect a new leader without manual intervention",
      "Ephemeral nodes can only be created by one client at a time",
      "Ephemeral nodes support transactions that other node types do not",
    ],
    answer: 1,
    explanation:
      "In ZooKeeper-based leader election, each candidate creates a sequential ephemeral node (e.g., /election/candidate-0001). The candidate with the lowest sequence number is the leader. When the leader crashes, its session expires and its ephemeral node is automatically deleted by ZooKeeper. The next candidate (watching the deleted node) is notified and becomes the new leader. This mechanism elegantly combines failure detection (session timeout) with election (sequential ordering) in a single primitive, without requiring explicit heartbeats or timeout tuning in the application.",
  },
  {
    id: "t4-q2",
    chapterId: 4,
    question:
      "What is a fencing token and why is it necessary even when using a lease-based leader election?",
    options: [
      "A fencing token encrypts messages between the leader and followers to prevent eavesdropping",
      "A fencing token is a monotonically increasing number that the storage system uses to reject writes from stale leaders — necessary because a leader may continue sending writes after its lease expires due to clock skew, GC pauses, or network delays",
      "A fencing token limits the number of concurrent connections a leader can maintain",
      "A fencing token is used to compress data during leader-to-follower replication",
    ],
    answer: 1,
    explanation:
      "A leader with an expiring lease may not realize it has expired — the leader's local clock may be slow (clock skew), the leader may be paused by a GC (garbage collection) pause that outlasts the lease, or the response might be delayed in the network. During this window, a new leader may have been elected, but the old leader still believes it is the leader and sends writes. A fencing token (a monotonically increasing number issued with each leadership term) is attached to every write. The storage system rejects writes with a fencing token lower than the highest it has seen, ensuring that even if two leaders exist briefly, only the current one's writes succeed.",
  },
  {
    id: "t4-q3",
    chapterId: 4,
    question:
      "What is split-brain and why is it dangerous in distributed systems?",
    options: [
      "Split-brain is when a node runs out of memory and starts swapping to disk",
      "Split-brain is when the database's query optimizer produces suboptimal execution plans",
      "Split-brain occurs when a network partition causes two groups of nodes to each elect their own leader — both leaders accept writes independently, creating divergent state that is difficult or impossible to reconcile after the partition heals",
      "Split-brain is when a node's CPU usage exceeds 100% due to context switching",
    ],
    answer: 2,
    explanation:
      "During a network partition, nodes on each side cannot communicate with the other side. If both sides independently elect a leader (because neither can see the other side's leader), both accept client writes. When the partition heals, the two leaders have made potentially conflicting decisions — data has been modified independently on each side. Reconciling these divergent states is extremely difficult (what if both sides modified the same row differently?). Prevention mechanisms include quorum-based election (requiring a majority, so at most one side can elect a leader), fencing tokens, and STONITH.",
  },

  // ============================================================
  // Topic 5: Consensus Algorithms (chapterId: 5)
  // ============================================================
  {
    id: "t5-q1",
    chapterId: 5,
    question:
      "What is the key insight that prevents Paxos from accepting two different values for the same slot?",
    options: [
      "Paxos uses encryption to prevent conflicting proposals",
      "Paxos requires all nodes to agree unanimously on every proposal",
      "In Phase 1, if a proposer learns that an acceptor already accepted a value, it must propose that same value — this ensures that once a majority accepts a value, any future proposer will discover and re-propose it rather than introducing a conflicting value",
      "Paxos timestamps every proposal with wall-clock time to determine ordering",
    ],
    answer: 2,
    explanation:
      "When a proposer runs Phase 1 (Prepare), it asks acceptors to promise not to accept lower-numbered proposals. Crucially, acceptors respond with any value they have already accepted. If the proposer receives a previously accepted value from any acceptor, it MUST use that value in Phase 2 (not its own). This is the safety mechanism: once a value V is accepted by a majority, any proposer completing Phase 1 will contact at least one acceptor from that majority (because any two majorities overlap), learn about V, and propose V. Thus, V is the only value that can ever achieve majority acceptance.",
  },
  {
    id: "t5-q2",
    chapterId: 5,
    question:
      "How does Raft's 'Leader Completeness Property' ensure that committed entries are never lost?",
    options: [
      "Committed entries are written to all nodes before the commit is acknowledged",
      "Raft uses redundant storage within each node to prevent data loss",
      "A candidate cannot win an election unless its log contains all committed entries — voters reject candidates with less up-to-date logs, ensuring only nodes with complete committed state can become leader",
      "Raft keeps a backup copy of all committed entries on a designated recovery node",
    ],
    answer: 2,
    explanation:
      "In Raft, a committed entry has been written to a majority of nodes. During leader election, a candidate must receive votes from a majority. A voter compares the candidate's log to its own and only votes for the candidate if the candidate's log is at least as up-to-date (comparing last log entry's term and index). Since committed entries are on a majority and the candidate needs a majority of votes, the candidate must contact at least one node with every committed entry. If the candidate's log is less complete, that voter rejects it. Therefore, only candidates with all committed entries can win, and no committed entry is ever lost across leader changes.",
  },
  {
    id: "t5-q3",
    chapterId: 5,
    question:
      "What makes PBFT (Practical Byzantine Fault Tolerance) 'practical' compared to earlier BFT protocols?",
    options: [
      "PBFT requires fewer nodes than earlier BFT protocols",
      "PBFT eliminates the need for cryptographic signatures",
      "PBFT achieves BFT consensus with O(N^2) message complexity (manageable for small clusters) in a partially synchronous model — earlier theoretical results either assumed synchrony, had exponential message complexity, or were purely theoretical without implementation",
      "PBFT works without any network connectivity between nodes",
    ],
    answer: 2,
    explanation:
      "Before PBFT (Castro & Liskov, 1999), BFT protocols were either theoretical results without practical implementations, assumed synchronous networks (unrealistic), or had exponential message complexity. PBFT demonstrated a working protocol that achieves BFT in a partially synchronous model with O(N^2) messages per consensus round — quadratic in the number of nodes, which is expensive but manageable for clusters of 4-20 nodes. PBFT's three-phase protocol (pre-prepare, prepare, commit) with view changes for faulty leaders made BFT achievable in real systems for the first time, inspiring all subsequent practical BFT work including blockchain consensus.",
  },

  // ============================================================
  // Topic 6: Distributed Transactions (chapterId: 6)
  // ============================================================
  {
    id: "t6-q1",
    chapterId: 6,
    question:
      "What makes Two-Phase Commit (2PC) a 'blocking' protocol?",
    options: [
      "2PC blocks read queries during the prepare phase",
      "If the coordinator crashes after sending 'prepare' but before sending the commit/abort decision, participants that voted 'yes' are stuck holding locks indefinitely — they cannot safely commit or abort on their own because they don't know the coordinator's decision",
      "2PC requires all network connections to be synchronous",
      "2PC blocks the coordinator from handling other transactions during a commit",
    ],
    answer: 1,
    explanation:
      "Once a participant votes 'yes' in Phase 1, it has promised to commit if told to do so. If the coordinator crashes before delivering the Phase 2 decision, the participant faces an impossible choice: committing might violate atomicity (if the coordinator decided to abort due to another participant's 'no' vote), and aborting would break its promise (if the coordinator decided to commit). The participant must hold its locks and wait for the coordinator to recover and deliver the decision. This is the fundamental blocking problem of 2PC — and why modern systems use Paxos/Raft-based 2PC where the coordinator's decision is itself replicated via consensus, eliminating the single point of failure.",
  },
  {
    id: "t6-q2",
    chapterId: 6,
    question:
      "How do Sagas differ from distributed ACID transactions in terms of isolation?",
    options: [
      "Sagas provide stronger isolation because each step runs in its own transaction",
      "Sagas and ACID transactions provide identical isolation guarantees",
      "Sagas sacrifice isolation — intermediate states between steps are visible to other transactions, because each step commits independently rather than holding locks across all participants until the entire sequence completes",
      "Sagas provide isolation through optimistic concurrency control instead of locks",
    ],
    answer: 2,
    explanation:
      "In a distributed ACID transaction (2PC), all participants hold locks throughout both phases — no other transaction can see the in-progress changes until the final commit. A Saga breaks the work into independent local transactions, each immediately committed. Between step 2 committing and step 3 starting, the partial results of steps 1 and 2 are visible to other transactions. If step 3 fails and compensations run, other transactions may have already read the now-being-reversed data. This means Sagas provide ACD (Atomicity through compensation, Consistency, Durability) but NOT Isolation. Applications must be designed to handle seeing intermediate Saga states.",
  },
  {
    id: "t6-q3",
    chapterId: 6,
    question:
      "What is write skew and why can't Snapshot Isolation prevent it?",
    options: [
      "Write skew is when two transactions write to the same row simultaneously — Snapshot Isolation prevents it through first-committer-wins",
      "Write skew is when a transaction reads its own uncommitted writes — Snapshot Isolation prevents it through snapshot timestamps",
      "Write skew occurs when two transactions read overlapping data, make decisions based on what they read, and write to different rows — Snapshot Isolation doesn't prevent it because each transaction sees a consistent snapshot where the other's write hasn't happened yet, and since they write to different rows, there's no write-write conflict to detect",
      "Write skew is a network-level error that corrupts data during transmission",
    ],
    answer: 2,
    explanation:
      "Classic example: a hospital requires at least one doctor on-call. Doctors Alice and Bob are both on-call. Each reads 'two doctors on-call,' decides it's safe to go off-call, and updates their own row. Under Snapshot Isolation, each sees a consistent snapshot (both on-call), and since Alice writes Alice's row and Bob writes Bob's row (different rows), there's no write-write conflict. Both commits succeed, and now zero doctors are on-call — violating the invariant. SI's first-committer-wins only detects conflicts on the SAME row. Serializable Snapshot Isolation (SSI) detects this by tracking read-write dependencies: Alice read Bob's row and Bob read Alice's row, creating a dangerous cycle.",
  },

  // ============================================================
  // Topic 7: Replication Strategies (chapterId: 7)
  // ============================================================
  {
    id: "t7-q1",
    chapterId: 7,
    question:
      "What is the fundamental tradeoff between synchronous and asynchronous replication?",
    options: [
      "Synchronous replication uses more CPU; asynchronous uses more disk",
      "Synchronous guarantees the replica has every committed write but adds latency to every commit; asynchronous is faster but the replica may lag and lose data on failover",
      "Synchronous replication only works within a single data center; asynchronous works across regions",
      "Synchronous replication provides eventual consistency; asynchronous provides strong consistency",
    ],
    answer: 1,
    explanation:
      "Synchronous replication waits for the replica to acknowledge every write before the leader confirms the commit to the client — this guarantees that the replica is always up-to-date, so failover loses zero data. However, this adds one network round-trip (and the replica's disk write time) to every transaction's commit latency. Asynchronous replication confirms the commit immediately on the leader and streams changes to replicas in the background — writes are fast, but the replica lags behind. If the leader crashes, any writes not yet replicated to the new leader are permanently lost.",
  },
  {
    id: "t7-q2",
    chapterId: 7,
    question:
      "Why is conflict resolution the hardest problem in multi-leader replication?",
    options: [
      "Conflict resolution requires expensive cryptographic operations",
      "Conflicts can only be detected at the moment of write, not after the fact",
      "Conflicts are detected asynchronously (during replication), and every resolution strategy has significant drawbacks — LWW silently loses data, CRDTs are limited in expressiveness, and custom resolution requires application-level logic for every data type",
      "Conflicts only occur when network bandwidth is insufficient between leaders",
    ],
    answer: 2,
    explanation:
      "In single-leader replication, conflicts are detected synchronously (the leader serializes all writes). In multi-leader replication, two leaders may accept conflicting writes independently, and the conflict is only detected when changes are replicated. At that point: LWW picks one write and silently discards the other (data loss); CRDTs automatically merge but can only represent certain data types (counters, sets, registers — not arbitrary application logic); custom merge functions must be written for every data type in the application. None of these is universally satisfactory, making multi-leader conflict resolution an inherently difficult design problem.",
  },
  {
    id: "t7-q3",
    chapterId: 7,
    question:
      "How does a quorum system (R + W > N) ensure a read sees the latest write?",
    options: [
      "The quorum system uses a coordinator to track the latest version",
      "The quorum system locks all replicas during reads",
      "With R + W > N, the set of replicas read (R) and the set written to (W) must overlap — at least one replica in the read set has the latest write, and the client uses version numbers to identify the newest value among the R responses",
      "The quorum system uses timestamps from a centralized time server",
    ],
    answer: 2,
    explanation:
      "With N=3 replicas, W=2 (write to 2), and R=2 (read from 2): when a write succeeds on 2 of 3 replicas, any subsequent read of 2 replicas must include at least one replica with the latest write (because 2+2=4 > 3, there's guaranteed overlap). The client compares version numbers from all R responses and uses the value with the highest version. This provides consistency without a designated leader. However, sloppy quorums (hinted handoff to temporary nodes), concurrent writes, and read repair timing can weaken this guarantee in practice.",
  },

  // ============================================================
  // Topic 8: Partitioning & Sharding (chapterId: 8)
  // ============================================================
  {
    id: "t8-q1",
    chapterId: 8,
    question:
      "Why does consistent hashing minimize data movement when adding or removing nodes?",
    options: [
      "Consistent hashing doesn't actually move any data during rebalancing",
      "Consistent hashing uses a centralized directory to track all keys",
      "Consistent hashing maps both keys and nodes to positions on a hash ring — when a node is added, it only takes keys from its immediate neighbor on the ring, moving approximately K/N keys rather than reshuffling all keys as with modular hashing",
      "Consistent hashing compresses data before moving it between nodes",
    ],
    answer: 2,
    explanation:
      "In modular hashing (hash(key) % N), changing N reshuffles almost all keys — approximately K*(N-1)/N keys must move. Consistent hashing places both keys and nodes on a circular hash ring (0 to 2^128). Each key is assigned to the first node clockwise from its position. When a new node is inserted at position P, it takes responsibility only for keys between its predecessor and P — all other keys stay on their current nodes. On average, only K/N keys move (K total keys, N nodes). With virtual nodes (multiple ring positions per physical node), the load distribution becomes even more uniform.",
  },
  {
    id: "t8-q2",
    chapterId: 8,
    question:
      "What is the scatter-gather problem with local secondary indexes in partitioned systems?",
    options: [
      "Local indexes consume too much storage on each partition",
      "Local indexes cannot be updated atomically with the data",
      "A query on a local secondary index must be sent to ALL partitions because each partition only indexes its own data — then results from all partitions are gathered and merged, with latency determined by the slowest partition (tail latency amplification)",
      "Local indexes don't support range queries on secondary attributes",
    ],
    answer: 2,
    explanation:
      "With local (document-partitioned) secondary indexes, each partition maintains an index covering only its own data. A query like 'find all users with status=active' cannot know which partitions contain matching rows, so it must be sent to every partition. Each partition searches its local index and returns results. The coordinator waits for ALL responses, then merges them. The total latency equals the slowest partition's response time (tail latency). With 100 partitions, if each has a p99 latency of 10ms, the scatter-gather p99 is much worse because you're waiting for the slowest of 100 responses. Global secondary indexes solve this by partitioning the index by term, directing each query to a single partition.",
  },
  {
    id: "t8-q3",
    chapterId: 8,
    question:
      "Why can hot spots still occur with hash partitioning despite its uniform distribution?",
    options: [
      "Hash functions can produce collisions that cluster data",
      "Hash partitioning doesn't account for differences in node hardware capacity",
      "If a single key is extremely popular (e.g., a celebrity's post), all requests for that key go to one partition regardless of hash distribution — the hash determines WHICH partition, but cannot split the load for a single key across multiple partitions",
      "Hot spots only occur when the hash function is poorly chosen",
    ],
    answer: 2,
    explanation:
      "Hash partitioning distributes different keys uniformly across partitions, preventing hot spots from sequential key patterns (like auto-incrementing IDs). However, the hash function maps each individual key to exactly one partition. If one key receives a disproportionate share of traffic (a viral tweet, a popular product listing), all that traffic goes to one partition. The hash ensures even distribution of keys, not even distribution of traffic per key. Mitigations include application-level key splitting (appending random suffixes like 'key_0', 'key_1', ... 'key_9' to spread load across 10 partitions) and reading from all splits and merging results.",
  },

  // ============================================================
  // Topic 9: Consistency Models (chapterId: 9)
  // ============================================================
  {
    id: "t9-q1",
    chapterId: 9,
    question:
      "What is the difference between linearizability and sequential consistency?",
    options: [
      "Linearizability and sequential consistency are identical guarantees with different names",
      "Linearizability requires that operations appear in an order that respects real-time ordering (if op A finishes before op B starts, A is ordered before B) — sequential consistency only requires that each client's operations appear in program order, but concurrent operations from different clients can appear in any order regardless of real-time",
      "Sequential consistency is stronger than linearizability because it guarantees total ordering",
      "Linearizability applies only to writes while sequential consistency applies to both reads and writes",
    ],
    answer: 1,
    explanation:
      "Both models require all operations to appear in some global sequential order consistent with each client's local ordering. The difference is in how concurrent operations from different clients are ordered. Linearizability adds a real-time constraint: if operation A completes before operation B begins (in wall-clock time), A must appear before B in the global order. Sequential consistency has no such constraint — concurrent operations can appear in any order as long as each client's operations are in the correct relative order. Linearizability is strictly stronger and provides the 'single copy' illusion, but requires more coordination to implement.",
  },
  {
    id: "t9-q2",
    chapterId: 9,
    question:
      "What practical problems does 'read-your-writes' consistency solve that basic eventual consistency does not?",
    options: [
      "Read-your-writes prevents data corruption during network partitions",
      "Read-your-writes ensures that a client always sees the effects of its own writes in subsequent reads — preventing the confusing user experience where you update your profile, refresh the page, and see the old data because your read was served by a lagging replica",
      "Read-your-writes reduces the storage overhead of maintaining multiple versions",
      "Read-your-writes eliminates the need for conflict resolution in multi-leader setups",
    ],
    answer: 1,
    explanation:
      "Under basic eventual consistency, a write to replica A may not yet be propagated to replica B. If the user's next read is served by replica B, they see stale data — their own update appears to have been 'lost.' Read-your-writes (also called 'read-after-write') consistency guarantees that after a successful write, any subsequent read by the same client will return that write's value or a more recent one. Implementation approaches include: routing all of a user's reads to the same replica they wrote to, tracking the write's version and waiting until the read replica has caught up, or reading from the leader for recently-written data.",
  },
  {
    id: "t9-q3",
    chapterId: 9,
    question:
      "Why is causal consistency considered a 'sweet spot' between strong and eventual consistency?",
    options: [
      "Causal consistency is the easiest consistency model to implement",
      "Causal consistency preserves the ordering of causally related operations (which is intuitive for users) while allowing concurrent operations to be unordered — achieving meaningful guarantees without the global coordination required by linearizability, and with higher availability than strong consistency",
      "Causal consistency provides the same guarantees as linearizability at lower cost",
      "Causal consistency automatically resolves all conflicts between concurrent writes",
    ],
    answer: 1,
    explanation:
      "Linearizability requires global coordination on every operation (limiting throughput and availability). Eventual consistency provides no ordering guarantees (confusing for users — you might see a reply to a message before the message itself). Causal consistency preserves the ordering that matters: if Alice posts a message and Bob replies, everyone sees Alice's message before Bob's reply. But if Charlie and Dana post unrelated messages concurrently, different users might see them in different orders — which is fine because there's no causal relationship. This is achievable without global coordination (using vector clocks or dependency tracking), providing higher availability and lower latency than linearizability.",
  },

  // ============================================================
  // Topic 10: Distributed Storage Systems (chapterId: 10)
  // ============================================================
  {
    id: "t10-q1",
    chapterId: 10,
    question:
      "Why do distributed file systems like HDFS use large chunk sizes (64-128MB)?",
    options: [
      "Large chunks are required by the underlying file system format",
      "Large chunks reduce the total amount of metadata the namenode must store (fewer chunks per file) and amortize the cost of network setup per transfer — optimizing for high-throughput sequential access at the cost of wasting space for small files",
      "Large chunks enable faster random reads",
      "Large chunks prevent data corruption during network transfers",
    ],
    answer: 1,
    explanation:
      "The namenode stores metadata for every chunk in memory. With 64MB chunks, a 1TB file has ~16,000 chunks — manageable. With 4KB chunks (like a local file system), the same file would have ~250 million chunks, overwhelming the namenode's memory. Additionally, each chunk transfer involves network connection setup, which is amortized over a larger data transfer with big chunks. The tradeoff is that small files (smaller than one chunk) waste space and create disproportionate metadata overhead — the 'small files problem' is one of HDFS's well-known limitations.",
  },
  {
    id: "t10-q2",
    chapterId: 10,
    question:
      "What makes Google Spanner unique compared to other distributed databases?",
    options: [
      "Spanner is the only distributed database that supports SQL queries",
      "Spanner is the only database that can scale horizontally",
      "Spanner uses TrueTime (GPS receivers + atomic clocks) to provide globally ordered timestamps with bounded uncertainty — enabling external consistency (the strongest form of consistency) across globally distributed data centers without the performance penalties of traditional 2PC",
      "Spanner eliminates the need for data replication across nodes",
    ],
    answer: 2,
    explanation:
      "Other distributed SQL databases (CockroachDB, TiDB) also support SQL and horizontal scaling. What makes Spanner unique is TrueTime: specialized hardware (GPS receivers and atomic clocks in every data center) that provides a time API returning bounded uncertainty intervals (typically <7ms). When committing, Spanner assigns a timestamp and waits out the uncertainty before reporting success — guaranteeing that if transaction T1 committed before T2 started in wall-clock time, T1's timestamp is less than T2's. This is external consistency — the strongest possible consistency guarantee — achieved at global scale without blocking all writes during cross-region coordination.",
  },
  {
    id: "t10-q3",
    chapterId: 10,
    question:
      "How does Cassandra's tunable consistency differ from DynamoDB's consistency model?",
    options: [
      "Cassandra only supports eventual consistency while DynamoDB supports strong consistency",
      "Cassandra allows per-query consistency level tuning (ONE, QUORUM, ALL) on both reads and writes, while DynamoDB offers only two choices: eventually consistent reads (default) or strongly consistent reads — Cassandra provides finer-grained control at the cost of greater operational complexity",
      "DynamoDB's consistency is tunable per table while Cassandra's is fixed per keyspace",
      "Cassandra and DynamoDB have identical consistency models",
    ],
    answer: 1,
    explanation:
      "Cassandra lets you set the consistency level per operation: CL=ONE (fast, one replica ack), CL=QUORUM (majority ack, R+W>N), CL=ALL (all replicas ack, strongest but lowest availability). This granularity allows different queries to make different tradeoffs — a real-time analytics query might use ONE for speed while a financial transaction uses QUORUM. DynamoDB simplifies this to two choices: eventually consistent reads (may return stale data, lower latency, half the cost) or strongly consistent reads (always returns latest, higher latency). Cassandra's flexibility is powerful but requires developers to understand quorum math and make correct choices per query.",
  },

  // ============================================================
  // Topic 11: Fault Tolerance & Reliability (chapterId: 11)
  // ============================================================
  {
    id: "t11-q1",
    chapterId: 11,
    question:
      "What advantage does the phi accrual failure detector have over a simple timeout-based detector?",
    options: [
      "The phi accrual detector uses less network bandwidth for heartbeats",
      "The phi accrual detector outputs a continuous suspicion level (phi) based on the statistical distribution of heartbeat arrival times — adapting to changing network conditions automatically, while a fixed timeout must be manually tuned and cannot adapt to variable latency",
      "The phi accrual detector can detect Byzantine failures while timeout detectors cannot",
      "The phi accrual detector guarantees zero false positives",
    ],
    answer: 1,
    explanation:
      "A simple timeout detector declares a node dead if no heartbeat arrives within T seconds — T must be manually tuned, and a single value cannot handle both fast networks (where T is too conservative, delaying failure detection) and congested networks (where T is too aggressive, causing false positives). The phi accrual detector tracks the distribution of heartbeat inter-arrival times, computing a suspicion level phi that represents the probability of failure. During network congestion, heartbeat intervals increase naturally, and the detector adapts by adjusting its baseline — reducing false positives without delaying detection of actual failures. Cassandra uses this approach with a default phi threshold of 8.",
  },
  {
    id: "t11-q2",
    chapterId: 11,
    question:
      "Why is the circuit breaker pattern essential for preventing cascading failures?",
    options: [
      "Circuit breakers encrypt traffic to prevent security-related cascading failures",
      "Circuit breakers compress requests to reduce network load during peak traffic",
      "When a downstream service fails, without a circuit breaker the caller keeps sending requests that time out — consuming the caller's threads and connections, eventually causing the caller itself to fail, which then cascades to its callers. The circuit breaker stops sending requests to the failing service, failing fast and preserving the caller's resources",
      "Circuit breakers automatically fix the failing downstream service",
    ],
    answer: 2,
    explanation:
      "Consider services A -> B -> C, where C starts failing. Without circuit breakers: B's requests to C time out (say 30s each), consuming B's thread pool. Soon B has no available threads, so A's requests to B also time out, consuming A's threads. The failure cascades from C through B to A, taking down the entire chain. With a circuit breaker in B: after detecting that requests to C are consistently failing, the circuit opens and immediately returns errors to A without attempting to call C. This preserves B's resources (no threads blocked on timeouts), A gets fast error responses it can handle gracefully, and C gets relief from traffic (helping it recover).",
  },
  {
    id: "t11-q3",
    chapterId: 11,
    question:
      "What is the difference between active-passive and active-active redundancy?",
    options: [
      "Active-passive uses more hardware; active-active uses less hardware",
      "Active-passive keeps a standby node that takes over on primary failure (clean failover, wasted resources during normal operation); active-active has all nodes serving traffic simultaneously (better resource utilization, but requires handling concurrent writes to the same data, which adds conflict resolution complexity)",
      "Active-passive only works with stateless services; active-active only works with stateful services",
      "Active-passive provides stronger consistency; active-active provides stronger availability",
    ],
    answer: 1,
    explanation:
      "Active-passive: the standby mirrors the primary's state but doesn't serve requests until failover. Resource utilization is low (standby is idle), but failover is clean — the new primary has a consistent copy and there are no conflicting writes to resolve. Active-active: all nodes serve both reads and writes simultaneously. Resource utilization is high (no idle nodes), and there's no failover delay (traffic is just redirected), but concurrent writes to the same data on different nodes must be resolved (multi-leader replication challenges). Active-passive is simpler and suits systems where consistency is critical; active-active suits systems where availability and latency matter more.",
  },

  // ============================================================
  // Topic 12: Observability & Debugging (chapterId: 12)
  // ============================================================
  {
    id: "t12-q1",
    chapterId: 12,
    question:
      "Why is tail-based sampling preferred over head-based sampling for distributed tracing?",
    options: [
      "Tail-based sampling produces smaller trace files",
      "Tail-based sampling makes the sampling decision after the trace is complete — allowing it to keep interesting traces (errors, high latency, specific attributes) and discard uninteresting ones, while head-based sampling must decide before seeing the trace, potentially discarding valuable error traces",
      "Tail-based sampling requires less processing power than head-based sampling",
      "Tail-based sampling is the only approach that works with OpenTelemetry",
    ],
    answer: 1,
    explanation:
      "Head-based sampling decides whether to trace a request at the very beginning (the 'head') — typically using a fixed probability (e.g., sample 1% of requests). This means 99% of error traces and high-latency traces are discarded along with the normal ones. Tail-based sampling buffers the complete trace and makes the sampling decision at the end (the 'tail'), after seeing the outcome. It can keep 100% of error traces, 100% of traces exceeding a latency threshold, and a random sample of normal traces. The tradeoff is that tail-based sampling requires buffering all spans in memory until the trace completes, adding infrastructure cost and complexity.",
  },
  {
    id: "t12-q2",
    chapterId: 12,
    question:
      "What is the steady-state hypothesis in chaos engineering?",
    options: [
      "The hypothesis that all distributed systems eventually reach a stable state",
      "A definition of what 'normal' system behavior looks like (e.g., p99 latency <100ms, error rate <0.1%) that serves as the baseline — chaos experiments inject failures and verify that the system maintains the steady-state hypothesis, with any violation revealing a weakness",
      "The theory that systems with more redundancy are always more reliable",
      "A prediction about how many failures a system can tolerate simultaneously",
    ],
    answer: 1,
    explanation:
      "Before injecting any failures, you must define what 'normal' looks like in measurable terms — the steady-state hypothesis. For example: 'Our p99 response time is under 200ms, error rate is below 0.5%, and throughput is above 1000 req/s.' Then you inject a failure (kill a service instance, add network latency, simulate a disk failure) and observe whether the steady-state hypothesis still holds. If the system maintains its steady state despite the failure, it's resilient to that failure mode. If the hypothesis is violated (latency spikes, errors increase), you've discovered a weakness to fix. The hypothesis makes chaos experiments scientific and measurable rather than random destruction.",
  },
  {
    id: "t12-q3",
    chapterId: 12,
    question:
      "Why can timestamp-ordered logs be misleading when debugging distributed systems?",
    options: [
      "Timestamp-ordered logs truncate long entries, losing important information",
      "Timestamp-ordered logs don't include enough context about the service generating the log",
      "Clock skew between nodes means that timestamp order does not reflect causal order — an effect may appear before its cause in timestamp-sorted logs if the effect's node has a faster clock, making root cause analysis misleading or impossible",
      "Timestamp-ordered logs consume more storage than alternative ordering methods",
    ],
    answer: 2,
    explanation:
      "If Service A sends a request to Service B at timestamp T=100 (A's clock), and B processes it and logs at T=98 (B's clock is 2ms behind), sorting by timestamp shows B's processing BEFORE A's request — an effect before its cause. With microsecond-level events and millisecond-level clock skew (typical with NTP), this is common. It makes debugging causal chains impossible: 'what caused this error?' is unanswerable when the cause appears after the error in the logs. Causal ordering tools (vector clocks, trace-based ordering) solve this by tracking the actual send/receive relationships between events rather than relying on physical clocks.",
  },

  // ============================================================
  // Topic 13: Emerging Patterns (chapterId: 13)
  // ============================================================
  {
    id: "t13-q1",
    chapterId: 13,
    question:
      "What property of CRDTs guarantees that replicas converge without coordination?",
    options: [
      "CRDTs use encryption to prevent conflicting updates",
      "CRDTs have a merge function that forms a mathematical semilattice — the merge is commutative (order doesn't matter), associative (grouping doesn't matter), and idempotent (merging the same state twice has no effect) — guaranteeing that all replicas converge to the same state regardless of the order or duplication of updates",
      "CRDTs require a centralized conflict resolution service",
      "CRDTs prevent concurrent updates through distributed locking",
    ],
    answer: 1,
    explanation:
      "A CRDT's merge function must satisfy three properties: commutative (merge(A,B) = merge(B,A) — order of receiving updates doesn't matter), associative (merge(merge(A,B),C) = merge(A,merge(B,C)) — grouping doesn't matter), and idempotent (merge(A,A) = A — duplicate delivery is harmless). These properties ensure that regardless of network delays, reordering, or duplicate messages, all replicas that have received the same set of updates will be in the same state after merging. This is 'strong eventual consistency' — convergence is guaranteed by the mathematical properties of the data structure itself, with no need for consensus protocols or coordination.",
  },
  {
    id: "t13-q2",
    chapterId: 13,
    question:
      "What problem does mutual TLS (mTLS) in a service mesh solve that regular TLS does not?",
    options: [
      "mTLS provides encryption while regular TLS does not",
      "mTLS uses stronger encryption algorithms than regular TLS",
      "Regular TLS only authenticates the server to the client — mTLS authenticates both directions, ensuring that the calling service is also verified, enabling zero-trust networking where every service-to-service call is authenticated and encrypted without application code changes",
      "mTLS is faster than regular TLS because it skips the certificate exchange step",
    ],
    answer: 2,
    explanation:
      "In regular TLS (HTTPS), the server presents a certificate and the client verifies it — but the server doesn't verify the client's identity. Any client that can reach the server can connect. In mTLS, BOTH sides present certificates: the server proves it's the real service, AND the client proves it's an authorized caller. In a service mesh, the sidecar proxies handle mTLS automatically — issuing, rotating, and verifying certificates without any application code changes. This enables zero-trust networking: even inside the internal network, every service-to-service call is authenticated and encrypted, preventing lateral movement by attackers who compromise one service.",
  },
  {
    id: "t13-q3",
    chapterId: 13,
    question:
      "What is the fundamental challenge of maintaining consistency in edge computing?",
    options: [
      "Edge locations have limited CPU and memory resources",
      "Edge networks use different communication protocols than data centers",
      "State is fragmented across hundreds of edge locations — maintaining consistency requires coordination across all of them, but the speed of light limits cross-location communication to tens or hundreds of milliseconds, making strong consistency impractical for latency-sensitive edge applications",
      "Edge computing cannot use standard databases for storage",
    ],
    answer: 2,
    explanation:
      "Edge computing's core value proposition is low latency — serving content from the nearest edge location (often <10ms away). But if the same data exists at 300+ edge locations and needs to be consistent, updating it requires coordinating across all locations. Speed-of-light latency between continents is 100-300ms, so any consistency protocol requiring coordination adds latency that defeats the purpose of edge computing. This forces edge systems toward eventual consistency (serve potentially stale data, reconcile later), cache invalidation (push updates but accept a window of staleness), or region-pinning (each piece of data has one authoritative location). The fundamental tension is that edge computing optimizes for latency, while consistency requires coordination that adds latency.",
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.chapterId === chapterId);
}
