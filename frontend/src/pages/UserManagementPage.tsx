import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { User, UserRole } from '../types';
import { Users, Shield, CheckCircle, XCircle, Trash2, Search, Sparkles, AlertTriangle } from 'lucide-react';

interface UserManagementPageProps {
  currentUser: User;
}

export const UserManagementPage: React.FC<UserManagementPageProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  // Restrict access if not admin
  if (currentUser.role !== 'admin') {
    return (
      <div className="glass-panel p-8 rounded-2xl border border-rose-500/30 text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น</h3>
        <p className="text-xs text-slate-400">
          หน้านี้สงวนไว้สำหรับผู้ดูแลระบบในการอนุมัติสิทธิ์และบริหารจัดการสมาชิกบัญชี @mcu.ac.th
        </p>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.department.toLowerCase().includes(searchTerm.toLowerCase());
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
              <Users className="w-6 h-6 text-mvu-400" /> ระบบบริหารจัดการสมาชิก (Admin User Control)
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-mvu-500/20 text-mvu-300 border border-mvu-500/30 font-semibold">
              Admin Only
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            อนุมัติการลงทะเบียน ปรับสิทธิ์บทบาทการใช้งาน และจัดการบัญชีบุคลากร @mcu.ac.th
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ อีเมล @mcu.ac.th หรือสังกัด..."
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
                  <th className="px-4 py-3">สังกัด / หน่วยงาน</th>
                  <th className="px-4 py-3">สิทธิ์บทบาท</th>
                  <th className="px-4 py-3">สถานะ</th>
                  <th className="px-4 py-3 text-right">การจัดการ (Admin Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map(user => {
                  const userStatus = user.status || 'Active';
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
                      <td className="px-4 py-3.5">
                        <select
                          value={user.role}
                          onChange={e => handleRoleChange(user.id, e.target.value as UserRole)}
                          className="bg-slate-900 border border-slate-700 text-xs font-semibold text-mvu-300 rounded-lg px-2.5 py-1 outline-none"
                        >
                          <option value="admin">ผู้ดูแลระบบ (Admin)</option>
                          <option value="executive">ผู้บริหาร (Executive)</option>
                          <option value="project_lead">ผู้รับผิดชอบโครงการ (Project Lead)</option>
                          <option value="tracking_officer">เจ้าหน้าที่ติดตามประเมินผล (Tracking Officer)</option>
                        </select>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          userStatus === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          userStatus === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {userStatus === 'Pending' ? '⏳ รออนุมัติ' : userStatus === 'Active' ? '✓ ใช้งานปกติ' : '❌ ระงับสิทธิ์'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-2">
                        {userStatus === 'Pending' && (
                          <button
                            onClick={() => handleStatusChange(user.id, 'Active')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-medium border border-emerald-500/40"
                          >
                            ✓ อนุมัติสิทธิ์
                          </button>
                        )}
                        {userStatus === 'Active' && (
                          <button
                            onClick={() => handleStatusChange(user.id, 'Disabled')}
                            className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] border border-amber-500/30"
                          >
                            ระงับสิทธิ์
                          </button>
                        )}
                        {userStatus === 'Disabled' && (
                          <button
                            onClick={() => handleStatusChange(user.id, 'Active')}
                            className="px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] border border-emerald-500/30"
                          >
                            ปลดระงับ
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
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
    </div>
  );
};
