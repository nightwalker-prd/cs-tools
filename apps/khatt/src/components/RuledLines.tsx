import type { LinePattern } from '@/types';

interface RuledLinesProps {
  pattern: LinePattern;
}

export function RuledLines({ pattern }: RuledLinesProps) {
  if (pattern === 'blank') return null;

  if (pattern === 'grid') {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59,40,32,0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    );
  }

  // Lined pattern — Arabic baseline guides
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <pattern id="lines" width="100%" height="48" patternUnits="userSpaceOnUse" x="0" y="0">
          <line x1="0" y1="47.5" x2="100%" y2="47.5" stroke="rgba(59,40,32,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lines)" />
    </svg>
  );
}
