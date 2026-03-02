# Web Animations Explorer — Design Document

## Overview

A new explorer app (#43) for the cs-tools monorepo covering web animation techniques: CSS transitions & animations, transforms, Web Animations API, requestAnimationFrame, scroll-driven animations, SVG animations, View Transitions API, motion design principles, performance optimization, animation libraries, Canvas/WebGL motion, and accessibility.

## App Configuration

| Field | Value |
|-------|-------|
| Package | `@cstools/web-animations` |
| Directory | `apps/web-animations` |
| Port | 5215 |
| Icon | `Sparkles` |
| Color | `#E040FB` |
| localStorage prefix | `web-animations-` |
| Tags | `['reference', 'quiz']` |

## Topic Structure (4 parts, 13 topics, 39 concepts)

### Part 1: Foundations (Topics 1-3)

1. **CSS Transitions** — transition properties & timing functions, easing curves (cubic-bezier), triggering & controlling transitions
2. **CSS Animations & Keyframes** — @keyframes syntax & multi-step animations, animation properties (delay, fill-mode, direction), animation composition & layering
3. **CSS Transforms** — 2D transforms (translate, rotate, scale, skew), 3D transforms & perspective, transform-origin & hardware acceleration

### Part 2: JavaScript Animation (Topics 4-6)

4. **requestAnimationFrame & Timing** — rAF loop & frame budgets, delta time & frame-rate independence, scheduling & cancelAnimationFrame
5. **Web Animations API (WAAPI)** — Element.animate() & KeyframeEffect, Animation object (play, pause, reverse, finish), timeline control & AnimationTimeline
6. **Scroll-Driven Animations** — ScrollTimeline & ViewTimeline, CSS scroll() & view() functions, intersection-based triggers & scroll snapping

### Part 3: Advanced Techniques (Topics 7-10)

7. **SVG Animations** — SMIL vs CSS vs JS approaches, path animation & morphing, SVG filters & animated effects
8. **View Transitions API** — same-document transitions, cross-document navigation transitions, transition groups & custom animations
9. **Motion Design Principles** — easing & natural motion (physics-based), staggering & choreography, micro-interactions & feedback
10. **Animation Libraries** — GSAP (GreenSock), Framer Motion & React Spring, Lottie & after-effects workflows

### Part 4: Performance & Accessibility (Topics 11-13)

11. **Animation Performance** — compositor-only properties (transform, opacity), GPU layers & will-change, jank detection & frame profiling
12. **Canvas & WebGL Animation** — Canvas 2D animation loop, particle systems & procedural motion, WebGL shaders & vertex animation
13. **Accessibility & Reduced Motion** — prefers-reduced-motion media query, vestibular disorders & motion sensitivity, progressive enhancement for animations

## Architecture

Standard explorer app scaffold: 12 component/config files + 2 data files (topics.ts, quiz.ts). Uses shared packages (@cstools/ui, @cstools/core). Dark theme, sidebar navigation, concept cards with expand/collapse, quiz mode per topic, search, bookmarks, completion tracking.

## Integration

- Hub entry with Sparkles icon and #E040FB color (vibrant magenta)
- CLAUDE.md updated with port 5215
- Overall stats incremented (tools, topics, questions, concepts)
