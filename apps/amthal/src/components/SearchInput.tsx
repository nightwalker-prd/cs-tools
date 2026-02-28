import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search proverbs...' }: SearchInputProps) {
  return (
    <div className="search-container">
      <div className="search-input-wrap">
        <Search size={18} className="search-icon" />
        <input
          className="search-input"
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {value && (
          <button className="search-clear" onClick={() => onChange('')}>
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
