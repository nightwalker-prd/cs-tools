import type { ReactNode } from 'react';

interface FlashcardStackProps {
  isFlipped: boolean;
  onFlip: () => void;
  front: ReactNode;
  back: ReactNode;
  remaining: number;
}

export default function FlashcardStack({
  isFlipped,
  onFlip,
  front,
  back,
  remaining,
}: FlashcardStackProps) {
  const showSecondCard = remaining > 1;
  const showThirdCard = remaining > 2;

  return (
    <div className="relative w-full max-w-[380px] min-h-[380px]" style={{ perspective: '1200px' }}>
      {/* Third stacked card (back) */}
      {showThirdCard && (
        <div
          className="absolute inset-0 bg-card rounded-2xl border border-border"
          style={{
            transform: 'scale(0.9) translateY(-16px)',
            opacity: 0.4,
            zIndex: 1,
          }}
        />
      )}

      {/* Second stacked card (middle) */}
      {showSecondCard && (
        <div
          className="absolute inset-0 bg-card rounded-2xl border border-border"
          style={{
            transform: 'scale(0.95) translateY(-8px)',
            opacity: 0.6,
            zIndex: 2,
          }}
        />
      )}

      {/* Front card — flippable */}
      <div
        onClick={!isFlipped ? onFlip : undefined}
        className="absolute inset-0 w-full cursor-pointer"
        style={{
          zIndex: 3,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s ease',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Card front face */}
        <div
          className="absolute inset-0 w-full bg-white rounded-2xl border border-border shadow-sm p-6 overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>

        {/* Card back face */}
        <div
          className="absolute inset-0 w-full bg-white rounded-2xl border border-border shadow-sm p-6 overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
