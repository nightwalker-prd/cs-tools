import { useState, useMemo } from 'react';
import { usePersistedState } from '@cstools/core/hooks';
import { Sidebar } from './components/Sidebar';
import { ConceptCard } from './components/ConceptCard';
import { ConceptDetail } from './components/ConceptDetail';
import { concepts, categories } from './data/concepts';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = usePersistedState<string[]>('system-design-bookmarks', []);

  const filteredConcepts = useMemo(() => {
    return concepts.filter(c => {
      if (activeCategory && c.category !== activeCategory) return false;
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, searchQuery]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const selected = concepts.find(c => c.id === selectedConcept);

  return (
    <div className="flex h-screen bg-[#0D1117]">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-1 overflow-y-auto p-8">
        {selected ? (
          <ConceptDetail
            concept={selected}
            isBookmarked={bookmarks.includes(selected.id)}
            onToggleBookmark={toggleBookmark}
            onBack={() => setSelectedConcept(null)}
          />
        ) : (
          <div>
            <h2 className="text-xl font-bold text-[#E6EDF3] mb-6">
              {activeCategory ? categories.find(c => c.id === activeCategory)?.name || 'Concepts' : 'All Concepts'}
              <span className="text-sm text-[#8B949E] font-normal ml-2">({filteredConcepts.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConcepts.map(concept => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  isBookmarked={bookmarks.includes(concept.id)}
                  onToggleBookmark={toggleBookmark}
                  onClick={() => setSelectedConcept(concept.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
