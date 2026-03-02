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
  { id: 1, title: 'Foundations' },
  { id: 2, title: 'Core Infrastructure' },
  { id: 3, title: 'Services & Applications' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'Introduction to Self-Hosting',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The motivations, economics, and legal landscape of running your own services at home or on dedicated hardware instead of relying on cloud providers.',
    concepts: [
      {
        id: '1-1',
        name: 'Motivations & Philosophy',
        description:
          'Self-hosting means running services on infrastructure you control rather than renting them from cloud providers. It is driven by a desire for data sovereignty, privacy, customization freedom, and the educational value of building and maintaining real infrastructure.',
        keyPoints: [
          'Data sovereignty is the primary motivation — when you self-host, your emails, photos, documents, and passwords never leave hardware you physically control, eliminating third-party data mining and policy changes',
          'Self-hosting provides complete customization freedom — you can modify configurations, integrate services, and build workflows that are impossible on managed platforms with their walled gardens',
          'The educational value is immense — managing DNS, reverse proxies, containers, and networking teaches real-world system administration skills that directly transfer to professional DevOps and SRE roles',
          'Vendor lock-in avoidance means you are never at the mercy of a provider shutting down, changing pricing, or altering terms of service — your data and services remain under your control indefinitely',
          'The self-hosting community (r/selfhosted, r/homelab) is one of the most active and helpful open-source communities, with curated lists like awesome-selfhosted containing 1,500+ projects',
        ],
        tradeoffs: [
          'You become the sysadmin — every outage, security patch, and backup failure is your responsibility, which demands ongoing time and attention that cloud services abstract away',
          'Self-hosting requires upfront hardware investment and ongoing electricity costs, though for many services the break-even point against cloud subscriptions is 12-18 months',
          'Reliability is harder to achieve at home — enterprise cloud providers offer 99.99% uptime through redundancy and dedicated teams, while a home server may go down during power outages or hardware failures',
        ],
        realWorld: [
          'Google Photos announced storage limits in 2021, driving a massive wave of users to self-hosted alternatives like Immich and PhotoPrism — a clear example of why data sovereignty matters',
          'The r/selfhosted subreddit has 400k+ members sharing homelab setups ranging from single Raspberry Pis running Pi-hole to full rack servers with dozens of containerized services',
          'Many professional cloud engineers maintain homelabs specifically to experiment with technologies like Kubernetes, Terraform, and Ansible in a low-stakes environment before deploying them at work',
        ],
      },
      {
        id: '1-2',
        name: 'Cost Analysis vs Cloud',
        description:
          'A realistic comparison of the total cost of ownership for self-hosted services versus cloud subscriptions, factoring in hardware, electricity, maintenance time, and the hidden costs of both approaches.',
        keyPoints: [
          'Cloud subscription costs add up quickly — a family paying for Google One ($30/yr), a password manager ($36/yr), VPN ($60/yr), media streaming ($180/yr), and cloud storage ($120/yr) spends $400+/year on services that can all be self-hosted',
          'A capable entry-level server (used Dell OptiPlex or Lenovo ThinkCentre mini PC, 16-32GB RAM, 1TB SSD) costs $100-$300 and can run dozens of containerized services simultaneously',
          'Electricity cost is often overestimated — a modern mini PC draws 10-25W idle, costing $10-$25/year at average US electricity rates ($0.12/kWh), while a full tower server may draw 80-150W ($85-$160/year)',
          'The hidden cost of self-hosting is your time — budget 2-5 hours/month for updates, troubleshooting, and maintenance, though automation with tools like Watchtower and Ansible can reduce this significantly',
          'Hardware resale value offsets depreciation — enterprise-grade equipment like Dell PowerEdge servers retains value well in the homelab community, and components can be incrementally upgraded',
        ],
        tradeoffs: [
          'Cloud services include support, automatic updates, and SLA guarantees that self-hosting does not — the "free" aspect of self-hosting only accounts for monetary cost, not time investment',
          'Some services are extremely difficult or impractical to self-host reliably (email delivery reputation, global CDN) making a hybrid approach of self-hosting what you can and using cloud for what you cannot the most pragmatic strategy',
          'Scaling beyond a single household increases complexity exponentially — sharing self-hosted services with family and friends requires VPN/tunnel setup, user management, and higher reliability expectations',
        ],
        realWorld: [
          'A common homelab cost breakdown: $200 mini PC + $50 external HDD + $25/year electricity = $275 first year to replace $400+/year in cloud subscriptions, with the server paying for itself in under 9 months',
          'The "Servarr" stack (Sonarr + Radarr + Prowlarr + Jellyfin) replaces multiple streaming subscriptions ($50-100/month) with a single server running open-source media management software',
          'Enterprise equipment recyclers sell Dell PowerEdge R720/R730 servers for $150-$400, making enterprise-grade hardware with dual CPUs, ECC RAM, and IPMI accessible to hobbyists',
        ],
      },
      {
        id: '1-3',
        name: 'Legal & ISP Considerations',
        description:
          'The legal requirements, ISP restrictions, and regulatory considerations that self-hosters must navigate, including terms of service violations, data protection laws, and hosting responsibilities.',
        keyPoints: [
          'Most residential ISP terms of service prohibit running "servers" but enforcement is rare for low-traffic personal services — however, hosting public-facing services that generate significant traffic may trigger throttling or account termination',
          'Many residential ISPs use CGNAT (Carrier-Grade NAT), which means multiple customers share a single public IP address, making inbound connections impossible without workarounds like Cloudflare Tunnels, Tailscale, or a VPS relay',
          'If you host services for others (even family), data protection regulations like GDPR (EU) or CCPA (California) may apply, requiring you to handle personal data responsibly, respond to deletion requests, and report breaches',
          'Running certain services like a public-facing email server, Tor exit node, or open DNS resolver can attract legal scrutiny or abuse complaints that ISPs will forward to you',
          'Some jurisdictions have specific laws about data retention, encryption, and lawful interception that may affect self-hosted communication services like Matrix/Element or email servers',
        ],
        tradeoffs: [
          'Using a Cloudflare Tunnel or Tailscale Funnel bypasses CGNAT and ISP restrictions but routes traffic through a third party, partially negating the privacy benefits of self-hosting',
          'A cheap VPS ($3-5/month from providers like Hetzner, BuyVM, or Oracle Cloud free tier) as a reverse proxy preserves your home IP privacy and avoids ISP issues, but adds another point of failure and cost',
          'Hosting services exclusively on your LAN (no external access) eliminates most legal and ISP concerns but limits the usefulness of services like Nextcloud, Vaultwarden, or Immich when away from home',
        ],
        realWorld: [
          'Cloudflare Tunnels (formerly Argo Tunnels) have become the most popular solution for self-hosters behind CGNAT — the free tier allows exposing services without opening any ports or needing a public IP',
          'Oracle Cloud free tier offers 4 ARM Ampere A1 cores, 24GB RAM, and 200GB storage permanently free, making it a popular VPS for self-hosters to use as a WireGuard or reverse proxy endpoint',
          'Germany has strict data protection enforcement — German self-hosters running Nextcloud instances for family members must comply with GDPR, including maintaining records of processing activities',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Home Server Hardware & OS',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Selecting the right hardware platform and operating system for your self-hosted infrastructure, from low-power mini PCs to enterprise rack servers, and choosing between bare-metal Linux, hypervisors, and NAS distributions.',
    concepts: [
      {
        id: '2-1',
        name: 'Hardware Selection',
        description:
          'Choosing the right hardware for self-hosting involves balancing compute power, storage capacity, power consumption, noise levels, and budget across platforms ranging from single-board computers to enterprise rack servers.',
        keyPoints: [
          'Mini PCs (Intel NUC, Lenovo ThinkCentre Tiny, Dell OptiPlex Micro) are the sweet spot for most homelabs — 10-25W idle power draw, silent operation, and enough power (4-8 cores, 16-64GB RAM) to run 20+ Docker containers',
          'Raspberry Pi 4/5 (4-8GB) is ideal for dedicated single-service use cases like Pi-hole, Home Assistant, or a WireGuard VPN server, but limited RAM and SD card reliability make it poor for heavy workloads',
          'Used enterprise servers (Dell PowerEdge R720/R730, HP ProLiant DL380) offer massive compute and ECC RAM for $200-$500 but draw 100-300W idle and produce significant fan noise — only suitable for dedicated server rooms or garages',
          'ECC (Error-Correcting Code) RAM is strongly recommended for storage-heavy workloads, especially ZFS, as non-ECC memory bit flips can cause silent data corruption that propagates through the filesystem',
          'Consider future expansion when choosing hardware — select a platform with available RAM slots, drive bays, and PCIe slots so you can grow incrementally rather than replacing the entire system',
        ],
        tradeoffs: [
          'Mini PCs are quiet and power-efficient but typically limited to 1-2 drive bays, requiring external storage solutions (USB enclosures, NAS) for large media libraries',
          'Enterprise servers provide enterprise-grade reliability (redundant PSUs, IPMI/iDRAC remote management, hot-swap drives) but the noise, power draw, and heat output make them impractical for apartments',
          'ARM-based platforms (Raspberry Pi, Orange Pi, Odroid) are extremely power-efficient but many Docker images and applications still lack ARM64 builds, limiting software compatibility',
        ],
        realWorld: [
          'The Lenovo ThinkCentre M720q/M920q is considered the "king of homelabs" — available used for $80-$150, supports 64GB RAM, has an M.2 NVMe slot plus 2.5" SATA bay, and draws under 15W idle',
          'The "Project TinyMiniMicro" series by ServeTheHome systematically benchmarks mini PCs from Dell, HP, and Lenovo specifically for homelab use cases, becoming the go-to hardware review resource',
          'Many self-hosters start with a single Raspberry Pi running Pi-hole, then graduate to a mini PC running Docker, and eventually build a full rack with a dedicated NAS, compute server, and network switch',
        ],
      },
      {
        id: '2-2',
        name: 'Linux Server Distros (Ubuntu/Debian/Proxmox)',
        description:
          'Choosing the right operating system for your server is a foundational decision that affects package availability, stability, community support, and whether you run containers directly on bare metal or inside virtual machines on a hypervisor.',
        keyPoints: [
          'Ubuntu Server LTS (22.04/24.04) is the most popular choice for beginners — 5-year support, huge community, extensive documentation, and near-universal compatibility with Docker, snap packages, and PPAs',
          'Debian Stable is preferred by experienced homelabbers for its rock-solid stability and minimal bloat — packages are older but thoroughly tested, and it forms the base for both Ubuntu and Proxmox',
          'Proxmox VE is a free Type 1 hypervisor (based on Debian) that lets you run multiple virtual machines and LXC containers with a web GUI — ideal for running isolated environments like a Docker VM, a NAS VM, and a firewall VM on the same hardware',
          'LXC containers in Proxmox provide near-native performance with less overhead than full VMs — popular for running services that do not need full OS isolation, with community scripts at tteck/Proxmox (now community-scripts) automating deployment',
          'Immutable distributions like NixOS and Fedora CoreOS are gaining popularity for homelabs because they enable declarative, reproducible server configurations where the entire OS state is defined in configuration files',
        ],
        tradeoffs: [
          'Bare-metal Linux (Ubuntu/Debian + Docker) is simpler and has less overhead, but a single OS crash takes down all services — Proxmox adds a hypervisor layer that isolates failures but adds management complexity',
          'Ubuntu includes more out-of-the-box conveniences (snap, unattended-upgrades, hardware drivers) but also more bloat and Canonical-specific decisions like snap confinement that some users find restrictive',
          'Proxmox is free but the enterprise repository requires a subscription ($95/year per socket) — the no-subscription repository works fine for homelabs but shows a nag popup on every web UI login',
        ],
        realWorld: [
          'The tteck/Proxmox helper scripts (now community-scripts/ProxmoxVE) provide one-line commands to deploy 200+ services as LXC containers on Proxmox, dramatically simplifying homelab setup',
          'A common Proxmox architecture: one VM for Docker (running all containerized services), one LXC for Pi-hole, one LXC for Home Assistant, and one VM for TrueNAS — all isolated but sharing the same hardware',
          'Debian 12 "Bookworm" is the current stable release and the foundation for Proxmox 8.x — many homelabbers run Debian directly when they want Docker simplicity without the hypervisor layer',
        ],
      },
      {
        id: '2-3',
        name: 'Power & Cooling',
        description:
          'Managing power consumption, heat dissipation, and electrical infrastructure for home servers, including UPS selection, thermal management, and strategies for minimizing electricity costs while maintaining uptime.',
        keyPoints: [
          'A UPS (Uninterruptible Power Supply) is essential — even a basic 600VA unit ($60-$100) from APC or CyberPower provides 10-15 minutes of runtime for a mini PC, enough for graceful shutdown during power outages via NUT (Network UPS Tools)',
          'Measure actual power consumption with a Kill-A-Watt meter before estimating electricity costs — many servers draw significantly less at idle than their PSU rating suggests, and idle power is what matters for 24/7 operation',
          'Thermal throttling silently kills performance — ensure adequate airflow around your server, keep ambient temperature below 35C/95F, and monitor CPU temperatures via lm-sensors on Linux ("sensors" command) or IPMI on enterprise hardware',
          'Wake-on-LAN (WoL) allows powering on a server remotely via a magic packet, enabling a power-saving strategy where the server sleeps during low-usage hours and wakes on demand',
          'For rack-mounted equipment, 80mm and 120mm Noctua fans are the gold standard for replacing loud enterprise fans — the NF-A12x25 runs at 18dB while moving enough air to cool server components',
        ],
        tradeoffs: [
          'Running servers 24/7 maximizes availability but increases electricity costs and component wear — scheduling downtime windows with systemd timers or cron jobs for non-critical services can save 30-50% on power',
          'Enterprise servers with redundant PSUs provide power fault tolerance but draw significantly more power (even when one PSU is unused) compared to consumer hardware with single PSUs',
          'Liquid cooling and custom fan curves provide optimal thermals but add complexity and potential leak risk — for most homelabs, good case airflow and quality thermal paste are sufficient',
        ],
        realWorld: [
          'NUT (Network UPS Tools) is the standard for Linux UPS management — it monitors UPS status via USB/SNMP and can trigger graceful shutdown of multiple machines when battery drops below a threshold ("upsmon" daemon)',
          'The Proxmox web UI integrates with NUT to display UPS status and automatically shut down VMs in a defined order during power failures, protecting against data loss and filesystem corruption',
          'A popular energy optimization: running all services on a 15W mini PC with an external 4-bay USB SATA enclosure that spins down drives after 30 minutes of inactivity, keeping idle power under 20W total',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Networking Fundamentals',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The networking knowledge required to expose self-hosted services securely, including DNS management, firewall configuration, and network segmentation strategies that protect your home network from compromised services.',
    concepts: [
      {
        id: '3-1',
        name: 'DNS & DDNS',
        description:
          'DNS (Domain Name System) maps human-readable domain names to IP addresses, and Dynamic DNS services automatically update those records when your home IP changes, which is essential for accessing self-hosted services remotely.',
        keyPoints: [
          'A custom domain ($10-15/year from Cloudflare, Namecheap, or Porkbun) is the foundation of a professional self-hosting setup — it enables subdomains like cloud.yourdomain.com, vault.yourdomain.com, and media.yourdomain.com',
          'DDNS (Dynamic DNS) services like DuckDNS (free), Cloudflare API, or ddclient automatically update your DNS A record when your ISP changes your public IP, which typically happens every 1-7 days on residential connections',
          'Split DNS (also called split-horizon DNS) resolves internal domains to local IPs when on your LAN and public IPs when external — tools like Pi-hole, AdGuard Home, or Technitium DNS Server handle this with DNS rewrites or local DNS records',
          'Cloudflare as a DNS provider (free tier) offers DDoS protection, proxy mode that hides your home IP behind Cloudflare\'s anycast network, and an API for automated record updates via ddclient or custom scripts',
          'DNS propagation can take 1-48 hours when changing providers, but setting a low TTL (300 seconds) before migration minimizes downtime — Cloudflare proxied records have a fixed TTL of "Auto" which is typically 5 minutes',
        ],
        tradeoffs: [
          'Cloudflare proxy mode hides your real IP but adds latency (traffic routes through Cloudflare), breaks non-HTTP protocols, and means Cloudflare can technically inspect your traffic even with HTTPS',
          'Running your own authoritative DNS server (BIND, PowerDNS) gives you full control but requires significant expertise and redundancy — misconfigured DNS is the most common cause of self-hosted service outages',
          'Free DDNS services (DuckDNS, No-IP) work well but the domains look unprofessional and some services rate-limit or expire inactive accounts — a $10/year custom domain with Cloudflare API is a better long-term investment',
        ],
        realWorld: [
          'ddclient is the standard Linux DDNS updater — a typical configuration polls an IP detection service every 5 minutes and updates Cloudflare records via API: "ddclient -daemon 300 -protocol cloudflare -login token -password API_TOKEN"',
          'Technitium DNS Server is an open-source DNS server with a web UI that supports DNS-over-HTTPS, split DNS, conditional forwarding, and DNSSEC — popular as a more feature-rich alternative to Pi-hole\'s built-in DNS',
          'Many self-hosters use the "Cloudflare + local DNS" pattern: Cloudflare handles public DNS with proxy mode, while Pi-hole or AdGuard Home provides local DNS resolution pointing directly to the server\'s LAN IP to avoid hairpin NAT issues',
        ],
      },
      {
        id: '3-2',
        name: 'Port Forwarding & Firewalls',
        description:
          'Port forwarding directs incoming internet traffic through your router to specific services on your server, while firewalls control which connections are allowed or blocked, forming the first line of defense for exposed services.',
        keyPoints: [
          'Port forwarding maps an external port on your router\'s public IP to an internal IP:port on your server — for example, forwarding external port 443 to 192.168.1.100:443 allows HTTPS traffic to reach your reverse proxy',
          'Only forward the minimum necessary ports — typically just 80 (HTTP) and 443 (HTTPS) to your reverse proxy, which then routes traffic internally to individual services based on the subdomain or path',
          'UFW (Uncomplicated Firewall) is the standard Linux firewall for homelabs — "sudo ufw default deny incoming && sudo ufw allow ssh && sudo ufw allow 443/tcp && sudo ufw enable" creates a secure baseline configuration',
          'iptables/nftables are the underlying Linux firewall frameworks — UFW is a user-friendly frontend, but understanding raw iptables rules ("iptables -L -n -v") is valuable for debugging complex networking issues',
          'Cloudflare Tunnels and Tailscale Funnel eliminate the need for port forwarding entirely by establishing outbound tunnels from your server to the provider\'s network, which then proxies inbound traffic back through the tunnel',
        ],
        tradeoffs: [
          'Port forwarding exposes your home IP and specific services directly to the internet — any vulnerability in an exposed service can be exploited, making timely patching and proper reverse proxy configuration critical',
          'Cloudflare Tunnels remove the need for port forwarding but route all traffic through Cloudflare\'s infrastructure, creating a dependency and privacy trade-off where Cloudflare terminates your TLS connections',
          'Running a VPN (WireGuard/Tailscale) for all remote access is more secure than port forwarding but requires VPN client setup on every device and makes sharing services with non-technical users harder',
        ],
        realWorld: [
          'Cloudflare Tunnel setup: "cloudflared tunnel create mytunnel && cloudflared tunnel route dns mytunnel app.yourdomain.com" — creates an outbound-only tunnel that requires zero port forwards and hides your home IP',
          'A common security mistake: forwarding port 22 (SSH) directly to the internet — this results in thousands of brute-force attempts per day, which is why fail2ban, key-only authentication, and non-standard ports are essential',
          'The "zero port forward" homelab architecture has become best practice: all services accessed either via Cloudflare Tunnels (for web services) or Tailscale/WireGuard VPN (for non-web services like SSH, SMB, or database access)',
        ],
      },
      {
        id: '3-3',
        name: 'VLANs & Network Segmentation',
        description:
          'Network segmentation uses VLANs (Virtual LANs) and firewall rules to isolate different types of devices and services into separate network zones, limiting the blast radius if any single device or service is compromised.',
        keyPoints: [
          'VLANs logically divide a single physical network into isolated broadcast domains — IoT devices (VLAN 20), servers (VLAN 30), and trusted clients (VLAN 10) can share the same switches but cannot communicate without explicit firewall rules',
          'A managed switch (TP-Link TL-SG108E at $30 or UniFi Flex Mini at $29) and a VLAN-capable router/firewall (OPNsense, pfSense, or OpenWrt) are the minimum hardware requirements for VLAN segmentation',
          'The principle of least privilege applied to networking: IoT devices should only be able to reach the internet and their controller (Home Assistant), not your NAS, desktop, or server — this prevents a compromised smart bulb from pivoting to sensitive systems',
          'Inter-VLAN routing is handled by the firewall/router — create rules that allow specific traffic (e.g., allow VLAN 10 to access services on VLAN 30 via ports 80/443) while blocking everything else by default',
          'Trunk ports carry traffic for multiple VLANs using 802.1Q tags, while access ports connect end devices to a single VLAN — your switch uplink to the router should be a trunk port carrying all VLANs',
        ],
        tradeoffs: [
          'VLANs add significant complexity to your network configuration — misconfigured VLAN tags or firewall rules can break services in hard-to-debug ways, and every new service may require firewall rule updates',
          'Not all consumer routers support VLANs — you may need to replace your ISP router with OPNsense/pfSense on a mini PC or use a managed switch with a VLAN-aware router like OpenWrt on a supported device',
          'Over-segmentation creates management overhead without proportional security benefit — for most homelabs, three VLANs (trusted, IoT, servers) plus a guest network provide an excellent security posture without excessive complexity',
        ],
        realWorld: [
          'A typical homelab VLAN layout: VLAN 1 (management, 10.0.1.0/24), VLAN 10 (trusted clients, 10.0.10.0/24), VLAN 20 (IoT, 10.0.20.0/24), VLAN 30 (servers, 10.0.30.0/24), VLAN 40 (guest, 10.0.40.0/24)',
          'OPNsense on a Protectli Vault or Topton mini PC (2-4 port Intel i226-V NICs) has become the most popular firewall/router platform for homelabs — it provides VLAN support, IDS/IPS (Suricata), WireGuard VPN, and a web management UI',
          'UniFi network equipment (switches, APs, gateway) provides a unified GUI for VLAN management that is significantly easier than CLI-based configuration, making it popular among self-hosters who want segmentation without mastering CLI networking',
        ],
      },
    ],
  },

  // Part 2: Core Infrastructure
  {
    id: 4,
    title: 'Docker & Containerization',
    part: 2,
    partTitle: 'Core Infrastructure',
    summary:
      'Docker is the backbone of modern self-hosting, enabling you to run dozens of isolated services on a single machine using lightweight containers defined by simple configuration files.',
    concepts: [
      {
        id: '4-1',
        name: 'Docker Basics & Compose',
        description:
          'Docker packages applications with their dependencies into portable containers, and Docker Compose allows you to define and manage multi-container applications using declarative YAML files that version-control your entire service stack.',
        keyPoints: [
          'Docker containers are isolated process environments that share the host kernel — unlike VMs, they start in seconds, use minimal RAM overhead (typically 10-50MB per container), and can run 20-50+ services on modest hardware',
          'Docker Compose (docker-compose.yml) is the standard way to define self-hosted services — it specifies the image, ports, volumes, environment variables, networks, and restart policies for each container in a single file',
          'Volumes persist data outside the container lifecycle — always map important data to named volumes or bind mounts ("/srv/appdata/service:/config") so container updates or recreation do not destroy your data',
          'Docker networks isolate container communication — create a dedicated network ("docker network create proxy") for services that need to communicate with your reverse proxy, and separate networks for backend services like databases',
          'The restart policy "restart: unless-stopped" ensures containers automatically restart after crashes or server reboots, providing basic self-healing without an orchestrator',
        ],
        tradeoffs: [
          'Docker adds a layer of abstraction that can make debugging harder — issues with DNS resolution, networking, volume permissions (UID/GID mapping), and resource limits require Docker-specific knowledge to troubleshoot',
          'Running everything in Docker means a Docker daemon crash or update takes down all services simultaneously — consider running critical services (Pi-hole, reverse proxy) in separate LXC containers or systemd units for isolation',
          'Docker Compose files are easy to write but can become unwieldy at scale — some homelabbers split into multiple compose files per service or use tools like Dockge, Portainer, or CasaOS for GUI management',
        ],
        realWorld: [
          'A typical self-hosted Docker Compose service definition: "services:\\n  jellyfin:\\n    image: jellyfin/jellyfin:latest\\n    ports:\\n      - 8096:8096\\n    volumes:\\n      - /srv/appdata/jellyfin:/config\\n      - /mnt/media:/media:ro\\n    restart: unless-stopped"',
          'Dockge is a modern Docker Compose management UI created by the developer of Uptime Kuma — it provides a web interface for editing compose files, viewing logs, and managing stacks without needing SSH access',
          'The LinuxServer.io team maintains hundreds of Docker images with consistent conventions (PUID/PGID environment variables for permissions, /config for app data) — their images are considered the gold standard for self-hosting',
        ],
      },
      {
        id: '4-2',
        name: 'Container Management & Orchestration',
        description:
          'Managing containers at scale requires tools for health monitoring, automatic updates, resource limits, and optionally orchestration platforms that handle scheduling and failover across multiple hosts.',
        keyPoints: [
          'Portainer CE (Community Edition) is the most popular Docker management GUI — it provides container lifecycle management, log viewing, exec shell access, volume management, and stack deployment through a web interface on port 9443',
          'Watchtower automatically updates running containers by pulling new images and recreating containers with the same configuration — run it with "--schedule 0 0 4 * * *" to check for updates daily at 4 AM',
          'Docker resource limits prevent a single container from consuming all host resources — use "mem_limit: 2g" and "cpus: 2.0" in Compose to cap memory and CPU usage, and "docker stats" to monitor real-time resource consumption',
          'Docker healthchecks ("HEALTHCHECK CMD curl -f http://localhost/ || exit 1") allow the daemon to detect unhealthy containers and mark them for restart, providing self-healing capability without external monitoring',
          'For multi-host setups, Docker Swarm provides built-in orchestration with service replication, rolling updates, and load balancing — it is significantly simpler than Kubernetes and sufficient for most homelab clusters',
        ],
        tradeoffs: [
          'Watchtower auto-updates are convenient but risky — a breaking change in an upstream image can take down services at 4 AM, which is why many self-hosters prefer manual updates with "docker compose pull && docker compose up -d" after reviewing changelogs',
          'Portainer simplifies management but adds another service to maintain and secure — its web interface is a potential attack vector if exposed without proper authentication and HTTPS',
          'Kubernetes (K3s, K0s) provides the most robust orchestration but is dramatically over-engineered for most homelabs — Docker Compose handles single-node deployments perfectly, and Docker Swarm covers basic multi-node needs',
        ],
        realWorld: [
          'A pragmatic update strategy: use Watchtower with label filters ("com.centurylinklabs.watchtower.enable=true") to auto-update low-risk services (monitoring, dashboards) while manually updating critical services (databases, Nextcloud, Vaultwarden)',
          'CasaOS and Cosmos Cloud are newer homelab management platforms that provide app-store-style one-click deployment of self-hosted services, targeting users who want the convenience of a Synology DSM-like experience on any hardware',
          'The "docker system prune -a --volumes" command recovers disk space by removing unused containers, images, networks, and volumes — essential maintenance when your server runs low on storage after months of image pulls',
        ],
      },
      {
        id: '4-3',
        name: 'Image Registries & Builds',
        description:
          'Understanding container image sources, building custom images with Dockerfiles, and optionally running a private registry to host your own images and reduce external dependencies.',
        keyPoints: [
          'Docker Hub is the default public registry but imposes rate limits (100 pulls/6 hours for anonymous, 200 for free accounts) — GitHub Container Registry (ghcr.io) and Quay.io are alternatives without these restrictions',
          'Always pin image versions ("image: jellyfin/jellyfin:10.9.6") rather than using ":latest" in production — this prevents unexpected breaking changes and makes your deployments reproducible and rollback-friendly',
          'Multi-stage Dockerfiles reduce image size by separating build dependencies from runtime — a Go application might use a 1GB golang:1.22 builder stage but produce a final image under 20MB using scratch or alpine as the runtime base',
          'A private registry (Docker Registry, Harbor, or Gitea with packages) lets you host custom-built images locally, cache frequently used images to avoid rate limits, and maintain images for internal tools or modified forks',
          'Docker image layers are cached and shared — placing frequently-changing instructions (COPY source code) after rarely-changing ones (RUN apt install dependencies) in your Dockerfile dramatically speeds up rebuilds',
        ],
        tradeoffs: [
          'Pinning exact versions requires manual version bump management but prevents surprise breakage — a middle ground is pinning to major.minor (":10.9") which gets patch updates automatically while avoiding major breaking changes',
          'Running a private registry adds infrastructure complexity and storage requirements — for most homelabs, simply pulling from Docker Hub or GHCR with pinned versions is sufficient',
          'Building custom images gives you full control but requires maintaining Dockerfiles, rebuilding for security patches, and understanding the base image supply chain — using well-maintained community images (LinuxServer.io) is usually preferable',
        ],
        realWorld: [
          'LinuxServer.io images follow a consistent tagging convention: ":latest" for the newest build, ":version-ls123" for pinned version with LinuxServer build number, enabling precise version control across your stack',
          'GitHub Actions can automatically build and push Docker images to GHCR on every commit — many self-hosters fork applications, customize them, and use CI/CD to maintain their own image builds',
          'The "docker image prune" vs "docker system prune" distinction matters: image prune only removes dangling (untagged) images while system prune removes all unused resources — running the latter weekly keeps disk usage manageable',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Reverse Proxies & SSL',
    part: 2,
    partTitle: 'Core Infrastructure',
    summary:
      'Reverse proxies route incoming web traffic to the correct container based on domain names, while automatically managing SSL/TLS certificates to ensure all your self-hosted services use encrypted HTTPS connections.',
    concepts: [
      {
        id: '5-1',
        name: 'Nginx Proxy Manager vs Traefik vs Caddy',
        description:
          'The three most popular reverse proxies for self-hosting, each with different philosophies: Nginx Proxy Manager offers a GUI, Traefik integrates dynamically with Docker labels, and Caddy provides automatic HTTPS with minimal configuration.',
        keyPoints: [
          'Nginx Proxy Manager (NPM) provides a web GUI for managing proxy hosts, SSL certificates, and access lists — ideal for beginners who prefer clicking over configuration files, running as a Docker container on ports 80, 443, and 81 (admin)',
          'Traefik integrates natively with Docker via container labels — adding "traefik.http.routers.myapp.rule=Host(`app.domain.com`)" to a Docker Compose service automatically creates the reverse proxy route with zero manual configuration',
          'Caddy automatically obtains and renews Let\'s Encrypt certificates with zero configuration — a complete reverse proxy rule is just "app.domain.com { reverse_proxy localhost:8080 }" in the Caddyfile',
          'All three support WebSocket proxying, HTTP/2, load balancing, and middleware (authentication, rate limiting, headers) — the choice is primarily about management style: GUI (NPM), labels (Traefik), or config file (Caddy)',
          'Performance differences are negligible for homelab scale — Traefik and Caddy are written in Go (single binary, low memory), while NPM uses Nginx under the hood (battle-tested, extremely efficient at connection handling)',
        ],
        tradeoffs: [
          'NPM is the easiest to get started with but its GUI can become cumbersome at scale, configuration is not easily version-controlled, and the underlying Nginx configs it generates are not directly editable without risk of being overwritten',
          'Traefik\'s Docker label approach is elegant but the learning curve is steep — the documentation is extensive but complex, and debugging routing issues requires understanding the concepts of entrypoints, routers, services, and middleware',
          'Caddy has the simplest configuration syntax but less community documentation and fewer tutorials specifically for self-hosting compared to NPM and Traefik — however, its automatic HTTPS and Caddyfile format are hard to beat for simplicity',
        ],
        realWorld: [
          'A typical NPM setup: Docker container on ports 80/443/81, web UI for adding proxy hosts pointing to "service-container:port", with automatic Let\'s Encrypt SSL — the most commonly recommended reverse proxy on r/selfhosted for beginners',
          'Traefik Docker label example: "labels:\\n  - traefik.enable=true\\n  - traefik.http.routers.jellyfin.rule=Host(`media.domain.com`)\\n  - traefik.http.routers.jellyfin.tls.certresolver=letsencrypt" — zero-touch proxy configuration',
          'Caddy is increasingly popular because its entire configuration for 10 services fits in 30 lines of a Caddyfile, compared to hundreds of lines of YAML for equivalent Traefik configuration with all middleware and TLS settings',
        ],
      },
      {
        id: '5-2',
        name: "Let's Encrypt & SSL Automation",
        description:
          "Let's Encrypt provides free, automated TLS certificates that encrypt traffic between users and your self-hosted services, with multiple validation methods suited to different homelab network configurations.",
        keyPoints: [
          "Let's Encrypt certificates are free, trusted by all browsers, and valid for 90 days — automatic renewal (typically triggered 30 days before expiry) means you never manually manage certificates once the initial setup is complete",
          'HTTP-01 challenge: Let\'s Encrypt verifies domain ownership by placing a file at "http://yourdomain.com/.well-known/acme-challenge/" — requires port 80 to be reachable from the internet, making it incompatible with Cloudflare Tunnel unless configured carefully',
          'DNS-01 challenge: Let\'s Encrypt verifies ownership by checking a TXT record in your domain\'s DNS — this works without opening any ports and supports wildcard certificates (*.yourdomain.com), making it ideal for self-hosters behind CGNAT',
          'ACME clients handle the entire certificate lifecycle: certbot (standalone CLI), acme.sh (shell script, supports 100+ DNS providers), and the built-in ACME clients in Traefik, Caddy, and NPM',
          'Wildcard certificates (*.yourdomain.com) cover all subdomains with a single certificate, simplifying management — but they require DNS-01 validation and a DNS provider with API support (Cloudflare, Route53, DigitalOcean)',
        ],
        tradeoffs: [
          'HTTP-01 is simpler to set up but requires port 80 open to the internet — DNS-01 avoids port exposure but requires your DNS provider to have an API and adds complexity to the renewal process',
          'Wildcard certificates are convenient but their compromise exposes all subdomains — separate per-service certificates limit blast radius but are harder to manage manually (automation makes this a non-issue)',
          "Let's Encrypt certificates have a 90-day lifetime (vs 1-2 years for paid certificates) requiring reliable automation — a failed renewal goes unnoticed until the certificate expires and browsers show security warnings",
        ],
        realWorld: [
          'acme.sh with Cloudflare DNS: "acme.sh --issue -d \'*.domain.com\' --dns dns_cf" — uses Cloudflare API to create DNS-01 TXT records automatically, obtaining a wildcard certificate without opening any ports',
          'Traefik certificate resolver configuration: "certificatesResolvers:\\n  letsencrypt:\\n    acme:\\n      email: you@email.com\\n      storage: /letsencrypt/acme.json\\n      dnsChallenge:\\n        provider: cloudflare" — automatic wildcard certificate management',
          'A common failure mode: Let\'s Encrypt rate limits allow only 50 certificates per registered domain per week — hitting this during testing is frustrating, so always use the staging environment ("--staging" flag) for initial setup',
        ],
      },
      {
        id: '5-3',
        name: 'Subdomain Routing',
        description:
          'Subdomain-based routing assigns each self-hosted service its own subdomain (e.g., cloud.domain.com, media.domain.com), enabling clean URLs, per-service SSL certificates, and independent security policies for each service.',
        keyPoints: [
          'Subdomain routing is the standard pattern for self-hosting: each service gets a subdomain (cloud.domain.com, vault.domain.com, monitor.domain.com) that the reverse proxy routes to the correct container based on the Host header',
          'A wildcard DNS record (*.domain.com -> your server IP) eliminates the need to create individual DNS records for each service — combined with a wildcard SSL certificate, new services only require a reverse proxy entry',
          'Path-based routing (/nextcloud, /jellyfin) is an alternative but causes problems with many applications that expect to run at the root path — subdomain routing avoids path rewriting issues and is universally supported',
          'Authentication middleware (Authelia, Authentik) can be applied per-subdomain to add SSO (Single Sign-On) and multi-factor authentication in front of services that lack built-in auth, like monitoring dashboards or documentation wikis',
          'HTTP Strict Transport Security (HSTS) headers should be set per-subdomain to force browsers to always use HTTPS — the reverse proxy can inject these headers: "Strict-Transport-Security: max-age=31536000; includeSubDomains"',
        ],
        tradeoffs: [
          'Each subdomain is visible in DNS records and certificate transparency logs (crt.sh) — privacy-conscious users may prefer accessing services only via VPN rather than exposing service names publicly',
          'Wildcard DNS records simplify management but mean any subdomain resolves to your server, including typos and non-existent services — ensure your reverse proxy returns a proper 404 or redirect for unconfigured subdomains',
          'Some corporate networks and public WiFi block non-standard subdomains or use DNS hijacking — users accessing your services from these networks may need a VPN or alternative access method',
        ],
        realWorld: [
          'Cloudflare proxied wildcard DNS: a single *.domain.com CNAME record pointing to your Cloudflare Tunnel ID routes all subdomains through Cloudflare, with each subdomain configured in the tunnel\'s ingress rules',
          'Authentik deployed as an authentication layer: Traefik middleware forwards authentication requests to Authentik, which provides a login page with TOTP/WebAuthn MFA before granting access to protected subdomains',
          'Certificate transparency monitoring via crt.sh: searching "%.yourdomain.com" shows all SSL certificates issued for your domain, revealing which subdomains exist — self-hosters who value privacy use this to audit their exposure',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Storage & Backup Strategies',
    part: 2,
    partTitle: 'Core Infrastructure',
    summary:
      'Reliable storage and comprehensive backup strategies are the foundation of any self-hosted infrastructure, protecting against data loss from hardware failure, ransomware, accidental deletion, and natural disasters.',
    concepts: [
      {
        id: '6-1',
        name: 'RAID & ZFS Fundamentals',
        description:
          'RAID combines multiple drives into a single logical volume with redundancy, while ZFS is an advanced filesystem that integrates volume management, data integrity verification, and snapshot capabilities into a single, robust storage solution.',
        keyPoints: [
          'RAID is NOT a backup — it protects against drive failure but not against accidental deletion, ransomware, fire, or controller failure that corrupts the entire array; you still need off-site backups',
          'RAID 1 (mirror) is the simplest: two drives store identical data, surviving one drive failure with 50% storage efficiency — ideal for boot drives and critical data on small arrays',
          'ZFS is the gold standard for self-hosted storage — it provides checksumming (detects and corrects bit rot), copy-on-write snapshots, built-in compression (lz4/zstd), and configurable redundancy (mirror, RAIDZ1, RAIDZ2) in a single integrated filesystem',
          'ZFS "scrub" should be scheduled monthly ("zpool scrub poolname") — it reads every block, verifies checksums, and automatically repairs corrupted data from redundant copies, providing proactive data integrity that traditional RAID lacks',
          'ZFS memory recommendation is 1GB RAM per TB of storage for optimal ARC (Adaptive Replacement Cache) performance, plus ECC RAM is strongly recommended to prevent memory corruption from being written to disk as valid data',
        ],
        tradeoffs: [
          'ZFS is powerful but complex — expanding a pool requires adding complete vdevs (you cannot add a single drive to an existing RAIDZ vdev until the recent RAIDZ expansion feature in OpenZFS 2.3+), requiring careful upfront planning',
          'RAIDZ1 (single parity, like RAID 5) survives one drive failure but during rebuilds the remaining drives are under heavy load, increasing the risk of a second failure — RAIDZ2 (double parity) is recommended for drives 4TB and larger',
          'Btrfs is a Linux-native alternative to ZFS with similar features (checksums, snapshots, subvolumes) and better kernel integration, but its RAID 5/6 implementation is still considered unstable — use Btrfs only in mirror (RAID 1) or single configurations',
        ],
        realWorld: [
          'A common ZFS NAS setup: 4x 8TB drives in RAIDZ1 providing 24TB usable storage with single-drive fault tolerance, monthly scrubs via cron, and automatic lz4 compression reducing actual disk usage by 10-30% depending on data type',
          'TrueNAS SCALE uses OpenZFS natively and provides a web UI for pool management, snapshot scheduling, and replication — it is the most popular ZFS-based NAS operating system for homelabs',
          'The "ZFS send/receive" pipeline enables efficient incremental replication: "zfs send -i snap1 pool/dataset@snap2 | ssh backup-server zfs receive pool/dataset" — only changed blocks are transmitted, making off-site backup bandwidth-efficient',
        ],
      },
      {
        id: '6-2',
        name: 'NAS Solutions (TrueNAS/OpenMediaVault)',
        description:
          'Network Attached Storage (NAS) operating systems provide a web-managed interface for file storage, sharing protocols, and increasingly application hosting, serving as the central storage hub for self-hosted infrastructure.',
        keyPoints: [
          'TrueNAS SCALE (Linux-based, free) is the most feature-rich NAS OS — it provides ZFS storage, Docker/Kubernetes app hosting, SMB/NFS/iSCSI sharing, replication, and a comprehensive web UI for management',
          'OpenMediaVault (OMV, Debian-based, free) is lighter-weight and more flexible — it supports ext4/Btrfs/XFS (and ZFS via plugin), uses Docker Compose for apps, and runs well on low-power hardware like Raspberry Pi',
          'Synology DSM and QNAP QTS are commercial NAS operating systems that run on proprietary hardware — they offer polish and ease of use but lock you into expensive hardware with limited expansion options',
          'SMB (Samba) is the standard protocol for sharing files with Windows and macOS clients — configure shares with proper permissions and consider enabling SMB3 encryption for sensitive data on untrusted networks',
          'NFS is preferred for Linux-to-Linux sharing (lower overhead, better performance) — NFSv4 with Kerberos authentication should be used when security is important, while NFSv3 is simpler for trusted LAN environments',
        ],
        tradeoffs: [
          'TrueNAS SCALE is powerful but resource-hungry — it recommends 16GB RAM minimum (more for ZFS), making it overkill for simple file sharing where OpenMediaVault on a Raspberry Pi would suffice',
          'Running a dedicated NAS OS means that machine only serves storage — an alternative is running storage services (Samba, NFS) directly on your main Docker server, simplifying infrastructure but reducing isolation',
          'Synology/QNAP hardware is overpriced for the specs but the software is genuinely excellent for non-technical users — building a custom NAS with TrueNAS gives better performance per dollar but requires more technical knowledge',
        ],
        realWorld: [
          'A popular TrueNAS SCALE architecture: dedicated hardware with 6+ drive bays, ZFS pool for bulk storage, SSD pool for application data and Docker volumes, with SMB shares for media and NFS exports for Docker containers on other hosts',
          'OpenMediaVault with the openmediavault-compose plugin provides a clean Debian-based NAS with full Docker Compose support — many homelabbers prefer this over TrueNAS for its simplicity and lower resource requirements',
          'The mergerfs + SnapRAID combination is a popular alternative to traditional RAID for media storage: mergerfs pools multiple drives into a single mount point while SnapRAID provides parity protection with the ability to recover individual files from individual drives',
        ],
      },
      {
        id: '6-3',
        name: 'Backup Strategies (3-2-1 Rule, Borg, Restic)',
        description:
          'A comprehensive backup strategy protects your irreplaceable data using the 3-2-1 rule, deduplicated encrypted backup tools, and automated scheduling to ensure backups actually happen consistently.',
        keyPoints: [
          'The 3-2-1 backup rule: maintain 3 copies of important data, on 2 different types of media/storage, with 1 copy stored off-site — this survives hardware failure (redundancy), device theft (different media), and natural disaster (off-site)',
          'Borg Backup is a deduplicating, compressing, encrypting backup tool — "borg create --compression zstd,3 /backup::daily-{now} /data" creates space-efficient incremental backups where only changed blocks are stored',
          'Restic is a modern alternative to Borg with native support for cloud backends (S3, B2, SFTP, rclone) — "restic -r s3:s3.amazonaws.com/bucket backup /data" backs up directly to cloud storage with client-side encryption',
          'Borgmatic is a wrapper that automates Borg with YAML configuration — define backup sources, destinations, retention policies, and health checks in borgmatic config, then schedule via cron or systemd timer',
          'Retention policies automatically prune old backups: "keep_daily: 7, keep_weekly: 4, keep_monthly: 6" retains daily backups for a week, weekly for a month, and monthly for six months — balancing storage cost with recovery granularity',
        ],
        tradeoffs: [
          'Borg is faster and more space-efficient than Restic for local/SSH backups, but Restic supports cloud backends natively and handles multi-host backups better — choose Borg for local NAS backups and Restic for cloud/remote backups',
          'Cloud backup storage (Backblaze B2 at $6/TB/month, Wasabi at $7/TB/month) provides true off-site protection but ongoing costs add up for large datasets — a friend/family off-site exchange with encrypted Borg repos over SSH is a free alternative',
          'Full system images (Clonezilla, dd) capture the entire disk state for bare-metal recovery but are slow and storage-intensive — application-level backups (database dumps + config files + data directories) are faster and more flexible for Docker-based setups',
        ],
        realWorld: [
          'A comprehensive homelab backup strategy: Borgmatic runs nightly backing up Docker volumes and configs to a local NAS, Restic sends encrypted backups to Backblaze B2 weekly, and ZFS snapshots provide instant rollback for accidental deletions',
          'Docker volume backup pattern: "docker compose stop && borg create /backup::app-{now} /srv/appdata/service && docker compose start" — stopping the container ensures data consistency, though many databases support hot backups via their own dump tools',
          'Uptime Kuma or Healthchecks.io can monitor backup job completion — Borgmatic supports "after_backup" hooks that ping a monitoring URL, alerting you if a backup job fails to complete within the expected window',
        ],
      },
    ],
  },

  // Part 3: Services & Applications
  {
    id: 7,
    title: 'Media Servers & Management',
    part: 3,
    partTitle: 'Services & Applications',
    summary:
      'Self-hosted media servers let you stream your personal media library to any device, while automation tools manage your library with features that rival or exceed commercial streaming platforms.',
    concepts: [
      {
        id: '7-1',
        name: 'Plex vs Jellyfin vs Emby',
        description:
          'The three major media server platforms each offer different approaches to streaming your personal media library, balancing features, openness, and pricing in distinct ways.',
        keyPoints: [
          'Jellyfin is fully open-source and free with no premium tier — it supports direct play and transcoding for movies, TV shows, music, and live TV, with clients for web, Android, iOS, Roku, Fire TV, and more',
          'Plex is the most polished option with the best client ecosystem and features like automatic metadata matching, Watch Together, and PlexAmp for music — but it requires a Plex Pass ($120 lifetime) for hardware transcoding and some mobile features',
          'Emby started as open-source but moved to a proprietary model (Emby Premiere at $119 lifetime) — it sits between Plex and Jellyfin in features and polish, with strong DLNA support and live TV/DVR capabilities',
          'Media should be organized following the Plex/Jellyfin naming convention: "/media/movies/Movie Name (Year)/Movie Name (Year).mkv" and "/media/tv/Show Name/Season 01/Show Name - S01E01 - Episode Title.mkv"',
          'Metadata agents (TMDb, TVDb, MusicBrainz) automatically fetch posters, descriptions, ratings, and cast information — Jellyfin and Plex use these to create a Netflix-like browsing experience for your personal library',
        ],
        tradeoffs: [
          'Plex has the best mobile apps and streaming experience but phones home to Plex servers, requires internet for authentication (even for local playback unless you configure it otherwise), and may introduce ads or unwanted features in free tier',
          'Jellyfin is fully open-source and privacy-respecting but its client apps (especially iOS and smart TVs) are less polished than Plex, and some advanced features like hardware tone mapping require manual configuration',
          'Transcoding is CPU-intensive (or requires a compatible GPU) — direct play avoids transcoding entirely but requires clients that support the media codec, making format selection during acquisition important',
        ],
        realWorld: [
          'Jellyfin with Intel Quick Sync (iGPU) hardware transcoding: even a 10th-gen Intel i3 can handle 10+ simultaneous 4K-to-1080p transcodes using VAAPI, making mini PCs with Intel iGPUs the ideal Jellyfin hardware',
          'The Jellyfin ecosystem includes Jellyseerr (request management), Jellystat (statistics), and Finamp (music client) — together they provide a complete media experience comparable to Plex with zero cost and full privacy',
          'Many self-hosters run both Jellyfin (primary, open-source, private) and Plex (for sharing with family who prefer its polished apps) pointing at the same media library — the two servers coexist without conflicts',
        ],
      },
      {
        id: '7-2',
        name: '*arr Stack (Sonarr/Radarr/Prowlarr)',
        description:
          'The *arr application suite automates media library management by monitoring for new releases, searching indexers, managing downloads, and organizing files into your media server\'s expected directory structure.',
        keyPoints: [
          'Sonarr manages TV shows — it monitors for new episodes, searches configured indexers via Prowlarr, sends downloads to your client (qBittorrent, SABnzbd), and automatically renames/moves completed files to your media library',
          'Radarr does the same for movies — it maintains a watchlist, monitors for releases matching your quality preferences (1080p Bluray, 4K Remux), and handles the complete acquisition-to-library pipeline',
          'Prowlarr is the unified indexer manager — it configures indexers once and syncs them to all *arr applications, eliminating the need to configure the same indexers separately in Sonarr, Radarr, Lidarr, and Readarr',
          'Quality profiles define acceptable release quality: for example, "Bluray-1080p" preferred with "WEB-DL 1080p" as acceptable, with automatic upgrades when a better quality release becomes available',
          'Hardlinks (filesystem links) allow the *arr apps and media server to reference the same file from different directory structures without duplicating storage — this requires all services to use the same filesystem mount',
        ],
        tradeoffs: [
          'The *arr stack has a significant initial learning curve — understanding profiles, quality definitions, custom formats, indexers, download clients, and root folder mapping requires dedicated setup time',
          'Automated media management can consume significant bandwidth and storage — quality profiles should be carefully configured to prevent downloading 50GB 4K remuxes when 8GB 1080p WEB-DL would suffice for your setup',
          'Running the full stack (Prowlarr + Sonarr + Radarr + Lidarr + Readarr + qBittorrent + Jellyfin) can use 2-4GB of RAM — on low-memory systems, consider running only the applications you actively need',
        ],
        realWorld: [
          'The TRaSH Guides (trash-guides.info) are the definitive resource for optimizing *arr stack configuration — they provide recommended quality profiles, custom formats, and Hardlinks/Atomic-Moves setup guides',
          'A standard *arr Docker volume structure: "/data/torrents" for downloads, "/data/media/movies" and "/data/media/tv" for libraries — all containers mount the same "/data" root to enable hardlinks between download and library directories',
          'Recyclarr automatically syncs TRaSH Guide quality profiles and custom formats to your Sonarr/Radarr instances — "recyclarr sync" applies recommended configurations without manual profile editing',
        ],
      },
      {
        id: '7-3',
        name: 'Transcoding & Hardware Acceleration',
        description:
          'Transcoding converts media from one format to another in real-time to match client capabilities, and hardware acceleration uses dedicated GPU silicon to perform this conversion efficiently without overloading the CPU.',
        keyPoints: [
          'Transcoding is triggered when a client cannot direct-play the original file format — common triggers include H.265/HEVC on older clients, high bitrate exceeding bandwidth, subtitle burning, and resolution downscaling (4K to 1080p)',
          'Intel Quick Sync Video (QSV) via VAAPI is the most popular hardware transcoding solution for self-hosting — available in all Intel CPUs with integrated graphics, it handles H.264 and H.265 encode/decode with minimal CPU usage',
          'NVIDIA GPUs support NVENC/NVDEC transcoding — consumer GeForce cards are limited to 3-5 simultaneous streams (artificially), while enterprise Tesla/Quadro cards have no limits; the nvidia-patch project removes consumer limits on Linux',
          'Tone mapping converts HDR (High Dynamic Range) content to SDR for clients that do not support HDR — Jellyfin supports hardware-accelerated tone mapping via QSV or NVENC, preventing washed-out colors on non-HDR displays',
          'Direct play is always preferable to transcoding — organizing your library in widely-compatible formats (H.264 video, AAC audio, SRT subtitles) and using clients that support modern codecs minimizes transcoding needs',
        ],
        tradeoffs: [
          'Hardware transcoding produces lower visual quality than software (CPU) transcoding at the same bitrate, but the speed and efficiency difference is enormous — a CPU that maxes out on 2 transcodes can be replaced by an iGPU handling 15+',
          'Passing through GPU hardware to Docker containers requires host driver setup (--device /dev/dri for Intel, nvidia-container-toolkit for NVIDIA) which can break during driver updates',
          'H.265/HEVC provides 30-50% better compression than H.264 but requires more transcoding power when clients cannot direct-play it — the newer AV1 codec offers even better compression and is increasingly supported in hardware (Intel Arc, NVIDIA 40-series)',
        ],
        realWorld: [
          'Jellyfin VAAPI hardware transcoding setup in Docker: "devices:\\n  - /dev/dri:/dev/dri" in docker-compose.yml, then enable VAAPI in Jellyfin dashboard > Playback > Transcoding, selecting all supported codecs',
          'The Intel N100 processor (found in $150-$200 mini PCs) has become the "homelab hero" — its integrated GPU supports AV1/HEVC/H.264 hardware decode and encode, handling 15+ simultaneous transcodes at under 15W total system power',
          'Tdarr is a self-hosted distributed transcoding application that pre-converts your entire media library to a target codec (e.g., H.265 at 1080p) in the background, reducing the need for real-time transcoding and saving storage space',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Productivity & Collaboration',
    part: 3,
    partTitle: 'Services & Applications',
    summary:
      'Self-hosted productivity tools replace cloud services like Google Workspace, 1Password, and Notion while keeping your sensitive documents, passwords, and notes entirely under your control.',
    concepts: [
      {
        id: '8-1',
        name: 'Nextcloud & File Sync',
        description:
          'Nextcloud is the most comprehensive self-hosted productivity platform, providing file synchronization, calendar, contacts, office document editing, and an extensible app ecosystem that replaces Google Workspace or Microsoft 365.',
        keyPoints: [
          'Nextcloud provides file sync (like Dropbox/Google Drive), calendar (CalDAV), contacts (CardDAV), office document editing (Collabora/OnlyOffice), talk (video calls), and 400+ apps from its app store',
          'The Nextcloud desktop client provides real-time file sync across Linux, macOS, and Windows — mobile apps for Android and iOS offer automatic photo upload, replacing Google Photos backup functionality',
          'Performance optimization is critical: use Redis for caching and file locking, PostgreSQL instead of SQLite for the database, and enable server-side encryption only if you specifically need it (it significantly impacts performance)',
          'Nextcloud All-in-One (AIO) is the recommended deployment method — a single Docker container that manages Nextcloud, database, Redis, Collabora, and backups with automatic updates and a management interface',
          'Background jobs must be configured to run via cron (not AJAX or webcron) for reliable operation: "*/5 * * * * docker exec -u www-data nextcloud php cron.php" ensures file scans, notifications, and cleanup run on schedule',
        ],
        tradeoffs: [
          'Nextcloud is feature-rich but resource-hungry and historically prone to performance issues — a minimum of 2 CPU cores, 4GB RAM, and an SSD for the database is necessary for a responsive experience with 1-5 users',
          'The breadth of Nextcloud apps means many are community-maintained with varying quality — stick to core apps (Files, Calendar, Contacts, Talk, Office) and carefully evaluate third-party apps before installing',
          'Alternatives like Seafile (better sync performance, simpler) or Syncthing (peer-to-peer, no server needed) may be preferable if you only need file sync without the full office/collaboration suite',
        ],
        realWorld: [
          'Nextcloud AIO Docker deployment: "docker run --sig-proxy=false --name nextcloud-aio-mastercontainer -p 8080:8080 -v nextcloud_aio_mastercontainer:/mnt/docker-aio-config -v /var/run/docker.sock:/var/run/docker.sock:ro nextcloud/all-in-one:latest"',
          'Syncthing is a popular Nextcloud alternative for pure file sync — it uses peer-to-peer replication with no central server, making it ideal for syncing between a laptop, phone, and home server without exposing anything to the internet',
          'Immich has emerged as the dedicated Google Photos replacement — it provides machine learning-powered face recognition, map view, memories, and fast mobile app sync, purpose-built for photo management rather than general file sync',
        ],
      },
      {
        id: '8-2',
        name: 'Vaultwarden & Password Management',
        description:
          'Vaultwarden is a lightweight, self-hosted implementation of the Bitwarden password manager API, providing secure password storage, generation, and sync across all devices while keeping your credential vault entirely under your control.',
        keyPoints: [
          'Vaultwarden is a Rust-based reimplementation of the Bitwarden server that uses 10-50MB of RAM instead of the official Bitwarden server\'s 2GB+ — it is fully compatible with all official Bitwarden clients (browser extension, desktop, mobile)',
          'The vault is encrypted with your master password using PBKDF2 (or Argon2id if configured) — even if the server database is compromised, the encrypted vault data is useless without the master password',
          'Enable admin panel access via ADMIN_TOKEN environment variable (use argon2id hash, not plaintext) for user management, organization creation, and server configuration — disable it after initial setup for security',
          'WebSocket support should be enabled ("WEBSOCKET_ENABLED=true") for real-time sync — when you save a password on your phone, it appears on your desktop browser extension within seconds',
          'Emergency access, organizations (shared vaults for families), Send (encrypted file/text sharing), and passkey/FIDO2 support are all available in Vaultwarden, matching the Bitwarden Premium feature set at zero cost',
        ],
        tradeoffs: [
          'Self-hosting your password vault means a server outage locks you out of all passwords — mitigate with offline vault caching (Bitwarden clients cache the last sync), reliable backups, and an emergency kit with master password stored in a physical safe',
          'Vaultwarden is maintained by a single developer and is not officially affiliated with Bitwarden — while the project is excellent, some users prefer the official Bitwarden self-hosted server for commercial support and guaranteed compatibility',
          'Exposing Vaultwarden to the internet (necessary for mobile sync) makes it a high-value target — it should be behind a reverse proxy with HTTPS, ideally with additional authentication middleware (Authelia/Authentik) or accessed only via VPN',
        ],
        realWorld: [
          'Vaultwarden Docker deployment: "docker run -d --name vaultwarden -v /srv/appdata/vaultwarden:/data -e DOMAIN=https://vault.domain.com -e WEBSOCKET_ENABLED=true -p 8080:80 vaultwarden/server:latest"',
          'Backup strategy for Vaultwarden: the SQLite database at "/data/db.sqlite3" contains the encrypted vault — back it up with "sqlite3 /data/db.sqlite3 \'.backup /backup/vaultwarden.sqlite3\'" for a consistent copy, then encrypt and store off-site',
          'Many self-hosters also export their vault periodically as an encrypted JSON file stored on a USB drive in a safe — this provides a last-resort recovery option independent of the server infrastructure',
        ],
      },
      {
        id: '8-3',
        name: 'Wikis & Documentation (BookStack/Outline)',
        description:
          'Self-hosted wikis and documentation platforms provide a structured knowledge base for technical notes, procedures, runbooks, and personal documentation, replacing services like Notion, Confluence, or Google Docs for private knowledge management.',
        keyPoints: [
          'BookStack organizes content in a hierarchical "Shelves > Books > Chapters > Pages" structure — it provides a WYSIWYG and Markdown editor, full-text search, diagrams (draw.io integration), and granular role-based permissions',
          'Outline is a modern, Notion-like wiki with real-time collaboration, nested documents, slash commands, and a clean interface — it supports Markdown, has a REST API, and integrates with S3-compatible storage for file attachments',
          'Wiki.js is a powerful open-source wiki with multiple editors (Markdown, visual, raw HTML), Git-based storage backend, full-text search via Elasticsearch, and built-in authentication providers (LDAP, OAuth, SAML)',
          'Use your wiki as a homelab runbook: document every service\'s configuration, Docker Compose files, network diagram, backup procedures, and disaster recovery steps — when something breaks at 2 AM, your runbook is invaluable',
          'All three support API access for programmatic content creation — automate documentation with scripts that dump configurations, network topology, or service health into wiki pages on a schedule',
        ],
        tradeoffs: [
          'BookStack is the most beginner-friendly with its clear hierarchy, but the rigid structure (Shelves/Books/Chapters/Pages) can feel constraining for users who prefer Notion-style free-form organization',
          'Outline is the most polished but requires more infrastructure (Redis, PostgreSQL, S3 storage) — it also requires OIDC authentication, meaning you need an identity provider like Authentik or Keycloak',
          'Simpler alternatives like HedgeDoc (collaborative Markdown), Trilium Notes (personal knowledge base), or even a Git repository with Markdown files may be more appropriate if you do not need multi-user collaboration features',
        ],
        realWorld: [
          'A homelab wiki should contain: network diagram with IP assignments, Docker Compose files with annotations, backup schedule and restoration procedures, a "what to do if X breaks" troubleshooting guide, and hardware inventory with purchase dates and warranty info',
          'BookStack Docker Compose requires only two containers (app + MariaDB) and runs on minimal resources — it is the most commonly recommended wiki for self-hosters due to its simplicity and low maintenance overhead',
          'Memos is a rising alternative for quick notes and journaling — it functions like a self-hosted Twitter/X for personal microblogging and quick captures, complementing a more structured wiki for detailed documentation',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Home Automation',
    part: 3,
    partTitle: 'Services & Applications',
    summary:
      'Home automation unifies control of smart devices, sensors, and automations through open-source platforms that run locally without cloud dependencies, providing reliability and privacy that commercial smart home ecosystems cannot match.',
    concepts: [
      {
        id: '9-1',
        name: 'Home Assistant Core Concepts',
        description:
          'Home Assistant is the dominant open-source home automation platform, providing a unified interface for 2,000+ integrations, powerful automations, and a local-first architecture that works without internet connectivity.',
        keyPoints: [
          'Home Assistant integrates with 2,000+ smart home devices and services through its integration ecosystem — it provides a unified dashboard (Lovelace) that controls everything from lights and thermostats to media players and security cameras',
          'HASS OS (Home Assistant Operating System) is the recommended installation method — it runs as a dedicated OS on a Raspberry Pi, mini PC, or VM, providing Supervisor for add-on management, backups, and automatic updates',
          'Entities are the core abstraction — every device and sensor is represented as entities (light.living_room, sensor.temperature_bedroom, switch.garage_door) with states and attributes that automations can read and control',
          'Automations use a trigger-condition-action model: "When motion is detected (trigger) AND it is after sunset (condition) THEN turn on the hallway light at 50% for 5 minutes (action)" — defined via GUI or YAML',
          'The companion mobile app provides presence detection (is the user home or away?), actionable notifications ("Garage door is open — tap to close"), and sensor data from your phone (battery level, location, activity state)',
        ],
        tradeoffs: [
          'Home Assistant has a steep learning curve — the combination of YAML configuration, Jinja2 templating, entity naming conventions, and the distinction between integrations/add-ons/HACS confuses newcomers',
          'Running HASS OS on dedicated hardware (Raspberry Pi, mini PC) provides the best experience but occupies an entire device — running as a Docker container works but lacks Supervisor/add-on support, requiring manual management of Zigbee, MQTT, etc.',
          'The rapid release cycle (monthly updates) frequently introduces breaking changes — always read release notes before updating and maintain regular backups for quick rollback',
        ],
        realWorld: [
          'Home Assistant Yellow and Green are official hardware options: the Green ($99) is a pre-built HA appliance, while the Yellow ($125+) adds a Zigbee radio and NVMe slot — both provide a plug-and-play HA experience',
          'HACS (Home Assistant Community Store) extends HA with 1,500+ community integrations and frontend cards not available in the official repository — popular additions include Mushroom cards (modern UI), browser_mod, and custom device integrations',
          'A common beginner automation: presence-based climate control — when the last person leaves home (phone GPS via companion app), set the thermostat to eco mode; when the first person arrives home, set to comfort mode 10 minutes before arrival based on distance',
        ],
      },
      {
        id: '9-2',
        name: 'MQTT & Zigbee/Z-Wave Protocols',
        description:
          'Smart home communication protocols determine how devices talk to your automation hub, with Zigbee and Z-Wave providing reliable local mesh networks and MQTT serving as the lightweight message broker that ties everything together.',
        keyPoints: [
          'Zigbee is an open, low-power mesh protocol operating at 2.4GHz — devices like Aqara sensors ($8-15), IKEA TRADFRI bulbs ($10), and Sonoff switches form a mesh where each mains-powered device acts as a router, extending range',
          'Z-Wave operates at 800-900MHz (less interference from WiFi) with guaranteed device interoperability — it supports up to 232 devices per network and every Z-Wave device is certified for compatibility, but devices cost 2-3x more than Zigbee equivalents',
          'MQTT (Message Queuing Telemetry Transport) is a lightweight pub/sub messaging protocol — Mosquitto is the standard broker that devices and services publish/subscribe to topics like "home/bedroom/temperature" with payloads like "21.5"',
          'Zigbee2MQTT connects Zigbee devices to Home Assistant via MQTT without proprietary hubs — it supports 3,000+ devices, provides OTA firmware updates, and uses a SONOFF Zigbee 3.0 USB dongle ($15) or SLZB-06 ($35) as the coordinator',
          'ZHA (Zigbee Home Automation) is Home Assistant\'s built-in Zigbee integration — it requires no separate MQTT broker or software, making it simpler to set up than Zigbee2MQTT, but with slightly less device support and fewer advanced features',
        ],
        tradeoffs: [
          'Zigbee2MQTT provides more device support and advanced features but requires running an MQTT broker (Mosquitto) plus the Zigbee2MQTT application — ZHA is simpler but less configurable and handles some devices differently',
          'WiFi-based smart devices (Tuya, Shelly) are convenient but each one consumes an IP address and adds WiFi congestion — a 100-device Zigbee mesh operates on a single coordinator without touching your WiFi network',
          'Matter/Thread is the emerging standard backed by Apple, Google, and Amazon — it promises cross-ecosystem compatibility but adoption is slow and the device selection is still limited compared to Zigbee\'s mature 3,000+ device library',
        ],
        realWorld: [
          'The SONOFF Zigbee 3.0 USB Dongle Plus-E (based on EFR32MG21) is the most recommended Zigbee coordinator for Home Assistant — at $15 it supports 100+ devices and is compatible with both Zigbee2MQTT and ZHA',
          'Mosquitto MQTT broker Docker setup: "docker run -d --name mosquitto -p 1883:1883 -v /srv/appdata/mosquitto/config:/mosquitto/config -v /srv/appdata/mosquitto/data:/mosquitto/data eclipse-mosquitto:latest"',
          'ESPHome devices communicate via the native ESPHome API by default, but can also publish to MQTT — mixing protocols is common: Zigbee for commercial sensors, ESPHome for DIY sensors, and MQTT as the universal bridge between them',
        ],
      },
      {
        id: '9-3',
        name: 'Node-RED & ESPHome Automation',
        description:
          'Node-RED provides visual flow-based programming for complex automations, while ESPHome turns cheap ESP32/ESP8266 microcontrollers into custom smart home sensors and controllers with simple YAML configuration.',
        keyPoints: [
          'Node-RED is a visual flow programming tool where you connect input nodes (triggers) to function nodes (logic) to output nodes (actions) — complex automations that would require pages of YAML in Home Assistant become intuitive drag-and-drop flows',
          'ESPHome flashes ESP32/ESP8266 microcontrollers ($3-5 each) with custom firmware defined in YAML — a temperature sensor, motion detector, LED controller, or garage door opener can be built and integrated into Home Assistant in under an hour',
          'ESPHome YAML example for a temperature sensor: "sensor:\\n  - platform: dht\\n    pin: GPIO4\\n    temperature:\\n      name: \"Bedroom Temperature\"\\n    humidity:\\n      name: \"Bedroom Humidity\"\\n    update_interval: 60s" — automatically appears in Home Assistant',
          'Node-RED integrates with Home Assistant via the WebSocket API — the "node-red-contrib-home-assistant-websocket" palette provides nodes for reading entity states, calling services, and responding to state changes',
          'ESPHome supports hundreds of components: BME280/BMP280 (temperature/humidity/pressure), PIR sensors, relay modules, NeoPixel LEDs, I2C displays, BLE presence detection, and even cameras (ESP32-CAM)',
        ],
        tradeoffs: [
          'Node-RED is powerful but introduces another layer of automation logic separate from Home Assistant — debugging requires checking both platforms, and automations split across two systems are harder to maintain',
          'ESPHome devices require basic electronics knowledge (wiring, soldering, GPIO pinouts) and physical assembly — for non-DIY users, pre-built Zigbee sensors from Aqara or Sonoff are simpler and more reliable',
          'ESP32-based devices use WiFi, which adds to network congestion with many devices — for large sensor deployments (20+ devices), Zigbee or Thread mesh networks are more scalable and power-efficient',
        ],
        realWorld: [
          'A popular ESPHome project: a $7 presence detection sensor using an LD2410 mmWave radar module on a D1 Mini ESP32 — it detects human presence (even when sitting still) and integrates with Home Assistant for room-level occupancy detection',
          'Node-RED automation example: "If no motion detected in 30 minutes AND lights are on AND it\'s a weekday AND nobody is home THEN turn off all lights AND set thermostat to eco AND send notification" — complex multi-condition logic visualized as a flow',
          'The Bluetooth Proxy feature in ESPHome turns any ESP32 into a Bluetooth receiver for Home Assistant — placing ESP32 boards around your home extends BLE coverage for tracking devices like Tile trackers or Switchbot sensors without dedicated Bluetooth adapters',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Privacy & Ad Blocking',
    part: 3,
    partTitle: 'Services & Applications',
    summary:
      'Network-level ad blocking and self-hosted VPN services provide privacy protection for every device on your network, filtering ads and trackers at the DNS level before they ever reach your browser.',
    concepts: [
      {
        id: '10-1',
        name: 'Pi-hole vs AdGuard Home',
        description:
          'Network-level DNS sinkholes block ads, trackers, and malicious domains for every device on your network by intercepting DNS queries and refusing to resolve known advertising and tracking domains.',
        keyPoints: [
          'Pi-hole is the original network-level ad blocker — it intercepts DNS queries and blocks domains on curated blocklists, providing ad-free browsing for every device on your network including smart TVs, IoT devices, and phones without installing per-device software',
          'AdGuard Home provides the same DNS-based blocking with a more modern web UI, built-in DNS-over-HTTPS/DNS-over-TLS support, per-client configuration, and native encrypted DNS server capabilities that Pi-hole requires separate tools for',
          'Both support custom blocklists — the StevenBlack unified hosts list and OISD blocklist are recommended starting points, blocking 100,000+ ad/tracker domains while minimizing false positives that break legitimate websites',
          'Set your DNS sinkhole as the network-wide DNS server via DHCP (configure on your router) — this ensures all devices use it automatically without manual configuration on each device',
          'Query logging shows exactly which domains every device on your network is accessing — this reveals surprisingly verbose telemetry from smart TVs, phones, and IoT devices that phone home hundreds of times per day',
        ],
        tradeoffs: [
          'DNS-based blocking cannot filter ads served from the same domain as content (YouTube ads, Facebook in-stream ads) — for these, browser-based blockers like uBlock Origin are still necessary as a complement',
          'Overly aggressive blocklists break legitimate services — banking sites, captive portals, and some apps rely on domains that aggressive lists block, requiring manual whitelisting and ongoing maintenance',
          'Running a DNS server as a single point of failure means a crash or misconfiguration takes down internet access for the entire network — deploy two instances (primary and secondary DNS) or configure a fallback DNS on your router',
        ],
        realWorld: [
          'AdGuard Home Docker deployment: "docker run -d --name adguard -v /srv/appdata/adguard/work:/opt/adguardhome/work -v /srv/appdata/adguard/conf:/opt/adguardhome/conf -p 53:53/tcp -p 53:53/udp -p 3000:3000 adguard/adguardhome"',
          'A typical blocklist result: Pi-hole/AdGuard Home blocks 15-30% of all DNS queries on a home network, with smart TVs (Samsung, LG) often generating 1,000+ blocked telemetry queries per day',
          'Gravity Sync mirrors Pi-hole configuration between two instances for high availability — if the primary Pi-hole goes down, the secondary continues blocking ads, preventing DNS outages from disrupting the household',
        ],
      },
      {
        id: '10-2',
        name: 'VPN (WireGuard/Tailscale)',
        description:
          'Self-hosted VPN solutions provide secure, encrypted tunnels for accessing your home network remotely and protecting your traffic on untrusted networks, with WireGuard offering raw performance and Tailscale offering zero-configuration mesh networking.',
        keyPoints: [
          'WireGuard is a modern VPN protocol built into the Linux kernel — it uses state-of-the-art cryptography (Curve25519, ChaCha20, Poly1305), has a tiny codebase (~4,000 lines), and provides better performance and lower latency than OpenVPN or IPsec',
          'Tailscale builds a mesh VPN on top of WireGuard that "just works" — it handles NAT traversal, key management, and peer discovery automatically, allowing devices to connect directly without a central VPN server or port forwarding',
          'Headscale is a self-hosted, open-source implementation of the Tailscale control server — it provides the same zero-config mesh networking but runs entirely on your infrastructure, eliminating dependence on Tailscale\'s cloud coordination server',
          'WireGuard configuration is minimal: generate key pairs, define peer entries with allowed IPs, and start the interface — "wg genkey | tee privatekey | wg pubkey > publickey" generates a complete key pair in one command',
          'Split tunneling routes only specific traffic through the VPN (e.g., only traffic destined for your home network 192.168.1.0/24) while letting other traffic go directly to the internet, reducing latency for non-homelab traffic',
        ],
        tradeoffs: [
          'WireGuard requires manual key management, a publicly reachable endpoint (fixed IP or DDNS), and port forwarding (UDP 51820) — Tailscale eliminates all of this but introduces a dependency on Tailscale\'s (or Headscale\'s) coordination server',
          'A full-tunnel VPN routes ALL traffic through your home connection, which slows browsing when away from home due to the extra hop — split tunneling is more efficient but means non-VPN traffic is unprotected on public WiFi',
          'Tailscale\'s free tier allows 100 devices and 3 users, which is generous for personal use — but if Tailscale ever changes pricing or terms, migrating away requires reconfiguring all devices (Headscale mitigates this risk)',
        ],
        realWorld: [
          'WireGuard via wg-easy Docker container: "docker run -d --cap-add NET_ADMIN -e WG_HOST=vpn.domain.com -e PASSWORD=admin_password -p 51820:51820/udp -p 51821:51821/tcp -v /srv/appdata/wg-easy:/etc/wireguard ghcr.io/wg-easy/wg-easy" — provides a web UI for managing VPN clients',
          'Tailscale exit nodes: designate your home server as an exit node, then when on public WiFi, route all traffic through your home connection — equivalent to a full-tunnel VPN but with zero-config setup',
          'The "Tailscale + Pi-hole" pattern: running Tailscale on your server and configuring it as the DNS server for your tailnet means all your devices get ad-blocking from Pi-hole/AdGuard Home even when away from home',
        ],
      },
      {
        id: '10-3',
        name: 'DNS-over-HTTPS & Privacy DNS',
        description:
          'Encrypted DNS protocols prevent ISPs, network operators, and attackers from seeing or tampering with your DNS queries, while privacy-focused DNS resolvers ensure the upstream resolver you trust also respects your privacy.',
        keyPoints: [
          'Standard DNS (port 53) is unencrypted plaintext — your ISP, network operator, and anyone on the network path can see every domain you visit and even redirect your queries to different servers (DNS hijacking)',
          'DNS-over-HTTPS (DoH) encrypts DNS queries inside HTTPS connections to port 443, making them indistinguishable from regular web traffic — this prevents blocking or interception by ISPs and network-level filters',
          'DNS-over-TLS (DoT) encrypts DNS queries via TLS on port 853 — it is easier to implement and has lower overhead than DoH, but the dedicated port makes it blockable by restrictive networks',
          'Upstream DNS resolver choice matters: Cloudflare (1.1.1.1, privacy-focused, fastest), Quad9 (9.9.9.9, malware blocking, Swiss-based), and Mullvad DNS (no logging, ad-blocking variants) are recommended over Google DNS (8.8.8.8) which logs queries',
          'DNSSEC (DNS Security Extensions) cryptographically signs DNS records to prevent spoofing — configure your Pi-hole/AdGuard Home to validate DNSSEC responses from upstream resolvers for an additional layer of integrity',
        ],
        tradeoffs: [
          'DoH makes DNS traffic invisible to local network monitoring (Pi-hole, corporate firewalls) — browsers with built-in DoH (Firefox, Chrome) may bypass your Pi-hole unless you configure the browser to use your local DNS or block external DoH providers at the firewall',
          'Running your own recursive DNS resolver (Unbound) eliminates trust in any upstream provider but increases query latency for uncached domains and requires maintaining the software',
          'Encrypted DNS protects query privacy in transit but the DNS resolver you query still sees your requests — the only way to fully anonymize DNS is to run your own recursive resolver or use Oblivious DoH (ODoH) which separates client identity from query content',
        ],
        realWorld: [
          'Unbound as a recursive resolver: configure Pi-hole/AdGuard Home to forward queries to a local Unbound instance that resolves directly from root servers — "server:\\n  interface: 127.0.0.1\\n  port: 5335\\n  do-ip6: no\\n  prefetch: yes" eliminates dependence on any upstream DNS provider',
          'AdGuard Home natively supports DoH/DoT server mode — after configuring SSL certificates, your mobile devices can use "https://dns.domain.com/dns-query" as their private DNS server, encrypted and ad-blocking from anywhere',
          'Firefox DNS-over-HTTPS can be configured to use your self-hosted DoH server: Settings > Privacy & Security > DNS over HTTPS > Custom provider: "https://dns.yourdomain.com/dns-query" — encrypting DNS even on untrusted networks while still using your ad blocker',
        ],
      },
    ],
  },

  // Part 4: Advanced Topics
  {
    id: 11,
    title: 'Monitoring & Observability',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Monitoring and observability tools provide visibility into the health, performance, and resource utilization of your self-hosted infrastructure, enabling proactive problem detection before services go down.',
    concepts: [
      {
        id: '11-1',
        name: 'Grafana & Prometheus Stack',
        description:
          'The Grafana + Prometheus stack is the industry-standard open-source monitoring solution, collecting time-series metrics from your infrastructure and visualizing them in customizable dashboards.',
        keyPoints: [
          'Prometheus is a time-series database that scrapes metrics from configured targets at regular intervals — it pulls data from exporters (node_exporter for system metrics, cAdvisor for Docker metrics) via HTTP endpoints',
          'Grafana is a visualization platform that connects to Prometheus (and other data sources) to create rich dashboards with graphs, gauges, alerts, and tables — thousands of pre-built dashboards are available on grafana.com/grafana/dashboards',
          'Node Exporter exposes system-level metrics (CPU, memory, disk I/O, network, filesystem) from Linux hosts — "docker run -d --net=host --pid=host -v /:/host:ro prom/node-exporter --path.rootfs=/host" provides comprehensive host monitoring',
          'cAdvisor (Container Advisor) provides per-container resource usage metrics — CPU, memory, network I/O, and filesystem metrics for every Docker container, enabling identification of resource-hungry services',
          'PromQL is Prometheus\'s query language — "rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])" calculates CPU utilization, while alert rules like "node_filesystem_avail_bytes / node_filesystem_size_bytes < 0.1" trigger warnings when disk space drops below 10%',
        ],
        tradeoffs: [
          'The full Grafana + Prometheus + Node Exporter + cAdvisor stack uses 500MB-1GB RAM — on memory-constrained systems, lighter alternatives like Beszel (80MB total) or Netdata (with local storage) may be more appropriate',
          'Prometheus retention defaults to 15 days of data — increasing retention requires proportionally more disk space (roughly 1-2 bytes per sample, with thousands of samples per scrape interval per target)',
          'Configuring Prometheus scrape targets and Grafana dashboards from scratch requires significant initial effort — pre-built stacks like the "dockprom" repository provide a complete Docker Compose setup with pre-configured dashboards',
        ],
        realWorld: [
          'The "dockprom" GitHub repository provides a complete Docker Compose monitoring stack: Prometheus, Grafana, Node Exporter, cAdvisor, and Alertmanager with pre-configured dashboards and alerts — deploy the entire monitoring solution with a single "docker compose up -d"',
          'Grafana Dashboard ID 1860 (Node Exporter Full) is the most popular system monitoring dashboard — it displays comprehensive CPU, memory, disk, network, and system metrics in a single pane of glass',
          'InfluxDB + Telegraf is an alternative metrics pipeline that some homelabbers prefer — Telegraf supports 300+ input plugins and InfluxDB provides SQL-like queries (Flux/InfluxQL), with Grafana visualizing data from either backend',
        ],
      },
      {
        id: '11-2',
        name: 'Uptime Kuma & Health Checks',
        description:
          'Uptime monitoring tools continuously verify that your self-hosted services are accessible and functioning correctly, providing instant alerts when something goes down so you can respond before users notice.',
        keyPoints: [
          'Uptime Kuma is the most popular self-hosted uptime monitor — it checks HTTP(S), TCP, DNS, Docker, and ping targets at configurable intervals (default 60 seconds) and provides a beautiful status page and notification system',
          'Health check types should match the service: HTTP checks verify web services return 200 OK, TCP checks verify port reachability, DNS checks verify resolution, and Docker checks verify container status — use the most specific check type available',
          'Notification integrations include Telegram, Discord, Slack, Email (SMTP), Pushover, Ntfy, and 90+ other services — configure at least two notification channels so a failure in one does not leave you unaware of outages',
          'Status pages can be published publicly (status.domain.com) to communicate service availability to family members or users who share your services — Uptime Kuma generates clean status pages with incident history',
          'Healthchecks.io (self-hostable) monitors cron jobs and scheduled tasks using a "dead man\'s switch" pattern — if a backup script or scheduled task fails to ping the check URL within the expected window, it sends an alert',
        ],
        tradeoffs: [
          'Self-hosted monitoring has a bootstrap problem: if the server running Uptime Kuma goes down, it cannot alert you — use an external uptime monitor (free tier of UptimeRobot, Better Stack, or Healthchecks.io) to monitor your monitoring',
          'Frequent health checks (every 10 seconds) provide faster detection but generate significant log volume and network traffic — 60-second intervals are sufficient for most self-hosted services',
          'Synthetic monitoring (checking from outside your network) catches different issues than internal monitoring — a Cloudflare Worker or external VPS pinging your services detects DNS, ISP, and routing problems that internal checks miss',
        ],
        realWorld: [
          'Uptime Kuma Docker deployment: "docker run -d --restart=always --name uptime-kuma -p 3001:3001 -v /srv/appdata/uptime-kuma:/app/data louislam/uptime-kuma:1" — running within minutes, monitoring configured via the web UI',
          'Ntfy.sh is a self-hostable push notification service — combine it with Uptime Kuma for instant mobile alerts: "docker run -d -p 8080:80 binwiederhier/ntfy" then configure as a notification channel in Uptime Kuma',
          'A practical monitoring strategy: Uptime Kuma checks all services every 60 seconds with Telegram + Ntfy notifications, Healthchecks.io monitors daily backups and cron jobs, and UptimeRobot (free) monitors Uptime Kuma itself from the outside',
        ],
      },
      {
        id: '11-3',
        name: 'Logging & Alerting Strategies',
        description:
          'Centralized logging aggregates logs from all containers and services into a searchable system, while alerting rules automatically notify you of errors, security events, and performance degradation.',
        keyPoints: [
          'Docker logging drivers control where container logs go — the default "json-file" driver writes to /var/lib/docker/containers, but the "loki" driver sends logs directly to Grafana Loki for centralized aggregation and search',
          'Grafana Loki is a lightweight log aggregation system designed to work with Grafana — unlike Elasticsearch (ELK stack), Loki indexes only labels (not full text), making it dramatically more resource-efficient for homelab-scale logging',
          'Dozzle is a real-time Docker log viewer with a web UI — "docker run -d -v /var/run/docker.sock:/var/run/docker.sock -p 8080:8080 amir20/dozzle" provides instant access to all container logs without SSH, ideal for quick troubleshooting',
          'Log retention policies prevent disk exhaustion — configure Docker logging with max-size and max-file options: "logging:\\n  driver: json-file\\n  options:\\n    max-size: 10m\\n    max-file: 3" limits each container to 30MB of logs',
          'Alert fatigue is real — start with critical alerts only (service down, disk full, backup failed) and gradually add warning-level alerts as you establish baseline behavior; too many alerts leads to ignoring them all',
        ],
        tradeoffs: [
          'The full ELK stack (Elasticsearch + Logstash + Kibana) provides powerful full-text search and analytics but requires 4GB+ RAM — Loki + Grafana provides 90% of the functionality at 10% of the resource cost for homelab use',
          'Centralized logging adds complexity and resource usage — for small homelabs (under 10 services), "docker compose logs -f service_name" and Dozzle may be sufficient without deploying a full logging stack',
          'Shipping all logs to a centralized system means sensitive information (API keys, passwords logged in errors) is stored in the logging platform — ensure the log aggregation system is properly secured and implement log scrubbing for sensitive fields',
        ],
        realWorld: [
          'Grafana Loki + Promtail Docker setup: Promtail tails container log files and ships them to Loki with labels (container name, compose project), then Grafana queries Loki using LogQL: "{container=~\"jellyfin.*\"} |= \"error\""',
          'Alertmanager routing: critical alerts (service down) go to Telegram immediately, warning alerts (high CPU for 10 minutes) go to email digest, and info alerts (successful backup) are logged but not notified — this prevents alert fatigue while ensuring important events are not missed',
          'Graylog is an alternative to the Loki stack that provides a dedicated log management UI with parsing, enrichment, and alerting built in — it is heavier than Loki but provides a more complete out-of-the-box log management experience',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Security Hardening',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Securing self-hosted infrastructure requires a defense-in-depth approach covering SSH access, intrusion prevention, container isolation, and automated update management to minimize the attack surface.',
    concepts: [
      {
        id: '12-1',
        name: 'SSH Hardening & Key Management',
        description:
          'SSH is the primary remote access method for Linux servers, and hardening it against unauthorized access is the single most important security measure for any self-hosted infrastructure.',
        keyPoints: [
          'Disable password authentication and require SSH key pairs — in /etc/ssh/sshd_config set "PasswordAuthentication no", "PubkeyAuthentication yes", and "PermitRootLogin no" to eliminate brute-force attack vectors entirely',
          'Ed25519 keys are the current recommendation: "ssh-keygen -t ed25519 -C \"homelab\"" generates a key pair with 128-bit security, shorter key strings, and faster operations compared to RSA',
          'Change the default SSH port from 22 to a non-standard port (e.g., 2222) — this does not improve security against targeted attacks but eliminates 99% of automated bot scanning noise from your auth logs',
          'SSH agent forwarding and ProxyJump enable accessing internal servers through a bastion/jump host — "ssh -J bastion.domain.com internal-server" without exposing internal servers directly to the internet',
          'Configure SSH connection timeouts and limits: "ClientAliveInterval 300", "ClientAliveCountMax 2", "MaxAuthTries 3", and "MaxSessions 5" to limit resource consumption and reduce the window for brute-force attempts',
        ],
        tradeoffs: [
          'SSH key-only authentication is more secure but requires distributing and managing keys across all devices — losing access to your private key without a backup means being locked out of your own servers',
          'Non-standard SSH ports reduce log noise but complicate SSH connections from new devices — document the port in your wiki and configure SSH configs (~/.ssh/config) on all client machines',
          'Hardware security keys (YubiKey, SoloKey) for SSH provide the strongest authentication but add $25-50 per key cost and require physical presence — a passphrase-protected Ed25519 key is a pragmatic middle ground',
        ],
        realWorld: [
          'A hardened sshd_config template: "Port 2222\\nPermitRootLogin no\\nPasswordAuthentication no\\nPubkeyAuthentication yes\\nMaxAuthTries 3\\nX11Forwarding no\\nAllowUsers homelab\\nClientAliveInterval 300\\nClientAliveCountMax 2"',
          'The ~/.ssh/config file simplifies connections: "Host homelab\\n  Hostname server.domain.com\\n  Port 2222\\n  User homelab\\n  IdentityFile ~/.ssh/id_ed25519" allows connecting with just "ssh homelab" instead of typing the full command',
          'Teleport and Boundary are modern SSH access management tools that provide session recording, RBAC, and certificate-based authentication — overkill for most homelabs but valuable for teams or professional environments',
        ],
      },
      {
        id: '12-2',
        name: 'fail2ban & Intrusion Prevention',
        description:
          'Intrusion prevention systems automatically detect and block malicious activity by monitoring logs for patterns like failed login attempts, scanning behavior, and exploit attempts, then dynamically updating firewall rules to ban offending IPs.',
        keyPoints: [
          'fail2ban monitors log files for patterns matching failed authentication attempts and automatically creates firewall rules (iptables/nftables) to ban the offending IP address for a configurable duration',
          'Default jails protect SSH ("sshd" jail) but custom jails can protect any log-producing service — create jails for Nginx (401/403 errors), Nextcloud (failed logins), Vaultwarden (failed authentication), and any exposed service',
          'Configuration example: "bantime = 1h, findtime = 10m, maxretry = 5" means 5 failed attempts within 10 minutes triggers a 1-hour ban — for SSH, consider "bantime = 24h, maxretry = 3" for stricter protection',
          'CrowdSec is a modern, community-driven alternative to fail2ban — it shares threat intelligence across all CrowdSec installations, so an IP that attacks one CrowdSec user is preemptively blocked for all others in the network',
          'GeoIP blocking restricts access to specific countries — if you only access your services from the US, blocking all non-US IPs at the firewall level eliminates the vast majority of scanning and brute-force attempts',
        ],
        tradeoffs: [
          'Overly aggressive fail2ban rules can lock you out of your own server — always whitelist your known IPs ("ignoreip = 127.0.0.1/8 192.168.1.0/24 YOUR_STATIC_IP") and keep a backup access method (console, IPMI, or VPS jump host)',
          'fail2ban is reactive (bans after attacks are detected) while CrowdSec is proactive (pre-bans known malicious IPs) — CrowdSec provides better protection but depends on a community blocklist that could theoretically include false positives',
          'Intrusion prevention at the application level (fail2ban) complements but does not replace network-level security (firewalls, VLANs) — defense in depth requires both layers',
        ],
        realWorld: [
          'fail2ban Nginx jail configuration: "[nginx-http-auth]\\nenabled = true\\nport = http,https\\nfilter = nginx-http-auth\\nlogpath = /var/log/nginx/error.log\\nmaxretry = 3\\nbantime = 3600" — protects reverse-proxied services from brute-force attacks',
          'CrowdSec Docker deployment with bouncer: install CrowdSec to parse logs and detect attacks, then install the firewall bouncer to enforce bans — the community blocklist blocks 100,000+ known malicious IPs from day one',
          'A comprehensive intrusion prevention stack: CrowdSec for proactive IP reputation blocking, fail2ban for application-specific log monitoring, and Suricata (IDS/IPS) on OPNsense for network-level packet inspection',
        ],
      },
      {
        id: '12-3',
        name: 'Container Security & Updates',
        description:
          'Securing Docker containers requires attention to image provenance, runtime configuration, privilege minimization, and a disciplined update process to ensure vulnerabilities in container images are patched promptly.',
        keyPoints: [
          'Run containers as non-root users whenever possible — the "user: 1000:1000" directive in Docker Compose or the USER instruction in Dockerfiles prevents container escapes from gaining root access on the host',
          'Minimize container capabilities: "security_opt: [no-new-privileges:true]" and dropping all capabilities with "cap_drop: [ALL]" then adding only needed ones ("cap_add: [NET_BIND_SERVICE]") follows the principle of least privilege',
          'Docker socket access (/var/run/docker.sock) grants full root control over the host — containers that require it (Portainer, Watchtower, Traefik) should use a socket proxy like Tecnativa/docker-socket-proxy with limited API access',
          'Trivy and Docker Scout scan container images for known vulnerabilities (CVEs) — run "trivy image jellyfin/jellyfin:latest" to identify vulnerable packages before deploying, and integrate scanning into your update workflow',
          'Read-only root filesystem ("read_only: true" in Compose) prevents containers from writing outside their designated volumes — combine with "tmpfs: [/tmp, /run]" for directories that need write access',
        ],
        tradeoffs: [
          'Strict security configurations (non-root, read-only, dropped capabilities) break some applications that expect write access, root privileges, or specific capabilities — testing each service\'s security configuration individually is necessary',
          'Automatic updates (Watchtower) trade security patching speed for stability risk — manual updates are safer but delayed patching leaves known vulnerabilities exploitable; a balanced approach uses automatic updates for non-critical services and manual for critical ones',
          'The Docker socket proxy reduces attack surface but adds another container to manage and may not support all API calls needed by management tools — test thoroughly before deploying in production',
        ],
        realWorld: [
          'Docker Compose security hardening template: "security_opt:\\n  - no-new-privileges:true\\ncap_drop:\\n  - ALL\\nread_only: true\\ntmpfs:\\n  - /tmp\\n  - /run\\nuser: \\"1000:1000\\"" — apply these defaults to every container, relaxing only where necessary',
          'Renovate Bot or Dependabot can monitor your Docker Compose files in a Git repository and automatically create pull requests when new image versions are available — combining GitOps with automated vulnerability detection',
          'The Docker Bench for Security script ("docker run --rm -v /var/run/docker.sock:/var/run/docker.sock docker/docker-bench-security") audits your Docker daemon and container configurations against CIS benchmarks, identifying security improvements',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Automation & Infrastructure as Code',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Treating your homelab configuration as code enables reproducible deployments, version-controlled changes, and automated maintenance that transforms a fragile, manually-configured server into a resilient, self-documenting infrastructure.',
    concepts: [
      {
        id: '13-1',
        name: 'Ansible for Homelab',
        description:
          'Ansible is an agentless automation tool that configures servers, deploys services, and manages infrastructure using declarative YAML playbooks, enabling you to rebuild your entire homelab from scratch with a single command.',
        keyPoints: [
          'Ansible connects to servers via SSH and executes tasks defined in playbooks — no agent software needs to be installed on managed hosts, making it ideal for managing a few homelab servers without additional overhead',
          'Playbooks are declarative YAML files: "- name: Install Docker\\n  apt:\\n    name: docker.io\\n    state: present" ensures Docker is installed — Ansible is idempotent, meaning running the same playbook twice produces the same result without side effects',
          'Ansible Roles organize related tasks, variables, templates, and files into reusable components — roles like "geerlingguy.docker" (install Docker), "geerlingguy.security" (SSH hardening), and custom roles for your services create a modular infrastructure definition',
          'Ansible Vault encrypts sensitive variables (passwords, API keys) within playbooks: "ansible-vault encrypt_string \'supersecret\' --name \'db_password\'" stores secrets safely in version control without exposing them in plaintext',
          'The inventory file defines your infrastructure: groups of hosts with their variables — "[servers]\\nhomelab ansible_host=192.168.1.100 ansible_user=admin" maps your physical infrastructure to Ansible\'s management model',
        ],
        tradeoffs: [
          'Ansible has a moderate learning curve — YAML syntax, Jinja2 templating, variable precedence rules, and the module ecosystem require dedicated learning time before achieving productivity',
          'Ansible manages configuration state but does not continuously enforce it — if someone manually changes a setting, Ansible does not detect or revert it until the next playbook run (unlike Puppet or Chef which run continuously)',
          'For a single-server homelab, Ansible may be over-engineering the solution — a well-documented Docker Compose setup with a backup script can be simpler and equally effective until you manage multiple hosts',
        ],
        realWorld: [
          'The "ansible-nas" project (github.com/davestephens/ansible-nas) provides a complete Ansible playbook for deploying a NAS and homelab stack — it includes roles for Docker, Traefik, Nextcloud, Plex, and dozens of other services',
          'A practical homelab Ansible workflow: maintain a Git repository with playbooks, run "ansible-playbook site.yml" to deploy, and use "ansible-playbook site.yml --tags docker" to update only Docker-related configuration',
          'Semaphore is a self-hosted Ansible UI and task runner — it provides a web interface for running playbooks, managing inventories, and viewing execution history, making Ansible more accessible without requiring CLI expertise',
        ],
      },
      {
        id: '13-2',
        name: 'GitOps & Version-Controlled Configs',
        description:
          'GitOps applies software development practices to infrastructure management: all configuration is stored in Git, changes are made via commits, and the running infrastructure is automatically synchronized with the repository state.',
        keyPoints: [
          'Store all Docker Compose files, environment variables (encrypted), reverse proxy configs, and automation scripts in a Git repository — this creates a complete, version-controlled definition of your entire homelab that can rebuild it from scratch',
          'Every change to your infrastructure goes through Git: edit the compose file, commit with a descriptive message, push, and deploy — the Git history becomes an audit log of every configuration change with the ability to revert any change',
          'Directory structure convention: "docker-compose/service-name/docker-compose.yml" and "docker-compose/service-name/.env" for each service — group related services (monitoring stack, media stack) in subdirectories',
          'Sensitive data (API keys, passwords) should NEVER be committed in plaintext — use git-crypt, SOPS (Mozilla), or Ansible Vault to encrypt secrets before committing, or use a separate secret management tool like Vault (HashiCorp)',
          'Pre-commit hooks can validate Docker Compose files ("docker compose config"), lint YAML, and check for accidentally committed secrets before they enter the repository',
        ],
        tradeoffs: [
          'GitOps adds overhead for small changes — editing a single environment variable requires a commit-push-deploy cycle instead of a quick SSH edit, which feels heavy for simple tweaks',
          'Storing secrets in Git (even encrypted) requires careful key management — if the encryption key is compromised, the entire Git history of secrets is exposed; consider whether a separate secret manager is more appropriate',
          'Full GitOps with automatic deployment (push triggers deploy) requires a CI/CD pipeline that adds complexity — a simpler "Git as documentation + manual deploy" approach provides most of the benefits with less infrastructure',
        ],
        realWorld: [
          'A common homelab GitOps repository structure: "/compose/" (Docker Compose files), "/ansible/" (Ansible playbooks), "/scripts/" (maintenance scripts), "/docs/" (network diagrams, runbooks), with a Makefile providing "make deploy", "make backup", "make update" commands',
          'Gitea or Forgejo self-hosted Git provides a private GitHub-like experience for your homelab configuration repository — it runs in a single container, requires minimal resources, and keeps your infrastructure definition off third-party platforms',
          'The "IaC is the documentation" philosophy: a well-organized Git repository with descriptive commit messages ("Add Immich photo server with GPU passthrough") and commented configuration files eliminates the need for separate documentation about what is deployed and why',
        ],
      },
      {
        id: '13-3',
        name: 'CI/CD for Self-Hosted Services',
        description:
          'Continuous Integration and Continuous Deployment pipelines automate the testing, building, and deployment of changes to your self-hosted infrastructure, bringing professional software delivery practices to your homelab.',
        keyPoints: [
          'Self-hosted CI/CD platforms (Gitea Actions, Drone CI, Woodpecker CI) run pipelines on your own infrastructure — when you push a change to your homelab config repository, the pipeline automatically validates and deploys it',
          'A minimal CI pipeline for a homelab: lint YAML files, validate Docker Compose configs ("docker compose config"), run Trivy security scans on images, and deploy changes via SSH or Ansible — catching errors before they reach production',
          'Gitea Actions is compatible with GitHub Actions workflow syntax — existing GitHub Actions workflows can be reused with minimal modifications, and the runner executes on your homelab hardware',
          'Webhook-based deployment: Gitea/Forgejo sends a webhook to a listener (adnanh/webhook) on your server when a push occurs, which triggers a deployment script — simpler than a full CI/CD platform for basic deploy-on-push workflows',
          'Renovate Bot (self-hostable) automatically monitors Docker Compose files for outdated image tags and creates pull requests with version bumps — combining dependency management with GitOps for a hands-off update workflow',
        ],
        tradeoffs: [
          'Self-hosted CI/CD adds significant infrastructure overhead (CI server, runners, container registry) — for a single-person homelab, a simple "git pull && docker compose up -d" deploy script may provide sufficient automation without the complexity',
          'CI/CD pipelines are another service that must be maintained, updated, and secured — a broken pipeline blocks deployments, making the CI system itself a critical dependency that needs monitoring and backups',
          'Automated deployment removes the human review step that catches misconfigurations — implement a staging/canary step or manual approval gate for critical services to prevent automated deployment of broken configurations',
        ],
        realWorld: [
          'Woodpecker CI is a lightweight, Docker-native CI/CD system that integrates with Gitea/Forgejo — a pipeline step: "steps:\\n  - name: deploy\\n    image: docker/compose\\n    commands:\\n      - docker compose pull\\n      - docker compose up -d" deploys on every push',
          'The "homelab as a software project" approach: a monorepo with all compose files, Ansible playbooks, and docs; Renovate creates PRs for image updates; CI validates changes; merging to main triggers deployment — professional practices at homelab scale',
          'Diun (Docker Image Update Notifier) monitors running containers for new image versions and sends notifications via Telegram/Discord/Matrix — a lightweight alternative to Renovate when you want to be informed about updates but deploy them manually',
        ],
      },
    ],
  },
];

export const chapters: Chapter[] = topics;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
