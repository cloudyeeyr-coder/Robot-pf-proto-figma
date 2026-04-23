import { Link, useLocation } from 'react-router';
import { X, LayoutDashboard, Award, FileText, DollarSign, Activity, Calendar, Settings } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../ui/button';
import type { UserRole } from '../../../types';

interface SidebarProps {
  role: Exclude<UserRole, null>;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationByRole = {
  admin: [
    { label: '대시보드', path: '/admin', icon: LayoutDashboard },
    { label: '에스크로 관리', path: '/admin/escrow', icon: DollarSign },
    { label: 'AS SLA 모니터링', path: '/admin/as-sla', icon: Activity },
    { label: '이벤트 로그', path: '/admin/events', icon: FileText },
    { label: '분쟁 관리', path: '/admin/disputes', icon: Settings },
  ],
  manufacturer: [
    { label: '대시보드', path: '/manufacturer/dashboard', icon: LayoutDashboard },
    { label: '뱃지 관리', path: '/manufacturer/badges', icon: Award },
    { label: '제안 관리', path: '/manufacturer/proposals', icon: FileText },
  ],
  si_partner: [
    { label: '프로필 관리', path: '/partner/profile', icon: Settings },
    { label: '받은 제안', path: '/partner/proposals', icon: FileText },
    { label: '내 뱃지', path: '/partner/badges', icon: Award },
  ],
  buyer: [],
};

export function Sidebar({ role, isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  const navigation = navigationByRole[role] || [];

  if (navigation.length === 0) return null;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-white border-r z-50 transition-transform duration-300',
          'w-64 lg:w-60 lg:sticky lg:top-16',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <h2 className="font-semibold">메뉴</h2>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="닫기">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4" aria-label="주요 네비게이션">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={onClose}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
