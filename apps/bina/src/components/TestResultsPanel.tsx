import { CheckCircle2, XCircle, Circle, FlaskConical } from 'lucide-react';
import type { TestRunResult } from '../types';

interface TestResultsPanelProps {
  result: TestRunResult;
}

export function TestResultsPanel({ result }: TestResultsPanelProps) {
  const { status, results, passCount, failCount, totalCount } = result;

  return (
    <div className="test-panel">
      <div className="test-panel-header">
        <div className="test-panel-title">
          <FlaskConical size={15} />
          <span>Test Cases</span>
        </div>
        {status !== 'idle' && (
          <div className="test-summary">
            <span className="test-summary-pass">{passCount} passed</span>
            {failCount > 0 && (
              <>
                {' / '}
                <span className="test-summary-fail">{failCount} failed</span>
              </>
            )}
            {' / '}
            {totalCount} total
          </div>
        )}
      </div>

      <ul className="test-list">
        {results.map((r) => (
          <li key={r.testId} className="test-item">
            <span className={`test-status-icon ${status === 'idle' ? 'pending' : r.passed ? 'pass' : 'fail'}`}>
              {status === 'idle' ? (
                <Circle size={16} />
              ) : r.passed ? (
                <CheckCircle2 size={16} />
              ) : (
                <XCircle size={16} />
              )}
            </span>
            <div className="test-item-content">
              <div className="test-item-name">{r.name}</div>
              {status !== 'idle' && (
                <div className={`test-item-message ${r.passed ? '' : 'fail'}`}>
                  {r.message}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
