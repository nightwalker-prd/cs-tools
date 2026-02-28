import type { BalagahExample } from '../data/types';

interface ExampleBlockProps {
  example: BalagahExample;
}

export function ExampleBlock({ example }: ExampleBlockProps) {
  return (
    <div className="example-block">
      <p className="example-arabic font-arabic" dir="rtl">{example.arabic}</p>
      <p className="example-translation">{example.translation}</p>
      {example.source && (
        <span className="example-source">{example.source}</span>
      )}
      {example.analysis && (
        <p className="example-analysis">{example.analysis}</p>
      )}
    </div>
  );
}
