interface SummaryBoxProps {
  summary: string;
  sourceRef?: string;
}

export function SummaryBox({ summary, sourceRef }: SummaryBoxProps) {
  return (
    <div className="summary-box">
      <p>{summary}</p>
      {sourceRef && (
        <span className="summary-source">{sourceRef}</span>
      )}
    </div>
  );
}
