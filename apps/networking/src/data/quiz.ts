export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Topic 1: Network Models & Layers
  {
    id: 't1-q1',
    chapterId: 1,
    question: 'Which OSI layer is responsible for routing packets across different networks?',
    options: [
      'Data Link (Layer 2)',
      'Network (Layer 3)',
      'Transport (Layer 4)',
      'Session (Layer 5)',
    ],
    answer: 1,
    explanation: 'The Network layer (Layer 3) handles logical addressing (IP addresses) and routing — determining the best path for packets to travel across interconnected networks. Routers operate at this layer.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question: 'What is encapsulation in networking?',
    options: [
      'Encrypting data before sending it over the network',
      'Each layer wrapping data from the layer above with its own header and trailer',
      'Compressing data to reduce bandwidth usage',
      'Converting data between different encoding formats',
    ],
    answer: 1,
    explanation: 'Encapsulation is the process where each layer adds its own header (and sometimes trailer) to the data received from the layer above, creating a Protocol Data Unit (PDU) specific to that layer. At the receiving end, each layer strips its header (decapsulation).',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question: 'How does the TCP/IP model differ from the OSI model?',
    options: [
      'TCP/IP has 7 layers while OSI has 4',
      'TCP/IP is theoretical while OSI is practical',
      'TCP/IP has 4 layers and maps directly to real protocols; OSI has 7 layers and is more theoretical',
      'They are identical in structure and purpose',
    ],
    answer: 2,
    explanation: 'The TCP/IP model has 4 layers (Link, Internet, Transport, Application) designed around actual protocols, while the OSI model has 7 layers as a theoretical framework. TCP/IP collapses OSI\'s Session, Presentation, and Application into one Application layer, and Physical + Data Link into Link.',
  },

  // Topic 2: Physical & Data Link Layer
  {
    id: 't2-q1',
    chapterId: 2,
    question: 'How does a network switch learn which MAC addresses are on which ports?',
    options: [
      'An administrator manually programs the MAC table',
      'It examines the source MAC address of incoming frames and records the port',
      'It sends broadcast messages asking devices to identify themselves',
      'It reads MAC addresses from a central directory server',
    ],
    answer: 1,
    explanation: 'Switches learn MAC addresses dynamically by examining the source MAC address of every incoming frame and recording which port it arrived on in the MAC address table. If the destination MAC is unknown, the switch floods the frame to all ports except the source.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question: 'What problem does Spanning Tree Protocol (STP) solve?',
    options: [
      'IP address conflicts between devices',
      'Slow connection speeds on trunk links',
      'Layer 2 loops in networks with redundant switch connections',
      'MAC address exhaustion in large networks',
    ],
    answer: 2,
    explanation: 'STP prevents broadcast storms and MAC table instability caused by Layer 2 loops in networks with redundant switch links. It does this by electing a root bridge and blocking redundant paths, creating a loop-free logical topology while keeping physical redundancy for failover.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question: 'What is the purpose of 802.1Q VLAN tagging?',
    options: [
      'To encrypt traffic between switches',
      'To increase the speed of trunk links',
      'To identify which VLAN a frame belongs to when carried over a trunk port',
      'To compress Ethernet frames for faster transmission',
    ],
    answer: 2,
    explanation: '802.1Q inserts a 4-byte tag into Ethernet frames containing a 12-bit VLAN ID (1-4094). This allows trunk ports to carry traffic for multiple VLANs over a single link while keeping the traffic logically separated.',
  },

  // Topic 3: IP & Network Layer
  {
    id: 't3-q1',
    chapterId: 3,
    question: 'In CIDR notation, what does /24 mean for an IPv4 address?',
    options: [
      '24 usable host addresses in the subnet',
      '24 bits for the network portion, 8 bits for hosts — 256 addresses (254 usable)',
      'The network supports 24 subnets',
      'The address has 24 octets',
    ],
    answer: 1,
    explanation: 'CIDR notation /24 means the first 24 bits are the network prefix and the remaining 8 bits are for host addresses. This gives 2^8 = 256 total addresses, with 254 usable (one for network address, one for broadcast).',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question: 'Why does NAT break the end-to-end principle of the Internet?',
    options: [
      'NAT slows down packet processing',
      'NAT changes the source or destination IP, so external hosts cannot directly initiate connections to internal hosts',
      'NAT only works with IPv6',
      'NAT requires all devices to have public IP addresses',
    ],
    answer: 1,
    explanation: 'NAT modifies packet headers, hiding internal addresses behind a shared public IP. This means external hosts cannot directly address and connect to internal hosts without port forwarding or NAT traversal techniques (STUN, TURN). This breaks protocols that embed IP addresses in their payload (SIP, FTP).',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question: 'What is the advantage of link-state routing protocols (like OSPF) over distance-vector protocols (like RIP)?',
    options: [
      'Link-state protocols use less memory and CPU',
      'Link-state protocols are simpler to configure',
      'Link-state protocols build a complete topology map and converge faster after changes',
      'Link-state protocols don\'t require routing tables',
    ],
    answer: 2,
    explanation: 'Link-state protocols like OSPF flood link-state advertisements so every router builds a complete map of the network topology. This enables faster convergence when changes occur (seconds vs. minutes for RIP) and avoids the count-to-infinity problem of distance-vector protocols.',
  },

  // Topic 4: Transport Layer
  {
    id: 't4-q1',
    chapterId: 4,
    question: 'What is the purpose of TCP\'s three-way handshake?',
    options: [
      'To encrypt the connection',
      'To verify both hosts have valid IP addresses',
      'To synchronize sequence numbers and establish a connection between both endpoints',
      'To determine the maximum bandwidth of the connection',
    ],
    answer: 2,
    explanation: 'The three-way handshake (SYN → SYN-ACK → ACK) allows both endpoints to agree on initial sequence numbers, confirm bidirectional communication is possible, and allocate resources for the connection before any data is sent.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question: 'How does TCP congestion control differ from flow control?',
    options: [
      'They are the same mechanism',
      'Flow control prevents overwhelming the receiver; congestion control prevents overwhelming the network',
      'Congestion control is used by UDP; flow control is used by TCP',
      'Flow control uses the congestion window; congestion control uses the receive window',
    ],
    answer: 1,
    explanation: 'Flow control is receiver-driven — the receiver advertises its receive window (rwnd) to prevent the sender from sending more data than it can buffer. Congestion control is network-driven — the sender maintains a congestion window (cwnd) to avoid overwhelming the network, adjusting it based on packet loss and RTT signals.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question: 'When would you choose UDP over TCP?',
    options: [
      'When you need guaranteed delivery of every byte',
      'When you need ordered delivery of data',
      'When you need low latency and can tolerate some packet loss (e.g., real-time audio/video)',
      'When you need to transfer large files reliably',
    ],
    answer: 2,
    explanation: 'UDP is preferred when low latency matters more than perfect reliability — real-time applications like VoIP, video streaming, and gaming can tolerate occasional lost packets, but TCP\'s retransmission delays would cause unacceptable lag. UDP also supports multicast/broadcast, which TCP cannot.',
  },

  // Topic 5: DNS & Name Resolution
  {
    id: 't5-q1',
    chapterId: 5,
    question: 'What happens when a recursive DNS resolver receives a query for a domain it has never seen?',
    options: [
      'It returns an error immediately',
      'It asks the client to resolve it themselves',
      'It queries root servers, then TLD servers, then authoritative servers — following referrals down the hierarchy',
      'It broadcasts the query to all DNS servers on the Internet',
    ],
    answer: 2,
    explanation: 'A recursive resolver performs iterative queries: it starts at the root servers (which refer it to the TLD servers), then the TLD servers (which refer it to the authoritative servers for the domain), and finally the authoritative server returns the answer. The resolver caches results along the way.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question: 'Why can\'t a CNAME record coexist with other record types at the zone apex (e.g., example.com)?',
    options: [
      'CNAME records are too large to share space with other records',
      'The DNS specification says CNAME must be the only record at a name — but apex needs SOA and NS records',
      'CNAME records are deprecated at the zone apex',
      'Zone apex records cannot be cached',
    ],
    answer: 1,
    explanation: 'Per RFC 1034, a CNAME record must be the only record at a given name. Since the zone apex (e.g., example.com) must have SOA and NS records, a CNAME cannot be placed there. Many DNS providers work around this with proprietary solutions like ALIAS or ANAME records that resolve the CNAME at query time.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question: 'What is the difference between DNS over HTTPS (DoH) and DNSSEC?',
    options: [
      'They both encrypt DNS queries',
      'DoH encrypts queries in transit; DNSSEC signs records to prove authenticity but doesn\'t encrypt',
      'DNSSEC is faster than DoH',
      'DoH prevents cache poisoning; DNSSEC prevents eavesdropping',
    ],
    answer: 1,
    explanation: 'DNSSEC adds cryptographic signatures to DNS records, allowing resolvers to verify that records haven\'t been tampered with (authenticity and integrity). However, queries are still sent in plaintext. DoH sends DNS queries over encrypted HTTPS connections, preventing eavesdropping and manipulation in transit, but doesn\'t verify the authenticity of the records themselves.',
  },

  // Topic 6: HTTP & the Web
  {
    id: 't6-q1',
    chapterId: 6,
    question: 'What problem does HTTP/2 multiplexing solve?',
    options: [
      'DNS resolution latency',
      'HTTP/1.1 head-of-line blocking — where one slow response blocks all subsequent responses on the same connection',
      'TCP congestion during file uploads',
      'SSL certificate verification delays',
    ],
    answer: 1,
    explanation: 'HTTP/1.1 processes responses in order (pipelining), so a slow response blocks all following responses on the same connection. HTTP/2 multiplexing allows multiple concurrent streams on a single TCP connection, each independent — eliminating HTTP-level head-of-line blocking.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question: 'Why does HTTP/3 use QUIC (UDP-based) instead of TCP?',
    options: [
      'UDP is more secure than TCP',
      'To eliminate TCP-level head-of-line blocking — a lost packet in TCP stalls ALL streams, while QUIC streams are independent',
      'UDP supports larger payloads',
      'TCP cannot be encrypted',
    ],
    answer: 1,
    explanation: 'Even with HTTP/2 multiplexing, TCP treats all data as a single byte stream — one lost packet blocks all streams until retransmitted. QUIC uses UDP and implements streams independently, so a lost packet only affects its own stream. QUIC also integrates TLS 1.3 for 0-1 RTT connection setup.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question: 'What does the HTTP header "Cache-Control: no-cache" mean?',
    options: [
      'Never store the response anywhere',
      'The response can be cached but must be validated with the server (via ETag/Last-Modified) before each use',
      'Only cache for 60 seconds',
      'Only the browser can cache it, not CDNs',
    ],
    answer: 1,
    explanation: '"no-cache" does NOT mean "don\'t cache" — it means the response can be stored but must be revalidated with the origin server before every use. "no-store" is what prevents caching entirely. This is a common source of confusion in HTTP caching.',
  },

  // Topic 7: Application Protocols
  {
    id: 't7-q1',
    chapterId: 7,
    question: 'What advantage does gRPC have over REST APIs for service-to-service communication?',
    options: [
      'gRPC uses plain text so it\'s easier to debug',
      'gRPC works in all browsers without any proxy',
      'gRPC uses Protocol Buffers (binary) for smaller payloads and code-generated type-safe clients with streaming support',
      'gRPC doesn\'t require a network connection',
    ],
    answer: 2,
    explanation: 'gRPC uses Protocol Buffers for efficient binary serialization (much smaller than JSON), generates strongly-typed client/server code from .proto definitions, and supports bidirectional streaming via HTTP/2. These make it significantly more efficient for internal service communication, though it sacrifices human readability.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question: 'How do WebSockets differ from regular HTTP requests?',
    options: [
      'WebSockets use UDP instead of TCP',
      'WebSockets don\'t require a server',
      'WebSockets provide persistent, full-duplex communication — both sides can send messages at any time without request-response pairing',
      'WebSockets are faster because they don\'t use headers',
    ],
    answer: 2,
    explanation: 'After an HTTP upgrade handshake, WebSockets provide a persistent, bidirectional connection. Unlike HTTP\'s request-response model, either side can send messages at any time. This is essential for real-time applications like chat, live updates, and collaborative editing.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question: 'What does MQTT\'s "Last Will and Testament" (LWT) feature do?',
    options: [
      'Encrypts the final message sent by a client',
      'Backs up all messages before the broker shuts down',
      'The broker publishes a pre-configured message on behalf of a client that disconnects unexpectedly',
      'Guarantees exactly-once delivery for the last message',
    ],
    answer: 2,
    explanation: 'When an MQTT client connects, it can register a "Last Will" message with the broker. If the client disconnects unexpectedly (without a graceful DISCONNECT), the broker automatically publishes that message to the specified topic — useful for notifying other clients that a device has gone offline.',
  },

  // Topic 8: Network Security
  {
    id: 't8-q1',
    chapterId: 8,
    question: 'What does Perfect Forward Secrecy (PFS) in TLS guarantee?',
    options: [
      'That the server\'s certificate will never expire',
      'That past recorded traffic cannot be decrypted even if the server\'s long-term private key is later compromised',
      'That all future connections will use the same encryption keys',
      'That DNS queries are encrypted',
    ],
    answer: 1,
    explanation: 'PFS uses ephemeral Diffie-Hellman key exchange — a new, unique key pair is generated for each session. Even if an attacker later obtains the server\'s long-term private key, they cannot derive the session keys used to encrypt past traffic. TLS 1.3 mandates PFS.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question: 'What is the difference between a stateful firewall and a packet filter?',
    options: [
      'A stateful firewall is slower because it encrypts traffic',
      'A packet filter can inspect HTTP content but a stateful firewall cannot',
      'A stateful firewall tracks connection state and automatically allows return traffic; a packet filter evaluates each packet independently',
      'A packet filter only works with UDP; a stateful firewall works with TCP',
    ],
    answer: 2,
    explanation: 'A packet filter evaluates each packet in isolation against its rules (IP, port, protocol). A stateful firewall tracks the state of connections — once an outbound connection is established, return traffic is automatically allowed without explicit rules. This is more secure (blocks unsolicited inbound) and simpler to configure.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question: 'How does a SYN flood attack work, and what mitigates it?',
    options: [
      'It sends too much data over UDP; firewalls block UDP to mitigate it',
      'It sends many TCP SYN packets without completing the handshake, exhausting server connection resources; SYN cookies mitigate it',
      'It floods DNS servers with fake queries; DNSSEC mitigates it',
      'It spoofs ARP replies; 802.1X mitigates it',
    ],
    answer: 1,
    explanation: 'A SYN flood sends many SYN packets from spoofed source IPs. The server allocates resources for each half-open connection (SYN-RECEIVED state), eventually exhausting memory. SYN cookies mitigate this by encoding connection state in the sequence number — the server doesn\'t allocate resources until it receives a valid ACK.',
  },

  // Topic 9: Modern Infrastructure
  {
    id: 't9-q1',
    chapterId: 9,
    question: 'What is the key difference between L4 and L7 load balancing?',
    options: [
      'L4 is for IPv4 and L7 is for IPv6',
      'L4 routes based on IP/port without inspecting content; L7 routes based on HTTP content like URL path, headers, and cookies',
      'L7 is always faster than L4',
      'L4 only supports round-robin; L7 supports all algorithms',
    ],
    answer: 1,
    explanation: 'L4 load balancers operate at the transport layer — they route based on IP addresses and port numbers without inspecting the payload, making them fast and protocol-agnostic. L7 load balancers understand application protocols (HTTP) and can route based on URL paths, headers, cookies, and request content, enabling more sophisticated traffic management.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question: 'How does anycast routing provide DDoS resilience?',
    options: [
      'Anycast encrypts all traffic to prevent attacks',
      'Anycast blocks all traffic from known malicious IP ranges',
      'The same IP is served from many locations, so attack traffic is automatically distributed across all PoPs instead of hitting one server',
      'Anycast uses UDP which is immune to DDoS',
    ],
    answer: 2,
    explanation: 'With anycast, the same IP address is advertised from multiple locations via BGP. When a DDoS attack targets that IP, the attack traffic is distributed across all anycast locations proportionally to their BGP routing, preventing any single location from being overwhelmed.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question: 'What is the main advantage of edge computing over centralized cloud computing?',
    options: [
      'Edge computing is always cheaper',
      'Edge computing supports more programming languages',
      'Processing at CDN edge locations reduces latency by running code geographically close to users',
      'Edge computing has unlimited CPU and memory',
    ],
    answer: 2,
    explanation: 'Edge computing runs code at CDN PoPs close to end users, reducing round-trip latency from potentially hundreds of milliseconds (to a centralized data center) to single-digit milliseconds. This is ideal for latency-sensitive operations like auth checks, A/B testing, and personalization.',
  },

  // Topic 10: Advanced Topics
  {
    id: 't10-q1',
    chapterId: 10,
    question: 'Why is BGP sometimes called the "most fragile" part of the Internet?',
    options: [
      'BGP uses an outdated encryption standard',
      'BGP is trust-based — misconfigured or malicious route announcements can redirect or blackhole traffic globally',
      'BGP only runs on specialized hardware that frequently fails',
      'BGP cannot handle more than 100,000 routes',
    ],
    answer: 1,
    explanation: 'BGP relies on trust between autonomous systems. There\'s no built-in verification that an AS is authorized to announce a given prefix. A misconfigured or malicious route announcement can redirect global traffic — as happened when Pakistan accidentally hijacked YouTube\'s traffic in 2008 by announcing its prefix.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question: 'What is the sidecar proxy pattern in a service mesh?',
    options: [
      'A backup server that takes over when the main server fails',
      'Every service instance gets its own proxy that handles all network traffic — providing mTLS, observability, and traffic management transparently',
      'A centralized proxy that all services connect through',
      'A DNS-based routing mechanism for microservices',
    ],
    answer: 1,
    explanation: 'In the sidecar pattern, a proxy (typically Envoy) is deployed alongside every service instance. All inbound and outbound traffic flows through this sidecar, which handles mTLS encryption, load balancing, retries, circuit breaking, and metrics collection — without any changes to application code.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question: 'What networking primitives does Kubernetes use for container networking?',
    options: [
      'Only standard TCP sockets',
      'Virtual machines with bridged networking',
      'Linux network namespaces, veth pairs, and CNI plugins for pod-to-pod communication',
      'IPsec tunnels between all containers',
    ],
    answer: 2,
    explanation: 'Kubernetes containers use Linux network namespaces (isolated network stacks per pod), veth pairs (virtual Ethernet cables connecting pods to host bridges), and CNI plugins (Calico, Cilium, Flannel) that implement the actual networking strategy — whether overlay (VXLAN) or direct routing.',
  },

  // Topic 11: Wireless & Mobile Networks
  {
    id: 't11-q1',
    chapterId: 11,
    question: 'Why does Wi-Fi use CSMA/CA (Collision Avoidance) instead of CSMA/CD (Collision Detection) like Ethernet?',
    options: [
      'CSMA/CA is faster than CSMA/CD',
      'Wireless stations cannot reliably detect collisions while transmitting — the transmitter\'s own signal overwhelms incoming signals',
      'CSMA/CD requires more bandwidth than is available on Wi-Fi channels',
      'FCC regulations prohibit collision detection on wireless frequencies',
    ],
    answer: 1,
    explanation: 'In wired Ethernet, a station can listen while sending and detect a collision (voltage anomaly). In wireless, the transmitter\'s own signal is orders of magnitude stronger than any incoming signal at its antenna — it cannot "hear" a collision while transmitting. So Wi-Fi avoids collisions by listening before transmitting (carrier sense) and using random backoff timers.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question: 'What is the key innovation of Wi-Fi 6\'s OFDMA compared to previous Wi-Fi generations?',
    options: [
      'It uses wider 160 MHz channels for faster single-device throughput',
      'It subdivides a channel into resource units so multiple clients can be served simultaneously in a single transmission',
      'It increases the maximum number of spatial streams from 4 to 8',
      'It switches from 5 GHz to 6 GHz for less interference',
    ],
    answer: 1,
    explanation: 'Previous Wi-Fi generations serve one client at a time per channel (or a few with MU-MIMO). OFDMA splits the channel into smaller resource units (RUs) that can be assigned to different clients simultaneously — dramatically improving efficiency in dense environments with many devices sending small packets (IoT, browsing, messaging).',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question: 'Why does 5G use "network slicing" and what problem does it solve?',
    options: [
      'It divides the radio spectrum into smaller frequency bands to reduce interference',
      'It creates multiple isolated virtual networks on a single physical infrastructure, each with different performance guarantees (latency, bandwidth, reliability)',
      'It slices data packets into smaller fragments for faster over-the-air transmission',
      'It separates voice and data traffic onto different cell towers',
    ],
    answer: 1,
    explanation: 'Network slicing partitions a single physical 5G network into multiple isolated virtual networks, each tailored for a specific use case — e.g., one slice with ultra-low latency for autonomous vehicles (URLLC), another with massive bandwidth for video streaming (eMBB), and another for millions of IoT sensors (mMTC). This requires a 5G Standalone (SA) core architecture.',
  },

  // Topic 12: Cloud & Virtual Networking
  {
    id: 't12-q1',
    chapterId: 12,
    question: 'Why does VXLAN use a 24-bit VNI (VXLAN Network Identifier) instead of relying on traditional 802.1Q VLANs?',
    options: [
      'VXLAN is faster than VLANs because it uses UDP',
      '802.1Q VLANs are limited to 4094 IDs (12-bit), which is insufficient for multi-tenant cloud environments — VXLAN\'s 24-bit VNI supports ~16 million segments',
      'VXLAN encrypts traffic while VLANs do not',
      'VLANs cannot span multiple physical switches',
    ],
    answer: 1,
    explanation: '802.1Q uses a 12-bit VLAN ID, limiting networks to 4094 VLANs — far too few for cloud providers with thousands of tenants. VXLAN encapsulates L2 frames in UDP with a 24-bit VNI, supporting ~16.7 million unique segments. Additionally, VXLAN tunnels over L3 networks, allowing L2 segments to span across data centers without requiring L2 adjacency.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question: 'What is the main architectural difference between SDN and traditional networking that makes SDN more programmable?',
    options: [
      'SDN uses newer Ethernet cables with higher bandwidth',
      'SDN replaces TCP/IP with a proprietary protocol stack',
      'SDN separates the control plane (routing decisions) from the data plane (packet forwarding), centralizing decisions in a controller that exposes APIs',
      'SDN eliminates the need for IP addresses by using MAC-only routing',
    ],
    answer: 2,
    explanation: 'In traditional networking, each device runs its own control plane (OSPF, STP, etc.) — configuration is per-device and distributed. SDN extracts routing decisions into a centralized controller that has a global network view and programs forwarding rules into "dumb" switches via OpenFlow or similar protocols. The controller exposes northbound APIs, enabling applications to programmatically configure the network.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question: 'What challenge does NFV face when virtualizing stateful network functions like firewalls?',
    options: [
      'Virtual firewalls cannot inspect encrypted traffic',
      'Stateful functions maintain session tables that must be synchronized across instances when scaling — making horizontal scaling significantly harder than for stateless functions',
      'NFV can only run on specialized hardware, not commodity servers',
      'Virtual network functions cannot achieve line-rate performance under any circumstances',
    ],
    answer: 1,
    explanation: 'Stateful network functions (firewalls, NAT, load balancers) maintain per-connection state (session tables, connection tracking). When scaling horizontally by adding more VNF instances, this state must be synchronized or partitioned across instances — otherwise, traffic from an existing session may hit a new instance that has no context. This is much harder than scaling stateless functions like routers.',
  },

  // Topic 13: Observability & Troubleshooting
  {
    id: 't13-q1',
    chapterId: 13,
    question: 'Why is SNMP v3 strongly recommended over v1/v2c in production environments?',
    options: [
      'SNMPv3 supports higher polling rates and more OIDs per request',
      'SNMPv3 adds authentication (verifying identity) and encryption (confidentiality) — v1/v2c send community strings as plaintext, allowing anyone on the network to read or modify device configurations',
      'SNMPv3 is the only version that supports network monitoring',
      'SNMPv3 replaces the pull model with push-based streaming',
    ],
    answer: 1,
    explanation: 'SNMP v1/v2c use "community strings" as the only authentication mechanism, and these are sent in plaintext — anyone who captures a packet can see the community string and gain read or write access to network devices. SNMPv3 introduces USM (User-based Security Model) with authentication (HMAC-SHA) and privacy (AES encryption), making it suitable for production use.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question: 'What is the difference between head-based and tail-based trace sampling, and when does it matter?',
    options: [
      'Head-based captures the first 50% of spans; tail-based captures the last 50%',
      'Head-based decides whether to sample at trace start (fast, but may miss rare errors); tail-based decides after the trace completes (catches errors/slow traces, but requires buffering)',
      'Head-based samples HTTP headers only; tail-based samples request bodies',
      'Head-based is for client-side traces; tail-based is for server-side traces',
    ],
    answer: 1,
    explanation: 'Head-based sampling makes the sampling decision at the very start of a trace (e.g., sample 10% of all traces). This is simple and low-overhead but randomly discards traces — including rare but important error traces. Tail-based sampling buffers the entire trace and decides after it completes, allowing rules like "keep all traces with errors or latency > 2s." The tradeoff is that tail-based requires a collection tier that buffers all traces before deciding.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question: 'A TCP connection completes the three-way handshake successfully but then hangs when sending large data. Small requests work fine. What is the most likely cause?',
    options: [
      'The server\'s SSL certificate has expired',
      'DNS resolution is returning the wrong IP address',
      'Path MTU Discovery is broken — ICMP "Fragmentation Needed" messages are being blocked by a firewall, so oversized packets are silently dropped',
      'The client is using UDP instead of TCP for the data transfer',
    ],
    answer: 2,
    explanation: 'This is a classic MTU black hole. The TCP handshake uses small packets (SYN/ACK) that fit within any MTU, so the connection establishes successfully. When the application sends large data, packets may exceed the path MTU. Normally, routers send back ICMP "Fragmentation Needed" (or "Packet Too Big" for IPv6) so the sender reduces its segment size. If a firewall blocks these ICMP messages, the sender never learns to reduce its packet size, and large packets are silently dropped — causing the connection to hang.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.chapterId === chapterId);
}
