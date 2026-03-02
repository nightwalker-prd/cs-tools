export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: CSS Transitions
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'Which CSS property cannot be transitioned?',
    options: [
      'opacity',
      'display',
      'background-color',
      'transform',
    ],
    answer: 1,
    explanation: 'The display property is not animatable because it switches between discrete states (block, none, flex) with no interpolable intermediate values. To animate an element appearing/disappearing, use opacity with visibility, or the new CSS transition-behavior: allow-discrete property (experimental). Properties like height: auto are also historically non-transitionable, though CSS now supports calc-size() for this.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What does the cubic-bezier(0.68, -0.55, 0.27, 1.55) timing function produce?',
    options: [
      'A linear constant-speed animation',
      'An animation that overshoots the target value and bounces back (elastic/back easing)',
      'A stepped animation with discrete jumps',
      'A very slow animation that accelerates at the end',
    ],
    answer: 1,
    explanation: 'When cubic-bezier control points have y-values outside the 0-1 range (like -0.55 and 1.55), the animation overshoots its start and/or end values. Negative y1 means it pulls back before starting, y2 > 1 means it overshoots the end before settling. This creates a natural "elastic" or "back" easing effect. Tools like cubic-bezier.com let you visualize and fine-tune these curves.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'What is the difference between transition-property: all and listing specific properties?',
    options: [
      'There is no difference; they behave identically',
      'Using "all" transitions every changed property, which can cause unexpected animations and performance issues; listing specific properties gives precise control',
      'Using "all" is faster because the browser optimizes it',
      'Listing specific properties only works in Chrome',
    ],
    answer: 1,
    explanation: 'transition-property: all applies transitions to every animatable CSS property that changes, including ones you might not intend (like color, padding, or background). This can cause unintended animations and performance overhead. Listing specific properties (e.g., transition-property: transform, opacity) gives explicit control and avoids surprises when other styles change.',
  },

  // Chapter 2: CSS Animations & Keyframes
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What does animation-fill-mode: forwards do?',
    options: [
      'It plays the animation in the forward direction only',
      'It retains the computed values from the last keyframe after the animation ends, keeping the element in its final animated state',
      'It starts the animation from the first keyframe immediately',
      'It loops the animation forward indefinitely',
    ],
    answer: 1,
    explanation: 'By default, when a CSS animation completes, the element snaps back to its original styles. animation-fill-mode: forwards keeps the element styled with the values from the last keyframe (100% or to). "backwards" applies the first keyframe styles during the delay period. "both" combines forwards and backwards behavior.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'How do you create a multi-step animation with pauses between states?',
    options: [
      'Use multiple animation declarations separated by commas',
      'Define duplicate percentage keyframes to hold a state — e.g., 25% and 50% with the same values creates a pause between 25% and 50% of the animation duration',
      'Use animation-delay between each step',
      'Use the steps() timing function',
    ],
    answer: 1,
    explanation: 'Duplicating keyframe values holds the element in that state for the duration between those percentages. For example: @keyframes { 0% { opacity: 0 } 30% { opacity: 1 } 70% { opacity: 1 } 100% { opacity: 0 } } — this fades in during 0-30%, holds fully visible during 30-70%, and fades out during 70-100%. This technique is essential for complex multi-state animations.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What does the steps() timing function do?',
    options: [
      'It adds delay between animation iterations',
      'It divides the animation into a specified number of discrete jumps instead of smooth interpolation, useful for sprite sheet animations',
      'It creates a staircase visual effect on the element',
      'It runs the animation in reverse steps',
    ],
    answer: 1,
    explanation: 'steps(n) breaks the animation into n equal discrete intervals with instant jumps between them. steps(1, jump-end) is equivalent to step-end. This is ideal for sprite sheet animations — set background-position across a sprite strip with steps(N) where N is the number of frames. Also useful for typewriter effects, ticking clocks, and any frame-by-frame animation.',
  },

  // Chapter 3: CSS Transforms
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'Why does the order of CSS transform functions matter?',
    options: [
      'It does not matter; transforms are commutative',
      'Transforms are applied right-to-left as matrix multiplications, so rotate then translate moves in the rotated direction, while translate then rotate moves in the original direction',
      'The browser only applies the first transform and ignores the rest',
      'Order only matters for 3D transforms, not 2D',
    ],
    answer: 1,
    explanation: 'CSS transforms compose as matrix multiplications applied right-to-left. "transform: translateX(100px) rotate(45deg)" first rotates, then translates along the original X axis. "transform: rotate(45deg) translateX(100px)" first translates along the original X, then rotates — producing a completely different result. Understanding this order is crucial for complex animations.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What does the CSS perspective property control in 3D transforms?',
    options: [
      'The rotation angle of 3D elements',
      'The distance between the viewer and the z=0 plane, determining how pronounced 3D depth effects appear — smaller values create more dramatic foreshortening',
      'The color depth of rendered 3D objects',
      'Whether 3D elements cast shadows',
    ],
    answer: 1,
    explanation: 'perspective sets the virtual camera distance from the screen. A small value (e.g., 200px) creates extreme foreshortening — elements close to the viewer appear much larger. A large value (e.g., 1000px) produces subtle depth. Apply perspective on the parent container for consistent vanishing point across children, or use transform: perspective() on individual elements for per-element perspective.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'Why are transform and opacity considered "cheap" properties to animate?',
    options: [
      'They use simpler math than other properties',
      'They can be handled entirely by the GPU compositor thread without triggering layout or paint on the main thread',
      'They are cached by the browser and never recalculated',
      'They affect fewer pixels than other properties',
    ],
    answer: 1,
    explanation: 'Transform and opacity changes can be applied by the compositor thread directly to GPU-composited layers without involving the main thread. No layout recalculation (reflow) or repainting is needed. Animating top/left triggers layout; animating background-color triggers paint. Both block the main thread and can cause jank. Always prefer transform: translate() over top/left for smooth 60fps animations.',
  },

  // Chapter 4: requestAnimationFrame & Timing
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'Why should you use requestAnimationFrame instead of setInterval for animations?',
    options: [
      'requestAnimationFrame is faster than setInterval',
      'rAF syncs with the display refresh rate, is automatically paused in background tabs, and batches with other visual updates for optimal rendering',
      'setInterval does not work in modern browsers',
      'requestAnimationFrame supports more easing functions',
    ],
    answer: 1,
    explanation: 'requestAnimationFrame fires once per display frame (typically 60Hz or 16.67ms), synchronized with the browser\'s repaint cycle. setInterval fires at fixed intervals regardless of display refresh, causing missed frames or redundant work. rAF is automatically throttled in background tabs (saving CPU/battery), and the browser can batch multiple rAF callbacks for optimal compositing.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is delta time and why is it important for animations?',
    options: [
      'The total duration of an animation',
      'The time elapsed since the last frame, used to make animations frame-rate independent so they run at the same speed on 60Hz, 120Hz, and variable-rate displays',
      'The delay before an animation starts',
      'The time it takes for the GPU to render a frame',
    ],
    answer: 1,
    explanation: 'Delta time (dt) is the milliseconds elapsed since the previous frame. Instead of moving 2px per frame (which is 120px/s at 60fps but 240px/s at 120fps), multiply by dt: position += speed * dt. This ensures consistent animation speed regardless of frame rate. The rAF callback receives a DOMHighResTimeStamp — subtract the previous timestamp to get dt.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What is the "frame budget" for a 60fps animation?',
    options: [
      '100ms per frame',
      'Approximately 16.67ms per frame, and all JavaScript, layout, paint, and compositing must complete within this window to avoid dropped frames',
      '33.33ms per frame',
      '1 second per frame',
    ],
    answer: 1,
    explanation: '60fps means 1000ms / 60 = 16.67ms per frame. Within this budget, the browser must run JavaScript (rAF callbacks, event handlers), calculate styles, perform layout, paint, and composite. If any frame exceeds this budget, it\'s dropped and the user sees jank. In practice, aim for <10ms of JS work to leave room for the browser\'s rendering pipeline. On 120Hz displays, the budget is only 8.33ms.',
  },

  // Chapter 5: Web Animations API (WAAPI)
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What advantage does Element.animate() have over CSS animations?',
    options: [
      'It is always faster than CSS animations',
      'It provides programmatic control — dynamic keyframes, play/pause/reverse, playback rate changes, and promises (finished/ready) for coordination, without managing CSS classes',
      'It supports more CSS properties than CSS animations',
      'It works without JavaScript',
    ],
    answer: 1,
    explanation: 'WAAPI combines CSS animation performance (runs on the compositor when possible) with JavaScript control. You can dynamically generate keyframes, chain animations with animation.finished promises, reverse mid-animation, adjust playbackRate, and read currentTime. Unlike CSS animations, you don\'t need to toggle classes or listen for animationend events. The browser can still optimize compositor-eligible WAAPI animations.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What does the Animation.finished promise resolve to?',
    options: [
      'The element that was animated',
      'The Animation object itself, allowing chaining — e.g., await el.animate(...).finished to sequence animations',
      'A boolean indicating success or failure',
      'The final computed style of the element',
    ],
    answer: 1,
    explanation: 'animation.finished returns a Promise that resolves with the Animation when it completes naturally. This enables sequential animation chains: await el.animate(kf1, opts).finished; await el.animate(kf2, opts).finished; — much cleaner than CSS animationend events. The promise rejects if the animation is canceled. animation.ready resolves when the animation is ready to play.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What is the composite property in WAAPI keyframes used for?',
    options: [
      'It sets the z-index stacking order of animated elements',
      'It determines how animated values combine with the element\'s underlying style — "replace" overwrites, "add" adds to, and "accumulate" builds upon the base value',
      'It composites the animation onto a Canvas element',
      'It merges multiple animations into a single timeline',
    ],
    answer: 1,
    explanation: 'The composite option controls value combination: "replace" (default) overwrites the underlying value entirely. "add" adds the effect (e.g., adding translateX(50px) to an existing translateX(100px) gives 150px). "accumulate" is similar but for list values. This enables additive animations where multiple effects stack without overriding each other — essential for layered animation systems.',
  },

  // Chapter 6: Scroll-Driven Animations
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is the difference between ScrollTimeline and ViewTimeline?',
    options: [
      'They are identical APIs with different names',
      'ScrollTimeline progresses based on a scroll container\'s scroll position; ViewTimeline progresses based on an element\'s visibility within a scroll container (entering and leaving the viewport)',
      'ScrollTimeline is for horizontal scrolling, ViewTimeline is for vertical',
      'ScrollTimeline uses JavaScript, ViewTimeline uses CSS only',
    ],
    answer: 1,
    explanation: 'ScrollTimeline ties animation progress to a container\'s scroll offset — at scroll top the animation is at 0%, at scroll bottom it\'s at 100%. ViewTimeline tracks a specific element\'s position within the scrollport — the animation progresses as the element enters, crosses, and exits the visible area. In CSS: animation-timeline: scroll() for ScrollTimeline and animation-timeline: view() for ViewTimeline.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'How do you create a scroll-linked progress bar using only CSS?',
    options: [
      'Use JavaScript with a scroll event listener to update width',
      'Use animation-timeline: scroll() on a fixed element with a @keyframes that scales its width from 0% to 100%',
      'Use the :scroll pseudo-class to detect scroll position',
      'Use position: sticky with a width transition',
    ],
    answer: 1,
    explanation: 'A CSS-only scroll progress bar: create a fixed bar at the top, apply @keyframes progress { from { transform: scaleX(0) } to { transform: scaleX(1) } } with animation-timeline: scroll(). The bar scales from 0 to full width as the user scrolls. Set transform-origin: left to scale from the left edge. No JavaScript needed, and it runs on the compositor thread for smooth performance.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What does the view() function\'s inset parameter control?',
    options: [
      'The padding around the animated element',
      'It adjusts the viewport bounds for triggering the ViewTimeline — positive inset shrinks the trigger area so animation starts later, negative expands it to start earlier',
      'The z-index of the element during animation',
      'The scroll speed at which the animation triggers',
    ],
    answer: 1,
    explanation: 'animation-timeline: view(inset 100px) shrinks the effective viewport by 100px on all sides, meaning the element must scroll 100px further into view before the animation begins. Negative insets expand the trigger zone so animation starts before the element is visible. This provides fine-grained control over when scroll-linked animations activate relative to the viewport edges.',
  },

  // Chapter 7: SVG Animations
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is the recommended approach for SVG animation in modern browsers?',
    options: [
      'SMIL animations using <animate> elements',
      'CSS animations and transitions for simple cases, WAAPI or GSAP for complex path morphing and timeline control',
      'Only JavaScript with setInterval for full control',
      'SVG fonts with animated glyphs',
    ],
    answer: 1,
    explanation: 'SMIL (<animate>, <animateTransform>) is deprecated in Chrome (though still supported). CSS animations work well for SVG transforms, opacity, stroke-dashoffset (line drawing), and fill changes. For complex animations like path morphing, coordinated timelines, and advanced easing, GSAP with its MorphSVG/DrawSVG plugins or WAAPI provide more power and better cross-browser support.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'How does the stroke-dasharray/stroke-dashoffset technique create a "line drawing" SVG animation?',
    options: [
      'It draws new SVG path segments dynamically',
      'It sets the dash length equal to the path length and animates the dash offset from the full length to zero, progressively revealing the stroke',
      'It changes the stroke color from transparent to visible',
      'It uses a clipping mask that moves along the path',
    ],
    answer: 1,
    explanation: 'Set stroke-dasharray to the path\'s total length (one dash = entire path). Set stroke-dashoffset to the same length (dash is shifted entirely out of view). Animate stroke-dashoffset to 0 — the dash slides into view, creating a drawing effect. Get the path length with path.getTotalLength(). This technique powers popular "handwritten text" and "logo reveal" animations.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is SVG path morphing and what constraint must be met?',
    options: [
      'Changing an SVG path\'s color over time with no constraints',
      'Smoothly interpolating between two SVG path shapes — both paths must have the same number and type of path commands for CSS interpolation to work',
      'Converting SVG paths to Canvas paths',
      'Scaling SVG paths to different sizes',
    ],
    answer: 1,
    explanation: 'Path morphing animates the d attribute between two path shapes. For CSS/WAAPI interpolation, both paths need compatible command structures (same number of points and command types). Libraries like GSAP MorphSVG and flubber handle incompatible paths by adding intermediate points automatically. CSS now supports d: path() animation when paths are compatible.',
  },

  // Chapter 8: View Transitions API
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What does document.startViewTransition() do?',
    options: [
      'It navigates to a new URL with a page transition',
      'It captures a screenshot of the current DOM state, runs the provided callback to update the DOM, then cross-fades between the old and new states',
      'It starts a CSS animation on the document element',
      'It enables full-page scrolling transitions',
    ],
    answer: 1,
    explanation: 'startViewTransition(callback) captures the current visual state as an "old" snapshot, calls your callback (which updates the DOM — e.g., swapping content, changing routes), then captures the "new" state. The browser creates ::view-transition pseudo-elements and cross-fades between old and new snapshots. You can customize the animation with CSS targeting these pseudo-elements.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What does the view-transition-name CSS property do?',
    options: [
      'It names a CSS animation for reuse',
      'It assigns elements to transition groups, enabling the browser to independently animate matched elements between old and new states instead of cross-fading the entire page',
      'It creates a named route for navigation transitions',
      'It sets an accessible label for the transition',
    ],
    answer: 1,
    explanation: 'By giving elements a view-transition-name, you tell the browser to track them individually during a view transition. An element with view-transition-name: hero-image in the old state morphs smoothly to the element with the same name in the new state (position, size, content). Without it, the entire page cross-fades as one unit. Each name must be unique within a document.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'How do cross-document view transitions work in multi-page applications?',
    options: [
      'They require JavaScript frameworks and cannot use native browser APIs',
      'Using the @view-transition at-rule in CSS and view-transition-name on elements across pages, the browser automatically captures and transitions between navigations within the same origin',
      'They use iframes to preload the next page',
      'They convert MPAs into SPAs at runtime',
    ],
    answer: 1,
    explanation: 'Cross-document view transitions (Chrome 126+) work on same-origin navigations. Add @view-transition { navigation: auto; } in CSS on both pages. Elements with matching view-transition-name values on source and destination pages automatically morph between them during navigation. The browser handles screenshot capture, animation, and cleanup. No JavaScript required for basic cases.',
  },

  // Chapter 9: Motion Design Principles
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'Why do physics-based spring animations feel more natural than linear or cubic-bezier easing?',
    options: [
      'Springs use higher frame rates than CSS animations',
      'Spring animations model real physical behavior (mass, tension, friction) producing velocity-dependent motion that naturally decelerates, overshoots, and settles — matching how objects move in the real world',
      'Spring animations are rendered on the GPU while CSS easing is not',
      'Springs are faster to compute than bezier curves',
    ],
    answer: 1,
    explanation: 'Spring physics simulate mass on a spring with configurable tension (stiffness), friction (damping), and mass. The resulting motion naturally accelerates, overshoots, oscillates, and settles based on velocity — unlike bezier curves which follow a fixed time-progress curve. Interrupting a spring mid-motion preserves velocity for smooth redirection. Libraries like React Spring, Framer Motion, and GSAP provide spring implementations.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What is animation staggering and why is it effective?',
    options: [
      'Playing animations at random speeds for variety',
      'Delaying each element in a group by a small increment so they animate sequentially, creating a cascading wave effect that guides the user\'s attention and feels more organic',
      'Running multiple animations on the same element simultaneously',
      'Alternating between forward and reverse animation directions',
    ],
    answer: 1,
    explanation: 'Staggering adds incremental delay (e.g., 50ms per item) to elements in a list or grid, creating a wave or cascade effect. It draws the eye along the sequence and feels more natural than everything moving at once. In CSS: animation-delay: calc(var(--i) * 50ms) with a custom property per element. GSAP\'s stagger property and Framer Motion\'s staggerChildren make this easy.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What makes an effective micro-interaction?',
    options: [
      'Any animation that lasts longer than 2 seconds',
      'A brief, purposeful animation (100-300ms) that provides immediate feedback for user actions — like a button press effect, toggle switch, or form validation indicator',
      'Animations that play automatically on page load',
      'Full-screen transition animations between pages',
    ],
    answer: 1,
    explanation: 'Micro-interactions are tiny, focused animations that acknowledge user input and communicate state changes. A button that subtly scales on press (transform: scale(0.97)), a checkbox that draws a checkmark, or a shake animation on invalid input. They should be fast (100-300ms), subtle, and purposeful. Overly long or dramatic micro-interactions become annoying with repeated use.',
  },

  // Chapter 10: Animation Libraries
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What is GSAP\'s primary advantage over CSS animations and WAAPI?',
    options: [
      'It is smaller in file size than CSS animations',
      'It provides a powerful timeline system for sequencing, overlapping, and controlling complex multi-element animations with consistent cross-browser behavior',
      'It runs animations in a Web Worker',
      'It automatically generates keyframes from design files',
    ],
    answer: 1,
    explanation: 'GSAP (GreenSock) excels at complex, coordinated animations through its Timeline API. You can sequence, overlap, stagger, label, and control groups of tweens as a single unit — pause, reverse, or scrub the entire timeline. It handles cross-browser inconsistencies, provides plugins (ScrollTrigger, MorphSVG, Flip), and can animate any numeric property (not just CSS). It\'s the industry standard for production animation.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'How does Framer Motion\'s AnimatePresence component solve exit animations in React?',
    options: [
      'It prevents React from unmounting components',
      'It delays component unmounting until exit animations complete, allowing elements to animate out before being removed from the DOM',
      'It uses CSS transitions instead of JavaScript animations',
      'It moves components off-screen instead of removing them',
    ],
    answer: 1,
    explanation: 'React immediately removes components from the DOM when they leave the tree, making exit animations impossible with normal approaches. AnimatePresence wraps components and delays their unmounting until the exit animation (defined in the exit prop) completes. When a component\'s key changes or it\'s conditionally removed, Framer Motion keeps it in the DOM until the exit animation finishes, then removes it.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is Lottie and how does it bridge design and development?',
    options: [
      'A CSS preprocessor that generates animation code',
      'A library that renders After Effects animations exported as JSON via the Bodymovin plugin, enabling designers to create complex animations that developers can use without recreating them in code',
      'A font library with animated character glyphs',
      'A video compression format for short animation clips',
    ],
    answer: 1,
    explanation: 'Lottie (by Airbnb) plays animations created in Adobe After Effects and exported as JSON by the Bodymovin plugin. Designers create complex vector animations in their familiar tool, export to JSON, and developers render them with the Lottie library (web, iOS, Android, React Native). Animations are resolution-independent vectors, typically smaller than GIFs/videos, and can be controlled programmatically.',
  },

  // Chapter 11: Animation Performance
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'Which CSS properties can be animated on the compositor thread without triggering layout or paint?',
    options: [
      'width, height, margin, and padding',
      'transform and opacity (and in some browsers, filter and backdrop-filter)',
      'color, background-color, and border-color',
      'font-size, line-height, and letter-spacing',
    ],
    answer: 1,
    explanation: 'Only transform and opacity are universally compositor-friendly — they can be applied to a GPU layer without the main thread. Some browsers also composite filter and backdrop-filter. Animating layout properties (width, height, margin) triggers expensive layout recalculation for the element and its siblings. Paint properties (color, background, box-shadow) require repainting but skip layout.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What does will-change do and why should it be used carefully?',
    options: [
      'It speeds up all CSS properties automatically',
      'It hints to the browser to create a GPU compositing layer for the element in advance, which uses additional memory — overuse wastes GPU memory and can actually degrade performance',
      'It changes the element\'s position in the stacking context',
      'It pre-calculates animation keyframes',
    ],
    answer: 1,
    explanation: 'will-change: transform tells the browser to promote the element to its own compositing layer before the animation starts, avoiding a layout-triggering layer promotion mid-animation. However, each layer consumes GPU memory (VRAM). Applying will-change to many elements wastes memory, increases compositing overhead, and can cause flickering. Apply it just before animation starts and remove it after, or only on elements that actually animate.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'How can you detect animation jank using Chrome DevTools?',
    options: [
      'Check the Console for animation error messages',
      'Use the Performance panel to record and look for long frames (exceeding 16.67ms), red frame markers, and gaps in the frame timeline that indicate dropped frames',
      'Look at the Network tab for slow resource loading',
      'Use the Elements panel to inspect animation CSS',
    ],
    answer: 1,
    explanation: 'Record a Performance trace while the animation runs. The Frames section shows each frame\'s duration — green bars are on-time (<16.67ms), red bars are long frames that cause jank. The Main thread flame chart shows what caused the long frame (expensive JS, forced layout, long paint). Enable "Rendering > Frame Rendering Stats" for a real-time FPS meter and GPU memory indicator.',
  },

  // Chapter 12: Canvas & WebGL Animation
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is the standard pattern for a Canvas 2D animation loop?',
    options: [
      'Use setInterval to redraw the canvas every 16ms',
      'Use requestAnimationFrame to clear the canvas, update state, and redraw every frame — separating update logic from render logic',
      'Draw once and use CSS transforms to animate the canvas element',
      'Create a new Canvas element for each animation frame',
    ],
    answer: 1,
    explanation: 'The standard loop: function animate(time) { ctx.clearRect(0, 0, w, h); update(time); draw(); requestAnimationFrame(animate); }. clearRect erases the previous frame. update() advances simulation state (positions, velocities) using delta time. draw() renders the current state. Separating update from draw allows fixed-timestep physics independent of frame rate. Use OffscreenCanvas + Web Workers for complex scenes.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'How do particle systems create complex visual effects from simple rules?',
    options: [
      'They use pre-rendered video frames overlaid on the canvas',
      'They spawn many simple objects (particles) with individual properties (position, velocity, lifetime, color) that follow basic physics rules, creating emergent complex behavior like fire, smoke, or confetti',
      'They use SVG filters to distort existing elements',
      'They apply CSS blur and opacity to DOM elements',
    ],
    answer: 1,
    explanation: 'Particle systems manage collections of lightweight objects. Each particle has position, velocity, acceleration, lifetime, size, color, and opacity. An emitter spawns particles with randomized initial properties. Each frame: update positions (physics), apply forces (gravity, wind), age particles, remove dead ones, and render survivors. Simple rules produce complex effects: sparks, rain, smoke, explosions, ambient floating particles.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What are fragment shaders in WebGL and why are they powerful for animation?',
    options: [
      'JavaScript functions that split large animations into fragments',
      'GPU programs that run in parallel for every pixel on screen, computing color/effects based on position, time, and uniforms — enabling real-time procedural effects impossible with per-element CSS',
      'HTML fragments that can be animated independently',
      'Shader programs that optimize CSS rendering performance',
    ],
    answer: 1,
    explanation: 'Fragment (pixel) shaders are GLSL programs executed on the GPU for every pixel simultaneously. By passing a time uniform, you create animated effects: noise patterns, water ripples, fire, gradients, ray-marching 3D scenes — all computed procedurally per-pixel at 60fps. The massive parallelism of GPUs (thousands of cores) makes effects possible that would be impossibly slow on the CPU. Shadertoy.com showcases creative shader animation.',
  },

  // Chapter 13: Accessibility & Reduced Motion
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What does the prefers-reduced-motion media query detect?',
    options: [
      'Whether the device has a slow CPU',
      'Whether the user has enabled the "reduce motion" accessibility setting in their operating system, indicating sensitivity to animation and motion effects',
      'Whether the device is in low-power mode',
      'Whether the browser supports CSS animations',
    ],
    answer: 1,
    explanation: '@media (prefers-reduced-motion: reduce) matches when the user has enabled reduced motion in their OS settings (macOS: System Settings > Accessibility > Display > Reduce motion; Windows: Settings > Ease of Access > Display > Show animations). This affects roughly 10-30% of users. In JavaScript: window.matchMedia("(prefers-reduced-motion: reduce)").matches. It can also be listened to for dynamic changes.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'Which types of motion are most likely to cause vestibular discomfort?',
    options: [
      'Color changes and opacity fades',
      'Large-scale parallax scrolling, zoom effects, spinning/rotating animations, and auto-playing motion that covers significant screen area',
      'Subtle hover state transitions',
      'Loading spinner animations',
    ],
    answer: 1,
    explanation: 'Vestibular disorders affect the inner ear\'s balance system. Problematic animations include: parallax scrolling (creates conflicting depth cues), full-page zoom/scale transitions, spinning or rotating elements, auto-playing background video, and any large-area motion that creates a sense of physical movement. Small, contained animations (button hovers, icon transitions) are generally safe and can be kept even for reduced-motion users.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is the recommended approach for implementing reduced motion support?',
    options: [
      'Remove all animations when reduced motion is enabled',
      'Use a "reduce, don\'t remove" strategy — replace problematic motion with subtle alternatives (cross-fades, opacity changes) rather than removing animation entirely, preserving meaningful state-change indicators',
      'Only apply reduced motion to decorative animations',
      'Add a manual toggle and ignore the system setting',
    ],
    answer: 1,
    explanation: 'The best practice is "reduce, don\'t remove." Replace parallax with static layouts, replace slide-ins with fade-ins, shorten durations, and remove decorative motion — but keep essential state-change feedback. A common CSS pattern: @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } } as a baseline, then selectively add back safe animations.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
