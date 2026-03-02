export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Design Principles
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'According to Gestalt principles, why should a form label be positioned closer to its input field than to the next field?',
    options: [
      'To make the form look visually balanced',
      'Because the proximity principle causes users to perceive nearby elements as a related group',
      'Because labels must always be directly above inputs for accessibility',
      'To reduce the total vertical height of the form',
    ],
    answer: 1,
    explanation: 'The Gestalt principle of proximity states that elements placed close together are perceived as belonging to the same group. When a label is closer to its input than to the next field, users instantly associate the label with the correct input without needing visual connectors like lines or borders.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What is the primary purpose of breaking visual consistency in a design (e.g., using a red "Delete" button among blue buttons)?',
    options: [
      'To add visual variety and prevent the interface from looking monotonous',
      'To draw attention to that specific action by violating the established pattern, signaling it requires extra caution',
      'To indicate that the button is disabled',
      'To match the brand\'s secondary color palette',
    ],
    answer: 1,
    explanation: 'Intentional inconsistency leverages the Von Restorff effect (isolation effect): an item that differs from its surroundings is more memorable and attention-grabbing. A red delete button among blue action buttons signals danger and prompts the user to pause before clicking, precisely because it breaks the established pattern.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'Why do luxury brand websites typically use significantly more whitespace than discount retail sites?',
    options: [
      'Because luxury brands have less content to display',
      'Because generous whitespace communicates premium quality, confidence, and exclusivity -- it implies the brand can "afford" to leave space empty',
      'Because search engines rank pages with more whitespace higher',
      'Because mobile devices require more whitespace to function properly',
    ],
    answer: 1,
    explanation: 'Whitespace is a powerful communicator of brand positioning. Generous whitespace creates a sense of luxury, exclusivity, and confidence -- the brand is saying its products deserve space to breathe. Discount retailers use dense layouts because they prioritize information density and deal discovery over aesthetic elegance.',
  },

  // Chapter 2: Color Theory
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'Why is HSL considered unintuitive for building perceptually balanced color palettes, despite being more designer-friendly than RGB?',
    options: [
      'Because HSL cannot represent all colors that RGB can',
      'Because HSL\'s lightness channel is not perceptually uniform -- yellow at 50% lightness looks much brighter than blue at 50% lightness',
      'Because HSL is slower to render in browsers',
      'Because HSL colors cannot be converted to hex values',
    ],
    answer: 1,
    explanation: 'HSL\'s lightness is mathematically defined, not perceptually calibrated. Two colors with identical L values (e.g., yellow and blue at L:50%) have very different perceived brightness because the human eye is more sensitive to some wavelengths than others. OKLCH and Lab color spaces solve this with perceptually uniform lightness channels.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What is the minimum WCAG 2.1 AA contrast ratio required for normal body text against its background?',
    options: [
      '3:1',
      '4.5:1',
      '7:1',
      '2:1',
    ],
    answer: 1,
    explanation: 'WCAG 2.1 Level AA requires a minimum contrast ratio of 4.5:1 for normal text (under 18px bold or 24px regular) against its background. Large text (18px+ bold or 24px+ regular) has a lower requirement of 3:1. WCAG AAA requires 7:1 for normal text and 4.5:1 for large text.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What does the 60-30-10 rule refer to in color system design?',
    options: [
      'The percentage of colors that should be accessible at each WCAG level',
      'The ratio of dominant color (background/neutrals), secondary color (cards/sections), and accent color (CTAs/highlights) in a layout',
      'The number of color tokens needed for small, medium, and large design systems',
      'The percentage of users who prefer light mode, dark mode, and high-contrast mode',
    ],
    answer: 1,
    explanation: 'The 60-30-10 rule provides a starting ratio for color distribution: 60% dominant (typically background/neutral colors), 30% secondary (supporting surfaces like cards and sections), and 10% accent (call-to-action buttons, highlights, active states). This ratio creates visual harmony while ensuring accent colors stand out through scarcity.',
  },

  // Chapter 3: Typography
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'Why is x-height considered the strongest predictor of on-screen readability for body text?',
    options: [
      'Because x-height determines the maximum font size browsers can render',
      'Because taller x-height fonts have proportionally larger lowercase letters relative to the font size, making them more legible at small sizes on screens',
      'Because x-height affects how much space a font takes in memory',
      'Because fonts with large x-heights load faster from CDNs',
    ],
    answer: 1,
    explanation: 'X-height is the height of lowercase letters (measured by the letter "x"). Fonts with taller x-heights (like Inter, Roboto) have larger lowercase letters relative to their set font size, which directly improves legibility at the small sizes (14-16px) typical of UI text. This is why screen-optimized fonts are designed with generous x-heights.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is the key advantage of using a superfamily (e.g., Roboto + Roboto Slab) for font pairing?',
    options: [
      'Superfamilies are always free to use commercially',
      'They guarantee compatibility because the serif and sans-serif variants share underlying proportions, metrics, and design DNA',
      'They load faster than combining fonts from different families',
      'They automatically adjust for different languages and scripts',
    ],
    answer: 1,
    explanation: 'Superfamilies are designed together from the start, sharing proportions (x-height, cap height, letter widths), metrics (ascender/descender lengths), and design philosophy. This means the serif and sans-serif variants naturally harmonize when used together, eliminating the guesswork of pairing fonts from different designers.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'Why should line-height decrease as font size increases?',
    options: [
      'To save vertical space on the page',
      'Because large text with generous line-height looks disconnected -- the eye loses the relationship between lines, while small text needs extra spacing to prevent lines from feeling cramped',
      'Because browsers render large text more slowly with large line-heights',
      'Because WCAG requires specific line-height ratios at specific font sizes',
    ],
    answer: 1,
    explanation: 'At small sizes (14-16px), text needs ~1.5 line-height to prevent lines from feeling cramped and to help the eye track back to the start of the next line. At large sizes (32px+), 1.5 line-height creates too much gap between lines, making them feel like separate elements rather than connected text. Large headings typically use 1.1-1.2 line-height.',
  },

  // Chapter 4: User Research
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'Why is asking "Would you use a feature that does X?" considered a poor user interview question?',
    options: [
      'Because it reveals too much about the product roadmap',
      'Because hypothetical questions predict future behavior poorly -- users say "yes" to almost any reasonable feature idea but behave differently when faced with real choices',
      'Because it is too specific and does not allow for open-ended responses',
      'Because feature questions should only be asked in surveys, not interviews',
    ],
    answer: 1,
    explanation: 'Hypothetical questions measure aspiration, not behavior. Users are notoriously bad at predicting their own future actions, and social desirability bias makes them likely to say yes to seem helpful. Instead, ask about past behavior: "Tell me about the last time you tried to do X" reveals what users actually do, not what they think they would do.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the core idea behind the Jobs-to-be-Done (JTBD) framework?',
    options: [
      'That every user needs a detailed persona document before design can begin',
      'That users "hire" products to make progress in specific circumstances -- understanding the "job" reframes competition and reveals innovation opportunities',
      'That user research should focus exclusively on job titles and professional roles',
      'That products should be designed to automate users\' jobs away',
    ],
    answer: 1,
    explanation: 'JTBD theory (Clayton Christensen) argues that users do not buy products -- they hire them to get a job done. A "job" is the progress someone is trying to make in a particular circumstance. This reframes competition: a milkshake competes with a banana, a bagel, and boredom for the "make my commute less boring" job, not just other milkshakes.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What does the "five whys" technique accomplish in user interviews?',
    options: [
      'It validates that the user is telling the truth',
      'It digs past surface-level answers to uncover root motivations -- each "why" peels back a layer from the stated need to the underlying goal',
      'It determines the user\'s technical proficiency level',
      'It identifies exactly five pain points per user session',
    ],
    answer: 1,
    explanation: 'The "five whys" technique asks "why?" iteratively (typically 3-5 times) to move from a surface-level feature request to the root need. When a user says "I want a dashboard," asking "why?" might reveal they need to answer their manager\'s questions quickly -- which might be better solved by automated reports than a dashboard.',
  },

  // Chapter 5: Information Architecture
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What is the difference between open card sorting and closed card sorting?',
    options: [
      'Open card sorting uses physical cards while closed card sorting uses digital tools',
      'In open card sorting, participants create their own category names; in closed card sorting, they sort content into predefined categories',
      'Open card sorting has no time limit while closed card sorting is timed',
      'Open card sorting tests navigation while closed card sorting tests search',
    ],
    answer: 1,
    explanation: 'Open card sorting asks participants to group content items and name the groups themselves, revealing their mental models of how information should be organized. Closed card sorting provides predefined categories and asks participants to sort items into them, validating whether a proposed IA structure matches user expectations. Open is generative; closed is evaluative.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'Why is the "3-click rule" considered a myth in modern UX research?',
    options: [
      'Because most websites cannot be navigated in 3 clicks',
      'Because research shows users do not mind click depth as long as each click is clear and confident -- information scent (clear labels) matters more than click count',
      'Because mobile devices require more clicks than desktop',
      'Because the rule was invented by a marketing team, not UX researchers',
    ],
    answer: 1,
    explanation: 'Research (Joshua Porter, UIE) found no correlation between the number of clicks to reach content and user satisfaction or success rates. Users are happy to click through many levels as long as each click feels like confident progress toward their goal. Misleading labels that make users uncertain whether they are on the right path cause frustration, not click count.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'Why is it important to map error paths in user flows, not just the "happy path"?',
    options: [
      'Because error paths are required by WCAG accessibility standards',
      'Because error states, edge cases, and alternate routes reveal the most critical UX problems -- frustrated users at error points are most likely to abandon the flow',
      'Because error paths are easier to implement than happy paths',
      'Because stakeholders only review error flows during design reviews',
    ],
    answer: 1,
    explanation: 'The happy path shows the ideal journey, but users frequently encounter errors, edge cases, and unexpected states. Error recovery points are where frustrated users are most likely to abandon a flow entirely. Mapping and designing for the top 3-5 error scenarios (invalid input, network failure, missing data) ensures the experience degrades gracefully rather than catastrophically.',
  },

  // Chapter 6: Usability & Testing
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'According to Nielsen\'s heuristics, why is "recognition rather than recall" important for usability?',
    options: [
      'Because computers process recognition faster than recall operations',
      'Because making options visible reduces cognitive load -- users should not need to memorize information from one part of the interface to use another',
      'Because recognition-based interfaces require less code to implement',
      'Because recall-based interfaces violate accessibility guidelines',
    ],
    answer: 1,
    explanation: 'Human recognition memory is much more powerful than recall memory. Showing users their options (autocomplete, recent items, visible navigation) is easier than requiring them to remember commands, paths, or codes from memory. This is why GUI menus replaced command-line interfaces for most users -- seeing options is easier than remembering syntax.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'How many participants does the Nielsen/Landauer model suggest are needed to find approximately 85% of usability problems?',
    options: [
      '3 participants',
      '5 participants',
      '15 participants',
      '30 participants',
    ],
    answer: 1,
    explanation: 'Nielsen and Landauer\'s mathematical model shows that 5 participants find approximately 85% of usability problems in a given interface. Beyond 5, each additional participant finds fewer new problems (diminishing returns). The recommended approach is to test with 5 users, fix the issues found, and then test again with 5 more -- iterative testing is more effective than large one-time studies.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'Why can over-reliance on A/B testing be problematic for UX improvement?',
    options: [
      'Because A/B tests are always statistically unreliable',
      'Because A/B testing leads to local optimization (tweaking buttons) while potentially missing systemic UX problems that require qualitative research to identify',
      'Because A/B tests cannot measure user satisfaction',
      'Because A/B tests only work on e-commerce websites',
    ],
    answer: 1,
    explanation: 'A/B testing excels at comparing specific variations (button color A vs B) but can only test what you think to test. It optimizes locally within the existing design paradigm. Systemic UX problems (confusing navigation structure, wrong mental model, missing features) require qualitative methods (interviews, observation) to identify -- you cannot A/B test your way to a fundamentally better design.',
  },

  // Chapter 7: Layout Systems
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'Why is 12 the standard number of columns in grid systems?',
    options: [
      'Because 12 is the maximum number of columns CSS Grid supports',
      'Because 12 is divisible by 2, 3, 4, and 6, enabling flexible content arrangements like halves, thirds, quarters, and sixths',
      'Because 12 columns match the width of standard monitor resolutions',
      'Because research shows users cannot perceive more than 12 columns of content',
    ],
    answer: 1,
    explanation: '12 is a highly composite number -- it can be evenly divided by 2 (6+6 halves), 3 (4+4+4 thirds), 4 (3+3+3+3 quarters), and 6 (2+2+2+2+2+2 sixths). This mathematical flexibility enables designers to create diverse layout arrangements within a consistent framework, which is why Bootstrap, Material Design, and most grid systems use 12 columns.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What problem do CSS container queries solve that viewport-based media queries cannot?',
    options: [
      'Container queries are faster to render than media queries',
      'Container queries enable components to respond to their container\'s size rather than the viewport, making truly reusable components that adapt to any layout context',
      'Container queries support more breakpoints than media queries',
      'Container queries work in email clients while media queries do not',
    ],
    answer: 1,
    explanation: 'With viewport media queries, a card component must know all the possible layouts it might appear in (full-width, sidebar, grid column) and write viewport-specific styles for each. Container queries let the component respond to its own container\'s width, so the same card component automatically adapts whether it is in a 300px sidebar or an 800px main area -- truly reusable responsive components.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'When should you use CSS Grid instead of Flexbox for a layout?',
    options: [
      'Whenever you need more than 3 items in a row',
      'When you need two-dimensional control over both rows and columns simultaneously, such as page layouts, dashboards, or image galleries',
      'When you need to support older browsers',
      'When you need animations on layout elements',
    ],
    answer: 1,
    explanation: 'Flexbox is one-dimensional -- it controls layout along a single axis (row or column). CSS Grid is two-dimensional -- it controls both rows and columns simultaneously. Use Flexbox for component-level layouts (nav bars, card content, form rows) and CSS Grid for page-level layouts (header/sidebar/main/footer), complex dashboards, and any layout requiring precise row+column alignment.',
  },

  // Chapter 8: Component Design
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'In atomic design, what distinguishes a "molecule" from an "organism"?',
    options: [
      'Molecules are larger than organisms',
      'A molecule is a simple functional group of atoms that does one thing (e.g., search form = input + button), while an organism is a complex section composed of multiple molecules (e.g., a header with logo + nav + search + user menu)',
      'Molecules are interactive while organisms are static',
      'Molecules use CSS while organisms use JavaScript',
    ],
    answer: 1,
    explanation: 'Molecules combine a few atoms into a simple, functional unit with a single purpose (a search form, a form field with label and error). Organisms are more complex sections composed of multiple molecules and atoms that form a distinct section of the interface (a page header, a product card grid, a comment thread). The distinction is complexity and scope, not size.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What is the primary advantage of headless/unstyled component libraries (like Radix UI) over opinionated systems (like Material Design)?',
    options: [
      'Headless libraries are faster to render',
      'They provide accessible, well-tested behavior (keyboard navigation, ARIA, focus management) without imposing visual styling, giving teams full design freedom',
      'They support more programming languages',
      'They require fewer dependencies to install',
    ],
    answer: 1,
    explanation: 'Headless component libraries handle the hard parts of component development -- keyboard interactions, ARIA attributes, focus management, screen reader announcements -- while leaving visual styling entirely to the consuming team. This means products get production-quality accessibility without looking like every other Material/Ant Design application.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What problem does the three-layer design token hierarchy (global > alias > component) solve?',
    options: [
      'It reduces the number of colors in the palette',
      'It decouples visual values from semantic meaning from component usage, enabling theme switching and consistent cross-platform application without changing component code',
      'It ensures all tokens are accessible',
      'It automatically generates dark mode variants',
    ],
    answer: 1,
    explanation: 'The three-layer hierarchy creates indirection that enables flexibility: global tokens define raw values (blue-500: #3B82F6), alias tokens assign meaning (color-primary: blue-500), and component tokens bind to usage (button-bg: color-primary). Switching themes only requires changing alias mappings, and component code never references raw color values directly.',
  },

  // Chapter 9: Interaction Design
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'According to response time research, what happens when UI feedback takes longer than 1 second?',
    options: [
      'Users automatically refresh the page',
      'Users need a loading indicator because the delay is noticeable and they lose the sense of directly manipulating the interface',
      'The browser reports an error',
      'Users perceive the application as broken',
    ],
    answer: 1,
    explanation: 'Jakob Nielsen\'s response time limits define three thresholds: under 100ms feels instantaneous, 100-300ms feels responsive but noticeable, 300ms-1s loses the feeling of direct manipulation. Beyond 1 second, users need a loading indicator (spinner, progress bar) to maintain confidence that the system is working. Beyond 10 seconds, users may abandon the task entirely.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'Why should inline form validation trigger on blur (when the user leaves the field) rather than on every keystroke?',
    options: [
      'Because keystroke validation uses too much server bandwidth',
      'Because validating while the user is still typing shows errors before they have finished entering data, which is distracting and can make valid in-progress input appear invalid',
      'Because blur events are supported by more browsers',
      'Because keystroke validation conflicts with screen reader functionality',
    ],
    answer: 1,
    explanation: 'When validation fires on every keystroke, users see error messages while still typing -- "Invalid email" appears before they have typed the @ symbol. This creates a frustrating "yelling at the user" experience. Validating on blur (when the user tabs or clicks away) checks the completed input, providing timely feedback without interrupting the input process.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What is the key risk of implementing optimistic UI (showing action results immediately before server confirmation)?',
    options: [
      'It violates WCAG accessibility standards',
      'If the server request fails, the UI must revert the change -- a "Like" that appears then disappears 2 seconds later is more jarring than one that takes 1 second to appear',
      'It causes duplicate data entries in the database',
      'It makes A/B testing impossible',
    ],
    answer: 1,
    explanation: 'Optimistic UI trades guaranteed accuracy for perceived speed. The risk is that when the server rejects the action (network failure, authorization error, conflict), the UI must "undo" a change the user already perceived as complete. This visual revert can be confusing and erode trust. Optimistic UI works best for low-risk, high-confidence actions (likes, toggles) with reliable backends.',
  },

  // Chapter 10: Mobile & Responsive Design
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'Why does mobile-first CSS use min-width media queries instead of max-width?',
    options: [
      'Because min-width queries render faster on mobile devices',
      'Because min-width queries start with base mobile styles and progressively add complexity for larger viewports, naturally prioritizing essential content',
      'Because max-width queries are deprecated in modern CSS',
      'Because min-width is the only query type supported by mobile browsers',
    ],
    answer: 1,
    explanation: 'Mobile-first CSS writes base styles for the smallest viewport (no media query needed) and uses min-width breakpoints to add enhancements as the viewport grows. This approach ensures mobile devices only process relevant styles, naturally prioritizes essential content (what fits on the smallest screen matters most), and results in cleaner, more maintainable CSS.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What is the recommended minimum touch target size according to Apple\'s Human Interface Guidelines?',
    options: [
      '24x24 points',
      '44x44 points',
      '56x56 points',
      '32x32 points',
    ],
    answer: 1,
    explanation: 'Apple\'s Human Interface Guidelines recommend a minimum touch target size of 44x44 points (points are resolution-independent units). Material Design recommends 48x48dp. Targets smaller than these minimums cause frequent tap errors, especially for users with motor impairments or larger fingers. WCAG 2.2 sets a lower minimum of 24x24px.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is the primary advantage of responsive design over adaptive design for most web projects?',
    options: [
      'Responsive design produces faster-loading pages',
      'Responsive design uses one codebase with fluid layouts that adapt to any viewport, making it simpler to maintain than serving separate layouts per device class',
      'Responsive design supports more languages',
      'Responsive design works without JavaScript',
    ],
    answer: 1,
    explanation: 'Responsive design maintains a single codebase that uses fluid grids, flexible images, and CSS media queries to adapt to any viewport width. Adaptive design requires maintaining separate layouts (sometimes separate codebases) for different device classes. For most teams, the maintenance simplicity of responsive design outweighs the device-specific optimization that adaptive enables.',
  },

  // Chapter 11: Design Systems
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'Why is a "federated" governance model most common for design systems at scale?',
    options: [
      'Because it is the cheapest to implement',
      'Because it balances centralized quality control (core team reviews/approves) with distributed contribution (product teams propose changes), scaling without creating bottlenecks',
      'Because it requires the fewest people',
      'Because it eliminates the need for documentation',
    ],
    answer: 1,
    explanation: 'Centralized governance (one team owns everything) ensures consistency but creates bottlenecks as the organization grows -- product teams wait for the system team. Distributed governance (anyone can contribute freely) scales but risks inconsistency. Federated governance (product teams contribute, core team reviews) balances scalability with quality control, which is why most large design system teams adopt it.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is the primary benefit of Figma\'s component variants feature for design system management?',
    options: [
      'Variants make components load faster in Figma',
      'Variants group related component states (default, hover, active, disabled, sizes) into a single component set, reducing component library clutter and making state management intuitive',
      'Variants automatically generate code for developers',
      'Variants enable real-time collaboration between designers',
    ],
    answer: 1,
    explanation: 'Without variants, each state of a button (default, hover, pressed, disabled x small, medium, large) would be a separate component in the library -- potentially dozens of individual components for one button. Variants group them into a single component set where designers switch between states using a properties panel, making the library manageable and state relationships explicit.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What problem does automated visual regression testing (Chromatic, Percy) solve in design system development?',
    options: [
      'It automatically fixes CSS bugs in components',
      'It captures screenshots of every component story and alerts when visual changes occur, catching unintended regressions in pull requests before they reach production',
      'It generates design tokens from component screenshots',
      'It measures page load performance for each component',
    ],
    answer: 1,
    explanation: 'Visual regression testing screenshots every Storybook story in a baseline state and compares new screenshots against the baseline on each pull request. If a CSS change unintentionally alters a component\'s appearance (a button shifted 2px, a color changed in an unrelated component), the test catches it before merge. This is essential for design systems where one change can affect hundreds of consuming applications.',
  },

  // Chapter 12: Accessibility (a11y)
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is the "first rule of ARIA" and why does it matter?',
    options: [
      'Always use ARIA on every HTML element for maximum accessibility',
      'If you can use a native HTML element with the semantics you need, do so -- unnecessary ARIA can confuse screen readers and create a worse experience than no ARIA at all',
      'ARIA attributes must always be tested in Chrome before other browsers',
      'ARIA roles should be applied to container elements only',
    ],
    answer: 1,
    explanation: 'Native HTML elements (<button>, <input>, <nav>, <dialog>) have built-in semantics, keyboard behavior, and screen reader support that work correctly without any ARIA. Adding redundant ARIA (role="button" on a <button>) is harmless but unnecessary. Adding incorrect ARIA (wrong roles, missing required attributes) actively harms accessibility by sending contradictory information to assistive technology.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'Why should tabindex values greater than 0 be avoided?',
    options: [
      'Because they are not supported by screen readers',
      'Because they override the natural DOM order for keyboard navigation, creating a confusing tab sequence that does not match the visual layout',
      'Because they cause performance issues in browsers',
      'Because they conflict with ARIA attributes',
    ],
    answer: 1,
    explanation: 'tabindex > 0 forces elements to receive focus before everything else in the DOM, regardless of their visual position. This creates a tab order that jumps around the page unpredictably, confusing keyboard users. Use tabindex="0" to add elements to the natural tab order, tabindex="-1" for programmatic focus only, and never use positive values. Fix tab order by fixing DOM order instead.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'How does the Inclusive Design Cube principle ("design for the extremes") benefit all users?',
    options: [
      'It ensures the product works on the oldest and newest devices',
      'Solutions designed for users with permanent disabilities (e.g., closed captions for deaf users) also help users with temporary or situational limitations (e.g., in a noisy airport)',
      'It reduces the total number of features needed in the product',
      'It automatically generates accessible versions of every interface',
    ],
    answer: 1,
    explanation: 'Microsoft\'s Inclusive Design framework shows that designing for permanent disabilities creates solutions that benefit everyone across a spectrum of situations: captions help deaf users (permanent), ear infection patients (temporary), and airport travelers (situational). High contrast helps blind users (permanent), dilated-pupil patients (temporary), and users in bright sunlight (situational). Designing for the extreme serves the mainstream.',
  },

  // Chapter 13: Design Trends & Future
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'Why should dark mode surfaces use dark grays (#121212-#1E1E1E) instead of pure black (#000000)?',
    options: [
      'Because pure black uses more battery on OLED screens',
      'Because pure black creates harsh contrast with white text, cannot convey elevation through surface color variation, and causes a "halation" effect where bright text appears to bleed into the dark background',
      'Because dark gray is easier to print',
      'Because pure black is not supported by all CSS color models',
    ],
    answer: 1,
    explanation: 'Pure black (#000) backgrounds create maximum contrast with white text, which causes eye strain during extended reading and a "halation" effect (bright text bleeding into surroundings) for users with astigmatism. Dark gray surfaces enable elevation communication through lightness variation (higher = lighter), which replaces shadows that are invisible on dark backgrounds.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What is the primary UX risk of anthropomorphizing AI interfaces (giving them names, avatars, and personalities)?',
    options: [
      'It makes the AI slower to respond',
      'Users may over-trust the AI and rely on it for decisions it is not qualified to make, because they perceive it as more capable than it actually is',
      'It violates data privacy regulations',
      'It increases the cost of running the AI model',
    ],
    answer: 1,
    explanation: 'When AI interfaces have human-like names, avatars, and conversational personalities, users unconsciously attribute human-level reasoning and reliability to them. This can lead to dangerous over-reliance: trusting medical advice from a chatbot, making financial decisions based on AI suggestions, or accepting AI-generated content without verification. Trust calibration -- clearly communicating AI limitations -- is essential.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is the biggest discoverability challenge with voice interfaces compared to graphical interfaces?',
    options: [
      'Voice interfaces cannot process complex commands',
      'There is no visible affordance for voice commands -- users cannot "see" what commands are available, unlike GUIs where options are displayed in menus and buttons',
      'Voice interfaces only work in quiet environments',
      'Voice interfaces require faster internet connections',
    ],
    answer: 1,
    explanation: 'Graphical interfaces show available actions through visible menus, buttons, and labels. Voice interfaces have no visual representation of available commands -- users must either know the commands from memory or guess. This discoverability problem means voice interfaces require explicit onboarding ("You can say..."), contextual suggestions, and fallback to visual alternatives.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
