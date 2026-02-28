import type { SarfExample } from '../data/types';

interface ExampleBlockProps {
  example: SarfExample;
}

export function ExampleBlock({ example }: ExampleBlockProps) {
  return (
    <div className="example-block">
      <p className="example-arabic font-arabic" dir="rtl">{example.arabic}</p>
      <p className="example-translation">{example.translation}</p>
      {example.source && (
        <span className="example-source">{example.source}</span>
      )}
      {example.irab && (
        <p className="example-irab">{example.irab}</p>
      )}
    </div>
  );
}
