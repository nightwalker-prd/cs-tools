import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cstools/ui';
import { BarChart3, Brain, Network, Gauge, Code } from 'lucide-react';

const tools = [
  {
    name: 'Algorithm Visualizer',
    description: 'Step-by-step visualization of sorting, searching, and graph algorithms',
    icon: BarChart3,
    color: '#58A6FF',
    port: 5173,
    path: '/algo-viz',
  },
  {
    name: 'DSA Drills',
    description: 'SRS-backed flashcard drills for data structures and algorithms',
    icon: Brain,
    color: '#D2A8FF',
    port: 5174,
    path: '/dsa-drills',
  },
  {
    name: 'System Design',
    description: 'Interactive reference guide for system design concepts',
    icon: Network,
    color: '#3FB950',
    port: 5175,
    path: '/system-design',
  },
  {
    name: 'Complexity Atlas',
    description: 'Big-O reference tables, comparison, and practice drills',
    icon: Gauge,
    color: '#D29922',
    port: 5176,
    path: '/complexity-atlas',
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">
      <header className="border-b border-[#30363D]">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Code className="w-8 h-8 text-[#58A6FF]" />
            <h1 className="text-3xl font-bold">CS Tools</h1>
          </div>
          <p className="text-[#8B949E]">Interactive Computer Science learning toolkit</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
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
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${tool.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tool.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-[#E6EDF3] group-hover:text-[#58A6FF] transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-[#8B949E] mt-1">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="text-xs font-mono text-[#8B949E] bg-[#21262D] px-2 py-1 rounded">
                      localhost:{tool.port}
                    </span>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}
