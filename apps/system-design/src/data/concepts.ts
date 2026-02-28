export interface Concept {
  id: string;
  name: string;
  category: string;
  description: string;
  keyPoints: string[];
  tradeoffs?: string[];
  realWorld?: string[];
}

export const categories = [
  { id: 'networking', name: 'Networking', icon: 'Globe' },
  { id: 'databases', name: 'Databases', icon: 'Database' },
  { id: 'distributed', name: 'Distributed Systems', icon: 'Network' },
  { id: 'caching', name: 'Caching', icon: 'Zap' },
  { id: 'messaging', name: 'Message Queues', icon: 'MessageSquare' },
];

export const concepts: Concept[] = [
  {
    id: 'load-balancing',
    name: 'Load Balancing',
    category: 'distributed',
    description: 'Distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed.',
    keyPoints: [
      'Round-robin, least connections, IP hash strategies',
      'L4 (transport) vs L7 (application) load balancers',
      'Health checks to remove unhealthy servers',
      'Can be hardware (F5) or software (Nginx, HAProxy)',
    ],
    tradeoffs: ['Adds latency vs distributes load', 'Single point of failure if not redundant'],
    realWorld: ['AWS ELB', 'Nginx', 'Cloudflare'],
  },
  {
    id: 'caching-strategies',
    name: 'Caching Strategies',
    category: 'caching',
    description: 'Techniques for storing frequently accessed data in fast-access storage layers.',
    keyPoints: [
      'Cache-aside (lazy loading): app checks cache first, loads from DB on miss',
      'Write-through: writes go to cache and DB simultaneously',
      'Write-behind: writes go to cache, async to DB',
      'TTL (Time to Live) for cache invalidation',
    ],
    tradeoffs: ['Stale data vs freshness', 'Memory cost vs performance gain', 'Complexity vs speed'],
    realWorld: ['Redis', 'Memcached', 'CDN edge caching'],
  },
  {
    id: 'cap-theorem',
    name: 'CAP Theorem',
    category: 'distributed',
    description: 'In a distributed system, you can only guarantee two of three: Consistency, Availability, Partition tolerance.',
    keyPoints: [
      'Consistency: all nodes see same data at same time',
      'Availability: every request gets a response',
      'Partition tolerance: system works despite network partitions',
      'In practice, P is unavoidable — choose CP or AP',
    ],
    tradeoffs: ['CP: strong consistency but may be unavailable during partitions', 'AP: always available but may return stale data'],
    realWorld: ['CP: MongoDB, HBase', 'AP: Cassandra, DynamoDB', 'CA: single-node RDBMS'],
  },
  {
    id: 'sql-vs-nosql',
    name: 'SQL vs NoSQL',
    category: 'databases',
    description: 'Comparing relational databases with non-relational alternatives.',
    keyPoints: [
      'SQL: structured schema, ACID transactions, JOINs',
      'NoSQL types: document (MongoDB), key-value (Redis), column (Cassandra), graph (Neo4j)',
      'NoSQL: flexible schema, horizontal scaling, eventual consistency',
      'SQL for complex queries and relationships; NoSQL for scale and flexibility',
    ],
    tradeoffs: ['Schema flexibility vs data integrity', 'Horizontal scaling vs ACID guarantees'],
    realWorld: ['PostgreSQL, MySQL (SQL)', 'MongoDB, DynamoDB (NoSQL)'],
  },
  {
    id: 'rest-vs-graphql',
    name: 'REST vs GraphQL',
    category: 'networking',
    description: 'Two approaches to designing APIs for client-server communication.',
    keyPoints: [
      'REST: resource-based URLs, HTTP methods (GET/POST/PUT/DELETE)',
      'GraphQL: single endpoint, client specifies exact data needed',
      'REST can over-fetch or under-fetch data',
      'GraphQL solves N+1 query problem but adds complexity',
    ],
    tradeoffs: ['REST simplicity vs GraphQL flexibility', 'Caching ease (REST) vs query precision (GraphQL)'],
    realWorld: ['REST: most public APIs', 'GraphQL: GitHub API v4, Shopify'],
  },
  {
    id: 'message-queues',
    name: 'Message Queues',
    category: 'messaging',
    description: 'Asynchronous communication between services using message brokers.',
    keyPoints: [
      'Producers send messages, consumers process them',
      'Decouples services — producer doesn\'t wait for consumer',
      'Supports pub/sub and point-to-point patterns',
      'Dead letter queues for failed messages',
    ],
    tradeoffs: ['Eventual consistency vs immediate processing', 'Added infrastructure complexity vs decoupling benefits'],
    realWorld: ['RabbitMQ', 'Apache Kafka', 'AWS SQS'],
  },
  {
    id: 'database-indexing',
    name: 'Database Indexing',
    category: 'databases',
    description: 'Data structures that improve the speed of data retrieval operations.',
    keyPoints: [
      'B-tree indexes: balanced tree, good for range queries',
      'Hash indexes: O(1) lookups, equality queries only',
      'Composite indexes: multiple columns, leftmost prefix rule',
      'Trade-off: faster reads but slower writes (index maintenance)',
    ],
    tradeoffs: ['Read speed vs write speed', 'Storage space vs query performance'],
    realWorld: ['PostgreSQL B-tree, GIN, GiST indexes', 'MySQL InnoDB clustered index'],
  },
  {
    id: 'cdn',
    name: 'Content Delivery Network',
    category: 'networking',
    description: 'Geographically distributed servers that deliver content to users from the nearest location.',
    keyPoints: [
      'Reduces latency by serving content from edge servers',
      'Caches static assets: images, CSS, JS, videos',
      'Origin server is the source of truth',
      'Cache invalidation strategies: TTL, purge, versioning',
    ],
    tradeoffs: ['Cost vs performance', 'Cache staleness vs freshness'],
    realWorld: ['Cloudflare', 'AWS CloudFront', 'Fastly'],
  },
];
