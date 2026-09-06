import React from 'react';
import { UserRole, User } from '../types';
import { Shield, Sparkles, Database, UserCheck, UserPlus, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
  onOpenGoogleLogin: () => void;
  onOpenRegister: () => void;
  onSignOut: () => void;
  onToggleMobileMenu?: () => void;
}

const USERS_LIST: User[] = [
  { id: 'usr-1', name: 'ผู้ดูแลระบบสูงสุด', role: 'admin', title: 'นักวิชาการคอมพิวเตอร์', department: 'ส่วนงานบริหารองค์กร', email: 'admin@yourdomain.ac.th' },
  { id: 'usr-2', name: 'ผู้บริหาร มหาวชิราลงกรณฯ', role: 'executive', title: 'รองอธิการบดี / ผู้บริหาร', department: 'สำนักงานผู้บริหาร', email: 'exec@mvu.ac.th' },
  { id: 'usr-3', name: 'เจ้าหน้าที่แผนงานและงบประมาณ', role: 'project_lead', title: 'นักวิเคราะห์นโยบายและแผน', department: 'งานแผนและงบประมาณ', email: 'plan@mvu.ac.th' },
  { id: 'usr-4', name: 'เจ้าหน้าที่ติดตามประเมินผล', role: 'tracking_officer', title: 'เจ้าหน้าที่ประกันคุณภาพ', department: 'งานประกันคุณภาพ', email: 'qa@mvu.ac.th' }
];

export const Header: React.FC<HeaderProps> = ({ currentUser, onRoleChange, onOpenGoogleLogin, onOpenRegister, onSignOut, onToggleMobileMenu }) => {
  return (
    <header className="glass-panel sticky top-0 z-30 px-4 sm:px-6 py-3 border-b border-slate-800/80 flex items-center justify-between shadow-xl">
      {/* Title & Branding */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {onToggleMobileMenu && (
          <button 
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-mvu-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-mvu-500/20 shrink-0">
          <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center space-x-2">
            <h1 className="text-base sm:text-lg font-semibold tracking-wide text-white">mvusys Local AI Agent</h1>
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
              <Database className="w-3 h-3" /> <span className="hidden lg:inline">Supabase Live</span>
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400">ระบบบริหารงาน มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</p>
        </div>
      </div>

      {/* Controls & Role Switcher */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Register Button */}
        <button
          onClick={onOpenRegister}
          className="px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1 transition-all"
          title="ลงทะเบียนสมาชิก"
        >
          <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">ลงทะเบียน</span>
        </button>

        {/* Google @mcu.ac.th Login Button */}
        <button
          onClick={onOpenGoogleLogin}
          className="px-2 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-red-600/30 to-amber-600/30 hover:from-red-600/50 hover:to-amber-600/50 text-red-200 border border-red-500/40 text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
          title="Google @mcu.ac.th"
        >
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
          <span className="hidden sm:inline">Google @mcu.ac.th</span>
          <span className="sm:hidden">Google</span>
        </button>

        {/* Role Selector Simulator */}
        <div className="hidden md:flex items-center space-x-2 glass-card px-3 py-1.5 rounded-xl border border-slate-700/50">
          <Shield className="w-4 h-4 text-mvu-400" />
          <span className="text-xs text-slate-400">สิทธิ์:</span>
          <select
            value={currentUser.role}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-slate-900 text-xs text-mvu-300 font-medium rounded-lg px-2 py-1 outline-none border border-slate-700 cursor-pointer hover:border-mvu-500 transition-colors w-32 lg:w-auto"
          >
            {USERS_LIST.map((u) => (
              <option key={u.id} value={u.role}>
                {u.name} ({u.title})
              </option>
            ))}
          </select>
        </div>

        {/* User Badge */}
        <div className="flex items-center space-x-2 sm:space-x-3 sm:border-l border-slate-800 sm:pl-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-mvu-400 font-medium text-xs">
            <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-medium text-slate-200">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400">{currentUser.department}</div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={onSignOut}
            title="ออกจากระบบ (Sign Out)"
            className="p-1.5 sm:p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-colors border border-rose-500/30"
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
