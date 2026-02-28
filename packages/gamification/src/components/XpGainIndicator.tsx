import { useEffect } from 'react';

interface XpGainIndicatorProps {
  amount: number;
  onComplete: () => void;
}

export function XpGainIndicator({ amount, onComplete }: XpGainIndicatorProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed top-[40%] left-1/2 -translate-x-1/2 z-[9998] pointer-events-none"
      style={{
        animationName: 'gamification-xp-float',
        animationDuration: '1.5s',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'forwards',
      }}
    >
      <span className="text-2xl font-bold text-accent font-sans" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
        +{amount} XP
      </span>
    </div>
  );
}
