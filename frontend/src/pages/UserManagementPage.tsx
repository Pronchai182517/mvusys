import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { User, UserRole } from '../types';
import { Users, Shield, CheckCircle, Trash2, Search, Building2, Sliders, AlertTriangle, Lock } from 'lucide-react';
import { DEPARTMENTS, JOB_TITLES } from '../constants/masterData';

interface UserManagementPageProps {
  currentUser: User;
}

export const UserManagementPage: React.FC<UserManagementPageProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State for Department Scope Control
  const [selectedUserForScope, setSelectedUserForScope] = useState<User | null>(null);
  const [scopeType, setScopeType] = useState<'all' | 'department_only'>('department_only');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [scopeNoticeMsg, setScopeNoticeMsg] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleStatusChange = async (userId: string, newStatus: 'Active' | 'Pending' | 'Disabled') => {
    await api.updateUser(userId, { status: newStatus });
    loadUsers();
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    await api.updateUser(userId, { role: newRole });
    loadUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีสมาชิกนี้?')) {
      await api.deleteUser(userId);
      loadUsers();
    }
  };

  const handleOpenDepartmentScopeModal = (user: User) => {
    setSelectedUserForScope(user);
    setScopeType(user.access_scope || 'department_only');
    setSelectedDepartments(user.allowed_departments || [user.department || DEPARTMENTS[0]]);
    setScopeNoticeMsg('');
  };

  const handleToggleDepartment = (deptName: string) => {
    if (selectedDepartments.includes(deptName)) {
      setSelectedDepartments(selectedDepartments.filter(d => d !== deptName));
    } else {
      setSelectedDepartments([...selectedDepartments, deptName]);
    }
  };

  const handleSaveDepartmentScope = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForScope) return;

    try {
      const res = await api.updateUserDepartmentScope(selectedUserForScope.id, {
        access_scope: scopeType,
        allowed_departments: scopeType === 'all' ? DEPARTMENTS : selectedDepartments,
        department: selectedDepartments[0] || selectedUserForScope.department
      });

      if (res.success) {
        setScopeNoticeMsg('✅ ออกคำสั่งตั้งค่าขอบเขตสิทธิ์ตามส่วนงานสำเร็จเรียบร้อยแล้ว');
        setTimeout(() => {
          setSelectedUserForScope(null);
          loadUsers();
        }, 1500);
      }
    } catch (err) {
      setScopeNoticeMsg('❌ เกิดข้อผิดพลาดในการบันทึกคำสั่งขอบเขตส่วนงาน');
    }
  };

  if (currentUser.role !== 'admin') {
    return (
      <div className="glass-panel p-8 rounded-2xl border border-rose-500/30 text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น</h3>
        <p className="text-xs text-slate-400">
          หน้านี้สงวนไว้สำหรับผู้ดูแลระบบในการออกคำสั่งควบคุมสิทธิ์และบริหารจัดการขอบเขตส่วนงานสำหรับสมาชิก @mcu.ac.th
        </p>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const matchSearch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (u.department || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || (u.status || 'Active') === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-mvu-400" /> ระบบคำสั่งควบคุมสิทธิ์ตามส่วนงาน (Admin Department Control)
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-mvu-500/20 text-mvu-300 border border-mvu-500/30 font-semibold">
              Admin Command System
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            คำสั่งแอดมินในการอนุมัติสมาชิก และจำกัดขอบเขตสิทธิ์การเข้าถึงข้อมูลตามส่วนงานที่รับผิดชอบเท่านั้น
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ อีเมล @mcu.ac.th หรือส่วนงาน..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-mvu-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">สถานะ:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/60 text-xs text-slate-300 rounded-xl px-3 py-2 outline-none border cursor-pointer hover:border-mvu-500"
          >
            <option value="all">ทุกสถานะสมาชิก</option>
            <option value="Pending">รอการอนุมัติ (Pending)</option>
            <option value="Active">ใช้งานปกติ (Active)</option>
            <option value="Disabled">ระงับสิทธิ์ (Disabled)</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-xs">กำลังโหลดรายชื่อสมาชิก...</div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">สมาชิก / บัญชี</th>
                  <th className="px-4 py-3">ตำแหน่ง / สังกัด</th>
                  <th className="px-4 py-3">ขอบเขตสิทธิ์ตามส่วนงาน</th>
                  <th className="px-4 py-3">บทบาท</th>
                  <th className="px-4 py-3 text-right">คำสั่งการจัดการ (Admin Commands)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map(user => {
                  const userStatus = user.status || 'Active';
                  const isDepartmentScoped = (user.access_scope || 'all') === 'department_only';
                  const allowedDepts = user.allowed_departments || (user.department ? [user.department] : []);

                  return (
                    <tr key={user.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-4 py-3.5 space-y-0.5">
                        <div className="font-semibold text-white text-sm">{user.name}</div>
                        <div className="font-mono text-[11px] text-mvu-400">{user.email}</div>
                      </td>
                      <td className="px-4 py-3.5 space-y-0.5">
                        <div className="text-slate-200">{user.title}</div>
                        <div className="text-[11px] text-slate-400">{user.department}</div>
                      </td>
                      <td className="px-4 py-3.5 space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            isDepartmentScoped ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                          }`}>
                            {isDepartmentScoped ? '🔒 จำกัดเฉพาะส่วนงาน' : '🌐 เข้าถึงทุกส่วนงาน'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 max-w-xs truncate">
                          {Array.isArray(allowedDepts) ? allowedDepts.join(', ') : ''}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          value={user.role}
                          onChange={e => handleRoleChange(user.id, e.target.value as UserRole)}
                          className="bg-slate-900 border border-slate-700 text-xs font-semibold text-mvu-300 rounded-lg px-2 py-1 outline-none"
                        >
                          <option value="admin">ผู้ดูแลระบบ (Admin)</option>
                          <option value="executive">ผู้บริหาร (Executive)</option>
                          <option value="project_lead">ผู้รับผิดชอบโครงการ (Project Lead)</option>
                          <option value="tracking_officer">เจ้าหน้าที่ติดตามประเมินผล (Tracking Officer)</option>
                        </select>
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-2">
                        {/* Command button to manage department scope */}
                        <button
                          onClick={() => handleOpenDepartmentScopeModal(user)}
                          className="px-2.5 py-1 rounded-lg bg-mvu-500/20 hover:bg-mvu-500/30 text-mvu-300 text-[11px] font-medium border border-mvu-500/40 transition-colors inline-flex items-center gap-1"
                        >
                          <Sliders className="w-3.5 h-3.5" /> คำสั่งกำหนดส่วนงาน
                        </button>

                        {userStatus === 'Pending' && (
                          <button
                            onClick={() => handleStatusChange(user.id, 'Active')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-medium border border-emerald-500/40"
                          >
                            ✓ อนุมัติสิทธิ์
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors inline-block"
                          title="ลบบัญชี"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Admin Command: Department Scope Control */}
      {selectedUserForScope && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 w-full max-w-lg space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedUserForScope(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs p-1 rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-mvu-500/20 text-mvu-400 border border-mvu-500/30">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">คำสั่งแอดมิน: กำหนดสิทธิ์ส่วนงาน</h3>
                <p className="text-xs text-mvu-300 font-mono">{selectedUserForScope.name} ({selectedUserForScope.email})</p>
              </div>
            </div>

            {scopeNoticeMsg && (
              <div className="p-3 rounded-xl bg-slate-900 border border-mvu-500/40 text-xs text-mvu-300 font-medium">
                {scopeNoticeMsg}
              </div>
            )}

            <form onSubmit={handleSaveDepartmentScope} className="space-y-4">
              {/* Access Scope Type Selector */}
              <div>
                <label className="text-xs text-slate-400 font-medium">รูปแบบการจำกัดสิทธิ์ตามส่วนงาน (Scope Constraint)</label>
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setScopeType('department_only')}
                    className={`p-3 rounded-xl text-xs font-semibold border text-left flex flex-col justify-between transition-all ${
                      scopeType === 'department_only'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <span>🔒 จำกัดเฉพาะส่วนงานที่ได้รับมอบหมาย</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-normal">ทำงานได้เฉพาะข้อมูลในส่วนงานที่กำหนดเท่านั้น</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScopeType('all')}
                    className={`p-3 rounded-xl text-xs font-semibold border text-left flex flex-col justify-between transition-all ${
                      scopeType === 'all'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <span>🌐 เข้าถึงได้ทุกส่วนงาน (Full Access)</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-normal">สำหรับผู้บริหาร / แอดมิน ดูแลภาพรวมทั้งหมด</span>
                  </button>
                </div>
              </div>

              {/* Department Checkbox Selector */}
              {scopeType === 'department_only' && (
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-medium">
                    เลือกส่วนงานที่อนุมัติให้สมาชิกเข้าถึงได้ ( Allowed Departments ):
                  </label>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto p-3 rounded-xl bg-slate-900 border border-slate-800">
                    {DEPARTMENTS.map(dept => {
                      const isChecked = selectedDepartments.includes(dept);
                      return (
                        <label
                          key={dept}
                          className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white cursor-pointer p-1.5 rounded-lg hover:bg-slate-800/60"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleDepartment(dept)}
                            className="rounded border-slate-700 text-mvu-500 focus:ring-mvu-500 bg-slate-950"
                          />
                          <span>{dept}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedUserForScope(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-bold text-xs shadow-lg shadow-mvu-500/20"
                >
                  บันทึกคำสั่งกำหนดส่วนงาน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
