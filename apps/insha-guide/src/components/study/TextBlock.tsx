import type { TextBlockData } from '../../data/types';

interface TextBlockProps {
  data: TextBlockData;
}

export function TextBlock({ data }: TextBlockProps) {
  return (
    <div
      className={data.arabic ? 'font-arabic' : undefined}
      dir={data.arabic ? 'rtl' : undefined}
      style={{
        fontSize: data.arabic ? '1.15rem' : '1rem',
        lineHeight: data.arabic ? '2' : '1.7',
        color: 'var(--color-foreground)',
        marginBottom: '1rem',
      }}
    >
      {data.content}
    </div>
  );
}
