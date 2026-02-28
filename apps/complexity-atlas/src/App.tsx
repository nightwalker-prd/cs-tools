import { Tabs, TabsContent, TabsList, TabsTrigger } from '@cstools/ui';
import { ReferenceTable } from './components/ReferenceTable';
import { DSMatrix } from './components/DSMatrix';
import { Calculator } from './components/Calculator';
import { QuizTab } from './components/QuizTab';
import { GrowthChart } from './components/GrowthChart';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">
      <header className="border-b border-[#30363D] px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold">Complexity Atlas</h1>
          <p className="text-sm text-[#8B949E]">Big-O reference, comparison, and practice</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="reference" className="space-y-6">
          <TabsList className="bg-[#161B22] border border-[#30363D]">
            <TabsTrigger value="reference" className="data-[state=active]:bg-[#21262D]">Reference</TabsTrigger>
            <TabsTrigger value="ds" className="data-[state=active]:bg-[#21262D]">Data Structures</TabsTrigger>
            <TabsTrigger value="calculator" className="data-[state=active]:bg-[#21262D]">Calculator</TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-[#21262D]">Quiz</TabsTrigger>
            <TabsTrigger value="growth" className="data-[state=active]:bg-[#21262D]">Growth</TabsTrigger>
          </TabsList>
          <TabsContent value="reference"><ReferenceTable /></TabsContent>
          <TabsContent value="ds"><DSMatrix /></TabsContent>
          <TabsContent value="calculator"><Calculator /></TabsContent>
          <TabsContent value="quiz"><QuizTab /></TabsContent>
          <TabsContent value="growth"><GrowthChart /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
