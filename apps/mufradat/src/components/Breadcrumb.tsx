interface BreadcrumbProps {
  items: { label: string; slug?: string }[];
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
}

export function Breadcrumb({ items, onNavigate, onGoHome }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      <button onClick={onGoHome} className="breadcrumb-link">Home</button>
      {items.map((item, i) => (
        <span key={i}>
          <span className="breadcrumb-sep">/</span>
          {item.slug ? (
            <button onClick={() => onNavigate(item.slug!)} className="breadcrumb-link">
              {item.label}
            </button>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
