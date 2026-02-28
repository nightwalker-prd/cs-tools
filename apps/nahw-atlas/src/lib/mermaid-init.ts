import type { MermaidConfig } from 'mermaid';

let mermaidPromise: Promise<typeof import('mermaid')['default']> | null = null;

export async function getMermaid(config: MermaidConfig) {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(mod => {
      mod.default.initialize({ startOnLoad: false, securityLevel: 'loose', ...config });
      return mod.default;
    });
  }
  const mermaid = await mermaidPromise;
  // Re-initialize with the current config each time so mini vs full configs apply correctly
  mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', ...config });
  return mermaid;
}

let counter = 0;
export function uniqueId(prefix: string) {
  return `${prefix}-${++counter}`;
}
