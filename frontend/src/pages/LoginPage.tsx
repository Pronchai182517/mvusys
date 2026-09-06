import React, { useState } from 'react';
import { api } from '../services/api';
import { User, UserRole } from '../types';
import { Sparkles, LogIn, UserPlus, ShieldCheck, Database, Building2, Lock, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onOpenGoogleLogin: () => void;
  onOpenRegister: () => void;
  onAdminLoginClick: () => void;
}

const PRESET_USERS: User[] = [
  { id: 'usr-1', name: 'พระพรชัย วรชโย', role: 'admin', title: 'นักวิชาการคอมพิวเตอร์', department: 'ส่วนงานบริหารองค์กร', email: 'worachayo@mvu.ac.th' },
  { id: 'usr-2', name: 'ผู้บริหาร มหาวชิราลงกรณฯ', role: 'executive', title: 'รองอธิการบดี / ผู้บริหาร', department: 'สำนักงานผู้บริหาร', email: 'exec@mvu.ac.th' },
  { id: 'usr-3', name: 'เจ้าหน้าที่แผนงานและงบประมาณ', role: 'project_lead', title: 'นักวิเคราะห์นโยบายและแผน', department: 'งานแผนและงบประมาณ', email: 'plan@mvu.ac.th' },
  { id: 'usr-4', name: 'เจ้าหน้าที่ติดตามประเมินผล', role: 'tracking_officer', title: 'เจ้าหน้าที่ประกันคุณภาพ', department: 'งานประกันคุณภาพ', email: 'qa@mvu.ac.th' }
];

const GoogleIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onOpenGoogleLogin, onOpenRegister, onAdminLoginClick }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.loginWithGoogle(email);
      if (res.success && res.data?.user) {
        onLoginSuccess(res.data.user);
      } else {
        setErrorMsg(res.message || 'ไม่สามารถลงชื่อเข้าใช้ด้วยบัญชีนี้ได้');
      }
    } catch (err) {
      setErrorMsg('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ลงชื่อเข้าใช้');
    }
    setLoading(false);
  };

  const handlePresetLogin = (user: User) => {
    onLoginSuccess(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mvu-500/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-xl glass-panel p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6 z-10 relative">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mvu-500 to-amber-600 mx-auto flex items-center justify-center text-slate-950 shadow-xl shadow-mvu-500/25">
            <Sparkles className="w-9 h-9" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">mvusys Local AI Agent</h1>
            <p className="text-sm font-semibold text-mvu-400 mt-1">ระบบบริหารงาน มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <div className="space-y-3">
          <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> บริการยืนยันตัวตนผ่าน Google Authen SSO (Gmail)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button type="button" onClick={onOpenGoogleLogin} className="glass-card p-4 rounded-2xl border border-slate-700/80 hover:border-mvu-500/80 hover:bg-slate-900/90 text-left transition-all group shadow-lg flex items-center gap-3 hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md"><GoogleIcon /></div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white group-hover:text-mvu-300 flex items-center gap-1"><span>ล็อกอินด้วย Gmail</span><LogIn className="w-3.5 h-3.5 text-mvu-400" /></div>
                <div className="text-[10px] text-slate-400">เข้าสู่ระบบผ่าน Google Authen</div>
              </div>
            </button>
            <button type="button" onClick={onOpenRegister} className="glass-card p-4 rounded-2xl border border-slate-700/80 hover:border-emerald-500/80 hover:bg-slate-900/90 text-left transition-all group shadow-lg flex items-center gap-3 hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md"><GoogleIcon /></div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-1"><span>ลงทะเบียนด้วย Gmail</span><UserPlus className="w-3.5 h-3.5 text-emerald-400" /></div>
                <div className="text-[10px] text-slate-400">สมัครสมาชิกผ่าน Google Authen</div>
              </div>
            </button>
          </div>
        </div>

        <form onSubmit={handleQuickEmailLogin} className="glass-card p-4 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-mvu-400" /> หรือ ระบุอีเมลบัญชีสถาบัน (@mcu.ac.th / @gmail.com)
            </span>
          </div>
          <div className="flex gap-2">
            <input type="email" placeholder="กรอกอีเมล เช่น worachayo@mcu.ac.th" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-mvu-500 font-mono" />
            <button type="submit" disabled={loading || !email} className="px-4 py-2 rounded-xl bg-mvu-500 hover:bg-mvu-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-mvu-500/20 transition-all hover:scale-105">
              <span>เข้าสู่ระบบ</span><LogIn className="w-4 h-4" />
            </button>
          </div>
        </form>

        <button
          onClick={onAdminLoginClick}
          className="w-full py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <ShieldCheck className="w-4 h-4" /> <span>เข้าสู่ระบบเฉพาะผู้ดูแลระบบ (Admin Login)</span>
        </button>

        {/* System Security Badges */}
        <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono border-t border-slate-800/80">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> Local RAG Secured</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Database className="w-3 h-3 text-blue-400" /> Supabase Live</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
