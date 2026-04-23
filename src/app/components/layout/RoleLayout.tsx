import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import type { UserRole } from '../../../types';

interface RoleLayoutProps {
  children: ReactNode;
  role: Exclude<UserRole, null>;
  showSidebar?: boolean;
}

export function RoleLayout({ children, role, showSidebar = false }: RoleLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        본문으로 건너뛰기
      </a>

      <Header onMenuClick={showSidebar ? () => setSidebarOpen(true) : undefined} />

      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar
            role={role}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <main
          id="main-content"
          className="flex-1 w-full"
          role="main"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
