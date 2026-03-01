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
  { id: 1, title: 'Fundamentals & Models' },
  { id: 2, title: 'Consensus & Coordination' },
  { id: 3, title: 'Distributed Storage' },
  { id: 4, title: 'Resilience & Practice' },
];

export const topics: Topic[] = [
  // ============================================================
  // PART 1: Fundamentals & Models (Topics 1-3)
  // ============================================================
  {
    id: 1,
    title: 'Distributed System Models',
    part: 1,
    partTitle: 'Fundamentals & Models',
    summary:
      'Distributed system models define the assumptions about timing, failures, and network behavior that underpin every algorithm and guarantee in distributed computing — from the CAP theorem to the FLP impossibility result.',
    concepts: [
      {
        id: 'system-models-assumptions',
        name: 'System Models & Assumptions',
        description:
          'The foundational classification of distributed systems by their timing guarantees, failure modes, and network behavior — determining which problems are solvable and which guarantees are achievable.',
        keyPoints: [
          'Synchronous models assume bounded message delay and processing time — algorithms can use timeouts to detect failures, but real networks rarely provide these guarantees',
          'Asynchronous models make no timing assumptions — messages can be delayed arbitrarily, making failure detection fundamentally impossible (you cannot distinguish a crashed node from a slow one)',
          'Crash-stop failures assume nodes either work correctly or permanently halt — the simplest failure model, where a failed node never sends incorrect messages',
          'Byzantine failures allow nodes to behave arbitrarily, including sending contradictory messages to different peers — tolerating f Byzantine faults requires at least 3f+1 nodes',
          'Partially synchronous models (the most practical) assume the system is asynchronous but eventually becomes synchronous — allowing algorithms to make progress during stable periods',
        ],
        tradeoffs: [
          'Stronger assumptions (synchronous, crash-stop) enable simpler and faster algorithms but may not hold in production — weaker assumptions (asynchronous, Byzantine) are more realistic but limit what can be achieved',
          'Byzantine fault tolerance requires significantly more nodes and message rounds than crash fault tolerance — most internal systems assume crash-stop to avoid this overhead',
        ],
        realWorld: [
          'Google Spanner (partially synchronous with TrueTime)',
          'Bitcoin/Ethereum (Byzantine fault tolerant)',
          'ZooKeeper (crash-stop model)',
        ],
      },
      {
        id: 'cap-theorem-pacelc',
        name: 'CAP Theorem & PACELC',
        description:
          'The CAP theorem states that a distributed system can provide at most two of three guarantees: Consistency, Availability, and Partition tolerance — PACELC extends this to include latency tradeoffs during normal operation.',
        keyPoints: [
          'CAP theorem (Brewer/Gilbert-Lynch): during a network partition, a system must choose between consistency (all nodes see the same data) and availability (every request gets a response) — you cannot have both',
          'Partition tolerance is not optional in distributed systems — network partitions will happen, so the real choice is between CP (consistent but unavailable during partitions) and AP (available but potentially inconsistent)',
          'PACELC extends CAP: if there is a Partition, choose A or C; Else (normal operation), choose between Latency and Consistency — capturing the everyday tradeoff that even without partitions, strong consistency adds latency',
          'Linearizability (strong consistency) requires coordination between nodes on every operation, adding at least one network round trip of latency — eventual consistency avoids this coordination',
        ],
        tradeoffs: [
          'CP systems (e.g., Spanner, HBase) reject requests during partitions to maintain consistency — suitable for financial transactions where incorrect data is worse than downtime',
          'AP systems (e.g., Cassandra, DynamoDB) remain available during partitions but may return stale data — suitable for social media feeds or shopping carts where availability matters more than perfect consistency',
          'PACELC reveals that even in normal operation, systems like Cassandra (PA/EL) sacrifice consistency for latency, while systems like Spanner (PC/EC) prioritize consistency at the cost of higher latency',
        ],
        realWorld: [
          'Amazon DynamoDB (AP, eventually consistent by default)',
          'Google Spanner (CP with TrueTime for low-latency consistency)',
          'Apache Cassandra (AP with tunable consistency)',
        ],
      },
      {
        id: 'flp-impossibility',
        name: 'FLP Impossibility & Bounds',
        description:
          'The FLP impossibility result proves that no deterministic consensus algorithm can guarantee termination in an asynchronous system with even a single crash failure — a fundamental limit that shapes all practical consensus protocols.',
        keyPoints: [
          'FLP (Fischer, Lynch, Paterson, 1985) proves that in a purely asynchronous system, there is no deterministic protocol that solves consensus if even one process can crash — because you cannot distinguish a crashed process from an infinitely slow one',
          'The result does not mean consensus is impossible in practice — it means algorithms must use randomization (e.g., randomized timeouts in Raft), failure detectors, or partial synchrony assumptions to circumvent the impossibility',
          'Failure detectors (Chandra-Toueg) abstract the ability to suspect crashed processes — an eventually perfect failure detector (which eventually stops making mistakes) is sufficient to solve consensus in an asynchronous system',
          'Lower bounds on consensus: in a synchronous system with f crash failures, consensus requires at least f+1 rounds of communication — and with Byzantine failures, at least 3f+1 nodes are needed',
          'The FLP result motivates the partial synchrony model used by practical systems — assuming the network eventually stabilizes allows protocols like Paxos and Raft to guarantee safety always and liveness eventually',
        ],
        tradeoffs: [
          'Deterministic algorithms in asynchronous systems guarantee safety (never decide incorrectly) but may sacrifice liveness (could run forever without deciding) — practical systems accept this and use timeouts to ensure progress in practice',
          'Randomized consensus algorithms (like Ben-Or) can solve consensus in asynchronous systems with probability 1, but expected running time can be exponential under adversarial scheduling',
        ],
        realWorld: [
          'Raft uses randomized election timeouts to avoid FLP',
          'Paxos guarantees safety in all cases, liveness only under partial synchrony',
          'PBFT assumes partial synchrony for liveness',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Time & Ordering',
    part: 1,
    partTitle: 'Fundamentals & Models',
    summary:
      'Time and ordering are fundamental challenges in distributed systems — without a shared global clock, systems must use physical clocks with bounded drift, logical clocks for causal ordering, or vector clocks to detect concurrent events.',
    concepts: [
      {
        id: 'physical-clocks-ntp',
        name: 'Physical Clocks & NTP',
        description:
          'Physical clocks in distributed systems drift apart due to hardware imprecision — NTP and specialized solutions like Google TrueTime provide bounded synchronization to enable time-dependent protocols.',
        keyPoints: [
          'Quartz oscillators in commodity hardware drift by 10-200 ppm (parts per million), meaning two clocks can diverge by milliseconds per second — after hours without synchronization, clocks can be seconds apart',
          'NTP (Network Time Protocol) synchronizes clocks over the network but provides accuracy of only 1-50ms on the internet and ~0.5ms on a LAN — insufficient for ordering events at microsecond granularity',
          'Clock skew (difference between two clocks at a point in time) and clock drift (rate at which clocks diverge) are distinct problems — skew can be corrected by adjustment, but drift requires ongoing synchronization',
          'Google TrueTime uses GPS receivers and atomic clocks in every data center to provide a time API that returns an interval [earliest, latest] with bounded uncertainty (typically <7ms) — enabling globally ordered timestamps',
          'Monotonic clocks (measuring elapsed time) are reliable for duration measurements but do not correspond to wall-clock time — they are immune to NTP adjustments and should be used for timeouts and performance measurement',
        ],
        tradeoffs: [
          'Higher synchronization frequency reduces clock skew but increases network overhead and dependency on NTP servers — most systems synchronize every few minutes as a compromise',
          'TrueTime provides much tighter bounds than NTP but requires expensive hardware (GPS receivers, atomic clocks) in every data center — only feasible at Google-scale infrastructure',
          'Using wall-clock timestamps for ordering (last-writer-wins) is simple but unreliable due to clock skew — events that appear ordered by timestamp may actually have occurred concurrently or in reverse order',
        ],
        realWorld: [
          'Google Spanner (TrueTime for global ordering)',
          'Amazon Time Sync Service (sub-microsecond accuracy)',
          'CockroachDB (hybrid logical clocks combining NTP with logical counters)',
        ],
      },
      {
        id: 'logical-clocks',
        name: 'Logical Clocks',
        description:
          'Lamport timestamps capture the causal ordering of events without relying on physical clocks — if event A happened before event B, then A\'s timestamp is less than B\'s, establishing a partial order over distributed events.',
        keyPoints: [
          'Lamport clocks assign each event an integer timestamp: increment the local counter on each local event, and on message receipt set the counter to max(local, received) + 1 — this ensures causally related events are correctly ordered',
          'The happens-before relation (a -> b) means event a could have influenced event b through a chain of messages — Lamport clocks guarantee if a -> b then L(a) < L(b), but the converse is NOT true (L(a) < L(b) does not imply a -> b)',
          'Causal ordering is a partial order — some events are concurrent (neither happened before the other) because they occurred at different nodes with no message path connecting them',
          'Hybrid Logical Clocks (HLC) combine physical timestamps with logical counters — the physical component stays close to wall-clock time while the logical component resolves ties, giving both human-readable timestamps and causal ordering',
          'Total ordering from Lamport clocks can be achieved by breaking ties with node IDs — but this total order is arbitrary for concurrent events and does not imply causality',
        ],
        tradeoffs: [
          'Lamport clocks are space-efficient (single integer per event) but cannot distinguish causally related events from concurrent ones — you know order but not independence',
          'Hybrid logical clocks add complexity but provide both causal ordering and timestamps close to physical time — a practical compromise used in many databases',
        ],
        realWorld: [
          'CockroachDB (hybrid logical clocks)',
          'Apache Kafka (offset-based logical ordering)',
          'Amazon DynamoDB (Lamport-style timestamps for conflict resolution)',
        ],
      },
      {
        id: 'vector-clocks',
        name: 'Vector Clocks & Version Vectors',
        description:
          'Vector clocks extend Lamport timestamps by tracking the knowledge each node has of every other node\'s progress — enabling precise detection of concurrent events and causal relationships.',
        keyPoints: [
          'A vector clock is an array of N counters (one per node) — node i increments its own counter on each event and sends the entire vector with messages; on receipt, the receiver takes the element-wise maximum and increments its own counter',
          'Vector clock comparison: V(a) < V(b) (a happened before b) if every element of V(a) is <= every element of V(b) with at least one strictly less — if neither V(a) < V(b) nor V(b) < V(a), the events are concurrent',
          'Version vectors (a variant used in replicated storage) track the latest version written by each replica rather than every event — reducing overhead while still detecting write conflicts between replicas',
          'Dotted version vectors (used in Riak) add a single "dot" identifying the exact causal event for each update — solving the sibling explosion problem where version vectors can incorrectly detect false conflicts',
          'The space complexity of vector clocks grows linearly with the number of nodes (O(N) per event) — in large systems with thousands of nodes, this overhead becomes prohibitive, motivating alternatives like interval tree clocks',
        ],
        tradeoffs: [
          'Vector clocks provide exact causality detection (no false positives or negatives for concurrency) but require O(N) space per event — impractical for systems with thousands of dynamic nodes',
          'Version vectors reduce overhead by tracking only replica-level causality rather than event-level, but lose the ability to order individual events within a replica',
          'Alternatives like interval tree clocks handle dynamic participants better but add implementation complexity and are less well understood',
        ],
        realWorld: [
          'Amazon Dynamo (vector clocks for conflict detection)',
          'Riak (dotted version vectors)',
          'Voldemort (vector clocks for versioning)',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Communication Patterns',
    part: 1,
    partTitle: 'Fundamentals & Models',
    summary:
      'Communication patterns in distributed systems range from synchronous RPC to asynchronous message queues and peer-to-peer gossip protocols — each with different guarantees for reliability, ordering, and scalability.',
    concepts: [
      {
        id: 'rpc-request-response',
        name: 'RPC & Request-Response',
        description:
          'Remote Procedure Call (RPC) makes network communication look like local function calls — but the abstraction leaks in fundamental ways around failures, latency, and serialization.',
        keyPoints: [
          'RPC frameworks (gRPC, Thrift, Avro) define services using an Interface Definition Language (IDL) that generates client stubs and server skeletons — enabling type-safe cross-language communication',
          'Failure semantics differ fundamentally from local calls: at-most-once (request may not execute), at-least-once (request may execute multiple times), and exactly-once (requires idempotency tokens or deduplication)',
          'gRPC uses HTTP/2 for multiplexing, Protocol Buffers for efficient binary serialization, and supports streaming (server-side, client-side, and bidirectional) — making it suitable for both unary RPCs and long-lived streaming connections',
          'The "fallacies of distributed computing" apply directly to RPC: the network is not reliable, latency is not zero, bandwidth is not infinite — RPC callers must handle timeouts, retries, circuit breaking, and backpressure',
          'Service discovery (Consul, DNS-based) and load balancing (client-side vs proxy-based) are essential RPC infrastructure — the caller needs to find and select a healthy server instance',
        ],
        tradeoffs: [
          'RPC provides a familiar programming model but hides the complexity of network communication — developers may forget to handle partial failures, leading to subtle bugs',
          'Binary serialization (protobuf) is compact and fast but not human-readable — JSON/REST is more debuggable but wastes bandwidth and CPU on serialization',
          'Synchronous RPC creates tight coupling between caller and callee — if the callee is slow or down, the caller blocks, potentially cascading failures through the system',
        ],
        realWorld: [
          'gRPC (Google, CNCF ecosystem)',
          'Apache Thrift (Facebook/Meta services)',
          'Twirp (Twitch, simpler gRPC alternative)',
        ],
      },
      {
        id: 'message-queues-async',
        name: 'Message Queues & Async Messaging',
        description:
          'Message queues decouple producers from consumers by buffering messages — providing different delivery guarantees (at-most-once, at-least-once, exactly-once) with tradeoffs between reliability and performance.',
        keyPoints: [
          'At-most-once delivery: fire and forget, messages may be lost but never duplicated — suitable for metrics and analytics where losing a few data points is acceptable',
          'At-least-once delivery: messages are retried until acknowledged, ensuring delivery but potentially causing duplicates — consumers must be idempotent (processing the same message twice has the same effect as once)',
          'Exactly-once semantics (Kafka transactions, Pulsar deduplication) use producer deduplication IDs and transactional writes to ensure each message is processed exactly once — but this adds significant overhead and complexity',
          'Apache Kafka models messaging as a distributed commit log with ordered, immutable partitions — consumers track their position (offset) and can replay messages, enabling event sourcing and stream processing',
          'Message ordering guarantees vary: Kafka guarantees order within a partition (not across partitions), RabbitMQ guarantees order within a queue (with single consumer), SQS provides best-effort ordering (FIFO queues for strict ordering)',
        ],
        tradeoffs: [
          'Stronger delivery guarantees (exactly-once) require more coordination, reducing throughput — at-most-once can be orders of magnitude faster',
          'Persistent message queues (Kafka, Pulsar) survive broker failures but add disk I/O latency — in-memory queues (Redis streams) are faster but lose messages on crash',
          'Decoupling via message queues increases system resilience (producer works even if consumer is down) but adds operational complexity (monitoring queue depth, managing backpressure, handling dead letter queues)',
        ],
        realWorld: [
          'Apache Kafka (LinkedIn, event streaming)',
          'RabbitMQ (traditional message broker)',
          'Amazon SQS/SNS (fully managed cloud queues)',
        ],
      },
      {
        id: 'gossip-protocols',
        name: 'Gossip Protocols',
        description:
          'Gossip protocols disseminate information through random peer-to-peer communication — achieving epidemic-style convergence that scales logarithmically and tolerates failures without centralized coordination.',
        keyPoints: [
          'In epidemic dissemination, each node periodically picks a random peer and exchanges information — like a rumor spreading through a population, information reaches all N nodes in O(log N) rounds with high probability',
          'SWIM (Scalable Weakly-consistent Infection-style Membership) is a gossip-based failure detection protocol — instead of all-to-all heartbeats (O(N^2)), each node probes random peers and piggybacks membership updates on probes',
          'Anti-entropy protocols compare and reconcile data between pairs of nodes using Merkle trees — efficiently identifying exactly which data differs, enabling incremental synchronization instead of full data transfer',
          'Push gossip (send new info to random peers), pull gossip (request info from random peers), and push-pull (exchange info bidirectionally) have different convergence properties — push-pull converges fastest',
          'CRDT-based gossiping combines conflict-free replicated data types with gossip dissemination — CRDTs guarantee that concurrent updates automatically merge without conflicts, making gossip-based replication eventually consistent without coordination',
        ],
        tradeoffs: [
          'Gossip achieves O(log N) convergence and tolerates failures gracefully (no single point of failure) but provides only eventual consistency — there is always a window where different nodes have different views',
          'Gossip generates O(N log N) total messages per round — more efficient than O(N^2) all-to-all communication but still significant in very large clusters',
          'Random peer selection provides natural load balancing but can be slow to propagate urgent information — some systems use "hot rumor" prioritization for critical updates like failure notifications',
        ],
        realWorld: [
          'Apache Cassandra (gossip-based membership and failure detection)',
          'HashiCorp Serf/Consul (SWIM-based cluster membership)',
          'Amazon DynamoDB (gossip for partition metadata)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 2: Consensus & Coordination (Topics 4-6)
  // ============================================================
  {
    id: 4,
    title: 'Leader Election',
    part: 2,
    partTitle: 'Consensus & Coordination',
    summary:
      'Leader election establishes a single coordinator in a distributed system — essential for protocols that require a designated decision-maker, with mechanisms to handle failures and prevent split-brain scenarios.',
    concepts: [
      {
        id: 'bully-ring-algorithms',
        name: 'Bully & Ring Algorithms',
        description:
          'Classical leader election algorithms for synchronous systems — the Bully algorithm elects the highest-ID node through aggressive challenges, while the Ring algorithm passes election messages around a logical ring.',
        keyPoints: [
          'Garcia-Molina Bully algorithm: when a node detects the leader has failed, it sends election messages to all higher-ID nodes — if no higher-ID node responds, it declares itself leader; if one does, that node takes over the election',
          'The Bully algorithm completes in O(N^2) messages in the worst case (lowest-ID node starts election) but typically much fewer — it assumes synchronous communication with bounded message delivery time for failure detection',
          'Chang-Roberts Ring algorithm: election messages travel around a logical ring, each node forwarding only if the message ID is higher than its own — the highest-ID message completes the ring and that node becomes leader',
          'Ring algorithm uses O(N) messages in the best case (highest node starts) and O(N^2) in the worst case — it works with only unidirectional communication but assumes the ring structure is maintained',
          'Both algorithms assume a synchronous model with reliable failure detection — in asynchronous systems, false failure detections can lead to multiple nodes simultaneously believing they are leader',
        ],
        tradeoffs: [
          'Bully is faster (aggressive parallel challenges) but generates more messages than ring-based approaches — ring is more message-efficient but slower (messages must traverse the ring)',
          'Both algorithms are unsuitable for large-scale or asynchronous systems — modern systems use consensus-based election (Raft, ZAB) that work under partial synchrony',
        ],
        realWorld: [
          'Educational/foundational algorithms',
          'Small embedded systems with known topology',
          'Largely superseded by Raft/Paxos-based approaches',
        ],
      },
      {
        id: 'zookeeper-etcd',
        name: 'ZooKeeper & etcd',
        description:
          'ZooKeeper and etcd are distributed coordination services that provide leader election, configuration management, and distributed locking through linearizable key-value stores backed by consensus protocols.',
        keyPoints: [
          'ZooKeeper uses the ZAB (ZooKeeper Atomic Broadcast) protocol — a leader-based consensus protocol where a single leader serializes all writes, broadcasts them to followers, and commits after a majority acknowledges',
          'Ephemeral nodes in ZooKeeper automatically disappear when the creating client\'s session expires — used for leader election: each candidate creates an ephemeral sequential node, and the lowest-numbered node is the leader',
          'etcd uses Raft consensus and provides a flat key-value namespace with linearizable reads and writes — Kubernetes uses etcd as its source of truth for cluster state (pod assignments, service configs, secrets)',
          'Lease-based leadership assigns a time-limited lease to the leader — the leader must periodically renew the lease, and if it fails to do so (crash, network partition), the lease expires and a new election occurs',
          'Watch mechanisms (ZooKeeper watches, etcd watchers) allow clients to observe changes to keys without polling — essential for configuration propagation and leader change notifications',
        ],
        tradeoffs: [
          'Centralized coordination services simplify distributed algorithms but become a single point of failure and scalability bottleneck — the coordination service itself must be highly available (typically 3 or 5 nodes)',
          'ZooKeeper\'s hierarchical namespace and rich primitives (ephemeral nodes, sequential nodes) enable complex coordination patterns but add operational complexity — etcd\'s simpler flat namespace is easier to operate but less expressive',
          'Lease durations represent a tradeoff: short leases detect failures quickly but risk false expirations during GC pauses or network blips; long leases are more stable but slow to detect actual failures',
        ],
        realWorld: [
          'Apache ZooKeeper (Kafka, HBase, Hadoop coordination)',
          'etcd (Kubernetes control plane)',
          'Consul (HashiCorp service mesh coordination)',
        ],
      },
      {
        id: 'fencing-split-brain',
        name: 'Fencing & Split-Brain Prevention',
        description:
          'Split-brain occurs when multiple nodes simultaneously believe they are the leader — fencing mechanisms ensure that at most one leader can make changes at any time, preventing data corruption.',
        keyPoints: [
          'Split-brain happens when a network partition separates the leader from some followers, and those followers elect a new leader — now two leaders accept writes, causing inconsistent state',
          'Fencing tokens are monotonically increasing numbers issued with each leadership term — storage systems reject writes with an old fencing token, ensuring only the current leader\'s writes succeed',
          'STONITH (Shoot The Other Node In The Head) physically powers off or resets a node suspected of being a stale leader — a brute-force but reliable approach used in high-availability clusters',
          'Quorum-based fencing ensures the leader must write to a majority of nodes — since a new leader also requires a majority vote, the old and new leaders\' quorums must overlap, preventing both from succeeding simultaneously',
          'Epoch/term numbers (used in Raft, ZAB) act as logical fencing tokens — each new leader increments the epoch, and followers reject messages from leaders with older epochs',
        ],
        tradeoffs: [
          'Fencing tokens add a validation step to every write but are the safest general approach — they work even when the storage system is separate from the coordination service',
          'STONITH is reliable but requires hardware support (IPMI, cloud APIs) and introduces the risk of unnecessarily killing a healthy node due to false failure detection',
          'Quorum-based approaches avoid split-brain by design but require a majority of nodes to be available — losing more than half the cluster makes the system unavailable',
        ],
        realWorld: [
          'Raft term numbers (etcd, Consul)',
          'ZooKeeper ephemeral nodes + fencing tokens',
          'Pacemaker/Corosync (STONITH for HA clusters)',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Consensus Algorithms',
    part: 2,
    partTitle: 'Consensus & Coordination',
    summary:
      'Consensus algorithms enable distributed nodes to agree on a single value despite failures — Paxos provides the theoretical foundation, Raft offers an understandable practical implementation, and BFT protocols handle malicious participants.',
    concepts: [
      {
        id: 'paxos',
        name: 'Paxos',
        description:
          'Paxos is the foundational consensus algorithm that enables a group of unreliable nodes to agree on a single value — despite its reputation for difficulty, it provides the theoretical basis for most practical consensus systems.',
        keyPoints: [
          'Single-decree Paxos solves consensus for one value through two phases: Phase 1 (Prepare) — a proposer sends a proposal number to acceptors, who promise not to accept lower-numbered proposals; Phase 2 (Accept) — the proposer sends the value with its number, and acceptors accept if they haven\'t promised a higher number',
          'Three roles: proposers (suggest values), acceptors (vote on proposals), and learners (learn the decided value) — in practice, each node often plays all three roles simultaneously',
          'Multi-Paxos optimizes for the common case by using a stable leader — after the leader is established, Phase 1 is skipped and only Phase 2 runs for each new value, reducing the protocol to a single round trip per decision',
          'Paxos guarantees safety (no two nodes decide different values) in all cases, but guarantees liveness (eventually a value is decided) only if a single leader emerges — competing proposers can create livelock',
          'The key insight is that if a proposer learns during Phase 1 that an acceptor already accepted a value, the proposer must propose that value — this ensures that once a majority accepts a value, it can never be overridden',
        ],
        tradeoffs: [
          'Paxos provides the strongest theoretical guarantees for crash fault tolerance but is notoriously difficult to implement correctly — subtle edge cases around leader changes, log gaps, and membership changes have led to many buggy implementations',
          'Multi-Paxos amortizes leader election cost over many decisions but relies on a stable leader — leader failures trigger re-election, which can temporarily halt progress',
          'Paxos requires 2f+1 nodes to tolerate f crash failures — the majority quorum constraint means write availability decreases as more nodes fail',
        ],
        realWorld: [
          'Google Chubby (Paxos-based distributed lock service)',
          'Apache Cassandra (lightweight transactions use Paxos)',
          'Delos (Meta/Facebook\'s virtual consensus layer)',
        ],
      },
      {
        id: 'raft',
        name: 'Raft',
        description:
          'Raft is a consensus algorithm designed for understandability — it decomposes consensus into leader election, log replication, and safety, making it significantly easier to implement correctly than Paxos.',
        keyPoints: [
          'Raft separates consensus into three subproblems: leader election (who coordinates), log replication (how decisions propagate), and safety (ensuring all nodes agree on the same log entries) — this decomposition makes reasoning about correctness more tractable',
          'Leader election uses randomized timeouts: when a follower\'s election timer expires without hearing from a leader, it becomes a candidate, increments the term, and requests votes — the randomization prevents simultaneous candidacies in most cases',
          'Log replication: the leader appends client requests to its log and replicates entries to followers via AppendEntries RPCs — an entry is committed when a majority of nodes have written it, and committed entries are guaranteed to be in all future leaders\' logs',
          'Safety guarantee: Raft ensures the "Leader Completeness Property" — a candidate cannot win an election unless its log contains all committed entries, enforced by voters rejecting candidates with less up-to-date logs',
          'Joint consensus handles cluster membership changes safely — the cluster first transitions to a joint configuration (old + new membership), then to the new configuration, ensuring safety during the transition',
        ],
        tradeoffs: [
          'Raft\'s strong leader design simplifies reasoning (all decisions go through one node) but creates a bottleneck — the leader handles all client reads and writes, limiting throughput to a single node\'s capacity',
          'Raft is less flexible than Paxos (which allows multiple concurrent proposers) but significantly easier to implement and verify — the TLA+ specification of Raft is one-third the size of Multi-Paxos',
          'Read operations in Raft require contacting the leader (for linearizability) — read-heavy workloads may need optimizations like ReadIndex or lease-based reads to avoid overloading the leader',
        ],
        realWorld: [
          'etcd (Kubernetes coordination)',
          'Consul (HashiCorp service discovery)',
          'TiKV (TiDB distributed storage layer)',
        ],
      },
      {
        id: 'byzantine-fault-tolerance',
        name: 'Byzantine Fault Tolerance',
        description:
          'Byzantine fault tolerant (BFT) protocols enable consensus even when some participants are malicious — requiring 3f+1 nodes to tolerate f Byzantine faults, with applications in blockchain and mission-critical systems.',
        keyPoints: [
          'The Byzantine Generals Problem (Lamport, 1982) asks how generals communicating by messenger can agree on a battle plan when some generals may be traitors sending conflicting messages — this models distributed systems where nodes can behave arbitrarily',
          'PBFT (Practical Byzantine Fault Tolerance, Castro & Liskov, 1999) achieves consensus with 3f+1 nodes through three phases: pre-prepare (leader proposes), prepare (nodes verify and broadcast), commit (nodes confirm agreement) — requiring O(N^2) messages per decision',
          'BFT requires 3f+1 nodes (not 2f+1 like crash fault tolerance) because Byzantine nodes can lie to different peers — with 2f+1 nodes and f Byzantine, the remaining f+1 honest nodes cannot distinguish which messages are truthful',
          'Blockchain consensus (Nakamoto consensus in Bitcoin) uses proof-of-work to achieve BFT in an open network with unknown participants — sacrificing finality (probabilistic confirmation) for permissionless participation',
          'Modern BFT variants (HotStuff, Tendermint) reduce message complexity from O(N^2) to O(N) per phase using threshold signatures and pipelining — enabling BFT at larger scale than classical PBFT',
        ],
        tradeoffs: [
          'BFT protocols are significantly more expensive than crash-fault-tolerant protocols (more nodes, more messages, more computation) — only justified when adversarial behavior is a realistic threat',
          'PBFT provides immediate finality (once committed, never reverted) but requires known participants — blockchain provides eventual finality with open participation but wastes enormous energy (proof-of-work)',
          'Permissioned BFT (Hyperledger, Tendermint) balances between the two: known participants with Byzantine fault tolerance — suitable for consortiums where participants don\'t fully trust each other',
        ],
        realWorld: [
          'Bitcoin/Ethereum (Nakamoto consensus, proof-of-work/proof-of-stake)',
          'Hyperledger Fabric (BFT for enterprise blockchains)',
          'Tendermint/CometBFT (Cosmos ecosystem BFT)',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Distributed Transactions',
    part: 2,
    partTitle: 'Consensus & Coordination',
    summary:
      'Distributed transactions extend ACID guarantees across multiple nodes — from the classic two-phase commit protocol to modern alternatives like Sagas that trade isolation for availability and performance.',
    concepts: [
      {
        id: 'two-phase-commit',
        name: 'Two-Phase Commit (2PC)',
        description:
          'Two-phase commit is the classic protocol for atomic transactions across multiple nodes — a coordinator ensures all participants either commit or abort together, but the protocol can block indefinitely if the coordinator fails.',
        keyPoints: [
          'Phase 1 (Prepare): the coordinator asks each participant "can you commit?" — participants acquire locks, write changes to durable storage, and vote yes or no. Once a participant votes yes, it has promised to commit if told to do so',
          'Phase 2 (Commit/Abort): if all participants voted yes, the coordinator writes a commit record to its log and tells all participants to commit — if any voted no, the coordinator tells all to abort',
          'The blocking problem: if the coordinator crashes after Phase 1 but before Phase 2, participants that voted yes are stuck — they hold locks and cannot safely commit (other participants might have been told to abort) or abort (they promised to commit)',
          'Recovery requires the coordinator to write its decision to a durable log before sending Phase 2 messages — on restart, it reads the log and re-sends the decision. If the decision was never written, participants eventually abort on timeout',
          'Presumed-abort optimization: if the coordinator crashes and recovers with no record of the transaction, it presumes abort — this avoids writing abort decisions to the log, saving I/O for the common case of aborted transactions',
        ],
        tradeoffs: [
          '2PC guarantees atomicity across nodes but is a blocking protocol — participant locks are held throughout both phases and during coordinator recovery, reducing availability and throughput',
          '2PC adds at least 2 round trips of latency per transaction (prepare + commit) plus the overhead of durable logging at every participant — significantly slower than local transactions',
          'The coordinator is a single point of failure — though it can be made highly available using consensus (Paxos-based 2PC), this adds complexity',
        ],
        realWorld: [
          'XA transactions (Java EE, distributed databases)',
          'Google Spanner (Paxos-based 2PC for cross-shard transactions)',
          'MySQL Group Replication (2PC variant)',
        ],
      },
      {
        id: 'three-phase-commit-sagas',
        name: 'Three-Phase Commit & Alternatives',
        description:
          'Three-phase commit attempts to solve 2PC\'s blocking problem by adding a pre-commit phase — while Sagas offer a fundamentally different approach using compensating transactions instead of distributed locking.',
        keyPoints: [
          '3PC adds a pre-commit phase between prepare and commit — the coordinator tells participants to "pre-commit" (prepare to commit but don\'t yet), then "commit." If the coordinator fails after pre-commit, participants can safely commit because they know everyone agreed',
          '3PC is non-blocking under crash failures in a synchronous system — but it fails under network partitions (nodes on different sides of the partition may make different decisions), making it impractical for most real systems',
          'Sagas (Garcia-Molina, 1987) decompose a distributed transaction into a sequence of local transactions, each with a compensating transaction that undoes its effects — if step N fails, compensations for steps N-1, N-2, ... 1 are executed',
          'Choreography-based Sagas: each service publishes events and listens for events from other services — no central coordinator, but complex to reason about and debug. Orchestration-based Sagas: a central orchestrator directs each step — simpler to understand but the orchestrator is a potential bottleneck',
          'Compensating transactions must be idempotent and commutative — designing correct compensations is challenging (e.g., how do you "un-send" an email? you can\'t — you send a correction email)',
        ],
        tradeoffs: [
          '3PC eliminates blocking but fails under partitions and adds an extra round trip — most modern systems prefer Paxos/Raft-based 2PC (which is non-blocking by using consensus for the coordinator) over 3PC',
          'Sagas sacrifice isolation (intermediate states are visible to other transactions) for availability and scalability — other transactions may read partial results, requiring careful application-level design',
          'Choreography is more loosely coupled but harder to trace and debug — orchestration is easier to reason about but adds a centralized dependency',
        ],
        realWorld: [
          'Uber Cadence/Temporal (orchestration-based Sagas)',
          'Eventuate Tram (choreography-based Sagas)',
          'AWS Step Functions (managed workflow orchestration)',
        ],
      },
      {
        id: 'isolation-serializability',
        name: 'Isolation Levels & Serializability',
        description:
          'Distributed isolation levels determine how concurrent transactions see each other\'s changes across nodes — from snapshot isolation that prevents most anomalies to serializable execution that eliminates all of them.',
        keyPoints: [
          'Snapshot isolation (SI) gives each transaction a consistent snapshot of the database at its start time — reads see the snapshot, and writes conflict only if two transactions modify the same row (first-committer-wins)',
          'Write skew under SI: two transactions read overlapping data, each makes a decision based on what it read, and both write — creating a state neither would have allowed alone. Example: both doctors go off-call because each sees the other is on-call',
          'Serializable Snapshot Isolation (SSI), used in PostgreSQL and CockroachDB, detects write skew by tracking read-write dependencies — if transaction T1 reads data that T2 writes, and T2 reads data that T1 writes, SSI aborts one of them',
          'Clock-based serializability in Spanner: TrueTime provides globally ordered timestamps — transactions are assigned commit timestamps, and the system waits out clock uncertainty to guarantee the order is correct (external consistency)',
          'Calvin and deterministic databases take a different approach: the transaction order is decided before execution (through a consensus protocol on the input), then each node independently executes transactions in the same deterministic order — avoiding coordination during execution',
        ],
        tradeoffs: [
          'Snapshot isolation provides good performance (readers never block writers) and prevents most anomalies, but allows write skew — acceptable for many applications but not for those requiring true serializability',
          'SSI detects and prevents write skew with low overhead (abort rate is typically low) but occasionally aborts transactions that would have been safe — optimistic detection trades false positives for performance',
          'External consistency (Spanner) provides the strongest guarantee but requires specialized hardware (atomic clocks, GPS) and adds commit latency proportional to clock uncertainty',
        ],
        realWorld: [
          'Google Spanner (external consistency with TrueTime)',
          'CockroachDB (serializable snapshot isolation)',
          'FoundationDB (strictly serializable with deterministic execution)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 3: Distributed Storage (Topics 7-10)
  // ============================================================
  {
    id: 7,
    title: 'Replication Strategies',
    part: 3,
    partTitle: 'Distributed Storage',
    summary:
      'Replication copies data across multiple nodes for fault tolerance and read scalability — with fundamental tradeoffs between consistency, availability, and conflict resolution depending on whether the system uses single-leader, multi-leader, or leaderless architectures.',
    concepts: [
      {
        id: 'single-leader-replication',
        name: 'Single-Leader Replication',
        description:
          'A single designated leader handles all writes and replicates changes to followers — providing straightforward consistency but creating a bottleneck and requiring careful failover handling.',
        keyPoints: [
          'All writes go to the leader, which writes to its local log and sends the changes to followers — followers apply changes in the same order, maintaining a consistent replica of the leader\'s data',
          'Synchronous replication: the leader waits for at least one follower to confirm before acknowledging the write — guarantees the follower is up-to-date but adds latency to every write operation',
          'Asynchronous replication: the leader acknowledges immediately and streams changes to followers in the background — lower write latency but followers may lag behind, and data can be lost if the leader crashes before replication',
          'Semi-synchronous (hybrid): one follower is synchronous (guaranteeing at least one up-to-date copy), others are asynchronous — balances durability with write latency',
          'Failover promotes a follower to leader when the current leader fails — challenges include detecting the failure (timeout-based), choosing the most up-to-date follower, and reconfiguring clients to use the new leader',
        ],
        tradeoffs: [
          'Single-leader provides consistent ordering of all writes (total order) but the leader is a throughput bottleneck for writes — read scalability can be improved by reading from followers (with replication lag)',
          'Failover risks data loss (async replicated writes not yet on followers) or split-brain (old leader recovers and both accept writes) — careful fencing and consensus-based election are needed',
          'Replication lag means followers may serve stale reads — applications must handle read-after-write consistency (reading your own writes from the leader) and monotonic reads (not going backwards in time)',
        ],
        realWorld: [
          'PostgreSQL streaming replication',
          'MySQL primary-replica replication',
          'MongoDB replica sets',
        ],
      },
      {
        id: 'multi-leader-replication',
        name: 'Multi-Leader Replication',
        description:
          'Multiple nodes accept writes simultaneously, each replicating to the others — enabling writes in multiple data centers but requiring conflict resolution when concurrent writes collide.',
        keyPoints: [
          'Each leader independently accepts writes and asynchronously replicates to other leaders — reduces write latency for geographically distributed clients (write to the nearest leader) and improves write availability (one leader\'s failure doesn\'t block writes)',
          'Write conflicts occur when two leaders concurrently modify the same data — conflict detection happens asynchronously when changes are replicated, unlike single-leader where conflicts are detected at write time',
          'Last-Writer-Wins (LWW) uses timestamps to pick a winner — simple and guarantees convergence, but silently drops valid concurrent writes (data loss). Clock skew makes the "last" determination unreliable',
          'CRDTs (Conflict-free Replicated Data Types) are data structures designed to merge concurrent modifications without conflicts — counters, sets, and registers that guarantee convergence regardless of operation order',
          'Custom conflict resolution in application code: on conflict, both versions are stored (siblings) and the application merges them on the next read — most flexible but requires application-level logic for every data type',
        ],
        tradeoffs: [
          'Multi-leader enables writes in multiple locations (lower latency, higher availability) but conflict resolution is inherently complex — LWW loses data, CRDTs are limited in expressiveness, and custom resolution is error-prone',
          'Causal ordering between leaders is difficult to maintain — operations that are causally related may arrive at different leaders in different orders, requiring careful use of vector clocks or similar mechanisms',
          'Topology matters: all-to-all replication is resilient but generates O(N^2) traffic; circular or star topologies are more efficient but have single points of failure in the replication chain',
        ],
        realWorld: [
          'CouchDB/PouchDB (multi-leader with revision trees)',
          'Cassandra with multiple data centers',
          'Google Docs (operational transformation, a form of multi-leader conflict resolution)',
        ],
      },
      {
        id: 'leaderless-replication',
        name: 'Leaderless Replication',
        description:
          'Leaderless (Dynamo-style) replication sends reads and writes to multiple replicas simultaneously — using quorum-based voting to ensure consistency without any designated leader.',
        keyPoints: [
          'Writes are sent to all N replicas (or at least W of them) — the write is considered successful when W replicas acknowledge. Reads query R replicas and use the latest version (by version number or timestamp)',
          'Quorum condition: R + W > N guarantees every read overlaps with at least one replica that has the latest write — for N=3, common choices are W=2, R=2 (balanced) or W=3, R=1 (fast reads) or W=1, R=3 (fast writes)',
          'Read repair: when a read discovers stale data on some replicas (by comparing version numbers across R responses), the coordinator sends the latest version to the stale replicas — passive anti-entropy that happens on every read',
          'Anti-entropy: a background process (using Merkle trees) periodically compares data between replicas and copies missing or outdated entries — catches inconsistencies missed by read repair for data that is rarely read',
          'Sloppy quorums (with hinted handoff): when a node is unavailable, writes are temporarily sent to a different node with a "hint" to forward the data later — improves write availability but weakens consistency (the hint node is not a proper replica)',
        ],
        tradeoffs: [
          'Leaderless replication has no single point of failure and no failover process — any node can handle reads and writes. But eventual consistency means clients may read stale data, and quorums don\'t guarantee linearizability',
          'Quorum reads/writes add latency (must wait for the slowest of R or W responses) — tail latency is determined by the slowest responding replica, which can be problematic',
          'Sloppy quorums improve availability but can violate the quorum guarantee — data may end up on nodes outside the designated replica set, and hinted handoff may fail or be delayed',
        ],
        realWorld: [
          'Amazon DynamoDB (Dynamo-style, leaderless)',
          'Apache Cassandra (tunable quorums)',
          'Riak (leaderless with CRDTs)',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Partitioning & Sharding',
    part: 3,
    partTitle: 'Distributed Storage',
    summary:
      'Partitioning divides data across nodes so each node stores and serves only a subset — using hash or range strategies with significant implications for query patterns, hotspot prevention, and secondary index design.',
    concepts: [
      {
        id: 'hash-partitioning',
        name: 'Hash Partitioning',
        description:
          'Hash partitioning assigns data to nodes based on the hash of the key — providing uniform distribution and hotspot prevention at the cost of losing key ordering for range queries.',
        keyPoints: [
          'Consistent hashing maps both keys and nodes to positions on a hash ring — each key belongs to the first node clockwise on the ring. When nodes are added or removed, only keys between the new node and its predecessor are affected',
          'Virtual nodes (vnodes) assign each physical node multiple positions on the hash ring (e.g., 256 per node) — smoothing out load distribution and enabling heterogeneous node capacities (more vnodes for more powerful nodes)',
          'Hot spots can still occur with hash partitioning if a single key is extremely popular (e.g., a celebrity\'s social media post) — application-level solutions include adding random suffixes to the key to split the load across partitions',
          'Token-aware routing: clients use the hash function to determine which node owns a key and send requests directly — avoiding an extra hop through a proxy and reducing latency',
          'Rebalancing after adding/removing nodes requires moving data between partitions — consistent hashing minimizes this movement to K/N keys on average (K total keys, N nodes), compared to full reshuffling with modular hashing',
        ],
        tradeoffs: [
          'Hash partitioning provides uniform distribution and prevents hotspots from sequential keys, but destroys key ordering — range queries (WHERE key BETWEEN A AND B) must scan all partitions (scatter-gather)',
          'More virtual nodes per physical node improves balance but increases metadata overhead — the partition map must be stored and communicated to all clients and nodes',
          'Consistent hashing with vnodes works well for key-value stores but is complex to implement correctly with replication — each key must be replicated to N distinct physical nodes, not just N positions on the ring',
        ],
        realWorld: [
          'Apache Cassandra (Murmur3 hash partitioner)',
          'Amazon DynamoDB (consistent hashing)',
          'Redis Cluster (hash slots, 16384 slots)',
        ],
      },
      {
        id: 'range-partitioning',
        name: 'Range Partitioning',
        description:
          'Range partitioning assigns contiguous key ranges to nodes — preserving key ordering for efficient range scans but risking hotspots when writes are concentrated in a small key range.',
        keyPoints: [
          'Each partition owns a contiguous range of keys (e.g., A-F, G-M, N-Z) — range queries only need to contact partitions whose ranges overlap with the query range, making scans efficient',
          'Partition boundaries can be set manually or automatically based on data distribution — automatic splitting divides a partition when it grows too large, maintaining balanced partition sizes',
          'Sequential key patterns (auto-incrementing IDs, timestamps) create hotspots: all writes go to the partition owning the current range — mitigated by prefixing keys with a hash of another field to distribute writes',
          'Merge operations combine undersized adjacent partitions — the system must balance between having too many small partitions (overhead) and too few large partitions (unbalanced load)',
          'HBase and Bigtable use range partitioning with automatic region splitting — regions start as one and split as they grow, with a master assigning regions to region servers',
        ],
        tradeoffs: [
          'Range partitioning enables efficient range scans and ordered iteration, but hotspots are the primary risk — any workload with monotonically increasing keys (timestamps, sequence numbers) will concentrate load on one partition',
          'Automatic partition splitting and merging add operational complexity — poor splitting thresholds can cause cascading splits (thrashing) or unbalanced partitions',
          'Range partitioning requires a partition map that clients must consult to route requests — this map changes as partitions split and merge, requiring a mechanism to propagate updates to clients',
        ],
        realWorld: [
          'Google Bigtable / HBase (range-partitioned regions)',
          'CockroachDB (range-partitioned with automatic splitting)',
          'TiKV (range-partitioned with Raft per range)',
        ],
      },
      {
        id: 'secondary-indexes-partitioned',
        name: 'Secondary Indexes',
        description:
          'Secondary indexes in partitioned systems face a fundamental design choice: local indexes (each partition indexes its own data) vs global indexes (the index is itself partitioned independently of the data).',
        keyPoints: [
          'Local (document-partitioned) secondary indexes: each partition maintains an index covering only its local data — writes are fast (update the local index atomically with the data) but reads on secondary indexes must scatter-gather across all partitions',
          'Global (term-partitioned) secondary indexes: the index is partitioned by the indexed term, independent of data partitioning — reads only need one partition (the one owning the searched term) but writes may need to update index partitions on multiple nodes',
          'Scatter-gather queries on local indexes send the query to all N partitions, wait for all responses, and merge results — latency is determined by the slowest partition (tail latency amplification)',
          'Global indexes enable efficient reads but complicate writes: updating a global index across partition boundaries requires a distributed transaction or asynchronous index update (which means the index may be temporarily inconsistent)',
          'Covering indexes (indexes that include all columns needed by a query) avoid the need to look up the main data after finding the index entry — reducing cross-partition round trips in partitioned systems',
        ],
        tradeoffs: [
          'Local indexes: fast writes, slow reads on secondary indexes (scatter-gather) — best when most queries use the primary key or partition key',
          'Global indexes: slow writes (distributed index update), fast reads on secondary indexes — best when secondary index queries are frequent and must be low-latency',
          'Asynchronous global index updates avoid the write latency penalty but the index may temporarily return stale results — acceptable for many use cases but not for systems requiring strong consistency',
        ],
        realWorld: [
          'DynamoDB (local + global secondary indexes)',
          'Elasticsearch (each shard has a local inverted index, search scatters across shards)',
          'CockroachDB (global indexes with distributed transactions)',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Consistency Models',
    part: 3,
    partTitle: 'Distributed Storage',
    summary:
      'Consistency models define what guarantees a distributed system provides about the order and visibility of operations — ranging from linearizability (strongest) through causal consistency to eventual consistency (weakest), each with different performance implications.',
    concepts: [
      {
        id: 'strong-consistency',
        name: 'Strong Consistency',
        description:
          'Strong consistency models (linearizability, sequential consistency) make a distributed system appear as if there is a single copy of data and all operations happen atomically — providing the simplest programming model at the cost of coordination overhead.',
        keyPoints: [
          'Linearizability: every operation appears to take effect atomically at some point between its invocation and response — if operation A completes before operation B starts, B must see the effects of A. The system behaves as if there is a single copy of data',
          'Sequential consistency: operations appear in some sequential order consistent with the program order of each individual client — but different clients may see operations in different (though individually consistent) orders. Weaker than linearizability because the global order need not respect real-time',
          'External consistency (Spanner): transactions are serializable and their commit order respects real-time — if transaction T1 commits before T2 starts (in wall-clock time), T1 is ordered before T2. The strongest consistency guarantee available',
          'Implementing linearizability requires coordination (consensus) on every write and potentially every read — this fundamentally limits throughput and increases latency, as every operation must contact a majority of replicas',
          'Test tools like Jepsen verify linearizability by recording a history of operations and checking if any sequential ordering is consistent with both the operation results and the real-time constraints',
        ],
        tradeoffs: [
          'Linearizability provides the simplest correctness model (as if single-threaded on a single machine) but requires consensus on every operation — limiting throughput to one consensus round per operation',
          'Optimizations like lease-based reads (reading from the leader without consensus if its lease hasn\'t expired) reduce read latency but risk returning stale data if the lease is violated',
          'External consistency requires synchronized clocks (TrueTime) — without tight clock bounds, the system must use larger wait times or weaker guarantees',
        ],
        realWorld: [
          'Google Spanner (externally consistent)',
          'etcd (linearizable reads and writes)',
          'FoundationDB (strictly serializable)',
        ],
      },
      {
        id: 'eventual-consistency',
        name: 'Eventual Consistency',
        description:
          'Eventual consistency guarantees that if no new updates are made, all replicas will eventually converge to the same value — the weakest useful consistency model, offering maximum availability and performance.',
        keyPoints: [
          'The convergence guarantee: given sufficient time without new writes, all replicas will return the same value for a given key — but during active writes, different replicas may return different values for the same key at the same time',
          'Read-your-writes (session) consistency: a client that writes a value will always see that value in subsequent reads — even if the read goes to a different replica. Implemented by routing reads to the same replica as writes, or using version stamps',
          'Monotonic reads: once a client reads a value at version V, subsequent reads will never return a version older than V — prevents the confusing experience of "going back in time" when routed to a lagging replica',
          'Monotonic writes: if a client writes A then B, all replicas will apply A before B — prevents causal violations where a later write is applied without its prerequisite',
          'Strong eventual consistency (SEC): replicas that have received the same set of updates (in any order) are in the same state — CRDTs provide SEC because their merge function is commutative, associative, and idempotent',
        ],
        tradeoffs: [
          'Eventual consistency maximizes availability and minimizes latency (no coordination needed) but shifts the complexity to the application — developers must handle stale reads, conflicts, and out-of-order updates',
          'Session guarantees (read-your-writes, monotonic reads) provide a middle ground but require sticky sessions or version tracking — adding state management to the otherwise stateless client-replica interaction',
          'The "eventually" in eventual consistency is unbounded — the system provides no guarantee on how long convergence takes, which can be problematic for time-sensitive applications',
        ],
        realWorld: [
          'Amazon DynamoDB (eventually consistent reads by default)',
          'DNS (propagation delays, eventual convergence)',
          'Amazon S3 (strong consistency since 2020, was eventually consistent)',
        ],
      },
      {
        id: 'causal-consistency',
        name: 'Causal Consistency',
        description:
          'Causal consistency preserves the order of causally related operations while allowing concurrent (unrelated) operations to be seen in any order — a middle ground between the cost of strong consistency and the complexity of eventual consistency.',
        keyPoints: [
          'Causal ordering: if operation A "happened before" operation B (A could have influenced B through a chain of reads and writes), then every node must see A before B — but operations that are concurrent (neither influenced the other) can appear in any order',
          'Causal+ consistency adds convergence to causal consistency — concurrent operations that are seen in different orders by different replicas eventually converge to the same final state (using conflict resolution like LWW or CRDTs)',
          'Session guarantees (read-your-writes, monotonic reads, monotonic writes, writes-follow-reads) are collectively equivalent to causal consistency within a single client session — implementing them provides per-client causal ordering',
          'Potential causality tracking uses vector clocks or dependency metadata to capture the causal relationships between operations — each operation carries metadata describing which previous operations it depends on',
          'Causal consistency does not require global coordination — it can be implemented with local enforcement using dependency tracking, achieving higher availability and lower latency than linearizability while preserving meaningful ordering',
        ],
        tradeoffs: [
          'Causal consistency provides stronger guarantees than eventual consistency (preserving intuitive ordering) without the performance cost of linearizability — a sweet spot for many applications',
          'Tracking causal dependencies adds metadata overhead to every operation — vector clocks grow with the number of nodes, and dependency chains can become long in systems with many causally related operations',
          'Causal consistency does not totally order concurrent writes — applications that need a single global order (e.g., unique username registration) still need linearizable operations for those specific cases',
        ],
        realWorld: [
          'MongoDB (causal consistency sessions since 3.6)',
          'COPS (causal+ consistency research system)',
          'Eiger (low-latency causal consistency for geo-replicated systems)',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Distributed Storage Systems',
    part: 3,
    partTitle: 'Distributed Storage',
    summary:
      'Distributed storage systems implement the theoretical concepts of replication, partitioning, and consistency in production architectures — from distributed file systems to key-value stores and NewSQL databases.',
    concepts: [
      {
        id: 'distributed-file-systems',
        name: 'Distributed File Systems',
        description:
          'Distributed file systems (GFS, HDFS) store large files across clusters by splitting them into chunks replicated on multiple servers — optimized for high-throughput sequential access to massive datasets.',
        keyPoints: [
          'GFS/HDFS architecture: a single master/namenode manages metadata (file-to-chunk mapping, chunk locations), while chunk servers/datanodes store the actual data chunks (typically 64-128MB) — the master is a potential bottleneck but keeps metadata small enough to fit in memory',
          'Chunks are replicated (typically 3 copies) across different racks for fault tolerance — the system automatically re-replicates chunks when a server or rack fails, maintaining the replication factor',
          'Write-once, append-mostly design: GFS was designed for MapReduce workloads where files are written once and read many times — this simplification avoids complex distributed locking for concurrent writes to the same file',
          'Data locality: computation is moved to where the data is stored (the MapReduce paradigm) rather than moving data to computation — reducing network bandwidth consumption for large-scale data processing',
          'HDFS federation (HDFS 2.0+) supports multiple namenodes, each managing a portion of the namespace — addressing the single-namenode scalability bottleneck by distributing metadata management',
        ],
        tradeoffs: [
          'Single master simplifies consistency but is a single point of failure and scalability bottleneck for metadata operations — high-availability configurations (standby namenode) add complexity',
          'Large chunk sizes (64-128MB) minimize metadata overhead and enable sequential throughput but waste space for small files and increase the granularity of replication and load balancing',
          'Optimized for throughput (batch processing) rather than latency (interactive queries) — not suitable for applications requiring low-latency random reads of small data items',
        ],
        realWorld: [
          'HDFS (Hadoop ecosystem, data lakes)',
          'Google File System (internal Google infrastructure)',
          'Azure Blob Storage (cloud-scale distributed storage)',
        ],
      },
      {
        id: 'distributed-kv-stores',
        name: 'Distributed Key-Value Stores',
        description:
          'Distributed key-value stores (DynamoDB, Cassandra, Riak) provide high-availability, low-latency access to data through partitioning and replication — each making different tradeoffs in the CAP/PACELC design space.',
        keyPoints: [
          'DynamoDB: Amazon\'s fully managed key-value store using consistent hashing with virtual nodes, single-leader replication per partition, and tunable consistency (eventually consistent by default, strongly consistent optional) — designed for predictable single-digit millisecond latency at any scale',
          'Cassandra: a peer-to-peer (leaderless) distributed database using consistent hashing, tunable quorum reads/writes (R+W>N for strong consistency), and a log-structured merge (LSM) tree storage engine — optimized for high write throughput across multiple data centers',
          'Riak: a Dynamo-style key-value store emphasizing operational simplicity and fault tolerance — uses consistent hashing, vector clocks for conflict detection, CRDTs for automatic conflict resolution, and read repair for anti-entropy',
          'All three systems sacrifice some consistency for availability (AP in CAP terms) by default — but provide tunable consistency where applications can choose stronger guarantees per-operation at the cost of latency and availability',
          'Data modeling in key-value stores requires denormalization and query-driven design — unlike relational databases, you design the data model around your query patterns because JOINs and secondary indexes are limited or expensive',
        ],
        tradeoffs: [
          'DynamoDB offers fully managed operations (no capacity planning, automatic scaling) but locks you into AWS and has limited query flexibility (primary key lookups, limited secondary indexes)',
          'Cassandra provides high write throughput and multi-datacenter replication but requires significant operational expertise — tuning compaction, repair, and consistency levels requires deep understanding',
          'Leaderless systems (Cassandra, Riak) have no failover process (any node can handle any request) but eventual consistency means applications must handle stale reads and conflict resolution',
        ],
        realWorld: [
          'Amazon DynamoDB (AWS-native applications)',
          'Apache Cassandra (Netflix, Discord, Instagram)',
          'Redis Cluster (caching, session storage, real-time analytics)',
        ],
      },
      {
        id: 'newsql-distributed-sql',
        name: 'NewSQL & Distributed SQL',
        description:
          'NewSQL databases (Spanner, CockroachDB, TiDB) combine the ACID guarantees of traditional relational databases with the horizontal scalability of distributed systems — using novel architectures to avoid the traditional choice between consistency and scalability.',
        keyPoints: [
          'Google Spanner: separates compute from storage, uses TrueTime for globally ordered timestamps, and runs Paxos per data shard — providing external consistency (linearizability + serializability) with automatic sharding and rebalancing across global data centers',
          'CockroachDB: a Spanner-inspired open-source distributed SQL database using Raft consensus per range, serializable snapshot isolation, and hybrid logical clocks — designed to survive data center failures with zero data loss and minimal downtime',
          'TiDB: a MySQL-compatible distributed SQL database using a layered architecture — TiDB (SQL layer) + TiKV (distributed key-value storage with Raft) + PD (placement driver for scheduling) — enabling horizontal scaling of MySQL workloads',
          'All three provide standard SQL interfaces and ACID transactions across shards — applications can use them as drop-in replacements for single-node databases while gaining horizontal scalability',
          'Automatic range-based sharding with rebalancing: data is split into ranges (or regions) that are automatically distributed across nodes based on size and load — the system moves ranges between nodes to balance the cluster without manual intervention',
        ],
        tradeoffs: [
          'NewSQL databases provide the best of both worlds (ACID + scale) but with higher per-query latency than single-node databases — every write involves consensus, and cross-shard transactions require distributed coordination',
          'Operational complexity is lower than manually sharded systems but higher than single-node databases — distributed queries, network partitions, and clock synchronization add failure modes',
          'Spanner requires Google\'s TrueTime infrastructure for its strongest guarantees — CockroachDB and TiDB use hybrid logical clocks which provide weaker but still useful time guarantees without specialized hardware',
        ],
        realWorld: [
          'Google Spanner (Google Cloud, AdWords, Play Store)',
          'CockroachDB (financial services, global applications)',
          'TiDB (PingCAP, used by Zhihu, BookMyShow)',
        ],
      },
    ],
  },

  // ============================================================
  // PART 4: Resilience & Practice (Topics 11-13)
  // ============================================================
  {
    id: 11,
    title: 'Fault Tolerance & Reliability',
    part: 4,
    partTitle: 'Resilience & Practice',
    summary:
      'Fault tolerance ensures distributed systems continue operating correctly despite failures — through failure detection, redundancy, recovery mechanisms, and patterns that prevent cascading failures.',
    concepts: [
      {
        id: 'failure-detection',
        name: 'Failure Detection',
        description:
          'Failure detection in distributed systems determines whether a remote node is alive or dead — a fundamentally uncertain problem in asynchronous systems where slow responses are indistinguishable from crashes.',
        keyPoints: [
          'Heartbeat-based detection: nodes periodically send "I\'m alive" messages, and a node is suspected failed if no heartbeat arrives within a timeout — simple but requires tuning the timeout (too short: false positives; too long: slow detection)',
          'The phi accrual failure detector (Hayashibara, 2004) outputs a suspicion level (phi) rather than a binary alive/dead decision — phi is calculated from the distribution of heartbeat inter-arrival times, and the application decides the threshold. Higher phi means more likely failed',
          'SWIM (Scalable Weakly-consistent Infection-style Membership protocol) combines failure detection with membership dissemination — each node periodically probes a random peer, and if it doesn\'t respond, asks k other nodes to probe it (indirect probing). Membership changes are piggybacked on probe messages',
          'Indirect probing (SWIM) distinguishes between a crashed node and a network problem between two specific nodes — if the probed node responds to indirect probes from other nodes, the original detector knows its own network path is the problem, not the target node',
          'False positive (wrongly suspecting a live node is dead) consequences include unnecessary failovers, split-brain, and data rebalancing — these are often more damaging than delayed detection of actual failures',
        ],
        tradeoffs: [
          'Aggressive timeouts detect failures quickly but increase false positives — conservative timeouts reduce false positives but delay failover and reduce availability during actual failures',
          'Phi accrual detectors adapt to network conditions (longer delays during high load) but add complexity — simple timeouts are easier to reason about but require manual tuning per environment',
          'SWIM scales to large clusters (O(N) messages per failure detection round) but convergence of membership information takes O(log N) rounds — stale membership views can cause temporary inconsistency',
        ],
        realWorld: [
          'Apache Cassandra (phi accrual failure detector)',
          'HashiCorp Consul/Serf (SWIM protocol)',
          'Kubernetes (node heartbeats, pod liveness probes)',
        ],
      },
      {
        id: 'redundancy-recovery',
        name: 'Redundancy & Recovery',
        description:
          'Redundancy and recovery mechanisms ensure that component failures don\'t cause data loss or extended downtime — through active-passive standby, active-active configurations, and checkpoint-based recovery.',
        keyPoints: [
          'Active-passive (hot standby): a backup system mirrors the primary and takes over on failure — the passive node is ready but doesn\'t serve requests until failover, wasting resources during normal operation but providing fast recovery',
          'Active-active: multiple nodes serve requests simultaneously with automatic load redistribution when one fails — higher resource utilization but requires conflict resolution for concurrent writes (multi-leader replication challenges)',
          'Checkpointing: periodically saving the complete state of a computation to durable storage — on failure, the system restarts from the last checkpoint rather than from scratch. Frequent checkpoints enable faster recovery but consume I/O bandwidth',
          'Write-ahead logging (WAL) combined with checkpointing: the WAL records every operation, and checkpoints capture periodic snapshots — recovery replays the WAL from the last checkpoint forward, providing a balance between checkpoint frequency and recovery time',
          'N+1 redundancy: running one extra node beyond the minimum needed — if any single node fails, the remaining N nodes handle the full load. N+2 handles two simultaneous failures, and so on',
        ],
        tradeoffs: [
          'Active-passive wastes standby resources but provides clean failover (no conflict resolution) — active-active utilizes all resources but adds the complexity of handling concurrent requests to the same data',
          'Frequent checkpoints reduce recovery time but increase I/O overhead during normal operation and may cause performance spikes — balancing checkpoint interval requires understanding the recovery time objective (RTO)',
          'N+1 redundancy doubles the cost for single-failure tolerance — financial pressure often pushes systems toward N+0 configurations that cannot tolerate any failures, increasing risk',
        ],
        realWorld: [
          'PostgreSQL (hot standby replication + WAL)',
          'Apache Flink (distributed checkpointing for stream processing)',
          'AWS Multi-AZ (active-passive across availability zones)',
        ],
      },
      {
        id: 'circuit-breakers-bulkheads',
        name: 'Circuit Breakers & Bulkheads',
        description:
          'Circuit breakers and bulkheads are resilience patterns that prevent cascading failures in distributed systems — stopping a failing component from overwhelming the rest of the system.',
        keyPoints: [
          'Circuit breaker pattern (Michael Nygard): a proxy that monitors failures to a downstream service — in the closed state, requests pass through normally. After a threshold of failures, the circuit "opens" and immediately returns errors without calling the failing service. After a cooldown, it enters "half-open" state and allows a few test requests',
          'Retry with exponential backoff: failed requests are retried with increasing delays (e.g., 1s, 2s, 4s, 8s) and jitter (random variation) — exponential backoff prevents thundering herd on recovery, and jitter prevents synchronized retries from multiple clients',
          'Bulkhead pattern (named after ship compartments): isolate failures by allocating separate thread pools, connection pools, or processes to different downstream services — if one service is slow, it only exhausts its own pool, not the shared resources',
          'Load shedding: when overloaded, the system deliberately drops excess requests (returning 503 errors) to protect the system from collapse — better to fail 10% of requests gracefully than to fail 100% by becoming completely unresponsive',
          'Cascading failures: when service A depends on B, and B slows down, A\'s requests to B pile up, consuming A\'s threads/connections, causing A to slow down — eventually the failure propagates through the entire call chain. Circuit breakers and bulkheads break this cascade',
        ],
        tradeoffs: [
          'Circuit breakers reduce load on failing services and speed up failure detection, but may cause brief availability loss when they open — false opens due to transient errors can be worse than letting retries through',
          'Bulkheads limit blast radius but waste resources (each pool must be sized for peak load independently) — dynamic resource allocation helps but adds complexity',
          'Load shedding requires clear priority decisions (which requests to drop) and proper client behavior (respecting backoff signals) — poorly implemented shedding can drop critical requests while serving less important ones',
        ],
        realWorld: [
          'Netflix Hystrix (circuit breaker library, now in maintenance)',
          'Resilience4j (modern circuit breaker for Java)',
          'Envoy proxy (automatic circuit breaking, retries, load shedding)',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Observability & Debugging',
    part: 4,
    partTitle: 'Resilience & Practice',
    summary:
      'Observability in distributed systems goes beyond traditional monitoring — using distributed tracing, causal log analysis, and chaos engineering to understand and test the behavior of complex, interconnected services.',
    concepts: [
      {
        id: 'distributed-tracing',
        name: 'Distributed Tracing',
        description:
          'Distributed tracing follows a request as it flows through multiple services — creating a trace of spans that shows the timing, dependencies, and errors across the entire request path.',
        keyPoints: [
          'A trace represents the entire journey of a request through the system — it consists of spans (units of work in a single service) linked by parent-child relationships. Each span records start time, duration, service name, and metadata (tags/logs)',
          'Context propagation: trace context (trace ID, span ID, sampling decision) is passed between services via HTTP headers or gRPC metadata — this allows each service to add its own span to the trace without centralized coordination',
          'OpenTelemetry (OTel) is the industry-standard framework for distributed tracing, metrics, and logging — it provides language-specific SDKs, automatic instrumentation for popular libraries, and a protocol (OTLP) for exporting telemetry data to backends',
          'Trace sampling is essential because tracing every request at scale generates enormous data volumes — head-based sampling (decide at ingestion), tail-based sampling (decide after the trace is complete, keeping interesting traces like errors or slow requests), and adaptive sampling (adjust rate based on traffic)',
          'Trace visualization tools (Jaeger, Zipkin, Grafana Tempo) display traces as waterfall diagrams showing the timing of each span — enabling developers to identify which service is slow, where errors occur, and what the critical path is',
        ],
        tradeoffs: [
          'Comprehensive tracing provides full visibility but adds overhead (context propagation, span creation, export) and generates large data volumes — sampling reduces cost but may miss important traces',
          'Automatic instrumentation is easy to deploy but may miss application-specific context — manual instrumentation captures business logic details but requires developer effort to maintain',
          'Tail-based sampling keeps the most interesting traces (errors, high latency) but requires buffering complete traces before the sampling decision, adding memory overhead and delay',
        ],
        realWorld: [
          'Jaeger (CNCF, Uber-developed)',
          'Zipkin (Twitter-developed, inspired by Google Dapper)',
          'Grafana Tempo (cost-efficient trace backend)',
        ],
      },
      {
        id: 'causality-log-analysis',
        name: 'Causality & Log Analysis',
        description:
          'Causal log analysis reconstructs the happened-before relationships between events across distributed services — enabling debugging of concurrent issues that are invisible in timestamp-ordered logs.',
        keyPoints: [
          'Happens-before in logs: events at different services that are causally related (connected by message sends/receives) must be analyzed in causal order, not wall-clock order — clock skew means timestamp-ordered logs can show effects before their causes',
          'ShiViz is a visualization tool that takes logs annotated with vector clocks and displays them as a time-space diagram — showing each process as a vertical timeline with message arrows connecting them, making causal relationships visual',
          'Deterministic replay records all non-deterministic inputs (network messages, timers, random numbers) during execution and replays them in the same order — enabling exact reproduction of distributed bugs that would otherwise be non-reproducible',
          'Log aggregation systems (ELK stack, Loki, Splunk) centralize logs from all services — but centralization introduces its own challenges: network delays can reorder logs, and the volume of data requires efficient indexing and query capabilities',
          'Correlation IDs (similar to trace IDs) thread through all logs related to a single request — enabling developers to filter the aggregated log for one request\'s journey across services',
        ],
        tradeoffs: [
          'Vector clock annotations provide exact causality but require instrumenting every message send/receive in the application — significant development and maintenance overhead for large systems',
          'Deterministic replay enables perfect bug reproduction but recording all non-deterministic inputs adds runtime overhead and storage cost — typically used in testing/staging rather than production',
          'Centralized log aggregation enables powerful cross-service queries but the aggregation pipeline itself can lose or delay log entries — and the cost of storing and indexing all logs can be prohibitive at scale',
        ],
        realWorld: [
          'ELK Stack (Elasticsearch, Logstash, Kibana)',
          'Grafana Loki (log aggregation with label-based indexing)',
          'ShiViz (academic tool for visualizing distributed executions)',
        ],
      },
      {
        id: 'chaos-engineering',
        name: 'Chaos Engineering',
        description:
          'Chaos engineering proactively injects failures into production or production-like systems to discover weaknesses before they cause outages — based on the principle that the only way to know how a system fails is to make it fail.',
        keyPoints: [
          'The steady-state hypothesis: before injecting failures, define what "normal" looks like (e.g., p99 latency <100ms, error rate <0.1%) — then verify that the hypothesis holds during and after fault injection. Violations reveal weaknesses',
          'Fault injection types: process killing (Chaos Monkey), network partitions (Toxiproxy), latency injection, CPU/memory stress, DNS failures, clock skew injection — each tests different resilience mechanisms',
          'Game days: planned exercises where teams intentionally break systems while monitoring the impact — combining automated fault injection with human decision-making to test both technical systems and operational procedures',
          'Blast radius control: start with the smallest possible experiment (one instance, one request) and gradually expand — running chaos experiments on a massive scale from the start can cause real outages instead of learning opportunities',
          'The chaos engineering cycle: hypothesize (what should happen), inject fault, observe (did the system behave as expected), learn (fix any discovered weaknesses), repeat — continuous experimentation builds confidence in system resilience',
        ],
        tradeoffs: [
          'Running chaos experiments in production provides the most realistic results but risks actual customer impact — staging environments are safer but may not accurately reflect production behavior (different scale, traffic patterns, configuration)',
          'Automated continuous chaos testing catches regressions but requires investment in tooling and safety mechanisms (automatic abort if impact exceeds threshold) — manual game days are less frequent but provide deeper learning',
          'Chaos engineering reveals failure modes but doesn\'t fix them — the real work is in building the resilience that the experiments test, and many organizations discover more problems than they have capacity to fix',
        ],
        realWorld: [
          'Netflix Chaos Monkey / Simian Army (pioneered chaos engineering)',
          'Gremlin (commercial chaos engineering platform)',
          'AWS Fault Injection Simulator (managed chaos service)',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Emerging Patterns',
    part: 4,
    partTitle: 'Resilience & Practice',
    summary:
      'Emerging patterns in distributed systems address evolving challenges — from CRDTs that enable conflict-free replication, to service meshes that externalize networking concerns, to edge computing that brings computation closer to users.',
    concepts: [
      {
        id: 'crdts',
        name: 'CRDTs',
        description:
          'Conflict-free Replicated Data Types (CRDTs) are data structures that can be replicated across nodes and updated independently — with a mathematically guaranteed merge function that always converges without coordination.',
        keyPoints: [
          'State-based CRDTs (convergent, CvRDTs): each replica maintains the full state, and replicas periodically send their state to others — the merge function takes two states and produces a state that incorporates both, using a semilattice (join operation that is commutative, associative, and idempotent)',
          'Operation-based CRDTs (commutative, CmRDTs): replicas broadcast operations (not full state) to each other — operations must be commutative (order-independent), and the delivery layer must ensure at-least-once delivery (duplicates are handled by the CRDT)',
          'Common CRDT types: G-Counter (grow-only counter, one entry per replica), PN-Counter (increment/decrement using two G-Counters), G-Set (grow-only set), OR-Set (observed-remove set, add and remove elements), LWW-Register (last-writer-wins register)',
          'CRDTs guarantee strong eventual consistency — replicas that have received the same set of updates (in any order) are guaranteed to be in the same state. This is stronger than eventual consistency because it provides a convergence guarantee without requiring quiescence',
          'The metadata overhead of CRDTs can be significant — vector clocks, tombstones for deleted elements, and per-replica counters grow with the number of replicas and operations, requiring periodic garbage collection (compaction)',
        ],
        tradeoffs: [
          'CRDTs eliminate the need for coordination on writes (no consensus, no locks) but are limited in the data types they can represent — not all application logic can be expressed as a CRDT merge function',
          'State-based CRDTs are simpler (send full state, merge is idempotent) but require more bandwidth — operation-based CRDTs are more efficient (send only operations) but require reliable, causal broadcast',
          'CRDTs solve the conflict problem by making all operations commutative, but this means some user-intuitive operations (like "set this value only if it\'s currently X") cannot be directly represented — they require application-level interpretation of the merged state',
        ],
        realWorld: [
          'Riak (OR-Set, PN-Counter CRDTs)',
          'Redis CRDT (Redis Enterprise, geo-distributed conflict-free replication)',
          'Automerge/Yjs (CRDTs for collaborative editing)',
        ],
      },
      {
        id: 'service-mesh-sidecars',
        name: 'Service Mesh & Sidecars',
        description:
          'A service mesh is a dedicated infrastructure layer for service-to-service communication — using sidecar proxies to handle networking concerns (routing, load balancing, security, observability) outside of application code.',
        keyPoints: [
          'Sidecar pattern: each service instance runs alongside a proxy (sidecar) that intercepts all incoming and outgoing network traffic — the application communicates with localhost, and the sidecar handles service discovery, load balancing, retries, circuit breaking, and TLS',
          'Envoy (developed by Lyft) is the most widely used sidecar proxy — it provides L4/L7 load balancing, automatic retries with configurable policies, circuit breaking, distributed tracing injection, and rich observability (metrics, access logs)',
          'Istio is a service mesh control plane that configures Envoy sidecars across the cluster — it provides traffic management (canary deployments, A/B testing, traffic mirroring), mutual TLS (mTLS) between all services, and policy enforcement (rate limiting, access control)',
          'mTLS (mutual TLS): both the client and server present certificates to each other, authenticating both directions — the service mesh automates certificate issuance, rotation, and verification, providing zero-trust networking without application code changes',
          'Traffic management: service meshes enable sophisticated routing (send 5% of traffic to a new version, mirror production traffic to a test service, retry failed requests to a different instance) — configured declaratively, independent of application code',
        ],
        tradeoffs: [
          'Service meshes externalize networking concerns from application code, enabling consistent policies across all services — but add operational complexity (another component to deploy, monitor, and debug) and latency (each request passes through two proxies)',
          'Sidecar proxies add CPU and memory overhead per service instance (each sidecar is a separate process) — proxyless mesh alternatives (gRPC xDS) reduce this overhead but lose the language-agnostic benefit of sidecar proxies',
          'Service meshes provide powerful observability (automatic tracing, metrics) but the data volume can be overwhelming — organizations need to invest in dashboards, alerts, and sampling strategies to make the data actionable',
        ],
        realWorld: [
          'Istio (Google, IBM, widely adopted service mesh)',
          'Linkerd (CNCF, lightweight Rust-based service mesh)',
          'AWS App Mesh (managed service mesh for AWS workloads)',
        ],
      },
      {
        id: 'edge-computing-geo-distribution',
        name: 'Edge Computing & Geo-Distribution',
        description:
          'Edge computing moves computation and data closer to users at the network edge — reducing latency for interactive applications while creating new challenges for consistency, state management, and coordination across geographic regions.',
        keyPoints: [
          'CDN consistency: Content Delivery Networks cache content at edge locations (PoPs), but cache invalidation is one of the hardest problems in computer science — strong consistency requires coordinating updates across hundreds of edge locations, while stale caches serve outdated content',
          'Edge caching strategies: write-through (update edge and origin simultaneously, consistent but slow writes), write-behind (update edge, asynchronously propagate, fast writes but temporarily inconsistent), and cache-aside (edge reads from origin on miss, writes go directly to origin)',
          'Multi-region coordination: global applications (Google, Netflix, Amazon) run in multiple geographic regions for low latency — writes that must be consistent across regions incur cross-region latency (100-300ms between continents), motivating region-local writes with asynchronous cross-region replication',
          'Conflict resolution for geo-distributed writes: when users in different regions update the same data, the system must resolve conflicts — approaches include region-pinning (each user writes to one region), CRDTs (automatic merge), and application-level conflict resolution',
          'Edge functions (Cloudflare Workers, AWS Lambda@Edge, Vercel Edge Functions) run application logic at CDN edge locations — enabling personalized content, A/B testing, and API responses with single-digit millisecond latency to the user',
        ],
        tradeoffs: [
          'Moving computation to the edge reduces user-facing latency but fragments state across locations — maintaining consistency across hundreds of edge locations is significantly harder than across a few data centers',
          'Edge computing is cost-effective for read-heavy, latency-sensitive workloads (content delivery, personalization) but impractical for write-heavy workloads requiring strong consistency — the fundamental physics of speed-of-light limits cross-region coordination',
          'Edge functions have limited resources (CPU time, memory) and limited access to backend state — complex business logic still needs to run in regional data centers, creating a hybrid architecture where edge handles fast decisions and core handles complex ones',
        ],
        realWorld: [
          'Cloudflare Workers (edge compute at 300+ locations)',
          'Netflix Open Connect (edge CDN for video streaming)',
          'Fly.io (geo-distributed application platform)',
        ],
      },
    ],
  },
];

export const chapters = topics;

export function getChapter(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}
