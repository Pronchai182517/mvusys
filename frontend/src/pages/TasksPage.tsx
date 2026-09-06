import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Task } from '../types';
import { Plus, Search, Filter, Clock, FileCheck, CheckCircle, AlertCircle, Sparkles, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

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
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            📋 ระบบบริหารภารกิจและงานที่ได้รับมอบหมาย
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            บันทึก มอบหมายงาน กำหนดผู้รับผิดชอบ และติดตามหลักฐานการดำเนินงาน
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-mvu-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> เพิ่มภารกิจใหม่
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="ค้นหาภารกิจ หรือผู้รับผิดชอบ..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-mvu-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/60 text-xs text-slate-300 rounded-xl px-3 py-2 outline-none border cursor-pointer hover:border-mvu-500"
          >
            <option value="all">ทุกสถานะ (All Status)</option>
            <option value="In Progress">กำลังดำเนินงาน (In Progress)</option>
            <option value="Completed">เสร็จสิ้น (Completed)</option>
            <option value="Delayed">ล่าช้า (Delayed)</option>
            <option value="Pending">รอเริ่มงาน (Pending)</option>
          </select>
        </div>
      </div>

      {/* Task List Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-xs">กำลังโหลดรายการภารกิจ...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentTasks.map(task => (
            <div key={task.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-mvu-500/40">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {task.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    task.priority === 'Urgent' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    task.priority === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white leading-snug">{task.title}</h3>
                
                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">ผู้รับผิดชอบ:</span>
                    <span className="text-slate-200 font-medium">{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-mvu-400" />
                    <span>กำหนดส่ง: <strong className="text-slate-200">{task.deadline}</strong></span>
                  </div>
                </div>

                {task.evidence && (
                  <div className="mt-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate">หลักฐาน: {task.evidence}</span>
                  </div>
                )}
              </div>

              {/* Status Update Quick Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">เปลี่ยนสถานะ:</span>
                <div className="flex gap-1">
                  {task.status !== 'Completed' && (
                    <button
                      onClick={() => handleStatusChange(task, 'Completed')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-medium border border-emerald-500/30 transition-colors"
                    >
                      ✓ ทำเสร็จแล้ว
                    </button>
                  )}
                  {task.status !== 'Delayed' && (
                    <button
                      onClick={() => handleStatusChange(task, 'Delayed')}
                      className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-medium border border-rose-500/30 transition-colors"
                    >
                      ⚠️ แจ้งล่าช้า
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-800 mt-6">
          <div className="text-xs text-slate-400">
            จำนวนงานทั้งหมด <strong className="text-white text-sm">{totalItems}</strong> รายการ 
            (หน้า {currentPage} จาก {totalPages || 1})
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={goToFirstPage} 
              disabled={currentPage === 1} 
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="หน้าแรกสุด"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={goToPrevPage} 
              disabled={currentPage === 1} 
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="หน้าก่อนหน้า"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages || totalPages === 0} 
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="หน้าถัดไป"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={goToLastPage} 
              disabled={currentPage === totalPages || totalPages === 0} 
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="หน้าสุดท้าย"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal Add Task */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700 w-full max-w-lg space-y-4 animate-scaleUp">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-mvu-400" /> เพิ่มรายการภารกิจใหม่
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">ชื่องาน / ภารกิจ</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ตรวจสอบความถูกต้องระบบ AI Agent"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">ผู้รับผิดชอบ</label>
                  <input
                    type="text"
                    placeholder="เช่น พระพรชัย วรชโย"
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">กำหนดส่ง (Deadline)</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">ความเร่งด่วน</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  >
                    <option value="Low">ปกติ (Low)</option>
                    <option value="Medium">ปานกลาง (Medium)</option>
                    <option value="High">สูง (High)</option>
                    <option value="Urgent">เร่งด่วนที่สุด (Urgent)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">หมวดหมู่งาน</label>
                  <input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">หลักฐานการดำเนินงาน (URL หรือรายละเอียด)</label>
                <input
                  type="text"
                  placeholder="เช่น ไฟล์แนบรายงาน หรือ ลิงก์ระบบ"
                  value={evidence}
                  onChange={e => setEvidence(e.target.value)}
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
