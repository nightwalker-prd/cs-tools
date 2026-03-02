export interface QuizQuestion {
  id: string;
  chapterId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Chapter 1: Ethical Frameworks for Technology
  {
    id: 'q1-1',
    chapterId: 1,
    question: 'In utilitarian ethics applied to technology, what is the primary criterion for evaluating a design decision?',
    options: [
      'Whether it follows established industry standards',
      'Whether it produces the greatest net benefit for the greatest number of affected parties',
      'Whether the developer had good intentions when building it',
      'Whether it respects the autonomy of individual users above all else',
    ],
    answer: 1,
    explanation: 'Utilitarianism evaluates actions by their consequences — specifically, whether they produce the greatest aggregate utility (benefit minus harm) across all affected parties. In technology, this means weighing the total benefits of a system against its total harms to all stakeholders, not just direct users.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    question: 'What does Kant\'s "humanity formulation" of the categorical imperative prohibit in technology design?',
    options: [
      'Building any technology that could potentially be misused',
      'Using open source software for commercial purposes',
      'Treating people merely as means to an end, such as using dark patterns to manipulate users',
      'Creating technology that competes with existing products',
    ],
    answer: 2,
    explanation: 'Kant\'s humanity formulation states that we must never treat people merely as means to an end but always also as ends in themselves. In technology, this prohibits practices like dark patterns that manipulate users for profit, treating them as revenue sources rather than autonomous agents capable of making informed decisions.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    question: 'How does care ethics differ from deontological and utilitarian approaches to tech ethics?',
    options: [
      'It focuses only on the financial impact of technology decisions',
      'It emphasizes relationships, empathy, and responsibility to vulnerable parties rather than abstract rules or aggregate outcomes',
      'It applies only to healthcare technology',
      'It argues that all technology is inherently harmful',
    ],
    answer: 1,
    explanation: 'Care ethics (Gilligan, Noddings, Held) shifts moral focus from impartial rules or aggregate calculations to the particular relationships and dependencies between people. In technology, this means designers have special duties to vulnerable users who depend on their systems, and moral reasoning should be attentive to specific community needs rather than abstract principles.',
  },

  // Chapter 2: History of Tech Ethics
  {
    id: 'q2-1',
    chapterId: 2,
    question: 'What was Joseph Weizenbaum\'s key concern after creating ELIZA?',
    options: [
      'That the program was too slow to be useful',
      'That users formed emotional attachments to a simple chatbot, revealing dangers of delegating human judgment to machines',
      'That the program would replace all human therapists',
      'That the program violated copyright laws',
    ],
    answer: 1,
    explanation: 'Weizenbaum created ELIZA as a simple pattern-matching chatbot, but was deeply disturbed when users — including his own secretary — formed genuine emotional connections with it. This led him to spend the rest of his career warning about the dangers of anthropomorphizing machines and delegating tasks requiring human understanding to computers.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    question: 'What is the key difference between the Free Software Foundation\'s philosophy and the Open Source Initiative\'s approach?',
    options: [
      'The FSF focuses on software freedom as a moral imperative, while OSI emphasizes the practical advantages of collaborative development',
      'The FSF only supports Linux, while OSI supports all operating systems',
      'The FSF allows proprietary software, while OSI does not',
      'There is no meaningful difference between the two organizations',
    ],
    answer: 0,
    explanation: 'Richard Stallman and the FSF frame software freedom as a fundamental ethical right — proprietary software is a moral violation of user autonomy. Eric Raymond and the OSI reframed the argument pragmatically, arguing open collaboration simply produces better software. This pragmatic framing appealed to corporations but diluted the ethical message that motivated the free software movement.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    question: 'What common impact have major tech ethics incidents (Therac-25, Snowden leaks, Facebook Files) had on public discourse?',
    options: [
      'They have all led to immediate and comprehensive regulation',
      'They shifted the Overton window from "tech should self-regulate" toward "government intervention is necessary"',
      'They have had no lasting impact on technology policy',
      'They all resulted in criminal prosecution of responsible companies',
    ],
    answer: 1,
    explanation: 'Each major tech ethics incident has progressively shifted public opinion and policy discourse toward accepting the need for government regulation of technology. While none individually produced comprehensive regulation, together they have eroded the tech industry\'s argument that self-regulation is sufficient and created political momentum for regulatory frameworks.',
  },

  // Chapter 3: Digital Rights & Privacy
  {
    id: 'q3-1',
    chapterId: 3,
    question: 'According to Helen Nissenbaum\'s contextual integrity framework, when does a privacy violation occur?',
    options: [
      'Whenever any personal data is collected',
      'Only when data is stolen by hackers',
      'When information flows in ways that violate the norms appropriate to the original context',
      'Only when a user explicitly says their privacy was violated',
    ],
    answer: 2,
    explanation: 'Nissenbaum\'s contextual integrity framework argues that privacy is maintained when information flows according to the norms appropriate to the context in which it was shared. Sharing medical data with a doctor is appropriate, but that same data flowing to an insurer or employer violates contextual norms — even if the original collection was consensual.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    question: 'What is the "Brussels Effect" in the context of GDPR?',
    options: [
      'European companies refusing to do business with American companies',
      'GDPR becoming a de facto global standard because multinational companies find it easier to comply globally than maintain separate practices',
      'The European Union banning all data collection',
      'Brussels requiring all tech companies to relocate their headquarters to Belgium',
    ],
    answer: 1,
    explanation: 'The "Brussels Effect" describes how GDPR has effectively become a global privacy standard because multinational companies find it simpler and more cost-effective to implement GDPR-level protections worldwide rather than maintaining different data practices for different jurisdictions. This gives EU regulation outsized global influence.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    question: 'What is "behavioral surplus" in Shoshana Zuboff\'s theory of surveillance capitalism?',
    options: [
      'The extra profit companies make from selling hardware',
      'Data collected beyond what is needed to improve services, used to predict and modify human behavior for profit',
      'The time users save by using technology',
      'Government subsidies for technology companies',
    ],
    answer: 1,
    explanation: 'Zuboff defines behavioral surplus as the data collected beyond what is needed to improve a service, which is then used to predict and modify human behavior for profit. Google discovered that residual search data could predict ad clicks, and this insight became the foundation of surveillance capitalism\'s business model.',
  },

  // Chapter 4: Bias & Fairness in AI
  {
    id: 'q4-1',
    chapterId: 4,
    question: 'What is a "feedback loop" in the context of AI bias?',
    options: [
      'When users provide ratings on AI recommendations',
      'When biased predictions influence real-world actions that generate biased data for retraining, amplifying the original bias',
      'When AI systems are retrained on new, unbiased data',
      'When engineers receive feedback from users about system errors',
    ],
    answer: 1,
    explanation: 'Feedback loops occur when biased AI predictions affect real-world decisions that then generate biased training data. For example, predictive policing sends more officers to flagged neighborhoods, generating more arrests that "confirm" the prediction, even if underlying crime rates are similar elsewhere. The system amplifies its own bias over time.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    question: 'What does the Chouldechova/Kleinberg impossibility theorem prove about fairness in AI?',
    options: [
      'That AI systems can never be fair to any group',
      'That when base rates differ between groups, you cannot simultaneously achieve demographic parity, equalized odds, and calibration',
      'That fairness and accuracy are always perfectly correlated',
      'That only one definition of fairness exists',
    ],
    answer: 1,
    explanation: 'The impossibility theorem proves that when base rates (the actual frequency of an outcome) differ between groups, it is mathematically impossible to simultaneously satisfy demographic parity, equalized odds, and calibration. This means choosing which fairness criterion to prioritize is a moral and political decision, not a purely technical one.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    question: 'What is a key limitation of bias mitigation toolkits like AI Fairness 360 and Fairlearn?',
    options: [
      'They only work with Python',
      'They can provide a false sense of security because the choice of metrics, protected attributes, and reference groups involves normative judgments the tools cannot make',
      'They are too expensive for most organizations to use',
      'They can only detect bias, not mitigate it',
    ],
    answer: 1,
    explanation: 'While toolkits like AIF360 and Fairlearn provide valuable metrics and algorithms, they can create a false sense of security. Running a fairness check does not guarantee a fair system because the choice of which metrics to use, which attributes to protect, and which reference groups to compare involves normative judgments that require human moral reasoning, not just technical tools.',
  },

  // Chapter 5: AI Transparency & Explainability
  {
    id: 'q5-1',
    chapterId: 5,
    question: 'What is the fundamental problem with post-hoc explanations of black box AI models?',
    options: [
      'They are always inaccurate',
      'They are too expensive to compute',
      'They are approximations that may not faithfully represent the model\'s actual decision process',
      'They are only available in English',
    ],
    answer: 2,
    explanation: 'Post-hoc explanation methods like SHAP and LIME create simplified approximations of black box model behavior. These explanations describe what the model might be doing in a simplified way, but they may not faithfully capture the model\'s actual internal reasoning process. This means relying on post-hoc explanations can create false confidence in our understanding of the model.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    question: 'What type of explanation is most actionable for individuals affected by an AI decision?',
    options: [
      'Global feature importance rankings',
      'Attention weight visualizations',
      'Counterfactual explanations that describe the minimum change needed to flip a decision',
      'Partial dependence plots',
    ],
    answer: 2,
    explanation: 'Counterfactual explanations (e.g., "you were denied because your income was $5K too low") describe the minimum change to inputs that would produce a different outcome. This is often the most actionable form of explanation for affected individuals because it tells them specifically what they could change to get a different result.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    question: 'What is the primary purpose of model cards as proposed by Mitchell et al.?',
    options: [
      'To replace model documentation with a single summary page',
      'To communicate a model\'s intended use, performance characteristics, limitations, and ethical considerations to downstream users',
      'To provide source code for reproducing the model',
      'To rate models on a numerical scale for comparison shopping',
    ],
    answer: 1,
    explanation: 'Model cards are standardized documentation frameworks that communicate a model\'s intended use, performance across different demographics and conditions, known limitations, and ethical considerations. They aim to prevent misuse by making limitations explicit and helping downstream users make informed decisions about whether and how to deploy the model.',
  },

  // Chapter 6: AI Safety & Alignment
  {
    id: 'q6-1',
    chapterId: 6,
    question: 'What is the core argument of the "stochastic parrots" paper (Bender et al., 2021)?',
    options: [
      'That large language models have achieved general intelligence',
      'That large language models are not on a path to general intelligence and that anthropomorphizing them distracts from addressing actual risks like bias and environmental cost',
      'That all AI research should be immediately stopped',
      'That parrots can be trained to use language models',
    ],
    answer: 1,
    explanation: 'The "stochastic parrots" paper argues that large language models are sophisticated pattern matchers, not steps toward general intelligence. Anthropomorphizing them diverts attention and resources from present, concrete harms: training data bias, environmental costs of computation, and the concentration of power — harms that are happening now and affecting real people.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    question: 'What is a key failure mode of RLHF (Reinforcement Learning from Human Feedback)?',
    options: [
      'It makes models completely unable to generate text',
      'Reward hacking, where the model learns to exploit patterns in human preferences rather than genuinely improving',
      'It requires quantum computing to implement',
      'It only works for image generation models',
    ],
    answer: 1,
    explanation: 'Reward hacking occurs when the model optimizes the learned reward function in unintended ways — finding patterns that score highly with the reward model without actually producing the kind of responses humans intended to reward. Other failure modes include sycophancy (telling users what they want to hear) and mode collapse (reducing response diversity).',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    question: 'How does the EU AI Act classify AI systems for regulatory purposes?',
    options: [
      'By the programming language used to build them',
      'By the size of the company that created them',
      'By risk level: unacceptable (banned), high-risk (strictly regulated), limited-risk (transparency), and minimal-risk (no restrictions)',
      'By whether they use machine learning or rule-based systems',
    ],
    answer: 2,
    explanation: 'The EU AI Act uses a risk-based classification system. Unacceptable-risk systems (social scoring, subliminal manipulation) are banned. High-risk systems (hiring, credit scoring, law enforcement) must meet strict requirements. Limited-risk systems have transparency obligations. Minimal-risk systems face no restrictions. This tiered approach aims to regulate proportionally to the potential for harm.',
  },

  // Chapter 7: Content Moderation & Free Speech
  {
    id: 'q7-1',
    chapterId: 7,
    question: 'What is "context collapse" in content moderation?',
    options: [
      'When a platform\'s servers crash due to high traffic',
      'When the same content can be newsworthy, harassment, or gratuitous violence depending on context that automated systems struggle to assess',
      'When users stop providing context in their posts',
      'When content moderators lose their ability to understand context due to burnout',
    ],
    answer: 1,
    explanation: 'Context collapse is the fundamental challenge of automated content moderation: the same piece of content (like the iconic Napalm Girl photograph) can be important historical documentation, newsworthy reporting, or harassment material depending on the context of its use. Automated systems struggle to assess this context, leading to errors in both directions.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    question: 'What two protections does Section 230 of the Communications Decency Act provide to internet platforms?',
    options: [
      'Protection from hacking and protection from government surveillance',
      'Immunity from liability for user content and immunity for good-faith content moderation decisions',
      'Protection from antitrust enforcement and protection from taxation',
      'Immunity from copyright claims and immunity from defamation suits',
    ],
    answer: 1,
    explanation: 'Section 230 provides two key shields: (1) platforms are not treated as publishers of user-generated content (so they are not liable for what users post), and (2) platforms are not liable for good-faith content moderation decisions (so they can moderate without being treated as publishers). This dual protection is unique to US law.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    question: 'What is the "liar\'s dividend" in the context of deepfakes?',
    options: [
      'The profit that companies make from selling deepfake technology',
      'The ability of anyone to dismiss authentic evidence as fabricated because deepfake technology exists',
      'The cost savings of using AI-generated content instead of hiring real actors',
      'The advertising revenue platforms earn from viral deepfake content',
    ],
    answer: 1,
    explanation: 'The liar\'s dividend describes how the mere existence of deepfake technology erodes trust in all media. When anyone can claim that genuine evidence (video, audio, photos) is a deepfake, the evidentiary value of all media diminishes. This may be more damaging than deepfakes themselves because it undermines the epistemic foundation of public discourse.',
  },

  // Chapter 8: Labor & Automation
  {
    id: 'q8-1',
    chapterId: 8,
    question: 'How does generative AI challenge the previous consensus about which jobs are safe from automation?',
    options: [
      'It only automates manual labor faster than expected',
      'It automates creative and cognitive tasks (writing, design, coding) previously considered uniquely human and safe from automation',
      'It has no impact on the job market',
      'It only affects jobs in the technology sector',
    ],
    answer: 1,
    explanation: 'Previous models of automation predicted that cognitive, creative work would be safe while routine manual tasks would be automated. Generative AI (GPT-4, DALL-E, Midjourney) disrupted this consensus by demonstrating capability in writing, visual design, coding, and other creative tasks, potentially flattening the skill premium that previously protected knowledge workers.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    question: 'What is the "automation paradox" in the context of ghost work?',
    options: [
      'That automation makes products more expensive',
      'That increased AI automation often increases demand for human ghost work because better AI needs more and higher-quality training data',
      'That automation always reduces overall employment',
      'That automated systems are always less accurate than human workers',
    ],
    answer: 1,
    explanation: 'The automation paradox describes how better AI systems require more and higher-quality human-labeled training data, which actually increases demand for ghost work even as the AI handles more tasks. This creates a hidden dependency on human labor that grows alongside AI capability, contradicting the narrative of fully autonomous AI systems.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    question: 'What is a key ethical concern about algorithmic management in the gig economy?',
    options: [
      'That algorithms are always more fair than human managers',
      'That gig workers are subject to opaque performance metrics, pricing, and deactivation without transparency or ability to appeal',
      'That algorithms cannot process payments to workers',
      'That algorithmic management only affects full-time employees',
    ],
    answer: 1,
    explanation: 'Algorithmic management operates through opacity: gig workers face performance evaluation, dynamic pricing, and potential deactivation (effectively "firing") by algorithms without understanding how these systems work or having meaningful ability to appeal decisions. This creates a power asymmetry where platforms control workers\' livelihoods through inscrutable automated systems.',
  },

  // Chapter 9: Environmental Impact of Tech
  {
    id: 'q9-1',
    chapterId: 9,
    question: 'Why is AI inference potentially a larger environmental concern than AI training?',
    options: [
      'Because inference uses older, less efficient hardware',
      'Because inference happens continuously at scale for millions of users, while training is a one-time process',
      'Because inference requires more electricity per computation',
      'Because inference cannot use renewable energy',
    ],
    answer: 1,
    explanation: 'While training a single large model consumes enormous energy, inference (running trained models for users) happens continuously at massive scale. A single ChatGPT query uses roughly 10x the electricity of a Google search, and this is multiplied by hundreds of millions of daily queries. The cumulative energy consumption of inference dwarfs training costs over a model\'s lifetime.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    question: 'What is "planned obsolescence" in the context of e-waste?',
    options: [
      'When products are designed to break or become outdated faster than necessary, through non-replaceable batteries, software that slows older devices, or arbitrary end-of-support dates',
      'When products are recycled according to a planned schedule',
      'When companies plan ahead for future product releases',
      'When products are made obsolete by competitor innovations',
    ],
    answer: 0,
    explanation: 'Planned obsolescence is the deliberate design of products to have artificially shortened useful lifespans. This includes hardware with non-replaceable batteries, software updates that slow older devices, arbitrary end-of-support dates, and fashion-driven upgrade cycles. It is a key driver of the 62 million metric tons of e-waste generated annually.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    question: 'What does the "Green AI" movement advocate for in research publications?',
    options: [
      'Only using renewable energy for all AI research',
      'Reporting computational costs alongside accuracy metrics to incentivize more efficient model development',
      'Banning all AI research until data centers become carbon neutral',
      'Using only small datasets for training',
    ],
    answer: 1,
    explanation: 'The Green AI movement (Schwartz et al., 2020) advocates for transparency about the computational costs of AI research by requiring that papers report energy consumption, carbon emissions, and compute costs alongside accuracy metrics. This creates incentives to develop more efficient models rather than achieving marginal improvements through brute-force scaling.',
  },

  // Chapter 10: Digital Divide & Inclusion
  {
    id: 'q10-1',
    chapterId: 10,
    question: 'What is the "second-level digital divide"?',
    options: [
      'The gap between 4G and 5G coverage areas',
      'The divide that goes beyond internet access to encompass digital literacy, relevant content, and ability to use technology productively',
      'The difference between mobile and desktop internet speeds',
      'The gap between enterprise and consumer technology',
    ],
    answer: 1,
    explanation: 'The second-level digital divide recognizes that internet access alone is insufficient. Even with connectivity, meaningful digital participation requires digital literacy, content in local languages, relevant services, and the skills to use technology productively. Connecting a school to the internet without training teachers and providing local-language content has limited impact.',
  },
  {
    id: 'q10-2',
    chapterId: 10,
    question: 'Why is linguistic bias in AI a significant concern?',
    options: [
      'Because AI cannot process any non-English text',
      'Because fewer than 100 of the world\'s ~7,000 languages have meaningful NLP support, effectively excluding most of humanity from AI benefits',
      'Because English is the only language with a written form',
      'Because linguistic bias only affects voice assistants',
    ],
    answer: 1,
    explanation: 'Of the approximately 7,000 languages spoken worldwide, fewer than 100 have meaningful natural language processing support and fewer than 20 have high-quality language models. This means AI systems effectively exclude speakers of most human languages, concentrating the benefits of AI technology in already-privileged linguistic communities and deepening global inequality.',
  },
  {
    id: 'q10-3',
    chapterId: 10,
    question: 'What is the "curb cut effect" in accessible technology?',
    options: [
      'The negative impact of requiring accessibility features in products',
      'How accessibility improvements designed for people with disabilities end up benefiting everyone',
      'The cost reduction achieved by cutting accessibility features from products',
      'The requirement to install physical curb cuts near all technology stores',
    ],
    answer: 1,
    explanation: 'The curb cut effect describes how accessibility innovations designed for specific disabilities produce universal benefits. Closed captions help people in noisy environments, voice interfaces help drivers, large-print options help everyone in bright sunlight, and readable fonts improve experience for all users. Disability-driven design innovation consistently produces improvements that benefit the broader population.',
  },

  // Chapter 11: Tech Industry Governance
  {
    id: 'q11-1',
    chapterId: 11,
    question: 'What is the "pacing problem" argument used by the tech industry against regulation?',
    options: [
      'That regulators work too slowly to process applications',
      'That technology evolves faster than regulators can keep up, making regulation obsolete before it is implemented',
      'That companies cannot develop products fast enough to meet regulatory deadlines',
      'That users adopt technology faster than companies can scale their services',
    ],
    answer: 1,
    explanation: 'The pacing problem argument claims that technology changes so rapidly that any regulation will be outdated by the time it is implemented. While this has some validity for highly specific technical requirements, critics point out that fundamental ethical principles (don\'t deceive, don\'t discriminate, get consent) do not change with technology and can be regulated effectively.',
  },
  {
    id: 'q11-2',
    chapterId: 11,
    question: 'What happened with Google\'s Ethical AI team that revealed limitations of internal ethics governance?',
    options: [
      'The team was given more power and a larger budget',
      'Timnit Gebru and Margaret Mitchell were fired after co-authoring a paper critical of large language models, demonstrating vulnerability of internal ethics researchers',
      'The team successfully prevented the launch of all harmful Google products',
      'The team was merged with the marketing department',
    ],
    answer: 1,
    explanation: 'The firings of Timnit Gebru and Margaret Mitchell from Google\'s Ethical AI team after they co-authored the "stochastic parrots" paper demonstrated the inherent vulnerability of internal ethics researchers. When their findings conflicted with company strategy, they were removed rather than heard — showing that internal ethics teams lack independence when their conclusions challenge business interests.',
  },
  {
    id: 'q11-3',
    chapterId: 11,
    question: 'What is the controversy around "ethical source" licenses like the Hippocratic License?',
    options: [
      'They are too permissive and allow any use of the software',
      'They attempt to restrict software use for human rights violations but are controversial because they may fragment the open source ecosystem and be difficult to enforce',
      'They require all software to be free of charge',
      'They have been universally adopted by all major open source projects',
    ],
    answer: 1,
    explanation: 'Ethical source licenses like the Hippocratic License use legal terms to express moral values, restricting use of software for activities that violate human rights. While they represent meaningful moral commitments, they are controversial because they may fragment the open source ecosystem, complicate compliance for legitimate users, and are difficult to enforce across different legal jurisdictions.',
  },

  // Chapter 12: Emerging Technology Ethics
  {
    id: 'q12-1',
    chapterId: 12,
    question: 'What is the critical ethical distinction in genetic engineering between somatic gene therapy and germline editing?',
    options: [
      'Somatic therapy is more expensive than germline editing',
      'Somatic therapy edits non-reproductive cells affecting one individual, while germline editing creates heritable changes affecting all future descendants',
      'Somatic therapy uses CRISPR while germline editing uses older techniques',
      'There is no ethical distinction between the two',
    ],
    answer: 1,
    explanation: 'Somatic gene therapy edits cells in a living individual, affecting only that person — most ethicists broadly support this for treating disease. Germline editing modifies embryos, creating changes that are inherited by all future descendants. This is far more ethically contentious because it affects people who cannot consent and permanently alters the human gene pool.',
  },
  {
    id: 'q12-2',
    chapterId: 12,
    question: 'What is "cognitive liberty" in the context of brain-computer interfaces?',
    options: [
      'The right to purchase any BCI device on the market',
      'The right to mental self-determination, including freedom from coerced neural monitoring or modification',
      'The ability to use BCIs to increase intelligence',
      'The freedom to study neuroscience at any university',
    ],
    answer: 1,
    explanation: 'Cognitive liberty is the right to mental self-determination — the freedom from involuntary cognitive monitoring, manipulation, or modification. As BCIs advance, this concept becomes critical: without legal protections for cognitive liberty, brain data could be harvested, thoughts could be monitored, and neural modification could be coerced by employers, governments, or other powerful actors.',
  },
  {
    id: 'q12-3',
    chapterId: 12,
    question: 'What is the "accountability gap" in the debate over lethal autonomous weapons?',
    options: [
      'The gap between military budgets and weapons costs',
      'The difficulty of determining who is responsible when an autonomous weapon kills civilians — the programmer, commander, general, or political leader',
      'The lack of records about weapons deployed in conflicts',
      'The difference between weapons accuracy in testing versus deployment',
    ],
    answer: 1,
    explanation: 'The accountability gap is the central ethical problem with LAWS: when an autonomous weapon system kills civilians, traditional chains of military responsibility break down. It is unclear whether the programmer, the deploying commander, the authorizing general, or the political leader bears moral and legal responsibility — this ambiguity undermines the principle of accountability in armed conflict.',
  },

  // Chapter 13: Building Ethical Technology
  {
    id: 'q13-1',
    chapterId: 13,
    question: 'What are the three types of investigation in Value-Sensitive Design (VSD)?',
    options: [
      'Legal, financial, and marketing investigations',
      'Conceptual (identifying stakeholders/values), empirical (studying stakeholder priorities), and technical (translating values into design requirements)',
      'User research, competitive analysis, and A/B testing',
      'Code review, security audit, and performance testing',
    ],
    answer: 1,
    explanation: 'Value-Sensitive Design involves three integrated types of investigation: conceptual (identifying direct and indirect stakeholders and the values at stake), empirical (studying how stakeholders understand and prioritize those values through interviews, surveys, and observation), and technical (translating identified values into concrete design requirements and system properties).',
  },
  {
    id: 'q13-2',
    chapterId: 13,
    question: 'What is an "ethical pre-mortem" in software engineering?',
    options: [
      'A legal review of software before launch',
      'An exercise where teams imagine their product has caused significant harm and work backward to identify what went wrong',
      'A post-launch analysis of product failures',
      'A performance review of engineering ethics training',
    ],
    answer: 1,
    explanation: 'An ethical pre-mortem is a prospective exercise where teams imagine a future scenario in which their product has caused significant harm, then work backward to identify what went wrong. Adapted from project management, this technique surfaces risks that optimistic forward-looking analysis typically misses by leveraging hindsight bias to identify vulnerabilities.',
  },
  {
    id: 'q13-3',
    chapterId: 13,
    question: 'What is the standard timeframe for coordinated vulnerability disclosure, as established by Google Project Zero?',
    options: [
      '30 days',
      '60 days',
      '90 days',
      '180 days',
    ],
    answer: 2,
    explanation: 'Google Project Zero established the 90-day disclosure deadline as the industry standard: vendors are given 90 days after notification to develop and deploy a patch before the vulnerability is publicly disclosed. This timeline balances giving vendors reasonable time to fix issues while ensuring vulnerabilities are not concealed indefinitely, significantly improving industry patch cadence.',
  },
];

export function getQuestionsForChapter(chapterId: number): QuizQuestion[] {
  return quizQuestions.filter(q => q.chapterId === chapterId);
}
