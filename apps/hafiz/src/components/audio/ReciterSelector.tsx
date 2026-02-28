import { RECITERS } from '../../data/reciters';

interface ReciterSelectorProps {
  value: string;
  onChange: (reciterId: string) => void;
}

export function ReciterSelector({ value, onChange }: ReciterSelectorProps) {
  return (
    <div className="reciter-selector">
      <label className="form-label">Reciter</label>
      <select
        className="form-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {RECITERS.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>
    </div>
  );
}
