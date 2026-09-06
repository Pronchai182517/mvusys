import React, { useState } from 'react';
import { User } from '../types';
import { ShieldCheck, LogIn, ArrowLeft, Key } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: User) => void;
  onBack: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Hardcoded dummy admin login for demonstration
    setTimeout(() => {
      if (password === 'your_secure_password') {
        onLoginSuccess({
          id: 'usr-1',
          name: 'ผู้ดูแลระบบสูงสุด (Admin)',
          role: 'admin',
          title: 'ผู้ดูแลระบบ',
          department: 'ส่วนงานเทคโนโลยีสารสนเทศ',
          email: 'admin@mvu.ac.th'
        });
      } else {
        setErrorMsg('รหัสผ่านผู้ดูแลระบบไม่ถูกต้อง (ลองใช้: your_secure_password)');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-rose-500/30 shadow-2xl space-y-6 z-10 relative">
        <button onClick={onBack} className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 pt-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 mx-auto flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/20 border border-rose-500/30">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">Admin System Login</h1>
            <p className="text-xs font-semibold text-rose-400 mt-1">เข้าสู่ระบบเฉพาะผู้ดูแลระบบเท่านั้น</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-500" /> รหัสผ่าน Admin
            </label>
            <input 
              type="password" 
              placeholder="กรอกรหัสผ่านผู้ดูแลระบบ" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-rose-500 font-mono transition-colors" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !password} 
            className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02]"
          >
            <span>{loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ (Admin)'}</span>
            {!loading && <LogIn className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};
