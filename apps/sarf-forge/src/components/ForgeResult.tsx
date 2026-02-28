import type { ForgeResult as ForgeResultType, ForgeRoot, ForgePattern } from '../types';

interface ForgeResultProps {
  result: ForgeResultType;
  root: ForgeRoot;
  pattern: ForgePattern;
}

export function ForgeResultDisplay({ result, root, pattern }: ForgeResultProps) {
  return (
    <div
      className={`rounded-2xl p-6 relative border ${
        result.success
          ? 'bg-gradient-to-br from-accent/[0.08] to-primary/[0.05] border-accent/25'
          : 'bg-gradient-to-br from-destructive/[0.08] to-destructive/[0.03] border-destructive/25'
      }`}
      style={{ animation: 'slideUp 0.4s ease' }}
    >
      {/* Badge */}
      <div
        className={`absolute -top-2.5 left-5 px-3 py-0.5 rounded-full text-[11px] font-sans font-semibold tracking-wide uppercase ${
          result.success
            ? 'bg-accent text-background'
            : 'bg-destructive text-white'
        }`}
      >
        {result.success ? '\u2726 Word Discovered' : '\u2717 Dead End'}
      </div>

      {result.success ? (
        <div className="text-center">
          <div
            className="font-arabic text-[42px] text-primary my-2"
            dir="rtl"
            style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.2)' }}
          >
            {result.word}
          </div>
          <div className="text-lg text-foreground my-1 mb-3">{result.meaning}</div>
          <div className="text-sm text-muted-foreground leading-relaxed max-w-[600px] mx-auto px-4 py-3 rounded-lg bg-black/20">
            {result.note}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="font-arabic text-[28px] text-destructive my-2 opacity-60" dir="rtl">
            {root.letters} + {pattern.display}
          </div>
          <div className="text-[15px] text-red-300 my-1 mb-3 italic">
            This combination doesn't produce a standard word
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed max-w-[600px] mx-auto px-4 py-3 rounded-lg bg-black/20 text-left">
            &#x1F4A1; {result.note}
          </div>
        </div>
      )}
    </div>
  );
}
