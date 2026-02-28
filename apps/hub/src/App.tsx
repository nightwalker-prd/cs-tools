import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cstools/ui';
import { BarChart3, Brain, Network, Gauge, Code, BookOpen, Wifi, Server, BookMarked, HelpCircle, Layers } from 'lucide-react';

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
];

const tagColors: Record<Tag, string> = {
  reference: '#8B949E',
  interactive: '#58A6FF',
  quiz: '#D2A8FF',
  interview: '#3FB950',
  drills: '#D29922',
};

const overallStats = [
  { label: 'Tools', value: '7', icon: Server, color: '#58A6FF' },
  { label: 'Topics', value: '51+', icon: Layers, color: '#3FB950' },
  { label: 'Questions', value: '230+', icon: HelpCircle, color: '#D2A8FF' },
  { label: 'Concepts', value: '150+', icon: BookMarked, color: '#D29922' },
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
