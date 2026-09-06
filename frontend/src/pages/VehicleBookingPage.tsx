import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { VehicleBooking, Vehicle } from '../types';

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
    const officerName = status === 'Confirmed' ? 'ผู้ดูแลระบบจองรถ' : undefined;
    const res = await api.updateVehicleBookingStatus(id, status, officerName);
    loadData();

    if (res.success && status === 'Confirmed') {
      setToastMessage('อนุมัติการจองและแจ้งเตือนเรียบร้อยแล้ว');
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
    <div className="w-full max-w-4xl mx-auto animate-fadeIn relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-status-success text-on-primary px-space-md py-space-sm rounded-[8px] shadow-lg flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-label-sm text-[13px] font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="px-screen-margin-mobile pt-space-md pb-space-sm bg-surface flex flex-col sm:flex-row sm:items-start justify-between gap-space-md border-b border-border-subtle sticky top-0 z-30">
        <div>
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="material-symbols-outlined text-[24px] text-primary">local_shipping</span>
            <h1 className="font-heading-lg text-heading-lg font-bold text-text-primary tracking-tight">ระบบจองยานพาหนะ</h1>
          </div>
          <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
            จองรถตู้ รถปิคอัพ และรถ 6 ล้อ สำหรับปฏิบัติงาน พร้อมบันทึกเลขไมล์การเดินทาง
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-primary text-on-primary px-space-md py-2.5 rounded-[8px] font-label-md text-[13px] font-bold active:scale-[0.98] transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          จองยานพาหนะ
        </button>
      </div>

      {/* Booking List */}
      <div className="px-screen-margin-mobile py-space-md">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[24px] animate-spin">sync</span>
              <span className="font-label-sm text-[13px] font-semibold">กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-sm">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-surface-card rounded-[12px] p-space-md border border-border-subtle shadow-sm flex flex-col space-y-space-sm relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  booking.status === 'Pending' ? 'bg-status-warning' :
                  booking.status === 'Confirmed' ? 'bg-status-info' :
                  booking.status === 'Completed' ? 'bg-status-success' : 'bg-status-error'
                }`}></div>

                <div className="pl-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-badge text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-subtle text-text-secondary font-bold">
                      {booking.vehicle_type === 'Van' ? 'รถตู้' : booking.vehicle_type === 'Pickup' ? 'รถปิคอัพ' : 'รถ 6 ล้อ'}
                    </span>
                    
                    <span className={`font-mono-badge text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      booking.status === 'Pending' ? 'bg-status-warning/10 text-status-warning' :
                      booking.status === 'Confirmed' ? 'bg-status-info/10 text-status-info' :
                      booking.status === 'Completed' ? 'bg-status-success/10 text-status-success' :
                      'bg-status-error/10 text-status-error'
                    }`}>
                      {booking.status === 'Pending' && 'รอยืนยัน'}
                      {booking.status === 'Confirmed' && 'ยืนยันแล้ว'}
                      {booking.status === 'Completed' && 'เดินทางสำเร็จ'}
                      {booking.status === 'Cancelled' && 'ยกเลิก'}
                    </span>
                  </div>

                  <h3 className="font-label-md text-label-md font-bold text-text-primary leading-tight mt-1">{booking.purpose}</h3>
                  
                  <div className="font-body-sm text-body-sm text-text-secondary grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">event</span>
                      <span>{booking.booking_date} ({booking.start_time}-{booking.end_time})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">directions_car</span>
                      <span className="font-semibold text-text-primary">{getVehicleName(booking.vehicle_id)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                      <span className="truncate" title={booking.destination}>{booking.destination}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">group</span>
                      <span>{booking.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2">
                      <span className="material-symbols-outlined text-[16px] text-text-muted">person</span>
                      <span className="text-text-muted">ผู้จอง:</span>
                      <span className="font-semibold text-text-primary">{booking.booker}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2">
                      <span className="material-symbols-outlined text-[16px] text-text-muted">badge</span>
                      <span className="text-text-muted">คนขับ:</span>
                      <span className="font-semibold text-text-primary">{booking.driver}</span>
                    </div>

                    {(booking.admin_officer || booking.status === 'Confirmed') && (
                      <div className="col-span-1 sm:col-span-2 mt-2 px-2 py-1.5 rounded-[4px] bg-status-success/10 border border-status-success/20 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-status-success">verified_user</span>
                        <span className="font-mono-badge text-[9px] uppercase font-bold text-status-success">ผู้อนุมัติ:</span>
                        <span className="font-label-sm text-[11px] font-bold text-text-primary">{booking.admin_officer || 'ผู้ดูแลระบบจองรถ'}</span>
                      </div>
                    )}
                  </div>

                  {booking.status === 'Completed' && (
                    <div className="mt-3 p-3 rounded-[8px] bg-surface-container border border-border-subtle grid grid-cols-3 gap-2 text-center divide-x divide-border-subtle">
                      <div>
                        <div className="font-label-sm text-[10px] text-text-muted mb-0.5">เลขไมล์ออก</div>
                        <div className="font-mono text-[13px] font-semibold text-text-primary">{booking.mileage_start.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="font-label-sm text-[10px] text-text-muted mb-0.5">เลขไมล์ถึง</div>
                        <div className="font-mono text-[13px] font-semibold text-text-primary">{booking.mileage_end.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="font-label-sm text-[10px] text-primary font-bold mb-0.5">รวมระยะทาง</div>
                        <div className="font-mono text-[13px] font-bold text-primary">{booking.total_distance.toLocaleString()} km</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-end gap-2 pl-1">
                  {booking.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                        className="px-3 py-1.5 rounded-[6px] bg-status-info/10 text-status-info font-label-sm text-[12px] font-bold active:bg-status-info/20 transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> ยืนยันจอง
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'Cancelled')}
                        className="px-3 py-1.5 rounded-[6px] bg-status-error/10 text-status-error font-label-sm text-[12px] font-bold active:bg-status-error/20 transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">cancel</span> ยกเลิก
                      </button>
                    </>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button
                      onClick={() => openMileageModal(booking.id)}
                      className="w-full px-3 py-2 rounded-[6px] bg-status-success text-on-primary font-label-sm text-[12px] font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">flag</span> บันทึกการเดินทางสำเร็จ
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-overlay/60 backdrop-blur-sm">
          <div className="bg-surface-card p-space-md rounded-[16px] border border-border-subtle w-full max-w-2xl shadow-xl animate-fadeIn overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-space-md border-b border-border-subtle pb-space-xs">
              <h3 className="font-heading-sm text-[18px] font-bold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span> ฟอร์มจองยานพาหนะ
              </h3>
              <button onClick={() => setShowModal(false)} className="text-text-muted active:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-[8px] bg-status-error/10 border border-status-error text-status-error font-body-sm text-[12px] font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span> {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-space-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">วันที่ใช้งาน <span className="text-status-error">*</span></label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">เวลาเริ่ม <span className="text-status-error">*</span></label>
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                      className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">เวลาสิ้นสุด <span className="text-status-error">*</span></label>
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                      className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">ประเภทรถ <span className="text-status-error">*</span></label>
                  <select
                    value={vehicleType}
                    onChange={e => setVehicleType(e.target.value as any)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  >
                    <option value="Van">รถตู้ (มี 2 คัน)</option>
                    <option value="Pickup">รถปิคอัพ (มี 2 คัน)</option>
                    <option value="6-Wheel">รถ 6 ล้อ (มี 1 คัน)</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">ผู้อนุมัติ/ผู้รับผิดชอบ <span className="text-status-error">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="ชื่อผู้อนุมัติ"
                    value={adminOfficer}
                    onChange={e => setAdminOfficer(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">ชื่อผู้จอง <span className="text-status-error">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="ระบุชื่อผู้จอง"
                    value={booker}
                    onChange={e => setBooker(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">ชื่อคนขับ <span className="text-status-error">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="ระบุชื่อคนขับ"
                    value={driver}
                    onChange={e => setDriver(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">จุดประสงค์ <span className="text-status-error">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น ไปราชการ, ขนของ"
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">สถานที่ <span className="text-status-error">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="สถานที่ปฏิบัติงาน"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">ผู้ร่วมเดินทาง <span className="text-status-error">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="เช่น 5 รูป/คน หรือ ระบุรายชื่อ"
                  value={passengers}
                  onChange={e => setPassengers(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-body-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
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
                  className="px-4 py-2 rounded-[8px] bg-primary text-on-primary font-label-md text-[13px] font-bold active:scale-[0.98] transition-transform shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-overlay/60 backdrop-blur-sm">
          <div className="bg-surface-card p-space-md rounded-[16px] border border-border-subtle w-full max-w-sm shadow-xl animate-fadeIn">
            <h3 className="font-heading-sm text-[18px] font-bold text-text-primary flex items-center gap-2 mb-4 border-b border-border-subtle pb-3">
              <span className="material-symbols-outlined text-[20px] text-status-success">flag</span> บันทึกการเดินทาง
            </h3>
            
            <form onSubmit={handleCompleteTravel} className="space-y-4">
              <div>
                <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">เลขไมล์ออก (Start Mileage) <span className="text-status-error">*</span></label>
                <input
                  type="number"
                  required
                  min="0"
                  value={mileageStart}
                  onChange={e => setMileageStart(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-mono text-[14px] text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="เช่น 120500"
                />
              </div>
              
              <div>
                <label className="font-label-sm text-[12px] font-bold text-text-secondary block mb-1">เลขไมล์ถึง (End Mileage) <span className="text-status-error">*</span></label>
                <input
                  type="number"
                  required
                  min="0"
                  value={mileageEnd}
                  onChange={e => setMileageEnd(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-[8px] px-3 py-2 font-mono text-[14px] text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="เช่น 120650"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border-subtle mt-2">
                <button
                  type="button"
                  onClick={() => setShowMileageModal(false)}
                  className="px-4 py-2 rounded-[8px] font-label-md text-[13px] font-bold text-text-secondary active:bg-surface-subtle transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[8px] bg-status-success text-on-primary font-label-md text-[13px] font-bold active:scale-[0.98] transition-transform shadow-sm"
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
