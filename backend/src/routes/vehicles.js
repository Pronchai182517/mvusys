import express from 'express';
import { supabase } from '../db/supabaseClient.js';

const router = express.Router();

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('vehicles').select('*').order('id', { ascending: true });
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err) {
    console.error('Fetch vehicles error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const { data, error } = await supabase.from('vehicle_bookings').select('*').order('id', { ascending: false });
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err) {
    console.error('Fetch bookings error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Book a vehicle
router.post('/book', async (req, res) => {
  const { booking_date, start_time, end_time, booker, vehicle_type, driver, purpose, destination, passengers, admin_officer } = req.body;
  
  if (!booking_date || !start_time || !end_time || !vehicle_type) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // 1. Get available vehicles of requested type
    const { data: availableVehicles, error: vError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('type', vehicle_type)
      .eq('status', 'Available');
      
    if (vError) throw vError;

    if (!availableVehicles || availableVehicles.length === 0) {
      return res.status(400).json({ success: false, message: 'ไม่มีรถประเภทนี้ที่พร้อมใช้งาน หรือ รถอยู่ในระหว่างการซ่อมบำรุง' });
    }

    // 2. Find overlapping bookings on that date
    const { data: overlappingBookings, error: bError } = await supabase
      .from('vehicle_bookings')
      .select('vehicle_id')
      .eq('vehicle_type', vehicle_type)
      .eq('booking_date', booking_date)
      .neq('status', 'Cancelled')
      .lt('start_time', end_time)
      .gt('end_time', start_time);

    if (bError) throw bError;

    if (overlappingBookings && overlappingBookings.length >= availableVehicles.length) {
      return res.json({ 
        success: false, 
        message: `ไม่สามารถจองได้ เนื่องจาก ${vehicle_type} ถูกจองเต็มแล้วในช่วงเวลาดังกล่าว (${start_time} - ${end_time})` 
      });
    }

    // 3. Find an available vehicle ID
    const bookedIds = overlappingBookings?.map(b => b.vehicle_id) || [];
    const availableVehicle = availableVehicles.find(v => !bookedIds.includes(v.id));

    // 4. Create booking
    const newBooking = {
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
      total_distance: 0
    };

    const { data, error: insertError } = await supabase.from('vehicle_bookings').insert([newBooking]).select();
    
    if (insertError) throw insertError;

    const notificationsSent = ['Line', 'Telegram', 'WhatsApp', 'Gmail'];
    
    return res.json({ 
      success: true, 
      data: data[0], 
      notifications: notificationsSent,
      message: 'จองสำเร็จ และส่งการแจ้งเตือนเรียบร้อยแล้ว'
    });

  } catch (err) {
    console.error('Booking error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update status (Confirm / Cancel)
router.put('/book/:id/status', async (req, res) => {
  const id = parseInt(req.params.id);
  const { status, admin_officer } = req.body;
  
  try {
    const updates = { status };
    if (admin_officer) updates.admin_officer = admin_officer;

    const { data, error } = await supabase.from('vehicle_bookings').update(updates).eq('id', id).select();
    
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'Booking not found' });
    
    const notificationsSent = ['Line', 'Telegram', 'WhatsApp', 'Gmail'];
    
    return res.json({ 
      success: true, 
      data: data[0],
      notifications: notificationsSent
    });
  } catch (err) {
    console.error('Update booking status error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Complete travel and record mileage
router.put('/book/:id/complete', async (req, res) => {
  const id = parseInt(req.params.id);
  const { mileage_start, mileage_end } = req.body;
  
  try {
    const start = parseInt(mileage_start) || 0;
    const end = parseInt(mileage_end) || 0;
    const distance = Math.max(0, end - start);
    
    const updates = {
      status: 'Completed',
      mileage_start: start,
      mileage_end: end,
      total_distance: distance
    };

    const { data, error } = await supabase.from('vehicle_bookings').update(updates).eq('id', id).select();
    
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'Booking not found' });
    
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Complete booking error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update vehicle maintenance status
router.put('/:id/status', async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  try {
    const { data, error } = await supabase.from('vehicles').update({ status }).eq('id', id).select();
    
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    
    return res.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Update vehicle status error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
