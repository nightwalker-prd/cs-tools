import type { ConstructionSlot, WordComponent, SlotResult } from '../../data/types';
import type { Placement } from '../../utils/validation';
import { SlotCard } from './SlotCard';

interface ConstructionWorkspaceProps {
  slots: ConstructionSlot[];
  placement: Placement;
  wordBank: WordComponent[];
  slotResults: SlotResult[] | null;
  isChecked: boolean;
  showDiacritics: boolean;
  onSlotTap: (slotId: string) => void;
  onSlotDrop: (slotId: string, wordId: string) => void;
}

export function ConstructionWorkspace({
  slots,
  placement,
  wordBank,
  slotResults,
  isChecked,
  showDiacritics,
  onSlotTap,
  onSlotDrop,
}: ConstructionWorkspaceProps) {
  return (
    <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl" role="group" aria-label="Construction workspace">
      <div className="text-xs text-muted-foreground mb-4 text-center">
        Construction Workspace
      </div>

      <div className="flex items-start justify-center gap-4 sm:gap-6 flex-wrap" dir="rtl">
        {slots.map(slot => {
          const wordId = placement[slot.id];
          const placedWord = wordId
            ? wordBank.find(w => w.id === wordId)
            : undefined;
          const result = slotResults?.find(r => r.slotId === slot.id);
          const correctWord = wordBank.find(w => w.id === slot.expectedWordId);

          return (
            <SlotCard
              key={slot.id}
              slot={slot}
              placedWord={placedWord}
              correctWord={correctWord}
              result={result}
              isChecked={isChecked}
              showDiacritics={showDiacritics}
              onTap={onSlotTap}
              onDrop={onSlotDrop}
            />
          );
        })}
      </div>
    </div>
  );
}
