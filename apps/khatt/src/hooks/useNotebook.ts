import { useState, useEffect, useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { Notebook, Page, KhattIndex } from '@/types';
import { COVER_COLORS } from '@/types';
import * as storage from '@/engine/storage';

const DEFAULT_INDEX: KhattIndex = {
  notebooks: [],
  activeNotebookId: null,
  activePageId: null,
  settings: {
    penStyle: 'calligraphy',
    inkColor: '#2A2522',
    linePattern: 'lined',
    penSize: 8,
  },
};

export function useNotebook() {
  const [index, setIndex] = usePersistedState<KhattIndex>('arabtools-khatt-index', DEFAULT_INDEX);
  const [currentNotebook, setCurrentNotebook] = useState<Notebook | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize: load notebooks from IndexedDB, create default if none exist
  useEffect(() => {
    let cancelled = false;
    async function init() {
      setLoading(true);
      const notebooks = await storage.loadAllNotebooks();

      if (cancelled) return;

      if (notebooks.length === 0) {
        // Create default notebook
        const defaultNb: Notebook = {
          id: crypto.randomUUID(),
          name: 'My Notebook',
          pages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          coverColor: COVER_COLORS[0],
        };
        await storage.saveNotebook(defaultNb);

        // Create first page
        const firstPage: Page = {
          id: crypto.randomUUID(),
          strokes: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        defaultNb.pages.push(firstPage.id);
        await storage.saveNotebook(defaultNb);
        await storage.savePage(firstPage);

        if (cancelled) return;

        setIndex({
          ...DEFAULT_INDEX,
          notebooks: [{
            id: defaultNb.id,
            name: defaultNb.name,
            pageCount: 1,
            updatedAt: defaultNb.updatedAt,
            coverColor: defaultNb.coverColor,
          }],
          activeNotebookId: defaultNb.id,
          activePageId: firstPage.id,
        });
      } else {
        // Sync index from IndexedDB
        setIndex(prev => ({
          ...prev,
          notebooks: notebooks.map(nb => ({
            id: nb.id,
            name: nb.name,
            pageCount: nb.pages.length,
            updatedAt: nb.updatedAt,
            coverColor: nb.coverColor,
          })),
        }));
      }
      setLoading(false);
      setInitialized(true);
    }
    init();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNotebook = useCallback(async (notebookId: string) => {
    setLoading(true);
    const nb = await storage.loadNotebook(notebookId);
    if (nb) {
      setCurrentNotebook(nb);
      setIndex(prev => ({ ...prev, activeNotebookId: notebookId }));
    }
    setLoading(false);
    return nb;
  }, [setIndex]);

  const openPage = useCallback(async (pageId: string) => {
    setLoading(true);
    const page = await storage.loadPage(pageId);
    if (page) {
      setCurrentPage(page);
      setIndex(prev => ({ ...prev, activePageId: pageId }));
    }
    setLoading(false);
    return page;
  }, [setIndex]);

  const saveCurrentPage = useCallback(async (strokes: import('@/types').Stroke[], thumbnail?: string) => {
    if (!currentPage) return;
    const updated: Page = {
      ...currentPage,
      strokes,
      thumbnail,
      updatedAt: Date.now(),
    };
    await storage.savePage(updated);
    setCurrentPage(updated);
  }, [currentPage]);

  const createNotebook = useCallback(async (name: string, coverColor: string) => {
    const nb: Notebook = {
      id: crypto.randomUUID(),
      name,
      pages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      coverColor,
    };
    // Create first page
    const firstPage: Page = {
      id: crypto.randomUUID(),
      strokes: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    nb.pages.push(firstPage.id);
    await storage.saveNotebook(nb);
    await storage.savePage(firstPage);
    setIndex(prev => ({
      ...prev,
      notebooks: [
        { id: nb.id, name: nb.name, pageCount: 1, updatedAt: nb.updatedAt, coverColor },
        ...prev.notebooks,
      ],
    }));
    return nb;
  }, [setIndex]);

  const deleteNotebookById = useCallback(async (notebookId: string) => {
    const nb = await storage.loadNotebook(notebookId);
    if (nb) {
      // Delete all pages
      for (const pageId of nb.pages) {
        await storage.deletePage(pageId);
      }
      await storage.deleteNotebook(notebookId);
    }
    setIndex(prev => ({
      ...prev,
      notebooks: prev.notebooks.filter(n => n.id !== notebookId),
      activeNotebookId: prev.activeNotebookId === notebookId ? null : prev.activeNotebookId,
    }));
    if (currentNotebook?.id === notebookId) {
      setCurrentNotebook(null);
    }
  }, [setIndex, currentNotebook]);

  const renameNotebook = useCallback(async (notebookId: string, newName: string) => {
    const nb = await storage.loadNotebook(notebookId);
    if (!nb) return;
    nb.name = newName;
    nb.updatedAt = Date.now();
    await storage.saveNotebook(nb);
    setIndex(prev => ({
      ...prev,
      notebooks: prev.notebooks.map(n =>
        n.id === notebookId ? { ...n, name: newName, updatedAt: nb.updatedAt } : n
      ),
    }));
    if (currentNotebook?.id === notebookId) {
      setCurrentNotebook(nb);
    }
  }, [setIndex, currentNotebook]);

  const addPage = useCallback(async (notebookId: string) => {
    const nb = await storage.loadNotebook(notebookId);
    if (!nb) return null;
    const page: Page = {
      id: crypto.randomUUID(),
      strokes: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    nb.pages.push(page.id);
    nb.updatedAt = Date.now();
    await storage.savePage(page);
    await storage.saveNotebook(nb);
    setCurrentNotebook(nb);
    setIndex(prev => ({
      ...prev,
      notebooks: prev.notebooks.map(n =>
        n.id === notebookId ? { ...n, pageCount: nb.pages.length, updatedAt: nb.updatedAt } : n
      ),
    }));
    return page;
  }, [setIndex]);

  const deletePageById = useCallback(async (notebookId: string, pageId: string) => {
    const nb = await storage.loadNotebook(notebookId);
    if (!nb) return;
    nb.pages = nb.pages.filter(p => p !== pageId);
    nb.updatedAt = Date.now();
    await storage.deletePage(pageId);
    await storage.saveNotebook(nb);
    setCurrentNotebook(nb);
    setIndex(prev => ({
      ...prev,
      notebooks: prev.notebooks.map(n =>
        n.id === notebookId ? { ...n, pageCount: nb.pages.length, updatedAt: nb.updatedAt } : n
      ),
    }));
    if (currentPage?.id === pageId) {
      setCurrentPage(null);
    }
  }, [setIndex, currentPage]);

  return {
    index,
    currentNotebook,
    currentPage,
    loading,
    initialized,
    openNotebook,
    openPage,
    saveCurrentPage,
    createNotebook,
    deleteNotebookById,
    renameNotebook,
    addPage,
    deletePageById,
  };
}
