import { Eye, EyeOff, Type } from 'lucide-react';

interface ReaderModeBarProps {
  showTranslation: boolean;
  wordByWord: boolean;
  onToggleTranslation: () => void;
  onToggleWordByWord: () => void;
}

export default function ReaderModeBar({
  showTranslation,
  wordByWord,
  onToggleTranslation,
  onToggleWordByWord,
}: ReaderModeBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t border-border flex justify-center z-40">
      <div className="flex max-w-[430px] w-full">
        {/* Translation toggle */}
        <button
          onClick={onToggleTranslation}
          className={`flex-1 flex items-center justify-center gap-2 text-xs font-medium transition-colors ${
            showTranslation ? 'text-primary' : 'text-text-secondary'
          }`}
        >
          {showTranslation ? <Eye size={18} /> : <EyeOff size={18} />}
          Translation
        </button>

        {/* Divider */}
        <div className="w-px bg-border my-2" />

        {/* Word by Word toggle */}
        <button
          onClick={onToggleWordByWord}
          className={`flex-1 flex items-center justify-center gap-2 text-xs font-medium transition-colors ${
            wordByWord ? 'text-primary' : 'text-text-secondary'
          }`}
        >
          <Type size={18} />
          Word by Word
        </button>
      </div>
    </div>
  );
}
