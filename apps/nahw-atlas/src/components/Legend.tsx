export function Legend() {
  const items = [
    { label: 'Category', color: 'bg-primary', textColor: 'text-white', border: '' },
    { label: 'Subtopic', color: 'bg-parchment-warm', textColor: 'text-primary', border: 'border-2 border-accent' },
    { label: 'Topic', color: 'bg-parchment', textColor: 'text-foreground', border: 'border border-parchment-dark' },
    { label: 'Rule', color: 'bg-white', textColor: 'text-primary', border: 'border border-dashed border-accent' },
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center text-xs">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className={`w-3.5 h-3.5 rounded-sm ${item.color} ${item.border}`} />
          <span className="text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
