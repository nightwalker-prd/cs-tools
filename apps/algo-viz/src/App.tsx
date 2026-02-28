import { useState, useMemo, useCallback } from 'react';
import { useStepAnimation } from '@cstools/core/hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, StepIndicator } from '@cstools/ui';
import { Visualizer } from './components/Visualizer';
import { GraphVisualizer } from './components/GraphVisualizer';
import { PseudocodePanel } from './components/PseudocodePanel';
import { Controls } from './components/Controls';
import { StatsPanel } from './components/StatsPanel';
import { ArrayInput } from './components/ArrayInput';
import { SORTING_ALGORITHMS, SORTING_PSEUDOCODE, type SortStep } from './algorithms/sorting';
import { binarySearch, SEARCH_PSEUDOCODE, type SearchStep } from './algorithms/searching';
import { bfs, dfs, DEFAULT_GRAPH, GRAPH_PSEUDOCODE, type GraphStep } from './algorithms/graph';

type AlgorithmType = 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick' | 'binary-search' | 'bfs' | 'dfs';

function generateRandomArray(size = 15): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

const GRAPH_ALGORITHMS = ['bfs', 'dfs'] as const;

function isGraphAlgorithm(alg: AlgorithmType): alg is 'bfs' | 'dfs' {
  return (GRAPH_ALGORITHMS as readonly string[]).includes(alg);
}

export default function App() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [inputArray, setInputArray] = useState<number[]>(() => generateRandomArray());
  const [searchTarget, _setSearchTarget] = useState(42);

  const isGraph = isGraphAlgorithm(algorithm);

  const steps = useMemo(() => {
    if (algorithm === 'bfs') {
      return bfs(DEFAULT_GRAPH, 'A');
    }
    if (algorithm === 'dfs') {
      return dfs(DEFAULT_GRAPH, 'A');
    }
    if (algorithm === 'binary-search') {
      return binarySearch(inputArray, searchTarget);
    }
    const alg = SORTING_ALGORITHMS[algorithm as keyof typeof SORTING_ALGORITHMS];
    return alg ? alg.fn(inputArray) : [];
  }, [algorithm, inputArray, searchTarget]);

  const { step, isPlaying, play, pause, stepForward, stepBack, reset, speed, setSpeed } = useStepAnimation(steps.length);

  const currentStep = steps[step] as SortStep | SearchStep | GraphStep | undefined;

  const handleAlgorithmChange = useCallback((value: string) => {
    setAlgorithm(value as AlgorithmType);
    reset();
  }, [reset]);

  const handleNewArray = useCallback((arr: number[]) => {
    setInputArray(arr);
    reset();
  }, [reset]);

  const handleRandom = useCallback(() => {
    setInputArray(generateRandomArray());
    reset();
  }, [reset]);

  const pseudocode = isGraph
    ? GRAPH_PSEUDOCODE[algorithm] || []
    : algorithm === 'binary-search'
      ? SEARCH_PSEUDOCODE.binary
      : SORTING_PSEUDOCODE[algorithm] || [];

  const isSorting = !isGraph && algorithm !== 'binary-search';
  const sortInfo = isSorting ? SORTING_ALGORITHMS[algorithm as keyof typeof SORTING_ALGORITHMS] : null;

  const graphStep = isGraph ? (currentStep as GraphStep | undefined) : null;

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">
      {/* Header */}
      <header className="border-b border-[#30363D] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Algorithm Visualizer</h1>
            <p className="text-sm text-[#8B949E]">Step-by-step algorithm visualization</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={algorithm} onValueChange={handleAlgorithmChange}>
              <SelectTrigger className="w-48 bg-[#161B22] border-[#30363D]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#161B22] border-[#30363D]">
                <SelectItem value="bubble">Bubble Sort</SelectItem>
                <SelectItem value="insertion">Insertion Sort</SelectItem>
                <SelectItem value="selection">Selection Sort</SelectItem>
                <SelectItem value="merge">Merge Sort</SelectItem>
                <SelectItem value="quick">Quick Sort</SelectItem>
                <SelectItem value="binary-search">Binary Search</SelectItem>
                <SelectItem value="bfs">BFS (Graph)</SelectItem>
                <SelectItem value="dfs">DFS (Graph)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Input — hidden for graph algorithms */}
        {!isGraph && (
          <div className="mb-6">
            <ArrayInput onSubmit={handleNewArray} onRandom={handleRandom} />
          </div>
        )}

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-6">
          {/* Left: Pseudocode */}
          <div>
            <PseudocodePanel lines={pseudocode} activeLine={currentStep?.line ?? -1} />
          </div>

          {/* Center: Visualization */}
          <div className="space-y-4">
            <div className="bg-[#161B22] rounded-md border border-[#30363D] p-4">
              {isGraph ? (
                <GraphVisualizer
                  graph={DEFAULT_GRAPH}
                  visited={graphStep?.visited ?? []}
                  current={graphStep?.current ?? null}
                  queue={graphStep?.queue ?? []}
                />
              ) : isSorting && currentStep && 'array' in currentStep && 'comparing' in currentStep ? (
                <Visualizer
                  array={(currentStep as SortStep).array}
                  comparing={(currentStep as SortStep).comparing}
                  swapping={(currentStep as SortStep).swapping}
                  sorted={(currentStep as SortStep).sorted}
                />
              ) : (
                <Visualizer
                  array={currentStep && 'array' in currentStep ? (currentStep as SearchStep).array : inputArray}
                  comparing={currentStep && 'mid' in currentStep && (currentStep as SearchStep).mid >= 0 ? [(currentStep as SearchStep).mid] : []}
                  swapping={currentStep && 'found' in currentStep && (currentStep as SearchStep).found && (currentStep as SearchStep).mid >= 0 ? [(currentStep as SearchStep).mid] : []}
                  sorted={[]}
                />
              )}
            </div>
            {/* Step description */}
            <div className="bg-[#161B22] rounded-md border border-[#30363D] px-4 py-3">
              <p className="text-sm text-[#E6EDF3] font-mono">{currentStep?.description || 'Ready'}</p>
            </div>
            {/* Controls */}
            <Controls
              isPlaying={isPlaying}
              onPlay={play}
              onPause={pause}
              onStepForward={stepForward}
              onStepBack={stepBack}
              onReset={reset}
              speed={speed}
              onSpeedChange={setSpeed}
              canStepForward={step < steps.length - 1}
              canStepBack={step > 0}
            />
            <StepIndicator current={step + 1} total={steps.length} />
          </div>

          {/* Right: Stats */}
          <div>
            {isGraph ? (
              <StatsPanel
                algorithm={algorithm === 'bfs' ? 'BFS (Breadth-First Search)' : 'DFS (Depth-First Search)'}
                timeComplexity={{ best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }}
                spaceComplexity={algorithm === 'bfs' ? 'O(V)' : 'O(V)'}
                currentStep={step}
                totalSteps={steps.length}
              />
            ) : sortInfo ? (
              <StatsPanel
                algorithm={sortInfo.name}
                timeComplexity={sortInfo.time}
                spaceComplexity={sortInfo.space}
                currentStep={step}
                totalSteps={steps.length}
                stable={sortInfo.stable}
              />
            ) : (
              <StatsPanel
                algorithm="Binary Search"
                timeComplexity={{ best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' }}
                spaceComplexity="O(1)"
                currentStep={step}
                totalSteps={steps.length}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
