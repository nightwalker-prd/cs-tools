export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ============================================================
  // Topic 1: OSINT Fundamentals (chapterId: 1)
  // ============================================================
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'Why is the intelligence cycle described as iterative rather than linear?',
    options: [
      'Because each phase must be repeated exactly three times before moving to the next',
      'Because intelligence agencies require mandatory review cycles at each phase',
      'Because the cycle only applies to classified intelligence and must be restarted for OSINT',
      'Because findings during analysis often reveal gaps that send the analyst back to collection or even redefine the original requirements — making it a continuous feedback loop',
    ],
    answer: 3,
    explanation:
      'The intelligence cycle is iterative because each phase can feed back into earlier phases. For example, during analysis an analyst may discover gaps in the collected data, requiring additional collection, or the analysis may reveal that the original intelligence requirements need to be refined. This continuous feedback loop is what makes the cycle adaptive and effective. It is not a rigid, one-pass process.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      'What distinguishes OSINT from HUMINT (Human Intelligence) and SIGINT (Signals Intelligence)?',
    options: [
      'OSINT is derived from publicly available information, whereas HUMINT comes from human sources (agents, informants) and SIGINT from intercepted communications — both typically requiring covert access',
      'OSINT is always more accurate than HUMINT or SIGINT',
      'OSINT relies exclusively on automated tools while HUMINT and SIGINT require manual effort',
      'OSINT, HUMINT, and SIGINT all use the same sources but different analysis techniques',
    ],
    answer: 0,
    explanation:
      'The defining characteristic of OSINT is that it uses publicly available information — sources anyone can legally access. HUMINT relies on intelligence gathered through interpersonal contact with human sources, often covertly recruited agents or informants. SIGINT involves intercepting electronic communications and signals, which typically requires specialized technical capabilities and legal authorization. OSINT is not inherently more or less accurate — it simply draws from a different category of sources.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'What is the purpose of Priority Intelligence Requirements (PIRs) in OSINT collection management?',
    options: [
      'PIRs rank the classification level of collected intelligence',
      'PIRs define specific questions the investigation must answer, preventing analysts from being overwhelmed by irrelevant data and keeping collection efforts focused',
      'PIRs determine which tools and software are authorized for use during collection',
      'PIRs establish the budget allocated to each phase of the intelligence cycle',
    ],
    answer: 1,
    explanation:
      'Priority Intelligence Requirements (PIRs) are specific, well-defined questions that guide the entire intelligence process. They prevent "boiling the ocean" — collecting vast amounts of irrelevant data — by focusing collection and analysis efforts on what decision-makers actually need to know. Without PIRs, analysts risk spending significant time gathering information that does not contribute to answering the core questions of the investigation.',
  },

  // ============================================================
  // Topic 2: Legal & Ethical Frameworks (chapterId: 2)
  // ============================================================
  {
    id: 't2-q1',
    chapterId: 2,
    question:
      'An OSINT analyst discovers a social media profile set to "public" that contains personally identifiable information. Under GDPR, can the analyst freely collect and store this data?',
    options: [
      'Yes — any publicly available data is exempt from GDPR because the user chose to make it public',
      'Only if the analyst is based outside the EU, since GDPR does not apply extraterritorially',
      'No — GDPR applies to the processing of personal data regardless of whether it is publicly available; the analyst still needs a lawful basis for processing and must respect data subject rights',
      'Yes, but only if the data is collected within 24 hours of being posted',
    ],
    answer: 2,
    explanation:
      'GDPR regulates the processing of personal data of EU residents regardless of whether that data is publicly accessible. Even if someone sets their profile to public, collecting, storing, and analyzing their personal data still constitutes "processing" under GDPR and requires a lawful basis (such as legitimate interest). Additionally, GDPR has extraterritorial reach — it applies to anyone processing EU residents\' data, not just organizations within the EU.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'Why should OSINT practitioners carefully review a platform\'s Terms of Service (ToS) before scraping data, even if the data is publicly visible?',
    options: [
      'Terms of Service only apply to users who create accounts, so scraping without an account is always legal',
      'Terms of Service are merely suggestions and carry no legal weight in any jurisdiction',
      'Reviewing ToS is only necessary for government analysts, not private-sector investigators',
      'Violating a platform\'s ToS can expose the practitioner to civil liability under computer fraud or breach-of-contract claims, and some jurisdictions have treated ToS violations as unauthorized access under laws like the CFAA',
    ],
    answer: 3,
    explanation:
      'Platform Terms of Service can create legal obligations even for public data. In cases like hiQ Labs v. LinkedIn, courts have grappled with whether scraping public data violates the Computer Fraud and Abuse Act (CFAA). While the legal landscape is evolving, ToS violations have been used as the basis for civil lawsuits and, in some interpretations, even criminal liability. Responsible OSINT practitioners review ToS to understand their legal exposure and operate within defensible boundaries.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'Which ethical principle is most important when an OSINT investigation could expose information about uninvolved third parties?',
    options: [
      'Applying the principle of proportionality — collecting only what is necessary for the investigation and minimizing collateral exposure of uninvolved individuals',
      'Maximizing data collection to ensure nothing is missed, then filtering later',
      'Publishing all findings immediately to maintain full transparency',
      'Delegating the ethical decision to automated tools that can filter data objectively',
    ],
    answer: 0,
    explanation:
      'Proportionality is a core ethical principle in OSINT that requires balancing the investigative need against potential harm to individuals. When an investigation risks exposing uninvolved third parties, analysts should minimize collateral data collection, redact identifying information about non-targets, and only retain data directly relevant to the investigation. Maximizing collection disregards privacy, and automated tools cannot make nuanced ethical judgments about potential harm to individuals.',
  },

  // ============================================================
  // Topic 3: Operational Security — OPSEC (chapterId: 3)
  // ============================================================
  {
    id: 't3-q1',
    chapterId: 3,
    question:
      'When creating a sock puppet account for OSINT research, which practice most reduces the risk of attribution back to the analyst?',
    options: [
      'Using a personal email with a different display name',
      'Creating the account from the analyst\'s home IP address but using a VPN for subsequent logins',
      'Building the account over time with a consistent persona, dedicated email, unique photos, and always accessing it through a separate browser profile routed through a VPN or Tor — never mixing it with personal accounts',
      'Using the same device for personal and research accounts but clearing cookies between sessions',
    ],
    answer: 2,
    explanation:
      'Effective sock puppet OPSEC requires complete separation between the analyst\'s real identity and the research persona. This means a dedicated email (not linked to personal accounts), unique profile photos (not reverse-searchable), a separate browser profile or VM, consistent VPN/Tor usage from creation onward, and gradual account aging to appear legitimate. Using a personal email or home IP at any point creates a linkage that can be discovered. Simply clearing cookies is insufficient because browser fingerprinting, IP logging, and behavioral patterns can still connect the accounts.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'What is the primary purpose of using a virtual machine (VM) or dedicated research environment for OSINT investigations?',
    options: [
      'VMs run faster than bare-metal machines for web browsing',
      'VMs isolate the research environment from the analyst\'s personal data and network identity — preventing cross-contamination of cookies, browser fingerprints, and credentials, and containing any malware encountered during research',
      'VMs are required by law in all jurisdictions for OSINT work',
      'VMs automatically anonymize all network traffic without additional configuration',
    ],
    answer: 1,
    explanation:
      'A dedicated VM or research environment provides isolation on multiple levels. It prevents browser cookies, cached credentials, and fingerprint data from the analyst\'s personal environment from leaking into the research session. It also contains any malware or exploit code that might be encountered when visiting hostile websites. However, VMs do not automatically anonymize traffic — the analyst must still configure VPN or Tor. VMs are a best practice, not a legal requirement.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'An analyst notices that a target appears to have identified their research activity. What is the most appropriate immediate response?',
    options: [
      'Continue the investigation unchanged to avoid appearing suspicious by suddenly stopping',
      'Immediately delete all collected evidence to remove traces of the investigation',
      'Switch to a new sock puppet and immediately resume the same collection activities',
      'Stop active collection on that vector, document what happened, assess what was exposed, and pivot to alternative collection methods that do not alert the target further',
    ],
    answer: 3,
    explanation:
      'When a target detects research activity (a "burn notice"), the analyst should immediately stop the compromised collection vector to avoid further alerting the target. The next steps are to document the incident (what was detected, how, and what information may have been exposed), conduct a damage assessment, and then pivot to alternative, less detectable collection methods. Continuing unchanged risks escalation. Deleting evidence destroys valuable work. Simply switching accounts and repeating the same behavior will likely trigger the same detection.',
  },

  // ============================================================
  // Topic 4: Search Engine Intelligence — SEARCHINT (chapterId: 4)
  // ============================================================
  {
    id: 't4-q1',
    chapterId: 4,
    question:
      'What does the Google dork operator `site:example.com filetype:pdf "confidential"` accomplish?',
    options: [
      'It searches for the word "confidential" across all PDF files on the entire internet',
      'It restricts the search to PDF files indexed on example.com that contain the word "confidential" — useful for finding sensitive documents that may have been inadvertently exposed',
      'It downloads all PDF files from example.com and searches them locally',
      'It alerts example.com\'s administrators that their confidential files are exposed',
    ],
    answer: 1,
    explanation:
      'Google dorking combines search operators to precisely target indexed content. The `site:` operator restricts results to a specific domain, `filetype:pdf` filters to PDF documents, and `"confidential"` requires the exact word. This combination is powerful for discovering sensitive documents that organizations may have unintentionally left accessible to search engine crawlers. It does not download files or notify administrators — it simply queries Google\'s existing index.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'Why is Google Cache (or the Wayback Machine) valuable for OSINT investigations?',
    options: [
      'Cached pages always contain more data than the original live page',
      'Cached versions are more legally permissible to access than live websites',
      'They preserve snapshots of web content that may have been deleted, modified, or made private since the original indexing — allowing analysts to access historical versions of pages',
      'Google Cache automatically removes personally identifiable information for privacy compliance',
    ],
    answer: 2,
    explanation:
      'Cached and archived content is valuable because targets often delete, modify, or restrict access to information after realizing it is exposed. Google Cache preserves the page as it appeared when last crawled, and the Wayback Machine maintains historical snapshots going back years. These archives allow analysts to recover deleted social media posts, removed documents, or previous versions of websites. Cached pages do not contain more data than the original, and there is no automatic PII removal.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'When would an analyst use a specialized search engine like Shodan or Censys instead of Google?',
    options: [
      'When searching for social media profiles, since Shodan indexes more social networks than Google',
      'When Google is temporarily unavailable and a backup search engine is needed',
      'When the analyst wants to avoid their searches being logged, since Shodan does not keep search logs',
      'When the analyst needs to discover internet-connected devices, open ports, running services, SSL certificates, and network infrastructure — information that traditional search engines do not index',
    ],
    answer: 3,
    explanation:
      'Shodan and Censys are specialized search engines that scan and index internet-connected devices and their exposed services — including open ports, banners, SSL certificates, IoT devices, SCADA systems, and misconfigured servers. Traditional search engines like Google index web page content but do not map network infrastructure. Shodan is not a social media search tool, not a privacy-focused alternative to Google, and it does maintain its own search logs.',
  },

  // ============================================================
  // Topic 5: Social Media Intelligence — SOCMINT (chapterId: 5)
  // ============================================================
  {
    id: 't5-q1',
    chapterId: 5,
    question:
      'What is the primary risk of relying solely on a platform\'s official API for social media intelligence collection?',
    options: [
      'Platform APIs impose rate limits, restrict access to certain data fields (like deleted posts or private interactions), and can change or be revoked without notice — creating gaps in collection coverage',
      'APIs provide too much data, making analysis impossible',
      'APIs are always more expensive than manual browsing',
      'APIs only return data in XML format, which is difficult to process',
    ],
    answer: 0,
    explanation:
      'While platform APIs provide structured, reliable data access, they come with significant limitations. Rate limits restrict how much data can be collected in a given timeframe. APIs typically do not expose deleted content, some metadata, or private interactions. Platforms can deprecate API endpoints, change access policies (as Twitter/X did in 2023), or revoke access entirely. Robust SOCMINT strategies combine API access with other collection methods to compensate for these limitations.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'In network mapping of social media connections, what insight does analyzing "bridging nodes" (users who connect otherwise separate communities) provide?',
    options: [
      'Bridging nodes are always bot accounts that should be filtered out of analysis',
      'Bridging nodes represent inactive accounts that artificially inflate the network size',
      'Bridging nodes indicate users who may serve as key information brokers, influencers, or coordination points between different groups — making them high-value intelligence targets',
      'Bridging nodes only appear in networks with more than 10,000 users',
    ],
    answer: 2,
    explanation:
      'In social network analysis, bridging nodes (also called "brokers" or nodes with high betweenness centrality) connect otherwise disconnected communities. These users are strategically significant because they control information flow between groups, may coordinate activities across communities, and often have outsized influence relative to their follower count. They are not necessarily bots or inactive accounts — they are real users occupying structurally important positions in the network.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'When analyzing a social media profile for OSINT, which combination of indicators is most useful for assessing whether an account is authentic or a sock puppet?',
    options: [
      'Only the number of followers — accounts with many followers are always authentic',
      'Account creation date, posting frequency patterns, language consistency, profile photo originality (reverse image search), follower/following ratio, and interaction patterns with other accounts',
      'Only the display name and bio — if they look professional, the account is real',
      'The platform\'s blue verification checkmark, which guarantees the account is a real person',
    ],
    answer: 1,
    explanation:
      'Assessing account authenticity requires examining multiple behavioral and technical indicators together. Account age, posting patterns (do they post at consistent times suggesting a real timezone?), language and topic consistency, whether the profile photo appears elsewhere online, the ratio of followers to following, and whether the account has genuine interactions or only broadcasts — all contribute to the assessment. No single indicator is definitive. Follower count can be inflated, bios can be fabricated, and verification checkmarks (especially after policy changes on platforms like X) do not guarantee authenticity.',
  },

  // ============================================================
  // Topic 6: Domain & Infrastructure Recon (chapterId: 6)
  // ============================================================
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'What information can Certificate Transparency (CT) logs reveal that traditional WHOIS lookups cannot?',
    options: [
      'CT logs reveal the physical location of the server hosting a domain',
      'CT logs contain the full content of encrypted HTTPS communications',
      'CT logs expose all SSL/TLS certificates issued for a domain, including certificates for subdomains — potentially revealing internal hostnames, staging environments, and infrastructure that the organization has not publicly disclosed',
      'CT logs show the domain registrant\'s payment information',
    ],
    answer: 2,
    explanation:
      'Certificate Transparency logs are public, append-only records of every SSL/TLS certificate issued by participating Certificate Authorities. By searching CT logs (via tools like crt.sh), analysts can discover subdomains and hostnames that an organization may not have intended to publicize — such as internal tools (jira.internal.example.com), staging environments (staging-api.example.com), or shadow IT services. WHOIS provides registrant information but does not reveal this subdomain-level detail. CT logs do not contain communication content or payment data.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'Why might historical WHOIS data be more valuable than current WHOIS data for an OSINT investigation?',
    options: [
      'Historical WHOIS data is always more accurate because it was verified at the time of registration',
      'Historical data is free while current WHOIS lookups require payment',
      'Current WHOIS data may be redacted or privacy-protected, but historical records from before GDPR or before privacy services were applied may reveal the original registrant\'s name, email, phone number, and address',
      'Historical WHOIS data includes the server\'s IP address history, while current data does not',
    ],
    answer: 2,
    explanation:
      'After GDPR took effect in 2018, many registrars began redacting personal information from WHOIS records. Additionally, domain owners can retroactively apply WHOIS privacy services. However, historical WHOIS databases (from services like DomainTools or SecurityTrails) preserve snapshots of records as they existed at the time of each lookup — potentially capturing personal details from before privacy protections were applied. This makes historical WHOIS an invaluable OSINT resource for identifying domain owners who have since hidden their information.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question:
      'An analyst discovers that multiple seemingly unrelated domains resolve to the same IP address and share the same nameservers. What can be inferred?',
    options: [
      'Nothing — many domains share hosting infrastructure coincidentally through shared hosting providers',
      'The domains are definitely owned by the same individual or organization',
      'The domains are part of a botnet and should be reported to law enforcement immediately',
      'The shared infrastructure is a strong indicator of a relationship between the domains, but the analyst must corroborate with additional evidence (WHOIS data, content analysis, certificate overlap) because shared hosting can be coincidental',
    ],
    answer: 3,
    explanation:
      'Shared IP addresses and nameservers are a useful pivot point for discovering related infrastructure, but they are not conclusive proof of common ownership. Many websites use shared hosting, CDNs, or cloud providers that place unrelated sites on the same infrastructure. The analyst should treat this as a lead and corroborate with additional evidence: do the WHOIS records share registrant details? Do the SSL certificates overlap? Is the website content related? Do analytics tracking codes match? Multiple corroborating indicators strengthen the inference of a relationship.',
  },

  // ============================================================
  // Topic 7: Geospatial Intelligence — GEOINT (chapterId: 7)
  // ============================================================
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'When geolocating a photograph using visual clues, which combination of environmental indicators is most reliable?',
    options: [
      'The brightness and color saturation of the image',
      'Sun position (shadow direction/length indicating latitude and time), vegetation type (climate zone), language on visible signage, architectural style, road markings/driving side, and visible landmarks that can be cross-referenced with mapping tools',
      'The file size of the image, which correlates with the camera\'s GPS accuracy',
      'The number of people visible in the photo, which indicates population density',
    ],
    answer: 1,
    explanation:
      'Geolocation from imagery relies on cross-referencing multiple environmental indicators. Shadow analysis can narrow latitude and time of day. Vegetation, terrain, and weather conditions indicate climate zones. Signage language, scripts, and even phone number formats point to specific countries or regions. Architectural styles, road markings, and utility infrastructure vary by region. Combining these indicators and cross-referencing with satellite imagery and street view narrows the location progressively. Image brightness and file size are not reliable geolocation indicators.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'What advantage does chronolocating an image (determining when it was taken) provide in addition to geolocating it?',
    options: [
      'Chronolocation reveals the camera model used to take the photograph',
      'Chronolocation automatically determines the photographer\'s identity',
      'Chronolocation establishes a temporal context that can corroborate or disprove claims about when an event occurred, verify the timeline of incidents, and help distinguish between current events and recycled old imagery being presented as new',
      'Chronolocation is only useful for artistic purposes and has no investigative value',
    ],
    answer: 2,
    explanation:
      'Chronolocation — determining when a photo or video was captured — is critical for verification. By analyzing shadow angles (which change predictably with time and date), visible celestial bodies, seasonal vegetation, weather conditions (cross-referenced with historical weather data), and visible clocks or timestamps, analysts can estimate when content was created. This is essential for debunking recycled imagery (old photos presented as current events), verifying witness timelines, and establishing sequences of events in investigations.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'How has the proliferation of commercial satellite imagery services (like Planet Labs and Maxar) changed OSINT geospatial capabilities?',
    options: [
      'Commercial satellite services have democratized access to high-resolution, frequently updated imagery — enabling OSINT analysts to independently monitor construction sites, military movements, environmental changes, and disaster impacts without relying on government sources',
      'Commercial satellites have replaced government intelligence satellites entirely',
      'Commercial imagery has not significantly impacted OSINT because the resolution is too low for useful analysis',
      'Commercial satellites only capture imagery of oceans, limiting their OSINT utility',
    ],
    answer: 0,
    explanation:
      'The commercial satellite revolution has been transformative for OSINT. Services like Planet Labs provide near-daily global coverage, while Maxar offers sub-meter resolution. This allows OSINT analysts to independently verify events, monitor changes over time (construction, troop movements, environmental damage), and corroborate or challenge official narratives. Previously, this capability was exclusive to government intelligence agencies with classified satellite systems. Commercial imagery has not replaced government satellites but has dramatically expanded who can perform geospatial analysis.',
  },

  // ============================================================
  // Topic 8: Image & Video Analysis (chapterId: 8)
  // ============================================================
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'What can EXIF metadata embedded in a photograph reveal, and why is its absence also informative?',
    options: [
      'EXIF data only contains the camera model and has no other investigative value',
      'EXIF data is encrypted and cannot be read without the photographer\'s permission',
      'EXIF data is only present in JPEG files and never in PNG or other formats',
      'EXIF metadata can reveal GPS coordinates, camera/phone model, date/time, lens settings, and sometimes software edits — while its absence (stripped metadata) suggests the image was processed through a platform or tool that removes metadata, indicating it is not the original upload',
    ],
    answer: 3,
    explanation:
      'EXIF (Exchangeable Image File Format) metadata can contain a wealth of investigative data: GPS coordinates where the photo was taken, device make/model, exact date and time, camera settings (aperture, shutter speed, ISO), and even editing software used. When EXIF data is missing, it indicates the image was likely shared through a platform that strips metadata (social media, messaging apps) or was deliberately sanitized — meaning the analyst is not looking at the original file and should seek the earliest available version. EXIF exists in multiple formats, not just JPEG.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'A reverse image search on a photograph returns results showing the same image appeared online two years before the event it supposedly documents. What does this indicate?',
    options: [
      'The image is likely being recycled or misattributed — the photograph predates the claimed event and is being used out of its original context, which is a common disinformation tactic',
      'The image must have been taken with a camera that had its date set incorrectly',
      'Search engines always show the most recent results first, so the older results are errors',
      'This is normal because all images are reposted multiple times across the internet',
    ],
    answer: 0,
    explanation:
      'When reverse image search reveals that an image existed well before the event it allegedly depicts, this is a strong indicator of image recycling — a common disinformation technique where old photographs are presented as evidence of current events. This technique exploits the emotional impact of compelling imagery to mislead audiences. The analyst should document the earliest appearance, compare the original context with the current claim, and flag the discrepancy. While images do get reposted, a two-year gap with a specific false attribution is a red flag, not normal sharing.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'Which technique is most effective for detecting AI-generated or deepfake images at scale?',
    options: [
      'Manually examining every image pixel-by-pixel for inconsistencies',
      'Using a combination of Error Level Analysis (ELA) for compression artifacts, examining fine details (hands, text, reflections, teeth) for AI hallmarks, and deploying machine learning classifiers trained to detect synthetic media patterns',
      'Checking if the image has a watermark, since all AI-generated images are watermarked',
      'Converting the image to black and white, which always reveals manipulation',
    ],
    answer: 1,
    explanation:
      'Detecting AI-generated imagery requires a multi-layered approach. Error Level Analysis reveals inconsistent compression levels that indicate manipulation. AI-generated images often contain telltale artifacts in fine details — malformed hands, inconsistent text, mismatched reflections, and irregular teeth. ML-based detection tools (like those from Hive, Sensity, or Microsoft) analyze statistical patterns unique to generative models. No single technique is sufficient: ELA can miss sophisticated fakes, not all AI images are watermarked, manual pixel inspection does not scale, and color conversion does not reliably reveal synthesis.',
  },

  // ============================================================
  // Topic 9: Data Correlation & Link Analysis (chapterId: 9)
  // ============================================================
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'What is entity resolution in the context of OSINT, and why is it challenging?',
    options: [
      'Entity resolution is the process of determining the legal ownership of a business entity through government registries',
      'Entity resolution refers to increasing the pixel resolution of images to identify people in photographs',
      'Entity resolution is the process of determining whether different data records refer to the same real-world entity (person, organization, device) — it is challenging because the same entity may appear with different names, aliases, transliterations, or identifiers across different sources',
      'Entity resolution is the process of removing duplicate entries from a database, which is always straightforward',
    ],
    answer: 2,
    explanation:
      'Entity resolution (also called record linkage or deduplication) is the process of determining whether different data records from different sources refer to the same real-world entity. In OSINT, this is challenging because a person may use multiple names, aliases, or transliterations across different languages. Organizations may operate under subsidiary names, and IP addresses or devices may be shared. Effective entity resolution requires matching across multiple attributes (names, dates, locations, phone numbers) while accounting for typos, format differences, and intentional obfuscation.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'When building a link analysis graph for an OSINT investigation, what does a "cluster" of highly interconnected nodes typically represent?',
    options: [
      'A group of entities with strong mutual relationships — such as members of the same organization, participants in the same event, or devices on the same network — which often represents a cohesive unit worthy of focused investigation',
      'A visualization error that should be corrected by spreading the nodes apart',
      'Duplicate data entries that need to be merged into a single node',
      'Random noise in the dataset that should be filtered out before analysis',
    ],
    answer: 0,
    explanation:
      'In graph-based link analysis, clusters (communities) of tightly interconnected nodes indicate groups of entities with strong mutual relationships. These clusters often correspond to real-world organizational structures, social groups, or operational cells. Identifying these clusters helps analysts understand the structure of networks under investigation, identify key members, and discover the boundaries between different groups. While some clusters may contain duplicates, dismissing them as errors or noise means potentially missing critical organizational intelligence.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question:
      'Why is timeline reconstruction a critical step in OSINT data correlation?',
    options: [
      'Timelines are only useful for creating visually appealing reports and have no analytical value',
      'Timelines automatically determine which events are most important based on their date',
      'Timeline reconstruction is only applicable to cybersecurity investigations, not general OSINT',
      'Timeline reconstruction reveals temporal patterns, sequences of events, and potential causal relationships — exposing whether actions were coordinated, identifying windows of opportunity, and highlighting gaps where evidence is missing',
    ],
    answer: 3,
    explanation:
      'Timeline reconstruction is a powerful analytical technique that arranges events chronologically to reveal patterns invisible in unstructured data. By mapping when events occurred relative to each other, analysts can identify coordination (multiple actors taking action within minutes), establish sequences that suggest causation, detect anomalies (unusual activity at odd hours), and pinpoint gaps where evidence should exist but is missing. Timelines apply to any OSINT investigation — from tracking financial fraud to documenting human rights violations to analyzing disinformation campaigns.',
  },

  // ============================================================
  // Topic 10: Verification & Fact-Checking (chapterId: 10)
  // ============================================================
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'What does "multi-source corroboration" mean in OSINT verification, and why is a single source insufficient?',
    options: [
      'It means using multiple search engines to find the same information, which is sufficient because all search engines index independent data',
      'It means asking multiple analysts to review the same single source to see if they agree',
      'It means collecting data from at least two social media platforms, regardless of whether the data is independent',
      'It means verifying a claim by finding independent evidence from multiple unrelated sources — a single source is insufficient because it could be fabricated, biased, mistaken, or part of a coordinated disinformation campaign',
    ],
    answer: 3,
    explanation:
      'Multi-source corroboration requires finding independent evidence from sources that do not share a common origin. A single source can be wrong, fabricated, or deliberately misleading. Even multiple sources that trace back to the same original report do not constitute true corroboration — they may just be amplifying the same error or disinformation. Genuine corroboration requires sources that independently observed or documented the same event or fact, such as combining satellite imagery with on-the-ground photographs from different photographers and official records.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'How should an OSINT analyst evaluate the reliability of a source using the Admiralty/NATO system?',
    options: [
      'By checking only whether the source has been cited by major news outlets',
      'By independently rating both the source reliability (A-F scale based on track record, expertise, and potential bias) and the information credibility (1-6 scale based on corroboration and plausibility) — keeping these two assessments separate',
      'By counting the number of followers or subscribers the source has online',
      'By assuming all government sources are reliable and all non-government sources are unreliable',
    ],
    answer: 1,
    explanation:
      'The Admiralty (NATO) system evaluates intelligence on two independent scales: source reliability (A = completely reliable, through F = reliability cannot be judged, based on the source\'s track record, access, and potential biases) and information credibility (1 = confirmed, through 6 = truth cannot be judged, based on corroboration and logical consistency). Keeping these separate is crucial — a highly reliable source can occasionally provide unconfirmed information (A-3), and an unknown source might provide confirmed facts (F-1). Follower count, news citations, and government affiliation do not map to this systematic framework.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'A viral video appears to show a specific event, but the analyst suspects it may be manipulated. Which verification steps should be performed first?',
    options: [
      'Share the video with colleagues on social media to crowd-source verification',
      'Assume the video is fake and discard it from the investigation',
      'Perform reverse video/frame search to find the original source, check metadata for timestamps and device info, analyze the audio for inconsistencies, look for visual artifacts indicating editing, and attempt to geolocate and chronolocate the scene using visible landmarks and environmental conditions',
      'Contact the uploader directly and ask if the video is authentic',
    ],
    answer: 2,
    explanation:
      'Systematic video verification involves multiple parallel techniques. Reverse searching key frames helps find the original upload and any earlier versions. Metadata analysis can reveal creation date, device, and editing software. Audio analysis detects splices, overdubs, or mismatched ambient sounds. Visual analysis identifies editing artifacts, inconsistent lighting, or perspective errors. Geolocation and chronolocation using landmarks, shadows, and weather conditions independently verify the claimed location and time. Sharing on social media risks amplifying potential disinformation, and discarding evidence without analysis wastes potential intelligence.',
  },

  // ============================================================
  // Topic 11: Dark Web & Deep Web Intelligence (chapterId: 11)
  // ============================================================
  {
    id: 't11-q1',
    chapterId: 11,
    question:
      'What is the key technical difference between the "deep web" and the "dark web"?',
    options: [
      'The deep web is any content not indexed by standard search engines (behind logins, paywalls, databases), while the dark web specifically refers to content accessible only through overlay networks like Tor that provide anonymity — the dark web is a subset of the deep web',
      'The deep web is larger than the dark web, which is the only meaningful difference',
      'The dark web is illegal while the deep web is legal',
      'The deep web requires special software to access while the dark web is accessible through any browser',
    ],
    answer: 0,
    explanation:
      'The deep web encompasses all web content not indexed by search engines — including email inboxes, bank accounts, private databases, and subscription content. The dark web is a specific subset of the deep web that requires overlay network software (like Tor, I2P, or Freenet) to access, providing anonymity to both users and service operators through onion routing. The dark web is not inherently illegal — it also hosts legitimate privacy tools, journalism platforms, and censorship-circumvention services. The deep web is accessed through standard browsers but requires authentication.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'Why are paste sites (like Pastebin) valuable targets for OSINT monitoring, and what type of intelligence can be found there?',
    options: [
      'Paste sites are only used for sharing code snippets and have no intelligence value',
      'Paste sites are frequently used to dump leaked credentials, stolen data, malware configurations, hacker communications, and data breach previews — monitoring them provides early warning of compromises and insight into threat actor activities',
      'Paste sites automatically verify all uploaded content, making them the most reliable OSINT source',
      'Paste sites are part of the dark web and can only be accessed through Tor',
    ],
    answer: 1,
    explanation:
      'Paste sites serve as anonymous, temporary publishing platforms and are widely used by threat actors to share leaked databases, credential dumps, malware command-and-control configurations, proof-of-compromise data, and communications. Monitoring paste sites provides early warning of data breaches (attackers often post previews before full dumps), reveals threat actor TTPs, and can expose compromised credentials before they are widely exploited. Most paste sites are on the regular web (not requiring Tor), and they do not verify content — making them a mix of legitimate and malicious content.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'What are the primary OPSEC risks an analyst faces when conducting research on dark web marketplaces?',
    options: [
      'There are no OPSEC risks because Tor provides complete anonymity',
      'The only risk is legal liability — there are no technical risks',
      'The only risk is slow internet speeds due to Tor\'s routing',
      'Risks include browser exploitation (malicious JavaScript targeting Tor Browser vulnerabilities), correlation attacks that could deanonymize the analyst, malware downloads disguised as marketplace content, and potential legal exposure if the analyst inadvertently accesses illegal material or is mistaken for a participant',
    ],
    answer: 3,
    explanation:
      'Dark web research carries significant OPSEC risks on multiple fronts. Technically, Tor Browser vulnerabilities have been exploited (e.g., the FBI\'s NIT deployment against Freedom Hosting). Correlation attacks can deanonymize users by matching Tor entry/exit traffic patterns. Marketplaces may host malware-laced content. Legally, accessing certain content or being identified on a marketplace can create legal exposure. Analysts must use dedicated VMs, keep Tor Browser updated, never enable JavaScript on untrusted sites, use bridges to hide Tor usage from ISPs, and maintain strict operational procedures. Tor reduces but does not eliminate anonymity risks.',
  },

  // ============================================================
  // Topic 12: Threat Intelligence & CTI (chapterId: 12)
  // ============================================================
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'What is the relationship between Indicators of Compromise (IOCs) and Tactics, Techniques, and Procedures (TTPs) in threat intelligence?',
    options: [
      'IOCs and TTPs are interchangeable terms for the same concept',
      'IOCs are more valuable than TTPs because they can be directly blocked by firewalls',
      'TTPs are only relevant to nation-state actors, while IOCs apply to all threats',
      'IOCs are specific, observable artifacts (IP addresses, file hashes, domain names) that indicate a compromise has occurred, while TTPs describe the behavioral patterns and methods used by threat actors — TTPs are harder to change and therefore more durable for long-term threat tracking',
    ],
    answer: 3,
    explanation:
      'IOCs (Indicators of Compromise) are concrete, technical artifacts: malicious IP addresses, file hashes, domain names, registry keys, or email addresses. They are valuable for immediate detection but are easily changed by attackers (rotating IPs, recompiling malware). TTPs (Tactics, Techniques, and Procedures) describe how an attacker operates — their behavioral patterns, preferred attack vectors, and methodologies. TTPs are harder to change because they reflect the attacker\'s capabilities and habits. The Pyramid of Pain illustrates this: blocking IOCs causes minor inconvenience to attackers, while detecting TTPs forces them to fundamentally change their approach.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'How does the MITRE ATT&CK framework enhance OSINT-driven threat intelligence?',
    options: [
      'MITRE ATT&CK provides a standardized taxonomy of adversary tactics and techniques based on real-world observations — enabling analysts to map threat actor behavior to a common framework, identify coverage gaps, and compare different threat groups systematically',
      'MITRE ATT&CK is a vulnerability scanning tool that automatically detects threats',
      'MITRE ATT&CK replaces the need for human analysts by automating all threat intelligence functions',
      'MITRE ATT&CK is only applicable to Windows-based threats and does not cover cloud or Linux environments',
    ],
    answer: 0,
    explanation:
      'MITRE ATT&CK is a knowledge base of adversary behavior organized by tactics (the "why" — objectives like Initial Access, Persistence, Exfiltration) and techniques (the "how" — specific methods like Spearphishing, DLL Side-Loading, DNS Tunneling). For OSINT analysts, it provides a common language to describe and compare threat actor behavior, map observed TTPs to known groups, identify defensive gaps, and prioritize security investments. It is not a tool or scanner — it is a framework. It covers Windows, Linux, macOS, cloud, mobile, and ICS environments.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'What distinguishes strategic threat intelligence from tactical threat intelligence, and who consumes each?',
    options: [
      'Strategic intelligence is always classified while tactical intelligence is always public',
      'Strategic intelligence focuses on past events while tactical intelligence only addresses future threats',
      'Strategic intelligence provides high-level analysis of threat trends, geopolitical motivations, and risk forecasts for executive decision-makers, while tactical intelligence provides specific technical indicators (IOCs, signatures, detection rules) consumed by security operations teams for immediate defensive action',
      'There is no meaningful distinction — both serve the same audience and purpose',
    ],
    answer: 2,
    explanation:
      'Strategic threat intelligence addresses the "big picture" — who is targeting your industry, why, what trends are emerging, and how the threat landscape is evolving. It is consumed by executives, board members, and risk managers to inform strategy and resource allocation. Tactical threat intelligence provides actionable technical details — specific IOCs, malware signatures, detection rules, and vulnerability information — consumed by SOC analysts, incident responders, and security engineers for immediate operational use. Both can be derived from OSINT sources and both can be classified or unclassified.',
  },

  // ============================================================
  // Topic 13: OSINT Automation & Tooling (chapterId: 13)
  // ============================================================
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'What is the primary advantage of using a framework like Maltego or SpiderFoot over manual OSINT collection?',
    options: [
      'These frameworks guarantee 100% accuracy of all collected data',
      'These frameworks can access classified databases that are not available through manual methods',
      'These frameworks automate the collection and correlation of data from multiple sources simultaneously, visualize relationships through interactive graphs, and enable repeatable investigative workflows — dramatically reducing the time required for comprehensive reconnaissance',
      'These frameworks eliminate the need for human analysis entirely',
    ],
    answer: 2,
    explanation:
      'OSINT frameworks like Maltego and SpiderFoot automate the tedious process of querying multiple data sources, correlating results, and visualizing relationships. Maltego\'s "transform" system automatically enriches entities by querying DNS records, WHOIS databases, social media, and other sources in a visual graph. SpiderFoot runs hundreds of modules against a target simultaneously. This automation enables analysts to cover more ground in less time and discover connections that might be missed manually. However, these tools do not guarantee accuracy (they aggregate data that may be incorrect), cannot access classified sources, and still require human analysis to interpret results.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'When building custom OSINT scripts, what is the most important consideration for long-term reliability?',
    options: [
      'Writing the script in the fastest programming language available',
      'Building robust error handling, respecting API rate limits, implementing retry logic, and designing the script modularly so that individual data source modules can be updated independently when APIs or websites change — because external sources frequently change without notice',
      'Making the script as complex as possible to handle every edge case',
      'Minimizing the number of lines of code to reduce the chance of bugs',
    ],
    answer: 1,
    explanation:
      'The biggest challenge with custom OSINT tooling is that external data sources are constantly changing. Websites redesign, APIs deprecate endpoints, rate limits change, and new authentication requirements appear. Robust OSINT scripts must handle these changes gracefully: modular architecture allows updating individual source modules without rewriting the entire tool, error handling prevents one broken source from crashing the entire collection pipeline, rate limiting avoids getting blocked, and retry logic handles transient failures. Code brevity and execution speed are secondary to reliability and maintainability.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'Why should OSINT practitioners be cautious when using third-party APIs for data collection?',
    options: [
      'Third-party APIs are always slower than scraping websites directly',
      'Third-party APIs are illegal to use for OSINT purposes in all jurisdictions',
      'Third-party APIs only provide data in proprietary formats that cannot be integrated with other tools',
      'Third-party APIs may log your queries (revealing investigation targets to the API provider), impose restrictive terms that limit how collected data can be used, introduce a single point of failure if the service goes offline, and vary in data freshness and accuracy — requiring the analyst to understand and manage these dependencies',
    ],
    answer: 3,
    explanation:
      'Third-party APIs present several risks that analysts must manage. Query logging means the API provider can see exactly what (or whom) you are investigating — a significant OPSEC concern. Terms of service may restrict data retention, sharing, or use in investigations. API availability is outside the analyst\'s control — if the service goes down or changes its terms, the investigation is impacted. Data quality varies between providers and may not reflect real-time information. Smart practitioners diversify their sources, understand each API\'s limitations and logging policies, and maintain fallback collection methods.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
