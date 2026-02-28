import type { ReactNode } from 'react';
import { BookOpen, Star } from 'lucide-react';

interface LayoutProps {
  totalXp: number;
  children: ReactNode;
}

export function Layout({ totalXp, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-lapis text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <BookOpen className="w-6 h-6" />
            <h1 className="text-xl font-serif">
              <span className="font-arabic">رِوَايَة</span>
              <span className="mx-2 opacity-50">|</span>
              <span>Riwaya</span>
            </h1>
          </a>
          <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium">{totalXp} XP</span>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
