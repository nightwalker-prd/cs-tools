/**
 * Custom Word Manager Component
 *
 * Modal for managing word lists:
 * - Select word list from dropdown
 * - View words from selected list
 * - Rename/delete lists
 * - Delete individual words
 * - Export list to JSON
 * - Import words to list from JSON
 * - Import preset word lists from Sarf curriculum
 */

import { useState, useRef, useEffect } from 'react';
import { X, Download, Upload, Trash2, AlertTriangle, FileJson, Edit2, Info, Library, List } from 'lucide-react';
import type { ArabicWord } from '../../data/arabicRoots';
import type { WordList } from '../../types';
import { PresetLibrary } from './PresetLibrary';
import type { PresetWordList } from '../../data/presets';

interface CustomWordManagerProps {
  isOpen: boolean;
  onClose: () => void;
  wordLists: WordList[];
  activeListId: string | null;
  onSelectList: (id: string | null) => void;
  onCreateList: () => void;
  onRenameList: (id: string, name: string, nameAr?: string) => void;
  onDeleteList: (id: string) => void;
  onDeleteWord: (listId: string, wordIndex: number) => void;
  onExportList: (listId: string) => void;
  onImportWords: (listId: string, words: ArabicWord[]) => void;
  onImportPreset?: (preset: PresetWordList) => void;
}

type TabType = 'my-lists' | 'preset-library';

export function CustomWordManager({
  isOpen,
  onClose,
  wordLists,
  activeListId,
  onSelectList,
  onCreateList: _onCreateList,
  onRenameList,
  onDeleteList,
  onDeleteWord,
  onExportList,
  onImportWords,
  onImportPreset,
}: CustomWordManagerProps) {
  // Note: onCreateList is passed but we handle list creation through the parent
  void _onCreateList;
  const [activeTab, setActiveTab] = useState<TabType>('my-lists');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameName, setRenameName] = useState('');
  const [renameNameAr, setRenameNameAr] = useState('');
  const [showSchemaInfo, setShowSchemaInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const listSelectorRef = useRef<HTMLSelectElement>(null);

  // Focus list selector on open
  useEffect(() => {
    if (isOpen && listSelectorRef.current) {
      setTimeout(() => listSelectorRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (showDeleteConfirm) {
          setShowDeleteConfirm(false);
        } else if (showRenameModal) {
          setShowRenameModal(false);
        } else if (showSchemaInfo) {
          setShowSchemaInfo(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, showDeleteConfirm, showRenameModal, showSchemaInfo, onClose]);

  // Get the currently selected list
  const selectedList = activeListId ? wordLists.find(l => l.id === activeListId) : null;
  const customWords = selectedList?.words || [];
  const totalWords = wordLists.reduce((sum, list) => sum + list.words.length, 0);

  const handleExport = () => {
    if (!selectedList || customWords.length === 0) {
      alert('No custom words to export');
      return;
    }

    onExportList(selectedList.id);
    setImportSuccess(`Exported ${customWords.length} custom word${customWords.length > 1 ? 's' : ''}`);
    setTimeout(() => setImportSuccess(null), 3000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedList) return;

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(null);

    try {
      const content = await file.text();
      const data = JSON.parse(content);

      // Basic validation
      if (!data.customWords || !Array.isArray(data.customWords)) {
        setImportError('Invalid file format: missing customWords array');
        return;
      }

      // Filter valid words
      const validWords = data.customWords.filter((w: any) =>
        w.root && w.type && w.verbForm && w.pastTense && w.presentTense
      );

      if (validWords.length === 0) {
        setImportError('No valid words found in file');
        return;
      }

      onImportWords(selectedList.id, validWords);
      setImportSuccess(`Imported ${validWords.length} word${validWords.length > 1 ? 's' : ''}`);
      setTimeout(() => setImportSuccess(null), 5000);
    } catch (error: any) {
      setImportError(error.message || 'Failed to import file');
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleOpenRenameModal = () => {
    if (!selectedList) return;
    setRenameName(selectedList.name);
    setRenameNameAr(selectedList.nameAr || '');
    setShowRenameModal(true);
  };

  const handleRename = () => {
    if (!selectedList || !renameName.trim()) return;
    try {
      onRenameList(selectedList.id, renameName.trim(), renameNameAr.trim() || undefined);
      setShowRenameModal(false);
      setImportSuccess('List renamed successfully');
      setTimeout(() => setImportSuccess(null), 3000);
    } catch (error) {
      setImportError('Failed to rename list');
      setTimeout(() => setImportError(null), 3000);
    }
  };

  const handleDeleteList = () => {
    if (!selectedList) return;
    try {
      onDeleteList(selectedList.id);
      setShowDeleteConfirm(false);
      setImportSuccess('List deleted successfully');
      setTimeout(() => setImportSuccess(null), 3000);
    } catch (error) {
      setImportError('Failed to delete list');
      setTimeout(() => setImportError(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="word-manager-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 id="word-manager-modal-title" className="text-2xl font-semibold text-primary">Manage Word Lists</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {wordLists.length} list{wordLists.length !== 1 ? 's' : ''}, {totalWords} total words
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 border-b border-gray-200 px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('my-lists')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'my-lists'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
              My Lists
            </button>
            <button
              onClick={() => setActiveTab('preset-library')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'preset-library'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Library className="w-4 h-4" />
              Preset Library
            </button>
          </div>
        </div>

        {/* My Lists Tab Content */}
        {activeTab === 'my-lists' && (
          <>
        {/* List Selector */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <label htmlFor="list-selector" className="text-sm font-medium text-gray-700">Select List:</label>
            <select
              id="list-selector"
              ref={listSelectorRef}
              value={activeListId || ''}
              onChange={(e) => onSelectList(e.target.value || null)}
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">All Lists ({totalWords} words)</option>
              {wordLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name} ({list.words.length} words)
                </option>
              ))}
            </select>
            {selectedList && (
              <>
                <button
                  onClick={handleOpenRenameModal}
                  className="p-2 rounded-lg border border-gray-300 hover:border-accent transition-all"
                  aria-label={`Rename list: ${selectedList.name}`}
                >
                  <Edit2 className="w-4 h-4 text-primary" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 rounded-lg border border-red-200 hover:border-red-400 transition-all"
                  aria-label={`Delete list: ${selectedList.name}`}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Success/Error Messages */}
        {(importSuccess || importError) && (
          <div className="px-6 pt-4">
            {importSuccess && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                <FileJson className="w-4 h-4 flex-shrink-0" />
                {importSuccess}
              </div>
            )}
            {importError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {importError}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3 flex-wrap">
          <button
            onClick={handleExport}
            disabled={!selectedList || customWords.length === 0}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-all ${
              selectedList && customWords.length > 0
                ? 'bg-accent text-white border-accent hover:opacity-90'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            Export List
          </button>

          <button
            onClick={handleImportClick}
            disabled={!selectedList || isImporting}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-all ${
              selectedList && !isImporting
                ? 'bg-primary text-white border-primary hover:opacity-90'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            <Upload className="w-4 h-4" />
            {isImporting ? 'Importing...' : 'Import to List'}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => setShowSchemaInfo(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-accent hover:text-accent transition-all"
            title="View JSON format"
          >
            <Info className="w-4 h-4" />
            JSON Format
          </button>
        </div>

        {/* Word List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!selectedList ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileJson className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-lg text-muted-foreground mb-2">Select a list to view words</p>
              <p className="text-sm text-muted-foreground">
                Choose a list from the dropdown above, or create a new one
              </p>
            </div>
          ) : customWords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileJson className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-lg text-muted-foreground mb-2">No words in this list</p>
              <p className="text-sm text-muted-foreground">
                Import a preset from the Preset Library to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {customWords.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-accent/50 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="text-xl font-arabic text-primary"
                        dir="rtl"
                        lang="ar"
                      >
                        {word.root}
                      </div>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        Form {word.verbForm || 'I'}
                      </span>
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                        {word.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm" dir="rtl" lang="ar">
                      <span className="font-arabic text-primary">
                        {word.pastTense}
                      </span>
                      <span className="font-arabic text-primary">
                        {word.presentTense}
                      </span>
                      <span className="font-arabic text-primary">
                        {word.gerund}
                      </span>
                    </div>
                    {word.meaning && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {word.meaning}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteWord(selectedList.id, index)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                    aria-label={`Delete word: ${word.root}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
          </>
        )}

        {/* Preset Library Tab Content */}
        {activeTab === 'preset-library' && (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <PresetLibrary
              existingListNames={wordLists.map(l => l.name)}
              onImportPreset={(preset) => {
                if (onImportPreset) {
                  onImportPreset(preset);
                  setImportSuccess(`Imported "${preset.name}" with ${preset.verbCount} verbs`);
                  setTimeout(() => setImportSuccess(null), 3000);
                }
              }}
            />
          </div>
        )}

        {/* Delete List Confirmation Dialog */}
        {showDeleteConfirm && selectedList && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">Delete List?</h3>
                  <p className="text-sm text-muted-foreground">
                    This will permanently delete "{selectedList.name}" and all {selectedList.words.length} word
                    {selectedList.words.length !== 1 ? 's' : ''} in it. Export the list first if you want to keep a backup.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteList}
                  className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete List
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rename List Modal */}
        {showRenameModal && selectedList && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4 w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary">Rename List</h3>
                <button
                  onClick={() => setShowRenameModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    List Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={renameName}
                    onChange={(e) => setRenameName(e.target.value)}
                    placeholder="Chapter 5 Verbs"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arabic Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={renameNameAr}
                    onChange={(e) => setRenameNameAr(e.target.value)}
                    placeholder="أفعال الباب الخامس"
                    dir="rtl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent font-arabic"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowRenameModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRename}
                  disabled={!renameName.trim()}
                  className={`px-4 py-2 text-sm rounded-lg ${
                    renameName.trim()
                      ? 'bg-accent text-white hover:opacity-90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Rename
                </button>
              </div>
            </div>
          </div>
        )}

        {/* JSON Schema Info Modal */}
        {showSchemaInfo && (
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-10"
            onClick={() => setShowSchemaInfo(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-accent" />
                  <h3 className="text-base font-semibold text-primary">JSON Format</h3>
                </div>
                <button
                  onClick={() => setShowSchemaInfo(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono whitespace-pre">{`{
  "version": "1.0",
  "exportDate": "2025-01-01T00:00:00.000Z",
  "customWordsCount": 1,
  "customWords": [
    {
      "root": "ك ت ب",
      "pastTense": "كَتَبَ",
      "presentTense": "يَكْتُبُ",
      "gerund": "كِتَابَة",
      "type": "Regular",
      "verbForm": "I",
      "meaning": "to write",
      "difficulty": "beginner"
    }
  ]
}`}</pre>
              </div>

              <button
                onClick={() => setShowSchemaInfo(false)}
                className="w-full mt-4 px-3 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:opacity-90 transition-all"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Word lists are stored locally in your browser.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
