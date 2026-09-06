import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { VehicleBooking, Vehicle } from '../types';
import { Table, CheckCircle, XCircle, CarFront, Wrench, CheckSquare } from 'lucide-react';

export const VehicleAdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'vehicles'>('bookings');
  const [bookings, setBookings] = useState<VehicleBooking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bData, vData] = await Promise.all([
        api.getVehicleBookings(),
        api.getVehicles()
      ]);
      setBookings(bData);
      setVehicles(vData);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: number, status: string) => {
    const officerName = status === 'Confirmed' ? 'ผู้ดูแลระบบจองรถ' : undefined;
    await api.updateVehicleBookingStatus(id, status, officerName);
    loadData();
  };

  const getVehicleName = (vId: number | null) => {
    if (!vId) return '-';
    const v = vehicles.find(v => v.id === vId);
    return v ? `${v.name} (${v.license_plate})` : '-';
  };

  const handleVehicleStatusChange = async (id: number, status: string) => {
    await api.updateVehicleStatus(id, status);
    loadData();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Table className="w-5 h-5 text-mvu-400" /> จัดการระบบยานพาหนะ (Admin View)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ภาพรวมการจองรถทั้งหมด และ การแจ้งซ่อมบำรุงรถยนต์
          </p>
        </div>
        
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700/50">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <Table className="w-4 h-4" /> ตารางการจอง
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTab === 'vehicles'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <CarFront className="w-4 h-4" /> จัดการรถยนต์
          </button>
        </div>
      </div>

      {activeTab === 'bookings' ? (
        <div className="glass-panel p-1 rounded-2xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-[11px] uppercase text-slate-400 bg-slate-900/50">
            <tr>
              <th className="px-4 py-3 rounded-tl-xl">วันที่ใช้งาน</th>
              <th className="px-4 py-3">เวลา</th>
              <th className="px-4 py-3">ประเภทรถ</th>
              <th className="px-4 py-3">คันที่จัดสรร</th>
              <th className="px-4 py-3">จุดประสงค์ / สถานที่</th>
              <th className="px-4 py-3">ผู้จอง / คนขับ</th>
              <th className="px-4 py-3">ผู้อนุมัติ</th>
              <th className="px-4 py-3">สถานะ</th>
              <th className="px-4 py-3 rounded-tr-xl text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-slate-500 text-xs">
                  กำลังโหลดข้อมูล...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-slate-500 text-xs">
                  ไม่มีข้อมูลการจอง
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-t border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">{b.booking_date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{b.start_time} - {b.end_time}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {b.vehicle_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{getVehicleName(b.vehicle_id)}</td>
                  <td className="px-4 py-3 min-w-[200px]">
                    <div className="font-semibold text-white">{b.purpose}</div>
                    <div className="text-[11px] text-slate-500">{b.destination}</div>
                  </td>
                  <td className="px-4 py-3 min-w-[150px]">
                    <div>{b.booker}</div>
                    <div className="text-[11px] text-slate-500">คนขับ: {b.driver}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-emerald-400">{b.admin_officer || '-'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                      b.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      b.status === 'Confirmed' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                      b.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {b.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(b.id, 'Confirmed')}
                            className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 transition-colors tooltip"
                            title="ยืนยันการจอง"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(b.id, 'Cancelled')}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors tooltip"
                            title="ยกเลิกการจอง"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(v => (
            <div key={v.id} className={`glass-panel p-6 rounded-2xl border transition-all ${
              v.status === 'Available' ? 'border-emerald-500/30 shadow-emerald-500/10' : 'border-rose-500/30 shadow-rose-500/10'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CarFront className="w-5 h-5 text-mvu-400" />
                    {v.name}
                  </h3>
                  <div className="text-sm text-slate-400 mt-1 mb-4">{v.license_plate}</div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">ประเภท:</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {v.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-500">สถานะ:</span>
                    {v.status === 'Available' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">พร้อมใช้งาน</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">แจ้งซ่อมบำรุง</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
                {v.status === 'Available' ? (
                  <button
                    onClick={() => handleVehicleStatusChange(v.id, 'Maintenance')}
                    className="flex-1 py-2 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Wrench className="w-4 h-4" /> แจ้งซ่อม / ปิดระบบจอง
                  </button>
                ) : (
                  <button
                    onClick={() => handleVehicleStatusChange(v.id, 'Available')}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckSquare className="w-4 h-4" /> ซ่อมเสร็จ / เปิดรับจอง
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
