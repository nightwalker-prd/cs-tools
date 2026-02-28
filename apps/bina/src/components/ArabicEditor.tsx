import { useRef, useCallback, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface ArabicEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export function ArabicEditor({ value, onChange, onRun, onReset, isRunning }: ArabicEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  }, [onRun]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="editor-section">
      <div className="editor-toolbar">
        <div className="editor-toolbar-left">
          <span className="editor-toolbar-dot" />
          <span>editor.ar</span>
        </div>
        <div className="editor-toolbar-right">
          <button
            className="run-btn"
            onClick={onReset}
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
            title="Reset"
          >
            <RotateCcw size={13} />
          </button>
          <button
            className="run-btn"
            onClick={onRun}
            disabled={isRunning}
          >
            <Play size={13} />
            <span>Run</span>
            <span className="run-shortcut">{navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+↵</span>
          </button>
        </div>
      </div>
      <div className="editor-container">
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب الجملة هنا..."
          dir="rtl"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
