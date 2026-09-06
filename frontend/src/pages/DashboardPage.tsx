import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
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
        <div className="flex items-center space-x-3 text-primary">
          <span className="material-symbols-outlined text-[24px] animate-spin">sync</span>
          <span className="font-label-md text-label-md font-semibold">กำลังโหลดข้อมูลภาพรวมระบบ...</span>
        </div>
      </div>
    );
  }

  const stats = summary?.stats;
  const projectChartData = [
    { name: 'ตามแผน', value: stats?.projects?.onTrack || 0, color: '#116b5a' },
    { name: 'มีความเสี่ยง', value: stats?.projects?.atRisk || 0, color: '#D99B26' },
    { name: 'แล้วเสร็จ', value: 1, color: '#0B1B34' }
  ];

  const progressData = [
    { month: 'มิ.ย.', progress: 20 },
    { month: 'ก.ค.', progress: 45 },
    { month: 'ส.ค.', progress: 65 },
    { month: 'ก.ย.', progress: stats?.projects?.avgProgress || 70 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-space-md animate-fadeIn">
      {/* Page Header */}
      <div className="px-screen-margin-mobile pt-space-md pb-space-sm bg-surface">
        <div className="flex items-center gap-space-sm mb-space-xs">
          <span className="material-symbols-outlined text-[24px] text-primary">space_dashboard</span>
          <h1 className="font-heading-lg text-heading-lg font-bold text-text-primary tracking-tight">ภาพรวมระบบบริหาร</h1>
        </div>
        <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
          สรุปความคืบหน้าภารกิจ โครงการ และมติที่ประชุมที่ต้องติดตาม
        </p>
      </div>

      <div className="px-screen-margin-mobile pb-space-2xl space-y-space-md">
        
        {/* Action Button */}
        <button
          onClick={() => onNavigate('ai-agent')}
          className="w-full flex items-center justify-center gap-space-sm bg-primary text-on-primary font-label-md text-label-md font-bold px-space-md py-3.5 rounded-[8px] active:scale-[0.98] transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          สรุปรายงานสถานการณ์ด้วย AI
        </button>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Stat 1: Projects */}
          <div className="bg-surface-card p-space-md rounded-[12px] border border-border-subtle shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <span className="material-symbols-outlined text-[20px] text-primary">folder_open</span>
              <span className="font-mono-badge text-[10px] px-1.5 py-0.5 rounded bg-status-success/10 text-status-success font-semibold">เฉลี่ย {stats?.projects?.avgProgress}%</span>
            </div>
            <div>
              <div className="font-heading-md text-[24px] font-bold text-text-primary">{stats?.projects?.total || 0}</div>
              <div className="font-label-sm text-label-sm font-semibold text-text-secondary uppercase">โครงการรวม</div>
            </div>
          </div>

          {/* Stat 2: Tasks */}
          <div className="bg-surface-card p-space-md rounded-[12px] border border-border-subtle shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <span className="material-symbols-outlined text-[20px] text-accent-gold">assignment</span>
              <span className="font-mono-badge text-[10px] px-1.5 py-0.5 rounded bg-status-warning/10 text-status-warning font-semibold">ล่าช้า {stats?.tasks?.delayed}</span>
            </div>
            <div>
              <div className="font-heading-md text-[24px] font-bold text-text-primary">{stats?.tasks?.inProgress || 0}</div>
              <div className="font-label-sm text-label-sm font-semibold text-text-secondary uppercase">ภารกิจดำเนินการ</div>
            </div>
          </div>

          {/* Stat 3: Resolutions */}
          <div className="bg-surface-card p-space-md rounded-[12px] border border-border-subtle shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <span className="material-symbols-outlined text-[20px] text-text-primary">gavel</span>
              <span className="font-mono-badge text-[10px] px-1.5 py-0.5 rounded bg-surface-subtle text-text-muted font-semibold">ตาม {stats?.resolutions?.pending}</span>
            </div>
            <div>
              <div className="font-heading-md text-[24px] font-bold text-text-primary">{stats?.resolutions?.total || 0}</div>
              <div className="font-label-sm text-label-sm font-semibold text-text-secondary uppercase">มติสภาฯ</div>
            </div>
          </div>

          {/* Stat 4: Total Budget */}
          <div className="bg-surface-card p-space-md rounded-[12px] border border-border-subtle shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <span className="material-symbols-outlined text-[20px] text-status-success">payments</span>
              <span className="font-mono-badge text-[10px] px-1.5 py-0.5 rounded bg-surface-subtle text-text-muted font-semibold">{stats?.knowledgeDocs} DOCS</span>
            </div>
            <div>
              <div className="font-heading-sm text-[16px] font-bold text-status-success">฿{(stats?.projects?.totalBudget || 0).toLocaleString()}</div>
              <div className="font-label-sm text-[10px] font-semibold text-text-secondary uppercase">งบประมาณรวม</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-surface-card p-space-md rounded-[12px] border border-border-subtle shadow-sm space-y-space-md">
          <div className="flex items-center justify-between">
            <h3 className="font-label-md text-label-md font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">monitoring</span>
              แนวโน้มความก้าวหน้าโครงการ
            </h3>
          </div>
          <div className="h-48 w-full -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B1B34" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0B1B34" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6B7280" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={10} domain={[0, 100]} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E5E7EB', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="progress" stroke="#0B1B34" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-label-md text-label-md font-bold text-text-primary uppercase tracking-wider">ภารกิจเร่งด่วน / ล่าช้า</h2>
            <button onClick={() => onNavigate('tasks')} className="font-label-sm text-label-sm font-semibold text-primary active:opacity-70">
              ดูทั้งหมด
            </button>
          </div>
          <div className="space-y-space-xs">
            {summary?.urgentTasks?.length > 0 ? (
              summary.urgentTasks.map((task: any) => (
                <div key={task.id} className="bg-surface-card rounded-[8px] p-space-sm border border-border-subtle shadow-sm flex flex-col gap-1.5 relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.status === 'Delayed' ? 'bg-status-error' : 'bg-status-warning'}`}></div>
                  <div className="flex items-start justify-between gap-2 pl-2">
                    <span className="font-label-sm text-[13px] font-bold text-text-primary leading-tight">{task.title}</span>
                    <span className={`font-mono-badge text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap ${
                      task.status === 'Delayed' ? 'bg-status-error/10 text-status-error font-bold' : 'bg-status-warning/10 text-status-warning font-bold'
                    }`}>
                      {task.status === 'Delayed' ? 'LATE' : 'URGENT'}
                    </span>
                  </div>
                  <div className="flex items-center gap-space-sm pl-2 font-body-sm text-[11px] text-text-secondary">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">person</span>{task.assignee}</span>
                    <span className="flex items-center gap-1 text-status-warning"><span className="material-symbols-outlined text-[12px]">schedule</span>{task.deadline}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-surface-subtle rounded-[8px] p-space-lg text-center border border-dashed border-border-subtle">
                <span className="font-label-sm text-label-sm text-text-muted">ไม่มีภารกิจเร่งด่วนในขณะนี้</span>
              </div>
            )}
          </div>
        </div>

        {/* At-Risk Projects */}
        <div className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-label-md text-label-md font-bold text-text-primary uppercase tracking-wider">โครงการที่มีความเสี่ยง</h2>
            <button onClick={() => onNavigate('projects')} className="font-label-sm text-label-sm font-semibold text-primary active:opacity-70">
              ดูทั้งหมด
            </button>
          </div>
          <div className="space-y-space-xs">
            {summary?.riskProjects?.length > 0 ? (
              summary.riskProjects.map((proj: any) => (
                <div key={proj.id} className="bg-surface-card rounded-[8px] p-space-sm border border-border-subtle shadow-sm flex flex-col gap-1.5 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-gold"></div>
                  <div className="flex items-start justify-between gap-2 pl-2">
                    <span className="font-label-sm text-[13px] font-bold text-text-primary leading-tight">{proj.name}</span>
                    <span className="font-mono-badge text-[10px] text-text-muted font-semibold bg-surface-subtle px-1 rounded">{proj.progress}%</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-accent-gold leading-tight pl-2">
                    <span className="font-bold">ปัญหา:</span> {proj.obstacles}
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-surface-subtle rounded-[8px] p-space-lg text-center border border-dashed border-border-subtle">
                <span className="font-label-sm text-label-sm text-text-muted">ไม่มีโครงการที่มีความเสี่ยง</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
