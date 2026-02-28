import { Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@arabtools/ui';
import type { Tool } from '@/data/tools';

interface HiddenToolsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tools: Tool[];
  onUnhide: (id: string) => void;
}

function HiddenToolRow({ tool, onUnhide }: { tool: Tool; onUnhide: () => void }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.6rem 0.75rem',
      borderRadius: '8px',
      transition: 'background 0.15s ease',
      cursor: 'default',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(26, 49, 80, 0.04)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <div>
        <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-foreground)', margin: 0 }}>
          {tool.name}
        </p>
        <p className="font-arabic" style={{ fontSize: '0.85rem', color: 'var(--color-accent)', margin: 0 }} dir="rtl">
          {tool.nameAr}
        </p>
      </div>
      <button
        onClick={onUnhide}
        className="card-action-btn"
        title="Show tool"
        style={{ opacity: 1 }}
      >
        <Eye size={16} />
      </button>
    </div>
  );
}

export function HiddenToolsDrawer({ open, onOpenChange, tools, onUnhide }: HiddenToolsDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif" style={{ color: 'var(--color-primary)' }}>Hidden Tools</DialogTitle>
          <DialogDescription>
            Click the eye icon to restore a tool to the main view.
          </DialogDescription>
        </DialogHeader>
        <div style={{ maxHeight: '20rem', overflowY: 'auto', margin: '0 -0.25rem' }}>
          {tools.map((tool) => (
            <HiddenToolRow key={tool.id} tool={tool} onUnhide={() => onUnhide(tool.id)} />
          ))}
          {tools.length === 0 && (
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)', textAlign: 'center', padding: '1.5rem' }}>
              No hidden tools.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
