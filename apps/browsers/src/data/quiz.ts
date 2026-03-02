export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Browser Architecture
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'Why do modern browsers like Chrome use a multi-process architecture?',
    options: [
      'To use more RAM and improve download speeds',
      'To isolate tabs so that a crash or exploit in one tab does not affect others',
      'To enable faster JavaScript execution through parallelism',
      'To support more browser extensions simultaneously',
    ],
    answer: 1,
    explanation: 'Multi-process architecture isolates tabs into separate OS processes. If one tab crashes (e.g., due to a script error), other tabs continue working. More importantly, it provides security isolation — an exploited renderer process is sandboxed and cannot directly access other tabs\' memory or the host OS without escaping the sandbox.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'Which rendering engine is shared by Chrome, Edge, Opera, and Brave?',
    options: [
      'Gecko',
      'Blink (a fork of WebKit)',
      'WebKit',
      'Trident',
    ],
    answer: 1,
    explanation: 'Blink is Google\'s rendering engine, forked from WebKit in 2013. It powers Chrome, Edge (since 2020), Opera, Brave, Vivaldi, and many other Chromium-based browsers. WebKit powers Safari. Gecko powers Firefox. This Blink dominance has raised concerns about browser engine monoculture and web standards being shaped by a single vendor.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What is the role of the browser process (main process) in Chrome\'s architecture?',
    options: [
      'It executes JavaScript for all tabs',
      'It manages the UI, network requests, storage, and coordinates renderer processes for each tab',
      'It only handles rendering HTML and CSS',
      'It serves as a web server for local development',
    ],
    answer: 1,
    explanation: 'The browser process is the privileged parent process that manages the address bar, bookmarks, navigation, and network stack. It spawns sandboxed renderer processes for each site and mediates their access to system resources via IPC (Mojo in Chromium). The GPU process handles compositing, and the network service handles all HTTP requests.',
  },

  // Chapter 2: Rendering Pipeline
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What happens when the browser encounters a <script> tag without async or defer while parsing HTML?',
    options: [
      'It continues parsing HTML and executes the script later',
      'It blocks HTML parsing, downloads the script (if external), executes it, then resumes parsing',
      'It skips the script and logs a warning',
      'It moves the script to the end of the document automatically',
    ],
    answer: 1,
    explanation: 'A synchronous <script> tag is parser-blocking — the HTML parser stops, waits for the script to download (if external) and execute, then resumes parsing. This is because the script might call document.write() which modifies the HTML stream. Using async downloads in parallel and executes when ready; defer downloads in parallel and executes after parsing completes.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What is "layout thrashing" in the browser rendering pipeline?',
    options: [
      'When too many CSS animations run simultaneously',
      'When JavaScript repeatedly reads layout properties and writes style changes, forcing the browser to recalculate layout synchronously on each read',
      'When the DOM has too many nested elements',
      'When the browser runs out of GPU memory during compositing',
    ],
    answer: 1,
    explanation: 'Layout thrashing occurs when code alternates between reading layout properties (offsetHeight, getBoundingClientRect) and writing style changes in a loop. Each read forces a synchronous layout recalculation (forced reflow) to return up-to-date values. The fix is to batch reads first, then batch writes, or use requestAnimationFrame to defer writes.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What is the compositor thread responsible for in the rendering pipeline?',
    options: [
      'Parsing HTML and building the DOM tree',
      'Combining painted layers into the final image displayed on screen, enabling smooth scrolling and CSS transforms without involving the main thread',
      'Executing JavaScript event handlers',
      'Managing network requests for images and fonts',
    ],
    answer: 1,
    explanation: 'The compositor thread takes painted layers (tiles rasterized by the GPU) and combines them into the final frame. Operations that only affect composited layers (transforms, opacity) can be handled entirely by the compositor without blocking the main thread, enabling 60fps animations even during heavy JavaScript execution. This is why transform animations are smoother than top/left animations.',
  },

  // Chapter 3: JavaScript Engines
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'What is the purpose of JIT (Just-In-Time) compilation in JavaScript engines?',
    options: [
      'To convert JavaScript to WebAssembly for faster execution',
      'To compile frequently executed code ("hot" functions) into optimized machine code at runtime based on observed type feedback',
      'To pre-compile all JavaScript before page load',
      'To minify JavaScript code for smaller file sizes',
    ],
    answer: 1,
    explanation: 'JIT compilers monitor running code and identify "hot" functions called frequently. They collect type feedback (e.g., "this function always receives integers") and generate optimized machine code based on those assumptions. V8 uses Sparkplug (baseline) and TurboFan (optimizing JIT). If assumptions are violated (e.g., a string is passed), the engine "deoptimizes" back to interpreted code.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What are "hidden classes" (or "shapes/maps") in V8?',
    options: [
      'CSS classes that are not visible in the DOM',
      'Internal data structures that track object property layouts, enabling fast property access similar to statically-typed languages',
      'Encrypted class definitions for security',
      'Classes defined inside closures that cannot be accessed externally',
    ],
    answer: 1,
    explanation: 'V8 assigns each object a hidden class (called "Map" internally) that describes its property layout (names, offsets, types). Objects with the same property structure share the same hidden class, enabling the engine to use fast fixed-offset memory access instead of slow dictionary lookups. Adding properties in different orders creates different hidden classes and degrades performance.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'How does generational garbage collection work in modern JavaScript engines?',
    options: [
      'It deletes all objects older than a certain time threshold',
      'It divides the heap into young and old generations — most objects die young, so frequent minor GC of the young generation is fast, while infrequent major GC handles long-lived objects',
      'It counts references to each object and frees those with zero references',
      'It pauses the application and scans the entire heap on every collection',
    ],
    answer: 1,
    explanation: 'Generational GC exploits the "generational hypothesis" — most objects die young. The young generation (nursery) is small and collected frequently with fast minor GC (Scavenge in V8). Surviving objects are promoted to the old generation, which is collected less often with mark-sweep-compact (major GC). V8\'s Orinoco collector performs much of this work concurrently and incrementally to minimize pauses.',
  },

  // Chapter 4: Browser Networking
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'What key problem does HTTP/2 multiplexing solve compared to HTTP/1.1?',
    options: [
      'It encrypts all traffic by default',
      'It allows multiple requests and responses to be sent simultaneously over a single TCP connection, eliminating head-of-line blocking at the HTTP level',
      'It compresses images more efficiently',
      'It enables bidirectional communication like WebSockets',
    ],
    answer: 1,
    explanation: 'HTTP/1.1 sends requests sequentially on each connection (or uses 6 parallel connections). HTTP/2 multiplexes multiple streams over a single connection using binary framing. However, TCP-level head-of-line blocking remains — a lost packet blocks all streams. HTTP/3 (QUIC) solves this by using UDP with independent streams.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the main advantage of HTTP/3 (QUIC) over HTTP/2?',
    options: [
      'It uses less bandwidth than HTTP/2',
      'It runs over UDP and eliminates TCP head-of-line blocking, so a lost packet on one stream does not block other streams',
      'It supports larger file transfers',
      'It is compatible with older browsers that do not support HTTP/2',
    ],
    answer: 1,
    explanation: 'QUIC replaces TCP with a UDP-based transport that has built-in TLS 1.3 encryption and independent stream multiplexing. A packet loss on one stream only stalls that stream, not all streams (which happens with HTTP/2 over TCP). QUIC also supports 0-RTT connection resumption and connection migration (switching networks without re-handshaking).',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What does the browser\'s preload scanner do?',
    options: [
      'It scans for malware in downloaded files',
      'It looks ahead in the HTML while the main parser is blocked on a script, discovering resources (images, stylesheets, scripts) to start downloading early',
      'It preloads the next page the user is likely to visit',
      'It validates HTML syntax before rendering',
    ],
    answer: 1,
    explanation: 'When the main HTML parser is blocked by a synchronous script, the preload scanner (also called speculative parser) continues scanning ahead through raw HTML tokens to discover external resources. It initiates fetches for images, stylesheets, and scripts early, preventing them from having to wait until the parser reaches them. This can shave seconds off page load times.',
  },

  // Chapter 5: Caching & Storage
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What is the difference between Cache-Control: no-cache and Cache-Control: no-store?',
    options: [
      'They are identical and both prevent caching',
      'no-cache allows the browser to store the response but requires revalidation with the server before using it; no-store prevents the browser from storing the response at all',
      'no-cache only applies to images, no-store applies to all resources',
      'no-cache disables the browser cache, no-store disables CDN caching',
    ],
    answer: 1,
    explanation: 'no-cache stores the response in cache but requires the browser to validate it with the server (using ETag/If-None-Match or Last-Modified/If-Modified-Since) before every use. The server can respond with 304 Not Modified to save bandwidth. no-store prevents any caching — the response must be fetched fresh every time, appropriate for sensitive data.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What is the storage limit for localStorage in most browsers?',
    options: [
      'Unlimited storage',
      'Approximately 5-10 MB per origin, with synchronous blocking access on the main thread',
      '100 KB per origin',
      '1 GB per origin',
    ],
    answer: 1,
    explanation: 'localStorage provides about 5-10 MB per origin (varies by browser). It\'s synchronous and blocks the main thread during read/write, making it unsuitable for large data. For larger storage needs, IndexedDB provides hundreds of MB (or more with user permission) with asynchronous access. The Storage API (navigator.storage.estimate()) reports available quota.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'Which caching strategy serves from cache immediately while updating the cache in the background for next time?',
    options: [
      'Cache-first',
      'Stale-while-revalidate',
      'Network-first',
      'Cache-only',
    ],
    answer: 1,
    explanation: 'Stale-while-revalidate returns the cached response immediately (even if stale) for instant loading, then fetches a fresh response from the network in the background to update the cache. The next request gets the updated version. This gives the speed of cache-first with the freshness guarantee of network-first. Supported natively via the HTTP stale-while-revalidate directive and in Service Worker libraries like Workbox.',
  },

  // Chapter 6: Performance Optimization
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is the Critical Rendering Path?',
    options: [
      'The path HTTP requests take through the network',
      'The sequence of steps the browser must complete to convert HTML, CSS, and JavaScript into rendered pixels on screen — the minimum work needed for the first paint',
      'The order in which JavaScript modules are loaded',
      'The route taken by GPU commands to render graphics',
    ],
    answer: 1,
    explanation: 'The Critical Rendering Path includes: HTML parsing → DOM construction → CSSOM construction → render tree → layout → paint. Render-blocking resources (CSS, synchronous JS) extend this path and delay First Contentful Paint. Optimization strategies include inlining critical CSS, deferring non-critical JS, and minimizing the number of critical resources.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What does Largest Contentful Paint (LCP) measure?',
    options: [
      'The time until all content on the page has finished loading',
      'The time until the largest visible content element (image, video, or text block) in the viewport finishes rendering',
      'The total size of all painted pixels',
      'The time until the first byte of the HTML response arrives',
    ],
    answer: 1,
    explanation: 'LCP measures when the largest content element visible in the viewport becomes fully rendered. This typically corresponds to the "hero" image, video, or large text block. A good LCP is under 2.5 seconds. Common causes of poor LCP include slow server response, render-blocking resources, slow resource load times, and client-side rendering delays.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What causes Cumulative Layout Shift (CLS) and how is it prevented?',
    options: [
      'Large JavaScript bundles cause CLS; prevented by code splitting',
      'Elements changing position after initial render (e.g., images loading without dimensions, ads injecting content); prevented by setting explicit width/height and reserving space',
      'Slow CSS animations cause CLS; prevented by using GPU-accelerated transforms',
      'Too many DOM elements cause CLS; prevented by virtual scrolling',
    ],
    answer: 1,
    explanation: 'CLS measures unexpected layout shifts — when visible elements move after rendering. Common causes: images/iframes without width/height attributes (the browser doesn\'t know their size until loaded), dynamically injected content (ads, banners), and late-loading web fonts causing text reflow. Prevention: always set dimensions on media, use aspect-ratio CSS, reserve space for dynamic content, and use font-display: swap.',
  },

  // Chapter 7: Browser Security Model
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What does the Same-Origin Policy prevent?',
    options: [
      'Users from visiting multiple websites in different tabs',
      'Scripts from one origin (scheme + host + port) from reading data from a different origin, preventing cross-site data theft',
      'Websites from using HTTPS encryption',
      'Browsers from caching resources from external domains',
    ],
    answer: 1,
    explanation: 'The Same-Origin Policy is the browser\'s fundamental security mechanism. It prevents JavaScript on https://evil.com from reading responses from https://bank.com. Two URLs have the same origin only if their scheme (http/https), host, and port all match. CORS (Cross-Origin Resource Sharing) provides controlled exceptions through server-sent HTTP headers like Access-Control-Allow-Origin.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What is the purpose of Content Security Policy (CSP)?',
    options: [
      'To encrypt all data sent between the browser and server',
      'To restrict which sources can load scripts, styles, images, and other resources, mitigating XSS and data injection attacks',
      'To manage user authentication cookies',
      'To compress web page content for faster loading',
    ],
    answer: 1,
    explanation: 'CSP is an HTTP header (Content-Security-Policy) that declares which sources are allowed for each resource type. For example, `script-src \'self\' cdn.example.com` only allows scripts from the same origin or cdn.example.com. This mitigates XSS because even if an attacker injects a <script> tag, the browser blocks it if the source isn\'t whitelisted. Modern CSP uses nonce-based or strict-dynamic approaches.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is Site Isolation in Chrome and why was it implemented?',
    options: [
      'It blocks all third-party cookies for privacy',
      'It puts each site into its own renderer process so that even Spectre-class attacks cannot leak cross-origin data from shared process memory',
      'It prevents sites from using Service Workers',
      'It isolates each browser extension into its own sandbox',
    ],
    answer: 1,
    explanation: 'Site Isolation ensures that pages from different sites are rendered in different OS processes. Before Site Isolation, multiple sites could share a process, meaning a Spectre-class CPU vulnerability could read another site\'s data from shared memory. With Site Isolation, cross-origin iframes and cross-origin responses are kept in separate processes, providing an OS-level security boundary.',
  },

  // Chapter 8: Web APIs
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'Why is event delegation more efficient than attaching individual event listeners to many elements?',
    options: [
      'Event delegation uses WebAssembly for faster execution',
      'It attaches a single listener to a parent element and uses event bubbling to handle events from child elements, reducing memory usage and setup time',
      'Event delegation bypasses the browser\'s event loop',
      'It allows events to be processed in a Web Worker',
    ],
    answer: 1,
    explanation: 'Instead of attaching 1000 click handlers to 1000 list items, event delegation attaches one handler to the parent <ul>. When any child is clicked, the event bubbles up to the parent where event.target identifies the clicked element. This uses less memory, is faster to set up, and automatically handles dynamically added elements.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What is the AbortController API used for with fetch()?',
    options: [
      'To retry failed network requests automatically',
      'To cancel in-flight fetch requests, for example when a user navigates away or types a new search query',
      'To pause and resume downloads',
      'To authenticate requests with OAuth tokens',
    ],
    answer: 1,
    explanation: 'AbortController provides an AbortSignal that can be passed to fetch(). Calling controller.abort() cancels the request and the fetch promise rejects with an AbortError. This is essential for search-as-you-type (canceling previous searches), component unmounting in React, and timeout implementation. Modern APIs like addEventListener also accept AbortSignal for cleanup.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What is the difference between a Web Worker and the main thread?',
    options: [
      'Web Workers are faster but cannot perform network requests',
      'Web Workers run JavaScript in a separate thread without access to the DOM, enabling CPU-intensive work without blocking the UI',
      'Web Workers share the same memory as the main thread',
      'Web Workers can only be used in Chrome',
    ],
    answer: 1,
    explanation: 'Web Workers run JavaScript in a background thread, communicating with the main thread via postMessage (structured clone). They cannot access the DOM, window, or document. They\'re ideal for heavy computation (parsing, image processing, encryption) that would freeze the UI on the main thread. SharedWorkers can be shared across tabs. With SharedArrayBuffer, workers can share memory directly.',
  },

  // Chapter 9: Modern Web APIs
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What is WebAssembly (Wasm) and what problem does it solve?',
    options: [
      'A new programming language that replaces JavaScript',
      'A binary instruction format that runs near-native speed in browsers, enabling C/C++/Rust code to run on the web alongside JavaScript',
      'A JavaScript framework for building web applications',
      'A browser extension format that replaces Chrome extensions',
    ],
    answer: 1,
    explanation: 'WebAssembly is a low-level binary format designed as a portable compilation target. Languages like C, C++, Rust, and Go can compile to Wasm and run in the browser at near-native speed. It complements JavaScript — Wasm handles compute-intensive tasks (video codecs, physics engines, SQLite) while JS handles DOM manipulation and orchestration. Wasm modules are sandboxed with the same security guarantees as JS.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What protocol does WebRTC use for real-time peer-to-peer communication?',
    options: [
      'HTTP/2 with WebSocket upgrade',
      'ICE (Interactive Connectivity Establishment) with STUN/TURN for NAT traversal, and SRTP for encrypted media transport',
      'Raw TCP sockets between browsers',
      'MQTT for lightweight messaging',
    ],
    answer: 1,
    explanation: 'WebRTC uses ICE to discover the best connection path between peers. STUN servers help peers discover their public IP (NAT traversal). When direct connection fails (symmetric NAT), TURN servers relay traffic. Media is sent over SRTP (Secure RTP) for encryption. The DataChannel API uses SCTP for reliable/unreliable data transport. A signaling server (typically WebSocket) exchanges SDP offers/answers to negotiate the connection.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What is WebGPU and how does it differ from WebGL?',
    options: [
      'WebGPU is just a newer version of WebGL with the same API',
      'WebGPU is a modern graphics API that provides lower-level GPU access, compute shaders, and better performance than WebGL by mapping to Vulkan/Metal/D3D12',
      'WebGPU only works on dedicated graphics cards, not integrated GPUs',
      'WebGPU replaces CSS for styling web pages',
    ],
    answer: 1,
    explanation: 'WebGPU is the successor to WebGL, designed to expose modern GPU capabilities. Unlike WebGL (which maps to OpenGL ES), WebGPU maps to Vulkan (Linux/Android), Metal (Apple), and D3D12 (Windows) — the native APIs GPUs are actually designed for. WebGPU adds compute shaders (GPGPU), better multi-threading, and explicit resource management for significantly better performance in 3D rendering and ML inference.',
  },

  // Chapter 10: Progressive Web Apps
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What is the Service Worker lifecycle?',
    options: [
      'Load → Execute → Terminate, running only during page load',
      'Install → Wait (if existing SW is active) → Activate → Fetch/idle, running independently of pages as an event-driven proxy',
      'Start → Run → Stop, controlled by the page\'s JavaScript',
      'Register → Compile → Execute, similar to a Web Worker',
    ],
    answer: 1,
    explanation: 'A Service Worker goes through: Registration → Install (download and cache resources) → Wait (if a previous version is still controlling pages) → Activate (clean up old caches, take control). Once active, it intercepts fetch events as a programmable network proxy. It runs in a separate thread, has no DOM access, and is event-driven — it terminates when idle and restarts when events arrive.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What criteria must a web app meet to be installable as a PWA?',
    options: [
      'It must be built with a specific framework like React or Angular',
      'It must serve over HTTPS, have a valid web app manifest with required fields, and register a Service Worker with a fetch handler',
      'It must be listed in an app store',
      'It must use WebAssembly for native-like performance',
    ],
    answer: 1,
    explanation: 'PWA installability requires: HTTPS (or localhost for dev), a valid manifest.json with name, icons (192px and 512px), start_url, and display mode (standalone/fullscreen), plus a registered Service Worker with a fetch event handler. When criteria are met, the browser shows an install prompt (beforeinstallprompt event). The installed PWA runs in its own window without browser chrome.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is the Background Sync API used for in PWAs?',
    options: [
      'Syncing files between the browser and a cloud storage service',
      'Deferring actions (like sending a message or submitting a form) until the device has a stable network connection, even if the user has closed the page',
      'Synchronizing data between browser tabs',
      'Downloading large files in the background',
    ],
    answer: 1,
    explanation: 'Background Sync lets a Service Worker register a sync event that fires when connectivity is restored. If a user submits a form while offline, the app saves the data to IndexedDB and registers a sync. When the network returns, the browser wakes the Service Worker which processes the queued action. The Periodic Background Sync API extends this with recurring tasks.',
  },

  // Chapter 11: Browser DevTools
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What does the Accessibility Tree in DevTools show?',
    options: [
      'The file system structure of the website',
      'How the browser exposes page content to assistive technologies like screen readers, showing computed roles, names, and ARIA attributes',
      'A tree of all JavaScript variables in memory',
      'The CSS cascade hierarchy for styling',
    ],
    answer: 1,
    explanation: 'The Accessibility Tree is a parallel structure to the DOM that the browser creates for assistive technologies. It shows each element\'s computed role (button, heading, link), accessible name, description, and state. DevTools lets you inspect this tree to verify that interactive elements have proper labels, headings have correct hierarchy, and ARIA attributes are applied correctly.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What does a flame chart in the Performance panel represent?',
    options: [
      'Network request durations and their dependencies',
      'CPU activity over time — each bar is a function call, with width showing duration and vertical stacking showing the call hierarchy',
      'Memory allocation patterns for JavaScript objects',
      'The order in which CSS styles are computed',
    ],
    answer: 1,
    explanation: 'A flame chart visualizes the call stack over time. The x-axis is time, each horizontal bar is a function invocation (wider = longer duration), and vertical stacking shows the call hierarchy (caller above, callee below). Yellow bars are JavaScript, purple are layout/rendering, green are painting. Long bars or deep stacks reveal performance bottlenecks. Look for "long tasks" exceeding 50ms that block the main thread.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'How can you identify memory leaks using Chrome DevTools?',
    options: [
      'By checking the Console for error messages',
      'By taking multiple heap snapshots over time and comparing them to find objects that keep growing in count or retained size',
      'By monitoring the Network tab for failed requests',
      'By running the Lighthouse audit tool',
    ],
    answer: 1,
    explanation: 'Take a heap snapshot, perform the suspected leaking action, take another snapshot, and use the "Comparison" view to see objects allocated between snapshots that haven\'t been garbage collected. Common leak patterns: forgotten event listeners, detached DOM nodes still referenced in JS, closures capturing large objects, and growing arrays/maps. The "Allocation timeline" helps pinpoint when leaks occur.',
  },

  // Chapter 12: Extensions & Browser APIs
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What changed in Manifest V3 compared to Manifest V2 for browser extensions?',
    options: [
      'MV3 added support for WebAssembly in extensions',
      'MV3 replaced persistent background pages with event-driven Service Workers and replaced webRequest blocking with declarativeNetRequest for content filtering',
      'MV3 removed the ability to create browser extensions entirely',
      'MV3 only changed the extension file format from JSON to YAML',
    ],
    answer: 1,
    explanation: 'Manifest V3\'s biggest changes: background pages become Service Workers (non-persistent, event-driven, reducing memory), the blocking webRequest API is replaced by declarativeNetRequest (declarative rules instead of arbitrary code inspection). This improves performance and security but limits ad blockers\' flexibility. MV3 also adds promise-based APIs and tighter permission controls.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is the "isolated world" concept for content scripts in browser extensions?',
    options: [
      'Content scripts run in a separate process from the web page',
      'Content scripts share the DOM with the page but have their own JavaScript execution environment, so page scripts and extension scripts cannot access each other\'s variables',
      'Content scripts cannot access the internet',
      'Content scripts only run when the browser is offline',
    ],
    answer: 1,
    explanation: 'Content scripts are injected into web pages but run in an "isolated world" — they see the same DOM but have a separate JavaScript context. The page\'s JS cannot see the extension\'s variables and vice versa. This prevents conflicts and security issues. Communication between content scripts and the page uses window.postMessage or custom DOM events. Content scripts communicate with background workers via chrome.runtime.sendMessage.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'Why should extensions use optional permissions instead of requesting all permissions at install time?',
    options: [
      'Optional permissions are faster to process',
      'Users are more likely to install extensions that request fewer upfront permissions, and optional permissions can be requested in context when the user understands why they are needed',
      'Required permissions are deprecated in Manifest V3',
      'Optional permissions allow the extension to bypass CORS restrictions',
    ],
    answer: 1,
    explanation: 'Requesting broad permissions (like "access all websites") at install time scares users and increases review scrutiny. Optional permissions let the extension request access only when needed — e.g., "To save this page, I need access to this site." The user understands the context and is more likely to grant it. This follows the principle of least privilege and improves trust.',
  },

  // Chapter 13: Cross-Browser Compatibility
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'Why is feature detection preferred over user-agent sniffing?',
    options: [
      'Feature detection is faster to execute than parsing user-agent strings',
      'User-agent strings are unreliable (browsers fake them) and become outdated, while feature detection directly tests if a specific API or capability exists in the current browser',
      'Feature detection works offline while user-agent sniffing requires a server',
      'User-agent sniffing is blocked by Content Security Policy',
    ],
    answer: 1,
    explanation: 'User-agent strings are notoriously unreliable — browsers include other browsers\' tokens for compatibility (Chrome\'s UA includes "Safari"), and new browser versions break hardcoded checks. Feature detection (if (\'IntersectionObserver\' in window)) directly tests whether the capability exists. CSS.supports() and @supports test CSS features. This is future-proof and works regardless of which browser implements a feature.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What is differential serving in the context of cross-browser JavaScript delivery?',
    options: [
      'Serving different content to mobile vs desktop users',
      'Sending modern ES2020+ JavaScript to modern browsers and transpiled ES5 bundles to legacy browsers, using <script type="module"> and <script nomodule> respectively',
      'A/B testing different JavaScript frameworks',
      'Serving minified code in production and readable code in development',
    ],
    answer: 1,
    explanation: 'Differential serving uses the module/nomodule pattern: <script type="module" src="modern.js"> is only loaded by browsers that support ES modules (all modern browsers), while <script nomodule src="legacy.js"> is only loaded by older browsers that ignore type="module". The modern bundle is significantly smaller (no polyfills, modern syntax) while legacy browsers still get a working (larger) bundle.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is the Web Platform Tests (WPT) project?',
    options: [
      'A JavaScript testing framework similar to Jest',
      'A shared test suite used by all major browser vendors to verify their implementations of web standards, ensuring cross-browser interoperability',
      'A performance benchmarking tool for comparing browser speeds',
      'A linting tool that checks HTML/CSS for browser compatibility issues',
    ],
    answer: 1,
    explanation: 'Web Platform Tests (wpt.fyi) is a massive shared test suite that Chrome, Firefox, Safari, and other browsers run to verify correct implementation of web standards (HTML, CSS, DOM, Web APIs). It contains over 50,000 tests. The annual Interop project uses WPT scores to coordinate cross-browser improvements on specific features, reducing compatibility issues for web developers.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
