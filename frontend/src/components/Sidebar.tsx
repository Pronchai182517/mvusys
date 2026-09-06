import React from 'react';
import { LayoutDashboard, CheckSquare, FolderGit2, FileText, BookOpen, Bot, ChevronRight, Users, Car, Table, X } from 'lucide-react';
import { User } from '../types';

export type TabType = 'dashboard' | 'tasks' | 'projects' | 'resolutions' | 'knowledge' | 'ai-agent' | 'users' | 'vehicles' | 'vehicle_admin';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  currentUser: User;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, currentUser, isMobileMenuOpen = false, onCloseMobileMenu }) => {
  const menuItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string; adminOnly?: boolean; vehicleAdminOnly?: boolean }[] = [
    { id: 'dashboard', label: 'แดชบอร์ดผู้บริหาร', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'tasks', label: 'ภารกิจและงานที่ได้รับมอบหมาย', icon: <CheckSquare className="w-5 h-5" /> },
    { id: 'projects', label: 'บริหารแผนงานและโครงการ', icon: <FolderGit2 className="w-5 h-5" /> },
    { id: 'resolutions', label: 'บันทึกและติดตามมติที่ประชุม', icon: <FileText className="w-5 h-5" /> },
    { id: 'knowledge', label: 'คลังเอกสารและฐานความรู้', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'vehicles', label: 'ระบบจองยานพาหนะ', icon: <Car className="w-5 h-5" /> },
    { id: 'vehicle_admin', label: 'ตารางสรุปคิวรถ', icon: <Table className="w-5 h-5" />, badge: 'Admin', vehicleAdminOnly: true },
    { id: 'ai-agent', label: 'Local AI Agent', icon: <Bot className="w-5 h-5" />, badge: 'RAG AI' },
    { id: 'users', label: 'บริหารจัดการสมาชิก', icon: <Users className="w-5 h-5" />, badge: 'Admin', adminOnly: true },
  ];

  const visibleMenuItems = menuItems.filter(item => {
    if (item.adminOnly) return currentUser.role === 'admin';
    if (item.vehicleAdminOnly) return currentUser.role === 'admin' || currentUser.role === 'vehicle_admin';
    return true;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 glass-panel border-r border-slate-800/80 min-h-screen md:min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-1 overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              เมนูหลักระบบบริหาร
            </span>
            <button 
              onClick={onCloseMobileMenu}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {visibleMenuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  if (onCloseMobileMenu) onCloseMobileMenu();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-mvu-600/30 to-amber-600/20 text-mvu-300 border border-mvu-500/40 shadow-lg shadow-mvu-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`${isActive ? 'text-mvu-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge ? (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-mvu-500/20 text-mvu-300 border border-mvu-500/30">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'opacity-100 translate-x-0 text-mvu-400' : 'opacity-0 -translate-x-2 group-hover:opacity-60'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Institutional Info Footnote */}
        <div className="mt-4 p-3.5 rounded-2xl glass-card border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent text-center space-y-1 shrink-0">
          <div className="text-xs font-semibold text-amber-300">มหาวชิราลงกรณบาลีเถรวาทฯ</div>
          <div className="text-[11px] text-slate-400">Local AI Agent Vibe Coding MVP</div>
        </div>
      </aside>
    </>
  );
};
