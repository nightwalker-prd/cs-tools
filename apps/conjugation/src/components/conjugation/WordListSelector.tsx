import { Plus } from 'lucide-react';
import type { WordList } from '../../types';

interface WordListSelectorProps {
  wordLists: WordList[];
  activeListId: string | null;
  onSelectList: (id: string | null) => void;
  onCreateList: () => void;
  isLoading?: boolean;
}

export function WordListSelector({
  wordLists,
  activeListId,
  onSelectList,
  onCreateList,
  isLoading,
}: WordListSelectorProps) {
  const totalCustomWords = wordLists.reduce((sum, l) => sum + l.words.length, 0);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Word List Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">List:</span>
        <select
          value={activeListId || ''}
          onChange={(e) => onSelectList(e.target.value || null)}
          className="px-3 py-1 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-accent focus:border-transparent min-w-[150px]"
          disabled={isLoading}
        >
          <option value="">All Lists ({totalCustomWords})</option>
          {[...wordLists].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })).map((list) => (
            <option key={list.id} value={list.id}>
              {list.name} ({list.words.length})
            </option>
          ))}
        </select>
        <button
          onClick={onCreateList}
          className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all"
          title="Create new list"
        >
          <Plus className="w-3.5 h-3.5" />
          New List
        </button>
      </div>
    </div>
  );
}
