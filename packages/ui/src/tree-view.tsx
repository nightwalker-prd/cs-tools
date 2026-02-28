import { cn } from './utils';

interface TreeNodeData {
  value: string | number;
  left?: TreeNodeData;
  right?: TreeNodeData;
  highlighted?: boolean;
  visited?: boolean;
}

interface TreeViewProps {
  root?: TreeNodeData;
  className?: string;
}

function TreeNodeComponent({ node, level = 0 }: { node: TreeNodeData; level?: number }) {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold border-2 transition-all duration-300',
          node.highlighted
            ? 'bg-[#58A6FF] border-[#58A6FF] text-[#0D1117] scale-110'
            : node.visited
              ? 'bg-[#3FB950]/20 border-[#3FB950] text-[#3FB950]'
              : 'bg-[#161B22] border-[#30363D] text-[#E6EDF3]'
        )}
      >
        {node.value}
      </div>
      {(node.left || node.right) && (
        <div className="flex gap-4 mt-1">
          <div className="flex flex-col items-center">
            {node.left && (
              <>
                <div className="w-px h-4 bg-[#30363D]" />
                <TreeNodeComponent node={node.left} level={level + 1} />
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            {node.right && (
              <>
                <div className="w-px h-4 bg-[#30363D]" />
                <TreeNodeComponent node={node.right} level={level + 1} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function TreeView({ root, className }: TreeViewProps) {
  if (!root) {
    return (
      <div className={cn('flex items-center justify-center p-8 text-[#8B949E]', className)}>
        No tree data
      </div>
    );
  }

  return (
    <div className={cn('flex justify-center p-4 overflow-auto', className)}>
      <TreeNodeComponent node={root} />
    </div>
  );
}

export type { TreeNodeData };
