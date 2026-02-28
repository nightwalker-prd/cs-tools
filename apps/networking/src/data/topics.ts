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

// Aliases for component compatibility with DDIA pattern
export type Chapter = Topic;

export const parts = [
  { id: 1, title: 'Foundations' },
  { id: 2, title: 'Transport & Application' },
  { id: 3, title: 'Security & Modern Networking' },
];

export const topics: Topic[] = [
  // ═══════════════════════════════════════════════════════════════
  // PART 1: Foundations
  // ═══════════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Network Models & Layers',
    part: 1,
    partTitle: 'Foundations',
    summary: 'The conceptual frameworks that organize networking into manageable layers — the OSI 7-layer model and the TCP/IP 4-layer model — along with how data is encapsulated and addressed at each layer.',
    concepts: [
      {
        id: 'osi-model',
        name: 'OSI 7-Layer Model',
        description: 'The Open Systems Interconnection model divides network communication into seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
        keyPoints: [
          'Each layer provides services to the layer above and consumes services from the layer below',
          'Physical (L1): raw bits over a medium — cables, radio waves, voltage levels',
          'Data Link (L2): frames between directly connected nodes — MAC addresses, error detection',
          'Network (L3): routing packets across networks — IP addresses, routers',
          'Transport (L4): end-to-end communication — TCP/UDP, ports, flow control',
          'Session/Presentation/Application (L5-7): often collapsed in practice — handles sessions, encoding, and app protocols',
        ],
        tradeoffs: [
          'Clean abstraction vs. real-world leakiness — many protocols span multiple OSI layers',
          'Useful for teaching but TCP/IP model is more practical for implementation',
        ],
        realWorld: ['Network troubleshooting', 'Certification exams (CCNA)', 'Protocol design'],
      },
      {
        id: 'tcp-ip-model',
        name: 'TCP/IP 4-Layer Model',
        description: 'The practical model used by the Internet: Link, Internet, Transport, and Application layers — simpler than OSI and maps directly to real protocols.',
        keyPoints: [
          'Link layer: combines OSI L1-L2 — Ethernet, Wi-Fi, ARP',
          'Internet layer: corresponds to OSI L3 — IP (v4/v6), ICMP, routing',
          'Transport layer: corresponds to OSI L4 — TCP, UDP',
          'Application layer: combines OSI L5-L7 — HTTP, DNS, SMTP, SSH',
          'Designed around real protocols rather than abstract theory',
        ],
        tradeoffs: [
          'Simpler and more practical but less granular for analysis',
          'Link layer conflates physical and data link concerns',
        ],
        realWorld: ['Linux networking stack', 'Socket programming', 'Internet RFC standards'],
      },
      {
        id: 'encapsulation',
        name: 'Encapsulation & PDUs',
        description: 'Each layer wraps data from the layer above with its own header (and sometimes trailer), creating Protocol Data Units (PDUs) specific to that layer.',
        keyPoints: [
          'Application data → Segment (Transport) → Packet (Network) → Frame (Data Link) → Bits (Physical)',
          'Each header contains addressing and control information for that layer',
          'Decapsulation reverses the process at the receiving end — each layer strips its header',
          'MTU (Maximum Transmission Unit) limits frame size — typically 1500 bytes for Ethernet',
          'Fragmentation occurs when a packet exceeds the MTU of a link',
        ],
        realWorld: ['Wireshark packet analysis', 'MTU troubleshooting', 'VPN overhead calculations'],
      },
      {
        id: 'addressing',
        name: 'Addressing at Each Layer',
        description: 'Each layer uses its own addressing scheme — MAC addresses at L2, IP addresses at L3, and port numbers at L4 — to ensure data reaches the right destination.',
        keyPoints: [
          'MAC addresses (L2): 48-bit hardware addresses, flat namespace, used for local delivery',
          'IP addresses (L3): hierarchical addresses, enable routing across networks',
          'Port numbers (L4): 16-bit numbers identifying specific processes/services on a host',
          'ARP bridges L2 and L3 by resolving IP addresses to MAC addresses on a local network',
          'DNS bridges human-readable names to IP addresses at the application layer',
        ],
        tradeoffs: [
          'Flat vs. hierarchical addressing: MACs are simple but unroutable; IPs enable routing but require management',
          'NAT reuses private IPs but breaks end-to-end addressing transparency',
        ],
        realWorld: ['DHCP assignment', 'Network segmentation', 'Port forwarding'],
      },
    ],
  },
  {
    id: 2,
    title: 'Physical & Data Link Layer',
    part: 1,
    partTitle: 'Foundations',
    summary: 'How raw data moves over physical media and how devices on the same network segment communicate using Ethernet, MAC addressing, switches, and VLANs.',
    concepts: [
      {
        id: 'ethernet',
        name: 'Ethernet & IEEE 802.3',
        description: 'The dominant LAN technology — defines framing, addressing (MAC), and media access for wired networks, operating at speeds from 10 Mbps to 400 Gbps.',
        keyPoints: [
          'Ethernet frame: preamble, destination MAC, source MAC, EtherType, payload (46-1500 bytes), FCS',
          'CSMA/CD (Carrier Sense Multiple Access with Collision Detection) for half-duplex — mostly obsolete with switches',
          'Full-duplex operation eliminates collisions — each direction has its own channel',
          'Auto-negotiation determines speed and duplex between connected devices',
          'Jumbo frames (9000-byte MTU) reduce overhead for high-throughput workloads',
        ],
        tradeoffs: [
          'Simple and ubiquitous but limited to local area networks',
          'Jumbo frames improve throughput but require end-to-end support — one non-supporting device breaks it',
        ],
        realWorld: ['Data center networking', 'Home/office LANs', '10GbE server connections'],
      },
      {
        id: 'mac-switching',
        name: 'MAC Addresses & Switches',
        description: 'Switches operate at L2, using MAC address tables to forward frames only to the correct port — replacing the broadcast nature of hubs with intelligent forwarding.',
        keyPoints: [
          'Switches learn source MAC addresses by examining incoming frames and building a MAC table',
          'Unknown destination MACs cause flooding — the frame is sent to all ports except the source',
          'MAC table entries age out after a timeout (typically 300 seconds)',
          'Spanning Tree Protocol (STP) prevents loops in networks with redundant switch links',
          'Broadcast frames (destination FF:FF:FF:FF:FF:FF) are always flooded to all ports in a VLAN',
        ],
        tradeoffs: [
          'STP prevents loops but can waste bandwidth by blocking redundant paths — RSTP converges faster',
          'Large broadcast domains create noise — VLANs segment them',
        ],
        realWorld: ['Enterprise switch configuration', 'Network loops troubleshooting', 'Campus networks'],
      },
      {
        id: 'arp',
        name: 'ARP (Address Resolution Protocol)',
        description: 'ARP maps IP addresses to MAC addresses on a local network, enabling L3 packets to be delivered via L2 frames.',
        keyPoints: [
          'ARP Request is broadcast: "Who has 192.168.1.1? Tell 192.168.1.100"',
          'ARP Reply is unicast: "192.168.1.1 is at AA:BB:CC:DD:EE:FF"',
          'ARP cache stores recent mappings to avoid repeated broadcasts',
          'Gratuitous ARP announces a host\'s own IP-to-MAC mapping — used for IP conflict detection and failover',
          'ARP is unencrypted and unauthenticated — vulnerable to ARP spoofing/poisoning',
        ],
        tradeoffs: [
          'Simple and effective for small networks but does not scale — each ARP request is a broadcast',
          'Lack of authentication makes it a security risk on untrusted networks',
        ],
        realWorld: ['ARP spoofing attacks', 'High-availability failover', 'Network debugging with arp -a'],
      },
      {
        id: 'vlans',
        name: 'VLANs (Virtual LANs)',
        description: 'VLANs logically segment a physical switch into multiple isolated broadcast domains, providing security and traffic isolation without separate hardware.',
        keyPoints: [
          'IEEE 802.1Q inserts a 4-byte tag into Ethernet frames with a 12-bit VLAN ID (1-4094)',
          'Access ports carry traffic for a single VLAN — frames are untagged',
          'Trunk ports carry traffic for multiple VLANs — frames are tagged with VLAN IDs',
          'Inter-VLAN routing requires a L3 device (router or L3 switch)',
          'Native VLAN on trunk ports handles untagged traffic — mismatches cause security issues',
        ],
        tradeoffs: [
          'VLANs reduce broadcast domains but add configuration complexity',
          'VLAN hopping attacks possible if trunking is misconfigured',
        ],
        realWorld: ['Enterprise network segmentation', 'Guest Wi-Fi isolation', 'Voice VLANs for IP phones'],
      },
    ],
  },
  {
    id: 3,
    title: 'IP & Network Layer',
    part: 1,
    partTitle: 'Foundations',
    summary: 'The network layer handles logical addressing and routing — how packets find their way across interconnected networks using IPv4, IPv6, subnetting, routing protocols, and NAT.',
    concepts: [
      {
        id: 'ipv4',
        name: 'IPv4 & CIDR Subnetting',
        description: 'IPv4 uses 32-bit addresses (4.3 billion total) with CIDR notation for flexible subnetting — dividing networks into smaller, manageable blocks.',
        keyPoints: [
          'IPv4 address: 32 bits in dotted decimal (e.g., 192.168.1.0) with a subnet mask',
          'CIDR notation: /24 means 24 network bits, 8 host bits → 256 addresses (254 usable)',
          'Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — not routable on the Internet',
          'Subnetting divides a network into smaller subnets — each subnet needs a network address and broadcast address',
          'IPv4 exhaustion: IANA allocated the last /8 blocks in 2011 — NAT and IPv6 are the solutions',
        ],
        tradeoffs: [
          'Simple and well-understood but address space is exhausted',
          'NAT extends IPv4 life but breaks end-to-end connectivity and complicates peer-to-peer',
        ],
        realWorld: ['Cloud VPC design', 'Home router configuration', 'Enterprise IP planning'],
      },
      {
        id: 'ipv6',
        name: 'IPv6',
        description: 'IPv6 uses 128-bit addresses (340 undecillion) to solve IPv4 exhaustion, with built-in features like auto-configuration, simplified headers, and mandatory IPsec support.',
        keyPoints: [
          '128-bit addresses in colon-hexadecimal: 2001:0db8::1 (zero compression with ::)',
          'No NAT needed — every device can have a globally unique address',
          'Stateless Address Autoconfiguration (SLAAC) lets devices self-assign addresses using router advertisements',
          'Simplified header: fixed 40-byte base header, no checksum (delegated to L4), extension headers for options',
          'Dual-stack: running IPv4 and IPv6 simultaneously during the transition period',
        ],
        tradeoffs: [
          'Vast address space and cleaner design but adoption is slow and complex to transition',
          'Some legacy applications and devices still lack IPv6 support',
        ],
        realWorld: ['Mobile carriers (T-Mobile, Verizon)', 'Cloud providers (AWS, GCP)', 'IoT deployments'],
      },
      {
        id: 'routing',
        name: 'Routing & Forwarding',
        description: 'Routers forward packets between networks by consulting routing tables — populated by static routes or dynamic routing protocols that adapt to topology changes.',
        keyPoints: [
          'Routing table: destination network → next hop + interface, with longest prefix match for lookup',
          'Static routing: manually configured — simple but doesn\'t adapt to failures',
          'Distance-vector protocols (RIP): share routing tables with neighbors, prone to count-to-infinity',
          'Link-state protocols (OSPF): build a complete topology map, faster convergence, more CPU/memory',
          'Default route (0.0.0.0/0): catch-all for packets with no specific route — "gateway of last resort"',
        ],
        tradeoffs: [
          'Static routes are simple and predictable but don\'t handle failures automatically',
          'Dynamic protocols adapt to changes but add complexity and CPU overhead',
          'Link-state scales better than distance-vector but requires more memory for the topology database',
        ],
        realWorld: ['Enterprise OSPF deployments', 'Home router default routes', 'Data center leaf-spine routing'],
      },
      {
        id: 'nat',
        name: 'NAT (Network Address Translation)',
        description: 'NAT translates private IP addresses to public ones, allowing multiple devices to share a single public IP — the primary mechanism extending IPv4\'s lifespan.',
        keyPoints: [
          'SNAT (Source NAT): replaces source IP of outbound packets — used by home routers (PAT/NAPT)',
          'DNAT (Destination NAT): redirects inbound traffic to internal servers — used for port forwarding',
          'PAT (Port Address Translation): maps many internal IPs to one public IP using unique source ports',
          'NAT traversal (STUN, TURN, ICE): techniques for establishing peer-to-peer connections through NAT',
          'Carrier-grade NAT (CGNAT): ISPs NAT entire customer ranges behind shared public IPs',
        ],
        tradeoffs: [
          'Extends IPv4 but breaks end-to-end principle — some protocols (SIP, FTP) need NAT-aware helpers',
          'CGNAT makes inbound connections and IP-based geolocation unreliable',
        ],
        realWorld: ['Home routers', 'AWS Internet Gateways', 'WebRTC peer connections via ICE'],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART 2: Transport & Application
  // ═══════════════════════════════════════════════════════════════
  {
    id: 4,
    title: 'Transport Layer',
    part: 2,
    partTitle: 'Transport & Application',
    summary: 'The transport layer provides end-to-end communication between processes — TCP for reliable, ordered delivery with congestion control, and UDP for lightweight, low-latency messaging.',
    concepts: [
      {
        id: 'tcp-fundamentals',
        name: 'TCP Fundamentals',
        description: 'TCP (Transmission Control Protocol) provides reliable, ordered, byte-stream delivery between applications using a connection-oriented, three-way handshake model.',
        keyPoints: [
          'Three-way handshake: SYN → SYN-ACK → ACK establishes a connection with synchronized sequence numbers',
          'Sequence numbers track every byte sent — receiver ACKs the next expected byte',
          'Retransmission: lost segments are detected via timeout or duplicate ACKs and resent',
          'Connection teardown: FIN → ACK → FIN → ACK (four-way) with TIME_WAIT to handle delayed segments',
          'TCP provides a reliable byte stream abstraction — the application doesn\'t see packet boundaries',
        ],
        tradeoffs: [
          'Reliable delivery adds latency — handshake (1 RTT), retransmissions, head-of-line blocking',
          'Connection state consumes memory on both endpoints — each connection tracks buffers, timers, sequence numbers',
        ],
        realWorld: ['HTTP/1.1 and HTTP/2', 'Database connections', 'SSH sessions'],
      },
      {
        id: 'flow-congestion',
        name: 'Flow & Congestion Control',
        description: 'TCP uses flow control (receiver-driven) to prevent overwhelming the receiver and congestion control (network-driven) to prevent overwhelming the network.',
        keyPoints: [
          'Flow control: receiver advertises a window size (rwnd) — sender won\'t exceed it',
          'Congestion window (cwnd): sender-side limit based on perceived network capacity',
          'Slow start: cwnd doubles each RTT until hitting ssthresh, then switches to congestion avoidance (linear growth)',
          'Packet loss triggers fast retransmit (3 duplicate ACKs → halve cwnd) or timeout (reset to 1 MSS)',
          'Modern algorithms: CUBIC (Linux default), BBR (Google — models bandwidth and RTT instead of loss)',
        ],
        tradeoffs: [
          'Loss-based algorithms (CUBIC) underutilize links with large buffers (bufferbloat) and over-reduce on random loss',
          'BBR improves throughput on long-fat pipes but can be unfair to loss-based flows on shared links',
        ],
        realWorld: ['Netflix uses BBR for video streaming', 'Data center networks use DCTCP', 'Bufferbloat in home routers'],
      },
      {
        id: 'udp',
        name: 'UDP',
        description: 'UDP (User Datagram Protocol) provides connectionless, unreliable datagram delivery with minimal overhead — just source/destination ports, length, and a checksum.',
        keyPoints: [
          'No connection setup, no handshake — send datagrams immediately',
          'No ordering, no retransmission, no flow control — the application handles reliability if needed',
          'UDP header is only 8 bytes vs. TCP\'s 20+ bytes — lower overhead',
          'Supports multicast and broadcast — TCP is point-to-point only',
          'UDP-based protocols add selective reliability: QUIC, RTP (real-time), DTLS (security)',
        ],
        tradeoffs: [
          'Low latency and simplicity but no built-in reliability — dropped packets are lost unless the app handles it',
          'NAT/firewall traversal is harder — no connection state to track',
        ],
        realWorld: ['DNS queries', 'VoIP/video calls (RTP)', 'Online gaming', 'QUIC (HTTP/3)'],
      },
      {
        id: 'ports-multiplexing',
        name: 'Ports & Multiplexing',
        description: 'Port numbers (0-65535) allow multiple applications on a single host to share the network — the combination of IP + port uniquely identifies a communication endpoint.',
        keyPoints: [
          'Well-known ports (0-1023): assigned to standard services — HTTP (80), HTTPS (443), SSH (22), DNS (53)',
          'Registered ports (1024-49151): used by applications like databases (3306, 5432) and custom services',
          'Ephemeral ports (49152-65535): dynamically assigned for client-side connections',
          'A 5-tuple (protocol, src IP, src port, dst IP, dst port) uniquely identifies a connection',
          'Socket: the OS abstraction for a network endpoint — bind, listen, accept, connect, send, recv',
        ],
        realWorld: ['Web server listening on port 443', 'Docker port mapping (-p 8080:80)', 'netstat/ss diagnostics'],
      },
    ],
  },
  {
    id: 5,
    title: 'DNS & Name Resolution',
    part: 2,
    partTitle: 'Transport & Application',
    summary: 'The Domain Name System translates human-readable domain names to IP addresses through a distributed, hierarchical database — the Internet\'s phone book.',
    concepts: [
      {
        id: 'dns-hierarchy',
        name: 'DNS Hierarchy & Resolution',
        description: 'DNS uses a tree-structured namespace with delegated zones — resolution walks the tree from root servers down through TLD and authoritative servers to find the answer.',
        keyPoints: [
          'Root servers (13 logical, hundreds of physical via anycast) → TLD servers (.com, .org, .net) → authoritative servers',
          'Recursive resolver (usually your ISP or 8.8.8.8): does the full resolution on behalf of the client',
          'Iterative query: resolver asks each server in turn, following referrals down the hierarchy',
          'Resolution example: . → com. → example.com. → www.example.com → 93.184.216.34',
          'Delegation: parent zone contains NS records pointing to the authoritative servers for child zones',
        ],
        tradeoffs: [
          'Distributed design provides resilience but DNS resolution adds latency to every new connection',
          'Caching reduces lookups but stale caches can serve outdated records',
        ],
        realWorld: ['Cloudflare 1.1.1.1', 'Google 8.8.8.8', 'Corporate internal DNS'],
      },
      {
        id: 'dns-records',
        name: 'DNS Record Types',
        description: 'Different record types map domain names to various resources — IP addresses, mail servers, aliases, text data, and more.',
        keyPoints: [
          'A record: maps domain to IPv4 address (e.g., example.com → 93.184.216.34)',
          'AAAA record: maps domain to IPv6 address',
          'CNAME: alias one domain to another — cannot coexist with other records at the zone apex',
          'MX record: specifies mail servers with priority values (lower = higher priority)',
          'TXT record: arbitrary text — used for SPF, DKIM, domain verification, and other metadata',
          'NS record: delegates a zone to its authoritative name servers',
        ],
        realWorld: ['Email setup (MX + SPF + DKIM)', 'CDN configuration (CNAME)', 'Domain verification (TXT)'],
      },
      {
        id: 'dns-caching',
        name: 'DNS Caching & TTL',
        description: 'DNS responses include a Time-To-Live (TTL) value that controls how long resolvers and clients cache the record — balancing performance against freshness.',
        keyPoints: [
          'TTL is set by the authoritative server in seconds — common values: 300s (5 min) to 86400s (24 hours)',
          'Low TTL enables fast failover and updates but increases DNS query volume',
          'High TTL reduces query load but means changes propagate slowly',
          'Negative caching: NXDOMAIN (non-existent domain) responses are also cached per the SOA minimum TTL',
          'Browser, OS, and resolver each maintain their own cache layers',
        ],
        tradeoffs: [
          'Low TTL (60-300s) for services needing fast failover vs. high TTL (3600-86400s) for stable records',
          'Pre-migration TTL lowering: reduce TTL days before a DNS change, then raise it back after',
        ],
        realWorld: ['CDN failover', 'DNS-based load balancing', 'Migration planning'],
      },
      {
        id: 'dns-security',
        name: 'DNSSEC & DNS over HTTPS',
        description: 'DNSSEC adds cryptographic signatures to DNS records to prevent spoofing, while DoH/DoT encrypt DNS queries to prevent eavesdropping and manipulation in transit.',
        keyPoints: [
          'DNS is unencrypted by default — anyone on the path can see queries and forge responses',
          'DNSSEC: chain of trust from root → TLD → authoritative, using RRSIG, DNSKEY, and DS records',
          'DNSSEC proves authenticity (record wasn\'t tampered) but does not encrypt the query',
          'DNS over HTTPS (DoH): DNS queries sent via HTTPS to port 443 — encrypted and indistinguishable from web traffic',
          'DNS over TLS (DoT): DNS queries encrypted via TLS on port 853 — easier to identify and block than DoH',
        ],
        tradeoffs: [
          'DNSSEC adds complexity and larger responses but prevents cache poisoning and spoofing',
          'DoH provides privacy but makes it harder for network administrators to monitor and filter DNS traffic',
        ],
        realWorld: ['Firefox DoH (Cloudflare)', 'Chrome DoH', 'Enterprise DNS filtering challenges'],
      },
    ],
  },
  {
    id: 6,
    title: 'HTTP & the Web',
    part: 2,
    partTitle: 'Transport & Application',
    summary: 'HTTP is the protocol of the Web — evolving from a simple request-response text protocol to multiplexed, encrypted, and UDP-based versions that power modern applications.',
    concepts: [
      {
        id: 'http11',
        name: 'HTTP/1.1',
        description: 'The workhorse of the web for 20+ years — text-based request-response protocol with persistent connections, chunked transfer, and content negotiation.',
        keyPoints: [
          'Methods: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove)',
          'Persistent connections (keep-alive): reuse TCP connections for multiple requests — default in HTTP/1.1',
          'Pipelining: send multiple requests without waiting — but responses must be in order (head-of-line blocking)',
          'Chunked transfer encoding: stream response body in chunks when total size is unknown',
          'Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error',
        ],
        tradeoffs: [
          'Simple and well-supported but head-of-line blocking limits performance',
          'Text-based headers are human-readable but wasteful — repeated headers on every request',
        ],
        realWorld: ['REST APIs', 'Most web servers still support it', 'curl and debugging tools'],
      },
      {
        id: 'http2',
        name: 'HTTP/2',
        description: 'Binary multiplexed protocol that solves HTTP/1.1\'s head-of-line blocking at the application layer — multiple streams share a single TCP connection.',
        keyPoints: [
          'Binary framing: requests/responses are split into frames and multiplexed on streams',
          'Multiplexing: multiple concurrent requests/responses on one TCP connection — no HOL blocking at HTTP level',
          'Header compression (HPACK): stateful compression reduces redundant header overhead',
          'Server push: server proactively sends resources before client requests them',
          'Stream prioritization: clients can indicate which resources are most important',
        ],
        tradeoffs: [
          'Eliminates HTTP-level HOL blocking but TCP-level HOL blocking remains — one lost packet stalls all streams',
          'Server push is rarely used in practice — hard to predict what clients need, CDN caching conflicts',
        ],
        realWorld: ['Most modern websites', 'gRPC uses HTTP/2 as transport', 'CDN providers (Cloudflare, Akamai)'],
      },
      {
        id: 'http3-quic',
        name: 'HTTP/3 & QUIC',
        description: 'HTTP/3 runs over QUIC (UDP-based transport) instead of TCP — eliminating TCP\'s head-of-line blocking and reducing connection setup latency to 0-1 RTT.',
        keyPoints: [
          'QUIC: UDP-based transport with built-in TLS 1.3 encryption — 0-RTT connection setup for repeat connections',
          'Independent streams: lost packets only affect their own stream, not others — no TCP HOL blocking',
          'Connection migration: connections survive IP changes (e.g., Wi-Fi → cellular) via connection IDs, not IP tuples',
          'Improved loss recovery and congestion control built into the protocol',
          'HTTP/3 semantics are identical to HTTP/2 — same methods, headers, status codes',
        ],
        tradeoffs: [
          '0-RTT reduces latency but has replay attack risks — only safe for idempotent requests',
          'UDP-based: some networks block UDP or deprioritize it — falls back to HTTP/2 over TCP',
        ],
        realWorld: ['Google services', 'Cloudflare edge', 'Meta/Facebook', 'Chrome and Firefox support'],
      },
      {
        id: 'http-caching',
        name: 'HTTP Caching',
        description: 'HTTP caching reduces latency and server load by storing responses closer to the client — controlled by headers like Cache-Control, ETag, and Last-Modified.',
        keyPoints: [
          'Cache-Control: max-age=3600 (cache for 1 hour), no-cache (validate before use), no-store (never cache)',
          'ETag: server-generated fingerprint — client sends If-None-Match, server returns 304 Not Modified if unchanged',
          'Last-Modified / If-Modified-Since: date-based validation — less precise than ETags',
          'private (browser only) vs. public (shared caches/CDNs can store it)',
          'stale-while-revalidate: serve stale content immediately while fetching fresh copy in background',
        ],
        tradeoffs: [
          'Aggressive caching improves performance but risks serving stale data',
          'Cache invalidation is one of the hardest problems — "there are only two hard things in CS..."',
        ],
        realWorld: ['CDN caching strategies', 'Browser cache management', 'API response caching'],
      },
      {
        id: 'cookies-headers',
        name: 'Headers & Cookies',
        description: 'HTTP headers carry metadata (content type, authentication, caching directives), while cookies provide stateful sessions on top of the stateless HTTP protocol.',
        keyPoints: [
          'Content-Type: tells the receiver how to interpret the body (application/json, text/html, multipart/form-data)',
          'Authorization: carries credentials — Bearer tokens, Basic auth, API keys',
          'Cookies: Set-Cookie response header → Cookie request header — server-controlled client-side state',
          'Cookie attributes: Secure (HTTPS only), HttpOnly (no JS access), SameSite (CSRF protection), Domain, Path',
          'CORS headers (Access-Control-Allow-Origin): control cross-origin resource sharing in browsers',
        ],
        realWorld: ['Session management', 'Authentication tokens', 'CORS configuration for APIs'],
      },
    ],
  },
  {
    id: 7,
    title: 'Application Protocols',
    part: 2,
    partTitle: 'Transport & Application',
    summary: 'Beyond HTTP, a rich ecosystem of application-layer protocols handles email, remote access, real-time communication, RPC, and IoT messaging.',
    concepts: [
      {
        id: 'smtp-email',
        name: 'SMTP & Email Protocols',
        description: 'Email uses SMTP for sending, and IMAP/POP3 for retrieval — a store-and-forward system with DNS-based routing via MX records.',
        keyPoints: [
          'SMTP (port 25/587): push protocol for sending — sender connects to recipient\'s MX server',
          'IMAP (port 993): synchronizes email across devices — messages stay on server',
          'POP3 (port 995): downloads and optionally deletes from server — simpler but single-device',
          'Email authentication: SPF (authorized senders), DKIM (message signing), DMARC (policy + reporting)',
          'SMTP relay: messages may pass through multiple servers (MTAs) before reaching the destination',
        ],
        tradeoffs: [
          'Store-and-forward is resilient but introduces delay and makes real-time delivery impractical',
          'Email authentication (SPF/DKIM/DMARC) reduces spam but is complex to configure correctly',
        ],
        realWorld: ['Gmail', 'Corporate Exchange/Microsoft 365', 'Transactional email (SendGrid, SES)'],
      },
      {
        id: 'ssh',
        name: 'SSH (Secure Shell)',
        description: 'SSH provides encrypted remote access and secure tunneling — replacing insecure protocols like Telnet and rsh with strong authentication and encryption.',
        keyPoints: [
          'Key exchange: Diffie-Hellman establishes a shared secret without transmitting it',
          'Authentication: password, public key (most common), certificate-based, or multi-factor',
          'Port forwarding: local (-L) forwards a local port to remote, remote (-R) exposes local service remotely',
          'SSH agent forwarding: use local keys on remote servers without copying private keys',
          'SCP/SFTP: file transfer over SSH — encrypted alternatives to FTP',
        ],
        realWorld: ['Server administration', 'Git over SSH', 'Tunneling database connections'],
      },
      {
        id: 'websockets',
        name: 'WebSockets',
        description: 'WebSockets provide full-duplex, persistent connections between client and server — enabling real-time, bidirectional communication over a single TCP connection.',
        keyPoints: [
          'Upgrade handshake: starts as HTTP request with Upgrade: websocket header, switches protocol',
          'Full-duplex: both client and server can send messages at any time — no request-response constraint',
          'Framing: lightweight frame format with opcode, length, and optional masking',
          'Binary and text message types supported — efficient for structured data',
          'Ping/pong frames for keepalive and connection health checking',
        ],
        tradeoffs: [
          'Real-time bidirectional communication but maintains persistent connections — more server resources per client',
          'Harder to load balance than HTTP — sticky sessions or connection-aware routing needed',
        ],
        realWorld: ['Chat applications (Slack, Discord)', 'Live sports/stock tickers', 'Collaborative editing (Figma)'],
      },
      {
        id: 'grpc',
        name: 'gRPC',
        description: 'Google\'s high-performance RPC framework using HTTP/2 transport and Protocol Buffers for serialization — designed for efficient service-to-service communication.',
        keyPoints: [
          'Protocol Buffers (protobuf): strongly-typed, binary serialization — much smaller and faster than JSON',
          'Four streaming modes: unary, server streaming, client streaming, bidirectional streaming',
          'Code generation: .proto files generate client and server stubs in multiple languages',
          'Built-in features: deadlines/timeouts, cancellation, metadata, interceptors',
          'HTTP/2 multiplexing enables efficient use of connections between services',
        ],
        tradeoffs: [
          'Efficient and type-safe but not browser-native — needs gRPC-Web proxy for browser clients',
          'Protobuf is not human-readable — harder to debug than JSON-based APIs',
        ],
        realWorld: ['Microservice communication', 'Google Cloud APIs', 'Netflix, Dropbox internal services'],
      },
      {
        id: 'mqtt',
        name: 'MQTT',
        description: 'A lightweight publish-subscribe messaging protocol designed for constrained devices and unreliable networks — the de facto standard for IoT communication.',
        keyPoints: [
          'Publish-subscribe model: clients publish to topics, broker delivers to all subscribers',
          'Three QoS levels: 0 (at most once), 1 (at least once), 2 (exactly once)',
          'Tiny overhead: minimal 2-byte header — designed for bandwidth-constrained environments',
          'Retained messages: broker stores last message per topic for new subscribers',
          'Last Will and Testament (LWT): broker publishes a pre-set message if a client disconnects unexpectedly',
        ],
        tradeoffs: [
          'Lightweight and simple but the broker is a single point of failure — needs clustering for reliability',
          'QoS 2 (exactly once) adds significant overhead — most IoT uses QoS 0 or 1',
        ],
        realWorld: ['AWS IoT Core', 'Home automation (Home Assistant)', 'Industrial sensors and telemetry'],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART 3: Security & Modern Networking
  // ═══════════════════════════════════════════════════════════════
  {
    id: 8,
    title: 'Network Security',
    part: 3,
    partTitle: 'Security & Modern Networking',
    summary: 'Securing network communication through encryption (TLS), authentication (PKI/certificates), access control (firewalls), private connectivity (VPNs), and understanding common attack vectors.',
    concepts: [
      {
        id: 'tls',
        name: 'TLS & the Handshake',
        description: 'Transport Layer Security encrypts communication between client and server — TLS 1.3 reduces the handshake to 1 RTT (or 0-RTT for resumption) while providing confidentiality, integrity, and authentication.',
        keyPoints: [
          'TLS 1.3 handshake: ClientHello (with key share) → ServerHello (with key share + encrypted extensions) → 1 RTT',
          'Perfect Forward Secrecy (PFS): ephemeral Diffie-Hellman keys — compromising the server\'s private key doesn\'t decrypt past traffic',
          'TLS 1.3 removed insecure algorithms: no RSA key exchange, no CBC ciphers, no SHA-1',
          'Certificate verification: client checks server cert against trusted CA chain — hostname must match',
          '0-RTT resumption: clients send encrypted data in the first message — but vulnerable to replay attacks',
        ],
        tradeoffs: [
          'Strong security but adds latency (1 RTT for new connection, though 0-RTT is available for resumption)',
          '0-RTT is fast but only safe for idempotent requests — replay protection is limited',
        ],
        realWorld: ['HTTPS everywhere', 'Let\'s Encrypt free certificates', 'mTLS in service meshes'],
      },
      {
        id: 'pki',
        name: 'PKI & Certificates',
        description: 'Public Key Infrastructure provides the trust model for TLS — Certificate Authorities (CAs) vouch for server identities by signing their public keys.',
        keyPoints: [
          'X.509 certificates contain: subject (domain), public key, issuer (CA), validity period, and CA signature',
          'Chain of trust: root CA → intermediate CA → leaf certificate — browsers/OSes ship with trusted root CAs',
          'Certificate Transparency (CT): public logs of all issued certificates — detect unauthorized issuance',
          'OCSP and CRL: mechanisms to check if a certificate has been revoked before it expires',
          'Let\'s Encrypt: free, automated CA using ACME protocol — 90-day certificates with auto-renewal',
        ],
        tradeoffs: [
          'Centralized trust model — compromised CA can issue fraudulent certificates for any domain',
          'Certificate management overhead — expiration, renewal, key rotation, revocation checking',
        ],
        realWorld: ['Let\'s Encrypt (300M+ active certs)', 'Corporate internal CAs', 'Code signing certificates'],
      },
      {
        id: 'firewalls',
        name: 'Firewalls & Access Control',
        description: 'Firewalls filter traffic based on rules — from simple packet filtering (IP/port) to deep packet inspection (DPI) and next-gen firewalls that understand applications.',
        keyPoints: [
          'Packet filter: allow/deny based on source/dest IP, port, protocol — fast but no state tracking',
          'Stateful firewall: tracks connection state — allows return traffic for established connections automatically',
          'Application-layer firewall (WAF): inspects HTTP content — blocks SQL injection, XSS, and other attacks',
          'Network segmentation: DMZ pattern — public-facing servers in a separate zone from internal network',
          'Security groups (cloud): stateful, per-instance firewalls — default deny, explicit allow rules',
        ],
        tradeoffs: [
          'Stricter rules improve security but increase operational complexity and can break legitimate traffic',
          'DPI provides deep visibility but adds latency and has privacy implications',
        ],
        realWorld: ['AWS Security Groups', 'Cloudflare WAF', 'Corporate next-gen firewalls (Palo Alto, Fortinet)'],
      },
      {
        id: 'vpn',
        name: 'VPNs & IPsec',
        description: 'VPNs create encrypted tunnels over public networks — connecting remote users or sites to private networks as if they were directly connected.',
        keyPoints: [
          'IPsec: suite of protocols for encrypting IP packets — transport mode (encrypt payload) vs. tunnel mode (encrypt entire packet)',
          'IKE (Internet Key Exchange): negotiates security parameters and establishes IPsec security associations',
          'WireGuard: modern, simple VPN protocol — ~4000 lines of code vs. IPsec\'s hundreds of thousands',
          'SSL VPN: runs over TLS/HTTPS (port 443) — easier to traverse firewalls than IPsec',
          'Split tunneling: only route corporate traffic through VPN, direct Internet traffic goes directly',
        ],
        tradeoffs: [
          'Full tunnel is more secure but all traffic routes through VPN — increased latency and bandwidth on VPN server',
          'WireGuard is faster and simpler but less mature for enterprise features (user management, RADIUS integration)',
        ],
        realWorld: ['Corporate remote access', 'Site-to-site VPNs (AWS VPN)', 'WireGuard personal VPNs'],
      },
      {
        id: 'attacks',
        name: 'Common Network Attacks',
        description: 'Understanding attack vectors is essential for defense — from eavesdropping and spoofing to denial of service and man-in-the-middle attacks.',
        keyPoints: [
          'DDoS (Distributed Denial of Service): overwhelm a target with traffic from many sources — volumetric, protocol, or application layer',
          'Man-in-the-Middle (MITM): attacker intercepts communication between two parties — TLS prevents this when certificates are verified',
          'ARP spoofing: attacker sends fake ARP replies to redirect local traffic through their machine',
          'DNS poisoning: inject false DNS records into resolver caches — DNSSEC prevents this',
          'SYN flood: exhaust server resources by sending many SYN packets without completing the handshake — SYN cookies mitigate',
        ],
        tradeoffs: [
          'Defense in depth requires multiple layers of protection but increases cost and complexity',
          'Rate limiting and DDoS mitigation can block legitimate traffic during attacks',
        ],
        realWorld: ['Cloudflare DDoS protection', 'BGP hijacking incidents', 'Wi-Fi evil twin attacks'],
      },
    ],
  },
  {
    id: 9,
    title: 'Modern Infrastructure',
    part: 3,
    partTitle: 'Security & Modern Networking',
    summary: 'The building blocks of modern Internet infrastructure — CDNs for global content delivery, load balancers for distributing traffic, reverse proxies, anycast, and edge computing.',
    concepts: [
      {
        id: 'cdn',
        name: 'Content Delivery Networks (CDNs)',
        description: 'CDNs cache and serve content from edge servers geographically close to users — reducing latency, offloading origin servers, and improving availability.',
        keyPoints: [
          'PoPs (Points of Presence): data centers at strategic locations worldwide — cache content close to users',
          'Cache hit vs. miss: hits serve from edge (fast), misses fetch from origin (slower) and cache for next request',
          'Cache invalidation: purge specific URLs, use versioned filenames, or TTL-based expiration',
          'Pull CDN: edge fetches from origin on miss — simpler setup, works for any origin',
          'Push CDN: content is pre-uploaded to edge — better for large files or predictable access patterns',
        ],
        tradeoffs: [
          'Great for static content and cacheable responses but dynamic/personalized content can\'t be cached easily',
          'Cache coherency: stale content may be served until TTL expires or purge propagates',
        ],
        realWorld: ['Cloudflare', 'AWS CloudFront', 'Akamai', 'Fastly'],
      },
      {
        id: 'load-balancing',
        name: 'Load Balancers',
        description: 'Load balancers distribute incoming traffic across multiple backend servers — improving availability, scalability, and fault tolerance.',
        keyPoints: [
          'L4 (transport): routes based on IP/port — fast, protocol-agnostic, no content inspection',
          'L7 (application): routes based on HTTP content (URL path, headers, cookies) — more flexible, more overhead',
          'Algorithms: round-robin, least connections, weighted, IP hash (sticky sessions), random with two choices',
          'Health checks: periodic probes remove unhealthy backends from the pool — HTTP check, TCP check, or custom',
          'Session affinity (sticky sessions): route same client to same backend — needed for stateful apps, hurts load distribution',
        ],
        tradeoffs: [
          'L4 is faster but L7 provides content-based routing and SSL termination',
          'Sticky sessions maintain state but create hot spots and complicate scaling',
        ],
        realWorld: ['AWS ALB/NLB', 'NGINX', 'HAProxy', 'Google Cloud Load Balancing'],
      },
      {
        id: 'reverse-proxy',
        name: 'Reverse Proxies',
        description: 'A reverse proxy sits in front of backend servers, handling client connections and forwarding requests — providing SSL termination, caching, compression, and security.',
        keyPoints: [
          'SSL termination: reverse proxy handles TLS, backends receive plain HTTP — simplifies certificate management',
          'Request routing: route to different backends based on URL path, host header, or other criteria',
          'Response caching: cache backend responses and serve directly for subsequent identical requests',
          'Compression: gzip/Brotli compress responses before sending to clients — reduces bandwidth',
          'Rate limiting and request filtering: protect backends from abuse and malicious traffic',
        ],
        tradeoffs: [
          'Centralizes cross-cutting concerns but adds a hop and potential single point of failure',
          'SSL termination means traffic between proxy and backend may be unencrypted — use internal TLS if needed',
        ],
        realWorld: ['NGINX', 'Envoy (service mesh)', 'Traefik (container-native)', 'Caddy (auto-HTTPS)'],
      },
      {
        id: 'anycast',
        name: 'Anycast Routing',
        description: 'Anycast assigns the same IP address to multiple servers in different locations — BGP routing automatically directs clients to the nearest (by network hops) server.',
        keyPoints: [
          'Same IP advertised from multiple locations — BGP routing selects the nearest one',
          'Automatic geographic load distribution without DNS-based geo-routing',
          'Built-in DDoS resilience: attack traffic is distributed across all anycast locations',
          'Works best for stateless protocols (DNS, CDN) — TCP connections may break if routes change',
          'BGP convergence during failures automatically reroutes traffic to the next nearest server',
        ],
        tradeoffs: [
          'Excellent for stateless/short-lived connections but TCP anycast requires careful engineering to avoid mid-connection rerouting',
          'Limited to operators with BGP peering — not available to typical end users',
        ],
        realWorld: ['Cloudflare (1.1.1.1)', 'Root DNS servers', 'Google Public DNS (8.8.8.8)'],
      },
      {
        id: 'edge-computing',
        name: 'Edge Computing',
        description: 'Running compute at the network edge (CDN PoPs) instead of centralized data centers — reducing latency for dynamic content by processing requests closer to users.',
        keyPoints: [
          'Edge functions: lightweight serverless code running at CDN PoPs — sub-10ms cold starts',
          'Use cases: A/B testing, auth token validation, geolocation-based routing, HTML rewriting',
          'V8 isolates (Cloudflare Workers) vs. containers (Lambda@Edge) — different tradeoff in startup time vs. flexibility',
          'Edge databases: KV stores and Durable Objects at the edge for stateful edge applications',
          'Limitations: limited CPU time, memory, and supported APIs compared to full server environments',
        ],
        tradeoffs: [
          'Ultra-low latency for global users but limited compute resources and constrained runtime environments',
          'Data locality challenges — reading from a centralized database negates edge latency benefits',
        ],
        realWorld: ['Cloudflare Workers', 'Vercel Edge Functions', 'AWS Lambda@Edge', 'Deno Deploy'],
      },
    ],
  },
  {
    id: 10,
    title: 'Advanced Topics',
    part: 3,
    partTitle: 'Security & Modern Networking',
    summary: 'Advanced networking concepts — BGP (the Internet\'s routing protocol), software-defined networking, service meshes for microservices, container networking, and encrypted DNS.',
    concepts: [
      {
        id: 'bgp',
        name: 'BGP (Border Gateway Protocol)',
        description: 'BGP is the routing protocol of the Internet — autonomous systems (ASes) exchange reachability information to determine paths across the global network.',
        keyPoints: [
          'Path-vector protocol: BGP announces reachable prefixes with the full AS path — prevents routing loops',
          'eBGP between autonomous systems, iBGP within an AS — different rules for route propagation',
          'Route selection: shortest AS path, then local preference, MED, and other tiebreakers',
          'BGP is trust-based — misconfigurations or malicious announcements can hijack traffic globally',
          'RPKI (Resource Public Key Infrastructure): cryptographic validation of BGP route origins — prevents hijacking',
        ],
        tradeoffs: [
          'Flexible and scalable but slow convergence — routing changes can take minutes to propagate globally',
          'Trust-based model means accidental or malicious route leaks can cause widespread outages',
        ],
        realWorld: ['ISP peering', 'CDN traffic engineering', 'BGP hijacking incidents (YouTube/Pakistan 2008)'],
      },
      {
        id: 'sdn',
        name: 'Software-Defined Networking (SDN)',
        description: 'SDN separates the control plane (routing decisions) from the data plane (packet forwarding) — enabling centralized, programmable network management.',
        keyPoints: [
          'Control plane: centralized controller makes routing decisions and programs forwarding rules',
          'Data plane: switches/routers execute forwarding rules received from the controller',
          'OpenFlow: protocol for controller-to-switch communication — defines flow tables and actions',
          'Network programmability: APIs to automate configuration, monitoring, and policy enforcement',
          'Network virtualization: create isolated virtual networks on shared physical infrastructure (VPC, VXLAN)',
        ],
        tradeoffs: [
          'Centralized control simplifies management but the controller is a single point of failure',
          'Programmability enables automation but requires new skills and tooling',
        ],
        realWorld: ['AWS VPC networking', 'Google B4 WAN', 'VMware NSX', 'OpenStack Neutron'],
      },
      {
        id: 'service-mesh',
        name: 'Service Mesh',
        description: 'A dedicated infrastructure layer for service-to-service communication in microservices — handling load balancing, encryption, observability, and traffic management via sidecar proxies.',
        keyPoints: [
          'Sidecar proxy pattern: every service instance gets a proxy (e.g., Envoy) handling all network traffic',
          'mTLS: mutual TLS between all services — automatic encryption and identity verification',
          'Traffic management: canary deployments, traffic splitting, circuit breaking, retries, timeouts',
          'Observability: distributed tracing, metrics, and access logs without modifying application code',
          'Control plane (Istio, Linkerd): configures and manages the sidecar proxies across the mesh',
        ],
        tradeoffs: [
          'Powerful observability and security but adds latency (extra hop through sidecar) and operational complexity',
          'Resource overhead: each sidecar consumes CPU and memory — significant at scale',
        ],
        realWorld: ['Istio', 'Linkerd', 'AWS App Mesh', 'Consul Connect'],
      },
      {
        id: 'container-networking',
        name: 'Container Networking',
        description: 'Containers need networking abstractions for pod-to-pod communication, service discovery, and external access — built on Linux networking primitives and CNI plugins.',
        keyPoints: [
          'Network namespaces: each container gets its own network stack — isolated interfaces, routing tables, iptables',
          'veth pairs: virtual Ethernet cables connecting container namespaces to host bridges',
          'CNI (Container Network Interface): plugin standard — Calico, Cilium, Flannel implement different strategies',
          'Kubernetes Services: stable virtual IPs (ClusterIP) with kube-proxy or eBPF for load balancing',
          'Ingress: L7 routing from external traffic to internal services — hostname and path-based routing',
        ],
        tradeoffs: [
          'Abstraction simplifies development but debugging requires understanding the underlying Linux networking primitives',
          'Overlay networks (VXLAN) are flexible but add encapsulation overhead — direct routing is faster but less portable',
        ],
        realWorld: ['Kubernetes networking', 'Docker bridge networks', 'Cilium eBPF-based networking'],
      },
    ],
  },
];

// Compatibility aliases — components use "chapter" terminology from DDIA pattern
export const chapters = topics;

export function getTopicsByPart(partId: number): Topic[] {
  return topics.filter(t => t.part === partId);
}

export function getTopic(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}

// Aliases for component compatibility
export const getChaptersByPart = getTopicsByPart;
export const getChapter = getTopic;

export function getAllConcepts(): Concept[] {
  return topics.flatMap(t => t.concepts);
}
