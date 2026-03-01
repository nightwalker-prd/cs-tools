export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Forensic Principles & Legal Framework
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What is the primary purpose of maintaining a chain of custody in digital forensics?',
    options: [
      'To speed up the investigation process',
      'To document every person who handled evidence and every action taken, ensuring admissibility in court',
      'To encrypt evidence so unauthorized parties cannot access it',
      'To create backup copies of all digital evidence',
    ],
    answer: 1,
    explanation: 'Chain of custody documents who handled evidence, when, what actions were taken, and how it was stored. Any gap or irregularity can cause evidence to be deemed inadmissible. Courts require an unbroken chain to trust that evidence has not been tampered with.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'Under the Daubert standard, what must expert testimony (including forensic analysis) demonstrate to be admissible?',
    options: [
      'That the expert has at least 10 years of experience',
      'That the methodology is testable, peer-reviewed, has known error rates, and is generally accepted',
      'That the analysis was performed using government-approved tools only',
      'That the evidence was collected within 24 hours of the incident',
    ],
    answer: 1,
    explanation: 'The Daubert standard (Daubert v. Merrell Dow, 1993) requires that expert testimony be based on sufficient facts, reliable principles/methods, and that those methods were reliably applied. The four factors are: testability, peer review, known error rate, and general acceptance.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What does "forensic soundness" mean in the context of digital evidence?',
    options: [
      'The evidence was collected using the most expensive tools available',
      'The original evidence was not altered during collection, preservation, or analysis',
      'The evidence was stored in a fireproof safe',
      'Multiple copies of the evidence were distributed to all investigators',
    ],
    answer: 1,
    explanation: 'Forensic soundness means the evidence remains unaltered from its original state throughout the entire forensic process. This is verified through cryptographic hashing — the hash of the original must match the hash of the working copy at every stage.',
  },

  // Chapter 2: Evidence Acquisition & Imaging
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What is the primary function of a hardware write blocker during forensic imaging?',
    options: [
      'To speed up the imaging process',
      'To prevent any write operations from reaching the source drive, preserving its integrity',
      'To encrypt the forensic image during creation',
      'To compress the data being imaged',
    ],
    answer: 1,
    explanation: 'A hardware write blocker intercepts write commands between the forensic workstation and the evidence drive, ensuring the original media remains unmodified. This is critical for maintaining forensic soundness — even mounting a drive without a write blocker can alter metadata.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What advantage does the E01 (EnCase Evidence File) format have over a raw dd image?',
    options: [
      'E01 is faster to create',
      'E01 supports built-in compression, metadata storage, and CRC integrity checks per data block',
      'E01 can image encrypted drives without the key',
      'E01 produces smaller files without any compression',
    ],
    answer: 1,
    explanation: 'E01 format stores case metadata (examiner, notes, timestamps), compresses data segments, and includes CRC checksums for each data block plus an overall MD5 hash. Raw dd images are just bit-for-bit copies with no built-in metadata or integrity verification.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'Why are both MD5 and SHA-256 hashes typically computed during forensic imaging?',
    options: [
      'Because courts only accept dual-hash verification',
      'MD5 is faster for quick checks while SHA-256 provides stronger collision resistance for evidence integrity',
      'One hash is for the prosecution and one for the defense',
      'MD5 works on Windows and SHA-256 works on Linux',
    ],
    answer: 1,
    explanation: 'MD5 is fast and widely used historically, but has known collision vulnerabilities. SHA-256 is cryptographically stronger. Using both provides backwards compatibility with older case databases while ensuring robust integrity verification. If hashes match, the image is a verified exact copy.',
  },

  // Chapter 3: File Systems & Data Recovery
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'In NTFS, what is the Master File Table (MFT) and why is it critical for forensics?',
    options: [
      'A backup of all files stored redundantly on the drive',
      'A database containing metadata records for every file and directory, including timestamps, permissions, and data locations',
      'An encryption key storage area for BitLocker',
      'A log of all user login attempts',
    ],
    answer: 1,
    explanation: 'The MFT is a relational database where each file/directory has at least one record containing: $STANDARD_INFORMATION (timestamps, permissions), $FILE_NAME (name, parent directory), and $DATA (file content or data run pointers). Small files (<~700 bytes) are stored entirely within the MFT record itself (resident data).',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is "file slack space" and why do forensic investigators examine it?',
    options: [
      'Unused space within a file that the user intentionally left empty',
      'The gap between a file\'s logical end and the end of its allocated cluster, which may contain remnants of previously deleted data',
      'Space reserved by the operating system for temporary files',
      'The difference between compressed and uncompressed file sizes',
    ],
    answer: 1,
    explanation: 'When a file doesn\'t fill its final cluster, the remaining bytes (slack space) may contain data from whatever previously occupied those sectors. RAM slack (between EOF and sector boundary) may contain memory contents, while drive slack (remaining sectors in the cluster) may contain fragments of deleted files.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'How does file carving recover deleted files without file system metadata?',
    options: [
      'By reading the recycle bin database',
      'By scanning raw disk data for known file signatures (headers/footers) and reconstructing files based on their structure',
      'By reversing the deletion command in the file system journal',
      'By contacting the operating system\'s backup service',
    ],
    answer: 1,
    explanation: 'File carving (tools like Scalpel, PhotoRec) scans unallocated space byte-by-byte looking for known file signatures — e.g., JPEG files start with FF D8 FF, PDFs with %PDF. It reconstructs files based on headers, footers, and internal structure, independent of any file system metadata.',
  },

  // Chapter 4: Windows Forensics
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'Which Windows registry hive contains user-specific artifacts like recent documents, typed URLs, and Run dialog history?',
    options: [
      'SYSTEM',
      'SOFTWARE',
      'NTUSER.DAT',
      'SAM',
    ],
    answer: 2,
    explanation: 'NTUSER.DAT is loaded per-user and contains their personal settings: RecentDocs, TypedPaths, TypedURLs, RunMRU, UserAssist (program execution tracking), and more. SAM stores password hashes, SYSTEM stores hardware/service configs, and SOFTWARE stores machine-wide application settings.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What forensic information does Windows Prefetch provide?',
    options: [
      'A list of all installed applications',
      'Evidence of program execution including run count, last execution times, and files/directories referenced during the first 10 seconds',
      'Real-time memory usage of running processes',
      'Network connections made by each application',
    ],
    answer: 1,
    explanation: 'Prefetch files (.pf in C:\\Windows\\Prefetch) are created when executables run. Each records the executable name, up to 8 last run times (Win10+), run count, and files/directories accessed in the first 10 seconds. This is powerful evidence of program execution even after the program is uninstalled.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'Why does NTFS store two sets of timestamps ($STANDARD_INFORMATION and $FILE_NAME) and how does this help forensics?',
    options: [
      'One is for display and one is for sorting files',
      '$STANDARD_INFORMATION can be modified by user-level APIs (enabling timestomping) while $FILE_NAME timestamps are only modified by the kernel, revealing tampering',
      'One set uses UTC and the other uses local time',
      'The second set is only for directories, not files',
    ],
    answer: 1,
    explanation: '$STANDARD_INFORMATION (SI) timestamps can be modified by user-mode APIs like SetFileTime() — attackers use this for timestomping. $FILE_NAME (FN) timestamps are updated only by the NTFS driver (kernel mode) and cannot be easily manipulated. Comparing SI and FN timestamps reveals timestomping attempts.',
  },

  // Chapter 5: Linux & macOS Forensics
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'On a Linux system, which log file records authentication events like SSH logins, sudo usage, and password failures?',
    options: [
      '/var/log/syslog',
      '/var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL/CentOS)',
      '/var/log/kern.log',
      '/var/log/boot.log',
    ],
    answer: 1,
    explanation: 'auth.log (Debian-based) or secure (RHEL-based) captures PAM authentication events: successful/failed logins, SSH connections, sudo commands, user account changes, and su attempts. This is often the first log examined during incident response to identify unauthorized access.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What are macOS FSEvents and why are they valuable for forensic investigations?',
    options: [
      'A firewall log showing blocked network connections',
      'A file system change journal that records every file/directory creation, modification, deletion, and rename with timestamps',
      'A record of application crashes and error reports',
      'A list of all iCloud sync operations',
    ],
    answer: 1,
    explanation: 'FSEvents (stored in .fseventsd at the volume root) log file system changes in near-real-time. Each record includes the path affected, event flags (created, removed, renamed, modified), and an event ID. They persist across reboots and can reveal file activity going back months or years.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'Why is examining .bash_history (or .zsh_history) forensically significant but also unreliable as sole evidence?',
    options: [
      'It only records commands run as root',
      'It shows commands a user typed, but entries can be easily deleted/edited, and commands run via scripts or other shells may not appear',
      'It is encrypted and cannot be read without the user\'s password',
      'It only stores the last 10 commands',
    ],
    answer: 1,
    explanation: 'Shell history files record typed commands and are invaluable for understanding user activity. However, they are trivially edited (any text editor), can be suppressed (unset HISTFILE, HISTSIZE=0), don\'t capture commands from non-interactive shells or other shell types, and timestamps are only saved if HISTTIMEFORMAT is set.',
  },

  // Chapter 6: Memory Forensics
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is the primary advantage of memory forensics over disk forensics?',
    options: [
      'Memory images are smaller and faster to analyze',
      'Memory contains volatile data like running processes, network connections, encryption keys, and malware that may never touch disk',
      'Memory evidence is more admissible in court',
      'Memory forensics does not require specialized tools',
    ],
    answer: 1,
    explanation: 'RAM contains data that only exists while the system is running: decrypted data, running processes, injected code, network connections, clipboard contents, chat messages, and encryption keys. Fileless malware operates entirely in memory and leaves no disk artifacts, making memory forensics essential.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'In Volatility, what does the "malfind" plugin detect?',
    options: [
      'Malware files on the disk',
      'Process memory regions with suspicious characteristics like PAGE_EXECUTE_READWRITE permissions and non-standard PE headers indicating injected code',
      'Network connections to known malicious IPs',
      'Registry keys modified by malware',
    ],
    answer: 1,
    explanation: 'Malfind scans process memory for regions marked as executable+writable (PAGE_EXECUTE_READWRITE) that contain PE headers not mapped from disk files — a strong indicator of injected code. It extracts these suspicious regions for further analysis, often revealing reflectively loaded DLLs or shellcode.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What is process hollowing and how can memory forensics detect it?',
    options: [
      'Deleting a process from the task manager; detected by checking startup programs',
      'Replacing a legitimate process\'s memory with malicious code while keeping the original process name; detected by comparing in-memory code to the on-disk executable',
      'Creating a hidden process that doesn\'t appear in any listings; detected by scanning the process list',
      'Corrupting a process\'s stack to cause a crash; detected by analyzing crash dumps',
    ],
    answer: 1,
    explanation: 'Process hollowing creates a suspended legitimate process (e.g., svchost.exe), unmaps its memory, writes malicious code in its place, then resumes it. The process appears legitimate in task lists. Memory forensics detects this by comparing the in-memory executable image to the on-disk file — mismatches indicate hollowing.',
  },

  // Chapter 7: Browser & Application Forensics
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'Why are SQLite databases central to browser forensics?',
    options: [
      'Browsers encrypt all data using SQLite\'s built-in encryption',
      'Chrome, Firefox, and Safari all store history, cookies, downloads, and form data in SQLite databases that persist even after clearing browser history',
      'SQLite is the only database that can store web content',
      'SQLite databases are automatically synced to cloud backups',
    ],
    answer: 1,
    explanation: 'Major browsers use SQLite for structured data storage. Chrome\'s "History" file, "Cookies", "Login Data", and Firefox\'s places.sqlite, cookies.sqlite are SQLite databases. Even after "clearing history," WAL (Write-Ahead Log) files, journal files, and unvacuumed free pages may retain deleted records.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What forensic information can be extracted from email headers?',
    options: [
      'Only the sender and recipient email addresses',
      'The complete path the email traveled (servers, IPs, timestamps), authentication results (SPF, DKIM, DMARC), client information, and potential spoofing indicators',
      'The content of attached files',
      'The sender\'s physical location via GPS',
    ],
    answer: 1,
    explanation: 'Email headers contain Received: fields showing every mail server hop with timestamps and IP addresses, authentication results (SPF pass/fail, DKIM signature validity), the originating client (X-Mailer), and Message-ID. Inconsistencies in these headers can reveal spoofing, relay abuse, or the true origin of phishing emails.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is "SQLite WAL (Write-Ahead Logging)" and why is it forensically important?',
    options: [
      'A backup mechanism that copies databases to external drives',
      'A journaling mode where changes are written to a separate -wal file before being committed to the main database, often preserving recently deleted data',
      'An encryption layer that protects SQLite data at rest',
      'A compression algorithm that reduces database file sizes',
    ],
    answer: 1,
    explanation: 'In WAL mode, SQLite writes changes to a separate -wal file before checkpointing them to the main database. The WAL file may contain recently deleted or modified records that no longer appear in the main database. Forensic tools analyze WAL files to recover data the user believed they had deleted.',
  },

  // Chapter 8: Network Forensics
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What is the key difference between full packet capture (pcap) and NetFlow data for forensic analysis?',
    options: [
      'pcap is only available on Windows while NetFlow is only available on Linux',
      'pcap captures complete packet contents (headers + payload) while NetFlow records only metadata (IPs, ports, bytes, timestamps) — offering less detail but far less storage',
      'NetFlow captures more data than pcap',
      'pcap can only capture encrypted traffic while NetFlow captures decrypted traffic',
    ],
    answer: 1,
    explanation: 'Full pcap captures everything — you can reconstruct files, read unencrypted payloads, and analyze protocol details. NetFlow/IPFIX records connection-level metadata: source/destination IPs, ports, protocol, byte counts, and timestamps. NetFlow is practical for long-term storage (months) while pcap is typically stored for days due to volume.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'How can DNS query logs assist in forensic investigations?',
    options: [
      'DNS logs show which websites users visited and can reveal command-and-control (C2) communication, data exfiltration via DNS tunneling, and domain generation algorithm (DGA) activity',
      'DNS logs contain the content of web pages visited',
      'DNS logs record passwords used to log into websites',
      'DNS logs only show internal network communication',
    ],
    answer: 0,
    explanation: 'DNS logs reveal domain lookups regardless of whether the connection was encrypted (HTTPS). Anomalies like frequent queries to random-looking domains may indicate DGA-based malware. Unusually long subdomain queries suggest DNS tunneling for data exfiltration. DNS is often overlooked but provides a valuable forensic timeline.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What forensic challenge does TLS-encrypted traffic present, and how can investigators work around it?',
    options: [
      'Encrypted traffic cannot be analyzed at all',
      'Investigators can use TLS session keys (from memory/SSLKEYLOGFILE), JA3/JA4 fingerprinting of the TLS handshake, SNI fields, and certificate metadata to analyze connections without decrypting payloads',
      'All TLS traffic can be decrypted with a court order',
      'Only government agencies can decrypt TLS traffic',
    ],
    answer: 1,
    explanation: 'While payload decryption requires session keys, much can be learned from encrypted traffic: JA3/JA4 fingerprints identify client applications by their TLS handshake patterns, SNI reveals the intended server name, certificate details are visible, and traffic patterns (timing, volume) can indicate C2 activity. SSLKEYLOGFILE or memory forensics may provide session keys.',
  },

  // Chapter 9: Mobile Forensics
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What are the three levels of mobile device acquisition, from least to most invasive?',
    options: [
      'Backup, clone, root',
      'Logical (app-level data via APIs/backups), file system (full file system access), and physical (bit-for-bit image including deleted data)',
      'Software, hardware, manual',
      'Remote, local, direct',
    ],
    answer: 1,
    explanation: 'Logical acquisition extracts data through the device\'s APIs or backup mechanisms (e.g., iTunes backup, ADB backup) — easiest but limited to accessible data. File system acquisition accesses the full file system (requires elevated access). Physical acquisition creates a raw bit-level image including unallocated space and deleted data — most complete but hardest to achieve on modern encrypted devices.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'Why are iOS device backups (iTunes/Finder backups) forensically valuable?',
    options: [
      'They are stored unencrypted by default',
      'They contain messages, photos, app data, call logs, contacts, and location data — and encrypted backups may include keychain data (saved passwords, WiFi keys, tokens)',
      'They include a complete disk image of the device',
      'They automatically upload to a public server',
    ],
    answer: 1,
    explanation: 'iOS backups contain a wealth of user data: SMS/iMessage, photos, contacts, call history, app data, Safari history, and location data. Encrypted backups additionally include keychain items (stored passwords, WiFi credentials, authentication tokens). The Manifest.db maps backup files to original paths for reconstruction.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What forensic challenge does Full Disk Encryption (FDE) on modern smartphones create?',
    options: [
      'It makes the phone heavier and slower',
      'Without the passcode/biometric or device keys, physical acquisition yields only encrypted data that is computationally infeasible to decrypt',
      'It prevents taking screenshots',
      'It only encrypts photos, not other data',
    ],
    answer: 1,
    explanation: 'Modern iOS (Data Protection) and Android (file-based encryption) devices encrypt data with keys derived from the user\'s passcode and hardware-bound keys. Without the correct credentials, a physical image is just encrypted bytes. This has shifted mobile forensics toward logical/file-system acquisition when the device is unlocked (AFU — After First Unlock state).',
  },

  // Chapter 10: Cloud & Container Forensics
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What is the primary forensic log source in AWS for tracking API activity?',
    options: [
      'S3 access logs',
      'AWS CloudTrail — records every API call with who, what, when, where (source IP), and the result',
      'VPC Flow Logs',
      'CloudWatch Metrics',
    ],
    answer: 1,
    explanation: 'CloudTrail logs every AWS API call: the identity (IAM user/role), action performed, resources affected, source IP, timestamp, and whether it succeeded. This is the first place to look for unauthorized access, privilege escalation, or data exfiltration in AWS. Management events are logged by default; data events (S3/Lambda) require explicit enabling.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'Why is container forensics particularly challenging compared to traditional server forensics?',
    options: [
      'Containers use a different programming language',
      'Containers are ephemeral — they can be destroyed and recreated in seconds, losing volatile evidence; the layered filesystem complicates evidence collection',
      'Containers cannot access the network',
      'Container logs are encrypted by default',
    ],
    answer: 1,
    explanation: 'Containers are designed to be immutable and ephemeral. When a compromised container is killed, all runtime state (processes, network connections, modified files) is lost. The overlay filesystem means changes exist in a thin writable layer on top of read-only image layers. Investigators must capture container state before termination and analyze image layers for supply chain issues.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What unique challenge does serverless (e.g., AWS Lambda) forensics present?',
    options: [
      'Serverless functions cannot be logged',
      'There is no persistent infrastructure to image — investigators must rely entirely on cloud provider logs, as the execution environment is controlled by the provider and recycled automatically',
      'Serverless functions run on dedicated hardware that can be seized',
      'Serverless environments do not support encryption',
    ],
    answer: 1,
    explanation: 'With serverless, there are no VMs or containers to image. The execution environment is managed by the cloud provider and may be reused or destroyed at any time. Forensics depends on CloudTrail, CloudWatch Logs, X-Ray traces, and application-level logging. Without proactive logging configuration, critical evidence may never be recorded.',
  },

  // Chapter 11: Incident Response Process
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'In the PICERL incident response framework, what does the "C" (Containment) phase focus on?',
    options: [
      'Cleaning up all evidence of the incident',
      'Limiting the scope and impact of the incident by isolating affected systems while preserving evidence for investigation',
      'Communicating with the media about the incident',
      'Counting the number of affected machines',
    ],
    answer: 1,
    explanation: 'Containment aims to stop the incident from spreading while preserving evidence. This may include network isolation (blocking C2 traffic, VLAN segmentation), disabling compromised accounts, and taking memory dumps before reimaging. The balance between speed (stop the attack) and evidence preservation is a key containment challenge.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is the difference between an IOC (Indicator of Compromise) and an IOA (Indicator of Attack)?',
    options: [
      'IOCs are for network attacks while IOAs are for physical attacks',
      'IOCs are evidence that a compromise has occurred (file hashes, IPs, domains) while IOAs describe attacker behaviors and techniques that indicate an attack in progress',
      'IOCs are used by defenders and IOAs are used by attackers',
      'They are different names for the same concept',
    ],
    answer: 1,
    explanation: 'IOCs are forensic artifacts left after a breach: malware hashes, C2 IP addresses, malicious domains, registry modifications. IOAs describe adversary behaviors (lateral movement, privilege escalation, credential dumping) that indicate an active attack. IOAs are harder to evade because attackers must perform certain actions regardless of their specific tools.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'Why is the "Lessons Learned" phase often considered the most important part of incident response?',
    options: [
      'It determines who gets fired for causing the incident',
      'It identifies root causes, gaps in detection/response, and drives improvements to prevent similar incidents — without it, organizations repeat the same failures',
      'It calculates the financial cost of the incident',
      'It satisfies regulatory requirements only',
    ],
    answer: 1,
    explanation: 'Post-incident analysis (blameless post-mortem) examines what happened, how it was detected, response effectiveness, and what can be improved. It drives security improvements: updating detection rules, patching gaps, improving playbooks, and training staff. Organizations that skip this phase are condemned to repeat similar incidents.',
  },

  // Chapter 12: Anti-Forensics & Detection
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is "timestomping" and how can forensic investigators detect it?',
    options: [
      'Changing the timezone on a computer; detected by checking timezone settings',
      'Modifying file timestamps to hide activity; detected by comparing $STANDARD_INFORMATION vs $FILE_NAME timestamps in NTFS MFT records',
      'Stopping the system clock to prevent log entries; detected by checking NTP sync',
      'Backdating emails to create false alibis; detected by checking email server logs',
    ],
    answer: 1,
    explanation: 'Timestomping uses tools like Timestomp to modify file Created/Modified/Accessed times to blend in with legitimate files. Detection: NTFS stores timestamps in both $STANDARD_INFORMATION (user-modifiable) and $FILE_NAME (kernel-only) attributes. Discrepancies between these two sets indicate tampering. Also check $UsnJrnl for the actual change timeline.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is the forensic difference between deleting a file, overwriting it, and secure wiping?',
    options: [
      'They all have the same effect — the data is permanently gone',
      'Deletion only removes the file system pointer (data remains recoverable), overwriting replaces content but may leave traces in journal/slack space, secure wiping overwrites with multiple passes making recovery practically impossible',
      'Deleting is faster than overwriting, which is faster than secure wiping',
      'Only secure wiping requires administrator privileges',
    ],
    answer: 1,
    explanation: 'Standard deletion marks space as available but data persists until overwritten (recoverable with carving). Single overwrite destroys most data but journal entries, MFT records, or VSS copies may survive. Secure wiping (e.g., DoD 5220.22-M, Gutmann method) performs multiple overwrite passes with specific patterns, though modern SSDs with wear leveling complicate even this.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'How can investigators detect the use of steganography (hidden data in images/files)?',
    options: [
      'By visually inspecting every image manually',
      'Using statistical analysis (chi-square, RS analysis) to detect deviations from expected pixel distributions, and tools like StegDetect and zsteg',
      'By checking the file extension',
      'Steganography is undetectable by design',
    ],
    answer: 1,
    explanation: 'LSB (Least Significant Bit) steganography alters pixel values in ways that create detectable statistical anomalies. Chi-square analysis detects uniform distributions in LSB pairs. RS (Regular-Singular) analysis measures capacity usage. Tools like StegDetect, zsteg, and StegExpose automate detection. File size anomalies and metadata inconsistencies also provide clues.',
  },

  // Chapter 13: Malware Forensics & Threat Intel
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What is the primary purpose of running malware in a sandbox during forensic analysis?',
    options: [
      'To permanently destroy the malware',
      'To observe the malware\'s behavior (network connections, file modifications, registry changes, process creation) in an isolated environment without risking production systems',
      'To extract the malware author\'s identity',
      'To test if antivirus can detect it',
    ],
    answer: 1,
    explanation: 'Sandboxes (Cuckoo/CAPE, ANY.RUN, Joe Sandbox) execute malware in instrumented VMs that log all system activity: API calls, file operations, registry modifications, network traffic, and process behavior. This dynamic analysis reveals the malware\'s capabilities and IOCs without risking real infrastructure.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What are YARA rules and how are they used in malware forensics?',
    options: [
      'Firewall rules that block malware network traffic',
      'Pattern-matching rules that describe malware families using strings, byte patterns, and conditions to scan files and memory for matches',
      'Database queries that search virus signature databases',
      'Machine learning models trained on malware samples',
    ],
    answer: 1,
    explanation: 'YARA rules define patterns (text strings, hex bytes, regex) with boolean conditions to identify malware families. Analysts write rules targeting unique strings, code sequences, or structural features. Rules can scan files, processes, and memory dumps. They\'re widely used in threat hunting, incident response, and automated malware classification.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'How does mapping malware behavior to the MITRE ATT&CK framework benefit forensic investigations?',
    options: [
      'It automatically removes the malware from infected systems',
      'It provides a standardized taxonomy of adversary techniques, enabling analysts to understand the full attack chain, identify gaps in detection, and share findings consistently across teams',
      'It encrypts the investigation findings for secure storage',
      'It generates legal reports for court proceedings',
    ],
    answer: 1,
    explanation: 'MITRE ATT&CK maps adversary techniques across the kill chain (Initial Access → Exfiltration). Mapping incident findings to ATT&CK techniques helps: identify what else the attacker might have done (hunting for gaps), correlate with known threat groups (attribution), communicate findings in a common language, and measure detection coverage across the matrix.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
