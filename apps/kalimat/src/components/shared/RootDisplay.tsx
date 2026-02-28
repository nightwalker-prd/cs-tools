interface RootDisplayProps {
  root: string;
  className?: string;
  onClick?: () => void;
}

export function RootDisplay({ root, className = '', onClick }: RootDisplayProps) {
  // Display root with dash separators: e.g., "كتب" → "ك-ت-ب"
  const letters = root.split('');
  const formatted = letters.join('-');

  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      className={`root-display ${className}`}
      onClick={onClick}
      dir="rtl"
    >
      {formatted}
    </Tag>
  );
}
