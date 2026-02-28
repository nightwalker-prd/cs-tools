import * as React from 'react';
import { cn } from './utils';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export function CodeBlock({ code, language = 'javascript', showLineNumbers = true, highlightLines = [], className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const lines = code.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('relative rounded-md border border-[#30363D] bg-[#010409] overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#30363D] bg-[#161B22]">
        <span className="text-xs text-[#8B949E] font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm font-mono leading-relaxed">
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                'px-2 -mx-2',
                highlightLines.includes(i + 1) && 'bg-[#58A6FF]/10 border-l-2 border-[#58A6FF]'
              )}
            >
              {showLineNumbers && (
                <span className="inline-block w-8 text-right mr-4 text-[#484F58] select-none text-xs">
                  {i + 1}
                </span>
              )}
              <span className="text-[#E6EDF3]">{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
