import { BookOpen, BookText, Settings } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  navigate: (hash: string) => void;
}

const tabs = [
  { key: 'study', hash: '#/', icon: BookOpen, label: 'Study' },
  { key: 'read', hash: '#/read', icon: BookText, label: 'Read' },
  { key: 'settings', hash: '#/settings', icon: Settings, label: 'Settings' },
] as const;

export default function BottomNav({ currentPage, navigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-border flex justify-center">
      <div className="flex max-w-[430px] w-full">
        {tabs.map(({ key, hash, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => navigate(hash)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-xs transition-colors ${
              currentPage === key ? 'text-primary' : 'text-text-secondary'
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
