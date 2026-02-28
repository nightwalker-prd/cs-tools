import type { ComposePrompt } from '../../data/types';

interface ComposePromptViewProps {
  prompt: ComposePrompt;
  hasDraft: boolean;
  onStartFresh: () => void;
  onResumeDraft: () => void;
}

export function ComposePromptView({ prompt, hasDraft, onStartFresh, onResumeDraft }: ComposePromptViewProps) {
  return (
    <div className="compose-prompt-view animate-fade-in">
      <div className="compose-prompt-card">
        <p className="compose-prompt-en">{prompt.promptEn}</p>
        <p className="compose-prompt-ar font-arabic">{prompt.promptAr}</p>

        <div className="compose-target">
          Target: <strong>{prompt.targetLength.min}–{prompt.targetLength.max} words</strong>
        </div>

        {prompt.hints.length > 0 && (
          <div className="compose-hints">
            <h4>Hints</h4>
            <ol>
              {prompt.hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="compose-prompt-actions">
        {hasDraft && (
          <button className="btn btn-primary" onClick={onResumeDraft}>
            Resume Draft
          </button>
        )}
        <button className="btn" onClick={onStartFresh}>
          {hasDraft ? 'Start Fresh' : 'Start Writing'}
        </button>
      </div>
    </div>
  );
}
