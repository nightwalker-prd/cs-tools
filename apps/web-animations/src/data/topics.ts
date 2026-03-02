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
  { id: 2, title: 'JavaScript Animation' },
  { id: 3, title: 'Advanced Techniques' },
  { id: 4, title: 'Performance & Accessibility' },
];

export const topics: Topic[] = [
  // Part 1: Foundations
  {
    id: 1,
    title: 'CSS Transitions',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'How CSS transitions animate property changes smoothly between states, the mathematics behind easing curves, and techniques for triggering and controlling transition behavior in interactive UIs.',
    concepts: [
      {
        id: '1-1',
        name: 'Transition Properties & Timing Functions',
        description:
          'CSS transitions interpolate property values over a specified duration when a triggering condition changes. The transition shorthand combines transition-property, transition-duration, transition-timing-function, and transition-delay into a single declaration that controls which properties animate, how long the animation takes, and the acceleration curve applied.',
        keyPoints: [
          'transition-property accepts a comma-separated list of animatable CSS properties, or "all" to transition every changed property — explicitly listing properties is preferred for performance since the browser only needs to watch specified properties',
          'transition-duration sets the time in seconds (s) or milliseconds (ms) — a 0s duration means no animation occurs, while typical UI transitions range from 150ms to 400ms for perceived responsiveness',
          'transition-timing-function accepts keyword values (ease, linear, ease-in, ease-out, ease-in-out) which map to specific cubic-bezier curves — "ease" is the default and provides a slow-start, fast-middle, slow-end curve',
          'transition-delay offsets the start of the animation — negative delay values cause the transition to start partway through, creating the illusion of a faster, already-in-progress animation',
          'Only properties with identifiable midpoints can be transitioned — numeric values (width, opacity, color) interpolate naturally, while discrete values (display, visibility) cannot be smoothly transitioned without workarounds',
        ],
        tradeoffs: [
          'Using "transition: all" is convenient but forces the browser to check every property for changes on each reflow, which degrades performance on complex elements with many computed properties',
          'Short durations (< 100ms) feel instantaneous and waste computation, while long durations (> 500ms) feel sluggish — the optimal range of 200-300ms matches human perception of cause and effect',
          'Transitioning layout-triggering properties (width, height, margin, padding) causes expensive reflows on every frame, while transitioning transform and opacity stays on the compositor thread',
        ],
        realWorld: [
          'Material Design specifies 300ms as the standard transition duration for most UI elements, with shorter 150ms for simple fades and longer 375ms for complex shape changes',
          'Stripe.com uses carefully tuned transition-delay values on navigation dropdowns to prevent accidental closure when users move their cursor diagonally across menu items',
          'GitHub uses "transition: background-color 0.12s ease-in-out" on buttons and links for hover feedback — short enough to feel responsive, long enough to be perceived',
        ],
      },
      {
        id: '1-2',
        name: 'Easing Curves & cubic-bezier',
        description:
          'Easing functions define the rate of change over time during an animation, transforming linear progress into natural-feeling motion. The cubic-bezier() function provides precise control over the acceleration curve by defining two control points (P1 and P2) on a Bezier curve from (0,0) to (1,1).',
        keyPoints: [
          'cubic-bezier(x1, y1, x2, y2) defines control points P1(x1,y1) and P2(x2,y2) — x values must be between 0 and 1 (time), but y values can exceed that range to create overshoot/bounce effects',
          'ease-in (cubic-bezier(0.42, 0, 1, 1)) starts slow and accelerates — use for elements leaving the screen, since the eye tracks them less closely as they depart',
          'ease-out (cubic-bezier(0, 0, 0.58, 1)) starts fast and decelerates — use for elements entering the screen, giving an immediate response that settles into place naturally',
          'The steps() timing function creates discrete frame jumps instead of smooth interpolation — steps(4, jump-end) divides the animation into 4 equal segments, useful for sprite sheet animations',
          'CSS also supports linear() with multiple stop points for creating complex multi-segment easing curves — linear(0, 0.5 25%, 1 50%, 0.5 75%, 0) creates a custom wave-like progression',
        ],
        tradeoffs: [
          'Built-in keywords (ease, ease-in-out) are readable and well-tested but offer limited expressiveness — custom cubic-bezier curves allow brand-specific motion but require careful tuning with tools like cubic-bezier.com',
          'Overshoot effects (y values > 1) create playful, bouncy motion but can cause layout issues if the animated property affects element dimensions — transform: scale() is safe for overshoot, width is not',
          'The linear() function enables arbitrarily complex easing curves (spring physics, elastic bounce) but has limited browser support compared to cubic-bezier and is harder to mentally visualize',
        ],
        realWorld: [
          'Apple uses a custom cubic-bezier(0.25, 0.1, 0.25, 1.0) on macOS and iOS for system-level animations, creating their signature fluid motion that feels natural and responsive',
          'Google Material Design 3 defines "emphasized" easing cubic-bezier(0.2, 0, 0, 1) for entering elements and cubic-bezier(0.2, 0, 0.8, 0.2) for exiting, replacing the older standard/decelerate/accelerate set',
          'Animation tools like Framer and Figma export motion curves as cubic-bezier values, enabling designers to hand off exact easing specifications to developers',
        ],
      },
      {
        id: '1-3',
        name: 'Triggering & Controlling Transitions',
        description:
          'CSS transitions require a trigger event that changes a property value to initiate animation. Understanding how pseudo-classes, class toggling, media queries, and JavaScript interaction patterns trigger transitions is essential for building responsive, interactive interfaces.',
        keyPoints: [
          'Pseudo-class triggers (:hover, :focus, :active, :checked) are the most common — the transition is defined on the base state and fires when the pseudo-class applies and when it removes, creating a natural bidirectional animation',
          'Class toggling via JavaScript (element.classList.add/remove/toggle) is the standard pattern for state-driven transitions — define the transition on the element and change properties via class names',
          'The transitionend event fires when a CSS transition completes — event.propertyName identifies which property finished, enabling JavaScript to chain sequential animations or clean up states',
          'transitioncancel fires if a transition is interrupted (element removed, display set to none, or property changed mid-transition) — handling this event prevents UI states from getting stuck',
          'Forcing a reflow between property changes (element.offsetHeight or getComputedStyle()) is sometimes necessary to restart a transition — without it, the browser batches changes and skips the animation',
        ],
        tradeoffs: [
          'Pure CSS triggers (:hover, :focus-within) keep JavaScript minimal but are limited to user interaction states — complex application state changes require JavaScript class toggling',
          'The transitionend event fires once per property per element — transitioning multiple properties simultaneously produces multiple events, requiring careful filtering or using a single composite property like transform',
          'Forcing reflow to restart transitions is a well-known hack but technically triggers layout recalculation — in performance-critical code, consider using WAAPI or requestAnimationFrame-based approaches instead',
        ],
        realWorld: [
          'Accordion components typically toggle a class that changes max-height from 0 to a calculated value, with a transition applied — the transitionend event is used to set max-height to "auto" after expansion completes',
          'Toast notification libraries (react-hot-toast, Sonner) use class-based transitions for enter/exit animations, listening to transitionend before removing the DOM element to ensure smooth exit animation',
          'CSS :focus-visible combined with transitions powers accessible focus indicators that animate smoothly when tabbing through a form, without showing on mouse clicks',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'CSS Animations & Keyframes',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'The @keyframes rule enables multi-step animations that run independently of state changes, with fine-grained control over animation playback, composition, and lifecycle management.',
    concepts: [
      {
        id: '2-1',
        name: '@keyframes Syntax & Multi-Step Animations',
        description:
          'The @keyframes at-rule defines named animation sequences with percentage-based waypoints that specify property values at each stage. Unlike transitions which interpolate between two states, keyframe animations support arbitrary numbers of intermediate steps and can run automatically without user interaction.',
        keyPoints: [
          '@keyframes accepts percentage stops (0%, 25%, 50%, 100%) or the keywords "from" (0%) and "to" (100%) — intermediate percentages create multi-step animations with distinct phases',
          'Properties defined at each keyframe are interpolated between stops using the specified timing function — properties not listed at a keyframe hold their most recently defined value',
          'Multiple properties can change at different rates by assigning different keyframe percentages — e.g., opacity can fade in during 0%-20% while transform slides in across 0%-100%',
          'Keyframe rules are global (not scoped to selectors) in plain CSS — CSS Modules and CSS-in-JS solutions auto-scope keyframe names to avoid collisions in large codebases',
          'The browser calculates "missing" keyframes by pulling values from the element\'s computed style — if 0% or 100% is omitted, the element\'s current property values are used as the start or end state',
        ],
        tradeoffs: [
          'Keyframe animations are more powerful than transitions (multi-step, auto-play, infinite loops) but cannot be dynamically parameterized — changing intermediate values requires defining new @keyframes rules or using CSS custom properties',
          'Percentage-based keyframes are resolution-independent but make it difficult to precisely time individual segments — a 100-frame animation at 2s duration gives 20ms per percentage point, requiring manual calculation for exact timing',
          'CSS custom properties (var()) can be used inside keyframes to create parameterized animations, but browser support for animating custom properties requires @property registration',
        ],
        realWorld: [
          'Skeleton loading screens use @keyframes with a gradient background-position animation — the shimmer effect typically moves a linear-gradient from -200% to 200% over 1.5s with infinite repetition',
          'CSS spinner/loader libraries (SpinKit, CSS Loaders) consist entirely of @keyframes animations applied to simple div structures, demonstrating the power of pure CSS animation',
          'Tailwind CSS includes built-in animation utilities (animate-spin, animate-pulse, animate-bounce, animate-ping) that are predefined @keyframes rules applied via utility classes',
        ],
      },
      {
        id: '2-2',
        name: 'Animation Properties (delay, fill-mode, direction)',
        description:
          'The animation shorthand combines eight sub-properties that control playback behavior: name, duration, timing-function, delay, iteration-count, direction, fill-mode, and play-state. Mastering these properties enables precise control over when animations start, how they repeat, and what state the element holds before and after playback.',
        keyPoints: [
          'animation-fill-mode controls the element state outside the active animation period — "forwards" retains the final keyframe values after completion, "backwards" applies the first keyframe during the delay period, "both" applies both behaviors',
          'animation-direction controls playback order — "normal" plays 0% to 100%, "reverse" plays 100% to 0%, "alternate" oscillates forward/backward on each iteration, creating natural back-and-forth motion',
          'animation-iteration-count accepts a number or "infinite" — fractional values (e.g., 0.5) stop the animation midway, and combining with alternate direction creates smooth looping effects',
          'animation-play-state ("running" or "paused") enables play/pause control from CSS — toggling this property via :hover or a class creates an interactive pause mechanism without JavaScript',
          'animation-delay supports negative values — a -0.5s delay on a 2s animation starts playback at the 25% mark immediately, useful for creating staggered animation grids where elements start at different phases',
        ],
        tradeoffs: [
          'animation-fill-mode: forwards keeps the final state but the animation technically remains "active" on the element — this can cause unexpected behavior with specificity and prevents garbage collection of the animation context',
          'Infinite animations are useful for loaders and ambient effects but consume GPU resources continuously — even off-screen infinite animations cost compositor cycles unless the element has display: none',
          'Stacking multiple animation declarations on one element via comma separation allows complex choreography but makes debugging difficult — browser DevTools animation panels help visualize overlapping timelines',
        ],
        realWorld: [
          'Notification badge "pulse" effects use animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite with alternate direction, creating a breathing glow that draws attention without being jarring',
          'Page load entrance animations use animation-fill-mode: both with a staggered delay — elements fade/slide in sequentially, retaining their final position while respecting the initial hidden state during delay',
          'The :hover pause pattern (animation-play-state: paused on hover) is used in image carousels and auto-scrolling marquees to pause when the user interacts, providing accessible control',
        ],
      },
      {
        id: '2-3',
        name: 'Animation Composition & Layering',
        description:
          'Multiple animations can be applied to a single element simultaneously, and understanding how they compose, interact, and override each other is critical for building complex motion sequences. CSS also provides the animation-composition property for controlling how keyframe values combine with underlying styles.',
        keyPoints: [
          'Multiple animations are comma-separated in the animation shorthand — each runs independently with its own timing, and later animations in the list override properties set by earlier ones when they target the same CSS property',
          'animation-composition (add, accumulate, replace) controls how keyframe values combine with the underlying style — "add" adds the keyframe value to the base, "accumulate" adds numerically, and "replace" (default) overwrites the base value entirely',
          'The Web Animations specification defines an animation stack where later animations have higher priority — this priority system is separate from CSS specificity and applies to the computed animation effect',
          'CSS @property registration enables animating custom properties with proper type interpolation — @property --hue { syntax: "<number>"; initial-value: 0; inherits: false; } allows smooth hue rotation in keyframes',
          'Individual transform properties (translate, rotate, scale) introduced in CSS allow independent animation of each axis without the composition headaches of animating the combined transform shorthand',
        ],
        tradeoffs: [
          'Animating the combined "transform" property as a single value means a rotation animation and a translation animation cannot run independently — one overwrites the other unless individual transform properties (translate, rotate, scale) are used separately',
          'animation-composition: add enables additive animation (layering effects) but is harder to reason about because the final value depends on the base style plus all active animation contributions',
          'CSS custom property animations via @property enable powerful dynamic effects (color cycling, counter animations) but require explicit type registration and have a performance cost for properties that trigger layout or paint',
        ],
        realWorld: [
          'GitHub Copilot loading animation layers a rotation animation with a scale pulse on the same element using separate translate and rotate properties, achieving independent timing for each motion axis',
          'CSS Houdini-powered gradient animations use @property to register a custom --angle property, then animate it in a keyframe — this enables smooth conic-gradient rotation that was previously impossible with pure CSS',
          'Complex character animations in CSS (like the famous "pure CSS Homer Simpson") layer dozens of keyframe animations on nested elements, each controlling a single transform axis for independent limb/feature movement',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'CSS Transforms',
    part: 1,
    partTitle: 'Foundations',
    summary:
      'CSS transforms apply geometric transformations to elements without affecting document flow, supporting both 2D and 3D operations that are composited efficiently by the GPU for smooth, performant visual effects.',
    concepts: [
      {
        id: '3-1',
        name: '2D Transforms (translate, rotate, scale, skew)',
        description:
          'The transform property applies mathematical matrix operations to an element\'s coordinate system, enabling translation, rotation, scaling, and skewing. These operations modify the element\'s visual rendering without triggering layout recalculation, making them the preferred way to move, size, and orient elements in animations.',
        keyPoints: [
          'translate(x, y) moves the element from its layout position — translateX(100px) shifts right, translateY(-50%) shifts up by half the element\'s own height, and translate values can use any CSS length unit including percentages relative to the element itself',
          'rotate(angle) rotates clockwise around the element\'s center by default — accepts deg, rad, turn, and grad units, where 1turn = 360deg, and negative values rotate counter-clockwise',
          'scale(x, y) multiplies the element\'s dimensions — scale(1.5) enlarges uniformly by 150%, scale(-1, 1) mirrors horizontally, and scale(0) collapses the element to a point while preserving its layout space',
          'skew(x-angle, y-angle) applies a shear transformation that tilts the element along the specified axes — skewX(15deg) creates a parallelogram effect, commonly used for dynamic button and card designs',
          'Transform functions are multiplied as matrices in the order they appear — translate(100px, 0) rotate(45deg) produces a different result than rotate(45deg) translate(100px, 0) because rotation changes the coordinate system for subsequent translations',
        ],
        tradeoffs: [
          'Transforms do not affect document flow — the element\'s original layout space is preserved, which is excellent for animation but means surrounding elements do not reposition, potentially causing visual overlap',
          'Percentage values in translate() are relative to the element itself (not the parent), which is unique among CSS properties and extremely useful for centering (translate(-50%, -50%)) but can be confusing initially',
          'Combining multiple transform functions in a single property requires re-declaring the entire value — changing just the rotation means re-specifying the translation and scale too, unless using individual transform properties (translate, rotate, scale)',
        ],
        realWorld: [
          'The classic CSS centering technique: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) works because translate percentages are relative to the element\'s own dimensions',
          'Card hover effects commonly use transform: translateY(-4px) scale(1.02) to create a subtle "lift" effect that feels physical — this combination is cheap to animate because transform is a compositor-only property',
          'Parallax scrolling effects use translateY with varying multipliers on different layers — background layers translate slowly while foreground layers translate quickly, creating depth perception',
        ],
      },
      {
        id: '3-2',
        name: '3D Transforms & Perspective',
        description:
          'CSS 3D transforms extend the coordinate system with a z-axis, enabling rotations, translations, and transformations in three-dimensional space. The perspective property controls the virtual camera distance, creating convincing depth effects that bring flat interfaces to life.',
        keyPoints: [
          'perspective sets the distance from the viewer to the z=0 plane — smaller values (100px-300px) create dramatic, exaggerated 3D effects, while larger values (800px-2000px) produce subtle, realistic depth',
          'perspective is applied on the parent container to create a shared vanishing point for all children, while transform: perspective() on individual elements gives each its own independent vanishing point',
          'rotateX() tilts forward/backward (like a laptop screen hinging), rotateY() spins left/right (like a revolving door), and rotateZ() is equivalent to the 2D rotate() function',
          'translateZ() moves elements along the depth axis — positive values bring elements closer to the viewer (appearing larger), negative values push them away (appearing smaller), relative to the perspective value',
          'backface-visibility: hidden prevents the mirrored back face of a rotated element from showing — essential for card-flip animations where front and back faces are separate elements rotated 180deg apart',
        ],
        tradeoffs: [
          'perspective creates a realistic 3D projection but introduces foreshortening that can distort text readability and click targets — elements closer to the viewer appear larger, which may misrepresent actual element sizes',
          'transform-style: preserve-3d allows nested elements to exist in the same 3D space but is broken by any ancestor with overflow: hidden, opacity < 1, or certain filter values — these create a "flattening" context that collapses children back to 2D',
          '3D transforms consume more GPU memory because the browser must maintain separate texture layers for the 3D scene — overuse on mobile devices can cause performance degradation or visual artifacts',
        ],
        realWorld: [
          'Card flip animations use two absolutely positioned children (front/back) on a container with perspective: 1000px and transform-style: preserve-3d — hovering rotates the container on the Y-axis, revealing the back face',
          'Apple.com product pages use perspective and rotateY to create immersive 3D product showcases that respond to scroll position, making the MacBook appear to open and close as the user scrolls',
          'CSS 3D cube navigations (used in mobile app transitions) construct a cube from six faces using rotateX/Y and translateZ(half-width), with the container rotation driving navigation between panels',
        ],
      },
      {
        id: '3-3',
        name: 'transform-origin & Hardware Acceleration',
        description:
          'The transform-origin property defines the pivot point for all transformations, while understanding how browsers promote elements to GPU-composited layers is essential for achieving smooth 60fps animations. The relationship between transforms and hardware acceleration is the foundation of performant web animation.',
        keyPoints: [
          'transform-origin defaults to "50% 50%" (center) and accepts 1-3 values for x, y, and z offset — "0 0" sets the origin to the top-left corner, changing how rotations and scales pivot around the element',
          'transform-origin accepts keywords (top, right, bottom, left, center), lengths, and percentages — "right bottom" sets the pivot to the bottom-right corner, useful for corner-anchored expand/collapse animations',
          'When a transform is applied, the browser creates a new compositor layer for the element — this layer is rasterized to a GPU texture and can be moved, rotated, and scaled by the compositor thread without involving the main thread',
          'The will-change property hints to the browser to pre-promote an element to its own layer before the animation starts — will-change: transform, opacity creates the layer in advance, avoiding a visible "jank" frame when the animation begins',
          'Only transform and opacity (and filter in modern browsers) can be animated entirely on the compositor thread — animating any other property requires main-thread layout/paint work on every frame, risking dropped frames',
        ],
        tradeoffs: [
          'will-change: transform pre-creates a GPU layer, consuming VRAM (each layer stores a full bitmap texture) — applying it to hundreds of elements simultaneously can exhaust GPU memory, especially on mobile devices with limited VRAM',
          'GPU-composited layers solve animation performance but creating too many layers causes "layer explosion" where the compositor spends more time managing layers than the main thread would spend painting — Chrome DevTools Layers panel helps diagnose this',
          'transform-origin interacts with animations in non-obvious ways — changing origin mid-animation causes the element to "jump" because the pivot point shifts, so origin should be set before the animation begins and remain constant',
        ],
        realWorld: [
          'Navigation hamburger-to-X icon animations use transform-origin to pivot individual bars from their endpoints — the top bar rotates 45deg from its left edge, the bottom bar rotates -45deg, and the middle bar fades out',
          'Chrome DevTools Performance panel shows "Compositor" tracks for GPU-accelerated animations versus "Main" thread work for layout-triggering animations — green frames in the compositor are virtually free while yellow main-thread frames risk jank',
          'iOS Safari has a well-known bug where transform: translateZ(0) (a common "force GPU" hack) causes blurry text because the element is rasterized at its current scale — the fix is to use will-change: transform and remove it after animation completes',
        ],
      },
    ],
  },

  // Part 2: JavaScript Animation
  {
    id: 4,
    title: 'requestAnimationFrame & Timing',
    part: 2,
    partTitle: 'JavaScript Animation',
    summary:
      'The requestAnimationFrame API provides the fundamental JavaScript animation loop synchronized to the display refresh rate, enabling smooth frame-by-frame animation with proper timing control and frame budget management.',
    concepts: [
      {
        id: '4-1',
        name: 'rAF Loop & Frame Budgets',
        description:
          'requestAnimationFrame (rAF) schedules a callback to execute before the browser\'s next repaint, synchronized to the monitor\'s refresh rate (typically 60Hz = 16.67ms per frame). Building animation loops with rAF ensures work is performed at the optimal time in the rendering pipeline, unlike setTimeout/setInterval which are not synchronized to display refresh.',
        keyPoints: [
          'rAF callbacks receive a high-resolution DOMHighResTimeStamp parameter (in milliseconds with microsecond precision) representing the time the frame was scheduled — this timestamp is consistent across all rAF callbacks in the same frame',
          'At 60Hz, the frame budget is 16.67ms — all JavaScript execution, style recalculation, layout, and paint must complete within this window, or the browser drops the frame and the user perceives jank',
          'rAF automatically pauses when the tab is hidden (document.hidden === true), saving CPU/GPU resources — setTimeout/setInterval continue running in background tabs, wasting resources and causing animation jumps when the tab becomes visible',
          'Multiple rAF callbacks registered in the same frame all execute in registration order before the same repaint — this makes rAF suitable for coordinating multiple animation systems that need to update in sync',
          'The animation loop pattern is: function animate(timestamp) { update(timestamp); render(); requestAnimationFrame(animate); } — the recursive call at the end ensures the loop continues each frame',
        ],
        tradeoffs: [
          'rAF ties animation updates to the display refresh rate, which varies between devices (60Hz, 90Hz, 120Hz, 144Hz) — hardcoding 60fps assumptions breaks on high-refresh displays and wastes frames on lower-refresh ones',
          'All rAF callbacks execute on the main thread, meaning heavy JavaScript computation in one callback delays all subsequent callbacks and the paint — offloading computation to Web Workers helps but they cannot access the DOM',
          'rAF does not guarantee a consistent frame rate — garbage collection pauses, long tasks, and heavy DOM operations can cause individual frames to take much longer than 16.67ms, making delta-time-based animation essential',
        ],
        realWorld: [
          'Three.js, PixiJS, and Babylon.js all use a rAF-based render loop as their core animation driver — the game loop pattern of update(deltaTime) followed by render() is universal in web graphics libraries',
          'Chrome DevTools Performance panel shows rAF callbacks as "Animation Frame Fired" events in the timeline, making it easy to identify which callback is consuming the frame budget',
          'React\'s concurrent rendering (useTransition, startTransition) schedules low-priority state updates to yield to the browser between frames, conceptually similar to rAF\'s frame-aware scheduling',
        ],
      },
      {
        id: '4-2',
        name: 'Delta Time & Frame-Rate Independence',
        description:
          'Delta time is the elapsed time between consecutive animation frames, used to ensure animations run at the same perceived speed regardless of the actual frame rate. Without delta-time correction, animations run faster on high-refresh displays and slower on low-refresh or lagging systems.',
        keyPoints: [
          'Delta time (dt) is calculated as: dt = (currentTimestamp - previousTimestamp) / 1000 to get seconds elapsed — movement is then: position += velocity * dt, ensuring consistent speed across frame rates',
          'At 60fps dt is ~0.0167s, at 120fps dt is ~0.0083s, at 30fps dt is ~0.0333s — multiplying by dt normalizes motion so a "100 pixels per second" velocity always covers 100 pixels regardless of frame rate',
          'Capping delta time (e.g., if (dt > 0.1) dt = 0.1) prevents "teleportation" after long pauses (tab switches, debugger breakpoints) where dt could be several seconds, causing objects to jump enormous distances',
          'Fixed timestep with interpolation is an advanced technique: physics updates at a constant rate (e.g., 1/60th second) while rendering interpolates between physics states — this ensures deterministic simulation regardless of display rate',
          'Easing functions applied per-frame use normalized time t = elapsed / duration (0 to 1) and apply the easing curve to t — this approach naturally handles variable frame rates since progress is time-based, not frame-based',
        ],
        tradeoffs: [
          'Simple dt multiplication works for linear motion but can produce inconsistent results with exponential easing or spring physics at very high or very low frame rates — frame-rate-independent spring physics requires specialized integrators (Verlet, RK4)',
          'Fixed timestep simulations are deterministic and consistent but add complexity (accumulator pattern, interpolation between states) and can cause visual stuttering if the render rate does not align with the physics rate',
          'Capping dt prevents teleportation but creates a slow-motion effect during lag — some applications prefer to skip simulation steps entirely when dt exceeds a threshold, accepting the discontinuity',
        ],
        realWorld: [
          'Game engines (Unity, Unreal) expose deltaTime as a core API because frame-rate independence is non-negotiable for physics and gameplay — web animation libraries like GSAP handle this internally',
          'Three.js Clock class provides getDelta() and getElapsedTime() methods that encapsulate the delta-time pattern, used in nearly every Three.js animation example',
          'The notorious "Quake physics bug" occurred because movement speed was tied to frame rate — running at higher fps literally let players move faster, demonstrating why delta-time normalization is essential',
        ],
      },
      {
        id: '4-3',
        name: 'Scheduling & cancelAnimationFrame',
        description:
          'Managing animation lifecycle requires proper scheduling of start, pause, resume, and cleanup operations. cancelAnimationFrame stops a pending rAF callback, and integrating animation loops with component lifecycles (especially in React) prevents memory leaks and ghost animations.',
        keyPoints: [
          'requestAnimationFrame returns a numeric ID that can be passed to cancelAnimationFrame(id) to prevent the callback from executing — this is the primary mechanism for stopping animation loops',
          'The standard cleanup pattern stores the rAF ID: let rafId = requestAnimationFrame(animate); and cancels on cleanup: cancelAnimationFrame(rafId) — in React, this goes in the useEffect cleanup function',
          'Pausing an animation loop is done by not calling rAF in the next iteration (using a boolean flag) rather than canceling and restarting — resuming simply calls requestAnimationFrame again with the animate function',
          'The Page Visibility API (document.addEventListener("visibilitychange")) should be used to explicitly pause/resume animations when the tab is hidden, since rAF pausing behavior is not guaranteed across all browsers',
          'For React components, the pattern is: useEffect(() => { let rafId; const animate = (t) => { /* update */ rafId = requestAnimationFrame(animate); }; rafId = requestAnimationFrame(animate); return () => cancelAnimationFrame(rafId); }, [])',
        ],
        tradeoffs: [
          'Forgetting to cancel rAF in component unmount causes memory leaks — the callback continues referencing unmounted component state, potentially causing "Can\'t perform a React state update on an unmounted component" warnings',
          'Using a boolean flag for pause/resume is simpler than cancel/restart but the last-scheduled callback still fires once after setting the flag — for precise frame control, cancel the pending rAF immediately',
          'Multiple independent animation loops (each calling rAF separately) are simpler to manage but less efficient than a single coordinated loop that updates all animations — animation managers (like GSAP\'s internal ticker) consolidate into one rAF call',
        ],
        realWorld: [
          'React Three Fiber (R3F) manages a single rAF loop internally via useFrame() hook — components subscribe to frame updates without managing their own loops, solving the coordination and cleanup problems',
          'Intersection Observer combined with rAF enables "animate only when visible" patterns — start the rAF loop when the element enters the viewport and cancel it when it leaves, saving resources for off-screen animations',
          'GSAP\'s gsap.ticker provides a centralized animation clock that all tweens share — it uses a single rAF internally and dispatches updates to all active animations, with .add() and .remove() for custom per-frame callbacks',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Web Animations API (WAAPI)',
    part: 2,
    partTitle: 'JavaScript Animation',
    summary:
      'The Web Animations API provides a JavaScript interface for creating and controlling animations with the same performance as CSS animations, bridging the gap between CSS declarative animations and imperative JavaScript control.',
    concepts: [
      {
        id: '5-1',
        name: 'Element.animate() & KeyframeEffect',
        description:
          'Element.animate() is the primary WAAPI method, creating an Animation object that interpolates an element through a sequence of keyframes. It combines the convenience of CSS @keyframes with the programmatic power of JavaScript, enabling dynamic animation creation without stylesheet manipulation.',
        keyPoints: [
          'element.animate(keyframes, options) accepts an array of keyframe objects or a property-indexed object — [{opacity: 0}, {opacity: 1}] fades in, while {opacity: [0, 1]} is the shorthand equivalent',
          'The options parameter accepts duration (ms), easing, delay, iterations, direction, fill, and composite — these map directly to CSS animation properties but can be set dynamically from JavaScript variables',
          'KeyframeEffect represents the animation effect separately from playback — new KeyframeEffect(element, keyframes, options) creates the effect, and new Animation(effect, timeline) creates the playback controller',
          'The composite option ("replace", "add", "accumulate") controls how animated values combine with the base style and other animations — "add" enables layering multiple animations on the same property additively',
          'Partial keyframes are supported — specifying only {transform: "translateX(300px)"} creates a "from" animation that starts at the element\'s current position and animates to the specified value, equivalent to CSS from-less keyframes',
        ],
        tradeoffs: [
          'WAAPI animations are ephemeral by default — once finished, they no longer affect the element unless fill: "forwards" is used, which keeps the Animation object alive in memory consuming resources',
          'Dynamic keyframe generation enables responsive animations (compute distances, sizes at runtime) but loses the declarative clarity of CSS — complex animations become harder to understand in code review',
          'Browser implementation of WAAPI is nearly universal in modern browsers but some advanced features (composite modes, implicit keyframes) vary in support — the web-animations-js polyfill fills gaps but adds bundle size',
        ],
        realWorld: [
          'Material Design components use WAAPI for ripple effects — Element.animate() creates expanding circle animations dynamically positioned at the click coordinates, with each ripple being a unique animation instance',
          'The View Transitions API internally uses WAAPI to animate ::view-transition pseudo-elements — understanding WAAPI is essential for customizing view transition animations beyond the default cross-fade',
          'Svelte\'s transition system compiles to WAAPI calls under the hood — transition:fly, transition:fade generate Element.animate() calls with computed keyframes, achieving CSS-level performance with framework-level developer experience',
        ],
      },
      {
        id: '5-2',
        name: 'Animation Object (play, pause, reverse, finish)',
        description:
          'The Animation object returned by Element.animate() provides full playback control including play, pause, reverse, cancel, and finish methods. It also exposes playback state, timing information, and promise-based lifecycle events, enabling sophisticated animation orchestration from JavaScript.',
        keyPoints: [
          'animation.play() starts or resumes playback, .pause() freezes at the current frame, .reverse() flips playback direction, .cancel() removes all effects and rejects the finished promise, and .finish() jumps to the end state',
          'animation.playbackRate controls speed — 1 is normal, 2 is double speed, 0.5 is half speed, -1 reverses, and 0 effectively pauses — changing playbackRate mid-animation is smooth and immediate',
          'animation.currentTime (in ms) is readable and writable — setting it directly enables scrubbing (seeking to a specific point), which is the foundation for scroll-driven and gesture-driven animations',
          'animation.finished is a Promise that resolves when the animation completes — await animation.finished enables clean sequential animation chaining: await fadeOut.finished; element.remove()',
          'animation.playState returns "idle", "running", "paused", or "finished" — combined with the onfinish, oncancel, and onremove event handlers, this provides complete lifecycle awareness',
        ],
        tradeoffs: [
          'animation.finished creates a new Promise if the animation replays — each await generates a microtask, so tight animation loops chaining many promises can create microtask overhead',
          'Reversing via .reverse() changes the playback rate to negative rather than creating a new reversed animation — the timing is based on the current position, so reversing at 80% completion plays backward for 80% of the duration, not 100%',
          'animation.cancel() immediately removes all animated effects and the element snaps back to its base style — this can create jarring visual jumps, so .finish() or committing the animated values to inline style before canceling is usually preferred',
        ],
        realWorld: [
          'Drag-to-dismiss implementations use animation.pause() + animation.currentTime to scrub the exit animation with the user\'s finger position, then .play() to complete or .reverse() to snap back when released',
          'Music visualizers adjust animation.playbackRate in response to beat detection — faster BPM increases the playback rate, creating visual elements that pulse in sync with the audio',
          'Testing animation behavior in unit tests is possible because currentTime can be set programmatically — jump to any point in the animation without waiting for real time, enabling deterministic animation tests',
        ],
      },
      {
        id: '5-3',
        name: 'Timeline Control & AnimationTimeline',
        description:
          'AnimationTimeline defines the time source that drives animations. The default DocumentTimeline is clock-based, but custom timelines like ScrollTimeline enable animations driven by scroll position instead of wall-clock time, fundamentally changing how animations are triggered and progressed.',
        keyPoints: [
          'document.timeline is the default DocumentTimeline — its currentTime starts at 0 when the document loads and advances with wall-clock time in milliseconds, driving all CSS and WAAPI animations by default',
          'ScrollTimeline connects animation progress to scroll position — new ScrollTimeline({ source: scrollElement, axis: "block" }) maps scroll progress (0% to 100%) to animation progress (0% to 100%)',
          'ViewTimeline tracks an element\'s intersection with the scrollport — new ViewTimeline({ subject: element, axis: "block" }) maps animation progress to how far the element has scrolled through the viewport',
          'animation.timeline can be reassigned after creation — switching from document.timeline to a ScrollTimeline converts a time-based animation into a scroll-driven one without changing the keyframes',
          'AnimationTimeline.currentTime can be null when the timeline is inactive (e.g., a ScrollTimeline when the container is not scrollable) — animation code must handle this null state gracefully',
        ],
        tradeoffs: [
          'ScrollTimeline replaces complex scroll event listeners + rAF patterns with a declarative API, but is a newer feature with limited browser support (Chrome 115+, Firefox behind a flag, Safari technical preview)',
          'Custom timelines decouple animation progress from wall-clock time, which is powerful but makes debugging harder — Chrome DevTools Animation panel currently has limited support for visualizing scroll-driven timelines',
          'Combining multiple timeline sources (some animations time-driven, others scroll-driven) on the same page requires careful management of animation states, as paused scroll-driven animations and running time-driven animations can interact unexpectedly',
        ],
        realWorld: [
          'The CSS scroll-timeline-name and animation-timeline properties bring ScrollTimeline to CSS declaratively — no JavaScript needed for scroll-linked animations like progress bars, parallax, and reveal effects',
          'Apple product pages use scroll-driven animations extensively — the AirPods Pro page animates 3D product renders frame-by-frame as the user scrolls, traditionally done with Intersection Observer + rAF but now achievable with ScrollTimeline',
          'Scroll-to-top progress indicators are a canonical ScrollTimeline use case — a fixed bar at the top of the page fills from 0% to 100% width as the user scrolls through the document, requiring zero JavaScript with CSS scroll()',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Scroll-Driven Animations',
    part: 2,
    partTitle: 'JavaScript Animation',
    summary:
      'Scroll-driven animations tie animation progress to scroll position rather than time, enabling performant parallax effects, scroll-linked reveals, and progress indicators using the ScrollTimeline and ViewTimeline APIs available in both CSS and JavaScript.',
    concepts: [
      {
        id: '6-1',
        name: 'ScrollTimeline & ViewTimeline',
        description:
          'ScrollTimeline maps an animation\'s progress to the scroll position of a scroll container, while ViewTimeline maps progress to an element\'s visibility within the scrollport. Together, they replace fragile scroll event listener patterns with a declarative, compositor-accelerated approach to scroll-linked animation.',
        keyPoints: [
          'ScrollTimeline tracks the entire scrollable range of a container — 0% progress at the start of scroll, 100% at the end, with the animation progressing proportionally as the user scrolls between these bounds',
          'ViewTimeline tracks a specific element\'s intersection with the scrollport — 0% when the element enters the viewport and 100% when it exits, enabling per-element reveal and exit animations',
          'CSS syntax: animation-timeline: scroll(nearest block) creates a ScrollTimeline on the nearest scrollable ancestor along the block axis, while animation-timeline: view() creates a ViewTimeline for the element itself',
          'The animation-range property controls which portion of the timeline maps to 0%-100% animation progress — animation-range: entry 0% cover 50% starts the animation when the element begins entering and completes when it has covered 50% of the viewport',
          'Named timelines use scroll-timeline-name: --my-scroll on the scroll container and animation-timeline: --my-scroll on the animated element, enabling animations linked to distant scroll containers without JavaScript',
        ],
        tradeoffs: [
          'Scroll-driven animations run on the compositor thread (like CSS animations) and are inherently 60fps — but they cannot trigger JavaScript callbacks or state updates, limiting them to visual transformations',
          'Browser support is Chrome/Edge 115+ with Firefox and Safari lagging — a JavaScript polyfill (scroll-timeline-polyfill) exists but defeats the performance benefit since it falls back to scroll event listeners on the main thread',
          'ViewTimeline is powerful for reveal effects but the animation-range syntax has a steep learning curve with many named ranges (entry, exit, cover, contain, entry-crossing, exit-crossing) that interact in non-obvious ways',
        ],
        realWorld: [
          'The scroll progress bar (a thin bar at the top of the page showing read progress) is now a pure CSS one-liner: animation: grow-width linear; animation-timeline: scroll(); on a fixed-position element',
          'AOS (Animate On Scroll) library is being superseded by native ViewTimeline for scroll-reveal animations — elements fade/slide in as they enter the viewport without any JavaScript observer setup',
          'CSS scroll-driven parallax replaces the old transform: translateZ() + perspective hack — different layers animate translateY at different rates linked to scroll(), creating true compositor-accelerated parallax',
        ],
      },
      {
        id: '6-2',
        name: 'CSS scroll() & view() Functions',
        description:
          'The scroll() and view() CSS functions create anonymous scroll-driven timelines inline within the animation-timeline property, providing a concise declarative syntax for the most common scroll-driven animation patterns without needing named timelines or JavaScript.',
        keyPoints: [
          'scroll() accepts optional scroller and axis arguments — scroll(root block) creates a timeline for the document\'s root scroller along the block axis, scroll(nearest inline) finds the nearest scrollable ancestor along the inline axis',
          'view() accepts an optional axis and inset — view(block) tracks viewport intersection along the block axis, and inset values (view(block auto 100px)) adjust when the element is considered "in view" by shrinking the viewport bounds',
          'animation-range refines which part of the scroll/view timeline maps to 0%-100% — "animation-range: entry" means the animation plays only during the entry phase, "animation-range: contain" plays while fully visible',
          'Multiple animations on one element can reference different timelines — one animation driven by scroll() for parallax and another by view() for opacity reveal, each with independent ranges',
          'The @keyframes used with scroll-driven animations are standard CSS keyframes — the only difference is that progress through the keyframes is driven by scroll position instead of elapsed time',
        ],
        tradeoffs: [
          'Anonymous timelines via scroll()/view() are concise but cannot be referenced by other elements — named timelines (scroll-timeline-name) are required when the animated element is not a descendant of the scroll container',
          'The inset parameter in view() is powerful for fine-tuning trigger points but the interaction between inset values and animation-range is complex — testing with Chrome DevTools scroll-driven animation inspection is essential',
          'Scroll-driven animations cannot control discrete properties (display, visibility) smoothly — they work best with continuously interpolatable properties like transform, opacity, clip-path, and color',
        ],
        realWorld: [
          'Image reveal effects use view() with animation-range: entry to animate clip-path from inset(100% 0 0 0) to inset(0) — the image "wipes in" from bottom to top as it enters the viewport, purely in CSS',
          'Horizontal scroll sections use scroll(self inline) to drive a progress indicator — as the user scrolls horizontally through a carousel, a bar fills proportionally to indicate position',
          'Sticky header animations use view() on a sentinel element — when a spacer div scrolls out of view, it triggers a transition of the header from transparent to solid background via a ViewTimeline',
        ],
      },
      {
        id: '6-3',
        name: 'Intersection-Based Triggers & Scroll Snapping',
        description:
          'Intersection Observer API provides the foundational mechanism for triggering animations when elements enter or exit the viewport, while CSS Scroll Snap creates controlled scroll positions that pair naturally with scroll-driven animations for section-based navigation experiences.',
        keyPoints: [
          'IntersectionObserver fires a callback when an element\'s visibility crosses a threshold — new IntersectionObserver(callback, { threshold: [0, 0.5, 1] }) reports at 0%, 50%, and 100% visibility',
          'rootMargin extends or contracts the intersection root — rootMargin: "0px 0px -200px 0px" effectively triggers 200px before the element reaches the bottom of the viewport, enabling "pre-loading" animation setups',
          'CSS scroll-snap-type: x mandatory on a container with scroll-snap-align: center on children creates snap points — combined with ScrollTimeline, each snap position can correspond to a distinct animation state',
          'Intersection Observer is asynchronous and runs off the main thread (in most browsers) — it does not cause scroll jank like scroll event listeners, making it the recommended trigger mechanism for non-scroll-driven-API browsers',
          'The "observe once" pattern: after the entry animation plays, observer.unobserve(entry.target) removes the element from observation — this prevents exit/re-entry animations and reduces observer overhead for one-shot reveals',
        ],
        tradeoffs: [
          'IntersectionObserver callbacks are asynchronous and may fire multiple entries in a single batch — processing assumes about individual entry timing can be wrong, requiring careful handling of the entries array',
          'Scroll snapping with mandatory snap points can feel "locked in" on long pages — proximity snap type is gentler but less predictable, and combining either with scroll-driven animations requires careful alignment of snap points and animation ranges',
          'IntersectionObserver v2 adds trackVisibility and delay options to detect actual pixel visibility (not just geometric intersection) but has limited browser support and a minimum 100ms delay, making it unsuitable for animation timing',
        ],
        realWorld: [
          'Lazy loading images with fade-in: IntersectionObserver detects when an img enters the viewport, loads the src, and adds an "is-visible" class that triggers a CSS opacity/transform transition for a smooth reveal',
          'Full-page scroll experiences (like Apple product launches) combine scroll-snap-type: y mandatory with scroll-driven animations — each section snaps into place and triggers a distinct animation sequence for its content',
          'Infinite scroll implementations use IntersectionObserver on a sentinel element at the bottom of the list — when it intersects, new content is fetched and animated into view with staggered entrance transitions',
        ],
      },
    ],
  },

  // Part 3: Advanced Techniques
  {
    id: 7,
    title: 'SVG Animations',
    part: 3,
    partTitle: 'Advanced Techniques',
    summary:
      'SVG provides unique animation capabilities including SMIL declarative animations, CSS-animated SVG properties, JavaScript-driven path manipulation, and filter effects that enable resolution-independent motion graphics directly in the browser.',
    concepts: [
      {
        id: '7-1',
        name: 'SMIL vs CSS vs JS Approaches',
        description:
          'SVG animation can be achieved through three distinct methods: SMIL (Synchronized Multimedia Integration Language) declarative animations embedded in SVG markup, CSS animations targeting SVG presentation attributes, and JavaScript manipulation of SVG DOM properties. Each approach has distinct capabilities, limitations, and appropriate use cases.',
        keyPoints: [
          'SMIL uses <animate>, <animateTransform>, <animateMotion>, and <set> elements embedded directly in SVG — <animate attributeName="cx" from="50" to="200" dur="1s" repeatCount="indefinite"/> animates a circle\'s center position',
          'CSS can animate SVG presentation attributes that map to CSS properties (fill, stroke, opacity, transform) but cannot animate geometry attributes (cx, cy, r, d) directly — CSS transforms on SVG elements use the SVG coordinate system, not the CSS box model',
          'JavaScript via WAAPI or rAF can animate any SVG attribute by manipulating the DOM — element.setAttribute("d", newPath) on each frame enables path morphing, which neither CSS nor SMIL handles well for complex shapes',
          'SMIL\'s <animateMotion> moves an element along an SVG path defined by a <mpath> reference — this "motion along a path" capability has no CSS equivalent and requires significant JavaScript to replicate',
          'Chrome deprecated SMIL in 2015 but reversed the decision due to community pushback — SMIL remains supported in all browsers and is the only declarative way to animate SVG-specific attributes like path data',
        ],
        tradeoffs: [
          'SMIL is powerful for SVG-specific animations (path morphing, motion paths) but has no browser DevTools support, cannot be controlled via JavaScript easily, and produces verbose markup for complex animations',
          'CSS animations on SVG are performant and familiar to web developers but are limited to CSS-mappable properties — geometric attributes (viewBox, d, cx, points) require JavaScript or SMIL',
          'JavaScript provides maximum control and can animate anything, but SVG DOM manipulation triggers layout/paint on every frame and does not benefit from compositor acceleration like CSS transforms do',
        ],
        realWorld: [
          'Animated SVG icons (Lordicon, Lottie-exported SVGs) use a mix of CSS transforms and SMIL for complex multi-element animations that play on hover or on load without any JavaScript dependency',
          'Data visualization libraries (D3.js) use JavaScript SVG animation extensively — D3 transitions interpolate SVG attributes (path d, circle positions, rect dimensions) using custom interpolators for smooth data updates',
          'Inline SVG illustrations on marketing pages commonly use CSS @keyframes for transform-based animation (rotating gears, floating clouds) since these stay on the compositor thread',
        ],
      },
      {
        id: '7-2',
        name: 'Path Animation & Morphing',
        description:
          'SVG path animations involve animating elements along a defined path trajectory or morphing one path shape into another by interpolating the "d" attribute. Path morphing requires compatible path structures (same number and types of commands), making it a technically demanding but visually impressive animation technique.',
        keyPoints: [
          'CSS offset-path: path("M0,0 C...") with offset-distance: 0% to 100% moves any HTML or SVG element along an SVG path — combined with animation, this creates smooth motion along arbitrary curves',
          'Path morphing interpolates between two SVG "d" attribute values — for the browser to interpolate smoothly, both paths must have the same number of segments and the same command types (M, L, C, etc.) in the same order',
          'Tools like Flubber.js and GSAP MorphSVG plugin automatically normalize incompatible paths by adding intermediate points, enabling morphing between arbitrary shapes like a circle transforming into a star',
          'stroke-dasharray and stroke-dashoffset create the "line drawing" effect — setting dasharray equal to the path length and animating dashoffset from the total length to 0 progressively reveals the stroke',
          'SVG path length can be computed with path.getTotalLength() and arbitrary points along the path retrieved with path.getPointAtLength(distance), enabling precise positioning of elements at any point along a path',
        ],
        tradeoffs: [
          'Path morphing between incompatible shapes requires preprocessing (adding phantom points to match segment counts) which can produce awkward intermediate states — the path of least visual distortion depends on the algorithm used for point insertion',
          'The CSS offset-path property is well-supported for motion along a path but only accepts path(), url(), and basic shapes — complex multi-segment paths with branching require JavaScript approaches',
          'SVG line-drawing animations are visually striking but computationally expensive for complex paths with hundreds of segments — the browser must recalculate stroke rendering on every frame, especially costly with stroke-linecap and stroke-linejoin applied',
        ],
        realWorld: [
          'Vivus.js and Lazy Line Painter are dedicated libraries for SVG line-drawing animations — they automatically calculate path lengths and animate stroke-dashoffset for each path element in sequence',
          'Logo reveal animations on portfolio sites commonly use the stroke-dashoffset technique — the company logo appears to be "drawn" by an invisible pen, with each letter or shape element animated sequentially',
          'Airbnb\'s Lottie format exports After Effects animations as JSON that includes path morphing data — the Lottie web player renders these as SVG with JavaScript-driven "d" attribute interpolation at 60fps',
        ],
      },
      {
        id: '7-3',
        name: 'SVG Filters & Animated Effects',
        description:
          'SVG filter primitives (<feGaussianBlur>, <feTurbulence>, <feDisplacementMap>, etc.) can be animated to create dynamic visual effects like animated blurs, liquid distortions, glitch effects, and generative textures. These filters are applied in a compositing pipeline and can target both SVG and HTML elements via CSS filter: url().',
        keyPoints: [
          '<feTurbulence> generates Perlin noise patterns — animating its baseFrequency attribute creates organic, flowing textures that can drive displacement maps for water, smoke, and fire effects',
          '<feDisplacementMap> distorts an image based on color values from another source — combining it with animated feTurbulence creates liquid/ripple effects where the distortion pattern continuously evolves',
          '<feGaussianBlur> with animated stdDeviation produces focus/defocus transitions — combined with <feColorMatrix> for brightness/contrast, this creates cinematic depth-of-field effects',
          'SVG filters applied to HTML elements via CSS filter: url(#my-filter) enable effects impossible with CSS filters alone — feMorphology for outline/erosion, feConvolveMatrix for custom kernels, feComponentTransfer for color curve manipulation',
          '<feComposite> and <feMerge> combine multiple filter outputs — complex effects chain multiple primitives, e.g., turbulence -> displacement -> blur -> color matrix, where animating any single primitive in the chain creates dynamic results',
        ],
        tradeoffs: [
          'SVG filters are extremely powerful but run on the CPU in most browsers (not GPU-accelerated) — animating filter attributes like turbulence frequency on every frame can cause severe performance issues, especially on large elements',
          'Filter regions default to the element bounding box with 10% padding — animations that expand beyond this region (large blurs, displacement) get clipped unless filterUnits and the filter region are explicitly enlarged',
          'Cross-browser consistency of SVG filter rendering varies significantly — feTurbulence seed values, color interpolation, and edge handling differ between Chrome, Firefox, and Safari, making pixel-perfect results difficult',
        ],
        realWorld: [
          'The "gooey" effect (popular in UI experiments) uses feGaussianBlur + feColorMatrix with high alpha contrast — nearby elements appear to merge like liquid blobs, animatable by moving the source elements with CSS transforms',
          'Generative art platforms (p5.js, Paper.js) use SVG feTurbulence with animated seed values to create evolving organic backgrounds — the noise pattern shifts continuously, creating a living texture effect',
          'Glitch art effects combine feDisplacementMap with rapidly cycling turbulence frequencies and feComponentTransfer for color channel splitting — each frame produces a different distortion, mimicking video signal corruption',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'View Transitions API',
    part: 3,
    partTitle: 'Advanced Techniques',
    summary:
      'The View Transitions API enables smooth animated transitions between DOM states within a page and across page navigations, creating native app-like transition experiences with minimal code by automatically snapshotting old and new states.',
    concepts: [
      {
        id: '8-1',
        name: 'Same-Document Transitions',
        description:
          'Same-document view transitions animate between two DOM states within a single page using document.startViewTransition(). The browser captures a screenshot of the current state, applies the DOM changes, then cross-fades between the old screenshot and the new live DOM, all orchestrated through animatable pseudo-elements.',
        keyPoints: [
          'document.startViewTransition(callback) captures a screenshot of the current page, runs the callback to update the DOM, then animates from the old screenshot to the new DOM state — the default animation is a cross-fade',
          'The API creates a pseudo-element tree: ::view-transition > ::view-transition-group(*) > ::view-transition-image-pair(*) > ::view-transition-old(*) + ::view-transition-new(*) — each can be styled and animated with CSS',
          'view-transition-name CSS property assigns a unique identifier to an element — elements with the same view-transition-name in old and new states are animated individually (size, position, content) rather than cross-fading with the page',
          'The transition object returned by startViewTransition has .ready, .updateCallbackDone, and .finished promises — .ready resolves when the pseudo-element tree is created and animations can be customized before they start',
          'view-transition-name: none (the default) means the element participates in the root cross-fade — assigning any other name extracts it into its own transition group with independent position/size interpolation',
        ],
        tradeoffs: [
          'View transitions capture a raster screenshot for the old state, which consumes memory proportional to viewport size — on large screens or high-DPI displays, this can be significant, and multiple named transitions multiply the cost',
          'The old state is a flat image (not live DOM), so interactive elements in the old state cannot receive events during the transition — transitions should be short (300-500ms) to minimize this interactivity gap',
          'view-transition-name must be unique on the page at transition time — duplicate names cause the transition to fail silently, which is a common debugging headache when dynamically generated content reuses names',
        ],
        realWorld: [
          'Single-page app route transitions use startViewTransition to wrap React/Vue router updates — the shared header stays in place (named transition) while page content cross-fades, creating native-feeling navigation',
          'Tab switching interfaces assign view-transition-name to the active tab indicator — clicking a new tab smoothly slides the indicator bar from its old position to the new one, automatically interpolating position and width',
          'Image gallery lightboxes assign matching view-transition-names to thumbnail and full-size images — clicking a thumbnail expands it smoothly into the lightbox position with automatic size and position interpolation',
        ],
      },
      {
        id: '8-2',
        name: 'Cross-Document Navigation Transitions',
        description:
          'Cross-document view transitions extend the same mechanism to multi-page application (MPA) navigations, enabling smooth animated transitions between separate HTML pages. Triggered by same-origin navigations, they capture the old page\'s state before the new page renders, bridging the gap between MPAs and the smooth transitions previously exclusive to SPAs.',
        keyPoints: [
          'Enabled via the @view-transition CSS at-rule: @view-transition { navigation: auto; } on both the old and new pages — the browser automatically captures old state during same-origin navigation and cross-fades to the new page',
          'The navigation types "auto" and "same-origin" control which navigations trigger transitions — "auto" enables transitions for same-origin navigations, allowing per-page opt-in via the at-rule presence',
          'Cross-document transitions fire pageswap event on the old document and pagereveal event on the new document — these events provide the ViewTransition object for customizing animations before they start',
          'view-transition-name must be coordinated across pages — elements with the same name on old and new pages are matched and animated individually, requiring consistent naming conventions across the site',
          'The view-transition-class CSS property groups elements for shared animation rules — ::view-transition-group(*.card) targets all groups with the "card" class, reducing CSS boilerplate when many elements share transition styles',
        ],
        tradeoffs: [
          'Cross-document transitions require both pages to opt in via @view-transition — if either page lacks the rule, the navigation occurs without a transition, making incremental adoption possible but requiring coordination',
          'The old page must render quickly enough for the snapshot to be captured before navigation starts — slow server responses or large page sizes can cause the transition to be skipped or feel delayed',
          'Cross-document transitions are limited to same-origin navigations for security reasons — cross-origin navigations and pages with restrictive Content-Security-Policy headers cannot participate in transitions',
        ],
        realWorld: [
          'Astro framework has first-class View Transitions support — adding <ViewTransitions /> to the layout automatically opts all pages into cross-document transitions, with astro:page-load events for per-page animation customization',
          'E-commerce product listing to detail page transitions use shared view-transition-name on product images — clicking a product card smoothly expands the thumbnail into the product page hero image across a full page navigation',
          'Blog sites use cross-document transitions with matching header/navigation view-transition-names — the persistent header stays in place while article content cross-fades, eliminating the "page flash" of traditional MPA navigation',
        ],
      },
      {
        id: '8-3',
        name: 'Transition Groups & Custom Animations',
        description:
          'View transition groups can be individually styled with custom CSS animations, enabling directional transitions (slide left/right), zoom effects, shared element animations, and complex choreographed sequences that go far beyond the default cross-fade.',
        keyPoints: [
          '::view-transition-old(*) and ::view-transition-new(*) pseudo-elements can be assigned custom CSS animations — replacing the default cross-fade with slide, zoom, flip, or any keyframe animation',
          'animation-name can be set per named transition group — ::view-transition-old(hero) { animation: slide-out-left 0.3s; } while ::view-transition-old(content) { animation: fade-out 0.2s; } creates differentiated animations',
          'view-transition-group interpolates position and size automatically between old and new element positions — this "FLIP" (First, Last, Invert, Play) animation happens automatically for named elements without manual calculation',
          'CSS custom properties and media queries work in view transition styles — @media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation-duration: 0.01ms; } } respects accessibility preferences',
          'The types property on startViewTransition({ types: ["slide-forward"] }) or the view-transition-type CSS property adds type selectors — :active-view-transition-type(slide-forward) enables different animations for forward vs. backward navigation',
        ],
        tradeoffs: [
          'Custom animations override the built-in cross-fade entirely — developers must handle both the old and new pseudo-elements or one will be invisible, causing flicker during the transition',
          'The FLIP-style automatic position/size interpolation works well for simple element movement but can produce unnatural intermediate states for complex shape changes — in those cases, custom keyframes are needed',
          'View transition types enable directional awareness (forward/back navigation) but require discipline in setting the correct type for every navigation — getting it wrong means a "forward" slide plays on back navigation',
        ],
        realWorld: [
          'iOS-style navigation transitions use slide-from-right for forward and slide-from-left for backward, controlled by view-transition-type — the outgoing page slides out while the incoming page slides in with a parallax offset',
          'Photo gallery transitions assign view-transition-name to the selected image and use the automatic FLIP interpolation — the thumbnail smoothly expands and repositions into the detail view without any manual position calculation',
          'Multi-step form wizards use view transitions with sequential slide direction — each step slides out left while the next slides in from right, with a shared progress bar that smoothly advances its width via a named transition group',
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Motion Design Principles',
    part: 3,
    partTitle: 'Advanced Techniques',
    summary:
      'Animation is not just about technology but about creating meaningful motion that guides users, provides feedback, and enhances perceived performance through principles borrowed from traditional animation, physics, and cognitive psychology.',
    concepts: [
      {
        id: '9-1',
        name: 'Easing & Natural Motion (Physics-Based)',
        description:
          'Natural-feeling animation mimics the physical world where objects have mass, momentum, and friction. Physics-based easing replaces fixed cubic-bezier curves with dynamic simulations where final behavior depends on initial velocity and physical parameters, creating motion that adapts to context.',
        keyPoints: [
          'Spring physics models (stiffness, damping, mass) produce natural motion with optional overshoot — high stiffness + low damping = bouncy, low stiffness + high damping = sluggish, critical damping = fastest settle without overshoot',
          'Springs are "velocity-aware" — interrupting a spring animation preserves current velocity, so reversing mid-motion continues smoothly from the current state instead of restarting, which fixed-duration easings cannot do',
          'Duration is emergent in spring animations (determined by physical parameters) rather than prescribed — this means a spring settles when the physics dictate, not when a timer expires, resulting in more natural-feeling motion',
          'The 12 principles of animation (Disney) that apply to UI: squash & stretch (button press), anticipation (pre-motion feedback), follow-through (overshoot settling), staging (directing attention via motion)',
          'Exponential decay (e.g., friction) is ideal for gesture-driven UIs — releasing a flick gesture applies initial velocity with exponential slowdown, naturally bringing the element to rest without abrupt stops',
        ],
        tradeoffs: [
          'Spring physics produce more natural motion but the non-deterministic duration makes choreographing parallel animations harder — you cannot guarantee two springs finish simultaneously unless they share identical parameters',
          'Physics simulations require per-frame computation and are more CPU-intensive than pre-computed cubic-bezier curves — on low-end devices, this overhead can matter for many simultaneous animations',
          'Spring parameters (stiffness, damping, mass) are less intuitive than "duration + easing" for developers unfamiliar with physics — libraries like React Spring, Motion, and Framer Motion provide presets (wobbly, stiff, gentle) to ease adoption',
        ],
        realWorld: [
          'iOS system animations use spring physics exclusively since iOS 7 — every sheet presentation, keyboard appearance, and scroll bounce is a damped spring, giving the OS its characteristic "alive" feel',
          'Framer Motion\'s spring type (type: "spring", stiffness: 260, damping: 20) is the default animation for layout transitions, automatically preserving velocity when animations are interrupted by rapid user input',
          'Facebook/Meta\'s Rebound library (originally for Android) popularized spring physics in mobile UIs — pull-to-refresh springs, notification badge bounces, and swipe-to-dismiss all use spring models with carefully tuned parameters',
        ],
      },
      {
        id: '9-2',
        name: 'Staggering & Choreography',
        description:
          'Staggered animations apply sequential delays to groups of elements, creating a wave-like motion pattern that guides the user\'s eye through content in a deliberate order. Animation choreography coordinates multiple animations into a cohesive sequence, like a dance where every element has an entrance cue.',
        keyPoints: [
          'Stagger delay is calculated as: element.style.animationDelay = index * staggerOffset — a 50ms stagger across 10 items creates a 450ms total cascade (0ms, 50ms, 100ms, ..., 450ms) that draws the eye from first to last',
          'Optimal stagger offsets are 30-80ms between items — shorter intervals feel simultaneous and lose the cascade effect, longer intervals feel slow and disjointed, with the sweet spot depending on total item count',
          'Direction-aware staggering varies the delay based on spatial position, not just list order — items closer to the trigger point animate first (radial stagger from a click, or column-first in a grid layout)',
          'Exit choreography should reverse the entrance pattern (last-in-first-out) or use a faster uniform fade — slow exit staggers make the UI feel sluggish when the user is trying to navigate away',
          'Orchestration involves sequencing different animation types: first the container scales in (50ms), then the title fades in (200ms), then list items stagger in (50ms each), then the CTA button bounces in — each phase has a specific timing relationship',
        ],
        tradeoffs: [
          'Staggered animations on long lists (50+ items) create excessively long total durations — cap the visible stagger to the first 8-10 items and have remaining items appear instantly, or use a fixed total duration divided among visible items',
          'Complex choreography is impressive on first view but annoying on repeated visits — consider animating only on initial page load and using instant state changes for subsequent navigations within the session',
          'Stagger delays push the last item\'s animation completion far into the future — any action gated on "all animations complete" (like enabling scroll or interaction) must account for the total stagger duration, not just individual animation duration',
        ],
        realWorld: [
          'Material Design uses staggered "cascade" animations for list items entering a screen — items animate from the top of the list with 20ms stagger delays, creating a quick waterfall effect that communicates hierarchy',
          'Stripe.com landing page uses orchestrated entrance animations — as each section scrolls into view, elements animate in a choreographed sequence (headline, then body text, then illustration, then CTA) with deliberate timing relationships',
          'GSAP Timeline enables declarative choreography — gsap.timeline().from(".title", {opacity:0}).from(".items", {y:20, stagger:0.05}, "-=0.2") staggers items with a 200ms overlap with the title animation',
        ],
      },
      {
        id: '9-3',
        name: 'Micro-Interactions & Feedback',
        description:
          'Micro-interactions are brief, focused animations that respond to specific user actions, providing immediate visual feedback that confirms input, communicates state changes, and guides attention. They are the animation equivalent of a button\'s click sound — small but essential for a responsive, polished interface.',
        keyPoints: [
          'Button feedback: transform: scale(0.97) on :active creates a subtle press effect in < 100ms — the depress happens instantly (no transition on press) while the release eases out over 200ms, mimicking physical button mechanics',
          'State confirmation animations (checkmark drawing, success shake, error wiggle) close the feedback loop — the user sees an immediate visual response that their action was registered and processed',
          'Loading indicators should appear after a 200-300ms delay (not instantly) to avoid flashing for fast operations — if the operation completes before the delay, no loader is shown, preventing the "flash of loading state"',
          'Skeleton screens are superior to spinners for perceived performance — they provide a structural preview of incoming content, and the shimmer animation suggests ongoing progress without demanding attention',
          'Hover states should respond within 100ms (the "instant" perception threshold) — CSS transitions on hover should have a short duration (100-200ms) for transforms and opacity, with the unhover transition slightly longer (200-300ms) for a natural feel',
        ],
        tradeoffs: [
          'Too many micro-interactions make the UI feel "busy" and slow — every animation adds latency between action and result, so they should be reserved for moments where feedback is genuinely informative',
          'Micro-interactions must be fast (under 400ms total) or they become obstacles — a 1-second "success" animation that blocks the next action frustrates power users who want to move quickly',
          'Custom micro-interactions are expensive to maintain and must work across all input modes (mouse, touch, keyboard, screen reader) — a hover-only interaction excludes touch users unless a touch equivalent exists',
        ],
        realWorld: [
          'The Twitter/X "like" animation (heart fills with particles bursting outward) is a canonical micro-interaction — it transforms a binary state change into a delightful moment without slowing the user down',
          'Stripe checkout form fields use subtle animations: labels float up on focus, error messages slide in from below, and the submit button displays a spinner that morphs into a checkmark on success',
          'iOS haptic feedback (UIImpactFeedbackGenerator) paired with subtle scale animations creates a multi-sensory micro-interaction — the visual bounce + physical vibration reinforces the action more than either alone',
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Animation Libraries',
    part: 3,
    partTitle: 'Advanced Techniques',
    summary:
      'Animation libraries abstract the complexity of browser animation APIs into developer-friendly interfaces, offering timeline management, physics-based motion, declarative React integration, and professional After Effects workflow pipelines.',
    concepts: [
      {
        id: '10-1',
        name: 'GSAP (GreenSock)',
        description:
          'GSAP (GreenSock Animation Platform) is the industry-standard JavaScript animation library, offering a powerful tween engine, timeline-based sequencing, and plugins for scroll, morphing, and complex motion. Its API is imperative and framework-agnostic, working with any DOM element, SVG, canvas, or generic JavaScript object.',
        keyPoints: [
          'gsap.to(), gsap.from(), and gsap.fromTo() create tweens — gsap.to(".box", { x: 100, rotation: 360, duration: 1, ease: "power2.out" }) animates transform and rotation with a single call',
          'gsap.timeline() creates a sequencing container — .to(), .from(), and .add() chain animations that play sequentially by default, with position parameters ("-=0.3", "+=0.5", "<") for overlaps and delays',
          'GSAP\'s easing library includes physics-based easings: "elastic.out(1, 0.3)", "bounce.out", "back.out(1.7)", and "power1-4" curves with .in/.out/.inOut variants — more expressive than cubic-bezier',
          'ScrollTrigger plugin links animations to scroll position — ScrollTrigger.create({ trigger: ".section", start: "top center", end: "bottom center", scrub: true, animation: tl }) scrubs a timeline with scroll',
          'GSAP handles the "transform shorthand problem" by exposing x, y, rotation, scaleX, scaleY as independent properties — you can animate rotation without affecting translation, which CSS transform cannot do natively (without individual transform properties)',
        ],
        tradeoffs: [
          'GSAP\'s core is free but premium plugins (MorphSVG, DrawSVG, SplitText, ScrollSmoother) require a paid license for commercial projects — the "no charge" license covers personal use and most client work, but SaaS products may need a Business license',
          'GSAP is imperative (JavaScript-driven) which conflicts with React\'s declarative paradigm — the @gsap/react package provides useGSAP() hook for cleanup, but managing animation state alongside React state requires careful coordination',
          'At ~30KB minified+gzipped for core, GSAP is a non-trivial bundle size addition — tree-shaking is limited because plugins register globally, though modular imports help reduce the footprint',
        ],
        realWorld: [
          'Award-winning sites on Awwwards.com overwhelmingly use GSAP — its timeline system, ScrollTrigger, and SplitText plugins power the complex, choreographed scroll experiences that dominate modern creative web design',
          'Nike, Apple, and Google product launch pages frequently use GSAP ScrollTrigger for scroll-synchronized product animations — the "scrub" feature ties animation progress precisely to scroll position',
          'GSAP Context (gsap.context()) was designed specifically for React/Vue/Angular cleanup — it collects all animations created within a scope and reverts them in one call, solving the "ghost animation" cleanup problem',
        ],
      },
      {
        id: '10-2',
        name: 'Framer Motion & React Spring',
        description:
          'Framer Motion (now "Motion") and React Spring are React-native animation libraries that integrate with the component lifecycle. Framer Motion uses a declarative prop-based API with layout animations, while React Spring specializes in physics-based spring animations with imperative control.',
        keyPoints: [
          'Framer Motion\'s <motion.div animate={{ x: 100 }} /> declaratively animates to target values — changing the animate prop triggers the animation, and initial={{ x: 0 }} sets the starting state, perfectly matching React\'s declarative model',
          'AnimatePresence wraps conditional content to enable exit animations — when children unmount, Framer Motion delays removal until the exit={{ opacity: 0 }} animation completes, solving React\'s "animate on unmount" problem',
          'layout prop enables automatic FLIP animations — <motion.div layout /> smoothly animates position and size changes caused by any CSS/DOM change, including flex reordering, width changes, and list reflows',
          'React Spring\'s useSpring({ from: { opacity: 0 }, to: { opacity: 1 } }) returns animated values that update via spring physics — the spring naturally preserves velocity through interruptions, unlike Framer Motion\'s default tween',
          'React Spring\'s useTransition() animates list additions and removals — items entering get "enter" config, leaving get "leave" config, and reordering gets "update" config, with automatic key-based tracking',
        ],
        tradeoffs: [
          'Framer Motion is ~32KB gzipped, React Spring is ~18KB gzipped — both are significant for performance-sensitive applications, though Framer Motion offers more features (gestures, layout animation, scroll) for the size',
          'Framer Motion defaults to duration-based tweens (not springs) — developers must explicitly set type: "spring" for physics-based motion, while React Spring is spring-first by design, making it more natural by default',
          'React Spring\'s imperative API (api.start(), api.stop()) is more flexible for complex orchestration but feels less "React-like" than Framer Motion\'s declarative props — the tradeoff is expressiveness vs. simplicity',
        ],
        realWorld: [
          'Framer (the design tool) uses Framer Motion for its entire production interface — layout animations power the canvas element repositioning, drag-and-drop reordering, and panel resize animations',
          'Vercel\'s website and Next.js documentation use Framer Motion for page transitions, hover effects, and scroll-triggered animations — the AnimatePresence component handles route change exit animations',
          'Shopify\'s Polaris component library evaluated both libraries and chose React Spring for its spring-physics default, arguing that spring animations feel more natural for e-commerce UI interactions than duration-based tweens',
        ],
      },
      {
        id: '10-3',
        name: 'Lottie & After Effects Workflows',
        description:
          'Lottie is a runtime library that renders After Effects animations exported as JSON (via the Bodymovin plugin) in the browser, native mobile apps, and other platforms. It bridges the gap between designers creating complex animations in professional tools and developers rendering them in production without manual recreation.',
        keyPoints: [
          'The Bodymovin After Effects plugin exports animations as JSON files containing layer definitions, keyframes, easing curves, masks, and expressions — Lottie-web parses this JSON and renders via SVG, Canvas, or HTML renderer',
          'lottie.loadAnimation({ container, renderer: "svg", path: "animation.json", loop: true, autoplay: true }) initializes playback — the SVG renderer produces sharp, scalable output while Canvas is more performant for complex animations',
          'Lottie supports programmatic control: .play(), .pause(), .stop(), .goToAndStop(frame), .setSpeed(rate), and .setDirection(1|-1) — these enable interactive animations that respond to user input or application state',
          'LottieFiles.com provides a community marketplace of pre-built animations, a web editor for customizing colors and timing, and a dotLottie format (.lottie) that compresses the JSON + assets into a single binary file ~60% smaller',
          'Rive (formerly Flare) is a Lottie alternative with its own editor and runtime — it supports state machines (interactive animations that respond to input without code), meshes, and inverse kinematics, going beyond After Effects keyframe export',
        ],
        tradeoffs: [
          'Lottie JSON files for complex animations can be 100KB-1MB+ — dotLottie compression helps, but animations with many layers, masks, and expressions produce large files that impact page load time',
          'Not all After Effects features are supported by Bodymovin — expressions, 3D layers, certain blend modes, and complex masking may not export correctly, requiring designers to work within Lottie\'s feature subset',
          'Lottie-web\'s SVG renderer creates many DOM elements for complex animations (hundreds of <path>, <g>, <mask> nodes) — this can cause layout/paint performance issues, especially when multiple Lottie animations play simultaneously',
        ],
        realWorld: [
          'Google, Airbnb, and Uber use Lottie for loading animations, onboarding illustrations, and empty-state graphics — the same After Effects source file renders identically on web, iOS, and Android',
          'Duolingo uses Lottie extensively for character animations and celebration effects — the owl mascot\'s expressions, lesson completion confetti, and streak animations are all Lottie-rendered',
          'TikTok and Instagram use Lottie for interactive stickers and reaction animations — goToAndStop(frame) is used to show different animation states based on user interaction without loading separate assets',
        ],
      },
    ],
  },

  // Part 4: Performance & Accessibility
  {
    id: 11,
    title: 'Animation Performance',
    part: 4,
    partTitle: 'Performance & Accessibility',
    summary:
      'Understanding the browser rendering pipeline and which animation properties can be offloaded to the GPU compositor thread is the key to achieving smooth 60fps animations without jank, dropped frames, or battery drain.',
    concepts: [
      {
        id: '11-1',
        name: 'Compositor-Only Properties (transform, opacity)',
        description:
          'The browser rendering pipeline has four stages: Style, Layout, Paint, Composite. Animations that only affect the Composite stage (transform and opacity) skip the expensive Layout and Paint steps entirely, running on the GPU compositor thread independently of the main thread.',
        keyPoints: [
          'The rendering pipeline: JavaScript/CSS change -> Style Recalculation -> Layout (reflow) -> Paint (rasterize) -> Composite (GPU layers) — each stage depends on the previous, so triggering an early stage forces all subsequent stages to run',
          'transform and opacity changes skip Layout and Paint entirely — the compositor thread on the GPU simply repositions or adjusts the opacity of the pre-rendered texture layer, achieving consistent 60fps even with heavy main-thread JavaScript',
          'Layout-triggering properties (width, height, margin, padding, top, left, font-size) are the most expensive to animate — every frame requires recalculating the geometry of the changed element and potentially all siblings and descendants',
          'Paint-triggering properties (background, color, box-shadow, border-radius) skip Layout but still require rasterizing new pixels on every frame — less expensive than Layout but still main-thread work that can cause jank',
          'The CSS filter property (blur, brightness, grayscale) can be composited on the GPU in modern browsers, making it a third "safe" property to animate alongside transform and opacity — but support varies across browsers',
        ],
        tradeoffs: [
          'Restricting animations to transform and opacity limits visual possibilities — fading and moving is flexible but effects like animated gradients, border changes, or text color shifts require Paint work',
          'Even compositor-only animations have cost — each composited layer consumes GPU memory (VRAM), and the compositor must manage, composite, and display all layers every frame, with costs proportional to layer count and size',
          'The "promote to compositor layer" heuristic is browser-specific and can change between versions — explicitly triggering layer promotion with will-change or translateZ(0) gives more predictable behavior but at the cost of guaranteed VRAM usage',
        ],
        realWorld: [
          'CSS animation performance guides (web.dev, MDN) universally recommend animating only transform and opacity — this single principle eliminates the majority of animation performance issues',
          'Chrome DevTools "Rendering" tab has a "Paint flashing" overlay that highlights elements being repainted in green — any green flashing during animation indicates Paint work that could potentially be replaced with transform/opacity',
          'iOS Safari is particularly sensitive to non-composited animations because the mobile GPU has limited paint bandwidth — animations that perform well in desktop Chrome can jank visibly on iPhone due to Paint-heavy property changes',
        ],
      },
      {
        id: '11-2',
        name: 'GPU Layers & will-change',
        description:
          'The will-change CSS property informs the browser that a property will be animated, allowing it to create an optimized GPU compositor layer in advance. Understanding layer creation, management, and the costs of over-promotion is essential for balancing animation smoothness with memory efficiency.',
        keyPoints: [
          'will-change: transform tells the browser to promote the element to its own compositor layer immediately — the element is rasterized into a GPU texture that can be repositioned without repainting',
          'Layer creation has a cost: each layer stores a bitmap in VRAM at the element\'s rendered size at device pixel ratio — a 300x200 element at 2x DPR creates a 600x400 pixel texture consuming ~960KB of VRAM (4 bytes/pixel)',
          'will-change should be applied just before the animation starts and removed after it completes — persistent will-change on many elements wastes VRAM, while applying it too late causes a "jank frame" as the layer is created',
          'The browser implicitly promotes elements to layers when CSS animations or transitions on transform/opacity are active — will-change is primarily needed for JavaScript-driven animations that the browser cannot predict',
          'Chrome DevTools Layers panel (Ctrl+Shift+P > "Show Layers") visualizes all compositor layers, their memory consumption, and the reason each layer was created — essential for diagnosing "layer explosion" performance issues',
        ],
        tradeoffs: [
          'Applying will-change: transform to every animated element seems safe but can exhaust GPU memory — a page with 200 animated cards, each in its own layer, could consume 200MB+ of VRAM, causing textures to be evicted and re-uploaded constantly',
          'Implicit layer promotion during CSS animations is usually sufficient — will-change is only needed when the browser cannot predict the animation (e.g., a JavaScript mousemove handler that applies transform)',
          'will-change: contents is poorly supported and its effects are browser-specific — will-change: transform and will-change: opacity are the only values with consistent cross-browser layer promotion behavior',
        ],
        realWorld: [
          'Mapbox GL JS applies will-change: transform to map tile layers to ensure smooth panning and zooming — the tiles are pre-composited as GPU textures, allowing 60fps map manipulation with thousands of elements',
          'A common performance anti-pattern is * { will-change: transform } in a reset stylesheet — this promotes every element to its own layer, instantly consuming all available VRAM and paradoxically making everything slower',
          'iOS Safari has a 16MB VRAM limit for composited layers (per-tab) — exceeding this causes layers to be decomposited and recomposited each frame, producing catastrophic jank, making mobile-first will-change management critical',
        ],
      },
      {
        id: '11-3',
        name: 'Jank Detection & Frame Profiling',
        description:
          'Detecting and diagnosing animation jank (dropped frames) requires understanding browser DevTools profiling, the Long Tasks API, and frame timing metrics. Systematic profiling identifies the specific rendering pipeline stage (Script, Layout, Paint, Composite) responsible for frame drops.',
        keyPoints: [
          'A "janky" frame is any frame that exceeds the 16.67ms budget (at 60Hz), causing the browser to display a stale frame — consecutive dropped frames create visible stuttering, with 3+ dropped frames being perceptible to most users',
          'Chrome DevTools Performance panel records frame-by-frame timeline — each frame shows Script (JavaScript), Rendering (Style + Layout), and Painting time, with red triangles marking frames that exceeded the budget',
          'The Long Tasks API (PerformanceObserver for "longtask" entries) detects main-thread tasks exceeding 50ms in production — these tasks block animation callbacks and are the primary cause of jank in real-world applications',
          'PerformanceObserver with type "frame-count" and requestAnimationFrame timing can measure actual frame rate: log 1000 / (thisTimestamp - lastTimestamp) each frame to detect drops in real user sessions',
          'Layout thrashing (reading layout properties then writing, in a loop) is the most common jank cause — element.offsetHeight forces synchronous layout, and doing this in a rAF callback with DOM writes creates a forced-reflow cascade',
        ],
        tradeoffs: [
          'DevTools profiling adds overhead (typically 10-20% performance reduction) which can mask or exaggerate real-world jank — always profile with DevTools CPU throttling to simulate lower-end devices',
          'Real-user monitoring (RUM) of frame rates via the Long Tasks API captures real jank but has limited diagnostic detail compared to DevTools — you know jank occurred but not which specific operation caused it',
          'Frame profiling on high-refresh displays (120Hz+) is stricter — the 8.33ms budget is half the 60Hz budget, so animations that run fine on 60Hz displays may jank on 120Hz Pro Motion displays',
        ],
        realWorld: [
          'Chrome\'s Frame Rendering Stats overlay (chrome://flags/#show-fps-counter or DevTools Rendering > Frame Rendering Stats) shows a real-time FPS counter and frame-time graph — essential for visual jank detection during development',
          'The web-vitals library (by Google) tracks Interaction to Next Paint (INP) which includes animation frame timing — slow animations that delay interaction response directly impact Core Web Vitals scores',
          'Facebook\'s React Profiler and Chrome DevTools React extension show per-component render times within animation frames — identifying which React component re-render is consuming the frame budget enables targeted optimization',
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'Canvas & WebGL Animation',
    part: 4,
    partTitle: 'Performance & Accessibility',
    summary:
      'Canvas 2D and WebGL provide pixel-level control for animations that exceed the capabilities of CSS and SVG, including particle systems, procedural motion, real-time data visualization, and shader-driven visual effects.',
    concepts: [
      {
        id: '12-1',
        name: 'Canvas 2D Animation Loop',
        description:
          'The HTML5 Canvas 2D API provides an immediate-mode drawing surface where every frame is drawn from scratch by JavaScript. Unlike the retained-mode DOM (where the browser manages element state), canvas requires explicit clear-update-draw cycles on every frame, making it ideal for animations with many moving elements.',
        keyPoints: [
          'The animation loop pattern: function draw(t) { ctx.clearRect(0, 0, w, h); updateState(t); renderFrame(ctx); requestAnimationFrame(draw); } — clearRect wipes the previous frame, then state is updated and redrawn',
          'Canvas is "fire and forget" — once pixels are drawn, the canvas has no memory of what produced them, so hit detection requires manually tracking object positions and testing point-in-shape with ctx.isPointInPath() or custom math',
          'OffscreenCanvas enables drawing in a Web Worker — const offscreen = canvas.transferControlToOffscreen(); sends the canvas to a worker thread, freeing the main thread entirely for UI interactions while animations render off-thread',
          'ctx.save() and ctx.restore() manage transformation state — nested save/restore pairs create a transform stack, enabling hierarchical animations (a rotating arm with a rotating hand with rotating fingers) without manual matrix math',
          'Double buffering with a hidden OffscreenCanvas prevents flicker — draw the full frame to the offscreen canvas, then drawImage() the result to the visible canvas in a single operation, ensuring the user never sees a partially drawn frame',
        ],
        tradeoffs: [
          'Canvas animations scale better than DOM animations for thousands of objects (particles, data points) because there is no DOM node overhead — but canvas content is not accessible to screen readers, selectable, or searchable',
          'The entire canvas is a single raster image — zooming in produces pixelation, unlike SVG which scales cleanly, making canvas less suitable for animations that need to look sharp across different display sizes',
          'Canvas draws are synchronous and blocking — a draw call that takes 10ms blocks the main thread for 10ms, making OffscreenCanvas or careful frame budget management essential for complex scenes',
        ],
        realWorld: [
          'Confetti celebration libraries (canvas-confetti, react-confetti) use Canvas 2D to animate hundreds of particles simultaneously — DOM-based confetti would create hundreds of elements and trigger layout/paint on every frame',
          'D3.js can render to Canvas for large datasets — d3.bindings on SVG handle thousands of elements poorly, but Canvas rendering with d3.bindings + canvas draw calls supports 100,000+ animated data points',
          'HTML5 game frameworks (Phaser, PixiJS for 2D) use Canvas/WebGL as their rendering surface — the game loop pattern of update(dt) + render(ctx) with sprite sheets and texture atlases achieves 60fps with hundreds of animated sprites',
        ],
      },
      {
        id: '12-2',
        name: 'Particle Systems & Procedural Motion',
        description:
          'Particle systems emit, update, and render many small independent elements (particles) following simple physics rules to create complex emergent visual effects. Procedural motion uses mathematical functions (noise, sine waves, attractors) to generate organic, non-repetitive animation without predefined keyframes.',
        keyPoints: [
          'A particle has position (x,y), velocity (vx,vy), acceleration, lifetime, size, color, and alpha — each frame: apply forces, update velocity, update position, reduce lifetime, and remove dead particles',
          'Object pooling prevents garbage collection jank — instead of creating/destroying particle objects, maintain a fixed-size array and reuse dead particles by resetting their properties when a new emission occurs',
          'Perlin/Simplex noise generates smooth pseudo-random values over time — noise(x * 0.01, time * 0.005) produces organic, flowing motion paths that are impossible to achieve with Math.random() alone',
          'Attractor/repeller forces create self-organizing motion: force = direction * (strength / distance^2) — particles accelerate toward attractors and away from repellers, creating gravitational and magnetic field effects',
          'Additive blending (ctx.globalCompositeOperation = "lighter" or WebGL blendFunc(GL.ONE, GL.ONE)) makes overlapping particles brighter instead of opaque — essential for fire, glow, and energy effects where density means brightness',
        ],
        tradeoffs: [
          'High particle counts (10,000+) stress both CPU (updating physics) and GPU (drawing) — spatial partitioning (quadtrees, grid buckets) reduces collision/interaction checks from O(n^2) to O(n log n)',
          'Procedural noise is computationally expensive per-pixel — using a pre-computed noise texture or lower-resolution noise field sampled with bilinear interpolation is more performant than calling a noise function for every particle',
          'Particle systems produce non-deterministic visual output — reproducing exact animations for testing or recording requires seeding the random number generator and noise functions',
        ],
        realWorld: [
          'Cursor trail effects and interactive backgrounds on creative agency websites use simple 2D particle systems — mouse movement emits particles with random velocity that fade out over their lifetime',
          'Three.js PointsMaterial renders millions of particles as GPU-accelerated point sprites — vertex shader code positions each particle, enabling galaxy, rain, snow, and dust simulations at high performance',
          'The "starfield" screensaver effect uses a simple z-buffer particle system — particles move toward the viewer (increasing z) with position mapped to screen coordinates via perspective division, creating a depth-accelerated star rush',
        ],
      },
      {
        id: '12-3',
        name: 'WebGL Shaders & Vertex Animation',
        description:
          'WebGL shaders run custom programs directly on the GPU, processing vertices and fragments (pixels) in parallel. Vertex shaders can deform geometry on every frame (wave distortion, morphing, explosion), while fragment shaders create per-pixel animated effects (noise, gradients, ray marching) at performance levels impossible on the CPU.',
        keyPoints: [
          'Vertex shaders execute once per vertex — gl_Position = projectionMatrix * modelViewMatrix * vec4(position + offset, 1.0) transforms geometry, and animated uniforms (time, mouse position) create per-frame vertex displacement',
          'Fragment shaders execute once per pixel — gl_FragColor = vec4(color, alpha) sets pixel output, with animated uniforms enabling per-pixel effects like plasma, fire, water caustics, and ray-marched 3D scenes',
          'Uniforms are values passed from JavaScript to shaders each frame — updating a "time" uniform in the rAF loop (gl.uniform1f(timeLoc, performance.now() * 0.001)) drives all shader-based animation',
          'ShaderToy and GLSL Sandbox demonstrate the power of fragment shaders — entire animated 3D scenes rendered with a single full-screen quad, where all geometry and lighting is computed per-pixel in the fragment shader',
          'Three.js ShaderMaterial and RawShaderMaterial expose custom GLSL shaders through a friendly API — new ShaderMaterial({ uniforms: { time: { value: 0 } }, vertexShader: "...", fragmentShader: "..." }) integrates with the Three.js render pipeline',
        ],
        tradeoffs: [
          'GLSL is a low-level C-like language that most web developers are unfamiliar with — the learning curve is steep, debugging is difficult (no console.log, limited error messages), and shader math requires linear algebra fundamentals',
          'WebGL state management is notoriously verbose and error-prone — libraries like Three.js, Babylon.js, and regl abstract this away, but understanding the underlying concepts helps when debugging performance or rendering issues',
          'Mobile GPU performance varies dramatically — shaders that run at 60fps on desktop may crawl on mobile devices due to limited GPU cores, lower memory bandwidth, and thermal throttling',
        ],
        realWorld: [
          'Awwwards-winning sites like Bruno Simon\'s portfolio (threejs-journey.com) use vertex shaders for terrain deformation, water simulation, and character animation — all geometry deformation happens on the GPU at 60fps',
          'Shadertoy.com hosts thousands of real-time fragment shader animations — community creations include photorealistic clouds, ocean simulations, fractal zooms, and complete 3D game engines running entirely in a fragment shader',
          'Visual effects in modern web experiences (Stripe gradients, Linear app backgrounds, Vercel mesh gradients) use simplified fragment shaders for animated gradient effects that would be prohibitively expensive to render on the CPU',
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Accessibility & Reduced Motion',
    part: 4,
    partTitle: 'Performance & Accessibility',
    summary:
      'Accessible animations respect user preferences and physical needs, ensuring that motion-rich interfaces do not cause discomfort, seizures, or disorientation for users with vestibular disorders, photosensitive conditions, or other motion sensitivities.',
    concepts: [
      {
        id: '13-1',
        name: 'prefers-reduced-motion Media Query',
        description:
          'The prefers-reduced-motion CSS media query detects whether the user has enabled a system-level "reduce motion" setting (available on macOS, iOS, Windows, Android, and Linux). Respecting this preference is both an accessibility requirement and a legal consideration under WCAG 2.1 guidelines.',
        keyPoints: [
          '@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } } — this universal rule disables all CSS animations and transitions for users who prefer reduced motion',
          'The query has two values: "reduce" (user prefers minimal motion) and "no-preference" (default) — there is no "increase-motion" value, so the default experience should assume motion is acceptable',
          'In JavaScript, window.matchMedia("(prefers-reduced-motion: reduce)").matches returns true/false — the MediaQueryList also fires "change" events when the user toggles the setting, enabling real-time adaptation',
          'The "reduce" preference does not mean "no animation" — opacity cross-fades, instant state changes, and subtle color transitions are generally acceptable, while sliding, zooming, parallax, and auto-playing animations should be eliminated',
          'WCAG 2.1 Success Criterion 2.3.3 (AAA) requires that motion animation triggered by interaction can be disabled — prefers-reduced-motion is the standard mechanism for meeting this criterion',
        ],
        tradeoffs: [
          'The nuclear approach (disabling all animation via * selector) is safe but removes even helpful animations like smooth scroll and focus transitions — a targeted approach that removes decorative motion while preserving functional animation is ideal',
          'Some animations are informational (progress indicators, loading states, error shakes) — removing these reduces usability, so "reduced motion" alternatives should replace motion with non-motion feedback (color change, icon swap)',
          'Respecting prefers-reduced-motion in JavaScript animation libraries (GSAP, Framer Motion) requires manual checking — not all libraries automatically adapt to this preference, placing the responsibility on the developer',
        ],
        realWorld: [
          'macOS: System Settings > Accessibility > Display > Reduce Motion. iOS: Settings > Accessibility > Motion > Reduce Motion. Windows: Settings > Ease of Access > Display > Show animations. These toggle the prefers-reduced-motion query.',
          'Framer Motion\'s useReducedMotion() hook and <MotionConfig reducedMotion="user"> component automatically disable spring animations when the user prefers reduced motion, falling back to instant state changes',
          'GOV.UK (British government) was an early adopter of prefers-reduced-motion, reducing all transitions to instant when the preference is set, while preserving focus indicator visibility',
        ],
      },
      {
        id: '13-2',
        name: 'Vestibular Disorders & Motion Sensitivity',
        description:
          'Vestibular disorders affect the inner ear and brain\'s ability to process spatial orientation signals, causing symptoms like dizziness, nausea, and vertigo triggered by visual motion. Approximately 35% of adults over 40 have experienced vestibular dysfunction, making motion sensitivity a significant accessibility concern that goes far beyond developer preference.',
        keyPoints: [
          'Parallax scrolling, full-screen sliding transitions, and zoom effects are the most problematic patterns — they create a disconnect between physical (static body) and visual (moving screen) motion signals, triggering vestibular symptoms',
          'Animations that cover a large portion of the viewport are more likely to trigger symptoms than small, localized animations — a full-page slide transition is worse than a button hover effect because it dominates the visual field',
          'Auto-playing animations and videos force motion on users who did not initiate it — any continuous motion should be paused by default when prefers-reduced-motion: reduce is active, with a manual play control visible',
          'Flashing content (more than 3 flashes per second) can trigger photosensitive seizures (WCAG 2.3.1, Level A requirement) — this is not a preference but a safety requirement, and violating it poses legal liability',
          'The concept of "essential" vs "decorative" motion: essential motion provides information (a loading spinner communicates "wait"), decorative motion is aesthetic (a parallax background) — decorative motion should always respect reduced motion preferences',
        ],
        tradeoffs: [
          'Removing all animation for vestibular accessibility eliminates the UX benefits of motion (spatial context, feedback, delight) — the goal is to provide equivalent non-motion alternatives, not to degrade the experience to plain state changes',
          'Testing for vestibular impact is difficult — automated tools can detect prefers-reduced-motion support but cannot assess whether the reduced-motion fallback provides equivalent information and context',
          'Providing a site-level motion toggle (in addition to respecting the OS setting) gives users fine-grained control but requires state management, persistence, and must be discoverable — a settings panel or footer toggle is the common pattern',
        ],
        realWorld: [
          'Apple\'s "Reduce Motion" on iOS replaces the zoom-in app launch animation with a cross-fade, the parallax home screen with a static background, and the message slide-in with a fade — demonstrating how to preserve functionality while eliminating vestibular triggers',
          'A 2013 incident where the iOS 7 parallax effect caused widespread reports of nausea and dizziness was the catalyst for Apple adding "Reduce Motion" and later for browsers implementing prefers-reduced-motion',
          'The A11Y Project and WebAIM both provide motion accessibility checklists: no auto-playing video, respect reduced-motion, avoid full-viewport transitions, provide pause controls, and test with the OS reduced-motion setting enabled',
        ],
      },
      {
        id: '13-3',
        name: 'Progressive Enhancement for Animations',
        description:
          'Progressive enhancement for animation means building interfaces that work without any animation first, then layering motion on top as an enhancement for capable devices and willing users. This approach ensures functionality is never dependent on animation and gracefully degrades for users who cannot or choose not to experience motion.',
        keyPoints: [
          'The base experience should be fully functional without animation — if removing all CSS animations and transitions breaks the UI or makes information inaccessible, the design is fundamentally dependent on motion and must be rearchitected',
          'CSS @media (prefers-reduced-motion: no-preference) { .element { animation: slide-in 0.3s; } } adds animation only when the user has not requested reduced motion — this "additive" approach is safer than the "subtractive" approach of defining animations and then removing them',
          'JavaScript animation libraries should check matchMedia("(prefers-reduced-motion: reduce)") before starting animations — GSAP\'s gsap.matchMedia() and Framer Motion\'s useReducedMotion() provide framework-level support',
          'Providing a manual animation toggle (separate from OS-level reduced motion) respects user agency — some users want reduced motion on certain sites but not others, or want to temporarily disable motion without changing system settings',
          'Declarative animation APIs (CSS transitions, WAAPI, Framer Motion) naturally support progressive enhancement because they describe target states — removing the animation still applies the final state, whereas imperative rAF loops may leave elements in intermediate states',
        ],
        tradeoffs: [
          'Building "no animation" first and adding motion later requires discipline — most design tools (Figma, Framer) showcase the animated version, making it tempting to build animation-first and bolt on reduced-motion as an afterthought',
          'Progressive enhancement means maintaining two UX paths (with and without motion) — testing, documenting, and keeping both paths functional doubles the QA effort for animation-heavy interfaces',
          'A site-level motion toggle must persist across page loads (localStorage/cookie) and be applied before the first paint (injected in <head> or SSR) — a flash of animated content before the preference loads defeats the purpose',
        ],
        realWorld: [
          'Smashing Magazine applies prefers-reduced-motion: no-preference as the enhancement gate — animations are added inside this media query rather than removed inside the reduce query, ensuring the default is zero-motion',
          'GitHub\'s Primer Design System documents reduced-motion guidelines: fade transitions are acceptable, slide/zoom are replaced with instant changes, and progress indicators remain animated even in reduced-motion mode because they are informational',
          'Marcy Sutton\'s "Reduced Motion" demos show how to replace a full-page parallax scroll experience with a static image sequence that conveys the same narrative information — the content is identical, only the presentation changes',
        ],
      },
    ],
  },
];

export const chapters: Chapter[] = topics;

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((ch) => ch.id === id);
}
