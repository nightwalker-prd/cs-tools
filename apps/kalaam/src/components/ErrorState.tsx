import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="mx-auto text-danger" size={32} />
      <p className="mt-2 text-text-secondary">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 text-primary font-medium hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
