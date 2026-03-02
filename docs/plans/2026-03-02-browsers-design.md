# Browser Internals Explorer — Design Document

## Overview

A new explorer app (#42) for the cs-tools monorepo covering how browsers work under the hood: rendering engines, JavaScript engines, networking, security model, DevTools, Web APIs, storage, extensions, PWAs, performance optimization, and cross-browser compatibility.

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/browsers` |
| Directory | `apps/browsers` |
| Port | 5214 |
| Icon | `Globe` |
| Color | `#4285F4` |
| localStorage prefix | `browsers-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 parts, 13 topics, 39 concepts)

### Part 1: Foundations (Topics 1-3)

1. **Browser Architecture** — multi-process architecture, rendering engines (Blink/Gecko/WebKit), browser components & IPC
2. **Rendering Pipeline** — DOM & CSSOM construction, render tree & layout, painting & compositing
3. **JavaScript Engines** — V8/SpiderMonkey/JavaScriptCore internals, JIT compilation, garbage collection & memory management

### Part 2: Networking & Performance (Topics 4-6)

4. **Browser Networking** — HTTP/2 & HTTP/3 (QUIC), TLS handshake & certificate validation, connection management & preloading
5. **Caching & Storage** — HTTP caching (ETag, Cache-Control), browser storage (cookies, localStorage, IndexedDB), Cache API & Service Workers
6. **Performance Optimization** — Critical Rendering Path, lazy loading & code splitting, Core Web Vitals (LCP, FID, CLS)

### Part 3: Security & APIs (Topics 7-10)

7. **Browser Security Model** — same-origin policy & CORS, Content Security Policy (CSP), sandboxing & site isolation
8. **Web APIs** — DOM & Events API, Fetch & XMLHttpRequest, Web Workers & SharedArrayBuffer
9. **Modern Web APIs** — WebAssembly (Wasm), WebRTC & real-time communication, WebGL & Canvas API
10. **Progressive Web Apps** — Service Worker lifecycle, manifest & installability, offline-first strategies & push notifications

### Part 4: Advanced Topics (Topics 11-13)

11. **Browser DevTools** — Elements & CSS inspection, Performance & Memory profiling, Network panel & debugging techniques
12. **Extensions & Browser APIs** — extension architecture (Manifest V3), content scripts & background workers, WebExtensions API & permissions
13. **Cross-Browser Compatibility** — feature detection vs user-agent sniffing, polyfills & transpilation, testing strategies & browser differences

## Architecture

Standard explorer app scaffold: 12 component/config files + 2 data files (topics.ts, quiz.ts). Uses shared packages (@cstools/ui, @cstools/core). Dark theme, sidebar navigation, concept cards with expand/collapse, quiz mode per topic, search, bookmarks, completion tracking.

## Integration

- Hub entry with Globe icon and #4285F4 color (browser blue)
- CLAUDE.md updated with port 5214
- Overall stats incremented (tools, topics, questions, concepts)
