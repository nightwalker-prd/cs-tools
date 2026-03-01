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
  // Topic 1: BBS, Usenet & Early File Sharing (chapterId: 1)
  // ============================================================
  {
    id: 't1-q1',
    chapterId: 1,
    question:
      'What encoding scheme was used to transmit binary files through Usenet\'s text-only protocol, and what was its overhead?',
    options: [
      'gzip compression with 10% overhead',
      'uuencoding and later Base64/MIME, adding approximately 33% overhead to file sizes',
      'ROT13 encoding with zero overhead',
      'Huffman coding with 15% overhead',
    ],
    answer: 1,
    explanation:
      'Usenet was designed for text-only discussions, so binary files had to be encoded as ASCII text. uuencoding was the original scheme, later replaced by Base64 via MIME. Both added approximately 33% to file sizes because they encode 3 bytes of binary data as 4 ASCII characters.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question:
      'What technology was developed specifically to handle missing parts in multi-part Usenet binary posts?',
    options: [
      'TCP retransmission',
      'RAID-5 parity striping',
      'PAR/PAR2 files using Reed-Solomon error correction',
      'FEC (Forward Error Correction) headers',
    ],
    answer: 2,
    explanation:
      'PAR (Parity Archive) and PAR2 files provided Reed-Solomon error correction for multi-part Usenet posts. If some parts were missing or corrupted during propagation across Usenet servers, PAR2 files could reconstruct the missing data — a direct precursor to modern erasure coding in distributed storage systems.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question:
      'Which file transfer protocol innovation, driven by large binary downloads on BBS systems, introduced the ability to resume interrupted transfers?',
    options: [
      'XMODEM introduced error correction',
      'YMODEM introduced batch transfers',
      'ZMODEM introduced crash recovery and resume capability',
      'Kermit introduced variable packet sizes',
    ],
    answer: 2,
    explanation:
      'ZMODEM\'s crash recovery feature allowed interrupted file transfers to resume from where they left off rather than starting over. This was critical for large binary downloads over unreliable dial-up connections, where a disconnection near the end of a long transfer would otherwise waste hours of connect time.',
  },

  // ============================================================
  // Topic 2: Web 1.0 Monetization Pioneers (chapterId: 2)
  // ============================================================
  {
    id: 't2-q1',
    chapterId: 2,
    question:
      'Why did adult content companies build their own payment processing infrastructure rather than using mainstream processors?',
    options: [
      'Mainstream processors were too slow for real-time transactions',
      'Mainstream processors refused to serve adult content merchants, forcing the industry to build specialized processors like CCBill and Epoch',
      'Adult sites needed cryptocurrency support that mainstream processors lacked',
      'Mainstream processors could not handle international currencies',
    ],
    answer: 1,
    explanation:
      'Major payment processors and banks initially refused to provide merchant accounts to adult content companies due to reputational concerns and high fraud rates. This forced the industry to build specialized payment processors (CCBill, Epoch, Segpay) that developed advanced fraud prevention, recurring billing, and chargeback management systems — many of which were later adopted by mainstream e-commerce.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question:
      'What fundamental SaaS business metric was first quantified by adult affiliate marketers?',
    options: [
      'Monthly Active Users (MAU)',
      'Net Promoter Score (NPS)',
      'Customer Lifetime Value (LTV) vs. Customer Acquisition Cost (CAC)',
      'Daily Active Users / Monthly Active Users ratio (DAU/MAU)',
    ],
    answer: 2,
    explanation:
      'Adult affiliate marketers needed to calculate how much they could afford to pay affiliates for each new subscriber. This required understanding the lifetime value of a customer (LTV) and comparing it to the cost of acquiring that customer (CAC). This LTV:CAC ratio became the fundamental unit economics metric for SaaS businesses, but it was being calculated in the adult subscription industry years before the term "SaaS" was coined.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question:
      'Which tracking mechanism, pioneered by adult affiliate networks, became the technical foundation of digital advertising attribution?',
    options: [
      'Server-side log analysis',
      'Cookie-based tracking with sub-IDs and pixel tracking for cross-site conversion attribution',
      'UTM parameters in URLs',
      'Referrer header parsing',
    ],
    answer: 1,
    explanation:
      'Adult affiliate programs developed sophisticated cookie-based tracking systems that could attribute conversions across complex referral chains. Sub-IDs allowed affiliates to track which specific traffic sources generated conversions, while conversion pixels (1x1 tracking images) fired on signup pages to record conversions. These mechanisms became the technical foundation of all digital advertising attribution.',
  },

  // ============================================================
  // Topic 3: Bandwidth & Compression Demand (chapterId: 3)
  // ============================================================
  {
    id: 't3-q1',
    chapterId: 3,
    question:
      'What image loading technique, popularized by adult gallery sites, is now a native browser feature via the loading="lazy" HTML attribute?',
    options: [
      'Progressive JPEG rendering',
      'Lazy loading — deferring image loading until the user scrolls near them',
      'Responsive images via srcset',
      'WebP format auto-conversion',
    ],
    answer: 1,
    explanation:
      'Lazy loading defers the loading of off-screen images until the user scrolls near them, dramatically reducing initial page load time and bandwidth usage. Adult gallery pages with hundreds of thumbnails pioneered this technique because loading all images at once was impractical. It became standardized as the loading="lazy" HTML attribute supported by all modern browsers.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question:
      'Why was progressive JPEG encoding particularly valuable for early web image delivery?',
    options: [
      'It produced smaller file sizes than standard JPEG',
      'It loaded images in increasing quality passes, providing immediate low-quality previews while the full image loaded over slow connections',
      'It supported transparency like PNG',
      'It enabled lossless compression',
    ],
    answer: 1,
    explanation:
      'Progressive JPEG encodes the image in multiple passes of increasing quality. On slow connections, users see a blurry version of the entire image almost immediately, which progressively sharpens as more data arrives. This is perceptually much better than standard JPEG, which renders top-to-bottom — progressive encoding was popularized by image-heavy sites that needed to provide immediate visual feedback.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question:
      'What encoding approach, pioneered for video delivery to users on varying connection speeds, became the foundation for modern adaptive streaming?',
    options: [
      'Variable bitrate encoding (VBR) within a single file',
      'Multi-bitrate encoding — producing the same video at several quality levels for selection based on bandwidth',
      'Constant quality encoding using CRF',
      'Two-pass encoding for optimal bit allocation',
    ],
    answer: 1,
    explanation:
      'Multi-bitrate encoding produces the same video at multiple quality levels (e.g., 240p, 480p, 720p, 1080p). The client selects the appropriate quality based on available bandwidth. This approach became the universal standard for HTTP-based adaptive bitrate streaming in HLS and DASH, where the manifest file lists available quality variants.',
  },

  // ============================================================
  // Topic 4: Streaming Video Pioneers (chapterId: 4)
  // ============================================================
  {
    id: 't4-q1',
    chapterId: 4,
    question:
      'Which streaming protocol, originally built into Adobe Flash, became the standard ingest protocol for live streaming and is still used by OBS and Streamlabs today?',
    options: [
      'HLS (HTTP Live Streaming)',
      'MPEG-DASH',
      'RTMP (Real Time Messaging Protocol)',
      'WebRTC',
    ],
    answer: 2,
    explanation:
      'RTMP (Real Time Messaging Protocol) was developed by Macromedia for Flash and became the dominant protocol for both live and on-demand streaming. Adult live streaming platforms were heavy users of RTMP. Despite Flash Player\'s death, RTMP remains the standard ingest protocol — OBS, Streamlabs, and most live streaming software send RTMP to platforms like Twitch and YouTube, which then transcode to HLS/DASH for delivery.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question:
      'What technique allows streaming video quality to dynamically adjust during playback based on available bandwidth?',
    options: [
      'Content negotiation via HTTP Accept headers',
      'Adaptive bitrate streaming — monitoring buffer levels and bandwidth to switch between pre-encoded quality tiers',
      'Server-side transcoding in real time to match the client\'s bandwidth',
      'Progressive download with bandwidth throttling',
    ],
    answer: 1,
    explanation:
      'Adaptive bitrate streaming works by encoding video into multiple quality tiers and splitting each into small segments. The client monitors buffer health and estimated bandwidth, switching to higher or lower quality segments as conditions change. This approach was pioneered by early streaming platforms and became standardized in HLS (Apple) and DASH (MPEG).',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question:
      'What was a key engineering advantage of Flash-based video that delayed the transition to HTML5 video?',
    options: [
      'Flash supported higher video resolutions than HTML5',
      'Flash provided DRM through RTMPE (encrypted RTMP) — HTML5 lacked equivalent content protection until Encrypted Media Extensions (EME)',
      'Flash had better video compression algorithms',
      'Flash supported more video codecs than HTML5',
    ],
    answer: 1,
    explanation:
      'Flash provided content protection through RTMPE (encrypted RTMP) and SWF verification, making it difficult to download streams. HTML5 video initially had no DRM capability, which was unacceptable for paid content platforms. The development of Encrypted Media Extensions (EME) with Widevine, FairPlay, and PlayReady finally gave HTML5 video equivalent content protection, enabling the Flash-to-HTML5 migration.',
  },

  // ============================================================
  // Topic 5: Content Delivery Networks (chapterId: 5)
  // ============================================================
  {
    id: 't5-q1',
    chapterId: 5,
    question:
      'What caching architecture, developed for media delivery, uses hot content at edge PoPs, warm content at regional hubs, and cold content at origin?',
    options: [
      'Flat caching with LRU eviction',
      'Tiered caching — a multi-level hierarchy optimizing cache hit rates against storage costs',
      'Write-through caching with synchronous replication',
      'Content-addressed storage with deduplication',
    ],
    answer: 1,
    explanation:
      'Tiered caching distributes content across multiple cache levels based on popularity. Frequently accessed ("hot") content is cached at edge PoPs closest to users. Less popular ("warm") content is cached at regional hubs. Rarely accessed ("cold") content is only at the origin. This architecture minimizes origin load while keeping the most popular content closest to users.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question:
      'What strategy involves proactively pushing new content to edge servers before users request it?',
    options: [
      'Cache invalidation',
      'Cache warming — pre-populating edge caches for predictable traffic spikes',
      'Cache eviction with TTL-based expiry',
      'Consistent hashing for cache distribution',
    ],
    answer: 1,
    explanation:
      'Cache warming proactively pushes content to edge caches before demand occurs. For content platforms, new releases generate predictable traffic spikes — warming ensures the first viewers get fast responses from edge caches rather than triggering cache misses that overload the origin server.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question:
      'Why did adult content platforms pioneer multi-CDN strategies?',
    options: [
      'To reduce latency to zero',
      'To achieve higher video quality',
      'For redundancy and to avoid service disruption when CDN providers blocked adult content',
      'To reduce DNS lookup times',
    ],
    answer: 2,
    explanation:
      'Adult content platforms used multiple CDN providers simultaneously for two reasons: redundancy (if one CDN failed, traffic could route to another) and policy risk (some CDNs would change their acceptable use policies to exclude adult content). Traffic was intelligently routed to the best-performing or most cost-effective CDN, a practice now common across all large-scale web services.',
  },

  // ============================================================
  // Topic 6: Peer-to-Peer Distribution (chapterId: 6)
  // ============================================================
  {
    id: 't6-q1',
    chapterId: 6,
    question:
      'What incentive mechanism in BitTorrent ensures that peers who upload more receive faster download speeds?',
    options: [
      'Proof of work',
      'Tit-for-tat reciprocity — peers preferentially upload to those who upload to them',
      'Token-based credits',
      'Centralized reputation scoring',
    ],
    answer: 1,
    explanation:
      'BitTorrent\'s tit-for-tat mechanism (also called "choking/unchoking") ensures that peers who contribute upload bandwidth receive faster downloads. Each peer preferentially sends data to peers that are uploading to it, creating a self-sustaining incentive structure. Freeloaders who don\'t upload receive slower service.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question:
      'What is the fundamental challenge of applying P2P principles to live video streaming?',
    options: [
      'Live video files are too large for P2P',
      'P2P protocols don\'t support video codecs',
      'Each relay hop adds latency, and viewer churn (joining/leaving) disrupts the distribution mesh',
      'ISPs block all P2P traffic',
    ],
    answer: 2,
    explanation:
      'In P2P live streaming, viewers relay the stream to other viewers in a tree or mesh network. Each relay hop adds propagation delay, so viewers deep in the tree experience significant latency compared to those near the source. Additionally, when relay nodes leave (viewer churn), their downstream viewers lose their feed until the mesh restructures — maintaining quality requires constant mesh management.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question:
      'How do hybrid P2P-CDN architectures decide whether to serve content via CDN or P2P?',
    options: [
      'CDN is always used for the first 10 seconds, then P2P takes over',
      'They dynamically calculate cost and performance, using P2P when many nearby peers are available and falling back to CDN otherwise',
      'Users manually select their preferred delivery method',
      'All live content uses P2P and all on-demand content uses CDN',
    ],
    answer: 1,
    explanation:
      'Hybrid architectures use intelligent routing that considers the number and proximity of available peers, content popularity, viewer bandwidth, and CDN costs. When conditions favor P2P (many nearby peers, popular content), traffic is offloaded from the CDN. When P2P would deliver poor quality (few peers, unpopular content), the CDN serves as a guaranteed fallback.',
  },

  // ============================================================
  // Topic 7: Video Codec & Transcoding Innovation (chapterId: 7)
  // ============================================================
  {
    id: 't7-q1',
    chapterId: 7,
    question:
      'What encoding approach analyzes each video\'s complexity to determine optimal bitrates, rather than using fixed bitrate targets across all content?',
    options: [
      'Constant Rate Factor (CRF) encoding',
      'Per-title encoding — tailoring the bitrate ladder to each video\'s visual complexity',
      'Variable Bitrate (VBR) encoding',
      'Constant Bitrate (CBR) encoding',
    ],
    answer: 1,
    explanation:
      'Per-title encoding analyzes each video\'s complexity (motion, detail, scene changes) to determine the optimal set of bitrate-resolution pairs. A simple, low-motion video might look great at 1080p/2Mbps while a complex, high-motion video might need 5Mbps. This approach saves storage and bandwidth without sacrificing quality. Netflix formalized this in 2015, but the principle was applied empirically by large video platforms earlier.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question:
      'Why does real-time (live) encoding typically produce files 20-40% larger than equivalent offline encoding at the same quality?',
    options: [
      'Live encoding uses older codecs',
      'Real-time constraints force faster encoding presets that sacrifice compression efficiency for speed',
      'Live streams have more keyframes',
      'Network overhead adds to the file size',
    ],
    answer: 1,
    explanation:
      'Real-time encoding must keep up with the incoming video stream, meaning the encoder cannot spend extra time optimizing compression decisions. Faster encoding presets use simpler motion estimation, fewer reference frames, and less exhaustive mode decisions. The result is larger files at the same quality compared to offline encodes that can use slower, more thorough presets.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question:
      'What approach transcodes video only when first requested rather than pre-encoding the entire catalog?',
    options: [
      'Lazy evaluation encoding',
      'Just-in-time (JIT) transcoding — encoding on-demand and caching the result',
      'Serverless encoding',
      'Client-side transcoding',
    ],
    answer: 1,
    explanation:
      'Just-in-time transcoding encodes video only when a user first requests it, then caches the result for subsequent viewers. This approach is economical for massive back-catalogs where most content is rarely accessed — pre-encoding everything would be prohibitively expensive in compute and storage. JIT transcoding lets platforms offer complete catalogs without upfront encoding investment.',
  },

  // ============================================================
  // Topic 8: Online Payment Systems (chapterId: 8)
  // ============================================================
  {
    id: 't8-q1',
    chapterId: 8,
    question:
      'What fraud detection technique, pioneered by adult payment processors, identifies unique devices based on browser properties, fonts, screen resolution, and hardware characteristics?',
    options: [
      'IP geolocation',
      'Two-factor authentication',
      'Device fingerprinting — creating a unique identifier from the combination of browser and hardware attributes',
      'CAPTCHA verification',
    ],
    answer: 2,
    explanation:
      'Device fingerprinting creates a unique identifier for each device by combining dozens of attributes: browser type and version, installed plugins and fonts, screen resolution, color depth, timezone, WebGL renderer, canvas fingerprint, and more. This allows fraud detection systems to identify when the same device is used across multiple accounts or transactions, even without cookies.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question:
      'What was the primary consequence for adult merchants who exceeded Visa/Mastercard\'s chargeback ratio threshold of approximately 1%?',
    options: [
      'Higher per-transaction fees',
      'Mandatory 3-D Secure implementation',
      'Account termination — loss of the ability to process credit card payments entirely',
      'Temporary transaction limits',
    ],
    answer: 2,
    explanation:
      'Exceeding card network chargeback thresholds could result in merchant account termination, effectively shutting down the business\'s ability to accept credit card payments. This existential threat drove adult merchants to develop the most sophisticated fraud prevention and chargeback management systems in e-commerce, as even small improvements in chargeback ratios had survival implications.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question:
      'What identity verification approach is now used by banks, crypto exchanges, and rideshare platforms but was first developed at scale for adult content age verification?',
    options: [
      'Email verification',
      'Phone number SMS verification',
      'Document-based verification — uploading government ID photos with OCR and document authentication',
      'Social login (Sign in with Google)',
    ],
    answer: 2,
    explanation:
      'Document-based identity verification, where users upload photos of government-issued IDs that are then verified using OCR, document authentication, and anti-tampering checks, was first deployed at scale for adult content age verification requirements. The same technology and service providers (Jumio, Onfido, Yoti) now serve KYC requirements across financial services, cryptocurrency, and gig economy platforms.',
  },

  // ============================================================
  // Topic 9: Privacy & Anonymity Technologies (chapterId: 9)
  // ============================================================
  {
    id: 't9-q1',
    chapterId: 9,
    question:
      'What was the primary consumer demand that transformed VPNs from a niche enterprise tool into a mass-market product?',
    options: [
      'Accessing corporate networks remotely',
      'Bypassing government censorship',
      'Privacy when browsing adult content — hiding browsing activity from ISPs and household members',
      'Protecting against public Wi-Fi attacks',
    ],
    answer: 2,
    explanation:
      'While VPN technology existed for enterprise remote access, it was consumer demand for private browsing — particularly hiding adult content access from ISPs, employers, and household members — that created the mass-market consumer VPN industry. Companies like NordVPN, ExpressVPN, and Surfshark became billion-dollar businesses primarily serving this privacy-conscious market.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question:
      'What payment model, pioneered by adult sites, introduced an abstraction layer between payment identity and content access?',
    options: [
      'Direct bank transfer',
      'Cryptocurrency payments',
      'Token/credit systems — buying site-specific virtual currency that could be spent on content',
      'Prepaid debit cards',
    ],
    answer: 2,
    explanation:
      'Token/credit systems let users purchase site-specific virtual currency (tokens, credits) that could then be spent on content or tipping. This created a privacy layer between the payment transaction (which appears as a generic token purchase) and the specific content consumed. This model directly influenced virtual currency systems in gaming (V-Bucks), social platforms (Twitch Bits), and other digital services.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question:
      'What privacy principle, now codified in GDPR, was already practiced by privacy-conscious adult platforms?',
    options: [
      'Right to portability',
      'Data minimization — collecting only essential information and implementing strong data deletion',
      'Consent management platforms',
      'Cross-border data transfer agreements',
    ],
    answer: 1,
    explanation:
      'Data minimization — collecting only the minimum personal data necessary and deleting it when no longer needed — was practiced by privacy-conscious adult platforms as a competitive advantage and risk reduction strategy. Users preferred platforms that collected less data, and operators understood that data they didn\'t have couldn\'t be breached. GDPR later codified this as a legal requirement.',
  },

  // ============================================================
  // Topic 10: Anti-Piracy & DRM (chapterId: 10)
  // ============================================================
  {
    id: 't10-q1',
    chapterId: 10,
    question:
      'How does forensic watermarking help trace the source of pirated content?',
    options: [
      'It adds a visible logo to the content',
      'It encrypts the file with a user-specific key',
      'It invisibly embeds user-specific identifiers in the content that survive transcoding, cropping, and quality degradation',
      'It adds metadata tags to the file header',
    ],
    answer: 2,
    explanation:
      'Forensic watermarking embeds unique, invisible identifiers into each user\'s copy of the content. These identifiers are embedded in the visual/audio signal itself (often in frequency-domain coefficients) and are designed to survive common transformations like transcoding, resolution changes, cropping, and screen recording. When a pirated copy surfaces, the embedded identifier reveals which user\'s copy was leaked.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question:
      'Why can perceptual hashing identify unauthorized copies of content even when the resolution, format, or encoding has changed?',
    options: [
      'It uses the file\'s MD5 hash which doesn\'t change with format conversion',
      'It generates fingerprints from visual and audio features rather than file-level hashes, so perceptually similar content produces similar hashes',
      'It compares file sizes which remain constant',
      'It reads embedded EXIF metadata that persists across formats',
    ],
    answer: 1,
    explanation:
      'Perceptual hashing algorithms (like pHash) analyze the visual or audio features of content — spatial frequencies, color distributions, temporal patterns — to generate fingerprints. Because these fingerprints are based on perceptual features rather than raw bytes, they remain similar even when the content is re-encoded, resized, or format-converted. Two visually similar videos will produce similar perceptual hashes.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question:
      'How did the shift from pay-per-download to free ad-supported streaming (tube sites) affect piracy economics?',
    options: [
      'It increased piracy because content was easier to rip from streaming',
      'It had no effect on piracy rates',
      'It reduced piracy by making legitimate access cheap and convenient, but also cannibalized paid content revenue',
      'It eliminated piracy entirely',
    ],
    answer: 2,
    explanation:
      'When legitimate content became freely available on ad-supported tube sites, the incentive to seek pirated copies decreased — why download from a piracy site when the content is free and legal on a tube site? However, this also destroyed the paid content market, as creators struggled to compete with free alternatives. This same dynamic played out in music (YouTube/Spotify) and is a fundamental tension in digital content economics.',
  },

  // ============================================================
  // Topic 11: Content Moderation at Scale (chapterId: 11)
  // ============================================================
  {
    id: 't11-q1',
    chapterId: 11,
    question:
      'What technology, used by adult platforms for legal compliance, generates a robust hash of images that survives common transformations and matches against known CSAM databases?',
    options: [
      'SHA-256 cryptographic hashing',
      'EXIF metadata analysis',
      'PhotoDNA — a perceptual hashing system that matches against NCMEC databases of known CSAM',
      'Facial recognition technology',
    ],
    answer: 2,
    explanation:
      'PhotoDNA, developed by Microsoft and Dartmouth College, generates a perceptual hash of images that survives resizing, cropping, color adjustment, and format conversion. These hashes are compared against databases of known CSAM maintained by NCMEC (National Center for Missing & Exploited Children). Adult platforms were among the first non-social-media companies to deploy PhotoDNA at scale.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question:
      'Why do content moderation systems use a hybrid human-AI approach rather than relying solely on AI classification?',
    options: [
      'AI systems are too expensive to run at scale',
      'AI pre-screens content for efficiency, but humans are needed for borderline cases that require context and nuance that AI cannot reliably assess',
      'Regulatory requirements mandate human review of all content',
      'AI can only detect text-based violations, not visual content',
    ],
    answer: 1,
    explanation:
      'AI content classification handles the volume (millions of items) but struggles with context, nuance, and edge cases. A human-in-the-loop approach uses AI to pre-screen and prioritize content for human review, with humans making final decisions on borderline cases. This balances the speed and scale of AI with the contextual judgment of human reviewers.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question:
      'What operational innovation was pioneered by adult platform trust & safety teams to address the mental health impact of reviewing disturbing content?',
    options: [
      'Fully automated content moderation to eliminate human exposure',
      'Outsourcing all moderation to third-party contractors',
      'Reviewer wellness programs — structured mental health support, session limits, and counseling for content moderators',
      'AI-based content blurring during human review',
    ],
    answer: 2,
    explanation:
      'Reviewer wellness programs provide mental health support for human content moderators who regularly review disturbing material. These programs include mandatory session limits, access to counseling services, regular wellness check-ins, and the ability to opt out of specific content categories. Adult platforms pioneered these programs due to the nature of their moderation work, and they are now recognized as essential across all content moderation operations.',
  },

  // ============================================================
  // Topic 12: Recommendation & Personalization (chapterId: 12)
  // ============================================================
  {
    id: 't12-q1',
    chapterId: 12,
    question:
      'Why did adult platforms rely on implicit feedback signals rather than explicit ratings for their recommendation engines?',
    options: [
      'Explicit rating systems were too expensive to implement',
      'Users rarely rate adult content explicitly — implicit signals like view duration, completion rate, and replay patterns provided more reliable behavioral data',
      'Privacy regulations prohibited collecting explicit ratings',
      'Explicit ratings produced too much data to process',
    ],
    answer: 1,
    explanation:
      'Users rarely provide explicit ratings (star ratings, thumbs up/down) for adult content due to the private nature of consumption. Recommendation systems instead use implicit behavioral signals: how long the user watches, whether they complete the video, whether they rewatch, how they navigate the catalog, and session patterns. These implicit signals are now the primary input for recommendation systems across all major platforms.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question:
      'What recommendation approach addresses the cold start problem for new users without viewing history?',
    options: [
      'Collaborative filtering based on similar users',
      'Content-based recommendations using tags and metadata until sufficient behavioral data accumulates',
      'Random content selection',
      'Popularity-based recommendations only',
    ],
    answer: 1,
    explanation:
      'The cold start problem occurs when there\'s insufficient user behavioral data for collaborative filtering. Content-based recommendations solve this by using content attributes (tags, metadata, categories) to suggest items similar to what the user initially selects. As the user\'s viewing history grows, the system gradually transitions to collaborative filtering which considers the behavior of similar users.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question:
      'What optimization technique uses attention heatmaps and click data to select the most engaging preview image for content?',
    options: [
      'Manual curation by editors',
      'Random frame selection from the video',
      'Thumbnail optimization — A/B testing different preview images to maximize click-through rates using attention and behavioral data',
      'AI-generated abstract thumbnails',
    ],
    answer: 2,
    explanation:
      'Thumbnail optimization involves generating multiple candidate thumbnails from a video, then using A/B testing to determine which thumbnail generates the highest click-through rate. Advanced systems use attention heatmaps (predicting where users look), facial recognition, and composition analysis to predict thumbnail performance. This science of thumbnail selection became critical for YouTube and Netflix.',
  },

  // ============================================================
  // Topic 13: Emerging Tech Adoption (chapterId: 13)
  // ============================================================
  {
    id: 't13-q1',
    chapterId: 13,
    question:
      'What VR streaming technique sends only the portion of the 360-degree sphere that the user is currently looking at?',
    options: [
      'Equirectangular projection',
      'Stereoscopic rendering',
      'View-dependent streaming (viewport-adaptive streaming) — transmitting high quality only for the visible portion',
      'Full spherical streaming with client-side cropping',
    ],
    answer: 2,
    explanation:
      'View-dependent streaming (also called viewport-adaptive streaming or foveated streaming) transmits the portion of the VR sphere the user is looking at in high quality, while the rest is sent at lower quality or not at all. This dramatically reduces bandwidth requirements (from 50+ Mbps for full sphere to 10-15 Mbps) while maintaining perceived quality. The technique was motivated by the enormous bandwidth demands of VR video.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question:
      'What open-source project standardized communication with internet-connected haptic devices across different manufacturers?',
    options: [
      'OpenHaptics SDK',
      'Buttplug.io — an open protocol abstraction layer for haptic device interoperability',
      'WebBluetooth API',
      'MQTT for IoT devices',
    ],
    answer: 1,
    explanation:
      'Buttplug.io is an open-source project that provides a standardized protocol for communicating with internet-connected haptic devices from different manufacturers. It abstracts away device-specific protocols (Bluetooth LE, Wi-Fi, USB) behind a common API, similar to how ODBC abstracts database connections. This interoperability approach influenced broader IoT protocol design.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question:
      'What content authenticity standard was partly motivated by concerns about non-consensual synthetic adult media?',
    options: [
      'DRM (Digital Rights Management)',
      'Content-Security-Policy HTTP headers',
      'C2PA (Coalition for Content Provenance and Authenticity) — a standard for verifying content origin and edit history',
      'EXIF metadata standards',
    ],
    answer: 2,
    explanation:
      'The C2PA (Coalition for Content Provenance and Authenticity) standard, backed by Adobe, Microsoft, Intel, and others, provides cryptographic provenance tracking for digital content — recording who created it, when, and what edits were made. While broadly motivated by synthetic media concerns (political deepfakes, misinformation), non-consensual synthetic adult content was a significant driver for developing content authenticity verification technology.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
