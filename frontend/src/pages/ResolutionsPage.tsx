import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Resolution } from '../types';
import { FileText, Plus, CheckCircle, Clock, Calendar, UserCheck } from 'lucide-react';

export const ResolutionsPage: React.FC = () => {
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [meetingNo, setMeetingNo] = useState('ครั้งที่ 5/2569');
  const [assignee, setAssignee] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    loadResolutions();
  }, []);

  const loadResolutions = async () => {
    setLoading(true);
    try {
      const data = await api.getResolutions();
      setResolutions(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await api.createResolution({
      title,
      meeting_no: meetingNo,
      meeting_date: new Date().toISOString().split('T')[0],
      assignee: assignee || 'พระพรชัย วรชโย',
      status: 'Pending',
      details
    });
    setShowModal(false);
    setTitle('');
    setDetails('');
    loadResolutions();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            📜 ระบบบันทึกและติดตามมติที่ประชุม (Meeting Resolutions)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            รวบรวมมติสภาวิทยาลัยและคณะกรรมการ มอบหมายงาน และติดตามผลการปฏิบัติงาน
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-mvu-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> บันทึกมติใหม่
        </button>
      </div>

      {/* Resolutions List */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-xs">กำลังโหลดมติที่ประชุม...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resolutions.map(resItem => (
            <div key={resItem.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-mvu-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {resItem.meeting_no}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  resItem.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  resItem.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {resItem.status}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white leading-snug">{resItem.title}</h3>
              <p className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">{resItem.details}</p>

              <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
                <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-mvu-400" /> {resItem.assignee}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-500" /> {resItem.meeting_date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Resolution */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700 w-full max-w-lg space-y-4 animate-scaleUp">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-mvu-400" /> บันทึกมติที่ประชุมใหม่
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">หัวข้อมติที่ประชุม</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น มอบหมายจัดตั้งศูนย์ Local AI"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">การประชุมครั้งที่</label>
                  <input
                    type="text"
                    value={meetingNo}
                    onChange={e => setMeetingNo(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">ผู้รับผิดชอบการดำเนินการ</label>
                  <input
                    type="text"
                    placeholder="เช่น พระพรชัย วรชโย"
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">สาระสำคัญ / รายละเอียดมติ</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-semibold text-xs"
                >
                  บันทึกมติ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
