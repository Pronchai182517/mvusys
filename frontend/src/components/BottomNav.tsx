import React from 'react';
import { TabType } from './Sidebar';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'ภาพรวม', icon: 'space_dashboard' },
    { id: 'tasks', label: 'ภารกิจ', icon: 'assignment' },
    { id: 'vehicles', label: 'ยานพาหนะ', icon: 'local_shipping' },
    { id: 'ai-agent', label: 'มติ & AI', icon: 'smart_toy' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface-card/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(11,27,52,0.06)] md:hidden">
      <div className="flex justify-around items-center h-16 px-1 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-colors ${
                isActive 
                  ? "text-primary font-semibold relative after:content-[''] after:absolute after:bottom-1 after:w-5 after:h-0.5 after:bg-primary-container"
                  : "text-text-secondary"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="font-label-sm text-[11px] leading-tight text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
