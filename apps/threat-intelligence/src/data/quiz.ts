export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: CTI Fundamentals & Intelligence Lifecycle
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What are the five phases of the traditional intelligence cycle?',
    options: [
      'Detect, Analyze, Respond, Recover, Report',
      'Direction (planning/requirements), Collection, Processing, Analysis, Dissemination',
      'Identify, Protect, Detect, Respond, Recover',
      'Reconnaissance, Weaponization, Delivery, Exploitation, Installation',
    ],
    answer: 1,
    explanation: 'The intelligence cycle consists of Direction (defining requirements and priorities), Collection (gathering raw data), Processing (normalizing and structuring data), Analysis (turning data into actionable intelligence), and Dissemination (delivering intelligence to stakeholders). A feedback loop connects dissemination back to direction.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What distinguishes a Priority Intelligence Requirement (PIR) from a general intelligence requirement?',
    options: [
      'PIRs are classified while general requirements are public',
      'PIRs are the most critical questions that directly inform key decisions by leadership and drive collection priorities',
      'PIRs only relate to nation-state threats',
      'PIRs are updated annually while general requirements update daily',
    ],
    answer: 1,
    explanation: 'PIRs are the subset of intelligence requirements deemed most critical to an organization\'s decision-making. They focus collection efforts on what matters most — for example, "Which threat actors are actively targeting our sector?" vs. a general requirement like "Track new malware families." PIRs ensure limited resources address the highest-priority questions.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'Why is the feedback loop critical in the intelligence cycle?',
    options: [
      'It automates the entire intelligence process',
      'It allows consumers to evaluate intelligence quality and refine requirements, ensuring the cycle improves over time',
      'It encrypts intelligence products for secure distribution',
      'It generates metrics for compliance reporting',
    ],
    answer: 1,
    explanation: 'Without feedback, the intelligence cycle becomes a one-way pipeline that may produce irrelevant or low-quality products. The feedback loop lets consumers say "this was useful/not useful," "we need more depth on X," or "this didn\'t answer our question" — driving continuous improvement in collection focus, analysis depth, and delivery format.',
  },

  // Chapter 2: Intelligence Types & Levels
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'Which type of threat intelligence is most useful for a CISO preparing a board-level risk briefing?',
    options: [
      'Tactical intelligence (IOCs and detection rules)',
      'Strategic intelligence (long-term trends, threat landscape, geopolitical context)',
      'Operational intelligence (specific campaign details)',
      'Technical intelligence (malware hashes and IP addresses)',
    ],
    answer: 1,
    explanation: 'Strategic intelligence provides high-level analysis of threat trends, adversary motivations, geopolitical factors, and risk implications — exactly what boards and executives need for decision-making. Tactical IOCs and operational campaign details are too granular for board-level discussions.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What is the key difference between operational and tactical threat intelligence?',
    options: [
      'Operational is for executives; tactical is for analysts',
      'Operational describes adversary campaigns, infrastructure, and TTPs; tactical provides specific IOCs, signatures, and detection rules for immediate defense',
      'Operational is automated; tactical is manual',
      'There is no meaningful difference — they are interchangeable terms',
    ],
    answer: 1,
    explanation: 'Operational intelligence covers adversary campaigns at a higher level — their infrastructure, timing, targets, and TTPs — useful for understanding and anticipating attacks. Tactical intelligence is the most granular: specific IP addresses, malware hashes, YARA rules, and Snort signatures that SOC analysts and security tools consume directly for detection and blocking.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'In intelligence assessment, what does a "confidence level" (e.g., low/moderate/high) represent?',
    options: [
      'How classified the information is',
      'The analyst\'s degree of certainty in an assessment, based on source reliability, corroboration, and analytical rigor',
      'How many people reviewed the report',
      'The severity of the threat being described',
    ],
    answer: 1,
    explanation: 'Confidence levels (per ICD 203) communicate how certain analysts are in their judgments. High confidence means well-corroborated information from reliable sources. Low confidence means limited sourcing or significant gaps. This helps consumers understand the strength of an assessment and calibrate their decisions accordingly.',
  },

  // Chapter 3: Threat Landscape & Adversary Taxonomy
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'What primarily distinguishes nation-state APT groups from cybercriminal organizations?',
    options: [
      'APTs use more sophisticated malware',
      'APTs are backed by government resources with geopolitical objectives (espionage, sabotage), while cybercriminals are profit-motivated',
      'APTs only target military networks',
      'Cybercriminals have larger budgets than APTs',
    ],
    answer: 1,
    explanation: 'Nation-state APTs operate with government backing, pursuing strategic objectives like espionage (IP theft, intelligence collection), sabotage (critical infrastructure attacks), or influence operations. Cybercriminals primarily seek financial gain through ransomware, fraud, and data theft. APTs typically have more patience, resources, and sophistication, though the line can blur.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is "Ransomware-as-a-Service" (RaaS) in the cybercriminal ecosystem?',
    options: [
      'A government service that decrypts ransomware for free',
      'A business model where ransomware developers provide their malware and infrastructure to affiliates in exchange for a percentage of ransom payments',
      'A cloud service that backs up data to prevent ransomware damage',
      'A law enforcement sting operation targeting ransomware gangs',
    ],
    answer: 1,
    explanation: 'RaaS operates like a franchise: developers create and maintain the ransomware, provide a management portal, and handle negotiations/payments. Affiliates (who may lack technical skills) gain access to deploy the ransomware against targets. Revenue is split (e.g., 70/30 or 80/20). Groups like LockBit, BlackCat/ALPHV, and REvil popularized this model.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What role do Initial Access Brokers (IABs) play in the cybercriminal ecosystem?',
    options: [
      'They develop zero-day exploits for nation-states',
      'They specialize in gaining and selling unauthorized access to compromised networks, enabling other criminals to skip the initial intrusion phase',
      'They negotiate ransom payments on behalf of victims',
      'They provide cybersecurity insurance to organizations',
    ],
    answer: 1,
    explanation: 'IABs compromise organizations through phishing, vulnerability exploitation, or credential stuffing, then sell that access (VPN credentials, RDP access, web shells) on underground forums. Ransomware affiliates and other criminals purchase this access to skip the time-consuming intrusion phase. This specialization has accelerated attack timelines significantly.',
  },

  // Chapter 4: MITRE ATT&CK Framework
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'In MITRE ATT&CK, what is the relationship between tactics, techniques, and sub-techniques?',
    options: [
      'They are three independent classification systems',
      'Tactics represent the adversary\'s goals (the "why"), techniques describe how the goal is achieved (the "how"), and sub-techniques provide more specific variations of a technique',
      'Tactics are for defenders, techniques are for attackers, sub-techniques are for analysts',
      'Tactics are high-severity, techniques are medium, sub-techniques are low',
    ],
    answer: 1,
    explanation: 'ATT&CK is organized hierarchically: Tactics (14 in Enterprise) represent adversary goals (e.g., Initial Access, Lateral Movement, Exfiltration). Under each tactic, Techniques describe specific methods (e.g., Phishing under Initial Access). Sub-techniques provide granularity (e.g., Spearphishing Attachment, Spearphishing Link under Phishing).',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the ATT&CK Navigator tool used for?',
    options: [
      'Automatically blocking adversary techniques in firewalls',
      'Visualizing and annotating the ATT&CK matrix to map detection coverage, threat group techniques, and identify defensive gaps',
      'Scanning networks for active intrusions',
      'Training machine learning models on adversary behavior',
    ],
    answer: 1,
    explanation: 'ATT&CK Navigator is a web app for creating layered visualizations of the ATT&CK matrix. Teams use it to: map which techniques their detections cover (heat maps), overlay threat group TTPs to identify relevant threats, compare coverage between different security tools, and identify gaps where they lack visibility or detection capability.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'How does mapping detections to ATT&CK improve security operations?',
    options: [
      'It eliminates the need for signature-based detection',
      'It reveals which adversary techniques are covered by existing detections and highlights blind spots, enabling prioritized investment in detection engineering',
      'It automatically generates detection rules for all techniques',
      'It replaces the need for threat intelligence',
    ],
    answer: 1,
    explanation: 'By mapping each detection rule/alert to the ATT&CK technique it covers, organizations can visualize their detection matrix coverage. Gaps become immediately apparent — for example, "we have no detections for T1055 Process Injection." Teams can then prioritize building detections for techniques used by threat groups that target their sector.',
  },

  // Chapter 5: Threat Modeling Methodologies
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'In the STRIDE threat model, what does the "S" (Spoofing) category address?',
    options: [
      'Sending spam emails to users',
      'An attacker pretending to be someone or something else, violating authentication',
      'Slowing down system performance through resource exhaustion',
      'Stealing data through network sniffing',
    ],
    answer: 1,
    explanation: 'STRIDE categories map to security properties: Spoofing violates Authentication (pretending to be another user/system), Tampering violates Integrity, Repudiation violates Non-repudiation, Information Disclosure violates Confidentiality, Denial of Service violates Availability, and Elevation of Privilege violates Authorization.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What makes PASTA (Process for Attack Simulation & Threat Analysis) different from STRIDE?',
    options: [
      'PASTA is simpler and faster',
      'PASTA is a risk-centric, 7-stage methodology that considers business context, attacker perspective, and attack simulation — not just threat categorization',
      'PASTA only applies to web applications',
      'PASTA does not consider business risk',
    ],
    answer: 1,
    explanation: 'PASTA\'s 7 stages go beyond categorization: (1) Define objectives, (2) Define technical scope, (3) Application decomposition, (4) Threat analysis, (5) Vulnerability analysis, (6) Attack modeling/simulation, (7) Risk/impact analysis. It\'s attacker-centric and ties threats directly to business impact, producing prioritized risk-based outputs rather than just a list of threats.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What is an "attack tree" in threat modeling?',
    options: [
      'A visualization of malware infection spreading across a network',
      'A hierarchical diagram where the root is the attacker\'s goal and branches represent different paths (sub-goals and methods) to achieve it',
      'A list of attacks sorted by date of occurrence',
      'A database of known attack signatures',
    ],
    answer: 1,
    explanation: 'Attack trees (introduced by Bruce Schneier) model threats hierarchically: the root node is the attacker\'s goal (e.g., "steal customer data"), child nodes are sub-goals, and leaves are specific attack methods. Nodes can be AND (all children required) or OR (any child suffices). They help systematically identify and compare attack paths by cost, difficulty, or likelihood.',
  },

  // Chapter 6: Kill Chain & Diamond Model
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What are the seven phases of the Lockheed Martin Cyber Kill Chain?',
    options: [
      'Plan, Scan, Exploit, Maintain, Cover, Exfiltrate, Report',
      'Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command & Control, Actions on Objectives',
      'Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Lateral Movement, Exfiltration',
      'Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned',
    ],
    answer: 1,
    explanation: 'The Kill Chain models an intrusion as a sequential chain: (1) Reconnaissance (research target), (2) Weaponization (create exploit payload), (3) Delivery (send to target), (4) Exploitation (trigger vulnerability), (5) Installation (establish persistence), (6) C2 (remote control channel), (7) Actions on Objectives (achieve goal). Disrupting any phase breaks the chain.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What are the four core features (vertices) of the Diamond Model of Intrusion Analysis?',
    options: [
      'Threat, Vulnerability, Impact, Likelihood',
      'Adversary, Capability, Infrastructure, Victim',
      'Source, Destination, Protocol, Payload',
      'Actor, Action, Asset, Attribute',
    ],
    answer: 1,
    explanation: 'The Diamond Model represents each intrusion event as a diamond with four vertices: Adversary (the threat actor), Capability (tools/techniques used), Infrastructure (domains, IPs, C2 servers), and Victim (the target). Analysts pivot between vertices — e.g., finding an IP (infrastructure) used by known adversary X reveals other victims targeted via that infrastructure.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'How does the Diamond Model enable "pivoting" during threat intelligence analysis?',
    options: [
      'By automatically scanning networks for new indicators',
      'By following relationships between vertices — e.g., from a known malware sample (capability) to its C2 infrastructure, then to other victims using that infrastructure, then to the adversary',
      'By rotating encryption keys to protect intelligence data',
      'By switching between different threat intelligence platforms',
    ],
    answer: 1,
    explanation: 'Pivoting leverages the Diamond Model\'s relationships: start with one known vertex (e.g., a malware hash = capability) and traverse to connected vertices (which infrastructure does it contact? which adversary uses it? who else was targeted?). This expands a single IOC into a comprehensive picture of the adversary\'s campaign, infrastructure, and target set.',
  },

  // Chapter 7: Adversary Tracking & Attribution
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'Why are TTPs (Tactics, Techniques, and Procedures) more valuable for adversary tracking than IOCs?',
    options: [
      'TTPs are easier to collect automatically',
      'TTPs represent adversary behavior patterns that are costly to change, while IOCs like IPs and hashes are trivially changed between operations',
      'TTPs are standardized while IOCs are not',
      'IOCs require more storage space than TTPs',
    ],
    answer: 1,
    explanation: 'David Bianco\'s "Pyramid of Pain" illustrates this: at the bottom, hash values and IP addresses are trivially changed by adversaries. At the top, TTPs represent how adversaries operate — their tradecraft — which is deeply ingrained and expensive to change. Tracking TTPs provides more durable and predictive intelligence than chasing ephemeral IOCs.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What is a "false flag" operation in the context of cyber attribution?',
    options: [
      'An attack that fails to achieve its objective',
      'An attack deliberately designed to mimic another threat actor\'s TTPs, infrastructure, or language to mislead attribution efforts',
      'A phishing email with a fake sender address',
      'A decoy server set up by defenders',
    ],
    answer: 1,
    explanation: 'False flags involve planting evidence to frame another actor: using another group\'s known malware, mimicking their C2 patterns, embedding misleading language strings, or reusing their infrastructure. The Olympic Destroyer malware (2018 Winter Olympics) contained code designed to falsely implicate North Korea\'s Lazarus Group, when it was likely Russian GRU.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'Why do different organizations assign different names to the same threat group (e.g., APT28 / Fancy Bear / STRONTIUM / Forest Blizzard)?',
    options: [
      'They are tracking different groups that happen to share tools',
      'Each vendor independently tracks and names clusters of activity based on their own visibility, and clusters may be merged or split as evidence evolves',
      'The threat actors change their name frequently',
      'It is a deliberate strategy to confuse adversaries',
    ],
    answer: 1,
    explanation: 'Each CTI vendor independently tracks activity clusters from their own telemetry and assigns internal names. Mandiant uses APTxx/UNCxxxx, CrowdStrike uses animal names (Bear=Russia, Panda=China), Microsoft uses weather themes. The same underlying group may be tracked under multiple names because vendors have different visibility and may not immediately correlate their clusters.',
  },

  // Chapter 8: Intelligence Collection & Sources
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'In threat intelligence, what does OSINT (Open Source Intelligence) encompass?',
    options: [
      'Only information from social media platforms',
      'Intelligence derived from publicly available sources: websites, social media, public records, forums, code repositories, DNS records, certificate transparency logs, and more',
      'Only information from open-source software projects',
      'Classified information that has been declassified',
    ],
    answer: 1,
    explanation: 'OSINT covers any publicly accessible information: social media, news, blogs, government records, court filings, WHOIS records, DNS data, certificate transparency logs, public code repos, paste sites, job postings, and more. For CTI, OSINT includes threat actor communications on forums, leaked data analysis, and infrastructure reconnaissance via public services like Shodan and Censys.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'How do honeypots contribute to threat intelligence collection?',
    options: [
      'They block attackers at the network perimeter',
      'They are deliberately vulnerable decoy systems that attract attackers, capturing their tools, techniques, and infrastructure details for intelligence analysis',
      'They encrypt sensitive data to prevent theft',
      'They automatically patch vulnerabilities in production systems',
    ],
    answer: 1,
    explanation: 'Honeypots (and honeynets) mimic real systems to attract attackers. By analyzing what attackers do — which exploits they use, what malware they deploy, which C2 servers they contact — defenders gain first-hand intelligence on active threats. High-interaction honeypots provide rich behavioral data, while low-interaction ones capture scanning patterns and automated attack tools at scale.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What is the primary risk of relying on dark web monitoring for threat intelligence?',
    options: [
      'Dark web sites load too slowly',
      'Information may be inaccurate (planted disinformation, scams), access can be detected by threat actors, and collection raises legal/ethical concerns depending on jurisdiction',
      'Dark web content is always encrypted and cannot be read',
      'Only government agencies are allowed to access the dark web',
    ],
    answer: 1,
    explanation: 'Dark web forums and marketplaces contain valuable CTI (leaked credentials, breach data, malware sales, attack planning) but also rampant scams, disinformation, and honey traps. Analysts risk detection by threat actors, may encounter legal issues (purchasing stolen data), and must carefully validate information. Automated collection tools help reduce operational risk.',
  },

  // Chapter 9: STIX, TAXII & Intelligence Sharing
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What is STIX 2.1 and what types of objects does it define?',
    options: [
      'A programming language for security automation',
      'A structured language for representing cyber threat intelligence with objects like Indicators, Threat Actors, Malware, Attack Patterns, Campaigns, Vulnerabilities, and Relationships',
      'A network protocol for encrypted communication',
      'A vulnerability scoring system similar to CVSS',
    ],
    answer: 1,
    explanation: 'STIX (Structured Threat Information Expression) 2.1 is a JSON-based language with 18 STIX Domain Objects (SDOs) including Indicator, Threat-Actor, Malware, Attack-Pattern, Campaign, Vulnerability, and more. Objects are linked via STIX Relationship Objects (SROs). This standardized format enables machine-readable intelligence sharing between organizations and tools.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'How does TAXII relate to STIX in the intelligence sharing ecosystem?',
    options: [
      'TAXII is a replacement for STIX',
      'TAXII is a transport protocol that defines how STIX-formatted intelligence is exchanged between systems via collections and channels over HTTPS',
      'TAXII converts STIX data into PDF reports',
      'TAXII is a threat scoring algorithm',
    ],
    answer: 1,
    explanation: 'TAXII (Trusted Automated Exchange of Intelligence Information) is the transport mechanism for STIX data. It defines API endpoints, authentication, and two sharing models: Collections (request/response, like a library) and Channels (publish/subscribe). Think of STIX as the language and TAXII as the postal service — STIX defines what you say, TAXII defines how you send it.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What does TLP:AMBER+STRICT mean under the Traffic Light Protocol 2.0?',
    options: [
      'The information can be freely shared with anyone',
      'The information is restricted to the recipient\'s organization only — no further sharing, not even within the recipient\'s broader community',
      'The information is classified top secret',
      'The information can be shared with the entire industry sector',
    ],
    answer: 1,
    explanation: 'TLP 2.0 defines four levels: TLP:RED (named recipients only), TLP:AMBER+STRICT (recipient\'s organization only), TLP:AMBER (recipient\'s organization + clients/customers who need to know), TLP:GREEN (recipient\'s community), TLP:CLEAR (public). AMBER+STRICT was added in TLP 2.0 to address the ambiguity in the original AMBER definition.',
  },

  // Chapter 10: Threat Feeds & Platform Management
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What is the primary function of a Threat Intelligence Platform (TIP)?',
    options: [
      'To replace SOC analysts entirely',
      'To aggregate, normalize, correlate, and enrich threat data from multiple sources, enabling analysis, sharing, and integration with security tools',
      'To generate phishing emails for testing',
      'To manage employee security awareness training',
    ],
    answer: 1,
    explanation: 'TIPs (MISP, OpenCTI, ThreatConnect, Anomali) centralize threat intelligence management: ingesting feeds (STIX/TAXII, CSVs, APIs), deduplicating and normalizing IOCs, enriching with context (WHOIS, geolocation, reputation), correlating related indicators, and exporting to SIEM/SOAR/EDR for automated detection and response.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'How should organizations evaluate the quality of a threat intelligence feed?',
    options: [
      'By counting the total number of indicators it contains',
      'By assessing relevance to your sector, accuracy (false positive rate), timeliness, actionability, and source reliability',
      'By checking if it is the most expensive option',
      'By whether it includes classified intelligence',
    ],
    answer: 1,
    explanation: 'Feed quality metrics include: Relevance (does it cover threats to your industry/region?), Accuracy (what\'s the false positive rate?), Timeliness (are IOCs fresh or stale?), Actionability (can you operationalize the data?), Context (are IOCs enriched with TTPs/actor info?), and Source reliability. A feed with millions of stale, uncontextualized IOCs is worse than a smaller, curated, relevant feed.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is "IOC enrichment" and why is it important?',
    options: [
      'Adding more IOCs to increase the total count',
      'Augmenting raw indicators with additional context — WHOIS data, geolocation, reputation scores, related malware families, and associated threat actors — to enable informed decision-making',
      'Encrypting IOCs for secure storage',
      'Converting IOCs from one format to another',
    ],
    answer: 1,
    explanation: 'A bare IP address or hash is minimally useful. Enrichment adds context: Is this IP associated with known C2 infrastructure? When was the domain registered? What malware family uses this hash? Which threat actor is linked to this indicator? This context transforms raw data into intelligence that analysts can act on and prioritize effectively.',
  },

  // Chapter 11: Threat Hunting & Detection Engineering
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What distinguishes hypothesis-driven threat hunting from automated detection?',
    options: [
      'Threat hunting is performed by AI while detection is manual',
      'Threat hunting proactively searches for threats based on analyst-formed hypotheses about adversary behavior, rather than waiting for alerts from pre-defined rules',
      'Threat hunting only uses open-source tools',
      'There is no difference — they are the same process',
    ],
    answer: 1,
    explanation: 'Automated detection is reactive — rules/signatures fire when a known pattern matches. Threat hunting is proactive: an analyst hypothesizes "APT group X may be using DLL side-loading in our environment," then searches telemetry for evidence. Hunting finds threats that existing detections miss and generates new detection rules from findings.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What are Sigma rules and how do they relate to detection engineering?',
    options: [
      'A proprietary detection format exclusive to Splunk',
      'A vendor-agnostic, YAML-based signature format for describing log-based detections that can be converted to SIEM-specific queries (Splunk, Elastic, Sentinel, etc.)',
      'A type of machine learning model for anomaly detection',
      'A framework for writing firewall rules',
    ],
    answer: 1,
    explanation: 'Sigma rules are the "YARA for logs" — they describe detection logic in a vendor-neutral YAML format that maps to specific log sources and conditions. Converters (sigmac, pySigma) translate Sigma rules into SIEM-specific queries. This enables detection-as-code: rules can be version-controlled, peer-reviewed, shared across the community, and deployed to any SIEM.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'In the Hunting Maturity Model (HMM), what characterizes the highest maturity level (HM4)?',
    options: [
      'Using a SIEM for the first time',
      'The organization automates proven hunting procedures, continuously develops new hypotheses based on CTI, and hunting findings directly drive detection engineering and security improvements',
      'Hiring a dedicated threat hunting team',
      'Purchasing a commercial threat hunting platform',
    ],
    answer: 1,
    explanation: 'HMM levels: HM0 (relies entirely on automated alerts), HM1 (uses threat intel indicators for searching), HM2 (follows published hunting procedures), HM3 (creates new data analysis procedures), HM4 (automates successful hunts into detections, continuously innovates hunting techniques, and integrates hunting tightly with CTI and detection engineering in a virtuous cycle).',
  },

  // Chapter 12: Malware Intelligence & Campaign Analysis
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is "malware family tracking" in threat intelligence?',
    options: [
      'Monitoring antivirus detection rates for different products',
      'Grouping malware samples by shared code, behavior, and infrastructure into families, tracking their evolution, variants, and the threat actors who deploy them',
      'Keeping a database of all malware ever discovered',
      'Tracking which employees clicked on malicious links',
    ],
    answer: 1,
    explanation: 'Malware family tracking groups related samples (e.g., Emotet, Cobalt Strike, QakBot) by code similarity, behavioral patterns, configuration structures, and C2 protocols. Analysts track how families evolve (new variants, capabilities), map them to deploying threat actors, and monitor infrastructure changes. This enables predictive intelligence about future campaigns.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is "infrastructure mapping" in campaign analysis?',
    options: [
      'Drawing network diagrams of the victim\'s internal network',
      'Identifying and mapping the adversary\'s operational infrastructure — C2 servers, staging hosts, domain registrations, hosting providers — and their interconnections across campaigns',
      'Inventorying hardware assets in a data center',
      'Mapping cloud service provider regions',
    ],
    answer: 1,
    explanation: 'Infrastructure mapping traces adversary assets: C2 domains/IPs, malware staging servers, email infrastructure, and hosting providers. Analysts use passive DNS, WHOIS history, certificate transparency, and IP relationships to map connections. Shared infrastructure across campaigns links seemingly unrelated incidents to the same actor, and reveals new infrastructure before it\'s used in attacks.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What does "pivoting" mean in the context of indicator expansion?',
    options: [
      'Rotating log files to save disk space',
      'Using one known indicator to discover related indicators — e.g., finding all domains hosted on the same IP, or all samples communicating with a known C2 server',
      'Switching from one TIP platform to another',
      'Changing the focus of an investigation to a different incident',
    ],
    answer: 1,
    explanation: 'Pivoting expands a single IOC into a broader picture: start with a malicious domain → find its IP via passive DNS → discover other domains on that IP → find malware samples contacting those domains → extract configuration data revealing additional C2s. Tools like Maltego, VirusTotal Graph, and DomainTools automate this process, building comprehensive adversary infrastructure maps.',
  },

  // Chapter 13: Strategic Intelligence & Reporting
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What should a well-structured threat intelligence report always include?',
    options: [
      'Only raw IOCs and malware hashes',
      'An executive summary, key findings with confidence levels, detailed analysis with evidence, actionable recommendations, and relevant IOCs/TTPs',
      'A complete technical walkthrough of every tool used in analysis',
      'The analyst\'s personal opinion without supporting evidence',
    ],
    answer: 1,
    explanation: 'Effective CTI reports are structured for their audience: executive summary for leadership, key findings with confidence levels (ICD 203) for decision-makers, detailed technical analysis with evidence for analysts, actionable recommendations for defenders, and appendices with IOCs/detection rules for SOC teams. The report should answer the "so what?" — why this matters to the consumer.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What is "intelligence-driven defense" as described by the Lockheed Martin team?',
    options: [
      'Using AI to automatically defend networks',
      'A strategy where threat intelligence about adversary TTPs directly informs and prioritizes defensive measures, detection engineering, and security investments',
      'Hiring former intelligence analysts as security staff',
      'Purchasing the most expensive security products available',
    ],
    answer: 1,
    explanation: 'Intelligence-driven defense uses knowledge of specific adversaries targeting your organization to prioritize defenses. Rather than defending against everything equally, you focus on the TTPs of threat actors relevant to your sector. If APT groups targeting healthcare use spearphishing with macro-laden documents, you prioritize email security and macro controls over other measures.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'How does the FAIR (Factor Analysis of Information Risk) framework help communicate threat intelligence to business leaders?',
    options: [
      'It converts all threats into red/yellow/green status indicators',
      'It quantifies cyber risk in financial terms (probable loss magnitude and frequency), translating technical threats into business impact that executives can compare with other business risks',
      'It ranks threats alphabetically for easy reference',
      'It eliminates the need for threat intelligence entirely',
    ],
    answer: 1,
    explanation: 'FAIR decomposes risk into measurable components: Threat Event Frequency, Vulnerability (susceptibility), Loss Magnitude (primary and secondary losses). By expressing cyber risk as a probable financial range (e.g., "10-40% chance of $2M-$8M loss annually"), FAIR enables executives to compare cyber risk with other business risks, justify security budgets, and make informed investment decisions.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
