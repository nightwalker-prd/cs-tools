interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={`animate-pulse bg-card rounded ${className || ''}`} />;
}
