import type { ChallengeChecklist } from '../../types';

interface DailyChecklistProps {
  checklist: ChallengeChecklist;
  onToggle: (item: keyof ChallengeChecklist) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

const CHECKLIST_ITEMS: Array<{
  key: keyof ChallengeChecklist;
  label: string;
}> = [
  { key: 'madeIntention', label: 'Made intention before starting' },
  { key: 'recitedToSomeone', label: 'Recited to someone' },
  { key: 'loggedProgress', label: 'Logged progress' },
  { key: 'notedDifficultAyahs', label: 'Noted difficult ayahs' },
];

export function DailyChecklist({
  checklist,
  onToggle,
  notes,
  onNotesChange,
}: DailyChecklistProps) {
  const completedCount = CHECKLIST_ITEMS.filter(
    (item) => checklist[item.key],
  ).length;

  return (
    <div className="daily-checklist">
      <div className="daily-checklist-header">
        <h4 className="section-title">Daily Checklist</h4>
        <span className="daily-checklist-count">
          {completedCount}/{CHECKLIST_ITEMS.length}
        </span>
      </div>

      <div className="daily-checklist-items">
        {CHECKLIST_ITEMS.map((item) => (
          <label key={item.key} className="daily-checklist-item">
            <input
              type="checkbox"
              className="daily-checklist-checkbox"
              checked={checklist[item.key]}
              onChange={() => onToggle(item.key)}
            />
            <span
              className={`daily-checklist-label ${checklist[item.key] ? 'checked' : ''}`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>

      <div className="daily-checklist-notes">
        <label className="form-label" htmlFor="daily-notes">
          Daily Notes
        </label>
        <textarea
          id="daily-notes"
          className="form-textarea"
          placeholder="Reflections, difficult ayahs, things to review..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
}
