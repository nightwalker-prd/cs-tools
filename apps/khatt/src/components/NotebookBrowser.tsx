import { useState } from 'react';
import { COVER_COLORS } from '@/types';

interface NotebookBrowserProps {
  notebook: ReturnType<typeof import('@/hooks/useNotebook').useNotebook>;
  onNavigate: (path: string) => void;
}

export function NotebookBrowser({ notebook, onNavigate }: NotebookBrowserProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(COVER_COLORS[0]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    const nb = await notebook.createNotebook(newName.trim(), newColor);
    setNewName('');
    setShowCreate(false);
    onNavigate('notebook/' + nb.id);
  };

  if (!notebook.initialized) {
    return (
      <div className="loading-screen">
        <svg className="loading-quill" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
        <span className="loading-text">Opening notebooks...</span>
      </div>
    );
  }

  return (
    <div className="browser-container">
      <div className="browser-header">
        <h1 className="brand-title">Khatt</h1>
        <p className="brand-arabic font-arabic" dir="rtl">خطّ</p>
        <p className="brand-subtitle">Arabic Handwriting Practice</p>
      </div>

      <div className="notebook-grid stagger-in">
        {notebook.index.notebooks.map(nb => (
          <button
            key={nb.id}
            className="notebook-card"
            onClick={() => onNavigate('notebook/' + nb.id)}
          >
            <div className="notebook-cover-band" style={{ background: nb.coverColor }} />
            <div className="notebook-card-body">
              <h3 className="notebook-card-name">{nb.name}</h3>
              <div className="notebook-card-meta">
                <span>{nb.pageCount} {nb.pageCount === 1 ? 'page' : 'pages'}</span>
                <span className="dot" />
                <span>{new Date(nb.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </button>
        ))}

        {/* Add notebook card */}
        <button
          className="add-card"
          onClick={() => setShowCreate(true)}
        >
          <div className="add-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <span>New Notebook</span>
        </button>
      </div>

      {/* Create notebook dialog */}
      {showCreate && (
        <>
          <div className="dialog-overlay" onClick={() => setShowCreate(false)} />
          <div className="dialog-card">
            <h3 className="dialog-title">New Notebook</h3>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Notebook name..."
              autoFocus
              className="dialog-input"
              onKeyDown={e => {
                if (e.key === 'Enter') handleCreate();
                if (e.key === 'Escape') setShowCreate(false);
              }}
            />
            <label className="dialog-label">Cover Color</label>
            <div className="color-picker">
              {COVER_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setNewColor(color)}
                  className={`color-swatch ${newColor === color ? 'selected' : ''}`}
                  style={{ background: color }}
                />
              ))}
            </div>
            <div className="dialog-actions">
              <button className="btn-ghost" onClick={() => setShowCreate(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
