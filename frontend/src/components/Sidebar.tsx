import React from 'react';
import { User } from '../types';

export type TabType = 'dashboard' | 'tasks' | 'projects' | 'resolutions' | 'knowledge' | 'ai-agent' | 'users' | 'vehicles' | 'vehicle_admin';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  currentUser: User;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
  onSignOut: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, currentUser, isMobileMenuOpen = false, onCloseMobileMenu, onSignOut }) => {
  const menuItems: { id: TabType; label: string; icon: string; adminOnly?: boolean; vehicleAdminOnly?: boolean }[] = [
    { id: 'dashboard', label: 'ภาพรวมระบบบริหาร', icon: 'dashboard' },
    { id: 'tasks', label: 'ภารกิจ & โครงการราชวิทยาลัย', icon: 'task_alt' },
    { id: 'vehicles', label: 'ยานพาหนะและการเดินทาง', icon: 'directions_car' },
    { id: 'ai-agent', label: 'มติสภา & ระบบปัญญาประดิษฐ์', icon: 'psychology' },
    { id: 'users', label: 'ระบบบริหารจัดการผู้ใช้ (RBAC)', icon: 'admin_panel_settings', adminOnly: true },
    { id: 'resolutions', label: 'คลังมติที่ประชุมสภาสถาบัน', icon: 'gavel' },
    { id: 'knowledge', label: 'คลังสารสนเทศพระปริยัติธรรม', icon: 'auto_stories' },
    { id: 'vehicle_admin', label: 'ตารางสรุปคิวรถ', icon: 'table', vehicleAdminOnly: true },
  ];

  const visibleMenuItems = menuItems.filter(item => {
    if (item.adminOnly) return currentUser.role === 'admin';
    if (item.vehicleAdminOnly) return currentUser.role === 'admin' || currentUser.role === 'vehicle_admin';
    return true;
  });

  return (
    <>
      <div 
        className={`fixed inset-0 z-50 bg-primary-container/40 backdrop-blur-xs transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onCloseMobileMenu}
      />
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-[84vw] max-w-[320px] bg-surface-card shadow-[0_4px_24px_rgba(11,27,52,0.12)] transition-transform duration-300 flex flex-col justify-between pt-safe pb-safe ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-screen-margin-mobile pt-space-lg">
          <div className="flex items-center justify-between pb-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent-gold-subtle flex items-center justify-center text-on-primary font-bold shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-text-primary tracking-tight">mvusys</span>
                <span className="font-mono-badge text-mono-badge text-status-success uppercase font-semibold">SECURED // INST</span>
              </div>
            </div>
            <button 
              aria-label="ปิดเมนู" 
              className="w-11 h-11 -mr-2 flex items-center justify-center text-text-secondary active:bg-surface-subtle"
              onClick={onCloseMobileMenu}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="bg-surface-subtle p-space-sm my-space-xs rounded-none">
            <span className="font-label-sm text-[10px] text-text-muted uppercase tracking-wider block font-semibold">สถาบันสังกัด</span>
            <p className="font-body-sm text-body-sm font-semibold text-text-primary leading-tight mt-0.5">มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</p>
            <div className="flex items-center gap-space-xs mt-space-xs">
              <span className="font-mono-badge text-mono-badge px-1.5 py-0.5 bg-primary-container text-on-primary font-bold">ROLE: {currentUser.role.toUpperCase()}</span>
              <span className="font-mono-badge text-mono-badge px-1.5 py-0.5 bg-accent-gold-subtle text-on-secondary-container font-semibold">TIER-1 RBAC</span>
            </div>
          </div>

          <div className="mt-space-md mb-space-sm">
            <div className="relative flex items-center bg-surface w-full h-11 px-3">
              <span className="material-symbols-outlined text-text-muted text-[18px] mr-2">search</span>
              <input className="w-full bg-transparent font-body-sm text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none" placeholder="ค้นหาข้อมูล, รหัสภารกิจ, เอกสาร..." type="text" />
            </div>
          </div>

          <div className="pt-space-xs flex flex-col gap-1">
            <span className="font-mono-badge text-[10px] text-text-muted uppercase tracking-wider px-2 py-1">เมนูการจัดการระบบ (ADMIN & CORE)</span>
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  if (onCloseMobileMenu) onCloseMobileMenu();
                }}
                className={`flex items-center gap-3 h-11 px-3 w-full text-left font-body-sm text-body-sm font-medium ${
                  activeTab === item.id ? 'text-primary bg-surface-subtle' : 'text-text-primary active:bg-surface-subtle'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTab === item.id ? 'text-primary' : 'text-text-secondary'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-screen-margin-mobile bg-surface-subtle flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-primary-container font-bold text-xs uppercase">
              {currentUser.email.substring(0,2)}
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm font-semibold text-text-primary leading-tight">{currentUser.name}</span>
              <span className="font-mono-badge text-[10px] text-text-muted uppercase">{currentUser.email}</span>
            </div>
          </div>
          <button 
            aria-label="ออกจากระบบ" 
            className="w-11 h-11 flex items-center justify-center text-error active:bg-error-container/20"
            onClick={onSignOut}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
