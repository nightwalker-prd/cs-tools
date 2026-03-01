export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Topic 1: Video & Audio Codecs (H.264, H.265, AV1, Opus, AAC)
  {
    id: 't1-q1',
    chapterId: 1,
    question: 'Why does H.265 (HEVC) achieve roughly 50% better compression than H.264 at the same quality, yet H.264 remains more widely deployed?',
    options: [
      'H.265 only supports resolutions up to 1080p while H.264 supports 4K',
      'H.265 uses larger Coding Tree Units (up to 64x64) and better motion prediction, but its patent licensing complexity and higher decode cost slow adoption',
      'H.264 was released after H.265 and incorporates newer techniques',
      'H.265 requires hardware acceleration that no current devices support',
    ],
    answer: 1,
    explanation: 'H.265 introduces Coding Tree Units up to 64x64 pixels (vs H.264\'s 16x16 macroblocks), advanced intra prediction modes, and improved motion compensation. However, its fragmented patent licensing landscape (multiple patent pools) and significantly higher encoding/decoding computational cost have slowed universal adoption compared to H.264.',
  },
  {
    id: 't1-q2',
    chapterId: 1,
    question: 'What distinguishes AV1 from proprietary codecs like H.264 and H.265 in terms of the streaming industry?',
    options: [
      'AV1 is the only codec that supports audio encoding',
      'AV1 uses a completely different mathematical foundation unrelated to block-based coding',
      'AV1 is royalty-free and backed by the Alliance for Open Media, eliminating licensing fees that add cost to H.264/H.265 deployments',
      'AV1 can only be decoded in software, making it unsuitable for mobile devices',
    ],
    answer: 2,
    explanation: 'AV1 was developed by the Alliance for Open Media (including Google, Mozilla, Netflix, Amazon, and others) as a royalty-free alternative. This eliminates the per-device or per-stream licensing fees associated with H.264 (MPEG LA) and H.265 (multiple patent pools), making it especially attractive for large-scale streaming services.',
  },
  {
    id: 't1-q3',
    chapterId: 1,
    question: 'A streaming service needs to minimize audio bandwidth while maintaining high quality for music content. Which codec and configuration is most appropriate?',
    options: [
      'AAC-LC at 128 kbps stereo — it is universally supported and efficient for music',
      'Opus at 64 kbps stereo — Opus matches AAC quality at roughly half the bitrate for music',
      'MP3 at 320 kbps — maximum MP3 bitrate ensures best quality',
      'PCM uncompressed — avoids any compression artifacts',
    ],
    answer: 0,
    explanation: 'While Opus is technically superior at low bitrates, AAC-LC at 128 kbps offers excellent music quality with near-universal hardware decoder support across iOS, Android, and browsers. For a streaming service prioritizing compatibility and minimizing bandwidth, AAC-LC at 128 kbps is the practical choice. Opus excels for real-time communication but has less widespread hardware decoder support.',
  },

  // Topic 2: Container Formats & Muxing (MP4, MKV, fMP4, CMAF)
  {
    id: 't2-q1',
    chapterId: 2,
    question: 'What is the fundamental difference between a codec and a container format?',
    options: [
      'A codec defines the file extension; a container defines the compression algorithm',
      'Containers are used for video only; codecs handle both audio and video',
      'A codec is hardware-specific; a container is software-specific',
      'A codec compresses/decompresses media data; a container packages compressed streams together with metadata and synchronization info',
    ],
    answer: 3,
    explanation: 'A codec (coder-decoder) handles the actual compression and decompression of audio or video data. A container format (like MP4, MKV, or WebM) is a wrapper that multiplexes one or more codec-compressed streams together, along with metadata, timestamps, subtitles, and chapter information needed for synchronized playback.',
  },
  {
    id: 't2-q2',
    chapterId: 2,
    question: 'Why was CMAF (Common Media Application Format) developed, and what problem does it solve for streaming providers?',
    options: [
      'CMAF enables a single set of fragmented MP4 segments to be served by both HLS and DASH, reducing storage and encoding costs',
      'CMAF replaces all existing codecs with a single universal codec',
      'CMAF is a DRM system that unifies Widevine, FairPlay, and PlayReady',
      'CMAF compresses container overhead to zero bytes per segment',
    ],
    answer: 0,
    explanation: 'Before CMAF, streaming providers had to encode and store separate segment formats for HLS (historically MPEG-TS) and DASH (fragmented MP4). CMAF standardizes on fragmented MP4 (fMP4) segments with a common encryption scheme, allowing a single set of encoded segments to serve both HLS and DASH manifests. This can nearly halve storage and CDN costs.',
  },
  {
    id: 't2-q3',
    chapterId: 2,
    question: 'What does the "moov atom" in an MP4 file contain, and why does its placement matter for streaming?',
    options: [
      'It contains the actual video frames; placing it at the end speeds up encoding',
      'It contains DRM keys; it must be at the start so the player can decrypt immediately',
      'It holds metadata like sample tables, timestamps, and codec info; placing it before the media data (mdat) enables progressive playback without downloading the entire file',
      'It stores thumbnail images; its placement has no effect on playback',
    ],
    answer: 2,
    explanation: 'The moov atom contains the index of all samples: their sizes, timestamps, offsets into the media data (mdat), and codec configuration. If moov is at the end of the file (the default for many encoders), a player must download the entire file or issue a range request to the end before it can begin playback. Moving moov to the front ("faststart") enables progressive download and immediate playback.',
  },

  // Topic 3: Transcoding & Encoding Pipelines
  {
    id: 't3-q1',
    chapterId: 3,
    question: 'In a multi-rung ABR encoding ladder, what is the purpose of per-title (or per-shot) encoding optimization?',
    options: [
      'It applies the same bitrate ladder to all content for consistency',
      'It skips encoding for titles that already exist in the content library',
      'It encodes only the first 30 seconds of each title to save compute costs',
      'It analyzes each title\'s complexity to assign optimal bitrate-resolution pairs, so simple content gets lower bitrates without quality loss and complex content gets higher bitrates where needed',
    ],
    answer: 3,
    explanation: 'Per-title encoding (pioneered by Netflix) analyzes the visual complexity of each piece of content. An animated show with flat colors needs far less bitrate than a fast-action sports scene. By customizing the bitrate ladder per title (or even per shot), providers deliver the same perceived quality at significantly lower bitrates, saving bandwidth and storage.',
  },
  {
    id: 't3-q2',
    chapterId: 3,
    question: 'What is the role of a "keyframe" (I-frame) in video encoding, and how does keyframe interval affect streaming?',
    options: [
      'Keyframes are audio-only synchronization markers that have no visual data',
      'Keyframes store only the difference from the previous frame to minimize bandwidth',
      'Keyframes are metadata headers added by the container format, not the codec',
      'Keyframes are fully self-contained frames that enable random access; shorter intervals improve seek responsiveness but increase file size due to reduced inter-frame compression',
    ],
    answer: 3,
    explanation: 'An I-frame (keyframe) is a complete image encoded without reference to other frames, serving as a random access point. Players can only seek to keyframe positions. A 2-second keyframe interval means seek granularity of 2 seconds. Shorter intervals improve seek precision and ABR switching speed but increase bitrate because I-frames are much larger than P-frames or B-frames.',
  },
  {
    id: 't3-q3',
    chapterId: 3,
    question: 'A media company needs to transcode 10,000 hours of legacy content to H.265. Which architecture best balances speed and cost?',
    options: [
      'A distributed cloud-based pipeline that splits each video into chunks, encodes them in parallel across many workers, then concatenates the results',
      'A single powerful on-premises server encoding sequentially to ensure consistent quality',
      'Re-recording all content in H.265 natively from the original cameras',
      'Using client-side transcoding in the viewer\'s browser during playback',
    ],
    answer: 0,
    explanation: 'Distributed encoding pipelines split each video at keyframe boundaries into independent chunks, dispatch them to a pool of cloud workers (e.g., AWS Lambda, Kubernetes pods, or GPU instances), encode in parallel, and stitch the results. This approach scales horizontally, processes thousands of hours in days rather than months, and leverages spot/preemptible instances to reduce cost.',
  },

  // Topic 4: HTTP Live Streaming (HLS)
  {
    id: 't4-q1',
    chapterId: 4,
    question: 'How does HLS handle adaptive bitrate switching during playback?',
    options: [
      'The server monitors the client\'s bandwidth and pushes the appropriate quality stream',
      'HLS uses a single fixed bitrate determined during the initial connection handshake',
      'A CDN edge node transcodes the stream in real-time based on client speed',
      'The client downloads a master playlist listing multiple variant streams, measures download speed of each segment, and switches to a higher or lower variant accordingly',
    ],
    answer: 3,
    explanation: 'HLS uses a client-driven ABR model. The master playlist (multivariant playlist) lists variant streams at different bitrate-resolution combinations. The client player downloads segments from its current variant, measures throughput, and autonomously switches to a more appropriate variant. This requires no server-side bandwidth detection and works naturally with HTTP caching infrastructure.',
  },
  {
    id: 't4-q2',
    chapterId: 4,
    question: 'What is the typical end-to-end latency of traditional HLS, and what causes it?',
    options: [
      'Under 500ms, because HLS uses persistent WebSocket connections',
      '10-30 seconds, primarily due to segment duration (6-10s), playlist update intervals, and client buffering of multiple segments before playback',
      'Exactly 1 second, because HLS segments are always 1 second long',
      '1-2 minutes, because HLS requires the entire stream to be pre-encoded',
    ],
    answer: 1,
    explanation: 'Traditional HLS uses 6-10 second segments and requires the client to buffer 2-3 segments before starting playback. Combined with the encoder\'s segment creation delay and playlist polling interval, total glass-to-glass latency is typically 15-30 seconds. Low-Latency HLS (LL-HLS) reduces this to 2-4 seconds using partial segments and playlist push/blocking.',
  },
  {
    id: 't4-q3',
    chapterId: 4,
    question: 'What improvement does Low-Latency HLS (LL-HLS) introduce over traditional HLS?',
    options: [
      'It replaces HTTP with a custom UDP-based protocol for faster delivery',
      'It eliminates the need for a manifest playlist entirely',
      'It uses partial segments (sub-second parts) and blocking playlist reload to reduce latency to 2-4 seconds while maintaining CDN compatibility',
      'It uses peer-to-peer distribution to bypass CDN latency',
    ],
    answer: 2,
    explanation: 'LL-HLS introduces partial segments (typically 200ms-1s parts of a full segment) that the player can request before the full segment is complete. Combined with blocking playlist reload (the server holds the playlist request open until new parts are available, avoiding polling delay) and preload hints, LL-HLS achieves 2-4 second latency while remaining fully HTTP/CDN-compatible.',
  },

  // Topic 5: DASH & Adaptive Bitrate Streaming
  {
    id: 't5-q1',
    chapterId: 5,
    question: 'How does the DASH MPD (Media Presentation Description) differ structurally from an HLS master playlist?',
    options: [
      'The MPD is an XML document with hierarchical Period/AdaptationSet/Representation structure, while HLS uses a flat M3U8 text format with URI-based variant references',
      'The MPD is a binary format while HLS uses plain text',
      'The MPD can only describe video streams, not audio',
      'There is no structural difference; DASH and HLS use identical manifest formats',
    ],
    answer: 0,
    explanation: 'The DASH MPD is an XML document organized hierarchically: Periods represent time spans, AdaptationSets group related streams (e.g., video at different qualities, audio in different languages), and Representations define specific bitrate/resolution variants. HLS uses simpler M3U8 text playlists with tags like #EXT-X-STREAM-INF. The MPD\'s structure enables more complex multi-period and multi-language scenarios natively.',
  },
  {
    id: 't5-q2',
    chapterId: 5,
    question: 'What is the "buffer-based" ABR algorithm approach, and how does it differ from "throughput-based" algorithms?',
    options: [
      'Buffer-based algorithms measure download speed directly; throughput-based algorithms monitor buffer levels',
      'Buffer-based algorithms select bitrate based on the current playback buffer occupancy level, while throughput-based algorithms estimate available bandwidth from recent segment download speeds',
      'Buffer-based algorithms require server-side support; throughput-based algorithms are client-only',
      'They are identical in practice; the terms are interchangeable',
    ],
    answer: 1,
    explanation: 'Throughput-based ABR (e.g., conventional HLS) estimates bandwidth from segment download times and picks the highest bitrate below that estimate. Buffer-based ABR (e.g., BBA from Netflix) maps the playback buffer level directly to a bitrate: low buffer means conservative quality, full buffer allows higher quality. Buffer-based approaches avoid throughput estimation errors and tend to produce more stable quality with fewer switches.',
  },
  {
    id: 't5-q3',
    chapterId: 5,
    question: 'A viewer on a mobile network experiences frequent quality oscillations (rapidly switching between low and high bitrate). Which ABR improvement would most directly address this?',
    options: [
      'Increasing the segment duration from 4 seconds to 30 seconds',
      'Disabling adaptive bitrate entirely and locking to the lowest quality',
      'Switching from DASH to HLS, as HLS does not have this problem',
      'Adding a stability penalty that discourages switching unless the quality improvement is significant and sustained over multiple segments',
    ],
    answer: 3,
    explanation: 'Quality oscillation occurs when the ABR algorithm reacts too aggressively to short-term bandwidth fluctuations. A stability penalty (or hysteresis) requires that throughput must exceed the next-higher bitrate by a margin (e.g., 1.5x) for several consecutive segments before switching up, while switching down happens quickly. This smooths the viewing experience on variable networks.',
  },

  // Topic 6: WebRTC & Real-Time Communication
  {
    id: 't6-q1',
    chapterId: 6,
    question: 'Why does WebRTC primarily use UDP rather than TCP for media transport?',
    options: [
      'UDP provides built-in encryption that TCP lacks',
      'UDP supports larger packet sizes than TCP',
      'UDP does not retransmit lost packets, avoiding head-of-line blocking and accumulated latency that TCP retransmissions would cause in real-time communication',
      'UDP is a newer protocol with better compression algorithms',
    ],
    answer: 2,
    explanation: 'In real-time communication, a lost video frame from 200ms ago is useless by the time a TCP retransmission delivers it. TCP\'s reliable, ordered delivery causes head-of-line blocking where newer packets wait for old retransmissions, accumulating latency. UDP lets WebRTC\'s SRTP layer handle selective retransmission and forward error correction only when it would actually help, keeping latency under 150ms.',
  },
  {
    id: 't6-q2',
    chapterId: 6,
    question: 'What role do ICE, STUN, and TURN play in establishing a WebRTC connection?',
    options: [
      'ICE encrypts the media stream, STUN compresses it, and TURN routes it through a CDN',
      'ICE is the framework that gathers connection candidates using STUN (to discover public IP/port via a lightweight server) and TURN (to relay media through a server when direct peer-to-peer fails)',
      'STUN and TURN are video codecs; ICE is an audio codec used by WebRTC',
      'ICE replaces DNS for WebRTC; STUN and TURN are signaling protocols',
    ],
    answer: 1,
    explanation: 'ICE (Interactive Connectivity Establishment) is the framework that discovers and tests possible network paths between peers. STUN servers help peers behind NATs discover their public IP and port (a lightweight, low-cost operation). When NAT traversal fails (symmetric NATs, strict firewalls), TURN servers relay the media traffic. ICE tests all candidates and selects the best working path.',
  },
  {
    id: 't6-q3',
    chapterId: 6,
    question: 'How does a Selective Forwarding Unit (SFU) scale WebRTC beyond simple peer-to-peer?',
    options: [
      'The SFU transcodes all incoming streams to a single quality before forwarding',
      'The SFU establishes direct peer-to-peer connections between all participants automatically',
      'The SFU stores recorded streams and plays them back with a 5-second delay',
      'The SFU receives each participant\'s stream once and selectively forwards it to other participants without transcoding, reducing each sender\'s upload to a single stream regardless of participant count',
    ],
    answer: 3,
    explanation: 'In full-mesh peer-to-peer, each participant must upload N-1 copies of their stream, which collapses at around 4-6 participants. An SFU receives one stream per sender and selectively forwards the appropriate quality (using simulcast layers) to each receiver. This scales to dozens or hundreds of participants without transcoding overhead, though it requires server bandwidth proportional to participants.',
  },

  // Topic 7: CDN Architecture & Edge Caching
  {
    id: 't7-q1',
    chapterId: 7,
    question: 'What is a "cache hit ratio" in CDN context, and why is it critical for streaming economics?',
    options: [
      'It measures the percentage of requests served from edge cache without going back to the origin; higher ratios reduce origin load and bandwidth costs',
      'It measures how fast the CDN can encode video segments at the edge',
      'It measures the ratio of HTTP to HTTPS requests served by the CDN',
      'It measures the number of edge servers divided by origin servers',
    ],
    answer: 0,
    explanation: 'Cache hit ratio (CHR) is the percentage of viewer requests fulfilled directly from a CDN edge server\'s local cache. A 95% CHR means only 5% of requests go back to the origin, dramatically reducing origin bandwidth costs and load. For popular content, CHR can exceed 99%. Streaming providers optimize CHR through segment naming, TTL tuning, and pre-warming popular content.',
  },
  {
    id: 't7-q2',
    chapterId: 7,
    question: 'How do multi-tier CDN architectures (edge -> mid-tier -> origin) reduce origin load compared to a single-tier CDN?',
    options: [
      'Multi-tier CDNs compress all content at the mid-tier, so the origin sends less data',
      'Edge servers that miss their cache check a shared mid-tier cache before hitting the origin, so a popular segment only needs to be fetched from origin once even across many edge PoPs',
      'Multi-tier CDNs replicate the entire content library to every edge server, eliminating origin requests entirely',
      'The mid-tier encrypts content so the origin doesn\'t need to handle DRM',
    ],
    answer: 1,
    explanation: 'In a multi-tier (hierarchical) CDN, edge PoPs that don\'t have a requested segment first check a regional mid-tier (or shield) cache. If the mid-tier has it, the segment is served without touching the origin. Since mid-tier caches aggregate requests from many edge PoPs, even long-tail content only needs to be fetched from origin once per region rather than once per edge PoP.',
  },
  {
    id: 't7-q3',
    chapterId: 7,
    question: 'During a major live event, a CDN edge server receives 100,000 near-simultaneous requests for the same just-published segment that is not yet cached. What technique prevents a "thundering herd" of 100,000 origin requests?',
    options: [
      'The edge server rejects all requests until the segment is manually uploaded',
      'Each request is load-balanced to a different origin server',
      'Request coalescing (or "request collapsing"): the edge groups all concurrent requests for the same object and makes a single origin fetch, then serves the cached response to all waiting clients',
      'The CDN pre-encodes all possible segments before the event starts',
    ],
    answer: 2,
    explanation: 'Request coalescing (also called request collapsing or origin shielding) detects multiple concurrent requests for the same uncached object and collapses them into a single origin fetch. The first request triggers the origin pull; subsequent requests are queued and served from cache once the first completes. This prevents origin overload during live events and flash-crowd scenarios.',
  },

  // Topic 8: Origin Servers & Storage Architecture
  {
    id: 't8-q1',
    chapterId: 8,
    question: 'Why do large streaming platforms typically use object storage (like S3) rather than traditional file systems for their media libraries?',
    options: [
      'Object storage compresses video files more efficiently than file systems',
      'Object storage is the only storage type that supports DRM encryption',
      'Traditional file systems cannot store files larger than 1 GB',
      'Object storage provides virtually unlimited scalability, built-in redundancy, and HTTP-native access, avoiding the inode limits, scaling ceilings, and maintenance overhead of traditional file systems',
    ],
    answer: 3,
    explanation: 'Object storage systems like S3, GCS, or Azure Blob offer effectively unlimited capacity without filesystem inode limits, built-in multi-AZ redundancy (11 nines of durability), and native HTTP/REST access ideal for CDN integration. They scale seamlessly from terabytes to exabytes without capacity planning, unlike traditional NAS/SAN systems that require manual provisioning and have fixed capacity.',
  },
  {
    id: 't8-q2',
    chapterId: 8,
    question: 'What is the purpose of a "just-in-time packager" (also called an origin packager) in a streaming architecture?',
    options: [
      'It stores a single set of encoded mezzanine files and dynamically packages them into the requested streaming format (HLS, DASH) and DRM at request time, reducing storage duplication',
      'It stores pre-packaged HLS and DASH segments for every possible bitrate combination',
      'It transcodes raw camera footage into the final delivery codec during ingest',
      'It monitors storage health and automatically migrates data between disk tiers',
    ],
    answer: 0,
    explanation: 'A just-in-time (JIT) packager stores content as codec-compressed fragments (typically fMP4) and generates the appropriate manifest and packaging (HLS, DASH, Smooth Streaming) dynamically when requested. This eliminates the need to pre-package and store multiple format-specific copies of every asset, which can reduce storage by 2-3x and simplifies adding support for new formats or DRM schemes.',
  },
  {
    id: 't8-q3',
    chapterId: 8,
    question: 'A streaming service has a 50,000-title catalog where 500 titles account for 90% of views. Which storage tiering strategy optimizes cost without affecting viewer experience?',
    options: [
      'Store all 50,000 titles on high-performance SSD storage for uniform access speed',
      'Keep all content on the cheapest archive tier and rely entirely on CDN caching',
      'Place the popular 500 titles on hot storage with fast access, warm titles on standard object storage, and rarely-watched titles on archive/cold storage with higher retrieval latency',
      'Delete all titles older than 2 years to reduce storage costs',
    ],
    answer: 2,
    explanation: 'Hot/warm/cold storage tiering matches access patterns to storage costs. The popular 500 titles (hot tier) get fast SSD-backed or provisioned-IOPS storage for quick CDN refills. Moderately popular titles use standard object storage. The long tail of rarely-watched content goes to archive storage (like S3 Glacier) at 80-90% lower cost, accepting slightly higher retrieval latency that can be masked by CDN pre-fetching.',
  },

  // Topic 9: Live Streaming & Ingest Pipelines
  {
    id: 't9-q1',
    chapterId: 9,
    question: 'What is RTMP\'s role in modern live streaming, given that it was originally designed for Flash?',
    options: [
      'RTMP has been completely replaced and is no longer used anywhere',
      'RTMP remains widely used as an ingest protocol from encoders to origin servers, even though delivery to viewers has moved to HLS/DASH over HTTP',
      'RTMP is now the primary delivery protocol to end viewers on all platforms',
      'RTMP was redesigned as a UDP-based protocol for low-latency delivery',
    ],
    answer: 1,
    explanation: 'Although Flash is dead and RTMP is not used for viewer-facing delivery, RTMP remains the dominant protocol for ingest — the connection between a broadcaster\'s encoder (OBS, hardware encoders) and the streaming platform\'s ingest servers. It provides low-latency, reliable media transport for the first mile. The ingest server then re-packages the stream into HLS/DASH for CDN delivery.',
  },
  {
    id: 't9-q2',
    chapterId: 9,
    question: 'Why do live streaming architectures require redundant ingest paths, and how is failover typically handled?',
    options: [
      'Redundancy is only needed for pre-recorded content; live streams cannot be duplicated',
      'Redundancy is handled by the viewer\'s player re-buffering automatically',
      'Broadcasters send a single stream, and the platform records it for replay if the connection drops',
      'Broadcasters send identical streams to primary and backup ingest endpoints in different regions; if the primary fails, the packager seamlessly switches to the backup stream with minimal viewer disruption',
    ],
    answer: 3,
    explanation: 'For high-value live events, broadcasters configure their encoders to simultaneously push identical streams (same keyframe alignment) to geographically separated primary and backup ingest endpoints. The origin/packager monitors both feeds and can switch to the backup within one segment duration if the primary drops. Some platforms use SRT or RIST with built-in ARQ for more resilient first-mile transport.',
  },
  {
    id: 't9-q3',
    chapterId: 9,
    question: 'What is "glass-to-glass latency" in live streaming, and which stages of the pipeline contribute most to it?',
    options: [
      'It is the time from capturing an event on camera to displaying it on a viewer\'s screen; the largest contributors are typically encoder buffering, segment duration, and client-side buffering',
      'It is the latency within the glass fiber optic network between two data centers',
      'It measures only the CDN propagation delay between edge and origin servers',
      'It is the time taken to render each video frame on the viewer\'s display hardware',
    ],
    answer: 0,
    explanation: 'Glass-to-glass latency measures the total delay from the camera lens ("glass") to the viewer\'s screen ("glass"). The major contributors are: capture/encoding delay (0.5-2s), segment creation and publishing (segment duration, e.g., 2-6s), CDN propagation (0.1-1s), and client buffering (1-3 segments). Traditional HLS sums to 15-30s; optimized pipelines with LL-HLS/LL-DASH can achieve 2-5s.',
  },

  // Topic 10: DRM & Content Protection (Widevine, FairPlay, PlayReady)
  {
    id: 't10-q1',
    chapterId: 10,
    question: 'How does a multi-DRM system typically work when serving the same content to Chrome, Safari, and Edge browsers?',
    options: [
      'The same DRM encryption key format works natively in all browsers without any adaptation',
      'Each browser decodes the video without DRM and applies watermarking instead',
      'Content must be encrypted three separate times with three different keys, tripling storage requirements',
      'The server encrypts content once using CENC (Common Encryption), and the player requests the appropriate license from Widevine (Chrome), FairPlay (Safari), or PlayReady (Edge) license servers based on the browser\'s CDM',
    ],
    answer: 3,
    explanation: 'MPEG Common Encryption (CENC) allows content to be encrypted once with AES-128 CTR or CBC, and different DRM systems can decrypt it using their own license servers. The player detects the browser\'s Content Decryption Module (CDM) — Widevine for Chrome/Android, FairPlay for Safari/iOS, PlayReady for Edge/Xbox — and requests the appropriate license. This avoids re-encrypting content for each DRM scheme.',
  },
  {
    id: 't10-q2',
    chapterId: 10,
    question: 'What are Widevine security levels L1, L2, and L3, and why do they matter for content licensing?',
    options: [
      'They refer to the encryption key length: L1 uses 128-bit, L2 uses 192-bit, L3 uses 256-bit',
      'L1 handles all processing in a hardware Trusted Execution Environment (TEE); L3 is software-only with no TEE. Studios often require L1 for HD/4K content because L3 is more easily compromised',
      'They indicate network bandwidth tiers: L1 for 4G, L2 for WiFi, L3 for ethernet',
      'They represent different Widevine pricing tiers for content providers',
    ],
    answer: 1,
    explanation: 'Widevine L1 performs all cryptographic operations and compressed media processing within a hardware Trusted Execution Environment (TEE), making key extraction extremely difficult. L3 is software-only, relying on code obfuscation that can be reverse-engineered. Studios mandate L1 for premium HD and 4K content. L2 (rarely used) has hardware crypto but software media processing. This is why some devices only get SD quality on certain services.',
  },
  {
    id: 't10-q3',
    chapterId: 10,
    question: 'What is forensic watermarking in the context of streaming DRM, and how does it complement encryption?',
    options: [
      'It adds a visible "PROPERTY OF" text overlay on the video during playback',
      'It replaces DRM encryption entirely by making content publicly available but trackable',
      'It embeds an imperceptible per-session or per-device identifier into the video stream, allowing the source of leaked content to be traced even after the DRM decryption step',
      'It is a method of compressing DRM license files to reduce bandwidth',
    ],
    answer: 2,
    explanation: 'Forensic watermarking embeds invisible, unique identifiers (tied to a specific user session or device) into the decoded video. Even if someone screen-records the decrypted content (bypassing DRM), the watermark persists and can be extracted to identify the leaker. This deters piracy through accountability where DRM alone cannot prevent screen capture. Services like Netflix use A/B variant watermarking at the CDN level.',
  },

  // Topic 11: Quality of Experience & Monitoring (VMAF, SSIM)
  {
    id: 't11-q1',
    chapterId: 11,
    question: 'Why did Netflix develop VMAF instead of relying on existing metrics like PSNR and SSIM for video quality assessment?',
    options: [
      'PSNR and SSIM cannot be computed for video, only for still images',
      'PSNR and SSIM often correlate poorly with human perception for streaming content; VMAF combines multiple elementary metrics with a machine-learning model trained on subjective quality scores to better predict how viewers actually perceive quality',
      'VMAF is faster to compute than PSNR, making it suitable for real-time encoding',
      'VMAF is the only metric that works with H.265-encoded content',
    ],
    answer: 1,
    explanation: 'PSNR measures pixel-level error but misses perceptual effects (e.g., it penalizes imperceptible noise equally). SSIM improves on this but still misses temporal and motion-related artifacts. VMAF uses a support vector machine trained on thousands of human subjective ratings, combining detail loss, motion features, and SSIM-like metrics. It correlates significantly better with Mean Opinion Scores (MOS) across diverse streaming content.',
  },
  {
    id: 't11-q2',
    chapterId: 11,
    question: 'Which QoE metric has the strongest correlation with viewer churn (subscribers canceling) according to industry research?',
    options: [
      'Average video bitrate — higher bitrate always means happier viewers',
      'The specific CDN provider used to deliver the content',
      'The container format (MP4 vs MKV) used for delivery',
      'Time to first frame (startup delay) and rebuffering ratio — viewers are most sensitive to waiting and playback interruptions',
    ],
    answer: 3,
    explanation: 'Research by Conviva and others consistently shows that rebuffering ratio (percentage of playback time spent buffering) and startup delay are the strongest predictors of viewer abandonment and churn. Even 1% rebuffering can reduce viewing time by several minutes. Video bitrate matters less than smoothness — viewers tolerate lower resolution better than they tolerate stalls and long startup times.',
  },
  {
    id: 't11-q3',
    chapterId: 11,
    question: 'How does a streaming platform typically implement real-time QoE monitoring at scale?',
    options: [
      'By manually reviewing a random sample of viewer sessions each day',
      'By relying solely on CDN access logs to infer viewer experience',
      'Client-side players report telemetry events (startup time, rebuffer events, bitrate switches, errors) to an analytics backend that aggregates data in real-time dashboards with alerting thresholds',
      'By running VMAF analysis on every viewer\'s decoded video in the cloud',
    ],
    answer: 2,
    explanation: 'Streaming platforms instrument their players to emit telemetry: startup latency, rebuffering events and duration, bitrate level and switches, playback errors, and session duration. These events stream to a real-time analytics pipeline (e.g., Kafka -> Flink/Spark -> dashboard) that aggregates metrics by ISP, device, region, CDN, and content title. Alerts fire when metrics degrade beyond thresholds, enabling rapid incident response.',
  },

  // Topic 12: Recommendation & Personalization Systems
  {
    id: 't12-q1',
    chapterId: 12,
    question: 'What is the "cold start" problem in recommendation systems, and how do streaming platforms typically address it for new users?',
    options: [
      'New users have no viewing history, so collaborative filtering cannot generate personalized recommendations; platforms address this with popularity-based recommendations, explicit preference surveys, and content-based features until enough interaction data accumulates',
      'It refers to the slow startup time when loading the recommendation engine\'s machine learning models',
      'It means the recommendation server takes too long to boot up after a restart',
      'It refers to recommending content that is too old or "cold" for viewers',
    ],
    answer: 0,
    explanation: 'Collaborative filtering requires a user\'s interaction history to find similar users. New users have no history ("cold start"). Platforms mitigate this by initially recommending globally popular and trending content, asking explicit preference questions during onboarding (genre preferences, favorite shows), and using content-based features (demographics, device type, signup source) as proxy signals until behavioral data accumulates.',
  },
  {
    id: 't12-q2',
    chapterId: 12,
    question: 'How does Netflix use A/B testing in its recommendation and personalization systems?',
    options: [
      'Netflix A/B tests only the video encoding quality, not recommendations',
      'Netflix tests recommendations manually with focus groups before deploying any changes',
      'Netflix assigns users to control and treatment groups to test different recommendation algorithms, ranking models, artwork selection, and UI layouts, measuring impact on engagement metrics like hours viewed and retention',
      'A/B testing is used only for new content titles, not for the recommendation algorithm itself',
    ],
    answer: 2,
    explanation: 'Netflix runs hundreds of concurrent A/B tests across every aspect of the member experience: recommendation algorithms, ranking functions, artwork personalization (different users see different thumbnails for the same title), row selection, and UI layouts. Each test measures downstream impact on core metrics — viewing hours, retention, and member satisfaction. This data-driven approach means every recommendation change is validated against real user behavior.',
  },
  {
    id: 't12-q3',
    chapterId: 12,
    question: 'What is the role of "artwork personalization" in streaming recommendation systems?',
    options: [
      'It generates AI artwork to replace the original movie posters for legal reasons',
      'It selects different thumbnail images for the same title based on each user\'s viewing preferences — for example, showing a romance-focused still to romance fans and an action-focused still to action fans — to increase click-through rate',
      'It applies color filters to thumbnails based on the user\'s device screen calibration',
      'It watermarks each thumbnail with the user\'s account ID for piracy tracking',
    ],
    answer: 1,
    explanation: 'Netflix\'s artwork personalization system selects from multiple candidate thumbnails for each title based on a user\'s preferences. A user who watches many comedies might see a humorous scene from a drama, while an action fan sees an intense scene from the same title. This personalized visual merchandising significantly increases click-through rates by making titles visually relevant to each viewer\'s tastes.',
  },

  // Topic 13: Platform Architecture (Netflix, YouTube, Twitch)
  {
    id: 't13-q1',
    chapterId: 13,
    question: 'How does Netflix\'s Open Connect CDN differ from using a third-party CDN like Akamai or CloudFront?',
    options: [
      'Open Connect embeds Netflix-owned appliances (OCAs) directly inside ISP networks, serving content from within the ISP rather than from external PoPs, reducing transit costs and improving quality for both Netflix and the ISP',
      'Open Connect is a cloud-based CDN identical in architecture to commercial CDNs',
      'Open Connect only serves content in the United States; international traffic uses third-party CDNs',
      'Open Connect is a software-only solution that runs on viewers\' devices as a peer-to-peer cache',
    ],
    answer: 0,
    explanation: 'Netflix\'s Open Connect program deploys custom hardware appliances (OCAs) directly inside ISP data centers and internet exchange points worldwide. During off-peak hours, OCAs are proactively filled with content predicted to be popular. This means most Netflix traffic never crosses ISP peering points — it\'s served locally. This reduces Netflix\'s transit costs, eliminates cross-network congestion for ISPs, and delivers consistently high quality to viewers.',
  },
  {
    id: 't13-q2',
    chapterId: 13,
    question: 'How does YouTube handle the enormous scale of video uploads (500+ hours per minute) in its processing pipeline?',
    options: [
      'YouTube encodes each video on the uploader\'s device before accepting it',
      'YouTube\'s pipeline ingests the original, immediately generates a low-quality "fast transcode" for quick availability, then asynchronously produces the full resolution ladder across a distributed encoding infrastructure',
      'YouTube processes videos sequentially in a single data center, which is why processing can take hours',
      'YouTube stores only the original upload and transcodes on-the-fly during each viewer request',
    ],
    answer: 1,
    explanation: 'YouTube\'s ingest pipeline accepts the original file and immediately produces a low-resolution transcode (e.g., 360p) so the video is watchable within minutes. A distributed encoding system (running across Google\'s infrastructure) then asynchronously generates the complete ABR ladder (144p through 4K/8K) with multiple codecs (VP9, AV1, H.264). This two-phase approach balances upload-to-availability speed with comprehensive quality coverage.',
  },
  {
    id: 't13-q3',
    chapterId: 13,
    question: 'What architectural challenge makes Twitch\'s live streaming fundamentally different from Netflix\'s on-demand model, and how does Twitch address it?',
    options: [
      'Twitch uses a completely different video codec than Netflix, which is the primary architectural difference',
      'Twitch\'s content is pre-encoded like Netflix, so there is no fundamental architectural difference',
      'Twitch must transcode millions of concurrent live streams in real-time to produce ABR ladders, requiring massive always-on GPU/CPU capacity that cannot benefit from the pre-computation and overnight fill strategies Netflix uses for its on-demand library',
      'Twitch\'s only challenge is rights management, as all content is user-generated',
    ],
    answer: 2,
    explanation: 'Netflix can encode its library offline, optimize slowly, and pre-fill CDN caches overnight. Twitch must accept millions of variable-quality ingest streams and transcode each one in real-time into multiple ABR renditions. This demands enormous, always-provisioned compute capacity with tight latency SLAs (seconds, not hours). Twitch mitigates this by offering transcoding only to partnered/popular streamers and using adaptive resource allocation.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
