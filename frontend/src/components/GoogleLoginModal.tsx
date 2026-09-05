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
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.loginWithGoogle(email, name);
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

  const handleQuickMcuLogin = () => {
    setEmail('somchai@mcu.ac.th');
    setName('พระสมชาย มหาปัญโญ (มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย)');
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
            มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (<span className="text-amber-400 font-mono">@mcu.ac.th</span>)
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
            <label className="text-xs text-slate-400">อีเมลบัญชีสถาบัน (@mcu.ac.th หรือ @mvu.ac.th)</label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="เช่น worachayo@mcu.ac.th"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-mvu-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400">ชื่อ-นามสกุล / ตำแหน่ง</label>
            <input
              type="text"
              placeholder="เช่น พระพรชัย วรชโย (นักวิชาการคอมพิวเตอร์)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full mt-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
            />
          </div>

          {/* Quick Preset Selector */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleQuickMcuLogin}
              className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-mvu-400" /> ทดสอบบัญชีตัวอย่าง @mcu.ac.th
              </span>
              <span className="text-[10px] font-mono text-mvu-400">somchai@mcu.ac.th</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-mvu-500 to-amber-600 hover:from-mvu-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-mvu-500/20 transition-all hover:scale-[1.02]"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'กำลังตรวจสอบสิทธิ์...' : 'ยืนยันลงชื่อเข้าใช้ด้วย Google @mcu.ac.th'}</span>
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
