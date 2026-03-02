export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Visual Encoding Principles
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'According to Cleveland and McGill\'s ranking, which visual channel is most accurately perceived for encoding quantitative data?',
    options: [
      'Color saturation',
      'Area/size',
      'Position along a common scale',
      'Angle/slope',
    ],
    answer: 2,
    explanation: 'Cleveland and McGill\'s empirical research (1984) established that position along a common scale is the most accurately perceived channel for quantitative data. The full ranking is: position on common scale > position on identical but non-aligned scales > length > angle/slope > area > volume > color saturation/density.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What does the "expressiveness principle" in visual encoding state?',
    options: [
      'Visualizations should be as colorful and expressive as possible to engage viewers',
      'A visual encoding should express all of, and only, the information in the data attributes being represented',
      'Charts should always use the most complex encoding available',
      'Every data attribute must be encoded with at least two visual channels for redundancy',
    ],
    answer: 1,
    explanation: 'The expressiveness principle states that an encoding is expressive if it conveys exactly the data relationships present — no more, no less. Using an ordered channel (like position) for nominal data violates expressiveness because it implies a false ordering. Using an unordered channel for ordinal data also violates it by hiding the ordering relationship.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'In Bertin\'s visual variables framework, which variable is the only one that is simultaneously selective, associative, ordered, and quantitative?',
    options: [
      'Color hue',
      'Shape',
      'Position',
      'Size',
    ],
    answer: 2,
    explanation: 'Position is the only visual variable in Bertin\'s framework that possesses all four properties: selective (can isolate), associative (can group), ordered (can rank), and quantitative (can measure differences). This makes position the most expressive and effective encoding, which is why the x and y axes of a chart are the most valuable real estate in any visualization.',
  },

  // Chapter 2: Perception & Cognition
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What is the "pop-out effect" in pre-attentive processing?',
    options: [
      'The tendency for users to click on the largest element first',
      'The ability to instantly detect a single distinctive feature (like a red dot among blue dots) regardless of the number of distractors',
      'The animation that occurs when hovering over a data point',
      'The tendency for 3D elements to appear to pop out of the screen',
    ],
    answer: 1,
    explanation: 'The pop-out effect occurs when a single pre-attentive feature (like color hue or orientation) differs from surrounding elements — it can be detected in under 250ms in O(1) time regardless of the number of distractors. This is why highlighting a single data point in a contrasting color draws immediate attention. However, the effect breaks down for conjunctions (e.g., searching for a red circle among red squares and blue circles).',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'Which Gestalt principle explains why elements connected by lines are perceived as related?',
    options: [
      'Proximity',
      'Similarity',
      'Connection',
      'Enclosure',
    ],
    answer: 2,
    explanation: 'The Gestalt principle of connection states that elements linked by lines or curves are perceived as related. This is why line charts imply continuity between data points — the connecting line suggests a relationship. This principle also explains why node-link diagrams work for network visualization: the edges (lines) visually establish the relationships between nodes.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'Why was the Viridis colormap chosen to replace the rainbow/jet colormap as matplotlib\'s default?',
    options: [
      'Viridis uses brighter colors that look better on modern displays',
      'Viridis is perceptually uniform, monotonically increasing in luminance, and readable by people with most forms of color vision deficiency',
      'Viridis uses fewer colors which reduces file size',
      'The rainbow colormap was patented and could no longer be used freely',
    ],
    answer: 1,
    explanation: 'Viridis was designed to be perceptually uniform (equal data steps produce equal perceived color differences), monotonically increasing in luminance (readable when printed in grayscale), and accessible to people with the most common forms of color vision deficiency. The rainbow/jet colormap fails all three criteria — it creates false perceptual boundaries, has non-monotonic luminance, and is unreadable by colorblind users.',
  },

  // Chapter 3: Data Types & Abstractions
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'Why is it problematic to connect nominal data points with lines in a chart?',
    options: [
      'Lines are too thin to be visible for nominal data',
      'Nominal data has no inherent order, so connecting lines imply a false sequence or interpolation between categories',
      'Lines can only represent numeric data',
      'Nominal data always requires 3D visualization',
    ],
    answer: 1,
    explanation: 'Nominal data (like product categories or country names) has no inherent order. Connecting such data with lines implies continuity and interpolation between categories — that there are meaningful values "between" categories — which is false. Bar charts or dot plots are appropriate for nominal data because they represent each category independently without implying a connection.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is the Modifiable Areal Unit Problem (MAUP) in spatial data visualization?',
    options: [
      'The problem of choosing the right map projection',
      'The issue of results changing depending on how geographic regions are defined — the same data aggregated by different boundaries shows different patterns',
      'The challenge of rendering maps on mobile screens',
      'The difficulty of converting between coordinate systems',
    ],
    answer: 1,
    explanation: 'The Modifiable Areal Unit Problem (MAUP) occurs because spatial patterns change depending on the boundaries used for aggregation. The same data aggregated by county vs. state vs. census tract can show completely different spatial patterns. This is a fundamental challenge in geographic visualization — the choice of boundaries is often arbitrary but can dramatically change the conclusions drawn from the data.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'Why is log transformation commonly used in data visualization?',
    options: [
      'It makes all data values positive',
      'It compresses skewed data spanning orders of magnitude, revealing patterns that linear scales would flatten into the baseline',
      'It encrypts sensitive data values',
      'It converts categorical data to numerical data',
    ],
    answer: 1,
    explanation: 'Log transformation is used when data spans several orders of magnitude (like income distributions or population sizes). On a linear scale, most values cluster near zero while a few extreme values dominate the range. A log scale spreads these values out, revealing patterns across the full range. Gapminder\'s bubble chart uses log-transformed GDP per capita on the x-axis for exactly this reason.',
  },

  // Chapter 4: Basic Chart Types
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'Why must bar charts always include a zero baseline?',
    options: [
      'Because plotting libraries require it as a technical constraint',
      'Because the visual length of bars represents magnitude ratios — starting above zero makes small differences appear disproportionately large',
      'To make the chart easier to print',
      'Because it is a legal requirement for published charts',
    ],
    answer: 1,
    explanation: 'Bar charts encode quantitative values as bar length, and viewers interpret length as proportional to the value. If the y-axis starts at 97 instead of 0, a bar representing 100 appears only 3 units tall while a bar representing 98 appears 1 unit tall — making 100 look three times larger than 98 when the actual difference is only 2%. This is one of the most common techniques for misleading visualizations.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the key advantage of small multiples over overlaid charts with multiple series?',
    options: [
      'Small multiples use less screen space',
      'Small multiples enable clean comparison across groups by eliminating visual interference between series, leveraging the viewer\'s ability to detect pattern changes across identical layouts',
      'Small multiples are faster to render in the browser',
      'Small multiples do not require axes or labels',
    ],
    answer: 1,
    explanation: 'Small multiples replace a single overloaded chart (e.g., 20 overlapping colored lines) with individual panels showing one group each. The identical layout across panels enables pre-attentive comparison — viewers can instantly detect which panels have different shapes without the visual interference of overlapping series. Edward Tufte called small multiples "the best design solution for a wide range of problems."',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'Why might a box plot fail to accurately represent certain data distributions?',
    options: [
      'Box plots can only display positive numbers',
      'Box plots show summary statistics (median, quartiles) but hide the actual distribution shape — a bimodal distribution looks identical to a uniform one',
      'Box plots require at least 1,000 data points to be accurate',
      'Box plots cannot handle outliers',
    ],
    answer: 1,
    explanation: 'Box plots compress data into five summary statistics (minimum, Q1, median, Q3, maximum) plus outliers. This means a bimodal distribution (two distinct peaks) appears identical to a uniform distribution in a box plot because both can have similar quartile values. Violin plots and strip plots (or raincloud plots combining both) address this by showing the actual distribution shape alongside summary statistics.',
  },

  // Chapter 5: Advanced Visualizations
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What algorithm improvement made treemaps more practical by producing more square-shaped rectangles?',
    options: [
      'The force-directed algorithm',
      'The squarified treemap algorithm by Bruls, Huizing, and van Wijk',
      'The Fruchterman-Reingold algorithm',
      'The Mercator projection algorithm',
    ],
    answer: 1,
    explanation: 'The squarified treemap algorithm (Bruls, Huizing, van Wijk, 2000) improved on Shneiderman\'s original slice-and-dice layout by optimizing for rectangles with aspect ratios close to 1:1 (squares). This is important because humans can compare square-shaped areas more accurately than long thin slivers, making the squarified version more effective for quantitative comparison.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'Why do force-directed network layouts produce different results each time they are run?',
    options: [
      'They use different data each time',
      'They are non-deterministic — different random initial positions lead to different local energy minima, producing different (but structurally similar) layouts',
      'They depend on the time of day',
      'They deliberately randomize the layout for aesthetic variety',
    ],
    answer: 1,
    explanation: 'Force-directed layouts simulate physical forces starting from random initial positions. The simulation converges to a local energy minimum that depends on the starting configuration. Different random seeds produce different layouts, though they typically preserve the same cluster structure. This non-determinism can be addressed by fixing the random seed or using deterministic initial positions.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What fundamental problem do choropleths have when visualizing data like election results or disease rates?',
    options: [
      'They cannot display more than 10 regions',
      'Large geographic areas dominate visual attention regardless of their population or data importance, potentially misleading viewers about the overall picture',
      'They only work with continuous data',
      'They require 3D rendering which is computationally expensive',
    ],
    answer: 1,
    explanation: 'Choropleths shade regions by data values, but large-area regions (like rural western US states) dominate the visual field even if they have small populations. In election maps, vast red rural counties make it look like one party won overwhelmingly, when in reality most votes are concentrated in small, densely-populated urban areas. Cartograms (which size regions by population) address this problem.',
  },

  // Chapter 6: Interactive Visualizations
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is "brushing and linking" in the context of interactive visualization?',
    options: [
      'A technique for cleaning data before visualization',
      'Selecting data in one view (brushing) and highlighting the same data items across all coordinated views (linking), revealing cross-variable relationships',
      'A method for drawing custom shapes on top of charts',
      'Connecting multiple dashboards via hyperlinks',
    ],
    answer: 1,
    explanation: 'Brushing and linking is a fundamental interaction technique for coordinated multiple views. When a user selects (brushes) data points in one view — for example, selecting a region in a scatter plot — the same data items are highlighted (linked) in all other coordinated views (bar chart, table, map). This enables discovery of relationships across different visual representations of the same data.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What is the difference between geometric zoom and semantic zoom?',
    options: [
      'Geometric zoom works on 2D data while semantic zoom works on 3D data',
      'Geometric zoom magnifies everything uniformly (like a magnifying glass) while semantic zoom changes what information is displayed at different zoom levels',
      'Geometric zoom is faster while semantic zoom produces higher quality output',
      'There is no difference — they are different names for the same technique',
    ],
    answer: 1,
    explanation: 'Geometric zoom scales all elements uniformly — text, marks, and spacing all grow proportionally, showing a smaller region in more detail. Semantic zoom changes the representation itself based on zoom level — like Google Maps showing continent names at one level and individual streets at another. Semantic zoom provides a richer experience but requires designing multiple representation levels and transitions between them.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What is Shneiderman\'s "Visual Information Seeking Mantra"?',
    options: [
      'Filter first, then visualize, then share',
      'Overview first, zoom and filter, then details-on-demand',
      'Start with details, then zoom out to see the big picture',
      'Always start with a table, then convert to a chart',
    ],
    answer: 1,
    explanation: 'Ben Shneiderman\'s mantra — "Overview first, zoom and filter, then details-on-demand" — describes the ideal interaction flow for visual exploration. Users start with a broad overview, narrow their focus through zooming and filtering, and finally inspect specific items for detailed information (via tooltips or drill-down). This pattern underlies the design of most successful interactive data visualization tools.',
  },

  // Chapter 7: D3.js
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is the purpose of D3\'s data() method in the selection pattern?',
    options: [
      'It fetches data from a remote API',
      'It performs a data join — matching array elements to DOM elements and separating them into enter (new), update (existing), and exit (removed) selections',
      'It validates the data format',
      'It converts data between JSON and CSV formats',
    ],
    answer: 1,
    explanation: 'D3\'s data() method joins an array of data to a selection of DOM elements. It produces three subselections: enter (data without matching DOM elements — new items that need to be created), update (data with matching DOM elements — items that may need updating), and exit (DOM elements without matching data — items that should be removed). This enter/update/exit pattern is core to D3\'s data-driven approach.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'Why are key functions important in D3 data joins for animated transitions?',
    options: [
      'They encrypt the data for security',
      'They enable object constancy — matching data items to DOM elements by identity rather than index ensures elements animate to the correct new positions when data is reordered, added, or removed',
      'They sort the data before binding',
      'They compress the data for faster rendering',
    ],
    answer: 1,
    explanation: 'Without key functions, D3 matches data to elements by index. If you sort the data array, element 0 gets the new first item (not the item it previously represented), causing visual elements to "jump" to wrong positions. Key functions (data(data, d => d.id)) match by identity, so each element tracks its data item across updates — this is called "object constancy" and is essential for meaningful animated transitions.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is the role of d3.scaleSqrt() in bubble chart design?',
    options: [
      'It makes the bubbles appear 3D',
      'It maps data values to circle radii such that the visual area scales linearly with the data value, because area = pi * r^2',
      'It creates a logarithmic scale for the x-axis',
      'It applies a square root transformation to the data for normalization',
    ],
    answer: 1,
    explanation: 'In bubble charts, humans perceive circle area (not radius) as representing magnitude. Since area = pi * r^2, if you map data linearly to radius, doubling the data value quadruples the visual area. scaleSqrt() takes the square root, ensuring that doubling the data value doubles the visual area — making the size encoding perceptually proportional to the data.',
  },

  // Chapter 8: Declarative Visualization
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What is the core idea behind the "Grammar of Graphics" paradigm?',
    options: [
      'Every chart must follow strict grammatical rules for labels and titles',
      'Visualizations are decomposed into independent components — data, aesthetic mappings, geometric objects, scales, coordinate systems, and facets — that can be combined compositionally',
      'Charts should only use text and no visual elements',
      'All charts must be generated from SQL queries',
    ],
    answer: 1,
    explanation: 'The Grammar of Graphics (Leland Wilkinson, 1999) decomposes visualizations into orthogonal components that can be freely combined: data sources, aesthetic mappings (which variables map to which visual properties), geometric objects (points, bars, lines), scales (how data values map to visual ranges), coordinate systems (Cartesian, polar), facets (small multiples), and statistical transforms. This compositional approach powers ggplot2, Vega-Lite, and Observable Plot.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What advantage does Vega-Lite\'s JSON specification format provide over programmatic charting APIs?',
    options: [
      'JSON is faster to render than JavaScript',
      'JSON specifications are language-agnostic — the same spec works from Python (Altair), R, JavaScript, or Julia — and can be compiled, validated, and optimized by tooling',
      'JSON files are smaller than JavaScript files',
      'JSON is required by web browsers for chart rendering',
    ],
    answer: 1,
    explanation: 'Vega-Lite\'s pure JSON format means the visualization specification is a data structure rather than executable code. This enables language-agnostic usage (Altair generates Vega-Lite from Python, VegaWidget from R), static analysis and validation, automatic optimization by the compiler, and serialization for storage and sharing. The compiler transforms concise JSON (10-50 lines) into complete rendering instructions (hundreds of lines).',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'How does ggplot2\'s layer-based composition work?',
    options: [
      'Layers are stacked vertically like a layered cake',
      'The + operator composes independent layers — each addition (geom, stat, facet, theme) contributes to the final plot without modifying existing layers',
      'Layers represent different color channels (red, green, blue)',
      'Each layer must contain a complete chart that is overlaid transparently',
    ],
    answer: 1,
    explanation: 'ggplot2 builds plots by adding layers with the + operator: ggplot(data, aes(x, y)) + geom_point() + geom_smooth() + facet_wrap(~category) + theme_minimal(). Each addition is an independent, composable component — geometric objects (geom_), statistical transforms (stat_), facets, scales, and themes. This compositional approach means any component can be swapped without affecting others, enabling rapid iteration.',
  },

  // Chapter 9: Dashboards & BI Tools
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'According to Stephen Few\'s dashboard design principles, why should key KPIs include more than just a current value?',
    options: [
      'To fill empty space on the dashboard',
      'A number alone is meaningless without context — KPIs should show current value, comparison to target/benchmark, trend direction, and change from the previous period',
      'To increase the visual complexity of the dashboard',
      'Because stakeholders prefer reading numbers over looking at charts',
    ],
    answer: 1,
    explanation: 'Stephen Few emphasizes that a standalone number like "Revenue: $5.2M" is meaningless without context. Is that good or bad? Above or below target? Increasing or decreasing? A well-designed KPI shows the current value ($5.2M), comparison to target (↑ 12% above plan), trend (sparkline showing 6-month trajectory), and period-over-period change (+8% vs last quarter) — enabling instant assessment without further investigation.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What distinguishes Grafana from Metabase and Superset in terms of primary use case?',
    options: [
      'Grafana is the only one that supports SQL',
      'Grafana excels at real-time time-series monitoring and alerting, while Metabase targets business analytics for non-technical users and Superset offers advanced SQL-based exploration',
      'Grafana is commercial while the others are open-source',
      'Grafana only works with cloud data sources',
    ],
    answer: 1,
    explanation: 'Grafana\'s core strength is real-time time-series visualization with 150+ data source plugins (Prometheus, InfluxDB, CloudWatch), auto-refresh, and alerting — making it the standard for DevOps/infrastructure monitoring. Metabase focuses on self-service business analytics with a no-SQL-required interface. Superset provides the most visualization types and SQL flexibility for data teams. Each tool has a distinct primary audience and use case.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'Why do real-time dashboards typically use Canvas or WebGL rendering instead of SVG?',
    options: [
      'SVG does not support colors needed for real-time data',
      'Appending data points every 100ms requires efficient rendering — Canvas/WebGL draw pixels without creating DOM nodes, avoiding the layout and paint costs that make SVG sluggish for frequent updates',
      'Real-time data can only be transmitted to Canvas elements',
      'SVG does not support WebSocket connections',
    ],
    answer: 1,
    explanation: 'SVG creates a DOM node for every visual element, and each update triggers browser layout and paint cycles. For real-time dashboards updating every 100ms-1s, this DOM overhead causes jank above ~5,000 elements. Canvas and WebGL draw directly to a pixel buffer without persistent DOM nodes, enabling efficient rendering of frequently updating charts with thousands of data points at smooth frame rates.',
  },

  // Chapter 10: Web Visualization Stack
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'At approximately how many elements does SVG rendering typically become too slow for smooth interaction?',
    options: [
      '100 elements',
      '500 elements',
      '5,000 elements',
      '1 million elements',
    ],
    answer: 2,
    explanation: 'SVG performance degrades noticeably around 5,000 DOM elements because the browser must track each element for layout, painting, event handling, and accessibility. Beyond this threshold, Canvas (which handles 10K-100K elements efficiently) or WebGL (which handles millions of points via GPU acceleration) becomes necessary. The exact threshold depends on the complexity of each SVG element and the browser.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'What differentiates visx from higher-level React charting libraries like Recharts?',
    options: [
      'visx only works with TypeScript while Recharts uses JavaScript',
      'visx provides React-wrapped D3 primitives (scales, shapes, axes) for building custom charts from scratch, while Recharts provides pre-built chart components with less customization',
      'visx renders to Canvas while Recharts renders to SVG',
      'visx requires a paid license while Recharts is free',
    ],
    answer: 1,
    explanation: 'visx (by Airbnb) takes a lower-level approach — it wraps D3 primitives (scales, shapes, axes, curves) in React components, giving developers fine-grained control to build custom visualizations while staying in the React paradigm. Recharts provides higher-level chart components (<LineChart>, <BarChart>) that are easier to use but harder to customize beyond their built-in capabilities. visx is best for design-system-level charting infrastructure.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'Why is simply resizing a chart insufficient for true responsive visualization design?',
    options: [
      'Charts cannot be resized at all on mobile devices',
      'Responsive visualization also requires adapting interaction models (hover to tap), reducing information density, abbreviating labels, and potentially changing chart types for smaller screens',
      'Mobile browsers do not support data visualization',
      'Resizing always makes text unreadable',
    ],
    answer: 1,
    explanation: 'True responsive visualization requires more than width adjustment. Mobile screens need: touch-optimized interactions (tap instead of hover, larger hit targets), reduced information density (fewer series, simplified axes), abbreviated labels, different aspect ratios, and sometimes entirely different chart types (sparklines instead of full charts). The Financial Times produces separate chart versions for different breakpoints for this reason.',
  },

  // Chapter 11: Data Storytelling
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What is the "martini glass" model of data storytelling?',
    options: [
      'A type of chart shaped like a martini glass',
      'Starting with a narrow author-guided narrative (the stem), presenting the key insight, then opening into free reader-driven exploration (the bowl)',
      'A method for presenting data at cocktail parties',
      'A three-step process: stir data, pour into chart, garnish with labels',
    ],
    answer: 1,
    explanation: 'The martini glass model (Segel and Heer, 2010) combines author-driven and reader-driven approaches. The story begins with a narrow, guided narrative (the stem) that walks the reader through key insights in a controlled sequence. After establishing the main message, it opens into free exploration (the bowl) where readers can filter, sort, and explore the data independently. This balances message clarity with audience engagement.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is the "sticky graphic" pattern in scrollytelling?',
    options: [
      'A chart that cannot be moved by the user',
      'A visualization fixed in place while text sections scroll past it — each text section triggers a different visualization state, and the reader controls pacing by scrolling',
      'A graphic that follows the mouse cursor',
      'A chart embedded in a sticky note widget',
    ],
    answer: 1,
    explanation: 'The sticky graphic pattern uses CSS position:sticky (or JavaScript equivalent) to fix the visualization in place while narrative text scrolls alongside or over it. As each text section enters the viewport, it triggers an update to the visualization (new data highlights, annotations appearing, axis changes). This creates a tight coupling between narrative text and visual state, with the reader controlling pacing through scroll speed.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'Why are annotations considered the primary tool for transforming a raw chart into a data story?',
    options: [
      'Annotations make charts larger and more impressive',
      'They add context, explanation, and emphasis — directing the viewer\'s attention to specific data points and explaining their significance, which a raw chart with only axes and data cannot convey',
      'Annotations are required by data visualization standards',
      'Without annotations, charts cannot be displayed in web browsers',
    ],
    answer: 1,
    explanation: 'A raw chart shows data but does not tell a story. Annotations bridge this gap by: directly labeling important data points (reducing legend lookup), highlighting events or trends with call-outs ("sales dropped 40% when the pandemic started"), providing reference lines for context (industry average), and guiding the viewer\'s reading order. The Economist and NYT style guides mandate annotations as essential editorial elements.',
  },

  // Chapter 12: Accessibility in Visualization
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What makes good alt text for a data visualization, according to accessibility best practices?',
    options: [
      '"Bar chart" — describing the chart type is sufficient',
      'A description of the data insight (e.g., "Sales increased 45% from Q1 to Q4, driven primarily by the enterprise segment") rather than just the chart format',
      'A complete transcript of all data values in the chart',
      'The URL where the original data can be downloaded',
    ],
    answer: 1,
    explanation: 'Alt text for charts should convey the insight that a sighted person would perceive, not just describe the chart format. "Bar chart showing sales" tells a screen reader user nothing about the data. "Sales increased 45% from Q1 to Q4, driven primarily by the enterprise segment" communicates the same insight a sighted user would get from the visualization. WCAG 2.1 Success Criterion 1.1.1 requires meaningful text alternatives for all non-text content.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is the most common form of color vision deficiency that visualization designers must account for?',
    options: [
      'Tritanopia (blue-yellow blindness)',
      'Deuteranomaly (red-green weakness, affecting ~5% of males)',
      'Achromatopsia (complete color blindness)',
      'Protanopia (red blindness)',
    ],
    answer: 1,
    explanation: 'Deuteranomaly (weakened green cone sensitivity) affects approximately 5% of males and is the most common form of color vision deficiency overall. Combined with other red-green deficiencies (protanopia ~1%, deuteranopia ~1%, protanomaly ~1%), about 8% of males have some form of CVD. This is why red-green color encodings are unreliable without redundant visual cues like shape, pattern, or direct labels.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'How does sonification make data accessible to blind users?',
    options: [
      'It converts charts to spoken descriptions using text-to-speech',
      'It maps data values to audio properties like pitch, volume, and tempo — enabling users to perceive trends, outliers, and distributions through sound',
      'It adds click sounds when navigating between data points',
      'It plays background music that changes based on the data theme',
    ],
    answer: 1,
    explanation: 'Sonification maps data to audio properties: high values become high pitches, loud volumes, or fast tempos. Users can "play" a line chart and hear the pitch rise and fall with the data values, perceiving trends and outliers through sound. The Highcharts Sonification Module implements this, allowing any chart to be experienced auditorily. Different data series can use different instruments for multi-series comparison.',
  },

  // Chapter 13: Ethics & Misleading Visualizations
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What is the "lie factor" as defined by Edward Tufte?',
    options: [
      'The percentage of charts in a publication that contain errors',
      'The ratio of the size of effect shown in the graphic to the size of effect in the data — values above 1.0 exaggerate, below 1.0 understate',
      'The number of lies per chart',
      'A measure of how often a chart is shared on social media',
    ],
    answer: 1,
    explanation: 'Tufte\'s lie factor = (size of effect shown in graphic) / (size of effect in data). A lie factor of 1.0 means the graphic faithfully represents the data. A factor of 2.5 means the graphic exaggerates the effect by 2.5x. Common causes of high lie factors include truncated axes, distorted 3D effects, and non-proportional area encodings. Tufte argued that lie factors above 1.05 or below 0.95 are deceptive.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'Why did research by Bateman et al. (2010) complicate Tufte\'s stance on chart junk?',
    options: [
      'They proved chart junk increases data accuracy',
      'They found that embellished charts (with "chart junk") were more memorable than minimalist charts, challenging the assumption that removing decoration is always better',
      'They showed that Tufte\'s books contained chart junk',
      'They demonstrated that readers prefer 3D charts',
    ],
    answer: 1,
    explanation: 'Bateman et al. (2010) conducted an experiment comparing minimalist Tufte-style charts to Nigel Holmes-style embellished charts (with illustrations and decoration). They found that the embellished versions were significantly more memorable over time while not significantly less accurate for reading values. This complicated the simple prescription to always minimize non-data ink, suggesting that engagement and memorability are legitimate design goals alongside accuracy.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What does "responsible visualization" require beyond avoiding deliberate deception?',
    options: [
      'Only using open-source visualization tools',
      'Actively showing uncertainty, acknowledging data limitations, representing people fairly, crediting sources, and considering potential downstream harms of visualization choices',
      'Publishing all visualizations in peer-reviewed journals',
      'Getting legal approval before creating any chart',
    ],
    answer: 1,
    explanation: 'Responsible visualization is proactive, not just the absence of deception. It requires: showing uncertainty (confidence intervals, error bars), acknowledging data limitations (sample sizes, biases, missing data), representing people fairly (respectful categories, considering whether disaggregation enables discrimination), crediting sources and methodology for reproducibility, and applying the "do no harm" principle by considering how visualizations might reinforce bias or cause panic.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
