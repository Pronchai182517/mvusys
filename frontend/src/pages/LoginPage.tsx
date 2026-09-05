import React, { useState } from 'react';
import { api } from '../services/api';
import { User, UserRole } from '../types';
import { Sparkles, LogIn, UserPlus, ShieldCheck, Database, Building2, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onOpenRegister: () => void;
}

const PRESET_USERS: User[] = [
  { id: 'usr-1', name: 'พระพรชัย วรชโย', role: 'admin', title: 'นักวิชาการคอมพิวเตอร์', department: 'ส่วนงานบริหารองค์กร', email: 'worachayo@mvu.ac.th' },
  { id: 'usr-2', name: 'ผู้บริหาร มหาวชิราลงกรณฯ', role: 'executive', title: 'รองอธิการบดี / ผู้บริหาร', department: 'สำนักงานผู้บริหาร', email: 'exec@mvu.ac.th' },
  { id: 'usr-3', name: 'เจ้าหน้าที่แผนงานและงบประมาณ', role: 'project_lead', title: 'นักวิเคราะห์นโยบายและแผน', department: 'งานแผนและงบประมาณ', email: 'plan@mvu.ac.th' },
  { id: 'usr-4', name: 'เจ้าหน้าที่ติดตามประเมินผล', role: 'tracking_officer', title: 'เจ้าหน้าที่ประกันคุณภาพ', department: 'งานประกันคุณภาพ', email: 'qa@mvu.ac.th' }
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onOpenRegister }) => {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleLogin = async (e: React.FormEvent) => {
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
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mvu-500/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Login Card Container */}
      <div className="w-full max-w-xl glass-panel p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6 z-10 relative">
        {/* Branding & Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mvu-500 to-amber-600 mx-auto flex items-center justify-center text-slate-950 shadow-xl shadow-mvu-500/25">
            <Sparkles className="w-9 h-9" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">mvusys Local AI Agent</h1>
            <p className="text-sm font-semibold text-mvu-400 mt-1">
              ระบบบริหารงาน มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (<span className="text-amber-400 font-mono">@mcu.ac.th</span>)
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* 1. Google Workspace @mcu.ac.th Direct Login Form */}
        <form onSubmit={handleGoogleLogin} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-mvu-400" /> เข้าสู่ระบบด้วยบัญชี Google @mcu.ac.th
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Verified Domain
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="กรอกอีเมลสถาบัน เช่น worachayo@mcu.ac.th"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-mvu-500 font-mono"
            />
            <button
              type="submit"
              disabled={loading || !email}
              className="px-4 py-2.5 rounded-xl bg-mvu-500 hover:bg-mvu-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-mvu-500/20 transition-all hover:scale-105"
            >
              <span>เข้าสู่ระบบ</span>
              <LogIn className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-[11px]">หรือ เลือกเข้าสู่ระบบตามสิทธิ์ทดสอบ</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* 2. Preset Roles Selector for Testing & Demo */}
        <div className="space-y-2">
          <label className="text-xs text-slate-400 font-medium">เข้าสู่ระบบทันทีด้วยบัญชีสิทธิ์ตัวอย่าง (Preset Accounts):</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESET_USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => handlePresetLogin(user)}
                className="glass-card p-3 rounded-xl border border-slate-800 text-left hover:border-mvu-500/50 transition-all group flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white group-hover:text-mvu-300">{user.name}</div>
                  <div className="text-[10px] text-slate-400">{user.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-mvu-400 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Register Option Button */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
          <span className="text-xs text-slate-400">ยังไม่มีบัญชีสมาชิกสถาบัน?</span>
          <button
            type="button"
            onClick={onOpenRegister}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>ลงทะเบียนสมาชิกใหม่ (@mcu.ac.th)</span>
          </button>
        </div>

        {/* System Security Badges */}
        <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> Local RAG Secured</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Database className="w-3 h-3 text-blue-400" /> Supabase Live</span>
        </div>
      </div>
    </div>
  );
};
