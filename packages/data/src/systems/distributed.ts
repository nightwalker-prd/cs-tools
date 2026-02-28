import type { SystemConcept } from '../types';

export const capTheorem: SystemConcept = {
  id: 'cap-theorem',
  name: 'CAP Theorem',
  category: 'distributed',
  pillar: 'systems',
  difficulty: 'hard',
  description: 'States that a distributed system can only provide two of three guarantees simultaneously: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition Tolerance (system continues despite network failures).',
  keyPoints: [
    'C: every read receives the most recent write',
    'A: every request receives a non-error response',
    'P: the system continues despite network partitions',
    'In practice, P is required — so the choice is between CP and AP',
    'PACELC extends CAP: during Partition choose A or C; Else choose Latency or Consistency',
  ],
  tradeoffs: [
    'CP systems: consistent but may be unavailable during partitions',
    'AP systems: available but may return stale data',
    'Strong consistency costs latency; eventual consistency improves availability',
  ],
  realWorldExamples: [
    'CP: HBase, MongoDB (default), etcd',
    'AP: Cassandra, DynamoDB, CouchDB',
  ],
};

export const consistencyModels: SystemConcept = {
  id: 'consistency-models',
  name: 'Consistency Models',
  category: 'distributed',
  pillar: 'systems',
  difficulty: 'hard',
  description: 'Define the rules for how and when updates become visible to readers in a distributed system. Range from strong consistency (linearizability) to eventual consistency.',
  keyPoints: [
    'Linearizability (strong): operations appear instantaneous and sequential',
    'Sequential consistency: all processes see the same order of operations',
    'Causal consistency: causally related operations are seen in order',
    'Eventual consistency: given enough time, all replicas converge',
    'Read-your-writes: a process always sees its own writes',
  ],
  tradeoffs: [
    'Stronger consistency = higher latency and lower availability',
    'Eventual consistency = better performance but harder application logic',
    'Tunable consistency (e.g., Cassandra) allows per-query tradeoffs',
  ],
  realWorldExamples: [
    'Linearizable: Spanner, CockroachDB',
    'Eventual: DNS, S3, DynamoDB (configurable)',
    'Causal: MongoDB causal sessions',
  ],
};

export const loadBalancing: SystemConcept = {
  id: 'load-balancing',
  name: 'Load Balancing',
  category: 'distributed',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'Distributes incoming requests across multiple servers to ensure no single server is overwhelmed. Key to achieving high availability and horizontal scalability.',
  keyPoints: [
    'Algorithms: round-robin, least connections, weighted, IP hash, consistent hashing',
    'L4 (transport): routes based on IP/port, faster but less flexible',
    'L7 (application): routes based on HTTP headers/URLs, more flexible',
    'Health checks: active (ping) and passive (monitor responses)',
    'Session affinity (sticky sessions) vs stateless design',
  ],
  tradeoffs: [
    'Sticky sessions simplify state but reduce load distribution',
    'L7 load balancing is more flexible but adds latency',
    'Consistent hashing minimizes redistribution when servers are added/removed',
  ],
  realWorldExamples: ['Nginx', 'HAProxy', 'AWS ALB/NLB', 'Cloudflare'],
};

export const distributedConcepts: SystemConcept[] = [
  capTheorem,
  consistencyModels,
  loadBalancing,
];
