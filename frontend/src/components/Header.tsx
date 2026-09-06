import React from 'react';
import { UserRole, User } from '../types';

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
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(11,27,52,0.04)] pt-safe">
      <div className="h-16 px-screen-margin-mobile flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          {onToggleMobileMenu && (
            <button 
              onClick={onToggleMobileMenu} 
              aria-label="เปิดเมนูระบบ" 
              className="w-11 h-11 -ml-1.5 flex items-center justify-center text-text-primary active:bg-surface-subtle transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
          )}
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent-gold-subtle flex items-center justify-center text-on-primary font-bold shadow-sm shrink-0 hidden sm:flex">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
            <div className="flex flex-col pl-space-2xs">
              <span className="font-label-sm text-label-sm tracking-tight text-text-primary uppercase font-bold">mvusys</span>
              <span className="font-mono-badge text-[9px] text-text-muted leading-tight tracking-wider">SYS.PROD-V4</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <div className="hidden lg:flex items-center space-x-2 mr-2">
            <button
              onClick={onOpenRegister}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface-container text-text-secondary font-label-sm text-label-sm font-semibold transition-all"
            >
              ลงทะเบียน
            </button>
            <button
              onClick={onOpenGoogleLogin}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface-container text-text-secondary font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              Google Login
            </button>
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center">
              <span className="font-label-sm text-[10px] font-semibold text-text-secondary mr-2 uppercase tracking-wider">Simulate Role:</span>
              <select
                value={currentUser.role}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-surface-subtle text-text-primary font-label-sm text-label-sm font-semibold rounded px-2 py-1 outline-none border border-border-hairline focus:border-primary transition-colors cursor-pointer"
              >
                {USERS_LIST.map((u) => (
                  <option key={u.id} value={u.role}>
                    {u.role.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <span className="font-mono-badge text-mono-badge text-status-success uppercase flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success inline-block"></span>Online
            </span>
          </div>

          <button 
            className="w-11 h-11 flex items-center justify-center p-0.5 rounded-full active:opacity-80 transition-opacity"
            onClick={onToggleMobileMenu} // Using mobile menu to see profile detail
          >
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs uppercase shadow-sm">
              {currentUser.email.substring(0,2)}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
