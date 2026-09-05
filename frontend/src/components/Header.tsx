import React from 'react';
import { UserRole, User } from '../types';
import { Shield, Sparkles, Database, Bell, UserCheck } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
}

const USERS_LIST: User[] = [
  { id: 'usr-1', name: 'พระพรชัย วรชโย', role: 'admin', title: 'นักวิชาการคอมพิวเตอร์', department: 'ส่วนงานบริหารองค์กร', email: 'worachayo@mvu.ac.th' },
  { id: 'usr-2', name: 'ผู้บริหาร มหาวชิราลงกรณฯ', role: 'executive', title: 'รองอธิการบดี / ผู้บริหาร', department: 'สำนักงานผู้บริหาร', email: 'exec@mvu.ac.th' },
  { id: 'usr-3', name: 'เจ้าหน้าที่แผนงานและงบประมาณ', role: 'project_lead', title: 'นักวิเคราะห์นโยบายและแผน', department: 'งานแผนและงบประมาณ', email: 'plan@mvu.ac.th' },
  { id: 'usr-4', name: 'เจ้าหน้าที่ติดตามประเมินผล', role: 'tracking_officer', title: 'เจ้าหน้าที่ประกันคุณภาพ', department: 'งานประกันคุณภาพ', email: 'qa@mvu.ac.th' }
];

export const Header: React.FC<HeaderProps> = ({ currentUser, onRoleChange }) => {
  return (
    <header className="glass-panel sticky top-0 z-30 px-6 py-3 border-b border-slate-800/80 flex items-center justify-between shadow-xl">
      {/* Title & Branding */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mvu-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-mvu-500/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold tracking-wide text-white">mvusys Local AI Agent</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
              <Database className="w-3 h-3" /> Supabase Live
            </span>
          </div>
          <p className="text-xs text-slate-400">ระบบบริหารงาน มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</p>
        </div>
      </div>

      {/* Controls & Role Switcher */}
      <div className="flex items-center space-x-4">
        {/* Role Selector Simulator */}
        <div className="flex items-center space-x-2 glass-card px-3 py-1.5 rounded-xl border border-slate-700/50">
          <Shield className="w-4 h-4 text-mvu-400" />
          <span className="text-xs text-slate-400 hidden sm:inline">สิทธิ์ใช้งาน:</span>
          <select
            value={currentUser.role}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-slate-900 text-xs text-mvu-300 font-medium rounded-lg px-2 py-1 outline-none border border-slate-700 cursor-pointer hover:border-mvu-500 transition-colors"
          >
            {USERS_LIST.map((u) => (
              <option key={u.id} value={u.role}>
                {u.name} ({u.title})
              </option>
            ))}
          </select>
        </div>

        {/* User Badge */}
        <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-mvu-400 font-medium text-xs">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-medium text-slate-200">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400">{currentUser.department}</div>
          </div>

          <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-mvu-400 animate-pulse"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
