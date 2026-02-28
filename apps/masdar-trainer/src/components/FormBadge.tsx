import type { VerbForm } from '../types';

interface FormBadgeProps {
  form: VerbForm;
}

export function FormBadge({ form }: FormBadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-accent/15 text-accent border border-accent/25">
      Form {form}
    </span>
  );
}
