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
  { id: 2, title: 'Networking & Performance' },
  { id: 3, title: 'Security & APIs' },
  { id: 4, title: 'Advanced Topics' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'Browser Architecture',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'How modern browsers organize their multi-process architecture, the role of rendering engines like Blink, Gecko, and WebKit, and how browser components communicate through IPC mechanisms.',
    concepts: [
      {
        id: '1-1',
        name: 'Multi-Process Architecture',
        description:
          'Modern browsers run separate OS-level processes for the browser shell, each renderer (tab), GPU operations, network I/O, and plugins. This isolation ensures that a crash or exploit in one tab does not bring down the entire browser or compromise other tabs.',
        keyPoints: [
          'Chrome uses a multi-process model with a single browser process (UI, disk, network), one renderer process per site instance (or per tab, depending on site isolation policy), a GPU process, and utility processes for audio, video decoding, and network service',
          'The browser process acts as the orchestrator — it manages tab creation, navigation, and security policies, while renderer processes are sandboxed and have no direct access to the filesystem, network, or other OS resources',
          'Firefox transitioned from single-process to multi-process (Electrolysis/e10s) in 2017 and now uses Fission for per-site process isolation, matching Chrome\'s site isolation model',
          'Each renderer process runs its own instance of the rendering engine (Blink, Gecko, or WebKit) and JavaScript engine (V8, SpiderMonkey, or JavaScriptCore) in a sandboxed environment with restricted system call access',
          'Process-per-site-instance means that cross-origin iframes get their own renderer process, preventing Spectre-class side-channel attacks from leaking data across origins',
        ],
        tradeoffs: [
          'Multi-process architecture increases memory usage significantly (each renderer process has its own copy of the engine, heap, and compiled code) — Chrome is notorious for high memory consumption with many tabs',
          'Process isolation improves security and stability but introduces IPC overhead for every cross-process communication, including DOM access from the browser process and compositing layer transfers',
          'Deciding process granularity is a balancing act: per-tab wastes resources if multiple tabs share the same site, while per-site-instance is more secure but harder to implement correctly with session storage and browsing context groups',
        ],
        realWorld: [
          'Chrome\'s Task Manager (Shift+Esc) shows per-process memory, CPU, and network usage — each tab, extension, and service worker runs as a separate process visible in the OS process list',
          'Safari on macOS uses a similar multi-process model called WebKit Networking Process and Web Content Process, and leverages macOS\'s App Sandbox for each WebContent process',
          'The Electron framework (VS Code, Slack, Discord) inherits Chromium\'s multi-process model, with a main process for Node.js and separate renderer processes for each BrowserWindow',
        ],
      },
      {
        id: '1-2',
        name: 'Rendering Engines (Blink, Gecko, WebKit)',
        description:
          'The rendering engine is the core component that transforms HTML, CSS, and JavaScript into pixels on screen. The three major engines — Blink (Chrome/Edge/Opera), Gecko (Firefox), and WebKit (Safari) — each implement the web platform standards with different architectures and optimization strategies.',
        keyPoints: [
          'Blink (forked from WebKit in 2013) powers Chrome, Edge, Opera, Brave, and all Chromium-based browsers — it dominates with roughly 65-70% of global browser market share, making it the de facto web platform',
          'Gecko is developed by Mozilla for Firefox and is the only major non-Chromium engine on desktop — its Stylo CSS engine (written in Rust) and WebRender GPU-based renderer represent architectural innovations that Blink later adopted partially',
          'WebKit powers Safari on macOS/iOS and is mandated by Apple for all browsers on iOS (even Chrome on iOS uses WebKit underneath) — this makes WebKit the second-most important engine for web developers despite Safari\'s smaller desktop share',
          'Each engine implements the same W3C and WHATWG specifications but with different timelines and interpretations — CSS Grid, Container Queries, and Web Components shipped at different times across engines',
          'Rendering engine updates ship on different cadences: Chrome releases every 4 weeks, Firefox every 4 weeks, Safari roughly 2-3 times per year with major updates tied to macOS/iOS releases',
        ],
        tradeoffs: [
          'Blink\'s dominance means web developers often test primarily in Chrome, leading to a monoculture risk where sites break in Firefox/Safari — reminiscent of the IE6 era but with a more standards-compliant dominant engine',
          'Gecko\'s Rust-based components (Stylo, WebRender) offer memory safety advantages over C++ codebases but require maintaining expertise in a less common language for browser engine development',
          'Apple\'s WebKit requirement on iOS means that progressive web app capabilities, WebRTC features, and new APIs are gated by WebKit\'s implementation timeline, regardless of which browser the user chooses on iOS',
        ],
        realWorld: [
          'The Interop project (formerly Compat) is a cross-browser effort where Google, Mozilla, Apple, and Microsoft agree on priority areas for cross-engine compatibility — scores are tracked publicly at wpt.fyi',
          'Microsoft abandoned EdgeHTML (their own rendering engine) in 2019 and switched Edge to Chromium/Blink, citing the cost of maintaining a competitive rendering engine independently',
          'The WebKit team at Apple introduced the -webkit- CSS prefix convention, which became so widely used that Blink and Gecko had to implement -webkit- prefixed properties for compatibility',
        ],
      },
      {
        id: '1-3',
        name: 'Browser Components & IPC',
        description:
          'A browser is composed of several key subsystems — the UI layer, rendering engine, JavaScript engine, networking stack, and storage layer — that communicate through inter-process communication (IPC) channels. Understanding these components and their interactions is essential to grasping browser behavior.',
        keyPoints: [
          'The browser process contains the UI thread (address bar, tabs, bookmarks), the I/O thread (network requests via the network service), and the storage thread (cookies, IndexedDB, Cache API) — it is the privileged process with full OS access',
          'Chromium uses Mojo for IPC — a capability-based message-passing system where interfaces are defined in .mojom IDL files and messages are serialized into structured pipes between processes',
          'The compositor thread in the renderer process is separate from the main thread — it handles scrolling, CSS animations (transform, opacity), and layer compositing independently, which is why CSS transforms are "cheap" and don\'t trigger layout',
          'The network service was moved from the browser process into its own sandboxed process in Chrome 67+ to reduce the attack surface — a compromised network service cannot directly access the browser process\'s privileged resources',
          'GPU compositing uses shared memory (shared bitmaps or GPU textures via command buffers) to transfer rendered tiles from renderer processes to the GPU process for final compositing to the screen',
        ],
        tradeoffs: [
          'Moving subsystems into separate processes (network service, audio service, storage service) improves security through isolation but increases IPC overhead and architectural complexity',
          'Mojo\'s capability-based IPC model provides fine-grained security (a renderer can only call interfaces it has been explicitly granted) but requires careful interface design to avoid accidentally exposing privileged operations',
          'The compositor thread enables smooth scrolling and animations even when the main thread is busy with JavaScript, but composited layers consume GPU memory — too many layers (will-change, translateZ(0) hacks) can cause excessive memory usage',
        ],
        realWorld: [
          'Chrome\'s chrome://tracing tool (now Perfetto) visualizes IPC messages between processes in real time, showing the flow of a navigation from URL bar input through DNS resolution, network fetch, HTML parsing, layout, paint, and compositing',
          'Firefox\'s WebRender (now standard) moves the entire painting step to the GPU using a display list architecture similar to a game engine, eliminating CPU-bound paint bottlenecks for complex pages',
          'VS Code\'s rendering architecture uses a single Electron renderer process but implements its own virtualized text rendering to avoid DOM performance limitations — demonstrating how browser component boundaries affect application design',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Rendering Pipeline',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The step-by-step process by which the browser transforms raw HTML and CSS bytes into pixels on screen, from DOM construction through layout, painting, and compositing.',
    concepts: [
      {
        id: '2-1',
        name: 'DOM & CSSOM Construction',
        description:
          'The browser parses HTML bytes into a Document Object Model (DOM) tree and CSS bytes into a CSS Object Model (CSSOM) tree. These two trees are the foundational data structures that drive all subsequent rendering steps.',
        keyPoints: [
          'HTML parsing follows the WHATWG HTML5 parsing specification — a state machine tokenizer breaks bytes into tokens (start tags, end tags, text, comments) which the tree builder assembles into a DOM tree using complex rules for error recovery, implicit tag closing, and foster parenting',
          'The HTML parser is incremental and re-entrant — it processes bytes as they arrive from the network, building the DOM progressively, which is why content appears gradually as a page loads',
          'CSS parsing constructs the CSSOM by tokenizing stylesheets into rules, resolving @import chains, and building a tree structure that mirrors CSS specificity and inheritance — every DOM node ultimately receives a computed style from this tree',
          'Script elements (<script>) block HTML parsing by default because JavaScript can modify the DOM via document.write() — this is why scripts should use defer or async attributes, or be placed at the end of <body>',
          'Stylesheets block rendering (not parsing) — the browser will not render any content until all CSS in the <head> is parsed, because rendering with incomplete styles would cause a flash of unstyled content (FOUC)',
        ],
        tradeoffs: [
          'Inline <style> blocks avoid an extra HTTP request but cannot be cached independently and increase HTML document size — external stylesheets are cached but add a critical request to the rendering path',
          'The defer attribute maintains script execution order while unblocking the parser, but async scripts execute as soon as they download which can cause race conditions if scripts depend on each other',
          'Preload scanner (speculative parser) looks ahead in the HTML for resources to prefetch while the main parser is blocked by a script — this optimization helps but cannot detect resources referenced in JavaScript',
        ],
        realWorld: [
          'Chrome DevTools Performance panel shows "Parse HTML" and "Parse Stylesheet" events on the timeline — large HTML documents (100K+ nodes) or complex CSS (thousands of rules with deep selectors) visibly slow these phases',
          'Next.js and Nuxt.js automatically move scripts to the end of <body> or use defer, and inline critical CSS for above-the-fold content to optimize the DOM/CSSOM construction phase',
          'The document.write() API is effectively deprecated for modern web development — Chrome will block document.write() injected scripts on slow connections (2G) to prevent multi-second parse delays',
        ],
      },
      {
        id: '2-2',
        name: 'Render Tree & Layout',
        description:
          'The browser combines the DOM and CSSOM trees into a render tree that contains only visible elements with their computed styles, then performs layout (also called reflow) to calculate the exact position and size of every element in pixel coordinates.',
        keyPoints: [
          'The render tree is constructed by walking the DOM tree and, for each node, finding the matching CSSOM rules to compute the final style — nodes with display:none are excluded from the render tree entirely (but visibility:hidden nodes are included because they still occupy space)',
          'Layout is a recursive process that starts from the root of the render tree and computes the geometry (x, y, width, height) of each box according to the CSS box model, considering margins, padding, borders, and content dimensions',
          'CSS Flexbox and Grid layouts are computed during the layout phase — Flexbox requires multiple passes to resolve flex-grow/flex-shrink ratios, and Grid involves constraint solving for track sizing across rows and columns',
          'Layout is one of the most expensive pipeline stages — changing a geometric property (width, height, margin, padding, top, left, font-size) triggers layout for the affected element and potentially all of its descendants and siblings',
          'Layout thrashing (forced synchronous layout) occurs when JavaScript reads a layout property (offsetWidth, getBoundingClientRect()) and then writes a style change in a tight loop — each read forces the browser to recalculate layout immediately instead of batching',
        ],
        tradeoffs: [
          'CSS containment (contain: layout) tells the browser that an element\'s internals do not affect outside elements, allowing the engine to skip re-laying-out the entire document — but it changes how overflow and sizing behave, which can break designs',
          'Absolute/fixed positioning removes elements from the normal flow, reducing their impact on sibling layout, but creates new stacking contexts and can cause z-index management complexity',
          'Virtual scrolling (rendering only visible items) avoids layout costs for large lists but adds complexity for accessibility (screen readers cannot see off-screen items) and features like Ctrl+F browser search',
        ],
        realWorld: [
          'React\'s virtual DOM batches state updates and applies them in a single layout pass — this is one of the key reasons React applications avoid layout thrashing that was common with jQuery-style direct DOM manipulation',
          'Chrome DevTools Performance panel highlights "Layout" events in purple — a single layout event affecting 1000+ nodes is a clear signal of a performance problem, often caused by reading offsetHeight inside a loop',
          'The CSS will-change property was introduced specifically to let developers hint to the browser which properties will be animated, allowing the engine to promote elements to their own compositing layers before animation begins',
        ],
      },
      {
        id: '2-3',
        name: 'Painting & Compositing',
        description:
          'After layout, the browser paints visual properties (colors, borders, shadows, text) into layers, then composites those layers together in the correct order to produce the final frame. This two-phase approach enables smooth 60fps animations by updating only affected layers.',
        keyPoints: [
          'Painting records draw operations (draw rectangle, draw text, draw image) into display lists — the actual rasterization (converting vector commands into pixels) happens on the raster threads or GPU',
          'The browser creates compositing layers for elements that need independent updates: elements with CSS transforms/opacity animations, position:fixed elements, elements with will-change, and elements that overlap other composited layers',
          'Compositing happens on the compositor thread, separate from the main thread — this is why CSS transform and opacity animations can run at 60fps even when JavaScript is blocking the main thread, as the compositor can update layer positions without involving the main thread',
          'The paint order follows the CSS stacking context specification: backgrounds and borders, negative z-index children, block-level descendants, float descendants, inline descendants, positioned descendants with z-index, in that order',
          'Rasterization in Chrome uses Skia (a 2D graphics library) on the CPU or GPU — with GPU rasterization (OOP-R, out-of-process rasterization), tiles are rasterized as GPU textures, avoiding costly CPU-to-GPU texture uploads',
        ],
        tradeoffs: [
          'Promoting elements to compositing layers (translateZ(0), will-change) enables GPU-accelerated animations but each layer consumes GPU memory — on mobile devices with limited GPU memory, excessive layers cause performance degradation or even crashes',
          'Painting is skip-able if only composited properties (transform, opacity) change, but any change to color, background, box-shadow, or text properties triggers a repaint of the affected layer — understanding which properties trigger paint is critical for animation performance',
          'The compositor can handle scroll events independently (fast scrolling) unless the page registers a non-passive touch/wheel event listener on the scrolling element — this is why { passive: true } on scroll listeners is important for scroll performance',
        ],
        realWorld: [
          'Chrome DevTools Rendering tab has "Paint flashing" which highlights repainted areas in green — this is the primary tool for identifying unnecessary repaints caused by CSS changes or DOM updates',
          'Chrome\'s Layers panel (More tools > Layers) shows the compositing layer tree with reasons why each layer was created, its memory usage, and its paint count — essential for debugging layer explosion issues',
          'CSS animations using transform:translateX() instead of left:Xpx run entirely on the compositor thread, which is why all modern animation libraries (Framer Motion, GSAP) prefer transform-based animations over layout-triggering properties',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'JavaScript Engines',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'How JavaScript engines like V8, SpiderMonkey, and JavaScriptCore parse, compile, and execute JavaScript code using sophisticated JIT compilation pipelines and memory management strategies.',
    concepts: [
      {
        id: '3-1',
        name: 'V8, SpiderMonkey & JavaScriptCore Internals',
        description:
          'Each major browser has its own JavaScript engine with a distinct architecture for parsing, compiling, and executing JavaScript. Understanding their internals reveals why performance characteristics differ across browsers.',
        keyPoints: [
          'V8 (Chrome/Node.js) uses a pipeline: Parser -> Ignition (bytecode interpreter) -> Sparkplug (non-optimizing compiler) -> Maglev (mid-tier compiler) -> TurboFan (optimizing compiler) — this multi-tier approach balances startup speed with peak performance',
          'SpiderMonkey (Firefox) uses a similar tiered pipeline: Parser -> Bytecode Interpreter -> Baseline JIT -> WarpMonkey (optimizing JIT, successor to IonMonkey) — it pioneered tracing JIT compilation before switching to method-based compilation',
          'JavaScriptCore (Safari) uses a four-tier pipeline: LLInt (Low Level Interpreter) -> Baseline JIT -> DFG (Data Flow Graph) JIT -> FTL (Faster Than Light) JIT using B3 backend — it was the first engine to introduce a four-tier architecture',
          'All engines perform hidden class (V8 "Maps", SpiderMonkey "Shapes", JSC "Structures") optimization — objects with the same property order share the same hidden class, enabling inline caching for fast property access',
          'Inline caches (ICs) are the most critical optimization in all engines — when a property access (obj.x) is first executed, the engine records the hidden class and offset, and subsequent accesses with the same shape skip the full lookup entirely',
        ],
        tradeoffs: [
          'More compilation tiers improve peak performance but increase memory usage (each tier stores additional compiled code) and warm-up time — V8\'s addition of Sparkplug and Maglev was driven by the need to fill the performance gap between Ignition and TurboFan faster',
          'Ahead-of-time bytecode caching (V8 code caching, JSC bytecode caching) speeds up repeat page loads but requires cache invalidation strategies and storage space',
          'Engine-specific optimizations (like V8\'s fast path for Array.prototype.map on packed SMI arrays) mean that the same JavaScript code can have very different performance profiles across browsers',
        ],
        realWorld: [
          'Node.js, Deno, and Bun all use different JavaScript engines (V8, V8, and JavaScriptCore respectively) — Bun\'s choice of JSC was partly motivated by JSC\'s faster startup time compared to V8',
          'Chrome\'s V8 blog publishes detailed posts on engine optimizations — their article on pointer compression saved 40% of V8\'s heap memory on 64-bit systems by using 32-bit compressed pointers with a base register',
          'React Native\'s Hermes engine was built specifically for mobile with ahead-of-time bytecode compilation to skip parsing and compilation on device, trading peak throughput for startup speed — a fundamentally different tradeoff than desktop engines',
        ],
      },
      {
        id: '3-2',
        name: 'JIT Compilation',
        description:
          'Just-In-Time compilation dynamically translates JavaScript bytecode into optimized machine code during execution, using type feedback and speculative optimizations to approach the performance of statically-typed compiled languages.',
        keyPoints: [
          'The JIT compiler observes type information during interpretation (type feedback) — if a function always receives integers, the JIT generates machine code specialized for integer arithmetic, bypassing the generic Number handling',
          'Speculative optimization: the JIT compiles code assuming observed types will continue (e.g., a + b is always integer addition) and inserts guards (type checks) — if a guard fails at runtime, the engine performs deoptimization, discarding the optimized code and falling back to the interpreter',
          'On-stack replacement (OSR) allows the engine to switch from interpreted to JIT-compiled code in the middle of a running function — critical for long-running loops that become hot during execution',
          'Inlining is the most impactful JIT optimization: small, frequently-called functions are copied directly into the caller\'s compiled code, eliminating call overhead and enabling further optimizations across the inlined code',
          'Escape analysis determines if an object allocated inside a function is never referenced outside it — if so, the JIT can allocate it on the stack (or eliminate it entirely) instead of the heap, avoiding garbage collection overhead',
        ],
        tradeoffs: [
          'JIT compilation trades startup latency for peak throughput — the first execution of code runs in the interpreter, and it may take hundreds or thousands of invocations before the optimizing JIT produces fast machine code',
          'Deoptimization (bailout) is expensive: the engine must reconstruct the interpreter stack frame from the optimized code\'s state, discard compiled code, and resume in the interpreter — megamorphic call sites that trigger frequent deoptimization can be slower than staying interpreted',
          'JIT compilation consumes memory for compiled code and metadata — on memory-constrained mobile devices, engines may limit JIT tier depth or disable certain optimizations to reduce memory pressure',
        ],
        realWorld: [
          'TypeScript and Flow type annotations do not directly help JIT compilation (they are erased before execution), but writing monomorphic code (consistent types) naturally aligns with what JIT compilers optimize best',
          'V8\'s --trace-opt and --trace-deopt flags (usable in Node.js) show exactly which functions are optimized and deoptimized, and why — invaluable for diagnosing performance cliffs in hot code paths',
          'Apple\'s JIT restrictions on iOS require special entitlements for apps to use JIT compilation — this is why browsers on iOS cannot use their own JIT and must use WebKit\'s JavaScriptCore, which has the necessary entitlements',
        ],
      },
      {
        id: '3-3',
        name: 'Garbage Collection & Memory Management',
        description:
          'JavaScript engines use automatic memory management through garbage collection (GC) to reclaim memory from objects that are no longer reachable. Modern GC algorithms are generational and concurrent, designed to minimize pause times while handling gigabytes of heap data.',
        keyPoints: [
          'V8 uses a generational garbage collector: the young generation (nursery) uses a semi-space scavenger that copies surviving objects between two equal-sized spaces, and the old generation uses mark-sweep-compact for long-lived objects',
          'The generational hypothesis states that most objects die young — V8\'s young generation is typically 1-8 MB and is collected in 1-2ms, while major (old generation) GC cycles can take 10-50ms but happen less frequently',
          'Concurrent and incremental marking: V8\'s Orinoco GC performs most of the marking work on background threads concurrently with JavaScript execution, and the remaining work is done incrementally in small steps to avoid long pauses',
          'WeakRef and FinalizationRegistry (ES2021) give developers limited control over GC behavior — WeakRef allows holding a reference that does not prevent garbage collection, and FinalizationRegistry provides a callback when an object is collected',
          'Memory leaks in JavaScript typically come from: uncleared event listeners, closures capturing large scopes, detached DOM trees (removed from document but referenced in JavaScript), and forgotten setInterval/setTimeout references',
        ],
        tradeoffs: [
          'Generational GC optimizes for the common case (short-lived objects) but objects that survive multiple young-generation collections are promoted to the old generation, where collection is more expensive — creating many medium-lived objects (like React fiber nodes) can stress both generations',
          'Concurrent GC reduces pause times but requires write barriers (extra checks on every pointer write) to track modifications made by the mutator while the GC is marking — these barriers add constant overhead to all pointer-heavy code',
          'Compacting the old generation heap reduces fragmentation and improves cache locality but requires moving objects and updating all pointers to them — this is the most expensive GC operation and can cause observable pauses even with concurrent marking',
        ],
        realWorld: [
          'Chrome DevTools Memory panel provides heap snapshots, allocation timelines, and allocation sampling — heap snapshots show object counts and retained sizes, and comparing two snapshots reveals leaked objects',
          'The "Detached HTMLDivElement" pattern is the most common memory leak in SPAs — a component removes a DOM node but a closure, event listener, or global reference still holds a JavaScript reference to it, preventing GC',
          'Node.js servers with memory leaks gradually increase their resident set size (RSS) over hours/days — tools like clinic.js and the --inspect flag with Chrome DevTools are standard for diagnosing server-side memory leaks',
        ],
      },
    ],
  },

  // Part 2: Networking & Performance
  {
    id: 4,
    title: 'Browser Networking',
    part: 2,
    partTitle: 'Networking & Performance',
    summary:
      'How browsers manage network connections, implement HTTP/2 and HTTP/3 protocols, handle TLS security, and use preloading techniques to accelerate page loads.',
    concepts: [
      {
        id: '4-1',
        name: 'HTTP/2 & HTTP/3 (QUIC)',
        description:
          'HTTP/2 introduced multiplexing over a single TCP connection to eliminate head-of-line blocking at the HTTP layer, while HTTP/3 replaces TCP with QUIC (UDP-based) to eliminate head-of-line blocking at the transport layer as well.',
        keyPoints: [
          'HTTP/2 multiplexes multiple request/response streams over a single TCP connection using binary framing — each stream has a unique ID, and frames from different streams can be interleaved, eliminating the need for multiple TCP connections (the 6-connection-per-origin limit workaround)',
          'HTTP/2 server push allows the server to proactively send resources before the client requests them (e.g., pushing main.css when index.html is requested) — but adoption has been low and Chrome removed push support in 2022 due to poor real-world performance',
          'HTTP/3 uses QUIC (originally Quick UDP Internet Connections, developed by Google) as the transport layer — QUIC provides connection multiplexing at the transport level, so a lost packet on one stream does not block other streams (solving TCP\'s head-of-line blocking)',
          'QUIC integrates TLS 1.3 directly into the transport handshake, achieving 0-RTT connection establishment for repeat connections (vs TCP+TLS requiring 2-3 round trips) — this significantly improves page load times on high-latency mobile networks',
          'HTTP/2 HPACK and HTTP/3 QPACK use header compression with static and dynamic tables to reduce header overhead — particularly impactful for requests with large Cookie headers or many custom headers',
        ],
        tradeoffs: [
          'HTTP/2 multiplexing over a single TCP connection means a single packet loss triggers TCP-level head-of-line blocking for all streams — this was the primary motivation for HTTP/3/QUIC, which uses independent streams at the transport layer',
          'QUIC/HTTP/3 runs over UDP, which some corporate firewalls and middleboxes block or throttle — browsers implement fallback to HTTP/2 over TCP, and typically race both protocols during connection establishment',
          'HTTP/2 eliminated the need for domain sharding and sprite sheets (concatenation hacks for HTTP/1.1), but the shift means these old "best practices" can actually hurt HTTP/2 performance by preventing multiplexing',
        ],
        realWorld: [
          'Google, Cloudflare, and Facebook were early adopters of HTTP/3 — Cloudflare reported 12.4% improvement in time-to-first-byte for HTTP/3 compared to HTTP/2, with the biggest gains on mobile networks with packet loss',
          'Chrome DevTools Network panel shows the protocol column (h2 or h3) for each request, and the Timing tab shows the QUIC handshake timing — use "Protocol" column to verify HTTP/3 is being used',
          'curl supports HTTP/3 with the --http3 flag (requires HTTP/3 backend like quiche or ngthttp3) — useful for testing HTTP/3 support on your servers outside the browser',
        ],
      },
      {
        id: '4-2',
        name: 'TLS Handshake & Certificate Validation',
        description:
          'Transport Layer Security (TLS) encrypts all data between the browser and server. The TLS handshake negotiates cipher suites and authenticates the server via X.509 certificates, while modern TLS 1.3 reduces the handshake to a single round trip.',
        keyPoints: [
          'TLS 1.3 simplified the handshake to 1-RTT (vs TLS 1.2\'s 2-RTT) by combining the key exchange and server parameters into fewer messages — the client sends its key shares in the first message (ClientHello), and the server can start sending encrypted data after its first response',
          'Certificate validation follows a chain of trust: the server presents its certificate, signed by an intermediate CA, signed by a root CA that the browser trusts — browsers ship with a root certificate store (Chrome uses the platform store on Windows/macOS, and Chrome Root Store on other platforms)',
          'Certificate Transparency (CT) requires CAs to log all issued certificates to public append-only logs — browsers (Chrome since 2018) require CT compliance and will reject certificates not logged, preventing misissued certificates from going undetected',
          'OCSP (Online Certificate Status Protocol) stapling allows the server to include a signed, timestamped OCSP response in the TLS handshake, proving the certificate has not been revoked — this avoids the privacy issue and latency of the client querying the CA\'s OCSP responder directly',
          'TLS 1.3 0-RTT resumption allows clients to send encrypted application data in the first message of a resumed connection, but this data is vulnerable to replay attacks — servers must implement replay protection for 0-RTT data (or reject it for non-idempotent requests)',
        ],
        tradeoffs: [
          'TLS 1.3 removed support for older cipher suites (RSA key exchange, CBC mode ciphers, SHA-1) which improves security but can break compatibility with legacy servers and corporate inspection proxies that rely on RSA key exchange to decrypt traffic',
          'OCSP stapling reduces latency and improves privacy but requires server-side implementation — without stapling, browsers may soft-fail OCSP checks (treat unreachable OCSP responder as valid), which undermines revocation checking',
          'Extended Validation (EV) certificates were intended to provide higher trust with the green address bar, but browsers have largely removed visible EV indicators because research showed users did not understand or notice them',
        ],
        realWorld: [
          'Let\'s Encrypt provides free, automated TLS certificates with 90-day lifespans and ACME protocol for renewal — they issue over 300 million active certificates and are a major reason HTTPS adoption exceeded 95% of web traffic',
          'Chrome\'s Security panel shows the TLS version, cipher suite, and certificate chain for the current page — clicking the certificate shows the full chain from leaf to root CA',
          'Cloudflare, AWS CloudFront, and Fastly all support TLS 1.3 and 0-RTT by default — Cloudflare reported that TLS 1.3 reduced connection setup time by 33% compared to TLS 1.2',
        ],
      },
      {
        id: '4-3',
        name: 'Connection Management & Preloading',
        description:
          'Browsers use resource hints, priority signals, and connection management strategies to fetch critical resources as early as possible, reducing page load times by overlapping network operations with parsing and rendering.',
        keyPoints: [
          '<link rel="preconnect"> establishes the TCP connection and TLS handshake to a specified origin before any resource is requested — saving 100-500ms for third-party origins (fonts.googleapis.com, CDN origins) by front-loading the connection setup',
          '<link rel="preload"> tells the browser to fetch a specific resource immediately with high priority, even before the parser discovers it — essential for fonts, hero images, and critical scripts that are referenced deep in CSS or loaded dynamically',
          '<link rel="prefetch"> fetches resources for future navigations at low priority during idle time — used for next-page resources in multi-page apps, but wasted bandwidth if the user does not navigate to the prefetched page',
          'The Priority Hints API (fetchpriority attribute) allows developers to signal relative importance of resources: fetchpriority="high" on LCP images, fetchpriority="low" on below-the-fold images — this overrides the browser\'s default priority heuristics',
          'The browser\'s preload scanner (speculative parser) runs ahead of the main HTML parser when it is blocked by a script — it scans the remaining HTML for <img>, <link>, <script>, and other resource tags and begins fetching them in parallel',
        ],
        tradeoffs: [
          'Preconnecting to too many origins wastes CPU and network resources on connection setup that may never be used — limit preconnect to 2-4 critical third-party origins',
          'Preloading resources that are not used within 3 seconds triggers a console warning in Chrome ("The resource was preloaded but not used") — incorrect preload hints waste bandwidth and can delay more important resources',
          'Early Hints (HTTP 103) allows the server to send preload/preconnect hints before the final response, but requires server and CDN support, and the browser must handle the informational response correctly',
        ],
        realWorld: [
          'Google Fonts recommends <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> to establish the connection to the font file origin — this eliminates a full round-trip from the critical rendering path for web fonts',
          'Next.js automatically adds <link rel="prefetch"> for all visible <Link> components, preloading the JavaScript bundles for pages the user is likely to navigate to — this makes client-side navigation appear instant',
          'Shopify reported a 50% improvement in LCP by adding fetchpriority="high" to hero product images and fetchpriority="low" to carousel images below the fold',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Caching & Storage',
    part: 2,
    partTitle: 'Networking & Performance',
    summary:
      'How browsers cache HTTP responses, persist data locally using various storage APIs, and leverage Service Workers with the Cache API for fine-grained offline control.',
    concepts: [
      {
        id: '5-1',
        name: 'HTTP Caching (ETag, Cache-Control)',
        description:
          'HTTP caching allows browsers to reuse previously fetched responses, reducing network requests and improving load times. Cache-Control headers dictate caching behavior, while ETags and Last-Modified enable conditional requests for revalidation.',
        keyPoints: [
          'Cache-Control: max-age=31536000, immutable tells the browser to use the cached response for up to one year without revalidating — used for fingerprinted static assets (main.a1b2c3.js) that never change at the same URL',
          'Cache-Control: no-cache does NOT mean "do not cache" — it means the browser must revalidate with the server before using the cached copy (using If-None-Match or If-Modified-Since), which can return a 304 Not Modified with no body if the content has not changed',
          'ETag is a server-generated opaque identifier (often a hash of the content) — the browser sends it back as If-None-Match on subsequent requests, and the server returns 304 if the ETag matches, saving bandwidth by not resending the body',
          'The browser maintains multiple cache layers: memory cache (in-process, cleared on tab close), disk cache (persisted across sessions, shared across tabs), and the HTTP cache (following Cache-Control semantics) — resources can be served from any layer',
          'stale-while-revalidate is a Cache-Control extension that tells the browser to serve the stale cached response immediately while fetching a fresh copy in the background — providing instant response with eventual consistency',
        ],
        tradeoffs: [
          'Long max-age values with fingerprinted filenames provide optimal caching but require a build system that generates unique filenames on content change — cache-busting without fingerprinting (query strings like ?v=2) is fragile and not honored by all CDNs',
          'no-store is the only way to prevent ALL caching (memory, disk, CDN) — no-cache still allows caching with revalidation, which may be insufficient for sensitive data like banking pages',
          'Vary header allows the server to specify which request headers affect the cached response (e.g., Vary: Accept-Encoding) — but Vary on high-cardinality headers like User-Agent effectively disables caching',
        ],
        realWorld: [
          'Vite, webpack, and other bundlers generate content-hashed filenames (main.a1b2c3.js) by default — this enables infinite caching (max-age=31536000,immutable) because a content change produces a new filename',
          'Cloudflare, Vercel, and Netlify automatically set appropriate Cache-Control headers for static assets and revalidation headers for dynamic HTML pages — understanding caching is essential for configuring CDN behavior correctly',
          'The Chrome DevTools Network panel shows "from disk cache" and "from memory cache" in the Size column, and the Disable Cache checkbox forces the browser to always revalidate — essential for testing cache behavior during development',
        ],
      },
      {
        id: '5-2',
        name: 'Browser Storage (Cookies, localStorage, IndexedDB)',
        description:
          'Browsers provide multiple client-side storage mechanisms with different capacities, APIs, and use cases. Understanding the tradeoffs between cookies, localStorage, sessionStorage, and IndexedDB is essential for choosing the right storage for each purpose.',
        keyPoints: [
          'Cookies are the oldest storage mechanism (4KB per cookie, ~80 cookies per domain) — they are automatically sent with every HTTP request to the matching domain, making them ideal for authentication tokens but a bandwidth concern for static assets (which is why CDNs use separate cookie-free domains)',
          'localStorage provides 5-10MB of synchronous key-value storage per origin that persists until explicitly cleared — it is simple but blocks the main thread during reads/writes and is not available in Web Workers or Service Workers',
          'IndexedDB is a full asynchronous NoSQL database in the browser with support for indexes, cursors, transactions, and structured cloning — it can store hundreds of MB to several GB depending on available disk space and browser quotas',
          'sessionStorage has the same API as localStorage but is scoped to the browser tab (not shared across tabs) and cleared when the tab is closed — useful for per-tab state like form draft data or wizard step progress',
          'The Storage API (navigator.storage.estimate()) reports current usage and quota, and navigator.storage.persist() requests that the browser not evict the origin\'s data under storage pressure — without persistence, the browser can silently delete IndexedDB and Cache API data when disk space is low',
        ],
        tradeoffs: [
          'Cookies are automatically sent with every HTTP request, which enables seamless authentication but wastes bandwidth for non-authenticated requests — SameSite attribute (Lax by default in modern browsers) limits cross-site cookie sending to mitigate CSRF',
          'localStorage is synchronous and simple but blocks the main thread and is limited to string values (requiring JSON.stringify/parse for objects) — for anything beyond trivial key-value storage, IndexedDB is preferred despite its more complex API',
          'IndexedDB\'s API is verbose and callback-heavy — wrapper libraries like idb (by Jake Archibald), Dexie.js, and localForage provide Promise-based and simpler APIs that make IndexedDB practical for application development',
        ],
        realWorld: [
          'Chrome\'s Application panel in DevTools shows all storage types (cookies, localStorage, sessionStorage, IndexedDB, Cache Storage) with the ability to inspect, edit, and delete entries — the "Clear site data" button wipes everything for the origin',
          'Google\'s Workbox library uses IndexedDB internally to track which assets have been precached by the Service Worker, and Cache API for the actual response storage — combining both storage types for different purposes',
          'The EU GDPR and ePrivacy Directive require consent for non-essential cookies — this led to the cookie consent banner ecosystem, but localStorage, IndexedDB, and other storage APIs are also covered by the same regulations',
        ],
      },
      {
        id: '5-3',
        name: 'Cache API & Service Workers',
        description:
          'The Cache API provides a programmatic, Promise-based interface for storing and retrieving HTTP request/response pairs, and is most commonly used within Service Workers to implement offline-first strategies and fine-grained caching policies.',
        keyPoints: [
          'The Cache API (caches.open(), cache.put(), cache.match()) stores Request/Response pairs and is available in both Service Workers and the main thread — unlike HTTP caching, the developer has full programmatic control over what is cached and when it is evicted',
          'Service Workers act as a network proxy between the page and the server — they intercept every fetch event and can respond from the Cache API, the network, or a combination, enabling strategies like cache-first, network-first, stale-while-revalidate, and cache-only',
          'Cache-first strategy: check the Cache API first, and only fetch from the network if the cache misses — ideal for static assets (CSS, JS, images) that are fingerprinted and immutable',
          'Network-first strategy: attempt a network fetch first, and fall back to the cache on failure — ideal for dynamic API data where freshness is preferred but offline access is needed as a fallback',
          'Precaching fills the Cache API during the Service Worker install event with a list of URLs (the app shell: HTML, CSS, JS, fonts) — tools like Workbox generate the precache manifest from the build output automatically, including content hashes for cache invalidation',
        ],
        tradeoffs: [
          'The Cache API has no built-in expiration — developers must implement their own cache eviction policies (max entries, max age, or manual cleanup during Service Worker activation) to prevent unbounded storage growth',
          'Service Workers introduce complexity around updates: a new Service Worker is installed but waits to activate until all tabs using the old version are closed (unless skipWaiting() is called) — this can cause confusing behavior where deployed updates are not visible',
          'Cache API storage counts against the origin\'s storage quota alongside IndexedDB — excessive caching can trigger quota eviction in browsers, especially in Incognito mode where quotas are severely reduced',
        ],
        realWorld: [
          'Google Workbox provides high-level modules (workbox-precaching, workbox-strategies, workbox-routing) that abstract away the complexity of Service Worker caching patterns — it is the industry standard for production Service Worker implementations',
          'Twitter\'s Progressive Web App uses a Service Worker with a network-first strategy for the timeline API and cache-first for static assets — enabling offline access to previously loaded tweets',
          'Chrome DevTools Application > Cache Storage panel shows all named caches with their stored request/response pairs, allowing inspection of what the Service Worker has cached — the "Offline" checkbox simulates no network to test fallback behavior',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Performance Optimization',
    part: 2,
    partTitle: 'Networking & Performance',
    summary:
      'Techniques for optimizing the critical rendering path, reducing bundle sizes through lazy loading and code splitting, and measuring real-user performance using Core Web Vitals.',
    concepts: [
      {
        id: '6-1',
        name: 'Critical Rendering Path',
        description:
          'The Critical Rendering Path (CRP) is the sequence of steps the browser must complete before rendering the first pixel — optimizing it means reducing the number and size of render-blocking resources to achieve the fastest possible First Contentful Paint.',
        keyPoints: [
          'The CRP consists of: HTML download -> HTML parsing + DOM construction -> CSS download -> CSSOM construction -> Render tree -> Layout -> Paint — any resource that blocks these steps is "render-blocking" and directly delays first paint',
          'CSS is render-blocking by default: the browser will not paint anything until all CSS in <head> is downloaded and parsed — inlining critical CSS (above-the-fold styles) directly in the HTML eliminates this blocking request for the initial render',
          'JavaScript in <head> without defer/async is parser-blocking: the parser stops, downloads the script, executes it (during which it may modify the DOM via document.write), then resumes parsing — every synchronous script adds at least one round-trip to the CRP',
          'The CRP can be measured by the number of critical resources, total critical bytes, and the minimum critical path length (round trips) — tools like Lighthouse report CRP metrics and suggest optimizations',
          'Server-Side Rendering (SSR) and Static Site Generation (SSG) fundamentally change the CRP by sending fully rendered HTML from the server — the browser can paint meaningful content before any JavaScript is downloaded or executed',
        ],
        tradeoffs: [
          'Inlining critical CSS eliminates a blocking request but increases the HTML document size and prevents CSS caching — the typical approach is to inline only above-the-fold styles (extracted by tools like critical/critters) and load the full stylesheet asynchronously',
          'Reducing CRP length by eliminating render-blocking resources can cause FOUC (Flash of Unstyled Content) or FOIT (Flash of Invisible Text for fonts) if the deferred CSS/fonts load visibly late — balancing speed with visual stability is a design decision',
          'SSR improves First Contentful Paint but increases Time to Interactive if the JavaScript bundle is large — the user sees content but cannot interact until the framework hydrates, leading to the "uncanny valley" of non-interactive rendered content',
        ],
        realWorld: [
          'Lighthouse (built into Chrome DevTools) audits CRP optimization under the Performance category — it flags render-blocking resources, recommends inlining critical CSS, and simulates network throttling to reveal CRP bottlenecks',
          'Google\'s AMP (Accelerated Mobile Pages) project was built entirely around CRP optimization: inline CSS only, async JS only, static layout — while controversial, it demonstrated the performance gains possible from strict CRP discipline',
          'Next.js automatically inlines critical CSS, defers non-critical CSS, and uses streaming SSR with React Suspense to progressively render content — implementing most CRP optimizations by default',
        ],
      },
      {
        id: '6-2',
        name: 'Lazy Loading & Code Splitting',
        description:
          'Lazy loading defers the loading of non-critical resources until they are needed, while code splitting divides JavaScript bundles into smaller chunks loaded on demand. Together they reduce initial page load time by loading only what the user needs right now.',
        keyPoints: [
          'Native lazy loading (loading="lazy" on <img> and <iframe>) defers loading of offscreen images/iframes until the user scrolls near them — the browser uses an intersection observer internally with a distance threshold that varies by connection speed',
          'Dynamic import() is the standard mechanism for code splitting in JavaScript — import("./module.js") returns a Promise that resolves to the module, allowing bundlers (Vite, webpack, Rollup) to split the module into a separate chunk loaded on demand',
          'Route-based code splitting loads only the JavaScript needed for the current page/route — React.lazy() with Suspense, and framework routers (React Router, Vue Router, Next.js) implement this automatically',
          'Vendor chunk splitting separates third-party library code (React, lodash, date-fns) from application code — since vendor code changes less frequently, it can be cached long-term while application chunks are updated independently',
          'Tree shaking (dead code elimination) removes unused exports from the final bundle during build time — it relies on ES module static import/export syntax and is defeated by CommonJS require() or side-effectful modules',
        ],
        tradeoffs: [
          'Aggressive code splitting creates many small chunks that each require a separate HTTP request — on HTTP/1.1 this can cause request waterfall delays, but HTTP/2 multiplexing makes many small chunks efficient (the optimal chunk size is smaller on HTTP/2)',
          'Lazy loading images with loading="lazy" can cause layout shift (CLS) if width and height attributes are not set — the browser reserves no space for the image until it starts loading, causing content to jump',
          'Over-splitting JavaScript leads to "chunk waterfalls" where chunk A imports chunk B which imports chunk C — each sequential import adds a network round trip, negating the benefit of smaller initial load',
        ],
        realWorld: [
          'Vite uses Rollup under the hood for production builds and automatically performs code splitting based on dynamic import() boundaries and shared dependencies — the manualChunks option allows fine-tuning chunk composition',
          'Chrome DevTools Coverage tab shows how much of each JavaScript and CSS file is actually used on the current page — typically 60-80% of shipped JavaScript is unused on the initial page load, highlighting the opportunity for better code splitting',
          'The React.lazy() and Suspense pattern for route-level code splitting: const About = React.lazy(() => import("./About")) with <Suspense fallback={<Spinner />}><About /></Suspense> — this is the standard pattern in modern React applications',
        ],
      },
      {
        id: '6-3',
        name: 'Core Web Vitals (LCP, FID, CLS)',
        description:
          'Core Web Vitals are Google\'s standardized metrics for measuring real-user experience: Largest Contentful Paint (loading), First Input Delay / Interaction to Next Paint (interactivity), and Cumulative Layout Shift (visual stability). They directly affect search ranking.',
        keyPoints: [
          'Largest Contentful Paint (LCP) measures the render time of the largest image, video, or text block visible in the viewport — target is under 2.5 seconds at the 75th percentile, and is the primary loading metric (replacing older metrics like FMP)',
          'Interaction to Next Paint (INP) replaced First Input Delay (FID) in March 2024 as the responsiveness metric — INP measures the latency from user input (click, tap, keypress) to the next visual update across ALL interactions during the page lifecycle, not just the first one',
          'Cumulative Layout Shift (CLS) quantifies unexpected layout shifts by summing impact fraction × distance fraction for all layout shifts that occur without user input — target is under 0.1, and is primarily caused by images without dimensions, dynamically injected ads, and late-loading web fonts',
          'These metrics are measured in the field (real user monitoring via CrUX dataset) at the 75th percentile — lab tools (Lighthouse, WebPageTest) provide approximations but may not match real-world scores due to device and network variability',
          'The web-vitals JavaScript library (by Google) provides a simple API to measure LCP, INP, CLS, FCP, and TTFB in production — send these metrics to your analytics backend to track real-user performance over time',
        ],
        tradeoffs: [
          'Optimizing LCP often requires prioritizing the hero image/text at the expense of other resources (using fetchpriority="high", preloading the LCP image, and deferring non-critical resources) — this can complicate build pipelines and resource loading strategies',
          'INP is harder to optimize than FID because it measures ALL interactions, not just the first — long tasks from React re-renders, expensive DOM updates, or third-party scripts can cause poor INP scores that were invisible in the FID metric',
          'CLS optimization (setting explicit width/height on images, reserving ad slot space) requires coordination between developers, designers, and ad operations — and the CLS metric counts layout shifts for the entire page lifecycle, including those from user-triggered lazy loading',
        ],
        realWorld: [
          'Google Search uses Core Web Vitals as a ranking signal — sites passing all three metrics get a page experience boost in search results, measurable in Google Search Console\'s Core Web Vitals report',
          'Chrome\'s PageSpeed Insights (web.dev/measure) combines Lighthouse lab data with real-user CrUX field data to provide both immediate diagnostics and real-world performance scores',
          'The Chrome Web Vitals extension displays LCP, INP, and CLS in real time as a badge on every page — and the Performance panel in DevTools highlights "Layout Shift" events in the timeline with the affected elements highlighted',
        ],
      },
    ],
  },

  // Part 3: Security & APIs
  {
    id: 7,
    title: 'Browser Security Model',
    part: 3,
    partTitle: 'Security & APIs',
    summary:
      'The layered security architecture browsers use to protect users, including the same-origin policy, CORS, Content Security Policy, process sandboxing, and site isolation.',
    concepts: [
      {
        id: '7-1',
        name: 'Same-Origin Policy & CORS',
        description:
          'The Same-Origin Policy (SOP) is the fundamental security boundary of the web platform, restricting how documents and scripts from one origin can interact with resources from another origin. Cross-Origin Resource Sharing (CORS) provides a controlled mechanism to relax this restriction.',
        keyPoints: [
          'An origin is defined as the combination of scheme (http/https), host (example.com), and port (443) — two URLs have the same origin only if all three components match exactly (https://a.example.com and https://b.example.com are different origins)',
          'SOP restricts: JavaScript reading cross-origin responses (fetch/XHR), accessing cross-origin iframe content (contentWindow.document), and reading cross-origin canvas data (tainted canvas from cross-origin images)',
          'CORS uses preflight OPTIONS requests for "non-simple" requests (PUT, DELETE, custom headers) — the server must respond with Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers to authorize the actual request',
          'Access-Control-Allow-Origin: * allows any origin to read the response but cannot be used with Access-Control-Allow-Credentials: true — credentialed cross-origin requests require the specific requesting origin in the header',
          'CORS is enforced by the browser, not the server — the server sends the response regardless of CORS headers, and the browser blocks JavaScript from reading the response if CORS headers are missing or incorrect (the network request still happens)',
        ],
        tradeoffs: [
          'SOP prevents legitimate cross-origin API access that modern web applications rely on — CORS was designed to safely relax SOP, but misconfigured CORS (reflecting the Origin header without validation, or using Access-Control-Allow-Origin: *) can create security vulnerabilities',
          'Wildcard (*) CORS is safe for truly public APIs but overly permissive for APIs that serve user-specific data — developers must understand that CORS is about protecting the user\'s browser, not the server (server-side authentication is still required)',
          'Preflight requests add latency to the first cross-origin request — setting Access-Control-Max-Age allows browsers to cache preflight responses, but this requires careful configuration to balance security with performance',
        ],
        realWorld: [
          'CORS errors are the most common browser security errors encountered by web developers — Chrome DevTools Console shows detailed CORS error messages indicating which header is missing or incorrect',
          'JSONP (JSON with Padding) was the pre-CORS workaround for cross-origin data access using <script> tags — it is a security risk (arbitrary code execution) and should never be used in new applications',
          'Cloudflare Workers, AWS API Gateway, and Vercel Edge Functions all provide CORS header configuration — misconfiguring these at the CDN/edge level is a common source of CORS issues in production',
        ],
      },
      {
        id: '7-2',
        name: 'Content Security Policy (CSP)',
        description:
          'Content Security Policy is an HTTP header that allows web applications to declare which sources of content (scripts, styles, images, fonts, frames) are trusted, providing a defense-in-depth layer against Cross-Site Scripting (XSS) and data injection attacks.',
        keyPoints: [
          'CSP is delivered via the Content-Security-Policy HTTP header or <meta http-equiv="Content-Security-Policy"> tag — it defines per-resource-type source allowlists using directives like script-src, style-src, img-src, font-src, connect-src, frame-src',
          'script-src \'nonce-abc123\' allows only script elements with a matching nonce attribute to execute — nonces must be unique per response and cryptographically random, providing fine-grained control over which inline scripts are trusted',
          'strict-dynamic in script-src tells the browser to trust any script loaded by an already-trusted script (via createElement(\'script\')) — this enables modern bundled/chunked applications to work with CSP without listing every chunk URL',
          'CSP report-uri (deprecated) and report-to directives instruct the browser to send JSON violation reports to a specified endpoint — enabling monitoring of potential XSS attacks and CSP misconfigurations in production',
          'default-src \'none\' with explicitly listed per-type directives is the strictest CSP policy — it denies everything by default and requires each resource type to be explicitly allowed, following the principle of least privilege',
        ],
        tradeoffs: [
          'Strict CSP (nonce-based or hash-based) effectively prevents XSS but requires server-side nonce generation for every response and careful inline script management — frameworks like Next.js have built-in nonce support, but legacy applications may require significant refactoring',
          'CSP report-only mode (Content-Security-Policy-Report-Only) allows deploying CSP non-blocking for testing — violations are reported but not enforced, which is essential for rolling out CSP on existing applications without breaking functionality',
          'Overly permissive CSP (unsafe-inline, unsafe-eval, data: URIs) provides little security benefit and creates a false sense of security — a CSP that allows unsafe-inline for scripts does not prevent most XSS attacks',
        ],
        realWorld: [
          'Google\'s CSP Evaluator (csp-evaluator.withgoogle.com) analyzes CSP headers and reports weaknesses — it flags common issues like unsafe-inline, overly broad source lists, and missing directives',
          'GitHub deploys one of the strictest CSPs on the web: nonce-based script-src with strict-dynamic, no unsafe-inline or unsafe-eval — their CSP has prevented exploitation of XSS vulnerabilities that passed code review',
          'Report-URI and Sentry provide CSP violation reporting services that aggregate and analyze violation reports at scale — critical for organizations deploying CSP across many applications',
        ],
      },
      {
        id: '7-3',
        name: 'Sandboxing & Site Isolation',
        description:
          'Browser sandboxing restricts the capabilities of renderer processes at the OS level, while site isolation ensures that content from different origins runs in separate processes. Together they create defense-in-depth against both web content exploits and speculative execution attacks.',
        keyPoints: [
          'Chrome\'s sandbox uses OS-level mechanisms: on Linux it combines seccomp-bpf (system call filtering) with namespaces; on Windows it uses restricted tokens, job objects, and low-integrity levels; on macOS it uses Seatbelt (sandbox profiles) — each renderer process has minimal OS permissions',
          'Site Isolation (Chrome 67+, Firefox Fission) ensures that content from different sites runs in separate renderer processes — even cross-origin iframes get their own process, preventing a compromised renderer from reading another site\'s data',
          'The sandbox attribute on <iframe> restricts the embedded content\'s capabilities: sandbox without values blocks scripts, forms, popups, and navigation — individual capabilities can be re-enabled with tokens like allow-scripts, allow-same-origin, allow-popups',
          'Cross-Origin-Opener-Policy (COOP) and Cross-Origin-Embedder-Policy (COEP) together enable crossOriginIsolated state, which is required for SharedArrayBuffer and high-resolution performance.now() — COOP isolates the browsing context group, COEP ensures all subresources consent to being embedded',
          'The Spectre attack (2018) demonstrated that JavaScript could read arbitrary process memory via speculative execution side channels — site isolation was Chrome\'s primary mitigation, ensuring that cross-origin data is never in the same process address space as untrusted JavaScript',
        ],
        tradeoffs: [
          'Site Isolation significantly increases memory usage because each site instance requires its own renderer process with its own V8 isolate and heap — Chrome addressed this with memory optimizations like pointer compression and discardable memory for inactive tabs',
          'The iframe sandbox attribute is powerful but tricky: allow-scripts + allow-same-origin together effectively remove the sandbox (the framed content can remove its own sandbox attribute) — this combination should be avoided unless the framed content is trusted',
          'COOP/COEP requirements for crossOriginIsolated break backward compatibility: all cross-origin resources must have CORP (Cross-Origin-Resource-Policy) headers or CORS, which requires cooperation from third-party servers that may not implement these headers',
        ],
        realWorld: [
          'The Chromium sandbox design documents detail the exact OS mechanisms used per platform — Chrome\'s security team considers the sandbox the most critical security boundary, and sandbox escape bugs command the highest bug bounty rewards ($50,000+)',
          'Google\'s Spectre vulnerability disclosure led to browsers reducing the precision of performance.now() to 5 microseconds, disabling SharedArrayBuffer entirely (later restored behind COOP/COEP), and accelerating site isolation deployment',
          'The Chromium Vulnerability Rewards Program pays up to $250,000+ for a full sandbox escape chain (renderer exploit + sandbox escape) — demonstrating the critical importance of the sandbox as a security boundary',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Web APIs',
    part: 3,
    partTitle: 'Security & APIs',
    summary:
      'The core Web APIs that browsers expose to JavaScript for DOM manipulation, event handling, network requests, and parallel computation using Web Workers.',
    concepts: [
      {
        id: '8-1',
        name: 'DOM & Events API',
        description:
          'The Document Object Model (DOM) is the browser\'s in-memory representation of an HTML document as a tree of nodes that JavaScript can read and manipulate. The Events API provides the mechanism for responding to user interactions and system events through the event loop.',
        keyPoints: [
          'The DOM is a live, mutable tree structure: document.createElement(), element.appendChild(), element.remove(), element.setAttribute() — each mutation can trigger style recalculation, layout, and repaint, which is why batching DOM writes is critical for performance',
          'Event propagation follows three phases: capture (from window down to the target), target (the element that triggered the event), and bubble (from target back up to window) — addEventListener\'s third argument controls whether the handler fires during capture or bubble phase',
          'Event delegation uses bubbling to handle events on parent elements instead of individual children — instead of 1000 click handlers on 1000 list items, one handler on the <ul> checks event.target to determine which item was clicked',
          'The MutationObserver API provides asynchronous notification of DOM changes (child additions/removals, attribute changes, text content changes) — it replaced the deprecated Mutation Events which caused severe performance issues due to synchronous firing',
          'requestAnimationFrame(callback) schedules a function to run before the next repaint (typically 60 times per second) — it is the correct API for visual updates, automatically pausing when the tab is in the background (unlike setInterval which continues running)',
        ],
        tradeoffs: [
          'Direct DOM manipulation is fast for simple operations but does not scale — frameworks like React use a virtual DOM to batch and diff updates, reducing the number of actual DOM mutations at the cost of the virtual DOM\'s own memory and computation overhead',
          'Event delegation reduces the number of event listeners but makes it harder to handle events on elements that do not bubble (focus, blur, scroll, mouseenter) — though focusin/focusout and pointerenter/pointerleave were introduced as bubbling alternatives',
          'MutationObserver is powerful for tracking DOM changes but can be expensive if observing a large subtree with many changes — callbacks are batched and delivered asynchronously as microtasks, which can cause visible delays if the observer does expensive work',
        ],
        realWorld: [
          'React\'s synthetic event system wraps native DOM events to provide consistent cross-browser behavior and uses event delegation internally — all events are registered on the React root element, not on individual DOM nodes',
          'Google Analytics and tag managers use MutationObserver to detect when new elements appear in the DOM (like dynamically loaded content) to attach tracking without modifying the application code',
          'The Intersection Observer API (a specialized observer) is used by virtually all lazy loading implementations, infinite scroll patterns, and "sticky header" implementations — it replaced expensive scroll event handlers with efficient browser-native intersection detection',
        ],
      },
      {
        id: '8-2',
        name: 'Fetch & XMLHttpRequest',
        description:
          'The Fetch API is the modern standard for making HTTP requests from JavaScript, replacing the older XMLHttpRequest (XHR). Fetch provides a cleaner Promise-based API with support for streaming, request/response body types, and integration with the Service Worker Cache API.',
        keyPoints: [
          'fetch() returns a Promise that resolves to a Response object — the Promise resolves even for HTTP error status codes (404, 500); only network failures (DNS failure, no connection) cause the Promise to reject, so developers must check response.ok or response.status',
          'Fetch supports the AbortController API for cancellation: const controller = new AbortController(); fetch(url, { signal: controller.signal }); controller.abort() — this is essential for canceling in-flight requests when a React component unmounts or a user navigates away',
          'Response.body is a ReadableStream, enabling streaming processing of large responses — response.body.getReader() provides chunk-by-chunk access to the response as it arrives from the network, enabling progress tracking and incremental rendering',
          'XMLHttpRequest still has one advantage over Fetch: upload progress events (xhr.upload.onprogress) — Fetch did not initially support upload progress, though the Streams API with a TransformStream can now achieve this',
          'Fetch request modes: cors (default, subject to CORS), no-cors (opaque response, no access to body/headers — used for Service Worker caching of cross-origin resources), same-origin (reject cross-origin requests entirely)',
        ],
        tradeoffs: [
          'Fetch\'s Promise-based API is cleaner than XHR\'s event-based API, but the lack of a built-in timeout mechanism (unlike XHR\'s timeout property) requires wrapping fetch in a Promise.race with a setTimeout-based timeout promise or using AbortSignal.timeout()',
          'Fetch with no-cors mode allows Service Workers to cache opaque cross-origin responses, but the response is not readable by JavaScript (status is 0, body is null) — it is only useful for caching purposes, not for reading data',
          'keepalive option in fetch allows requests to outlive the page (for analytics beacons sent during page unload) but is limited to 64KB total payload — navigator.sendBeacon() is the simpler alternative for this specific use case',
        ],
        realWorld: [
          'TanStack Query (React Query), SWR, and Apollo Client all use fetch() internally with wrappers that add caching, deduplication, retry logic, and stale-while-revalidate semantics — these libraries are the standard way to use fetch in production React applications',
          'The Server-Sent Events (SSE) pattern uses fetch with response.body streaming to receive real-time updates from the server — ChatGPT\'s streaming response uses this pattern, reading chunks of the response as they arrive',
          'navigator.sendBeacon(url, data) is a fire-and-forget POST request guaranteed to be sent even during page unload — it is the recommended API for analytics pings, as fetch() in unload/beforeunload handlers is unreliable',
        ],
      },
      {
        id: '8-3',
        name: 'Web Workers & SharedArrayBuffer',
        description:
          'Web Workers enable JavaScript to run in background threads separate from the main thread, preventing CPU-intensive operations from blocking the UI. SharedArrayBuffer allows multiple threads to share memory directly, enabling high-performance parallel computing in the browser.',
        keyPoints: [
          'Dedicated Workers (new Worker("worker.js")) run in a separate thread with their own global scope (self instead of window) — they communicate with the main thread via postMessage/onmessage, with data being copied (structured clone) unless Transferable objects are used',
          'Transferable objects (ArrayBuffer, MessagePort, OffscreenCanvas, ImageBitmap) can be transferred between threads with zero-copy semantics — the sending thread loses access to the object, and the receiving thread gains ownership, avoiding the cost of copying large data',
          'SharedArrayBuffer provides a fixed-length raw binary buffer that can be shared between the main thread and Workers without copying — combined with Atomics (Atomics.wait, Atomics.notify, Atomics.compareExchange), it enables lock-free data structures and synchronization primitives',
          'SharedArrayBuffer requires crossOriginIsolated context (COOP + COEP headers) due to Spectre mitigations — without these headers, SharedArrayBuffer is unavailable, and performance.now() precision is reduced',
          'OffscreenCanvas allows Workers to render to a canvas without access to the main thread\'s DOM — this enables GPU-accelerated rendering (WebGL/2D) in a Worker, keeping the main thread free for UI responsiveness',
        ],
        tradeoffs: [
          'Worker startup has overhead (creating a new OS thread, parsing the Worker script) — for short tasks, the overhead can exceed the computation time, so Workers are most beneficial for tasks that take at least 50-100ms',
          'Structured clone serialization for postMessage is expensive for large objects (deep copying) — Transferable objects avoid this cost but require careful ownership management (the sender can no longer access the transferred object)',
          'SharedArrayBuffer enables true shared-memory parallelism but introduces all the complexity of concurrent programming: race conditions, deadlocks, and the need for explicit synchronization with Atomics — this is fundamentally more complex than the message-passing model of regular Workers',
        ],
        realWorld: [
          'Figma uses Web Workers extensively: layout calculation, constraint solving, and plugin execution all run in Workers, keeping the canvas rendering and UI responsive — this architecture is why Figma can handle documents with thousands of elements',
          'ffmpeg.wasm (FFmpeg compiled to WebAssembly) uses SharedArrayBuffer and Web Workers to encode/decode video in the browser with near-native performance — it requires COOP/COEP headers to enable SharedArrayBuffer',
          'Comlink (by Google) provides an RPC-like abstraction over Worker postMessage, making Workers feel like calling regular async functions: const api = Comlink.wrap(worker); await api.heavyComputation(data) — dramatically simplifying Worker communication',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Modern Web APIs',
    part: 3,
    partTitle: 'Security & APIs',
    summary:
      'Cutting-edge browser APIs that extend the web platform beyond traditional document rendering: WebAssembly for near-native performance, WebRTC for real-time communication, and WebGL/Canvas for GPU-accelerated graphics.',
    concepts: [
      {
        id: '9-1',
        name: 'WebAssembly (Wasm)',
        description:
          'WebAssembly is a binary instruction format that runs in the browser at near-native speed, enabling languages like C, C++, Rust, and Go to target the web platform. It complements JavaScript rather than replacing it, handling compute-intensive tasks while JavaScript manages the DOM and UI.',
        keyPoints: [
          'Wasm modules are compiled ahead-of-time from source languages (C/C++ via Emscripten, Rust via wasm-pack, Go via GOOS=js) into a compact binary format (.wasm) that the browser decodes and compiles to native machine code — compilation is fast because Wasm\'s type system is simple and validation is single-pass',
          'Wasm executes in a sandboxed linear memory model — it has access only to its own memory (a resizable ArrayBuffer) and explicitly imported JavaScript functions, providing security isolation from the host environment',
          'Wasm-JavaScript interop happens through imported/exported functions: JavaScript calls Wasm exports (functions, memory, tables), and Wasm calls imported JavaScript functions — data exchange for complex types (strings, objects) requires serialization through linear memory or the upcoming Component Model',
          'WASI (WebAssembly System Interface) defines a standardized system call interface for Wasm modules running outside the browser — enabling the same Wasm binary to run in browsers, Node.js, Deno, Cloudflare Workers, and standalone runtimes like Wasmtime and Wasmer',
          'Wasm supports SIMD (Single Instruction Multiple Data) instructions for parallel data processing — Wasm SIMD maps to SSE/AVX on x86 and NEON on ARM, enabling significant speedups for image processing, audio processing, and numerical computation',
        ],
        tradeoffs: [
          'Wasm\'s linear memory model means complex data structures (strings, objects, arrays) must be serialized/deserialized when crossing the Wasm-JS boundary — this marshalling overhead can negate Wasm\'s speed advantage for frequent small calls (the boundary cost favors batching)',
          'Wasm does not have direct DOM access — all DOM manipulation must go through JavaScript, so Wasm is not suitable for UI-heavy code but excels at compute-heavy algorithms (codecs, physics, cryptography, compression)',
          'Wasm binaries can be significantly larger than equivalent minified JavaScript for simple logic because Wasm includes a full compiled runtime — but for complex computations, the performance gain far exceeds the download cost',
        ],
        realWorld: [
          'Figma rebuilt their rendering engine in C++ compiled to Wasm, achieving 3x faster performance than their previous asm.js implementation — this was one of the first major production uses of WebAssembly',
          'Google Earth, AutoCAD Web, and Adobe Photoshop Web all use Wasm to run C++ codebases in the browser — enabling desktop-class applications on the web platform without plugins',
          'SQLite compiled to Wasm (sql.js, wa-sqlite) enables full SQL database functionality in the browser — used by applications that need complex queries on client-side data without a server',
        ],
      },
      {
        id: '9-2',
        name: 'WebRTC & Real-Time Communication',
        description:
          'WebRTC (Web Real-Time Communication) enables peer-to-peer audio, video, and data transmission directly between browsers without plugins. It handles NAT traversal, codec negotiation, encryption, and adaptive streaming through a complex but powerful API.',
        keyPoints: [
          'WebRTC establishes peer-to-peer connections using ICE (Interactive Connectivity Establishment) — it gathers connection candidates (host, server-reflexive via STUN, and relay via TURN), and uses SDP (Session Description Protocol) to negotiate the connection through an offer/answer exchange',
          'STUN (Session Traversal Utilities for NAT) servers help peers discover their public IP address and port mappings, while TURN (Traversal Using Relays around NAT) servers relay traffic when direct peer-to-peer connection is impossible (symmetric NATs, corporate firewalls)',
          'RTCPeerConnection manages the peer connection: addTrack() adds media streams, createDataChannel() enables arbitrary data transfer, and the connection automatically handles codec negotiation (VP8/VP9/AV1 for video, Opus for audio)',
          'All WebRTC media and data is encrypted by default using DTLS (Datagram TLS) for key exchange and SRTP (Secure Real-time Transport Protocol) for media — encryption is mandatory and cannot be disabled, ensuring privacy',
          'WebRTC DataChannel uses SCTP over DTLS for arbitrary data transfer with configurable reliability: ordered/unordered delivery and configurable retransmissions — this enables low-latency game state synchronization, file transfer, and messaging without a server relay',
        ],
        tradeoffs: [
          'WebRTC\'s peer-to-peer model is efficient for 1:1 calls but does not scale to many participants — each additional peer requires a new connection, so group calls typically use a Selective Forwarding Unit (SFU) server like Janus, Mediasoup, or LiveKit to relay streams',
          'TURN relay servers are necessary for 10-20% of connections where direct peer-to-peer fails, but they add latency and require significant bandwidth at the server — TURN server costs are a major operational expense for WebRTC applications',
          'WebRTC\'s SDP offer/answer model is complex and tightly coupled — the newer WebRTC-RTP-Sender/Receiver API and the emerging WebTransport API aim to simplify real-time communication with more granular control',
        ],
        realWorld: [
          'Google Meet, Zoom (browser client), Discord (browser version), and Microsoft Teams all use WebRTC for audio/video — at scale, they use SFU architectures with custom SRTP routing to handle rooms with 50-1000+ participants',
          'ShareDrop and PairDrop use WebRTC DataChannels for peer-to-peer file transfer between devices on the same network — files never pass through a server, demonstrating WebRTC\'s data transfer capabilities',
          'Cloudflare Calls and Twilio Video provide managed WebRTC infrastructure (STUN/TURN servers, SFU, recording, analytics) — abstracting the operational complexity of running WebRTC at scale',
        ],
      },
      {
        id: '9-3',
        name: 'WebGL & Canvas API',
        description:
          'The Canvas API provides an immediate-mode 2D drawing surface, while WebGL (and WebGL2/WebGPU) exposes the GPU for hardware-accelerated 3D rendering and general-purpose GPU computation. These APIs power games, data visualization, and creative tools in the browser.',
        keyPoints: [
          'Canvas 2D (canvas.getContext("2d")) provides an immediate-mode API for drawing shapes, text, images, and paths — each draw call directly modifies the pixel buffer, and the canvas does not retain a scene graph (unlike SVG), so the application must manage redrawing on every frame',
          'WebGL (canvas.getContext("webgl2")) is a low-level binding to the GPU based on OpenGL ES 3.0 — it works with shader programs (GLSL), vertex buffers, textures, and framebuffers, providing direct GPU access for 3D rendering and GPU-accelerated 2D rendering',
          'WebGPU (canvas.getContext("webgpu")) is the successor to WebGL, providing a modern GPU API inspired by Vulkan, Metal, and Direct3D 12 — it supports compute shaders (general-purpose GPU computation), better multi-threaded rendering, and is significantly more efficient than WebGL for complex scenes',
          'The OffscreenCanvas API allows Canvas 2D and WebGL rendering in Web Workers — canvas.transferControlToOffscreen() creates an OffscreenCanvas that can be sent to a Worker, enabling GPU rendering without blocking the main thread',
          'GPU-accelerated machine learning in the browser (TensorFlow.js, ONNX Runtime Web) uses WebGL or WebGPU as compute backends — matrix multiplication and convolution operations map naturally to GPU shader programs',
        ],
        tradeoffs: [
          'Canvas 2D is simpler to use than WebGL but lacks GPU acceleration for most operations (though Chrome now hardware-accelerates Canvas 2D on most platforms) — for rendering thousands of animated elements, WebGL is orders of magnitude faster',
          'WebGL\'s API is verbose and low-level (hundreds of lines for a simple triangle) — libraries like Three.js, Babylon.js, and PixiJS provide high-level abstractions, but understanding the underlying WebGL concepts is important for debugging and optimization',
          'WebGPU offers superior performance and modern API design but is still rolling out across browsers (Chrome 113+, Firefox Nightly, Safari Technology Preview) — applications requiring broad compatibility should still use WebGL2 with WebGPU as a progressive enhancement',
        ],
        realWorld: [
          'Three.js is the dominant WebGL library with over 90K GitHub stars — it powers 3D experiences from product configurators (Nike, IKEA) to artistic experiences (Awwwards-winning websites) and data visualization',
          'Google Maps uses WebGL for smooth map rendering, 3D buildings, and terrain — the transition from Canvas 2D to WebGL enabled fluid 60fps panning and zooming with vector tile rendering',
          'TensorFlow.js uses WebGL/WebGPU backends for ML inference in the browser — applications like Background Blur in Google Meet run ML models at 30fps using GPU shaders, without sending video data to a server',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Progressive Web Apps',
    part: 3,
    partTitle: 'Security & APIs',
    summary:
      'How Service Workers, web app manifests, and caching strategies combine to create installable, offline-capable web applications that rival native apps in capability and user experience.',
    concepts: [
      {
        id: '10-1',
        name: 'Service Worker Lifecycle',
        description:
          'Service Workers have a carefully designed lifecycle — install, activate, fetch — that ensures reliable updates without disrupting active pages. Understanding this lifecycle is essential for building and debugging offline-capable web applications.',
        keyPoints: [
          'Registration: navigator.serviceWorker.register("/sw.js") downloads the Service Worker script and begins the installation process — the browser compares the new script byte-for-byte with the existing one, and a single changed byte triggers a new installation',
          'Install event: the Service Worker receives an install event where it typically precaches the app shell (HTML, CSS, JS, fonts) using caches.open() and cache.addAll() — event.waitUntil(promise) extends the install phase until all precaching is complete',
          'Waiting state: a newly installed Service Worker enters the "waiting" state if an older version is still controlling active tabs — it will not activate until all tabs using the old Service Worker are closed, preventing inconsistencies between cached and served resources',
          'Activate event: fires when the Service Worker takes control — this is where old caches should be cleaned up (delete cache names not in the current allowlist) to free storage space and prevent serving stale resources',
          'skipWaiting() + clients.claim(): calling self.skipWaiting() in the install handler and clients.claim() in the activate handler forces the new Service Worker to take control immediately — but this can cause issues if the new Service Worker expects resources that have not been fetched yet',
        ],
        tradeoffs: [
          'The waiting state prevents the "two-version problem" (where old HTML references assets that only exist in the new cache) but frustrates developers and users who expect updates to take effect immediately — a common UX pattern is to show a "New version available, click to refresh" banner',
          'skipWaiting() provides instant updates but risks serving a mix of old HTML with new assets if the page is already loaded — it is safe when using navigation preload or when the app shell is fully self-contained',
          'Service Worker scope defaults to the directory of the sw.js file — a Service Worker at /app/sw.js cannot control pages at /other/ unless the server sends a Service-Worker-Allowed header with a broader scope',
        ],
        realWorld: [
          'Workbox\'s workbox-window module provides a clean API for detecting Service Worker updates and prompting users to reload — its messageSW() function communicates with the Service Worker to coordinate the update',
          'Create React App included a default Service Worker configuration (later removed in CRA 4 due to confusion about caching behavior) — many production CRA apps unknowingly had aggressive caching that served stale content after deployments',
          'Chrome DevTools Application > Service Workers panel shows the lifecycle state (installing, waiting, activated, redundant) of each registered Service Worker — the "Update on reload" checkbox forces the new Service Worker to activate immediately during development',
        ],
      },
      {
        id: '10-2',
        name: 'Manifest & Installability',
        description:
          'The Web App Manifest is a JSON file that provides metadata for installing a web application to the user\'s home screen or desktop, including app name, icons, theme color, and display mode. Meeting installability criteria triggers the browser\'s install prompt.',
        keyPoints: [
          'The manifest is linked from HTML via <link rel="manifest" href="/manifest.json"> and must include at minimum: name (or short_name), start_url, display (standalone/fullscreen/minimal-ui), and at least one icon (192x192 and 512x512 for Android, plus apple-touch-icon for iOS)',
          'display: standalone removes the browser chrome (address bar, tabs) and makes the PWA look like a native app — display: fullscreen hides even the status bar (useful for games), and display: minimal-ui shows a minimal navigation bar',
          'The beforeinstallprompt event fires when the browser determines the PWA meets installability criteria — the app can call event.prompt() to show the install dialog at the right moment (e.g., after the user has engaged with the app), improving install conversion rates',
          'Chrome\'s installability criteria: served over HTTPS, has a valid manifest with required fields, has a registered Service Worker with a fetch event handler — meeting these criteria enables the install prompt and the browser\'s install icon in the address bar',
          'The share_target field in the manifest allows the PWA to appear in the OS share sheet — when a user shares content to the PWA, the browser navigates to the specified URL with the shared data as URL parameters or POST body',
        ],
        tradeoffs: [
          'PWA installability is not uniform across platforms: Android has full support (home screen, app drawer, notifications), iOS has limited support (no beforeinstallprompt, no push notifications until iOS 16.4, add-to-home-screen only through Safari share menu), and desktop support varies by browser',
          'display: standalone improves the native app feel but loses browser navigation (back button, address bar, tab management) — users may get stuck if the app does not provide its own navigation, and deep-linking requires careful handling of start_url and scope',
          'Maskable icons (purpose: "maskable" in the manifest) allow the OS to apply its own icon mask shape (circle on Android, rounded rectangle on iOS) but require the icon content to be within the "safe zone" (inner 80%) to avoid clipping',
        ],
        realWorld: [
          'Twitter/X Lite (now the primary Twitter web app) is a fully installable PWA that reduced data consumption by 70% and increased pages per session by 65% compared to the previous native app on low-end Android devices',
          'Starbucks\' PWA is 99.84% smaller than the native iOS app (233KB vs 148MB) and works offline for menu browsing — it drove 2x increase in daily active users',
          'PWABuilder (Microsoft) and Bubblewrap (Google) generate platform-specific wrappers (Trusted Web Activity for Android, MSIX for Windows) that allow PWAs to be distributed through app stores while still being web applications',
        ],
      },
      {
        id: '10-3',
        name: 'Offline-First Strategies & Push Notifications',
        description:
          'Offline-first architecture treats the network as an enhancement rather than a requirement, using Service Worker caching and background sync to provide seamless experiences on unreliable connections. Push notifications enable re-engagement even when the app is not open.',
        keyPoints: [
          'Offline-first means designing the app to work without a network connection by default, and synchronizing with the server when connectivity is available — this is fundamentally different from "offline-capable" which treats offline as a fallback',
          'Background Sync API (registration.sync.register("sync-name")) allows the Service Worker to defer network operations until connectivity is restored — when the browser detects a connection, it fires a sync event in the Service Worker to process queued operations',
          'Push Notification flow: the app subscribes via PushManager.subscribe() (which creates a PushSubscription with an endpoint URL and public key), sends the subscription to the server, and the server sends push messages via the push service endpoint — the Service Worker receives push events even when the app is closed',
          'The Notification API (ServiceWorkerRegistration.showNotification()) displays OS-level notifications from the Service Worker — notifications support actions (buttons), images, badges, vibration patterns, and the notification click event for deep-linking back into the app',
          'IndexedDB is the primary storage for offline-first data (structured data, large datasets) — combined with the Cache API for HTTP responses and the Background Sync API for queued writes, it forms the complete offline-first storage stack',
        ],
        tradeoffs: [
          'Offline-first architecture adds significant complexity to data synchronization: conflict resolution (last-write-wins, operational transforms, CRDTs), version tracking, and queue management — this is the hardest part of offline-first engineering',
          'Push notifications require user permission (Notification.requestPermission()) and have low acceptance rates (10-40%) — aggressive or poorly timed permission requests train users to deny, and browsers may block the prompt entirely for sites that receive many denials',
          'Background Sync is not universally supported (Safari does not support it as of 2024) and the timing of sync events is at the browser\'s discretion (it may batch them, delay them based on battery/network, or skip them entirely) — applications must handle the case where sync events never fire',
        ],
        realWorld: [
          'Google Docs implements offline-first with IndexedDB for document storage and operational transform for conflict resolution — edits made offline are queued and merged when connectivity returns, with conflict markers for irreconcilable changes',
          'Workbox provides workbox-background-sync which automatically queues failed fetch requests in IndexedDB and replays them when the sync event fires — it handles retry logic, request expiration, and error handling out of the box',
          'Web push services like Firebase Cloud Messaging (FCM), OneSignal, and Pushover provide the server infrastructure for sending push messages — FCM is used by Chrome and Firefox, while Safari uses its own APNs-based push system (standard Web Push as of Safari 16)',
        ],
      },
    ],
  },

  // Part 4: Advanced Topics
  {
    id: 11,
    title: 'Browser DevTools',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Mastering browser developer tools for inspecting elements, profiling performance and memory, analyzing network traffic, and debugging JavaScript — the essential toolkit for every web developer.',
    concepts: [
      {
        id: '11-1',
        name: 'Elements & CSS Inspection',
        description:
          'The Elements panel provides a live, editable view of the DOM tree and all CSS rules applied to each element. It is the primary tool for understanding how the browser interprets HTML and CSS, debugging layout issues, and experimenting with style changes in real time.',
        keyPoints: [
          'The computed styles pane shows the final resolved value of every CSS property for the selected element — it resolves inheritance, specificity, cascade order, and media queries, showing exactly what the browser is using (not what you wrote in your stylesheet)',
          'CSS cascade layers and the specificity visualizer help debug why a style is overridden — Chrome DevTools shows crossed-out rules with the specificity value and the selector that wins, including !important declarations and their cascade position',
          'The box model diagram shows content, padding, border, and margin for the selected element with exact pixel values — hovering over the diagram sections highlights them on the page, and values can be edited directly',
          'Forced element states (:hover, :active, :focus, :focus-within, :visited) can be toggled in the Styles pane to inspect styles that normally require user interaction — essential for debugging hover menus, focus rings, and active states without maintaining the interaction',
          'Accessibility tree inspection (Chrome DevTools Accessibility pane) shows how the browser exposes the element to assistive technologies — the computed accessible name, role, and ARIA properties reveal whether screen readers will present the element correctly',
        ],
        tradeoffs: [
          'Live DOM editing in DevTools is immediate but temporary — changes are lost on page reload, so DevTools is best for experimentation rather than permanent changes (though Chrome Workspaces can sync changes back to source files)',
          'The Elements panel shows the current state of the DOM (after JavaScript modifications), not the original HTML source — for debugging HTML parsing issues, the "View Source" page and the Sources panel show the raw received HTML',
          'CSS Grid and Flexbox overlays (visible when clicking the grid/flex badge in the Elements panel) are invaluable for debugging layout but can be visually noisy on complex nested layouts — toggle them selectively on specific containers',
        ],
        realWorld: [
          'Chrome DevTools CSS Overview panel (More tools > CSS Overview) scans the entire page and reports: total colors used, unused CSS declarations, font statistics, and media query breakpoints — useful for CSS audits and identifying style inconsistencies',
          'Firefox DevTools has unique CSS features: the Fonts panel shows all fonts used on the page with variable font axis controls, the Inactive CSS feature dims properties that have no effect (e.g., display:inline with width), and the Changes panel tracks all CSS modifications made in DevTools',
          'The Styles pane supports CSS authoring features like color picker, bezier curve editor for timing functions, shadow editor, and angle picker — enabling visual CSS editing without writing values manually',
        ],
      },
      {
        id: '11-2',
        name: 'Performance & Memory Profiling',
        description:
          'The Performance and Memory panels provide detailed profiling of JavaScript execution, rendering pipeline stages, and memory allocation. These tools are essential for diagnosing jank, finding memory leaks, and understanding where time is spent during page load and user interactions.',
        keyPoints: [
          'Performance panel recording captures a timeline of all activity: JavaScript execution (flame chart), layout/style recalculations, paint events, compositing, network requests, and frame rate — the flame chart shows the call stack over time, with the width of each bar representing execution duration',
          'Long tasks (>50ms on the main thread) are highlighted in the Performance panel with a red triangle — these are the primary cause of jank and poor INP scores, and the flame chart reveals which functions are responsible',
          'The Memory panel provides three profiling modes: Heap Snapshot (snapshot of all objects in memory with their sizes and references), Allocation Instrumentation on Timeline (shows objects allocated over time and which were collected), and Allocation Sampling (statistical profiling with lower overhead)',
          'Heap snapshot comparison: taking two snapshots and switching to the "Comparison" view shows objects allocated between snapshots that were not garbage collected — this is the standard technique for finding memory leaks (look for growing counts of detached DOM nodes, event listeners, or closures)',
          'The Performance Monitor (More tools > Performance Monitor) shows real-time CPU usage, JS heap size, DOM node count, event listeners count, and layout/style recalculations per second — useful for monitoring overall page health without the overhead of a full performance recording',
        ],
        tradeoffs: [
          'Performance recordings significantly slow down the page being profiled (due to instrumentation overhead) — this means absolute timing values are inflated, so focus on relative comparisons and call tree proportions rather than exact millisecond values',
          'Heap snapshots capture everything in the V8 heap which can be tens or hundreds of MB — taking and analyzing large heap snapshots consumes significant CPU and memory, and the DevTools UI can become sluggish when inspecting millions of objects',
          'Allocation sampling has lower overhead than allocation instrumentation but is statistical — it may miss short-lived allocations, so for precise leak detection, use heap snapshot comparison despite its higher overhead',
        ],
        realWorld: [
          'The Lighthouse performance audit (built into Chrome DevTools) combines automated profiling with actionable recommendations — it simulates a mobile device with network throttling, runs the page through the rendering pipeline, and scores it on metrics like LCP, CLS, and Total Blocking Time',
          'React DevTools Profiler integrates with Chrome\'s Performance panel to show React component render times, commit durations, and which components caused re-renders — essential for optimizing React application performance',
          'Chrome\'s Performance Insights panel (experimental) provides a simplified view of the Performance panel timeline, automatically highlighting key issues (long tasks, layout shifts, LCP element) with explanations — designed to be more approachable than the full Performance panel',
        ],
      },
      {
        id: '11-3',
        name: 'Network Panel & Debugging Techniques',
        description:
          'The Network panel captures every HTTP request and response with detailed timing, headers, and payload information. Combined with debugging techniques like breakpoints, log points, and conditional breakpoints, it forms the core debugging workflow for modern web development.',
        keyPoints: [
          'The Network panel waterfall chart shows request timing broken into phases: Queueing, Stalled, DNS Lookup, Initial Connection, SSL, Request Sent, Waiting (TTFB), Content Download — identifying which phase is slow pinpoints the bottleneck (server processing = long TTFB, slow CDN = long Content Download)',
          'Request blocking: right-click a request > "Block request URL" (or use the Request blocking tab) to simulate what happens when a resource fails to load — essential for testing graceful degradation and identifying critical resource dependencies',
          'The Sources panel debugger supports breakpoints (line, conditional, DOM change, XHR/fetch, event listener), logpoints (console.log without modifying code), and exception breakpoints (pause on caught/uncaught exceptions) — conditional breakpoints that evaluate an expression are powerful for debugging issues that only occur with specific data',
          'console.table() formats arrays and objects as sortable tables, console.group()/groupEnd() organizes related logs, console.time()/timeEnd() measures durations, and console.trace() shows the full call stack — these are far more useful than console.log for structured debugging',
          'The Network panel Throttling dropdown simulates slow network conditions (Slow 3G, Fast 3G, Offline) — custom profiles can define specific download/upload speeds and latency, essential for testing real-world mobile performance',
        ],
        tradeoffs: [
          'DevTools network recording shows requests from the browser\'s perspective, not the server\'s — to debug server-side issues (incorrect headers, response timing, backend errors), you need server-side logging or a proxy tool like Charles, Fiddler, or mitmproxy',
          'Breakpoints pause all JavaScript execution, which can interfere with time-dependent code (animations, timers, WebSocket messages) — logpoints and console.log are better for debugging timing-sensitive code without affecting execution flow',
          'DevTools network throttling simulates bandwidth and latency but not real-world network conditions like packet loss, jitter, and variable signal strength — tools like Chrome\'s Network Emulation, WebPageTest, or actual device testing provide more realistic results',
        ],
        realWorld: [
          'Chrome DevTools Overrides (Sources > Overrides) allows persisting modifications to network responses, CSS, and JavaScript across page reloads — useful for testing fixes on production sites without deploying, or mocking API responses during development',
          'The copy() function in the Console copies any value to the clipboard — copy(document.cookie), copy(JSON.stringify(data, null, 2)), and copy($$("a").map(a => a.href).join("\\n")) are common patterns for extracting data from pages',
          'Chrome DevTools Recorder (Performance panel > Recorder) records and replays user interactions as step-by-step scripts that can be exported to Puppeteer, Playwright, or @playwright/test format — enabling automated testing from manual debugging sessions',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Extensions & Browser APIs',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'How browser extensions are architected under the Manifest V3 model, how content scripts and background workers interact with web pages and the browser, and the capabilities available through the WebExtensions API.',
    concepts: [
      {
        id: '12-1',
        name: 'Extension Architecture (Manifest V3)',
        description:
          'Browser extensions are structured around the manifest.json file which declares permissions, scripts, and resources. Manifest V3 (MV3) replaced Manifest V2 with significant architectural changes focused on security, privacy, and performance.',
        keyPoints: [
          'manifest.json declares the extension\'s metadata (name, version, description), permissions (tabs, storage, activeTab, host_permissions), content scripts, background service worker, popup page, and options page — it is the single source of truth for the extension\'s capabilities',
          'Manifest V3 replaced persistent background pages with Service Workers (background.service_worker in manifest.json) — Service Workers are event-driven and terminated when idle, meaning extensions cannot maintain long-running connections or in-memory state between events',
          'Permissions follow the principle of least privilege: activeTab grants access only to the current tab when the user clicks the extension, host_permissions specifies which origins the extension can access, and optional_permissions can be requested at runtime',
          'Content scripts run in an "isolated world" — they share the page\'s DOM but have their own JavaScript execution context (separate global scope, separate prototype chains), preventing conflicts between the extension\'s code and the page\'s code',
          'The declarativeNetRequest API replaced the webRequest API for request blocking/modification in MV3 — it uses declarative JSON rules processed by the browser engine instead of JavaScript callbacks, improving performance and privacy but reducing flexibility',
        ],
        tradeoffs: [
          'MV3 Service Workers terminate after 30 seconds of inactivity (5 minutes in Chrome 116+), which breaks extensions that relied on persistent background pages for WebSocket connections, alarm handling, and state management — extensions must now persist state to chrome.storage and re-establish connections on wake',
          'declarativeNetRequest limits extensions to 30,000 static rules (with dynamic/session rule limits) — ad blockers like uBlock Origin argued this is insufficient (EasyList alone has 70,000+ rules), leading Chrome to increase limits and add support for regex rules',
          'MV3 improves security by limiting code execution (no remote code execution, no eval/new Function in content scripts) and privacy by moving request modification to declarative rules — but the reduced flexibility forced some extensions to significantly redesign their architecture',
        ],
        realWorld: [
          'uBlock Origin Lite is a separate extension specifically redesigned for MV3\'s declarativeNetRequest API — it has fewer filtering capabilities than the MV2 version, illustrating the real-world impact of MV3\'s architectural constraints on complex extensions',
          'Chrome Web Store requires all new extensions to use Manifest V3 as of 2024, with existing MV2 extensions being sunset — Firefox supports MV3 but maintains backward compatibility with MV2, and has extended the webRequest API in their MV3 implementation',
          'The Chrome Extension Side Panel API (MV3) allows extensions to show persistent UI in a sidebar alongside the web page — used by AI assistants, note-taking tools, and reference managers that need to display content alongside the browsed page',
        ],
      },
      {
        id: '12-2',
        name: 'Content Scripts & Background Workers',
        description:
          'Content scripts inject JavaScript and CSS into web pages to read or modify their content, while background workers (Service Workers in MV3) handle events, manage state, and coordinate between extension components. Their communication model uses message passing through Chrome\'s runtime API.',
        keyPoints: [
          'Content scripts are injected based on URL match patterns in manifest.json (matches: ["*://*.example.com/*"]) or programmatically via chrome.scripting.executeScript() — they have access to the page\'s DOM but cannot access the page\'s JavaScript variables (isolated world boundary)',
          'chrome.runtime.sendMessage() and chrome.runtime.onMessage.addListener() enable message passing between content scripts, the background worker, popup, and options pages — all messages are JSON-serializable and passed asynchronously',
          'chrome.tabs.sendMessage(tabId, message) sends messages from the background worker to a specific tab\'s content script — the background worker can also inject scripts into tabs using chrome.scripting.executeScript({ target: { tabId }, func: myFunction })',
          'Background Service Workers in MV3 handle browser events: chrome.tabs.onUpdated for tab navigation, chrome.webNavigation.onCompleted for page load, chrome.alarms.onAlarm for periodic tasks, and chrome.action.onClicked for extension icon clicks',
          'chrome.storage.local and chrome.storage.sync provide persistent storage that survives Service Worker termination — storage.sync synchronizes data across the user\'s signed-in Chrome instances (limited to 100KB total, 8KB per item)',
        ],
        tradeoffs: [
          'Content scripts in isolated worlds cannot access page-defined JavaScript objects (window.myApp) — to interact with page scripts, content scripts must inject a <script> tag into the page or use window.postMessage() with event listeners on both sides, adding complexity',
          'chrome.storage is asynchronous and slower than in-memory state — extensions that previously relied on fast in-memory lookups in persistent background pages must now design around asynchronous storage access with potential latency',
          'Message passing between extension components is subject to the Service Worker lifecycle — if the background worker is terminated, messages from content scripts will wake it up, but there is a cold-start delay that can affect responsiveness',
        ],
        realWorld: [
          'Password managers (Bitwarden, 1Password, LastPass) use content scripts to detect login forms (finding <input type="password">), inject autofill UI, and communicate credentials from the background worker\'s encrypted storage via message passing',
          'React DevTools, Vue DevTools, and Redux DevTools use content scripts to inject a hook into the page\'s JavaScript context (via <script> tag injection), which communicates with the DevTools panel extension page through window.postMessage() and chrome.runtime messaging',
          'Grammarly\'s extension uses content scripts to monitor text input in real-time (MutationObserver + input events), sends text to background workers for processing, and injects suggestion UI overlay elements into the page\'s DOM',
        ],
      },
      {
        id: '12-3',
        name: 'WebExtensions API & Permissions',
        description:
          'The WebExtensions API (originally based on Chrome\'s extension APIs and now an emerging cross-browser standard) provides extensions with access to browser functionality like tabs, bookmarks, history, downloads, and notifications — all gated behind a permission system that controls what each extension can access.',
        keyPoints: [
          'Core APIs available without special permissions: chrome.runtime (messaging, lifecycle), chrome.storage (local/sync storage), chrome.i18n (internationalization) — these are considered low-risk and are available to all extensions',
          'Tab APIs (chrome.tabs.query(), chrome.tabs.create(), chrome.tabs.update()) require the "tabs" permission to access tab URLs and titles — without this permission, tabs.query() returns tabs but with url and title fields omitted for privacy',
          'Host permissions (<all_urls> or specific patterns like *://*.example.com/*) control which origins the extension can: inject content scripts into, make cross-origin requests from background scripts to, and access via chrome.scripting — these are the most sensitive permissions',
          'Optional permissions (declared in optional_permissions in manifest.json) can be requested at runtime via chrome.permissions.request() — this pattern is recommended for permissions not needed immediately, as it reduces the initial permission prompt and builds user trust',
          'The cross-browser WebExtensions standard aims for compatibility across Chrome, Firefox, Edge, and Safari — the browser namespace (Firefox) and chrome namespace (Chrome) are largely compatible, and the webextension-polyfill library provides Promise-based APIs that work across all browsers',
        ],
        tradeoffs: [
          'Requesting broad permissions (<all_urls>, all tabs) at install time triggers scary permission warnings that reduce install rates — using activeTab (grants access only when the user clicks the extension) and optional permissions significantly improves user trust and install conversion',
          'The WebExtensions standard covers core APIs but each browser has unique extensions: Chrome has Side Panel and offscreen documents, Firefox has browser.dns and containerized tabs (Multi-Account Containers), Safari has limited API support — true cross-browser extensions require feature detection and graceful degradation',
          'Chrome is moving toward requiring user consent for each site an extension accesses (site access controls in Chrome 120+) — extensions that rely on broad host permissions may find their functionality limited unless users explicitly grant access per-site',
        ],
        realWorld: [
          'The WebExtension API compatibility tables on MDN (developer.mozilla.org) document which APIs are supported in Chrome, Firefox, Edge, and Safari — this is the authoritative reference for cross-browser extension development',
          'Chrome Web Store reviews extensions for policy compliance including permission justification — extensions requesting overly broad permissions without justification may be rejected, and flagged extensions with excessive permissions receive reduced visibility',
          'Firefox\'s Multi-Account Containers extension uses the contextualIdentities API (Firefox-specific) to isolate cookies and storage per container tab — a capability that no other browser offers natively and that demonstrates browser-specific API innovation',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Cross-Browser Compatibility',
    part: 4,
    partTitle: 'Advanced Topics',
    summary:
      'Strategies for ensuring web applications work consistently across different browsers and versions, including feature detection, polyfills, transpilation, and systematic cross-browser testing approaches.',
    concepts: [
      {
        id: '13-1',
        name: 'Feature Detection vs User-Agent Sniffing',
        description:
          'Feature detection tests whether a specific API or capability is available in the current browser before using it, while user-agent sniffing tries to identify the browser from its UA string. Feature detection is the recommended approach because UA strings are unreliable and frequently spoofed.',
        keyPoints: [
          'Feature detection tests for capabilities directly: "serviceWorker" in navigator, typeof IntersectionObserver !== "undefined", CSS.supports("display", "grid") — if the feature exists, use it; if not, provide a fallback or polyfill',
          'User-Agent strings are notoriously unreliable: every browser includes "Mozilla" and "like Gecko" for historical compatibility reasons, Chrome includes "Safari", Edge includes "Chrome" — parsing UA strings correctly is nearly impossible and breaks as browsers update',
          'The User-Agent Client Hints API (navigator.userAgentData) provides structured browser information (brand, version, platform, mobile) without the legacy UA string mess — but it requires a Permissions-Policy header and is not universally supported yet',
          'Modernizr was the canonical feature detection library (detects 260+ features and adds CSS classes like .flexbox/.no-flexbox to the <html> element) — while less necessary with modern browser convergence, the pattern of CSS classes for feature-based styling remains useful',
          '@supports CSS at-rule enables feature detection in CSS: @supports (display: grid) { .container { display: grid; } } — this is native CSS feature detection, no JavaScript required, and is supported in all modern browsers',
        ],
        tradeoffs: [
          'Feature detection accurately tests capabilities but cannot detect bugs or partial implementations — a browser may report supporting a feature but have a buggy implementation that behaves differently from the specification',
          'User-Agent Client Hints improve on UA strings but reduce the information available to developers (by design, for privacy) — servers that need detailed browser information for analytics or content adaptation must explicitly request extended hints via Accept-CH headers',
          'Feature detection adds conditional code paths that increase complexity — at some point, dropping support for older browsers and removing feature detection simplifies the codebase (the "baseline" approach, supported by web.dev\'s Baseline indicator)',
        ],
        realWorld: [
          'Can I Use (caniuse.com) is the definitive reference for browser feature support — it provides support tables for every web platform feature, including notes on partial implementations and known bugs per browser version',
          'The web.dev Baseline status indicator marks features as "Widely Available" when they are supported in the latest two major versions of all major browsers — this is increasingly used as the decision point for when to stop providing polyfills',
          'Google\'s Chrome User Experience Report (CrUX) provides real-user browser version distribution data — this data-driven approach helps teams decide which browsers to support based on their actual user base rather than global statistics',
        ],
      },
      {
        id: '13-2',
        name: 'Polyfills & Transpilation',
        description:
          'Polyfills provide runtime implementations of missing browser APIs, while transpilation (via Babel/SWC/esbuild) converts modern JavaScript syntax to older syntax that legacy browsers understand. Together they enable developers to use current standards while supporting older environments.',
        keyPoints: [
          'Polyfills are JavaScript implementations of web APIs: core-js provides polyfills for ES2015-ES2023 features (Promise, Array.from, Object.entries, String.prototype.replaceAll), and individual polyfills exist for Web APIs (IntersectionObserver, ResizeObserver, fetch)',
          'Babel transpiles modern JavaScript syntax (arrow functions, optional chaining, nullish coalescing, private class fields) to equivalent ES5/ES6 code — it uses plugins for each syntax transformation and presets (like @babel/preset-env) that bundle plugins based on target browser configuration',
          '@babel/preset-env with a browserslist configuration (e.g., "> 0.5%, last 2 versions, not dead") automatically determines which transformations and polyfills are needed based on the specified browser targets — this avoids shipping unnecessary polyfills to modern browsers',
          'esbuild and SWC are modern transpilers written in Go and Rust respectively — they are 10-100x faster than Babel for transpilation, and Vite uses esbuild for development and can use SWC for production builds via plugins',
          'Differential serving delivers modern code (<script type="module">) to modern browsers and transpiled code (<script nomodule>) to legacy browsers — module-supporting browsers ignore nomodule scripts, and legacy browsers ignore type="module" scripts',
        ],
        tradeoffs: [
          'Polyfills increase bundle size and execution time — core-js adds 20-50KB to the bundle even when only partially used, and polyfilled implementations are always slower than native browser implementations (sometimes 10-100x slower for complex features)',
          'Transpilation removes modern syntax but cannot polyfill runtime features (Promise, Proxy, WeakMap, Symbol) — these require polyfills in addition to transpilation, and some features like Proxy cannot be fully polyfilled at all',
          'Differential serving effectively doubles the build pipeline (two builds, two sets of bundles) — the maintenance cost is significant, and with modern browsers now covering 95%+ of users, many teams have stopped supporting browsers that require transpilation below ES2017',
        ],
        realWorld: [
          'Vite targets ES2015 modules by default (browser support: Chrome 61+, Firefox 60+, Safari 11+, Edge 79+) — legacy browser support requires @vitejs/plugin-legacy which uses Babel and injects polyfills via SystemJS for browsers that do not support ES modules',
          'polyfill.io (cdn.polyfill.io) was a popular service that served only the polyfills needed by the requesting browser based on the User-Agent header — in 2024 the domain was acquired by a Chinese company and began serving malicious code, leading to widespread removal and a warning from multiple security organizations',
          'TypeScript is NOT a polyfill or transpiler for runtime features — it only provides type checking and syntax downleveling, and tsc does not inject polyfills (you must still use core-js or similar for missing runtime APIs in target environments)',
        ],
      },
      {
        id: '13-3',
        name: 'Testing Strategies & Browser Differences',
        description:
          'Systematic cross-browser testing combines automated testing in multiple browsers with visual regression testing and real-device testing to catch rendering differences, API inconsistencies, and platform-specific bugs that affect user experience.',
        keyPoints: [
          'Playwright (Microsoft) supports testing in Chromium, Firefox, and WebKit (Safari) from a single API — it launches real browser engines (not emulators) and provides consistent selectors, auto-waiting, and screenshot comparison across all three engines',
          'BrowserStack, Sauce Labs, and LambdaTest provide cloud access to real browsers and devices (including older versions and mobile browsers) — they run tests on actual browser instances, catching issues that headless browsers and emulators miss',
          'Visual regression testing compares screenshots pixel-by-pixel across browser versions: Percy (BrowserStack), Chromatic (Storybook), and Playwright\'s toHaveScreenshot() assertion — essential for catching CSS rendering differences that functional tests miss',
          'Common cross-browser differences: font rendering (subpixel antialiasing varies by OS/browser), date parsing (new Date("2024-01-15") behaves differently across engines), scrollbar styling (CSS scrollbar-width works in Firefox, ::-webkit-scrollbar in Chrome/Safari), and form element styling (native select, input, and button rendering varies significantly)',
          'The Web Platform Tests (wpt.fyi) project is the shared test suite for the web platform — all browser engines run these tests, and the results are public, enabling anyone to see which features are implemented correctly in each browser',
        ],
        tradeoffs: [
          'Testing in all browsers multiplies test execution time and infrastructure costs — most teams prioritize Chromium (highest market share), then Safari/WebKit (iOS mandatory engine), then Firefox, and only test older browsers if analytics show significant usage',
          'Visual regression testing catches rendering differences but generates false positives from acceptable variation (antialiasing, subpixel rendering, viewport differences) — threshold configuration and baseline management require ongoing maintenance',
          'Real-device testing is the gold standard but is slow, expensive, and hard to automate — cloud device farms provide access but add network latency and can have availability issues during peak testing periods',
        ],
        realWorld: [
          'Playwright\'s test runner supports running the same test file across Chromium, Firefox, and WebKit in parallel via the projects configuration — a single CI pipeline can cover all three engines with the same test suite',
          'Safari-specific bugs are the most common cross-browser issue reported by web developers: 100vh including the address bar, position:fixed behavior in iframes, date input formatting, and Web Audio API restrictions — the WebKit team has addressed many of these through the Interop project',
          'The Interop 2024 project focused on 17 areas of cross-browser compatibility including CSS Nesting, Popover API, relative color syntax, and <details> styling — browser vendors committed to improving compatibility scores, and results are tracked publicly at wpt.fyi/interop-2024',
        ],
      },
    ],
  },
];

export const chapters: Chapter[] = topics;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
