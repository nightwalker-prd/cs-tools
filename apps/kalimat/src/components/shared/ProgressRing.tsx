interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

export function ProgressRing({ value, size = 60, strokeWidth = 6, label, color = "text-primary" }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg 
        className="transform -rotate-90 transition-all duration-500 ease-in-out" 
        width={size} 
        height={size}
      >
        <circle
          className="text-muted/20"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className={`${color} transition-all duration-1000 ease-out`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {label && (
        <div className="text-xs text-muted-foreground mt-1 font-medium tracking-wide">
          {label}
        </div>
      )}
    </div>
  );
}
