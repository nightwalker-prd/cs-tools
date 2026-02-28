/**
 * Hans Wehr Arabic Dictionary
 *
 * Standalone Arabic dictionary tool for root-based lookup
 */

import { useState, useRef } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@arabtools/ui';
import { loadHansWehrLetter } from './dataLoader';
import type { HansWehrEntry, HansWehrTableRow } from './types';

export default function App() {
  const [searchRoot, setSearchRoot] = useState('');
  const [searchResults, setSearchResults] = useState<HansWehrEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const letterCache = useRef<Map<string, HansWehrEntry[]>>(new Map());

  const handleSearch = async () => {
    const trimmedRoot = searchRoot.trim();

    if (!trimmedRoot) {
      setError('Please enter an Arabic root');
      return;
    }

    // Validate Arabic letters
    const arabicLetterRegex = /[\u0600-\u06FF]/;
    if (!arabicLetterRegex.test(trimmedRoot)) {
      setError('Please enter valid Arabic letters');
      return;
    }

    const firstLetter = trimmedRoot[0];
    setError(null);

    try {
      // Check cache first
      let letterData = letterCache.current.get(firstLetter);
      const isCacheHit = !!letterData;

      // Only show loading for actual network requests
      if (!isCacheHit) {
        setIsLoading(true);
        letterData = await loadHansWehrLetter(firstLetter);
        letterCache.current.set(firstLetter, letterData);
      }

      // Filter by exact root match
      const results = letterData!.filter(entry => entry.root === trimmedRoot);

      if (results.length === 0) {
        setError('Root not found. Please check your spelling.');
        setSearchResults([]);
      } else {
        setSearchResults(results);
        setError(null);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to load dictionary data. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Flatten search results into table rows
  const getTableRows = (): HansWehrTableRow[] => {
    return searchResults.flatMap(entry => {
      const allWords = [
        ...entry.forms,
        ...(entry.nouns || [])
      ];

      return allWords.map(word => ({
        arabic: word.text,
        transliteration: word.transliteration,
        form: word.form || '-',
        root: word.root.text,
        translation: word.translation.short || word.translation.text
      }));
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-white to-[#faf8f5] p-8 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
            <h1 className="text-primary text-3xl mb-2">Hans Wehr Dictionary</h1>
            <p className="text-xl mb-4 font-arabic" dir="rtl">
              معجم هانز فير
            </p>
            <p className="text-muted-foreground max-w-3xl">
              Search Arabic roots to discover all derived forms, meanings, and patterns.
              A comprehensive reference for classical Arabic morphology.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              dir="rtl"
              value={searchRoot}
              onChange={(e) => setSearchRoot(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ابحث عن الجذر... (Search by root)"
              className="flex-1 px-4 py-3 rounded-xl border border-accent/20 focus:border-accent focus:outline-none text-xl font-arabic"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dictionary data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!isLoading && !error && searchResults.length === 0 && !searchRoot && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-accent/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Enter an Arabic root to search</p>
            </div>
          )}

          {!isLoading && !error && searchResults.length > 0 && (
            <div>
              <p className="text-primary mb-4">
                Results for: <span className="text-xl font-arabic" dir="rtl">{searchRoot}</span> ({searchResults.length} entries)
              </p>
              <div className="overflow-x-auto">
                <Table className="table-fixed w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right w-32" dir="rtl">Arabic Word</TableHead>
                      <TableHead className="w-36">Transliteration</TableHead>
                      <TableHead className="w-16">Form</TableHead>
                      <TableHead className="text-right w-20" dir="rtl">Root</TableHead>
                      <TableHead className="w-auto">Translation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getTableRows().map((row, index) => (
                      <TableRow key={`${row.root}-${row.arabic}-${row.form}-${index}`} className="hover:bg-accent/5 transition-colors">
                        <TableCell
                          className="text-right text-xl font-arabic"
                          dir="rtl"
                        >
                          {row.arabic}
                        </TableCell>
                        <TableCell>{row.transliteration}</TableCell>
                        <TableCell>{row.form}</TableCell>
                        <TableCell
                          className="text-right font-arabic"
                          dir="rtl"
                        >
                          {row.root}
                        </TableCell>
                        <TableCell className="text-sm max-w-md break-words whitespace-normal">{row.translation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground text-sm">
          <p>Arab Tools - Hans Wehr Arabic-English Dictionary</p>
        </div>
      </div>
    </div>
  );
}
