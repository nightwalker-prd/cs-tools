import type { Graph } from '../algorithms/graph';

interface GraphVisualizerProps {
  graph: Graph;
  visited: string[];
  current: string | null;
  queue: string[];
}

const NODE_RADIUS = 22;
const VIEWBOX_WIDTH = 500;
const VIEWBOX_HEIGHT = 500;
const PADDING = 50;

function scaleX(x: number): number {
  return PADDING + (x / 100) * (VIEWBOX_WIDTH - 2 * PADDING);
}

function scaleY(y: number): number {
  return PADDING + (y / 100) * (VIEWBOX_HEIGHT - 2 * PADDING);
}

type NodeState = 'default' | 'current' | 'queue' | 'visited';

function getNodeState(id: string, visited: string[], current: string | null, queue: string[]): NodeState {
  if (id === current) return 'current';
  if (visited.includes(id)) return 'visited';
  if (queue.includes(id)) return 'queue';
  return 'default';
}

const NODE_STYLES: Record<NodeState, { stroke: string; fill: string; textFill: string }> = {
  default: { stroke: '#30363D', fill: '#161B22', textFill: '#8B949E' },
  current: { stroke: '#58A6FF', fill: 'rgba(88, 166, 255, 0.2)', textFill: '#58A6FF' },
  queue: { stroke: '#D29922', fill: 'rgba(210, 153, 34, 0.2)', textFill: '#D29922' },
  visited: { stroke: '#3FB950', fill: 'rgba(63, 185, 80, 0.2)', textFill: '#3FB950' },
};

export function GraphVisualizer({ graph, visited, current, queue }: GraphVisualizerProps) {
  const nodePositions = new Map<string, { cx: number; cy: number }>();
  for (const node of graph.nodes) {
    nodePositions.set(node.id, { cx: scaleX(node.x), cy: scaleY(node.y) });
  }

  return (
    <div className="flex items-center justify-center h-64 p-2">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-current" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-queue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {graph.edges.map((edge) => {
          const fromPos = nodePositions.get(edge.from);
          const toPos = nodePositions.get(edge.to);
          if (!fromPos || !toPos) return null;

          const fromState = getNodeState(edge.from, visited, current, queue);
          const toState = getNodeState(edge.to, visited, current, queue);
          const bothVisited =
            (fromState === 'visited' || fromState === 'current') &&
            (toState === 'visited' || toState === 'current');

          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={fromPos.cx}
              y1={fromPos.cy}
              x2={toPos.cx}
              y2={toPos.cy}
              stroke={bothVisited ? '#3FB950' : '#30363D'}
              strokeWidth={bothVisited ? 2.5 : 1.5}
              opacity={bothVisited ? 0.8 : 0.4}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Nodes */}
        {graph.nodes.map((node) => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;

          const state = getNodeState(node.id, visited, current, queue);
          const style = NODE_STYLES[state];
          const filterAttr =
            state === 'current' ? 'url(#glow-current)' :
            state === 'queue' ? 'url(#glow-queue)' :
            undefined;

          return (
            <g key={node.id} filter={filterAttr} className="transition-all duration-300">
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r={NODE_RADIUS}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={state === 'current' ? 3 : 2}
              />
              <text
                x={pos.cx}
                y={pos.cy}
                textAnchor="middle"
                dominantBaseline="central"
                fill={style.textFill}
                fontSize="16"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
