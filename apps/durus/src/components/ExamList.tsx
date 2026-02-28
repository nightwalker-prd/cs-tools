import type { ExamPaper } from '../data/types';

interface ExamListProps {
  exams: ExamPaper[];
}

export function ExamList({ exams }: ExamListProps) {
  if (exams.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '2rem' }}>
        <p>No exam papers available for this course.</p>
      </div>
    );
  }

  // Group exams by their group field
  const groups = new Map<string, ExamPaper[]>();
  for (const exam of exams) {
    const list = groups.get(exam.group) ?? [];
    list.push(exam);
    groups.set(exam.group, list);
  }

  return (
    <div>
      {Array.from(groups.entries()).map(([group, items]) => (
        <div key={group} className="exam-group">
          <h3 className="exam-group-title">{group}</h3>
          {items.map((exam, i) => (
            <div key={i} className="exam-item">
              <span className={`exam-badge ${exam.type}`}>
                {exam.type}
              </span>
              <span className="exam-title">{exam.title}</span>
              <a
                href={exam.url}
                target="_blank"
                rel="noopener noreferrer"
                className="exam-link"
                title="Open exam paper"
              >
                &#8599;
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
