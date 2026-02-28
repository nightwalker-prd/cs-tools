import { Search } from 'lucide-react';
import { Input } from '@cstools/ui';
import { categories } from '../data/concepts';

interface SidebarProps {
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Sidebar({ activeCategory, onCategoryChange, searchQuery, onSearchChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#161B22] border-r border-[#30363D] flex flex-col h-screen">
      <div className="p-4 border-b border-[#30363D]">
        <h1 className="text-lg font-bold text-[#E6EDF3]">System Design</h1>
        <p className="text-xs text-[#8B949E]">Interactive reference guide</p>
      </div>
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E]" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search concepts..."
            className="pl-9 bg-[#0D1117] border-[#30363D] text-sm"
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-3 py-2 rounded text-sm mb-1 ${!activeCategory ? 'bg-[#58A6FF]/10 text-[#58A6FF]' : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'}`}
        >
          All Concepts
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`w-full text-left px-3 py-2 rounded text-sm ${activeCategory === cat.id ? 'bg-[#58A6FF]/10 text-[#58A6FF]' : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'}`}
          >
            {cat.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
