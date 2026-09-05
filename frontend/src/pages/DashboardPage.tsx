import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { CheckSquare, FolderGit2, FileText, AlertTriangle, TrendingUp, Clock, DollarSign, Sparkles } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface DashboardPageProps {
  onNavigate: (tab: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardSummary();
      setSummary(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex items-center space-x-3 text-mvu-400">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span className="text-sm font-medium">กำลังโหลดข้อมูลแดชบอร์ดผู้บริหาร...</span>
        </div>
      </div>
    );
  }

  const stats = summary?.stats;
  const projectChartData = [
    { name: 'ตามแผน (On Track)', value: stats?.projects?.onTrack || 0, color: '#10b981' },
    { name: 'มีความเสี่ยง (At Risk)', value: stats?.projects?.atRisk || 0, color: '#f59e0b' },
    { name: 'แล้วเสร็จ (Completed)', value: 1, color: '#6366f1' }
  ];

  const progressData = [
    { month: 'มิ.ย.', progress: 20 },
    { month: 'ก.ค.', progress: 45 },
    { month: 'ส.ค.', progress: 65 },
    { month: 'ก.ย.', progress: stats?.projects?.avgProgress || 70 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            📊 แดชบอร์ดภาพรวมการบริหารงานผู้บริหาร
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            สรุปภารกิจ โครงการ มติที่ประชุม และประเด็นความเสี่ยงสำหรับ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
          </p>
        </div>
        <button
          onClick={() => onNavigate('ai-agent')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-mvu-500 to-amber-600 hover:from-mvu-400 hover:to-amber-500 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-mvu-500/20 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          ให้ AI Agent สรุปรายงานผู้บริหาร
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Projects */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">โครงการทั้งหมด</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">{stats?.projects?.total || 0}</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> ความก้าวหน้าเฉลี่ย {stats?.projects?.avgProgress}%
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${stats?.projects?.avgProgress}%` }}></div>
          </div>
        </div>

        {/* Stat 2: Tasks */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">ภารกิจที่กำลังดำเนินงาน</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">{stats?.tasks?.inProgress || 0}</span>
            <span className="text-xs text-slate-400">จากทั้งหมด {stats?.tasks?.total} รายการ</span>
          </div>
          <div className="flex gap-2 text-[11px]">
            <span className="text-emerald-400">✓ เสร็จแล้ว {stats?.tasks?.completed}</span>
            <span className="text-rose-400">⚠️ ล่าช้า {stats?.tasks?.delayed}</span>
          </div>
        </div>

        {/* Stat 3: Resolutions */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">มติที่ประชุมสภา/คณะกรรมการ</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-white">{stats?.resolutions?.total || 0}</span>
            <span className="text-xs text-amber-400 font-medium">ต้องติดตาม {stats?.resolutions?.pending} มติ</span>
          </div>
          <div className="text-[11px] text-slate-400">เชื่อมโยงผู้รับผิดชอบ & กำหนดเวลาแล้ว</div>
        </div>

        {/* Stat 4: Total Budget */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">งบประมาณโครงการรวม</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            ฿{(stats?.projects?.totalBudget || 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">คลังเอกสารฐานความรู้ {stats?.knowledgeDocs} รายการ</div>
        </div>
      </div>

      {/* Charts & Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Trend Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-mvu-400" /> แนวโน้มความก้าวหน้าโครงการโดยรวม (%)
            </h3>
            <span className="text-xs text-slate-400">ไตรมาสที่ 3-4 / 2569</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e4bf57" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#e4bf57" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="progress" stroke="#e4bf57" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Pie */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-blue-400" /> สัดส่วนสถานะโครงการ
          </h3>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={projectChartData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                  {projectChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs">
            {projectChartData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold text-white">{item.value} โครงการ</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Urgent Tasks & Executive Risk List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent & Delayed Tasks */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> ภารกิจเร่งด่วน / ล่าช้าที่ต้องติดตาม
            </h3>
            <button onClick={() => onNavigate('tasks')} className="text-xs text-mvu-400 hover:underline">
              ดูทั้งหมด →
            </button>
          </div>

          <div className="space-y-2.5">
            {summary?.urgentTasks?.length > 0 ? (
              summary.urgentTasks.map((task: any) => (
                <div key={task.id} className="glass-card p-3.5 rounded-xl flex items-center justify-between border-l-4 border-l-rose-500">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-slate-100">{task.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>👤 {task.assignee}</span>
                      <span className="flex items-center gap-1 text-amber-400"><Clock className="w-3 h-3"/> กำหนดส่ง {task.deadline}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                    task.status === 'Delayed' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500 text-center py-6">ไม่มีภารกิจเร่งด่วนในขณะนี้</div>
            )}
          </div>
        </div>

        {/* At-Risk Projects */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4" /> โครงการที่มีประเด็นความเสี่ยง/ปัญหาอุปสรรค
            </h3>
            <button onClick={() => onNavigate('projects')} className="text-xs text-mvu-400 hover:underline">
              ดูทั้งหมด →
            </button>
          </div>

          <div className="space-y-2.5">
            {summary?.riskProjects?.length > 0 ? (
              summary.riskProjects.map((proj: any) => (
                <div key={proj.id} className="glass-card p-3.5 rounded-xl space-y-2 border-l-4 border-l-amber-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-100">{proj.name}</span>
                    <span className="text-[11px] font-mono text-mvu-300">{proj.progress}%</span>
                  </div>
                  <p className="text-[11px] text-amber-300/80 italic">
                    ⚠️ ปัญหาอุปสรรค: {proj.obstacles}
                  </p>
                  <div className="text-[10px] text-slate-400">ผู้รับผิดชอบ: {proj.owner}</div>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500 text-center py-6">ทุกโครงการดำเนินการตามแผนปกติ</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
