import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GradeButtonsProps {
  onGrade: (quality: number) => void;
}

export default function GradeButtons({ onGrade }: GradeButtonsProps) {
  return (
    <div className="flex items-center gap-3 px-4 pb-6 pt-2">
      {/* Don't know — Again (0) */}
      <button
        onClick={() => onGrade(0)}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
          bg-danger/10 text-danger font-medium text-sm
          hover:bg-danger/20 active:scale-[0.97] transition-all"
      >
        <ChevronLeft size={18} />
        Don't know
      </button>

      {/* Know — Good (2) */}
      <button
        onClick={() => onGrade(2)}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
          bg-success/10 text-success font-medium text-sm
          hover:bg-success/20 active:scale-[0.97] transition-all"
      >
        Know
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
