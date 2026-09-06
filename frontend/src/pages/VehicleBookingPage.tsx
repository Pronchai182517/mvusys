import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { VehicleBooking, Vehicle } from '../types';
import { Plus, Search, Filter, Car, Clock, MapPin, Users, CheckCircle, XCircle, Flag } from 'lucide-react';

export const VehicleBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<VehicleBooking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [showMileageModal, setShowMileageModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [vehicleType, setVehicleType] = useState<'Van' | 'Pickup' | '6-Wheel'>('Van');
  const [booker, setBooker] = useState('');
  const [driver, setDriver] = useState('');
  const [purpose, setPurpose] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState('');
  const [adminOfficer, setAdminOfficer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mileage Form
  const [mileageStart, setMileageStart] = useState('');
  const [mileageEnd, setMileageEnd] = useState('');

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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    const res = await api.createVehicleBooking({
      booking_date: bookingDate,
      start_time: startTime,
      end_time: endTime,
      vehicle_type: vehicleType,
      booker,
      driver,
      purpose,
      destination,
      passengers,
      admin_officer: adminOfficer
    });

    if (res.success) {
      setShowModal(false);
      resetForm();
      loadData();
      
      // Show notification toast
      setToastMessage('แจ้งเตือนไปยังกลุ่มจองรถ: Line, Telegram, WhatsApp, Gmail เรียบร้อยแล้ว');
      setTimeout(() => setToastMessage(''), 5000);
    } else {
      setErrorMessage(res.message || 'เกิดข้อผิดพลาดในการจอง');
    }
  };

  const resetForm = () => {
    setBookingDate('');
    setStartTime('');
    setEndTime('');
    setBooker('');
    setDriver('');
    setPurpose('');
    setDestination('');
    setPassengers('');
    setAdminOfficer('');
  };

  const handleStatusChange = async (id: number, status: string) => {
    // If confirming, you could prompt for admin name, or just use a default for demo
    const officerName = status === 'Confirmed' ? 'ผู้ดูแลระบบจองรถ' : undefined;
    const res = await api.updateVehicleBookingStatus(id, status, officerName);
    loadData();

    if (res.success && status === 'Confirmed') {
      setToastMessage('อนุมัติการจองและแจ้งเตือนไปยังกลุ่ม Line, Telegram, WhatsApp, Gmail เรียบร้อยแล้ว');
      setTimeout(() => setToastMessage(''), 5000);
    }
  };

  const openMileageModal = (id: number) => {
    setSelectedBookingId(id);
    setMileageStart('');
    setMileageEnd('');
    setShowMileageModal(true);
  };

  const handleCompleteTravel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingId) return;
    
    await api.completeVehicleBooking(selectedBookingId, parseInt(mileageStart), parseInt(mileageEnd));
    setShowMileageModal(false);
    loadData();
  };

  const getVehicleName = (vId: number | null) => {
    if (!vId) return 'รอจัดสรร';
    const v = vehicles.find(v => v.id === vId);
    return v ? `${v.name} (${v.license_plate})` : 'ไม่พบข้อมูลรถ';
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center gap-3 animate-slideDown">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🚐 ระบบจองยานพาหนะ (Vehicle Booking)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            จองรถตู้ รถปิคอัพ และรถ 6 ล้อ สำหรับปฏิบัติงาน พร้อมบันทึกเลขไมล์การเดินทาง
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-mvu-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> จองยานพาหนะ
        </button>
      </div>

      {/* Booking List */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-xs">กำลังโหลดรายการจอง...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {bookings.map(booking => (
            <div key={booking.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {booking.vehicle_type === 'Van' ? 'รถตู้' : booking.vehicle_type === 'Pickup' ? 'รถปิคอัพ' : 'รถ 6 ล้อ'}
                  </span>
                  
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    booking.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    booking.status === 'Confirmed' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                    booking.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {booking.status === 'Pending' && 'รอยืนยัน'}
                    {booking.status === 'Confirmed' && 'ยืนยันแล้ว'}
                    {booking.status === 'Completed' && 'เดินทางสำเร็จ'}
                    {booking.status === 'Cancelled' && 'ยกเลิก'}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white leading-snug">{booking.purpose}</h3>
                
                <div className="text-xs text-slate-400 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-mvu-400" />
                    <span>{booking.booking_date} ({booking.start_time}-{booking.end_time})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-mvu-400" />
                    <span className="text-slate-200">{getVehicleName(booking.vehicle_id)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-mvu-400" />
                    <span>{booking.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-mvu-400" />
                    <span>{booking.passengers}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <span className="text-slate-500">ผู้จอง:</span>
                    <span className="text-slate-300">{booking.booker}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <span className="text-slate-500">คนขับ:</span>
                    <span className="text-slate-300">{booking.driver}</span>
                  </div>
                  {(booking.admin_officer || booking.status === 'Confirmed') && (
                    <div className="flex items-center gap-2 col-span-2 mt-1 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-500/70 text-[10px] uppercase font-bold">ผู้อนุมัติ:</span>
                      <span className="text-emerald-400 font-medium text-xs">{booking.admin_officer || 'ผู้ดูแลระบบจองรถ'}</span>
                    </div>
                  )}
                </div>

                {booking.status === 'Completed' && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[10px] text-slate-500">เลขไมล์ออก</div>
                      <div className="font-mono text-white">{booking.mileage_start.toLocaleString()}</div>
                    </div>
                    <div className="border-l border-slate-700/50">
                      <div className="text-[10px] text-slate-500">เลขไมล์ถึง</div>
                      <div className="font-mono text-white">{booking.mileage_end.toLocaleString()}</div>
                    </div>
                    <div className="border-l border-slate-700/50">
                      <div className="text-[10px] text-mvu-400">รวมระยะทาง</div>
                      <div className="font-mono text-mvu-400 font-bold">{booking.total_distance.toLocaleString()} km</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                {booking.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs font-medium border border-sky-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> ยืนยันจอง
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'Cancelled')}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium border border-rose-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" /> ยกเลิก
                    </button>
                  </>
                )}
                {booking.status === 'Confirmed' && (
                  <button
                    onClick={() => openMileageModal(booking.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30 transition-colors flex items-center gap-1.5 w-full justify-center"
                  >
                    <Flag className="w-3.5 h-3.5" /> บันทึกการเดินทางสำเร็จ (กรอกเลขไมล์)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-700 w-full max-w-2xl space-y-4 animate-scaleUp overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-mvu-400" /> ฟอร์มจองยานพาหนะ
            </h3>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                ⚠️ {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">วันที่ใช้งาน <span className="text-rose-500">*</span></label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-400">เวลาเริ่ม <span className="text-rose-500">*</span></label>
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                      className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">เวลาสิ้นสุด <span className="text-rose-500">*</span></label>
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                      className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">ประเภทรถ <span className="text-rose-500">*</span></label>
                  <select
                    value={vehicleType}
                    onChange={e => setVehicleType(e.target.value as any)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  >
                    <option value="Van">รถตู้ (มี 2 คัน)</option>
                    <option value="Pickup">รถปิคอัพ (มี 2 คัน)</option>
                    <option value="6-Wheel">รถ 6 ล้อ (มี 1 คัน)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">เจ้าหน้าที่ดูแลระบบจองรถ <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="ชื่อผู้อนุมัติ/ผู้รับผิดชอบการจอง"
                    value={adminOfficer}
                    onChange={e => setAdminOfficer(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">ผู้จอง <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="ระบุชื่อผู้จอง"
                    value={booker}
                    onChange={e => setBooker(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">จุดประสงค์ (ไปงาน) <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น ไปราชการ, ขนของ"
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">สถานที่ (ที่งาน) <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="สถานที่ปฏิบัติงาน"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">ผู้ร่วมเดินทาง <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น 5 รูป/คน หรือ ระบุรายชื่อ"
                    value={passengers}
                    onChange={e => setPassengers(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">คนขับ <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="ระบุชื่อคนขับ"
                    value={driver}
                    onChange={e => setDriver(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-mvu-500 hover:bg-mvu-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-mvu-500/20"
                >
                  บันทึกการจอง
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mileage Complete Modal */}
      {showMileageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-700 w-full max-w-sm space-y-4 animate-scaleUp">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flag className="w-5 h-5 text-emerald-400" /> บันทึกการเดินทาง
            </h3>
            
            <form onSubmit={handleCompleteTravel} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">เลขไมล์ออก (Start Mileage) <span className="text-rose-500">*</span></label>
                <input
                  type="number"
                  required
                  min="0"
                  value={mileageStart}
                  onChange={e => setMileageStart(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500 font-mono"
                  placeholder="เช่น 120500"
                />
              </div>
              
              <div>
                <label className="text-xs text-slate-400">เลขไมล์ถึง (End Mileage) <span className="text-rose-500">*</span></label>
                <input
                  type="number"
                  required
                  min="0"
                  value={mileageEnd}
                  onChange={e => setMileageEnd(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-mvu-500 font-mono"
                  placeholder="เช่น 120650"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowMileageModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-emerald-500/20"
                >
                  บันทึกสำเร็จ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
