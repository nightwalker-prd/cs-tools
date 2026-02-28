import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  delay: number;
}

const SUCCESS_COLORS = ['#FFD700', '#4ECDC4', '#FFE66D', '#F8B500'];
const FAILURE_COLORS = ['#FF6B6B', '#cc5555', '#994444'];

interface ParticlesProps {
  active: boolean;
  success: boolean;
}

export function Particles({ active, success }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const colors = success ? SUCCESS_COLORS : FAILURE_COLORS;
    const count = success ? 20 : 8;

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50 + (Math.random() - 0.5) * 20,
      dx: (Math.random() - 0.5) * 100,
      dy: -Math.random() * 80 - 20,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
    }));

    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(t);
  }, [active, success]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `particleFly 1.2s ease-out ${p.delay}s forwards`,
            opacity: 0,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
