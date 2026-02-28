import { columns } from '../constants/grammaticalPersons';

interface ColumnToggleControlsProps {
  visibleColumns: string[];
  onToggle: (columns: string[]) => void;
}

export function ColumnToggleControls({ visibleColumns, onToggle }: ColumnToggleControlsProps) {
  const toggleColumn = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      onToggle(visibleColumns.filter(id => id !== columnId));
    } else {
      onToggle([...visibleColumns, columnId]);
    }
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className="text-sm text-muted-foreground">Columns:</span>
      <div className="flex flex-wrap gap-2">
        {columns.map((column) => (
          <button
            key={column.id}
            onClick={() => toggleColumn(column.id)}
            title={column.labelEn}
            className={`px-3 py-1 text-xs rounded-lg border transition-all ${
              visibleColumns.includes(column.id)
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-primary border-gray-300 hover:border-accent'
            }`}
          >
            <span dir="rtl" className="font-arabic">
              {column.labelAr}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
