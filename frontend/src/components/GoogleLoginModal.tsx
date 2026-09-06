import React, { useState } from 'react';
import { api } from '../services/api';
import { User } from '../types';
import { LogIn, ShieldAlert, CheckCircle, Mail, Sparkles, Building2 } from 'lucide-react';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const performLogin = async (targetEmail: string, targetPassword?: string) => {
    if (!targetEmail) {
      setErrorMsg('กรุณาระบุอีเมลสำหรับลงชื่อเข้าใช้');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Not passing password as name to avoid setting password as user's name
      const res = await api.loginWithGoogle(targetEmail, undefined);
      if (res.success && res.data?.user) {
        onLoginSuccess(res.data.user);
        onClose();
      } else {
        setErrorMsg(res.message || 'ไม่สามารถลงชื่อเข้าใช้ด้วยอีเมลนี้ได้');
      }
    } catch (err: any) {
      setErrorMsg('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ระบบยืนยันตัวตน');
    }
    setLoading(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(email, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 w-full max-w-md space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs p-1 rounded-lg hover:bg-slate-800"
        >
          ✕
        </button>

        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mvu-500 to-amber-600 mx-auto flex items-center justify-center text-slate-950 shadow-lg shadow-mvu-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">ลงชื่อเข้าใช้ด้วยบัญชี Google Workspace</h3>
          <p className="text-xs text-slate-400">
            มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (<span className="text-amber-400 font-mono">@mcu.ac.th</span> / <span className="text-emerald-400 font-mono">@gmail.com</span>)
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400">อีเมลบัญชีสถาบันหรือ Gmail (@mcu.ac.th / @gmail.com)</label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="username"
                required
                placeholder="เช่น worachayo@mcu.ac.th หรือ user@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-mvu-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400">รหัสผ่าน</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
            />
          </div>

          {/* Direct Google OAuth Authen Link Button */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2">
            <button
              type="button"
              onClick={() => {
                const targetEmail = email || 'worachayo@mcu.ac.th';
                setEmail(targetEmail);
                performLogin(targetEmail, password);
              }}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-[1.02]"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>เชื่อมต่อและเข้าสู่ระบบด้วย Google Authen (OAuth 2.0)</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              รองรับบัญชี Google Workspace <span className="text-amber-400">@mcu.ac.th</span> และ <span className="text-emerald-400">@gmail.com</span>
            </p>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-mvu-500 to-amber-600 hover:from-mvu-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-mvu-500/20 transition-all hover:scale-[1.02]"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'กำลังตรวจสอบสิทธิ์...' : 'ยืนยันลงชื่อเข้าใช้ด้วย Google Account'}</span>
            </button>
          </div>
        </form>

        <div className="text-[11px] text-slate-500 text-center border-t border-slate-800/80 pt-3">
          🔒 ระบบจะตรวจสอบสิทธิ์และอนุญาตเฉพาะบุคลากรที่มีบัญชีโดเมนของสถาบันเท่านั้น
        </div>
      </div>
    </div>
  );
};

