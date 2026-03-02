export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Introduction to Self-Hosting
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What is the primary advantage of self-hosting services compared to using cloud providers?',
    options: [
      'Self-hosting is always cheaper than cloud services',
      'Full control over data, privacy, and service configuration',
      'Self-hosted services are always faster than cloud alternatives',
      'Self-hosting eliminates the need for backups',
    ],
    answer: 1,
    explanation: 'Self-hosting gives you complete ownership and control over your data and services. You decide what software runs, who has access, and how data is stored. While cost savings are possible, the primary motivation is sovereignty over your digital life and privacy.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'When comparing self-hosting costs to cloud subscriptions, which hidden cost is most commonly overlooked?',
    options: [
      'Domain name registration fees',
      'Electricity consumption and hardware replacement over time',
      'The cost of an internet connection',
      'Software license fees for open-source tools',
    ],
    answer: 1,
    explanation: 'Electricity costs for running a server 24/7 (typically $5-15/month for a low-power server) and eventual hardware replacement are the most commonly overlooked expenses. A typical home server consumes 30-100W continuously, and drives/components have finite lifespans requiring periodic replacement.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What is a common ISP restriction that can impact self-hosting?',
    options: [
      'ISPs block all encrypted traffic by default',
      'Many residential ISPs block inbound port 25 (SMTP) and may use CGNAT, preventing direct inbound connections',
      'ISPs require a business license for any server operation',
      'ISPs throttle all Docker container traffic',
    ],
    answer: 1,
    explanation: 'Many residential ISPs block port 25 to prevent spam, and increasingly use Carrier-Grade NAT (CGNAT) which means you share a public IP with other customers, making inbound connections impossible without workarounds like Cloudflare Tunnel or a VPS relay. Some ISPs also prohibit servers in their terms of service.',
  },

  // Chapter 2: Home Server Hardware & OS
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'Which hardware platform is most recommended for a beginner self-hosting setup due to its low power consumption and cost?',
    options: [
      'A rack-mounted enterprise server from eBay',
      'A mini PC (Intel NUC, Beelink) or Raspberry Pi',
      'A gaming desktop with a high-end GPU',
      'A cloud VPS running on someone else\'s hardware',
    ],
    answer: 1,
    explanation: 'Mini PCs like Intel NUC, Beelink, or Minisforum offer an excellent balance of performance, power consumption (10-25W), and cost ($150-400). Raspberry Pis work for very light workloads. Enterprise servers are powerful but loud, hot, and power-hungry for home use.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What is Proxmox VE primarily used for in a self-hosting environment?',
    options: [
      'As a firewall and network router',
      'As a Type 1 hypervisor for running VMs and LXC containers on bare metal',
      'As a NAS operating system for file storage',
      'As a container registry for Docker images',
    ],
    answer: 1,
    explanation: 'Proxmox VE is a free, open-source Type 1 hypervisor based on Debian that runs directly on bare metal. It supports both full KVM virtual machines and lightweight LXC containers, making it ideal for consolidating multiple services on a single physical server with proper isolation.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'Why is ECC (Error-Correcting Code) RAM recommended for home servers running ZFS?',
    options: [
      'ECC RAM is faster than non-ECC RAM',
      'ZFS requires ECC RAM and will not function without it',
      'ECC RAM detects and corrects single-bit memory errors, preventing silent data corruption',
      'ECC RAM uses less power than standard RAM',
    ],
    answer: 2,
    explanation: 'ECC RAM detects and corrects single-bit memory errors that can occur during normal operation. While ZFS does not strictly require ECC RAM, it is strongly recommended because ZFS keeps critical data structures in memory and a memory error could cause data corruption that gets silently written to disk and propagated across copies.',
  },

  // Chapter 3: Networking Fundamentals
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'What does DDNS (Dynamic DNS) solve for self-hosters?',
    options: [
      'It provides faster DNS resolution than standard DNS',
      'It automatically updates a DNS record when your home IP address changes',
      'It encrypts all DNS queries to prevent snooping',
      'It blocks malicious domains at the DNS level',
    ],
    answer: 1,
    explanation: 'Most residential internet connections have dynamic IP addresses that change periodically. DDNS services (like DuckDNS, Cloudflare API, or No-IP) automatically update your DNS A record whenever your IP changes, ensuring your domain always points to your home server.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is the primary security benefit of VLANs in a home network?',
    options: [
      'VLANs increase internet speed by reducing congestion',
      'VLANs provide network segmentation, isolating IoT devices and servers from your main network',
      'VLANs encrypt all traffic between devices',
      'VLANs eliminate the need for a firewall',
    ],
    answer: 1,
    explanation: 'VLANs create logically separate networks on the same physical infrastructure. This lets you isolate untrusted IoT devices, guest networks, and server infrastructure from your personal devices. If a compromised IoT device is exploited, VLAN segmentation prevents lateral movement to your main network.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What is a Cloudflare Tunnel and why do self-hosters use it?',
    options: [
      'A VPN service that replaces WireGuard',
      'A tool that exposes local services to the internet without opening ports or needing a public IP',
      'A DNS-over-HTTPS provider that blocks ads',
      'A reverse proxy that runs on Cloudflare\'s servers instead of locally',
    ],
    answer: 1,
    explanation: 'Cloudflare Tunnel (formerly Argo Tunnel) creates an outbound connection from your server to Cloudflare\'s edge network. Traffic reaches your services through Cloudflare without you opening any firewall ports or needing a public IP. This is especially useful for self-hosters behind CGNAT or restrictive ISPs.',
  },

  // Chapter 4: Docker & Containerization
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'In a Docker Compose file, what does the `volumes` directive achieve?',
    options: [
      'It limits the CPU and memory available to the container',
      'It maps host directories or named volumes to paths inside the container for persistent data storage',
      'It configures network interfaces for the container',
      'It specifies which Docker images to download',
    ],
    answer: 1,
    explanation: 'Volumes persist data outside the container\'s writable layer. When a container is recreated (e.g., during an update), data in volumes survives. Bind mounts (`./data:/app/data`) map host paths directly, while named volumes (`mydata:/app/data`) are managed by Docker and stored in `/var/lib/docker/volumes/`.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the recommended way to manage multiple related Docker containers (e.g., a web app with a database)?',
    options: [
      'Run individual `docker run` commands in separate terminal sessions',
      'Use Docker Compose with a `docker-compose.yml` file defining all services, networks, and volumes',
      'Install all services inside a single container',
      'Use Docker Swarm for any multi-container setup',
    ],
    answer: 1,
    explanation: 'Docker Compose lets you define multi-container applications in a single YAML file. Running `docker compose up -d` starts all services with proper networking, volume mounts, and dependency ordering. This is the standard approach for self-hosted stacks and makes updates as simple as `docker compose pull && docker compose up -d`.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What does Watchtower do in a self-hosted Docker environment?',
    options: [
      'It provides a web-based dashboard for managing containers',
      'It automatically monitors and updates running containers when new images are available',
      'It scans container images for security vulnerabilities',
      'It backs up container volumes to remote storage',
    ],
    answer: 1,
    explanation: 'Watchtower monitors running Docker containers and checks for updated images on a schedule. When a new image is found, it gracefully stops the container, pulls the new image, and restarts with the same configuration. While convenient, some self-hosters prefer manual updates for better control over what changes are deployed.',
  },

  // Chapter 5: Reverse Proxies & SSL
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What is the primary purpose of a reverse proxy in a self-hosted setup?',
    options: [
      'To speed up internet connection speed',
      'To route incoming requests to different backend services based on domain name or path, and handle SSL termination',
      'To block all unauthorized outbound traffic',
      'To serve as a DNS server for local devices',
    ],
    answer: 1,
    explanation: 'A reverse proxy sits in front of your services and routes incoming requests based on the hostname (e.g., cloud.example.com → Nextcloud, media.example.com → Jellyfin). It also handles SSL/TLS termination so each service doesn\'t need its own certificate management. Popular options include Traefik, Caddy, and Nginx Proxy Manager.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'How does Let\'s Encrypt issue free SSL certificates, and what is a key limitation?',
    options: [
      'It uses self-signed certificates that browsers trust; limited to one domain',
      'It uses the ACME protocol with domain validation challenges; certificates expire every 90 days and must be renewed',
      'It requires manual verification via email; limited to 10 certificates per account',
      'It generates certificates offline; limited to .com domains only',
    ],
    answer: 1,
    explanation: 'Let\'s Encrypt uses the ACME protocol where you prove domain ownership via HTTP-01 (placing a file on your web server) or DNS-01 (creating a DNS TXT record) challenges. Certificates are free but expire every 90 days, requiring automated renewal. Most reverse proxies (Traefik, Caddy, NPM) handle this automatically.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What advantage does Caddy have over Nginx as a reverse proxy for beginners?',
    options: [
      'Caddy is faster at serving static files',
      'Caddy automatically obtains and renews HTTPS certificates with zero configuration',
      'Caddy supports more programming languages',
      'Caddy uses less memory than Nginx',
    ],
    answer: 1,
    explanation: 'Caddy\'s killer feature is automatic HTTPS — it obtains and renews Let\'s Encrypt certificates by default with no additional configuration. A basic Caddyfile reverse proxy is just 2-3 lines. Nginx requires separate Certbot setup and configuration. However, Nginx has more community resources and Traefik offers better Docker integration.',
  },

  // Chapter 6: Storage & Backup Strategies
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What does the 3-2-1 backup rule specify?',
    options: [
      '3 full backups, 2 incremental backups, 1 differential backup',
      '3 copies of data, on 2 different media types, with 1 copy offsite',
      '3 daily backups, 2 weekly backups, 1 monthly backup',
      '3 servers, 2 RAID arrays, 1 cloud backup',
    ],
    answer: 1,
    explanation: 'The 3-2-1 rule means: keep 3 copies of your data (original + 2 backups), stored on 2 different types of media (e.g., local disk + external drive), with 1 copy stored offsite (e.g., remote server, cloud storage, or a friend\'s house). This protects against hardware failure, theft, fire, and other localized disasters.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What is a key advantage of ZFS over traditional RAID for home server storage?',
    options: [
      'ZFS is supported on all operating systems including Windows',
      'ZFS combines volume management with checksumming to detect and self-heal silent data corruption (bit rot)',
      'ZFS requires less RAM than traditional RAID',
      'ZFS supports larger individual files than any other filesystem',
    ],
    answer: 1,
    explanation: 'ZFS checksums every block of data and metadata. During reads (or scheduled scrubs), it verifies checksums and automatically repairs corrupted data from redundant copies. Traditional hardware RAID has no awareness of data integrity at the filesystem level, so silent corruption (bit rot) can go undetected and even be replicated across mirrors.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What is Borg Backup\'s primary advantage for self-hosters?',
    options: [
      'It provides a graphical user interface for backup management',
      'It offers efficient deduplication, compression, and authenticated encryption for incremental backups',
      'It can back up running virtual machines without stopping them',
      'It integrates directly with cloud storage providers like S3',
    ],
    answer: 1,
    explanation: 'Borg uses content-defined chunking with deduplication, meaning only changed data blocks are stored in each backup. Combined with compression (lz4/zstd) and optional encryption, it creates space-efficient encrypted backup archives. Borgmatic wraps Borg with a YAML config for easy scheduled backups. Restic is a similar alternative with native cloud storage support.',
  },

  // Chapter 7: Media Servers & Management
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is the main difference between Plex and Jellyfin?',
    options: [
      'Plex supports more media formats than Jellyfin',
      'Jellyfin is fully open-source and free with no premium tier, while Plex requires a Plex Pass for some features',
      'Plex can run on Linux while Jellyfin is Windows-only',
      'Jellyfin has better mobile apps than Plex',
    ],
    answer: 1,
    explanation: 'Jellyfin is 100% free and open-source with no telemetry or premium paywalls. Plex is proprietary with a freemium model — hardware transcoding, mobile sync, and some features require a Plex Pass ($5/month or $120 lifetime). Plex generally has more polished apps and a larger ecosystem, while Jellyfin gives full control and privacy.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What is the *arr stack in the context of media management?',
    options: [
      'A collection of error-handling libraries for media servers',
      'A suite of tools (Sonarr, Radarr, Prowlarr, etc.) that automate media discovery, downloading, and organization',
      'A set of media encoding tools for converting video formats',
      'A group of media player applications for different platforms',
    ],
    answer: 1,
    explanation: 'The *arr stack consists of Sonarr (TV shows), Radarr (movies), Lidarr (music), Readarr (books), and Prowlarr (indexer management). These tools monitor for new releases, search indexers, send downloads to a client (qBittorrent/SABnzbd), and automatically rename and organize files for your media server.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is hardware transcoding and why is it important for media servers?',
    options: [
      'It converts media files from one format to another using software only',
      'It uses GPU/iGPU hardware (Quick Sync, NVENC) to convert media in real-time for clients that cannot play the original format',
      'It compresses media files to save storage space',
      'It encrypts media streams for secure playback',
    ],
    answer: 1,
    explanation: 'Hardware transcoding uses dedicated GPU/iGPU silicon (Intel Quick Sync, NVIDIA NVENC, AMD VCE) to convert video codecs in real-time. When a client can\'t play the original format (e.g., HEVC on an old Chromecast), the server transcodes on-the-fly. Hardware transcoding uses far less CPU and power than software transcoding, supporting more simultaneous streams.',
  },

  // Chapter 8: Productivity & Collaboration
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What is Nextcloud\'s primary role in a self-hosted environment?',
    options: [
      'A media streaming server similar to Plex',
      'A self-hosted cloud platform for file sync, calendars, contacts, and collaboration — often called a "Google replacement"',
      'A container orchestration platform like Kubernetes',
      'A monitoring dashboard for server health',
    ],
    answer: 1,
    explanation: 'Nextcloud provides file storage and sync (like Google Drive/Dropbox), calendar and contacts (like Google Calendar), document editing (with Collabora/OnlyOffice), and many apps via its marketplace. It\'s the most popular self-hosted productivity suite and can replace many Google/Microsoft cloud services.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What is Vaultwarden and how does it relate to Bitwarden?',
    options: [
      'Vaultwarden is the enterprise edition of Bitwarden',
      'Vaultwarden is a lightweight, unofficial Bitwarden-compatible server written in Rust that uses far less resources',
      'Vaultwarden is a fork of Bitwarden with additional security features',
      'Vaultwarden is a CLI tool for interacting with Bitwarden vaults',
    ],
    answer: 1,
    explanation: 'Vaultwarden (formerly bitwarden_rs) is an unofficial Bitwarden-compatible server implementation written in Rust. It uses ~10-50MB RAM vs Bitwarden\'s official server which requires MSSQL and ~2GB+ RAM. Vaultwarden is compatible with all official Bitwarden clients and includes premium features (TOTP, attachments, org support) for free.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'Which self-hosted wiki platform is known for its modern interface and Markdown support?',
    options: [
      'MediaWiki (the software behind Wikipedia)',
      'BookStack, which organizes content in a books/shelves/chapters hierarchy with WYSIWYG and Markdown editing',
      'Confluence Server, the self-hosted Atlassian product',
      'DokuWiki, which stores pages as plain text files',
    ],
    answer: 1,
    explanation: 'BookStack uses an intuitive books → shelves → chapters → pages hierarchy that makes organization natural. It supports both WYSIWYG and Markdown editing, has built-in diagrams (draw.io integration), full-text search, and granular permissions. Outline is another modern alternative with real-time collaboration. Wiki.js is also popular for its clean interface.',
  },

  // Chapter 9: Home Automation
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What makes Home Assistant the most popular self-hosted home automation platform?',
    options: [
      'It is the only platform that supports Zigbee devices',
      'It integrates with 2000+ brands/devices locally without requiring cloud connections, preserving privacy',
      'It is the fastest home automation platform available',
      'It is the only platform that runs on Raspberry Pi',
    ],
    answer: 1,
    explanation: 'Home Assistant\'s strength is its massive device compatibility (2000+ integrations) combined with local-first operation. Unlike cloud-dependent platforms (Google Home, Alexa), HA processes automations locally, keeping your data private and working even if your internet goes down. It supports Zigbee, Z-Wave, WiFi, Bluetooth, and many proprietary protocols.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What role does MQTT play in home automation?',
    options: [
      'It is a protocol for streaming video from security cameras',
      'It is a lightweight publish-subscribe messaging protocol ideal for IoT devices to communicate state changes',
      'It is a database format for storing automation rules',
      'It is a wireless protocol competing with WiFi and Bluetooth',
    ],
    answer: 1,
    explanation: 'MQTT (Message Queuing Telemetry Transport) is a lightweight pub-sub protocol designed for constrained devices. IoT sensors publish messages to topics (e.g., "home/living-room/temperature") and automation platforms subscribe to receive updates. An MQTT broker like Mosquitto routes messages. It uses minimal bandwidth and supports QoS levels for reliability.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What is ESPHome used for in a self-hosted smart home?',
    options: [
      'Managing and updating Home Assistant plugins',
      'Creating custom firmware for ESP32/ESP8266 microcontrollers using simple YAML configuration',
      'Routing network traffic between IoT VLANs',
      'Monitoring power consumption of smart devices',
    ],
    answer: 1,
    explanation: 'ESPHome lets you flash custom firmware onto cheap ESP32/ESP8266 boards using YAML configuration instead of writing C++ code. You can create custom sensors, switches, LED controllers, and displays that integrate natively with Home Assistant. A $3 ESP32 board + a sensor becomes a fully integrated smart home device with OTA updates.',
  },

  // Chapter 10: Privacy & Ad Blocking
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'How does Pi-hole block ads at the network level?',
    options: [
      'It inspects HTTP traffic and removes ad content from web pages',
      'It acts as a DNS sinkhole, blocking DNS queries to known ad-serving and tracking domains',
      'It installs a browser extension on all connected devices',
      'It modifies the hosts file on each device on the network',
    ],
    answer: 1,
    explanation: 'Pi-hole acts as your network\'s DNS server. When a device requests an ad domain (e.g., ads.doubleclick.net), Pi-hole returns 0.0.0.0 instead of the real IP, preventing the connection. This blocks ads for ALL devices on the network — including smart TVs, mobile apps, and IoT devices — without installing anything on each device.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What is the main advantage of WireGuard over OpenVPN for self-hosted VPN access?',
    options: [
      'WireGuard supports more encryption algorithms',
      'WireGuard has a much smaller codebase (~4000 lines vs ~100,000), faster connections, and better performance with modern cryptography',
      'WireGuard works on more operating systems',
      'WireGuard is easier to configure with a GUI',
    ],
    answer: 1,
    explanation: 'WireGuard\'s ~4000-line codebase (vs OpenVPN\'s ~100,000) makes it easier to audit and maintain. It establishes connections nearly instantly (vs seconds for OpenVPN), achieves higher throughput, and uses modern cryptography (ChaCha20, Curve25519). Tools like wg-easy or Tailscale make configuration simple with a web UI or zero-config mesh networking.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is Tailscale and how does it differ from a traditional self-hosted VPN?',
    options: [
      'Tailscale is a DNS provider that encrypts all DNS queries',
      'Tailscale is a mesh VPN built on WireGuard that creates peer-to-peer connections without needing to open ports or configure a VPN server',
      'Tailscale is an ad-blocking tool similar to Pi-hole',
      'Tailscale is a firewall that replaces iptables',
    ],
    answer: 1,
    explanation: 'Tailscale builds a mesh VPN using WireGuard where devices connect directly to each other (peer-to-peer) without routing through a central server. It works behind NAT/CGNAT using DERP relay servers for NAT traversal. No port forwarding needed. Headscale is a self-hosted open-source alternative to Tailscale\'s coordination server for those wanting full control.',
  },

  // Chapter 11: Monitoring & Observability
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'In the Prometheus + Grafana monitoring stack, what is each tool\'s role?',
    options: [
      'Prometheus visualizes data, Grafana collects metrics',
      'Prometheus scrapes and stores time-series metrics, Grafana queries and visualizes them in dashboards',
      'Both tools perform the same function and are interchangeable',
      'Prometheus monitors containers, Grafana monitors physical servers',
    ],
    answer: 1,
    explanation: 'Prometheus is a time-series database that periodically scrapes metrics from configured endpoints (exporters). Grafana is a visualization platform that queries Prometheus (and other data sources) to create dashboards, graphs, and alerts. Together: Prometheus collects and stores, Grafana visualizes and alerts. Node Exporter provides host metrics, cAdvisor provides container metrics.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is Uptime Kuma primarily used for?',
    options: [
      'Collecting and storing server performance metrics',
      'A self-hosted monitoring tool that checks whether services are up and sends notifications when they go down',
      'Visualizing network traffic patterns',
      'Managing container lifecycles and auto-restarts',
    ],
    answer: 1,
    explanation: 'Uptime Kuma is a self-hosted uptime monitoring tool (like a self-hosted UptimeRobot). It checks HTTP(S), TCP, DNS, ping, and other endpoints on a schedule and sends notifications via Slack, Discord, Telegram, email, and 90+ other services when something goes down. It provides a clean status page you can share publicly.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What is the recommended logging stack for a self-hosted environment that needs log aggregation?',
    options: [
      'Storing all logs in a MySQL database',
      'Loki + Promtail + Grafana (PLG stack), which provides lightweight log aggregation with label-based indexing',
      'Sending all logs to a text file with `docker logs > file.txt`',
      'Using journalctl as the only log management tool',
    ],
    answer: 1,
    explanation: 'The PLG stack (Promtail + Loki + Grafana) is a lightweight alternative to the ELK stack. Promtail ships logs to Loki, which indexes them by labels (not full-text) making it much more resource-efficient than Elasticsearch. Grafana queries Loki alongside Prometheus metrics for unified observability. Ideal for homelabs with limited resources.',
  },

  // Chapter 12: Security Hardening
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is the most important SSH hardening step for a publicly accessible server?',
    options: [
      'Changing the SSH port from 22 to a random port',
      'Disabling password authentication and using SSH key-based authentication only',
      'Installing an SSH GUI client on the server',
      'Enabling root login for easier administration',
    ],
    answer: 1,
    explanation: 'Disabling password authentication and requiring SSH keys eliminates brute-force password attacks entirely. SSH keys use asymmetric cryptography (typically Ed25519) and are practically impossible to brute-force. Changing the port is security by obscurity and doesn\'t prevent targeted attacks. Also add `PermitRootLogin no` and consider fail2ban as defense in depth.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What does fail2ban do to protect self-hosted services?',
    options: [
      'It encrypts all network traffic between services',
      'It monitors log files for failed authentication attempts and temporarily bans offending IP addresses via firewall rules',
      'It scans Docker images for known vulnerabilities',
      'It backs up configuration files to prevent tampering',
    ],
    answer: 1,
    explanation: 'fail2ban watches log files (SSH, Nginx, etc.) for patterns indicating failed login attempts. After a configurable threshold (e.g., 5 failures in 10 minutes), it adds a temporary firewall rule (iptables/nftables) banning that IP. This effectively stops brute-force attacks. It supports jails for many services and custom regex patterns.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'Why should Docker containers run as non-root users when possible?',
    options: [
      'Non-root containers use less memory',
      'If a container is compromised, running as root could allow the attacker to escape to the host system',
      'Docker requires non-root users for networking',
      'Non-root containers have faster startup times',
    ],
    answer: 1,
    explanation: 'Containers running as root (UID 0) have a larger attack surface — a container escape vulnerability could grant root access to the host. Running as a non-root user (using USER directive or --user flag) limits damage from container breakouts. Also use `--read-only` filesystem, drop unnecessary capabilities, and apply seccomp/AppArmor profiles for defense in depth.',
  },

  // Chapter 13: Automation & Infrastructure as Code
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What is Ansible primarily used for in a homelab context?',
    options: [
      'Real-time monitoring of server resources',
      'Declarative configuration management and automation — defining desired server state in YAML playbooks that are executed over SSH',
      'Container orchestration similar to Kubernetes',
      'Version control for application source code',
    ],
    answer: 1,
    explanation: 'Ansible uses agentless, push-based automation over SSH. You write YAML playbooks declaring the desired state (packages installed, configs in place, services running) and Ansible makes it so. It\'s idempotent — running the same playbook twice produces the same result. Ideal for homelab setup: one playbook can configure an entire server from scratch.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What does GitOps mean for self-hosted infrastructure?',
    options: [
      'Using GitHub to host your self-hosted applications',
      'Storing all infrastructure and service configurations in a Git repository as the single source of truth, with changes deployed via commits',
      'Using git commands to manage Docker containers',
      'Backing up server data to a Git repository',
    ],
    answer: 1,
    explanation: 'GitOps treats your Git repository as the source of truth for infrastructure state. All Docker Compose files, Ansible playbooks, and configurations live in version control. Changes are made via commits/PRs, enabling review, rollback, and audit trails. Tools like Flux or ArgoCD can automatically sync changes, but even manual `git pull && docker compose up -d` follows GitOps principles.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is the benefit of using Renovate or Dependabot for self-hosted Docker stacks?',
    options: [
      'They provide a web interface for managing Docker containers',
      'They automatically detect new Docker image versions and create pull requests to update your docker-compose files',
      'They monitor container resource usage and scale automatically',
      'They encrypt Docker images at rest for security',
    ],
    answer: 1,
    explanation: 'Renovate (self-hostable) and Dependabot scan your docker-compose.yml files for image version pins and create PRs when updates are available. This brings dependency management practices from software development to infrastructure. You can set automerge rules for patch updates and require manual review for major versions, keeping your stack current without surprise breaking changes.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
