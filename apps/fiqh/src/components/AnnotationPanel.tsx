import { FileText } from 'lucide-react';
import type { Annotation } from '../types';

interface AnnotationPanelProps {
  sectionId: string;
  annotations: Annotation[];
  onSave: (sectionId: string, text: string) => void;
}

export function AnnotationPanel({ sectionId, annotations, onSave }: AnnotationPanelProps) {
  const existing = annotations.find(a => a.sectionId === sectionId);

  return (
    <div className="annotation-panel">
      <div className="annotation-label">
        <FileText size={14} />
        Your Notes
      </div>
      <textarea
        className="annotation-textarea"
        placeholder="Add your notes here..."
        defaultValue={existing?.text || ''}
        onBlur={e => {
          const val = e.target.value.trim();
          if (val || existing) {
            onSave(sectionId, val);
          }
        }}
      />
      {existing && (
        <div className="annotation-saved">
          Last saved {new Date(existing.updatedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
