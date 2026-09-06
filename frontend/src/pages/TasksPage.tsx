import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Task } from '../types';

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form State
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [category, setCategory] = useState('บริหารงานทั่วไป');
  const [evidence, setEvidence] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await api.createTask({
      title,
      assignee: assignee || 'พระพรชัย วรชโย',
      deadline: deadline || new Date().toISOString().split('T')[0],
      priority,
      status: 'In Progress',
      category,
      evidence
    });
    setShowModal(false);
    setTitle('');
    setEvidence('');
    loadTasks();
  };

  const handleStatusChange = async (task: Task, newStatus: Task['status']) => {
    await api.updateTask(task.id, { status: newStatus });
    loadTasks();
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const totalItems = filteredTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentTasks = filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));
  const goToLastPage = () => setCurrentPage(totalPages);

  return (
    <div className="w-full max-w-5xl mx-auto animate-fadeIn pb-safe">
      {/* Header & Actions */}
      <div className="px-screen-margin-mobile pt-space-md pb-space-sm bg-surface flex flex-col sm:flex-row sm:items-start justify-between gap-space-md border-b border-border-subtle sticky top-0 z-30">
        <div>
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="material-symbols-outlined text-[24px] text-primary">assignment</span>
            <h1 className="font-heading-lg text-heading-lg font-bold text-text-primary tracking-tight">ระบบบริหารภารกิจ</h1>
          </div>
          <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
            บันทึก มอบหมายงาน กำหนดผู้รับผิดชอบ และติดตามหลักฐานการดำเนินงาน
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-primary text-on-primary px-space-md py-2.5 rounded-[8px] font-label-md text-[13px] font-bold active:scale-[0.98] transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          เพิ่มภารกิจใหม่
        </button>
      </div>

      {/* Filters Bar */}
      <div className="px-screen-margin-mobile py-space-sm bg-surface-subtle border-b border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-text-muted">search</span>
          <input
            type="text"
            placeholder="ค้นหาภารกิจ หรือผู้รับผิดชอบ..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-border-subtle rounded-[8px] pl-9 pr-4 py-2 font-body-sm text-[13px] text-text-primary placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="material-symbols-outlined text-[18px] text-text-muted">filter_list</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-surface border border-border-subtle text-text-primary font-body-sm text-[13px] rounded-[8px] px-3 py-2 outline-none cursor-pointer focus:border-primary shadow-sm"
          >
            <option value="all">ทุกสถานะ</option>
            <option value="In Progress">กำลังดำเนินงาน</option>
            <option value="Completed">เสร็จสิ้น</option>
            <option value="Delayed">ล่าช้า</option>
            <option value="Pending">รอเริ่มงาน</option>
          </select>
        </div>
      </div>

      {/* Task List Grid */}
      <div className="px-screen-margin-mobile py-space-md">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[24px] animate-spin">sync</span>
              <span className="font-label-sm text-[13px] font-semibold">กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm">
            {currentTasks.map(task => (
              <div key={task.id} className="bg-surface-card p-space-md rounded-[12px] border border-border-subtle shadow-sm flex flex-col justify-between space-y-space-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  task.status === 'Completed' ? 'bg-status-success' :
                  task.status === 'Delayed' ? 'bg-status-error' :
                  task.status === 'In Progress' ? 'bg-primary' : 'bg-status-warning'
                }`}></div>
                
                <div className="pl-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-badge text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-subtle text-text-secondary font-bold">
                      {task.category}
                    </span>
                    <span className={`font-mono-badge text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      task.priority === 'Urgent' ? 'bg-status-error/10 text-status-error' :
                      task.priority === 'High' ? 'bg-status-warning/10 text-status-warning' :
                      'bg-surface-subtle text-text-muted'
                    }`}>
                      {task.priority === 'Urgent' ? 'เร่งด่วนที่สุด' : task.priority === 'High' ? 'สูง' : task.priority === 'Medium' ? 'ปานกลาง' : 'ปกติ'}
                    </span>
                  </div>

                  <h3 className="font-label-md text-[14px] font-bold text-text-primary leading-snug">{task.title}</h3>
                  
                  <div className="font-body-sm text-[12px] text-text-secondary space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-text-muted">person</span>
                      <span>ผู้รับผิดชอบ:</span>
                      <span className="font-semibold text-text-primary">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-accent-gold">schedule</span>
                      <span>กำหนดส่ง: <strong className="text-text-primary">{task.deadline}</strong></span>
                    </div>
                  </div>

                  {task.evidence && (
                    <div className="mt-2 p-2 rounded-[6px] bg-status-success/10 border border-status-success/20 font-body-sm text-[11px] text-text-primary flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-status-success mt-0.5">verified</span>
                      <span className="flex-1 break-all line-clamp-2">หลักฐาน: {task.evidence}</span>
                    </div>
                  )}
                </div>

                {/* Status Update Quick Buttons */}
                <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between pl-1 gap-2">
                  <span className="font-label-sm text-[10px] text-text-muted">เปลี่ยนสถานะ:</span>
                  <div className="flex gap-1.5">
                    {task.status !== 'Completed' && (
                      <button
                        onClick={() => handleStatusChange(task, 'Completed')}
                        className="px-2.5 py-1.5 rounded-[6px] bg-status-success/10 active:bg-status-success/20 text-status-success font-label-sm text-[11px] font-bold transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> ทำเสร็จแล้ว
                      </button>
                    )}
                    {task.status !== 'Delayed' && (
                      <button
                        onClick={() => handleStatusChange(task, 'Delayed')}
                        className="px-2.5 py-1.5 rounded-[6px] bg-status-error/10 active:bg-status-error/20 text-status-error font-label-sm text-[11px] font-bold transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">warning</span> แจ้งล่าช้า
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Status Bar */}
        {!loading && totalItems > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-card p-space-sm rounded-[12px] border border-border-subtle mt-space-md shadow-sm">
            <div className="font-body-sm text-[12px] text-text-secondary text-center sm:text-left">
              จำนวนงานทั้งหมด <strong className="text-text-primary font-bold">{totalItems}</strong> รายการ <br className="sm:hidden" />
              <span className="sm:ml-1">(หน้า {currentPage} จาก {totalPages || 1})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={goToFirstPage} 
                disabled={currentPage === 1} 
                className="p-1.5 rounded-[6px] bg-surface-subtle border border-border-subtle text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                title="หน้าแรกสุด"
              >
                <span className="material-symbols-outlined text-[18px]">first_page</span>
              </button>
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1} 
                className="p-1.5 rounded-[6px] bg-surface-subtle border border-border-subtle text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                title="หน้าก่อนหน้า"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages || totalPages === 0} 
                className="p-1.5 rounded-[6px] bg-surface-subtle border border-border-subtle text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                title="หน้าถัดไป"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
              <button 
                onClick={goToLastPage} 
                disabled={currentPage === totalPages || totalPages === 0} 
                className="p-1.5 rounded-[6px] bg-surface-subtle border border-border-subtle text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                title="หน้าสุดท้าย"
              >
                <span className="material-symbols-outlined text-[18px]">last_page</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Add Task */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-overlay/60 backdrop-blur-sm">
          <div className="bg-surface-card p-space-md rounded-[16px] border border-border-subtle w-full max-w-lg shadow-xl animate-scaleUp overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-space-md border-b border-border-subtle pb-space-xs">
              <h3 className="font-heading-sm text-[18px] font-bold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">add_task</span> เพิ่มรายการภารกิจใหม่
              </h3>
              <button onClick={() => setShowModal(false)} className="text-text-muted active:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-space-md">
              <div>
                <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">ชื่องาน / ภารกิจ <span className="text-status-error">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ตรวจสอบความถูกต้องระบบ AI Agent"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-[13px] text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">ผู้รับผิดชอบ</label>
                  <input
                    type="text"
                    placeholder="เช่น พระพรชัย วรชโย"
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-[13px] text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">กำหนดส่ง (Deadline)</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-[13px] text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">ความเร่งด่วน</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-[13px] text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                  >
                    <option value="Low">ปกติ (Low)</option>
                    <option value="Medium">ปานกลาง (Medium)</option>
                    <option value="High">สูง (High)</option>
                    <option value="Urgent">เร่งด่วนที่สุด (Urgent)</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">หมวดหมู่งาน</label>
                  <input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-[13px] text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">หลักฐานการดำเนินงาน (URL หรือรายละเอียด)</label>
                <input
                  type="text"
                  placeholder="เช่น ไฟล์แนบรายงาน หรือ ลิงก์ระบบ"
                  value={evidence}
                  onChange={e => setEvidence(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-[13px] text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border-subtle mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-[8px] font-label-md text-[13px] font-bold text-text-secondary active:bg-surface-subtle transition-colors border border-border-subtle"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[8px] bg-primary text-on-primary font-label-md text-[13px] font-bold active:scale-[0.98] transition-transform shadow-sm flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  บันทึกภารกิจ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
