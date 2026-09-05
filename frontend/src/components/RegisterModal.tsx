import React, { useState } from 'react';
import { api } from '../services/api';
import { UserRole } from '../types';
import { UserPlus, Mail, ShieldAlert, CheckCircle, Building2, User } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('นักวิชาการ / เจ้าหน้าที่');
  const [department, setDepartment] = useState('มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย');
  const [requestedRole, setRequestedRole] = useState<UserRole>('executive');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await api.registerMember({
        name,
        email,
        title,
        department,
        requestedRole
      });

      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
          setName('');
          setEmail('');
        }, 2000);
      } else {
        setErrorMsg(res.message || 'ไม่สามารถลงทะเบียนได้');
      }
    } catch (err: any) {
      setErrorMsg('เกิดข้อผิดพลาดในการเชื่อมต่อระบบลงทะเบียน');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 w-full max-w-md space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs p-1 rounded-lg hover:bg-slate-800"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
            <UserPlus className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">ลงทะเบียนสมาชิกใหม่</h3>
          <p className="text-xs text-slate-400">
            เฉพาะบุคลากรบัญชี <span className="text-emerald-400 font-mono">@mcu.ac.th</span> เท่านั้น
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-slate-400">ชื่อ-นามสกุล (และสมณศักดิ์ถ้ามี)</label>
            <div className="relative mt-1">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                required
                placeholder="เช่น พระครูสังฆรักษ์... / ดร.สมชาย"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400">อีเมลสถาบัน (@mcu.ac.th)</label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="เช่น somchai@mcu.ac.th"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400">ตำแหน่งงาน</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">สังกัด / คณะ / ส่วนงาน</label>
              <input
                type="text"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400">สิทธิ์บทบาทที่ต้องการขออนุมัติ</label>
            <select
              value={requestedRole}
              onChange={e => setRequestedRole(e.target.value as UserRole)}
              className="w-full mt-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            >
              <option value="executive">ผู้บริหาร (Executive View)</option>
              <option value="project_lead">ผู้รับผิดชอบโครงการ (Project Lead)</option>
              <option value="tracking_officer">เจ้าหน้าที่ติดตามประเมินผล (Tracking Officer)</option>
              <option value="admin">ผู้ดูแลระบบ (Admin)</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'กำลังส่งข้อมูล...' : 'ยื่นขอลงทะเบียนสมาชิก'}</span>
            </button>
          </div>
        </form>

        <div className="text-[11px] text-slate-500 text-center border-t border-slate-800/80 pt-2">
          🛡️ ข้อมูลจะถูกส่งเข้าสู่ระบบรอการตรวจสอบสิทธิ์และอนุมัติโดย Admin
        </div>
      </div>
    </div>
  );
};
