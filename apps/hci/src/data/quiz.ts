export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: HCI Principles & History
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'What event catalyzed the field of human factors engineering and shifted the blame from "user error" to design flaws?',
    options: [
      'The invention of the personal computer',
      'Poorly designed cockpit controls in WWII that led to pilot errors',
      'The release of the Apple Macintosh',
      'The dot-com bubble of the late 1990s',
    ],
    answer: 1,
    explanation: 'Human factors engineering as a discipline was catalyzed by WWII when analysis of pilot errors revealed that confusing cockpit control layouts — not pilot incompetence — were the root cause of accidents. This shifted the design philosophy from blaming users to designing for human capabilities and limitations.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'Which three properties define Ben Shneiderman\'s concept of "direct manipulation"?',
    options: [
      'Speed, accuracy, and error tolerance',
      'Continuous representation of objects, physical actions instead of complex syntax, and rapid incremental reversible operations',
      'Windows, icons, and menus',
      'Visibility, feedback, and constraints',
    ],
    answer: 1,
    explanation: 'Shneiderman defined direct manipulation (1983) as having three key properties: (1) continuous representation of the objects and actions of interest, (2) physical actions or labeled button presses instead of complex syntax, and (3) rapid, incremental, reversible operations whose impact on the object of interest is immediately visible.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'According to Nielsen, how many evaluators are typically needed for a heuristic evaluation to find approximately 75% of usability problems?',
    options: [
      '1 evaluator',
      '3 to 5 evaluators',
      '10 to 15 evaluators',
      '20 or more evaluators',
    ],
    answer: 1,
    explanation: 'Nielsen\'s research showed that 3 to 5 evaluators independently inspecting an interface against the heuristics typically find about 75% of usability problems. Adding more evaluators yields diminishing returns, while a single evaluator finds only about 35% of issues. This makes heuristic evaluation a "discount usability method."',
  },

  // Chapter 2: Cognitive Psychology for HCI
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'In cognitive load theory, which type of cognitive load should interface designers minimize?',
    options: [
      'Intrinsic load (inherent task complexity)',
      'Germane load (effort devoted to learning)',
      'Extraneous load (caused by poor design)',
      'All three types should be minimized equally',
    ],
    answer: 2,
    explanation: 'Extraneous cognitive load is caused by poor instructional or interface design — it adds mental effort without contributing to the task or learning. Intrinsic load is inherent to the task itself and cannot be reduced without simplifying the task. Germane load represents useful effort devoted to schema formation and learning, which should be preserved or encouraged.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'Why do GUIs with menus and toolbars tend to be more learnable than command-line interfaces for novice users?',
    options: [
      'GUIs are faster to use than CLIs',
      'GUIs leverage recognition memory (seeing options triggers recall), while CLIs require recall memory (retrieving commands from memory without cues)',
      'GUIs use less computer memory than CLIs',
      'GUIs were invented more recently and are therefore better designed',
    ],
    answer: 1,
    explanation: 'Recognition memory is significantly stronger than recall memory. GUIs present available options visually (menus, buttons, icons), allowing users to recognize the correct action from visible choices. CLIs require users to recall the exact command syntax from memory without any visual cues, placing a much higher memory burden on novice users.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What is the "Gulf of Execution" in Don Norman\'s interaction model?',
    options: [
      'The time delay between a user action and the system response',
      'The gap between the user\'s goal and the actions available in the interface to achieve that goal',
      'The physical distance between the user and the computer screen',
      'The difference between the system\'s actual state and its displayed state',
    ],
    answer: 1,
    explanation: 'Norman\'s Gulf of Execution is the gap between a user\'s intention (what they want to accomplish) and the actions the interface makes available. A wide gulf means users struggle to figure out how to make the system do what they want. Good design narrows this gulf by making available actions visible, logical, and aligned with user goals.',
  },

  // Chapter 3: Input & Interaction Paradigms
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'According to Fitts\'s law, why are targets placed at screen edges and corners particularly fast to acquire?',
    options: [
      'Because the screen is brighter at the edges',
      'Because the cursor stops at the screen boundary, giving edge/corner targets effectively infinite width',
      'Because users\' eyes are naturally drawn to screen edges',
      'Because monitors have higher resolution at the edges',
    ],
    answer: 1,
    explanation: 'Fitts\'s law states that movement time depends on the ratio of distance to target width. Screen edges and corners act as walls where the cursor stops, meaning the user can overshoot without penalty — the effective target width becomes infinite in the constrained direction(s). This is why macOS puts the menu bar at the top edge and why corner-positioned targets are fastest to acquire.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is the "fat finger problem" in touch interface design?',
    options: [
      'Touch screens cannot detect fingers larger than a certain size',
      'The finger\'s contact area (~7mm) provides inherently lower pointing precision than a mouse cursor, requiring larger touch targets',
      'Users with large fingers cannot use smartphones at all',
      'Touch screens wear out faster when pressed with larger fingers',
    ],
    answer: 1,
    explanation: 'The fat finger problem refers to the inherent imprecision of finger-based touch input — a fingertip covers approximately 7mm of screen area, making it impossible to precisely target small elements. This is why Apple recommends minimum touch targets of 44x44 points and why mobile interfaces require larger interactive elements than desktop interfaces.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What is the "Midas touch problem" in gaze-based and gesture-based interfaces?',
    options: [
      'Everything the user touches turns to gold on screen',
      'The system cannot distinguish between looking/pointing for input versus casual observation',
      'The interface becomes more expensive the more the user interacts with it',
      'Users become addicted to gaze-based interaction',
    ],
    answer: 1,
    explanation: 'The Midas touch problem occurs when the input modality (gaze or gesture) is the same as a natural behavior. Users constantly look at things and move their hands, but the system cannot tell when a look or gesture is an intentional command versus passive observation. Solutions include dwell time (look for 500ms to select), explicit confirmation gestures, or multimodal activation (look + blink/voice).',
  },

  // Chapter 4: User-Centered Design
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'In design thinking, what is the purpose of the "divergent thinking" phase during ideation?',
    options: [
      'To quickly narrow down to the single best solution',
      'To generate as many ideas as possible without judgment before selecting and refining the best ones',
      'To evaluate existing products against usability heuristics',
      'To conduct user interviews and contextual inquiry',
    ],
    answer: 1,
    explanation: 'Divergent thinking is about quantity over quality — generating as many ideas as possible without premature judgment or criticism. Rules include deferring judgment, encouraging wild ideas, building on others\' ideas, and going for quantity. Only after the divergent phase does convergent thinking begin, where ideas are evaluated, combined, and refined into viable solutions.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What is the key principle behind "minimum viable prototype"?',
    options: [
      'Always build the cheapest possible prototype',
      'Use the lowest fidelity prototype that can test the current design hypothesis',
      'Only test prototypes with the minimum number of users',
      'Build the prototype with the minimum amount of code',
    ],
    answer: 1,
    explanation: 'The minimum viable prototype principle states that designers should use the lowest fidelity representation that is sufficient to test their current hypothesis. Testing whether a navigation structure makes sense does not require pixel-perfect visuals — a paper prototype suffices. This saves time and resources while still generating valid user feedback for the specific question being investigated.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'Where did participatory design originate, and what was its motivation?',
    options: [
      'Silicon Valley, to speed up software development',
      'Scandinavia in the 1970s, when labor unions demanded workers have a voice in the design of workplace computer systems',
      'Japan, as part of the lean manufacturing movement',
      'MIT Media Lab, to research new interaction paradigms',
    ],
    answer: 1,
    explanation: 'Participatory design emerged in 1970s Scandinavia when labor unions argued that workers should have democratic input into the design of computer systems that would fundamentally change their work practices. It is inherently political and values-driven, recognizing that users possess essential domain knowledge that designers lack.',
  },

  // Chapter 5: Evaluation Methods
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What is the key difference between concurrent and retrospective think-aloud protocols?',
    options: [
      'Concurrent uses video while retrospective uses audio only',
      'Concurrent has users verbalize during the task (may alter behavior), while retrospective has them narrate after watching a replay (may suffer recall errors)',
      'Concurrent is for experts while retrospective is for novices',
      'Concurrent evaluates desktop software while retrospective evaluates mobile apps',
    ],
    answer: 1,
    explanation: 'In concurrent think-aloud, participants verbalize their thoughts in real-time while performing tasks, revealing immediate reasoning but potentially altering their natural behavior and slowing them down. In retrospective think-aloud, participants first perform the task naturally, then watch a video replay and verbalize what they were thinking at each point — preserving natural behavior but relying on potentially inaccurate memory.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What does a SUS (System Usability Scale) score of 68 represent?',
    options: [
      'An excellent, top-tier usability score',
      'The average score across hundreds of studies — roughly the boundary between "marginal" and "acceptable" usability',
      'A failing score indicating the system is unusable',
      'The maximum possible score on the SUS scale',
    ],
    answer: 1,
    explanation: 'Based on Jeff Sauro\'s meta-analysis of over 500 studies, a SUS score of 68 is approximately average. Scores below 51 are considered unacceptable (F grade), 51-68 is marginal (D), 68 is the mean, above 80.3 is good (A), and above 90 is exceptional. SUS provides a quick, validated benchmark but cannot identify specific usability problems.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What do eye-tracking heat maps reveal about user behavior?',
    options: [
      'The exact content users are thinking about',
      'The distribution of visual attention across an interface — areas of intense fixation indicate processing effort, interest, or confusion',
      'The temperature of the user\'s eyes during interaction',
      'How quickly users can read text on the screen',
    ],
    answer: 1,
    explanation: 'Eye-tracking heat maps aggregate fixation data across multiple participants to show where visual attention concentrates. Areas with intense fixations (hot spots) indicate that users are processing that content — which could mean interest, comprehension effort, or confusion. Conversely, areas with no fixations may indicate that content is invisible or irrelevant to users.',
  },

  // Chapter 6: Accessibility & Universal Design
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'In Microsoft\'s inclusive design framework, what are the three categories of disability?',
    options: [
      'Visual, auditory, and motor',
      'Permanent, temporary, and situational',
      'Mild, moderate, and severe',
      'Physical, cognitive, and emotional',
    ],
    answer: 1,
    explanation: 'Microsoft\'s inclusive design framework categorizes disabilities as permanent (e.g., blind), temporary (e.g., eye infection), and situational (e.g., driving in bright sunlight). This perspective broadens the audience for accessible design — a solution designed for a one-armed person (permanent) also helps someone holding a baby (situational) or someone with a broken arm (temporary).',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What does the WCAG acronym "POUR" stand for?',
    options: [
      'Practical, Obvious, Uniform, Responsive',
      'Perceivable, Operable, Understandable, Robust',
      'Pretty, Organized, Usable, Reliable',
      'Public, Open, Universal, Readable',
    ],
    answer: 1,
    explanation: 'WCAG is organized around four principles: Perceivable (information must be presentable in ways users can perceive), Operable (UI components must be operable by all users), Understandable (information and operation must be understandable), and Robust (content must be interpretable by diverse user agents, including assistive technologies).',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'What is the "Curb Cut Effect" and why is it significant for universal design?',
    options: [
      'A method for cutting costs in accessibility implementation',
      'The phenomenon where design features created for people with disabilities end up benefiting everyone — like sidewalk curb cuts helping wheelchair users, parents with strollers, and delivery workers',
      'A technique for reducing the complexity of user interfaces',
      'A design pattern for mobile navigation menus',
    ],
    answer: 1,
    explanation: 'The Curb Cut Effect describes how accessibility improvements originally designed for people with disabilities provide benefits to the broader population. Sidewalk curb cuts were mandated for wheelchair users but are now used by people with strollers, luggage, bicycles, and delivery carts. Similarly, closed captions help deaf users but also benefit viewers in noisy environments, language learners, and those who simply prefer reading.',
  },

  // Chapter 7: Virtual & Augmented Reality
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is the "vergence-accommodation conflict" in current VR headsets?',
    options: [
      'A conflict between left-eye and right-eye displays showing different images',
      'The mismatch between the eyes converging at different depths while the display is at a fixed focal distance, causing visual fatigue',
      'A manufacturing defect where lenses are misaligned',
      'The conflict between wireless and wired VR connection modes',
    ],
    answer: 1,
    explanation: 'In natural vision, the eyes both converge (point toward) and accommodate (focus on) the same distance. Current VR HMDs display all content at a fixed focal distance (typically ~2 meters), but stereoscopic rendering makes objects appear at various depths, causing the eyes to converge at one distance while focusing at another. This mismatch causes visual fatigue, headaches, and is a major unsolved challenge in VR display technology.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'Why does teleportation locomotion reduce cybersickness compared to smooth locomotion in VR?',
    options: [
      'Teleportation uses less computing power, resulting in higher frame rates',
      'Teleportation eliminates the sensory conflict — there is no visual motion to conflict with the stationary vestibular system because the transition is instantaneous',
      'Teleportation keeps the user\'s body physically still',
      'Teleportation only works in high-end headsets with better displays',
    ],
    answer: 1,
    explanation: 'Cybersickness primarily results from sensory conflict between the visual system (which perceives motion) and the vestibular system (which does not). Teleportation eliminates this conflict by making transitions instantaneous — there is no period of visual motion without corresponding physical motion. Smooth locomotion creates sustained visual vection (perceived self-motion) that directly conflicts with vestibular stillness.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is the difference between "diegetic" and "non-diegetic" UI in VR?',
    options: [
      'Diegetic UI uses text while non-diegetic uses icons',
      'Diegetic UI exists within the virtual world (e.g., a virtual wristwatch), while non-diegetic UI floats outside it as a HUD overlay that breaks the fourth wall',
      'Diegetic UI is for gaming while non-diegetic is for productivity',
      'Diegetic UI requires controllers while non-diegetic uses hand tracking',
    ],
    answer: 1,
    explanation: 'Diegetic UI elements exist as objects within the virtual world — a health indicator on a character\'s in-world wristwatch, or a map displayed on an in-game tablet. Non-diegetic UI elements float in the user\'s view as a heads-up display (HUD) that is not part of the virtual environment. Diegetic UI maintains immersion but is harder to access, while non-diegetic UI breaks the fourth wall but provides constant, easy access to information.',
  },

  // Chapter 8: Voice & Conversational UI
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'What is the primary challenge that accent and dialect variation poses for speech recognition systems?',
    options: [
      'Users with accents speak too quickly for the system to process',
      'ASR systems trained predominantly on standard dialects systematically underperform for speakers of non-standard varieties, creating inequitable access',
      'Accented speech requires more expensive microphones to capture',
      'Dialect variation only affects text-to-speech output, not recognition',
    ],
    answer: 1,
    explanation: 'Speech recognition systems are trained on audio datasets that over-represent standard dialects (typically American or British English). Speakers with regional accents, non-native pronunciation, or code-switching between languages experience significantly higher word error rates. This creates a systemic equity issue where voice technology works better for dominant language groups.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What is the "discoverability problem" unique to voice interfaces?',
    options: [
      'Voice interfaces are hard to find in app stores',
      'Unlike GUIs where users can see available options, voice users have no visual indication of what commands the system supports and must guess',
      'Voice interfaces cannot be discovered by search engines',
      'Users forget that voice interfaces exist on their devices',
    ],
    answer: 1,
    explanation: 'Voice interfaces lack the visual affordances of GUIs. A menu, toolbar, or button communicates its available actions simply by being visible. Voice users face the "what can I say?" problem — they must either guess what commands are supported, ask for help (and listen to a serial list), or consult external documentation. This fundamentally limits the discoverability of voice interface capabilities.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'Why do many voice-enabled devices now include screens (like Amazon Echo Show)?',
    options: [
      'To display advertisements',
      'To solve the linearity and discoverability problems — voice output is sequential (one item at a time), while screens enable parallel scanning of results and visible command suggestions',
      'To compete with tablet computers',
      'Because speech recognition is not accurate enough on its own',
    ],
    answer: 1,
    explanation: 'Voice output is inherently linear — presenting 20 restaurant options one at a time is impractical. Adding a screen solves this by showing visual lists that can be scanned in parallel. Screens also help with discoverability by showing suggested commands and categories. This multimodal approach combines voice input (hands-free convenience) with visual output (information density), though it partially undermines the original hands-free benefit.',
  },

  // Chapter 9: Tangible & Embodied Interaction
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'What was Hiroshi Ishii\'s "Tangible Bits" vision at MIT Media Lab?',
    options: [
      'Building smaller and faster computer chips',
      'Coupling bits (digital information) and atoms (physical objects) so that users can manipulate data by grasping and moving physical objects',
      'Creating a new programming language for robotics',
      'Developing higher-resolution display technologies',
    ],
    answer: 1,
    explanation: 'Ishii\'s Tangible Bits vision (1997) proposed bridging the gap between cyberspace and the physical world by giving digital information physical form. Physical objects serve as both input devices and output representations of digital data. Users interact with information through familiar physical manipulation skills (grasping, moving, rotating) rather than abstract mouse clicks.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What are the key design principles for wearable computing as defined by Thad Starner?',
    options: [
      'Fast processing, large storage, and wireless connectivity',
      'Always on and accessible, hands-free, non-monopolizing of attention, and context-aware',
      'Waterproof, shockproof, and dustproof',
      'Fashionable, lightweight, and colorful',
    ],
    answer: 1,
    explanation: 'Starner\'s principles define wearable computing as: (1) always on and always accessible (no boot-up delay), (2) the user\'s hands are free for other tasks, (3) input/output does not monopolize the user\'s attention (augments rather than replaces awareness), and (4) the device is aware of the user\'s context (activity, location, social situation) to provide proactive, relevant information.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'Why is vibrotactile feedback widely deployed in consumer devices despite its limitations?',
    options: [
      'Because it is the only form of haptic feedback that exists',
      'Because vibration motors are inexpensive, small, and energy-efficient, even though users can only distinguish 5-7 distinct vibration patterns',
      'Because vibrotactile feedback provides the most realistic haptic experience',
      'Because regulatory standards require it in all mobile devices',
    ],
    answer: 1,
    explanation: 'Vibrotactile feedback using eccentric rotating mass (ERM) motors or linear resonant actuators (LRA) is cheap, compact, and low-power — practical for every smartphone, smartwatch, and game controller. However, the information bandwidth is limited — most users can reliably distinguish only 5-7 distinct vibration patterns. This makes it useful for simple confirmations and notifications but insufficient for conveying complex tactile information.',
  },

  // Chapter 10: Brain-Computer Interfaces
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'Why is the signal-to-noise ratio a fundamental challenge for scalp EEG-based brain-computer interfaces?',
    options: [
      'Because EEG equipment is too expensive for most labs',
      'Because brain signals measured at the scalp are in the microvolt range while muscle artifacts, electrode noise, and environmental interference are orders of magnitude larger',
      'Because the skull amplifies brain signals to dangerous levels',
      'Because EEG can only measure signals during sleep',
    ],
    answer: 1,
    explanation: 'Scalp EEG detects brain signals at the microvolt level (1-100 microvolts), but these signals must pass through cerebrospinal fluid, skull bone, and skin — each layer attenuating and blurring the signal. Meanwhile, muscle artifacts (especially eye movements and jaw clenching), electrode impedance fluctuations, and 50/60 Hz power line noise can be millivolts — 1000x stronger than the target signals.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'Which BCI paradigm achieves the highest information transfer rate and why?',
    options: [
      'Motor imagery, because it requires no external stimuli',
      'SSVEP (Steady-State Visual Evoked Potential), because it produces strong, easily detectable frequency-tagged responses in the visual cortex, achieving 100+ bits/minute',
      'P300, because the brain response is very large and easy to detect',
      'All paradigms achieve approximately the same transfer rate',
    ],
    answer: 1,
    explanation: 'SSVEP-based BCIs achieve the highest information transfer rates (100+ bits/min) because flickering visual stimuli produce strong, frequency-locked responses in the occipital cortex. The signal is periodic and predictable, making it easier to detect with spectral analysis. P300 achieves 20-40 bits/min and motor imagery only 10-25 bits/min due to weaker, more variable signals.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is "BCI illiteracy" and what percentage of users does it affect?',
    options: [
      'Users who cannot read instructions for BCI devices; affects less than 1%',
      'The phenomenon where 15-30% of users cannot achieve reliable brain-computer interface control, particularly with motor imagery paradigms, despite extensive training',
      'Users who are unable to understand how BCIs work conceptually; affects about 50%',
      'A term for the learning curve that all BCI users experience in the first hour',
    ],
    answer: 1,
    explanation: 'BCI illiteracy (also called BCI inefficiency) describes the significant minority of users (15-30%) who cannot produce reliably classifiable brain signals for motor imagery-based BCIs, even after weeks of training. The reasons are not fully understood but relate to individual differences in cortical activation patterns. This is a major challenge for universal BCI adoption.',
  },

  // Chapter 11: Collaborative & Social Computing
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What does the CSCW time-space matrix classify?',
    options: [
      'The physical size of computer displays used for collaboration',
      'Groupware systems by whether interaction is synchronous/asynchronous and co-located/distributed',
      'The number of users who can simultaneously access a shared document',
      'The speed of network connections required for collaboration tools',
    ],
    answer: 1,
    explanation: 'The CSCW time-space matrix classifies collaborative tools along two dimensions: time (synchronous = same time, asynchronous = different times) and place (co-located = same place, distributed = different places). This creates four quadrants: same-time/same-place (smart meeting rooms), same-time/different-place (video conferencing), different-time/same-place (shared displays), and different-time/different-place (email, wikis).',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What is "Zoom fatigue" and what causes it?',
    options: [
      'Physical exhaustion from carrying a laptop to video meetings',
      'Video conferencing fatigue caused by excessive close-up eye contact, self-view anxiety, reduced mobility, cognitive overload from 2D non-verbal cue interpretation, and the mirror effect',
      'Boredom from attending too many meetings regardless of format',
      'A software bug that causes Zoom to crash after extended use',
    ],
    answer: 1,
    explanation: 'Stanford researchers identified multiple causes of Zoom fatigue: (1) prolonged close-up eye contact at unnatural intensity, (2) constant awareness of one\'s own face (self-view), (3) dramatically reduced mobility compared to in-person meetings, (4) cognitive overload from consciously interpreting non-verbal cues on a 2D grid, and (5) the mirror effect of seeing oneself continuously, which triggers self-evaluation.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What does the Allen curve demonstrate about team communication?',
    options: [
      'That remote teams communicate more effectively than co-located teams',
      'That co-located teams communicate approximately 4x more frequently than distributed teams, with communication dropping sharply beyond 30 meters of physical separation',
      'That email is the most effective communication channel for all teams',
      'That team size has no effect on communication frequency',
    ],
    answer: 1,
    explanation: 'Thomas Allen\'s research at MIT showed that the probability of communication between two people drops dramatically with physical distance — people more than 30 meters apart communicate no more frequently than those in different buildings. Co-located teams communicate roughly 4x more than distributed teams, largely through spontaneous hallway encounters. Remote collaboration tools must actively compensate for this proximity effect.',
  },

  // Chapter 12: Persuasive Technology & Ethics
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is "confirmshaming" as a dark pattern?',
    options: [
      'Shaming users who make incorrect selections in a quiz',
      'Using guilt-inducing language on decline buttons (e.g., "No thanks, I don\'t want to save money") to pressure users into accepting offers',
      'Displaying error messages that blame the user for system failures',
      'Requiring users to confirm their age before accessing content',
    ],
    answer: 1,
    explanation: 'Confirmshaming is a dark pattern where the option to decline an offer uses emotionally manipulative language designed to make the user feel foolish, guilty, or irresponsible for refusing. Examples include "No, I don\'t like saving money" or "I\'ll pay full price." It exploits emotional responses to bypass rational decision-making, pressuring users into conversions they would not otherwise make.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'Why is the "default effect" considered the most powerful nudge in behavioral design?',
    options: [
      'Because defaults are enforced by law and cannot be changed',
      'Because users overwhelmingly accept default settings due to effort avoidance, implied recommendation, and loss aversion — making the default the most influential design choice',
      'Because defaults are always set to the most ethical option',
      'Because changing defaults requires administrator privileges',
    ],
    answer: 1,
    explanation: 'Research consistently shows that the vast majority of users (often 90%+) accept default settings regardless of their preferences. This happens because changing defaults requires effort (status quo bias), defaults are perceived as implicit recommendations from the designer, and changing a default can feel like potential loss. This makes the choice of default one of the most powerful tools in choice architecture.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What is Value Sensitive Design (VSD) and how does it differ from standard UCD?',
    options: [
      'VSD focuses on the monetary value of a product while UCD focuses on usability',
      'VSD systematically accounts for human values (autonomy, privacy, fairness, trust) throughout the design process, going beyond UCD\'s focus on usability and task completion',
      'VSD is used only for government projects while UCD is for commercial products',
      'VSD and UCD are the same methodology with different names',
    ],
    answer: 1,
    explanation: 'Value Sensitive Design (Friedman & Hendry) extends beyond user-centered design\'s focus on usability and task completion to systematically consider broader human values throughout the design process. It uses conceptual investigations (identifying stakeholders and values), empirical investigations (studying how values manifest in context), and technical investigations (how technology supports or undermines values). Values include autonomy, privacy, fairness, trust, and environmental sustainability.',
  },

  // Chapter 13: Future of HCI
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What is the "mixed-initiative interaction" paradigm in AI-mediated interfaces?',
    options: [
      'Users and AI take turns on different computers',
      'AI and human collaborate on a task by taking turns contributing — AI suggests, user accepts/modifies/rejects — creating a collaborative rather than fully automated workflow',
      'Multiple AI systems compete to provide the best answer',
      'Users must manually approve every AI action before it executes',
    ],
    answer: 1,
    explanation: 'Mixed-initiative interaction describes a collaborative paradigm where both the AI and the human contribute to task completion. The AI proactively suggests actions, generates content, or identifies patterns, while the human reviews, modifies, accepts, or rejects these contributions. This preserves human agency and judgment while leveraging AI capabilities — exemplified by tools like GitHub Copilot where AI suggests code and the developer curates.',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What did Mark Weiser mean when he said "the most profound technologies are those that disappear"?',
    options: [
      'That the best technologies become invisible because they are miniaturized',
      'That truly mature computing technology weaves into the fabric of everyday life until it is indistinguishable from the environment, operating in the periphery of attention rather than demanding focus',
      'That technologies become obsolete and are replaced by newer versions',
      'That technology companies should avoid marketing their products',
    ],
    answer: 1,
    explanation: 'Weiser\'s ubiquitous computing vision (1991) proposed that computing would become most impactful when it faded into the background of daily life — embedded in walls, furniture, clothing, and objects. Rather than sitting at a desk using a "computer," people would be surrounded by hundreds of interconnected computing devices that seamlessly provide information and services without demanding explicit attention.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is Andy Clark\'s "extended mind thesis" and why does it matter for HCI?',
    options: [
      'That human brains are larger than previously thought',
      'That cognitive processes extend beyond the brain to include external tools (like smartphones) as literal components of the mind, raising profound questions about privacy, identity, and what counts as "the user"',
      'That computers can think like humans',
      'That virtual reality can expand the user\'s perceived mental capacity',
    ],
    answer: 1,
    explanation: 'Clark\'s extended mind thesis argues that when external tools (notebooks, smartphones, computers) are reliably available and automatically endorsed by the user, they become functional parts of the cognitive system — not just tools but literal extensions of the mind. For HCI, this means that searching a user\'s phone might be analogous to reading their mind, and that "the user" in user-centered design may include the human-technology system, not just the biological human.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapterId === chapterId);
}
