import type { SystemConcept } from '../types';

export const sqlVsNosql: SystemConcept = {
  id: 'sql-vs-nosql',
  name: 'SQL vs NoSQL',
  category: 'databases',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'SQL databases use structured schemas with relational tables and ACID transactions. NoSQL databases offer flexible schemas with various data models (document, key-value, column-family, graph).',
  keyPoints: [
    'SQL: structured schema, relational, ACID compliant',
    'NoSQL: flexible schema, various models (document, key-value, graph, column)',
    'SQL excels at complex queries and joins',
    'NoSQL excels at horizontal scaling and flexible data',
    'Many modern systems use both (polyglot persistence)',
  ],
  tradeoffs: [
    'SQL: strong consistency but harder to scale horizontally',
    'NoSQL: easy to scale but eventual consistency trade-off',
    'SQL: schema changes require migrations',
    'NoSQL: data duplication and denormalization common',
  ],
  realWorldExamples: [
    'PostgreSQL, MySQL (SQL)',
    'MongoDB, DynamoDB (document)',
    'Redis, Memcached (key-value)',
    'Neo4j (graph)',
    'Cassandra (column-family)',
  ],
};

export const indexing: SystemConcept = {
  id: 'database-indexing',
  name: 'Database Indexing',
  category: 'databases',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'Database indexes are data structures (typically B-trees or hash indexes) that speed up read queries at the cost of slower writes and additional storage.',
  keyPoints: [
    'B-tree index: balanced tree, supports range queries, most common',
    'Hash index: O(1) exact lookup, no range queries',
    'Composite index: multiple columns, leftmost prefix rule',
    'Covering index: contains all columns needed by a query',
    'Too many indexes slow down writes (INSERT, UPDATE, DELETE)',
  ],
  tradeoffs: [
    'Faster reads vs slower writes',
    'Additional storage for index data',
    'Index maintenance overhead on data modifications',
    'Need to balance number of indexes with write performance',
  ],
  realWorldExamples: ['Primary key indexes', 'Search indexes (Elasticsearch)', 'Full-text search indexes'],
};

export const acid: SystemConcept = {
  id: 'acid',
  name: 'ACID Properties',
  category: 'databases',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'ACID (Atomicity, Consistency, Isolation, Durability) are properties that guarantee database transactions are processed reliably.',
  keyPoints: [
    'Atomicity: all operations in a transaction succeed or all fail',
    'Consistency: transactions bring the database from one valid state to another',
    'Isolation: concurrent transactions do not interfere with each other',
    'Durability: committed transactions survive system failures',
    'Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable',
  ],
  tradeoffs: [
    'Stronger isolation reduces concurrency and throughput',
    'Full ACID limits horizontal scalability',
    'BASE (Basically Available, Soft state, Eventually consistent) is the NoSQL alternative',
  ],
  realWorldExamples: ['Banking transactions', 'E-commerce orders', 'Inventory management'],
};

export const databaseConcepts: SystemConcept[] = [
  sqlVsNosql,
  indexing,
  acid,
];
