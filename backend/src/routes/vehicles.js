import express from 'express';
import { supabase, mockData } from '../db/supabaseClient.js';

const router = express.Router();

// Get all vehicles
router.get('/', (req, res) => {
  return res.json({ success: true, data: mockData.vehicles });
});

// Get all bookings
router.get('/bookings', (req, res) => {
  // Return descending order
  const sorted = [...mockData.vehicle_bookings].sort((a, b) => b.id - a.id);
  return res.json({ success: true, data: sorted });
});

// Book a vehicle
router.post('/book', (req, res) => {
  const { booking_date, start_time, end_time, booker, vehicle_type, driver, purpose, destination, passengers, admin_officer } = req.body;
  
  if (!booking_date || !start_time || !end_time || !vehicle_type) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Count available vehicles of this type
  const totalVehiclesOfType = mockData.vehicles.filter(v => v.type === vehicle_type && v.status === 'Available');
  if (totalVehiclesOfType.length === 0) {
    return res.status(400).json({ success: false, message: 'ไม่มีรถประเภทนี้ที่พร้อมใช้งาน หรือ รถอยู่ในระหว่างการซ่อมบำรุง' });
  }

  // Find overlapping bookings for this vehicle type on this date
  const overlappingBookings = mockData.vehicle_bookings.filter(b => {
    if (b.status === 'Cancelled') return false;
    if (b.vehicle_type !== vehicle_type) return false;
    if (b.booking_date !== booking_date) return false;
    
    // Check time overlap
    // interval A overlaps interval B if (StartA < EndB) and (EndA > StartB)
    return (start_time < b.end_time) && (end_time > b.start_time);
  });

  if (overlappingBookings.length >= totalVehiclesOfType.length) {
    return res.json({ 
      success: false, 
      message: `ไม่สามารถจองได้ เนื่องจาก ${vehicle_type} ถูกจองเต็มแล้วในช่วงเวลาดังกล่าว (${start_time} - ${end_time})` 
    });
  }

  // Find an available vehicle ID
  const bookedVehicleIds = overlappingBookings.map(b => b.vehicle_id);
  const availableVehicle = totalVehiclesOfType.find(v => !bookedVehicleIds.includes(v.id));

  const newBooking = {
    id: Date.now(),
    booking_date,
    start_time,
    end_time,
    booker: booker || 'ผู้จอง',
    vehicle_type,
    vehicle_id: availableVehicle ? availableVehicle.id : null,
    driver: driver || 'คนขับส่วนกลาง',
    purpose: purpose || 'ไปงาน',
    destination: destination || 'สถานที่',
    passengers: passengers || '1',
    status: 'Pending',
    admin_officer: admin_officer || '',
    mileage_start: 0,
    mileage_end: 0,
    total_distance: 0,
    created_at: new Date().toISOString()
  };

  mockData.vehicle_bookings.push(newBooking);
  
  // Mock sending notifications
  const notificationsSent = ['Line', 'Telegram', 'WhatsApp', 'Gmail'];

  return res.json({ 
    success: true, 
    data: newBooking, 
    notifications: notificationsSent,
    message: 'จองสำเร็จ และส่งการแจ้งเตือนเรียบร้อยแล้ว'
  });
});

// Update status (Confirm / Cancel)
router.put('/book/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status, admin_officer } = req.body;
  
  const bookingIndex = mockData.vehicle_bookings.findIndex(b => b.id === id);
  if (bookingIndex === -1) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  
  mockData.vehicle_bookings[bookingIndex].status = status;
  if (admin_officer) {
    mockData.vehicle_bookings[bookingIndex].admin_officer = admin_officer;
  }
  
  // Mock sending notifications
  const notificationsSent = ['Line', 'Telegram', 'WhatsApp', 'Gmail'];

  return res.json({ 
    success: true, 
    data: mockData.vehicle_bookings[bookingIndex],
    notifications: notificationsSent
  });
});

// Complete travel and record mileage
router.put('/book/:id/complete', (req, res) => {
  const id = parseInt(req.params.id);
  const { mileage_start, mileage_end } = req.body;
  
  const bookingIndex = mockData.vehicle_bookings.findIndex(b => b.id === id);
  if (bookingIndex === -1) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  
  const distance = Math.max(0, parseInt(mileage_end) - parseInt(mileage_start));
  
  mockData.vehicle_bookings[bookingIndex].status = 'Completed';
  mockData.vehicle_bookings[bookingIndex].mileage_start = parseInt(mileage_start);
  mockData.vehicle_bookings[bookingIndex].mileage_end = parseInt(mileage_end);
  mockData.vehicle_bookings[bookingIndex].total_distance = distance;
  
  return res.json({ success: true, data: mockData.vehicle_bookings[bookingIndex] });
});

// Update vehicle maintenance status
router.put('/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  const vehicleIndex = mockData.vehicles.findIndex(v => v.id === id);
  if (vehicleIndex === -1) {
    return res.status(404).json({ success: false, message: 'Vehicle not found' });
  }
  
  mockData.vehicles[vehicleIndex].status = status;
  return res.json({ success: true, data: mockData.vehicles[vehicleIndex] });
});

export default router;
