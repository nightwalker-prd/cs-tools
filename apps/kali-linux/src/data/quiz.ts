export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Kali Linux Setup & Environment
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What is the advantage of running Kali Linux as a live USB with persistence over a standard live boot?',
    options: [
      'It runs faster than an installed system',
      'Changes, saved files, and installed tools persist across reboots instead of being lost when the system shuts down',
      'It automatically encrypts all data on the USB',
      'It provides access to more tools than an installed version',
    ],
    answer: 1,
    explanation: 'A standard live boot runs entirely in RAM — all changes vanish on reboot. A persistence partition on the USB stores modifications (installed packages, config changes, saved files) that survive reboots. This combines the portability of a live USB with the convenience of a full installation. Use encrypted persistence (LUKS) for security.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'Which command updates the package list and upgrades all installed packages in Kali Linux?',
    options: [
      'apt install --upgrade',
      'apt update && apt full-upgrade',
      'apt-get refresh && apt-get upgrade-all',
      'dpkg --update-all',
    ],
    answer: 1,
    explanation: '`apt update` refreshes the package index from repositories (learns what\'s available). `apt full-upgrade` installs newer versions of all packages, and may remove packages if necessary to resolve dependencies (unlike `apt upgrade` which never removes). Run this regularly — Kali is a rolling release and tools are updated frequently.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What is the purpose of the `kali-tweaks` tool?',
    options: [
      'It overclocks the CPU for faster password cracking',
      'It provides a menu-driven interface to configure Kali settings like shell, repositories, network mirrors, metapackages, and virtualization defaults',
      'It automatically exploits vulnerabilities on the network',
      'It installs all available Kali tools at once',
    ],
    answer: 1,
    explanation: 'kali-tweaks is Kali\'s configuration utility for: switching shells (bash/zsh/fish), managing repositories (bleeding-edge vs stable), installing/removing tool metapackages (kali-tools-web, kali-tools-wireless, etc.), configuring virtualization settings, and adjusting network mirrors. It simplifies common setup tasks that would otherwise require manual file editing.',
  },

  // Chapter 2: Command-Line Essentials for Security
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What does the command `cat access.log | grep "POST" | awk \'{print $1}\' | sort | uniq -c | sort -rn | head -10` accomplish?',
    options: [
      'Deletes the top 10 POST requests from the log',
      'Finds the 10 IP addresses that made the most POST requests, sorted by frequency in descending order',
      'Displays the first 10 lines containing POST in the file',
      'Counts the total number of POST requests in the log',
    ],
    answer: 1,
    explanation: 'This pipeline: filters POST requests (grep), extracts the first field/IP address (awk), alphabetically sorts (sort), counts occurrences (uniq -c), sorts numerically in reverse (sort -rn), and takes the top 10 (head -10). This kind of log analysis pipeline is fundamental for security investigations — identifying top attackers, most-targeted endpoints, or anomalous patterns.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What is the difference between `>` and `>>` in bash output redirection?',
    options: [
      '> is for files and >> is for directories',
      '> overwrites the file with new content, while >> appends to the existing file content',
      '> redirects stdout and >> redirects stderr',
      'There is no difference — they are interchangeable',
    ],
    answer: 1,
    explanation: '`command > file` creates/overwrites the file with the command\'s output. `command >> file` appends output to the file without erasing existing content. Critical distinction during pentests: `nmap scan1 > results.txt` then `nmap scan2 >> results.txt` preserves both scans. Using > for the second would overwrite the first scan\'s results.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'Why is `grep -r "password" /var/www/ --include="*.php"` useful during a pentest?',
    options: [
      'It changes all passwords in PHP files',
      'It recursively searches all PHP files under /var/www/ for the string "password", helping find hardcoded credentials in web application source code',
      'It encrypts password fields in PHP files',
      'It lists all PHP files that require passwords',
    ],
    answer: 1,
    explanation: 'After gaining access to a web server, searching source code for hardcoded credentials is a standard post-exploitation step. `grep -r` searches recursively, `--include="*.php"` limits to PHP files. Common patterns to search for: "password", "passwd", "api_key", "secret", "token", "db_host", and database connection strings.',
  },

  // Chapter 3: Networking Fundamentals in Kali
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'What does `nc -lvnp 4444` set up on an attacker\'s machine?',
    options: [
      'A port scan on port 4444 of the target',
      'A listening netcat reverse shell handler on port 4444, waiting for an incoming connection',
      'An encrypted tunnel to port 4444',
      'A DNS lookup on port 4444',
    ],
    answer: 1,
    explanation: 'Flags: -l (listen mode), -v (verbose), -n (no DNS resolution), -p 4444 (port). This is the standard "catch a reverse shell" setup. The attacker runs this listener, then triggers a reverse shell payload on the target that connects back to this port. Once connected, the attacker gets an interactive shell on the target system.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What does proxychains do when prepended to a command like `proxychains nmap -sT target`?',
    options: [
      'It speeds up the nmap scan',
      'It routes the command\'s network traffic through a chain of proxy servers (SOCKS4/5, HTTP) to anonymize the source or pivot through compromised hosts',
      'It adds proxy authentication headers',
      'It converts the command to use IPv6',
    ],
    answer: 1,
    explanation: 'Proxychains intercepts TCP connections and routes them through configured proxies (defined in /etc/proxychains4.conf). Use cases: anonymizing scans through Tor (socks5 127.0.0.1 9050), pivoting through a compromised host\'s SOCKS proxy to reach internal networks, or chaining multiple proxies for deeper anonymity. Only works with TCP — use -sT with nmap, not SYN scans.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What is the purpose of `ssh -D 9050 -N user@pivot-host` in a penetration test?',
    options: [
      'It downloads files from the pivot host',
      'It creates a dynamic SOCKS proxy through the SSH connection, allowing you to route traffic through the pivot host to reach internal networks',
      'It deletes port 9050 on the remote host',
      'It runs a DNS server on port 9050',
    ],
    answer: 1,
    explanation: '-D 9050 creates a SOCKS proxy on local port 9050, -N means no remote command (just the tunnel). All traffic sent through this SOCKS proxy exits from the pivot host. Configure proxychains or browser to use socks5://127.0.0.1:9050, then scan/browse the internal network as if you were the pivot host. Essential for accessing segmented networks after initial compromise.',
  },

  // Chapter 4: Information Gathering & OSINT Tools
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'What type of information does theHarvester collect about a target domain?',
    options: [
      'Only the domain\'s IP address',
      'Email addresses, subdomains, IPs, and URLs gathered from public search engines, PGP servers, Shodan, and other OSINT sources',
      'The domain owner\'s personal phone number',
      'The content of all web pages on the domain',
    ],
    answer: 1,
    explanation: 'theHarvester queries multiple public sources (Google, Bing, LinkedIn, DNSDumpster, Shodan, VirusTotal, etc.) to enumerate: email addresses (for phishing/social engineering), subdomains (attack surface), IP ranges, and virtual hosts. Example: `theHarvester -d example.com -b all` queries all sources. This passive recon leaves no traces on the target.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the difference between passive and active reconnaissance?',
    options: [
      'Passive is slower, active is faster',
      'Passive gathers information without directly interacting with the target (OSINT, public records), while active directly probes the target (port scans, vulnerability scans) which may be detected',
      'Passive uses automated tools, active is manual',
      'There is no practical difference in penetration testing',
    ],
    answer: 1,
    explanation: 'Passive recon (WHOIS, Google dorking, certificate transparency, Shodan) leaves no footprint on the target — they can\'t detect it. Active recon (Nmap scans, web crawling, DNS zone transfers) sends packets to the target and may trigger IDS/IPS alerts or appear in logs. Pentests typically start passive (map the surface) then move to active (probe for vulnerabilities).',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'How does Recon-ng differ from running individual OSINT tools separately?',
    options: [
      'Recon-ng only works offline',
      'Recon-ng is a modular framework with a database backend that stores results, enabling different modules to build on each other\'s findings automatically',
      'Recon-ng replaces Nmap for scanning',
      'Recon-ng is a graphical tool while others are command-line',
    ],
    answer: 1,
    explanation: 'Recon-ng provides a Metasploit-like framework for OSINT: modules add data to a central database (hosts, contacts, credentials), and subsequent modules can query that data. Example: run a module to find subdomains → those populate the hosts table → run another module to resolve those hosts to IPs → run a third to check Shodan for open ports. This chained workflow is more efficient than running standalone tools.',
  },

  // Chapter 5: Nmap & Network Scanning
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What is the difference between an Nmap SYN scan (-sS) and a TCP connect scan (-sT)?',
    options: [
      'SYN scans are slower but more accurate',
      'SYN scans send a SYN and analyze the response without completing the TCP handshake (stealthier, requires root), while TCP connect scans complete the full 3-way handshake (noisier, works without root)',
      'TCP connect scans are stealthier than SYN scans',
      'SYN scans only work on Windows targets',
    ],
    answer: 1,
    explanation: 'SYN scan (-sS): sends SYN, receives SYN/ACK (open) or RST (closed), sends RST to abort — never completes the handshake, so many older logs don\'t record it. Requires root (raw socket access). TCP connect (-sT): uses the OS\'s connect() call for a full handshake — works without root but is logged by the target. SYN is Nmap\'s default when run as root.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What does `nmap -sV -sC -p- -T4 target` do?',
    options: [
      'Scans only the top 100 ports with no version detection',
      'Scans all 65535 TCP ports with service version detection and default NSE scripts at aggressive timing',
      'Performs a UDP-only scan of all ports',
      'Scans common ports with OS detection only',
    ],
    answer: 1,
    explanation: '-sV: probe open ports for service/version info. -sC: run default NSE scripts (equivalent to --script=default — checks for common vulns, grabs banners, enumerates shares). -p-: scan all 65535 TCP ports (not just the default 1000). -T4: aggressive timing (faster, but noisier). This is a comprehensive "initial enumeration" scan commonly used in CTFs and pentests.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'How can Nmap NSE scripts be used beyond basic port scanning?',
    options: [
      'NSE scripts can only detect open ports',
      'NSE scripts can detect vulnerabilities (vuln category), brute-force credentials, enumerate services (SMB shares, SNMP data), exploit specific CVEs, and perform discovery tasks',
      'NSE scripts are only for OS detection',
      'NSE scripts replace the need for Metasploit entirely',
    ],
    answer: 1,
    explanation: 'NSE (Nmap Scripting Engine) has 600+ scripts across categories: vuln (CVE checks like smb-vuln-ms17-010), auth (brute force), discovery (enum users, shares), exploit (some can get shells). Examples: `--script=http-enum` discovers web paths, `--script=smb-enum-shares` lists SMB shares, `--script=vulners` checks services against a vulnerability database. Targeted scripts save time over running full vulnerability scanners.',
  },

  // Chapter 6: Vulnerability Assessment
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is OpenVAS (GVM) and when would you use it over Nmap?',
    options: [
      'OpenVAS is faster than Nmap at port scanning',
      'OpenVAS is a full vulnerability scanner with a database of 50,000+ NVTs that tests for specific CVEs and misconfigurations — use it when you need comprehensive vulnerability assessment beyond port/service discovery',
      'OpenVAS replaces the need for manual testing',
      'OpenVAS only scans web applications',
    ],
    answer: 1,
    explanation: 'Nmap discovers hosts, ports, and services. OpenVAS/GVM goes further: it tests for specific vulnerabilities using Network Vulnerability Tests (NVTs), checks for missing patches, default credentials, SSL misconfigurations, and generates CVSS-scored reports. Use Nmap first to map the network, then OpenVAS for deep vulnerability assessment. OpenVAS is particularly valuable for compliance scanning.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What does Nikto scan for on a web server?',
    options: [
      'Only SQL injection vulnerabilities',
      'Dangerous files/CGIs, outdated server software, version-specific problems, server configuration issues, and over 6700 potentially dangerous files/programs',
      'Network-level vulnerabilities only',
      'Password strength on login forms',
    ],
    answer: 1,
    explanation: 'Nikto is a web server scanner (not a web app scanner like Burp). It checks for: outdated software versions, dangerous default files (/phpinfo.php, /server-status), misconfigured headers (missing X-Frame-Options, CORS issues), insecure HTTP methods (PUT, DELETE), directory indexing, and known vulnerable CGI scripts. Fast but noisy — it sends thousands of requests and makes no attempt to be stealthy.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'Why is false positive management critical in vulnerability scanning?',
    options: [
      'False positives make reports longer',
      'False positives waste limited pentest time on non-issues, erode client trust in findings, and can cause teams to ignore real vulnerabilities buried among noise',
      'False positives only occur with open-source tools',
      'False positives indicate the scanner is misconfigured',
    ],
    answer: 1,
    explanation: 'Automated scanners flag potential issues based on heuristics — many turn out to be false positives. A pentest report full of unverified scanner output loses credibility. Best practice: verify top findings manually (confirm the exploit works or the misconfiguration is real), mark confirmed vs suspected issues, tune scanner settings to reduce noise, and use multiple tools to cross-validate findings.',
  },

  // Chapter 7: Metasploit Framework
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'In Metasploit, what is the difference between a "staged" and "stageless" payload?',
    options: [
      'Staged payloads are larger than stageless',
      'A staged payload (e.g., windows/meterpreter/reverse_tcp) sends a small stager that downloads the full payload, while stageless (e.g., windows/meterpreter_reverse_tcp) sends the entire payload in one connection',
      'Stageless payloads require more network bandwidth',
      'Staged payloads only work with bind shells',
    ],
    answer: 1,
    explanation: 'Staged (/ in name): small initial stager (~300 bytes) connects back and downloads the full Meterpreter payload. Advantage: small initial payload fits in tight buffer overflow space. Stageless (_ in name): sends the entire payload at once. Advantage: single connection (better for unstable networks), but larger initial payload. IDS may catch the stage download in staged payloads.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What is Meterpreter and why is it preferred over a basic command shell?',
    options: [
      'Meterpreter is a simpler version of a command shell',
      'Meterpreter is an advanced, in-memory payload that provides file operations, pivoting, screenshot capture, keylogging, privilege escalation, and runs entirely in memory without touching disk',
      'Meterpreter only works on Linux targets',
      'Meterpreter is a standalone tool separate from Metasploit',
    ],
    answer: 1,
    explanation: 'Meterpreter runs in the exploited process\'s memory (no file on disk = harder to detect). Features: hashdump (extract password hashes), getsystem (privilege escalation), portfwd (pivoting), upload/download files, screenshot, keyscan, migrate (move to another process), and extensible with post modules. A basic shell only provides command execution — Meterpreter is a full post-exploitation platform.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What does MSFvenom do and how is it used in penetration testing?',
    options: [
      'It scans for Metasploit-compatible vulnerabilities',
      'It generates custom payloads (reverse shells, bind shells, Meterpreter) in various formats (exe, elf, python, powershell, war, php) with optional encoding to bypass basic AV detection',
      'It updates the Metasploit exploit database',
      'It decrypts captured network traffic',
    ],
    answer: 1,
    explanation: 'MSFvenom (combines old msfpayload + msfencode) generates standalone payloads for delivery outside Metasploit. Example: `msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f exe -o shell.exe` creates a Windows executable. Output formats include exe, elf, raw, python, powershell, war, php, asp, and more. Encoding (-e) and iterations (-i) can evade basic signature detection.',
  },

  // Chapter 8: Web Application Testing
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'In Burp Suite, what is the primary function of the Proxy/Intercept feature?',
    options: [
      'It blocks malicious traffic from reaching your machine',
      'It intercepts and allows modification of HTTP/HTTPS requests and responses between your browser and the target web application in real-time',
      'It caches web pages for offline viewing',
      'It automatically exploits web vulnerabilities',
    ],
    answer: 1,
    explanation: 'Burp\'s proxy sits between your browser and the target, capturing every request/response. With Intercept on, you can pause, examine, and modify requests before they reach the server — changing parameters, cookies, headers, or POST data. This lets you test for injection, authentication bypass, IDOR, and other web vulnerabilities by manually crafting malicious input.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What does `sqlmap -u "http://target/page?id=1" --dbs` attempt to do?',
    options: [
      'It creates a new database on the target server',
      'It tests the "id" parameter for SQL injection vulnerabilities and, if successful, enumerates all database names on the server',
      'It downloads the entire website for offline analysis',
      'It scans for open database ports on the target',
    ],
    answer: 1,
    explanation: 'SQLMap automates SQL injection detection and exploitation. It tests the id parameter with various injection techniques (UNION, boolean blind, time blind, error-based, stacked queries). --dbs tells it to enumerate database names if injection succeeds. Further flags: --tables (list tables), --dump (extract data), --os-shell (get OS command execution). Always get authorization before using SQLMap.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What is the purpose of directory/content discovery tools like gobuster and ffuf?',
    options: [
      'They create directories on the target server',
      'They brute-force URLs to find hidden files, directories, subdomains, and virtual hosts that aren\'t linked from the main application but may expose sensitive content or admin panels',
      'They only check if the web server is online',
      'They map the visual layout of a website',
    ],
    answer: 1,
    explanation: 'Web apps often have unlisted paths: /admin, /backup, /api/v1/debug, /.git, /wp-config.php.bak. Tools like gobuster (`gobuster dir -u http://target -w /usr/share/wordlists/dirb/common.txt`) and ffuf send thousands of requests using wordlists to find these hidden resources. Findings often reveal admin panels, backup files, API endpoints, and misconfigurations that expand the attack surface.',
  },

  // Chapter 9: Password Attacks
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What is the key difference between John the Ripper and Hashcat for offline password cracking?',
    options: [
      'John only cracks Linux passwords and Hashcat only cracks Windows passwords',
      'John is CPU-based by default and excels at varied hash formats, while Hashcat leverages GPU acceleration for dramatically faster cracking speeds on supported hash types',
      'Hashcat can only do dictionary attacks',
      'They produce different results for the same hash',
    ],
    answer: 1,
    explanation: 'John the Ripper: CPU-focused (GPU support added later), auto-detects hash formats, great for mixed hash files, built-in mangling rules. Hashcat: GPU-first design, orders of magnitude faster for supported hashes (bcrypt, NTLM, WPA), supports advanced attack modes (masks, rules, combinator, hybrid). In practice, many testers use both: John for quick auto-detection and Hashcat when they need GPU power for large hash lists.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What does Hydra do that John the Ripper and Hashcat cannot?',
    options: [
      'Hydra cracks hashes faster on GPUs',
      'Hydra performs online brute-force attacks against live network services (SSH, FTP, HTTP, RDP, SMB) while John/Hashcat only crack offline hash files',
      'Hydra supports more hash algorithms',
      'Hydra can decrypt encrypted files',
    ],
    answer: 1,
    explanation: 'John and Hashcat work on captured hash files (offline). Hydra attacks live services by trying username/password combinations over the network: `hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://target`. It supports 50+ protocols: SSH, FTP, HTTP-POST-FORM, RDP, SMB, MySQL, etc. Trade-off: online attacks are much slower (network latency, account lockouts) but sometimes you can\'t get the hashes offline.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'Why is the rockyou.txt wordlist so commonly used in password attacks?',
    options: [
      'It was created by security researchers as a synthetic test list',
      'It contains 14+ million real passwords from the 2009 RockYou breach, representing actual human password choices — making it highly effective against accounts using common passwords',
      'It is the largest wordlist available on Kali',
      'It only contains dictionary words and is simple to use',
    ],
    answer: 1,
    explanation: 'The RockYou breach (2009) exposed ~32 million plaintext passwords stored insecurely. The resulting wordlist (compressed at /usr/share/wordlists/rockyou.txt.gz in Kali) reflects real human password patterns: "123456", "password", names+numbers, keyboard walks. It\'s the de facto standard starting wordlist. For stronger passwords, tools like CeWL (custom wordlists from websites) and crunch (pattern-based generation) create targeted lists.',
  },

  // Chapter 10: Wireless & Network Attacks
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What must you do before capturing wireless traffic with Aircrack-ng?',
    options: [
      'Connect to the target WiFi network first',
      'Put the wireless adapter into monitor mode using airmon-ng, enabling it to capture all wireless frames in the area — not just traffic to/from your device',
      'Disable the firewall on your machine',
      'Install a special antenna driver',
    ],
    answer: 1,
    explanation: 'Normal (managed) mode only captures traffic addressed to your device. Monitor mode (via `airmon-ng start wlan0`) configures the adapter to capture ALL wireless frames — probe requests, beacons, authentication frames, data frames from any network. This is prerequisite for: network discovery (airodump-ng), handshake capture, deauthentication attacks, and packet injection.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'In WPA2 cracking, why is capturing a 4-way handshake necessary?',
    options: [
      'The handshake contains the WiFi password in plaintext',
      'The handshake contains enough cryptographic material to verify password guesses offline — without it, you cannot test passwords against the network',
      'The handshake disables encryption on the network',
      'The handshake is only needed for WEP, not WPA2',
    ],
    answer: 1,
    explanation: 'The WPA2 4-way handshake exchanges nonces and a MIC (Message Integrity Code) derived from the Pre-Shared Key. With a captured handshake (via airodump-ng + deauth attack), you can test candidate passwords offline: hash each guess with the SSID, compute the expected MIC, and compare. `aircrack-ng capture.cap -w rockyou.txt` or `hashcat -m 22000` does this. No handshake = no offline cracking.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is an "Evil Twin" attack in wireless security?',
    options: [
      'Using two network adapters simultaneously',
      'Creating a rogue access point with the same SSID and stronger signal as a legitimate network, tricking clients into connecting to the attacker\'s AP where traffic can be intercepted',
      'Connecting to a network with two devices at once',
      'Splitting a WiFi signal into two frequencies',
    ],
    answer: 1,
    explanation: 'The attacker creates a fake AP mimicking a legitimate network (same SSID, optionally same BSSID). With higher signal strength or by deauthing clients from the real AP, victims connect to the evil twin. The attacker can then: capture credentials via a fake captive portal, intercept all traffic (MITM), inject malicious content, or harvest WPA credentials. Tools: hostapd-wpe, Fluxion, or Bettercap.',
  },

  // Chapter 11: Social Engineering & Client-Side Attacks
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What is the Social Engineering Toolkit (SET) primarily used for?',
    options: [
      'Scanning social media profiles for OSINT',
      'Automating social engineering attacks: spear-phishing, website cloning for credential harvesting, infectious media generation, and mass mailer attacks',
      'Managing social media accounts',
      'Training employees on social engineering awareness',
    ],
    answer: 1,
    explanation: 'SET (by TrustedSec) automates attack vectors: (1) Spear-Phishing: craft emails with malicious attachments, (2) Website Attack: clone a login page to harvest credentials, (3) Infectious Media: generate autorun payloads for USB, (4) Mass Mailer: phishing campaigns. In authorized pentests, SET\'s credential harvester (`set > 1 > 2 > 3 > clone URL`) quickly creates convincing phishing pages.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'How does a Rubber Ducky (HID attack) bypass traditional endpoint security?',
    options: [
      'It encrypts its payload to avoid detection',
      'It registers as a trusted Human Interface Device (keyboard), so the OS and antivirus don\'t block its keystrokes — it types pre-programmed commands faster than any human could',
      'It exploits a zero-day in USB drivers',
      'It disables the antivirus before executing its payload',
    ],
    answer: 1,
    explanation: 'A USB Rubber Ducky identifies as a keyboard (HID) — not a storage device. Since keyboards are inherently trusted (you can\'t block keyboard input without breaking usability), the device injects keystrokes at ~1000 characters/second. Payloads (DuckyScript) can: open PowerShell, download malware, exfiltrate data, create backdoor users — all in seconds. Defenses: USB device whitelisting, GPO restrictions.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'In a phishing assessment, why is a convincing pretext more important than the technical payload?',
    options: [
      'Pretexts are required by law for phishing tests',
      'A believable scenario (urgent invoice, password reset, IT support request) determines whether the target clicks — the most sophisticated payload is useless if no one opens it',
      'Pretexts bypass email spam filters',
      'Technical payloads don\'t work in modern browsers',
    ],
    answer: 1,
    explanation: 'Social engineering succeeds through psychological manipulation, not technical exploits. A well-crafted pretext (urgency, authority, familiarity) exploiting human psychology gets clicks: "Your account will be locked in 2 hours" or "CEO requests wire transfer." The technical payload (credential harvester, macro document) only matters after the human factor succeeds. Effective phishing assessments test the human, not just the email gateway.',
  },

  // Chapter 12: Post-Exploitation & Pivoting
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What do LinPEAS and WinPEAS automate in post-exploitation?',
    options: [
      'Network scanning from the compromised host',
      'Privilege escalation enumeration — they systematically check for misconfigurations, weak permissions, stored credentials, vulnerable services, and kernel exploits that could allow escalation to root/SYSTEM',
      'Deleting forensic evidence',
      'Installing persistence mechanisms',
    ],
    answer: 1,
    explanation: 'PEAS (Privilege Escalation Awesome Scripts) automate what would take hours manually: SUID binaries, writable /etc/passwd, sudo misconfigurations (GTFOBins), cron jobs with weak permissions, kernel version vs known exploits, stored passwords in config files, service account tokens, and much more. Color-coded output highlights high-probability escalation paths. Run immediately after gaining initial access.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is "pivoting" in the context of a penetration test?',
    options: [
      'Changing your attack methodology',
      'Using a compromised host as a relay to access other networks or systems that are not directly reachable from the attacker\'s machine',
      'Rotating between different user accounts',
      'Moving from one vulnerability scanner to another',
    ],
    answer: 1,
    explanation: 'After compromising a host on the DMZ, internal networks (192.168.x.x, 10.x.x.x) may be unreachable from the attacker\'s machine but accessible from the compromised host. Pivoting routes attack traffic through the compromised host: SSH tunnels (-L/-D), Metasploit route/autoroute, Chisel (HTTP tunnels), or Ligolo-ng (TUN interface). This "island hopping" is how attackers reach high-value internal targets.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'Why is maintaining persistence a standard phase in penetration testing?',
    options: [
      'Persistence makes the report longer and more impressive',
      'It demonstrates that an attacker who gains access can maintain it through reboots and detection attempts, proving the full impact of the compromise to the client',
      'Persistence is only used in malicious attacks, not pentests',
      'It ensures the pentester doesn\'t lose access during lunch break',
    ],
    answer: 1,
    explanation: 'Persistence (SSH keys, cron jobs, scheduled tasks, web shells, registry run keys, new user accounts) demonstrates realistic attack impact: "an attacker wouldn\'t just get in once — they\'d ensure continued access." This finding motivates the client to implement monitoring, integrity checking, and incident response. In pentests, always document and remove all persistence mechanisms at the end of the engagement.',
  },

  // Chapter 13: Reporting & Methodology
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'Why is following a structured methodology like PTES important in penetration testing?',
    options: [
      'It makes the test take longer, billing more hours',
      'It ensures comprehensive, repeatable coverage — no critical phases are skipped, findings are consistent across testers, and the engagement is defensible as thorough and professional',
      'PTES is required by law for all pentests',
      'It replaces the need for technical skills',
    ],
    answer: 1,
    explanation: 'PTES (Penetration Testing Execution Standard) defines phases: pre-engagement, intelligence gathering, threat modeling, vulnerability analysis, exploitation, post-exploitation, and reporting. Following methodology ensures: no gaps in coverage (you don\'t skip post-exploitation), consistency (different testers produce similar results), professionalism (clients trust structured approaches), and defensibility (you can prove due diligence).',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What elements should a professional penetration test report include?',
    options: [
      'Only a list of IP addresses and open ports',
      'An executive summary, methodology description, findings with risk ratings (CVSS), proof-of-concept evidence (screenshots, commands), remediation recommendations, and a technical appendix',
      'Just the Nmap and vulnerability scan output',
      'A single-page summary with pass/fail status',
    ],
    answer: 1,
    explanation: 'A professional report serves multiple audiences: the executive summary (business impact, risk level) for leadership, detailed findings (description, impact, CVSS score, reproduction steps, screenshots) for technical teams, prioritized remediation guidance for operations, and methodology/scope documentation for compliance. The report IS the deliverable — without a quality report, even an excellent test has no lasting value.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is "responsible disclosure" and how does it differ from "full disclosure"?',
    options: [
      'They are different names for the same process',
      'Responsible disclosure privately notifies the vendor and allows time to patch before public release, while full disclosure immediately publishes vulnerability details publicly',
      'Responsible disclosure only applies to government agencies',
      'Full disclosure is always illegal while responsible disclosure is not',
    ],
    answer: 1,
    explanation: 'Responsible disclosure (coordinated disclosure): report to vendor privately → give them 90 days (typically) to patch → then publish. This protects users while motivating vendors to fix issues. Full disclosure: publish immediately with no vendor notice — arguments for: vendors only patch under pressure, users deserve to know risks. Most bug bounty programs and security researchers follow responsible disclosure, with public disclosure as a last resort.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
