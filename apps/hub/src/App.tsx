import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cstools/ui';
import { BarChart3, Brain, Network, Gauge, Code, BookOpen, Wifi, Server, BookMarked, HelpCircle, Layers, Database, Cpu, Blocks, Rocket, ShieldCheck, BrainCircuit, FlaskConical, Binary, GitBranchPlus, FunctionSquare, Terminal, SquareTerminal, Microchip, Wrench, CircuitBoard, Infinity, FileCode, Monitor, Workflow, Radio, Sigma, Plug, Tv, LineChart, Radar, Flame, Crosshair, Microscope } from 'lucide-react';

type Tag = 'reference' | 'interactive' | 'quiz' | 'interview' | 'drills';

interface Tool {
  name: string;
  description: string;
  icon: typeof Code;
  color: string;
  port: number;
  stats: string;
  tags: Tag[];
}

const tools: Tool[] = [
  {
    name: 'Algorithm Visualizer',
    description: 'Step-by-step visualization of sorting, searching, and graph algorithms with pseudocode tracking',
    icon: BarChart3,
    color: '#58A6FF',
    port: 5173,
    stats: '6 algorithms, interactive controls',
    tags: ['interactive'],
  },
  {
    name: 'DSA Drills',
    description: 'Flashcard drills covering arrays, trees, graphs, DP, and more with code tracing and bug fixing',
    icon: Brain,
    color: '#D2A8FF',
    port: 5174,
    stats: '90 questions, 10 categories',
    tags: ['drills', 'interview'],
  },
  {
    name: 'System Design',
    description: 'Comprehensive system design reference — scalability, distributed systems, infrastructure, and real-world patterns',
    icon: Network,
    color: '#3FB950',
    port: 5175,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz', 'interview'],
  },
  {
    name: 'Complexity Atlas',
    description: 'Big-O reference tables for algorithms and data structures with growth visualization and practice quiz',
    icon: Gauge,
    color: '#D29922',
    port: 5176,
    stats: '21 algorithms, 14 data structures, quiz',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'DDIA Explorer',
    description: 'Key concepts from Designing Data-Intensive Applications — replication, partitioning, transactions, and batch/stream processing',
    icon: BookOpen,
    color: '#FF7B72',
    port: 5177,
    stats: '12 chapters, 36 concepts, 24 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Networking',
    description: 'Full-stack networking from OSI/TCP-IP layers through DNS, HTTP, TLS, and cloud networking',
    icon: Wifi,
    color: '#FFA657',
    port: 5178,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'LeetCode Patterns',
    description: 'Pattern-based coding interview guide — sliding window, two pointers, BFS/DFS, DP, and more',
    icon: Code,
    color: '#79C0FF',
    port: 5179,
    stats: '13 patterns, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz', 'interview'],
  },
  {
    name: 'Databases',
    description: 'Database internals — storage engines, indexing, transactions, replication, sharding, and NoSQL data models',
    icon: Database,
    color: '#F778BA',
    port: 5180,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz', 'interview'],
  },
  {
    name: 'Operating Systems',
    description: 'OS internals — process management, virtual memory, file systems, synchronization, and virtualization',
    icon: Cpu,
    color: '#56D4DD',
    port: 5181,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz', 'interview'],
  },
  {
    name: 'Design Patterns',
    description: 'Software design patterns — creational, structural, behavioral, and architectural patterns with real-world examples',
    icon: Blocks,
    color: '#E3B341',
    port: 5182,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz', 'interview'],
  },
  {
    name: 'DevOps & CI/CD',
    description: 'DevOps practices — containers, Kubernetes, CI/CD pipelines, infrastructure as code, and observability',
    icon: Rocket,
    color: '#A5D6FF',
    port: 5183,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Security & Crypto',
    description: 'Security fundamentals — encryption, authentication, OWASP top 10, network security, and incident response',
    icon: ShieldCheck,
    color: '#F47067',
    port: 5184,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz', 'interview'],
  },
  {
    name: 'Machine Learning',
    description: 'ML fundamentals — regression, classification, neural networks, CNNs, transformers, and reinforcement learning',
    icon: BrainCircuit,
    color: '#7EE787',
    port: 5185,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz', 'interview'],
  },
  {
    name: 'Data Science',
    description: 'Data science fundamentals — statistics, probability, EDA, visualization, A/B testing, and data pipelines',
    icon: FlaskConical,
    color: '#DA70D6',
    port: 5186,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Discrete Math',
    description: 'Discrete mathematics — propositional & predicate logic, set theory, graph theory, combinatorics, and number theory',
    icon: Binary,
    color: '#FF9E64',
    port: 5187,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Distributed Systems',
    description: 'Distributed systems — consensus algorithms, replication, partitioning, fault tolerance, and emerging patterns',
    icon: GitBranchPlus,
    color: '#C9A0FF',
    port: 5188,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz', 'interview'],
  },
  {
    name: 'Functional Programming',
    description: 'FP fundamentals — pure functions, immutability, monads, type systems, algebraic data types, and category theory',
    icon: FunctionSquare,
    color: '#E06C75',
    port: 5189,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Compilers & DSLs',
    description: 'Compilers and DSLs — lexing, parsing, ASTs, type checking, optimization, code generation, and DSL design',
    icon: Terminal,
    color: '#61AFEF',
    port: 5190,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Developer Experience',
    description: 'Developer experience — shell mastery, git workflows, automation, SSH, dotfiles, and CLI tool building',
    icon: SquareTerminal,
    color: '#98C379',
    port: 5191,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Systems Programming',
    description: 'Systems programming — syscalls, memory management, pthreads, IPC, sockets, debugging, and performance',
    icon: Microchip,
    color: '#73DACA',
    port: 5192,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Software Engineering',
    description: 'Software engineering practices — requirements, testing strategies, agile processes, code review, and production readiness',
    icon: Wrench,
    color: '#E5C07B',
    port: 5193,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Computer Architecture',
    description: 'Computer architecture — digital logic, CPU pipelines, caches, memory hierarchy, and modern processor design',
    icon: CircuitBoard,
    color: '#FF6B6B',
    port: 5194,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Automata & Formal Languages',
    description: 'Automata theory — DFA, NFA, regular languages, context-free grammars, Turing machines, and computability',
    icon: Infinity,
    color: '#C678DD',
    port: 5195,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Programming Languages',
    description: 'Programming language theory — type systems, evaluation strategies, paradigms, memory management, and runtime design',
    icon: FileCode,
    color: '#61AFEF',
    port: 5196,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Computer Graphics',
    description: 'Computer graphics — math foundations, rendering pipeline, ray tracing, shaders, and real-time techniques',
    icon: Monitor,
    color: '#E06C75',
    port: 5197,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Concurrency & Parallelism',
    description: 'Concurrency — threading models, synchronization, lock-free algorithms, async patterns, and distributed concurrency',
    icon: Workflow,
    color: '#56B6C2',
    port: 5198,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Information Theory',
    description: 'Information theory — entropy, compression, error-correcting codes, channel capacity, and Shannon limits',
    icon: Radio,
    color: '#D19A66',
    port: 5199,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Numerical Methods',
    description: 'Numerical methods — linear algebra, matrix decompositions, optimization, floating-point analysis, and FFT',
    icon: Sigma,
    color: '#CBA6F7',
    port: 5200,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'API Design & Protocols',
    description: 'API design — REST, GraphQL, gRPC, WebSockets, authentication, rate limiting, and API operations',
    icon: Plug,
    color: '#F5A97F',
    port: 5201,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Media Streaming',
    description: 'Media streaming — video codecs, streaming protocols, CDN architecture, DRM, and platform engineering patterns',
    icon: Tv,
    color: '#E879F9',
    port: 5202,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Algorithm Analysis',
    description: 'Algorithm analysis — asymptotic notation, recurrence relations, master theorem, amortized analysis, and correctness proofs',
    icon: LineChart,
    color: '#4ECDC4',
    port: 5203,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'OSINT',
    description: 'OSINT fundamentals — reconnaissance, SOCMINT, GEOINT, verification, threat intelligence, and operational security',
    icon: Radar,
    color: '#00D4AA',
    port: 5204,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Adult Tech Innovation',
    description: 'How the adult industry drove tech innovation — streaming video, online payments, CDNs, compression, privacy tech, and content moderation at scale',
    icon: Flame,
    color: '#FF6B6B',
    port: 5205,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Pentesting',
    description: 'Pentesting fundamentals — methodology, web attacks, network exploitation, privilege escalation, and red team operations',
    icon: Crosshair,
    color: '#E53E3E',
    port: 5206,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
  {
    name: 'Reverse Engineering',
    description: 'Reverse engineering fundamentals — binary analysis, disassembly, debugging, malware analysis, firmware RE, and exploit development',
    icon: Microscope,
    color: '#00CED1',
    port: 5207,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'quiz'],
  },
];

const tagColors: Record<Tag, string> = {
  reference: '#8B949E',
  interactive: '#58A6FF',
  quiz: '#D2A8FF',
  interview: '#3FB950',
  drills: '#D29922',
};

const overallStats = [
  { label: 'Tools', value: '35', icon: Server, color: '#58A6FF' },
  { label: 'Topics', value: '415+', icon: Layers, color: '#3FB950' },
  { label: 'Questions', value: '1322+', icon: HelpCircle, color: '#D2A8FF' },
  { label: 'Concepts', value: '1242+', icon: BookMarked, color: '#D29922' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">
      <header className="border-b border-[#30363D]">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Code className="w-9 h-9 text-[#58A6FF]" />
            <h1 className="text-3xl font-bold tracking-tight">CS Tools</h1>
          </div>
          <p className="text-[#8B949E] max-w-lg mx-auto">
            Interactive Computer Science learning toolkit for algorithms, data structures, system design, and interview preparation.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {overallStats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 text-center">
                <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} />
                <div className="text-2xl font-bold font-mono text-[#E6EDF3]">{s.value}</div>
                <div className="text-xs text-[#8B949E]">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map(tool => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.name}
                href={`http://localhost:${tool.port}`}
                className="block group"
              >
                <Card className="bg-[#161B22] border-[#30363D] hover:border-[#484F58] transition-all group-hover:shadow-lg h-full">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${tool.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: tool.color }} />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-[#E6EDF3] text-base group-hover:text-[#58A6FF] transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-[#8B949E] text-sm mt-1 leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        {tool.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                            style={{ color: tagColors[tag], backgroundColor: `${tagColors[tag]}15` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] text-[#484F58] font-mono shrink-0 ml-2">
                        {tool.stats}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        <footer className="text-center py-4">
          <p className="text-xs text-[#30363D]">
            Run <code className="text-[#484F58]">pnpm dev</code> to start all tools
          </p>
        </footer>
      </main>
    </div>
  );
}
