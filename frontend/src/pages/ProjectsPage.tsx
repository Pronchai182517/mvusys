import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Project } from '../types';
import { Plus, FolderGit2, AlertOctagon, Target, DollarSign, UserCheck, Calendar } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [budget, setBudget] = useState(50000);
  const [owner, setOwner] = useState('');
  const [kpis, setKpis] = useState('');
  const [obstacles, setObstacles] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await api.createProject({
      name,
      objective,
      budget,
      progress: 10,
      status: 'On Track',
      owner: owner || 'พระพรชัย วรชโย',
      kpis,
      obstacles
    });
    setShowModal(false);
    setName('');
    setObjective('');
    loadProjects();
  };

  const handleProgressChange = async (proj: Project, delta: number) => {
    const newProgress = Math.min(100, Math.max(0, proj.progress + delta));
    const newStatus = newProgress === 100 ? 'Completed' : proj.status;
    await api.updateProject(proj.id, { progress: newProgress, status: newStatus });
    loadProjects();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🚀 ระบบบริหารแผนงานและโครงการ (Projects & Action Plans)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ติดตามวัตถุประสงค์ งบประมาณ ตัวชี้วัด ความก้าวหน้า % และปัญหาอุปสรรค
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-mvu-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> สร้างโครงการใหม่
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-xs">กำลังโหลดโครงการ...</div>
      ) : (
        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-mvu-500/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-base font-bold text-white">{proj.name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      proj.status === 'On Track' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      proj.status === 'At Risk' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{proj.objective}</p>
                </div>

                <div className="flex items-center space-x-4 font-mono text-xs">
                  <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">฿{proj.budget?.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-mvu-400" />
                    <span className="text-slate-300">{proj.owner}</span>
                  </div>
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">ความก้าวหน้าโครงการ</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleProgressChange(proj, -10)} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-[10px]">-10%</button>
                    <span className="text-mvu-300 font-bold font-mono text-sm">{proj.progress}%</span>
                    <button onClick={() => handleProgressChange(proj, +10)} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-[10px]">+10%</button>
                  </div>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-mvu-500 to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${proj.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* KPIs & Obstacles Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                {proj.kpis && (
                  <div className="glass-card p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" /> ตัวชี้วัดความสำเร็จ (KPIs)
                    </div>
                    <p className="text-slate-300 text-[11px]">{proj.kpis}</p>
                  </div>
                )}

                {proj.obstacles && (
                  <div className="glass-card p-3 rounded-xl border border-slate-800/80 space-y-1 bg-amber-500/5">
                    <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                      <AlertOctagon className="w-3.5 h-3.5" /> ปัญหาอุปสรรคและข้อจำกัด
                    </div>
                    <p className="text-amber-200/80 text-[11px]">{proj.obstacles}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal New Project */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700 w-full max-w-lg space-y-4 animate-scaleUp">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-mvu-400" /> สร้างโครงการใหม่
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">ชื่อโครงการ</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น โครงการพัฒนาระบบบริหารจัดการ AI"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">วัตถุประสงค์โครงการ</label>
                <textarea
                  rows={2}
                  placeholder="อธิบายวัตถุประสงค์สั้นๆ"
                  value={objective}
                  onChange={e => setObjective(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">งบประมาณ (บาท)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">ผู้รับผิดชอบโครงการ</label>
                  <input
                    type="text"
                    placeholder="เช่น พระพรชัย วรชโย"
                    value={owner}
                    onChange={e => setOwner(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">ตัวชี้วัดความสำเร็จ (KPIs)</label>
                <input
                  type="text"
                  placeholder="เช่น ระบบเปิดใช้งานได้จริง มีบุคลากรผ่านการอบรม 20 คน"
                  value={kpis}
                  onChange={e => setKpis(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">ปัญหาอุปสรรค (ถ้ามี)</label>
                <input
                  type="text"
                  placeholder="ระบุข้อจำกัดหรือความเสี่ยง"
                  value={obstacles}
                  onChange={e => setObstacles(e.target.value)}
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
                  สร้างโครงการ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
