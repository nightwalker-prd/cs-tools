import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto max-w-[430px] pb-16 px-4 min-h-screen desktop-center">
      {children}
    </div>
  );
}
