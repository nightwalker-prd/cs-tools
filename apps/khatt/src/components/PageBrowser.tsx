import { useEffect, useState, useCallback } from 'react';
import type { Page } from '@/types';
import * as storage from '@/engine/storage';

interface PageBrowserProps {
  notebookId: string;
  notebook: ReturnType<typeof import('@/hooks/useNotebook').useNotebook>;
  onNavigate: (path: string) => void;
}

export function PageBrowser({ notebookId, notebook, onNavigate }: PageBrowserProps) {
  const [pages, setPages] = useState<(Page | null)[]>([]);
  const loadedRef = useState({ id: '' })[0];

  useEffect(() => {
    if (loadedRef.id === notebookId) return;
    loadedRef.id = notebookId;
    notebook.openNotebook(notebookId).then(nb => {
      if (!nb) return;
      Promise.all(nb.pages.map(pid => storage.loadPage(pid))).then(loaded => {
        setPages(loaded.map(p => p ?? null));
      });
    });
  }, [notebookId, notebook, loadedRef]);

  const handleAddPage = useCallback(async () => {
    const page = await notebook.addPage(notebookId);
    if (page) {
      onNavigate('page/' + page.id);
    }
  }, [notebook, notebookId, onNavigate]);

  const handleDeletePage = useCallback(async (pageId: string) => {
    if (!confirm('Delete this page?')) return;
    await notebook.deletePageById(notebookId, pageId);
    setPages(prev => prev.filter(p => p?.id !== pageId));
  }, [notebook, notebookId]);

  const currentNb = notebook.currentNotebook;

  return (
    <div className="browser-container">
      {/* Header */}
      <div className="page-browser-header">
        <button className="page-browser-back" onClick={() => onNavigate('')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h2 className="page-browser-title">
            {currentNb?.name ?? 'Notebook'}
          </h2>
          <p className="page-browser-count">
            {pages.length} {pages.length === 1 ? 'page' : 'pages'}
          </p>
        </div>
      </div>

      {/* Page grid */}
      <div className="page-grid stagger-in">
        {pages.map((page, i) => {
          if (!page) return null;
          return (
            <div key={page.id} className="relative group">
              <button
                className="page-thumb w-full"
                onClick={() => onNavigate('page/' + page.id)}
              >
                {page.thumbnail ? (
                  <img src={page.thumbnail} alt={`Page ${i + 1}`} />
                ) : (
                  <div className="page-thumb-empty">
                    <span>{i + 1}</span>
                  </div>
                )}
              </button>
              <span className="page-thumb-number">{i + 1}</span>
              <button
                onClick={() => handleDeletePage(page.id)}
                className="page-thumb-delete"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                </svg>
              </button>
            </div>
          );
        })}

        {/* Add page */}
        <button
          className="add-card"
          onClick={handleAddPage}
          style={{ aspectRatio: '3/4' }}
        >
          <div className="add-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <span>Add Page</span>
        </button>
      </div>
    </div>
  );
}
