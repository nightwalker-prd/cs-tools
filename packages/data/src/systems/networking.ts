import type { SystemConcept } from '../types';

export const tcpIp: SystemConcept = {
  id: 'tcp-ip',
  name: 'TCP/IP',
  category: 'networking',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'The foundational protocol suite of the internet. TCP provides reliable, ordered, error-checked delivery of data between applications. IP handles addressing and routing of packets.',
  keyPoints: [
    'TCP: connection-oriented, reliable, ordered delivery',
    'Three-way handshake: SYN, SYN-ACK, ACK',
    'Flow control via sliding window',
    'Congestion control: slow start, congestion avoidance',
    'UDP is the unreliable alternative — faster, no ordering guarantees',
  ],
  tradeoffs: [
    'TCP: reliable but slower due to overhead',
    'UDP: fast but no delivery guarantees',
    'TCP has head-of-line blocking',
  ],
  realWorldExamples: ['HTTP/HTTPS', 'SSH', 'Email (SMTP)', 'File transfer (FTP)'],
};

export const http: SystemConcept = {
  id: 'http',
  name: 'HTTP/HTTPS',
  category: 'networking',
  pillar: 'systems',
  difficulty: 'easy',
  description: 'Hypertext Transfer Protocol is the application-layer protocol for the web. HTTPS adds TLS encryption for security. Uses request-response model with methods like GET, POST, PUT, DELETE.',
  keyPoints: [
    'Stateless protocol — each request is independent',
    'Methods: GET (read), POST (create), PUT (update), DELETE (remove)',
    'Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error',
    'HTTP/2: multiplexing, header compression, server push',
    'HTTP/3: QUIC protocol (UDP-based), eliminates head-of-line blocking',
  ],
  tradeoffs: [
    'Statelessness simplifies servers but requires cookies/sessions for state',
    'HTTPS adds ~1 RTT for TLS handshake',
    'REST vs GraphQL vs gRPC for API design',
  ],
  realWorldExamples: ['Web browsers', 'REST APIs', 'CDN delivery'],
};

export const dns: SystemConcept = {
  id: 'dns',
  name: 'DNS',
  category: 'networking',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'Domain Name System translates human-readable domain names to IP addresses. Uses a hierarchical, distributed database with caching at multiple levels.',
  keyPoints: [
    'Hierarchical: root -> TLD (.com) -> authoritative (example.com)',
    'Record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail)',
    'Caching with TTL reduces lookup latency',
    'Recursive vs iterative resolution',
    'DNS is typically over UDP port 53',
  ],
  tradeoffs: [
    'Caching improves performance but can serve stale data',
    'DNS propagation can take up to 48 hours',
    'Vulnerable to DNS spoofing/poisoning without DNSSEC',
  ],
  realWorldExamples: ['Web browsing', 'Email routing', 'CDN routing', 'Load balancing via DNS round-robin'],
};

export const webSockets: SystemConcept = {
  id: 'websockets',
  name: 'WebSockets',
  category: 'networking',
  pillar: 'systems',
  difficulty: 'medium',
  description: 'A protocol providing full-duplex communication over a single TCP connection. Unlike HTTP, allows the server to push data to clients without polling.',
  keyPoints: [
    'Full-duplex: both client and server can send simultaneously',
    'Starts as HTTP upgrade request, then switches to WebSocket protocol',
    'Persistent connection — no repeated handshakes',
    'Low latency compared to HTTP polling',
    'ws:// (unencrypted) and wss:// (TLS encrypted)',
  ],
  tradeoffs: [
    'More complex than HTTP — need to handle reconnection, heartbeats',
    'Not cacheable like HTTP responses',
    'Stateful connections are harder to scale horizontally',
    'Server-Sent Events (SSE) is simpler for one-way streaming',
  ],
  realWorldExamples: ['Chat applications', 'Real-time dashboards', 'Online gaming', 'Live sports scores'],
};

export const networkingConcepts: SystemConcept[] = [
  tcpIp,
  http,
  dns,
  webSockets,
];
