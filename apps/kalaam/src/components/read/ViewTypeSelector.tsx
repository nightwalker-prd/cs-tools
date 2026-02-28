interface ViewTypeSelectorProps {
  value: 'surah' | 'juz';
  onChange: (type: 'surah' | 'juz') => void;
}

const options: { key: 'surah' | 'juz'; label: string }[] = [
  { key: 'surah', label: 'Surah' },
  { key: 'juz', label: 'Juz' },
];

export default function ViewTypeSelector({ value, onChange }: ViewTypeSelectorProps) {
  return (
    <div className="flex bg-card rounded-full p-1">
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${
            value === key
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
